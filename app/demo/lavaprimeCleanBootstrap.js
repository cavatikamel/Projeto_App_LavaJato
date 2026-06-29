export const billingClients = [];
export const billingInvoices = [];
export const invoiceAmounts = {};
export const invoiceLineItems = [];
export const patioVehicles = [];
export const clientRegistry = [];
export const vehicleRegistry = [];
export const openPayments = [];

export const lavaprimeCleanBootstrapMap = {
  classification: "clean-bootstrap-placeholder",
  isolatedCollections: [
    "billingClients",
    "billingInvoices",
    "invoiceAmounts",
    "invoiceLineItems",
    "clientRegistry",
    "vehicleRegistry",
    "patioVehicles",
    "openPayments"
  ],
  relationshipSummary: {
    customerRegistryCount: 0,
    billedCustomerCount: 0,
    commonCustomerCount: 0,
    vehicleRegistryCount: 0,
    patioVehicleCount: 0,
    openPaymentCount: 0,
    billingInvoiceCount: 0,
    invoiceLineItemCount: 0
  }
};

export const lavaprimeCleanBootstrapReadinessBaseline = Object.freeze({
  mode: "CLEAN_BOOTSTRAP",
  sourceModule: "app/demo/lavaprimeCleanBootstrap.js",
  classification: "clean-bootstrap-placeholder",
  protectedFallback: true,
  safeAsDefault: false,
  intendedUse: "protected-readiness-review-only"
});

export const lavaprimeCleanBootstrapTrialBaseline = Object.freeze({
  mode: "CLEAN_BOOTSTRAP",
  sourceModule: "app/demo/lavaprimeCleanBootstrap.js",
  protectedTrialOnly: true,
  trialActiveByDefault: false,
  safeAsDefault: false,
  intendedUse: "protected-clean-bootstrap-trial-only",
  minimumChecklist: [
    "keep DEMO_BOOTSTRAP as default",
    "exercise clean bootstrap only in protected diagnostics",
    "revalidate dashboard, clients, patio, financial, reports and documents",
    "keep legacy/demo seed available for immediate rollback",
    "do not open Supabase or change persistence"
  ]
});

export const lavaprimeCleanBootstrapTrialExecutionBaseline = Object.freeze({
  mode: "CLEAN_BOOTSTRAP",
  sourceModule: "app/demo/lavaprimeCleanBootstrap.js",
  protectedTrialOnly: true,
  executionActiveByDefault: false,
  safeAsDefault: false,
  intendedUse: "protected-clean-bootstrap-trial-execution-only",
  trialEvaluationScope: [
    "dashboard",
    "clients",
    "vehicles",
    "patio",
    "financial",
    "invoices",
    "reports",
    "documents",
    "customerVehicleBillingLinks"
  ]
});
