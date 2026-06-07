import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const apiBaseUrl = process.env.FIPE_API_BASE_URL || "https://fipe.parallelum.com.br/api/v2";
const subscriptionToken = process.env.FIPE_TOKEN || "";
const concurrency = Number(process.env.FIPE_SYNC_CONCURRENCY || 4);
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(rootDir, "app/assets/data/fipe-veiculos.json");
const outputScriptPath = resolve(rootDir, "app/assets/data/fipe-veiculos.js");

const vehicleTypes = [
  { key: "cars", label: "Carro" },
  { key: "motorcycles", label: "Moto" },
  { key: "trucks", label: "Caminhao" }
];

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .toLowerCase()
    .trim();
}

function makeUrl(endpoint, params = {}) {
  const url = new URL(`${apiBaseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`);
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url;
}

async function fetchJson(endpoint, params = {}) {
  const headers = { accept: "application/json" };
  if (subscriptionToken) headers["X-Subscription-Token"] = subscriptionToken;

  const response = await fetch(makeUrl(endpoint, params), { headers });
  if (!response.ok) {
    throw new Error(`FIPE ${endpoint} failed with HTTP ${response.status}`);
  }
  return response.json();
}

async function getLatestReference() {
  try {
    const references = await fetchJson("references");
    return Array.isArray(references) ? references[0] || null : null;
  } catch (error) {
    console.warn(`Nao foi possivel obter referencia mensal: ${error.message}`);
    return null;
  }
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;
  const workerCount = Math.min(Math.max(1, limit), items.length || 1);
  const workers = Array.from({ length: workerCount }, async () => {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
  return results;
}

async function fetchModelsForType(type, referenceCode) {
  const brands = await fetchJson(`${type.key}/brands`, { reference: referenceCode });
  const normalizedBrands = (Array.isArray(brands) ? brands : [])
    .map((brand) => ({
      code: String(brand.code ?? brand.codigo ?? "").trim(),
      name: String(brand.name ?? brand.nome ?? "").trim()
    }))
    .filter((brand) => brand.code && brand.name);

  const groups = await mapWithConcurrency(normalizedBrands, concurrency, async (brand) => {
    const models = await fetchJson(`${type.key}/brands/${encodeURIComponent(brand.code)}/models`, {
      reference: referenceCode
    });
    return (Array.isArray(models) ? models : [])
      .map((model) => ({
        type: type.key,
        typeLabel: type.label,
        brandCode: brand.code,
        brand: brand.name,
        modelCode: String(model.code ?? model.codigo ?? "").trim(),
        model: String(model.name ?? model.nome ?? "").trim()
      }))
      .filter((item) => item.model)
      .map((item) => ({
        ...item,
        label: `${item.brand} ${item.model}`.replace(/\s+/g, " ").trim(),
        search: normalizeSearchText(`${item.brand} ${item.model}`)
      }));
  });

  return {
    brands: normalizedBrands.length,
    vehicles: groups.flat()
  };
}

async function main() {
  const startedAt = new Date();
  const reference = await getLatestReference();
  const referenceCode = reference?.code || "";
  const totals = {};
  const vehicles = [];

  for (const type of vehicleTypes) {
    console.log(`Sincronizando ${type.key}...`);
    const result = await fetchModelsForType(type, referenceCode);
    totals[type.key] = {
      brands: result.brands,
      models: result.vehicles.length
    };
    vehicles.push(...result.vehicles);
  }

  vehicles.sort(
    (first, second) =>
      first.type.localeCompare(second.type) ||
      first.brand.localeCompare(second.brand, "pt-BR") ||
      first.model.localeCompare(second.model, "pt-BR")
  );

  await mkdir(dirname(outputPath), { recursive: true });
  const payload = {
    generatedAt: startedAt.toISOString(),
    source: apiBaseUrl,
    reference: reference
      ? {
          code: String(reference.code || ""),
          month: String(reference.month || "")
        }
      : null,
    totals: {
      ...totals,
      all: vehicles.length
    },
    vehicles
  };

  const tempPath = `${outputPath}.tmp`;
  const tempScriptPath = `${outputScriptPath}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  await writeFile(
    tempScriptPath,
    `window.localFipeVehicleDatabase = ${JSON.stringify(payload)};\n`,
    "utf8"
  );
  await rename(tempPath, outputPath);
  await rename(tempScriptPath, outputScriptPath);

  console.log(`Banco local FIPE atualizado: ${outputPath}`);
  console.log(`Banco local FIPE para navegador atualizado: ${outputScriptPath}`);
  console.log(`Registros: ${vehicles.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
