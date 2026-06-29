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
