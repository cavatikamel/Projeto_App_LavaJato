import {
  billingClients as demoBillingClients,
  billingInvoices as demoBillingInvoices,
  clientRegistry as demoClientRegistry,
  invoiceAmounts as demoInvoiceAmounts,
  invoiceLineItems as demoInvoiceLineItems,
  lavaprimeDemoDataCleanupMap as demoCleanupMap,
  openPayments as demoOpenPayments,
  patioVehicles as demoPatioVehicles,
  vehicleRegistry as demoVehicleRegistry
} from "./lavaprimeDemoData.js";
import {
  billingClients as cleanBillingClients,
  billingInvoices as cleanBillingInvoices,
  clientRegistry as cleanClientRegistry,
  invoiceAmounts as cleanInvoiceAmounts,
  invoiceLineItems as cleanInvoiceLineItems,
  lavaprimeCleanBootstrapMap,
  openPayments as cleanOpenPayments,
  patioVehicles as cleanPatioVehicles,
  vehicleRegistry as cleanVehicleRegistry
} from "./lavaprimeCleanBootstrap.js";

export const DEMO_BOOTSTRAP = "DEMO_BOOTSTRAP";
export const CLEAN_BOOTSTRAP = "CLEAN_BOOTSTRAP";
export const FUTURE_PERSISTED_BOOTSTRAP = "FUTURE_PERSISTED_BOOTSTRAP";

export const DEFAULT_LAVAPRIME_BOOTSTRAP_MODE = DEMO_BOOTSTRAP;
export const ACTIVE_LAVAPRIME_BOOTSTRAP_MODE = DEFAULT_LAVAPRIME_BOOTSTRAP_MODE;

const bootstrapStates = {
  [DEMO_BOOTSTRAP]: {
    mode: DEMO_BOOTSTRAP,
    sourceModule: "app/demo/lavaprimeDemoData.js",
    cleanupMap: demoCleanupMap,
    billingClients: demoBillingClients,
    billingInvoices: demoBillingInvoices,
    clientRegistry: demoClientRegistry,
    invoiceAmounts: demoInvoiceAmounts,
    invoiceLineItems: demoInvoiceLineItems,
    openPayments: demoOpenPayments,
    patioVehicles: demoPatioVehicles,
    vehicleRegistry: demoVehicleRegistry
  },
  [CLEAN_BOOTSTRAP]: {
    mode: CLEAN_BOOTSTRAP,
    sourceModule: "app/demo/lavaprimeCleanBootstrap.js",
    cleanupMap: lavaprimeCleanBootstrapMap,
    billingClients: cleanBillingClients,
    billingInvoices: cleanBillingInvoices,
    clientRegistry: cleanClientRegistry,
    invoiceAmounts: cleanInvoiceAmounts,
    invoiceLineItems: cleanInvoiceLineItems,
    openPayments: cleanOpenPayments,
    patioVehicles: cleanPatioVehicles,
    vehicleRegistry: cleanVehicleRegistry
  }
};

const selectedBootstrapState =
  bootstrapStates[ACTIVE_LAVAPRIME_BOOTSTRAP_MODE] || bootstrapStates[DEFAULT_LAVAPRIME_BOOTSTRAP_MODE];

export const billingClients = selectedBootstrapState.billingClients;
export const billingInvoices = selectedBootstrapState.billingInvoices;
export const clientRegistry = selectedBootstrapState.clientRegistry;
export const invoiceAmounts = selectedBootstrapState.invoiceAmounts;
export const invoiceLineItems = selectedBootstrapState.invoiceLineItems;
export const openPayments = selectedBootstrapState.openPayments;
export const patioVehicles = selectedBootstrapState.patioVehicles;
export const vehicleRegistry = selectedBootstrapState.vehicleRegistry;
export const lavaprimeDemoDataCleanupMap = selectedBootstrapState.cleanupMap;

export const lavaprimeBootstrapModeState = Object.freeze({
  activeMode: ACTIVE_LAVAPRIME_BOOTSTRAP_MODE,
  defaultMode: DEFAULT_LAVAPRIME_BOOTSTRAP_MODE,
  supportedModes: [DEMO_BOOTSTRAP, CLEAN_BOOTSTRAP, FUTURE_PERSISTED_BOOTSTRAP],
  sourceModule: selectedBootstrapState.sourceModule,
  cleanBootstrapAvailable: true,
  cleanBootstrapProtected: true,
  futurePersistedBootstrapReserved: true,
  demoSeedActive: ACTIVE_LAVAPRIME_BOOTSTRAP_MODE === DEMO_BOOTSTRAP
});
