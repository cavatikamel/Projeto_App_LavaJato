#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const workspaceRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const summary = [];

const adapterFiles = {
  customer: "app/adapters/customerAdapter.js",
  vehicle: "app/adapters/vehicleAdapter.js"
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
    const customerSource = loadAdapterSource(adapterFiles.customer);
    const vehicleSource = loadAdapterSource(adapterFiles.vehicle);

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

    const customerModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.customer)).href);
    const vehicleModule = await import(pathToFileURL(resolve(workspaceRoot, adapterFiles.vehicle)).href);

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
    const customerMissingDocumentLegacy = {
      id: "42",
      personType: "PF",
      name: "Cliente Sem Documento"
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

    await runCheck("Customer Adapter Invalid Required Field Scenario", () => {
      const result = customerModule.toCustomerContract(customerMissingDocumentLegacy, customerContext);

      assert(result.ok === false, "customer invalid required field result should fail.");
      assertValidationShape(result.validation, "customer invalid required field validation");
      assert(result.validation.ok === false, "customer invalid required field validation.ok should be false.");
      assert(result.validation.blocking === true, "customer invalid required field validation should be blocking.");
      assert(
        result.missingRequiredFields.includes("document"),
        "customer invalid required field should report missing document."
      );
      assertWarningsArray(result, "customer invalid required field result");
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
