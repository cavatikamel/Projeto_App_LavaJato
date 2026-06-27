#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const requiredDirectories = [
  "app",
  "app/adapters",
  "app/boundaries",
  "app/storage",
  "app/utils",
  "app/src",
  "scripts"
];

const requiredFiles = [
  "package.json",
  "app/main.js",
  "app/adapters/customerAdapter.js",
  "app/adapters/vehicleAdapter.js",
  "app/adapters/serviceAdapter.js",
  "app/src/main.jsx",
  "app/src/App.jsx",
  "app/boundaries/sessionAccessBoundary.js",
  "app/storage/storageBoundary.js",
  "app/utils/textFormatters.js",
  "scripts/primyo-adapter-gate.mjs",
  "scripts/sync-fipe-local-db.mjs",
  "scripts/verify-build-artifacts.mjs",
  "app/index.html",
  "app/legacy-body.html"
];

const fileIntegrityChecks = [
  {
    file: "app/adapters/customerAdapter.js",
    description: "customer adapter foundation exports",
    snippets: [
      "export const CUSTOMER_CONTRACT_NAME",
      "export const CUSTOMER_CONTRACT_VERSION",
      "export function toCustomerContract",
      "export function validateCustomerContract",
      "export function createCustomerContractEnvelope"
    ]
  },
  {
    file: "app/adapters/vehicleAdapter.js",
    description: "vehicle adapter foundation exports",
    snippets: [
      "export const VEHICLE_CONTRACT_NAME",
      "export const VEHICLE_CONTRACT_VERSION",
      "export function toVehicleContract",
      "export function validateVehicleContract",
      "export function createVehicleContractEnvelope"
    ]
  },
  {
    file: "app/adapters/serviceAdapter.js",
    description: "service adapter foundation exports",
    snippets: [
      "export const SERVICE_CONTRACT_NAME",
      "export const SERVICE_CONTRACT_VERSION",
      "export function toServiceContract",
      "export function validateServiceContract",
      "export function createServiceContractEnvelope"
    ]
  },
  {
    file: "app/main.js",
    description: "critical imports and boundary exposure",
    snippets: [
      "./boundaries/sessionAccessBoundary.js",
      "./storage/storageBoundary.js",
      "./utils/textFormatters.js",
      "window.__lavaprimeSessionBoundary = sessionBoundary;",
      "window.__lavaprimeAccessBoundary = accessBoundary;"
    ]
  },
  {
    file: "app/boundaries/sessionAccessBoundary.js",
    description: "session and access boundary factories",
    snippets: [
      "export function createSessionBoundary",
      "export function createAccessBoundary"
    ]
  },
  {
    file: "app/storage/storageBoundary.js",
    description: "storage boundary contract",
    snippets: [
      "export function createStorageBoundary",
      "export const storageBoundary = createStorageBoundary();"
    ]
  },
  {
    file: "app/utils/textFormatters.js",
    description: "critical text formatter exports",
    snippets: [
      "export function capitalize",
      "export function escapeHtml",
      "export function cssEscape",
      "export function normalizeText",
      "export function onlyDigits",
      "export function formatPlate",
      "export function formatPhone",
      "export function formatCpf",
      "export function formatCnpj"
    ]
  }
];

const summary = [];

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

function formatCommand(command, args) {
  return [command, ...args].join(" ");
}

function runCommand(label, command, args) {
  console.log(`\n> ${formatCommand(command, args)}`);
  const shouldUseCmd = process.platform === "win32" && command.endsWith(".cmd");
  const executable = shouldUseCmd ? process.env.ComSpec || "cmd.exe" : command;
  const executableArgs = shouldUseCmd ? ["/d", "/s", "/c", command, ...args] : args;

  return new Promise((resolveStep, rejectStep) => {
    const child = spawn(executable, executableArgs, {
      cwd: workspaceRoot,
      stdio: "inherit",
      windowsHide: true
    });

    child.on("error", (error) => {
      record("FAIL", label, error.message);
      rejectStep(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        record("PASS", label);
        resolveStep();
        return;
      }

      const error = new Error(`${label} failed with exit code ${code}`);
      record("FAIL", label, `exit code ${code}`);
      rejectStep(error);
    });
  });
}

function runPreflight() {
  if (!process.version) {
    throw new Error("Node version unavailable.");
  }

  record("PASS", "Preflight", `Node ${process.version}`);
}

function verifyRequiredDirectories() {
  const missingDirectories = [];
  const invalidDirectories = [];

  for (const directory of requiredDirectories) {
    const absolutePath = resolve(workspaceRoot, directory);
    if (!existsSync(absolutePath)) {
      missingDirectories.push(directory);
      continue;
    }

    if (!statSync(absolutePath).isDirectory()) {
      invalidDirectories.push(directory);
    }
  }

  if (missingDirectories.length || invalidDirectories.length) {
    const details = [];

    if (missingDirectories.length) {
      details.push(`missing: ${missingDirectories.join(", ")}`);
    }

    if (invalidDirectories.length) {
      details.push(`invalid: ${invalidDirectories.join(", ")}`);
    }

    throw new Error(`Required directories check failed (${details.join(" | ")})`);
  }

  record("PASS", "Required Directories");
}

function verifyRequiredFiles() {
  const missingFiles = requiredFiles.filter((file) => !existsSync(resolve(workspaceRoot, file)));

  if (missingFiles.length) {
    throw new Error(`Required files missing: ${missingFiles.join(", ")}`);
  }

  record("PASS", "Required Files");
}

function verifyFileIntegrity() {
  for (const integrityCheck of fileIntegrityChecks) {
    const absolutePath = resolve(workspaceRoot, integrityCheck.file);
    const fileContent = readFileSync(absolutePath, "utf8");
    const missingSnippets = integrityCheck.snippets.filter((snippet) => !fileContent.includes(snippet));

    if (missingSnippets.length) {
      throw new Error(
        `Integrity check failed for ${integrityCheck.file} (${integrityCheck.description}): ${missingSnippets.join(", ")}`
      );
    }
  }

  record("PASS", "Critical Module Integrity");
}

function printSummary(result) {
  console.log("\nPrimyo Gate Summary");

  for (const item of summary) {
    const suffix = item.detail ? ` - ${item.detail}` : "";
    console.log(`${item.status} ${item.label}${suffix}`);
  }

  console.log(`\nGate Result: ${result}`);
}

async function main() {
  console.log("Primyo Engineering Gate");
  console.log(`Workspace: ${workspaceRoot}`);

  try {
    runPreflight();
    verifyRequiredDirectories();
    verifyRequiredFiles();
    verifyFileIntegrity();

    await runCommand("Syntax app/adapters/customerAdapter.js", process.execPath, [
      "--check",
      "app/adapters/customerAdapter.js"
    ]);
    await runCommand("Syntax app/adapters/vehicleAdapter.js", process.execPath, [
      "--check",
      "app/adapters/vehicleAdapter.js"
    ]);
    await runCommand("Syntax app/adapters/serviceAdapter.js", process.execPath, [
      "--check",
      "app/adapters/serviceAdapter.js"
    ]);
    await runCommand("Syntax app/main.js", process.execPath, ["--check", "app/main.js"]);
    await runCommand("Syntax app/boundaries/sessionAccessBoundary.js", process.execPath, [
      "--check",
      "app/boundaries/sessionAccessBoundary.js"
    ]);
    await runCommand("Syntax app/storage/storageBoundary.js", process.execPath, [
      "--check",
      "app/storage/storageBoundary.js"
    ]);
    await runCommand("Syntax app/utils/textFormatters.js", process.execPath, [
      "--check",
      "app/utils/textFormatters.js"
    ]);
    await runCommand("Syntax scripts/primyo-adapter-gate.mjs", process.execPath, [
      "--check",
      "scripts/primyo-adapter-gate.mjs"
    ]);
    await runCommand("Syntax scripts/sync-fipe-local-db.mjs", process.execPath, [
      "--check",
      "scripts/sync-fipe-local-db.mjs"
    ]);
    await runCommand("Adapter Contract Gate", process.execPath, ["scripts/primyo-adapter-gate.mjs"]);
    await runCommand("Build", npmCommand, ["run", "build"]);
    await runCommand("Verify Build", npmCommand, ["run", "verify:build"]);

    printSummary("SUCCESS");
  } catch (error) {
    if (!summary.some((item) => item.status === "FAIL")) {
      record("FAIL", "Gate", error.message);
    }

    printSummary("FAILED");
    process.exitCode = 1;
  }
}

main();
