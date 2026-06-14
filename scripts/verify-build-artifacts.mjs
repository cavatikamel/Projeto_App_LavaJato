import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const workspaceRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDir = resolve(workspaceRoot, "dist");
const distAssetsDir = resolve(distDir, "assets");

const requiredFiles = [
  "index.html",
  "assets/brand/lavaprime-lockup.png",
  "assets/brand/lavaprime-icon.png",
  "assets/data/fipe-veiculos.js",
  "assets/data/fipe-veiculos.json",
  "assets/templates/lavaprime-papel-timbrado.html"
];

const missingFiles = requiredFiles.filter((file) => !existsSync(resolve(distDir, file)));

if (missingFiles.length) {
  throw new Error(`Arquivos obrigatorios ausentes no build: ${missingFiles.join(", ")}`);
}

const assetEntries = existsSync(distAssetsDir) ? readdirSync(distAssetsDir) : [];
const hasBuiltJavascript = assetEntries.some((entry) => /^index-.*\.js$/.test(entry));
const hasBuiltStylesheet = assetEntries.some((entry) => /^index-.*\.css$/.test(entry));

if (!hasBuiltJavascript || !hasBuiltStylesheet) {
  throw new Error("Build do Vite sem arquivos principais de JS/CSS em dist/assets.");
}

const html = readFileSync(resolve(distDir, "index.html"), "utf8");

const expectedHtmlSnippets = ["/assets/"];

const missingSnippets = expectedHtmlSnippets.filter((snippet) => !html.includes(snippet));

if (missingSnippets.length) {
  throw new Error(`index.html publicado sem referencias esperadas: ${missingSnippets.join(", ")}`);
}

const bootstrapBundle = assetEntries.find((entry) => /^index-.*\.js$/.test(entry));

if (!bootstrapBundle) {
  throw new Error("Nao foi possivel localizar o bundle bootstrap do app.");
}

const bootstrapScript = readFileSync(resolve(distAssetsDir, bootstrapBundle), "utf8");

if (!bootstrapScript.includes("/assets/data/fipe-veiculos.js")) {
  throw new Error("Bundle final sem referencia ao script legado da base FIPE.");
}

console.log("Build verificado com sucesso.");
