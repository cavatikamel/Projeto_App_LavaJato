#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const workspaceRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const summary = [];

const adapterFiles = {
  helper: "app/adapters/shared/adapterHelpers.js",
  resolver: "app/adapters/shared/idResolver.js",
  customer: "app/adapters/customerAdapter.js",
  vehicle: "app/adapters/vehicleAdapter.js",
  service: "app/adapters/serviceAdapter.js",
  product: "app/adapters/productAdapter.js",
  supply: "app/adapters/supplyAdapter.js"
};

const forbiddenRuntimePatterns = [
  { label: "window reference", pattern: /\bwindow\b/ },
  { label: "localStorage reference", pattern: /\blocalStorage\b/ },
  { label: "Supabase reference", pattern: /\bsupabase\b/i },
  { label: "app/main.js import", pattern: /from\s+["'][^"']*main\.js["']/ },
  { label: "DOM document reference", pattern: /\bdocument\./ },
  { label: "DOM query API reference", pattern: /\bquerySelector\b/ },
  { label: "DOM element creation reference", pattern: /\bcreateElement\b/ }
];

function record(status, label, detail = "") {
  summary.push({ status, label, detail });
  const suffix = detail ? ` - ${detail}` : "";
  const line = `${status} ${label}${suffix}`;

  if (status === "FAIL") {
    console.error(line);
    return;
  }

  console.log(line);
}

async function runCheck(label, callback) {
  try {
    await callback();
    record("PASS", label);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    record("FAIL", label, detail);
    throw error;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function loadAdapterSource(relativePath) {
  return readFileSync(resolve(workspaceRoot, relativePath), "utf8");
}

function assertValidationShape(validation, label) {
  assert(validation && typeof validation === "object", `${label} must exist.`);
  assert(typeof validation.ok === "boolean", `${label}.ok must be boolean.`);
  assert(Array.isArray(validation.errors), `${label}.errors must be an array.`);
  assert(
    Array.isArray(validation.missingRequiredFields),
    `${label}.missingRequiredFields must be an array.`
  );
  assert(typeof validation.blocking === "boolean", `${label}.blocking must be boolean.`);
}

function assertEnvelopeShape(envelope, expected) {
  assert(envelope && typeof envelope === "object", `${expected.label} must be an object.`);
  assert(envelope.contractName === expected.contractName, `${expected.label}.contractName mismatch.`);
  assert(envelope.contractVersion === expected.contractVersion, `${expected.label}.contractVersion mismatch.`);
  assert(envelope.organizationId === expected.organizationId, `${expected.label}.organizationId mismatch.`);
  assert(envelope.sourceId === expected.sourceId, `${expected.label}.sourceId mismatch.`);
  assert(typeof envelope.payload === "object" && envelope.payload !== null, `${expected.label}.payload must exist.`);
  assert(Array.isArray(envelope.warnings), `${expected.label}.warnings must be an array.`);
  assertValidationShape(envelope.validation, `${expected.label}.validation`);
  assert(typeof envelope.metadata === "object" && envelope.metadata !== null, `${expected.label}.metadata must exist.`);
  assert(envelope.metadata.emittedAt === expected.emittedAt, `${expected.label}.metadata.emittedAt mismatch.`);
  assert(envelope.createdAt === expected.createdAt, `${expected.label}.createdAt mismatch.`);
  assert(envelope.updatedAt === expected.updatedAt, `${expected.label}.updatedAt mismatch.`);
}

function assertWarningsArray(result, label) {
  assert(Array.isArray(result.warnings), `${label}.warnings must be an array.`);
}

function assertResolutionShape(result, label) {
  assert(result && typeof result === "object", `${label} must be an object.`);
  assert(typeof result.ok === "boolean", `${label}.ok must be boolean.`);
  assert(typeof result.blocking === "boolean", `${label}.blocking must be boolean.`);
  assert(typeof result.code === "string", `${label}.code must be string.`);
  assert(typeof result.reason === "string", `${label}.reason must be string.`);
  assert(Array.isArray(result.matches), `${label}.matches must be an array.`);
  assertWarningsArray(result, label);
  assertValidationShape(result.validation, `${label}.validation`);
}

function assertFailureCodeAndReason(result, label, expectedCode) {
  assertResolutionShape(result, label);
  assert(result.ok === false, `${label}.ok should be false.`);
  assert(result.validation.ok === false, `${label}.validation.ok should be false.`);
  assert(result.validation.blocking === true, `${label}.validation.blocking should be true.`);
  assert(typeof result.code === "string" && result.code.length > 0, `${label}.code should be explicit.`);
  assert(
    typeof result.reason === "string" && result.reason.length > 0,
    `${label}.reason should be explicit.`
  );

  if (expectedCode) {
    assert(result.code === expectedCode, `${label}.code should be ${expectedCode}.`);
  }
}

function assertInputNotMutated(beforeSnapshot, afterValue, label) {
  assert(beforeSnapshot === JSON.stringify(afterValue), `${label} mutated the legacy input fixture.`);
}

function printSummary(result) {
  console.log("\nPrimyo Adapter Gate Summary");

  for (const item of summary) {
    const suffix = item.detail ? ` - ${item.detail}` : "";
    console.log(`${item.status} ${item.label}${suffix}`);
  }

  console.log(`\nAdapter Gate Result: ${result}`);
}

async function main() {
  console.log("Primyo Adapter Regression Gate");
  console.log(`Workspace: ${workspaceRoot}`);

  try {
    const helperSource = loadAdapterSource(adapterFiles.helper);
    const resolverSource = loadAdapterSource(adapterFiles.resolver);
    const customerSource = loadAdapterSource(adapterFiles.customer);
    const vehicleSource = loadAdapterSource(adapterFiles.vehicle);
    const serviceSource = loadAdapterSource(adapterFiles.service);
    const productSource = loadAdapterSource(adapterFiles.product);
    const supplySource = loadAdapterSource(adapterFiles.supply);

    await runCheck("Adapter Helper Runtime Independence", () => {
      for (const entry of forbiddenRuntimePatterns) {
        assert(!entry.pattern.test(helperSource), `adapterHelpers contains forbidden ${entry.label}.`);
      }
    });

    await runCheck("Id Resolver Runtime Independence", () => {
      for (const entry of forbiddenRuntimePatterns) {
        assert(!entry.pattern.test(resolverSource), `idResolver contains forbidden ${entry.label}.`);
      }
    });

    await runCheck("Customer Adapter Runtime Independence", () => {
      for (const entry of forbiddenRuntimePatterns) {
        assert(!entry.pattern.test(customerSource), `customerAdapter contains forbidden ${entry.label}.`);
      }
    });

    await runCheck("Vehicle Adapter Runtime Independence", () => {
      for (const entry of forbiddenRuntimePatterns) {
        assert(!entry.pattern.test(vehicleSource), `vehicleAdapter contains forbidden ${entry.label}.`);
      }
    });

    await runCheck("Service Adapter Runtime Independence", () => {
      for (const entry of forbiddenRuntimePatterns) {
        assert(!entry.pattern.test(serviceSource), `serviceAdapter contains forbidden ${entry.label}.`);
      }
    });

    await runCheck("Product Adapter Runtime Independence", () => {
      for (const entry of forbiddenRuntimePatterns) {
        assert(!entry.pattern.test(productSource), `productAdapter contains forbidden ${entry.label}.`);
      }
    });

    await runCheck("Supply Adapter Runtime Independence", () => {
      for (const entry of forbiddenRuntimePatterns) {
        assert(!entry.pattern.test(supplySource), `supplyAdapter contains forbidden ${entry.label}.`);
      }
    });

    const helperModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.helper)).href);
    const resolverModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.resolver)).href);
    const customerModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.customer)).href);
    const vehicleModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.vehicle)).href);
    const serviceModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.service)).href);
    const productModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.product)).href);
    const supplyModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.supply)).href);

    await runCheck("Adapter Helper Imports", () => {
      assert(typeof helperModule.normalizeSourceId === "function", "normalizeSourceId export is missing.");
      assert(typeof helperModule.buildCanonicalId === "function", "buildCanonicalId export is missing.");
      assert(typeof helperModule.createError === "function", "createError export is missing.");
      assert(typeof helperModule.createWarning === "function", "createWarning export is missing.");
      assert(
        typeof helperModule.createValidationResult === "function",
        "createValidationResult export is missing."
      );
      assert(
        typeof helperModule.mergeValidationResults === "function",
        "mergeValidationResults export is missing."
      );
      assert(typeof helperModule.toValidationSummary === "function", "toValidationSummary export is missing.");
      assert(typeof helperModule.createMetadata === "function", "createMetadata export is missing.");
      assert(typeof helperModule.normalizeLegacyRefs === "function", "normalizeLegacyRefs export is missing.");
      assert(typeof helperModule.createContractEnvelope === "function", "createContractEnvelope export is missing.");
    });

    await runCheck("Id Resolver Imports", () => {
      assert(
        typeof resolverModule.createResolutionIndex === "function",
        "createResolutionIndex export is missing."
      );
      assert(
        typeof resolverModule.resolveCanonicalId === "function",
        "resolveCanonicalId export is missing."
      );
      assert(
        typeof resolverModule.resolveLegacyReference === "function",
        "resolveLegacyReference export is missing."
      );
      assert(
        typeof resolverModule.createResolutionResult === "function",
        "createResolutionResult export is missing."
      );
      assert(
        typeof resolverModule.ID_RESOLVER_VERSION === "string",
        "ID_RESOLVER_VERSION export is missing."
      );
    });

    await runCheck("Adapters Use Shared Helpers", () => {
      assert(
        customerSource.includes('./shared/adapterHelpers.js'),
        "customerAdapter should import the shared adapter helpers module."
      );
      assert(
        vehicleSource.includes('./shared/adapterHelpers.js'),
        "vehicleAdapter should import the shared adapter helpers module."
      );
      assert(
        serviceSource.includes('./shared/adapterHelpers.js'),
        "serviceAdapter should import the shared adapter helpers module."
      );
      assert(
        productSource.includes('./shared/adapterHelpers.js'),
        "productAdapter should import the shared adapter helpers module."
      );
      assert(
        supplySource.includes('./shared/adapterHelpers.js'),
        "supplyAdapter should import the shared adapter helpers module."
      );
    });

    await runCheck("Id Resolver Uses Shared Helpers", () => {
      assert(
        resolverSource.includes('./adapterHelpers.js'),
        "idResolver should import the shared adapter helpers module."
      );
    });

    await runCheck("Customer Adapter Imports", () => {
      assert(typeof customerModule.toCustomerContract === "function", "toCustomerContract export is missing.");
      assert(
        typeof customerModule.validateCustomerContract === "function",
        "validateCustomerContract export is missing."
      );
      assert(
        typeof customerModule.createCustomerContractEnvelope === "function",
        "createCustomerContractEnvelope export is missing."
      );
      assert(typeof customerModule.CUSTOMER_CONTRACT_NAME === "string", "CUSTOMER_CONTRACT_NAME export is missing.");
      assert(
        typeof customerModule.CUSTOMER_CONTRACT_VERSION === "string",
        "CUSTOMER_CONTRACT_VERSION export is missing."
      );
    });

    await runCheck("Vehicle Adapter Imports", () => {
      assert(typeof vehicleModule.toVehicleContract === "function", "toVehicleContract export is missing.");
      assert(
        typeof vehicleModule.validateVehicleContract === "function",
        "validateVehicleContract export is missing."
      );
      assert(
        typeof vehicleModule.createVehicleContractEnvelope === "function",
        "createVehicleContractEnvelope export is missing."
      );
      assert(typeof vehicleModule.VEHICLE_CONTRACT_NAME === "string", "VEHICLE_CONTRACT_NAME export is missing.");
      assert(
        typeof vehicleModule.VEHICLE_CONTRACT_VERSION === "string",
        "VEHICLE_CONTRACT_VERSION export is missing."
      );
    });

    await runCheck("Service Adapter Imports", () => {
      assert(typeof serviceModule.toServiceContract === "function", "toServiceContract export is missing.");
      assert(
        typeof serviceModule.validateServiceContract === "function",
        "validateServiceContract export is missing."
      );
      assert(
        typeof serviceModule.createServiceContractEnvelope === "function",
        "createServiceContractEnvelope export is missing."
      );
      assert(typeof serviceModule.SERVICE_CONTRACT_NAME === "string", "SERVICE_CONTRACT_NAME export is missing.");
      assert(
        typeof serviceModule.SERVICE_CONTRACT_VERSION === "string",
        "SERVICE_CONTRACT_VERSION export is missing."
      );
    });

    await runCheck("Product Adapter Imports", () => {
      assert(typeof productModule.toProductContract === "function", "toProductContract export is missing.");
      assert(
        typeof productModule.validateProductContract === "function",
        "validateProductContract export is missing."
      );
      assert(
        typeof productModule.createProductContractEnvelope === "function",
        "createProductContractEnvelope export is missing."
      );
      assert(typeof productModule.PRODUCT_CONTRACT_NAME === "string", "PRODUCT_CONTRACT_NAME export is missing.");
      assert(
        typeof productModule.PRODUCT_CONTRACT_VERSION === "string",
        "PRODUCT_CONTRACT_VERSION export is missing."
      );
    });

    await runCheck("Supply Adapter Imports", () => {
      assert(typeof supplyModule.toSupplyContract === "function", "toSupplyContract export is missing.");
      assert(
        typeof supplyModule.validateSupplyContract === "function",
        "validateSupplyContract export is missing."
      );
      assert(
        typeof supplyModule.createSupplyContractEnvelope === "function",
        "createSupplyContractEnvelope export is missing."
      );
      assert(typeof supplyModule.SUPPLY_CONTRACT_NAME === "string", "SUPPLY_CONTRACT_NAME export is missing.");
      assert(
        typeof supplyModule.SUPPLY_CONTRACT_VERSION === "string",
        "SUPPLY_CONTRACT_VERSION export is missing."
      );
    });

    const customerContext = {
      organizationId: "org_primyo",
      now: "2026-06-26T12:00:00Z",
      defaultStatus: "active",
      source: "web.clientRegistry",
      sourceId: "42",
      strictMode: true,
      allowWarnings: true
    };
    const customerValidLegacy = {
      id: "42",
      personType: "PF",
      name: "Joao Cliente",
      document: "123.456.789-01",
      phone: "(11) 99999-0000",
      billingApproved: true
    };
    const customerCommonMissingDocumentLegacy = {
      id: "77",
      personType: "PF",
      name: "Cliente Comum Sem Documento",
      phone: "(11) 98888-0000",
      billingApproved: false
    };
    const customerBilledMissingDocumentLegacy = {
      id: "42",
      personType: "PF",
      name: "Cliente Faturado Sem Documento",
      phone: "(11) 97777-0000",
      billingApproved: true
    };

    await runCheck("Customer Adapter Valid Scenario", () => {
      const legacySnapshot = JSON.stringify(customerValidLegacy);
      const result = customerModule.toCustomerContract(customerValidLegacy, customerContext);

      assert(result.ok === true, "valid customer result should be ok.");
      assertValidationShape(result.validation, "customer valid result.validation");
      assert(result.validation.ok === true, "customer valid result.validation.ok should be true.");
      assertWarningsArray(result, "customer valid result");
      assert(result.sourceId === customerContext.sourceId, "customer valid result should preserve sourceId.");
      assert(result.customerContract.organizationId === customerContext.organizationId, "customer organizationId should come from context.");
      assert(result.customerContract.createdAt === customerContext.now, "customer createdAt should come from context.now.");
      assert(result.customerContract.updatedAt === customerContext.now, "customer updatedAt should come from context.now.");
      assert(
        result.customerContract.id !== result.sourceId,
        "customer canonical id should remain separated from sourceId."
      );
      assert(
        result.customerContract.id.startsWith("customer:legacy:"),
        "customer canonical id should follow the shared namespace strategy."
      );
      assertInputNotMutated(legacySnapshot, customerValidLegacy, "customerAdapter");

      const envelopeResult = customerModule.createCustomerContractEnvelope(result.customerContract, customerContext);
      assert(envelopeResult.ok === true, "customer envelope should be valid.");
      assertValidationShape(envelopeResult.validation, "customer envelope result.validation");
      assertWarningsArray(envelopeResult, "customer envelope result");
      assertEnvelopeShape(envelopeResult.customerContractEnvelope, {
        label: "customerContractEnvelope",
        contractName: customerModule.CUSTOMER_CONTRACT_NAME,
        contractVersion: customerModule.CUSTOMER_CONTRACT_VERSION,
        organizationId: customerContext.organizationId,
        sourceId: customerContext.sourceId,
        emittedAt: customerContext.now,
        createdAt: customerContext.now,
        updatedAt: customerContext.now
      });
    });

    await runCheck("Customer Adapter Common Customer Missing Document Scenario", () => {
      const result = customerModule.toCustomerContract(customerCommonMissingDocumentLegacy, {
        ...customerContext,
        sourceId: "77"
      });

      assert(result.ok === true, "common customer missing document should remain valid.");
      assertValidationShape(result.validation, "customer common missing document validation");
      assert(result.validation.ok === true, "customer common missing document validation.ok should be true.");
      assert(result.missingRequiredFields.includes("document") === false, "common customer missing document should not report missing document.");
      assert(
        result.warnings.some((warning) => warning.includes("PAYLOAD_COMMON_DOCUMENT_RECOMMENDED")),
        "common customer missing document should emit PAYLOAD_COMMON_DOCUMENT_RECOMMENDED."
      );
      assertWarningsArray(result, "customer common missing document result");
    });

    await runCheck("Customer Adapter Billed Customer Missing Document Scenario", () => {
      const result = customerModule.toCustomerContract(customerBilledMissingDocumentLegacy, customerContext);

      assert(result.ok === false, "customer billed missing document result should fail.");
      assertValidationShape(result.validation, "customer billed missing document validation");
      assert(result.validation.ok === false, "customer billed missing document validation.ok should be false.");
      assert(result.validation.blocking === true, "customer billed missing document validation should be blocking.");
      assert(
        result.missingRequiredFields.includes("document"),
        "customer billed missing document should report missing document."
      );
      assert(
        result.errors.some((error) => error.includes("PAYLOAD_BILLED_DOCUMENT_REQUIRED")),
        "customer billed missing document should emit PAYLOAD_BILLED_DOCUMENT_REQUIRED."
      );
      assertWarningsArray(result, "customer billed missing document result");
    });

    await runCheck("Customer Adapter Invalid Context Scenario", () => {
      const result = customerModule.toCustomerContract(customerValidLegacy, {
        ...customerContext,
        organizationId: ""
      });

      assert(result.ok === false, "customer invalid context result should fail.");
      assertValidationShape(result.validation, "customer invalid context validation");
      assert(
        result.missingRequiredFields.includes("organizationId"),
        "customer invalid context should report missing organizationId."
      );
      assert(
        result.warnings.some((warning) => warning.includes("CTX_ORGANIZATION_ID_REQUIRED")),
        "customer invalid context should report CTX_ORGANIZATION_ID_REQUIRED."
      );
    });

    const vehicleContext = {
      organizationId: "org_primyo",
      now: "2026-06-26T12:00:00Z",
      defaultStatus: "active",
      source: "web.vehicleRegistry",
      sourceId: "84",
      strictMode: true,
      allowWarnings: true
    };
    const vehicleValidLegacy = {
      id: "84",
      currentClientId: "42",
      plate: "ABC1D23",
      brand: "Fiat",
      model: "Uno",
      type: "hatch",
      color: "Prata"
    };
    const vehicleMissingPlateLegacy = {
      id: "84",
      currentClientId: "42",
      brand: "Fiat",
      model: "Uno",
      type: "hatch"
    };
    const vehicleMissingSourceLegacy = {
      currentClientId: "42",
      plate: "ABC1D23",
      brand: "Fiat",
      model: "Uno",
      type: "hatch"
    };

    await runCheck("Vehicle Adapter Valid Scenario", () => {
      const legacySnapshot = JSON.stringify(vehicleValidLegacy);
      const result = vehicleModule.toVehicleContract(vehicleValidLegacy, vehicleContext);

      assert(result.ok === true, "valid vehicle result should be ok.");
      assertValidationShape(result.validation, "vehicle valid result.validation");
      assert(result.validation.ok === true, "vehicle valid result.validation.ok should be true.");
      assertWarningsArray(result, "vehicle valid result");
      assert(result.sourceId === vehicleContext.sourceId, "vehicle valid result should preserve sourceId.");
      assert(result.vehicleContract.organizationId === vehicleContext.organizationId, "vehicle organizationId should come from context.");
      assert(result.vehicleContract.createdAt === vehicleContext.now, "vehicle createdAt should come from context.now.");
      assert(result.vehicleContract.updatedAt === vehicleContext.now, "vehicle updatedAt should come from context.now.");
      assert(
        result.vehicleContract.id !== result.sourceId,
        "vehicle canonical id should remain separated from sourceId."
      );
      assert(
        result.vehicleContract.id.startsWith("vehicle:legacy:"),
        "vehicle canonical id should follow the shared namespace strategy."
      );
      assertInputNotMutated(legacySnapshot, vehicleValidLegacy, "vehicleAdapter");

      const envelopeResult = vehicleModule.createVehicleContractEnvelope(result.vehicleContract, vehicleContext);
      assert(envelopeResult.ok === true, "vehicle envelope should be valid.");
      assertValidationShape(envelopeResult.validation, "vehicle envelope result.validation");
      assertWarningsArray(envelopeResult, "vehicle envelope result");
      assertEnvelopeShape(envelopeResult.vehicleContractEnvelope, {
        label: "vehicleContractEnvelope",
        contractName: vehicleModule.VEHICLE_CONTRACT_NAME,
        contractVersion: vehicleModule.VEHICLE_CONTRACT_VERSION,
        organizationId: vehicleContext.organizationId,
        sourceId: vehicleContext.sourceId,
        emittedAt: vehicleContext.now,
        createdAt: vehicleContext.now,
        updatedAt: vehicleContext.now
      });
    });

    await runCheck("Vehicle Adapter Invalid Required Field Scenario", () => {
      const result = vehicleModule.toVehicleContract(vehicleMissingPlateLegacy, vehicleContext);

      assert(result.ok === false, "vehicle invalid required field result should fail.");
      assertValidationShape(result.validation, "vehicle invalid required field validation");
      assert(result.validation.ok === false, "vehicle invalid required field validation.ok should be false.");
      assert(result.validation.blocking === true, "vehicle invalid required field validation should be blocking.");
      assert(
        result.missingRequiredFields.includes("plate"),
        "vehicle invalid required field should report missing plate."
      );
      assertWarningsArray(result, "vehicle invalid required field result");
    });

    await runCheck("Vehicle Adapter Invalid Context Scenario", () => {
      const result = vehicleModule.toVehicleContract(vehicleMissingSourceLegacy, {
        ...vehicleContext,
        sourceId: ""
      });

      assert(result.ok === false, "vehicle invalid context result should fail.");
      assertValidationShape(result.validation, "vehicle invalid context validation");
      assert(result.missingRequiredFields.includes("sourceId"), "vehicle invalid context should report missing sourceId.");
      assert(result.missingRequiredFields.includes("id"), "vehicle invalid context should report missing id.");
      assert(
        result.warnings.some((warning) => warning.includes("CTX_SOURCE_ID_REQUIRED")),
        "vehicle invalid context should report CTX_SOURCE_ID_REQUIRED."
      );
    });

    const serviceContext = {
      organizationId: "org_primyo",
      now: "2026-06-26T12:00:00.000Z",
      defaultStatus: "active",
      source: "web.serviceCatalog",
      sourceId: "seed-service-1",
      strictMode: true,
      allowWarnings: true
    };
    const serviceValidLegacy = {
      name: "Lavagem Prime",
      price: 65,
      duration: "35 min",
      vehicleType: "Carro",
      vehicleCategory: "Hatch",
      status: "Ativo",
      autoCreateVehicleCareType: "",
      maintenanceRequired: false,
      maintenanceInterval: "monthly",
      maintenanceDate: ""
    };
    const serviceMissingNameLegacy = {
      price: 65,
      duration: "35 min",
      vehicleType: "Carro",
      vehicleCategory: "Hatch",
      status: "Ativo",
      maintenanceRequired: false
    };
    const serviceMissingSourceLegacy = {
      name: "Lavagem Prime",
      price: 65,
      duration: "35 min",
      vehicleType: "Carro",
      vehicleCategory: "Hatch",
      status: "Ativo"
    };

    await runCheck("Service Adapter Valid Scenario", () => {
      const legacySnapshot = JSON.stringify(serviceValidLegacy);
      const result = serviceModule.toServiceContract(serviceValidLegacy, serviceContext);

      assert(result.ok === true, "valid service result should be ok.");
      assertValidationShape(result.validation, "service valid result.validation");
      assert(result.validation.ok === true, "service valid result.validation.ok should be true.");
      assertWarningsArray(result, "service valid result");
      assert(result.sourceId === serviceContext.sourceId, "service valid result should preserve sourceId.");
      assert(result.serviceContract.organizationId === serviceContext.organizationId, "service organizationId should come from context.");
      assert(result.serviceContract.createdAt === serviceContext.now, "service createdAt should come from context.now.");
      assert(result.serviceContract.updatedAt === serviceContext.now, "service updatedAt should come from context.now.");
      assert(result.serviceContract.durationMinutes === 35, "service durationMinutes should parse legacy duration.");
      assert(result.serviceContract.isActive === true, "service isActive should reflect active legacy status.");
      assert(
        result.serviceContract.id !== result.sourceId,
        "service canonical id should remain separated from sourceId."
      );
      assert(
        result.serviceContract.id.startsWith("service:legacy:"),
        "service canonical id should follow the shared namespace strategy."
      );
      assertInputNotMutated(legacySnapshot, serviceValidLegacy, "serviceAdapter");

      const envelopeResult = serviceModule.createServiceContractEnvelope(result.serviceContract, serviceContext);
      assert(envelopeResult.ok === true, "service envelope should be valid.");
      assertValidationShape(envelopeResult.validation, "service envelope result.validation");
      assertWarningsArray(envelopeResult, "service envelope result");
      assertEnvelopeShape(envelopeResult.serviceContractEnvelope, {
        label: "serviceContractEnvelope",
        contractName: serviceModule.SERVICE_CONTRACT_NAME,
        contractVersion: serviceModule.SERVICE_CONTRACT_VERSION,
        organizationId: serviceContext.organizationId,
        sourceId: serviceContext.sourceId,
        emittedAt: serviceContext.now,
        createdAt: serviceContext.now,
        updatedAt: serviceContext.now
      });
    });

    await runCheck("Service Adapter Invalid Required Field Scenario", () => {
      const result = serviceModule.toServiceContract(serviceMissingNameLegacy, serviceContext);

      assert(result.ok === false, "service invalid required field result should fail.");
      assertValidationShape(result.validation, "service invalid required field validation");
      assert(result.validation.ok === false, "service invalid required field validation.ok should be false.");
      assert(result.validation.blocking === true, "service invalid required field validation should be blocking.");
      assert(
        result.missingRequiredFields.includes("name"),
        "service invalid required field should report missing name."
      );
      assertWarningsArray(result, "service invalid required field result");
    });

    await runCheck("Service Adapter Invalid Source Scenario", () => {
      const result = serviceModule.toServiceContract(serviceMissingSourceLegacy, {
        ...serviceContext,
        sourceId: ""
      });

      assert(result.ok === false, "service invalid source result should fail.");
      assertValidationShape(result.validation, "service invalid source validation");
      assert(
        result.missingRequiredFields.includes("sourceId"),
        "service invalid source should report missing sourceId."
      );
      assert(result.missingRequiredFields.includes("id"), "service invalid source should report missing id.");
      assert(
        result.warnings.some((warning) => warning.includes("CTX_SOURCE_ID_REQUIRED")),
        "service invalid source should report CTX_SOURCE_ID_REQUIRED."
      );
    });

    await runCheck("Service Adapter Invalid Context Scenario", () => {
      const result = serviceModule.toServiceContract(serviceValidLegacy, {
        ...serviceContext,
        organizationId: ""
      });

      assert(result.ok === false, "service invalid context result should fail.");
      assertValidationShape(result.validation, "service invalid context validation");
      assert(
        result.missingRequiredFields.includes("organizationId"),
        "service invalid context should report missing organizationId."
      );
      assert(
        result.warnings.some((warning) => warning.includes("CTX_ORGANIZATION_ID_REQUIRED")),
        "service invalid context should report CTX_ORGANIZATION_ID_REQUIRED."
      );
    });

    const productContext = {
      organizationId: "org_primyo",
      now: "2026-06-26T12:00:00.000Z",
      defaultStatus: "active",
      source: "web.productCatalog",
      sourceId: "55",
      strictMode: true,
      allowWarnings: true
    };
    const productValidLegacy = {
      id: 55,
      sku: "PRD-055",
      name: "Shampoo concentrado premium",
      unit: "un",
      price: 49.9,
      cost: 21.5,
      stock: 12,
      minStock: 4,
      active: true,
      category: "Vitrine",
      notes: "Produto de giro rapido.",
      createdAt: "2026-06-20T10:00:00.000Z",
      updatedAt: "2026-06-26T11:00:00.000Z"
    };
    const productMissingNameLegacy = {
      id: 55,
      sku: "PRD-055",
      unit: "un",
      price: 49.9,
      active: true,
      createdAt: "2026-06-20T10:00:00.000Z",
      updatedAt: "2026-06-26T11:00:00.000Z"
    };
    const productMissingSourceLegacy = {
      sku: "PRD-055",
      name: "Shampoo concentrado premium",
      unit: "un",
      price: 49.9,
      active: true,
      createdAt: "2026-06-20T10:00:00.000Z",
      updatedAt: "2026-06-26T11:00:00.000Z"
    };

    await runCheck("Product Adapter Valid Scenario", () => {
      const legacySnapshot = JSON.stringify(productValidLegacy);
      const result = productModule.toProductContract(productValidLegacy, productContext);

      assert(result.ok === true, "valid product result should be ok.");
      assertValidationShape(result.validation, "product valid result.validation");
      assert(result.validation.ok === true, "product valid result.validation.ok should be true.");
      assertWarningsArray(result, "product valid result");
      assert(result.sourceId === productContext.sourceId, "product valid result should preserve sourceId.");
      assert(result.productContract.organizationId === productContext.organizationId, "product organizationId should come from context.");
      assert(result.productContract.createdAt === productValidLegacy.createdAt, "product createdAt should preserve explicit legacy timestamp.");
      assert(result.productContract.updatedAt === productValidLegacy.updatedAt, "product updatedAt should preserve explicit legacy timestamp.");
      assert(result.productContract.salePrice === 49.9, "product salePrice should map from legacy price.");
      assert(result.productContract.costPrice === 21.5, "product costPrice should map from legacy cost.");
      assert(result.productContract.stockBalance === 12, "product stockBalance should map from legacy stock.");
      assert(result.productContract.isActive === true, "product isActive should reflect legacy active state.");
      assert(
        result.productContract.id !== result.sourceId,
        "product canonical id should remain separated from sourceId."
      );
      assert(
        result.productContract.id.startsWith("product:legacy:"),
        "product canonical id should follow the shared namespace strategy."
      );
      assertInputNotMutated(legacySnapshot, productValidLegacy, "productAdapter");

      const envelopeResult = productModule.createProductContractEnvelope(result.productContract, productContext);
      assert(envelopeResult.ok === true, "product envelope should be valid.");
      assertValidationShape(envelopeResult.validation, "product envelope result.validation");
      assertWarningsArray(envelopeResult, "product envelope result");
      assertEnvelopeShape(envelopeResult.productContractEnvelope, {
        label: "productContractEnvelope",
        contractName: productModule.PRODUCT_CONTRACT_NAME,
        contractVersion: productModule.PRODUCT_CONTRACT_VERSION,
        organizationId: productContext.organizationId,
        sourceId: productContext.sourceId,
        emittedAt: productContext.now,
        createdAt: productValidLegacy.createdAt,
        updatedAt: productValidLegacy.updatedAt
      });
    });

    await runCheck("Product Adapter Invalid Required Field Scenario", () => {
      const result = productModule.toProductContract(productMissingNameLegacy, productContext);

      assert(result.ok === false, "product invalid required field result should fail.");
      assertValidationShape(result.validation, "product invalid required field validation");
      assert(result.validation.ok === false, "product invalid required field validation.ok should be false.");
      assert(result.validation.blocking === true, "product invalid required field validation should be blocking.");
      assert(
        result.missingRequiredFields.includes("name"),
        "product invalid required field should report missing name."
      );
      assertWarningsArray(result, "product invalid required field result");
    });

    await runCheck("Product Adapter Invalid Source Scenario", () => {
      const result = productModule.toProductContract(productMissingSourceLegacy, {
        ...productContext,
        sourceId: ""
      });

      assert(result.ok === false, "product invalid source result should fail.");
      assertValidationShape(result.validation, "product invalid source validation");
      assert(
        result.missingRequiredFields.includes("sourceId"),
        "product invalid source should report missing sourceId."
      );
      assert(result.missingRequiredFields.includes("id"), "product invalid source should report missing id.");
      assert(
        result.warnings.some((warning) => warning.includes("CTX_SOURCE_ID_REQUIRED")),
        "product invalid source should report CTX_SOURCE_ID_REQUIRED."
      );
    });

    await runCheck("Product Adapter Invalid Context Scenario", () => {
      const result = productModule.toProductContract(productValidLegacy, {
        ...productContext,
        organizationId: ""
      });

      assert(result.ok === false, "product invalid context result should fail.");
      assertValidationShape(result.validation, "product invalid context validation");
      assert(
        result.missingRequiredFields.includes("organizationId"),
        "product invalid context should report missing organizationId."
      );
      assert(
        result.warnings.some((warning) => warning.includes("CTX_ORGANIZATION_ID_REQUIRED")),
        "product invalid context should report CTX_ORGANIZATION_ID_REQUIRED."
      );
    });

    const supplyContext = {
      organizationId: "org_primyo",
      now: "2026-06-27T12:00:00.000Z",
      defaultStatus: "active",
      source: "web.supplyCatalog",
      sourceId: "12",
      strictMode: true,
      allowWarnings: true
    };
    const supplyValidLegacy = {
      id: 12,
      sku: "INS-012",
      name: "Cera limpadora tecnica",
      unit: "ml",
      cost: 0.08,
      stock: 640,
      minStock: 120,
      active: true,
      supplier: "Lab Prime Care",
      notes: "Uso restrito a acabamento tecnico.",
      riskTags: ["strong_alkaline_product"],
      phType: "neutral",
      phApproximate: "7",
      aggressivenessLevel: "medium",
      safeForCoating: "true",
      safeForWrap: "unknown",
      safeForMattePaint: "true",
      createdAt: "2026-06-20T10:00:00.000Z",
      updatedAt: "2026-06-27T09:00:00.000Z"
    };
    const supplyMissingNameLegacy = {
      id: 12,
      sku: "INS-012",
      unit: "ml",
      cost: 0.08,
      active: true,
      createdAt: "2026-06-20T10:00:00.000Z",
      updatedAt: "2026-06-27T09:00:00.000Z"
    };
    const supplyMissingSourceLegacy = {
      sku: "INS-012",
      name: "Cera limpadora tecnica",
      unit: "ml",
      cost: 0.08,
      active: true,
      createdAt: "2026-06-20T10:00:00.000Z",
      updatedAt: "2026-06-27T09:00:00.000Z"
    };

    await runCheck("Supply Adapter Valid Scenario", () => {
      const legacySnapshot = JSON.stringify(supplyValidLegacy);
      const result = supplyModule.toSupplyContract(supplyValidLegacy, supplyContext);

      assert(result.ok === true, "valid supply result should be ok.");
      assertValidationShape(result.validation, "supply valid result.validation");
      assert(result.validation.ok === true, "supply valid result.validation.ok should be true.");
      assertWarningsArray(result, "supply valid result");
      assert(result.sourceId === supplyContext.sourceId, "supply valid result should preserve sourceId.");
      assert(result.supplyContract.organizationId === supplyContext.organizationId, "supply organizationId should come from context.");
      assert(result.supplyContract.createdAt === supplyValidLegacy.createdAt, "supply createdAt should preserve explicit legacy timestamp.");
      assert(result.supplyContract.updatedAt === supplyValidLegacy.updatedAt, "supply updatedAt should preserve explicit legacy timestamp.");
      assert(result.supplyContract.costPrice === 0.08, "supply costPrice should map from legacy cost.");
      assert(result.supplyContract.stockBalance === 640, "supply stockBalance should map from legacy stock.");
      assert(result.supplyContract.supplierName === "Lab Prime Care", "supply supplierName should map from legacy supplier.");
      assert(Array.isArray(result.supplyContract.riskTags), "supply riskTags should be an array.");
      assert(
        result.supplyContract.compatibilityMetadata?.surfaceSafety?.coating === "true",
        "supply compatibilityMetadata should preserve technical compatibility."
      );
      assert(
        result.supplyContract.id !== result.sourceId,
        "supply canonical id should remain separated from sourceId."
      );
      assert(
        result.supplyContract.id.startsWith("supply:legacy:"),
        "supply canonical id should follow the shared namespace strategy."
      );
      assertInputNotMutated(legacySnapshot, supplyValidLegacy, "supplyAdapter");

      const envelopeResult = supplyModule.createSupplyContractEnvelope(result.supplyContract, supplyContext);
      assert(envelopeResult.ok === true, "supply envelope should be valid.");
      assertValidationShape(envelopeResult.validation, "supply envelope result.validation");
      assertWarningsArray(envelopeResult, "supply envelope result");
      assertEnvelopeShape(envelopeResult.supplyContractEnvelope, {
        label: "supplyContractEnvelope",
        contractName: supplyModule.SUPPLY_CONTRACT_NAME,
        contractVersion: supplyModule.SUPPLY_CONTRACT_VERSION,
        organizationId: supplyContext.organizationId,
        sourceId: supplyContext.sourceId,
        emittedAt: supplyContext.now,
        createdAt: supplyValidLegacy.createdAt,
        updatedAt: supplyValidLegacy.updatedAt
      });
    });

    await runCheck("Supply Adapter Invalid Required Field Scenario", () => {
      const result = supplyModule.toSupplyContract(supplyMissingNameLegacy, supplyContext);

      assert(result.ok === false, "supply invalid required field result should fail.");
      assertValidationShape(result.validation, "supply invalid required field validation");
      assert(result.validation.ok === false, "supply invalid required field validation.ok should be false.");
      assert(result.validation.blocking === true, "supply invalid required field validation should be blocking.");
      assert(
        result.missingRequiredFields.includes("name"),
        "supply invalid required field should report missing name."
      );
      assertWarningsArray(result, "supply invalid required field result");
    });

    await runCheck("Supply Adapter Invalid Source Scenario", () => {
      const result = supplyModule.toSupplyContract(supplyMissingSourceLegacy, {
        ...supplyContext,
        sourceId: ""
      });

      assert(result.ok === false, "supply invalid source result should fail.");
      assertValidationShape(result.validation, "supply invalid source validation");
      assert(
        result.missingRequiredFields.includes("sourceId"),
        "supply invalid source should report missing sourceId."
      );
      assert(result.missingRequiredFields.includes("id"), "supply invalid source should report missing id.");
      assert(
        result.warnings.some((warning) => warning.includes("CTX_SOURCE_ID_REQUIRED")),
        "supply invalid source should report CTX_SOURCE_ID_REQUIRED."
      );
    });

    await runCheck("Supply Adapter Invalid Context Scenario", () => {
      const result = supplyModule.toSupplyContract(supplyValidLegacy, {
        ...supplyContext,
        organizationId: ""
      });

      assert(result.ok === false, "supply invalid context result should fail.");
      assertValidationShape(result.validation, "supply invalid context validation");
      assert(
        result.missingRequiredFields.includes("organizationId"),
        "supply invalid context should report missing organizationId."
      );
      assert(
        result.warnings.some((warning) => warning.includes("CTX_ORGANIZATION_ID_REQUIRED")),
        "supply invalid context should report CTX_ORGANIZATION_ID_REQUIRED."
      );
    });

    const resolverContracts = [
      {
        contractName: "Customer",
        source: "web.clientRegistry",
        sourceId: "42",
        payload: {
          id: "customer:legacy:42",
          organizationId: "org_primyo",
          legacyRefs: {
            clientRegistry: {
              id: "42"
            },
            billingClients: {
              legacyId: "billing-42"
            },
            aliases: {
              displayName: "Joao Cliente"
            }
          }
        }
      },
      {
        contractName: "Vehicle",
        source: "web.vehicleRegistry",
        sourceId: "84",
        payload: {
          id: "vehicle:legacy:84",
          organizationId: "org_primyo",
          legacyRefs: {
            currentClientRef: {
              id: "42"
            },
            historicalPlate: {
              plate: "ABC1D23"
            }
          }
        }
      }
    ];
    const resolverContractsWithoutExplicitId = [
      {
        contractName: "Customer",
        source: "web.clientRegistry",
        sourceId: "55",
        payload: {
          organizationId: "org_primyo",
          legacyRefs: {
            clientRegistry: {
              id: "55"
            }
          }
        }
      }
    ];
    const resolverAmbiguousContracts = [
      {
        contractName: "Vehicle",
        source: "web.vehicleRegistry",
        sourceId: "84",
        payload: {
          id: "vehicle:legacy:84-a",
          organizationId: "org_primyo",
          legacyRefs: {
            currentClientRef: {
              id: "42"
            }
          }
        }
      },
      {
        contractName: "Vehicle",
        source: "web.vehicleRegistry",
        sourceId: "84",
        payload: {
          id: "vehicle:legacy:84-b",
          organizationId: "org_primyo",
          legacyRefs: {
            currentClientRef: {
              id: "77"
            }
          }
        }
      }
    ];
    const resolverLegacyAmbiguousContracts = [
      {
        contractName: "Vehicle",
        source: "web.vehicleRegistry",
        sourceId: "84",
        payload: {
          id: "vehicle:legacy:84",
          organizationId: "org_primyo",
          legacyRefs: {
            currentClientRef: {
              id: "42"
            }
          }
        }
      },
      {
        contractName: "Vehicle",
        source: "web.vehicleRegistry",
        sourceId: "85",
        payload: {
          id: "vehicle:legacy:85",
          organizationId: "org_primyo",
          legacyRefs: {
            currentClientRef: {
              id: "42"
            }
          }
        }
      }
    ];
    const resolverDuplicateContracts = [
      {
        contractName: "Customer",
        source: "web.clientRegistry",
        sourceId: "42",
        payload: {
          id: "customer:legacy:42",
          organizationId: "org_primyo",
          legacyRefs: {
            clientRegistry: {
              id: "42"
            }
          }
        }
      },
      {
        contractName: "Customer",
        source: "web.clientRegistry",
        sourceId: "42",
        payload: {
          id: "customer:legacy:42",
          organizationId: "org_primyo",
          legacyRefs: {
            billingClients: {
              legacyId: "billing-42-duplicate"
            }
          }
        }
      }
    ];
    const resolverInvalidContracts = [
      null,
      7,
      {
        contractName: "Customer",
        payload: {
          organizationId: "org_primyo"
        }
      }
    ];

    await runCheck("Id Resolver Valid Canonical With Entity Type Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const query = {
        canonicalId: "customer:legacy:42",
        contractName: "Customer",
        organizationId: "org_primyo"
      };
      const querySnapshot = JSON.stringify(query);
      const result = resolverModule.resolveCanonicalId(index, query);

      assertResolutionShape(result, "idResolver canonical result");
      assert(result.ok === true, "canonical result should be ok.");
      assert(result.validation.ok === true, "canonical result.validation.ok should be true.");
      assert(result.canonicalId === "customer:legacy:42", "canonical result should preserve canonical id.");
      assert(result.sourceId === "42", "canonical result should preserve sourceId.");
      assert(result.contractName === "Customer", "canonical result should preserve contractName.");
      assert(
        result.canonicalId !== result.sourceId,
        "canonical result should keep canonicalId separated from sourceId."
      );
      assert(
        result.legacyRefs?.clientRegistry?.id === "42",
        "canonical result should preserve legacyRefs."
      );
      assertInputNotMutated(querySnapshot, query, "idResolver canonical query");
    });

    await runCheck("Id Resolver Wrong Entity Type Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveCanonicalId(index, {
        canonicalId: "customer:legacy:42",
        contractName: "Vehicle",
        organizationId: "org_primyo"
      });

      assertFailureCodeAndReason(
        result,
        "idResolver wrong entity type result",
        "CANONICAL_NOT_FOUND"
      );
      assert(result.matches.length === 0, "wrong entity type result should keep matches empty.");
    });

    await runCheck("Id Resolver Valid Legacy Reference With Source Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveLegacyReference(index, {
        contractName: "Customer",
        organizationId: "org_primyo",
        source: "web.clientRegistry",
        refPath: "billingClients.legacyId",
        refValue: "billing-42"
      });

      assertResolutionShape(result, "idResolver legacy reference result");
      assert(result.ok === true, "legacy reference result should be ok.");
      assert(result.validation.ok === true, "legacy reference result.validation.ok should be true.");
      assert(result.canonicalId === "customer:legacy:42", "legacy reference should resolve canonical customer id.");
      assert(result.source === "web.clientRegistry", "legacy reference result should preserve source.");
      assert(result.sourceId === "42", "legacy reference result should preserve sourceId.");
      assert(
        result.legacyRefs?.billingClients?.legacyId === "billing-42",
        "legacy reference result should preserve billing legacy refs."
      );
    });

    await runCheck("Id Resolver Empty Query Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveCanonicalId(index, {});

      assertFailureCodeAndReason(
        result,
        "idResolver missing identifier result",
        "RESOLUTION_IDENTIFIER_REQUIRED"
      );
      assert(
        result.missingRequiredFields.includes("canonicalIdOrSourceId"),
        "missing identifier result should report canonicalIdOrSourceId."
      );
    });

    await runCheck("Id Resolver Ambiguity Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverAmbiguousContracts);
      const result = resolverModule.resolveCanonicalId(index, {
        contractName: "Vehicle",
        organizationId: "org_primyo",
        sourceId: "84"
      });

      assertResolutionShape(result, "idResolver ambiguity result");
      assert(result.ok === false, "ambiguity result should fail.");
      assert(result.validation.ok === false, "ambiguity validation.ok should be false.");
      assert(result.validation.blocking === true, "ambiguity validation should be blocking.");
      assert(result.code === "CANONICAL_AMBIGUOUS", "ambiguity result should expose CANONICAL_AMBIGUOUS.");
      assert(result.matches.length === 2, "ambiguity result should preserve both matches.");
    });

    await runCheck("Id Resolver Legacy Reference Ambiguity Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverLegacyAmbiguousContracts);
      const result = resolverModule.resolveLegacyReference(index, {
        contractName: "Vehicle",
        organizationId: "org_primyo",
        refPath: "currentClientRef.id",
        refValue: "42"
      });

      assertFailureCodeAndReason(
        result,
        "idResolver legacy ambiguity result",
        "LEGACY_REFERENCE_AMBIGUOUS"
      );
      assert(result.matches.length === 2, "legacy ambiguity should preserve both matches.");
    });

    await runCheck("Id Resolver Legacy Reference Not Found Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveLegacyReference(index, {
        contractName: "Vehicle",
        organizationId: "org_primyo",
        refPath: "currentClientRef.id",
        refValue: "999"
      });

      assertFailureCodeAndReason(
        result,
        "idResolver legacy reference not found result",
        "LEGACY_REFERENCE_NOT_FOUND"
      );
      assert(result.matches.length === 0, "legacy reference not found should keep matches empty.");
    });

    await runCheck("Id Resolver Forbidden Name Lookup Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveCanonicalId(index, {
        contractName: "Customer",
        name: "Joao Cliente"
      });

      assertFailureCodeAndReason(
        result,
        "idResolver forbidden name result",
        "FORBIDDEN_LOOKUP_FIELD"
      );
    });

    await runCheck("Id Resolver Forbidden Plate Query Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveCanonicalId(index, {
        contractName: "Vehicle",
        plate: "ABC1D23"
      });

      assertFailureCodeAndReason(
        result,
        "idResolver forbidden plate query result",
        "FORBIDDEN_LOOKUP_FIELD"
      );
    });

    await runCheck("Id Resolver Forbidden Plate Legacy Reference Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveLegacyReference(index, {
        contractName: "Vehicle",
        refPath: "historicalPlate.plate",
        refValue: "ABC1D23"
      });

      assertFailureCodeAndReason(
        result,
        "idResolver forbidden plate result",
        "FORBIDDEN_LEGACY_REFERENCE"
      );
    });

    await runCheck("Id Resolver Contract Without Explicit Id Scenario", () => {
      const contractsSnapshot = JSON.stringify(resolverContractsWithoutExplicitId);
      const index = resolverModule.createResolutionIndex(resolverContractsWithoutExplicitId);
      const result = resolverModule.resolveCanonicalId(index, {
        canonicalId: "customer:legacy:55",
        contractName: "Customer",
        organizationId: "org_primyo"
      });

      assert(index.ok === true, "contract without explicit id index should remain valid.");
      assert(index.entries[0]?.canonicalId === "customer:legacy:55", "contract without explicit id should derive canonical id from sourceId.");
      assertResolutionShape(result, "idResolver contract without explicit id result");
      assert(result.ok === true, "contract without explicit id should resolve successfully.");
      assert(result.canonicalId === "customer:legacy:55", "derived canonical id should be queryable.");
      assertInputNotMutated(
        contractsSnapshot,
        resolverContractsWithoutExplicitId,
        "idResolver contract without explicit id fixture"
      );
    });

    await runCheck("Id Resolver Duplicate Contract Warning Scenario", () => {
      const index = resolverModule.createResolutionIndex(resolverDuplicateContracts);

      assert(index.ok === true, "duplicate contract index should still build.");
      assert(
        index.warnings.some((warning) => warning.includes("INDEX_CANONICAL_ID_AMBIGUOUS")),
        "duplicate contract index should warn about duplicated canonical ids."
      );
      assert(
        index.warnings.some((warning) => warning.includes("INDEX_SOURCE_ID_AMBIGUOUS")),
        "duplicate contract index should warn about duplicated sourceIds."
      );
      assert(
        Array.isArray(index.metadata.duplicateCanonicalIds) &&
          index.metadata.duplicateCanonicalIds.includes("customer:legacy:42"),
        "duplicate contract metadata should preserve duplicated canonical ids."
      );
    });

    await runCheck("Id Resolver Immutability Scenario", () => {
      const contractsSnapshot = JSON.stringify(resolverContracts);
      const index = resolverModule.createResolutionIndex(resolverContracts);
      const result = resolverModule.resolveLegacyReference(index, {
        contractName: "Customer",
        organizationId: "org_primyo",
        source: "web.clientRegistry",
        refPath: "billingClients.legacyId",
        refValue: "billing-42"
      });

      assert(result.ok === true, "immutability scenario should resolve successfully.");
      assertInputNotMutated(contractsSnapshot, resolverContracts, "idResolver contracts fixture");
    });

    await runCheck("Id Resolver Empty Index Scenario", () => {
      const index = resolverModule.createResolutionIndex([]);

      assert(index.ok === true, "empty index should remain valid.");
      assert(index.validation.ok === true, "empty index validation should remain ok.");
      assert(index.entries.length === 0, "empty index should not create entries.");
      assert(index.metadata.entryCount === 0, "empty index should expose entryCount zero.");
    });

    await runCheck("Id Resolver Invalid Entries Scenario", () => {
      const contractsSnapshot = JSON.stringify(resolverInvalidContracts);
      const index = resolverModule.createResolutionIndex(resolverInvalidContracts);

      assert(index.ok === true, "invalid entries array should still produce an index object.");
      assert(index.entries.length === 3, "invalid entries array should preserve entry count.");
      assert(
        index.warnings.some((warning) => warning.includes("INDEX_ENTRY_CANONICAL_ID_MISSING")),
        "invalid entries should warn about missing canonical ids."
      );
      assert(
        index.warnings.some((warning) => warning.includes("INDEX_ENTRY_SOURCE_ID_MISSING")),
        "invalid entries should warn about missing sourceIds."
      );
      assertInputNotMutated(
        contractsSnapshot,
        resolverInvalidContracts,
        "idResolver invalid entries fixture"
      );
    });

    printSummary("SUCCESS");
  } catch (error) {
    if (!summary.some((item) => item.status === "FAIL")) {
      const detail = error instanceof Error ? error.message : String(error);
      record("FAIL", "Adapter Gate", detail);
    }

    printSummary("FAILED");
    process.exitCode = 1;
  }
}

main();
