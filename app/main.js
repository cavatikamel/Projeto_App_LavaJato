import {
  fetchOrganizationAppState,
  getLavaprimeSessionContext,
  hasSupabaseBrowserConfig,
  isSupabaseAdminRole,
  signInLavaprime,
  signOutLavaprime,
  upsertOrganizationAppState
} from "./src/lib/lavaprimeSupabase.js";

const icons = {
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.7-2.8 8.6-7 10-4.2-1.4-7-5.3-7-10V6l7-3z"/><path d="M9 12l2 2 4-5"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
  login: '<svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  power: '<svg viewBox="0 0 24 24"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.2"/><path d="M12 7.8v4.4l2.8 1.7"/></svg>',
  hourglass: '<svg viewBox="0 0 24 24"><path d="M7 3h10M7 21h10M8 3c0 5 2.5 6.2 4 9-1.5 2.8-4 4-4 9M16 3c0 5-2.5 6.2-4 9 1.5 2.8 4 4 4 9"/><path d="M9.5 8h5M10 17h4"/></svg>',
  drop: '<svg viewBox="0 0 24 24"><path d="M12 4.2s5 5.4 5 9.3a5 5 0 0 1-10 0c0-3.9 5-9.3 5-9.3z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24"><path d="M12 4.5l1.5 4.2 4.2 1.5-4.2 1.5L12 16l-1.5-4.3-4.2-1.5 4.2-1.5L12 4.5z"/><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"/></svg>',
  cancel: '<svg viewBox="0 0 24 24"><rect x="4.5" y="7" width="15" height="10" rx="2"/><path d="M7.5 16.5l9-9"/></svg>',
  dashboard: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.4"/><rect x="13" y="4" width="7" height="4.8" rx="1.4"/><rect x="13" y="10.8" width="7" height="9.2" rx="1.4"/><rect x="4" y="13" width="7" height="7" rx="1.4"/></svg>',
  carFront: '<svg viewBox="0 0 24 24"><path d="M7 17h10"/><path d="M6.5 17.5V13l1.7-5.1A2.8 2.8 0 0 1 10.9 6h2.2a2.8 2.8 0 0 1 2.7 1.9l1.7 5.1v4.5"/><path d="M8 13h8"/><path d="M8.2 18.4v1.1M15.8 18.4v1.1"/><circle cx="8.8" cy="15" r=".8"/><circle cx="15.2" cy="15" r=".8"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
  wallet: '<svg viewBox="0 0 24 24"><path d="M4.5 7.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h12"/><path d="M16.5 13.5h4"/><circle cx="16.5" cy="13.5" r=".8"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M12 4l9 16H3L12 4z"/><path d="M12 9v4M12 17h.01"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 19a4 4 0 0 0-8 0"/><circle cx="12" cy="9" r="3"/><path d="M20 18a3.3 3.3 0 0 0-3-3.1"/><path d="M4 18a3.3 3.3 0 0 1 3-3.1"/><path d="M18 8.5a2.2 2.2 0 0 1 .2 4.2"/><path d="M6 8.5a2.2 2.2 0 0 0-.2 4.2"/></svg>',
  badge: '<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8.5 16a3.8 3.8 0 0 1 7 0"/><path d="M9 4V2.8M15 4V2.8"/></svg>',
  service: '<svg viewBox="0 0 24 24"><path d="M14.5 5.5l4 4"/><path d="M13 7l4 4-8.5 8.5H4.5v-4L13 7z"/><path d="M6 15l3 3"/></svg>',
  cashflow: '<svg viewBox="0 0 24 24"><path d="M4 7h11a3 3 0 0 1 0 6H8"/><path d="M8 10l-4 3 4 3"/><path d="M20 17H9a3 3 0 0 1 0-6h7"/><path d="M16 8l4 3-4 3"/></svg>',
  payable: '<svg viewBox="0 0 24 24"><path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M15 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>',
  invoice: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21V3z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  card: '<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M3.5 10h17"/><path d="M7 15h3"/></svg>',
  message: '<svg viewBox="0 0 24 24"><path d="M4.5 5.5h15v10.8h-9L6.7 19.5v-3.2H4.5z"/><path d="M8 9.5h8M8 12.5h5"/></svg>',
  package: '<svg viewBox="0 0 24 24"><path d="M4.5 8.2 12 4l7.5 4.2v7.6L12 20l-7.5-4.2V8.2z"/><path d="M12 4v16"/><path d="M4.5 8.2 12 12l7.5-3.8"/></svg>',
  flask: '<svg viewBox="0 0 24 24"><path d="M10 3h4"/><path d="M10.5 3v5.2L6 16.5A3 3 0 0 0 8.6 21h6.8a3 3 0 0 0 2.6-4.5l-4.5-8.3V3"/><path d="M8.8 14h6.4"/><path d="M7.8 17h8.4"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24"><path d="M9 4.5h6"/><path d="M9.8 3h4.4A1.8 1.8 0 0 1 16 4.8V6h1.5A2.5 2.5 0 0 1 20 8.5v10A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-10A2.5 2.5 0 0 1 6.5 6H8V4.8A1.8 1.8 0 0 1 9.8 3z"/><path d="M8 11h8M8 15h5"/></svg>'
};

let selectedProfile = "";
let toastTimer = 0;
let activeVehicleId = null;
let pendingVehicle = null;
let selectedBillingClientId = "";
let selectedBillingInvoiceId = "";
let selectedClientId = null;
let selectedClientPersonType = "PF";
let pendingClientPlates = [];
let selectedVehicleId = null;
let selectedOperatorId = null;
let selectedReportOperatorId = null;
let selectedServiceIndex = null;
let selectedCashEntryId = null;
let cashflowDialogDraft = null;
let cashflowRegistryReturnToEntry = false;
let activeSessionUser = "";
let lastOpenInvoiceNoticePlate = "";
let messageDialogResolver = null;
let editedStatusServices = [];
let statusBillingMode = "";
let selectedStatusBillingClientId = "";
let selectedStatusBillingInvoiceId = "";
let vehicleEntryMode = "entry";
let selectedEntryVehicleId = null;
let entryRegistryEditContext = null;
let clientVehicleRegistrationContext = null;
let selectedScheduleVehicleId = null;
let quoteDialogStep = "vehicle";
let selectedQuoteVehicleId = null;
let pendingQuotePatioEntry = null;
let pendingQuotePatioQuoteId = null;
let pdfLogoImageCache = null;
let pdfLogoImageSourceCache = "";
let pdfLogoImagePromise = null;
let selectedMessageTemplateKey = "";
let selectedMessageCategory = "";
let selectedClientMessageClientId = null;
let selectedClientMessagePlate = "";
let selectedClientMessageCategory = "";
let selectedClientMessageTemplateKey = "";
let selectedVehicleOwnerTransferId = null;
let selectedBusinessPaymentMethodId = null;
let inventoryDialogState = null;
let vehicleRegistryDialogSource = "";
let selectedVehicleSpecialCareId = null;
let entryVehicleSpecialCareDraft = null;
let lastEntryCareConflictSignature = "";
const remoteWorkspaceState = {
  autosaveTimer: 0,
  dirty: false,
  enabled: false,
  isLoading: false,
  isSaving: false,
  lastSnapshotHash: "",
  membershipRole: "",
  organizationId: null,
  userId: null
};
const vehicleOwnerTransferSearchModes = [
  { value: "name", label: "Nome / Razao social", placeholder: "Digite o nome ou a razao social" },
  { value: "document", label: "Documento", placeholder: "Digite o CPF ou CNPJ" },
  { value: "phone", label: "Telefone", placeholder: "Digite o telefone" },
  { value: "plates", label: "Outras placas", placeholder: "Digite outra placa associada" }
];

const billingClients = [
  { id: 1, name: "Frota Prime Ltda", document: "12.345.678/0001-90", phone: "(11) 91111-0001" },
  { id: 2, name: "Condomínio Reserva Azul", document: "98.765.432/0001-10", phone: "(11) 92222-0002" },
  { id: 3, name: "Auto Center Vila Norte", document: "23.456.789/0001-20", phone: "(11) 93333-0003" }
];

const billingInvoices = [
  { id: 1, clientId: 1, code: "FAT-0526-001", dueDate: "2026-05-30" },
  { id: 2, clientId: 2, code: "FAT-0526-002", dueDate: "2026-05-25" },
  { id: 3, clientId: 3, code: "FAT-0626-001", dueDate: "2026-06-05" }
];

const invoiceAmounts = {
  1: 980,
  2: 620,
  3: 440
};

const invoiceLineItems = [
  { invoiceId: 1, clientId: 1, plate: "KML7D10", service: "Vitrificação", value: 490, operator: "Carlos" },
  { invoiceId: 2, clientId: 2, plate: "AGD4H22", service: "Lavagem Prime", value: 65, operator: "Carlos" },
  { invoiceId: 3, clientId: 3, plate: "LVP3E72", service: "Detailing completo", value: 320, operator: "Juliana" }
];

const billingCycles = ["Mensal", "Bimestral", "Trimestral", "Semestral"];
const paymentMethodTypeOptions = [
  { value: "instantâneo", label: "Instantâneo" },
  { value: "dinheiro", label: "Dinheiro" },
  { value: "cartão", label: "Cartão" },
  { value: "transferência", label: "Transferência" },
  { value: "boleto", label: "Boleto" },
  { value: "faturado", label: "Faturado" },
  { value: "outro", label: "Outro" }
];
const vehicleSpecialCareTypes = [
  "Vitrificação / coating cerâmico",
  "Enceramento recente",
  "Pintura fosca",
  "Pintura sensível ou repintada",
  "Envelopamento",
  "PPF / película de proteção",
  "Película recém-instalada",
  "Couro tratado ou sensível",
  "Interior delicado",
  "Rodas especiais / diamantadas",
  "Motor com restrição de lavagem",
  "Sensor, câmera ou componente sensível",
  "Restrição informada pelo cliente",
  "Outro"
];
const vehicleSpecialCareAttentionLevels = ["Informativo", "Atenção", "Alto risco"];
const vehicleSpecialCareSources = [
  "Informado pelo cliente",
  "Identificado pelo operador",
  "Serviço realizado neste lava jato",
  "Serviço realizado em outro estabelecimento",
  "Outro"
];
const vehicleSpecialCareRestrictionOptions = [
  { tag: "avoid_acid", label: "Evitar produto ácido" },
  { tag: "avoid_strong_alkaline", label: "Evitar produto alcalino forte" },
  { tag: "use_ph_neutral", label: "Usar preferencialmente pH neutro" },
  { tag: "avoid_degreaser", label: "Evitar desengraxante agressivo" },
  { tag: "avoid_abrasive_brush", label: "Evitar escova abrasiva" },
  { tag: "avoid_high_pressure_close", label: "Evitar alta pressão muito próxima" },
  { tag: "avoid_solvent", label: "Evitar solvente" },
  { tag: "avoid_heavy_polishing", label: "Evitar polimento agressivo" },
  { tag: "avoid_engine_wash", label: "Evitar lavagem de motor" },
  { tag: "avoid_film_contact", label: "Evitar produto em película/vidro" },
  { tag: "avoid_abrasive_product", label: "Evitar produto abrasivo" },
  { tag: "avoid_silicone", label: "Evitar produto à base de silicone" },
  { tag: "custom", label: "Outro" }
];
const vehicleSpecialCareRecommendedOptions = [
  { tag: "prefer_ph_neutral", label: "Preferir produto pH neutro" },
  { tag: "prefer_low_aggression", label: "Usar baixa agressividade" },
  { tag: "prefer_soft_touch", label: "Usar toque macio" },
  { tag: "protect_sensitive_area", label: "Proteger área sensível" },
  { tag: "manual_review", label: "Conferência manual antes de iniciar" }
];
const vehicleSpecialCareRestrictionLabelMap = vehicleSpecialCareRestrictionOptions.reduce((accumulator, option) => {
  accumulator[option.tag] = option.label;
  return accumulator;
}, {});
const vehicleSpecialCareRecommendedLabelMap = vehicleSpecialCareRecommendedOptions.reduce((accumulator, option) => {
  accumulator[option.tag] = option.label;
  return accumulator;
}, {});
const vehicleSpecialCareCombinedRestrictionOptions = [...vehicleSpecialCareRestrictionOptions, ...vehicleSpecialCareRecommendedOptions];
const supplyRiskTagOptions = [
  { tag: "acid_product", label: "Produto ácido" },
  { tag: "strong_alkaline_product", label: "Alcalino forte" },
  { tag: "degreaser", label: "Desengraxante" },
  { tag: "solvent", label: "Solvente" },
  { tag: "abrasive", label: "Abrasivo" },
  { tag: "silicone_based", label: "A base de silicone" },
  { tag: "engine_cleaner", label: "Limpeza de motor" },
  { tag: "wheel_acid", label: "Ácido de roda" },
  { tag: "heavy_cleaner", label: "Limpeza pesada" }
];
const serviceAutoCareTypeOptions = [
  { value: "", label: "Não sugerir" },
  { value: "Vitrificação / coating cerâmico", label: "Vitrificação / coating cerâmico" },
  { value: "Couro tratado ou sensível", label: "Couro tratado ou sensível" },
  { value: "Pintura sensível ou repintada", label: "Pintura sensível ou repintada" },
  { value: "Outro", label: "Outro" }
];
const checklistUnverifiedCondition = "Não Verificado";
const checklistConditions = ["Conforme", "Arranhado", "Amassado", "Quebrado", "Faltando", "Não Aplicável"];
const checklistConditionIconMap = {
  [checklistUnverifiedCondition]: "assets/checklist-icons/nao-verificado.svg",
  Conforme: "assets/checklist-icons/conforme.svg",
  Arranhado: "assets/checklist-icons/arranhado.svg",
  Amassado: "assets/checklist-icons/amassado.svg",
  Quebrado: "assets/checklist-icons/quebrado.svg",
  Faltando: "assets/checklist-icons/faltando.svg",
  "Não Aplicável": "assets/checklist-icons/nao-aplicavel.svg"
};
const pdfDocumentStandard = {
  templateReference: "assets/templates/lavaprime-papel-timbrado.html",
  page: { width: 595, height: 842, marginX: 45, bottomY: 82, contentTopY: 488 },
  colors: {
    petrol: "#0B1F2A",
    cyan: "#00B8D9",
    ice: "#F4FAFC",
    soft: "#EEF7FA",
    border: "#D7E5EB",
    muted: "#64748B",
    white: "#FFFFFF"
  }
};
const pdfLogoSizing = {
  minPercent: 45,
  maxPercent: 100,
  defaultPercent: 100,
  headerMaxWidth: 72,
  headerMaxHeight: 72,
  headerX: 45,
  headerY: 766,
  headerTextX: 129,
  sourceMaxSide: 320,
  jpegQuality: 0.82
};
const businessStorageKeys = {
  profile: "lavaprime-business-profile-v1",
  bankAccounts: "lavaprime-business-bank-accounts-v1",
  pix: "lavaprime-business-pix-v1",
  paymentMethods: "lavaprime-business-payment-methods-v1",
  financeSettings: "lavaprime-business-finance-settings-v1",
  products: "lavaprime-products-v1",
  supplies: "lavaprime-supplies-v1",
  productSales: "lavaprime-product-sales-v1",
  inventoryMovements: "lavaprime-inventory-movements-v1",
  serviceSupplies: "lavaprime-service-supply-profiles-v1",
  documentHistory: "lavaprime-document-history-v1",
  cashEntries: "lavaprime-cash-entries-v1",
  vehicleSpecialCare: "lavaprime-vehicle-special-care-v1",
  social: "lavaprime-business-social-v1",
  messages: "lavaprime-business-message-templates-v1"
};
const businessSocialChannels = [
  { key: "whatsapp", label: "WhatsApp", placeholder: "(11) 99999-9999" },
  { key: "instagram", label: "Instagram", placeholder: "@perfil" },
  { key: "tiktok", label: "TikTok", placeholder: "@perfil" },
  { key: "facebook", label: "Facebook", placeholder: "facebook.com/perfil" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/company/perfil" },
  { key: "site", label: "Site", placeholder: "https://site.com.br" }
];
const businessSocialReportTargets = [
  { key: "all", label: "Todos os relatórios" },
  { key: "financial", label: "Financeiro geral" },
  { key: "cashflow", label: "Fluxo de caixa" },
  { key: "openPayments", label: "Pagamentos em aberto" },
  { key: "invoices", label: "Faturas" },
  { key: "receipts", label: "Recibos" },
  { key: "checklists", label: "Check-list veicular" },
  { key: "operatorProduction", label: "Produção do operador" },
  { key: "operatorCommission", label: "Comissão do operador" },
  { key: "operatorAttendance", label: "Frequência do operador" }
];
const businessProfileReportFieldKeys = ["cnpj", "legalName", "tradeName", "phone", "email", "address"];
let businessProfile = normalizeBusinessProfile(loadBusinessStorageItem(businessStorageKeys.profile, getDefaultBusinessProfile()));
let businessBankAccounts = loadBusinessStorageItem(businessStorageKeys.bankAccounts, []);
let businessPixInfo = loadBusinessStorageItem(businessStorageKeys.pix, getDefaultBusinessPixInfo());
let businessPaymentMethods = normalizeBusinessPaymentMethods(loadBusinessStorageItem(businessStorageKeys.paymentMethods, getDefaultBusinessPaymentMethods()));
let businessFinanceSettings = normalizeBusinessFinanceSettings(
  loadBusinessStorageItem(businessStorageKeys.financeSettings, getDefaultBusinessFinanceSettings())
);
let businessSocialLinks = normalizeBusinessSocialLinks(loadBusinessStorageItem(businessStorageKeys.social, getDefaultBusinessSocialLinks()));
let businessMessageTemplates = loadBusinessStorageItem(businessStorageKeys.messages, getDefaultMessageTemplates());
let productCatalog = normalizeProductCatalog(loadBusinessStorageItem(businessStorageKeys.products, getDefaultProductCatalog()));
let supplyCatalog = normalizeSupplyCatalog(loadBusinessStorageItem(businessStorageKeys.supplies, getDefaultSupplyCatalog()));
let productSales = normalizeProductSales(loadBusinessStorageItem(businessStorageKeys.productSales, []));
let inventoryMovements = normalizeInventoryMovements(loadBusinessStorageItem(businessStorageKeys.inventoryMovements, []));
let serviceSupplyProfiles = normalizeServiceSupplyProfiles(loadBusinessStorageItem(businessStorageKeys.serviceSupplies, getDefaultServiceSupplyProfiles()));
let documentHistory = normalizeDocumentHistory(loadBusinessStorageItem(businessStorageKeys.documentHistory, []));
let cashEntries = normalizeCashEntries(loadBusinessStorageItem(businessStorageKeys.cashEntries, getDefaultCashEntries()));
let vehicleSpecialCareRecords = normalizeVehicleSpecialCareRecords(loadBusinessStorageItem(businessStorageKeys.vehicleSpecialCare, getDefaultVehicleSpecialCareRecords()));

function getDefaultMessageTemplates() {
  return [
    {
      key: "schedule-confirmation",
      category: "Serviço",
      title: "Confirmação de agendamento",
      text: "Olá, {cliente}. Seu agendamento na {empresa} para o veículo {placa} está confirmado para {data} às {hora}. Serviço: {servico}."
    },
    {
      key: "yard-entry",
      category: "Serviço",
      title: "Entrada do veículo no pátio",
      text: "Olá, {cliente}. Seu veículo {placa} deu entrada no pátio da {empresa}. Vamos iniciar o acompanhamento do serviço: {servico}."
    },
    {
      key: "vehicle-ready",
      category: "Serviço",
      title: "Veículo pronto",
      text: "Olá, {cliente}. Seu veículo {placa} está pronto para retirada na {empresa}. Valor: {valor}. Forma de pagamento: {pagamento}."
    },
    {
      key: "schedule-canceled",
      category: "Serviço",
      title: "Cancelamento de agendamento",
      text: "Olá, {cliente}. Seu agendamento para o veículo {placa} foi cancelado. Se desejar, podemos remarcar para outro horário."
    },
    {
      key: "service-canceled",
      category: "Serviço",
      title: "Cancelamento de serviço",
      text: "Olá, {cliente}. O serviço do veículo {placa} foi cancelado. A equipe da {empresa} permanece à disposição."
    },
    {
      key: "payment-confirmation",
      category: "Serviço",
      title: "Confirmação de pagamento",
      text: "Olá, {cliente}. Confirmamos o pagamento do serviço {servico} do veículo {placa}, no valor de {valor}. Forma de pagamento: {pagamento}. Obrigado pela preferência."
    },
    {
      key: "partial-yard-payment",
      category: "Financeiro",
      title: "Pagamento parcial no pátio",
      text: "Olá, {cliente}. Registramos o pagamento parcial do serviço {servico}, veículo {placa}, na {empresa}. Valor pago: {valor_pago}. Saldo em aberto: {saldo}. Forma de pagamento: {pagamento}."
    },
    {
      key: "open-invoice",
      category: "Financeiro",
      title: "Aviso de fatura em aberto",
      text: "Olá, {cliente}. Identificamos uma fatura em aberto na {empresa}. Valor: {valor}. Vencimento: {vencimento}. Podemos ajudar com os dados para pagamento?"
    },
    {
      key: "partial-invoice-payment",
      category: "Financeiro",
      title: "Pagamento parcial de fatura",
      text: "Olá, {cliente}. Registramos a baixa parcial da fatura {fatura} na {empresa}. Valor pago: {valor_pago}. Saldo remanescente: {saldo}. Destino do saldo: {destino}."
    },
    {
      key: "open-service-payment",
      category: "Financeiro",
      title: "Aviso de serviço com pagamento em aberto",
      text: "Olá, {cliente}. Consta um pagamento em aberto referente ao serviço {servico}, veículo {placa}, no valor de {valor}. Podemos confirmar a melhor forma de pagamento?"
    },
    {
      key: "partial-open-payment",
      category: "Financeiro",
      title: "Baixa parcial de pagamento em aberto",
      text: "Olá, {cliente}. Recebemos um pagamento parcial referente a {servico}. Valor pago: {valor_pago}. Saldo em aberto: {saldo}. Forma de pagamento: {pagamento}."
    },
    {
      key: "loyalty-client",
      category: "Relacionamento com o cliente",
      title: "Cliente fidelidade",
      text: "Olá, {cliente}. Você faz parte dos clientes especiais da {empresa}. Temos condições exclusivas para seu próximo serviço."
    },
    {
      key: "inactive-client",
      category: "Relacionamento com o cliente",
      title: "Cliente há muito tempo sem realizar novos serviços",
      text: "Olá, {cliente}. Sentimos sua falta na {empresa}. Quando quiser, podemos agendar uma nova lavagem para o veículo {placa}."
    },
    {
      key: "promotion",
      category: "Relacionamento com o cliente",
      title: "Promoções",
      text: "Olá, {cliente}. A {empresa} está com uma condição especial: {promocao}. Posso reservar um horário para você?"
    },
    {
      key: "satisfaction",
      category: "Relacionamento com o cliente",
      title: "Pesquisa de satisfação",
      text: "Olá, {cliente}. Como foi sua experiência com o serviço {servico} na {empresa}? Sua avaliação ajuda nossa equipe a melhorar."
    },
    {
      key: "maintenance-reminder",
      category: "Relacionamento com o cliente",
      title: "Lembrete de manutenção estética",
      text: "Olá, {cliente}. Já faz um tempo desde o último cuidado no veículo {placa}. Podemos sugerir um novo serviço de conservação?"
    }
  ];
}

businessMessageTemplates = normalizeBusinessMessageTemplates(businessMessageTemplates);

function normalizeBusinessMessageTemplates(templates) {
  const defaults = getDefaultMessageTemplates();
  const current = Array.isArray(templates) ? templates : [];
  const merged = defaults.map((defaultTemplate) => {
    const savedTemplate = current.find((template) => template.key === defaultTemplate.key) || {};
    return {
      ...defaultTemplate,
      ...savedTemplate,
      active: Boolean(savedTemplate.active)
    };
  });
  const customTemplates = current
    .filter((template) => template.key && !merged.some((item) => item.key === template.key))
    .map((template) => ({ ...template, active: Boolean(template.active) }));
  return [...merged, ...customTemplates];
}

function getMessageTriggerLabel(key) {
  const labels = {
    "schedule-confirmation": "Ao salvar agendamento",
    "yard-entry": "Ao registrar entrada no pátio",
    "vehicle-ready": "Ao mover para Pronto",
    "schedule-canceled": "Ao cancelar agendamento",
    "service-canceled": "Ao cancelar serviço",
    "payment-confirmation": "Ao confirmar/baixar pagamento",
    "partial-yard-payment": "Ao registrar pagamento parcial no pátio",
    "open-invoice": "Ao enviar lembrete de fatura",
    "partial-invoice-payment": "Ao baixar fatura parcialmente",
    "open-service-payment": "Ao lançar ou lembrar pagamento em aberto",
    "partial-open-payment": "Ao baixar pagamento em aberto parcialmente",
    "loyalty-client": "Relacionamento manual no cadastro",
    "inactive-client": "Relacionamento manual no cadastro",
    promotion: "Relacionamento manual no cadastro",
    satisfaction: "Após atendimento ou manual",
    "maintenance-reminder": "Relacionamento manual no cadastro"
  };
  return labels[key] || "Gatilho manual";
}

const vehicleChecklistTemplates = {
  default: [
    {
      area: "Dianteira",
      parts: ["Parachoque dianteiro", "Capô", "Grade", "Para-brisa", "Farol esquerdo", "Farol direito", "Paralama esquerdo", "Paralama direito"]
    },
    {
      area: "Traseira",
      parts: ["Parachoque traseiro", "Tampa traseira/porta-malas", "Vidro traseiro", "Lanterna esquerda", "Lanterna direita"]
    },
    {
      area: "Lateral esquerda",
      parts: ["Porta dianteira esquerda", "Porta traseira esquerda", "Retrovisor esquerdo", "Caixa de ar esquerda", "Roda/pneu esquerdo"]
    },
    {
      area: "Lateral direita",
      parts: ["Porta dianteira direita", "Porta traseira direita", "Retrovisor direito", "Caixa de ar direita", "Roda/pneu direito"]
    },
    {
      area: "Interior",
      parts: ["Estofados", "Painel", "Console", "Volante", "Forro de porta dianteiro esquerdo", "Forro de porta dianteiro direito", "Tapetes"]
    }
  ],
  moto: [
    {
      area: "Dianteira",
      parts: ["Farol", "Painel/instrumentos", "Paralama dianteiro", "Roda/pneu dianteiro", "Bengalas"]
    },
    {
      area: "Traseira",
      parts: ["Lanterna", "Suporte de placa", "Paralama traseiro", "Roda/pneu traseiro", "Escapamento"]
    },
    {
      area: "Laterais",
      parts: ["Carenagens", "Manetes", "Pedais", "Espelhos"]
    },
    {
      area: "Superior",
      parts: ["Tanque", "Assento", "Guidão", "Comandos", "Baú/suporte"]
    }
  ]
};

const statusMeta = {
  agendado: {
    label: "Agendado",
    icon: "hourglass",
    summary: "Entrada agendada"
  },
  aguardando: {
    label: "Aguardando Serviço",
    icon: "clock",
    summary: "Aguardando Serviço"
  },
  lavando: {
    label: "Em Serviço",
    icon: "drop",
    summary: "Serviço em execução"
  },
  pronto: {
    label: "Pronto",
    icon: "sparkle",
    summary: "Pronto para entrega"
  },
  finalizado: {
    label: "Finalizado",
    icon: "check",
    summary: "Pagamento confirmado e atendimento encerrado"
  },
  cancelado: {
    label: "Cancelado",
    icon: "cancel",
    summary: "Serviço cancelado"
  }
};

const statusOrder = ["agendado", "aguardando", "lavando", "pronto", "finalizado"];
const statusActionOrder = ["aguardando", "lavando", "pronto", "cancelado"];
const localVehicleDatabaseUrl = "./assets/data/fipe-veiculos.json";
const localVehicleAutocompleteMinLength = 2;
const localVehicleAutocompleteLimit = 8;
let localVehicleDatabasePromise = null;
let localVehicleDatabase = null;

const patioVehicles = [
  {
    id: 0,
    plate: "AGD4H22",
    model: "Tracker",
    color: "Cinza",
    owner: "Bruno Lima",
    phone: "(11) 94444-4022",
    service: "Lavagem Prime",
    payment: "Pix",
    entry: "14:30",
    scheduledDate: "2026-05-22",
    scheduledTime: "14:30",
    status: "agendado"
  },
  {
    id: 1,
    plate: "FQJ2A19",
    model: "Onix",
    color: "Branco",
    owner: "Marina Alves",
    phone: "(11) 98888-1001",
    service: "Lavagem Prime",
    payment: "Pix",
    entry: "08:30",
    status: "aguardando"
  },
  {
    id: 2,
    plate: "BRT8C41",
    model: "Corolla",
    color: "Prata",
    owner: "Rafael Nunes",
    phone: "(21) 97777-2041",
    service: "Higienização interna",
    payment: "Cartão de débito",
    entry: "09:15",
    status: "lavando"
  },
  {
    id: 3,
    plate: "LVP3E72",
    model: "Compass",
    color: "Azul",
    owner: "Camila Torres",
    phone: "(31) 96666-3072",
    service: "Detailing completo",
    payment: "Cartão de crédito",
    entry: "10:05",
    status: "pronto"
  },
  {
    id: 4,
    plate: "KML7D10",
    model: "Civic",
    color: "Preto",
    owner: "Pedro Martins",
    phone: "(41) 95555-7010",
    service: "Vitrificação",
    payment: "Faturado",
    entry: "11:20",
    status: "cancelado"
  }
];

const quoteEstimates = [
  {
    id: 1,
    code: "ORC-202606-001",
    date: "2026-06-03",
    time: "09:20",
    dueDate: "2026-06-18",
    validityDays: 15,
    plate: "QTE1A23",
    brand: "Volkswagen",
    model: "Polo",
    color: "Branco",
    type: "Carro",
    category: "Hatch",
    owner: "Helena Duarte",
    phone: "(11) 97777-1200",
    payment: "Pix",
    services: ["Lavagem Prime"],
    extraItems: [{ description: "Remoção de manchas no banco", value: 90 }],
    status: "Pendente",
    operator: "Administrador"
  },
  {
    id: 2,
    code: "ORC-202606-002",
    date: "2026-06-01",
    time: "16:10",
    dueDate: "2026-06-10",
    validityDays: 9,
    plate: "APR4B10",
    brand: "Honda",
    model: "Civic",
    color: "Preto",
    type: "Carro",
    category: "Sedan",
    owner: "Diego Almeida",
    phone: "(11) 96666-3344",
    payment: "Cartão de crédito",
    services: ["Higienização interna"],
    extraItems: [{ description: "Oxi-sanitização", value: 70 }],
    status: "Aprovado",
    approvedAt: "03/06/2026 10:45",
    operator: "Administrador"
  },
  {
    id: 3,
    code: "ORC-202605-003",
    date: "2026-05-20",
    time: "11:05",
    dueDate: "2026-06-01",
    validityDays: 12,
    plate: "VCD9E02",
    brand: "Jeep",
    model: "Compass",
    color: "Azul",
    type: "Carro",
    category: "SUV",
    owner: "Renata Moura",
    phone: "(31) 95555-2210",
    payment: "Transferência",
    services: ["Detailing completo"],
    extraItems: [],
    status: "Pendente",
    operator: "Administrador"
  },
  {
    id: 4,
    code: "ORC-202606-004",
    date: "2026-06-04",
    time: "14:30",
    dueDate: "2026-06-19",
    validityDays: 15,
    plate: "RJT6C88",
    brand: "Toyota",
    model: "Hilux",
    color: "Prata",
    type: "Caminhonete",
    category: "Picape",
    owner: "Marcelo Rocha",
    phone: "(21) 94444-7100",
    payment: "Boleto",
    services: ["Vitrificação"],
    extraItems: [{ description: "Polimento técnico", value: 180 }],
    status: "Não aprovado",
    rejectedAt: "05/06/2026 09:30",
    operator: "Administrador"
  }
];

const clientRegistry = [
  {
    id: 1,
    billingClientId: 1,
    personType: "PJ",
    billing: true,
    name: "",
    legalName: "Frota Prime Ltda",
    document: "12.345.678/0001-90",
    phone: "(11) 91111-0001",
    address: "Av. Paulista, 1000 - São Paulo/SP",
    email: "financeiro@frotaprime.com.br",
    responsible: "Roberto Silva",
    approver: "Ana Admin",
    billingApproved: true,
    billingCycle: "Mensal",
    allowMultipleOpenInvoices: true,
    plates: ["KML7D10"]
  },
  {
    id: 2,
    billingClientId: 2,
    personType: "PJ",
    billing: true,
    name: "",
    legalName: "Condomínio Reserva Azul",
    document: "98.765.432/0001-10",
    phone: "(11) 92222-0002",
    address: "Rua das Acácias, 450 - São Paulo/SP",
    email: "administracao@reservaazul.com.br",
    responsible: "Lívia Ramos",
    approver: "Ana Admin",
    billingApproved: true,
    billingCycle: "Mensal",
    allowMultipleOpenInvoices: false,
    plates: ["AGD4H22"]
  },
  {
    id: 3,
    billingClientId: 3,
    personType: "PJ",
    billing: true,
    name: "",
    legalName: "Auto Center Vila Norte",
    document: "23.456.789/0001-20",
    phone: "(11) 93333-0003",
    address: "Rua Norte, 78 - São Paulo/SP",
    email: "contas@autocentervn.com.br",
    responsible: "Diego Melo",
    approver: "Ana Admin",
    billingApproved: true,
    billingCycle: "Bimestral",
    allowMultipleOpenInvoices: true,
    plates: ["LVP3E72"]
  },
  {
    id: 4,
    billingClientId: null,
    personType: "PF",
    billing: false,
    name: "Marina Alves",
    legalName: "",
    document: "",
    phone: "(11) 98888-1001",
    address: "",
    email: "",
    responsible: "",
    approver: "",
    billingApproved: false,
    billingCycle: "",
    allowMultipleOpenInvoices: false,
    plates: ["FQJ2A19"]
  },
  {
    id: 5,
    billingClientId: null,
    personType: "PF",
    billing: false,
    name: "Rafael Nunes",
    legalName: "",
    document: "",
    phone: "(21) 97777-2041",
    address: "",
    email: "",
    responsible: "",
    approver: "",
    billingApproved: false,
    billingCycle: "",
    allowMultipleOpenInvoices: false,
    plates: ["BRT8C41"]
  }
];

const vehicleRegistry = [
  {
    id: 1,
    plate: "FQJ2A19",
    brand: "Chevrolet",
    model: "Onix",
    year: "2023",
    color: "Branco",
    type: "Carro",
    category: "Hatch",
    fuel: "Flex",
    currentClientId: 4,
    notes: "Veículo de cliente avulso com recorrência mensal.",
    ownerHistory: [{ date: "2026-05-18", owner: "Marina Alves", note: "Proprietária atual" }],
    serviceHistory: [{ date: "2026-05-18", service: "Lavagem Prime", status: "Aguardando serviço", value: 65 }]
  },
  {
    id: 2,
    plate: "BRT8C41",
    brand: "Toyota",
    model: "Corolla",
    year: "2022",
    color: "Prata",
    type: "Carro",
    category: "Sedan",
    fuel: "Flex",
    currentClientId: 5,
    notes: "Cliente prefere higienização interna trimestral.",
    ownerHistory: [{ date: "2026-05-18", owner: "Rafael Nunes", note: "Proprietário atual" }],
    serviceHistory: [{ date: "2026-05-18", service: "Higienização interna", status: "Em Serviço", value: 140 }]
  },
  {
    id: 3,
    plate: "LVP3E72",
    brand: "Jeep",
    model: "Compass",
    year: "2024",
    color: "Azul",
    type: "Carro",
    category: "SUV",
    fuel: "Flex",
    currentClientId: 3,
    notes: "Atendido por faturamento corporativo.",
    ownerHistory: [{ date: "2026-05-18", owner: "Auto Center Vila Norte", note: "Cliente faturado atual" }],
    serviceHistory: [{ date: "2026-05-18", service: "Detailing completo", status: "Pronto", value: 320 }]
  },
  {
    id: 4,
    plate: "KML7D10",
    brand: "Honda",
    model: "Civic",
    year: "2021",
    color: "Preto",
    type: "Carro",
    category: "Sedan",
    fuel: "Flex",
    currentClientId: 1,
    notes: "Histórico preservado mesmo com serviço cancelado.",
    ownerHistory: [
      { date: "2025-11-10", owner: "Pedro Martins", note: "Proprietário anterior" },
      { date: "2026-05-18", owner: "Frota Prime Ltda", note: "Transferido para cliente faturado" }
    ],
    serviceHistory: [{ date: "2026-05-18", service: "Vitrificação", status: "Cancelado", value: 490 }]
  },
  {
    id: 5,
    plate: "AGD4H22",
    brand: "Chevrolet",
    model: "Tracker",
    year: "2023",
    color: "Cinza",
    type: "Carro",
    category: "SUV",
    fuel: "Flex",
    currentClientId: 2,
    notes: "Entrada agendada aguardando confirmação.",
    ownerHistory: [{ date: "2026-05-18", owner: "Condomínio Reserva Azul", note: "Cliente faturado atual" }],
    serviceHistory: [{ date: "2026-05-18", service: "Lavagem Prime", status: "Agendado", value: 65 }]
  }
];

const adminOperators = [
  {
    id: 1,
    name: "Carlos",
    cpf: "123.456.789-10",
    phone: "(11) 98888-0101",
    accessProfile: "Operador",
    username: "carlos",
    password: "lava123",
    commissionType: "fixed",
    commissionValue: 12,
    role: "Operador de pátio",
    shift: "08:00 - 17:00",
    today: 6,
    status: "Ativo",
    accessHistory: [
      { date: "2026-05-22", login: "07:56", logout: "12:05", device: "Web", result: "Autenticado" },
      { date: "2026-05-21", login: "08:02", logout: "17:04", device: "Mobile", result: "Autenticado" }
    ],
    production: [
      {
        date: "2026-05-22",
        services: 6,
        revenue: 520,
        attendance: "Presente",
        items: [
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Higienização interna", duration: "1h20", value: 140 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Lavagem com cera", duration: "50 min", value: 95 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Polimento técnico parcial", duration: "1h10", value: 90 }
        ]
      },
      {
        date: "2026-05-21",
        services: 7,
        revenue: 610,
        attendance: "Presente",
        items: [
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Higienização interna", duration: "1h20", value: 140 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Lavagem de motor", duration: "45 min", value: 60 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Cristalização rápida", duration: "1h30", value: 155 },
          { service: "Lavagem técnica externa", duration: "40 min", value: 60 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Juliana",
    cpf: "234.567.890-21",
    phone: "(11) 97777-0202",
    accessProfile: "Operador",
    username: "juliana",
    password: "prime456",
    commissionType: "percent",
    commissionValue: 8,
    role: "Lavagem e acabamento",
    shift: "09:00 - 18:00",
    today: 4,
    status: "Ativo",
    accessHistory: [
      { date: "2026-05-22", login: "08:58", logout: "12:10", device: "Web", result: "Autenticado" },
      { date: "2026-05-20", login: "09:04", logout: "18:01", device: "Mobile", result: "Autenticado" }
    ],
    production: [
      {
        date: "2026-05-22",
        services: 4,
        revenue: 460,
        attendance: "Presente",
        items: [
          { service: "Detailing completo", duration: "3h00", value: 320 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Lavagem técnica externa", duration: "40 min", value: 45 },
          { service: "Acabamento final", duration: "25 min", value: 30 }
        ]
      },
      {
        date: "2026-05-20",
        services: 5,
        revenue: 530,
        attendance: "Presente",
        items: [
          { service: "Higienização interna", duration: "1h20", value: 140 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Detailing parcial", duration: "2h00", value: 180 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Revitalização de plásticos", duration: "50 min", value: 80 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Mateus",
    cpf: "345.678.901-32",
    phone: "(11) 96666-0303",
    accessProfile: "Administrador",
    username: "mateus.admin",
    password: "admin789",
    commissionType: "fixed",
    commissionValue: 0,
    role: "Financeiro",
    shift: "10:00 - 19:00",
    today: 2,
    status: "Ativo",
    accessHistory: [
      { date: "2026-05-22", login: "09:52", logout: "12:22", device: "Web", result: "Autenticado" },
      { date: "2026-05-19", login: "10:01", logout: "19:00", device: "Web", result: "Autenticado" }
    ],
    production: [
      {
        date: "2026-05-22",
        services: 2,
        revenue: 180,
        attendance: "Presente",
        items: [
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Higienização leve", duration: "55 min", value: 115 }
        ]
      },
      {
        date: "2026-05-19",
        services: 3,
        revenue: 260,
        attendance: "Presente",
        items: [
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Lavagem Prime", duration: "35 min", value: 65 },
          { service: "Preparação de veículo", duration: "1h00", value: 130 }
        ]
      }
    ]
  }
];

const serviceCatalog = [
  {
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
  },
  {
    name: "Higienização interna",
    price: 140,
    duration: "1h20",
    vehicleType: "Carro",
    vehicleCategory: "Sedan",
    status: "Ativo",
    autoCreateVehicleCareType: "Couro tratado ou sensível",
    maintenanceRequired: true,
    maintenanceInterval: "semiannual",
    maintenanceDate: ""
  },
  {
    name: "Detailing completo",
    price: 320,
    duration: "3h00",
    vehicleType: "Carro",
    vehicleCategory: "SUV",
    status: "Ativo",
    autoCreateVehicleCareType: "",
    maintenanceRequired: true,
    maintenanceInterval: "quarterly",
    maintenanceDate: ""
  },
  {
    name: "Vitrificação",
    price: 490,
    duration: "4h00",
    vehicleType: "Caminhonete",
    vehicleCategory: "Picape",
    status: "Ativo",
    autoCreateVehicleCareType: "Vitrificação / coating cerâmico",
    maintenanceRequired: true,
    maintenanceInterval: "annual",
    maintenanceDate: ""
  }
];

const vehicleTypes = ["Carro", "Moto", "Caminhonete", "Van", "Utilitário"];
const vehicleCategories = ["Hatch", "Sedan", "SUV", "Picape", "Executivo", "Comercial", "Outro"];

const cashflowCategories = ["Serviços", "Produtos", "Insumos", "Faturamento", "Taxas", "Manutenção", "Outros"];
const cashflowCostCenters = ["Unidade principal", "Lavagem", "Loja", "Estética", "Administrativo", "Financeiro"];

function getDefaultCashEntries() {
  return [
    {
      id: 1,
      date: "2026-05-25",
      time: "08:34",
      type: "Entrada",
      description: "Lavagem Prime",
      method: "Pix",
      value: 65,
      category: "Serviços",
      costCenter: "Lavagem",
      status: "Confirmado",
      attachment: { name: "pix-lavagem-prime.pdf", type: "Comprovante bancário" }
    },
    {
      id: 2,
      date: "2026-05-25",
      time: "09:48",
      type: "Entrada",
      description: "Higienização interna",
      method: "Cartão de débito",
      value: 140,
      category: "Serviços",
      costCenter: "Estética",
      status: "Confirmado",
      attachment: null
    },
    {
      id: 3,
      date: "2026-05-25",
      time: "10:30",
      type: "Entrada",
      description: "Detailing completo",
      method: "Cartão de crédito",
      value: 320,
      category: "Serviços",
      costCenter: "Estética",
      status: "Pendente",
      attachment: null
    },
    {
      id: 4,
      date: "2026-05-25",
      time: "12:20",
      type: "Saída",
      description: "Produtos químicos",
      method: "Carteira",
      value: -86.5,
      category: "Insumos",
      costCenter: "Lavagem",
      status: "Pendente",
      attachment: { name: "nf-produtos-quimicos.pdf", type: "NF" }
    },
    {
      id: 5,
      date: "2026-05-25",
      time: "16:00",
      type: "Saída",
      description: "Reposição de shampoo automotivo",
      method: "Transferência",
      value: -260,
      category: "Insumos",
      costCenter: "Lavagem",
      status: "Pendente",
      scheduledDate: "2026-05-25",
      scheduledTime: "16:00",
      attachment: null
    }
  ];
}

const openPayments = [
  {
    id: 1,
    clientId: 5,
    clientName: "Rafael Nunes",
    phone: "(21) 97777-2041",
    plate: "BRT8C41",
    service: "Higienização interna",
    value: 140,
    paymentMethod: "Pix",
    createdAt: "2026-05-25 10:30",
    dueDate: "2026-05-26",
    status: "Aberto",
    reminderFrequency: "Diário",
    lastReminderAt: "",
    operator: "Carlos",
    vehicleId: 2,
    cashEntryId: 3
  }
];

const payableAccounts = [
  { supplier: "CleanPro Distribuidora", category: "Insumos", dueDate: "2026-05-20", value: 420, status: "A vencer" },
  { supplier: "Energia", category: "Operacional", dueDate: "2026-05-22", value: 310, status: "A vencer" },
  { supplier: "Aluguel do ponto", category: "Fixo", dueDate: "2026-05-10", value: 1800, status: "Pago" }
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function initIcons() {
  $$("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    if (icons[name]) node.innerHTML = icons[name];
  });
}

function startSplashScreen() {
  const splash = $("#splashScreen");
  if (!splash) return;

  window.setTimeout(() => {
    splash.classList.add("is-hidden");
    window.setTimeout(() => splash.remove(), 260);
  }, 2000);
}

function showToast(message) {
  const toast = $("#toast");
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  queueRemoteStateSync();
}

function showMessageBox({ title, message, eyebrow = "Atenção", confirmLabel = "Entendi", cancelLabel = "", confirmOnly = true }) {
  const dialog = $("#messageDialog");
  $("#messageDialogEyebrow").textContent = eyebrow;
  $("#messageDialogTitle").textContent = title;
  $("#messageDialogText").textContent = message;
  $("#messageConfirmLabel").textContent = confirmLabel;
  $("#messageCancelButton").hidden = confirmOnly;
  $("#messageCancelButton").textContent = cancelLabel || "Cancelar";

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  return new Promise((resolve) => {
    messageDialogResolver = resolve;
  });
}

function resolveMessageDialog(value) {
  const dialog = $("#messageDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");

  if (messageDialogResolver) {
    messageDialogResolver(value);
    messageDialogResolver = null;
  }
}

function selectProfile(button) {
  selectedProfile = button.dataset.profile;

  $$(".profile-button").forEach((item) => {
    const isSelected = item === button;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-pressed", String(isSelected));
  });
}

function looksLikeRemoteEmailLogin(user) {
  return String(user || "").includes("@");
}

async function confirmLogin() {
  const user = $("#loginUser").value.trim();
  const password = $("#loginPassword").value.trim();

  if (!user || !password) {
    showToast("Preencha Usuario e Senha para continuar.");
    return null;
  }

  if (!selectedProfile) {
    showToast("Escolha Administrador ou Operador para continuar.");
    return null;
  }

  if (!hasSupabaseBrowserConfig() && looksLikeRemoteEmailLogin(user)) {
    showToast("Supabase nao configurado neste navegador. Crie .env.local para usar a base limpa de teste.");
    return null;
  }

  if (hasSupabaseBrowserConfig()) {
    try {
      const sessionContext = await signInLavaprime({ email: user, password });
      if (!sessionContext) throw new Error("Não foi possível abrir a sessão no Supabase.");

      const wantsAdmin = selectedProfile === "Administrador";
      const hasAdminAccess = isSupabaseAdminRole(sessionContext.membership.role);

      if (wantsAdmin && !hasAdminAccess) {
        await signOutLavaprime();
        showToast("Este usuário remoto não possui acesso administrativo.");
        return null;
      }

      await initializeRemoteWorkspace(sessionContext);
      if (wantsAdmin || hasAdminAccess) showAdmin(sessionContext.displayName);
      else showPatio(sessionContext.displayName);
      return sessionContext;
    } catch (error) {
      console.error("Falha ao autenticar no Supabase.", error);
      showToast(error?.message || "Não foi possível autenticar no Supabase.");
      return null;
    }
  }

  if (selectedProfile === "Administrador") showAdmin(user);
  else showPatio(user);
}

function exitTool() {
  showToast("Encerrando ferramenta.");
  window.open("", "_self");
  window.close();

  window.setTimeout(() => {
    window.location.href = "about:blank";
  }, 450);
}

function bindEvents() {
  migrateExistingPaymentMethodReferences();
  $$(".profile-button").forEach((button) => {
    button.addEventListener("click", () => selectProfile(button));
  });

  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    void confirmLogin();
  });
  $("#exitTool").addEventListener("click", exitTool);
  $("#patioLogout").addEventListener("click", returnToLogin);
  $("#adminLogout").addEventListener("click", returnToLogin);
  $("#newVehicleButton").addEventListener("click", () => openVehicleDialog("entry"));
  $("#adminNewVehicleButton").addEventListener("click", () => openVehicleDialog("entry"));
  $("#startClientFormButton").addEventListener("click", () => {
    showAdminView("clients");
    window.setTimeout(() => openClientDialog(), 0);
  });
  $("#startVehicleRegistryButton").addEventListener("click", () => {
    showAdminView("vehicles");
    window.setTimeout(() => openAdminVehicleRegistryDialog(), 0);
  });
  $("#startOperatorFormButton").addEventListener("click", () => {
    showAdminView("operators");
    window.setTimeout(() => openOperatorDialog(), 0);
  });
  $("#startServiceFormButton").addEventListener("click", () => {
    showAdminView("services");
    window.setTimeout(() => openServiceDialog(), 0);
  });
  $("#startProductFormButton")?.addEventListener("click", () => {
    showAdminView("products");
    window.setTimeout(() => openInventoryDialog({ mode: "product" }), 0);
  });
  $("#startSupplyFormButton")?.addEventListener("click", () => {
    showAdminView("supplies");
    window.setTimeout(() => openInventoryDialog({ mode: "supply" }), 0);
  });
  $("#startProductSaleButton")?.addEventListener("click", () => {
    showAdminView("productSales");
    window.setTimeout(() => openInventoryDialog({ mode: "sale" }), 0);
  });
  $$("[data-admin-view]").forEach((button) => {
    button.addEventListener("click", () => showAdminView(button.dataset.adminView));
  });
  $("#adminMaintenanceDue")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-send-maintenance-whatsapp]");
    if (!button) return;
    sendMaintenanceWhatsapp(button.dataset.sendMaintenanceWhatsapp);
  });
  $$(".admin-action-button").forEach((button) => {
    button.addEventListener("click", () => showToast("Ação pronta para detalhamento na próxima etapa."));
  });
  $("#closeVehicleDialog").addEventListener("click", closeVehicleDialog);
  $("#cancelVehicleEntry").addEventListener("click", closeVehicleDialog);
  $("#messageConfirmButton").addEventListener("click", () => resolveMessageDialog(true));
  $("#messageCancelButton").addEventListener("click", () => resolveMessageDialog(false));
  $("#nextVehicleEntryButton").addEventListener("click", goToVehicleClientStep);
  $("#backToVehicleDataButton").addEventListener("click", () => showVehicleStep("entry"));
  $("#backToVehicleClientFromScheduleButton").addEventListener("click", () => showVehicleStep("client"));
  $("#finishScheduleButton").addEventListener("click", finishVehicleScheduleFromDialog);
  $("#addEntryServiceButton").addEventListener("click", addEntryServiceFromDropdown);
  $("#vehicleScheduleToggle").addEventListener("change", handleVehicleScheduleToggle);
  bindLocalVehicleModelLookup({
    modelSelector: "#vehicleModel",
    brandSelector: "#vehicleBrand",
    resultsSelector: "#vehicleModelResults",
    typeSelector: "#vehicleType"
  });
  $("#vehicleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    handleVehicleEntrySubmit();
  });
  $("#vehicleForm").addEventListener("change", (event) => {
    if (event.target.id === "entryVehicleSpecialCareEnabled") {
      const draft = getEntryVehicleSpecialCareDraftState();
      if (event.target.checked) {
        entryVehicleSpecialCareDraft = { ...draft, enabled: true };
        refreshEntryVehicleSpecialCareSection({ preserveDraft: false });
        openEntrySpecialCareDialog();
      } else {
        entryVehicleSpecialCareDraft = { ...draft, enabled: false, restrictionTags: [], recommendedTags: [], description: "" };
        refreshEntryVehicleSpecialCareSection({ preserveDraft: false });
      }
    }
  });
  $("#vehiclePaidAtEntry")?.addEventListener("change", () => {
    updateVehicleEntryPaymentState();
    updatePaymentAction();
    renderActiveVehicleChecklist();
  });
  $("#vehiclePayment").addEventListener("change", () => {
    updateVehicleEntryPaymentState();
    updatePaymentAction();
    renderActiveVehicleChecklist();
  });
  $$(".color-swatch").forEach((button) => {
    button.addEventListener("click", () => selectVehicleColor(button));
  });
  $("#vehiclePlate").addEventListener("input", (event) => {
    event.currentTarget.value = formatPlate(event.currentTarget.value);
    handleEntryPlateLookup(event.currentTarget.value);
    refreshEntryVehicleSpecialCareSection();
  });
  $("#vehiclePhone").addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $("#vehicleType").addEventListener("change", () => {
    updateVehicleEntryCategoryState();
    renderVehicleServiceOptions({ preserveSelected: true });
    renderActiveVehicleChecklist();
  });
  $("#vehicleCategory").addEventListener("change", () => {
    renderVehicleServiceOptions({ preserveSelected: true });
  });
  $("#billingClientPhone").addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $("#billingClientSelect").addEventListener("change", () => {
    selectedBillingClientId = $("#billingClientSelect").value;
    selectedBillingInvoiceId = "";
    renderInvoiceSelect();
    updateBillingReadyState();
  });
  $("#billingInvoiceSelect").addEventListener("change", () => {
    selectedBillingInvoiceId = $("#billingInvoiceSelect").value;
    updateBillingReadyState();
  });
  $("#newBillingClientButton")?.addEventListener("click", handleNewBillingClientFromEntry);
  $("#newInvoiceButton").addEventListener("click", () => {
    renderInvoiceClientSelect();
    showVehicleStep("invoice");
  });
  $("#backToEntryButton").addEventListener("click", () => showVehicleStep("client"));
  $("#backToBillingFromClientButton").addEventListener("click", () => showVehicleStep("billing"));
  $("#backToBillingFromInvoiceButton").addEventListener("click", () => showVehicleStep("billing"));
  $("#saveBillingClientButton").addEventListener("click", saveBillingClient);
  $("#openInvoiceButton").addEventListener("click", openBillingInvoice);
  $("#finishBilledEntryButton").addEventListener("click", finishBilledEntry);
  $("#closeStatusDialog").addEventListener("click", closeStatusDialog);
  $("#statusOptions").addEventListener("click", (event) => {
    const removeService = event.target.closest("[data-remove-status-service]");
    if (removeService) {
      removeStatusServiceFromDialog(removeService.dataset.removeStatusService);
      return;
    }

    const removeProduct = event.target.closest("[data-remove-attendance-product]");
    if (removeProduct) {
      removeAttendanceProductFromVehicle(removeProduct.dataset.removeAttendanceProduct);
      return;
    }

    const action = event.target.closest("[data-status-action]");
    if (action) {
      handleStatusDialogAction(action.dataset.statusAction);
      return;
    }

    const option = event.target.closest("[data-status-option]");
    if (!option) return;
    const vehicle = getPatioVehicleById();
    if (vehicle?.status === "agendado" && option.dataset.statusOption === "aguardando") {
      renderScheduledEntryConfirmationPanel(vehicle);
      return;
    }
    updateVehicleStatus(option.dataset.statusOption);
  });
  $("#statusOptions").addEventListener("change", handleStatusDialogChange);
  $("#statusOptions").addEventListener("input", handleStatusDialogInput);
  ["#vehicleGrid", "#adminVehicleGrid"].forEach((selector) => {
    $(selector).addEventListener("click", (event) => {
      const card = event.target.closest("[data-vehicle-id]");
      if (!card) return;
      openStatusDialog(Number(card.dataset.vehicleId));
    });
  });
}

function showPatio(user) {
  activeSessionUser = user;
  $(".login-screen").classList.add("is-hidden");
  $("#adminShell").hidden = true;
  $("#patioScreen").hidden = false;
  $("#activeOperatorName").textContent = user;
  renderPatio();
  showToast(`Bem-vindo, ${user}.`);
}

function showAdmin(user) {
  activeSessionUser = user;
  $(".login-screen").classList.add("is-hidden");
  $("#patioScreen").hidden = true;
  $("#adminShell").hidden = false;
  $("#activeAdminName").textContent = user;
  showAdminView("dashboard");
  renderPatio();
  showToast(`Bem-vindo, ${user}.`);
}

function showAdminView(view) {
  if (view === "serviceEntry") {
    showAdminView("patio");
    window.setTimeout(() => openVehicleDialog("entry"), 0);
    return;
  }
  const normalizedView = view === "wallet" ? "businessFinance" : view;
  $$("[data-admin-view]").forEach((button) => {
    const isActive = button.dataset.adminView === normalizedView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  $$(".admin-view").forEach((section) => {
    const isActive = section.id === `admin${capitalize(normalizedView)}View`;
    section.hidden = !isActive;
    section.classList.toggle("is-active", isActive);
  });

  if (normalizedView === "dashboard") renderAdminDashboard();
  if (normalizedView === "patio") renderPatio();
  if (normalizedView === "quotes") renderPatioQuotes();
  if (!["dashboard", "patio", "quotes"].includes(normalizedView)) renderAdminScreen(normalizedView);
}

async function returnToLogin() {
  await flushRemoteStateSync();
  stopRemoteAutosave();
  if (hasSupabaseBrowserConfig()) {
    try {
      await signOutLavaprime();
    } catch (error) {
      console.error("Falha ao encerrar sessão remota.", error);
    }
  }
  $("#patioScreen").hidden = true;
  $("#adminShell").hidden = true;
  $(".login-screen").classList.remove("is-hidden");
  $("#loginPassword").value = "";
  $("#activeOperatorName").textContent = "";
  $("#activeAdminName").textContent = "";
  activeSessionUser = "";
  selectedProfile = "";
  $$(".profile-button").forEach((button) => {
    button.classList.remove("is-selected");
    button.setAttribute("aria-pressed", "false");
  });
  showToast("Sessão encerrada.");
}

function openVehicleDialog(mode = "entry") {
  vehicleEntryMode = mode;
  renderVehicleEntryOptions();
  updateVehicleDialogMode();
  updatePaymentAction();
  setInvoiceDateMin();
  refreshEntryVehicleSpecialCareSection({ preserveDraft: false });
  const dialog = $("#vehicleDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  $("#vehiclePlate").focus();
}

function closeVehicleDialog(options = {}) {
  const shouldReturnToClient = vehicleEntryMode === "client-registration" && Boolean(clientVehicleRegistrationContext);
  const dialog = $("#vehicleDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  resetVehicleForm();
  if (shouldReturnToClient) reopenClientDialogAfterVehicleRegistration(options.completedClientPlate || "");
}

function openScheduleDialog() {
  selectedScheduleVehicleId = null;
  const dialog = $("#scheduleDialog");
  dialog.innerHTML = renderScheduleDialog();
  initIcons();
  bindScheduleDialogControls(dialog);
  renderSchedulePlateResults("");
  setScheduleDateMin("#scheduleLookupDate");
  renderScheduleLookupTimeOptions();

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  $("#schedulePlateLookup").focus();
}

function closeScheduleDialog() {
  const dialog = $("#scheduleDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedScheduleVehicleId = null;
}

function renderScheduleDialog() {
  return `
    <form class="vehicle-box schedule-box" id="scheduleForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Agendamento</p>
          <h2>Novo agendamento</h2>
        </div>
        <button class="icon-button" id="closeScheduleDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <label class="login-field" for="schedulePlateLookup">
        <span>Placa</span>
        <input id="schedulePlateLookup" type="text" placeholder="ABC1D23" maxlength="8" autocomplete="off" required />
      </label>

      <div class="schedule-result-list" id="schedulePlateResults"></div>

      <section class="schedule-date-panel" id="scheduleDatePanel" hidden>
        <div class="schedule-selected-card" id="scheduleSelectedVehicle"></div>

        <div class="services-field schedule-services-field">
          <span>Serviços contratados</span>
          <div class="service-dropdown-row">
            <select id="scheduleServiceSelect" aria-label="Selecionar serviço contratado"></select>
            <button class="ghost-action" id="addScheduleServiceButton" type="button">
              <span data-icon="plus"></span>
              <span>Adicionar serviço</span>
            </button>
          </div>
          <div class="selected-services-list" id="scheduleServicesList" aria-label="Serviços contratados"></div>
        </div>

        <div class="vehicle-form-grid">
          <label class="login-field" for="schedulePayment">
            <span>Forma de pagamento</span>
            <select id="schedulePayment" required>
              <option value="">Selecione</option>
              ${getSelectablePaymentMethodNames("service").map((method) => `<option value="${escapeHtml(method)}">${escapeHtml(method)}</option>`).join("")}
            </select>
          </label>
          <label class="login-field" for="scheduleLookupDate">
            <span>Data do agendamento</span>
            <input id="scheduleLookupDate" type="date" required />
          </label>
          <label class="login-field" for="scheduleLookupTime">
            <span>Hora do agendamento</span>
            <select id="scheduleLookupTime" required></select>
          </label>
        </div>

        <section class="schedule-billing-panel" id="scheduleBillingPanel" hidden>
          <label class="login-field" for="scheduleInvoiceSelect">
            <span>Fatura</span>
            <select id="scheduleInvoiceSelect" disabled></select>
          </label>
          <p class="billing-warning" id="scheduleBillingHint"></p>
        </section>
      </section>

      <div class="dialog-actions">
        <button class="exit-button" id="cancelScheduleDialog" type="button">Cancelar</button>
        <button class="primary-button" id="confirmScheduleButton" type="submit" disabled>
          <span data-icon="check"></span>
          <span>Agendar</span>
        </button>
      </div>
    </form>
  `;
}

function bindScheduleDialogControls(dialog) {
  $("#closeScheduleDialog", dialog).addEventListener("click", closeScheduleDialog);
  $("#cancelScheduleDialog", dialog).addEventListener("click", closeScheduleDialog);
  $("#schedulePlateLookup", dialog).addEventListener("input", (event) => {
    event.currentTarget.value = formatPlate(event.currentTarget.value);
    selectedScheduleVehicleId = null;
    $("#scheduleDatePanel", dialog).hidden = true;
    $("#confirmScheduleButton", dialog).disabled = true;
    renderSchedulePlateResults(event.currentTarget.value);
  });
  $("#scheduleForm", dialog).addEventListener("submit", (event) => {
    event.preventDefault();
    createScheduleFromSelectedVehicle();
  });
  $("#addScheduleServiceButton", dialog).addEventListener("click", addScheduleServiceFromDropdown);
  $("#schedulePayment", dialog).addEventListener("change", updateScheduleBillingPanel);
}

function renderSchedulePlateResults(query) {
  const list = $("#schedulePlateResults");
  if (!list) return;

  const plate = formatPlate(query || "");
  if (!plate) {
    list.innerHTML = '<p class="empty-plates">Digite a placa para buscar no cadastro.</p>';
    return;
  }

  const matches = vehicleRegistry.filter((vehicle) => vehicle.plate.startsWith(plate)).slice(0, 6);
  if (matches.length) {
    list.innerHTML = matches.map(renderScheduleVehicleOption).join("");
  } else if (plate.length >= 7) {
    list.innerHTML = `
      <article class="schedule-result-empty">
        <p>Nenhuma placa cadastrada para ${escapeHtml(plate)}.</p>
        <button class="ghost-action" type="button" id="scheduleNewVehicleButton">
          <span data-icon="plus"></span>
          <span>Novo veículo</span>
        </button>
      </article>
    `;
  } else {
    list.innerHTML = '<p class="empty-plates">Nenhuma placa encontrada até aqui.</p>';
  }

  initIcons();
  $$("[data-schedule-vehicle-id]", list).forEach((button) => {
    button.addEventListener("click", () => selectScheduleVehicle(Number(button.dataset.scheduleVehicleId)));
  });
  $("#scheduleNewVehicleButton", list)?.addEventListener("click", () => {
    const typedPlate = $("#schedulePlateLookup").value;
    closeScheduleDialog();
    openVehicleDialog("schedule");
    $("#vehiclePlate").value = typedPlate;
    handleEntryPlateLookup(typedPlate);
    $("#vehiclePlate").focus();
  });
}

function renderScheduleVehicleOption(vehicle) {
  const owner = getVehicleOwnerName(vehicle);
  const description = [vehicle.brand, vehicle.model, vehicle.year].filter(Boolean).join(" ") || vehicle.model || "Veículo";
  return `
    <button class="schedule-plate-option" type="button" data-schedule-vehicle-id="${vehicle.id}">
      <strong>${escapeHtml(vehicle.plate)}</strong>
      <span>${escapeHtml(description)}</span>
      <small>${escapeHtml(owner)}</small>
    </button>
  `;
}

function selectScheduleVehicle(vehicleId) {
  const vehicle = findVehicleById(vehicleId);
  if (!vehicle) return;

  selectedScheduleVehicleId = vehicle.id;
  $("#schedulePlateLookup").value = vehicle.plate;
  $("#scheduleDatePanel").hidden = false;
  $("#confirmScheduleButton").disabled = false;
  $("#scheduleSelectedVehicle").innerHTML = renderScheduleSelectedVehicle(vehicle);
  renderScheduleServiceOptions(vehicle);
  updateScheduleBillingPanel();
  $("#scheduleLookupDate").focus();
}

function renderScheduleSelectedVehicle(vehicle) {
  const owner = getVehicleOwnerName(vehicle);
  const description = [vehicle.brand, vehicle.model, vehicle.color].filter(Boolean).join(" / ") || vehicle.model || "Veículo";
  return `
    <span>Placa selecionada</span>
    <strong>${escapeHtml(vehicle.plate)}</strong>
    <p>${escapeHtml(description)} - ${escapeHtml(owner)}</p>
  `;
}

function getScheduleServiceOptions(registryVehicle) {
  return getServicesForVehicleTypeAndCategory(registryVehicle.type, registryVehicle.category);
}

function renderScheduleServiceOptions(registryVehicle, selectedServices = []) {
  const select = $("#scheduleServiceSelect");
  if (!select) return;

  const services = getScheduleServiceOptions(registryVehicle);
  select.innerHTML = services.length
    ? services
        .map(
          (service) =>
            `<option value="${escapeHtml(service.name)}">${escapeHtml(formatServiceOptionLabel(service))}</option>`
        )
        .join("")
    : '<option value="">Nenhum serviço ativo</option>';

  const validSelectedServices = selectedServices.filter((serviceName) => services.some((service) => service.name === serviceName));
  renderSelectedScheduleServices(validSelectedServices.length ? validSelectedServices : [services[0]?.name].filter(Boolean));
}

function addScheduleServiceFromDropdown() {
  const select = $("#scheduleServiceSelect");
  const service = select?.value || "";
  if (!service) {
    showToast("Selecione um serviço contratado.");
    return;
  }

  const selectedServices = getSelectedScheduleServices();
  if (selectedServices.includes(service)) {
    showToast("Serviço já incluído.");
    return;
  }

  selectedServices.push(service);
  renderSelectedScheduleServices(selectedServices);
}

function getSelectedScheduleServices() {
  return $$('#scheduleServicesList input[name="scheduleServices"]').map((input) => input.value);
}

function renderSelectedScheduleServices(services) {
  const list = $("#scheduleServicesList");
  if (!list) return;

  list.innerHTML = services.length
    ? services
        .map((service) => {
          const registeredService = findServiceDefinition(service);
          const details = registeredService ? formatServiceDetails(registeredService) : "Serviço contratado";
          return `
            <span class="selected-service-chip">
              <input type="hidden" name="scheduleServices" value="${escapeHtml(service)}" />
              <span>
                <strong>${escapeHtml(service)}</strong>
                <small>${escapeHtml(details)}</small>
              </span>
              <button type="button" aria-label="Remover ${escapeHtml(service)}" data-remove-schedule-service="${escapeHtml(service)}">
                ${icons.x}
              </button>
            </span>
          `;
        })
        .join("")
    : '<p class="empty-plates">Nenhum serviço contratado.</p>';

  $$("[data-remove-schedule-service]", list).forEach((button) => {
    button.addEventListener("click", () => {
      renderSelectedScheduleServices(getSelectedScheduleServices().filter((service) => service !== button.dataset.removeScheduleService));
    });
  });
}

function updateScheduleBillingPanel() {
  const panel = $("#scheduleBillingPanel");
  const select = $("#scheduleInvoiceSelect");
  const hint = $("#scheduleBillingHint");
  if (!panel || !select || !hint) return;

  const isBilled = $("#schedulePayment")?.value === "Faturado";
  panel.hidden = !isBilled;
  select.disabled = true;
  select.required = false;
  select.innerHTML = '<option value="">Selecione a fatura</option>';
  hint.textContent = "";
  if (!isBilled) return;

  const registryVehicle = selectedScheduleVehicleId ? findVehicleById(selectedScheduleVehicleId) : null;
  const registryClient = getApprovedScheduleBillingClient(registryVehicle);
  if (!registryClient) {
    hint.textContent =
      "Esta placa não possui cliente faturado aprovado. Cadastre e aprove o cliente em Cadastros > Clientes antes de agendar como Faturado.";
    return;
  }

  const invoices = getOpenInvoicesByRegistryClient(registryClient);
  if (!invoices.length) {
    hint.textContent = "Cliente faturado aprovado, mas sem fatura aberta disponível para este agendamento.";
    return;
  }

  select.disabled = false;
  select.required = true;
  select.innerHTML = [
    '<option value="">Selecione a fatura</option>',
    ...invoices.map((invoice) => `<option value="${invoice.id}">${invoice.code} - vence ${formatDateBR(invoice.dueDate)}</option>`)
  ].join("");
  hint.textContent = `${getClientDisplayName(registryClient)} possui ${invoices.length} fatura(s) aberta(s).`;
}

function getApprovedScheduleBillingClient(registryVehicle) {
  if (!registryVehicle) return null;
  const client = registryVehicle.currentClientId ? getClientById(registryVehicle.currentClientId) : findClientByPlate(registryVehicle.plate);
  return isClientBillingApproved(client) ? client : null;
}

async function createScheduleFromSelectedVehicle() {
  const vehicle = selectedScheduleVehicleId ? findVehicleById(selectedScheduleVehicleId) : null;
  const dateInput = $("#scheduleLookupDate");
  const timeInput = $("#scheduleLookupTime");
  const paymentInput = $("#schedulePayment");
  const services = getSelectedScheduleServices();
  if (!vehicle) {
    showToast("Selecione uma placa cadastrada.");
    return;
  }
  if (!services.length) {
    showToast("Selecione ao menos um serviço contratado.");
    return;
  }
  if (!paymentInput.reportValidity() || !dateInput.reportValidity() || !timeInput.reportValidity()) return;
  if (!validateScheduleSlot(vehicle.plate, dateInput.value, timeInput.value)) {
    (!dateInput.value ? dateInput : timeInput).focus();
    return;
  }

  const scheduledVehicle = buildScheduledVehicleFromRegistry(vehicle, dateInput.value, timeInput.value, {
    services,
    payment: paymentInput.value
  });

  if (scheduledVehicle.payment === "Faturado") {
    const invoiceId = $("#scheduleInvoiceSelect").value;
    const invoice = billingInvoices.find((item) => String(item.id) === String(invoiceId));
    if (!invoice) {
      await showMessageBox({
        title: "Fatura obrigatória",
        message:
          "Para agendar como Faturado, selecione uma fatura aberta do cliente. Se não houver fatura disponível, abra uma nova na Central de Faturas após aprovação do administrador.",
        eyebrow: "Financeiro",
        confirmLabel: "Entendi"
      });
      return;
    }

    if (!attachVehicleToInvoice(scheduledVehicle, invoice)) {
      showToast("Não foi possível vincular a fatura ao agendamento.");
      return;
    }
  }

  closeScheduleDialog();
  addVehicleToPatio(scheduledVehicle);
}

function buildScheduledVehicleFromRegistry(registryVehicle, scheduledDate, scheduledTime, options = {}) {
  const client = registryVehicle.currentClientId ? getClientById(registryVehicle.currentClientId) : findClientByPlate(registryVehicle.plate);
  const defaultService = getDefaultServiceForRegistryVehicle(registryVehicle);
  const services = options.services?.length ? options.services : [defaultService?.name || "Agendamento"];
  return {
    id: getNextPatioVehicleId(),
    plate: registryVehicle.plate,
    brand: registryVehicle.brand || "",
    model: registryVehicle.model || registryVehicle.brand || "Veículo",
    color: registryVehicle.color || "Não informada",
    type: registryVehicle.type || "",
    category: registryVehicle.category || "",
    owner: client ? getClientDisplayName(client) : "Cliente não vinculado",
    phone: client?.phone || "",
    services,
    service: formatServices(services),
    payment: options.payment || "A definir",
    productsSold: [],
    attendanceHistory: [],
    entry: scheduledTime,
    scheduledDate,
    scheduledTime,
    status: "agendado"
  };
}

function getDefaultServiceForRegistryVehicle(registryVehicle) {
  return getServicesForVehicleTypeAndCategory(registryVehicle.type, registryVehicle.category)[0] || null;
}

function renderVehicleEntryOptions() {
  $("#vehicleType").innerHTML = vehicleTypes.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join("");
  $("#vehicleCategory").innerHTML = vehicleCategories
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("");
  const paymentSelect = $("#vehiclePayment");
  if (paymentSelect) {
    const selectedValue = paymentSelect.value || getPreferredPaymentMethodName("service");
    paymentSelect.innerHTML = `<option value="">Selecione</option>${renderPaymentOptions(selectedValue, true, "service")}`;
    paymentSelect.value = selectedValue;
  }
  renderScheduleTimeOptions();
  updateVehicleEntryCategoryState();
  renderVehicleServiceOptions();
}

function bindLocalVehicleModelLookup({ container = document, modelSelector, brandSelector = "", resultsSelector, typeSelector }) {
  const modelInput = $(modelSelector, container);
  const results = $(resultsSelector, container);
  if (!modelInput || !results || modelInput.dataset.localVehicleLookupBound === "true") return;

  const brandInput = brandSelector ? $(brandSelector, container) : null;
  const typeInput = $(typeSelector, container);
  let debounceTimer = 0;
  let requestId = 0;

  modelInput.dataset.localVehicleLookupBound = "true";
  modelInput.setAttribute("autocomplete", "off");
  modelInput.setAttribute("aria-autocomplete", "list");
  modelInput.setAttribute("aria-controls", results.id || "");

  const runLookup = () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(async () => {
      const query = modelInput.value.trim();
      const currentRequestId = ++requestId;

      if (brandInput && normalizeText(modelInput.dataset.selectedVehicleModel || "") !== normalizeText(query)) {
        brandInput.value = "";
      }

      if (query.length < localVehicleAutocompleteMinLength) {
        clearLocalVehicleResults(results);
        return;
      }

      renderLocalVehicleMessage(results, "Buscando no banco local de veículos...");

      try {
        const typeKey = getLocalVehicleTypeKey(typeInput?.value);
        const matches = await searchLocalVehicleModels(query, typeKey);
        if (currentRequestId !== requestId) return;
        renderLocalVehicleResults(results, matches, query);
      } catch (error) {
        if (currentRequestId !== requestId) return;
        renderLocalVehicleMessage(results, "Banco local indisponível. Continue preenchendo manualmente.");
      }
    }, 180);
  };

  modelInput.addEventListener("input", runLookup);
  modelInput.addEventListener("focus", () => {
    if (modelInput.value.trim().length >= localVehicleAutocompleteMinLength && results.innerHTML.trim()) {
      results.hidden = false;
    }
  });
  modelInput.addEventListener("blur", () => {
    window.setTimeout(() => {
      results.hidden = true;
    }, 140);
  });

  typeInput?.addEventListener("change", () => {
    clearLocalVehicleResults(results);
    runLookup();
  });

  results.addEventListener("mousedown", (event) => {
    if (event.target.closest("[data-local-vehicle-model]")) event.preventDefault();
  });

  results.addEventListener("click", (event) => {
    const option = event.target.closest("[data-local-vehicle-model]");
    if (!option) return;
    modelInput.value = option.dataset.localVehicleModel || "";
    modelInput.dataset.selectedVehicleModel = modelInput.value;
    modelInput.dataset.selectedVehicleBrand = option.dataset.localVehicleBrand || "";
    if (brandInput) brandInput.value = option.dataset.localVehicleBrand || "";
    clearLocalVehicleResults(results);
  });
}

function clearLocalVehicleResults(results) {
  if (!results) return;
  results.innerHTML = "";
  results.hidden = true;
}

function renderLocalVehicleMessage(results, message) {
  results.innerHTML = `<p class="vehicle-model-message">${escapeHtml(message)}</p>`;
  results.hidden = false;
}

function renderLocalVehicleResults(results, matches, query) {
  if (!matches.length) {
    renderLocalVehicleMessage(results, `Nenhum modelo encontrado para "${query}".`);
    return;
  }

  results.innerHTML = matches
    .map(
      (vehicle) => `
        <button
          class="vehicle-model-option"
          type="button"
          data-local-vehicle-model="${escapeHtml(vehicle.model)}"
          data-local-vehicle-brand="${escapeHtml(vehicle.brand)}"
        >
          <strong>${escapeHtml(vehicle.model)}</strong>
          <span>${escapeHtml(vehicle.brand)} · ${escapeHtml(vehicle.typeLabel || "Veículo")}</span>
        </button>
      `
    )
    .join("");
  results.hidden = false;
}

async function searchLocalVehicleModels(query, typeKey) {
  const database = await loadLocalVehicleDatabase();
  const normalizedQuery = normalizeSearchText(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  return database.vehicles
    .filter((vehicle) => !typeKey || vehicle.type === typeKey)
    .map((vehicle) => ({
      ...vehicle,
      score: getLocalVehicleMatchScore(vehicle, normalizedQuery, terms)
    }))
    .filter((vehicle) => vehicle.score > 0)
    .sort((first, second) => second.score - first.score || first.label.localeCompare(second.label, "pt-BR"))
    .slice(0, localVehicleAutocompleteLimit);
}

function getLocalVehicleMatchScore(vehicle, normalizedQuery, terms) {
  const searchable = vehicle.search || normalizeSearchText(`${vehicle.brand} ${vehicle.model}`);
  if (!terms.every((term) => searchable.includes(term))) return 0;

  const normalizedModel = normalizeSearchText(vehicle.model);
  const normalizedBrand = normalizeSearchText(vehicle.brand);
  let score = 10;
  if (normalizedModel === normalizedQuery) score += 120;
  else if (normalizedModel.startsWith(normalizedQuery)) score += 90;
  else if (normalizedModel.includes(normalizedQuery)) score += 55;
  if (normalizedBrand.startsWith(normalizedQuery)) score += 25;
  score += Math.max(0, 30 - normalizedModel.length / 5);
  return score;
}

async function loadLocalVehicleDatabase() {
  if (localVehicleDatabase) return localVehicleDatabase;
  if (window.localFipeVehicleDatabase) {
    localVehicleDatabase = {
      ...window.localFipeVehicleDatabase,
      vehicles: Array.isArray(window.localFipeVehicleDatabase.vehicles) ? window.localFipeVehicleDatabase.vehicles : []
    };
    return localVehicleDatabase;
  }
  if (!localVehicleDatabasePromise) {
    localVehicleDatabasePromise = fetch(localVehicleDatabaseUrl, { headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error(`Banco local HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => ({
        ...data,
        vehicles: Array.isArray(data.vehicles) ? data.vehicles : []
      }));
  }
  localVehicleDatabase = await localVehicleDatabasePromise;
  return localVehicleDatabase;
}

function getLocalVehicleTypeKey(vehicleType) {
  const normalizedType = normalizeText(vehicleType);
  if (normalizedType.includes("moto")) return "motorcycles";
  if (normalizedType.includes("caminhao")) return "trucks";
  return "cars";
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .toLowerCase()
    .trim();
}

function updateVehicleEntryCategoryState() {
  const type = $("#vehicleType")?.value || "";
  const categorySelect = $("#vehicleCategory");
  const categoryField = categorySelect?.closest(".login-field");
  if (!categorySelect || !categoryField) return;

  const hidden = !shouldUseVehicleCategory(type);
  categoryField.hidden = hidden;
  categorySelect.disabled = hidden;
  categorySelect.required = !hidden;
  if (hidden) categorySelect.value = "";
  else if (!categorySelect.value && vehicleCategories.length) categorySelect.value = vehicleCategories[0];
}

function getCurrentEntryVehicleType() {
  const selectedVehicle = getSelectedEntryRegistryVehicle();
  return selectedVehicle?.type || $("#vehicleType")?.value || pendingVehicle?.type || "Carro";
}

function getChecklistScopeForVehicleStep(step) {
  const scopes = {
    client: { scope: "vehicleClient", mount: "#vehicleClientChecklistMount" },
    schedule: { scope: "vehicleSchedule", mount: "#vehicleScheduleChecklistMount" },
    billing: { scope: "vehicleBilling", mount: "#vehicleBillingChecklistMount" }
  };
  return scopes[step] || null;
}

function renderActiveVehicleChecklist(checklist = null) {
  const activeStep = $(".vehicle-step.is-active")?.dataset.vehicleStep;
  renderVehicleChecklistForStep(activeStep, checklist);
}

function renderVehicleChecklistForStep(step, checklist = null) {
  const config = getChecklistScopeForVehicleStep(step);
  if (!config) return;

  const mount = $(config.mount);
  if (!mount) return;

  if (!shouldShowVehicleChecklistForStep(step)) {
    mount.innerHTML = "";
    return;
  }

  const vehicleType = pendingVehicle?.type || getCurrentEntryVehicleType();
  mount.innerHTML = renderChecklistPanel(config.scope, vehicleType, checklist);
  bindChecklistPanel(mount, config.scope, vehicleType);
}

function shouldShowVehicleChecklistForStep(step) {
  if (step === "client") return vehicleEntryMode === "entry" && $("#vehiclePayment")?.value !== "Faturado";
  if (step === "schedule") return vehicleEntryMode === "schedule";
  if (step === "billing") return vehicleEntryMode === "entry";
  return false;
}

function renderScheduleTimeOptions() {
  const select = $("#vehicleScheduleTime");
  if (!select) return;

  select.innerHTML = getScheduleTimeOptionsHtml(select.value);
}

function renderScheduleLookupTimeOptions() {
  const select = $("#scheduleLookupTime");
  if (!select) return;
  select.innerHTML = getScheduleTimeOptionsHtml(select.value);
}

function getScheduleTimeOptionsHtml(selectedValue = "") {
  const slots = getScheduleTimeSlots();
  return ['<option value="">Selecione o horário</option>']
    .concat(slots.map((slot) => `<option value="${slot}" ${slot === selectedValue ? "selected" : ""}>${slot}</option>`))
    .join("");
}

function getScheduleTimeSlots() {
  return Array.from({ length: 48 }, (_, index) => {
    const hour = String(Math.floor(index / 2)).padStart(2, "0");
    const minute = index % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });
}

function setScheduleDateMin(selector) {
  const input = $(selector);
  if (!input) return;
  input.min = getTodayISO();
}

function getScheduleDateTime(date, time) {
  if (!date || !time) return null;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  if (![year, month, day, hour, minute].every(Number.isFinite)) return null;
  return new Date(year, month - 1, day, hour, minute);
}

function validateScheduleSlot(plate, date, time, ignoredVehicleId = null) {
  const scheduledAt = getScheduleDateTime(date, time);
  if (!scheduledAt || scheduledAt.getTime() <= Date.now()) {
    showToast("Escolha uma data e hora futura para o agendamento.");
    return false;
  }

  const normalizedPlate = formatPlate(plate);
  const hasConflict = patioVehicles.some(
    (vehicle) =>
      vehicle.id !== ignoredVehicleId &&
      vehicle.status === "agendado" &&
      formatPlate(vehicle.plate) === normalizedPlate &&
      vehicle.scheduledDate === date &&
      vehicle.scheduledTime === time
  );

  if (hasConflict) {
    showToast("Este veículo já possui agendamento para este horário.");
    return false;
  }

  return true;
}

function updateVehicleDialogMode() {
  const isSchedule = vehicleEntryMode === "schedule";
  const isClientRegistration = vehicleEntryMode === "client-registration";
  const toggle = $("#vehicleScheduleToggle");
  const scheduleField = toggle?.closest(".vehicle-schedule-switch");
  if (toggle) {
    toggle.checked = isSchedule;
    toggle.disabled = isClientRegistration;
  }
  if (scheduleField) scheduleField.hidden = isClientRegistration;
  $("#vehicleDialogEyebrow").textContent = isClientRegistration ? "Cadastro de cliente" : isSchedule ? "Agendamento" : "Entrada no pátio";
  $("#vehicleDialogTitle").textContent = isClientRegistration ? "Novo veículo do cliente" : isSchedule ? "Novo veículo para agendamento" : "Novo veículo";
  $("#vehicleEntryStepCopy").textContent = "Dados do veículo";
  $("#vehicleDialog .services-field")?.toggleAttribute("hidden", isClientRegistration);
  const entryPaymentField = $("#vehicleEntryPaymentField");
  const paidAtEntryInput = $("#vehiclePaidAtEntry");
  const showEntryPayment = vehicleEntryMode === "entry";
  if (entryPaymentField) entryPaymentField.hidden = !showEntryPayment;
  if (!showEntryPayment && paidAtEntryInput) paidAtEntryInput.checked = false;
  $("#cancelVehicleEntry").textContent = isClientRegistration ? "Voltar ao cliente" : "Cancelar";
  const nextIcon = $("#nextVehicleEntryButton [data-icon]");
  const nextLabel = $("#nextVehicleEntryButton span:last-child");
  if (nextIcon) {
    nextIcon.dataset.icon = isClientRegistration ? "check" : "login";
    nextIcon.innerHTML = icons[nextIcon.dataset.icon] || nextIcon.innerHTML;
  }
  if (nextLabel) nextLabel.textContent = isClientRegistration ? "Salvar veículo" : "Próximo";

  setScheduleDateMin("#vehicleScheduleDate");
  renderScheduleTimeOptions();
  updateVehicleEntryPaymentState();
}

function updateVehicleEntryPaymentState() {
  const paymentSelect = $("#vehiclePayment");
  const paidAtEntryInput = $("#vehiclePaidAtEntry");
  if (!paymentSelect || !paidAtEntryInput) return;

  const paidAtEntry = vehicleEntryMode === "entry" && paidAtEntryInput.checked;
  const billedOption = Array.from(paymentSelect.options).find((option) => option.value === "Faturado");
  if (billedOption) {
    billedOption.disabled = paidAtEntry;
    billedOption.hidden = paidAtEntry;
  }

  if (paidAtEntry && paymentSelect.value === "Faturado") {
    paymentSelect.value = "";
  }
}

function handleVehicleScheduleToggle(event) {
  vehicleEntryMode = event.currentTarget.checked ? "schedule" : "entry";
  pendingVehicle = selectedEntryVehicleId ? pendingVehicle : null;
  updateVehicleDialogMode();
  updatePaymentAction();

  const activeStep = $(".vehicle-step.is-active")?.dataset.vehicleStep;
  if (activeStep === "schedule" && vehicleEntryMode === "entry") {
    showVehicleStep("client");
  }
}

function getEntryServiceOptions() {
  const selectedVehicle = getSelectedEntryRegistryVehicle();
  const vehicleType = selectedVehicle?.type || $("#vehicleType")?.value || "";
  const vehicleCategory = selectedVehicle?.category || $("#vehicleCategory")?.value || "";
  return getServicesForVehicleTypeAndCategory(vehicleType, vehicleCategory);
}

function renderVehicleServiceOptions(options = {}) {
  const services = getEntryServiceOptions();
  const select = $("#vehicleServiceSelect");
  if (!select) return;

  select.innerHTML = services
    .map(
      (service) =>
        `<option value="${escapeHtml(service.name)}">${escapeHtml(formatServiceOptionLabel(service))}</option>`
    )
    .join("");

  const selectedServices = options.preserveSelected
    ? getSelectedEntryServices().filter((serviceName) => services.some((service) => service.name === serviceName))
    : [];
  renderSelectedEntryServices(selectedServices.length ? selectedServices : [services[0]?.name].filter(Boolean));
}

function addEntryServiceFromDropdown() {
  const select = $("#vehicleServiceSelect");
  const service = select.value;
  if (!service) {
    showToast("Selecione um serviço contratado.");
    return;
  }

  const selectedServices = getSelectedEntryServices();
  if (selectedServices.includes(service)) {
    showToast("Serviço já incluído.");
    return;
  }

  selectedServices.push(service);
  renderSelectedEntryServices(selectedServices);
}

function renderSelectedEntryServices(services) {
  const list = $("#vehicleServicesList");
  list.innerHTML = services.length
    ? services
        .map((service) => {
          const registeredService = findServiceDefinition(service);
          const details = registeredService ? formatServiceDetails(registeredService) : "Serviço contratado";
          return `
            <span class="selected-service-chip">
              <input type="hidden" name="services" value="${escapeHtml(service)}" />
              <span>
                <strong>${escapeHtml(service)}</strong>
                <small>${escapeHtml(details)}</small>
              </span>
              <button type="button" aria-label="Remover ${escapeHtml(service)}" data-remove-entry-service="${escapeHtml(service)}">
                ${icons.x}
              </button>
            </span>
          `;
        })
        .join("")
    : '<p class="empty-plates">Nenhum serviço contratado.</p>';

  $$("[data-remove-entry-service]", list).forEach((button) => {
    button.addEventListener("click", () => {
      renderSelectedEntryServices(getSelectedEntryServices().filter((service) => service !== button.dataset.removeEntryService));
    });
  });
  refreshEntryVehicleSpecialCareSection();
  maybeShowEntryVehicleCareSelectionAlert();
}

function goToVehicleClientStep() {
  if (vehicleEntryMode === "client-registration") {
    saveClientVehicleRegistrationFromDialog();
    return;
  }

  const selectedVehicle = getSelectedEntryRegistryVehicle();
  const requiredFields = selectedVehicle
    ? ["#vehiclePlate"]
    : ["#vehiclePlate", "#vehicleModel", "#vehicleType"].concat(shouldUseVehicleCategory($("#vehicleType").value) ? ["#vehicleCategory"] : []);
  const isValid = requiredFields.every((selector) => $(selector).reportValidity());
  if (!isValid) return;

  if (!getSelectedEntryServices().length) {
    showToast("Selecione ao menos um serviço contratado.");
    return;
  }

  showVehicleStep("client");
  $("#vehiclePhone").focus();
}

function saveClientVehicleRegistrationFromDialog() {
  const selectedVehicle = getSelectedEntryRegistryVehicle();
  const requiredFields = selectedVehicle
    ? ["#vehiclePlate"]
    : ["#vehiclePlate", "#vehicleModel", "#vehicleType"].concat(shouldUseVehicleCategory($("#vehicleType").value) ? ["#vehicleCategory"] : []);
  const isValid = requiredFields.every((selector) => $(selector).reportValidity());
  if (!isValid) return;

  const form = $("#vehicleForm");
  const data = new FormData(form);
  const plate = formatPlate(data.get("plate"));
  const linkedClient = getClientLinkedToPlate(plate);
  if (linkedClient && linkedClient.id !== selectedClientId) {
    showToast(`${plate} já está vinculada a ${getClientDisplayName(linkedClient)}.`);
    $("#vehiclePlate").focus();
    return;
  }

  const existingVehicle = findVehicleByPlate(plate);
  if (!existingVehicle) {
    const selectedColor = String(data.get("color") || "").trim();
    const otherColor = String(data.get("otherColor") || "").trim();
    const color = selectedColor === "Outra" ? otherColor : selectedColor;
    const type = String(data.get("type") || "").trim() || "Carro";

    if (!color) {
      showToast("Informe a cor do veículo.");
      $("#vehicleOtherColor").focus();
      return;
    }

    vehicleRegistry.unshift({
      id: getNextVehicleId(),
      plate,
      brand: String(data.get("brand") || $("#vehicleModel").dataset.selectedVehicleBrand || "").trim(),
      model: String(data.get("model") || "").trim(),
      year: "",
      color,
      type,
      category: getVehicleCategoryValue(type, String(data.get("category") || "").trim()),
      fuel: "Outro",
      currentClientId: null,
      notes: "Criado a partir do cadastro de clientes.",
      ownerHistory: [],
      serviceHistory: [],
      checklistHistory: []
    });
    renderAdminDashboard();
  }

  if (!pendingClientPlates.includes(plate)) pendingClientPlates.push(plate);
  closeVehicleDialog({ completedClientPlate: plate });
}

async function handleVehicleEntrySubmit() {
  if (vehicleEntryMode === "client-registration") {
    saveClientVehicleRegistrationFromDialog();
    return;
  }

  const form = $("#vehicleForm");
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const vehicle = buildVehicleFromForm(data, { requireSchedule: false });
  if (!vehicle) return;

  if (!(await confirmOpenPaymentsForEntry(vehicle))) return;

  if (vehicle.payment !== "Faturado" && vehicleEntryMode !== "schedule" && !attachChecklistFromPanel(vehicle, form, "vehicleClient")) {
    return;
  }

  const ownershipReady = await resolveEntryOwnership(vehicle);
  if (!ownershipReady) return;

  const entryCareDraft = captureEntryVehicleSpecialCareDraft();
  const conflictResult = getEntryVehicleSpecialCareConflictResult(entryCareDraft);
  if (!(await ensureVehicleCareWarningAcknowledged(vehicle, conflictResult, "attendance_save"))) return;

  if (vehicle.payment === "Faturado") {
    const billingClient = getApprovedBillingClientForEntry(vehicle);
    if (!billingClient) {
      await showMessageBox({
        title: "Cadastro faturado obrigatório",
        message:
          "Para lançar como Faturado, o cliente precisa estar cadastrado como faturado e aprovado por um administrador na tela Cadastros > Clientes.",
        confirmLabel: "Entendi"
      });
      return;
    }

    pendingVehicle = vehicle;
    selectedBillingClientId = String(billingClient.billingClientId);
    renderBillingSelectors();
    showVehicleStep("billing");
    return;
  }

  if (vehicleEntryMode === "schedule") {
    pendingVehicle = vehicle;
    showVehicleStep("schedule");
    $("#vehicleScheduleDate").focus();
    return;
  }

  addVehicleToPatio(vehicle);
}

function buildVehicleFromForm(data, { requireSchedule = vehicleEntryMode === "schedule" } = {}) {
  const now = new Date();
  const entry = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const selectedRegistryVehicle = getSelectedEntryRegistryVehicle();
  const selectedRegistryClient = selectedRegistryVehicle
    ? selectedRegistryVehicle.currentClientId
      ? getClientById(selectedRegistryVehicle.currentClientId)
      : findClientByPlate(selectedRegistryVehicle.plate)
    : null;
  const isSchedule = vehicleEntryMode === "schedule";
  const scheduledDate = String(data.get("scheduleDate") || "").trim();
  const scheduledTime = String(data.get("scheduleTime") || "").trim();
  const selectedColor = String(data.get("color")).trim();
  const otherColor = String(data.get("otherColor")).trim();
  const color = selectedRegistryVehicle ? selectedRegistryVehicle.color || "Não informada" : selectedColor === "Outra" ? otherColor : selectedColor;
  const services = data.getAll("services").map((service) => String(service).trim()).filter(Boolean);
  const type = selectedRegistryVehicle?.type || String(data.get("type") || "").trim();
  const category = selectedRegistryVehicle?.category || String(data.get("category") || "").trim();
  const brand = selectedRegistryVehicle?.brand || String(data.get("brand") || "").trim();

  if (!color) {
    showToast("Informe a cor do veículo.");
    $("#vehicleOtherColor").focus();
    return null;
  }

  if (!services.length) {
    showToast("Selecione ao menos um serviço contratado.");
    showVehicleStep("entry");
    return null;
  }

  if (isSchedule && requireSchedule && (!scheduledDate || !scheduledTime)) {
    showToast("Informe data e hora do agendamento.");
    showVehicleStep("schedule");
    (!scheduledDate ? $("#vehicleScheduleDate") : $("#vehicleScheduleTime")).focus();
    return null;
  }

  const payment = String(data.get("payment")).trim();
  const paymentAtEntry = vehicleEntryMode === "entry" && data.get("paidAtEntry") === "on";
  if (paymentAtEntry && payment === "Faturado") {
    showToast("Pagamento na entrada nao permite forma de pagamento Faturado.");
    showVehicleStep("client");
    $("#vehiclePayment")?.focus();
    return null;
  }

  return {
    id: getNextPatioVehicleId(),
    plate: selectedRegistryVehicle?.plate || String(data.get("plate")).trim().toUpperCase(),
    brand,
    model: selectedRegistryVehicle?.model || selectedRegistryVehicle?.brand || String(data.get("model")).trim(),
    color,
    type,
    category: getVehicleCategoryValue(type, category),
    owner: selectedRegistryClient ? getClientDisplayName(selectedRegistryClient) : String(data.get("owner")).trim(),
    phone: selectedRegistryClient?.phone || String(data.get("phone")).trim(),
    services,
    service: formatServices(services),
    payment,
    paymentAtEntry,
    entryPaymentMethod: paymentAtEntry ? payment : "",
    entryPaymentRegisteredAt: paymentAtEntry ? entry : "",
    paymentStatus: paymentAtEntry ? "Pago na entrada" : "A confirmar",
    paymentConfirmed: false,
    paymentOpen: false,
    partialPaymentOpen: false,
    partialPaidAmount: 0,
    partialBalance: 0,
    productsSold: [],
    attendanceHistory: [],
    specialCareWarningsAcknowledged: false,
    specialCareWarningSignature: "",
    specialCareWarningLog: [],
    entry: isSchedule && scheduledTime ? scheduledTime : entry,
    scheduledDate: isSchedule ? scheduledDate : "",
    scheduledTime: isSchedule ? scheduledTime : "",
    status: isSchedule ? "agendado" : "aguardando"
  };
}

function finishVehicleScheduleFromDialog() {
  const dateInput = $("#vehicleScheduleDate");
  const timeInput = $("#vehicleScheduleTime");
  if (!dateInput.reportValidity() || !timeInput.reportValidity()) return;

  const vehicle = pendingVehicle || buildVehicleFromForm(new FormData($("#vehicleForm")), { requireSchedule: true });
  if (!vehicle) return;

  if (!validateScheduleSlot(vehicle.plate, dateInput.value, timeInput.value, vehicle.id)) {
    (!dateInput.value ? dateInput : timeInput).focus();
    return;
  }

  if (!attachChecklistFromPanel(vehicle, $("#vehicleForm"), "vehicleSchedule")) return;

  vehicle.scheduledDate = dateInput.value;
  vehicle.scheduledTime = timeInput.value;
  vehicle.entry = timeInput.value;
  vehicle.status = "agendado";
  addVehicleToPatio(vehicle);
}

function getSelectedEntryServices() {
  return $$('#vehicleServicesList input[name="services"]').map((input) => input.value);
}

function formatServices(services) {
  return services.join(", ");
}

async function resolveEntryOwnership(vehicle) {
  const registeredVehicle = findVehicleByPlate(vehicle.plate);
  const linkedClient = registeredVehicle?.currentClientId
    ? getClientById(registeredVehicle.currentClientId)
    : findClientByPlate(vehicle.plate);
  const typedClient = findClientByPhone(vehicle.phone);

  if (linkedClient && entryOwnerWasChanged(vehicle, linkedClient)) {
    const shouldTransfer = await showMessageBox({
      title: "Transferir placa?",
      message: `${vehicle.plate} está vinculada a ${getClientDisplayName(linkedClient)}. Deseja transferir esta placa para o cadastro informado agora? O histórico do veículo será mantido.`,
      eyebrow: "Proprietário diferente",
      confirmLabel: "Sim, transferir",
      cancelLabel: "Não",
      confirmOnly: false
    });

    if (!shouldTransfer) {
      fillEntryOwnerFromClient(linkedClient);
      vehicle.owner = getClientDisplayName(linkedClient);
      vehicle.phone = linkedClient.phone;
      showToast("Placa mantida no cadastro atual.");
      return true;
    }

    if (vehicle.payment === "Faturado" && !isClientBillingApproved(typedClient)) {
      await showMessageBox({
        title: "Transferência faturada não permitida",
        message:
          "Para transferir uma placa e lançar como Faturado, o novo proprietário precisa estar cadastrado como cliente faturado aprovado por um administrador.",
        confirmLabel: "Entendi"
      });
      return false;
    }

    const newClient = typedClient || createCasualClientFromEntry(vehicle);
    transferPlateToClient(vehicle.plate, newClient.id);
    return true;
  }

  if (linkedClient) {
    fillEntryOwnerFromClient(linkedClient);
    vehicle.owner = getClientDisplayName(linkedClient);
    vehicle.phone = linkedClient.phone;
    return true;
  }

  if (vehicle.payment === "Faturado") {
    if (!isClientBillingApproved(typedClient)) {
      await showMessageBox({
        title: "Cliente faturado não aprovado",
        message:
          "Esta placa ainda não tem cadastro faturado aprovado. Cadastre o cliente em Cadastros > Clientes, marque Cliente faturado e ative a aprovação do administrador.",
        confirmLabel: "Entendi"
      });
      return false;
    }

    transferPlateToClient(vehicle.plate, typedClient.id);
    return true;
  }

  const client = typedClient || createCasualClientFromEntry(vehicle);
  transferPlateToClient(vehicle.plate, client.id);
  return true;
}

async function confirmOpenPaymentsForEntry(vehicle) {
  const registeredVehicle = findVehicleByPlate(vehicle.plate);
  const client =
    (registeredVehicle?.currentClientId ? getClientById(registeredVehicle.currentClientId) : null) ||
    findClientByPlate(vehicle.plate) ||
    findClientByPhone(vehicle.phone);
  if (!client) return true;

  const pendingPayments = getOpenPaymentsByClientId(client.id);
  if (!pendingPayments.length) return true;

  const total = pendingPayments.reduce((sum, payment) => sum + Number(payment.value || 0), 0);
  return showMessageBox({
    title: "Cliente com pagamento em aberto",
    message: `${getClientDisplayName(client)} possui ${pendingPayments.length} pagamento(s) em aberto, totalizando ${formatCurrency(total)}. Deseja continuar com a entrada deste novo serviço?`,
    eyebrow: "Financeiro",
    confirmLabel: "Continuar",
    cancelLabel: "Cancelar entrada",
    confirmOnly: false
  });
}

function handleEntryPlateLookup(plateValue) {
  const plate = formatPlate(plateValue);
  const list = $("#vehiclePlateResults");
  if (!list) return;

  const selectedVehicle = getSelectedEntryRegistryVehicle();
  if (selectedVehicle && selectedVehicle.plate !== plate) {
    clearSelectedEntryRegistration();
  }

  if (!plate) {
    clearEntryPlateResults();
    return;
  }

  const matches = vehicleRegistry.filter((vehicle) => vehicle.plate.startsWith(plate)).slice(0, 6);
  if (!matches.length) {
    if (vehicleEntryMode === "client-registration") {
      clearEntryPlateResults();
      return;
    }
    if (plate.length >= 7) {
      list.hidden = false;
      list.innerHTML = renderEntryNewClientOption(plate);
      $("#entryNewClientButton", list)?.addEventListener("click", () => handleEntryNewClientAction());
      return;
    }
    clearEntryPlateResults();
    return;
  }

  list.hidden = false;
  list.innerHTML = matches.map(renderEntryVehicleOption).join("");
  $$("[data-entry-vehicle-id]", list).forEach((button) => {
    button.addEventListener("click", () => selectEntryVehicle(Number(button.dataset.entryVehicleId)));
  });
}

function renderEntryNewClientOption(plate) {
  return `
    <button class="schedule-plate-option entry-plate-option" type="button" id="entryNewClientButton">
      <strong>${escapeHtml(plate)}</strong>
      <span>Cadastrar novo cliente</span>
      <small>Complete os dados do veículo e avance para o cadastro do cliente.</small>
    </button>
  `;
}

function handleEntryNewClientAction() {
  clearEntryPlateResults();
  showToast("Complete os dados do veículo e avance para cadastrar o cliente.");
  $("#vehicleModel").focus();
}

function renderEntryVehicleOption(vehicle) {
  const owner = getVehicleOwnerName(vehicle);
  const description = [vehicle.brand, vehicle.model, vehicle.color].filter(Boolean).join(" / ") || vehicle.model || "Veículo";
  return `
    <button class="schedule-plate-option entry-plate-option" type="button" data-entry-vehicle-id="${vehicle.id}">
      <strong>${escapeHtml(vehicle.plate)}</strong>
      <span>${escapeHtml(description)}</span>
      <small>${escapeHtml(owner)}</small>
    </button>
  `;
}

async function selectEntryVehicle(vehicleId) {
  const vehicle = findVehicleById(vehicleId);
  if (!vehicle) return;

  $("#vehiclePlate").value = vehicle.plate;
  clearEntryPlateResults();
  selectedEntryVehicleId = vehicle.id;
  fillEntryFromVehicle(vehicle);
  renderEntryLinkedRegistration(vehicle);
  setEntryRegistrationReadonly(true);
  await notifyOpenInvoicesForVehicle(vehicle);
  const canContinue = await confirmOpenPaymentsForEntry({
    plate: vehicle.plate,
    phone: getClientById(vehicle.currentClientId)?.phone || ""
  });
  if (!canContinue) {
    clearSelectedEntryRegistration();
    $("#vehiclePlate").value = "";
    $("#vehiclePlate").focus();
  }
}

function clearEntryPlateResults() {
  const list = $("#vehiclePlateResults");
  if (!list) return;
  list.innerHTML = "";
  list.hidden = true;
}

function getSelectedEntryRegistryVehicle() {
  return selectedEntryVehicleId ? findVehicleById(selectedEntryVehicleId) : null;
}

function clearSelectedEntryRegistration() {
  selectedEntryVehicleId = null;
  setEntryRegistrationReadonly(false);
  renderEntryLinkedRegistration(null);
  $("#vehicleBrand").value = "";
  $("#vehicleModel").value = "";
  delete $("#vehicleModel").dataset.selectedVehicleModel;
  delete $("#vehicleModel").dataset.selectedVehicleBrand;
  clearLocalVehicleResults($("#vehicleModelResults"));
  $("#vehicleOwner").value = "";
  $("#vehiclePhone").value = "";
  if ($("#vehicleType option").length) $("#vehicleType").value = vehicleTypes[0] || "";
  updateVehicleEntryCategoryState();
  resetVehicleColor();
  renderVehicleServiceOptions();
  refreshEntryVehicleSpecialCareSection();
}

function fillEntryFromVehicle(vehicle) {
  $("#vehicleBrand").value = vehicle.brand || "";
  $("#vehicleModel").value = vehicle.model || $("#vehicleModel").value;
  if (vehicle.color) setEntryVehicleColor(vehicle.color);
  if (vehicle.type && vehicleTypes.includes(vehicle.type)) $("#vehicleType").value = vehicle.type;
  if (vehicle.category && vehicleCategories.includes(vehicle.category)) $("#vehicleCategory").value = vehicle.category;
  updateVehicleEntryCategoryState();
  renderVehicleServiceOptions();

  const client = vehicle.currentClientId ? getClientById(vehicle.currentClientId) : findClientByPlate(vehicle.plate);
  if (!client) {
    refreshEntryVehicleSpecialCareSection();
    return;
  }
  fillEntryOwnerFromClient(client);
  refreshEntryVehicleSpecialCareSection();
}

function renderEntryLinkedRegistration(vehicle) {
  const panel = $("#entryLinkedRecord");
  if (!panel) return;

  if (!vehicle) {
    panel.innerHTML = "";
    panel.hidden = true;
    return;
  }

  const client = vehicle.currentClientId ? getClientById(vehicle.currentClientId) : findClientByPlate(vehicle.plate);
  const owner = client ? getClientDisplayName(client) : "Cliente não vinculado";
  panel.hidden = false;
  panel.innerHTML = `
    <div>
      <strong>Cadastro localizado</strong>
      <span>${escapeHtml(vehicle.plate)} - ${escapeHtml(formatEntryLinkedVehicleDetails(vehicle))}</span>
      <small>${escapeHtml(owner)}${client?.phone ? ` / ${escapeHtml(client.phone)}` : ""}</small>
    </div>
    <div class="entry-linked-actions">
      <button class="ghost-action" type="button" data-edit-entry-vehicle="${vehicle.id}">
        <span data-icon="carFront"></span>
        <span>Editar veículo</span>
      </button>
      ${
        client
          ? `<button class="ghost-action" type="button" data-edit-entry-client="${client.id}">
              <span data-icon="users"></span>
              <span>Editar cliente</span>
            </button>`
          : ""
      }
    </div>
  `;
  initIcons();
  $("[data-edit-entry-vehicle]", panel)?.addEventListener("click", () => openEntryVehicleRegistryEditor(vehicle.id));
  $("[data-edit-entry-client]", panel)?.addEventListener("click", () => openEntryClientRegistryEditor(client.id));
}

function formatEntryLinkedVehicleDetails(vehicle) {
  const vehicleDescription = formatVehicleDisplayName(vehicle);
  return [
    vehicleDescription,
    vehicle.color ? `Cor: ${vehicle.color}` : "Cor não informada",
    formatVehicleScope(vehicle.type, vehicle.category)
  ]
    .filter(Boolean)
    .join(" / ");
}

function formatVehicleDisplayName(vehicle) {
  const brand = vehicle?.brand || "";
  const model = vehicle?.model || "";
  if (brand && model && normalizeText(brand) !== normalizeText(model)) return `${brand} ${model}`;
  return model || brand || "Veículo";
}

function setEntryRegistrationReadonly(isReadonly) {
  ["#vehicleModel", "#vehicleOtherColor", "#vehicleOwner", "#vehiclePhone"].forEach((selector) => {
    const input = $(selector);
    if (!input) return;
    input.readOnly = isReadonly;
    input.classList.toggle("is-readonly", isReadonly);
  });

  ["#vehicleType", "#vehicleCategory"].forEach((selector) => {
    const input = $(selector);
    if (!input) return;
    input.disabled = isReadonly || (selector === "#vehicleCategory" && !shouldUseVehicleCategory(getCurrentEntryVehicleType()));
    input.classList.toggle("is-readonly", isReadonly);
  });

  $$(".color-swatch").forEach((button) => {
    button.disabled = isReadonly;
    button.classList.toggle("is-readonly", isReadonly);
  });

  $(".entry-model-field")?.toggleAttribute("hidden", isReadonly);
  $(".entry-color-field")?.toggleAttribute("hidden", isReadonly);
  $(".other-color-field")?.toggleAttribute("hidden", isReadonly || $("#vehicleColor")?.value !== "Outra");
  $("#vehicleModel").required = !isReadonly;
}

function openEntryVehicleRegistryEditor(vehicleId) {
  if (!$("#adminShell").hidden) {
    openEntryVehicleRegistryDialog(vehicleId);
    return;
  }

  showMessageBox({
    title: "Edição restrita",
    message: "A edição do cadastro do veículo deve ser feita por um administrador em Cadastros > Veículos.",
    confirmLabel: "Entendi"
  });
}

function openEntryClientRegistryEditor(clientId) {
  if (!$("#adminShell").hidden) {
    entryRegistryEditContext = { type: "client", source: "entry", vehicleId: selectedEntryVehicleId, clientId };
    openClientDialog(clientId);
    return;
  }

  showMessageBox({
    title: "Edição restrita",
    message: "A edição do cadastro do cliente deve ser feita por um administrador em Cadastros > Clientes.",
    confirmLabel: "Entendi"
  });
}

function refreshEntryRegistrationAfterEdit() {
  const vehicleId = entryRegistryEditContext?.vehicleId || selectedEntryVehicleId;
  const vehicle = vehicleId ? findVehicleById(vehicleId) : null;
  if (!vehicle || !$("#vehicleDialog")?.open) return;

  selectedEntryVehicleId = vehicle.id;
  $("#vehiclePlate").value = vehicle.plate;
  fillEntryFromVehicle(vehicle);
  renderEntryLinkedRegistration(vehicle);
  setEntryRegistrationReadonly(true);
  renderVehicleServiceOptions({ preserveSelected: true });
}

function refreshLinkedRegistrationAfterEdit() {
  if (entryRegistryEditContext?.source === "quote") {
    refreshQuoteRegistrationAfterEdit();
    return;
  }
  refreshEntryRegistrationAfterEdit();
}

function openEntryVehicleRegistryDialog(vehicleId) {
  const vehicle = findVehicleById(vehicleId);
  if (!vehicle) {
    showToast("Veículo não localizado.");
    return;
  }

  entryRegistryEditContext = {
    type: "vehicle",
    source: entryRegistryEditContext?.source || "entry",
    vehicleId
  };
  selectedVehicleSpecialCareId = null;
  selectedVehicleId = vehicleId;
  vehicleRegistryDialogSource = "entry";
  const dialog = $("#vehicleRegistryDialog");
  dialog.innerHTML = renderVehicleRegistryDialogForm(vehicle);
  initIcons();
  bindEntryVehicleRegistryDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  window.setTimeout(() => $("#vehicleRegistryBrand", dialog)?.focus(), 0);
}

function closeEntryVehicleRegistryDialog() {
  const dialog = $("#vehicleRegistryDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedVehicleSpecialCareId = null;
  selectedVehicleId = null;
  vehicleRegistryDialogSource = "";
  refreshLinkedRegistrationAfterEdit();
  entryRegistryEditContext = null;
}

function openAdminVehicleRegistryDialog(vehicleId = null) {
  const vehicle = vehicleId ? findVehicleById(vehicleId) : null;
  if (vehicleId && !vehicle) {
    showToast("Veiculo nao localizado.");
    return;
  }

  selectedVehicleSpecialCareId = null;
  selectedVehicleId = vehicle?.id || null;
  vehicleRegistryDialogSource = "admin";
  const dialog = $("#vehicleRegistryDialog");
  if (!dialog) return;

  dialog.innerHTML = renderVehicleRegistryDialogForm(vehicle);
  initIcons();
  bindAdminVehicleRegistryDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  window.setTimeout(() => {
    const focusTarget = vehicle ? "#vehicleRegistryBrand" : "#vehicleRegistryPlate";
    $(focusTarget, dialog)?.focus();
  }, 0);
}

function closeAdminVehicleRegistryDialog() {
  const dialog = $("#vehicleRegistryDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedVehicleSpecialCareId = null;
  selectedVehicleId = null;
  vehicleRegistryDialogSource = "";
}

function openVehicleHistoryDialog(vehicleId) {
  const vehicle = findVehicleById(vehicleId);
  if (!vehicle) {
    showToast("Veiculo nao localizado.");
    return;
  }

  const dialog = $("#vehicleHistoryDialog");
  if (!dialog) return;

  dialog.innerHTML = renderVehicleHistoryDialog(vehicle);
  initIcons();
  bindVehicleHistoryDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeVehicleHistoryDialog() {
  const dialog = $("#vehicleHistoryDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
}

function openVehicleOwnerTransferDialog(vehicleId = selectedVehicleId) {
  const vehicle = findVehicleById(vehicleId);
  if (!vehicle) {
    showToast("Selecione um veiculo para alterar o proprietario.");
    return;
  }

  selectedVehicleOwnerTransferId = vehicle.id;
  const dialog = $("#vehicleOwnerTransferDialog");
  if (!dialog) return;

  dialog.innerHTML = renderVehicleOwnerTransferDialog(vehicle);
  bindVehicleOwnerTransferDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeVehicleOwnerTransferDialog() {
  const dialog = $("#vehicleOwnerTransferDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedVehicleOwnerTransferId = null;
}

function getVehicleOwnerTransferSearchMode(value) {
  return vehicleOwnerTransferSearchModes.find((item) => item.value === value) || vehicleOwnerTransferSearchModes[0];
}

function getVehicleOwnerTransferSearchMatches(searchMode, query) {
  const rawQuery = String(query || "").trim();
  if (!rawQuery) return clientRegistry;

  const normalizedQuery = normalizeText(rawQuery);
  const digitsQuery = onlyDigits(rawQuery);
  const plateQuery = formatPlate(rawQuery);

  return clientRegistry.filter((client) => {
    if (searchMode === "document") {
      return digitsQuery ? onlyDigits(client.document || "").includes(digitsQuery) : false;
    }

    if (searchMode === "phone") {
      return digitsQuery ? onlyDigits(client.phone || "").includes(digitsQuery) : false;
    }

    if (searchMode === "plates") {
      if (plateQuery) return (client.plates || []).some((plate) => formatPlate(plate).includes(plateQuery));
      return (client.plates || []).some((plate) => normalizeText(plate).includes(normalizedQuery));
    }

    return [client.name, client.legalName].some((value) => normalizeText(value).includes(normalizedQuery));
  });
}

function getVehicleOwnerTransferSearchHint(searchMode, query, clients) {
  if (!String(query || "").trim()) {
    return `${clientRegistry.length} clientes disponiveis. Busque por ${searchMode.label.toLowerCase()}.`;
  }

  if (!clients.length) return `Nenhum cliente encontrado para ${searchMode.label.toLowerCase()}.`;
  if (clients.length === 1) return "1 cliente encontrado.";
  return `${clients.length} clientes encontrados.`;
}

function refreshVehicleOwnerTransferSearch(dialog) {
  const vehicle = selectedVehicleOwnerTransferId ? findVehicleById(selectedVehicleOwnerTransferId) : null;
  if (!dialog || !vehicle) return;

  const mode = getVehicleOwnerTransferSearchMode($("#vehicleOwnerTransferSearchField", dialog)?.value || "name");
  const query = $("#vehicleOwnerTransferSearchInput", dialog)?.value || "";
  const matches = getVehicleOwnerTransferSearchMatches(mode.value, query);
  const select = $("#vehicleOwnerTransferClient", dialog);
  const hint = $("#vehicleOwnerTransferSearchHint", dialog);
  const submitButton = $("#vehicleOwnerTransferSubmitButton", dialog);
  if (!select) return;

  const currentValue = select.value || String(vehicle.currentClientId || "");
  const availableIds = matches.map((client) => String(client.id));
  let nextValue = currentValue;

  if (String(query || "").trim()) {
    if (!availableIds.includes(nextValue)) nextValue = availableIds[0] || "";
  } else if (!availableIds.includes(nextValue) && vehicle.currentClientId) {
    nextValue = String(vehicle.currentClientId);
  }

  select.innerHTML = renderVehicleOwnerOptions(nextValue, matches);
  select.value = nextValue;

  if (hint) hint.textContent = getVehicleOwnerTransferSearchHint(mode, query, matches);
  if (submitButton) submitButton.disabled = Boolean(String(query || "").trim()) && !matches.length;
  const searchInput = $("#vehicleOwnerTransferSearchInput", dialog);
  if (searchInput) searchInput.placeholder = mode.placeholder;
}

function renderVehicleOwnerTransferDialog(vehicle) {
  return `
    <form class="message-box vehicle-owner-transfer-box" id="vehicleOwnerTransferForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Cadastro de veiculos</p>
          <h2>Alterar cliente associado</h2>
        </div>
        <button class="icon-button" id="closeVehicleOwnerTransferDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <article class="schedule-selected-card vehicle-owner-transfer-summary">
        <span>Placa</span>
        <strong>${escapeHtml(vehicle.plate)}</strong>
        <p>${escapeHtml(formatVehicleDisplayName(vehicle))} - ${escapeHtml(getVehicleOwnerName(vehicle))}</p>
      </article>

      <div class="vehicle-form-grid vehicle-owner-transfer-search-grid">
        <label class="login-field" for="vehicleOwnerTransferSearchField">
          <span>Buscar cliente por</span>
          <select id="vehicleOwnerTransferSearchField">
            ${renderTransferSearchModeOptions()}
          </select>
        </label>
        <label class="login-field" for="vehicleOwnerTransferSearchInput">
          <span>Busca</span>
          <input id="vehicleOwnerTransferSearchInput" type="search" placeholder="${escapeHtml(vehicleOwnerTransferSearchModes[0].placeholder)}" autocomplete="off" />
        </label>
        <label class="login-field vehicle-owner-transfer-client-field" for="vehicleOwnerTransferClient">
          <span>Novo cliente associado</span>
          <select id="vehicleOwnerTransferClient">
            ${renderVehicleOwnerOptions(vehicle.currentClientId || "")}
          </select>
        </label>
      </div>
      <p class="lookup-hint vehicle-owner-transfer-hint" id="vehicleOwnerTransferSearchHint"></p>

      <p class="message-copy">Ao confirmar, a placa sera atualizada no cadastro do cliente e o historico do veiculo sera mantido.</p>

      <div class="dialog-actions">
        <button class="exit-button" id="cancelVehicleOwnerTransferDialog" type="button">Cancelar</button>
        <button class="primary-button" id="vehicleOwnerTransferSubmitButton" type="submit">
          <span data-icon="check"></span>
          <span>Continuar</span>
        </button>
      </div>
    </form>
  `;
}

function renderTransferSearchModeOptions(selectedValue = vehicleOwnerTransferSearchModes[0].value) {
  return vehicleOwnerTransferSearchModes
    .map(
      (mode) => `<option value="${mode.value}" ${mode.value === selectedValue ? "selected" : ""}>${escapeHtml(mode.label)}</option>`
    )
    .join("");
}

function bindVehicleOwnerTransferDialogControls(dialog) {
  $("#closeVehicleOwnerTransferDialog", dialog)?.addEventListener("click", closeVehicleOwnerTransferDialog);
  $("#cancelVehicleOwnerTransferDialog", dialog)?.addEventListener("click", closeVehicleOwnerTransferDialog);
  dialog.addEventListener("cancel", closeVehicleOwnerTransferDialog, { once: true });
  $("#vehicleOwnerTransferSearchField", dialog)?.addEventListener("change", () => refreshVehicleOwnerTransferSearch(dialog));
  $("#vehicleOwnerTransferSearchInput", dialog)?.addEventListener("input", () => refreshVehicleOwnerTransferSearch(dialog));
  $("#vehicleOwnerTransferSearchInput", dialog)?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
  });
  $("#vehicleOwnerTransferForm", dialog)?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitVehicleOwnerTransferDialog(dialog);
  });
  initIcons();
  refreshVehicleOwnerTransferSearch(dialog);
  window.setTimeout(() => $("#vehicleOwnerTransferSearchInput", dialog)?.focus(), 0);
}

async function submitVehicleOwnerTransferDialog(dialog) {
  const vehicle = selectedVehicleOwnerTransferId ? findVehicleById(selectedVehicleOwnerTransferId) : null;
  if (!vehicle) {
    closeVehicleOwnerTransferDialog();
    showToast("Veiculo nao localizado.");
    return;
  }

  const nextClientValue = $("#vehicleOwnerTransferClient", dialog)?.value || "";
  const nextClientId = nextClientValue ? Number(nextClientValue) : null;
  const updated = await confirmVehicleOwnerTransfer(vehicle, nextClientId);
  if (!updated) return;

  closeVehicleOwnerTransferDialog();
  selectedVehicleId = vehicle.id;

  const editorContainer = getActiveVehicleRegistryEditorContainer();
  const draft = captureVehicleRegistryDraft(editorContainer);
  refreshVehicleRegistryEditorAfterTransfer(vehicle, editorContainer, draft);
  renderAdminDashboard();

  const nextClient = nextClientId ? getClientById(nextClientId) : null;
  showToast(nextClient ? `${vehicle.plate} transferida para ${getClientDisplayName(nextClient)}.` : `${vehicle.plate} desvinculada do cliente.`);
}

async function confirmVehicleOwnerTransfer(vehicle, nextClientId) {
  const currentClientId = vehicle.currentClientId || findClientByPlate(vehicle.plate)?.id || null;
  if (currentClientId === nextClientId) {
    showToast("Selecione um cliente diferente para alterar o proprietario.");
    return false;
  }

  const currentClient = currentClientId ? getClientById(currentClientId) : null;
  const nextClient = nextClientId ? getClientById(nextClientId) : null;
  const shouldTransfer = await showMessageBox(
    nextClient
      ? {
          title: currentClient ? "Transferir placa?" : "Associar placa?",
          message: currentClient
            ? `${vehicle.plate} esta vinculada a ${getClientDisplayName(currentClient)}. Deseja transferir esta placa para ${getClientDisplayName(nextClient)}? O historico do veiculo sera mantido.`
            : `${vehicle.plate} passara a ficar vinculada a ${getClientDisplayName(nextClient)}. O historico do veiculo sera mantido.`,
          eyebrow: currentClient ? "Proprietario diferente" : "Novo vinculo",
          confirmLabel: currentClient ? "Sim, transferir" : "Sim, associar",
          cancelLabel: "Nao",
          confirmOnly: false
        }
      : {
          title: "Desvincular placa?",
          message: currentClient
            ? `Deseja remover o vinculo de ${vehicle.plate} com ${getClientDisplayName(currentClient)}? O historico do veiculo sera mantido.`
            : `Deseja deixar ${vehicle.plate} sem cliente vinculado? O historico do veiculo sera mantido.`,
          eyebrow: "Sem cliente vinculado",
          confirmLabel: "Sim, desvincular",
          cancelLabel: "Nao",
          confirmOnly: false
        }
  );

  if (!shouldTransfer) return false;

  transferPlateToClient(vehicle.plate, nextClientId);
  return true;
}

function renderVehicleRegistryOwnerField(vehicle) {
  if (!vehicle) {
    return `
      <label class="login-field" for="vehicleRegistryClient">
        <span>Proprietário atual</span>
        <select id="vehicleRegistryClient">
          ${renderVehicleOwnerOptions("")}
        </select>
      </label>
    `;
  }

  return `
    <div class="vehicle-owner-field">
      <div class="vehicle-owner-field-head">
        <span>Proprietário atual</span>
        <button class="ghost-action compact" id="openVehicleOwnerTransferButton" type="button">
          <span data-icon="users"></span>
          <span>Alterar cliente associado</span>
        </button>
      </div>
      <label class="login-field" for="vehicleRegistryClient">
        <select id="vehicleRegistryClient" class="is-readonly" disabled>
          ${renderVehicleOwnerOptions(vehicle.currentClientId || "")}
        </select>
      </label>
    </div>
  `;
}

function getDefaultVehicleSpecialCareDraftState() {
  return {
    enabled: false,
    type: vehicleSpecialCareTypes[0] || "Outro",
    attentionLevel: "Informativo",
    source: vehicleSpecialCareSources[0] || "Informado pelo cliente",
    restrictionTags: [],
    recommendedTags: [],
    description: "",
    validUntil: ""
  };
}

function getVehicleSpecialCareRecordById(recordId) {
  return vehicleSpecialCareRecords.find((record) => Number(record.id) === Number(recordId)) || null;
}

function getVehicleSpecialCareFormState() {
  const record = selectedVehicleSpecialCareId ? getVehicleSpecialCareRecordById(selectedVehicleSpecialCareId) : null;
  if (!record) return getDefaultVehicleSpecialCareDraftState();
  return {
    enabled: true,
    type: record.type,
    attentionLevel: record.attentionLevel,
    source: record.source,
    restrictionTags: [...(record.restrictionTags || [])],
    recommendedTags: [...(record.recommendedTags || [])],
    description: record.description || "",
    validUntil: record.validUntil || ""
  };
}

function renderVehicleSpecialCareFields(prefix, state, options = {}) {
  const compact = Boolean(options.compact);
  const selectedTags = [...(state.restrictionTags || []), ...(state.recommendedTags || [])];
  return `
    <div class="vehicle-special-care-fields${compact ? " is-compact" : ""}" data-special-care-fields="${escapeHtml(prefix)}" ${state.enabled ? "" : "hidden"}>
      <div class="vehicle-form-grid client-form-grid">
        <label class="login-field" for="${escapeHtml(prefix)}Type">
          <span>Tipo de cuidado</span>
          <select id="${escapeHtml(prefix)}Type">
            ${renderSelectOptions(vehicleSpecialCareTypes, state.type || vehicleSpecialCareTypes[0] || "")}
          </select>
        </label>
      </div>
      <div class="vehicle-special-care-choice-block">
        <span>Restrições</span>
        ${renderChoiceChipGroup(vehicleSpecialCareCombinedRestrictionOptions, selectedTags, {
          name: `${prefix}Restriction`,
          twoColumns: true
        })}
      </div>
      <label class="login-field inventory-notes-field vehicle-special-care-description-field" for="${escapeHtml(prefix)}Description">
        <span>Observações</span>
        <textarea id="${escapeHtml(prefix)}Description" rows="${compact ? "2" : "3"}" placeholder="Ex.: Cliente informou vitrificação feita em outro local.">${escapeHtml(state.description || "")}</textarea>
      </label>
    </div>
  `;
}

function renderVehicleSpecialCareRecordCard(record, options = {}) {
  const canManage = Boolean(options.canManage);
  const restrictionLabels = (record.restrictionTags || []).map(getVehicleSpecialCareRestrictionLabel);
  return `
    <article class="vehicle-special-care-card ${getVehicleSpecialCareLevelClass(record.attentionLevel)}">
      <div class="vehicle-special-care-card-head">
        <div>
          <strong>${escapeHtml(record.type)}</strong>
          <span class="vehicle-special-care-level ${getVehicleSpecialCareLevelClass(record.attentionLevel)}">${escapeHtml(record.attentionLevel)}</span>
        </div>
        <span class="vehicle-special-care-status">${record.active !== false ? "Ativo" : "Inativo"}</span>
      </div>
      <p>${escapeHtml(record.description || "Sem observação complementar.")}</p>
      <small>${escapeHtml(record.source)}${record.validUntil ? ` · revisão ${formatDateBR(record.validUntil)}` : ""}</small>
      ${restrictionLabels.length ? `<div class="vehicle-special-care-inline-tags">${restrictionLabels.map((label) => `<span>${escapeHtml(label)}</span>`).join("")}</div>` : ""}
      ${
        canManage
          ? `
            <div class="cashflow-row-actions vehicle-special-care-actions">
              <button class="ghost-action compact" type="button" data-edit-vehicle-special-care="${record.id}">Editar</button>
              ${
                record.active !== false
                  ? `<button class="exit-button compact" type="button" data-deactivate-vehicle-special-care="${record.id}">Inativar</button>`
                  : ""
              }
            </div>
          `
          : ""
      }
    </article>
  `;
}

function renderVehicleRegistrySpecialCareSection(vehicle) {
  const records = vehicle ? getVehicleSpecialCareRecords(vehicle) : [];
  const formState = getVehicleSpecialCareFormState();
  const activeRecords = records.filter((record) => record.active !== false);
  const inactiveRecords = records.filter((record) => record.active === false);
  return `
    <section class="vehicle-special-care-section">
      <div class="vehicle-special-care-head">
        <div>
          <p class="eyebrow">Segurança operacional</p>
          <h3>Cuidados especiais</h3>
        </div>
        ${vehicle ? `<span class="client-status-label">${activeRecords.length} ativo(s)</span>` : '<span class="client-status-label">Novo</span>'}
      </div>
      ${
        vehicle
          ? activeRecords.length
            ? `<div class="vehicle-special-care-record-list">${activeRecords.map((record) => renderVehicleSpecialCareRecordCard(record, { canManage: true })).join("")}</div>`
            : '<p class="empty-plates">Nenhum cuidado especial ativo para este veículo.</p>'
          : '<p class="empty-plates">Salve o veículo para manter histórico completo. Você já pode registrar o primeiro cuidado especial.</p>'
      }
      ${
        inactiveRecords.length
          ? `
            <div class="vehicle-special-care-history">
              <span>Histórico inativo</span>
              <div class="vehicle-special-care-record-list is-compact">${inactiveRecords
                .map((record) => renderVehicleSpecialCareRecordCard(record, { canManage: true }))
                .join("")}</div>
            </div>
          `
          : ""
      }
      <label class="switch-field" for="vehicleSpecialCareEnabled">
        <input id="vehicleSpecialCareEnabled" type="checkbox" ${formState.enabled ? "checked" : ""} />
        <span class="switch-control"></span>
        <span>${selectedVehicleSpecialCareId ? "Editar cuidado selecionado" : "Registrar cuidado especial"}</span>
      </label>
      ${renderVehicleSpecialCareFields("vehicleSpecialCare", formState)}
    </section>
  `;
}

function readVehicleSpecialCareFormState(container, prefix) {
  const enabled = `#${prefix}Enabled` ? ($(`#${prefix}Enabled`, container)?.checked || false) : false;
  const selectedRestrictions = getCheckedValuesByName(container, `${prefix}Restriction`);
  return {
    enabled,
    type: $(`#${prefix}Type`, container)?.value || vehicleSpecialCareTypes[0] || "Outro",
    attentionLevel: $(`#${prefix}AttentionLevel`, container)?.value || "Atenção",
    source: $(`#${prefix}Source`, container)?.value || vehicleSpecialCareSources[0] || "Informado pelo cliente",
    restrictionTags: selectedRestrictions,
    recommendedTags: [],
    description: $(`#${prefix}Description`, container)?.value.trim() || "",
    validUntil: $(`#${prefix}ValidUntil`, container)?.value || ""
  };
}

function getDefaultEntryVehicleSpecialCareState() {
  return {
    ...getDefaultVehicleSpecialCareDraftState(),
    showDetails: false
  };
}

function getEntryVehicleSpecialCareDraftState() {
  const base = entryVehicleSpecialCareDraft || getDefaultEntryVehicleSpecialCareState();
  return {
    ...getDefaultEntryVehicleSpecialCareState(),
    ...base,
    restrictionTags: [...(base.restrictionTags || [])],
    recommendedTags: [...(base.recommendedTags || [])]
  };
}

function captureEntryVehicleSpecialCareDraft() {
  const form = $("#vehicleForm");
  const currentState = getEntryVehicleSpecialCareDraftState();
  if (!form || !$("#entryVehicleSpecialCareMount")) {
    entryVehicleSpecialCareDraft = currentState;
    return currentState;
  }
  if (!$("[data-special-care-fields='entryVehicleSpecialCare']", form)) {
    entryVehicleSpecialCareDraft = {
      ...currentState,
      enabled: $("#entryVehicleSpecialCareEnabled", form)?.checked || false
    };
    return entryVehicleSpecialCareDraft;
  }
  const payload = readVehicleSpecialCareFormState(form, "entryVehicleSpecialCare");
  entryVehicleSpecialCareDraft = {
    ...currentState,
    ...payload
  };
  return entryVehicleSpecialCareDraft;
}

function getEntryVehicleSpecialCareContextVehicle() {
  const selectedVehicle = getSelectedEntryRegistryVehicle();
  if (selectedVehicle) return selectedVehicle;
  const plate = $("#vehiclePlate")?.value || "";
  const existingVehicle = getAnyVehicleRecord(null, plate);
  if (existingVehicle) return existingVehicle;
  return {
    id: null,
    vehicleId: null,
    plate: formatPlate(plate),
    type: $("#vehicleType")?.value || "",
    category: $("#vehicleCategory")?.value || "",
    services: getSelectedEntryServices()
  };
}

function createTransientVehicleSpecialCareRecord(vehicle, payload = {}) {
  return {
    id: `draft-${Date.now()}`,
    vehicleId: Number(vehicle?.id || 0) || null,
    vehiclePlate: formatPlate(vehicle?.plate || payload.vehiclePlate || ""),
    type: String(payload.type || vehicleSpecialCareTypes[0] || "Outro").trim(),
    attentionLevel: vehicleSpecialCareAttentionLevels.includes(payload.attentionLevel) ? payload.attentionLevel : "Informativo",
    description: String(payload.description || "").trim(),
    restrictionTags: normalizeStringTagList(payload.restrictionTags, vehicleSpecialCareCombinedRestrictionOptions.map((option) => option.tag)),
    recommendedTags: normalizeStringTagList(payload.recommendedTags, vehicleSpecialCareRecommendedOptions.map((option) => option.tag)),
    source: vehicleSpecialCareSources.includes(payload.source) ? payload.source : "Outro",
    validUntil: String(payload.validUntil || "").trim(),
    registeredAt: new Date().toISOString(),
    active: true
  };
}

function getEntryVehicleSpecialCareConflictResult(draftState = null) {
  const vehicle = getEntryVehicleSpecialCareContextVehicle();
  const draft = draftState || getEntryVehicleSpecialCareDraftState();
  const extraRecords = draft.enabled ? [createTransientVehicleSpecialCareRecord(vehicle, draft)] : [];
  return checkVehicleServiceCareConflictsForVehicle(vehicle, getSelectedEntryServices(), extraRecords);
}

function maybeShowEntryVehicleCareSelectionAlert() {
  const conflictResult = getEntryVehicleSpecialCareConflictResult();
  if (!conflictResult.hasConflicts) return;
  const signature = getVehicleServiceConflictSignature(conflictResult);
  if (!signature || signature === lastEntryCareConflictSignature) return;
  lastEntryCareConflictSignature = signature;
  showMessageBox({
    eyebrow: "SeguranÒ§a operacional",
    title: "Serviço incompatível com restrição",
    message: "O serviço selecionado possui insumo com tag de risco incompatível com o cuidado especial registrado. Confira os produtos antes de continuar.",
    confirmLabel: "Entendi"
  });
}

function getVehicleSpecialCareSummaryText(vehicle) {
  const summary = getVehicleSpecialCareSummary(vehicle);
  if (!summary.count) return "Nenhum cuidado especial ativo para este veículo.";
  const labels = summary.labels.slice(0, 2).join(", ");
  const suffix = summary.labels.length > 2 ? ` e mais ${summary.labels.length - 2}` : "";
  return `Este veículo possui ${summary.count} cuidado(s) ativo(s): ${labels}${suffix}.`;
}

function renderEntryVehicleSpecialCareSection() {
  const draft = getEntryVehicleSpecialCareDraftState();
  return `
    <label class="switch-field entry-special-care-switch" for="entryVehicleSpecialCareEnabled">
      <input id="entryVehicleSpecialCareEnabled" type="checkbox" ${draft.enabled ? "checked" : ""} />
      <span class="switch-control"></span>
      <span>Registrar cuidado especial</span>
    </label>
  `;
}

function renderEntrySpecialCareDialog(draft = getEntryVehicleSpecialCareDraftState()) {
  const dialogState = { ...draft, enabled: true };
  return `
    <form class="vehicle-box service-box" id="entrySpecialCareForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Segurança operacional</p>
          <h2>Registrar cuidado especial</h2>
        </div>
        <button class="icon-button" id="closeEntrySpecialCareDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      ${renderVehicleSpecialCareFields("entryVehicleSpecialCareDialog", dialogState, { compact: true })}
      <div class="dialog-actions">
        <button class="exit-button" id="cancelEntrySpecialCareDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>Salvar cuidado</span>
        </button>
      </div>
    </form>
  `;
}

function openEntrySpecialCareDialog() {
  const dialog = $("#entrySpecialCareDialog");
  if (!dialog) return;
  dialog.innerHTML = renderEntrySpecialCareDialog(getEntryVehicleSpecialCareDraftState());
  initIcons();
  bindEntrySpecialCareDialogControls(dialog);
  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeEntrySpecialCareDialog(options = {}) {
  const dialog = $("#entrySpecialCareDialog");
  if (!dialog) return;
  if (options.keepEnabled === false) {
    entryVehicleSpecialCareDraft = { ...getEntryVehicleSpecialCareDraftState(), enabled: false };
    refreshEntryVehicleSpecialCareSection({ preserveDraft: false });
  }
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
}

function bindEntrySpecialCareDialogControls(dialog) {
  $("#closeEntrySpecialCareDialog", dialog)?.addEventListener("click", () => closeEntrySpecialCareDialog({ keepEnabled: false }));
  $("#cancelEntrySpecialCareDialog", dialog)?.addEventListener("click", () => closeEntrySpecialCareDialog({ keepEnabled: false }));
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeEntrySpecialCareDialog({ keepEnabled: false });
  }, { once: true });
  $("#entrySpecialCareForm", dialog)?.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = readVehicleSpecialCareFormState(dialog, "entryVehicleSpecialCareDialog");
    entryVehicleSpecialCareDraft = {
      ...getEntryVehicleSpecialCareDraftState(),
      ...payload,
      enabled: true,
      showDetails: false
    };
    closeEntrySpecialCareDialog({ keepEnabled: true });
    refreshEntryVehicleSpecialCareSection({ preserveDraft: false });
    maybeShowEntryVehicleCareSelectionAlert();
  });
}

function refreshEntryVehicleSpecialCareSection(options = {}) {
  const mount = $("#entryVehicleSpecialCareMount");
  if (!mount) return;
  if (options.preserveDraft !== false) captureEntryVehicleSpecialCareDraft();
  mount.innerHTML = renderEntryVehicleSpecialCareSection();
  initIcons();
}

function persistEntryVehicleSpecialCareFromDraft(attendanceVehicle, registryVehicle) {
  const draft = getEntryVehicleSpecialCareDraftState();
  entryVehicleSpecialCareDraft = null;
  if (!draft.enabled || !registryVehicle) return null;
  if (!draft.description && !draft.restrictionTags.length && !draft.recommendedTags.length) return null;
  const record = createVehicleSpecialCareRecord(registryVehicle, draft, {
    attendanceId: attendanceVehicle.id,
    sourceAttendanceId: attendanceVehicle.id,
    createdBy: activeSessionUser || "Operador",
    historyType: "vehicle_special_care_added_from_attendance",
    historyDescription: `Cuidado especial informado na entrada do atendimento ${attendanceVehicle.plate}.`
  });
  if (!record) return null;
  appendAttendanceHistory(attendanceVehicle, `Cuidado especial registrado no veículo: ${record.type}.`, "vehicle_special_care_created");
  return record;
}

function getActiveVehicleRegistryEditorContainer() {
  const dialog = $("#vehicleRegistryDialog");
  if (dialog?.open && $("#vehicleRegistryForm", dialog)) return dialog;

  const screen = $("#adminVehiclesView");
  if (screen && !screen.hidden && $("#vehicleRegistryForm", screen)) return screen;
  return null;
}

function refreshVehicleRegistryEditorAfterTransfer(vehicle, container, draft) {
  if (!container) return;

  if (container.id === "vehicleRegistryDialog") {
    container.innerHTML = renderVehicleRegistryDialogForm(vehicle);
    initIcons();
    if (vehicleRegistryDialogSource === "admin") bindAdminVehicleRegistryDialogControls(container);
    else bindEntryVehicleRegistryDialogControls(container);
    restoreVehicleRegistryDraft(container, draft);
    return;
  }

  renderVehiclesScreen(container);
  restoreVehicleRegistryDraft(container, draft);
}

function captureVehicleRegistryDraft(container) {
  if (!container || container.hidden) return null;

  return {
    plate: $("#vehicleRegistryPlate", container)?.value || "",
    brand: $("#vehicleRegistryBrand", container)?.value || "",
    model: $("#vehicleRegistryModel", container)?.value || "",
    year: $("#vehicleRegistryYear", container)?.value || "",
    color: $("#vehicleRegistryColor", container)?.value || "",
    type: $("#vehicleRegistryType", container)?.value || "",
    category: $("#vehicleRegistryCategory", container)?.value || "",
    fuel: $("#vehicleRegistryFuel", container)?.value || "",
    notes: $("#vehicleRegistryNotes", container)?.value || ""
  };
}

function restoreVehicleRegistryDraft(container, draft) {
  if (!container || !draft) return;

  $("#vehicleRegistryBrand", container).value = draft.brand;
  $("#vehicleRegistryModel", container).value = draft.model;
  $("#vehicleRegistryYear", container).value = draft.year;
  $("#vehicleRegistryColor", container).value = draft.color;
  $("#vehicleRegistryType", container).value = draft.type;
  updateVehicleRegistryCategoryState(container);
  const categorySelect = $("#vehicleRegistryCategory", container);
  if (categorySelect && !categorySelect.disabled) categorySelect.value = draft.category;
  $("#vehicleRegistryFuel", container).value = draft.fuel;
  $("#vehicleRegistryNotes", container).value = draft.notes;
}

function renderVehicleRegistryDialogForm(vehicle = null) {
  const selectedVehicle = vehicle || null;

  return `
    <form class="vehicle-box vehicle-registry-dialog-box" id="vehicleRegistryForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">${selectedVehicle ? "Edição" : "Cadastro"}</p>
          <h2>${selectedVehicle ? escapeHtml(selectedVehicle.plate) : "Novo veículo"}</h2>
        </div>
        <span class="client-status-label">${selectedVehicle ? "Editando" : "Novo"}</span>
        <button class="icon-button" id="closeVehicleRegistryDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <div class="vehicle-form-grid client-form-grid">
        <label class="login-field" for="vehicleRegistryPlate">
          <span>Placa</span>
          <input
            id="vehicleRegistryPlate"
            type="text"
            maxlength="8"
            placeholder="ABC1D23"
            value="${escapeHtml(selectedVehicle?.plate || "")}"
            ${selectedVehicle ? "disabled" : ""}
            required
          />
        </label>
        <label class="login-field" for="vehicleRegistryBrand">
          <span>Marca</span>
          <input id="vehicleRegistryBrand" type="text" placeholder="Chevrolet" value="${escapeHtml(selectedVehicle?.brand || "")}" />
        </label>
        <div class="vehicle-model-lookup-field">
          <label class="login-field" for="vehicleRegistryModel">
            <span>Modelo</span>
            <input id="vehicleRegistryModel" type="text" placeholder="Onix" value="${escapeHtml(selectedVehicle?.model || "")}" autocomplete="off" required />
          </label>
          <div class="vehicle-model-results" id="vehicleRegistryModelResults" hidden></div>
        </div>
        <label class="login-field" for="vehicleRegistryYear">
          <span>Ano</span>
          <input id="vehicleRegistryYear" type="text" inputmode="numeric" placeholder="2024" maxlength="4" value="${escapeHtml(selectedVehicle?.year || "")}" />
        </label>
        <label class="login-field" for="vehicleRegistryColor">
          <span>Cor</span>
          <input id="vehicleRegistryColor" type="text" placeholder="Branco" value="${escapeHtml(selectedVehicle?.color || "")}" />
        </label>
        <label class="login-field" for="vehicleRegistryType">
          <span>Tipo de veículo</span>
          <select id="vehicleRegistryType">
            ${renderSelectOptions(vehicleTypes, selectedVehicle?.type || "")}
          </select>
        </label>
        <label class="login-field" for="vehicleRegistryCategory">
          <span>Categoria</span>
          <select id="vehicleRegistryCategory">
            ${renderSelectOptions(vehicleCategories, selectedVehicle?.category || "")}
          </select>
        </label>
        <label class="login-field" for="vehicleRegistryFuel">
          <span>Combustível</span>
          <select id="vehicleRegistryFuel">
            ${renderSelectOptions(["Flex", "Gasolina", "Etanol", "Diesel", "Híbrido", "Elétrico", "Outro"], selectedVehicle?.fuel || "")}
          </select>
        </label>
        ${renderVehicleRegistryOwnerField(selectedVehicle)}
        <label class="login-field vehicle-notes-field" for="vehicleRegistryNotes">
          <span>Observações do veículo</span>
          <input id="vehicleRegistryNotes" type="text" placeholder="Preferências, restrições, histórico relevante" value="${escapeHtml(selectedVehicle?.notes || "")}" />
        </label>
      </div>

      ${renderVehicleRegistrySpecialCareSection(selectedVehicle)}

      <div class="dialog-actions">
        <button class="exit-button" id="cancelVehicleRegistryDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>${selectedVehicle ? "Atualizar veículo" : "Salvar veículo"}</span>
        </button>
      </div>
    </form>
  `;
}

function bindEntryVehicleRegistryDialogControls(container) {
  updateVehicleRegistryCategoryState(container);
  bindLocalVehicleModelLookup({
    container,
    modelSelector: "#vehicleRegistryModel",
    brandSelector: "#vehicleRegistryBrand",
    resultsSelector: "#vehicleRegistryModelResults",
    typeSelector: "#vehicleRegistryType"
  });
  $("#closeVehicleRegistryDialog", container).addEventListener("click", closeEntryVehicleRegistryDialog);
  $("#cancelVehicleRegistryDialog", container).addEventListener("click", closeEntryVehicleRegistryDialog);
  $("#vehicleRegistryType", container).addEventListener("change", () => updateVehicleRegistryCategoryState(container));
  $("#openVehicleOwnerTransferButton", container)?.addEventListener("click", () => openVehicleOwnerTransferDialog(selectedVehicleId));
  $("#vehicleRegistryYear", container).addEventListener("input", (event) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 4);
  });
  bindVehicleSpecialCareRegistryControls(container);
  $("#vehicleRegistryForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    saveEntryVehicleRegistryDialog(container);
  });
}

function saveEntryVehicleRegistryDialog(container) {
  const result = persistVehicleRegistration(container);
  if (!result?.ok) return;
  showToast(`${result.vehicle.plate} salvo no cadastro de veículos.`);
  closeEntryVehicleRegistryDialog();
}

function bindAdminVehicleRegistryDialogControls(container) {
  updateVehicleRegistryCategoryState(container);
  bindLocalVehicleModelLookup({
    container,
    modelSelector: "#vehicleRegistryModel",
    brandSelector: "#vehicleRegistryBrand",
    resultsSelector: "#vehicleRegistryModelResults",
    typeSelector: "#vehicleRegistryType"
  });
  $("#closeVehicleRegistryDialog", container)?.addEventListener("click", closeAdminVehicleRegistryDialog);
  $("#cancelVehicleRegistryDialog", container)?.addEventListener("click", closeAdminVehicleRegistryDialog);
  container.oncancel = (event) => {
    event.preventDefault();
    closeAdminVehicleRegistryDialog();
  };
  $("#vehicleRegistryType", container)?.addEventListener("change", () => updateVehicleRegistryCategoryState(container));
  $("#vehicleRegistryPlate", container)?.addEventListener("input", (event) => {
    event.currentTarget.value = formatPlate(event.currentTarget.value);
  });
  $("#openVehicleOwnerTransferButton", container)?.addEventListener("click", () => openVehicleOwnerTransferDialog(selectedVehicleId));
  $("#vehicleRegistryYear", container)?.addEventListener("input", (event) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 4);
  });
  bindVehicleSpecialCareRegistryControls(container);
  $("#vehicleRegistryForm", container)?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveAdminVehicleRegistryDialog(container);
  });
}

function bindVehicleSpecialCareRegistryControls(container) {
  $("#vehicleSpecialCareEnabled", container)?.addEventListener("change", (event) => {
    const fields = $("[data-special-care-fields='vehicleSpecialCare']", container);
    if (fields) fields.hidden = !event.currentTarget.checked;
    if (!event.currentTarget.checked) selectedVehicleSpecialCareId = null;
  });
  if (container.dataset.vehicleSpecialCareRegistryBound === "true") return;
  container.dataset.vehicleSpecialCareRegistryBound = "true";
  container.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-edit-vehicle-special-care]");
    if (editButton) {
      selectedVehicleSpecialCareId = Number(editButton.dataset.editVehicleSpecialCare);
      const vehicle = selectedVehicleId ? findVehicleById(selectedVehicleId) : null;
      const nextMarkup = renderVehicleRegistrySpecialCareSection(vehicle);
      const section = $(".vehicle-special-care-section", container);
      if (section) section.outerHTML = nextMarkup;
      bindVehicleSpecialCareRegistryControls(container);
      return;
    }

    const deactivateButton = event.target.closest("[data-deactivate-vehicle-special-care]");
    if (!deactivateButton) return;
    const confirmed = await showMessageBox({
      title: "Inativar cuidado especial?",
      message: "O histórico será preservado e o registro deixará de gerar alertas ativos.",
      eyebrow: "Cadastro de veículos",
      confirmLabel: "Inativar",
      cancelLabel: "Cancelar",
      confirmOnly: false
    });
    if (!confirmed) return;
    deactivateVehicleSpecialCareRecord(Number(deactivateButton.dataset.deactivateVehicleSpecialCare), "Registro revisado pelo administrador.");
    selectedVehicleSpecialCareId = null;
    const vehicle = selectedVehicleId ? findVehicleById(selectedVehicleId) : null;
    const section = $(".vehicle-special-care-section", container);
    if (section) section.outerHTML = renderVehicleRegistrySpecialCareSection(vehicle);
    bindVehicleSpecialCareRegistryControls(container);
    renderAdminDashboard();
    renderPatio();
    showToast("Cuidado especial inativado.");
  });
}

function saveAdminVehicleRegistryDialog(container) {
  const result = persistVehicleRegistration(container);
  if (!result) return;

  if (result.reason === "duplicate") {
    selectedVehicleId = result.vehicle.id;
    container.innerHTML = renderVehicleRegistryDialogForm(result.vehicle);
    initIcons();
    bindAdminVehicleRegistryDialogControls(container);
    window.setTimeout(() => $("#vehicleRegistryBrand", container)?.focus(), 0);
    showToast(`${result.vehicle.plate} já está cadastrada. Ficha aberta para edição.`);
    return;
  }

  refreshVehiclesScreenIfVisible();
  renderAdminDashboard();
  showToast(`${result.vehicle.plate} salvo no cadastro de veículos.`);
  closeAdminVehicleRegistryDialog();
}

function fillEntryOwnerFromClient(client) {
  $("#vehicleOwner").value = getClientDisplayName(client);
  $("#vehiclePhone").value = client.phone || "";
}

async function notifyOpenInvoicesForVehicle(vehicle) {
  if (lastOpenInvoiceNoticePlate === vehicle.plate) return;
  const client = vehicle.currentClientId ? getClientById(vehicle.currentClientId) : findClientByPlate(vehicle.plate);
  if (!client || !client.billing) return;
  const openInvoices = getOpenInvoicesByRegistryClient(client);
  if (!openInvoices.length) return;

  lastOpenInvoiceNoticePlate = vehicle.plate;
  await showMessageBox({
    title: "Fatura em aberto",
    message: `${getClientDisplayName(client)} possui ${openInvoices.length} fatura(s) em aberto. Confira a Central de Faturas antes de lançar novos serviços faturados.`,
    eyebrow: "Financeiro",
    confirmLabel: "Entendi"
  });
}

function setEntryVehicleColor(color) {
  const button = $(`.color-swatch[data-color="${cssEscape(color)}"]`);
  if (button) {
    selectVehicleColor(button);
    return;
  }

  const otherButton = $('.color-swatch[data-color="Outra"]');
  if (!otherButton) return;
  selectVehicleColor(otherButton);
  $("#vehicleOtherColor").value = color;
}

function addVehicleToPatio(vehicle) {
  patioVehicles.unshift(vehicle);
  const registryVehicle = syncVehicleFromPatioEntry(vehicle);
  persistEntryVehicleSpecialCareFromDraft(vehicle, registryVehicle);
  closeVehicleDialog();
  renderPatio();
  renderAdminDashboard();
  triggerAutomatedMessage(vehicle.status === "agendado" ? "schedule-confirmation" : "yard-entry", getMessageContextFromVehicle(vehicle));
  showToast(vehicle.status === "agendado" ? `Agendamento de ${vehicle.plate} criado.` : `${vehicle.plate} entrou no pátio.`);
}

function selectVehicleColor(button) {
  const color = button.dataset.color;
  const isOther = color === "Outra";

  $$(".color-swatch").forEach((item) => {
    const isSelected = item === button;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-pressed", String(isSelected));
  });

  $("#vehicleColor").value = color;
  $(".other-color-field").hidden = !isOther;
  $("#vehicleOtherColor").disabled = !isOther;
  $("#vehicleOtherColor").required = isOther;

  if (isOther) $("#vehicleOtherColor").focus();
}

function resetVehicleColor() {
  const defaultButton = $('.color-swatch[data-color="Branco"]');
  if (!defaultButton) return;
  selectVehicleColor(defaultButton);
  $("#vehicleOtherColor").value = "";
}

function resetVehicleForm() {
  $("#vehicleForm").reset();
  pendingVehicle = null;
  selectedEntryVehicleId = null;
  entryVehicleSpecialCareDraft = null;
  selectedBillingClientId = "";
  selectedBillingInvoiceId = "";
  lastOpenInvoiceNoticePlate = "";
  lastEntryCareConflictSignature = "";
  vehicleEntryMode = "entry";
  clearEntryPlateResults();
  clearLocalVehicleResults($("#vehicleModelResults"));
  delete $("#vehicleModel").dataset.selectedVehicleModel;
  delete $("#vehicleModel").dataset.selectedVehicleBrand;
  renderEntryLinkedRegistration(null);
  setEntryRegistrationReadonly(false);
  resetVehicleColor();
  updateVehicleDialogMode();
  showVehicleStep("entry");
  updatePaymentAction();
  clearBillingSubforms();
  refreshEntryVehicleSpecialCareSection({ preserveDraft: false });
}

function updatePaymentAction() {
  if (vehicleEntryMode === "client-registration") {
    $("#vehiclePrimaryIcon").hidden = false;
    $("#vehiclePrimaryIcon").dataset.icon = "check";
    $("#vehiclePrimaryIcon").innerHTML = icons.check || $("#vehiclePrimaryIcon").innerHTML;
    $("#vehiclePrimaryLabel").textContent = "Salvar veículo";
    return;
  }
  const isBilled = $("#vehiclePayment").value === "Faturado";
  $("#vehiclePrimaryIcon").hidden = isBilled;
  $("#vehiclePrimaryLabel").textContent = isBilled ? "Avançar >>" : vehicleEntryMode === "schedule" ? "Próximo" : "Adicionar";
}

function showVehicleStep(step) {
  $$("[data-vehicle-step]").forEach((section) => {
    const isActive = section.dataset.vehicleStep === step;
    section.hidden = !isActive;
    section.classList.toggle("is-active", isActive);
  });

  const isScheduleStep = vehicleEntryMode === "schedule" && step === "schedule";
  ["#vehicleScheduleDate", "#vehicleScheduleTime"].forEach((selector) => {
    const input = $(selector);
    if (!input) return;
    input.disabled = !isScheduleStep;
    input.required = isScheduleStep;
  });

  if (isScheduleStep) {
    setScheduleDateMin("#vehicleScheduleDate");
    renderScheduleTimeOptions();
  }

  renderVehicleChecklistForStep(step, pendingVehicle?.checklist || null);

  const billedActionLabel = $("#finishBilledEntryButton span:last-child");
  if (billedActionLabel) billedActionLabel.textContent = vehicleEntryMode === "schedule" ? "Próximo" : "Adicionar";
}

function renderBillingSelectors() {
  renderBillingClientSelect();
  renderInvoiceSelect();
  updateBillingReadyState();
}

function renderBillingClientSelect() {
  const input = $("#billingClientSelect");
  const billingClient = pendingVehicle ? getApprovedBillingClientForEntry(pendingVehicle) : null;
  selectedBillingClientId = selectedBillingClientId || (billingClient?.billingClientId ? String(billingClient.billingClientId) : "");
  input.value = selectedBillingClientId;
}

function renderInvoiceSelect() {
  const select = $("#billingInvoiceSelect");
  const invoices = billingInvoices.filter((invoice) => String(invoice.clientId) === String(selectedBillingClientId));
  const emptyLabel = selectedBillingClientId ? "Selecione a fatura" : "Cliente faturado sem fatura aberta";
  select.innerHTML = [`<option value="">${emptyLabel}</option>`]
    .concat(
      invoices.map(
        (invoice) => `<option value="${invoice.id}">${invoice.code} | ${formatDateBR(invoice.dueDate)}</option>`
      )
    )
    .join("");
  select.disabled = !selectedBillingClientId;
  select.value = invoices.some((invoice) => String(invoice.id) === String(selectedBillingInvoiceId))
    ? selectedBillingInvoiceId
    : "";
  selectedBillingInvoiceId = select.value;
}

function renderInvoiceClientSelect() {
  const select = $("#invoiceClientSelect");
  const approvedClients = billingClients.filter((client) => isBillingClientApproved(client.id));
  select.innerHTML = [
    '<option value="">Selecione o cliente</option>',
    ...approvedClients.map((client) => `<option value="${client.id}">${client.name}</option>`)
  ].join("");
  select.value = selectedBillingClientId;
  setInvoiceDateMin();
}

function updateBillingReadyState() {
  $("#finishBilledEntryButton").disabled = !selectedBillingClientId || !selectedBillingInvoiceId;
}

async function handleNewBillingClientFromEntry() {
  await showMessageBox({
    title: "Cadastro faturado no Administrador",
    message:
      "Novos clientes faturados precisam ser cadastrados em Cadastros > Clientes, com Cliente faturado marcado, aprovação do administrador ativa e ciclo de faturamento definido.",
    confirmLabel: "Entendi"
  });
}

function saveBillingClient() {
  const name = $("#billingClientName").value.trim();
  if (!name) {
    showToast("Informe o nome do cliente.");
    $("#billingClientName").focus();
    return;
  }

  const client = {
    id: Math.max(...billingClients.map((item) => item.id)) + 1,
    name,
    document: $("#billingClientDocument").value.trim(),
    phone: $("#billingClientPhone").value.trim()
  };

  billingClients.push(client);
  selectedBillingClientId = String(client.id);
  selectedBillingInvoiceId = "";
  clearBillingSubforms();
  renderBillingSelectors();
  showVehicleStep("billing");
  showToast("Cliente cadastrado para faturamento.");
}

function openBillingInvoice() {
  const clientId = $("#invoiceClientSelect").value;
  const dueDate = $("#invoiceDueDate").value;
  const registryClient = getRegistryClientByBillingClientId(clientId);

  if (!clientId) {
    showToast("Selecione o cliente da fatura.");
    $("#invoiceClientSelect").focus();
    return;
  }

  if (!isClientBillingApproved(registryClient)) {
    showToast("Cliente sem aprovação de faturamento.");
    $("#invoiceClientSelect").focus();
    return;
  }

  const openInvoices = getOpenInvoicesByRegistryClient(registryClient);
  if (openInvoices.length && !registryClient.allowMultipleOpenInvoices) {
    showToast("Cliente não permite mais de uma fatura em aberto.");
    return;
  }

  if (!dueDate) {
    showToast("Selecione o vencimento da fatura.");
    $("#invoiceDueDate").focus();
    return;
  }

  const invoice = {
    id: Math.max(...billingInvoices.map((item) => item.id)) + 1,
    clientId: Number(clientId),
    code: `FAT-${dueDate.slice(5, 7)}${dueDate.slice(2, 4)}-${String(billingInvoices.length + 1).padStart(3, "0")}`,
    dueDate,
    status: "Aberta",
    approvedBy: registryClient.approver,
    cycle: registryClient.billingCycle
  };

  billingInvoices.push(invoice);
  invoiceAmounts[invoice.id] = 0;
  selectedBillingClientId = String(invoice.clientId);
  selectedBillingInvoiceId = String(invoice.id);
  $("#invoiceDueDate").value = "";
  renderBillingSelectors();
  showVehicleStep("billing");
  showToast("Nova fatura aberta.");
}

function finishBilledEntry() {
  if (!pendingVehicle) {
    showVehicleStep("entry");
    return;
  }

  if (!selectedBillingClientId || !selectedBillingInvoiceId) {
    showToast("Selecione cliente e fatura para adicionar.");
    return;
  }

  if (vehicleEntryMode !== "schedule" && !attachChecklistFromPanel(pendingVehicle, $("#vehicleForm"), "vehicleBilling")) return;

  const client = billingClients.find((item) => String(item.id) === String(selectedBillingClientId));
  const invoice = billingInvoices.find((item) => String(item.id) === String(selectedBillingInvoiceId));
  pendingVehicle.billing = {
    clientId: client.id,
    clientName: client.name,
    invoiceId: invoice.id,
    invoiceCode: invoice.code,
    dueDate: invoice.dueDate
  };
  invoiceAmounts[invoice.id] = (invoiceAmounts[invoice.id] || 0) + getVehiclePaymentTotal(pendingVehicle);
  invoiceLineItems.push({
    invoiceId: invoice.id,
    clientId: client.id,
    vehicleId: pendingVehicle.id,
    plate: pendingVehicle.plate,
    service: pendingVehicle.service,
    value: getVehiclePaymentTotal(pendingVehicle),
    operator: activeSessionUser || "Operador"
  });

  if (vehicleEntryMode === "schedule") {
    showVehicleStep("schedule");
    $("#vehicleScheduleDate").focus();
    return;
  }

  addVehicleToPatio(pendingVehicle);
}

function clearBillingSubforms() {
  $("#billingClientName").value = "";
  $("#billingClientDocument").value = "";
  $("#billingClientPhone").value = "";
  $("#invoiceDueDate").value = "";
}

function setInvoiceDateMin() {
  $("#invoiceDueDate").min = getTodayISO();
}

function formatDateBR(value) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatScheduleDateTime(date, time) {
  if (!date || !time) return "";
  return `${formatDateBR(date)} às ${time}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function formatCurrencyFieldValue(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) && number > 0 ? formatCurrency(number) : "";
}

function parseCurrencyValue(value) {
  const text = String(value || "").trim();
  if (!text) return 0;
  const sanitized = text.replace(/[^\d,.-]/g, "");
  if (!sanitized) return 0;
  if (sanitized.includes(",")) {
    const number = Number(sanitized.replace(/\./g, "").replace(",", "."));
    return Number.isFinite(number) ? number : 0;
  }
  const number = Number(sanitized.replace(/,/g, "."));
  return Number.isFinite(number) ? number : 0;
}

function setCurrencyInputValue(input, value) {
  if (!input) return;
  const number = Number(value || 0);
  input.dataset.moneyValue = String(Number.isFinite(number) ? number : 0);
  input.value = formatCurrencyFieldValue(number);
}

function getCurrencyInputValue(inputOrSelector, container = document) {
  const input = typeof inputOrSelector === "string" ? $(inputOrSelector, container) : inputOrSelector;
  if (!input) return 0;
  return parseCurrencyValue(input.dataset.moneyValue || input.value);
}

function bindCurrencyInputs(container = document) {
  $$('[data-money-input="true"]', container).forEach((input) => {
    if (input.dataset.moneyBound === "true") return;
    input.dataset.moneyBound = "true";
    input.dataset.moneyValue = String(parseCurrencyValue(input.value));
    if (input.value) input.value = formatCurrency(parseCurrencyValue(input.value));

    input.addEventListener("focus", () => {
      if (input.dataset.moneyInput !== "true") return;
      const value = getCurrencyInputValue(input);
      input.value = value
        ? value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : "";
      input.select();
    });

    input.addEventListener("input", () => {
      if (input.dataset.moneyInput !== "true") return;
      input.dataset.moneyValue = String(parseCurrencyValue(input.value));
    });

    input.addEventListener("blur", () => {
      if (input.dataset.moneyInput !== "true") return;
      setCurrencyInputValue(input, getCurrencyInputValue(input));
    });
  });
}

function getOperatorCommissionInputValue(container) {
  const input = $("#operatorCommissionValue", container);
  const commissionType = getCommissionTypeValue($("#operatorCommissionType", container)?.value || "Valor fixo por serviço");
  if (commissionType === "fixed") return getCurrencyInputValue(input);
  return Number(String(input?.value || "").replace(",", "."));
}

function updateOperatorCommissionInputMode(container) {
  const input = $("#operatorCommissionValue", container);
  const typeSelect = $("#operatorCommissionType", container);
  const label = $('label[for="operatorCommissionValue"] span', container);
  if (!input || !typeSelect) return;

  const isFixed = getCommissionTypeValue(typeSelect.value) === "fixed";
  input.dataset.moneyInput = isFixed ? "true" : "false";
  if (label) label.textContent = isFixed ? "Valor da comissão" : "Percentual";
  input.placeholder = isFixed ? "R$ 0,00" : "Ex.: 8";

  if (isFixed) {
    bindCurrencyInputs(container);
    setCurrencyInputValue(input, parseCurrencyValue(input.value));
    return;
  }

  input.value = String(getCurrencyInputValue(input) || input.value || "").replace(".", ",");
  delete input.dataset.moneyValue;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replace(/["\\]/g, "\\$&");
}

function normalizeText(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatPlate(value) {
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8);
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCpf(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatCnpj(value) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function getDefaultBusinessProfile() {
  return {
    cnpj: "",
    legalName: "",
    tradeName: "",
    displayNameMode: "tradeName",
    phone: "",
    additionalPhones: [],
    email: "",
    address: "",
    logoDataUrl: "",
    logoSizePercent: pdfLogoSizing.defaultPercent,
    logoSizeXPercent: pdfLogoSizing.defaultPercent,
    logoSizeYPercent: pdfLogoSizing.defaultPercent,
    reportFields: getDefaultBusinessProfileReportFields()
  };
}

function getDefaultBusinessProfileReportFields(displayNameMode = "tradeName") {
  return {
    cnpj: { showInReports: true, reportTarget: "all" },
    legalName: { showInReports: displayNameMode === "legalName", reportTarget: "all" },
    tradeName: { showInReports: displayNameMode !== "legalName", reportTarget: "all" },
    phone: { showInReports: true, reportTarget: "all" },
    email: { showInReports: true, reportTarget: "all" },
    address: { showInReports: true, reportTarget: "all" }
  };
}

function normalizeBusinessProfile(profile = {}) {
  const fallback = getDefaultBusinessProfile();
  const mergedProfile = { ...fallback, ...profile };
  const legacyLogoSize = getBusinessLogoSizePercent(mergedProfile.logoSizePercent);
  return {
    ...mergedProfile,
    logoSizePercent: legacyLogoSize,
    logoSizeXPercent: getBusinessLogoDimensionPercent("x", mergedProfile.logoSizeXPercent ?? legacyLogoSize),
    logoSizeYPercent: getBusinessLogoDimensionPercent("y", mergedProfile.logoSizeYPercent ?? legacyLogoSize),
    additionalPhones: normalizeBusinessAdditionalPhones(mergedProfile.additionalPhones),
    reportFields: normalizeBusinessProfileReportFields(mergedProfile.reportFields, mergedProfile.displayNameMode)
  };
}

function getBusinessLogoSizePercent(value = businessProfile.logoSizePercent) {
  return getBusinessLogoDimensionPercent("x", value);
}

function getBusinessLogoDimensionPercent(axis, value = axis === "y" ? businessProfile.logoSizeYPercent : businessProfile.logoSizeXPercent) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return pdfLogoSizing.defaultPercent;
  return Math.min(pdfLogoSizing.maxPercent, Math.max(pdfLogoSizing.minPercent, Math.round(numericValue)));
}

function getBusinessLogoDimensions() {
  return {
    x: getBusinessLogoDimensionPercent("x"),
    y: getBusinessLogoDimensionPercent("y")
  };
}

function normalizeBusinessProfileReportFields(fields = {}, displayNameMode = "tradeName") {
  const defaults = getDefaultBusinessProfileReportFields(displayNameMode);
  return businessProfileReportFieldKeys.reduce((normalized, key) => {
    const field = fields?.[key] || {};
    normalized[key] = {
      showInReports: Object.prototype.hasOwnProperty.call(field, "showInReports") ? Boolean(field.showInReports) : defaults[key].showInReports,
      reportTarget: "all"
    };
    return normalized;
  }, {});
}

function normalizeBusinessAdditionalPhones(phones = []) {
  return (Array.isArray(phones) ? phones : [])
    .map((phone, index) => ({
      id: phone.id || `phone-${Date.now()}-${index}`,
      value: phone.value || "",
      showInReports: Object.prototype.hasOwnProperty.call(phone, "showInReports") ? Boolean(phone.showInReports) : true,
      reportTarget: "all"
    }))
    .filter((phone) => phone.value || phone.id);
}

function getDefaultBusinessPixInfo() {
  return {
    keyType: "CNPJ",
    key: "",
    receiver: "",
    paymentUrl: "",
    copyPasteCode: "",
    showInInvoices: true,
    qrPayload: ""
  };
}

function getDefaultBusinessPaymentMethods() {
  const today = getTodayISO();
  return [
    {
      id: 1,
      name: "Pix",
      type: "instantâneo",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: true,
      settlementDays: 0,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: "Recebimento imediato por chave Pix.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 2,
      name: "Dinheiro",
      type: "dinheiro",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: false,
      immediateSettlement: true,
      settlementDays: 0,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: "Recebimento em caixa físico.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 3,
      name: "Cartão de débito",
      type: "cartão",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: false,
      settlementDays: 1,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: "Taxa deve ser ajustada conforme a maquininha.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 4,
      name: "Cartão de crédito",
      type: "cartão",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: false,
      settlementDays: 30,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: "Taxa e prazo devem ser ajustados conforme a maquininha.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 5,
      name: "Transferência bancária",
      type: "transferência",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: true,
      settlementDays: 0,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: "Recebimento por transferência.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 6,
      name: "Faturado",
      type: "faturado",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: false,
      settlementDays: 30,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: "Gera fatura ou recebimento em aberto.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 7,
      name: "Boleto",
      type: "boleto",
      active: false,
      showInService: false,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: false,
      settlementDays: 3,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: "Ativar somente se a empresa usar boleto.",
      createdAt: today,
      updatedAt: today
    }
  ];
}

function getDefaultBusinessFinanceSettings() {
  return {
    receiptRules: {
      invoiceDefaultDueDays: 30,
      openPaymentDueDays: 7,
      requirePixKeyWhenActive: false
    },
    margins: {
      serviceMarginPercent: 30,
      productMarginPercent: 25,
      monthlyOperationalCost: 0,
      productiveHoursMonthly: 176,
      averageCommissionPercent: 0,
      averageTaxPercent: 0,
      notes: ""
    },
    inventory: {
      allowProductSaleWithoutStock: false,
      allowSupplyNegativeStock: false,
      alertProductMinStock: true,
      alertSupplyMinStock: true,
      autoConsumeSuppliesOnServiceCompletion: true,
      allowManualSupplyAdjustment: true,
      requireSupplyAdjustmentReason: false,
      reserveStockOnQuote: false,
      defaultQuoteValidityDays: 15
    },
    documents: {
      defaultProductDocumentType: "Recibo",
      defaultServiceDocumentType: "Recibo",
      showPixInInvoices: true,
      showBankAccountsInInvoices: true,
      showBusinessDataInDocuments: true,
      receiptNumberPrefix: "REC",
      quoteNumberPrefix: "ORC",
      orderNumberPrefix: "PED",
      receiptDefaultNote: "",
      quoteDefaultNote: ""
    }
  };
}

function getDefaultProductCatalog() {
  const today = getTodayISO();
  return [
    {
      id: 1,
      sku: "PRD-001",
      name: "Aromatizante premium",
      unit: "un",
      stock: 18,
      minStock: 6,
      cost: 8.5,
      price: 24.9,
      active: true,
      notes: "Item de balcão para vendas rápidas.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 2,
      sku: "PRD-002",
      name: "Limpa vidros spray",
      unit: "un",
      stock: 9,
      minStock: 4,
      cost: 12,
      price: 32,
      active: true,
      notes: "Produto de vitrine com saída recorrente.",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 3,
      sku: "PRD-003",
      name: "Toalha de microfibra",
      unit: "un",
      stock: 14,
      minStock: 5,
      cost: 9.2,
      price: 22,
      active: true,
      notes: "Também pode ser usada em kits promocionais.",
      createdAt: today,
      updatedAt: today
    }
  ];
}

function getDefaultSupplyCatalog() {
  const today = getTodayISO();
  return [
    {
      id: 1,
      sku: "INS-001",
      name: "Shampoo automotivo",
      unit: "ml",
      stock: 8500,
      minStock: 2500,
      cost: 0.03,
      active: true,
      supplier: "Distribuidora Prime Clean",
      notes: "Base principal para lavagens externas.",
      phType: "neutral",
      phApproximate: "7",
      aggressivenessLevel: "low",
      riskTags: [],
      safeForCoating: "true",
      safeForWrap: "true",
      safeForMattePaint: "true",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 2,
      sku: "INS-002",
      name: "Desengraxante",
      unit: "ml",
      stock: 3200,
      minStock: 1200,
      cost: 0.04,
      active: true,
      supplier: "Distribuidora Prime Clean",
      notes: "Uso em rodas e áreas críticas.",
      phType: "alkaline",
      phApproximate: "12",
      aggressivenessLevel: "high",
      riskTags: ["strong_alkaline_product", "degreaser", "heavy_cleaner"],
      safeForCoating: "false",
      safeForWrap: "false",
      safeForMattePaint: "unknown",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 3,
      sku: "INS-003",
      name: "Limpa vidros",
      unit: "ml",
      stock: 2400,
      minStock: 900,
      cost: 0.035,
      active: true,
      supplier: "Glass Care",
      notes: "Aplicação final em vidros e espelhos.",
      phType: "neutral",
      phApproximate: "7",
      aggressivenessLevel: "low",
      riskTags: [],
      safeForCoating: "true",
      safeForWrap: "unknown",
      safeForMattePaint: "true",
      createdAt: today,
      updatedAt: today
    },
    {
      id: 4,
      sku: "INS-004",
      name: "Pano descartável",
      unit: "un",
      stock: 120,
      minStock: 40,
      cost: 0.9,
      active: true,
      supplier: "Tecno Wipes",
      notes: "Uso recorrente em acabamentos.",
      phType: "unknown",
      phApproximate: "",
      aggressivenessLevel: "low",
      riskTags: [],
      safeForCoating: "true",
      safeForWrap: "true",
      safeForMattePaint: "true",
      createdAt: today,
      updatedAt: today
    }
  ];
}

function getDefaultServiceSupplyProfiles() {
  return {
    [getServiceSupplyProfileKey({ name: "Lavagem Prime", vehicleType: "Carro", vehicleCategory: "Hatch" })]: [
      { supplyId: 1, quantity: 50, notes: "Diluição padrão da cuba." },
      { supplyId: 3, quantity: 18, notes: "Acabamento dos vidros." },
      { supplyId: 4, quantity: 1, notes: "Secagem final." }
    ],
    [getServiceSupplyProfileKey({ name: "Higienização interna", vehicleType: "Carro", vehicleCategory: "Sedan" })]: [
      { supplyId: 2, quantity: 30, notes: "Apoio na limpeza pesada." },
      { supplyId: 4, quantity: 2, notes: "Aplicação nos bancos e painéis." }
    ],
    [getServiceSupplyProfileKey({ name: "Detailing completo", vehicleType: "Carro", vehicleCategory: "SUV" })]: [
      { supplyId: 1, quantity: 60, notes: "Base neutra para a lavagem." },
      { supplyId: 2, quantity: 25, notes: "Uso pontual em áreas críticas." },
      { supplyId: 4, quantity: 2, notes: "Acabamento final." }
    ]
  };
}

function getDefaultVehicleSpecialCareRecords() {
  const today = `${getTodayISO()}T09:30:00`;
  return [
    {
      id: 1,
      companyId: "local-default",
      vehicleId: 3,
      vehiclePlate: "LVP3E72",
      attendanceId: null,
      type: "Vitrificação / coating cerâmico",
      attentionLevel: "Atenção",
      description: "Cliente informou proteção cerâmica recente e preferência por manutenção com baixa agressividade.",
      restrictionTags: ["avoid_acid", "avoid_strong_alkaline", "use_ph_neutral"],
      recommendedTags: ["prefer_ph_neutral", "prefer_low_aggression"],
      source: "Informado pelo cliente",
      sourceAttendanceId: null,
      sourceServiceId: "",
      registeredAt: today,
      validUntil: "",
      active: true,
      createdAt: today,
      updatedAt: today,
      createdBy: "Administrador",
      updatedBy: "Administrador",
      deletedAt: "",
      syncStatus: "local_only",
      auditLogId: "care-1",
      history: []
    }
  ];
}

function normalizeProductCatalog(products = []) {
  const source = Array.isArray(products) && products.length ? products : getDefaultProductCatalog();
  return source
    .map((item, index) => {
      const today = getTodayISO();
      return {
        id: Number(item.id || index + 1),
        sku: String(item.sku || `PRD-${String(index + 1).padStart(3, "0")}`).trim(),
        name: String(item.name || "").trim(),
        unit: String(item.unit || "un").trim() || "un",
        stock: Number(item.stock || 0),
        minStock: Math.max(0, Number(item.minStock || 0)),
        cost: Math.max(0, Number(item.cost || 0)),
        price: Math.max(0, Number(item.price || 0)),
        active: item.active !== false,
        notes: String(item.notes || "").trim(),
        createdAt: item.createdAt || today,
        updatedAt: item.updatedAt || today
      };
    })
    .filter((item) => item.name);
}

function normalizeSupplyCatalog(supplies = []) {
  const source = Array.isArray(supplies) && supplies.length ? supplies : getDefaultSupplyCatalog();
  return source
    .map((item, index) => {
      const today = getTodayISO();
      return {
        id: Number(item.id || index + 1),
        sku: String(item.sku || `INS-${String(index + 1).padStart(3, "0")}`).trim(),
        name: String(item.name || "").trim(),
        unit: String(item.unit || "un").trim() || "un",
        stock: Number(item.stock || 0),
        minStock: Math.max(0, Number(item.minStock || 0)),
        cost: Math.max(0, Number(item.cost || 0)),
        active: item.active !== false,
        supplier: String(item.supplier || "").trim(),
        notes: String(item.notes || "").trim(),
        riskTags: normalizeStringTagList(item.riskTags, supplyRiskTagOptions.map((option) => option.tag)),
        createdAt: item.createdAt || today,
        updatedAt: item.updatedAt || today
      };
    })
    .filter((item) => item.name);
}

function normalizeStringTagList(values = [], allowedValues = []) {
  const allowed = new Set(allowedValues || []);
  return [...new Set((Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).filter(Boolean))]
    .filter((value) => !allowed.size || allowed.has(value));
}

function normalizeVehicleSpecialCareRecords(records = []) {
  const source = Array.isArray(records) && records.length ? records : getDefaultVehicleSpecialCareRecords();
  return source
    .map((record, index) => {
      const timestamp = String(record.createdAt || record.registeredAt || new Date().toISOString()).trim();
      return {
        id: Number(record.id || index + 1),
        companyId: String(record.companyId || "local-default").trim(),
        vehicleId: Number(record.vehicleId || 0) || null,
        vehiclePlate: formatPlate(String(record.vehiclePlate || record.plate || "").trim()),
        attendanceId: Number(record.attendanceId || 0) || null,
        type: String(record.type || vehicleSpecialCareTypes[0]).trim(),
        attentionLevel: vehicleSpecialCareAttentionLevels.includes(record.attentionLevel) ? record.attentionLevel : "Informativo",
        description: String(record.description || "").trim(),
        restrictionTags: normalizeStringTagList(record.restrictionTags, vehicleSpecialCareCombinedRestrictionOptions.map((option) => option.tag)),
        recommendedTags: normalizeStringTagList(record.recommendedTags, vehicleSpecialCareRecommendedOptions.map((option) => option.tag)),
        source: vehicleSpecialCareSources.includes(record.source) ? record.source : "Outro",
        sourceAttendanceId: Number(record.sourceAttendanceId || 0) || null,
        sourceServiceId: String(record.sourceServiceId || "").trim(),
        registeredAt: String(record.registeredAt || timestamp).trim(),
        validUntil: String(record.validUntil || "").trim(),
        active: record.active !== false,
        createdAt: timestamp,
        updatedAt: String(record.updatedAt || timestamp).trim(),
        createdBy: String(record.createdBy || activeSessionUser || "Administrador").trim(),
        updatedBy: String(record.updatedBy || activeSessionUser || "Administrador").trim(),
        deletedAt: String(record.deletedAt || "").trim(),
        syncStatus: String(record.syncStatus || "local_only").trim(),
        auditLogId: String(record.auditLogId || `care-${index + 1}`).trim(),
        history: (Array.isArray(record.history) ? record.history : []).map((item, historyIndex) => ({
          id: String(item.id || `care-history-${index + 1}-${historyIndex + 1}`),
          type: String(item.type || "").trim(),
          description: String(item.description || "").trim(),
          createdAt: String(item.createdAt || timestamp).trim(),
          author: String(item.author || activeSessionUser || "Administrador").trim()
        }))
      };
    })
    .filter((record) => record.vehicleId || record.vehiclePlate);
}

function normalizeProductSales(sales = []) {
  return (Array.isArray(sales) ? sales : [])
    .map((sale, index) => ({
      id: Number(sale.id || index + 1),
      code: String(sale.code || "").trim(),
      date: sale.date || getTodayISO(),
      time: sale.time || "00:00",
      clientName: String(sale.clientName || "Cliente avulso").trim(),
      plate: String(sale.plate || "").trim(),
      paymentMethod: getCanonicalPaymentMethodName(sale.paymentMethod || getPreferredPaymentMethodName("productSale")),
      documentType: String(sale.documentType || businessFinanceSettings.documents.defaultProductDocumentType || "Recibo").trim(),
      operator: String(sale.operator || activeSessionUser || "Administrador").trim(),
      notes: String(sale.notes || "").trim(),
      status: sale.status || "Confirmado",
      items: (Array.isArray(sale.items) ? sale.items : []).map((item) => ({
        productId: Number(item.productId || 0),
        name: String(item.name || "").trim(),
        quantity: Math.max(0, Number(item.quantity || 0)),
        unitPrice: Math.max(0, Number(item.unitPrice || 0)),
        lineTotal: Math.max(0, Number(item.lineTotal || Number(item.quantity || 0) * Number(item.unitPrice || 0)))
      })),
      total: Math.max(0, Number(sale.total || 0)),
      cashEntryId: Number(sale.cashEntryId || 0) || null
    }))
    .filter((sale) => sale.code && sale.items.length);
}

function normalizeInventoryMovements(movements = []) {
  return (Array.isArray(movements) ? movements : [])
    .map((movement, index) => ({
      id: Number(movement.id || index + 1),
      kind: movement.kind === "product" ? "product" : "supply",
      itemId: Number(movement.itemId || 0),
      itemName: String(movement.itemName || "").trim(),
      type: String(movement.type || "Ajuste").trim(),
      quantity: Number(movement.quantity || 0),
      previousStock: Number(movement.previousStock || 0),
      currentStock: Number(movement.currentStock || 0),
      unit: String(movement.unit || "un").trim() || "un",
      reason: String(movement.reason || "").trim(),
      sourceCode: String(movement.sourceCode || "").trim(),
      createdAt: String(movement.createdAt || `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`).trim(),
      operator: String(movement.operator || activeSessionUser || "Administrador").trim()
    }))
    .filter((movement) => movement.itemId && movement.itemName);
}

function normalizeCashEntries(entries = []) {
  return (Array.isArray(entries) ? entries : [])
    .map((entry, index) => ({
      id: Number(entry.id || index + 1),
      date: String(entry.date || getTodayISO()).trim(),
      time: String(entry.time || getCurrentShortTime()).trim(),
      type: entry.type === "Saída" ? "Saída" : "Entrada",
      description: String(entry.description || "").trim(),
      method: getCanonicalPaymentMethodName(entry.method || "") || String(entry.method || "").trim(),
      value: Number(entry.value || 0),
      category: String(entry.category || "").trim(),
      costCenter: String(entry.costCenter || "").trim(),
      status: entry.status === "Confirmado" ? "Confirmado" : "Pendente",
      scheduledDate: String(entry.scheduledDate || "").trim(),
      scheduledTime: String(entry.scheduledTime || "").trim(),
      deleted: Boolean(entry.deleted),
      deletedAt: String(entry.deletedAt || "").trim(),
      deletedBy: String(entry.deletedBy || "").trim(),
      attachment: entry.attachment?.name ? { name: String(entry.attachment.name), type: String(entry.attachment.type || "Comprovante") } : null,
      feePercent: Number(entry.feePercent || 0),
      fixedFee: Number(entry.fixedFee || 0),
      feeAmount: Number(entry.feeAmount || 0),
      netAmount: Number(entry.netAmount || Math.abs(Number(entry.value || 0))),
      expectedReceiptDate: String(entry.expectedReceiptDate || entry.date || getTodayISO()).trim(),
      methodImmediateSettlement: Boolean(entry.methodImmediateSettlement),
      settlementDays: Math.max(0, Number(entry.settlementDays || 0)),
      linkedBankAccountName: String(entry.linkedBankAccountName || "").trim(),
      serviceAmount: Number(entry.serviceAmount || 0),
      productAmount: Number(entry.productAmount || 0),
      createdBy: String(entry.createdBy || activeSessionUser || "Administrador").trim(),
      updatedBy: String(entry.updatedBy || activeSessionUser || "Administrador").trim(),
      openPayment: Boolean(entry.openPayment),
      plate: String(entry.plate || "").trim(),
      vehicleId: Number(entry.vehicleId || 0) || null
    }))
    .filter((entry) => entry.description);
}

function normalizeServiceSupplyProfiles(profiles = {}) {
  const validSupplyIds = new Set((Array.isArray(supplyCatalog) ? supplyCatalog : []).map((item) => Number(item.id)));
  return Object.entries(profiles || {}).reduce((accumulator, [serviceKey, entries]) => {
    const normalizedEntries = (Array.isArray(entries) ? entries : [])
      .map((entry) => ({
        supplyId: Number(entry.supplyId || 0),
        quantity: Math.max(0, Number(entry.quantity || 0)),
        notes: String(entry.notes || "").trim()
      }))
      .filter((entry) => entry.supplyId && entry.quantity > 0 && (validSupplyIds.size ? validSupplyIds.has(entry.supplyId) : true));
    if (normalizedEntries.length) accumulator[serviceKey] = normalizedEntries;
    return accumulator;
  }, {});
}

function normalizeDocumentHistory(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((item, index) => ({
      id: Number(item.id || index + 1),
      fileName: String(item.fileName || "").trim(),
      title: String(item.title || "Documento").trim(),
      subtitle: String(item.subtitle || "").trim(),
      documentNumber: String(item.documentNumber || "").trim(),
      category: String(item.category || "Documento").trim(),
      summary: String(item.summary || "").trim(),
      reportTarget: String(item.reportTarget || "documents").trim(),
      sourceType: String(item.sourceType || "").trim(),
      sourceId: String(item.sourceId || "").trim(),
      createdAt: String(item.createdAt || `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`).trim(),
      responsible: String(item.responsible || activeSessionUser || "Sistema LavaPrime").trim()
    }))
    .filter((item) => item.fileName && item.title);
}

function saveProductCatalog() {
  saveBusinessStorageItem(businessStorageKeys.products, productCatalog);
}

function saveSupplyCatalog() {
  saveBusinessStorageItem(businessStorageKeys.supplies, supplyCatalog);
}

function saveProductSales() {
  saveBusinessStorageItem(businessStorageKeys.productSales, productSales);
}

function saveInventoryMovements() {
  saveBusinessStorageItem(businessStorageKeys.inventoryMovements, inventoryMovements);
}

function saveServiceSupplyProfiles() {
  saveBusinessStorageItem(businessStorageKeys.serviceSupplies, serviceSupplyProfiles);
}

function saveDocumentHistory() {
  saveBusinessStorageItem(businessStorageKeys.documentHistory, documentHistory);
}

function saveCashEntries() {
  saveBusinessStorageItem(businessStorageKeys.cashEntries, cashEntries);
}

function saveVehicleSpecialCareRecords() {
  saveBusinessStorageItem(businessStorageKeys.vehicleSpecialCare, vehicleSpecialCareRecords);
}

function getNextProductId() {
  return Math.max(0, ...productCatalog.map((item) => Number(item.id) || 0)) + 1;
}

function getNextSupplyId() {
  return Math.max(0, ...supplyCatalog.map((item) => Number(item.id) || 0)) + 1;
}

function getNextProductSaleId() {
  return Math.max(0, ...productSales.map((item) => Number(item.id) || 0)) + 1;
}

function getNextInventoryMovementId() {
  return Math.max(0, ...inventoryMovements.map((item) => Number(item.id) || 0)) + 1;
}

function getNextDocumentHistoryId() {
  return Math.max(0, ...documentHistory.map((item) => Number(item.id) || 0)) + 1;
}

function getProductById(id) {
  return productCatalog.find((item) => Number(item.id) === Number(id)) || null;
}

function getSupplyById(id) {
  return supplyCatalog.find((item) => Number(item.id) === Number(id)) || null;
}

function getProductMarginValue(product) {
  return Math.max(0, Number(product.price || 0) - Number(product.cost || 0));
}

function getProductMarginPercent(product) {
  const price = Number(product.price || 0);
  if (!price) return 0;
  return Math.max(0, (getProductMarginValue(product) / price) * 100);
}

function isLowStockItem(item) {
  return Number(item.stock || 0) <= Number(item.minStock || 0);
}

function getLowStockProducts() {
  return productCatalog.filter((item) => item.active !== false && isLowStockItem(item));
}

function getLowStockSupplies() {
  return supplyCatalog.filter((item) => item.active !== false && isLowStockItem(item));
}

function getServiceSupplyProfileKey(service) {
  const safeService = service || {};
  return [safeService.name || "", safeService.vehicleType || "", shouldUseVehicleCategory(safeService.vehicleType) ? safeService.vehicleCategory || "" : "todos"]
    .map((value) => normalizeText(value))
    .join("__");
}

function getServiceSupplyProfile(service) {
  return serviceSupplyProfiles[getServiceSupplyProfileKey(service)] || [];
}

function getServiceTechnicalCoverageCount() {
  return serviceCatalog.filter((service) => getServiceSupplyProfile(service).length > 0).length;
}

function getServicesWithoutSupplyProfile() {
  return serviceCatalog.filter((service) => getServiceSupplyProfile(service).length === 0);
}

function getInventoryMovementLabel(type) {
  const labels = {
    sale: "Venda",
    saida_venda_atendimento: "Venda no atendimento",
    estorno_venda_atendimento: "Estorno de venda no atendimento",
    estorno_cancelamento_atendimento: "Estorno por cancelamento",
    serviceConsumption: "Consumo em serviço",
    adjustment: "Ajuste manual",
    restock: "Reposição"
  };
  return labels[type] || type || "Movimento";
}

function recordGeneratedDocument(payload) {
  documentHistory.unshift({
    id: getNextDocumentHistoryId(),
    fileName: payload.fileName,
    title: payload.title,
    subtitle: payload.subtitle || "",
    documentNumber: payload.documentNumber || createPdfDocumentNumber(payload.fileName),
    category: payload.category || "Documento",
    summary: payload.summary || "",
    reportTarget: payload.reportTarget || "documents",
    sourceType: payload.sourceType || "",
    sourceId: payload.sourceId || "",
    createdAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    responsible: payload.responsible || activeSessionUser || "Sistema LavaPrime"
  });
  saveDocumentHistory();
}

function getVehicleServiceDefinitions(vehicle) {
  const services = getVehicleServices(vehicle);
  return services
    .map((serviceName) => findServiceDefinition(serviceName, vehicle.type, vehicle.category))
    .filter(Boolean);
}

function getAggregatedSupplyConsumptionForVehicle(vehicle) {
  const totals = new Map();
  getVehicleServiceDefinitions(vehicle).forEach((service) => {
    getServiceSupplyProfile(service).forEach((entry) => {
      const current = totals.get(entry.supplyId) || { supplyId: entry.supplyId, quantity: 0, serviceNames: new Set() };
      current.quantity += Number(entry.quantity || 0);
      current.serviceNames.add(service.name);
      totals.set(entry.supplyId, current);
    });
  });
  return Array.from(totals.values()).map((entry) => ({
    supplyId: entry.supplyId,
    quantity: entry.quantity,
    serviceNames: Array.from(entry.serviceNames)
  }));
}

function validateSupplyAvailabilityForVehicle(vehicle) {
  const entries = getAggregatedSupplyConsumptionForVehicle(vehicle);
  const issues = entries
    .map((entry) => {
      const supply = getSupplyById(entry.supplyId);
      if (!supply) return null;
      const currentStock = Number(supply.stock || 0);
      const nextStock = currentStock - Number(entry.quantity || 0);
      const allowNegative = businessFinanceSettings.inventory.allowSupplyNegativeStock;
      if (!allowNegative && nextStock < 0) {
        return `${supply.name}: faltam ${formatInventoryQuantity(Math.abs(nextStock), supply.unit)}`;
      }
      return null;
    })
    .filter(Boolean);
  return { valid: !issues.length, issues, entries };
}

function consumeServiceSuppliesForVehicle(vehicle) {
  if (!businessFinanceSettings.inventory.autoConsumeSuppliesOnServiceCompletion) return true;
  if (vehicle.suppliesConsumedAt) return true;

  const validation = validateSupplyAvailabilityForVehicle(vehicle);
  if (!validation.valid) {
    showToast(`Estoque insuficiente para concluir: ${validation.issues.join(" · ")}`);
    return false;
  }

  validation.entries.forEach((entry) => {
    const supply = getSupplyById(entry.supplyId);
    if (!supply) return;
    const previousStock = Number(supply.stock || 0);
    const nextStock = previousStock - Number(entry.quantity || 0);
    supply.stock = nextStock;
    supply.updatedAt = getTodayISO();
    registerInventoryMovement({
      kind: "supply",
      itemId: supply.id,
      itemName: supply.name,
      type: "serviceConsumption",
      quantity: -Number(entry.quantity || 0),
      previousStock,
      currentStock: nextStock,
      unit: supply.unit,
      reason: `Consumo automático em ${vehicle.plate} · ${entry.serviceNames.join(", ")}`
    });
  });

  vehicle.suppliesConsumedAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  saveSupplyCatalog();
  return true;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, Number(value || 0)));
}

function getCanonicalPaymentMethodName(name) {
  const rawName = String(name || "").trim();
  if (!rawName) return "";

  const aliases = {
    pix: "Pix",
    dinheiro: "Dinheiro",
    "cartao de debito": "Cartão de débito",
    "cartão de debito": "Cartão de débito",
    "cartao de crédito": "Cartão de crédito",
    "cartão de crédito": "Cartão de crédito",
    "cartao de credito": "Cartão de crédito",
    "cartão de credito": "Cartão de crédito",
    transferencia: "Transferência bancária",
    "transferência": "Transferência bancária",
    "transferencia bancaria": "Transferência bancária",
    "transferência bancária": "Transferência bancária",
    faturado: "Faturado",
    boleto: "Boleto",
    carteira: "Carteira (legado)"
  };
  const normalized = normalizeText(rawName);
  if (aliases[normalized]) return aliases[normalized];

  const defaultMatch = getDefaultBusinessPaymentMethods().find((method) => normalizeText(method.name) === normalized);
  return defaultMatch ? defaultMatch.name : rawName;
}

function createBusinessPaymentMethodRecord(rawMethod, fallbackId = 0) {
  const raw = typeof rawMethod === "string" ? { name: rawMethod } : { ...(rawMethod || {}) };
  const canonicalName = getCanonicalPaymentMethodName(raw.name || "");
  if (!canonicalName) return null;

  const defaultMethod = getDefaultBusinessPaymentMethods().find((method) => normalizeText(method.name) === normalizeText(canonicalName));
  const today = getTodayISO();
  const linkedBankAccountId =
    raw.linkedBankAccountId === "" || raw.linkedBankAccountId === undefined || raw.linkedBankAccountId === null
      ? defaultMethod?.linkedBankAccountId ?? null
      : Number(raw.linkedBankAccountId);

  return {
    ...(defaultMethod || {
      id: fallbackId || Date.now(),
      name: canonicalName,
      type: "outro",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: true,
      settlementDays: 0,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: ""
    }),
    ...raw,
    id: Number(raw.id || defaultMethod?.id || fallbackId || Date.now()),
    name: canonicalName,
    type: raw.type || defaultMethod?.type || "outro",
    active: raw.active === undefined ? Boolean(defaultMethod?.active ?? true) : Boolean(raw.active),
    showInService: raw.showInService === undefined ? Boolean(defaultMethod?.showInService ?? true) : Boolean(raw.showInService),
    showInProductSale:
      raw.showInProductSale === undefined ? Boolean(defaultMethod?.showInProductSale ?? true) : Boolean(raw.showInProductSale),
    showInQuote: raw.showInQuote === undefined ? Boolean(defaultMethod?.showInQuote ?? true) : Boolean(raw.showInQuote),
    showInInvoice: raw.showInInvoice === undefined ? Boolean(defaultMethod?.showInInvoice ?? true) : Boolean(raw.showInInvoice),
    immediateSettlement:
      raw.immediateSettlement === undefined ? Boolean(defaultMethod?.immediateSettlement ?? true) : Boolean(raw.immediateSettlement),
    settlementDays: Math.max(0, Number(raw.settlementDays ?? defaultMethod?.settlementDays ?? 0)),
    feePercent: clampNumber(raw.feePercent ?? defaultMethod?.feePercent ?? 0, 0, 100),
    fixedFee: Math.max(0, Number(raw.fixedFee ?? defaultMethod?.fixedFee ?? 0)),
    linkedBankAccountId:
      Number.isFinite(linkedBankAccountId) && businessBankAccounts.some((account) => account.id === linkedBankAccountId)
        ? linkedBankAccountId
        : null,
    notes: raw.notes || defaultMethod?.notes || "",
    createdAt: raw.createdAt || defaultMethod?.createdAt || today,
    updatedAt: raw.updatedAt || today
  };
}

function normalizeBusinessPaymentMethods(methods = []) {
  const defaults = getDefaultBusinessPaymentMethods();
  const merged = new Map(
    defaults.map((method) => [normalizeText(method.name), createBusinessPaymentMethodRecord(method, method.id)])
  );

  (Array.isArray(methods) ? methods : []).forEach((method, index) => {
    const record = createBusinessPaymentMethodRecord(method, index + 1);
    if (!record) return;
    const key = normalizeText(record.name);
    const previous = merged.get(key);
    merged.set(key, { ...(previous || {}), ...record, id: previous?.id || record.id || index + 1 });
  });

  return Array.from(merged.values()).sort((left, right) => left.id - right.id);
}

function normalizeBusinessFinanceSettings(settings = {}) {
  const defaults = getDefaultBusinessFinanceSettings();
  return {
    receiptRules: {
      ...defaults.receiptRules,
      ...(settings?.receiptRules || {})
    },
    margins: {
      ...defaults.margins,
      ...(settings?.margins || {})
    },
    inventory: {
      ...defaults.inventory,
      ...(settings?.inventory || {})
    },
    documents: {
      ...defaults.documents,
      ...(settings?.documents || {})
    }
  };
}

function saveBusinessPaymentMethods() {
  saveBusinessStorageItem(businessStorageKeys.paymentMethods, businessPaymentMethods);
}

function saveBusinessFinanceSettings() {
  saveBusinessStorageItem(businessStorageKeys.financeSettings, businessFinanceSettings);
}

function getNextBusinessPaymentMethodId() {
  return Math.max(0, ...businessPaymentMethods.map((method) => Number(method.id) || 0)) + 1;
}

function getAllPaymentMethodNames() {
  return businessPaymentMethods.map((method) => method.name);
}

function getPaymentMethodByName(name) {
  const canonicalName = getCanonicalPaymentMethodName(name);
  return businessPaymentMethods.find((method) => normalizeText(method.name) === normalizeText(canonicalName)) || null;
}

function getActivePaymentMethods(context = "service") {
  const contextMap = {
    service: "showInService",
    productSale: "showInProductSale",
    quote: "showInQuote",
    invoice: "showInInvoice",
    cashflow: "active",
    settlement: "active"
  };
  const field = contextMap[context] || "showInService";
  return businessPaymentMethods.filter((method) => method.active && (field === "active" || method[field]));
}

function getActivePaymentMethodNames(context = "service", allowBilled = true) {
  return getActivePaymentMethods(context)
    .map((method) => method.name)
    .filter((name) => allowBilled || normalizeText(name) !== normalizeText("Faturado"));
}

function getPaymentMethodFee(methodName, grossAmount = 0, referenceDate = getTodayISO()) {
  const method = getPaymentMethodByName(methodName);
  const grossValue = Math.max(0, Number(grossAmount || 0));
  const feePercent = method ? clampNumber(method.feePercent, 0, 100) : 0;
  const fixedFee = method ? Math.max(0, Number(method.fixedFee || 0)) : 0;
  const feeAmount = grossValue * (feePercent / 100) + fixedFee;
  const settlementDays = Math.max(0, Number(method?.settlementDays || 0));
  const expectedDate = settlementDays ? addDaysToISODate(referenceDate, settlementDays) : referenceDate;
  return {
    method,
    feePercent,
    fixedFee,
    feeAmount: grossValue > 0 ? feeAmount : 0,
    netAmount: Math.max(0, grossValue - feeAmount),
    settlementDays,
    immediateSettlement: Boolean(method?.immediateSettlement),
    expectedDate
  };
}

function calculatePaymentNetAmount(grossAmount, methodName, referenceDate = getTodayISO()) {
  return getPaymentMethodFee(methodName, grossAmount, referenceDate).netAmount;
}

function getExpectedReceiptStatus(methodName, type = "Entrada") {
  const method = getPaymentMethodByName(methodName);
  if (!method || type === "Saída") return "Confirmado";
  if (normalizeText(method.name) === normalizeText("Faturado")) return "Pendente";
  if (method.immediateSettlement) return "Confirmado";
  return "Pendente";
}

function getPaymentMethodLinkedBankAccountName(methodName) {
  const method = getPaymentMethodByName(methodName);
  const accountId = Number(method?.linkedBankAccountId || 0);
  return businessBankAccounts.find((account) => account.id === accountId)?.bank || "";
}

function getPaymentMethodUsage(name) {
  const normalizedName = normalizeText(getCanonicalPaymentMethodName(name));
  return {
    cashEntries: cashEntries.filter((entry) => normalizeText(entry.method) === normalizedName).length,
    patioVehicles: patioVehicles.filter(
      (vehicle) => normalizeText(vehicle.payment) === normalizedName || normalizeText(vehicle.entryPaymentMethod) === normalizedName
    ).length,
    openPayments: openPayments.filter(
      (payment) =>
        normalizeText(payment.paymentMethod) === normalizedName || normalizeText(payment.settlementMethod) === normalizedName
    ).length,
    quotes: quoteEstimates.filter((quote) => normalizeText(quote.payment) === normalizedName).length,
    invoiceItems: invoiceLineItems.filter((item) => normalizeText(item.paymentMethod) === normalizedName).length,
    invoices: billingInvoices.filter(
      (invoice) => normalizeText(invoice.paymentMethod) === normalizedName || normalizeText(invoice.settlementMethod) === normalizedName
    ).length
  };
}

function isBusinessPaymentMethodInUse(name) {
  const usage = getPaymentMethodUsage(name);
  return Object.values(usage).some((value) => Number(value) > 0);
}

function migrateExistingPaymentMethodReferences() {
  const namesInUse = new Set();
  const migrateField = (record, key) => {
    if (!record || !record[key]) return;
    const nextName = getCanonicalPaymentMethodName(record[key]);
    if (!nextName) return;
    record[key] = nextName;
    namesInUse.add(nextName);
  };

  patioVehicles.forEach((vehicle) => {
    migrateField(vehicle, "payment");
    migrateField(vehicle, "entryPaymentMethod");
  });
  quoteEstimates.forEach((quote) => migrateField(quote, "payment"));
  cashEntries.forEach((entry) => migrateField(entry, "method"));
  openPayments.forEach((payment) => {
    migrateField(payment, "paymentMethod");
    migrateField(payment, "settlementMethod");
  });
  invoiceLineItems.forEach((item) => migrateField(item, "paymentMethod"));
  billingInvoices.forEach((invoice) => {
    migrateField(invoice, "paymentMethod");
    migrateField(invoice, "settlementMethod");
  });

  let catalogChanged = false;
  namesInUse.forEach((name) => {
    if (getPaymentMethodByName(name)) return;
    businessPaymentMethods.push(
      createBusinessPaymentMethodRecord(
        {
          id: getNextBusinessPaymentMethodId(),
          name,
          active: false,
          showInService: false,
          showInProductSale: false,
          showInQuote: false,
          showInInvoice: false,
          immediateSettlement: false,
          notes: "Forma importada do histórico."
        },
        getNextBusinessPaymentMethodId()
      )
    );
    catalogChanged = true;
  });

  if (catalogChanged) saveBusinessPaymentMethods();
  saveCashEntries();
}

function isDefaultBusinessPaymentMethod(name) {
  const canonicalName = getCanonicalPaymentMethodName(name);
  return getDefaultBusinessPaymentMethods().some((method) => normalizeText(method.name) === normalizeText(canonicalName));
}

function renameBusinessPaymentMethodReferences(currentName, nextName) {
  const normalizedCurrent = normalizeText(getCanonicalPaymentMethodName(currentName));
  const canonicalNext = getCanonicalPaymentMethodName(nextName);
  if (!normalizedCurrent || !canonicalNext || normalizedCurrent === normalizeText(canonicalNext)) return;

  const replaceField = (record, key) => {
    if (!record?.[key]) return;
    if (normalizeText(record[key]) === normalizedCurrent) record[key] = canonicalNext;
  };

  patioVehicles.forEach((vehicle) => {
    replaceField(vehicle, "payment");
    replaceField(vehicle, "entryPaymentMethod");
  });
  quoteEstimates.forEach((quote) => replaceField(quote, "payment"));
  cashEntries.forEach((entry) => replaceField(entry, "method"));
  openPayments.forEach((payment) => {
    replaceField(payment, "paymentMethod");
    replaceField(payment, "settlementMethod");
  });
  invoiceLineItems.forEach((item) => replaceField(item, "paymentMethod"));
  billingInvoices.forEach((invoice) => {
    replaceField(invoice, "paymentMethod");
    replaceField(invoice, "settlementMethod");
  });
  saveCashEntries();
}

function getSelectablePaymentMethodNames(context = "service", options = {}) {
  const allowBilled = options.allowBilled === undefined ? true : Boolean(options.allowBilled);
  const includeBankDeposit = Boolean(options.includeBankDeposit);
  const selectedValue = options.selectedValue ? getCanonicalPaymentMethodName(options.selectedValue) : "";
  const uniqueNames = [];
  const pushName = (name) => {
    if (!name) return;
    if (uniqueNames.some((item) => normalizeText(item) === normalizeText(name))) return;
    uniqueNames.push(name);
  };

  if (selectedValue) pushName(selectedValue);
  getActivePaymentMethodNames(context, allowBilled).forEach(pushName);
  if (includeBankDeposit) pushName("Depósito bancário");
  return uniqueNames;
}

function getPreferredPaymentMethodName(context = "service", allowBilled = true) {
  return getSelectablePaymentMethodNames(context, { allowBilled })[0] || "Pix";
}

function getDefaultQuoteValidityDays() {
  return Math.max(1, Number(businessFinanceSettings.inventory?.defaultQuoteValidityDays || 15));
}

function getDefaultInvoiceDueDate(referenceDate = getTodayISO(), offsetDays = null) {
  const days =
    offsetDays === null ? Number(businessFinanceSettings.receiptRules?.invoiceDefaultDueDays || 0) : Number(offsetDays || 0);
  return addDaysToISODate(referenceDate, Math.max(0, days));
}

function getDefaultOpenPaymentDueDate(referenceDate = getTodayISO(), offsetDays = null) {
  const days =
    offsetDays === null ? Number(businessFinanceSettings.receiptRules?.openPaymentDueDays || 0) : Number(offsetDays || 0);
  return addDaysToISODate(referenceDate, Math.max(0, days));
}

function getCashEntryFinanceSnapshot(value, method, type = "Entrada", referenceDate = getTodayISO()) {
  const grossValue = Math.max(0, Math.abs(Number(value || 0)));
  const fee = getPaymentMethodFee(method, grossValue, referenceDate);
  return {
    feePercent: fee.feePercent,
    fixedFee: fee.fixedFee,
    feeAmount: type === "Saída" ? 0 : fee.feeAmount,
    netAmount: type === "Saída" ? grossValue : fee.netAmount,
    expectedReceiptDate: fee.expectedDate,
    methodImmediateSettlement: fee.immediateSettlement,
    settlementDays: fee.settlementDays,
    linkedBankAccountName: getPaymentMethodLinkedBankAccountName(method)
  };
}

function getDefaultBusinessSocialLinks() {
  return businessSocialChannels.reduce((links, channel) => {
    links[channel.key] = { value: "", showInFooter: false, reportTarget: "all" };
    return links;
  }, {});
}

function normalizeBusinessSocialLinks(links = {}) {
  return businessSocialChannels.reduce((normalized, channel) => {
    const item = links?.[channel.key] || {};
    normalized[channel.key] = {
      value: item.value || "",
      showInFooter: Boolean(item.showInFooter || item.includeInReport),
      reportTarget: getBusinessSocialReportTarget(item.reportTarget)
    };
    return normalized;
  }, {});
}

function cloneSerializable(value) {
  return JSON.parse(JSON.stringify(value));
}

function replaceArrayContents(target, source) {
  target.splice(0, target.length, ...source);
}

function createDefaultRemoteOperator(sessionContext) {
  const today = new Date().toISOString().slice(0, 10);

  return {
    id: 1,
    name: sessionContext.displayName || "Administrador",
    cpf: "",
    phone: "",
    accessProfile: "Administrador",
    username: sessionContext.user?.email || "administrador",
    password: "",
    commissionType: "fixed",
    commissionValue: 0,
    role: "Administrador",
    shift: "A definir",
    today: 0,
    status: "Ativo",
    accessHistory: [],
    production: [{ date: today, services: 0, revenue: 0, attendance: "Cadastrado", items: [] }]
  };
}

function getDefaultRemoteWorkspaceSnapshot(sessionContext) {
  return {
    billingClients: [],
    billingInvoices: [],
    invoiceLineItems: [],
    patioVehicles: [],
    quoteEstimates: [],
    clientRegistry: [],
    vehicleRegistry: [],
    adminOperators: [createDefaultRemoteOperator(sessionContext)],
    serviceCatalog: [],
    openPayments: [],
    payableAccounts: [],
    businessProfile: normalizeBusinessProfile({
      ...getDefaultBusinessProfile(),
      email: sessionContext.user?.email || "",
      legalName: "",
      tradeName: ""
    }),
    businessBankAccounts: [],
    businessPixInfo: getDefaultBusinessPixInfo(),
    businessPaymentMethods: normalizeBusinessPaymentMethods(getDefaultBusinessPaymentMethods()),
    businessFinanceSettings: normalizeBusinessFinanceSettings(getDefaultBusinessFinanceSettings()),
    businessSocialLinks: normalizeBusinessSocialLinks(getDefaultBusinessSocialLinks()),
    businessMessageTemplates: getDefaultMessageTemplates(),
    productCatalog: normalizeProductCatalog([]),
    supplyCatalog: normalizeSupplyCatalog([]),
    productSales: normalizeProductSales([]),
    inventoryMovements: normalizeInventoryMovements([]),
    serviceSupplyProfiles: normalizeServiceSupplyProfiles([]),
    documentHistory: normalizeDocumentHistory([]),
    cashEntries: normalizeCashEntries([]),
    vehicleSpecialCareRecords: normalizeVehicleSpecialCareRecords([])
  };
}

function buildRemoteWorkspaceSnapshot() {
  return {
    billingClients: cloneSerializable(billingClients),
    billingInvoices: cloneSerializable(billingInvoices),
    invoiceLineItems: cloneSerializable(invoiceLineItems),
    patioVehicles: cloneSerializable(patioVehicles),
    quoteEstimates: cloneSerializable(quoteEstimates),
    clientRegistry: cloneSerializable(clientRegistry),
    vehicleRegistry: cloneSerializable(vehicleRegistry),
    adminOperators: cloneSerializable(adminOperators),
    serviceCatalog: cloneSerializable(serviceCatalog),
    openPayments: cloneSerializable(openPayments),
    payableAccounts: cloneSerializable(payableAccounts),
    businessProfile: cloneSerializable(businessProfile),
    businessBankAccounts: cloneSerializable(businessBankAccounts),
    businessPixInfo: cloneSerializable(businessPixInfo),
    businessPaymentMethods: cloneSerializable(businessPaymentMethods),
    businessFinanceSettings: cloneSerializable(businessFinanceSettings),
    businessSocialLinks: cloneSerializable(businessSocialLinks),
    businessMessageTemplates: cloneSerializable(businessMessageTemplates),
    productCatalog: cloneSerializable(productCatalog),
    supplyCatalog: cloneSerializable(supplyCatalog),
    productSales: cloneSerializable(productSales),
    inventoryMovements: cloneSerializable(inventoryMovements),
    serviceSupplyProfiles: cloneSerializable(serviceSupplyProfiles),
    documentHistory: cloneSerializable(documentHistory),
    cashEntries: cloneSerializable(cashEntries),
    vehicleSpecialCareRecords: cloneSerializable(vehicleSpecialCareRecords)
  };
}

function applyRemoteWorkspaceSnapshot(snapshot, sessionContext) {
  const fallback = getDefaultRemoteWorkspaceSnapshot(sessionContext);
  const nextSnapshot = {
    ...fallback,
    ...(snapshot && typeof snapshot === "object" ? snapshot : {})
  };

  businessProfile = normalizeBusinessProfile(nextSnapshot.businessProfile || fallback.businessProfile);
  businessBankAccounts = Array.isArray(nextSnapshot.businessBankAccounts) ? nextSnapshot.businessBankAccounts : [];
  businessPixInfo = { ...getDefaultBusinessPixInfo(), ...(nextSnapshot.businessPixInfo || {}) };
  businessPaymentMethods = normalizeBusinessPaymentMethods(nextSnapshot.businessPaymentMethods || fallback.businessPaymentMethods);
  businessFinanceSettings = normalizeBusinessFinanceSettings(
    nextSnapshot.businessFinanceSettings || fallback.businessFinanceSettings
  );
  businessSocialLinks = normalizeBusinessSocialLinks(nextSnapshot.businessSocialLinks || fallback.businessSocialLinks);
  businessMessageTemplates = Array.isArray(nextSnapshot.businessMessageTemplates)
    ? nextSnapshot.businessMessageTemplates
    : fallback.businessMessageTemplates;
  productCatalog = normalizeProductCatalog(nextSnapshot.productCatalog || []);
  supplyCatalog = normalizeSupplyCatalog(nextSnapshot.supplyCatalog || []);
  productSales = normalizeProductSales(nextSnapshot.productSales || []);
  inventoryMovements = normalizeInventoryMovements(nextSnapshot.inventoryMovements || []);
  serviceSupplyProfiles = normalizeServiceSupplyProfiles(nextSnapshot.serviceSupplyProfiles || []);
  documentHistory = normalizeDocumentHistory(nextSnapshot.documentHistory || []);
  cashEntries = normalizeCashEntries(nextSnapshot.cashEntries || []);
  vehicleSpecialCareRecords = normalizeVehicleSpecialCareRecords(nextSnapshot.vehicleSpecialCareRecords || []);

  replaceArrayContents(billingClients, Array.isArray(nextSnapshot.billingClients) ? nextSnapshot.billingClients : []);
  replaceArrayContents(billingInvoices, Array.isArray(nextSnapshot.billingInvoices) ? nextSnapshot.billingInvoices : []);
  replaceArrayContents(invoiceLineItems, Array.isArray(nextSnapshot.invoiceLineItems) ? nextSnapshot.invoiceLineItems : []);
  replaceArrayContents(patioVehicles, Array.isArray(nextSnapshot.patioVehicles) ? nextSnapshot.patioVehicles : []);
  replaceArrayContents(quoteEstimates, Array.isArray(nextSnapshot.quoteEstimates) ? nextSnapshot.quoteEstimates : []);
  replaceArrayContents(clientRegistry, Array.isArray(nextSnapshot.clientRegistry) ? nextSnapshot.clientRegistry : []);
  replaceArrayContents(vehicleRegistry, Array.isArray(nextSnapshot.vehicleRegistry) ? nextSnapshot.vehicleRegistry : []);
  replaceArrayContents(
    adminOperators,
    Array.isArray(nextSnapshot.adminOperators) && nextSnapshot.adminOperators.length
      ? nextSnapshot.adminOperators
      : fallback.adminOperators
  );
  replaceArrayContents(serviceCatalog, Array.isArray(nextSnapshot.serviceCatalog) ? nextSnapshot.serviceCatalog : []);
  replaceArrayContents(openPayments, Array.isArray(nextSnapshot.openPayments) ? nextSnapshot.openPayments : []);
  replaceArrayContents(payableAccounts, Array.isArray(nextSnapshot.payableAccounts) ? nextSnapshot.payableAccounts : []);

  selectedReportOperatorId = adminOperators[0]?.id || null;
}

function stopRemoteAutosave() {
  if (remoteWorkspaceState.autosaveTimer) {
    window.clearInterval(remoteWorkspaceState.autosaveTimer);
    remoteWorkspaceState.autosaveTimer = 0;
  }
  remoteWorkspaceState.dirty = false;
  remoteWorkspaceState.enabled = false;
  remoteWorkspaceState.isLoading = false;
  remoteWorkspaceState.isSaving = false;
  remoteWorkspaceState.lastSnapshotHash = "";
  remoteWorkspaceState.membershipRole = "";
  remoteWorkspaceState.organizationId = null;
  remoteWorkspaceState.userId = null;
}

function queueRemoteStateSync() {
  if (!remoteWorkspaceState.enabled || remoteWorkspaceState.isLoading) return;
  remoteWorkspaceState.dirty = true;
}

async function flushRemoteStateSync() {
  if (!remoteWorkspaceState.enabled || remoteWorkspaceState.isLoading || remoteWorkspaceState.isSaving) return;
  if (!remoteWorkspaceState.dirty) return;

  const snapshot = buildRemoteWorkspaceSnapshot();
  const snapshotHash = JSON.stringify(snapshot);

  if (snapshotHash === remoteWorkspaceState.lastSnapshotHash) {
    remoteWorkspaceState.dirty = false;
    return;
  }

  remoteWorkspaceState.isSaving = true;
  try {
    await upsertOrganizationAppState({
      organizationId: remoteWorkspaceState.organizationId,
      state: snapshot,
      stateVersion: 1,
      userId: remoteWorkspaceState.userId
    });
    remoteWorkspaceState.lastSnapshotHash = snapshotHash;
    remoteWorkspaceState.dirty = false;
  } catch (error) {
    console.error("Falha ao sincronizar estado com o Supabase.", error);
  } finally {
    remoteWorkspaceState.isSaving = false;
  }
}

async function initializeRemoteWorkspace(sessionContext) {
  remoteWorkspaceState.isLoading = true;
  try {
    const remoteRow = await fetchOrganizationAppState(sessionContext.organization.id);
    const snapshot = remoteRow?.state || getDefaultRemoteWorkspaceSnapshot(sessionContext);
    applyRemoteWorkspaceSnapshot(snapshot, sessionContext);

    remoteWorkspaceState.enabled = true;
    remoteWorkspaceState.membershipRole = sessionContext.membership.role;
    remoteWorkspaceState.organizationId = sessionContext.organization.id;
    remoteWorkspaceState.userId = sessionContext.user.id;
    remoteWorkspaceState.lastSnapshotHash = JSON.stringify(buildRemoteWorkspaceSnapshot());

    if (!remoteRow) {
      remoteWorkspaceState.dirty = true;
      await flushRemoteStateSync();
    }

    if (remoteWorkspaceState.autosaveTimer) window.clearInterval(remoteWorkspaceState.autosaveTimer);
    remoteWorkspaceState.autosaveTimer = window.setInterval(() => {
      void flushRemoteStateSync();
    }, 4000);
  } finally {
    remoteWorkspaceState.isLoading = false;
  }
}

async function restoreSupabaseSession() {
  if (!hasSupabaseBrowserConfig()) return;

  try {
    const sessionContext = await getLavaprimeSessionContext();
    if (!sessionContext) return;

    await initializeRemoteWorkspace(sessionContext);
    if (isSupabaseAdminRole(sessionContext.membership.role)) showAdmin(sessionContext.displayName);
    else showPatio(sessionContext.displayName);
  } catch (error) {
    console.error("Falha ao restaurar sessão do Supabase.", error);
  }
}

function loadBusinessStorageItem(key, fallback) {
  try {
    const rawValue = window.localStorage?.getItem(key);
    if (!rawValue) return fallback;
    const parsedValue = JSON.parse(rawValue);
    if (Array.isArray(fallback)) return Array.isArray(parsedValue) ? parsedValue : fallback;
    return { ...fallback, ...parsedValue };
  } catch (error) {
    return fallback;
  }
}

function saveBusinessStorageItem(key, value) {
  try {
    window.localStorage?.setItem(key, JSON.stringify(value));
    queueRemoteStateSync();
  } catch (error) {
    showToast("Não foi possível salvar no navegador.");
  }
}

function getBusinessDocumentName() {
  const preferred = businessProfile.displayNameMode === "legalName" ? businessProfile.legalName : businessProfile.tradeName;
  return preferred || businessProfile.tradeName || businessProfile.legalName || "LavaPrime";
}

function getBusinessMessageCompanyName() {
  return businessProfile.tradeName || getBusinessDocumentName();
}

function getBusinessDocumentContactLine(reportTarget = "all") {
  const items = [];
  const reportName = getBusinessReportDocumentName(reportTarget);
  items.push(...getBusinessReportIdentityDetails(reportTarget, reportName));
  if (shouldIncludeBusinessProfileFieldInReport("cnpj", reportTarget) && businessProfile.cnpj) items.push(`CNPJ: ${businessProfile.cnpj}`);
  if (shouldIncludeBusinessProfileFieldInReport("phone", reportTarget) && businessProfile.phone) items.push(`Telefone: ${businessProfile.phone}`);
  getVisibleBusinessAdditionalPhones(reportTarget).forEach((phone, index) => {
    items.push(`Telefone ${index + 2}: ${phone.value}`);
  });
  if (shouldIncludeBusinessProfileFieldInReport("email", reportTarget) && businessProfile.email) items.push(`E-mail: ${businessProfile.email}`);
  if (shouldIncludeBusinessProfileFieldInReport("address", reportTarget) && businessProfile.address) items.push(`Endereço: ${businessProfile.address}`);
  return items.join(" | ");
}

function getBusinessReportDocumentName(reportTarget = "all") {
  const preferredKey = businessProfile.displayNameMode === "legalName" ? "legalName" : "tradeName";
  const fallbackKey = preferredKey === "legalName" ? "tradeName" : "legalName";
  if (shouldIncludeBusinessProfileFieldInReport(preferredKey, reportTarget) && businessProfile[preferredKey]) return businessProfile[preferredKey];
  if (shouldIncludeBusinessProfileFieldInReport(fallbackKey, reportTarget) && businessProfile[fallbackKey]) return businessProfile[fallbackKey];
  return getBusinessDocumentName();
}

function getBusinessReportIdentityDetails(reportTarget = "all", primaryName = "") {
  const details = [];
  if (shouldIncludeBusinessProfileFieldInReport("tradeName", reportTarget) && businessProfile.tradeName && businessProfile.tradeName !== primaryName) {
    details.push(`Nome Fantasia: ${businessProfile.tradeName}`);
  }
  if (shouldIncludeBusinessProfileFieldInReport("legalName", reportTarget) && businessProfile.legalName && businessProfile.legalName !== primaryName) {
    details.push(`Razão Social: ${businessProfile.legalName}`);
  }
  return details;
}

function shouldIncludeBusinessProfileFieldInReport(fieldKey, reportTarget = "all") {
  const config = businessProfile.reportFields?.[fieldKey] || getDefaultBusinessProfileReportFields(businessProfile.displayNameMode)[fieldKey];
  return Boolean(config?.showInReports);
}

function getVisibleBusinessAdditionalPhones(reportTarget = "all") {
  return normalizeBusinessAdditionalPhones(businessProfile.additionalPhones).filter((phone) => phone.value && phone.showInReports);
}

function getBusinessSocialReportTarget(value) {
  return businessSocialReportTargets.some((target) => target.key === value) ? value : "all";
}

function getBusinessSocialReportTargetLabel(value) {
  return businessSocialReportTargets.find((target) => target.key === getBusinessSocialReportTarget(value))?.label || "Todos os relatórios";
}

function shouldIncludeReportTarget(selectedTarget, reportTarget) {
  const selected = getBusinessSocialReportTarget(selectedTarget);
  const target = getBusinessSocialReportTarget(reportTarget);
  if (selected === "all") return true;
  if (selected === target) return true;
  if (selected === "financial") return ["financial", "cashflow", "openPayments", "invoices", "receipts"].includes(target);
  return false;
}

function renderBusinessSocialReportTargetOptions(selectedTarget = "all") {
  const selected = getBusinessSocialReportTarget(selectedTarget);
  return businessSocialReportTargets
    .map(
      (target) =>
        `<option value="${escapeHtml(target.key)}" ${target.key === selected ? "selected" : ""}>${escapeHtml(target.label)}</option>`
    )
    .join("");
}

function getBusinessDocumentFooterDetails(reportTarget = "all") {
  const target = getBusinessSocialReportTarget(reportTarget);
  return businessSocialChannels
    .map((channel) => {
      const item = businessSocialLinks[channel.key];
      return shouldIncludeBusinessSocialInReport(item, target) && item.value ? `${channel.label}: ${item.value}` : "";
    })
    .filter(Boolean)
    .join(" | ");
}

function shouldIncludeBusinessSocialInReport(item, reportTarget) {
  if (!item?.showInFooter) return false;
  return shouldIncludeReportTarget(item.reportTarget, reportTarget);
}

function shouldAddInvoicePaymentData(document) {
  return normalizeText(`${document.title} ${document.category}`).includes("fatura") && getBusinessInvoicePaymentLines().length > 0;
}

function getBusinessInvoicePaymentLines() {
  const showBankAccounts = businessFinanceSettings.documents.showBankAccountsInInvoices;
  const showPixInInvoices = businessFinanceSettings.documents.showPixInInvoices;
  const bankLines = businessBankAccounts
    .filter((account) => showBankAccounts && account.showInInvoices)
    .map(
      (account) =>
        `${account.bank} - ${account.type} - Agencia ${account.agency} - Conta ${account.account} - Titular ${account.holder || getBusinessDocumentName()}`
    );
  const hasValidPixQr = isValidPixCopyPastePayload(businessPixInfo.qrPayload);
  const pixLines =
    showPixInInvoices && businessPixInfo.showInInvoices && (businessPixInfo.key || hasValidPixQr)
      ? [businessPixInfo.key ? `Pix ${businessPixInfo.keyType}: ${businessPixInfo.key}` : "", hasValidPixQr ? "QR Code Pix habilitado para faturas." : ""].filter(Boolean)
      : [];
  return [...bankLines, ...pixLines];
}

function getBusinessPixQrPayload(pixInfo = businessPixInfo) {
  const copyPasteCode = normalizePixCopyPaste(pixInfo.copyPasteCode);
  if (copyPasteCode) return isValidPixCopyPastePayload(copyPasteCode) ? copyPasteCode : "";
  return buildPixPaymentPayload(pixInfo);
}

function getBusinessProfileCompleteness() {
  const fields = [businessProfile.cnpj, businessProfile.legalName, businessProfile.tradeName, businessProfile.phone, businessProfile.email, businessProfile.address];
  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getNextBusinessBankAccountId() {
  return Math.max(0, ...businessBankAccounts.map((account) => account.id || 0)) + 1;
}

function buildPixPaymentPayload(pixInfo = businessPixInfo) {
  const pixKey = normalizePixKeyForPayload(pixInfo.key, pixInfo.keyType);
  if (!pixKey) return "";

  const merchantName = normalizePixText(pixInfo.receiver || getBusinessDocumentName()).slice(0, 25) || "LAVAPRIME";
  const merchantCity = normalizePixText(extractBusinessCity() || "SAO PAULO").slice(0, 15) || "SAO PAULO";
  const merchantAccountInfo = buildEmvField("00", "br.gov.bcb.pix") + buildEmvField("01", pixKey);
  const additionalData = buildEmvField("05", "***");
  const payloadWithoutCrc =
    buildEmvField("00", "01") +
    buildEmvField("26", merchantAccountInfo) +
    buildEmvField("52", "0000") +
    buildEmvField("53", "986") +
    buildEmvField("58", "BR") +
    buildEmvField("59", merchantName) +
    buildEmvField("60", merchantCity) +
    buildEmvField("62", additionalData) +
    "6304";

  return `${payloadWithoutCrc}${calculatePixCrc(payloadWithoutCrc)}`;
}

function normalizePixKeyForPayload(key, keyType) {
  const value = String(key || "").trim();
  if (!value) return "";
  if (["CNPJ", "CPF"].includes(keyType)) return onlyDigits(value);
  if (keyType === "Telefone") {
    const digits = onlyDigits(value);
    if (!digits) return "";
    return digits.startsWith("55") ? `+${digits}` : `+55${digits}`;
  }
  return value.replace(/\s+/g, "");
}

function buildEmvField(id, value) {
  const text = String(value || "");
  return `${id}${String(text.length).padStart(2, "0")}${text}`;
}

function calculatePixCrc(payload) {
  let crc = 0xffff;
  for (let index = 0; index < payload.length; index += 1) {
    crc ^= payload.charCodeAt(index) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function normalizePixCopyPaste(value) {
  return String(value || "").replace(/[\r\n\t]/g, "").trim();
}

function isValidPixCopyPastePayload(payload) {
  if (!payload || !payload.startsWith("000201") || !payload.includes("br.gov.bcb.pix")) return false;
  const crcIndex = payload.lastIndexOf("6304");
  if (crcIndex < 0 || crcIndex + 8 !== payload.length) return false;
  const expectedCrc = payload.slice(crcIndex + 4).toUpperCase();
  return calculatePixCrc(payload.slice(0, crcIndex + 4)) === expectedCrc;
}

function normalizePixText(value) {
  return removeDiacritics(value)
    .replace(/[^A-Za-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function extractBusinessCity() {
  const parts = String(businessProfile.address || "").split(",").map((part) => part.trim()).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

function getQrCodeImageSource(payload) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=10&data=${encodeURIComponent(payload)}`;
}

function renderPatio() {
  renderPatioSummary();
  renderVehicleCards();
  renderAdminDashboard();
}

function renderPatioSummary() {
  const summary = [
    { label: "Agendados", value: countByStatus("agendado") },
    { label: "Aguardando", value: countByStatus("aguardando") },
    { label: "Em Serviço", value: countByStatus("lavando") },
    { label: "Prontos", value: countByStatus("pronto") },
    { label: "Finalizados", value: countByStatus("finalizado") }
  ];

  [$("#patioSummary"), $("#adminPatioSummary")].filter(Boolean).forEach((container) => {
    container.innerHTML = summary
      .map(
        (item) => `
        <article class="summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
      )
      .join("");
  });
}

function renderPatioQuotes() {
  const container = $("#adminQuotesContent");
  if (!container) return;

  updateExpiredQuotes();
  const activeQuotes = quoteEstimates.filter((quote) => ["Pendente", "Aprovado"].includes(getQuoteStatus(quote)));
  const approvedQuotes = quoteEstimates.filter((quote) => getQuoteStatus(quote) === "Aprovado");
  const expiredQuotes = quoteEstimates.filter((quote) => getQuoteStatus(quote) === "Vencido");
  const totalOpenValue = activeQuotes.reduce((total, quote) => total + getQuoteTotal(quote), 0);

  container.innerHTML = `
    <section class="screen-metrics quote-metrics" aria-label="Resumo dos orçamentos">
      ${[
        { label: "Orçamentos", value: quoteEstimates.length, icon: "invoice" },
        { label: "Aprovados", value: approvedQuotes.length, icon: "check" },
        { label: "Vencidos", value: expiredQuotes.length, icon: "alert" },
        { label: "Valor em negociação", value: formatCurrency(totalOpenValue), icon: "wallet" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="screen-toolbar quote-toolbar" aria-label="Filtros de orçamentos">
      <label class="login-field quote-filter-param-field" for="quoteFilterParam">
        <span>Buscar por</span>
        <select id="quoteFilterParam">
          ${renderSelectOptions(["Todos", "Período", "Cliente", "Placa", "Serviço", "Valor", "Status"], "Todos")}
        </select>
      </label>
      <div class="quote-dynamic-filter" id="quoteDynamicFilter">
        ${renderQuoteDynamicFilter("Todos")}
      </div>
      <div class="cashflow-export-actions quote-actions">
        <button class="new-vehicle-button" id="newQuoteButton" type="button">
          <span data-icon="plus"></span>
          <span>Novo orçamento</span>
        </button>
      </div>
    </section>

    <article class="admin-panel screen-table-panel cashflow-table-panel quote-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Orçamentos</p>
          <h2>Orçamentos emitidos</h2>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table quote-table">
          <thead>
            <tr>
              <th>Emissão</th>
              <th>Cliente</th>
              <th>Placa / veículo</th>
              <th>Serviços</th>
              <th>Valor</th>
              <th>Validade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${quoteEstimates.map(renderQuoteRow).join("")}
          </tbody>
        </table>
      </div>
    </article>
  `;

  initIcons();
  bindCurrencyInputs(container);
  bindPatioQuoteControls(container);
  applyQuoteFilters(container);
}

function renderQuoteRow(quote) {
  const status = getQuoteStatus(quote);
  const statusKey = getQuoteStatusKey(status);
  const services = getQuoteServiceSummary(quote);
  const vehicleName = [quote.brand, quote.model].filter(Boolean).join(" ") || quote.model || "-";
  return `
    <tr class="cashflow-row quote-row ${status === "Vencido" ? "is-outstanding" : status === "Aprovado" ? "is-in" : ""}"
      data-quote-row
      data-quote-date="${escapeHtml(quote.date || "")}"
      data-quote-client="${escapeHtml(normalizeText(quote.owner || ""))}"
      data-quote-plate="${escapeHtml(normalizeText(quote.plate || ""))}"
      data-quote-services="${escapeHtml(normalizeText(services))}"
      data-quote-value="${getQuoteTotal(quote)}"
      data-quote-status="${escapeHtml(statusKey)}">
      <td data-label="Emissão">
        <strong>${escapeHtml(quote.code)}</strong><br />
        <small>${formatDateBR(quote.date)} ${escapeHtml(quote.time || "")}</small>
      </td>
      <td data-label="Cliente">
        <strong>${escapeHtml(quote.owner || "-")}</strong><br />
        <small>${escapeHtml(quote.phone || "-")}</small>
      </td>
      <td data-label="Placa / veículo">
        <span class="table-plate-chip">${escapeHtml(quote.plate || "-")}</span><br />
        <small>${escapeHtml(vehicleName)}${quote.color ? ` / ${escapeHtml(quote.color)}` : ""}</small>
      </td>
      <td data-label="Serviços">${renderQuoteServiceCell(quote)}</td>
      <td data-label="Valor">${formatCurrency(getQuoteTotal(quote))}</td>
      <td data-label="Validade">
        <span>${formatDateBR(quote.dueDate)}</span><br />
        <small>${escapeHtml(formatQuoteValidity(quote))}</small>
      </td>
      <td data-label="Status"><span class="quote-status-pill is-${escapeHtml(statusKey)}">${escapeHtml(status)}</span></td>
      <td data-label="Ações">
        <div class="cashflow-row-actions quote-row-actions">
          ${renderQuoteRowActions(quote, status)}
        </div>
      </td>
    </tr>
  `;
}

function renderQuoteServiceCell(quote) {
  const services = (quote.services || []).filter(Boolean);
  const extras = getQuoteExtraItems(quote);
  const serviceLines = services.length
    ? services.map((service) => `<span>${escapeHtml(service)}</span>`).join("")
    : "<span>Serviços avulsos</span>";
  const extraLines = extras.length
    ? `<small class="open-payment-description">Avulsos: ${escapeHtml(extras.map((item) => `${item.description} (${formatCurrency(item.value)})`).join(", "))}</small>`
    : "";
  return `${serviceLines}${extraLines}`;
}

function renderQuoteRowActions(quote, status) {
  if (status === "Pendente") {
    return `
      <button class="primary-button compact-action" type="button" data-approve-quote="${quote.id}">Aprovar</button>
      <button class="exit-button compact" type="button" data-reject-quote="${quote.id}">Não aprovado</button>
    `;
  }
  if (status === "Aprovado") {
    return quote.usedAt
      ? `<span class="table-plate-chip">Usado em ${escapeHtml(quote.usedAt)}</span>`
      : `<button class="primary-button compact-action" type="button" data-use-quote="${quote.id}">Entrada no pátio</button>`;
  }
  if (status === "Vencido") return '<span class="table-plate-chip quote-renewal-chip">Novo orçamento necessário</span>';
  if (status === "Usado") return `<span class="table-plate-chip">Usado em ${escapeHtml(quote.usedAt || "-")}</span>`;
  return '<span class="table-plate-chip">Encerrado</span>';
}

function renderQuoteDynamicFilter(parameter = "Todos") {
  const filter = normalizeText(parameter);
  if (filter === "periodo") {
    return `
      <div class="quote-period-filter">
        <label class="login-field" for="quoteFilterStartDate">
          <span>Data inicial</span>
          <input id="quoteFilterStartDate" type="date" />
        </label>
        <label class="login-field" for="quoteFilterEndDate">
          <span>Data final</span>
          <input id="quoteFilterEndDate" type="date" />
        </label>
      </div>
    `;
  }
  if (filter === "status") {
    return `
      <label class="login-field" for="quoteFilterStatus">
        <span>Status</span>
        <select id="quoteFilterStatus">
          ${renderSelectOptions(["Todos", "Pendente", "Aprovado", "Não aprovado", "Vencido", "Usado"], "Todos")}
        </select>
      </label>
    `;
  }
  if (filter === "valor") {
    return `
      <label class="login-field" for="quoteFilterValue">
        <span>Valor mínimo</span>
        <input id="quoteFilterValue" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" />
      </label>
    `;
  }
  if (filter === "cliente" || filter === "placa" || filter === "servico") {
    const labels = {
      cliente: "Cliente",
      placa: "Placa",
      servico: "Serviço"
    };
    const placeholders = {
      cliente: "Nome do cliente",
      placa: "ABC1D23",
      servico: "Nome do serviço"
    };
    return `
      <label class="login-field" for="quoteFilterText">
        <span>${labels[filter]}</span>
        <input id="quoteFilterText" type="search" placeholder="${placeholders[filter]}" />
      </label>
    `;
  }
  return '<p class="quote-filter-placeholder">Exibindo todos os orçamentos.</p>';
}

function bindPatioQuoteControls(container) {
  $("#newQuoteButton", container)?.addEventListener("click", openQuoteDialog);
  $("#quoteFilterParam", container)?.addEventListener("change", (event) => {
    const dynamicFilter = $("#quoteDynamicFilter", container);
    if (dynamicFilter) {
      dynamicFilter.innerHTML = renderQuoteDynamicFilter(event.target.value);
      bindCurrencyInputs(dynamicFilter);
    }
    applyQuoteFilters(container);
  });
  $("#quoteDynamicFilter", container)?.addEventListener("input", (event) => {
    if (event.target.id === "quoteFilterText" && normalizeText($("#quoteFilterParam", container)?.value) === "placa") {
      event.target.value = formatPlate(event.target.value);
    }
    applyQuoteFilters(container);
  });
  $("#quoteDynamicFilter", container)?.addEventListener("change", () => applyQuoteFilters(container));
  $$("[data-approve-quote]", container).forEach((button) => {
    button.addEventListener("click", () => approveQuote(Number(button.dataset.approveQuote)));
  });
  $$("[data-reject-quote]", container).forEach((button) => {
    button.addEventListener("click", () => rejectQuote(Number(button.dataset.rejectQuote)));
  });
  $$("[data-use-quote]", container).forEach((button) => {
    button.addEventListener("click", () => createPatioEntryFromQuote(Number(button.dataset.useQuote)));
  });
}

function applyQuoteFilters(container = $("#adminQuotesContent")) {
  if (!container) return;
  const parameter = normalizeText($("#quoteFilterParam", container)?.value || "Todos");
  const text = normalizeText($("#quoteFilterText", container)?.value || "");
  const startDate = $("#quoteFilterStartDate", container)?.value || "";
  const endDate = $("#quoteFilterEndDate", container)?.value || "";
  const status = getQuoteStatusKey($("#quoteFilterStatus", container)?.value || "Todos");
  const minValue = getCurrencyInputValue("#quoteFilterValue", container);

  $$("[data-quote-row]", container).forEach((row) => {
    const rowValue = Number(row.dataset.quoteValue || 0);
    const rowDate = row.dataset.quoteDate || "";
    let matches = true;
    if (parameter === "periodo") matches = (!startDate || rowDate >= startDate) && (!endDate || rowDate <= endDate);
    else if (parameter === "cliente") matches = !text || row.dataset.quoteClient.includes(text);
    else if (parameter === "placa") matches = !text || row.dataset.quotePlate.includes(text);
    else if (parameter === "servico") matches = !text || row.dataset.quoteServices.includes(text);
    else if (parameter === "valor") matches = !minValue || rowValue >= minValue;
    else if (parameter === "status") matches = status === "todos" || row.dataset.quoteStatus === status;
    row.hidden = !matches;
  });
}

function updateExpiredQuotes() {
  quoteEstimates.forEach((quote) => {
    if ((quote.status || "Pendente") === "Pendente" && quote.dueDate && quote.dueDate < getTodayISO()) {
      quote.status = "Vencido";
      quote.expiredAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
    }
  });
}

function getQuoteById(id) {
  return quoteEstimates.find((quote) => Number(quote.id) === Number(id));
}

function getQuoteStatus(quote) {
  if (!quote) return "Pendente";
  if (quote.usedAt) return "Usado";
  if ((quote.status || "Pendente") === "Pendente" && quote.dueDate && quote.dueDate < getTodayISO()) return "Vencido";
  return quote.status || "Pendente";
}

function getQuoteStatusKey(status) {
  return normalizeText(status || "todos").replace(/\s+/g, "-");
}

function getQuoteFilterOptions(kind) {
  const values = quoteEstimates.flatMap((quote) => {
    if (kind === "owner") return [quote.owner].filter(Boolean);
    if (kind === "service") return [(quote.services || []), getQuoteExtraItems(quote).map((item) => item.description)].flat();
    return [];
  });
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function getQuoteBaseServiceTotal(quote) {
  return (quote.services || []).reduce((total, serviceName) => total + (findServiceDefinition(serviceName)?.price || 0), 0);
}

function getQuoteExtraItems(quote) {
  return (quote.extraItems || [])
    .map((item) => ({
      description: String(item.description || "").trim(),
      value: Number(item.value || 0)
    }))
    .filter((item) => item.description && item.value > 0);
}

function getQuoteExtraTotal(quote) {
  return getQuoteExtraItems(quote).reduce((total, item) => total + item.value, 0);
}

function getQuoteTotal(quote) {
  return getQuoteBaseServiceTotal(quote) + getQuoteExtraTotal(quote);
}

function getQuoteServiceSummary(quote) {
  return (quote.services || []).concat(getQuoteExtraItems(quote).map((item) => item.description)).filter(Boolean).join(", ");
}

function formatQuoteValidity(quote) {
  const days = Number(quote.validityDays || 0);
  return days ? `${days} ${days === 1 ? "dia" : "dias"}` : "Sem prazo";
}

function approveQuote(id) {
  const quote = getQuoteById(id);
  if (!quote) return;
  if (getQuoteStatus(quote) === "Vencido") {
    showToast("Orçamento vencido. Emita um novo orçamento para aprovação.");
    return;
  }
  quote.status = "Aprovado";
  quote.approvedAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  renderPatioQuotes();
  showToast(`Orçamento ${quote.code} aprovado.`);
}

function rejectQuote(id) {
  const quote = getQuoteById(id);
  if (!quote) return;
  if (getQuoteStatus(quote) === "Vencido") {
    showToast("Orçamento vencido. Emita um novo orçamento para continuar.");
    return;
  }
  quote.status = "Não aprovado";
  quote.rejectedAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  renderPatioQuotes();
  showToast(`Orçamento ${quote.code} marcado como não aprovado.`);
}

async function createPatioEntryFromQuote(id) {
  const quote = getQuoteById(id);
  if (!quote) return;
  const status = getQuoteStatus(quote);
  if (status === "Vencido") {
    showToast("Orçamento vencido. Emita um novo orçamento para usar no pátio.");
    return;
  }
  if (status !== "Aprovado") {
    showToast("Apenas orçamentos aprovados podem virar entrada no pátio.");
    return;
  }

  const extraItems = getQuoteExtraItems(quote);
  const vehicle = {
    id: getNextPatioVehicleId(),
    plate: quote.plate,
    brand: quote.brand || "",
    model: quote.model,
    color: quote.color,
    type: quote.type || "Carro",
    category: getVehicleCategoryValue(quote.type || "Carro", quote.category || ""),
    owner: quote.owner,
    phone: quote.phone,
    services: quote.services?.length ? [...quote.services] : ["Serviços avulsos"],
    service: quote.services?.length ? formatServices(quote.services) : "Serviços avulsos",
    payment: quote.payment || "Pix",
    extraChargesEnabled: extraItems.length > 0,
    extraCharges: getQuoteExtraTotal(quote),
    extraDescription: extraItems.map((item) => `${item.description}: ${formatCurrency(item.value)}`).join("; "),
    quoteId: quote.id,
    entry: getCurrentShortTime(),
    status: "aguardando"
  };

  const shouldOpenChecklist = await showMessageBox({
    title: "Fazer check-list?",
    message: `Deseja realizar o check-list do veículo ${quote.plate} antes de confirmar a entrada no pátio?`,
    eyebrow: "Entrada no pátio",
    confirmLabel: "Sim, fazer check-list",
    cancelLabel: "Não, entrar direto",
    confirmOnly: false
  });

  if (shouldOpenChecklist) {
    openQuoteEntryChecklist(quote, vehicle);
    return;
  }

  finishQuotePatioEntry(quote, vehicle);
}

function openQuoteEntryChecklist(quote, vehicle) {
  pendingQuotePatioEntry = vehicle;
  pendingQuotePatioQuoteId = quote.id;
  activeVehicleId = null;

  $("#statusDialogEyebrow").textContent = "Entrada pelo orçamento";
  $("#statusVehicleTitle").textContent = `${vehicle.plate} - ${formatVehicleDisplayName(vehicle)} ${vehicle.color || ""}`.trim();
  $("#statusOptions").innerHTML = `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <section class="status-billing-panel">
        <p class="billing-warning">Preencha o check-list e confirme para registrar a entrada no pátio.</p>
      </section>
      ${renderChecklistPanel("quoteEntryChecklist", vehicle.type, { enabled: true, items: [] })}
      <div class="dialog-actions status-dialog-actions">
        <button class="exit-button" type="button" data-status-action="cancel-quote-entry-checklist">Cancelar</button>
        <button class="primary-button" type="button" data-status-action="finish-quote-entry-checklist">
          <span data-icon="check"></span>
          <span>Concluir check-list e entrar</span>
        </button>
      </div>
    </div>
  `;
  bindChecklistPanel($("#statusOptions"), "quoteEntryChecklist", vehicle.type);
  initIcons();

  const dialog = $("#statusDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function finishQuoteEntryWithChecklist() {
  const vehicle = pendingQuotePatioEntry;
  const quote = getQuoteById(pendingQuotePatioQuoteId);
  if (!vehicle || !quote) return;
  if (!attachChecklistFromPanel(vehicle, $("#statusOptions"), "quoteEntryChecklist")) return;
  finishQuotePatioEntry(quote, vehicle);
}

function finishQuotePatioEntry(quote, vehicle) {
  quote.usedAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  quote.usedVehicleId = vehicle.id;
  pendingQuotePatioEntry = null;
  pendingQuotePatioQuoteId = null;
  closeStatusDialog();
  addVehicleToPatio(vehicle);
  renderPatioQuotes();
  showToast(`Orçamento ${quote.code} enviado para o pátio.`);
}

function openQuoteDialog() {
  quoteDialogStep = "vehicle";
  selectedQuoteVehicleId = null;
  const dialog = $("#quoteDialog");
  if (!dialog) return;
  dialog.innerHTML = renderQuoteDialog();
  initIcons();
  bindQuoteDialogControls(dialog);
  bindCurrencyInputs(dialog);
  bindLocalVehicleModelLookup({
    modelSelector: "#quoteVehicleModel",
    brandSelector: "#quoteVehicleBrand",
    resultsSelector: "#quoteVehicleModelResults",
    typeSelector: "#quoteVehicleType"
  });
  updateQuoteVehicleCategoryState(dialog);
  renderQuoteServiceOptions(dialog);
  updateQuoteTotalPreview(dialog);
  showQuoteDialogStep("vehicle", dialog);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  $("#quoteVehiclePlate", dialog)?.focus();
}

function closeQuoteDialog() {
  const dialog = $("#quoteDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  quoteDialogStep = "vehicle";
  selectedQuoteVehicleId = null;
}

function handleQuotePlateLookup(plateValue, dialog = $("#quoteDialog")) {
  const plate = formatPlate(plateValue);
  const list = $("#quoteVehiclePlateResults", dialog);
  if (!list) return;

  const selectedVehicle = getSelectedQuoteRegistryVehicle();
  if (selectedVehicle && selectedVehicle.plate !== plate) {
    clearSelectedQuoteRegistration(dialog);
  }

  if (!plate) {
    clearQuotePlateResults(dialog);
    return;
  }

  const matches = vehicleRegistry.filter((vehicle) => vehicle.plate.startsWith(plate)).slice(0, 6);
  if (!matches.length) {
    if (plate.length >= 7) {
      list.hidden = false;
      list.innerHTML = `
        <button class="schedule-plate-option entry-plate-option" type="button" id="quoteNewPlateButton">
          <strong>${escapeHtml(plate)}</strong>
          <span>Placa nova</span>
          <small>Complete modelo, cor e cliente para emitir o orçamento.</small>
        </button>
      `;
      $("#quoteNewPlateButton", list)?.addEventListener("click", () => {
        clearQuotePlateResults(dialog);
        $("#quoteVehicleModel", dialog)?.focus();
      });
      return;
    }
    clearQuotePlateResults(dialog);
    return;
  }

  list.hidden = false;
  list.innerHTML = matches.map(renderQuoteVehicleOption).join("");
  $$("[data-quote-vehicle-id]", list).forEach((button) => {
    button.addEventListener("click", () => selectQuoteVehicle(Number(button.dataset.quoteVehicleId), dialog));
  });
}

function renderQuoteVehicleOption(vehicle) {
  const owner = getVehicleOwnerName(vehicle);
  const description = [vehicle.brand, vehicle.model, vehicle.color].filter(Boolean).join(" / ") || vehicle.model || "Veículo";
  return `
    <button class="schedule-plate-option entry-plate-option" type="button" data-quote-vehicle-id="${vehicle.id}">
      <strong>${escapeHtml(vehicle.plate)}</strong>
      <span>${escapeHtml(description)}</span>
      <small>${escapeHtml(owner)}</small>
    </button>
  `;
}

function selectQuoteVehicle(vehicleId, dialog = $("#quoteDialog")) {
  const vehicle = findVehicleById(vehicleId);
  if (!vehicle) return;
  selectedQuoteVehicleId = vehicle.id;
  $("#quoteVehiclePlate", dialog).value = vehicle.plate;
  clearQuotePlateResults(dialog);
  fillQuoteFromVehicle(vehicle, dialog);
  renderQuoteLinkedRegistration(vehicle, dialog);
  setQuoteRegistrationReadonly(true, dialog);
  updateQuoteTotalPreview(dialog);
}

function clearQuotePlateResults(dialog = $("#quoteDialog")) {
  const list = $("#quoteVehiclePlateResults", dialog);
  if (!list) return;
  list.innerHTML = "";
  list.hidden = true;
}

function getSelectedQuoteRegistryVehicle() {
  return selectedQuoteVehicleId ? findVehicleById(selectedQuoteVehicleId) : null;
}

function clearSelectedQuoteRegistration(dialog = $("#quoteDialog")) {
  selectedQuoteVehicleId = null;
  setQuoteRegistrationReadonly(false, dialog);
  renderQuoteLinkedRegistration(null, dialog);
  $("#quoteVehicleBrand", dialog).value = "";
  $("#quoteVehicleModel", dialog).value = "";
  delete $("#quoteVehicleModel", dialog).dataset.selectedVehicleModel;
  delete $("#quoteVehicleModel", dialog).dataset.selectedVehicleBrand;
  clearLocalVehicleResults($("#quoteVehicleModelResults", dialog));
  $("#quoteClientName", dialog).value = "";
  $("#quoteClientPhone", dialog).value = "";
  if ($("#quoteVehicleType", dialog).options.length) $("#quoteVehicleType", dialog).value = vehicleTypes[0] || "";
  updateQuoteVehicleCategoryState(dialog);
  resetQuoteVehicleColor(dialog);
  renderQuoteServiceOptions(dialog);
}

function fillQuoteFromVehicle(vehicle, dialog = $("#quoteDialog")) {
  $("#quoteVehicleBrand", dialog).value = vehicle.brand || "";
  $("#quoteVehicleModel", dialog).value = vehicle.model || "";
  if (vehicle.color) setQuoteVehicleColor(vehicle.color, dialog);
  if (vehicle.type && vehicleTypes.includes(vehicle.type)) $("#quoteVehicleType", dialog).value = vehicle.type;
  if (vehicle.category && vehicleCategories.includes(vehicle.category)) $("#quoteVehicleCategory", dialog).value = vehicle.category;
  updateQuoteVehicleCategoryState(dialog);
  renderQuoteServiceOptions(dialog);

  const client = vehicle.currentClientId ? getClientById(vehicle.currentClientId) : findClientByPlate(vehicle.plate);
  if (!client) return;
  $("#quoteClientName", dialog).value = getClientDisplayName(client);
  $("#quoteClientPhone", dialog).value = client.phone || "";
}

function renderQuoteLinkedRegistration(vehicle, dialog = $("#quoteDialog")) {
  const panel = $("#quoteLinkedRecord", dialog);
  if (!panel) return;
  if (!vehicle) {
    panel.innerHTML = "";
    panel.hidden = true;
    return;
  }

  const client = vehicle.currentClientId ? getClientById(vehicle.currentClientId) : findClientByPlate(vehicle.plate);
  panel.hidden = false;
  panel.innerHTML = `
    <div>
      <strong>Cadastro localizado</strong>
      <span>${escapeHtml(vehicle.plate)} - ${escapeHtml(formatEntryLinkedVehicleDetails(vehicle))}</span>
      <small>${escapeHtml(client ? getClientDisplayName(client) : "Cliente não vinculado")}${client?.phone ? ` / ${escapeHtml(client.phone)}` : ""}</small>
    </div>
    <div class="entry-linked-actions">
      <button class="ghost-action" type="button" data-edit-quote-vehicle="${vehicle.id}">
        <span data-icon="carFront"></span>
        <span>Editar veículo</span>
      </button>
      ${
        client
          ? `<button class="ghost-action" type="button" data-edit-quote-client="${client.id}">
              <span data-icon="users"></span>
              <span>Editar cliente</span>
            </button>`
          : ""
      }
    </div>
  `;
  initIcons();
  $("[data-edit-quote-vehicle]", panel)?.addEventListener("click", () => openQuoteVehicleRegistryEditor(vehicle.id));
  $("[data-edit-quote-client]", panel)?.addEventListener("click", () => openQuoteClientRegistryEditor(client.id, vehicle.id));
}

function openQuoteVehicleRegistryEditor(vehicleId) {
  if (!$("#adminShell").hidden) {
    entryRegistryEditContext = { type: "vehicle", source: "quote", vehicleId };
    openEntryVehicleRegistryDialog(vehicleId);
    return;
  }

  showMessageBox({
    title: "Edição restrita",
    message: "A edição do cadastro do veículo deve ser feita por um administrador.",
    confirmLabel: "Entendi"
  });
}

function openQuoteClientRegistryEditor(clientId, vehicleId = selectedQuoteVehicleId) {
  if (!$("#adminShell").hidden) {
    entryRegistryEditContext = { type: "client", source: "quote", vehicleId, clientId };
    openClientDialog(clientId);
    return;
  }

  showMessageBox({
    title: "Edição restrita",
    message: "A edição do cadastro do cliente deve ser feita por um administrador.",
    confirmLabel: "Entendi"
  });
}

function refreshQuoteRegistrationAfterEdit() {
  const vehicleId = entryRegistryEditContext?.vehicleId || selectedQuoteVehicleId;
  const vehicle = vehicleId ? findVehicleById(vehicleId) : null;
  const dialog = $("#quoteDialog");
  if (!vehicle || !dialog?.open) return;

  selectedQuoteVehicleId = vehicle.id;
  $("#quoteVehiclePlate", dialog).value = vehicle.plate;
  fillQuoteFromVehicle(vehicle, dialog);
  renderQuoteLinkedRegistration(vehicle, dialog);
  setQuoteRegistrationReadonly(true, dialog);
  updateQuoteTotalPreview(dialog);
}

function setQuoteRegistrationReadonly(isReadonly, dialog = $("#quoteDialog")) {
  ["#quoteVehicleModel"].forEach((selector) => {
    const input = $(selector, dialog);
    if (!input) return;
    input.readOnly = isReadonly;
    input.classList.toggle("is-readonly", isReadonly);
  });
  ["#quoteVehicleType", "#quoteVehicleCategory"].forEach((selector) => {
    const input = $(selector, dialog);
    if (!input) return;
    input.disabled = isReadonly || (selector === "#quoteVehicleCategory" && !shouldUseVehicleCategory($("#quoteVehicleType", dialog)?.value || ""));
    input.classList.toggle("is-readonly", isReadonly);
  });
  $$("[data-quote-color]", dialog).forEach((button) => {
    button.disabled = isReadonly;
    button.classList.toggle("is-readonly", isReadonly);
  });
  $(".quote-model-field", dialog)?.toggleAttribute("hidden", isReadonly);
  $(".quote-color-field", dialog)?.toggleAttribute("hidden", isReadonly);
  $(".quote-other-color-field", dialog)?.toggleAttribute("hidden", isReadonly || $("#quoteVehicleColor", dialog)?.value !== "Outra");
  $("#quoteVehicleModel", dialog).required = !isReadonly;
}

function selectQuoteVehicleColor(button, dialog = $("#quoteDialog")) {
  const color = button.dataset.quoteColor;
  const isOther = color === "Outra";
  $$("[data-quote-color]", dialog).forEach((item) => {
    const isSelected = item === button;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-pressed", String(isSelected));
  });
  $("#quoteVehicleColor", dialog).value = color;
  const otherField = $(".quote-other-color-field", dialog);
  const otherInput = $("#quoteVehicleOtherColor", dialog);
  if (otherField) otherField.hidden = !isOther;
  if (otherInput) {
    otherInput.disabled = !isOther;
    otherInput.required = isOther;
    if (!isOther) otherInput.value = "";
  }
  if (isOther) otherInput?.focus();
}

function setQuoteVehicleColor(color, dialog = $("#quoteDialog")) {
  const button = $(`[data-quote-color="${cssEscape(color)}"]`, dialog);
  if (button) {
    selectQuoteVehicleColor(button, dialog);
    return;
  }
  const otherButton = $('[data-quote-color="Outra"]', dialog);
  if (!otherButton) return;
  selectQuoteVehicleColor(otherButton, dialog);
  $("#quoteVehicleOtherColor", dialog).value = color;
}

function resetQuoteVehicleColor(dialog = $("#quoteDialog")) {
  const defaultButton = $('[data-quote-color="Branco"]', dialog);
  if (!defaultButton) return;
  selectQuoteVehicleColor(defaultButton, dialog);
}

function getQuoteVehicleColor(dialog = $("#quoteDialog")) {
  const selectedColor = $("#quoteVehicleColor", dialog)?.value || "";
  if (selectedColor === "Outra") return $("#quoteVehicleOtherColor", dialog)?.value.trim() || selectedColor;
  return selectedColor;
}

function renderQuoteDialog() {
  return `
    <form class="vehicle-box quote-box" id="quoteForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Orçamentos</p>
          <h2>Novo orçamento</h2>
        </div>
        <button class="icon-button" id="closeQuoteDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <section class="quote-step is-active" data-quote-step="vehicle">
        <p class="step-copy">Dados do veículo</p>
        <div class="vehicle-form-grid">
          <div class="plate-lookup-field">
            <label class="login-field" for="quoteVehiclePlate">
              <span>Placa</span>
              <input id="quoteVehiclePlate" name="quotePlate" type="text" placeholder="ABC1D23" maxlength="8" autocomplete="off" required />
            </label>
            <div class="entry-plate-results" id="quoteVehiclePlateResults" hidden></div>
            <div class="entry-linked-record quote-linked-record" id="quoteLinkedRecord" hidden></div>
          </div>
          <div class="vehicle-model-lookup-field quote-model-field">
            <label class="login-field" for="quoteVehicleModel">
              <span>Modelo</span>
              <input id="quoteVehicleModel" name="quoteModel" type="text" placeholder="Onix" autocomplete="off" required />
            </label>
            <input id="quoteVehicleBrand" name="quoteBrand" type="hidden" />
            <div class="vehicle-model-results" id="quoteVehicleModelResults" hidden></div>
          </div>
          <div class="color-field quote-color-field">
            <span>Cor</span>
            <input id="quoteVehicleColor" name="quoteColor" type="hidden" value="Branco" required />
            <div class="color-grid" aria-label="Escolha a cor do veículo">
              <button class="color-swatch quote-color-swatch is-selected" type="button" data-quote-color="Branco" aria-pressed="true">
                <span class="swatch swatch-white"></span>
                <span>Branco</span>
              </button>
              <button class="color-swatch quote-color-swatch" type="button" data-quote-color="Preto" aria-pressed="false">
                <span class="swatch swatch-black"></span>
                <span>Preto</span>
              </button>
              <button class="color-swatch quote-color-swatch" type="button" data-quote-color="Prata" aria-pressed="false">
                <span class="swatch swatch-silver"></span>
                <span>Prata</span>
              </button>
              <button class="color-swatch quote-color-swatch" type="button" data-quote-color="Cinza" aria-pressed="false">
                <span class="swatch swatch-gray"></span>
                <span>Cinza</span>
              </button>
              <button class="color-swatch quote-color-swatch" type="button" data-quote-color="Vermelho" aria-pressed="false">
                <span class="swatch swatch-red"></span>
                <span>Vermelho</span>
              </button>
              <button class="color-swatch quote-color-swatch" type="button" data-quote-color="Azul" aria-pressed="false">
                <span class="swatch swatch-blue"></span>
                <span>Azul</span>
              </button>
              <button class="color-swatch quote-color-swatch" type="button" data-quote-color="Marrom" aria-pressed="false">
                <span class="swatch swatch-brown"></span>
                <span>Marrom</span>
              </button>
              <button class="color-swatch quote-color-swatch" type="button" data-quote-color="Outra" aria-pressed="false">
                <span class="swatch swatch-other"></span>
                <span>Outra</span>
              </button>
            </div>
          </div>
          <label class="login-field quote-other-color-field" for="quoteVehicleOtherColor" hidden>
            <span>Informe a cor</span>
            <input id="quoteVehicleOtherColor" name="quoteOtherColor" type="text" placeholder="Digite a cor" disabled />
          </label>
          <label class="login-field" for="quoteVehicleType">
            <span>Tipo de veículo</span>
            <select id="quoteVehicleType" name="quoteType" required>
              ${renderSelectOptions(vehicleTypes, vehicleTypes[0] || "Carro")}
            </select>
          </label>
          <label class="login-field" for="quoteVehicleCategory">
            <span>Categoria de veículo</span>
            <select id="quoteVehicleCategory" name="quoteCategory" required>
              ${renderSelectOptions(vehicleCategories, vehicleCategories[0] || "")}
            </select>
          </label>
        </div>
        <div class="dialog-actions">
          <button class="exit-button" id="cancelQuoteDialog" type="button">Cancelar</button>
          <button class="primary-button" id="quoteNextClientButton" type="button">
            <span data-icon="login"></span>
            <span>Próximo</span>
          </button>
        </div>
      </section>

      <section class="quote-step" data-quote-step="client" hidden>
        <p class="step-copy">Dados do cliente e pagamento previsto</p>
        <div class="vehicle-form-grid">
          <label class="login-field" for="quoteClientPhone">
            <span>Telefone com DDD</span>
            <input id="quoteClientPhone" name="quotePhone" type="tel" inputmode="tel" placeholder="(11) 99999-9999" maxlength="15" required />
          </label>
          <label class="login-field" for="quoteClientName">
            <span>Nome do cliente</span>
            <input id="quoteClientName" name="quoteOwner" type="text" placeholder="Nome completo" required />
          </label>
          <label class="login-field" for="quotePayment">
            <span>Forma de pagamento</span>
            <select id="quotePayment" name="quotePayment" required>
              ${renderPaymentOptions(getPreferredPaymentMethodName("quote"), true, "quote")}
            </select>
          </label>
        </div>
        <div class="dialog-actions">
          <button class="exit-button" id="quoteBackVehicleButton" type="button">Voltar</button>
          <button class="primary-button" id="quoteNextServicesButton" type="button">
            <span data-icon="login"></span>
            <span>Próximo</span>
          </button>
        </div>
      </section>

      <section class="quote-step" data-quote-step="services" hidden>
        <p class="step-copy">Serviços, avulsos e validade</p>
        <div class="quote-service-stack">
          <div class="services-field quote-services-field">
            <span>Serviços cadastrados</span>
            <div class="service-dropdown-row">
              <select id="quoteServiceSelect" aria-label="Selecionar serviço do orçamento"></select>
              <button class="ghost-action" id="quoteAddServiceButton" type="button">
                <span data-icon="plus"></span>
                <span>Adicionar serviço</span>
              </button>
            </div>
            <div class="selected-services-list" id="quoteServicesList" aria-label="Serviços do orçamento"></div>
          </div>

          <label class="switch-field quote-extra-switch" for="quoteExtraToggle">
            <input id="quoteExtraToggle" type="checkbox" />
            <span class="switch-control"></span>
            <span>Adicionar serviços avulsos</span>
          </label>

          <section class="quote-extra-panel" id="quoteExtraPanel" aria-label="Serviços avulsos" hidden>
            <div class="quote-extra-head">
              <div>
                <p class="eyebrow">Avulsos</p>
                <h3>Serviços avulsos</h3>
              </div>
              <button class="ghost-action" id="quoteAddExtraButton" type="button">
                <span data-icon="plus"></span>
                <span>Adicionar avulso</span>
              </button>
            </div>
            <div class="quote-extra-list" id="quoteExtraServicesList">
              ${renderQuoteExtraRow(0)}
            </div>
          </section>

          <div class="vehicle-form-grid quote-validity-grid">
            <label class="login-field" for="quoteValidityDays">
              <span>Prazo em dias</span>
              <input id="quoteValidityDays" name="quoteValidityDays" type="number" min="1" step="1" value="${escapeHtml(String(getDefaultQuoteValidityDays()))}" required />
            </label>
          </div>

          <section class="quote-total-card">
            <span>Total do orçamento</span>
            <strong id="quoteTotalValue">${formatCurrency(0)}</strong>
            <p id="quoteTotalBreakdown">Serviços: ${formatCurrency(0)} · Avulsos: ${formatCurrency(0)}</p>
          </section>
        </div>
        <div class="dialog-actions">
          <button class="exit-button" id="quoteBackClientButton" type="button">Voltar</button>
          <button class="primary-button" type="submit">
            <span data-icon="check"></span>
            <span>Emitir orçamento</span>
          </button>
        </div>
      </section>
    </form>
  `;
}

function renderQuoteExtraRow(index, item = {}) {
  return `
    <div class="quote-extra-row" data-quote-extra-row>
      <label class="login-field" for="quoteExtraDescription${index}">
        <span>Serviço avulso</span>
        <input id="quoteExtraDescription${index}" data-quote-extra-description type="text" placeholder="Ex.: Polimento localizado" value="${escapeHtml(item.description || "")}" />
      </label>
      <label class="login-field" for="quoteExtraValue${index}">
        <span>Valor</span>
        <input id="quoteExtraValue${index}" data-quote-extra-value type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(item.value))}" />
      </label>
      <button class="icon-button quote-remove-extra-button" type="button" data-remove-quote-extra aria-label="Remover avulso">
        <span data-icon="x"></span>
      </button>
    </div>
  `;
}

function bindQuoteDialogControls(dialog) {
  $("#closeQuoteDialog", dialog)?.addEventListener("click", closeQuoteDialog);
  $("#cancelQuoteDialog", dialog)?.addEventListener("click", closeQuoteDialog);
  dialog.addEventListener("cancel", closeQuoteDialog, { once: true });
  $("#quoteNextClientButton", dialog)?.addEventListener("click", () => {
    if (validateQuoteDialogStep("vehicle", dialog)) showQuoteDialogStep("client", dialog);
  });
  $("#quoteBackVehicleButton", dialog)?.addEventListener("click", () => showQuoteDialogStep("vehicle", dialog));
  $("#quoteNextServicesButton", dialog)?.addEventListener("click", () => {
    if (validateQuoteDialogStep("client", dialog)) showQuoteDialogStep("services", dialog);
  });
  $("#quoteBackClientButton", dialog)?.addEventListener("click", () => showQuoteDialogStep("client", dialog));
  $("#quoteVehiclePlate", dialog)?.addEventListener("input", (event) => {
    event.currentTarget.value = formatPlate(event.currentTarget.value);
    handleQuotePlateLookup(event.currentTarget.value, dialog);
  });
  $$("[data-quote-color]", dialog).forEach((button) => {
    button.addEventListener("click", () => selectQuoteVehicleColor(button, dialog));
  });
  $("#quoteClientPhone", dialog)?.addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $("#quoteVehicleType", dialog)?.addEventListener("change", () => {
    updateQuoteVehicleCategoryState(dialog);
    renderQuoteServiceOptions(dialog, { preserveSelected: true });
    updateQuoteTotalPreview(dialog);
  });
  $("#quoteVehicleCategory", dialog)?.addEventListener("change", () => {
    renderQuoteServiceOptions(dialog, { preserveSelected: true });
    updateQuoteTotalPreview(dialog);
  });
  $("#quoteAddServiceButton", dialog)?.addEventListener("click", () => addQuoteServiceFromDropdown(dialog));
  $("#quoteExtraToggle", dialog)?.addEventListener("change", () => updateQuoteExtraPanel(dialog));
  $("#quoteAddExtraButton", dialog)?.addEventListener("click", () => addQuoteExtraRow(dialog));
  $("#quoteForm", dialog)?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveQuoteFromDialog(dialog);
  });
  dialog.addEventListener("click", (event) => {
    const removeService = event.target.closest("[data-remove-quote-service]");
    if (removeService) {
      renderSelectedQuoteServices(
        getSelectedQuoteServices(dialog).filter((service) => service !== removeService.dataset.removeQuoteService),
        dialog
      );
      updateQuoteTotalPreview(dialog);
      return;
    }
    const removeExtra = event.target.closest("[data-remove-quote-extra]");
    if (removeExtra) {
      removeQuoteExtraRow(removeExtra, dialog);
    }
  });
  dialog.addEventListener("input", (event) => {
    if (event.target.id === "quoteValidityDays" || event.target.matches("[data-quote-extra-description], [data-quote-extra-value]")) {
      updateQuoteTotalPreview(dialog);
    }
  });
}

function showQuoteDialogStep(step, dialog = $("#quoteDialog")) {
  quoteDialogStep = step;
  $$("[data-quote-step]", dialog).forEach((section) => {
    const isActive = section.dataset.quoteStep === step;
    section.hidden = !isActive;
    section.classList.toggle("is-active", isActive);
  });
}

function validateQuoteDialogStep(step, dialog) {
  const quoteVehicleType = $("#quoteVehicleType", dialog)?.value || "";
  const quoteColor = $("#quoteVehicleColor", dialog)?.value || "";
  const selectors = {
    vehicle: ["#quoteVehiclePlate", "#quoteVehicleModel", "#quoteVehicleColor", "#quoteVehicleType"].concat(
      shouldUseVehicleCategory(quoteVehicleType) ? ["#quoteVehicleCategory"] : [],
      quoteColor === "Outra" ? ["#quoteVehicleOtherColor"] : []
    ),
    client: ["#quoteClientPhone", "#quoteClientName", "#quotePayment"],
    services: ["#quoteValidityDays"]
  };
  return (selectors[step] || []).every((selector) => {
    const input = $(selector, dialog);
    return !input || input.reportValidity();
  });
}

function updateQuoteVehicleCategoryState(dialog = $("#quoteDialog")) {
  const type = $("#quoteVehicleType", dialog)?.value || "Carro";
  const categorySelect = $("#quoteVehicleCategory", dialog);
  if (!categorySelect) return;
  const usesCategory = shouldUseVehicleCategory(type);
  categorySelect.disabled = !usesCategory;
  categorySelect.required = usesCategory;
  if (!usesCategory) categorySelect.value = "";
}

function getQuoteAvailableServices(dialog = $("#quoteDialog")) {
  const type = $("#quoteVehicleType", dialog)?.value || "Carro";
  const category = $("#quoteVehicleCategory", dialog)?.value || "";
  return getServicesForVehicleTypeAndCategory(type, category);
}

function renderQuoteServiceOptions(dialog = $("#quoteDialog"), options = {}) {
  const select = $("#quoteServiceSelect", dialog);
  const addButton = $("#quoteAddServiceButton", dialog);
  if (!select) return;
  const services = getQuoteAvailableServices(dialog);
  const selectedServices = options.preserveSelected
    ? getSelectedQuoteServices(dialog).filter((serviceName) => services.some((service) => service.name === serviceName))
    : [];

  if (!services.length) {
    select.innerHTML = '<option value="">Nenhum serviço cadastrado</option>';
    select.disabled = true;
    if (addButton) addButton.disabled = true;
    renderSelectedQuoteServices(selectedServices, dialog);
    return;
  }

  select.disabled = false;
  if (addButton) addButton.disabled = false;
  select.innerHTML = services
    .map((service) => `<option value="${escapeHtml(service.name)}">${escapeHtml(formatServiceOptionLabel(service))}</option>`)
    .join("");
  renderSelectedQuoteServices(selectedServices.length ? selectedServices : [services[0].name], dialog);
}

function addQuoteServiceFromDropdown(dialog = $("#quoteDialog")) {
  const select = $("#quoteServiceSelect", dialog);
  if (!select?.value) return;
  const selectedServices = getSelectedQuoteServices(dialog);
  if (selectedServices.includes(select.value)) {
    showToast("Serviço já incluído no orçamento.");
    return;
  }
  selectedServices.push(select.value);
  renderSelectedQuoteServices(selectedServices, dialog);
  updateQuoteTotalPreview(dialog);
}

function getSelectedQuoteServices(dialog = $("#quoteDialog")) {
  return $$('#quoteServicesList input[name="quoteServices"]', dialog).map((input) => input.value);
}

function renderSelectedQuoteServices(services, dialog = $("#quoteDialog")) {
  const list = $("#quoteServicesList", dialog);
  if (!list) return;
  const uniqueServices = [...new Set(services.filter(Boolean))];
  list.innerHTML = uniqueServices.length
    ? uniqueServices
        .map((service) => {
          const registeredService = findServiceDefinition(service);
          const details = registeredService ? formatServiceOptionLabel(registeredService) : "Serviço contratado";
          return `
            <article class="selected-service-chip">
              <input type="hidden" name="quoteServices" value="${escapeHtml(service)}" />
              <span>
                <strong>${escapeHtml(service)}</strong>
                <small>${escapeHtml(details)}</small>
              </span>
              <button type="button" aria-label="Remover ${escapeHtml(service)}" data-remove-quote-service="${escapeHtml(service)}">
                ${icons.x}
              </button>
            </article>
          `;
        })
        .join("")
    : '<p class="empty-group">Nenhum serviço cadastrado incluído.</p>';
}

function addQuoteExtraRow(dialog = $("#quoteDialog")) {
  const list = $("#quoteExtraServicesList", dialog);
  if (!list) return;
  const index = Date.now();
  list.insertAdjacentHTML("beforeend", renderQuoteExtraRow(index));
  initIcons();
  bindCurrencyInputs(list);
  updateQuoteTotalPreview(dialog);
}

function updateQuoteExtraPanel(dialog = $("#quoteDialog")) {
  const toggle = $("#quoteExtraToggle", dialog);
  const panel = $("#quoteExtraPanel", dialog);
  const list = $("#quoteExtraServicesList", dialog);
  if (!toggle || !panel || !list) return;
  panel.hidden = !toggle.checked;
  if (!toggle.checked) {
    list.innerHTML = renderQuoteExtraRow(0);
    bindCurrencyInputs(list);
    initIcons();
  }
  updateQuoteTotalPreview(dialog);
}

function removeQuoteExtraRow(button, dialog = $("#quoteDialog")) {
  const row = button.closest("[data-quote-extra-row]");
  const rows = $$("[data-quote-extra-row]", dialog);
  if (!row) return;
  if (rows.length <= 1) {
    $("[data-quote-extra-description]", row).value = "";
    setCurrencyInputValue($("[data-quote-extra-value]", row), 0);
  } else row.remove();
  updateQuoteTotalPreview(dialog);
}

function collectQuoteExtras(dialog = $("#quoteDialog"), { validate = false } = {}) {
  if (!$("#quoteExtraToggle", dialog)?.checked) return [];
  const extras = [];
  let invalidField = null;
  $$("[data-quote-extra-row]", dialog).forEach((row) => {
    const descriptionInput = $("[data-quote-extra-description]", row);
    const valueInput = $("[data-quote-extra-value]", row);
    const description = descriptionInput?.value.trim() || "";
    const value = getCurrencyInputValue(valueInput);
    if (!description && !value) return;
    if (!description || value <= 0) {
      invalidField = !description ? descriptionInput : valueInput;
      return;
    }
    extras.push({ description, value });
  });
  if (validate && invalidField) {
    showToast("Informe o nome e o valor de cada serviço avulso.");
    invalidField.focus();
    return false;
  }
  return extras;
}

function updateQuoteTotalPreview(dialog = $("#quoteDialog")) {
  const services = getSelectedQuoteServices(dialog);
  const serviceTotal = services.reduce((total, service) => total + (findServiceDefinition(service)?.price || 0), 0);
  const extras = collectQuoteExtras(dialog) || [];
  const extrasTotal = extras.reduce((total, item) => total + item.value, 0);
  const total = serviceTotal + extrasTotal;
  const totalOutput = $("#quoteTotalValue", dialog);
  const breakdown = $("#quoteTotalBreakdown", dialog);
  if (totalOutput) totalOutput.textContent = formatCurrency(total);
  if (breakdown) breakdown.textContent = `Serviços: ${formatCurrency(serviceTotal)} · Avulsos: ${formatCurrency(extrasTotal)}`;
}

function saveQuoteFromDialog(dialog = $("#quoteDialog")) {
  if (!validateQuoteDialogStep("vehicle", dialog) || !validateQuoteDialogStep("client", dialog) || !validateQuoteDialogStep("services", dialog)) return;
  const services = getSelectedQuoteServices(dialog);
  const extras = collectQuoteExtras(dialog, { validate: true });
  if (extras === false) return;
  if (!services.length && !extras.length) {
    showToast("Inclua ao menos um serviço cadastrado ou avulso no orçamento.");
    showQuoteDialogStep("services", dialog);
    return;
  }

  const validityDays = getPositiveIntegerValue("#quoteValidityDays", dialog);
  if (!validityDays) {
    showToast("Informe o prazo em dias para o orçamento.");
    $("#quoteValidityDays", dialog)?.focus();
    return;
  }

  const date = getTodayISO();
  const quote = {
    id: getNextQuoteId(),
    code: getNextQuoteCode(),
    date,
    time: getCurrentShortTime(),
    dueDate: addDaysToISODate(date, validityDays),
    validityDays,
    plate: $("#quoteVehiclePlate", dialog).value.trim().toUpperCase(),
    brand: $("#quoteVehicleBrand", dialog)?.value.trim() || "",
    model: $("#quoteVehicleModel", dialog).value.trim(),
    color: getQuoteVehicleColor(dialog),
    type: $("#quoteVehicleType", dialog).value,
    category: getVehicleCategoryValue($("#quoteVehicleType", dialog).value, $("#quoteVehicleCategory", dialog)?.value || ""),
    owner: $("#quoteClientName", dialog).value.trim(),
    phone: $("#quoteClientPhone", dialog).value.trim(),
    payment: $("#quotePayment", dialog).value,
    services,
    extraItems: extras,
    status: "Pendente",
    operator: activeSessionUser || "Administrador"
  };

  quoteEstimates.unshift(quote);
  closeQuoteDialog();
  renderPatioQuotes();
  showToast(`Orçamento ${quote.code} emitido com validade até ${formatDateBR(quote.dueDate)}.`);
}

function getPositiveIntegerValue(selector, container = document) {
  const value = Number.parseInt($(selector, container)?.value || "0", 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function addDaysToISODate(dateISO, days = 0) {
  const [year, month, day] = String(dateISO).split("-").map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);
  date.setDate(date.getDate() + Number(days || 0));
  return formatLocalDateISO(date);
}

function formatLocalDateISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNextQuoteId() {
  return Math.max(0, ...quoteEstimates.map((quote) => quote.id || 0)) + 1;
}

function getNextQuoteCode() {
  const prefix = (businessFinanceSettings.documents.quoteNumberPrefix || "ORC").trim().toUpperCase();
  const datePart = getTodayISO().slice(0, 7).replace("-", "");
  const safePrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const maxSequence = quoteEstimates.reduce((max, quote) => {
    const match = String(quote.code || "").match(new RegExp(`^${safePrefix}-${datePart}-(\\d+)$`));
    return match ? Math.max(max, Number(match[1] || 0)) : max;
  }, 0);
  return `${prefix}-${datePart}-${String(maxSequence + 1).padStart(3, "0")}`;
}

function countByStatus(status) {
  if (status === "finalizado") return patioVehicles.filter((vehicle) => isFinalizedStatus(vehicle.status)).length;
  return patioVehicles.filter((vehicle) => vehicle.status === status).length;
}

function isFinalizedStatus(status) {
  return ["finalizado", "cancelado"].includes(status);
}

function getMaintenanceIntervalDays(interval) {
  const intervals = {
    monthly: 30,
    bimonthly: 60,
    semiannual: 180,
    annual: 365
  };
  return intervals[interval] || 30;
}

function getVehicleMaintenanceReferenceDate(vehicle) {
  if (vehicle?.finishedDate) return vehicle.finishedDate;
  if (vehicle?.scheduledDate) return vehicle.scheduledDate;
  if (vehicle?.date) return vehicle.date;
  return getTodayISO();
}

function getUpcomingServiceMaintenances() {
  const today = getTodayISO();
  const limitDate = addDaysToISODate(today, 30);
  return patioVehicles
    .filter((vehicle) => vehicle.status === "finalizado")
    .flatMap((vehicle) =>
      (vehicle.services || [])
        .map((serviceName) => {
          const service = findServiceDefinition(serviceName, vehicle.type, vehicle.category) || findServiceDefinition(serviceName);
          if (!service?.maintenanceRequired) return null;
          const dueDate = service.maintenanceInterval === "custom"
            ? service.maintenanceDate
            : addDaysToISODate(getVehicleMaintenanceReferenceDate(vehicle), getMaintenanceIntervalDays(service.maintenanceInterval));
          if (!dueDate || dueDate > limitDate) return null;
          const client = vehicle.currentClientId ? getClientById(vehicle.currentClientId) : findClientByPlate(vehicle.plate) || findClientByPhone(vehicle.phone);
          return {
            vehicle,
            client,
            service,
            serviceName,
            dueDate,
            overdue: dueDate < today
          };
        })
        .filter(Boolean)
    )
    .sort((left, right) => left.dueDate.localeCompare(right.dueDate));
}

function renderMaintenanceDashboardPanel() {
  const items = getUpcomingServiceMaintenances().slice(0, 8);
  if (!items.length) return '<p class="empty-alert">Nenhuma manutenção próxima ao vencimento.</p>';
  return items
    .map((item, index) => {
      const clientName = item.client ? getClientDisplayName(item.client) : item.vehicle.owner || "Cliente";
      const phone = item.client?.phone || item.vehicle.phone || "";
      return `
        <article class="maintenance-card ${item.overdue ? "is-overdue" : ""}">
          <div>
            <strong>${escapeHtml(clientName)}</strong>
            <span>${escapeHtml(item.vehicle.plate)} · ${escapeHtml(item.serviceName)}</span>
            <small>${item.overdue ? "Vencida" : "Vence"} em ${formatDateBR(item.dueDate)}</small>
          </div>
          <button class="ghost-action compact" type="button" data-send-maintenance-whatsapp="${index}" ${phone ? "" : "disabled"}>
            <span>WhatsApp</span>
          </button>
        </article>
      `;
    })
    .join("");
}

function sendMaintenanceWhatsapp(index) {
  const item = getUpcomingServiceMaintenances()[Number(index)];
  if (!item) return;
  const phone = normalizeWhatsappPhone(item.client?.phone || item.vehicle.phone || "");
  if (!phone) {
    showToast("Cliente sem telefone para WhatsApp.");
    return;
  }
  const clientName = item.client ? getClientDisplayName(item.client) : item.vehicle.owner || "cliente";
  const text = `Olá, ${clientName}! A manutenção do serviço ${item.serviceName} do veículo ${item.vehicle.plate} está prevista para ${formatDateBR(item.dueDate)}. Podemos agendar?`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noreferrer");
}

function renderAdminDashboard() {
  const metricsContainer = $("#adminMetrics");
  const flowContainer = $("#adminStatusFlow");
  const alertsContainer = $("#adminAlerts");
  const maintenanceContainer = $("#adminMaintenanceDue");
  if (!metricsContainer || !flowContainer || !alertsContainer) return;

  const activeVehicles = patioVehicles.filter((vehicle) =>
    ["aguardando", "lavando", "pronto"].includes(vehicle.status)
  );
  const expectedRevenue = activeVehicles.reduce((total, vehicle) => total + getVehiclePaymentTotal(vehicle), 0);
  const estimatedFees = cashEntries
    .filter((entry) => entry.value > 0)
    .reduce((total, entry) => total + Number(entry.feeAmount || 0), 0);
  const estimatedNet = cashEntries.filter((entry) => entry.value > 0).reduce((total, entry) => total + Number(entry.netAmount || entry.value || 0), 0);
  const billedOpen = patioVehicles
    .filter((vehicle) => vehicle.payment === "Faturado" && !isFinalizedStatus(vehicle.status))
    .reduce((total, vehicle) => total + getVehiclePaymentTotal(vehicle), 0);
  const lowStockAlerts = getLowStockProducts().length + getLowStockSupplies().length;
  const servicesWithoutProfile = getServicesWithoutSupplyProfile().length;
  const patioVehiclesWithSpecialCare = activeVehicles.filter((vehicle) => hasVehicleSpecialCare(vehicle)).length;
  const acknowledgedCareWarnings = patioVehicles.filter((vehicle) =>
    (vehicle.specialCareWarningLog || []).some((entry) => entry.acknowledged)
  ).length;

  const metrics = [
    { label: "Receita prevista", value: formatCurrency(expectedRevenue), icon: "wallet" },
    { label: "Vendas de produtos", value: formatCurrency(getProductSalesRevenueTotal()), icon: "package" },
    { label: "Taxas previstas", value: formatCurrency(estimatedFees), icon: "card" },
    { label: "Líquido estimado", value: formatCurrency(estimatedNet), icon: "clipboard" },
    { label: "Veículos no pátio", value: activeVehicles.length, icon: "carFront" },
    { label: "Agendados", value: countByStatus("agendado"), icon: "hourglass" },
    { label: "Em Serviço", value: countByStatus("lavando"), icon: "drop" },
    { label: "Prontos", value: countByStatus("pronto"), icon: "sparkle" },
    { label: "Finalizados", value: countByStatus("finalizado"), icon: "check" },
    { label: "Faturado aberto", value: formatCurrency(billedOpen), icon: "wallet" },
    { label: "Com cuidado especial", value: patioVehiclesWithSpecialCare, icon: "alert" },
    { label: "Alertas confirmados", value: acknowledgedCareWarnings, icon: "shield" },
    { label: "Alertas de estoque", value: lowStockAlerts, icon: "alert" },
    { label: "Serviços sem ficha", value: servicesWithoutProfile, icon: "service" }
  ];

  metricsContainer.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <span class="metric-icon">${icons[metric.icon]}</span>
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
        </article>
      `
    )
    .join("");

  const totalVehicles = Math.max(patioVehicles.length, 1);
  flowContainer.innerHTML = statusOrder
    .map((status) => {
      const meta = statusMeta[status];
      const count = countByStatus(status);
      const percent = count ? Math.max((count / totalVehicles) * 100, 8) : 0;
      return `
        <div class="flow-row">
          <div class="flow-label">
            <span class="status-dot-icon status-${status}">${icons[meta.icon]}</span>
            <span>${getStatusGroupLabel(status)}</span>
            <strong>${count}</strong>
          </div>
          <span class="flow-track">
            <span class="flow-bar status-${status}" style="width: ${percent}%"></span>
          </span>
        </div>
      `;
    })
    .join("");

  alertsContainer.innerHTML = renderAdminAlerts(billedOpen);
  if (maintenanceContainer) maintenanceContainer.innerHTML = renderMaintenanceDashboardPanel();
}

function renderAdminAlerts(billedOpen) {
  const scheduledCashDue = getCashflowScheduledDueToday();
  const lowStockProducts = getLowStockProducts();
  const lowStockSupplies = getLowStockSupplies();
  const patioCareCount = patioVehicles.filter((vehicle) => !isFinalizedStatus(vehicle.status) && hasVehicleSpecialCare(vehicle)).length;
  const acknowledgedCareWarnings = patioVehicles.filter((vehicle) =>
    (vehicle.specialCareWarningLog || []).some((entry) => entry.acknowledged)
  ).length;
  const alerts = [
    countByStatus("agendado")
      ? `${countByStatus("agendado")} agendamento(s) aguardando confirmação de entrada.`
      : "",
    scheduledCashDue.length
      ? `${scheduledCashDue.length} lançamento(s) de caixa agendado(s) para hoje aguardam confirmação.`
      : "",
    countByStatus("pronto") ? `${countByStatus("pronto")} veículo(s) pronto(s) para entrega.` : "",
    countByStatus("lavando") ? `${countByStatus("lavando")} serviço(s) em execução agora.` : "",
    billedOpen ? `${formatCurrency(billedOpen)} em lançamentos faturados abertos.` : "",
    patioCareCount ? `${patioCareCount} veículo(s) no pátio exigem cuidado especial.` : "",
    acknowledgedCareWarnings ? `${acknowledgedCareWarnings} atendimento(s) já tiveram alerta técnico confirmado.` : "",
    getActiveOpenPayments().length
      ? `${getActiveOpenPayments().length} pagamento(s) em aberto exigem lembrete diário ao gestor.`
      : "",
    countByStatus("finalizado") ? `${countByStatus("finalizado")} atendimento(s) em Finalizados.` : "",
    lowStockProducts.length ? `${lowStockProducts.length} produto(s) em estoque mínimo pedem reposição.` : "",
    lowStockSupplies.length ? `${lowStockSupplies.length} insumo(s) em estoque mínimo podem travar a operação.` : "",
    getServicesWithoutSupplyProfile().length
      ? `${getServicesWithoutSupplyProfile().length} serviço(s) ainda estão sem ficha técnica de insumos.`
      : ""
  ].filter(Boolean);

  if (!alerts.length) {
    return '<p class="empty-alert">Operação sem prioridades abertas.</p>';
  }

  return alerts
    .map(
      (alert) => `
        <article class="admin-alert">
          <span class="metric-icon alert-icon">${icons.alert}</span>
          <p>${alert}</p>
        </article>
      `
    )
    .join("");
}

function renderAdminScreen(view) {
  if (view === "wallet") {
    renderAdminScreen("businessFinance");
    return;
  }
  const container = $(`#admin${capitalize(view)}Content`);
  if (!container) return;

  if (view === "clients") {
    renderClientsScreen(container);
    return;
  }

  if (view === "vehicles") {
    renderVehiclesScreen(container);
    return;
  }

  if (view === "products") {
    renderProductsScreen(container);
    return;
  }

  if (view === "supplies") {
    renderSuppliesScreen(container);
    return;
  }

  if (view === "inventory") {
    renderInventoryScreen(container);
    return;
  }

  if (view === "business") {
    renderBusinessScreen(container);
    return;
  }

  if (view === "businessFinance") {
    renderBusinessFinanceScreen(container);
    return;
  }

  if (view === "businessSocial") {
    renderBusinessSocialScreen(container);
    return;
  }

  if (view === "businessMessages") {
    renderBusinessMessagesScreen(container);
    return;
  }

  if (view === "operators") {
    renderOperatorsScreen(container);
    return;
  }

  if (view === "services") {
    renderServicesScreen(container);
    return;
  }

  if (view === "productSales") {
    renderProductSalesScreen(container);
    return;
  }

  if (view === "documents") {
    renderDocumentsScreen(container);
    return;
  }

  if (view === "cashflow") {
    renderCashflowScreen(container);
    return;
  }

  if (view === "openPayments") {
    renderOpenPaymentsScreen(container);
    return;
  }

  if (view === "invoices") {
    renderInvoicesScreen(container);
    return;
  }

  const content = getAdminScreenContent(view);
  if (!content) return;

  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo">
      ${content.metrics.map(renderScreenMetric).join("")}
    </section>
    <section class="screen-toolbar" aria-label="Filtros">
      <label class="screen-search">
        <span class="screen-search-icon">${icons[content.searchIcon]}</span>
        <input type="search" placeholder="${escapeHtml(content.searchPlaceholder)}" />
      </label>
      <div class="screen-filters">
        ${content.filters.map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button">${escapeHtml(filter)}</button>`).join("")}
      </div>
    </section>
    <section class="admin-screen-grid">
      <article class="admin-panel screen-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${escapeHtml(content.kicker)}</p>
            <h2>${escapeHtml(content.tableTitle)}</h2>
          </div>
        </div>
        ${renderAdminTable(content.columns, content.rows)}
      </article>
      <article class="admin-panel screen-side-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${escapeHtml(content.sideKicker)}</p>
            <h2>${escapeHtml(content.sideTitle)}</h2>
          </div>
        </div>
        <div class="screen-side-list">
          ${content.sideItems.map(renderSideItem).join("")}
        </div>
      </article>
    </section>
  `;
  bindAdminScreenControls(container);
}

function bindAdminScreenControls(container) {
  const input = $(".screen-search input", container);
  const rows = $$(".admin-table tbody tr", container);
  if (input) {
    input.addEventListener("input", () => {
      const query = normalizeText(input.value);
      rows.forEach((row) => {
        row.hidden = Boolean(query) && !normalizeText(row.textContent).includes(query);
      });
    });
  }

  $$(".screen-filters button", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$(".screen-filters button", container).forEach((item) => item.classList.toggle("is-active", item === button));
    });
  });
}

function renderBusinessProfileReportField({ fieldKey, label, inputId, controlHtml, fullWidth = false }) {
  return `
    <div class="business-report-field ${fullWidth ? "business-address-field" : ""}">
      <label class="login-field" for="${escapeHtml(inputId)}">
        <span>${escapeHtml(label)}</span>
        ${controlHtml}
      </label>
      ${renderBusinessReportControls({
        id: `business${capitalize(fieldKey)}Report`,
        checked: getBusinessProfileReportFieldConfig(fieldKey).showInReports,
        switchData: `data-business-report-toggle="${escapeHtml(fieldKey)}"`
      })}
    </div>
  `;
}

function getBusinessProfileReportFieldConfig(fieldKey) {
  return businessProfile.reportFields?.[fieldKey] || getDefaultBusinessProfileReportFields(businessProfile.displayNameMode)[fieldKey];
}

function renderBusinessReportControls({ id, checked = false, switchData = "" }) {
  const switchId = `${id}Switch`;
  return `
    <div class="business-report-controls">
      <label class="switch-field business-report-switch" for="${escapeHtml(switchId)}">
        <input id="${escapeHtml(switchId)}" type="checkbox" ${switchData} ${checked ? "checked" : ""} />
        <span class="switch-control"></span>
        <span>Exibir em relatórios</span>
      </label>
    </div>
  `;
}

function renderBusinessAdditionalPhones() {
  const phones = normalizeBusinessAdditionalPhones(businessProfile.additionalPhones);
  return `
    <section class="business-phone-panel business-address-field">
      <div class="business-phone-panel-head">
        <h3>Telefones adicionais</h3>
        <button class="ghost-action compact" type="button" id="addBusinessPhoneButton">
          <span data-icon="plus"></span>
          <span>Adicionar telefone</span>
        </button>
      </div>
      <div class="business-extra-phone-list">
        ${phones.map((phone, index) => renderBusinessAdditionalPhoneRow(phone, index)).join("")}
      </div>
    </section>
  `;
}

function renderBusinessAdditionalPhoneRow(phone, index) {
  const rowId = `businessAdditionalPhone${index}`;
  return `
    <div class="business-extra-phone-row" data-business-extra-phone-row data-business-extra-phone-id="${escapeHtml(phone.id || "")}">
      <label class="login-field" for="${escapeHtml(rowId)}">
        <span>Telefone de contato ${index + 2}</span>
        <input id="${escapeHtml(rowId)}" data-business-extra-phone type="text" value="${escapeHtml(phone.value || "")}" placeholder="(11) 99999-9999" />
      </label>
      ${renderBusinessReportControls({
        id: `${rowId}Report`,
        checked: phone.showInReports,
        switchData: "data-business-extra-phone-toggle"
      })}
      <button class="ghost-action compact business-extra-phone-remove" type="button" data-remove-business-phone="${index}">
        <span data-icon="x"></span>
        <span>Remover</span>
      </button>
    </div>
  `;
}

function renderBusinessScreen(container) {
  const displayName = getBusinessDocumentName();
  const completeness = getBusinessProfileCompleteness();
  const logoSource = businessProfile.logoDataUrl || "./assets/brand/lavaprime-lockup.png";
  const logoDimensions = getBusinessLogoDimensions();

  container.innerHTML = `
    <section class="screen-metrics business-metrics" aria-label="Resumo do negócio">
      ${[
        { label: "Cadastro", value: `${completeness}%`, icon: "shield" },
        { label: "Nome em relatórios", value: displayName, icon: "invoice" },
        { label: "Logomarca", value: businessProfile.logoDataUrl ? "Personalizada" : "Padrão", icon: "badge" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="business-layout">
      <article class="admin-panel business-form-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Cadastro</p>
            <h2>Dados do negócio</h2>
          </div>
        </div>
        <form class="business-form-grid" id="businessProfileForm">
          ${renderBusinessProfileReportField({
            fieldKey: "cnpj",
            label: "CNPJ",
            inputId: "businessCnpj",
            controlHtml: `<input id="businessCnpj" type="text" value="${escapeHtml(businessProfile.cnpj)}" placeholder="00.000.000/0000-00" />`
          })}
          ${renderBusinessProfileReportField({
            fieldKey: "legalName",
            label: "Razão Social",
            inputId: "businessLegalName",
            controlHtml: `<input id="businessLegalName" type="text" value="${escapeHtml(businessProfile.legalName)}" placeholder="Razão social" />`
          })}
          ${renderBusinessProfileReportField({
            fieldKey: "tradeName",
            label: "Nome Fantasia",
            inputId: "businessTradeName",
            controlHtml: `<input id="businessTradeName" type="text" value="${escapeHtml(businessProfile.tradeName)}" placeholder="Nome fantasia" />`
          })}
          ${renderBusinessProfileReportField({
            fieldKey: "phone",
            label: "Telefone de contato",
            inputId: "businessPhone",
            controlHtml: `<input id="businessPhone" type="text" value="${escapeHtml(businessProfile.phone)}" placeholder="(11) 99999-9999" />`
          })}
          ${renderBusinessProfileReportField({
            fieldKey: "email",
            label: "E-mail",
            inputId: "businessEmail",
            controlHtml: `<input id="businessEmail" type="email" value="${escapeHtml(businessProfile.email || "")}" placeholder="contato@empresa.com.br" />`
          })}
          ${renderBusinessProfileReportField({
            fieldKey: "address",
            label: "Endereço",
            inputId: "businessAddress",
            fullWidth: true,
            controlHtml: `<textarea id="businessAddress" rows="3" placeholder="Rua, número, bairro, cidade">${escapeHtml(businessProfile.address)}</textarea>`
          })}
          ${renderBusinessAdditionalPhones()}
          <div class="dialog-actions business-form-actions">
            <button class="primary-button" type="submit">
              <span data-icon="check"></span>
              <span>Salvar dados</span>
            </button>
          </div>
        </form>
      </article>

      <article class="admin-panel business-logo-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Documentos</p>
            <h2>Logomarca padrão</h2>
          </div>
        </div>
        <div class="business-logo-preview business-logo-report-preview">
          <div class="business-logo-report-header">
            <div class="business-logo-report-slot">
              <img id="businessLogoReportPreviewImage" src="${escapeHtml(logoSource)}" alt="Logomarca do negócio" style="--logo-width: ${logoDimensions.x}%; --logo-height: ${logoDimensions.y}%;" />
            </div>
            <div class="business-logo-report-copy">
              <strong>${escapeHtml(displayName)}</strong>
              <span>${escapeHtml(getBusinessDocumentContactLine("all") || "Documento gerado pelo sistema")}</span>
            </div>
            <span>RELATORIO</span>
          </div>
        </div>
        <label class="login-field" for="businessLogoFile">
          <span>Arquivo PNG ou JPG</span>
          <input id="businessLogoFile" type="file" accept="image/png,image/jpeg" />
        </label>
        <div class="business-logo-size-grid">
          <label class="login-field business-logo-size-field" for="businessLogoSizeX">
            <span>Largura (X)</span>
            <input id="businessLogoSizeX" data-business-logo-axis="x" type="range" min="${pdfLogoSizing.minPercent}" max="${pdfLogoSizing.maxPercent}" step="5" value="${logoDimensions.x}" />
          </label>
          <label class="login-field business-logo-size-field" for="businessLogoSizeY">
            <span>Altura (Y)</span>
            <input id="businessLogoSizeY" data-business-logo-axis="y" type="range" min="${pdfLogoSizing.minPercent}" max="${pdfLogoSizing.maxPercent}" step="5" value="${logoDimensions.y}" />
          </label>
        </div>
        <div class="business-logo-size-meta">
          <span>X <strong id="businessLogoSizeXValue">${logoDimensions.x}%</strong></span>
          <span>Y <strong id="businessLogoSizeYValue">${logoDimensions.y}%</strong></span>
        </div>
        <div class="dialog-actions business-logo-actions">
          <button class="ghost-action" type="button" id="removeBusinessLogoButton" ${businessProfile.logoDataUrl ? "" : "disabled"}>
            <span data-icon="x"></span>
            <span>Usar padrão LavaPrime</span>
          </button>
        </div>
      </article>
    </section>
  `;

  initIcons();
  bindBusinessScreenControls(container);
}

function bindBusinessScreenControls(container) {
  $("#businessCnpj", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatCnpj(event.currentTarget.value);
  });
  $("#businessPhone", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $$("[data-business-extra-phone]", container).forEach((input) => {
    input.addEventListener("input", (event) => {
      event.currentTarget.value = formatPhone(event.currentTarget.value);
    });
  });
  $("#addBusinessPhoneButton", container)?.addEventListener("click", () => {
    const currentProfile = getBusinessProfileFormValues(container);
    currentProfile.additionalPhones.push({ id: createBusinessContactPhoneId(), value: "", showInReports: true });
    businessProfile = currentProfile;
    renderBusinessScreen(container);
  });
  $$("[data-remove-business-phone]", container).forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeBusinessPhone);
      const currentProfile = getBusinessProfileFormValues(container);
      currentProfile.additionalPhones.splice(index, 1);
      businessProfile = currentProfile;
      renderBusinessScreen(container);
    });
  });
  $("#businessProfileForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    businessProfile = getBusinessProfileFormValues(container);
    saveBusinessStorageItem(businessStorageKeys.profile, businessProfile);
    resetPdfLogoCache();
    renderBusinessScreen(container);
    showToast("Dados do negócio salvos.");
  });
  $$("[data-business-logo-axis]", container).forEach((input) => {
    input.addEventListener("input", () => updateBusinessLogoSizeDisplay(container));
    input.addEventListener("change", () => {
      businessProfile = getBusinessProfileFormValues(container);
      saveBusinessStorageItem(businessStorageKeys.profile, businessProfile);
      updateBusinessLogoSizeDisplay(container);
      showToast("Dimensões da logomarca salvas.");
    });
  });
  $("#businessLogoFile", container).addEventListener("change", (event) => handleBusinessLogoUpload(event, container));
  $("#removeBusinessLogoButton", container)?.addEventListener("click", () => {
    businessProfile = { ...getBusinessProfileFormValues(container), logoDataUrl: "" };
    saveBusinessStorageItem(businessStorageKeys.profile, businessProfile);
    resetPdfLogoCache();
    renderBusinessScreen(container);
    showToast("Logomarca padrão LavaPrime restaurada.");
  });
}

function updateBusinessLogoSizeDisplay(container) {
  const xInput = $("#businessLogoSizeX", container);
  const yInput = $("#businessLogoSizeY", container);
  const xValue = getBusinessLogoDimensionPercent("x", xInput?.value);
  const yValue = getBusinessLogoDimensionPercent("y", yInput?.value);
  if (xInput) xInput.value = String(xValue);
  if (yInput) yInput.value = String(yValue);
  const xOutput = $("#businessLogoSizeXValue", container);
  const yOutput = $("#businessLogoSizeYValue", container);
  if (xOutput) xOutput.textContent = `${xValue}%`;
  if (yOutput) yOutput.textContent = `${yValue}%`;
  const preview = $("#businessLogoReportPreviewImage", container);
  if (preview) {
    preview.style.setProperty("--logo-width", `${xValue}%`);
    preview.style.setProperty("--logo-height", `${yValue}%`);
  }
}

function handleBusinessLogoUpload(event, container) {
  const file = event.currentTarget.files?.[0];
  if (!file) return;
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    showToast("Selecione uma logomarca em PNG ou JPG.");
    event.currentTarget.value = "";
    return;
  }
  if (file.size > 900000) {
    showToast("Use uma logomarca pequena, até 900 KB.");
    event.currentTarget.value = "";
    return;
  }

  const currentProfile = getBusinessProfileFormValues(container);
  readFileAsDataUrl(file).then((dataUrl) => {
    businessProfile = { ...currentProfile, logoDataUrl: dataUrl };
    saveBusinessStorageItem(businessStorageKeys.profile, businessProfile);
    resetPdfLogoCache();
    renderBusinessScreen(container);
    showToast("Logomarca atualizada para os documentos.");
  });
}

function getBusinessProfileFormValues(container) {
  const reportFields = getBusinessProfileReportFieldsFromForm(container);
  return {
    ...businessProfile,
    cnpj: $("#businessCnpj", container).value.trim(),
    legalName: $("#businessLegalName", container).value.trim(),
    tradeName: $("#businessTradeName", container).value.trim(),
    displayNameMode: getBusinessProfileDisplayNameMode(reportFields),
    phone: $("#businessPhone", container).value.trim(),
    additionalPhones: getBusinessAdditionalPhonesFormValues(container),
    email: $("#businessEmail", container).value.trim(),
    address: $("#businessAddress", container).value.trim(),
    logoSizePercent: getBusinessLogoDimensionPercent("x", $("#businessLogoSizeX", container)?.value),
    logoSizeXPercent: getBusinessLogoDimensionPercent("x", $("#businessLogoSizeX", container)?.value),
    logoSizeYPercent: getBusinessLogoDimensionPercent("y", $("#businessLogoSizeY", container)?.value),
    reportFields
  };
}

function getBusinessProfileReportFieldsFromForm(container) {
  return businessProfileReportFieldKeys.reduce((fields, key) => {
    fields[key] = {
      showInReports: Boolean($(`[data-business-report-toggle="${key}"]`, container)?.checked),
      reportTarget: "all"
    };
    return fields;
  }, {});
}

function getBusinessProfileDisplayNameMode(reportFields) {
  const currentMode = businessProfile.displayNameMode === "legalName" ? "legalName" : "tradeName";
  if (reportFields[currentMode]?.showInReports) return currentMode;
  if (reportFields.tradeName?.showInReports) return "tradeName";
  if (reportFields.legalName?.showInReports) return "legalName";
  return currentMode;
}

function getBusinessAdditionalPhonesFormValues(container) {
  return $$("[data-business-extra-phone-row]", container)
    .map((row) => ({
      id: row.dataset.businessExtraPhoneId || createBusinessContactPhoneId(),
      value: $("[data-business-extra-phone]", row)?.value.trim() || "",
      showInReports: Boolean($("[data-business-extra-phone-toggle]", row)?.checked),
      reportTarget: "all"
    }))
    .filter((phone) => phone.value);
}

function createBusinessContactPhoneId() {
  return `phone-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getBusinessPaymentMethodFormState() {
  const currentMethod = businessPaymentMethods.find((method) => method.id === Number(selectedBusinessPaymentMethodId));
  if (!currentMethod) {
    return {
      id: null,
      name: "",
      type: paymentMethodTypeOptions[0]?.value || "outro",
      active: true,
      showInService: true,
      showInProductSale: true,
      showInQuote: true,
      showInInvoice: true,
      immediateSettlement: true,
      settlementDays: 0,
      feePercent: 0,
      fixedFee: 0,
      linkedBankAccountId: null,
      notes: ""
    };
  }
  return { ...currentMethod };
}

function getBusinessPaymentMethodUsageTotal(methodName) {
  return Object.values(getPaymentMethodUsage(methodName)).reduce((total, value) => total + Number(value || 0), 0);
}

function renderBusinessPaymentMethodLinkedBankOptions(selectedId = null) {
  const normalizedSelected = Number(selectedId || 0);
  return [
    '<option value="">Sem conta vinculada</option>',
    ...businessBankAccounts.map(
      (account) =>
        `<option value="${account.id}" ${account.id === normalizedSelected ? "selected" : ""}>${escapeHtml(
          getBusinessBankAccountLabel(account)
        )}</option>`
    )
  ].join("");
}

function renderBusinessFinanceSettingsForm() {
  const settings = businessFinanceSettings;
  return `
    <form class="business-settings-stack" id="businessFinanceSettingsForm">
      <section class="business-settings-group">
        <div class="business-settings-head">
          <p class="eyebrow">Recebimento</p>
          <h3>Regras de recebimento</h3>
        </div>
        <div class="business-form-grid">
          <label class="login-field" for="businessInvoiceDefaultDueDays">
            <span>Prazo padrão de fatura</span>
            <input id="businessInvoiceDefaultDueDays" type="number" min="0" step="1" value="${escapeHtml(String(settings.receiptRules.invoiceDefaultDueDays || 0))}" />
          </label>
          <label class="login-field" for="businessOpenPaymentDueDays">
            <span>Prazo padrão de recebimento em aberto</span>
            <input id="businessOpenPaymentDueDays" type="number" min="0" step="1" value="${escapeHtml(String(settings.receiptRules.openPaymentDueDays || 0))}" />
          </label>
          <label class="switch-field business-switch-field" for="businessRequirePixKeyWhenActive">
            <input id="businessRequirePixKeyWhenActive" type="checkbox" ${settings.receiptRules.requirePixKeyWhenActive ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Exigir chave Pix configurada quando Pix estiver ativo</span>
          </label>
        </div>
      </section>

      <section class="business-settings-group">
        <div class="business-settings-head">
          <p class="eyebrow">Gestão</p>
          <h3>Margens e custos padrão</h3>
        </div>
        <div class="business-form-grid">
          <label class="login-field" for="businessServiceMarginPercent">
            <span>Margem padrão de serviços (%)</span>
            <input id="businessServiceMarginPercent" type="number" min="0" max="99.99" step="0.01" value="${escapeHtml(String(settings.margins.serviceMarginPercent || 0))}" />
          </label>
          <label class="login-field" for="businessProductMarginPercent">
            <span>Margem padrão de produtos (%)</span>
            <input id="businessProductMarginPercent" type="number" min="0" max="99.99" step="0.01" value="${escapeHtml(String(settings.margins.productMarginPercent || 0))}" />
          </label>
          <label class="login-field" for="businessMonthlyOperationalCost">
            <span>Custo operacional mensal estimado</span>
            <input id="businessMonthlyOperationalCost" type="text" inputmode="decimal" data-money-input="true" value="${escapeHtml(formatCurrencyFieldValue(settings.margins.monthlyOperationalCost || 0))}" />
          </label>
          <label class="login-field" for="businessProductiveHoursMonthly">
            <span>Horas produtivas mensais</span>
            <input id="businessProductiveHoursMonthly" type="number" min="1" step="1" value="${escapeHtml(String(settings.margins.productiveHoursMonthly || 176))}" />
          </label>
          <label class="login-field" for="businessAverageCommissionPercent">
            <span>Comissão média (%)</span>
            <input id="businessAverageCommissionPercent" type="number" min="0" max="100" step="0.01" value="${escapeHtml(String(settings.margins.averageCommissionPercent || 0))}" />
          </label>
          <label class="login-field" for="businessAverageTaxPercent">
            <span>Imposto médio (%)</span>
            <input id="businessAverageTaxPercent" type="number" min="0" max="100" step="0.01" value="${escapeHtml(String(settings.margins.averageTaxPercent || 0))}" />
          </label>
          <label class="login-field business-address-field" for="businessMarginsNotes">
            <span>Observações gerenciais</span>
            <textarea id="businessMarginsNotes" rows="3">${escapeHtml(settings.margins.notes || "")}</textarea>
          </label>
        </div>
      </section>

      <section class="business-settings-group">
        <div class="business-settings-head">
          <p class="eyebrow">Estoque</p>
          <h3>Estoque e insumos</h3>
        </div>
        <div class="business-form-grid">
          <label class="switch-field business-switch-field" for="businessAllowProductSaleWithoutStock">
            <input id="businessAllowProductSaleWithoutStock" type="checkbox" ${settings.inventory.allowProductSaleWithoutStock ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Permitir venda de produto sem estoque</span>
          </label>
          <label class="switch-field business-switch-field" for="businessAllowSupplyNegativeStock">
            <input id="businessAllowSupplyNegativeStock" type="checkbox" ${settings.inventory.allowSupplyNegativeStock ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Permitir baixa de insumo com estoque negativo</span>
          </label>
          <label class="switch-field business-switch-field" for="businessAlertProductMinStock">
            <input id="businessAlertProductMinStock" type="checkbox" ${settings.inventory.alertProductMinStock ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Alertar estoque mínimo de produtos</span>
          </label>
          <label class="switch-field business-switch-field" for="businessAlertSupplyMinStock">
            <input id="businessAlertSupplyMinStock" type="checkbox" ${settings.inventory.alertSupplyMinStock ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Alertar estoque mínimo de insumos</span>
          </label>
          <label class="switch-field business-switch-field" for="businessAutoConsumeSupplies">
            <input id="businessAutoConsumeSupplies" type="checkbox" ${settings.inventory.autoConsumeSuppliesOnServiceCompletion ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Baixar insumos automaticamente ao concluir serviço</span>
          </label>
          <label class="switch-field business-switch-field" for="businessAllowManualSupplyAdjustment">
            <input id="businessAllowManualSupplyAdjustment" type="checkbox" ${settings.inventory.allowManualSupplyAdjustment ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Permitir ajuste manual de consumo real</span>
          </label>
          <label class="switch-field business-switch-field" for="businessRequireSupplyAdjustmentReason">
            <input id="businessRequireSupplyAdjustmentReason" type="checkbox" ${settings.inventory.requireSupplyAdjustmentReason ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Exigir justificativa para ajuste manual de insumo</span>
          </label>
          <label class="switch-field business-switch-field" for="businessReserveStockOnQuote">
            <input id="businessReserveStockOnQuote" type="checkbox" ${settings.inventory.reserveStockOnQuote ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Reservar estoque em orçamento</span>
          </label>
          <label class="login-field" for="businessDefaultQuoteValidityDays">
            <span>Validade padrão do orçamento (dias)</span>
            <input id="businessDefaultQuoteValidityDays" type="number" min="1" step="1" value="${escapeHtml(String(settings.inventory.defaultQuoteValidityDays || 15))}" />
          </label>
        </div>
      </section>

      <section class="business-settings-group">
        <div class="business-settings-head">
          <p class="eyebrow">Documentos</p>
          <h3>Documentos e comprovantes</h3>
        </div>
        <div class="business-form-grid">
          <label class="login-field" for="businessDefaultProductDocumentType">
            <span>Documento padrão de venda de produto</span>
            <select id="businessDefaultProductDocumentType">
              ${renderSelectOptions(["Recibo", "Pedido", "Comprovante simples", "Orçamento"], settings.documents.defaultProductDocumentType || "Recibo")}
            </select>
          </label>
          <label class="login-field" for="businessDefaultServiceDocumentType">
            <span>Documento padrão de serviço</span>
            <select id="businessDefaultServiceDocumentType">
              ${renderSelectOptions(["Recibo", "Comprovante simples", "Orçamento", "Pedido"], settings.documents.defaultServiceDocumentType || "Recibo")}
            </select>
          </label>
          <label class="login-field" for="businessReceiptNumberPrefix">
            <span>Prefixo de recibos</span>
            <input id="businessReceiptNumberPrefix" type="text" value="${escapeHtml(settings.documents.receiptNumberPrefix || "REC")}" />
          </label>
          <label class="login-field" for="businessQuoteNumberPrefix">
            <span>Prefixo de orçamentos</span>
            <input id="businessQuoteNumberPrefix" type="text" value="${escapeHtml(settings.documents.quoteNumberPrefix || "ORC")}" />
          </label>
          <label class="login-field" for="businessOrderNumberPrefix">
            <span>Prefixo de pedidos</span>
            <input id="businessOrderNumberPrefix" type="text" value="${escapeHtml(settings.documents.orderNumberPrefix || "PED")}" />
          </label>
          <label class="switch-field business-switch-field" for="businessShowPixInInvoices">
            <input id="businessShowPixInInvoices" type="checkbox" ${settings.documents.showPixInInvoices ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Permitir Pix nos documentos</span>
          </label>
          <label class="switch-field business-switch-field" for="businessShowBankAccountsInInvoices">
            <input id="businessShowBankAccountsInInvoices" type="checkbox" ${settings.documents.showBankAccountsInInvoices ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Permitir contas bancárias nos documentos</span>
          </label>
          <label class="switch-field business-switch-field" for="businessShowBusinessDataInDocuments">
            <input id="businessShowBusinessDataInDocuments" type="checkbox" ${settings.documents.showBusinessDataInDocuments ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Exibir dados da empresa nos documentos</span>
          </label>
          <label class="login-field business-address-field" for="businessReceiptDefaultNote">
            <span>Observação padrão de recibos</span>
            <textarea id="businessReceiptDefaultNote" rows="3">${escapeHtml(settings.documents.receiptDefaultNote || "")}</textarea>
          </label>
          <label class="login-field business-address-field" for="businessQuoteDefaultNote">
            <span>Observação padrão de orçamentos</span>
            <textarea id="businessQuoteDefaultNote" rows="3">${escapeHtml(settings.documents.quoteDefaultNote || "")}</textarea>
          </label>
        </div>
      </section>

      <div class="dialog-actions business-form-actions">
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>Salvar configurações</span>
        </button>
      </div>
    </form>
  `;
}

function getBusinessPaymentMethodTypeLabel(type) {
  const option = paymentMethodTypeOptions.find((item) => item.value === type);
  return option?.label || capitalize(type || "Outro");
}

function getBusinessPaymentMethodUsageLabel(method) {
  const channels = getBusinessPaymentMethodChannelLabels(method);
  if (!channels.length) return "Sem contexto";
  if (channels.length === 4) return "Todos";
  return channels.join(", ");
}

function renderBusinessPaymentMethodsTable() {
  if (!businessPaymentMethods.length) return '<p class="empty-alert">Nenhuma forma de pagamento cadastrada.</p>';
  return `
    <div class="admin-table-wrap business-payment-method-table-wrap">
      <table class="admin-table business-payment-method-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Forma de pagamento</th>
            <th>Tipo</th>
            <th>Taxa</th>
            <th>Prazo de recebimento</th>
            <th>Usar em</th>
            <th>Conta vinculada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${businessPaymentMethods
            .map((method) => {
              const linkedAccount = businessBankAccounts.find((account) => account.id === Number(method.linkedBankAccountId || 0));
              const usageTotal = getBusinessPaymentMethodUsageTotal(method.name);
              const canDelete = !usageTotal && !isDefaultBusinessPaymentMethod(method.name);
              return `
                <tr>
                  <td data-label="Status">
                    <span class="business-payment-method-status ${method.active ? "is-active" : "is-inactive"}">${method.active ? "Ativa" : "Inativa"}</span>
                  </td>
                  <td data-label="Forma de pagamento">
                    <strong>${escapeHtml(method.name)}</strong>
                    ${method.notes ? `<span class="table-note">${escapeHtml(method.notes)}</span>` : ""}
                  </td>
                  <td data-label="Tipo">${escapeHtml(getBusinessPaymentMethodTypeLabel(method.type))}</td>
                  <td data-label="Taxa">${escapeHtml(getBusinessPaymentMethodFeeSummary(method))}</td>
                  <td data-label="Prazo de recebimento">${escapeHtml(getBusinessPaymentMethodSettlementSummary(method))}</td>
                  <td data-label="Usar em">${escapeHtml(getBusinessPaymentMethodUsageLabel(method))}</td>
                  <td data-label="Conta vinculada">${linkedAccount ? escapeHtml(linkedAccount.bank) : "Sem conta vinculada"}</td>
                  <td data-label="Ações">
                    <div class="cashflow-row-actions business-payment-method-actions">
                      <button class="ghost-action compact" type="button" data-edit-business-payment-method="${method.id}">
                        <span data-icon="edit"></span>
                        <span>Editar</span>
                      </button>
                      <button class="ghost-action compact" type="button" data-toggle-business-payment-method="${method.id}">
                        <span data-icon="${method.active ? "clock" : "check"}"></span>
                        <span>${method.active ? "Inativar" : "Ativar"}</span>
                      </button>
                      ${canDelete ? `<button class="exit-button compact" type="button" data-delete-business-payment-method="${method.id}">Excluir</button>` : ""}
                    </div>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderBusinessPaymentMethodDialogForm() {
  const paymentMethodForm = getBusinessPaymentMethodFormState();
  const editingDefaultMethod = Boolean(paymentMethodForm.id && isDefaultBusinessPaymentMethod(paymentMethodForm.name));
  return `
    <form class="vehicle-box service-box" id="businessPaymentMethodForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Configurações financeiras</p>
          <h2>${paymentMethodForm.id ? "Editar forma de pagamento" : "Nova forma de pagamento"}</h2>
        </div>
        <button class="icon-button" id="closeBusinessPaymentMethodDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      <div class="vehicle-form-grid service-dialog-grid inventory-form-grid">
        <label class="login-field" for="businessPaymentMethodName">
          <span>Nome da forma de pagamento</span>
          <input id="businessPaymentMethodName" type="text" value="${escapeHtml(paymentMethodForm.name || "")}" placeholder="Ex.: Link de pagamento" ${editingDefaultMethod ? "readonly" : ""} />
        </label>
        <label class="login-field" for="businessPaymentMethodType">
          <span>Tipo</span>
          <select id="businessPaymentMethodType">
            ${renderSelectOptions(paymentMethodTypeOptions, paymentMethodForm.type || paymentMethodTypeOptions[0]?.value || "outro")}
          </select>
        </label>
        <label class="login-field" for="businessPaymentMethodLinkedAccount">
          <span>Conta bancária vinculada</span>
          <select id="businessPaymentMethodLinkedAccount">
            ${renderBusinessPaymentMethodLinkedBankOptions(paymentMethodForm.linkedBankAccountId)}
          </select>
        </label>
        <label class="login-field" for="businessPaymentMethodSettlementDays">
          <span>Prazo de recebimento (dias)</span>
          <input id="businessPaymentMethodSettlementDays" type="number" min="0" step="1" value="${escapeHtml(String(paymentMethodForm.settlementDays || 0))}" ${paymentMethodForm.immediateSettlement ? "disabled" : ""} />
        </label>
        <label class="login-field" for="businessPaymentMethodFeePercent">
          <span>Taxa percentual (%)</span>
          <input id="businessPaymentMethodFeePercent" type="number" min="0" max="100" step="0.01" value="${escapeHtml(String(paymentMethodForm.feePercent || 0))}" />
        </label>
        <label class="login-field" for="businessPaymentMethodFixedFee">
          <span>Taxa fixa</span>
          <input id="businessPaymentMethodFixedFee" type="text" inputmode="decimal" data-money-input="true" value="${escapeHtml(formatCurrencyFieldValue(paymentMethodForm.fixedFee || 0))}" />
        </label>
        <label class="switch-field business-switch-field" for="businessPaymentMethodActive">
          <input id="businessPaymentMethodActive" type="checkbox" ${paymentMethodForm.active ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Ativa</span>
        </label>
        <label class="switch-field business-switch-field" for="businessPaymentMethodImmediate">
          <input id="businessPaymentMethodImmediate" type="checkbox" ${paymentMethodForm.immediateSettlement ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Liquidação imediata</span>
        </label>
        <label class="switch-field business-switch-field" for="businessPaymentMethodShowInService">
          <input id="businessPaymentMethodShowInService" type="checkbox" ${paymentMethodForm.showInService ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Usar em atendimento</span>
        </label>
        <label class="switch-field business-switch-field" for="businessPaymentMethodShowInProductSale">
          <input id="businessPaymentMethodShowInProductSale" type="checkbox" ${paymentMethodForm.showInProductSale ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Usar em venda de produtos</span>
        </label>
        <label class="switch-field business-switch-field" for="businessPaymentMethodShowInQuote">
          <input id="businessPaymentMethodShowInQuote" type="checkbox" ${paymentMethodForm.showInQuote ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Usar em orçamento</span>
        </label>
        <label class="switch-field business-switch-field" for="businessPaymentMethodShowInInvoice">
          <input id="businessPaymentMethodShowInInvoice" type="checkbox" ${paymentMethodForm.showInInvoice ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Usar em fatura</span>
        </label>
        <label class="login-field inventory-notes-field" for="businessPaymentMethodNotes">
          <span>Observações</span>
          <textarea id="businessPaymentMethodNotes" rows="3">${escapeHtml(paymentMethodForm.notes || "")}</textarea>
        </label>
      </div>
      <div class="dialog-actions">
        <button class="exit-button" id="cancelBusinessPaymentMethodDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>${paymentMethodForm.id ? "Salvar forma" : "Cadastrar forma"}</span>
        </button>
      </div>
    </form>
  `;
}

function renderBusinessPaymentMethods() {
  if (!businessPaymentMethods.length) return '<p class="empty-alert">Nenhuma forma de pagamento cadastrada.</p>';
  return businessPaymentMethods
    .map((method) => {
      const linkedAccount = businessBankAccounts.find((account) => account.id === Number(method.linkedBankAccountId || 0));
      const usageTotal = getBusinessPaymentMethodUsageTotal(method.name);
      const channels = getBusinessPaymentMethodChannelLabels(method);
      const isEditing = method.id === Number(selectedBusinessPaymentMethodId);
      const canDelete = !usageTotal && !isDefaultBusinessPaymentMethod(method.name);
      return `
        <article class="business-payment-method-card ${method.active ? "" : "is-inactive"} ${isEditing ? "is-editing" : ""}">
          <div class="business-payment-method-head">
            <div>
              <strong>${escapeHtml(method.name)}</strong>
              <p>${escapeHtml(capitalize(method.type || "outro"))} · ${escapeHtml(getBusinessPaymentMethodSettlementSummary(method))}</p>
            </div>
            <span class="business-payment-method-status ${method.active ? "is-active" : "is-inactive"}">${method.active ? "Ativa" : "Inativa"}</span>
          </div>
          <div class="business-payment-method-meta">
            <span>${escapeHtml(getBusinessPaymentMethodFeeSummary(method))}</span>
            <span>${linkedAccount ? `Conta: ${escapeHtml(linkedAccount.bank)}` : "Sem conta vinculada"}</span>
            <span>${channels.length ? `Usada em: ${escapeHtml(channels.join(", "))}` : "Sem contexto ativo"}</span>
            <span>${usageTotal ? `${usageTotal} lançamento(s) vinculado(s)` : "Sem movimentação vinculada"}</span>
          </div>
          ${method.notes ? `<p class="business-payment-method-notes">${escapeHtml(method.notes)}</p>` : ""}
          <div class="business-account-actions business-payment-method-actions">
            <button class="ghost-action" type="button" data-edit-business-payment-method="${method.id}">
              <span data-icon="edit"></span>
              <span>Editar</span>
            </button>
            <button class="ghost-action" type="button" data-toggle-business-payment-method="${method.id}">
              <span data-icon="${method.active ? "clock" : "check"}"></span>
              <span>${method.active ? "Inativar" : "Ativar"}</span>
            </button>
            ${canDelete ? `<button class="exit-button compact" type="button" data-delete-business-payment-method="${method.id}">Excluir</button>` : ""}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderBusinessBankAccounts() {
  if (!businessBankAccounts.length) return '<p class="empty-alert">Nenhuma conta bancária cadastrada.</p>';
  return businessBankAccounts
    .map(
      (account) => {
        const linkedMethods = businessPaymentMethods.filter((method) => Number(method.linkedBankAccountId || 0) === account.id);
        return `
        <article class="business-account-card">
          <div>
            <strong>${escapeHtml(account.bank)}</strong>
            <p>${escapeHtml(account.type)} / Agência ${escapeHtml(account.agency)} / Conta ${escapeHtml(account.account)}</p>
            <span>${escapeHtml(account.holder || getBusinessDocumentName())}</span>
            ${linkedMethods.length ? `<small>${escapeHtml(`Vinculada a: ${linkedMethods.map((method) => method.name).join(", ")}`)}</small>` : ""}
          </div>
          <div class="business-account-actions">
            <label class="switch-field" for="businessAccountInvoice${account.id}">
              <input id="businessAccountInvoice${account.id}" type="checkbox" data-business-account-invoice="${account.id}" ${account.showInInvoices ? "checked" : ""} />
              <span class="switch-control"></span>
              <span>Faturas</span>
            </label>
            <button class="ghost-action" type="button" data-delete-business-account="${account.id}">
              <span data-icon="x"></span>
              <span>Excluir</span>
            </button>
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function renderBusinessPixQr() {
  const payload = isValidPixCopyPastePayload(businessPixInfo.qrPayload) ? businessPixInfo.qrPayload : "";
  if (!payload) return '<p class="empty-alert">Cadastre a chave Pix para gerar o QR Code.</p>';
  const qrSource = getQrCodeImageSource(payload);
  return `
    <div class="business-qr-panel">
      <img src="${escapeHtml(qrSource)}" alt="QR Code Pix" />
      <label class="login-field" for="businessPixPayload">
        <span>Código gerado para o QR Code</span>
        <textarea id="businessPixPayload" rows="4" readonly>${escapeHtml(payload)}</textarea>
      </label>
      ${businessPixInfo.paymentUrl ? `<a class="ghost-action business-payment-link" href="${escapeHtml(businessPixInfo.paymentUrl)}" target="_blank" rel="noreferrer">Abrir link de pagamento</a>` : ""}
    </div>
  `;
}

function deleteBusinessPaymentMethod(methodId, container) {
  const method = businessPaymentMethods.find((item) => item.id === Number(methodId));
  if (!method) return;
  if (getBusinessPaymentMethodUsageTotal(method.name) > 0 || isDefaultBusinessPaymentMethod(method.name)) {
    if (method.active) {
      method.active = false;
      method.updatedAt = getTodayISO();
      saveBusinessPaymentMethods();
      if (Number(selectedBusinessPaymentMethodId) === method.id) selectedBusinessPaymentMethodId = null;
      renderBusinessFinanceScreen(container);
      showToast("Forma de pagamento inativada para preservar o histórico.");
      return;
    }
    showToast("Esta forma já está inativa e segue preservada para o histórico.");
    return;
  }

  businessPaymentMethods = businessPaymentMethods.filter((item) => item.id !== method.id);
  saveBusinessPaymentMethods();
  if (Number(selectedBusinessPaymentMethodId) === method.id) selectedBusinessPaymentMethodId = null;
  renderBusinessFinanceScreen(container);
  showToast("Forma de pagamento removida.");
}

function saveBusinessPixInfo(container, shouldGenerateQr) {
  const nextPixInfo = {
    keyType: $("#businessPixKeyType", container).value,
    key: $("#businessPixKey", container).value.trim(),
    receiver: $("#businessPixReceiver", container).value.trim(),
    paymentUrl: $("#businessPixPaymentUrl", container).value.trim(),
    copyPasteCode: $("#businessPixCopyPasteCode", container).value.trim(),
    showInInvoices: $("#businessPixShowInvoices", container).checked,
    qrPayload: shouldGenerateQr ? "" : businessPixInfo.qrPayload
  };

  if (shouldGenerateQr) {
    const normalizedCopyPaste = normalizePixCopyPaste(nextPixInfo.copyPasteCode);
    if (normalizedCopyPaste && !isValidPixCopyPastePayload(normalizedCopyPaste)) {
      showToast("Pix copia e cola inválido. Confira o código gerado pelo banco.");
      return;
    }

    const payload = getBusinessPixQrPayload(nextPixInfo);
    if (!payload) {
      showToast("Informe uma chave Pix ou cole um Pix copia e cola válido.");
      return;
    }
    nextPixInfo.qrPayload = payload;
  }

  if (businessFinanceSettings.receiptRules.requirePixKeyWhenActive && getPaymentMethodByName("Pix")?.active && !nextPixInfo.key) {
    showToast("Cadastre a chave Pix para manter essa forma ativa.");
    $("#businessPixKey", container)?.focus();
    return;
  }

  businessPixInfo = nextPixInfo;
  saveBusinessStorageItem(businessStorageKeys.pix, businessPixInfo);
  renderBusinessFinanceScreen(container);
  showToast(shouldGenerateQr ? "QR Code Pix gerado." : "Informações Pix salvas.");
}

function getBusinessFinanceScreenContainer() {
  return $("#adminBusinessFinanceContent");
}

function closeBusinessPaymentMethodDialog(resetSelection = true) {
  const dialog = $("#businessPaymentMethodDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  if (resetSelection) selectedBusinessPaymentMethodId = null;
}

function openBusinessPaymentMethodDialog(methodId = null) {
  selectedBusinessPaymentMethodId = methodId ? Number(methodId) : null;
  const dialog = $("#businessPaymentMethodDialog");
  if (!dialog) return;
  dialog.innerHTML = renderBusinessPaymentMethodDialogForm();
  initIcons();
  bindCurrencyInputs(dialog);
  bindBusinessPaymentMethodDialogControls(dialog);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  window.setTimeout(() => $("#businessPaymentMethodName", dialog)?.focus(), 0);
}

function bindBusinessPaymentMethodDialogControls(dialog) {
  $("#closeBusinessPaymentMethodDialog", dialog)?.addEventListener("click", () => closeBusinessPaymentMethodDialog(true));
  $("#cancelBusinessPaymentMethodDialog", dialog)?.addEventListener("click", () => closeBusinessPaymentMethodDialog(true));
  $("#businessPaymentMethodImmediate", dialog)?.addEventListener("change", (event) => {
    const settlementInput = $("#businessPaymentMethodSettlementDays", dialog);
    if (!settlementInput) return;
    settlementInput.disabled = event.currentTarget.checked;
    if (event.currentTarget.checked) settlementInput.value = "0";
  });
  $("#businessPaymentMethodForm", dialog)?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveBusinessPaymentMethod(dialog);
  });
}

function saveBusinessPaymentMethod(container) {
  const currentMethod = businessPaymentMethods.find((method) => method.id === Number(selectedBusinessPaymentMethodId));
  const rawName = $("#businessPaymentMethodName", container)?.value.trim() || "";
  const canonicalName = getCanonicalPaymentMethodName(rawName);
  const feePercent = Number($("#businessPaymentMethodFeePercent", container)?.value || 0);
  const fixedFee = getCurrencyInputValue("#businessPaymentMethodFixedFee", container);
  const linkedBankAccountId = Number($("#businessPaymentMethodLinkedAccount", container)?.value || 0) || null;
  const immediateSettlement = Boolean($("#businessPaymentMethodImmediate", container)?.checked);
  const settlementDays = immediateSettlement ? 0 : Math.max(0, Number($("#businessPaymentMethodSettlementDays", container)?.value || 0));

  if (!canonicalName) {
    showToast("Informe o nome da forma de pagamento.");
    $("#businessPaymentMethodName", container)?.focus();
    return;
  }
  if (canonicalName === "Carteira (legado)" && !currentMethod) {
    showToast("Carteira é apenas um registro legado. Cadastre uma forma real de pagamento.");
    $("#businessPaymentMethodName", container)?.focus();
    return;
  }
  if (businessPaymentMethods.some((method) => method.id !== currentMethod?.id && normalizeText(method.name) === normalizeText(canonicalName))) {
    showToast("Já existe uma forma de pagamento com esse nome.");
    $("#businessPaymentMethodName", container)?.focus();
    return;
  }
  if (feePercent < 0 || feePercent > 100) {
    showToast("A taxa percentual deve ficar entre 0% e 100%.");
    $("#businessPaymentMethodFeePercent", container)?.focus();
    return;
  }
  if (fixedFee < 0) {
    showToast("A taxa fixa não pode ser negativa.");
    $("#businessPaymentMethodFixedFee", container)?.focus();
    return;
  }
  if (linkedBankAccountId && !businessBankAccounts.some((account) => account.id === linkedBankAccountId)) {
    showToast("Selecione uma conta bancária válida.");
    $("#businessPaymentMethodLinkedAccount", container)?.focus();
    return;
  }
  if (
    normalizeText(canonicalName) === normalizeText("Pix") &&
    $("#businessPaymentMethodActive", container)?.checked &&
    businessFinanceSettings.receiptRules.requirePixKeyWhenActive &&
    !businessPixInfo.key
  ) {
    showToast("Cadastre a chave Pix antes de ativar essa forma.");
    return;
  }

  const methodPayload = createBusinessPaymentMethodRecord(
    {
      id: currentMethod?.id || getNextBusinessPaymentMethodId(),
      name: canonicalName,
      type: $("#businessPaymentMethodType", container)?.value,
      active: Boolean($("#businessPaymentMethodActive", container)?.checked),
      showInService: Boolean($("#businessPaymentMethodShowInService", container)?.checked),
      showInProductSale: Boolean($("#businessPaymentMethodShowInProductSale", container)?.checked),
      showInQuote: Boolean($("#businessPaymentMethodShowInQuote", container)?.checked),
      showInInvoice: Boolean($("#businessPaymentMethodShowInInvoice", container)?.checked),
      immediateSettlement,
      settlementDays,
      feePercent,
      fixedFee,
      linkedBankAccountId,
      notes: $("#businessPaymentMethodNotes", container)?.value.trim() || "",
      createdAt: currentMethod?.createdAt || getTodayISO(),
      updatedAt: getTodayISO()
    },
    currentMethod?.id || getNextBusinessPaymentMethodId()
  );

  if (!methodPayload) {
    showToast("Não foi possível salvar a forma de pagamento.");
    return;
  }

  if (currentMethod) {
    renameBusinessPaymentMethodReferences(currentMethod.name, methodPayload.name);
    const index = businessPaymentMethods.findIndex((method) => method.id === currentMethod.id);
    if (index >= 0) businessPaymentMethods[index] = methodPayload;
  } else {
    businessPaymentMethods.push(methodPayload);
  }

  businessPaymentMethods = normalizeBusinessPaymentMethods(businessPaymentMethods);
  saveBusinessPaymentMethods();
  selectedBusinessPaymentMethodId = null;
  closeBusinessPaymentMethodDialog(false);
  renderBusinessFinanceScreen(getBusinessFinanceScreenContainer());
  showToast(currentMethod ? "Forma de pagamento atualizada." : "Forma de pagamento cadastrada.");
}

function bindBusinessFinanceControls(container) {
  $("#openBusinessPaymentMethodDialogButton", container)?.addEventListener("click", () => openBusinessPaymentMethodDialog());
  $$("[data-edit-business-payment-method]", container).forEach((button) => {
    button.addEventListener("click", () => openBusinessPaymentMethodDialog(Number(button.dataset.editBusinessPaymentMethod)));
  });
  $$("[data-toggle-business-payment-method]", container).forEach((button) => {
    button.addEventListener("click", () => {
      const method = businessPaymentMethods.find((item) => item.id === Number(button.dataset.toggleBusinessPaymentMethod));
      if (!method) return;
      if (!method.active && normalizeText(method.name) === normalizeText("Pix") && businessFinanceSettings.receiptRules.requirePixKeyWhenActive && !businessPixInfo.key) {
        showToast("Cadastre a chave Pix antes de ativar essa forma.");
        return;
      }
      method.active = !method.active;
      method.updatedAt = getTodayISO();
      saveBusinessPaymentMethods();
      renderBusinessFinanceScreen(container);
      showToast(method.active ? "Forma de pagamento ativada." : "Forma de pagamento inativada.");
    });
  });
  $$("[data-delete-business-payment-method]", container).forEach((button) => {
    button.addEventListener("click", () => deleteBusinessPaymentMethod(Number(button.dataset.deleteBusinessPaymentMethod), container));
  });

  $("#businessBankAccountForm", container)?.addEventListener("submit", (event) => {
    event.preventDefault();
    const bank = $("#businessBankName", container)?.value.trim() || "";
    const agency = $("#businessBankAgency", container)?.value.trim() || "";
    const account = $("#businessBankAccount", container)?.value.trim() || "";
    if (!bank || !agency || !account) {
      showToast("Informe banco, agência e conta.");
      return;
    }
    businessBankAccounts.push({
      id: getNextBusinessBankAccountId(),
      bank,
      type: $("#businessBankType", container)?.value || "Conta corrente",
      agency,
      account,
      holder: $("#businessBankHolder", container)?.value.trim() || getBusinessDocumentName(),
      showInInvoices: Boolean($("#businessBankShowInvoices", container)?.checked)
    });
    saveBusinessStorageItem(businessStorageKeys.bankAccounts, businessBankAccounts);
    renderBusinessFinanceScreen(container);
    showToast("Conta bancária cadastrada.");
  });

  $("#businessPixForm", container)?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveBusinessPixInfo(container, false);
  });
  $("#generatePixQrButton", container)?.addEventListener("click", () => saveBusinessPixInfo(container, true));
  $$("[data-business-account-invoice]", container).forEach((input) => {
    input.addEventListener("change", () => {
      const account = businessBankAccounts.find((item) => item.id === Number(input.dataset.businessAccountInvoice));
      if (!account) return;
      account.showInInvoices = input.checked;
      saveBusinessStorageItem(businessStorageKeys.bankAccounts, businessBankAccounts);
      showToast("Exibição em faturas atualizada.");
    });
  });
  $$("[data-delete-business-account]", container).forEach((button) => {
    button.addEventListener("click", () => {
      const accountId = Number(button.dataset.deleteBusinessAccount);
      const linkedMethods = businessPaymentMethods.filter((method) => Number(method.linkedBankAccountId || 0) === accountId);
      if (linkedMethods.length) {
        showToast(`Desvincule ${linkedMethods.map((method) => method.name).join(", ")} antes de excluir a conta.`);
        return;
      }
      businessBankAccounts = businessBankAccounts.filter((account) => account.id !== accountId);
      saveBusinessStorageItem(businessStorageKeys.bankAccounts, businessBankAccounts);
      renderBusinessFinanceScreen(container);
      showToast("Conta bancária removida.");
    });
  });
}

function renderBusinessFinanceScreen(container) {
  const visibleAccounts = businessBankAccounts.filter((account) => account.showInInvoices).length;
  const activeMethods = businessPaymentMethods.filter((method) => method.active).length;
  const immediateMethods = businessPaymentMethods.filter((method) => method.active && method.immediateSettlement).length;
  container.innerHTML = `
    <section class="screen-metrics business-metrics" aria-label="Resumo financeiro do negócio">
      ${[
        { label: "Formas ativas", value: activeMethods, icon: "card" },
        { label: "Liquidação imediata", value: immediateMethods, icon: "check" },
        { label: "Contas cadastradas", value: businessBankAccounts.length, icon: "wallet" },
        { label: "Exibir em faturas", value: visibleAccounts, icon: "invoice" },
        { label: "Pix", value: businessPixInfo.key ? "Configurado" : "Pendente", icon: "cashflow" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="business-finance-layout">
      <article class="admin-panel business-finance-primary-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Recebimentos</p>
            <h2>Formas de pagamento aceitas</h2>
          </div>
          <button class="new-vehicle-button" type="button" id="openBusinessPaymentMethodDialogButton">
            <span data-icon="plus"></span>
            <span>Nova forma de pagamento</span>
          </button>
        </div>
        <p class="step-copy">Configure como seus clientes podem pagar, quais taxas incidem e o prazo previsto de recebimento.</p>
        ${renderBusinessPaymentMethodsTable()}
      </article>

      <article class="admin-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Bancário</p>
            <h2>Contas bancárias</h2>
          </div>
        </div>
        <form class="business-form-grid" id="businessBankAccountForm">
          <label class="login-field" for="businessBankName">
            <span>Banco</span>
            <input id="businessBankName" type="text" placeholder="Banco" />
          </label>
          <label class="login-field" for="businessBankType">
            <span>Tipo de conta</span>
            <select id="businessBankType">
              <option>Conta corrente</option>
              <option>Conta poupança</option>
              <option>Conta pagamento</option>
            </select>
          </label>
          <label class="login-field" for="businessBankAgency">
            <span>Agência</span>
            <input id="businessBankAgency" type="text" placeholder="0001" />
          </label>
          <label class="login-field" for="businessBankAccount">
            <span>Conta</span>
            <input id="businessBankAccount" type="text" placeholder="00000-0" />
          </label>
          <label class="login-field" for="businessBankHolder">
            <span>Titular</span>
            <input id="businessBankHolder" type="text" value="${escapeHtml(getBusinessDocumentName())}" placeholder="Titular da conta" />
          </label>
          <label class="switch-field business-switch-field" for="businessBankShowInvoices">
            <input id="businessBankShowInvoices" type="checkbox" checked />
            <span class="switch-control"></span>
            <span>Exibir em faturas</span>
          </label>
          <div class="dialog-actions business-form-actions">
            <button class="primary-button" type="submit">
              <span data-icon="plus"></span>
              <span>Adicionar conta</span>
            </button>
          </div>
        </form>
        <div class="business-account-list">
          ${renderBusinessBankAccounts()}
        </div>
      </article>

      <article class="admin-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Pix</p>
            <h2>Chave e QR Code</h2>
          </div>
        </div>
        <form class="business-form-grid" id="businessPixForm">
          <label class="login-field" for="businessPixKeyType">
            <span>Tipo de chave</span>
            <select id="businessPixKeyType">
              ${["CNPJ", "CPF", "E-mail", "Telefone", "Aleatória"].map((type) => `<option value="${type}" ${businessPixInfo.keyType === type ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </label>
          <label class="login-field" for="businessPixKey">
            <span>Chave Pix</span>
            <input id="businessPixKey" type="text" value="${escapeHtml(businessPixInfo.key)}" placeholder="Chave Pix" />
          </label>
          <label class="login-field" for="businessPixReceiver">
            <span>Favorecido</span>
            <input id="businessPixReceiver" type="text" value="${escapeHtml(businessPixInfo.receiver || getBusinessDocumentName())}" placeholder="Favorecido" />
          </label>
          <label class="login-field" for="businessPixPaymentUrl">
            <span>Link de pagamento</span>
            <input id="businessPixPaymentUrl" type="url" value="${escapeHtml(businessPixInfo.paymentUrl)}" placeholder="https://..." />
          </label>
          <label class="login-field business-address-field" for="businessPixCopyPasteCode">
            <span>Código Pix copia e cola</span>
            <textarea id="businessPixCopyPasteCode" rows="4" placeholder="000201...">${escapeHtml(businessPixInfo.copyPasteCode || "")}</textarea>
          </label>
          <label class="switch-field business-switch-field" for="businessPixShowInvoices">
            <input id="businessPixShowInvoices" type="checkbox" ${businessPixInfo.showInInvoices ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Exibir QR Code em faturas</span>
          </label>
          <div class="dialog-actions business-form-actions">
            <button class="ghost-action" type="button" id="generatePixQrButton">
              <span data-icon="invoice"></span>
              <span>Gerar QR Code</span>
            </button>
            <button class="primary-button" type="submit">
              <span data-icon="check"></span>
              <span>Salvar Pix</span>
            </button>
          </div>
          ${businessPixInfo.qrCodeDataUrl ? `<img class="business-pix-preview" src="${businessPixInfo.qrCodeDataUrl}" alt="QR Code Pix" />` : ""}
        </form>
      </article>

      <article class="admin-panel business-finance-settings-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Parâmetros</p>
            <h2>Regras e documentos</h2>
          </div>
        </div>
        ${renderBusinessFinanceSettingsForm()}
      </article>
    </section>
  `;

  initIcons();
  bindCurrencyInputs(container);
  bindBusinessFinanceControls(container);
  bindBusinessFinanceSettingsControls(container);
}

function getBusinessPaymentMethodChannelLabels(method) {
  return [
    method.showInService ? "Atendimento" : "",
    method.showInProductSale ? "Venda" : "",
    method.showInQuote ? "Orçamento" : "",
    method.showInInvoice ? "Fatura" : ""
  ].filter(Boolean);
}

function getBusinessPaymentMethodFeeSummary(method) {
  const parts = [];
  if (Number(method.feePercent || 0) > 0) parts.push(`${String(Number(method.feePercent || 0)).replace(".", ",")}%`);
  if (Number(method.fixedFee || 0) > 0) parts.push(formatCurrency(method.fixedFee));
  return parts.length ? parts.join(" + ") : "Sem taxa";
}

function getBusinessPaymentMethodSettlementSummary(method) {
  if (method.immediateSettlement) return "Na hora";
  const days = Math.max(0, Number(method.settlementDays || 0));
  if (days === 1) return "1 dia";
  return `${days} dias`;
}

function renderBusinessSocialScreen(container) {
  const visibleChannels = businessSocialChannels.filter((channel) => businessSocialLinks[channel.key]?.showInFooter).length;
  container.innerHTML = `
    <section class="screen-metrics business-metrics" aria-label="Resumo de comunicação">
      ${[
        { label: "Canais", value: businessSocialChannels.length, icon: "users" },
        { label: "No relatório", value: visibleChannels, icon: "invoice" },
        { label: "WhatsApp", value: businessSocialLinks.whatsapp?.value ? "Configurado" : "Pendente", icon: "card" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <article class="admin-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Comunicação</p>
          <h2>Canais do negócio</h2>
        </div>
      </div>
      <form class="business-social-grid" id="businessSocialForm">
        ${businessSocialChannels
          .map((channel) => {
            const item = businessSocialLinks[channel.key] || { value: "", showInFooter: false, reportTarget: "all" };
            const socialId = capitalize(channel.key);
            return `
              <section class="business-social-card">
                <label class="login-field" for="businessSocial${socialId}">
                  <span>${escapeHtml(channel.label)}</span>
                  <input id="businessSocial${socialId}" data-social-value="${channel.key}" type="text" value="${escapeHtml(item.value)}" placeholder="${escapeHtml(channel.placeholder)}" />
                </label>
                <label class="switch-field" for="businessSocialShow${socialId}">
                  <input id="businessSocialShow${socialId}" data-social-report="${channel.key}" type="checkbox" ${item.showInFooter ? "checked" : ""} />
                  <span class="switch-control"></span>
                  <span>Inserir no relatório</span>
                </label>
                <label class="login-field business-social-report-field" for="businessSocialReport${socialId}">
                  <span>Relatório</span>
                  <select id="businessSocialReport${socialId}" data-social-report-target="${channel.key}" ${item.showInFooter ? "" : "disabled"}>
                    ${renderBusinessSocialReportTargetOptions(item.reportTarget)}
                  </select>
                </label>
              </section>
            `;
          })
          .join("")}
        <div class="dialog-actions business-form-actions">
          <button class="primary-button" type="submit">
            <span data-icon="check"></span>
            <span>Salvar canais</span>
          </button>
        </div>
      </form>
    </article>
  `;

  initIcons();
  bindBusinessSocialControls(container);
}

function bindBusinessSocialControls(container) {
  $("#businessSocialWhatsapp", container)?.addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $$("[data-social-report]", container).forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const targetSelect = $(`[data-social-report-target="${event.currentTarget.dataset.socialReport}"]`, container);
      if (targetSelect) targetSelect.disabled = !event.currentTarget.checked;
    });
  });
  $("#businessSocialForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    businessSocialChannels.forEach((channel) => {
      const reportTargetSelect = $(`[data-social-report-target="${channel.key}"]`, container);
      businessSocialLinks[channel.key] = {
        value: $(`[data-social-value="${channel.key}"]`, container).value.trim(),
        showInFooter: $(`[data-social-report="${channel.key}"]`, container).checked,
        reportTarget: getBusinessSocialReportTarget(reportTargetSelect?.value || "all")
      };
    });
    saveBusinessStorageItem(businessStorageKeys.social, businessSocialLinks);
    renderBusinessSocialScreen(container);
    showToast("Comunicação salva.");
  });
}

function renderBusinessMessagesScreen(container) {
  const selectedTemplate = getSelectedMessageTemplate();
  const sample = getMessageSampleContext();
  const categories = [...new Set(businessMessageTemplates.map((template) => template.category))];
  if (!selectedMessageCategory || !categories.includes(selectedMessageCategory)) selectedMessageCategory = selectedTemplate.category || categories[0] || "";
  const categoryTemplates = businessMessageTemplates.filter((template) => template.category === selectedMessageCategory);
  if (!categoryTemplates.some((template) => template.key === selectedTemplate.key) && categoryTemplates.length) {
    selectedMessageTemplateKey = categoryTemplates[0].key;
    renderBusinessMessagesScreen(container);
    return;
  }

  container.innerHTML = `
    <section class="screen-metrics business-metrics" aria-label="Resumo da central de mensagens">
      ${[
        { label: "Modelos", value: businessMessageTemplates.length, icon: "message" },
        { label: "Ativos", value: businessMessageTemplates.filter((template) => template.active).length, icon: "check" },
        { label: "Naturezas", value: categories.length, icon: "dashboard" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="message-center-layout">
      <article class="admin-panel message-template-list-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Natureza</p>
            <h2>Modelos configurados</h2>
          </div>
        </div>
        <label class="login-field" for="messageCategorySelect">
          <span>Natureza da mensagem</span>
          <select id="messageCategorySelect">
            ${categories.map((category) => `<option value="${escapeHtml(category)}" ${category === selectedMessageCategory ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}
          </select>
        </label>
        <div class="message-template-list">
          ${categoryTemplates
            .map(
              (template) => `
                <button class="message-template-button ${template.key === selectedTemplate.key ? "is-active" : ""}" type="button" data-message-template="${escapeHtml(template.key)}">
                  <strong>${escapeHtml(template.title)}</strong>
                  <small>${escapeHtml(getMessageTriggerLabel(template.key))}</small>
                  <span class="message-template-status ${template.active ? "is-active" : ""}">${template.active ? "Ativa" : "Inativa"}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </article>

      <article class="admin-panel message-editor-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${escapeHtml(getMessageTriggerLabel(selectedTemplate.key))}</p>
            <h2>${escapeHtml(selectedTemplate.title)}</h2>
          </div>
        </div>
        <form class="business-form-grid message-editor-form" id="messageTemplateForm">
          <label class="switch-field message-active-switch" for="messageTemplateActive">
            <input id="messageTemplateActive" type="checkbox" ${selectedTemplate.active ? "checked" : ""} />
            <span class="switch-control"></span>
            <span>Mensagem ativa para envio automático</span>
          </label>
          <label class="login-field" for="messageTemplateTitle">
            <span>Título interno</span>
            <input id="messageTemplateTitle" type="text" value="${escapeHtml(selectedTemplate.title)}" required />
          </label>
          <label class="login-field message-template-text-field" for="messageTemplateText">
            <span>Mensagem</span>
            <textarea id="messageTemplateText" rows="7" required>${escapeHtml(selectedTemplate.text)}</textarea>
          </label>
          <div class="message-format-toolbar" aria-label="Formatação WhatsApp">
            <button class="icon-button message-format-button" type="button" data-message-format="bold" title="Negrito">B</button>
            <button class="icon-button message-format-button" type="button" data-message-format="italic" title="Itálico">I</button>
            <button class="icon-button message-format-button" type="button" data-message-format="strike" title="Riscado">S</button>
            <button class="ghost-action message-format-mono" type="button" data-message-format="mono">Mono</button>
          </div>
          <section class="message-token-panel" aria-label="Dados disponiveis para a mensagem">
            <div class="message-token-header">
              <strong>Dados disponíveis</strong>
              <div class="message-token-picker">
                <select id="messageTokenSelect" aria-label="Adicionar outro dado">
                  ${getMessageTokenOptions()
                    .map((token) => `<option value="${escapeHtml(token.key)}">${escapeHtml(token.label)} - {${escapeHtml(token.key)}}</option>`)
                    .join("")}
                </select>
                <button class="ghost-action compact" id="insertSelectedMessageToken" type="button">
                  <span data-icon="plus"></span>
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
            <div class="message-token-help">
              ${getMessageTokenOptions()
                .map(
                  (token) => `
                    <button class="message-token-chip" type="button" data-message-token="${escapeHtml(token.key)}" title="${escapeHtml(token.description)}">
                      <span>${escapeHtml(token.label)}</span>
                      <code>{${escapeHtml(token.key)}}</code>
                    </button>
                  `
                )
                .join("")}
            </div>
          </section>
          <article class="message-preview-card">
            <span>Prévia</span>
            <p id="messagePreviewText">${renderWhatsappPreview(applyMessageTemplateTokens(selectedTemplate.text, sample))}</p>
          </article>
          <div class="dialog-actions message-actions">
            <button class="primary-button" type="submit">
              <span data-icon="check"></span>
              <span>Salvar modelo</span>
            </button>
          </div>
        </form>
      </article>
    </section>
  `;

  initIcons();
  bindBusinessMessagesControls(container);
}

function bindBusinessMessagesControls(container) {
  $("#messageCategorySelect", container)?.addEventListener("change", (event) => {
    selectedMessageCategory = event.currentTarget.value;
    selectedMessageTemplateKey = businessMessageTemplates.find((template) => template.category === selectedMessageCategory)?.key || "";
    renderBusinessMessagesScreen(container);
  });
  $$("[data-message-template]", container).forEach((button) => {
    button.addEventListener("click", () => {
      selectedMessageTemplateKey = button.dataset.messageTemplate;
      renderBusinessMessagesScreen(container);
    });
  });

  $("#messageTemplateText", container)?.addEventListener("input", () => updateMessagePreview(container));
  $("#messageTemplateTitle", container)?.addEventListener("input", () => updateMessagePreview(container));
  $$("[data-message-token]", container).forEach((button) => {
    button.addEventListener("click", () => insertMessageToken(container, button.dataset.messageToken));
  });
  $("#insertSelectedMessageToken", container)?.addEventListener("click", () => {
    insertMessageToken(container, $("#messageTokenSelect", container)?.value || "");
  });
  $$("[data-message-format]", container).forEach((button) => {
    button.addEventListener("click", () => applyWhatsappFormattingToEditor(container, button.dataset.messageFormat));
  });
  $("#messageTemplateForm", container)?.addEventListener("submit", (event) => {
    event.preventDefault();
    const template = getSelectedMessageTemplate();
    template.title = $("#messageTemplateTitle", container).value.trim();
    template.text = $("#messageTemplateText", container).value.trim();
    template.active = $("#messageTemplateActive", container).checked;
    saveBusinessStorageItem(businessStorageKeys.messages, businessMessageTemplates);
    renderBusinessMessagesScreen(container);
    showToast("Modelo de mensagem salvo.");
  });
}

function getMessageTokenOptions() {
  return [
    { key: "cliente", label: "Cliente", description: "Nome do cliente do atendimento, fatura ou cadastro." },
    { key: "telefone", label: "Telefone", description: "Telefone do cliente." },
    { key: "documento", label: "Documento", description: "CPF, CNPJ ou documento cadastrado." },
    { key: "email", label: "Email", description: "Email cadastrado para o cliente." },
    { key: "empresa", label: "Empresa", description: "Nome Fantasia cadastrado em Dados do Negócio." },
    { key: "placa", label: "Placa", description: "Placa do veículo." },
    { key: "veiculo", label: "Veículo", description: "Marca e modelo do veículo." },
    { key: "modelo", label: "Modelo", description: "Modelo do veículo." },
    { key: "cor", label: "Cor", description: "Cor do veículo." },
    { key: "tipo_veiculo", label: "Tipo", description: "Tipo do veículo." },
    { key: "categoria_veiculo", label: "Categoria", description: "Categoria do veículo." },
    { key: "servico", label: "Serviço", description: "Serviço ou descrição financeira." },
    { key: "valor", label: "Valor", description: "Valor principal da operação." },
    { key: "valor_pago", label: "Valor pago", description: "Valor recebido em pagamentos parciais." },
    { key: "saldo", label: "Saldo", description: "Saldo remanescente em aberto." },
    { key: "pagamento", label: "Forma de pagamento", description: "Meio de pagamento usado ou previsto." },
    { key: "fatura", label: "Fatura", description: "Código da fatura." },
    { key: "destino", label: "Destino do saldo", description: "Destino escolhido para saldo remanescente." },
    { key: "data", label: "Data", description: "Data do evento ou agendamento." },
    { key: "hora", label: "Hora", description: "Hora do evento ou agendamento." },
    { key: "vencimento", label: "Vencimento", description: "Data de vencimento quando houver." },
    { key: "operador", label: "Operador", description: "Operador ou administrador responsável." },
    { key: "promocao", label: "Promoção", description: "Texto de promoção configurado para relacionamento." }
  ];
}

function getSelectedMessageTemplate() {
  if (!businessMessageTemplates.length) {
    businessMessageTemplates = getDefaultMessageTemplates();
    saveBusinessStorageItem(businessStorageKeys.messages, businessMessageTemplates);
  }
  if (!selectedMessageTemplateKey || !businessMessageTemplates.some((template) => template.key === selectedMessageTemplateKey)) {
    selectedMessageTemplateKey = businessMessageTemplates[0]?.key || "";
  }
  return businessMessageTemplates.find((template) => template.key === selectedMessageTemplateKey) || businessMessageTemplates[0];
}

function updateMessagePreview(container) {
  const sample = getMessageSampleContext();
  $("#messagePreviewText", container).innerHTML = renderWhatsappPreview(applyMessageTemplateTokens($("#messageTemplateText", container)?.value || "", sample));
}

function insertMessageToken(container, key) {
  const textarea = $("#messageTemplateText", container);
  if (!textarea || !key) return;
  const token = `{${key}}`;
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  const prefix = before && !/[\s\n([{]$/.test(before) ? " " : "";
  const suffix = after && !/^[\s\n,.;:!?)}\]]/.test(after) ? " " : "";
  const insertion = `${prefix}${token}${suffix}`;
  textarea.value = `${before}${insertion}${after}`;
  const nextPosition = start + insertion.length;
  textarea.focus();
  textarea.setSelectionRange(nextPosition, nextPosition);
  updateMessagePreview(container);
}

function applyWhatsappFormattingToEditor(container, format) {
  const textarea = $("#messageTemplateText", container);
  if (!textarea) return;
  const wrappers = {
    bold: ["*", "*"],
    italic: ["_", "_"],
    strike: ["~", "~"],
    mono: ["```", "```"]
  };
  const [prefix, suffix] = wrappers[format] || ["", ""];
  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  const selected = textarea.value.slice(start, end) || "texto";
  const replacement = `${prefix}${selected}${suffix}`;
  textarea.value = `${textarea.value.slice(0, start)}${replacement}${textarea.value.slice(end)}`;
  textarea.focus();
  textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
  updateMessagePreview(container);
}

function renderWhatsappPreview(text) {
  let html = escapeHtml(text);
  html = html.replace(/```([^`]+)```/g, "<code>$1</code>");
  html = html.replace(/\*([^*\n]+)\*/g, "<strong>$1</strong>");
  html = html.replace(/_([^_\n]+)_/g, "<em>$1</em>");
  html = html.replace(/~([^~\n]+)~/g, "<s>$1</s>");
  return html.replace(/\n/g, "<br />");
}

function getMessageSampleContext(phone = "") {
  const vehicle = patioVehicles.find((item) => ["aguardando", "lavando", "pronto"].includes(item.status)) || patioVehicles[0] || {};
  const sampleClient = clientRegistry[0] || {};
  return {
    cliente: vehicle.owner || "Cliente",
    telefone: phone || vehicle.phone || businessSocialLinks.whatsapp?.value || "",
    documento: sampleClient.document || "000.000.000-00",
    email: sampleClient.email || businessProfile.email || "",
    empresa: getBusinessMessageCompanyName(),
    placa: vehicle.plate || "ABC1D23",
    veiculo: formatVehicleDisplayName(vehicle),
    modelo: vehicle.model || "Modelo",
    cor: vehicle.color || "Branco",
    tipo_veiculo: vehicle.type || "Carro",
    categoria_veiculo: vehicle.category || "Hatch",
    servico: vehicle.service || "Lavagem Prime",
    valor: formatCurrency(getVehiclePaymentTotal(vehicle) || getServicePrice(vehicle) || 0),
    valor_pago: formatCurrency(vehicle.partialPaidAmount || 100),
    saldo: formatCurrency(vehicle.partialBalance || 80),
    fatura: "FAT-0626-001",
    destino: "pagamento em aberto",
    pagamento: vehicle.payment || "Pix",
    data: vehicle.scheduledDate ? formatDateBR(vehicle.scheduledDate) : formatDateBR(getTodayISO()),
    hora: vehicle.scheduledTime || vehicle.entry || getCurrentShortTime(),
    vencimento: formatDateBR(getTodayISO()),
    operador: activeSessionUser || "Administrador",
    promocao: "promoção vigente",
    phone: phone || vehicle.phone || businessSocialLinks.whatsapp?.value || ""
  };
}

function getMessageContextFromVehicle(vehicle) {
  const registryVehicle = findVehicleByPlate(vehicle.plate);
  const linkedClient = registryVehicle?.currentClientId ? getClientById(registryVehicle.currentClientId) : findClientByPlate(vehicle.plate);
  return {
    cliente: vehicle.owner || "Cliente",
    telefone: vehicle.phone || linkedClient?.phone || "",
    documento: linkedClient?.document || "",
    email: linkedClient?.email || "",
    empresa: getBusinessMessageCompanyName(),
    placa: vehicle.plate || "",
    veiculo: formatVehicleDisplayName(vehicle),
    modelo: vehicle.model || registryVehicle?.model || "",
    cor: vehicle.color || registryVehicle?.color || "",
    tipo_veiculo: vehicle.type || registryVehicle?.type || "",
    categoria_veiculo: vehicle.category || registryVehicle?.category || "",
    servico: vehicle.service || "",
    valor: formatCurrency(getVehiclePaymentTotal(vehicle)),
    valor_pago: formatCurrency(vehicle.partialPaidAmount || 0),
    saldo: formatCurrency(vehicle.partialBalance || 0),
    fatura: vehicle.billing?.invoiceCode || "",
    destino: vehicle.partialPaymentOpen ? "pagamento em aberto" : "",
    pagamento: vehicle.payment || "",
    data: vehicle.scheduledDate ? formatDateBR(vehicle.scheduledDate) : formatDateBR(getTodayISO()),
    hora: vehicle.scheduledTime || vehicle.entry || getCurrentShortTime(),
    vencimento: vehicle.billing?.dueDate ? formatDateBR(vehicle.billing.dueDate) : formatDateBR(getTodayISO()),
    operador: vehicle.operator || activeSessionUser || "",
    promocao: "promoção vigente",
    phone: vehicle.phone || ""
  };
}

function getMessageContextFromOpenPayment(payment) {
  const registryClient = payment.clientId ? getClientById(payment.clientId) : null;
  const registryVehicle = payment.plate ? findVehicleByPlate(payment.plate) : null;
  return {
    cliente: payment.clientName || "Cliente",
    telefone: payment.phone || registryClient?.phone || "",
    documento: registryClient?.document || "",
    email: registryClient?.email || "",
    empresa: getBusinessMessageCompanyName(),
    placa: payment.plate || "",
    veiculo: registryVehicle ? formatVehicleDisplayName(registryVehicle) : "",
    modelo: registryVehicle?.model || "",
    cor: registryVehicle?.color || "",
    tipo_veiculo: registryVehicle?.type || "",
    categoria_veiculo: registryVehicle?.category || "",
    servico: payment.description || payment.service || "",
    valor: formatCurrency(payment.value || 0),
    valor_pago: formatCurrency(payment.settledAmount || payment.paidAmount || 0),
    saldo: formatCurrency(payment.remainingBalance || payment.value || 0),
    fatura: getOpenPaymentInvoiceCode(payment),
    destino: payment.partialSettlement ? "novo pagamento em aberto" : "pagamento em aberto",
    pagamento: formatSettlementPaymentLabel(payment),
    data: formatDateBR(getTodayISO()),
    hora: getCurrentShortTime(),
    vencimento: payment.dueDate ? formatDateBR(payment.dueDate) : formatDateBR(getTodayISO()),
    operador: payment.operator || payment.settledBy || activeSessionUser || "",
    promocao: "promoção vigente",
    phone: payment.phone || ""
  };
}

function getMessageContextFromInvoice(invoice) {
  const billingClient = billingClients.find((client) => client.id === Number(invoice.clientId));
  const registryClient = getRegistryClientByBillingClientId(invoice.clientId);
  const primaryLine = invoiceLineItems.find((item) => item.invoiceId === invoice.id);
  const registryVehicle = primaryLine?.plate ? findVehicleByPlate(primaryLine.plate) : null;
  return {
    cliente: billingClient?.name || "Cliente",
    telefone: billingClient?.phone || registryClient?.phone || "",
    documento: billingClient?.document || registryClient?.document || "",
    email: registryClient?.email || "",
    empresa: getBusinessMessageCompanyName(),
    placa: primaryLine?.plate || "",
    veiculo: registryVehicle ? formatVehicleDisplayName(registryVehicle) : "",
    modelo: registryVehicle?.model || "",
    cor: registryVehicle?.color || "",
    tipo_veiculo: registryVehicle?.type || "",
    categoria_veiculo: registryVehicle?.category || "",
    servico: "Fatura",
    valor: formatCurrency(getInvoiceDisplayAmount(invoice)),
    valor_pago: formatCurrency(invoice.settledAmount || getInvoiceDisplayAmount(invoice)),
    saldo: formatCurrency(invoice.remainingBalance || 0),
    fatura: invoice.code || "",
    destino: getInvoiceRemainingDestinationLabel(invoice),
    pagamento: formatSettlementPaymentLabel(invoice) || "Faturado",
    data: formatDateBR(getTodayISO()),
    hora: getCurrentShortTime(),
    vencimento: formatDateBR(invoice.dueDate),
    operador: invoice.settledBy || invoice.approvedBy || activeSessionUser || "",
    promocao: "promoção vigente",
    phone: billingClient?.phone || ""
  };
}

function getOpenPaymentInvoiceCode(payment) {
  if (payment?.invoiceCode) return payment.invoiceCode;
  const invoice = payment?.invoiceId ? billingInvoices.find((item) => item.id === Number(payment.invoiceId)) : null;
  return invoice?.code || "";
}

function getInvoiceRemainingDestinationLabel(invoice) {
  if (!invoice?.partialSettlement) return "";
  if (invoice.remainingDestinationLabel) return invoice.remainingDestinationLabel;
  const labels = {
    "new-invoice": "nova fatura",
    "existing-invoice": "fatura em aberto",
    "open-payment": "pagamento em aberto"
  };
  return labels[invoice.remainingDestination] || "destino escolhido";
}

function getMessageContextFromClient(client, plate = "") {
  const selectedPlate = plate || client.plates?.[0] || "";
  const vehicle = selectedPlate ? findVehicleByPlate(selectedPlate) : null;
  const lastService = vehicle?.serviceHistory?.[vehicle.serviceHistory.length - 1];
  return {
    cliente: getClientDisplayName(client),
    telefone: client.phone || "",
    documento: client.document || "",
    email: client.email || "",
    empresa: getBusinessMessageCompanyName(),
    placa: selectedPlate,
    veiculo: vehicle ? formatVehicleDisplayName(vehicle) : "",
    modelo: vehicle?.model || "",
    cor: vehicle?.color || "",
    tipo_veiculo: vehicle?.type || "",
    categoria_veiculo: vehicle?.category || "",
    servico: lastService?.service || "serviço",
    valor: lastService?.value ? formatCurrency(lastService.value) : formatCurrency(0),
    valor_pago: "",
    saldo: "",
    fatura: "",
    destino: "",
    pagamento: "",
    data: formatDateBR(getTodayISO()),
    hora: getCurrentShortTime(),
    vencimento: formatDateBR(getTodayISO()),
    operador: activeSessionUser || "",
    promocao: "promoção vigente",
    phone: client.phone || ""
  };
}

function formatSettlementPaymentLabel(record) {
  const method = record?.settlementMethod || record?.paymentMethod || record?.payment || "";
  const bankAccount = record?.settlementBankAccountName || record?.bankAccountName || "";
  if (!method) return "";
  return bankAccount ? `${method} - ${bankAccount}` : method;
}

function applyMessageTemplateTokens(text, context) {
  return String(text || "").replace(/\{(\w+)\}/g, (_, key) => context[key] || "");
}

function getMessageTemplateByKey(key) {
  return businessMessageTemplates.find((template) => template.key === key);
}

function triggerAutomatedMessage(key, context) {
  const template = getMessageTemplateByKey(key);
  if (!template?.active) return false;
  return openWhatsappTemplateMessage(template, context);
}

function sendManualMessage(key, context) {
  const template = getMessageTemplateByKey(key);
  if (!template) return false;
  return openWhatsappTemplateMessage(template, context);
}

function openWhatsappTemplateMessage(template, context) {
  const phone = normalizeWhatsappPhone(context?.phone || "");
  if (!phone) {
    showToast("Mensagem ativa, mas o cliente não possui telefone cadastrado.");
    return false;
  }
  const text = applyMessageTemplateTokens(template.text || "", context || {});
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noreferrer");
  return true;
}

function normalizeWhatsappPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("55") ? digits : `55${digits}`;
}

function renderClientsScreen(container) {
  container.innerHTML = `
    <section class="screen-metrics client-metrics" aria-label="Resumo de clientes">
      ${[
        { label: "Clientes ativos", value: clientRegistry.length, icon: "users" },
        { label: "Avulsos", value: clientRegistry.filter((client) => !client.billing).length, icon: "user" },
        { label: "Faturados", value: clientRegistry.filter((client) => client.billing).length, icon: "invoice" },
        { label: "Placas vinculadas", value: getRegisteredPlates().length, icon: "carFront" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="screen-toolbar" aria-label="Filtros de clientes">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.users}</span>
        <input id="clientSearchInput" type="search" placeholder="Buscar cliente ou placa" />
      </label>
      <div class="screen-filters" id="clientFilters">
        <button class="is-active" type="button" data-client-filter="all">Todos</button>
        <button type="button" data-client-filter="avulso">Avulsos</button>
        <button type="button" data-client-filter="faturado">Faturados</button>
        <button type="button" data-client-filter="PF">PF</button>
        <button type="button" data-client-filter="PJ">PJ</button>
      </div>
    </section>

    <article class="admin-panel screen-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Base</p>
          <h2>Clientes cadastrados</h2>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table client-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Cadastro</th>
              <th>Telefone</th>
              <th>Documento</th>
              <th>Faturamento</th>
              <th>Placas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="clientTableBody">
            ${renderClientRows()}
          </tbody>
        </table>
      </div>
    </article>
  `;

  initIcons();
  bindClientsScreenControls(container);
}

function renderOperatorsScreen(container) {
  const selectedOperator = getSelectedReportOperator();
  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo da equipe">
      ${[
        { label: "Operadores ativos", value: adminOperators.filter((operator) => operator.status === "Ativo").length, icon: "badge" },
        { label: "Serviços hoje", value: adminOperators.reduce((total, operator) => total + Number(operator.today || 0), 0), icon: "service" },
        { label: "Comissão prevista", value: formatCurrency(getOperatorsCommissionTotal()), icon: "wallet" },
        { label: "Perfis com acesso", value: adminOperators.length, icon: "users" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="screen-toolbar" aria-label="Filtros da equipe">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.badge}</span>
        <input id="operatorSearchInput" type="search" placeholder="Buscar operador, login ou função" />
      </label>
      <div class="screen-filters" id="operatorFilters">
        <button class="is-active" type="button" data-operator-filter="all">Todos</button>
        <button type="button" data-operator-filter="Ativo">Ativos</button>
        <button type="button" data-operator-filter="Operador">Operadores</button>
        <button type="button" data-operator-filter="Administrador">Administradores</button>
      </div>
    </section>

    <section class="admin-screen-grid">
      <article class="admin-panel screen-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Equipe</p>
            <h2>Operadores e usuários</h2>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table operator-table">
            <thead>
              <tr>
                <th>Operador</th>
                <th>Perfil</th>
                <th>Login</th>
                <th>Telefone</th>
                <th>Comissão</th>
                <th>Produção</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="operatorTableBody">
              ${renderOperatorRows()}
            </tbody>
          </table>
        </div>
      </article>

      <article class="admin-panel operator-form-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Relatórios</p>
            <h2>Acompanhamento individual</h2>
          </div>
        </div>

        <label class="login-field operator-report-selector" for="operatorReportSelect">
          <span>Operador selecionado</span>
          <select id="operatorReportSelect">
            ${adminOperators
              .map(
                (operator) =>
                  `<option value="${escapeHtml(operator.id)}" ${operator.id === selectedOperator?.id ? "selected" : ""}>${escapeHtml(
                    operator.name
                  )}</option>`
              )
              .join("")}
          </select>
        </label>

        <div class="operator-report-actions">
          <button class="ghost-action" type="button" data-operator-report="production" ${selectedOperator ? "" : "disabled"}>
            <span data-icon="clipboard"></span>
            <span>Relatório de produção</span>
          </button>
          <button class="ghost-action" type="button" data-operator-report="commission" ${selectedOperator ? "" : "disabled"}>
            <span data-icon="wallet"></span>
            <span>Relatório de comissão</span>
          </button>
          <button class="ghost-action" type="button" data-operator-report="attendance" ${selectedOperator ? "" : "disabled"}>
            <span data-icon="clock"></span>
            <span>Relatório de frequência</span>
          </button>
        </div>

        ${renderOperatorHistoryPanel(selectedOperator)}
      </article>
    </section>
  `;

  initIcons();
  bindOperatorsScreenControls(container);
}

function bindOperatorsScreenControls(container) {
  $("#operatorSearchInput", container)?.addEventListener("input", () => applyOperatorTableFilter(container));

  $$("[data-operator-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-operator-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyOperatorTableFilter(container);
    });
  });

  $$("[data-edit-operator]", container).forEach((button) => {
    button.addEventListener("click", () => openOperatorDialog(Number(button.dataset.editOperator)));
  });

  $("#operatorReportSelect", container)?.addEventListener("change", (event) => {
    selectedReportOperatorId = Number(event.currentTarget.value || 0) || null;
    renderOperatorsScreen(container);
  });

  $$("[data-operator-report]", container).forEach((button) => {
    button.addEventListener("click", () => emitOperatorReport(button.dataset.operatorReport));
  });
}

function bindClientsScreenControls(container) {
  $("#clientSearchInput", container).addEventListener("input", () => applyClientTableFilter(container));
  $$("[data-edit-client]", container).forEach((button) => {
    button.addEventListener("click", () => editClientRegistration(container, Number(button.dataset.editClient)));
  });
  $$("[data-open-client-message-dialog]", container).forEach((button) => {
    button.addEventListener("click", () => openClientMessageDialog(Number(button.dataset.openClientMessageDialog)));
  });
  $$("[data-client-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-client-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyClientTableFilter(container);
    });
  });
}

function sendClientRelationshipMessage(key, clientId, plate = "") {
  const client = getClientById(clientId);
  if (!client) return;
  return sendManualMessage(key, getMessageContextFromClient(client, plate));
}

function openClientMessageDialog(clientId) {
  const client = getClientById(clientId);
  if (!client) {
    showToast("Cliente não localizado.");
    return;
  }

  selectedClientMessageClientId = client.id;
  selectedClientMessagePlate = client.plates?.[0] || "";
  const categories = getClientMessageCategories();
  selectedClientMessageCategory = categories.includes("Relacionamento com o cliente")
    ? "Relacionamento com o cliente"
    : categories[0] || "";
  selectedClientMessageTemplateKey = "";

  const dialog = $("#clientMessageDialog");
  if (!dialog) return;
  renderClientMessageDialog(dialog);
  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeClientMessageDialog() {
  const dialog = $("#clientMessageDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedClientMessageClientId = null;
  selectedClientMessagePlate = "";
  selectedClientMessageCategory = "";
  selectedClientMessageTemplateKey = "";
}

function getClientMessageCategories() {
  return [...new Set(businessMessageTemplates.map((template) => template.category).filter(Boolean))];
}

function getClientMessageTemplatesByCategory(category) {
  return businessMessageTemplates.filter((template) => template.category === category);
}

function syncClientMessageDialogSelection(client) {
  const categories = getClientMessageCategories();
  if (!selectedClientMessageCategory || !categories.includes(selectedClientMessageCategory)) {
    selectedClientMessageCategory = categories.includes("Relacionamento com o cliente")
      ? "Relacionamento com o cliente"
      : categories[0] || "";
  }

  const templates = getClientMessageTemplatesByCategory(selectedClientMessageCategory);
  if (!selectedClientMessageTemplateKey || !templates.some((template) => template.key === selectedClientMessageTemplateKey)) {
    selectedClientMessageTemplateKey = templates[0]?.key || "";
  }

  const plates = client.plates?.filter(Boolean) || [];
  if (!plates.length) {
    selectedClientMessagePlate = "";
    return;
  }
  if (!plates.includes(selectedClientMessagePlate)) selectedClientMessagePlate = plates[0];
}

function renderClientMessageDialog(dialog = $("#clientMessageDialog")) {
  const client = selectedClientMessageClientId ? getClientById(selectedClientMessageClientId) : null;
  if (!dialog || !client) return;
  syncClientMessageDialogSelection(client);
  const templates = getClientMessageTemplatesByCategory(selectedClientMessageCategory);
  const template = templates.find((item) => item.key === selectedClientMessageTemplateKey) || templates[0] || null;
  const preview = template ? applyMessageTemplateTokens(template.text || "", getMessageContextFromClient(client, selectedClientMessagePlate)) : "Nenhuma mensagem disponível.";

  dialog.innerHTML = `
    <form class="message-box client-message-box" id="clientMessageForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Cadastro de clientes</p>
          <h2>${escapeHtml(getClientDisplayName(client))}</h2>
        </div>
        <button class="icon-button" id="closeClientMessageDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <article class="schedule-selected-card client-message-summary">
        <span>Telefone</span>
        <strong>${escapeHtml(client.phone || "Não informado")}</strong>
        <p>${escapeHtml(client.plates?.length ? `${client.plates.length} placa(s) vinculada(s)` : "Sem placa vinculada no cadastro.")}</p>
      </article>

      <div class="business-form-grid client-message-form">
        <label class="login-field" for="clientMessagePlateSelect">
          <span>Placa de referência</span>
          <select id="clientMessagePlateSelect">
            ${renderClientMessagePlateOptions(client)}
          </select>
        </label>
        <label class="login-field" for="clientMessageCategorySelect">
          <span>Natureza da mensagem</span>
          <select id="clientMessageCategorySelect">
            ${renderSelectOptions(getClientMessageCategories(), selectedClientMessageCategory)}
          </select>
        </label>
        <label class="login-field client-message-template-field" for="clientMessageTemplateSelect">
          <span>Mensagem</span>
          <select id="clientMessageTemplateSelect" ${template ? "" : "disabled"}>
            ${renderClientMessageTemplateOptions(templates, selectedClientMessageTemplateKey)}
          </select>
        </label>
      </div>

      <article class="message-preview-card">
        <span>Prévia da mensagem</span>
        <p id="clientMessagePreviewText">${renderWhatsappPreview(preview)}</p>
      </article>

      <div class="dialog-actions message-actions">
        <button class="exit-button" id="cancelClientMessageDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit" ${template ? "" : "disabled"}>
          <span data-icon="message"></span>
          <span>Abrir WhatsApp</span>
        </button>
      </div>
    </form>
  `;

  initIcons();
  bindClientMessageDialogControls(dialog);
}

function renderClientMessagePlateOptions(client) {
  const plates = client.plates?.filter(Boolean) || [];
  if (!plates.length) return '<option value="">Sem placa vinculada</option>';
  return plates
    .map((plate) => {
      const vehicle = findVehicleByPlate(plate);
      const label = vehicle ? `${plate} - ${formatVehicleDisplayName(vehicle)}` : plate;
      return `<option value="${escapeHtml(plate)}" ${plate === selectedClientMessagePlate ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderClientMessageTemplateOptions(templates, selectedKey) {
  if (!templates.length) return '<option value="">Nenhuma mensagem disponível</option>';
  return templates
    .map(
      (template) =>
        `<option value="${escapeHtml(template.key)}" ${template.key === selectedKey ? "selected" : ""}>${escapeHtml(template.title)}</option>`
    )
    .join("");
}

function bindClientMessageDialogControls(dialog) {
  $("#closeClientMessageDialog", dialog)?.addEventListener("click", closeClientMessageDialog);
  $("#cancelClientMessageDialog", dialog)?.addEventListener("click", closeClientMessageDialog);
  $("#clientMessagePlateSelect", dialog)?.addEventListener("change", (event) => {
    selectedClientMessagePlate = event.currentTarget.value;
    renderClientMessageDialog(dialog);
  });
  $("#clientMessageCategorySelect", dialog)?.addEventListener("change", (event) => {
    selectedClientMessageCategory = event.currentTarget.value;
    selectedClientMessageTemplateKey = "";
    renderClientMessageDialog(dialog);
  });
  $("#clientMessageTemplateSelect", dialog)?.addEventListener("change", (event) => {
    selectedClientMessageTemplateKey = event.currentTarget.value;
    renderClientMessageDialog(dialog);
  });
  $("#clientMessageForm", dialog)?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitClientMessageDialog();
  });
}

function submitClientMessageDialog() {
  const client = selectedClientMessageClientId ? getClientById(selectedClientMessageClientId) : null;
  if (!client || !selectedClientMessageTemplateKey) return;
  const sent = sendClientRelationshipMessage(selectedClientMessageTemplateKey, client.id, selectedClientMessagePlate);
  if (!sent) return;
  closeClientMessageDialog();
  showToast("Mensagem aberta no WhatsApp.");
}

function bindClientDialogControls(container) {
  $("#closeClientDialog", container).addEventListener("click", closeClientDialog);
  $$("[data-client-type]", container).forEach((button) => {
    button.addEventListener("click", () => {
      selectedClientPersonType = button.dataset.clientType;
      updateClientFormMode(container);
    });
  });

  $("#clientBilling", container).addEventListener("change", () => updateClientFormMode(container));
  $("#clientBillingApproved", container).addEventListener("change", () => updateClientFormMode(container));
  $("#clientPhone", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $("#clientCpf", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatCpf(event.currentTarget.value);
  });
  $("#clientCnpj", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatCnpj(event.currentTarget.value);
  });
  $("#clientPlateInput", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatPlate(event.currentTarget.value);
  });
  $("#clientPlateInput", container).addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addClientPlate(container);
  });
  $("#addClientPlateButton", container).addEventListener("click", () => addClientPlate(container));
  $("#clearClientFormButton", container).addEventListener("click", () => resetClientForm(container));
  $("#clientForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    saveClientRegistration(container);
  });
}

function openClientDialog(clientId = null) {
  if (clientId && !canEditClientRegistrations()) {
    showMessageBox({
      title: "Edição restrita",
      message: "Somente administradores podem editar o cadastro de clientes.",
      confirmLabel: "Entendi"
    });
    return;
  }

  const client = clientId ? getClientById(clientId) : null;
  if (clientId && !client) {
    showToast("Cliente não localizado.");
    return;
  }

  selectedClientId = client?.id || null;
  selectedClientPersonType = client?.personType || "PF";
  pendingClientPlates = client ? [...client.plates] : [];

  const dialog = $("#clientDialog");
  dialog.innerHTML = renderClientDialogForm(client);
  initIcons();
  bindClientDialogControls(dialog);
  if (client) populateClientForm(dialog, client);
  else updateClientFormMode(dialog);
  renderClientPlateTags(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  window.setTimeout(focusClientForm, 0);
}

function closeClientDialog() {
  const dialog = $("#clientDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedClientId = null;
  selectedClientPersonType = "PF";
  pendingClientPlates = [];
  if (entryRegistryEditContext?.type === "client") {
    refreshLinkedRegistrationAfterEdit();
    entryRegistryEditContext = null;
  }
}

function renderClientDialogForm(client) {
  return `
    <form class="vehicle-box client-box" id="clientForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">${client ? "Edição" : "Cadastro"}</p>
          <h2>${client ? escapeHtml(getClientDisplayName(client)) : "Novo cliente"}</h2>
        </div>
        <span class="client-status-label" id="clientBillingState">${client ? "Editando" : "Avulso"}</span>
        <button class="icon-button" id="closeClientDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <div class="client-control-row">
        <div class="segmented-control" aria-label="Tipo de pessoa">
          <button class="is-active" type="button" data-client-type="PF">Pessoa física</button>
          <button type="button" data-client-type="PJ">Pessoa jurídica</button>
        </div>

        <label class="toggle-field" for="clientBilling">
          <input id="clientBilling" type="checkbox" />
          <span>Cliente faturado</span>
        </label>
      </div>

      <div class="vehicle-form-grid client-form-grid">
        <label class="login-field client-pf-name" for="clientName">
          <span>Nome</span>
          <input id="clientName" name="clientName" type="text" placeholder="Nome do cliente" />
        </label>
        <label class="login-field client-pj-name" for="clientLegalName" hidden>
          <span>Razão social</span>
          <input id="clientLegalName" name="clientLegalName" type="text" placeholder="Razão social" disabled />
        </label>
        <label class="login-field client-cpf-field" for="clientCpf" hidden>
          <span>CPF</span>
          <input id="clientCpf" name="clientCpf" type="text" inputmode="numeric" placeholder="000.000.000-00" disabled />
        </label>
        <label class="login-field client-cnpj-field" for="clientCnpj" hidden>
          <span>CNPJ</span>
          <input id="clientCnpj" name="clientCnpj" type="text" inputmode="numeric" placeholder="00.000.000/0000-00" disabled />
        </label>
        <label class="login-field" for="clientPhone">
          <span>Telefone com DDD</span>
          <input id="clientPhone" name="clientPhone" type="tel" inputmode="tel" placeholder="(11) 99999-9999" maxlength="15" required />
        </label>
        <label class="login-field client-billing-field" for="clientAddress" hidden>
          <span>Endereço</span>
          <input id="clientAddress" name="clientAddress" type="text" placeholder="Rua, número, bairro e cidade" disabled />
        </label>
        <label class="login-field client-billing-field" for="clientEmail" hidden>
          <span>Email</span>
          <input id="clientEmail" name="clientEmail" type="email" placeholder="financeiro@cliente.com.br" disabled />
        </label>
        <label class="login-field client-billing-field" for="clientResponsible" hidden>
          <span>Pessoa responsável</span>
          <input id="clientResponsible" name="clientResponsible" type="text" placeholder="Responsável pelo cadastro" disabled />
        </label>
        <label class="switch-field client-billing-field" for="clientBillingApproved" hidden>
          <input id="clientBillingApproved" name="clientBillingApproved" type="checkbox" disabled />
          <span class="switch-control" aria-hidden="true"></span>
          <span>Aprovar faturamento</span>
        </label>
        <div class="client-approval-static-field" id="clientApproverStatic" hidden>
          <span>Aprovador do faturamento</span>
          <strong id="clientApproverName">Pendente de aprovação</strong>
        </div>
        <label class="login-field client-approval-setting-field" for="clientBillingCycle" hidden>
          <span>Ciclo de faturamento</span>
          <select id="clientBillingCycle" name="clientBillingCycle" disabled>
            <option value="">Selecione</option>
            ${billingCycles.map((cycle) => `<option value="${escapeHtml(cycle)}">${escapeHtml(cycle)}</option>`).join("")}
          </select>
        </label>
        <label class="toggle-field client-approval-setting-field client-multiple-invoices-field" for="clientMultipleInvoices" hidden>
          <input id="clientMultipleInvoices" type="checkbox" disabled />
          <span>Permitir mais de uma fatura aberta</span>
        </label>
      </div>

      <div class="client-plates-field">
        <span>Placas vinculadas</span>
        <div class="plate-entry-row">
          <input id="clientPlateInput" type="text" placeholder="ABC1D23" maxlength="8" />
          <button class="ghost-action" id="addClientPlateButton" type="button">
            <span data-icon="plus"></span>
            <span>Adicionar placa</span>
          </button>
        </div>
        <div class="client-plate-tags" id="clientPlateList"></div>
      </div>

      <div class="dialog-actions">
        <button class="exit-button" id="clearClientFormButton" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>${client ? "Atualizar cliente" : "Salvar cliente"}</span>
        </button>
      </div>
    </form>
  `;
}

function updateClientFormMode(container) {
  const isPF = selectedClientPersonType === "PF";
  const isBilling = $("#clientBilling", container).checked;

  $$("[data-client-type]", container).forEach((button) => {
    const isActive = button.dataset.clientType === selectedClientPersonType;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const state = $("#clientBillingState", container);
  if (state) state.textContent = selectedClientId ? "Editando" : isBilling ? "Faturado" : "Avulso";
  setClientFieldState(container, ".client-pf-name", isPF, isPF);
  setClientFieldState(container, ".client-pj-name", !isPF, !isPF);
  setClientFieldState(container, ".client-cpf-field", isPF && isBilling, isPF && isBilling);
  setClientFieldState(container, ".client-cnpj-field", !isPF, !isPF);
  $$(".client-billing-field", container).forEach((field) => setClientFieldState(container, field, isBilling, isBilling));
  const isBillingApproved = isBilling && $("#clientBillingApproved", container).checked;
  const approverName = getClientApprovalDisplayName();
  $$(".client-approval-setting-field", container).forEach((field) => setClientFieldState(container, field, isBillingApproved, isBillingApproved));
  setClientFieldState(container, ".client-approval-static-field", isBillingApproved, false);
  $("#clientApproverName", container).textContent = isBillingApproved ? approverName : "Pendente de aprovação";
}

function setClientFieldState(container, target, isVisible, isRequired) {
  const field = typeof target === "string" ? $(target, container) : target;
  if (!field) return;
  const input = $("input, select", field);
  field.hidden = !isVisible;
  if (!input) return;
  input.disabled = !isVisible;
  input.required = input.type === "checkbox" ? false : isRequired;
  if (!isVisible) {
    if (input.type === "checkbox") input.checked = false;
    else input.value = "";
  }
}

function addClientPlate(container) {
  const input = $("#clientPlateInput", container);
  const plate = formatPlate(input.value);
  if (!plate) {
    showToast("Informe uma placa para vincular.");
    input.focus();
    return;
  }

  if (pendingClientPlates.includes(plate)) {
    showToast(`${plate} já foi adicionada a este cadastro.`);
    input.value = "";
    input.focus();
    return;
  }

  const linkedClient = getClientLinkedToPlate(plate);
  if (linkedClient && linkedClient.id !== selectedClientId) {
    showToast(`${plate} já está vinculada a ${getClientDisplayName(linkedClient)}.`);
    input.focus();
    return;
  }

  if (!findVehicleByPlate(plate)) {
    startClientVehicleRegistration(container, plate);
    return;
  }

  pendingClientPlates.push(plate);
  input.value = "";
  renderClientPlateTags(container);
  input.focus();
}

function startClientVehicleRegistration(container, plate) {
  clientVehicleRegistrationContext = { plate };
  resetVehicleForm();
  const dialog = $("#clientDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");

  openVehicleDialog("client-registration");
  $("#vehiclePlate").value = plate;
  handleEntryPlateLookup(plate);
  $("#vehicleModel").focus();
  showToast("Cadastre os dados do veículo para vincular a placa ao cliente.");
}

function reopenClientDialogAfterVehicleRegistration(completedPlate = "") {
  const dialog = $("#clientDialog");
  if (!dialog) {
    clientVehicleRegistrationContext = null;
    return;
  }

  renderClientPlateTags(dialog);
  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  const input = $("#clientPlateInput", dialog);
  if (input) {
    input.value = "";
    input.focus();
  }
  if (completedPlate) showToast(`${completedPlate} cadastrado e vinculado ao cliente.`);
  clientVehicleRegistrationContext = null;
}

function renderClientPlateTags(container) {
  const list = $("#clientPlateList", container);
  if (!list) return;

  list.innerHTML = pendingClientPlates.length
    ? pendingClientPlates
        .map(
          (plate) => `
            <span class="client-plate-chip">
              <span>${escapeHtml(plate)}</span>
              <button type="button" aria-label="Remover placa ${escapeHtml(plate)}" data-remove-client-plate="${escapeHtml(plate)}">
                ${icons.x}
              </button>
            </span>
          `
        )
        .join("")
    : '<p class="empty-plates">Nenhuma placa vinculada.</p>';

  $$("[data-remove-client-plate]", list).forEach((button) => {
    button.addEventListener("click", () => {
      pendingClientPlates = pendingClientPlates.filter((plate) => plate !== button.dataset.removeClientPlate);
      renderClientPlateTags(container);
    });
  });
}

function populateClientForm(container, client) {
  selectedClientPersonType = client.personType;
  pendingClientPlates = [...client.plates];
  $("#clientBilling", container).checked = client.billing;
  $("#clientName", container).value = client.name || "";
  $("#clientLegalName", container).value = client.legalName || "";
  $("#clientCpf", container).value = client.personType === "PF" ? client.document || "" : "";
  $("#clientCnpj", container).value = client.personType === "PJ" ? client.document || "" : "";
  $("#clientPhone", container).value = client.phone || "";
  $("#clientAddress", container).value = client.address || "";
  $("#clientEmail", container).value = client.email || "";
  $("#clientResponsible", container).value = client.responsible || "";
  $("#clientBillingApproved", container).checked = Boolean(client.billingApproved);
  $("#clientBillingCycle", container).value = client.billingCycle || "";
  $("#clientMultipleInvoices", container).checked = Boolean(client.allowMultipleOpenInvoices);
  updateClientFormMode(container);
}

async function editClientRegistration(container, clientId) {
  if (!canEditClientRegistrations()) {
    await showMessageBox({
      title: "Edição restrita",
      message: "Somente administradores podem editar o cadastro de clientes.",
      confirmLabel: "Entendi"
    });
    return;
  }

  openClientDialog(clientId);
}

function saveClientRegistration(container) {
  if (selectedClientId && !canEditClientRegistrations()) {
    showToast("Somente administradores podem editar clientes.");
    return;
  }

  const form = $("#clientForm", container);
  updateClientFormMode(container);
  if (!form.reportValidity()) return;

  if (!pendingClientPlates.length) {
    showToast("Vincule ao menos uma placa ao cliente.");
    $("#clientPlateInput", container).focus();
    return;
  }

  const duplicatePlate = pendingClientPlates.find((plate) => {
    const existingClient = findClientByPlate(plate);
    return existingClient && existingClient.id !== selectedClientId;
  });
  if (duplicatePlate) {
    const existingClient = findClientByPlate(duplicatePlate);
    showToast(`${duplicatePlate} já está vinculada a ${getClientDisplayName(existingClient)}.`);
    return;
  }

  const client = buildClientRegistration(container);
  const existingClient = selectedClientId ? getClientById(selectedClientId) : null;
  let savedClient = client;
  if (existingClient) {
    updateClientRegistration(existingClient, client);
    savedClient = existingClient;
  } else {
    clientRegistry.unshift(client);
    if (client.billing) syncBillingClientFromRegistry(client);
  }
  syncVehiclesFromClientRegistration(savedClient);

  pendingClientPlates = [];
  selectedClientPersonType = "PF";
  selectedClientId = null;
  closeClientDialog();
  renderClientsScreen($("#adminClientsContent"));
  renderAdminDashboard();
  showToast(`${getClientDisplayName(savedClient)} ${existingClient ? "atualizado" : "cadastrado"}.`);
}

function buildClientRegistration(container) {
  const isPF = selectedClientPersonType === "PF";
  const isBilling = $("#clientBilling", container).checked;
  const billingApproved = isBilling && $("#clientBillingApproved", container).checked;
  const client = {
    id: getNextClientId(),
    billingClientId: null,
    personType: selectedClientPersonType,
    billing: isBilling,
    name: isPF ? $("#clientName", container).value.trim() : "",
    legalName: isPF ? "" : $("#clientLegalName", container).value.trim(),
    document: isPF ? $("#clientCpf", container).value.trim() : $("#clientCnpj", container).value.trim(),
    phone: $("#clientPhone", container).value.trim(),
    address: isBilling ? $("#clientAddress", container).value.trim() : "",
    email: isBilling ? $("#clientEmail", container).value.trim() : "",
    responsible: isBilling ? $("#clientResponsible", container).value.trim() : "",
    approver: billingApproved ? getClientApprovalSaveName() : "",
    billingApproved,
    billingCycle: billingApproved ? $("#clientBillingCycle", container).value : "",
    allowMultipleOpenInvoices: billingApproved ? $("#clientMultipleInvoices", container).checked : false,
    plates: [...pendingClientPlates]
  };

  if (!isBilling && isPF) client.document = "";
  return client;
}

function resetClientForm(container) {
  closeClientDialog();
}

function focusClientForm() {
  const input = $("#clientDialog[open] #clientName");
  if (input) input.focus();
}

function syncBillingClientFromRegistry(client) {
  const billingClient = {
    id: getNextBillingClientId(),
    name: getClientDisplayName(client),
    document: client.document,
    phone: client.phone
  };
  billingClients.push(billingClient);
  client.billingClientId = billingClient.id;
}

function updateClientRegistration(existingClient, nextClient) {
  const previousPlates = [...existingClient.plates];
  const previousBillingClientId = existingClient.billingClientId;
  Object.assign(existingClient, nextClient, {
    id: existingClient.id,
    billingClientId: previousBillingClientId
  });

  if (existingClient.billing) syncBillingClientRecord(existingClient);
  else {
    removeBillingClientRecord(previousBillingClientId);
    existingClient.billingClientId = null;
  }

  previousPlates
    .filter((plate) => !existingClient.plates.includes(plate))
    .forEach((plate) => syncPlateOwnership(plate, null));
}

function syncBillingClientRecord(client) {
  if (!client.billingClientId) {
    syncBillingClientFromRegistry(client);
    return;
  }

  const billingClient = billingClients.find((item) => item.id === client.billingClientId);
  if (!billingClient) {
    client.billingClientId = null;
    syncBillingClientFromRegistry(client);
    return;
  }

  billingClient.name = getClientDisplayName(client);
  billingClient.document = client.document;
  billingClient.phone = client.phone;
}

function removeBillingClientRecord(billingClientId) {
  if (!billingClientId) return;
  const index = billingClients.findIndex((client) => client.id === billingClientId);
  if (index >= 0) billingClients.splice(index, 1);
}

function renderClientRows() {
  return clientRegistry
    .map((client) => {
      const plates = client.plates.length
        ? client.plates.map((plate) => `<span class="table-plate-chip">${escapeHtml(plate)}</span>`).join("")
        : "-";
      return `
        <tr data-client-row data-client-type="${client.personType}" data-client-billing="${client.billing ? "faturado" : "avulso"}">
          <td data-label="Cliente">${escapeHtml(getClientDisplayName(client))}</td>
          <td data-label="Tipo">${client.personType}</td>
          <td data-label="Cadastro">${client.billing ? "Faturado" : "Avulso"}</td>
          <td data-label="Telefone">${escapeHtml(client.phone)}</td>
          <td data-label="Documento">${escapeHtml(client.document || "-")}</td>
          <td data-label="Faturamento">${escapeHtml(getClientBillingLabel(client))}</td>
          <td data-label="Placas"><span class="table-plate-list">${plates}</span></td>
          <td data-label="Ações">
            <span class="table-actions">
              <button type="button" data-edit-client="${client.id}">Editar</button>
              <button type="button" data-open-client-message-dialog="${client.id}">Mensagem</button>
            </span>
          </td>
        </tr>
      `;
    })
    .join("");
}

function applyClientTableFilter(container) {
  const query = normalizeText($("#clientSearchInput", container).value);
  const activeFilter = $("[data-client-filter].is-active", container)?.dataset.clientFilter || "all";

  $$("[data-client-row]", container).forEach((row) => {
    const matchesQuery = !query || normalizeText(row.textContent).includes(query);
    const matchesFilter =
      activeFilter === "all" ||
      row.dataset.clientBilling === activeFilter ||
      row.dataset.clientType === activeFilter;
    row.hidden = !matchesQuery || !matchesFilter;
  });
}

function getRegisteredPlates() {
  return clientRegistry.flatMap((client) => client.plates);
}

function findClientByPlate(plate) {
  return clientRegistry.find((client) => client.plates.includes(plate));
}

function getClientLinkedToPlate(plate) {
  const normalizedPlate = formatPlate(plate);
  const client = findClientByPlate(normalizedPlate);
  if (client) return client;
  const vehicle = findVehicleByPlate(normalizedPlate);
  return vehicle?.currentClientId ? getClientById(vehicle.currentClientId) : null;
}

function getClientDisplayName(client) {
  return client.personType === "PF" ? client.name : client.legalName;
}

function getClientBillingLabel(client) {
  if (!client.billing) return "-";
  if (!client.billingApproved) return "Pendente de aprovação";
  const multi = client.allowMultipleOpenInvoices ? "múltiplas faturas" : "uma fatura aberta";
  return `Aprovado por ${client.approver} / ${client.billingCycle} / ${multi}`;
}

function canEditClientRegistrations() {
  return selectedProfile === "Administrador" && !$("#adminShell").hidden;
}

function getClientApprovalDisplayName() {
  const client = selectedClientId ? getClientById(selectedClientId) : null;
  return client?.billingApproved && client.approver ? client.approver : getActiveAdminApproverName();
}

function getClientApprovalSaveName() {
  const client = selectedClientId ? getClientById(selectedClientId) : null;
  return client?.billingApproved && client.approver ? client.approver : getActiveAdminApproverName();
}

function getActiveAdminApproverName() {
  const sessionName = activeSessionUser.trim();
  const normalizedSession = normalizeText(sessionName);
  const admin = adminOperators.find((operator) => {
    if (operator.accessProfile !== "Administrador") return false;
    return normalizeText(operator.name) === normalizedSession || normalizeText(operator.username) === normalizedSession;
  });
  return admin?.name || sessionName || "Administrador";
}

function getNextClientId() {
  return Math.max(0, ...clientRegistry.map((client) => client.id)) + 1;
}

function getNextBillingClientId() {
  return Math.max(0, ...billingClients.map((client) => client.id)) + 1;
}

function findClientByPhone(phone) {
  const digits = onlyDigits(phone);
  if (!digits) return null;
  return clientRegistry.find((client) => onlyDigits(client.phone) === digits) || null;
}

function entryOwnerWasChanged(vehicle, client) {
  const typedPhone = onlyDigits(vehicle.phone);
  const currentPhone = onlyDigits(client.phone);
  const typedName = normalizeText(vehicle.owner);
  const currentName = normalizeText(getClientDisplayName(client));

  return (typedPhone && currentPhone && typedPhone !== currentPhone) || (typedName && currentName && typedName !== currentName);
}

function createCasualClientFromEntry(vehicle) {
  const client = {
    id: getNextClientId(),
    billingClientId: null,
    personType: "PF",
    billing: false,
    name: vehicle.owner,
    legalName: "",
    document: "",
    phone: vehicle.phone,
    address: "",
    email: "",
    responsible: "",
    approver: "",
    billingApproved: false,
    billingCycle: "",
    allowMultipleOpenInvoices: false,
    plates: []
  };

  clientRegistry.unshift(client);
  return client;
}

function transferPlateToClient(plate, nextClientId) {
  const vehicle = findVehicleByPlate(plate);
  const previousClientId = vehicle?.currentClientId || findClientByPlate(plate)?.id || null;
  syncPlateOwnership(plate, nextClientId);

  if (!vehicle) {
    const newVehicle = {
      id: getNextVehicleId(),
      plate,
      brand: $("#vehicleBrand")?.value.trim() || "",
      model: $("#vehicleModel")?.value.trim() || "",
      year: "",
      color: getCurrentEntryColor(),
      type: $("#vehicleType")?.value || "Carro",
      category: getVehicleCategoryValue($("#vehicleType")?.value || "Carro", $("#vehicleCategory")?.value || "Outro"),
      fuel: "Outro",
      currentClientId: nextClientId,
      notes: "Criado automaticamente pela entrada no pátio.",
      ownerHistory: [],
      serviceHistory: [],
      checklistHistory: []
    };
    vehicleRegistry.unshift(newVehicle);
    recordVehicleOwnerChange(newVehicle, previousClientId, nextClientId);
    return newVehicle;
  }

  vehicle.currentClientId = nextClientId;
  if (previousClientId !== nextClientId) recordVehicleOwnerChange(vehicle, previousClientId, nextClientId);
  return vehicle;
}

function getApprovedBillingClientForEntry(vehicle) {
  const client = findClientByPlate(vehicle.plate) || findClientByPhone(vehicle.phone);
  return isClientBillingApproved(client) ? client : null;
}

function isClientBillingApproved(client) {
  return Boolean(client?.billing && client.billingApproved && client.billingClientId);
}

function isBillingClientApproved(billingClientId) {
  return isClientBillingApproved(getRegistryClientByBillingClientId(billingClientId));
}

function getRegistryClientByBillingClientId(billingClientId) {
  return clientRegistry.find((client) => String(client.billingClientId) === String(billingClientId)) || null;
}

function getOpenInvoicesByRegistryClient(client) {
  if (!client?.billingClientId) return [];
  return billingInvoices.filter((invoice) => String(invoice.clientId) === String(client.billingClientId) && invoice.status !== "Paga");
}

function getCurrentEntryColor() {
  const selectedColor = $("#vehicleColor")?.value || "";
  if (selectedColor === "Outra") return $("#vehicleOtherColor")?.value.trim() || selectedColor;
  return selectedColor;
}

function renderVehiclesScreen(container) {
  container.innerHTML = `
    <section class="screen-toolbar" aria-label="Filtros de veículos">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.carFront}</span>
        <input id="vehicleSearchInput" type="search" placeholder="Buscar placa, modelo ou proprietário" />
      </label>
      <div class="screen-filters" id="vehicleFilters">
        <button class="is-active" type="button" data-vehicle-filter="all">Todos</button>
        <button type="button" data-vehicle-filter="linked">Com cliente</button>
        <button type="button" data-vehicle-filter="unlinked">Sem cliente</button>
        <button type="button" data-vehicle-filter="history">Com histórico</button>
        <button type="button" data-vehicle-filter="patio">No pátio</button>
      </div>
    </section>

    <article class="admin-panel screen-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Base</p>
          <h2>Veículos cadastrados</h2>
        </div>
        <span class="client-status-label">${vehicleRegistry.length} registro(s)</span>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table vehicle-registry-table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Veículo</th>
              <th>Proprietário atual</th>
              <th>Ano / Cor</th>
              <th>Histórico</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="vehicleRegistryTableBody">
            ${renderVehicleRegistryRows()}
          </tbody>
        </table>
      </div>
    </article>
  `;

  initIcons();
  bindVehiclesScreenControls(container);
}

function refreshVehiclesScreenIfVisible() {
  const view = $("#adminVehiclesView");
  const container = $("#adminVehiclesContent");
  if (!view || view.hidden || !container) return;
  renderVehiclesScreen(container);
}

function bindVehiclesScreenControls(container) {
  $("#vehicleSearchInput", container).addEventListener("input", () => applyVehicleTableFilter(container));
  $$("[data-vehicle-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-vehicle-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyVehicleTableFilter(container);
    });
  });
  $$("[data-edit-vehicle]", container).forEach((button) => {
    button.addEventListener("click", () => {
      openAdminVehicleRegistryDialog(Number(button.dataset.editVehicle));
    });
  });
  $$("[data-history-vehicle]", container).forEach((button) => {
    button.addEventListener("click", () => {
      openVehicleHistoryDialog(Number(button.dataset.historyVehicle));
    });
  });
}

function persistVehicleRegistration(container) {
  const form = $("#vehicleRegistryForm", container);
  if (!form.reportValidity()) return null;

  const selectedVehicle = selectedVehicleId ? findVehicleById(selectedVehicleId) : null;
  const plate = selectedVehicle ? selectedVehicle.plate : formatPlate($("#vehicleRegistryPlate", container).value);
  if (!plate) {
    showToast("Informe a placa do veículo.");
    $("#vehicleRegistryPlate", container).focus();
    return null;
  }

  const duplicate = vehicleRegistry.find((vehicle) => vehicle.plate === plate && vehicle.id !== selectedVehicleId);
  if (duplicate) {
    return { ok: false, reason: "duplicate", vehicle: duplicate };
  }

  const linkedClient = findClientByPlate(plate);
  const selectedOwnerValue = $("#vehicleRegistryClient", container).value;
  const nextClientId = selectedOwnerValue ? Number(selectedOwnerValue) : null;
  const previousClientId = selectedVehicle ? selectedVehicle.currentClientId : linkedClient?.id || null;
  const vehicle =
    selectedVehicle ||
    {
      id: getNextVehicleId(),
      plate,
      ownerHistory: [],
      serviceHistory: [],
      checklistHistory: []
    };

  vehicle.brand = $("#vehicleRegistryBrand", container).value.trim();
  vehicle.model = $("#vehicleRegistryModel", container).value.trim();
  vehicle.year = $("#vehicleRegistryYear", container).value.trim();
  vehicle.color = $("#vehicleRegistryColor", container).value.trim();
  vehicle.type = $("#vehicleRegistryType", container).value;
  vehicle.category = getVehicleCategoryValue(vehicle.type, $("#vehicleRegistryCategory", container).value);
  vehicle.fuel = $("#vehicleRegistryFuel", container).value;
  vehicle.notes = $("#vehicleRegistryNotes", container).value.trim();
  vehicle.currentClientId = nextClientId;

  if (!selectedVehicle) vehicleRegistry.unshift(vehicle);
  if (previousClientId !== nextClientId || !vehicle.ownerHistory.length) {
    recordVehicleOwnerChange(vehicle, previousClientId, nextClientId);
  }
  syncPlateOwnership(vehicle.plate, nextClientId);
  if (!persistVehicleSpecialCareFromRegistry(container, vehicle)) return null;

  selectedVehicleId = vehicle.id;
  return { ok: true, reason: selectedVehicle ? "updated" : "created", vehicle };
}

function persistVehicleSpecialCareFromRegistry(container, vehicle) {
  const payload = readVehicleSpecialCareFormState(container, "vehicleSpecialCare");
  if (!payload.enabled) {
    selectedVehicleSpecialCareId = null;
    return true;
  }
  if (!payload.type) {
    showToast("Selecione o tipo do cuidado especial.");
    return false;
  }
  if (!payload.description && !payload.restrictionTags.length && !payload.recommendedTags.length) {
    showToast("Informe ao menos uma observação ou restrição do cuidado especial.");
    return false;
  }
  if (selectedVehicleSpecialCareId) {
    updateVehicleSpecialCareRecord(selectedVehicleSpecialCareId, payload);
  } else {
    createVehicleSpecialCareRecord(vehicle, payload, {
      historyType: "vehicle_special_care_created",
      historyDescription: `Cuidado especial registrado para ${vehicle.plate}: ${payload.type}.`
    });
  }
  selectedVehicleSpecialCareId = null;
  return true;
}

function updateVehicleRegistryCategoryState(container) {
  const type = $("#vehicleRegistryType", container)?.value || "";
  const select = $("#vehicleRegistryCategory", container);
  const field = select?.closest(".login-field");
  if (!select || !field) return;

  const hidden = !shouldUseVehicleCategory(type);
  field.hidden = hidden;
  select.disabled = hidden;
  if (hidden) select.value = "";
  else if (!select.value && vehicleCategories.length) select.value = vehicleCategories[0];
}

function getVehicleHistoryCount(vehicle) {
  return (vehicle.serviceHistory?.length || 0) + getVehicleChecklistHistory(vehicle).length;
}

function getChecklistRecordTimestamp(checklist) {
  if (!checklist) return 0;
  if (checklist.completedAt) {
    const completedAt = Date.parse(checklist.completedAt);
    if (!Number.isNaN(completedAt)) return completedAt;
  }

  const datePart = checklist.date || "";
  const timePart = checklist.time || "00:00";
  const parsed = Date.parse(`${datePart}T${timePart}`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getVehicleChecklistHistory(vehicle) {
  if (!Array.isArray(vehicle?.checklistHistory)) return [];
  return vehicle.checklistHistory
    .filter(Boolean)
    .slice()
    .sort((left, right) => getChecklistRecordTimestamp(right) - getChecklistRecordTimestamp(left))
    .slice(0, 1);
}

function renderVehicleRegistryRows() {
  return vehicleRegistry
    .map((vehicle) => {
      const ownerName = getVehicleOwnerName(vehicle);
      const historyCount = getVehicleHistoryCount(vehicle);
      return `
        <tr
          data-vehicle-row
          data-owner-status="${vehicle.currentClientId ? "linked" : "unlinked"}"
          data-history-status="${historyCount ? "history" : "empty"}"
          data-patio-status="${isVehicleInPatio(vehicle.plate) ? "patio" : "out"}"
        >
          <td><span class="table-plate-chip">${escapeHtml(vehicle.plate)}</span></td>
          <td>${escapeHtml([vehicle.brand, vehicle.model].filter(Boolean).join(" ") || vehicle.model || "-")}</td>
          <td>${escapeHtml(ownerName)}</td>
          <td>${escapeHtml([vehicle.year, vehicle.color].filter(Boolean).join(" / ") || "-")}</td>
          <td>${historyCount} registro(s)</td>
          <td>
            <span class="table-actions">
              <button type="button" data-edit-vehicle="${vehicle.id}">Editar</button>
              <button type="button" data-history-vehicle="${vehicle.id}">Histórico</button>
            </span>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderVehicleHistoryPanel(vehicle) {
  if (!vehicle) {
    return `
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Histórico</p>
          <h2>Nenhum veículo</h2>
        </div>
      </div>
      <p class="empty-alert">Cadastre um veículo para iniciar o histórico.</p>
    `;
  }

  const serviceItems = vehicle.serviceHistory.length
    ? vehicle.serviceHistory
        .slice()
        .reverse()
        .slice(0, 5)
        .map(
          (item) => `
            <article class="history-item">
              <span>${formatDateBR(item.date)}</span>
              <strong>${escapeHtml(item.service)}</strong>
              <p>${escapeHtml(item.status)} - ${formatCurrency(item.value || 0)} - Operador: ${escapeHtml(item.operator || "-")}</p>
            </article>
          `
        )
        .join("")
    : '<p class="empty-alert">Nenhum serviço registrado para este veículo.</p>';

  const ownerItems = vehicle.ownerHistory.length
    ? vehicle.ownerHistory
        .slice()
        .reverse()
        .map(
          (item) => `
            <article class="history-item">
              <span>${formatDateBR(item.date)}</span>
              <strong>${escapeHtml(item.owner)}</strong>
              <p>${escapeHtml(item.note)}</p>
            </article>
          `
        )
        .join("")
    : '<p class="empty-alert">Nenhuma troca de proprietário registrada.</p>';

  const checklistHistory = getVehicleChecklistHistory(vehicle);
  const checklistItems = checklistHistory.length
    ? checklistHistory
        .map(
          (item) => `
            <article class="history-item checklist-history-item">
              <span>${formatDateBR(item.date)} ${escapeHtml(item.time || "")}</span>
              <strong>${escapeHtml(item.title || "Check-list veicular")}</strong>
              <p>${escapeHtml(item.service || "-")} - ${escapeHtml(item.status || "-")} - Operador: ${escapeHtml(item.operator || "-")}</p>
              <span class="table-actions">
                <button type="button" data-checklist-vehicle="${vehicle.id}" data-checklist-pdf="${escapeHtml(item.id)}">Baixar PDF</button>
              </span>
            </article>
          `
        )
        .join("")
    : '<p class="empty-alert">Nenhum check-list registrado para este veículo.</p>';

  return `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">Histórico</p>
        <h2>${escapeHtml(vehicle.plate)}</h2>
      </div>
    </div>
    <div class="vehicle-file-summary">
      <span>${escapeHtml([vehicle.brand, vehicle.model, vehicle.year].filter(Boolean).join(" ") || vehicle.model || "Veículo")}</span>
      <strong>${escapeHtml(getVehicleOwnerName(vehicle))}</strong>
      <p>${escapeHtml(vehicle.notes || "Sem observações registradas.")}</p>
    </div>
    <div class="history-section">
      <h3>Serviços realizados</h3>
      ${serviceItems}
    </div>
    <div class="history-section">
      <h3>Ultimo check-list em PDF</h3>
      ${checklistItems}
    </div>
    <div class="history-section">
      <h3>Proprietários</h3>
      ${ownerItems}
    </div>
  `;
}

function renderVehicleHistoryDialog(vehicle) {
  return `
    <div class="vehicle-box vehicle-registry-dialog-box">
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Cadastro</p>
          <h2>Histórico do veículo</h2>
        </div>
        <button class="icon-button" id="closeVehicleHistoryDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      ${renderVehicleHistoryPanel(vehicle)}
      <div class="dialog-actions">
        <button class="exit-button" id="dismissVehicleHistoryDialog" type="button">Fechar</button>
      </div>
    </div>
  `;
}

function bindVehicleHistoryDialogControls(dialog) {
  $("#closeVehicleHistoryDialog", dialog)?.addEventListener("click", closeVehicleHistoryDialog);
  $("#dismissVehicleHistoryDialog", dialog)?.addEventListener("click", closeVehicleHistoryDialog);
  dialog.oncancel = (event) => {
    event.preventDefault();
    closeVehicleHistoryDialog();
  };
  $$("[data-checklist-pdf]", dialog).forEach((button) => {
    button.addEventListener("click", () => generateChecklistPdf(Number(button.dataset.checklistVehicle), button.dataset.checklistPdf));
  });
}

function generateChecklistPdf(vehicleId, checklistId) {
  const vehicle = findVehicleById(vehicleId);
  const checklistHistory = getVehicleChecklistHistory(vehicle);
  const checklist = checklistHistory.find((item) => item.id === checklistId) || checklistHistory[0];
  if (!vehicle || !checklist) {
    showToast("Check-list não localizado no histórico do veículo.");
    return;
  }

  downloadPdfFile(checklist.pdfName || `checklist-${vehicle.plate}.pdf`, "CHECK-LIST VEICULAR", getChecklistPdfLines(vehicle, checklist));
  showToast("Check-list em PDF gerado.");
}

function getChecklistPdfLines(vehicle, checklist) {
  const activeCareRecords = getVehicleActiveSpecialCareRecords(vehicle);
  const groupedItems = (checklist.items || []).reduce((groups, item) => {
    groups[item.area] = groups[item.area] || [];
    groups[item.area].push(item);
    return groups;
  }, {});

  const lines = [
    `Placa: ${vehicle.plate}`,
    `Veiculo: ${[vehicle.brand, checklist.model || vehicle.model, vehicle.year].filter(Boolean).join(" ") || checklist.model || "Veiculo"}`,
    `Cor: ${checklist.color || vehicle.color || "-"}`,
    `Tipo: ${checklist.vehicleType || vehicle.type || "-"}`,
    `Cliente: ${getVehicleOwnerName(vehicle)}`,
    `Servico: ${checklist.service || "-"}`,
    `Status no patio: ${checklist.status || "-"}`,
    `Operador: ${checklist.operator || "-"}`,
    `Data: ${formatDateBR(checklist.date)} ${checklist.time || ""}`,
    ""
  ];

  if (activeCareRecords.length) {
    lines.push("Cuidados especiais");
    activeCareRecords.forEach((record) => {
      lines.push(`${record.type} - ${record.attentionLevel}`);
      if (record.restrictionTags?.length) {
        lines.push(`Restrições: ${record.restrictionTags.map(getVehicleSpecialCareRestrictionLabel).join(", ")}`);
      }
      if (record.source) lines.push(`Origem: ${record.source}`);
      if (record.description) lines.push(record.description);
      lines.push("");
    });
  }

  Object.entries(groupedItems).forEach(([area, items]) => {
    lines.push(area);
    items.forEach((item) => {
      lines.push({
        type: "checklistItem",
        part: item.part,
        condition: item.condition || checklistUnverifiedCondition
      });
    });
    lines.push("");
  });

  return lines;
}

function applyVehicleTableFilter(container) {
  const query = normalizeText($("#vehicleSearchInput", container).value);
  const activeFilter = $("[data-vehicle-filter].is-active", container)?.dataset.vehicleFilter || "all";

  $$("[data-vehicle-row]", container).forEach((row) => {
    const matchesQuery = !query || normalizeText(row.textContent).includes(query);
    const matchesFilter =
      activeFilter === "all" ||
      row.dataset.ownerStatus === activeFilter ||
      row.dataset.historyStatus === activeFilter ||
      row.dataset.patioStatus === activeFilter;
    row.hidden = !matchesQuery || !matchesFilter;
  });
}

function renderVehicleOwnerOptions(selectedClientId, clients = clientRegistry) {
  return [
    `<option value="">Sem cliente vinculado</option>`,
    ...clients.map((client) => {
      const value = String(client.id);
      return `<option value="${value}" ${String(selectedClientId) === value ? "selected" : ""}>${escapeHtml(getClientDisplayName(client))}</option>`;
    })
  ].join("");
}

function renderSelectOptions(options, selectedValue) {
  const normalizedSelectedValue =
    selectedValue && typeof selectedValue === "object" && !Array.isArray(selectedValue)
      ? String(selectedValue.value ?? selectedValue.label ?? "")
      : String(selectedValue ?? "");
  return options
    .map((option) => {
      const optionValue =
        option && typeof option === "object" && !Array.isArray(option)
          ? String(option.value ?? option.label ?? "")
          : String(option ?? "");
      const optionLabel =
        option && typeof option === "object" && !Array.isArray(option)
          ? String(option.label ?? option.value ?? "")
          : String(option ?? "");
      return `<option value="${escapeHtml(optionValue)}" ${optionValue === normalizedSelectedValue ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`;
    })
    .join("");
}

function syncVehiclesFromClientRegistration(client) {
  client.plates.forEach((plate) => {
    let vehicle = findVehicleByPlate(plate);
    if (!vehicle) {
      vehicle = {
        id: getNextVehicleId(),
        plate,
        brand: "",
        model: "",
        year: "",
        color: "",
        type: "Carro",
        category: "Outro",
        fuel: "Outro",
        currentClientId: client.id,
        notes: "Criado a partir do cadastro de clientes.",
        ownerHistory: [],
        serviceHistory: [],
        checklistHistory: []
      };
      vehicleRegistry.unshift(vehicle);
    }

    const previousClientId = vehicle.currentClientId;
    vehicle.currentClientId = client.id;
    if (previousClientId !== client.id || !vehicle.ownerHistory.length) {
      recordVehicleOwnerChange(vehicle, previousClientId, client.id);
    }
    syncPlateOwnership(plate, client.id);
  });
}

function syncVehicleFromPatioEntry(vehicleEntry) {
  let vehicle = findVehicleByPlate(vehicleEntry.plate);
  const linkedClient = findClientByPlate(vehicleEntry.plate);
  if (!vehicle) {
    vehicle = {
      id: getNextVehicleId(),
      plate: vehicleEntry.plate,
      brand: vehicleEntry.brand || "",
      model: vehicleEntry.model,
      year: "",
      color: vehicleEntry.color,
      type: vehicleEntry.type || "Carro",
      category: getVehicleCategoryValue(vehicleEntry.type || "Carro", vehicleEntry.category || "Outro"),
      fuel: "Outro",
      currentClientId: linkedClient?.id || null,
      notes: "Criado automaticamente pela entrada no pátio.",
      ownerHistory: [],
      serviceHistory: [],
      checklistHistory: []
    };
    vehicleRegistry.unshift(vehicle);
    recordVehicleOwnerChange(vehicle, null, vehicle.currentClientId);
  } else {
    vehicle.brand = vehicle.brand || vehicleEntry.brand || "";
    vehicle.model = vehicle.model || vehicleEntry.model;
    vehicle.color = vehicle.color || vehicleEntry.color;
    vehicle.type = vehicle.type || vehicleEntry.type;
    vehicle.category = getVehicleCategoryValue(vehicle.type, vehicle.category || vehicleEntry.category);
  }

  vehicle.serviceHistory.push({
    date: new Date().toISOString().slice(0, 10),
    service: vehicleEntry.service,
    status: statusMeta[vehicleEntry.status]?.label || vehicleEntry.status,
    value: getVehiclePaymentTotal(vehicleEntry),
    operator: activeSessionUser || "Operador"
  });
  upsertVehicleChecklistHistory(vehicleEntry, vehicle);
  return vehicle;
}

function updateVehicleServiceStatus(patioVehicle) {
  const vehicle = findVehicleByPlate(patioVehicle.plate);
  if (!vehicle) return;
  if (patioVehicle.status === "finalizado" && !patioVehicle.finishedDate) {
    patioVehicle.finishedDate = getTodayISO();
  }

  const lastService = [...vehicle.serviceHistory].reverse().find((item) => item.service === patioVehicle.service);
  if (lastService) {
    lastService.status = statusMeta[patioVehicle.status]?.label || patioVehicle.status;
    upsertVehicleChecklistHistory(patioVehicle, vehicle);
    return;
  }

  vehicle.serviceHistory.push({
    date: new Date().toISOString().slice(0, 10),
    service: patioVehicle.service,
    status: statusMeta[patioVehicle.status]?.label || patioVehicle.status,
    value: getVehiclePaymentTotal(patioVehicle),
    operator: activeSessionUser || "Operador"
  });
  upsertVehicleChecklistHistory(patioVehicle, vehicle);
}

function upsertVehicleChecklistHistory(patioVehicle, registryVehicle = findVehicleByPlate(patioVehicle.plate)) {
  if (!registryVehicle || !patioVehicle.checklist?.enabled) return;

  const completedAt = patioVehicle.checklist.completedAt || new Date().toISOString();
  const checklistId = patioVehicle.checklist.id || `CHK-${patioVehicle.id}-${Date.parse(completedAt) || Date.now()}`;
  patioVehicle.checklist.id = checklistId;

  const record = {
    ...patioVehicle.checklist,
    id: checklistId,
    completedAt,
    title: `Check-list ${formatVehicleScope(patioVehicle.type || registryVehicle.type, patioVehicle.category || registryVehicle.category)}`,
    date: completedAt.slice(0, 10),
    time: formatChecklistTime(completedAt),
    plate: patioVehicle.plate,
    model: patioVehicle.model || registryVehicle.model || "",
    color: patioVehicle.color || registryVehicle.color || "",
    service: patioVehicle.service,
    status: statusMeta[patioVehicle.status]?.label || patioVehicle.status,
    operator: activeSessionUser || patioVehicle.operator || "Operador",
    pdfName: `checklist-${patioVehicle.plate}-${completedAt.slice(0, 10)}.pdf`
  };

  registryVehicle.checklistHistory = [record];
}

function formatChecklistTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function syncPlateOwnership(plate, nextClientId) {
  clientRegistry.forEach((client) => {
    client.plates = client.plates.filter((item) => item !== plate);
  });

  if (!nextClientId) return;
  const client = getClientById(nextClientId);
  if (client && !client.plates.includes(plate)) client.plates.push(plate);
}

function recordVehicleOwnerChange(vehicle, previousClientId, nextClientId) {
  const previousOwner = previousClientId ? getClientDisplayNameById(previousClientId) : "Sem proprietário anterior";
  const nextOwner = nextClientId ? getClientDisplayNameById(nextClientId) : "Sem cliente vinculado";
  const note = nextClientId ? `Transferido de ${previousOwner}` : `Desvinculado de ${previousOwner}`;

  vehicle.ownerHistory.push({
    date: new Date().toISOString().slice(0, 10),
    owner: nextOwner,
    note
  });
}

function findVehicleById(id) {
  return vehicleRegistry.find((vehicle) => vehicle.id === Number(id));
}

function findVehicleByPlate(plate) {
  return vehicleRegistry.find((vehicle) => vehicle.plate === plate);
}

function getAnyVehicleRecord(vehicleId = null, plate = "") {
  if (vehicleId) {
    return findVehicleById(vehicleId) || patioVehicles.find((vehicle) => Number(vehicle.id) === Number(vehicleId)) || null;
  }
  const formattedPlate = formatPlate(plate);
  if (!formattedPlate) return null;
  return findVehicleByPlate(formattedPlate) || patioVehicles.find((vehicle) => formatPlate(vehicle.plate) === formattedPlate) || null;
}

function getVehicleSpecialCareRecords(vehicle, options = {}) {
  if (!vehicle) return [];
  const vehicleId = Number(vehicle.vehicleId || vehicle.id || 0) || null;
  const plate = formatPlate(vehicle.vehiclePlate || vehicle.plate || "");
  return vehicleSpecialCareRecords
    .filter((record) => {
      if (options.activeOnly && record.active === false) return false;
      return (vehicleId && Number(record.vehicleId) === Number(vehicleId)) || (plate && formatPlate(record.vehiclePlate) === plate);
    })
    .sort((a, b) => Number(new Date(b.registeredAt || b.createdAt || 0)) - Number(new Date(a.registeredAt || a.createdAt || 0)));
}

function getVehicleActiveSpecialCareRecords(vehicle) {
  return getVehicleSpecialCareRecords(vehicle, { activeOnly: true });
}

function getVehicleSpecialCareSummary(vehicle) {
  const activeRecords = getVehicleActiveSpecialCareRecords(vehicle);
  const highestPriority = { "Alto risco": 3, "Atenção": 2, Informativo: 1 };
  const highestLevel =
    activeRecords
      .slice()
      .sort((left, right) => (highestPriority[right.attentionLevel] || 0) - (highestPriority[left.attentionLevel] || 0))[0]?.attentionLevel || "";
  return {
    count: activeRecords.length,
    highestLevel,
    labels: activeRecords.map((record) => record.type),
    restrictions: [...new Set(activeRecords.flatMap((record) => record.restrictionTags || []))]
  };
}

function getVehicleSpecialCareCount(vehicle) {
  return getVehicleSpecialCareSummary(vehicle).count;
}

function hasVehicleSpecialCare(vehicle) {
  return getVehicleSpecialCareCount(vehicle) > 0;
}

function getVehicleSpecialCareLevelClass(level) {
  if (level === "Alto risco") return "is-high";
  if (level === "Atenção") return "is-attention";
  return "is-info";
}

function getVehicleSpecialCareRestrictionLabel(tag) {
  return vehicleSpecialCareRestrictionLabelMap[tag] || vehicleSpecialCareRecommendedLabelMap[tag] || tag;
}

function getVehicleSpecialCareRecommendedLabel(tag) {
  return vehicleSpecialCareRecommendedLabelMap[tag] || tag;
}

function createVehicleSpecialCareHistoryEntry(type, description) {
  return {
    id: `care-history-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    description,
    createdAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    author: activeSessionUser || "Administrador"
  };
}

function createVehicleSpecialCareRecord(vehicle, payload = {}, options = {}) {
  const sourceVehicle = vehicle ? getAnyVehicleRecord(vehicle.id, vehicle.plate) || vehicle : null;
  const nowIso = new Date().toISOString();
  const record = {
    id: Math.max(0, ...vehicleSpecialCareRecords.map((item) => Number(item.id) || 0)) + 1,
    companyId: "local-default",
    vehicleId: Number(sourceVehicle?.id || payload.vehicleId || 0) || null,
    vehiclePlate: formatPlate(sourceVehicle?.plate || payload.vehiclePlate || ""),
    attendanceId: Number(options.attendanceId || payload.attendanceId || sourceVehicle?.attendanceId || 0) || null,
    type: String(payload.type || vehicleSpecialCareTypes[0] || "Outro").trim(),
    attentionLevel: vehicleSpecialCareAttentionLevels.includes(payload.attentionLevel) ? payload.attentionLevel : "Informativo",
    description: String(payload.description || "").trim(),
    restrictionTags: normalizeStringTagList(payload.restrictionTags, vehicleSpecialCareCombinedRestrictionOptions.map((option) => option.tag)),
    recommendedTags: normalizeStringTagList(payload.recommendedTags, vehicleSpecialCareRecommendedOptions.map((option) => option.tag)),
    source: vehicleSpecialCareSources.includes(payload.source) ? payload.source : "Outro",
    sourceAttendanceId: Number(options.sourceAttendanceId || payload.sourceAttendanceId || 0) || null,
    sourceServiceId: String(options.sourceServiceId || payload.sourceServiceId || "").trim(),
    registeredAt: String(payload.registeredAt || nowIso).trim(),
    validUntil: String(payload.validUntil || "").trim(),
    active: payload.active !== false,
    createdAt: nowIso,
    updatedAt: nowIso,
    createdBy: activeSessionUser || options.createdBy || "Administrador",
    updatedBy: activeSessionUser || options.updatedBy || "Administrador",
    deletedAt: "",
    syncStatus: "local_only",
    auditLogId: `care-${Date.now()}`,
    history: [
      createVehicleSpecialCareHistoryEntry(
        options.historyType || "vehicle_special_care_created",
        options.historyDescription || `Cuidado especial registrado: ${payload.type || vehicleSpecialCareTypes[0]}.`
      )
    ]
  };
  if (!record.vehicleId) return null;
  vehicleSpecialCareRecords.unshift(record);
  saveVehicleSpecialCareRecords();
  return record;
}

function updateVehicleSpecialCareRecord(recordId, payload = {}, options = {}) {
  const record = vehicleSpecialCareRecords.find((item) => Number(item.id) === Number(recordId));
  if (!record) return null;
  Object.assign(record, {
    type: String(payload.type || record.type || "").trim(),
    attentionLevel: vehicleSpecialCareAttentionLevels.includes(payload.attentionLevel) ? payload.attentionLevel : record.attentionLevel,
    description: String(payload.description ?? record.description ?? "").trim(),
    restrictionTags: normalizeStringTagList(payload.restrictionTags ?? record.restrictionTags, vehicleSpecialCareCombinedRestrictionOptions.map((option) => option.tag)),
    recommendedTags: normalizeStringTagList(payload.recommendedTags ?? record.recommendedTags, vehicleSpecialCareRecommendedOptions.map((option) => option.tag)),
    source: vehicleSpecialCareSources.includes(payload.source) ? payload.source : record.source,
    validUntil: String(payload.validUntil ?? record.validUntil ?? "").trim(),
    active: payload.active === undefined ? record.active : payload.active !== false,
    updatedAt: new Date().toISOString(),
    updatedBy: activeSessionUser || options.updatedBy || "Administrador"
  });
  if (!Array.isArray(record.history)) record.history = [];
  record.history.unshift(
    createVehicleSpecialCareHistoryEntry(
      options.historyType || "vehicle_special_care_updated",
      options.historyDescription || `Cuidado especial atualizado: ${record.type}.`
    )
  );
  saveVehicleSpecialCareRecords();
  return record;
}

function deactivateVehicleSpecialCareRecord(recordId, reason = "") {
  const record = vehicleSpecialCareRecords.find((item) => Number(item.id) === Number(recordId));
  if (!record) return null;
  record.active = false;
  record.deletedAt = new Date().toISOString();
  record.updatedAt = record.deletedAt;
  record.updatedBy = activeSessionUser || "Administrador";
  if (!Array.isArray(record.history)) record.history = [];
  record.history.unshift(
    createVehicleSpecialCareHistoryEntry(
      "vehicle_special_care_deactivated",
      `Cuidado especial inativado${reason ? `: ${reason}` : "."}`
    )
  );
  saveVehicleSpecialCareRecords();
  return record;
}

function getSpecialCareTypeLabel(value) {
  return vehicleSpecialCareTypes.includes(value) ? value : "Outro";
}

function getCareConflictSeverityLevel(records = [], hasUnknownTechnicalClassification = false) {
  if (records.some((record) => record.attentionLevel === "Alto risco")) return "high";
  if (records.some((record) => record.attentionLevel === "Atenção")) return "attention";
  return hasUnknownTechnicalClassification ? "attention" : "info";
}

function getSpecialCareConflictRiskTagsForRestriction(tag) {
  const mapping = {
    avoid_acid: ["acid_product", "wheel_acid"],
    avoid_strong_alkaline: ["strong_alkaline_product"],
    use_ph_neutral: ["acid_product", "wheel_acid", "strong_alkaline_product"],
    avoid_degreaser: ["degreaser"],
    avoid_abrasive_brush: ["abrasive"],
    avoid_high_pressure_close: ["high_pressure_close"],
    avoid_solvent: ["solvent"],
    avoid_heavy_polishing: ["heavy_polishing"],
    avoid_engine_wash: ["engine_cleaner"],
    avoid_film_contact: ["film_contact"],
    avoid_abrasive_product: ["abrasive"],
    avoid_silicone: ["silicone_based"],
    prefer_ph_neutral: ["acid_product", "wheel_acid", "strong_alkaline_product"],
    prefer_low_aggression: ["acid_product", "wheel_acid", "strong_alkaline_product", "degreaser", "solvent", "heavy_cleaner"],
    prefer_soft_touch: ["abrasive"],
    protect_sensitive_area: ["acid_product", "wheel_acid", "strong_alkaline_product", "degreaser", "solvent", "abrasive"],
    manual_review: ["acid_product", "wheel_acid", "strong_alkaline_product", "degreaser", "solvent", "abrasive", "engine_cleaner", "heavy_cleaner"]
  };
  return mapping[tag] || [];
}

function getSupplyRiskTags(supply) {
  return normalizeStringTagList(supply?.riskTags, supplyRiskTagOptions.map((option) => option.tag));
}

function getServiceRiskTags(service) {
  return [];
}

function doesVehicleRestrictionConflictWithRisk(restrictionTag, riskTags = [], supply = null) {
  const tags = new Set(riskTags || []);
  if (getSpecialCareConflictRiskTagsForRestriction(restrictionTag).some((tag) => tags.has(tag))) return true;
  return false;
}

function getVehicleServiceConflictSignature(conflictResult = {}) {
  const careIds = (conflictResult.vehicleCareRecords || []).map((record) => record.id).sort((left, right) => left - right).join("-");
  const services = (conflictResult.conflictingServices || []).map((item) => item.serviceName).sort().join("-");
  const restrictions = (conflictResult.messages || []).map((message) => message.restrictionTag).sort().join("-");
  return [careIds, services, restrictions].filter(Boolean).join("|");
}

function checkVehicleServiceCareConflicts(vehicleId, serviceIds = []) {
  const vehicle = getAnyVehicleRecord(vehicleId);
  return checkVehicleServiceCareConflictsForVehicle(vehicle, serviceIds);
}

function checkVehicleServiceCareConflictsForVehicle(vehicle, serviceIds = [], extraCareRecords = []) {
  const careRecords = [
    ...getVehicleActiveSpecialCareRecords(vehicle),
    ...(Array.isArray(extraCareRecords) ? extraCareRecords.filter(Boolean) : [])
  ];
  const uniqueCareRecords = careRecords.filter(
    (record, index, collection) => index === collection.findIndex((item) => Number(item.id || 0) === Number(record.id || 0) && item.type === record.type)
  );
  const services = (serviceIds || [])
    .map((serviceName) => findServiceDefinition(serviceName, vehicle?.type, vehicle?.category))
    .filter(Boolean);
  const conflictingServices = [];
  const conflictingSupplies = [];
  const unknownTechnicalClassification = [];
  const messages = [];
  uniqueCareRecords.forEach((record) => {
    const restrictions = record.restrictionTags || [];
    services.forEach((service) => {
      const serviceTags = getServiceRiskTags(service);
      restrictions.forEach((restrictionTag) => {
        if (doesVehicleRestrictionConflictWithRisk(restrictionTag, serviceTags)) {
          conflictingServices.push({ serviceName: service.name, restrictionTag, careType: record.type, source: "service" });
          messages.push({
            careType: record.type,
            restrictionTag,
            message: `O serviço ${service.name} pode exigir cuidado com a restrição "${getVehicleSpecialCareRestrictionLabel(restrictionTag)}".`
          });
        }
      });

      const supplyEntries = getServiceSupplyProfile(service);
      supplyEntries.forEach((entry) => {
        const supply = getSupplyById(entry.supplyId);
        if (!supply) return;
        const supplyTags = getSupplyRiskTags(supply);
        restrictions.forEach((restrictionTag) => {
          if (!doesVehicleRestrictionConflictWithRisk(restrictionTag, supplyTags, supply)) return;
          conflictingSupplies.push({
            serviceName: service.name,
            supplyName: supply.name,
            restrictionTag,
            careType: record.type
          });
          messages.push({
            careType: record.type,
            restrictionTag,
            message: `${supply.name} conflita com "${getVehicleSpecialCareRestrictionLabel(restrictionTag)}".`
          });
        });
      });
    });
  });

  const dedupedMessages = messages.filter(
    (message, index, collection) =>
      index ===
      collection.findIndex(
        (item) => item.careType === message.careType && item.restrictionTag === message.restrictionTag && item.message === message.message
      )
  );
  const dedupedConflictingServices = conflictingServices.filter(
    (item, index, collection) =>
      index ===
      collection.findIndex(
        (entry) => entry.serviceName === item.serviceName && entry.restrictionTag === item.restrictionTag && entry.careType === item.careType
      )
  );
  const dedupedConflictingSupplies = conflictingSupplies.filter(
    (item, index, collection) =>
      index ===
      collection.findIndex(
        (entry) =>
          entry.serviceName === item.serviceName &&
          entry.supplyName === item.supplyName &&
          entry.restrictionTag === item.restrictionTag &&
          entry.careType === item.careType
      )
  );
  const highestLevel = getCareConflictSeverityLevel(uniqueCareRecords, Boolean(unknownTechnicalClassification.length));
  return {
    hasSpecialCare: uniqueCareRecords.length > 0,
    hasConflicts: Boolean(dedupedConflictingServices.length || dedupedConflictingSupplies.length),
    highestLevel,
    vehicleCareRecords: uniqueCareRecords,
    conflictingServices: dedupedConflictingServices,
    conflictingSupplies: dedupedConflictingSupplies,
    unknownTechnicalClassification,
    messages: dedupedMessages,
    signature: getVehicleServiceConflictSignature({
      vehicleCareRecords: uniqueCareRecords,
      conflictingServices: dedupedConflictingServices,
      messages: dedupedMessages
    })
  };
}

function getVehicleCurrentCareConflictResult(vehicle, extraCareRecords = []) {
  return checkVehicleServiceCareConflictsForVehicle(vehicle, getVehicleServices(vehicle), extraCareRecords);
}

function hasVehicleCareWarningAcknowledged(vehicle, conflictResult) {
  if (!vehicle || !conflictResult?.signature) return false;
  return (vehicle.specialCareWarningLog || []).some(
    (entry) => entry.signature === conflictResult.signature && entry.acknowledged
  );
}

function getVehicleCareWarningTitle(conflictResult, context) {
  if (conflictResult.highestLevel === "high") return "Alerta de cuidado especial";
  if (context === "attendance_save") return "Revisão antes de salvar";
  if (context === "start_service") return "Confirmar início do serviço";
  return "Cuidado especial do veículo";
}

function getVehicleCareWarningMessage(conflictResult, context) {
  const types = [...new Set((conflictResult.vehicleCareRecords || []).map((record) => record.type))];
  const typeText = types.length ? `Este veículo possui ${types.join(", ")}.` : "Este veículo possui cuidados especiais cadastrados.";
  if (conflictResult.hasConflicts) {
    return `${typeText} O serviço selecionado pode usar produtos ou métodos com restrição. Confira antes de executar${context === "attendance_save" ? " e confirme somente se estiver tudo certo" : ""}.`;
  }
  return `${typeText} Há insumos sem classificação técnica completa neste serviço. Faça a conferência antes de seguir.`;
}

async function showVehicleCareWarning(conflictResult, context) {
  if (!conflictResult?.hasSpecialCare) return true;
  const detailLines = [];
  if (conflictResult.conflictingServices.length) {
    detailLines.push(
      ...conflictResult.conflictingServices.map(
        (item) => `${item.serviceName}: ${getVehicleSpecialCareRestrictionLabel(item.restrictionTag)}`
      )
    );
  }
  if (conflictResult.conflictingSupplies.length) {
    detailLines.push(
      ...conflictResult.conflictingSupplies.map(
        (item) => `${item.supplyName}: ${getVehicleSpecialCareRestrictionLabel(item.restrictionTag)}`
      )
    );
  }
  if (conflictResult.unknownTechnicalClassification.length) {
    detailLines.push(
      ...conflictResult.unknownTechnicalClassification.map(
        (item) => `${item.serviceName}: ${item.supplyName || item.reason}`
      )
    );
  }
  const extraDetail = detailLines.length ? ` Detalhes: ${detailLines.slice(0, 3).join(" | ")}.` : "";
  return showMessageBox({
    title: getVehicleCareWarningTitle(conflictResult, context),
    message: `${getVehicleCareWarningMessage(conflictResult, context)}${extraDetail}`,
    eyebrow: "Segurança operacional",
    confirmLabel: "Entendi e vou conferir",
    cancelLabel: context === "attendance_save" ? "Revisar atendimento" : "Voltar",
    confirmOnly: false
  });
}

function registerVehicleCareWarningAcknowledgement(vehicle, conflictResult, context) {
  if (!vehicle || !conflictResult?.signature) return;
  if (!Array.isArray(vehicle.specialCareWarningLog)) vehicle.specialCareWarningLog = [];
  if (!vehicle.specialCareWarningLog.some((entry) => entry.signature === conflictResult.signature && entry.acknowledged)) {
    vehicle.specialCareWarningLog.unshift({
      signature: conflictResult.signature,
      acknowledged: true,
      context,
      acknowledgedAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
      user: activeSessionUser || "Operador",
      services: [...new Set((conflictResult.conflictingServices || []).map((item) => item.serviceName))],
      restrictions: [...new Set((conflictResult.messages || []).map((item) => getVehicleSpecialCareRestrictionLabel(item.restrictionTag)))],
      supplies: [...new Set((conflictResult.conflictingSupplies || []).map((item) => item.supplyName).filter(Boolean))]
    });
  }
  vehicle.specialCareWarningsAcknowledged = true;
  vehicle.specialCareWarningSignature = conflictResult.signature;
  appendAttendanceHistory(
    vehicle,
    `O operador confirmou ciência sobre cuidados especiais do veículo (${context}).`,
    "vehicle_special_care_warning_acknowledged"
  );
}

async function ensureVehicleCareWarningAcknowledged(vehicle, conflictResult, context) {
  if (!vehicle || !conflictResult?.hasSpecialCare) return true;
  if (!conflictResult.hasConflicts && !conflictResult.unknownTechnicalClassification.length) return true;
  if (hasVehicleCareWarningAcknowledged(vehicle, conflictResult)) return true;
  appendAttendanceHistory(
    vehicle,
    `Sistema exibiu alerta técnico de cuidados especiais (${context}).`,
    "vehicle_special_care_warning_shown"
  );
  const confirmed = await showVehicleCareWarning(conflictResult, context);
  if (!confirmed) return false;
  registerVehicleCareWarningAcknowledgement(vehicle, conflictResult, context);
  renderAdminDashboard();
  return true;
}

function getVehicleAutoCareSuggestion(vehicle) {
  const existingTypes = new Set(getVehicleActiveSpecialCareRecords(vehicle).map((record) => normalizeText(record.type)));
  return getVehicleServices(vehicle)
    .map((serviceName) => findServiceDefinition(serviceName))
    .find((service) => service?.autoCreateVehicleCareType && !existingTypes.has(normalizeText(service.autoCreateVehicleCareType)));
}

async function maybeSuggestVehicleCareFromCompletedServices(vehicle) {
  const suggestedService = getVehicleAutoCareSuggestion(vehicle);
  const registryVehicle = findVehicleByPlate(vehicle?.plate || "");
  if (!suggestedService || !registryVehicle) return;
  const confirmed = await showMessageBox({
    title: "Registrar cuidado especial?",
    message: `${suggestedService.name} foi concluído. Deseja registrar ${suggestedService.autoCreateVehicleCareType} para alertas futuros deste veículo?`,
    eyebrow: "Pós-serviço",
    confirmLabel: "Registrar",
    cancelLabel: "Agora não",
    confirmOnly: false
  });
  if (!confirmed) return;
  const record = createVehicleSpecialCareRecord(
    registryVehicle,
    {
      type: suggestedService.autoCreateVehicleCareType,
      attentionLevel: "Atenção",
      source: "Serviço realizado neste lava jato",
      description: `Registrado após a conclusão de ${suggestedService.name}.`
    },
    {
      attendanceId: vehicle.id,
      sourceAttendanceId: vehicle.id,
      sourceServiceId: suggestedService.name,
      historyDescription: `Cuidado especial sugerido após a conclusão de ${suggestedService.name}.`
    }
  );
  if (!record) return;
  appendAttendanceHistory(vehicle, `Cuidado especial criado após ${suggestedService.name}.`, "vehicle_special_care_created");
  renderPatio();
  renderAdminDashboard();
  showToast(`${record.type} registrado para ${vehicle.plate}.`);
}

function getVehicleOwnerName(vehicle) {
  return vehicle.currentClientId ? getClientDisplayNameById(vehicle.currentClientId) : "Sem cliente vinculado";
}

function getClientById(id) {
  return clientRegistry.find((client) => client.id === Number(id));
}

function getClientDisplayNameById(id) {
  const client = getClientById(id);
  return client ? getClientDisplayName(client) : "Cliente não localizado";
}

function getNextVehicleId() {
  return Math.max(0, ...vehicleRegistry.map((vehicle) => vehicle.id)) + 1;
}

function getNextPatioVehicleId() {
  return Math.max(0, ...patioVehicles.map((vehicle) => vehicle.id)) + 1;
}

function getActivePatioPlates() {
  return [...new Set(patioVehicles.filter((vehicle) => !isFinalizedStatus(vehicle.status)).map((vehicle) => vehicle.plate))];
}

function isVehicleInPatio(plate) {
  return getActivePatioPlates().includes(plate);
}

function renderOperatorRows() {
  return adminOperators
    .map((operator) => {
      const totals = getOperatorProductionTotals(operator);
      return `
        <tr data-operator-row data-operator-status="${escapeHtml(operator.status)}" data-operator-profile="${escapeHtml(operator.accessProfile)}">
          <td>
            <strong>${escapeHtml(operator.name)}</strong><br />
            <small>${escapeHtml(operator.cpf)}</small>
          </td>
          <td>${escapeHtml(operator.accessProfile)}</td>
          <td>${escapeHtml(operator.username)}<br /><small>Senha: ${escapeHtml(operator.password)}</small></td>
          <td>${escapeHtml(operator.phone)}</td>
          <td>${escapeHtml(formatCommissionRule(operator))}</td>
          <td>${totals.services} serviço(s)<br /><small>${formatCurrency(totals.revenue)}</small></td>
          <td>${escapeHtml(operator.status)}</td>
          <td>
            <span class="table-actions">
              <button type="button" data-edit-operator="${operator.id}">Editar</button>
            </span>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderOperatorHistoryPanel(operator) {
  if (!operator) {
    return `
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Histórico</p>
          <h2>Acessos</h2>
        </div>
      </div>
      <p class="empty-plates">Nenhum operador cadastrado.</p>
    `;
  }

  const totals = getOperatorProductionTotals(operator);
  return `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">Histórico de acessos</p>
        <h2>${escapeHtml(operator.name)}</h2>
      </div>
    </div>
    <div class="operator-summary">
      <span>${escapeHtml(operator.accessProfile)}</span>
      <strong>${formatCurrency(getOperatorCommission(operator))}</strong>
      <p>${totals.services} serviço(s) / ${formatCurrency(totals.revenue)} em produção registrada</p>
    </div>
    <div class="history-section">
      ${operator.accessHistory
        .map(
          (item) => `
            <article class="history-item">
              <strong>${formatDateBR(item.date)} / ${escapeHtml(item.login)} - ${escapeHtml(item.logout)}</strong>
              <p>${escapeHtml(item.device)} / ${escapeHtml(item.result)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function applyOperatorTableFilter(container) {
  const query = normalizeText($("#operatorSearchInput", container).value);
  const activeFilter = $("[data-operator-filter].is-active", container)?.dataset.operatorFilter || "all";
  $$("[data-operator-row]", container).forEach((row) => {
    const matchesQuery = !query || normalizeText(row.textContent).includes(query);
    const matchesFilter =
      activeFilter === "all" ||
      row.dataset.operatorStatus === activeFilter ||
      row.dataset.operatorProfile === activeFilter;
    row.hidden = !matchesQuery || !matchesFilter;
  });
}

function getOperatorProductionRows(operator) {
  if (!operator) return [];

  const productionRows = (operator.production || []).flatMap((entry) => {
    if (Array.isArray(entry.items) && entry.items.length) {
      return entry.items.map((item, index) =>
        normalizeOperatorProductionRow(operator, {
          id: `${operator.id}-${entry.date}-${index}`,
          date: entry.date,
          service: item.service,
          duration: item.duration,
          value: item.value
        })
      );
    }
    return expandOperatorAggregateProduction(operator, entry);
  });

  const cashRows = getCashEntryOperatorProductionRows(operator);
  const rows = [...cashRows, ...productionRows];
  const uniqueRows = [];
  const seenKeys = new Set();

  rows.forEach((row) => {
    const key = [row.date, normalizeText(row.service), row.value.toFixed(2), row.sourceId || ""].join("|");
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    uniqueRows.push(row);
  });

  return uniqueRows.sort((a, b) => `${b.date} ${b.sourceId || ""}`.localeCompare(`${a.date} ${a.sourceId || ""}`));
}

function expandOperatorAggregateProduction(operator, entry) {
  const serviceCount = Math.max(0, Number(entry?.services || 0));
  const revenue = Math.max(0, Number(entry?.revenue || 0));
  if (!serviceCount) return [];

  const averageValue = serviceCount ? revenue / serviceCount : 0;
  return Array.from({ length: serviceCount }, (_, index) =>
    normalizeOperatorProductionRow(operator, {
      id: `${operator.id}-${entry.date}-aggregate-${index}`,
      date: entry.date,
      service: "Produção registrada",
      duration: "A definir",
      value: averageValue
    })
  );
}

function getCashEntryOperatorProductionRows(operator) {
  return cashEntries
    .filter((entry) => {
      if (entry.deleted || entry.type !== "Entrada") return false;
      const entryOperator = normalizeText(entry.operator || "");
      if (!entryOperator) return false;
      return [operator.name, operator.username].some((value) => normalizeText(value) === entryOperator);
    })
    .map((entry) => {
      const service = extractServiceNameFromProductionEntry(entry.description);
      return normalizeOperatorProductionRow(operator, {
        id: `cash-${entry.id}`,
        sourceId: `cash-${entry.id}`,
        date: entry.date || getTodayISO(),
        service,
        duration: entry.duration || getProductionServiceDuration(service),
        value: Math.abs(Number(entry.value || 0))
      });
    });
}

function extractServiceNameFromProductionEntry(description) {
  const text = String(description || "").trim();
  if (!text) return "Serviço registrado";
  const parts = text.split(" - ").map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? parts.slice(1).join(" - ") : text;
}

function normalizeOperatorProductionRow(operator, row) {
  const value = Number(row.value || 0);
  const commission = getOperatorCommissionForServiceValue(operator, value);
  return {
    id: row.id || `${operator.id}-${row.date}-${row.service}`,
    sourceId: row.sourceId || row.id || "",
    date: row.date || getTodayISO(),
    service: row.service || "Serviço registrado",
    duration: row.duration || getProductionServiceDuration(row.service),
    value,
    commission,
    netValue: value - commission
  };
}

function getProductionServiceDuration(serviceName) {
  const service = serviceCatalog.find((item) => normalizeText(item.name) === normalizeText(serviceName));
  return service?.duration || "A definir";
}

function getOperatorProductionTotals(operator) {
  const rows = getOperatorProductionRows(operator);
  return rows.reduce(
    (totals, item) => ({
      services: totals.services + 1,
      revenue: totals.revenue + item.value,
      commission: totals.commission + item.commission,
      netRevenue: totals.netRevenue + item.netValue,
      minutes: totals.minutes + parseServiceDurationMinutes(item.duration)
    }),
    { services: 0, revenue: 0, commission: 0, netRevenue: 0, minutes: 0 }
  );
}

function getOperatorCommission(operator) {
  return getOperatorProductionTotals(operator).commission;
}

function getOperatorCommissionForServiceValue(operator, value) {
  const serviceValue = Number(value || 0);
  if (!operator) return 0;
  if (operator.commissionType === "percent") return serviceValue * (Number(operator.commissionValue || 0) / 100);
  return Number(operator.commissionValue || 0);
}

function parseServiceDurationMinutes(duration) {
  const text = normalizeText(duration);
  if (!text || text === "a definir") return 0;
  const hourMatch = text.match(/(\d+)\s*h/);
  const minuteMatch = text.match(/(\d+)\s*min/);
  if (hourMatch || minuteMatch) {
    return (hourMatch ? Number(hourMatch[1]) * 60 : 0) + (minuteMatch ? Number(minuteMatch[1]) : 0);
  }
  const number = Number(text.replace(/[^\d.]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function formatServiceDurationMinutes(minutes) {
  const total = Math.round(Number(minutes || 0));
  if (!total) return "A definir";
  const hours = Math.floor(total / 60);
  const remainingMinutes = total % 60;
  if (!hours) return `${remainingMinutes} min`;
  return remainingMinutes ? `${hours}h${String(remainingMinutes).padStart(2, "0")}` : `${hours}h`;
}

function createReportFileSlug(value) {
  return removeDiacritics(value || "relatorio")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42) || "relatorio";
}

function getOperatorsCommissionTotal() {
  return adminOperators.reduce((total, operator) => total + getOperatorCommission(operator), 0);
}

function formatCommissionRule(operator) {
  return operator.commissionType === "percent"
    ? `${operator.commissionValue}% por serviço`
    : `${formatCurrency(operator.commissionValue)} por serviço`;
}

function getCommissionTypeLabel(value) {
  return value === "percent" ? "Percentual por serviço" : "Valor fixo por serviço";
}

function getCommissionTypeValue(label) {
  return label === "Percentual por serviço" ? "percent" : "fixed";
}

function findOperatorById(id) {
  return adminOperators.find((operator) => operator.id === Number(id));
}

function getNextOperatorId() {
  return Math.max(0, ...adminOperators.map((operator) => operator.id || 0)) + 1;
}

function getSelectedReportOperator() {
  if (!selectedReportOperatorId || !findOperatorById(selectedReportOperatorId)) {
    selectedReportOperatorId = adminOperators[0]?.id || null;
  }
  return selectedReportOperatorId ? findOperatorById(selectedReportOperatorId) : null;
}

function openOperatorDialog(operatorId = null) {
  selectedOperatorId = operatorId && findOperatorById(operatorId) ? Number(operatorId) : null;
  const operator = selectedOperatorId ? findOperatorById(selectedOperatorId) : null;
  const dialog = $("#operatorDialog");
  if (!dialog) return;

  dialog.innerHTML = renderOperatorDialogForm(operator);
  initIcons();
  bindOperatorDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  window.setTimeout(() => $("#operatorName", dialog)?.focus(), 0);
}

function closeOperatorDialog() {
  const dialog = $("#operatorDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedOperatorId = null;
}

function renderOperatorDialogForm(operator) {
  const commissionType = getCommissionTypeLabel(operator?.commissionType || "fixed");
  const commissionValue =
    operator?.commissionType === "percent"
      ? String(operator?.commissionValue || "").replace(".", ",")
      : formatCurrencyFieldValue(operator?.commissionValue || 0);

  return `
    <form class="vehicle-box operator-box" id="operatorForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">${operator ? "Edição" : "Cadastro"}</p>
          <h2 id="operatorDialogTitle">${operator ? escapeHtml(operator.name) : "Novo operador"}</h2>
        </div>
        <button class="icon-button" id="closeOperatorDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <div class="vehicle-form-grid operator-dialog-grid">
        <label class="login-field" for="operatorName">
          <span>Nome completo</span>
          <input id="operatorName" type="text" placeholder="Nome do operador" value="${escapeHtml(operator?.name || "")}" required />
        </label>
        <label class="login-field" for="operatorCpf">
          <span>CPF</span>
          <input id="operatorCpf" type="text" inputmode="numeric" placeholder="000.000.000-00" value="${escapeHtml(operator?.cpf || "")}" required />
        </label>
        <label class="login-field" for="operatorPhone">
          <span>Telefone</span>
          <input id="operatorPhone" type="tel" inputmode="tel" placeholder="(00) 90000-0000" value="${escapeHtml(operator?.phone || "")}" required />
        </label>
        <label class="login-field" for="operatorAccessProfile">
          <span>Perfil de acesso</span>
          <select id="operatorAccessProfile">
            ${renderSelectOptions(["Operador", "Administrador"], operator?.accessProfile || "Operador")}
          </select>
        </label>
        <label class="login-field" for="operatorRole">
          <span>Função</span>
          <input id="operatorRole" type="text" placeholder="Ex.: Operador de pátio" value="${escapeHtml(operator?.role || "")}" />
        </label>
        <label class="login-field" for="operatorShift">
          <span>Turno</span>
          <input id="operatorShift" type="text" placeholder="Ex.: 08:00 - 17:00" value="${escapeHtml(operator?.shift || "")}" />
        </label>
        <label class="login-field" for="operatorUsername">
          <span>Login</span>
          <input id="operatorUsername" type="text" placeholder="Login de acesso" value="${escapeHtml(operator?.username || "")}" required />
        </label>
        <label class="login-field" for="operatorPassword">
          <span>Senha</span>
          <input id="operatorPassword" type="text" placeholder="Senha inicial" value="${escapeHtml(operator?.password || "")}" required />
        </label>
        <label class="login-field" for="operatorCommissionType">
          <span>Regra de comissão</span>
          <select id="operatorCommissionType">
            ${renderSelectOptions(["Valor fixo por serviço", "Percentual por serviço"], commissionType)}
          </select>
        </label>
        <label class="login-field" for="operatorCommissionValue">
          <span>${operator?.commissionType === "percent" ? "Percentual" : "Valor da comissão"}</span>
          <input
            id="operatorCommissionValue"
            type="text"
            inputmode="decimal"
            data-money-input="${operator?.commissionType === "percent" ? "false" : "true"}"
            placeholder="${operator?.commissionType === "percent" ? "Ex.: 8" : "R$ 0,00"}"
            value="${escapeHtml(commissionValue)}"
            required
          />
        </label>
        <label class="login-field" for="operatorStatus">
          <span>Status</span>
          <select id="operatorStatus">
            ${renderSelectOptions(["Ativo", "Inativo"], operator?.status || "Ativo")}
          </select>
        </label>
      </div>

      <div class="dialog-actions">
        <button class="exit-button" id="cancelOperatorDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>${operator ? "Salvar operador" : "Cadastrar operador"}</span>
        </button>
      </div>
    </form>
  `;
}

function bindOperatorDialogControls(dialog) {
  bindCurrencyInputs(dialog);
  updateOperatorCommissionInputMode(dialog);

  $("#closeOperatorDialog", dialog)?.addEventListener("click", closeOperatorDialog);
  $("#cancelOperatorDialog", dialog)?.addEventListener("click", closeOperatorDialog);
  $("#operatorCommissionType", dialog)?.addEventListener("change", () => updateOperatorCommissionInputMode(dialog));
  $("#operatorCpf", dialog)?.addEventListener("input", (event) => {
    event.currentTarget.value = formatCpf(event.currentTarget.value);
  });
  $("#operatorPhone", dialog)?.addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $("#operatorForm", dialog)?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveOperatorRegistration(dialog);
  });
}

function saveOperatorRegistration(container) {
  const name = $("#operatorName", container).value.trim();
  const cpf = $("#operatorCpf", container).value.trim();
  const phone = $("#operatorPhone", container).value.trim();
  const accessProfile = $("#operatorAccessProfile", container).value;
  const role = $("#operatorRole", container).value.trim() || accessProfile;
  const shift = $("#operatorShift", container).value.trim() || "A definir";
  const username = $("#operatorUsername", container).value.trim();
  const password = $("#operatorPassword", container).value.trim();
  const commissionType = getCommissionTypeValue($("#operatorCommissionType", container).value);
  const commissionValue = getOperatorCommissionInputValue(container);
  const status = $("#operatorStatus", container).value;

  if (!name || !cpf || !phone || !username || !password || Number.isNaN(commissionValue)) {
    showToast("Preencha nome, CPF, telefone, login, senha e comissão.");
    return;
  }

  const duplicateLogin = adminOperators.some(
    (operator) => operator.id !== selectedOperatorId && normalizeText(operator.username) === normalizeText(username)
  );
  if (duplicateLogin) {
    showToast("Login já utilizado por outro operador.");
    return;
  }

  const operator = selectedOperatorId ? findOperatorById(selectedOperatorId) : null;
  let savedOperator = operator;
  if (operator) {
    Object.assign(operator, {
      name,
      cpf,
      phone,
      accessProfile,
      username,
      password,
      commissionType,
      commissionValue,
      role,
      shift,
      status
    });
  } else {
    savedOperator = {
      id: getNextOperatorId(),
      name,
      cpf,
      phone,
      accessProfile,
      username,
      password,
      commissionType,
      commissionValue,
      role,
      shift,
      today: 0,
      status,
      accessHistory: [
        { date: new Date().toISOString().slice(0, 10), login: "--:--", logout: "--:--", device: "Pendente", result: "Aguardando primeiro acesso" }
      ],
      production: [
        { date: new Date().toISOString().slice(0, 10), services: 0, revenue: 0, attendance: "Cadastrado" }
      ]
    };
    adminOperators.push(savedOperator);
  }

  selectedReportOperatorId = savedOperator.id;
  const wasEdit = Boolean(operator);
  closeOperatorDialog();
  renderOperatorsScreen($("#adminOperatorsContent"));
  renderAdminDashboard();
  showToast(wasEdit ? "Operador atualizado." : "Operador cadastrado.");
}

function emitOperatorReport(type) {
  const selectedId = Number($("#operatorReportSelect")?.value || selectedReportOperatorId);
  const operator = findOperatorById(selectedId) || adminOperators[0];
  if (!operator) {
    showToast("Selecione um operador para emitir relatório.");
    return;
  }

  const reportMap = {
    production: "Relatório de produção",
    commission: "Relatório de comissão",
    attendance: "Relatório de frequência"
  };

  if (type === "production") {
    const fileName = `producao-${createReportFileSlug(operator.name)}-${getTodayISO()}.pdf`;
    downloadPdfFile(fileName, "RELATORIO DE PRODUCAO", [], {
      reportLayout: "operatorProduction",
      operator,
      subtitle: "",
      documentNumber: `PROD-${String(operator.id).padStart(3, "0")}-${getTodayISO().replace(/-/g, "")}`,
      category: "Relatório",
      responsible: activeSessionUser || "Sistema LavaPrime",
      summary: `Produção individual de ${operator.name}, com valores líquidos descontando comissão.`
    });
    showToast("Relatório de produção emitido.");
    return;
  }

  if (type === "commission") {
    const fileName = `comissao-${createReportFileSlug(operator.name)}-${getTodayISO()}.pdf`;
    downloadPdfFile(fileName, "RELATORIO DE COMISSAO", [], {
      reportLayout: "operatorCommission",
      operator,
      subtitle: "",
      documentNumber: `COM-${String(operator.id).padStart(3, "0")}-${getTodayISO().replace(/-/g, "")}`,
      category: "Relatório",
      responsible: activeSessionUser || "Sistema LavaPrime",
      summary: `Comissões de ${operator.name} por serviços executados.`
    });
    showToast("Relatório de comissão emitido.");
    return;
  }

  const totals = getOperatorProductionTotals(operator);
  const lines = [
    "LavaPrime",
    reportMap[type] || "Relatório de operador",
    `Operador: ${operator.name}`,
    `CPF: ${operator.cpf}`,
    `Perfil: ${operator.accessProfile}`,
    `Login: ${operator.username}`,
    `Emitido em: ${new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}`,
    "",
    `Serviços registrados: ${totals.services}`,
    `Produção total: ${formatCurrency(totals.revenue)}`,
    `Regra de comissão: ${formatCommissionRule(operator)}`,
    `Comissão prevista: ${formatCurrency(getOperatorCommission(operator))}`,
    "",
    "Produção e frequência:",
    ...operator.production.map(
      (item) =>
        `${formatDateBR(item.date)} - ${item.services} serviço(s) - ${formatCurrency(item.revenue)} - ${item.attendance}`
    ),
    "",
    "Histórico de acessos:",
    ...operator.accessHistory.map(
      (item) => `${formatDateBR(item.date)} - ${item.login} às ${item.logout} - ${item.device} - ${item.result}`
    )
  ];

  downloadPdfFile(`${type}-${operator.name.replace(/\s+/g, "-").toLowerCase()}.pdf`, reportMap[type] || "Relatório de operador", lines.slice(2), {
    subtitle: `Operador: ${operator.name}`,
    category: "Relatório",
    summary: `Relatório administrativo de ${operator.name}.`
  });
  showToast(`${reportMap[type]} emitido.`);
}

function renderServicesScreen(container) {
  container.innerHTML = `
    <section class="screen-metrics service-metrics" aria-label="Resumo de serviços">
      ${[
        { label: "Serviços ativos", value: serviceCatalog.length, icon: "service" },
        { label: "Tipos de veículo", value: vehicleTypes.length, icon: "carFront" },
        { label: "Categorias", value: vehicleCategories.length, icon: "dashboard" },
        { label: "Fichas técnicas", value: `${getServiceTechnicalCoverageCount()}/${serviceCatalog.length}`, icon: "clipboard" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="service-admin-grid">
      <article class="admin-panel screen-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Serviços</p>
            <h2>Serviços contratáveis</h2>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table service-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Tipo de veículo</th>
                <th>Categoria de veículo</th>
                <th>Tempo</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${renderServiceRows()}
            </tbody>
          </table>
        </div>
      </article>

      <article class="admin-panel service-list-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Veículos</p>
            <h2>Tipos e categorias</h2>
          </div>
        </div>

        <div class="registry-list-block">
          <label class="login-field" for="newVehicleTypeName">
            <span>Tipo de veículo</span>
            <input id="newVehicleTypeName" type="text" placeholder="Ex.: Caminhão" />
          </label>
          <button class="ghost-action" id="addVehicleTypeButton" type="button">
            <span data-icon="plus"></span>
            <span>Adicionar tipo</span>
          </button>
          <div class="registry-chip-list">
            ${renderRegistryChipList(vehicleTypes, "type")}
          </div>
        </div>

        <div class="registry-list-block">
          <label class="login-field" for="newVehicleCategoryName">
            <span>Categoria de veículo</span>
            <input id="newVehicleCategoryName" type="text" placeholder="Ex.: Premium" />
          </label>
          <button class="ghost-action" id="addVehicleCategoryButton" type="button">
            <span data-icon="plus"></span>
            <span>Adicionar categoria</span>
          </button>
          <div class="registry-chip-list">
            ${renderRegistryChipList(vehicleCategories, "category")}
          </div>
        </div>
      </article>
    </section>
  `;

  initIcons();
  bindServicesScreenControls(container);
}

function bindServicesScreenControls(container) {
  $$("[data-edit-service]", container).forEach((button) => {
    button.addEventListener("click", () => openServiceDialog(Number(button.dataset.editService)));
  });

  $("#addVehicleTypeButton", container).addEventListener("click", () => {
    addVehicleRegistryOption(container, "#newVehicleTypeName", vehicleTypes, "Tipo de veículo cadastrado.");
  });

  $("#addVehicleCategoryButton", container).addEventListener("click", () => {
    addVehicleRegistryOption(container, "#newVehicleCategoryName", vehicleCategories, "Categoria cadastrada.");
  });

  $$("[data-delete-registry-option]", container).forEach((button) => {
    button.addEventListener("click", () => {
      deleteVehicleRegistryOption(container, button.dataset.registryKind, button.dataset.deleteRegistryOption);
    });
  });
}

function renderServiceRows() {
  return serviceCatalog
    .map(
      (service, index) => `
        <tr>
          <td data-label="Serviço"><strong>${escapeHtml(service.name)}</strong></td>
          <td data-label="Tipo de veículo">${escapeHtml(service.vehicleType)}</td>
          <td data-label="Categoria">${escapeHtml(shouldUseVehicleCategory(service.vehicleType) ? service.vehicleCategory : "-")}</td>
          <td data-label="Tempo">${escapeHtml(service.duration)}</td>
          <td data-label="Preço">${formatCurrency(service.price)}</td>
          <td data-label="Status">${escapeHtml(service.status)}</td>
          <td data-label="Ações">
            <span class="table-actions">
              <button type="button" data-edit-service="${index}">Editar</button>
            </span>
          </td>
        </tr>
      `
    )
    .join("");
}

function openServiceDialog(serviceIndex = null) {
  selectedServiceIndex = Number.isInteger(serviceIndex) && serviceCatalog[serviceIndex] ? serviceIndex : null;
  const service = selectedServiceIndex !== null ? serviceCatalog[selectedServiceIndex] : null;
  const dialog = $("#serviceDialog");
  dialog.innerHTML = renderServiceDialogForm(service);
  initIcons();
  bindServiceDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  window.setTimeout(() => $("#serviceName", dialog)?.focus(), 0);
}

function closeServiceDialog() {
  const dialog = $("#serviceDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedServiceIndex = null;
}

function renderServiceDialogForm(service) {
  return `
    <form class="vehicle-box service-box" id="serviceForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">${service ? "Edição" : "Cadastro"}</p>
          <h2 id="serviceDialogTitle">${service ? escapeHtml(service.name) : "Novo serviço"}</h2>
        </div>
        <button class="icon-button" id="closeServiceDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <div class="vehicle-form-grid service-dialog-grid">
        <label class="login-field" for="serviceName">
          <span>Nome do serviço</span>
          <input id="serviceName" type="text" placeholder="Ex.: Lavagem Prime" value="${escapeHtml(service?.name || "")}" required />
        </label>
        <label class="login-field" for="serviceVehicleType">
          <span>Tipo de veículo</span>
          <select id="serviceVehicleType" required>
            ${renderRegistrySelectOptions(vehicleTypes, service?.vehicleType || vehicleTypes[0] || "")}
          </select>
        </label>
        <label class="login-field" for="serviceVehicleCategory">
          <span>Categoria de veículo</span>
          <select id="serviceVehicleCategory" required>
            ${renderRegistrySelectOptions(vehicleCategories, service?.vehicleCategory || vehicleCategories[0] || "")}
          </select>
        </label>
        <label class="login-field" for="servicePrice">
          <span>Valor</span>
          <input id="servicePrice" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(service?.price))}" required />
        </label>
        <label class="login-field" for="serviceDuration">
          <span>Tempo previsto</span>
          <input id="serviceDuration" type="text" placeholder="35 min" value="${escapeHtml(service?.duration || "")}" />
        </label>
        <label class="login-field" for="serviceStatus">
          <span>Status</span>
          <select id="serviceStatus" required>
            ${renderSelectOptions(["Ativo", "Inativo"], service?.status || "Ativo")}
          </select>
        </label>
      </div>

      <section class="vehicle-special-care-section service-technical-section">
        <div class="vehicle-special-care-head">
          <div>
            <p class="eyebrow">Composição do serviço</p>
            <h3>Insumos e custo aproximado</h3>
          </div>
          <span class="client-status-label" id="serviceSupplyEstimatedCost">${formatCurrency(calculateServiceSupplyEntriesCost(getServiceSupplyProfile(service || {})))}</span>
        </div>
        <div class="sale-lines-block service-supplies-inline-block">
          <div class="sale-lines-head">
            <h3>Insumos de uso interno</h3>
            <button class="ghost-action compact" id="addServiceDialogSupplyLineButton" type="button" ${supplyCatalog.some((item) => item.active !== false) ? "" : "disabled"}>
              <span data-icon="plus"></span>
              <span>Adicionar insumo</span>
            </button>
          </div>
          <div id="serviceDialogSupplyLines">
            ${renderServiceSupplyLinesForServiceDialog(service || {})}
          </div>
        </div>
        <label class="switch-field" for="serviceMaintenanceRequired">
          <input id="serviceMaintenanceRequired" type="checkbox" ${service?.maintenanceRequired ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Requer Manutenção</span>
        </label>
        <div class="vehicle-form-grid service-dialog-grid inventory-form-grid" id="serviceMaintenanceFields" ${service?.maintenanceRequired ? "" : "hidden"}>
          <label class="login-field" for="serviceMaintenanceInterval">
            <span>Periodicidade</span>
            <select id="serviceMaintenanceInterval">
              ${renderSelectOptions([
                { value: "monthly", label: "Mensal" },
                { value: "bimonthly", label: "Bimestral" },
                { value: "semiannual", label: "Semestral" },
                { value: "annual", label: "Anual" },
                { value: "custom", label: "Escolher no calendário" }
              ], service?.maintenanceInterval || "monthly")}
            </select>
          </label>
          <label class="login-field" for="serviceMaintenanceDate" ${service?.maintenanceInterval === "custom" ? "" : "hidden"}>
            <span>Data do lembrete</span>
            <input id="serviceMaintenanceDate" type="date" value="${escapeHtml(service?.maintenanceDate || "")}" min="${escapeHtml(getTodayISO())}" />
          </label>
        </div>
      </section>

      <div class="dialog-actions">
        <button class="exit-button" id="cancelServiceDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>${service ? "Atualizar serviço" : "Salvar serviço"}</span>
        </button>
      </div>
    </form>
  `;
}

function bindServiceDialogControls(dialog) {
  bindCurrencyInputs(dialog);
  updateServiceCategoryState(dialog);
  $("#serviceVehicleType", dialog).addEventListener("change", () => updateServiceCategoryState(dialog));
  $("#closeServiceDialog", dialog).addEventListener("click", closeServiceDialog);
  $("#cancelServiceDialog", dialog).addEventListener("click", closeServiceDialog);
  $("#serviceMaintenanceRequired", dialog)?.addEventListener("change", () => updateServiceMaintenanceFields(dialog));
  $("#serviceMaintenanceInterval", dialog)?.addEventListener("change", () => updateServiceMaintenanceFields(dialog));
  $("#addServiceDialogSupplyLineButton", dialog)?.addEventListener("click", () => {
    const lines = $("#serviceDialogSupplyLines", dialog);
    const index = $$("[data-service-supply-row]", dialog).length;
    lines.insertAdjacentHTML("beforeend", renderServiceSupplyLine({}, index));
    initIcons();
    bindServiceDialogSupplyControls(dialog);
    updateServiceDialogEstimatedCost(dialog);
  });
  updateServiceMaintenanceFields(dialog);
  bindServiceDialogSupplyControls(dialog);
  updateServiceDialogEstimatedCost(dialog);
  $("#serviceForm", dialog).addEventListener("submit", (event) => {
    event.preventDefault();
    saveServiceRegistration(dialog);
  });
}

function updateServiceMaintenanceFields(dialog) {
  const enabled = Boolean($("#serviceMaintenanceRequired", dialog)?.checked);
  const fields = $("#serviceMaintenanceFields", dialog);
  if (fields) fields.hidden = !enabled;
  const dateField = $("#serviceMaintenanceDate", dialog)?.closest(".login-field");
  if (dateField) dateField.hidden = !enabled || $("#serviceMaintenanceInterval", dialog)?.value !== "custom";
}

function bindServiceDialogSupplyControls(dialog) {
  $$("[data-remove-service-supply-line]", dialog).forEach((button) => {
    button.onclick = () => {
      const rows = $$("[data-service-supply-row]", dialog);
      if (rows.length <= 1) {
        showToast("Mantenha ao menos um insumo ou cadastre outro depois.");
        return;
      }
      button.closest("[data-service-supply-row]")?.remove();
      updateServiceDialogEstimatedCost(dialog);
    };
  });
  $$("[data-service-supply-id], [data-service-supply-quantity]", dialog).forEach((field) => {
    field.onchange = () => updateServiceDialogEstimatedCost(dialog);
    field.oninput = () => updateServiceDialogEstimatedCost(dialog);
  });
}

function saveServiceRegistration(container) {
  const name = $("#serviceName", container).value.trim();
  const vehicleType = $("#serviceVehicleType", container).value;
  const vehicleCategory = getVehicleCategoryValue(vehicleType, $("#serviceVehicleCategory", container).value);
  const price = getCurrencyInputValue("#servicePrice", container);
  const duration = $("#serviceDuration", container).value.trim() || "A definir";
  const status = $("#serviceStatus", container).value;
  const supplyEntries = readServiceSupplyEntriesFromDialog(container);
  const maintenanceRequired = Boolean($("#serviceMaintenanceRequired", container)?.checked);
  const maintenanceInterval = $("#serviceMaintenanceInterval", container)?.value || "monthly";
  const maintenanceDate = maintenanceInterval === "custom" ? $("#serviceMaintenanceDate", container)?.value || "" : "";

  if (!name || !vehicleType || (shouldUseVehicleCategory(vehicleType) && !vehicleCategory) || !price) {
    showToast(shouldUseVehicleCategory(vehicleType) ? "Informe nome, tipo, categoria e valor do serviço." : "Informe nome, tipo e valor do serviço.");
    return;
  }

  const duplicateService = serviceCatalog.some(
    (service, index) => index !== selectedServiceIndex && normalizeText(service.name) === normalizeText(name)
  );
  if (duplicateService) {
    showToast("Serviço já cadastrado.");
    return;
  }

  if (maintenanceRequired && maintenanceInterval === "custom" && !maintenanceDate) {
    showToast("Escolha a data do lembrete de manutenção.");
    $("#serviceMaintenanceDate", container)?.focus();
    return;
  }

  const previousService = selectedServiceIndex !== null ? serviceCatalog[selectedServiceIndex] : null;
  const previousName = previousService?.name || "";
  const previousProfileKey = previousService ? getServiceSupplyProfileKey(previousService) : "";
  const serviceData = {
    name,
    price,
    duration,
    vehicleType,
    vehicleCategory,
    status,
    autoCreateVehicleCareType: previousService?.autoCreateVehicleCareType || "",
    maintenanceRequired,
    maintenanceInterval,
    maintenanceDate
  };
  const nextProfileKey = getServiceSupplyProfileKey(serviceData);

  if (previousService) {
    serviceCatalog[selectedServiceIndex] = serviceData;
    syncRenamedService(previousName, name, price);
    if (previousProfileKey && previousProfileKey !== nextProfileKey && serviceSupplyProfiles[previousProfileKey]) {
      serviceSupplyProfiles[nextProfileKey] = serviceSupplyProfiles[previousProfileKey];
      delete serviceSupplyProfiles[previousProfileKey];
      saveServiceSupplyProfiles();
    }
  } else {
    serviceCatalog.push(serviceData);
  }
  if (supplyEntries.length) serviceSupplyProfiles[nextProfileKey] = supplyEntries;
  else delete serviceSupplyProfiles[nextProfileKey];
  serviceSupplyProfiles = normalizeServiceSupplyProfiles(serviceSupplyProfiles);
  saveServiceSupplyProfiles();

  closeServiceDialog();
  renderServicesScreen($("#adminServicesContent"));
  renderSuppliesScreen($("#adminSuppliesContent"));
  renderVehicleEntryOptions();
  renderPatio();
  showToast(previousService ? "Serviço atualizado." : "Serviço cadastrado.");
}

function updateServiceCategoryState(container) {
  const type = $("#serviceVehicleType", container)?.value || "";
  const select = $("#serviceVehicleCategory", container);
  const field = select?.closest(".login-field");
  if (!select || !field) return;

  const hidden = !shouldUseVehicleCategory(type);
  field.hidden = hidden;
  select.disabled = hidden;
  select.required = !hidden;
  if (hidden) select.value = "";
  else if (!select.value && vehicleCategories.length) select.value = vehicleCategories[0];
}

function syncRenamedService(previousName, nextName, nextPrice) {
  if (!previousName) return;
  if (previousName !== nextName) {
    patioVehicles.forEach((vehicle) => {
      if (Array.isArray(vehicle.services)) {
        vehicle.services = vehicle.services.map((service) => (service === previousName ? nextName : service));
        vehicle.service = formatServices(vehicle.services);
      } else if (vehicle.service === previousName) {
        vehicle.service = nextName;
      }
    });
    vehicleRegistry.forEach((vehicle) => {
      vehicle.serviceHistory.forEach((item) => {
        if (item.service === previousName) item.service = nextName;
      });
    });
    invoiceLineItems.forEach((item) => {
      if (item.service === previousName) item.service = nextName;
    });
  }
}

function renderRegistryChipList(list, kind) {
  return list
    .map(
      (item) => `
        <span class="table-plate-chip registry-option-chip">
          <span>${escapeHtml(item)}</span>
          <button
            type="button"
            aria-label="Excluir ${escapeHtml(item)}"
            data-registry-kind="${escapeHtml(kind)}"
            data-delete-registry-option="${escapeHtml(item)}"
          >
            ${icons.x}
          </button>
        </span>
      `
    )
    .join("");
}

function renderRegistrySelectOptions(list, selectedValue, config = {}) {
  const options = list.includes(selectedValue) || !selectedValue ? list : [selectedValue, ...list];
  const value = selectedValue || options[0] || "";
  const labelGetter = typeof config.labelGetter === "function" ? config.labelGetter : (option) => option;
  return options
    .map((option) => {
      const label = labelGetter(option);
      return `<option value="${escapeHtml(option)}" ${String(option) === String(value) ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderChoiceChipGroup(options, selectedValues = [], config = {}) {
  const values = new Set((selectedValues || []).map((value) => String(value)));
  const name = config.name || "choice";
  const twoColumns = config.twoColumns ? " is-two-columns" : "";
  return `
    <div class="choice-chip-group${twoColumns}">
      ${options
        .map((option, index) => {
          const value = String(option.value ?? option.tag ?? option.label ?? "");
          const label = String(option.label ?? option.value ?? option.tag ?? "");
          const inputId = `${name}-${index}-${value.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
          return `
            <label class="choice-chip" for="${escapeHtml(inputId)}">
              <input id="${escapeHtml(inputId)}" type="checkbox" name="${escapeHtml(name)}" value="${escapeHtml(value)}" ${values.has(value) ? "checked" : ""} />
              <span>${escapeHtml(label)}</span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;
}

function getCheckedValuesByName(scope, name) {
  return $$(`input[name="${cssEscape(name)}"]:checked`, scope).map((input) => input.value);
}

function addVehicleRegistryOption(container, selector, list, successMessage) {
  const input = $(selector, container);
  const value = input.value.trim();
  if (!value) {
    input.focus();
    showToast("Informe um nome para cadastrar.");
    return;
  }
  if (list.some((item) => normalizeText(item) === normalizeText(value))) {
    showToast("Item já cadastrado.");
    return;
  }
  list.push(value);
  renderServicesScreen(container);
  refreshOpenServiceDialogRegistryOptions(list === vehicleTypes ? "type" : "category", value);
  renderVehicleEntryOptions();
  showToast(successMessage);
}

async function deleteVehicleRegistryOption(container, kind, value) {
  const list = kind === "type" ? vehicleTypes : vehicleCategories;
  const label = kind === "type" ? "tipo de veículo" : "categoria de veículo";
  const index = list.findIndex((item) => item === value);
  if (index < 0) return;

  if (list.length <= 1) {
    showToast(`Mantenha ao menos um ${label} cadastrado.`);
    return;
  }

  const usage = getVehicleRegistryOptionUsage(kind, value);
  if (usage.services || usage.vehicles) {
    await showMessageBox({
      title: "Item em uso",
      message: `Não é possível excluir este ${label}, pois ele está vinculado a ${usage.services} serviço(s) e ${usage.vehicles} veículo(s). Edite esses cadastros antes de excluir.`,
      confirmLabel: "Entendi"
    });
    return;
  }

  list.splice(index, 1);
  renderServicesScreen(container);
  refreshOpenServiceDialogRegistryOptions(kind);
  renderVehicleEntryOptions();
  showToast(`${capitalize(label)} removido.`);
}

function refreshOpenServiceDialogRegistryOptions(kind, preferredValue = "") {
  const dialog = $("#serviceDialog");
  if (!dialog?.open) return;

  const select = kind === "type" ? $("#serviceVehicleType", dialog) : $("#serviceVehicleCategory", dialog);
  const list = kind === "type" ? vehicleTypes : vehicleCategories;
  if (!select) return;

  const nextValue = preferredValue || (list.includes(select.value) ? select.value : list[0] || "");
  select.innerHTML = renderRegistrySelectOptions(list, nextValue);
  select.value = nextValue;
  updateServiceCategoryState(dialog);
}

function getVehicleRegistryOptionUsage(kind, value) {
  const normalizedValue = normalizeText(value);
  const services = serviceCatalog.filter((service) => {
    const serviceValue = kind === "type" ? service.vehicleType : service.vehicleCategory;
    return normalizeText(serviceValue) === normalizedValue;
  }).length;
  const vehicles = vehicleRegistry.filter((vehicle) => {
    const vehicleValue = kind === "type" ? vehicle.type : vehicle.category;
    return normalizeText(vehicleValue) === normalizedValue;
  }).length;
  const patio = patioVehicles.filter((vehicle) => {
    const vehicleValue = kind === "type" ? vehicle.type : vehicle.category;
    return normalizeText(vehicleValue) === normalizedValue;
  }).length;
  return { services, vehicles: vehicles + patio };
}

function getAdminScreenContent(view) {
  const screens = {
    clients: getClientsScreenContent,
    operators: getOperatorsScreenContent,
    services: getServicesScreenContent,
    cashflow: getCashflowScreenContent,
    payables: getPayablesScreenContent,
    invoices: getInvoicesScreenContent
  };

  return screens[view] ? screens[view]() : null;
}

function getCombinedInventoryItems() {
  return [
    ...productCatalog.map((item) => ({ ...item, kind: "product", kindLabel: "Produto", priceLabel: formatCurrency(item.price) })),
    ...supplyCatalog.map((item) => ({ ...item, kind: "supply", kindLabel: "Insumo", priceLabel: formatCurrency(item.cost) }))
  ];
}

function getInventoryTotalValue() {
  const productValue = productCatalog.reduce((total, item) => total + Number(item.stock || 0) * Number(item.cost || 0), 0);
  const supplyValue = supplyCatalog.reduce((total, item) => total + Number(item.stock || 0) * Number(item.cost || 0), 0);
  return productValue + supplyValue;
}

function getProductSalesRevenueTotal() {
  return productSales.reduce((total, sale) => total + Number(sale.total || 0), 0);
}

function getProductSalesItemsTotal() {
  return productSales.reduce(
    (total, sale) => total + sale.items.reduce((itemsTotal, item) => itemsTotal + Number(item.quantity || 0), 0),
    0
  );
}

function getTopSoldProducts(limit = 3) {
  const totals = new Map();
  productSales.forEach((sale) => {
    sale.items.forEach((item) => {
      const key = item.name || `Produto ${item.productId}`;
      totals.set(key, (totals.get(key) || 0) + Number(item.quantity || 0));
    });
  });
  return Array.from(totals.entries())
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((left, right) => right.quantity - left.quantity)
    .slice(0, limit);
}

function getDocumentHistoryByCategory(category = "Todos") {
  return documentHistory.filter((item) => category === "Todos" || normalizeText(item.category) === normalizeText(category));
}

function renderServiceEntryScreen(container) {
  const queue = patioVehicles.filter((vehicle) => !isFinalizedStatus(vehicle.status));
  const pendingQuotes = quoteEstimates.filter((quote) => quote.status === "Pendente");
  const quickPayments = getActivePaymentMethodNames("service");
  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo do atendimento">
      ${[
        { label: "Na fila hoje", value: queue.length, icon: "carFront" },
        { label: "Agendados", value: countByStatus("agendado"), icon: "hourglass" },
        { label: "Orçamentos pendentes", value: pendingQuotes.length, icon: "invoice" },
        { label: "Receita prevista", value: formatCurrency(queue.reduce((total, vehicle) => total + getVehiclePaymentTotal(vehicle), 0)), icon: "wallet" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="admin-screen-grid">
      <article class="admin-panel screen-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Atalhos</p>
            <h2>Iniciar atendimento</h2>
          </div>
        </div>
        <div class="quick-action-grid">
          <button class="primary-button" type="button" data-service-entry-action="new-entry">
            <span data-icon="plus"></span>
            <span>Novo veículo no pátio</span>
          </button>
          <button class="ghost-action" type="button" data-service-entry-action="quotes">
            <span data-icon="invoice"></span>
            <span>Ver orçamentos</span>
          </button>
          <button class="ghost-action" type="button" data-service-entry-action="patio">
            <span data-icon="dashboard"></span>
            <span>Acompanhar o pátio</span>
          </button>
        </div>
        <div class="screen-side-list compact-top">
          ${queue.length
            ? queue
                .slice(0, 5)
                .map(
                  (vehicle) => `
                    <article class="screen-side-item">
                      <span>${escapeHtml(getStatusGroupLabel(vehicle.status))}</span>
                      <strong>${escapeHtml(vehicle.plate)} - ${escapeHtml(vehicle.service)}</strong>
                      <p>${escapeHtml(vehicle.owner)} · ${formatCurrency(getVehiclePaymentTotal(vehicle))}</p>
                    </article>
                  `
                )
                .join("")
            : '<p class="empty-alert">Nenhum atendimento aguardando abertura agora.</p>'}
        </div>
      </article>

      <article class="admin-panel screen-side-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Operação</p>
            <h2>Base rápida do turno</h2>
          </div>
        </div>
        <div class="screen-side-list">
          <article class="screen-side-item">
            <span>Pagamentos ativos</span>
            <strong>${escapeHtml(quickPayments.slice(0, 3).join(", ") || "Sem métodos ativos")}</strong>
            <p>As formas disponíveis vêm das Configurações Financeiras.</p>
          </article>
          <article class="screen-side-item">
            <span>Serviços com ficha técnica</span>
            <strong>${getServiceTechnicalCoverageCount()} de ${serviceCatalog.length}</strong>
            <p>${getServicesWithoutSupplyProfile().length ? "Ainda há serviços sem composição de insumos." : "Todos os serviços já têm composição configurada."}</p>
          </article>
          <article class="screen-side-item">
            <span>Estoque sob atenção</span>
            <strong>${getLowStockProducts().length + getLowStockSupplies().length} alerta(s)</strong>
            <p>Produtos e insumos com estoque mínimo entram no radar da operação.</p>
          </article>
        </div>
      </article>
    </section>
  `;
  initIcons();
  $$("[data-service-entry-action]", container).forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.serviceEntryAction;
      if (action === "new-entry") openVehicleDialog("entry");
      if (action === "quotes") showAdminView("quotes");
      if (action === "patio") showAdminView("patio");
    });
  });
}

function renderProductsScreen(container) {
  const lowStock = getLowStockProducts();
  const averageMargin = productCatalog.length
    ? `${(productCatalog.reduce((total, product) => total + getProductMarginPercent(product), 0) / productCatalog.length).toFixed(1).replace(".", ",")}%`
    : "0%";
  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo dos produtos">
      ${[
        { label: "Produtos ativos", value: productCatalog.filter((item) => item.active !== false).length, icon: "package" },
        { label: "Baixo estoque", value: lowStock.length, icon: "alert" },
        { label: "Margem média", value: averageMargin, icon: "wallet" },
        { label: "Valor em estoque", value: formatCurrency(productCatalog.reduce((total, item) => total + Number(item.stock || 0) * Number(item.cost || 0), 0)), icon: "clipboard" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>
    <section class="screen-toolbar inventory-toolbar" aria-label="Filtros dos produtos">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.package}</span>
        <input id="productSearchInput" type="search" placeholder="Buscar produto, SKU ou observação" />
      </label>
      <div class="screen-filters" id="productFilters">
        ${["Todos", "Ativos", "Baixo estoque", "Inativos"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-product-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`)
          .join("")}
      </div>
      <div class="toolbar-actions">
        <button class="ghost-action" type="button" id="openProductAdjustmentsButton">
          <span data-icon="clipboard"></span>
          <span>Ajustar estoque</span>
        </button>
      </div>
    </section>
    <section class="admin-screen-grid inventory-screen-grid documents-screen-grid">
      <article class="admin-panel screen-table-panel documents-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Cadastro</p>
            <h2>Produtos para venda</h2>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table inventory-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>SKU</th>
                <th>Estoque</th>
                <th>Custo</th>
                <th>Venda</th>
                <th>Margem</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${productCatalog
                .map(
                  (product) => `
                    <tr data-product-row data-product-filter-value="${product.active !== false ? (isLowStockItem(product) ? "Baixo estoque" : "Ativos") : "Inativos"}">
                      <td data-label="Produto"><strong>${escapeHtml(product.name)}</strong><small class="table-note">${escapeHtml(product.notes || "Produto de balcão.")}</small></td>
                      <td data-label="SKU">${escapeHtml(product.sku)}</td>
                      <td data-label="Estoque">${formatInventoryQuantity(product.stock, product.unit)}</td>
                      <td data-label="Custo">${formatCurrency(product.cost)}</td>
                      <td data-label="Venda">${formatCurrency(product.price)}</td>
                      <td data-label="Margem">${getProductMarginPercent(product).toFixed(1).replace(".", ",")}%</td>
                      <td data-label="Status"><span class="inventory-pill ${product.active !== false ? "is-active" : "is-inactive"}">${product.active !== false ? "Ativo" : "Inativo"}</span></td>
                      <td data-label="Ações">
                        <div class="cashflow-row-actions">
                          <button class="ghost-action" type="button" data-edit-product="${product.id}">Editar</button>
                          <button class="ghost-action" type="button" data-adjust-product="${product.id}">Estoque</button>
                        </div>
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </article>
      <article class="admin-panel screen-side-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Atenção</p>
            <h2>Produtos em foco</h2>
          </div>
        </div>
        <div class="screen-side-list">
          ${
            lowStock.length
              ? lowStock
                  .map(
                    (item) => `
                      <article class="screen-side-item">
                        <span>Baixo estoque</span>
                        <strong>${escapeHtml(item.name)}</strong>
                        <p>${formatInventoryQuantity(item.stock, item.unit)} em estoque · mínimo ${formatInventoryQuantity(item.minStock, item.unit)}</p>
                      </article>
                    `
                  )
                  .join("")
              : '<p class="empty-alert">Todos os produtos estão acima do estoque mínimo.</p>'
          }
        </div>
      </article>
    </section>
  `;
  initIcons();
  bindProductsScreenControls(container);
}

function renderSuppliesScreen(container) {
  const lowStock = getLowStockSupplies();
  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo dos insumos">
      ${[
        { label: "Insumos ativos", value: supplyCatalog.filter((item) => item.active !== false).length, icon: "flask" },
        { label: "Baixo estoque", value: lowStock.length, icon: "alert" },
        { label: "Custo imobilizado", value: formatCurrency(supplyCatalog.reduce((total, item) => total + Number(item.stock || 0) * Number(item.cost || 0), 0)), icon: "wallet" },
        { label: "Serviços com ficha", value: getServiceTechnicalCoverageCount(), icon: "service" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>
    <section class="screen-toolbar inventory-toolbar" aria-label="Filtros dos insumos">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.flask}</span>
        <input id="supplySearchInput" type="search" placeholder="Buscar insumo, fornecedor ou SKU" />
      </label>
      <div class="screen-filters" id="supplyFilters">
        ${["Todos", "Ativos", "Baixo estoque", "Inativos"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-supply-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`)
          .join("")}
      </div>
      <div class="toolbar-actions">
        <button class="ghost-action" type="button" id="openSupplyAdjustmentsButton">
          <span data-icon="clipboard"></span>
          <span>Ajustar estoque</span>
        </button>
      </div>
    </section>
    <section class="admin-screen-grid inventory-screen-grid documents-screen-grid">
      <article class="admin-panel screen-table-panel documents-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Cadastro</p>
            <h2>Insumos internos</h2>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table inventory-table">
            <thead>
              <tr>
                <th>Insumo</th>
                <th>SKU</th>
                <th>Estoque</th>
                <th>Custo</th>
                <th>Fornecedor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${supplyCatalog
                .map(
                  (item) => `
                    <tr data-supply-row data-supply-filter-value="${item.active !== false ? (isLowStockItem(item) ? "Baixo estoque" : "Ativos") : "Inativos"}">
                      <td data-label="Insumo"><strong>${escapeHtml(item.name)}</strong><small class="table-note">${escapeHtml(item.notes || "Consumo interno da operação.")}</small></td>
                      <td data-label="SKU">${escapeHtml(item.sku)}</td>
                      <td data-label="Estoque">${formatInventoryQuantity(item.stock, item.unit)}</td>
                      <td data-label="Custo">${formatCurrency(item.cost)}</td>
                      <td data-label="Fornecedor">${escapeHtml(item.supplier || "-")}</td>
                      <td data-label="Status"><span class="inventory-pill ${item.active !== false ? "is-active" : "is-inactive"}">${item.active !== false ? "Ativo" : "Inativo"}</span></td>
                      <td data-label="Ações">
                        <div class="cashflow-row-actions">
                          <button class="ghost-action" type="button" data-edit-supply="${item.id}">Editar</button>
                          <button class="ghost-action" type="button" data-adjust-supply="${item.id}">Estoque</button>
                        </div>
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  `;
  initIcons();
  bindSuppliesScreenControls(container);
}

function renderInventoryScreen(container) {
  const combinedItems = getCombinedInventoryItems();
  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo do inventário">
      ${[
        { label: "Itens monitorados", value: combinedItems.length, icon: "clipboard" },
        { label: "Produtos em alerta", value: getLowStockProducts().length, icon: "package" },
        { label: "Insumos em alerta", value: getLowStockSupplies().length, icon: "flask" },
        { label: "Valor total", value: formatCurrency(getInventoryTotalValue()), icon: "wallet" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>
    <section class="screen-toolbar inventory-toolbar" aria-label="Filtros do inventário">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.clipboard}</span>
        <input id="inventorySearchInput" type="search" placeholder="Buscar item, SKU ou motivo de ajuste" />
      </label>
      <div class="screen-filters" id="inventoryFilters">
        ${["Todos", "Produtos", "Insumos", "Baixo estoque"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-inventory-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`)
          .join("")}
      </div>
    </section>
    <section class="admin-screen-grid inventory-screen-grid">
      <article class="admin-panel screen-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Inventário</p>
            <h2>Posição atual dos estoques</h2>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table inventory-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Tipo</th>
                <th>Estoque</th>
                <th>Mínimo</th>
                <th>Custo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${combinedItems
                .map(
                  (item) => `
                    <tr data-inventory-row data-inventory-filter-value="${isLowStockItem(item) ? "Baixo estoque" : item.kind === "product" ? "Produtos" : "Insumos"}">
                      <td data-label="Item"><strong>${escapeHtml(item.name)}</strong><small class="table-note">${escapeHtml(item.sku)}</small></td>
                      <td data-label="Tipo">${escapeHtml(item.kindLabel)}</td>
                      <td data-label="Estoque">${formatInventoryQuantity(item.stock, item.unit)}</td>
                      <td data-label="Mínimo">${formatInventoryQuantity(item.minStock, item.unit)}</td>
                      <td data-label="Custo">${formatCurrency(item.cost)}</td>
                      <td data-label="Status"><span class="inventory-pill ${isLowStockItem(item) ? "is-warning" : "is-active"}">${isLowStockItem(item) ? "Atenção" : "Saudável"}</span></td>
                      <td data-label="Ações">
                        <div class="cashflow-row-actions">
                          <button class="ghost-action" type="button" data-adjust-inventory-kind="${item.kind}" data-adjust-inventory-id="${item.id}">Ajustar</button>
                        </div>
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </article>
      <article class="admin-panel screen-side-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Histórico</p>
            <h2>Ultimos movimentos</h2>
          </div>
        </div>
        <div class="screen-side-list">
          ${
            inventoryMovements.length
              ? inventoryMovements
                  .slice(0, 8)
                  .map(
                    (movement) => `
                      <article class="screen-side-item">
                        <span>${escapeHtml(getInventoryMovementLabel(movement.type))}</span>
                        <strong>${escapeHtml(movement.itemName)}</strong>
                        <p>${escapeHtml(movement.createdAt)} · ${formatInventoryQuantity(movement.quantity, movement.unit)} · saldo ${formatInventoryQuantity(movement.currentStock, movement.unit)}</p>
                      </article>
                    `
                  )
                  .join("")
              : '<p class="empty-alert">Nenhum movimento de estoque registrado ainda.</p>'
          }
        </div>
      </article>
    </section>
  `;
  initIcons();
  bindInventoryScreenControls(container);
}

function renderProductSalesScreen(container) {
  const topProducts = getTopSoldProducts();
  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo das vendas de produtos">
      ${[
        { label: "Vendas registradas", value: productSales.length, icon: "package" },
        { label: "Itens vendidos", value: getProductSalesItemsTotal(), icon: "clipboard" },
        { label: "Faturamento", value: formatCurrency(getProductSalesRevenueTotal()), icon: "wallet" },
        { label: "Métodos ativos", value: getActivePaymentMethodNames("productSale").length, icon: "card" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>
    <section class="screen-toolbar inventory-toolbar" aria-label="Filtros das vendas">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.package}</span>
        <input id="productSaleSearchInput" type="search" placeholder="Buscar venda, cliente, placa ou produto" />
      </label>
      <div class="screen-filters" id="productSaleFilters">
        ${["Todos", "Hoje", "Com placa", "Sem placa"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-product-sale-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`)
          .join("")}
      </div>
      <div class="toolbar-actions">
        <button class="ghost-action" type="button" id="repeatLastProductSaleButton" ${productSales.length ? "" : "disabled"}>
          <span data-icon="plus"></span>
          <span>Replicar última venda</span>
        </button>
      </div>
    </section>
    <section class="admin-screen-grid inventory-screen-grid">
      <article class="admin-panel screen-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Operação</p>
            <h2>Vendas concluídas</h2>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table inventory-table">
            <thead>
              <tr>
                <th>Venda</th>
                <th>Cliente</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Pagamento</th>
                <th>Documento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${
                productSales.length
                  ? productSales
                      .map(
                        (sale) => `
                          <tr data-product-sale-row data-product-sale-filter-value="${sale.date === getTodayISO() ? "Hoje" : sale.plate ? "Com placa" : "Sem placa"}" data-product-sale-has-plate="${sale.plate ? "true" : "false"}">
                            <td data-label="Venda"><strong>${escapeHtml(sale.code)}</strong><small class="table-note">${escapeHtml(formatDateBR(sale.date))} · ${escapeHtml(sale.time)}</small></td>
                            <td data-label="Cliente">${escapeHtml(sale.clientName)}${sale.plate ? `<small class="table-note">${escapeHtml(sale.plate)}</small>` : ""}</td>
                            <td data-label="Itens">${sale.items.length} item(ns)</td>
                            <td data-label="Total">${formatCurrency(sale.total)}</td>
                            <td data-label="Pagamento">${escapeHtml(sale.paymentMethod)}</td>
                            <td data-label="Documento">${escapeHtml(sale.documentType)}</td>
                            <td data-label="Ações">
                              <div class="cashflow-row-actions">
                                <button class="ghost-action" type="button" data-product-sale-receipt="${sale.id}">Comprovante</button>
                              </div>
                            </td>
                          </tr>
                        `
                      )
                      .join("")
                  : '<tr><td colspan="7"><p class="empty-alert">Nenhuma venda de produto registrada ainda.</p></td></tr>'
              }
            </tbody>
          </table>
        </div>
      </article>
      <article class="admin-panel screen-side-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Destaques</p>
            <h2>Mais vendidos</h2>
          </div>
        </div>
        <div class="screen-side-list">
          ${
            topProducts.length
              ? topProducts
                  .map(
                    (item) => `
                      <article class="screen-side-item">
                        <span>Produto</span>
                        <strong>${escapeHtml(item.name)}</strong>
                        <p>${item.quantity} unidade(s) já registradas em vendas.</p>
                      </article>
                    `
                  )
                  .join("")
              : '<p class="empty-alert">As vendas aparecerão aqui assim que forem registradas.</p>'
          }
        </div>
      </article>
    </section>
  `;
  initIcons();
  bindProductSalesScreenControls(container);
}

function renderDocumentsScreen(container) {
  const receiptsCount = documentHistory.filter((item) => normalizeText(item.category).includes("recibo")).length;
  const reportsCount = documentHistory.filter((item) => normalizeText(item.category).includes("relatorio")).length;
  container.innerHTML = `
    <section class="screen-metrics" aria-label="Resumo dos documentos">
      ${[
        { label: "Documentos gerados", value: documentHistory.length, icon: "clipboard" },
        { label: "Recibos", value: receiptsCount, icon: "invoice" },
        { label: "Relatórios", value: reportsCount, icon: "dashboard" },
        { label: "Hoje", value: documentHistory.filter((item) => normalizeText(item.createdAt).includes(normalizeText(formatDateBR(getTodayISO())))).length, icon: "clock" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>
    <section class="screen-toolbar inventory-toolbar" aria-label="Filtros dos documentos">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.clipboard}</span>
        <input id="documentHistorySearchInput" type="search" placeholder="Buscar número, título ou responsável" />
      </label>
      <div class="screen-filters" id="documentHistoryFilters">
        ${["Todos", "Recibo", "Relatório", "Documento"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-document-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`)
          .join("")}
      </div>
    </section>
    <section class="admin-screen-grid inventory-screen-grid">
      <article class="admin-panel screen-table-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Histórico</p>
            <h2>Recibos e documentos emitidos</h2>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table inventory-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Título</th>
                <th>Número</th>
                <th>Categoria</th>
                <th>Responsável</th>
                <th>Arquivo</th>
                <th>AÃ§Ãµes</th>
              </tr>
            </thead>
            <tbody>
              ${
                documentHistory.length
                  ? documentHistory
                      .map(
                        (item) => `
                          <tr data-document-row data-document-filter-value="${escapeHtml(normalizeText(item.category).includes("recibo") ? "Recibo" : normalizeText(item.category).includes("relatorio") ? "Relatório" : "Documento")}">
                            <td data-label="Data">${escapeHtml(item.createdAt)}</td>
                            <td data-label="Título"><strong>${escapeHtml(item.title)}</strong><small class="table-note">${escapeHtml(item.summary || item.subtitle || "Documento gerado pelo LavaPrime.")}</small></td>
                            <td data-label="Número">${escapeHtml(item.documentNumber || "-")}</td>
                            <td data-label="Categoria">${escapeHtml(item.category)}</td>
                            <td data-label="Responsável">${escapeHtml(item.responsible)}</td>
                            <td data-label="Arquivo">${escapeHtml(item.fileName)}</td>
                            <td data-label="AÃ§Ãµes">
                              <span class="table-actions">
                                <button type="button" data-download-document-history="${escapeHtml(item.id)}">Baixar arquivo</button>
                              </span>
                            </td>
                          </tr>
                        `
                      )
                      .join("")
                  : '<tr><td colspan="6"><p class="empty-alert">Os documentos emitidos passarão a aparecer aqui.</p></td></tr>'
              }
            </tbody>
          </table>
        </div>
      </article>
      <article class="admin-panel screen-side-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Observação</p>
            <h2>Padrão documental</h2>
          </div>
        </div>
        <div class="screen-side-list">
          <article class="screen-side-item">
            <span>Papel timbrado</span>
            <strong>Ativo em toda a rotina PDF</strong>
            <p>Recibos, relatórios e comprovantes continuam saindo pelo mesmo gerador central do LavaPrime.</p>
          </article>
          <article class="screen-side-item">
            <span>Financeiro</span>
            <strong>Pix e contas bancárias</strong>
            <p>Quando o documento é compatível com cobrança, os dados de pagamento definidos em Configurações Financeiras continuam disponíveis.</p>
          </article>
        </div>
      </article>
    </section>
  `;
  initIcons();
  bindDocumentsScreenControls(container);
}

function formatInventoryQuantity(value, unit = "un") {
  const amount = Number(value || 0);
  const formatted = Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(".", ",");
  return `${formatted} ${unit}`;
}

function bindToolbarFilters(container, { inputSelector, rowSelector, filterContainerSelector, filterDatasetKey, filterMatcher }) {
  const applyFilters = () => {
    const query = normalizeText($(inputSelector, container)?.value || "");
    const activeButton = $(`${filterContainerSelector} .is-active`, container);
    const activeFilter = activeButton?.dataset[filterDatasetKey] || "Todos";
    $$(rowSelector, container).forEach((row) => {
      const textMatch = !query || normalizeText(row.textContent).includes(query);
      const rowFilterValue = row.dataset[`${filterDatasetKey}Value`] || "Todos";
      const filterMatch = filterMatcher ? filterMatcher(activeFilter, rowFilterValue, row) : activeFilter === "Todos" || rowFilterValue === activeFilter;
      row.hidden = !textMatch || !filterMatch;
    });
  };

  $(inputSelector, container)?.addEventListener("input", applyFilters);
  $$(`${filterContainerSelector} button`, container).forEach((button) => {
    button.addEventListener("click", () => {
      $$(`${filterContainerSelector} button`, container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyFilters();
    });
  });
}

function bindProductsScreenControls(container) {
  bindToolbarFilters(container, {
    inputSelector: "#productSearchInput",
    rowSelector: "[data-product-row]",
    filterContainerSelector: "#productFilters",
    filterDatasetKey: "productFilter"
  });
  $("#openProductAdjustmentsButton", container)?.addEventListener("click", () => {
    const targetProduct = getLowStockProducts()[0] || productCatalog[0];
    if (!targetProduct) {
      showToast("Cadastre um produto antes de ajustar o estoque.");
      return;
    }
    openInventoryDialog({ mode: "adjustment", kind: "product", id: targetProduct.id });
  });
  $$("[data-edit-product]", container).forEach((button) => {
    button.addEventListener("click", () => openInventoryDialog({ mode: "product", id: Number(button.dataset.editProduct) }));
  });
  $$("[data-adjust-product]", container).forEach((button) => {
    button.addEventListener("click", () => openInventoryDialog({ mode: "adjustment", kind: "product", id: Number(button.dataset.adjustProduct) }));
  });
}

function bindSuppliesScreenControls(container) {
  bindToolbarFilters(container, {
    inputSelector: "#supplySearchInput",
    rowSelector: "[data-supply-row]",
    filterContainerSelector: "#supplyFilters",
    filterDatasetKey: "supplyFilter"
  });
  $("#openSupplyAdjustmentsButton", container)?.addEventListener("click", () => {
    const targetSupply = getLowStockSupplies()[0] || supplyCatalog[0];
    if (!targetSupply) {
      showToast("Cadastre um insumo antes de ajustar o estoque.");
      return;
    }
    openInventoryDialog({ mode: "adjustment", kind: "supply", id: targetSupply.id });
  });
  $$("[data-edit-supply]", container).forEach((button) => {
    button.addEventListener("click", () => openInventoryDialog({ mode: "supply", id: Number(button.dataset.editSupply) }));
  });
  $$("[data-adjust-supply]", container).forEach((button) => {
    button.addEventListener("click", () => openInventoryDialog({ mode: "adjustment", kind: "supply", id: Number(button.dataset.adjustSupply) }));
  });
}

function bindInventoryScreenControls(container) {
  bindToolbarFilters(container, {
    inputSelector: "#inventorySearchInput",
    rowSelector: "[data-inventory-row]",
    filterContainerSelector: "#inventoryFilters",
    filterDatasetKey: "inventoryFilter"
  });
  $$("[data-adjust-inventory-id]", container).forEach((button) => {
    button.addEventListener("click", () =>
      openInventoryDialog({
        mode: "adjustment",
        kind: button.dataset.adjustInventoryKind,
        id: Number(button.dataset.adjustInventoryId)
      })
    );
  });
}

function bindProductSalesScreenControls(container) {
  bindToolbarFilters(container, {
    inputSelector: "#productSaleSearchInput",
    rowSelector: "[data-product-sale-row]",
    filterContainerSelector: "#productSaleFilters",
    filterDatasetKey: "productSaleFilter",
    filterMatcher: (activeFilter, rowFilterValue, row) => {
      if (activeFilter === "Todos") return true;
      if (activeFilter === "Com placa") return row.dataset.productSaleHasPlate === "true";
      if (activeFilter === "Sem placa") return row.dataset.productSaleHasPlate !== "true";
      return rowFilterValue === activeFilter;
    }
  });
  $("#repeatLastProductSaleButton", container)?.addEventListener("click", () => {
    if (!productSales.length) return;
    openInventoryDialog({ mode: "sale", sale: productSales[0] });
  });
  $$("[data-product-sale-receipt]", container).forEach((button) => {
    button.addEventListener("click", () => generateProductSaleReceiptPdf(Number(button.dataset.productSaleReceipt)));
  });
}

function bindDocumentsScreenControls(container) {
  $(".screen-side-panel", container)?.remove();
  $("thead tr th:last-child", container).textContent = "Acoes";
  $$("tbody tr td:last-child", container).forEach((cell) => {
    cell.dataset.label = "Acoes";
  });

  bindToolbarFilters(container, {
    inputSelector: "#documentHistorySearchInput",
    rowSelector: "[data-document-row]",
    filterContainerSelector: "#documentHistoryFilters",
    filterDatasetKey: "documentFilter",
    filterMatcher: (activeFilter, rowFilterValue) => activeFilter === "Todos" || rowFilterValue === activeFilter
  });

  $$("[data-download-document-history]", container).forEach((button) => {
    button.addEventListener("click", () => downloadDocumentHistoryFile(Number(button.dataset.downloadDocumentHistory)));
  });
}

function downloadDocumentHistoryFile(documentId) {
  const item = documentHistory.find((entry) => Number(entry.id) === Number(documentId));
  if (!item) {
    showToast("Documento nÃ£o localizado.");
    return;
  }

  const lines = [
    `TÃ­tulo: ${item.title || "Documento LavaPrime"}`,
    item.subtitle ? `SubtÃ­tulo: ${item.subtitle}` : "",
    `NÃºmero: ${item.documentNumber || "-"}`,
    `Categoria: ${item.category || "Documento"}`,
    `ResponsÃ¡vel: ${item.responsible || "Sistema LavaPrime"}`,
    `Gerado em: ${item.createdAt || "-"}`,
    "",
    item.summary || "Segunda via emitida a partir do histÃ³rico documental do LavaPrime."
  ].filter(Boolean);

  const pdf = createStandardPdfDocument(
    {
      fileName: item.fileName || `documento-${item.id || "lavaprime"}.pdf`,
      title: item.title || "Documento LavaPrime",
      lines,
      subtitle: item.subtitle || "Segunda via do histÃ³rico",
      documentNumber: item.documentNumber || createPdfDocumentNumber(item.fileName || `documento-${item.id || "lavaprime"}.pdf`),
      responsible: item.responsible || activeSessionUser || "Sistema LavaPrime",
      category: item.category || "Documento",
      summary: item.summary || "Segunda via emitida a partir do histÃ³rico documental do LavaPrime.",
      reportTarget: item.reportTarget || "documents"
    },
    getPdfLogoImage()
  );

  downloadTextFile(item.fileName || `documento-${item.id || "lavaprime"}.pdf`, pdf, "application/pdf");
  showToast("Arquivo preparado para download.");
}

function openInventoryDialog(options = {}) {
  if (options.mode === "adjustment" && options.kind === "supply" && !businessFinanceSettings.inventory.allowManualSupplyAdjustment) {
    showToast("Os ajustes manuais de insumos estão desativados nas Configurações Financeiras.");
    return;
  }
  inventoryDialogState = { ...options };
  const dialog = $("#inventoryDialog");
  if (!dialog) return;
  const mode = options.mode || "product";
  if (mode === "product") dialog.innerHTML = renderInventoryItemDialog("product", getProductById(options.id));
  if (mode === "supply") dialog.innerHTML = renderInventoryItemDialog("supply", getSupplyById(options.id));
  if (mode === "adjustment") dialog.innerHTML = renderInventoryAdjustmentDialog(options.kind, options.kind === "product" ? getProductById(options.id) : getSupplyById(options.id));
  if (mode === "sale") dialog.innerHTML = renderProductSaleDialog(options.sale || null);
  if (mode === "serviceSupplies") dialog.innerHTML = renderServiceSuppliesDialog(options.serviceIndex);

  initIcons();
  bindCurrencyInputs(dialog);
  bindInventoryDialogControls(dialog);
  dialog.oncancel = (event) => {
    event.preventDefault();
    closeInventoryDialog();
  };
  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeInventoryDialog() {
  const dialog = $("#inventoryDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  inventoryDialogState = null;
}

function renderInventoryItemDialog(kind, item = null) {
  const isProduct = kind === "product";
  const title = isProduct ? (item ? "Editar produto" : "Novo produto") : item ? "Editar insumo" : "Novo insumo";
  const eyebrow = isProduct ? "Produtos para venda" : "Insumos internos";
  const compatibilityOptions = [
    { value: "unknown", label: "Não informado" },
    { value: "true", label: "Sim" },
    { value: "false", label: "Não" }
  ];
  return `
    <form class="vehicle-box service-box" id="inventoryItemForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <button class="icon-button" id="closeInventoryDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      <div class="vehicle-form-grid service-dialog-grid inventory-form-grid">
        <label class="login-field" for="inventoryItemName">
          <span>${isProduct ? "Nome do produto" : "Nome do insumo"}</span>
          <input id="inventoryItemName" type="text" value="${escapeHtml(item?.name || "")}" required />
        </label>
        <label class="login-field" for="inventoryItemSku">
          <span>SKU</span>
          <input id="inventoryItemSku" type="text" value="${escapeHtml(item?.sku || "")}" placeholder="${isProduct ? "PRD-001" : "INS-001"}" required />
        </label>
        <label class="login-field" for="inventoryItemUnit">
          <span>Unidade</span>
          <select id="inventoryItemUnit">
            ${renderSelectOptions(["un", "ml", "L", "kg", "pct"], item?.unit || "un")}
          </select>
        </label>
        <label class="login-field" for="inventoryItemStock">
          <span>Estoque atual</span>
          <input id="inventoryItemStock" type="number" min="0" step="0.01" value="${escapeHtml(String(item?.stock ?? 0))}" required />
        </label>
        <label class="login-field" for="inventoryItemMinStock">
          <span>Estoque mínimo</span>
          <input id="inventoryItemMinStock" type="number" min="0" step="0.01" value="${escapeHtml(String(item?.minStock ?? 0))}" />
        </label>
        <label class="login-field" for="inventoryItemCost">
          <span>${isProduct ? "Custo unitário" : "Custo médio"}</span>
          <input id="inventoryItemCost" type="text" inputmode="decimal" data-money-input="true" value="${escapeHtml(formatCurrencyFieldValue(item?.cost || 0))}" required />
        </label>
        ${
          isProduct
            ? `
              <label class="login-field" for="inventoryItemPrice">
                <span>Preço de venda</span>
                <input id="inventoryItemPrice" type="text" inputmode="decimal" data-money-input="true" value="${escapeHtml(formatCurrencyFieldValue(item?.price || 0))}" required />
              </label>
            `
            : `
              <label class="login-field" for="inventoryItemSupplier">
                <span>Fornecedor</span>
                <input id="inventoryItemSupplier" type="text" value="${escapeHtml(item?.supplier || "")}" placeholder="Nome do fornecedor" />
              </label>
            `
        }
        <label class="login-field inventory-notes-field" for="inventoryItemNotes">
          <span>Observações</span>
          <textarea id="inventoryItemNotes" rows="3">${escapeHtml(item?.notes || "")}</textarea>
        </label>
        <label class="switch-field" for="inventoryItemActive">
          <input id="inventoryItemActive" type="checkbox" ${item?.active !== false ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Item ativo</span>
        </label>
      </div>
      ${
        isProduct
          ? ""
          : `
            <section class="vehicle-special-care-section service-technical-section">
              <div class="vehicle-special-care-head">
                <div>
                  <p class="eyebrow">Classificação técnica</p>
                  <h3>Tags de risco</h3>
                </div>
                <span class="client-status-label">Opcional</span>
              </div>
              <div class="vehicle-special-care-choice-block">
                <span>Tags de risco</span>
                ${renderChoiceChipGroup(supplyRiskTagOptions, item?.riskTags || [], {
                  name: "inventoryItemRiskTag",
                  twoColumns: true
                })}
              </div>
            </section>
          `
      }
      <div class="dialog-actions">
        <button class="exit-button" id="cancelInventoryDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>${item ? "Salvar alterações" : "Cadastrar item"}</span>
        </button>
      </div>
    </form>
  `;
}

function renderInventoryAdjustmentDialog(kind, item) {
  return `
    <form class="vehicle-box service-box" id="inventoryAdjustmentForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Inventário</p>
          <h2>Ajuste de estoque</h2>
        </div>
        <button class="icon-button" id="closeInventoryDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      <p class="step-copy">${item ? `${item.name} · saldo atual ${formatInventoryQuantity(item.stock, item.unit)}` : "Selecione um item válido para ajustar o estoque."}</p>
      <div class="vehicle-form-grid service-dialog-grid inventory-form-grid">
        <label class="login-field" for="inventoryAdjustmentType">
          <span>Tipo de movimento</span>
          <select id="inventoryAdjustmentType">
            ${renderSelectOptions(["Reposição", "Ajuste de entrada", "Ajuste de saída"], "Reposição")}
          </select>
        </label>
        <label class="login-field" for="inventoryAdjustmentQuantity">
          <span>Quantidade</span>
          <input id="inventoryAdjustmentQuantity" type="number" min="0.01" step="0.01" placeholder="0" required />
        </label>
        <label class="login-field inventory-notes-field" for="inventoryAdjustmentReason">
          <span>Motivo</span>
          <textarea id="inventoryAdjustmentReason" rows="3" placeholder="Ex.: conferência física, reposição do fornecedor, perda operacional"></textarea>
        </label>
      </div>
      <div class="dialog-actions">
        <button class="exit-button" id="cancelInventoryDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>Salvar ajuste</span>
        </button>
      </div>
    </form>
  `;
}

function renderProductSaleDialog(baseSale = null) {
  const activeProducts = productCatalog.filter((item) => item.active !== false);
  const defaultLines = baseSale?.items?.length
    ? baseSale.items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
    : [{ productId: activeProducts[0]?.id || "", quantity: 1 }];
  return `
    <form class="vehicle-box service-box" id="productSaleForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Venda de produtos</p>
          <h2>${baseSale ? "Replicar venda" : "Nova venda"}</h2>
        </div>
        <button class="icon-button" id="closeInventoryDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      <div class="vehicle-form-grid service-dialog-grid inventory-form-grid">
        <label class="login-field" for="productSaleClientName">
          <span>Cliente</span>
          <input id="productSaleClientName" type="text" value="${escapeHtml(baseSale?.clientName || "")}" placeholder="Cliente avulso" />
        </label>
        <label class="login-field" for="productSalePlate">
          <span>Placa vinculada</span>
          <input id="productSalePlate" type="text" value="${escapeHtml(baseSale?.plate || "")}" placeholder="Opcional" maxlength="8" />
        </label>
        <label class="login-field" for="productSalePaymentMethod">
          <span>Forma de pagamento</span>
          <select id="productSalePaymentMethod">
            ${renderRegistrySelectOptions(getSelectablePaymentMethodNames("productSale", { allowBilled: false }), baseSale?.paymentMethod || getPreferredPaymentMethodName("productSale", false))}
          </select>
        </label>
        <label class="login-field" for="productSaleDocumentType">
          <span>Documento</span>
          <select id="productSaleDocumentType">
            ${renderSelectOptions(["Recibo", "Pedido", "Comprovante simples", "Orçamento"], baseSale?.documentType || businessFinanceSettings.documents.defaultProductDocumentType || "Recibo")}
          </select>
        </label>
      </div>
      <div class="sale-lines-block">
        <div class="sale-lines-head">
          <h3>Itens da venda</h3>
          <button class="ghost-action compact" id="addProductSaleLineButton" type="button">
            <span data-icon="plus"></span>
            <span>Adicionar item</span>
          </button>
        </div>
        <div id="productSaleLines">${defaultLines.map((line, index) => renderProductSaleLine(line, index)).join("")}</div>
      </div>
      <label class="login-field inventory-notes-field" for="productSaleNotes">
        <span>Observações</span>
        <textarea id="productSaleNotes" rows="3">${escapeHtml(baseSale?.notes || "")}</textarea>
      </label>
      <article class="cash-change-card partial-balance-card sale-total-card">
        <span>Total previsto</span>
        <strong id="productSaleTotal">${formatCurrency(0)}</strong>
      </article>
      <div class="dialog-actions">
        <button class="exit-button" id="cancelInventoryDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit" ${activeProducts.length ? "" : "disabled"}>
          <span data-icon="check"></span>
          <span>Registrar venda</span>
        </button>
      </div>
    </form>
  `;
}

function renderProductSaleLine(line, index) {
  const activeProducts = productCatalog.filter((item) => item.active !== false);
  const fallbackId = activeProducts[0]?.id || "";
  return `
    <div class="sale-line-row" data-sale-line-row>
      <label class="login-field" for="productSaleProduct${index}">
        <span>Produto</span>
        <select id="productSaleProduct${index}" data-product-sale-product>
          ${renderRegistrySelectOptions(activeProducts.map((item) => String(item.id)), String(line.productId || fallbackId), { labelGetter: (value) => {
            const product = getProductById(Number(value));
            return product ? `${product.name} · ${formatCurrency(product.price)}` : value;
          } })}
        </select>
      </label>
      <label class="login-field" for="productSaleQuantity${index}">
        <span>Quantidade</span>
        <input id="productSaleQuantity${index}" data-product-sale-quantity type="number" min="1" step="1" value="${escapeHtml(String(line.quantity || 1))}" />
      </label>
      <button class="ghost-action compact sale-line-remove" type="button" data-remove-product-sale-line>
        <span data-icon="x"></span>
        <span>Remover</span>
      </button>
    </div>
  `;
}

function renderServiceSuppliesDialog(serviceIndex) {
  const service = serviceCatalog[serviceIndex];
  const entries = service ? getServiceSupplyProfile(service) : [];
  const activeSupplies = supplyCatalog.filter((item) => item.active !== false);
  return `
    <form class="vehicle-box service-box" id="serviceSuppliesForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Ficha técnica</p>
          <h2>${service ? escapeHtml(service.name) : "Configurar insumos"}</h2>
        </div>
        <button class="icon-button" id="closeInventoryDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      <p class="step-copy">${service ? `Defina a média de consumo usada ao concluir ${service.name}.` : "Selecione um serviço válido."}</p>
      <div class="sale-lines-block">
        <div class="sale-lines-head">
          <h3>Composição do serviço</h3>
          <button class="ghost-action compact" id="addServiceSupplyLineButton" type="button" ${activeSupplies.length ? "" : "disabled"}>
            <span data-icon="plus"></span>
            <span>Adicionar insumo</span>
          </button>
        </div>
        <div id="serviceSupplyLines">
          ${(entries.length ? entries : [{ supplyId: activeSupplies[0]?.id || "", quantity: 1, notes: "" }]).map((entry, index) => renderServiceSupplyLine(entry, index)).join("")}
        </div>
      </div>
      <div class="dialog-actions">
        <button class="exit-button" id="cancelInventoryDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit" ${service ? "" : "disabled"}>
          <span data-icon="check"></span>
          <span>Salvar composição</span>
        </button>
      </div>
    </form>
  `;
}

function renderServiceSupplyLine(entry, index) {
  const activeSupplies = supplyCatalog.filter((item) => item.active !== false);
  const fallbackId = activeSupplies[0]?.id || "";
  return `
    <div class="sale-line-row supply-line-row" data-service-supply-row>
      <label class="login-field" for="serviceSupply${index}">
        <span>Insumo</span>
        <select id="serviceSupply${index}" data-service-supply-id>
          ${renderRegistrySelectOptions(activeSupplies.map((item) => String(item.id)), String(entry.supplyId || fallbackId), {
            labelGetter: (value) => {
              const supply = getSupplyById(Number(value));
              return supply ? supply.name : value;
            }
          })}
        </select>
      </label>
      <label class="login-field" for="serviceSupplyQuantity${index}">
        <span>Quantidade aproximada</span>
        <input id="serviceSupplyQuantity${index}" data-service-supply-quantity type="number" min="0.01" step="0.01" value="${escapeHtml(String(entry.quantity || 1))}" />
      </label>
      <button class="ghost-action compact sale-line-remove" type="button" data-remove-service-supply-line>
        <span data-icon="x"></span>
        <span>Remover</span>
      </button>
    </div>
  `;
}

function renderServiceSupplyLinesForServiceDialog(service) {
  const activeSupplies = supplyCatalog.filter((item) => item.active !== false);
  const entries = getServiceSupplyProfile(service);
  const fallbackEntries = entries.length ? entries : [{ supplyId: activeSupplies[0]?.id || "", quantity: 1 }];
  return activeSupplies.length
    ? fallbackEntries.map((entry, index) => renderServiceSupplyLine(entry, index)).join("")
    : '<p class="empty-plates">Cadastre insumos de uso interno para compor o serviço.</p>';
}

function readServiceSupplyEntriesFromDialog(container) {
  return $$("[data-service-supply-row]", container)
    .map((row) => ({
      supplyId: Number($("[data-service-supply-id]", row)?.value || 0),
      quantity: Math.max(0, Number($("[data-service-supply-quantity]", row)?.value || 0)),
      notes: ""
    }))
    .filter((entry) => entry.supplyId && entry.quantity > 0);
}

function calculateServiceSupplyEntriesCost(entries = []) {
  return (entries || []).reduce((sum, entry) => {
    const supply = getSupplyById(entry.supplyId);
    return sum + Number(entry.quantity || 0) * Number(supply?.cost || 0);
  }, 0);
}

function updateServiceDialogEstimatedCost(container) {
  const target = $("#serviceSupplyEstimatedCost", container);
  if (!target) return 0;
  const total = calculateServiceSupplyEntriesCost(readServiceSupplyEntriesFromDialog(container));
  target.textContent = formatCurrency(total);
  return total;
}

function bindInventoryDialogControls(dialog) {
  $("#closeInventoryDialog", dialog)?.addEventListener("click", closeInventoryDialog);
  $("#cancelInventoryDialog", dialog)?.addEventListener("click", closeInventoryDialog);

  if ($("#inventoryItemForm", dialog)) {
    $("#inventoryItemForm", dialog).addEventListener("submit", (event) => {
      event.preventDefault();
      saveInventoryItemForm(dialog);
    });
  }

  if ($("#inventoryAdjustmentForm", dialog)) {
    $("#inventoryAdjustmentForm", dialog).addEventListener("submit", (event) => {
      event.preventDefault();
      saveInventoryAdjustment(dialog);
    });
  }

  if ($("#productSaleForm", dialog)) {
    $("#productSalePlate", dialog)?.addEventListener("input", (event) => {
      event.currentTarget.value = formatPlate(event.currentTarget.value);
    });
    $("#addProductSaleLineButton", dialog)?.addEventListener("click", () => {
      const lines = $("#productSaleLines", dialog);
      const index = $$("[data-sale-line-row]", dialog).length;
      lines.insertAdjacentHTML("beforeend", renderProductSaleLine({}, index));
      initIcons();
      bindProductSaleDialogControls(dialog);
      updateProductSaleTotal(dialog);
    });
    $("#productSaleForm", dialog).addEventListener("submit", (event) => {
      event.preventDefault();
      saveProductSale(dialog);
    });
    bindProductSaleDialogControls(dialog);
    updateProductSaleTotal(dialog);
  }

  if ($("#serviceSuppliesForm", dialog)) {
    $("#addServiceSupplyLineButton", dialog)?.addEventListener("click", () => {
      const lines = $("#serviceSupplyLines", dialog);
      const index = $$("[data-service-supply-row]", dialog).length;
      lines.insertAdjacentHTML("beforeend", renderServiceSupplyLine({}, index));
      initIcons();
      bindServiceSuppliesDialogControls(dialog);
    });
    $("#serviceSuppliesForm", dialog).addEventListener("submit", (event) => {
      event.preventDefault();
      saveServiceSupplies(dialog);
    });
    bindServiceSuppliesDialogControls(dialog);
  }
}

function bindProductSaleDialogControls(dialog) {
  $$("[data-remove-product-sale-line]", dialog).forEach((button) => {
    button.onclick = () => {
      const rows = $$("[data-sale-line-row]", dialog);
      if (rows.length <= 1) {
        showToast("Mantenha ao menos um item na venda.");
        return;
      }
      button.closest("[data-sale-line-row]")?.remove();
      updateProductSaleTotal(dialog);
    };
  });
  $$("[data-product-sale-product], [data-product-sale-quantity]", dialog).forEach((field) => {
    field.onchange = () => updateProductSaleTotal(dialog);
    field.oninput = () => updateProductSaleTotal(dialog);
  });
}

function bindServiceSuppliesDialogControls(dialog) {
  $$("[data-remove-service-supply-line]", dialog).forEach((button) => {
    button.onclick = () => {
      button.closest("[data-service-supply-row]")?.remove();
    };
  });
}

function updateProductSaleTotal(dialog) {
  const total = $$("[data-sale-line-row]", dialog).reduce((sum, row) => {
    const productId = Number($("[data-product-sale-product]", row)?.value || 0);
    const quantity = Math.max(0, Number($("[data-product-sale-quantity]", row)?.value || 0));
    const product = getProductById(productId);
    return sum + quantity * Number(product?.price || 0);
  }, 0);
  $("#productSaleTotal", dialog).textContent = formatCurrency(total);
  return total;
}

function saveInventoryItemForm(dialog) {
  const mode = inventoryDialogState?.mode || "product";
  const isProduct = mode === "product";
  const list = isProduct ? productCatalog : supplyCatalog;
  const itemId = Number(inventoryDialogState?.id || 0);
  const existingItem = list.find((item) => Number(item.id) === itemId) || null;
  const name = $("#inventoryItemName", dialog).value.trim();
  const sku = $("#inventoryItemSku", dialog).value.trim();
  const stock = Number($("#inventoryItemStock", dialog).value || 0);
  const minStock = Number($("#inventoryItemMinStock", dialog).value || 0);
  const cost = getCurrencyInputValue("#inventoryItemCost", dialog);
  const notes = $("#inventoryItemNotes", dialog).value.trim();
  const basePayload = {
    id: existingItem?.id || (isProduct ? getNextProductId() : getNextSupplyId()),
    sku,
    name,
    unit: $("#inventoryItemUnit", dialog).value || "un",
    stock,
    minStock,
    cost,
    active: $("#inventoryItemActive", dialog).checked,
    notes,
    createdAt: existingItem?.createdAt || getTodayISO(),
    updatedAt: getTodayISO()
  };

  if (!name || !sku) {
    showToast("Preencha nome e SKU do item.");
    return;
  }
  if (stock < 0 || minStock < 0 || cost < 0) {
    showToast("Estoque, estoque mínimo e custo não podem ser negativos.");
    return;
  }
  if (list.some((item) => Number(item.id) !== Number(existingItem?.id || 0) && normalizeText(item.sku) === normalizeText(sku))) {
    showToast("Já existe um item com esse SKU.");
    return;
  }
  if (isProduct) {
    const price = getCurrencyInputValue("#inventoryItemPrice", dialog);
    if (price < 0) {
      showToast("O preço de venda não pode ser negativo.");
      return;
    }
    const nextProduct = { ...basePayload, price };
    if (existingItem) Object.assign(existingItem, nextProduct);
    else productCatalog.unshift(nextProduct);
    saveProductCatalog();
    renderProductsScreen($("#adminProductsContent"));
  } else {
    const supplier = $("#inventoryItemSupplier", dialog).value.trim();
    const nextSupply = {
      ...basePayload,
      supplier,
      riskTags: getCheckedValuesByName(dialog, "inventoryItemRiskTag")
    };
    if (existingItem) {
      Object.assign(existingItem, nextSupply);
      delete existingItem.phType;
      delete existingItem.phApproximate;
      delete existingItem.aggressivenessLevel;
      delete existingItem.safeForCoating;
      delete existingItem.safeForWrap;
      delete existingItem.safeForMattePaint;
      delete existingItem.technicalNotes;
    } else {
      supplyCatalog.unshift(nextSupply);
    }
    saveSupplyCatalog();
    serviceSupplyProfiles = normalizeServiceSupplyProfiles(serviceSupplyProfiles);
    saveServiceSupplyProfiles();
    renderSuppliesScreen($("#adminSuppliesContent"));
  }
  renderInventoryScreen($("#adminInventoryContent"));
  closeInventoryDialog();
  showToast(isProduct ? "Produto salvo." : "Insumo salvo.");
}

function registerInventoryMovement({ kind, itemId, itemName, type, quantity, previousStock, currentStock, unit, reason = "", sourceCode = "" }) {
  const movement = {
    id: getNextInventoryMovementId(),
    kind,
    itemId,
    itemName,
    type,
    quantity,
    previousStock,
    currentStock,
    unit,
    reason,
    sourceCode,
    createdAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    operator: activeSessionUser || "Administrador"
  };
  inventoryMovements.unshift(movement);
  saveInventoryMovements();
  return movement;
}

function saveInventoryAdjustment(dialog) {
  const kind = inventoryDialogState?.kind || "product";
  const item = kind === "product" ? getProductById(inventoryDialogState?.id) : getSupplyById(inventoryDialogState?.id);
  if (!item) {
    showToast("Item de estoque não localizado.");
    return;
  }
  const movementType = $("#inventoryAdjustmentType", dialog).value;
  const rawQuantity = Number($("#inventoryAdjustmentQuantity", dialog).value || 0);
  const reason = $("#inventoryAdjustmentReason", dialog).value.trim();
  if (rawQuantity <= 0) {
    showToast("Informe uma quantidade válida.");
    return;
  }
  if (kind === "supply" && businessFinanceSettings.inventory.requireSupplyAdjustmentReason && !reason) {
    showToast("Informe a justificativa do ajuste manual do insumo.");
    $("#inventoryAdjustmentReason", dialog)?.focus();
    return;
  }
  const delta = movementType === "Ajuste de saída" ? -rawQuantity : rawQuantity;
  const nextStock = Number(item.stock || 0) + delta;
  if (nextStock < 0 && !(kind === "supply" && businessFinanceSettings.inventory.allowSupplyNegativeStock) && !(kind === "product" && businessFinanceSettings.inventory.allowProductSaleWithoutStock)) {
    showToast("O ajuste deixaria o estoque negativo e essa regra está bloqueada.");
    return;
  }
  const previousStock = Number(item.stock || 0);
  item.stock = nextStock;
  item.updatedAt = getTodayISO();
  if (kind === "product") saveProductCatalog();
  else saveSupplyCatalog();
  registerInventoryMovement({
    kind,
    itemId: item.id,
    itemName: item.name,
    type: movementType === "Reposição" ? "restock" : "adjustment",
    quantity: delta,
    previousStock,
    currentStock: nextStock,
    unit: item.unit,
    reason
  });
  renderProductsScreen($("#adminProductsContent"));
  renderSuppliesScreen($("#adminSuppliesContent"));
  renderInventoryScreen($("#adminInventoryContent"));
  closeInventoryDialog();
  showToast("Ajuste de estoque salvo.");
}

function buildProductSaleCode() {
  const datePart = getTodayISO().slice(0, 7).replace("-", "");
  const maxSequence = productSales.reduce((max, sale) => {
    const match = String(sale.code || "").match(new RegExp(`^VEN-${datePart}-(\\d+)$`));
    return match ? Math.max(max, Number(match[1] || 0)) : max;
  }, 0);
  return `VEN-${datePart}-${String(maxSequence + 1).padStart(3, "0")}`;
}

function createCashEntryFromProductSale(sale) {
  const financeSnapshot = getCashEntryFinanceSnapshot(sale.total, sale.paymentMethod, "Entrada", sale.date);
  const entry = {
    id: getNextCashEntryId(),
    date: sale.date,
    time: sale.time,
    type: "Entrada",
    description: `${sale.code} - venda de produtos`,
    method: sale.paymentMethod,
    value: sale.total,
    category: "Produtos",
    costCenter: "Loja",
    status: getExpectedReceiptStatus(sale.paymentMethod, "Entrada"),
    feePercent: financeSnapshot.feePercent,
    fixedFee: financeSnapshot.fixedFee,
    feeAmount: financeSnapshot.feeAmount,
    netAmount: financeSnapshot.netAmount,
    expectedReceiptDate: financeSnapshot.expectedReceiptDate,
    methodImmediateSettlement: financeSnapshot.methodImmediateSettlement,
    settlementDays: financeSnapshot.settlementDays,
    linkedBankAccountName: financeSnapshot.linkedBankAccountName,
    serviceAmount: 0,
    productAmount: sale.total,
    createdBy: activeSessionUser || "Administrador",
    updatedBy: activeSessionUser || "Administrador"
  };
  cashEntries.unshift(entry);
  saveCashEntries();
  return entry;
}

function saveProductSale(dialog) {
  const rows = $$("[data-sale-line-row]", dialog);
  if (!rows.length) {
    showToast("Inclua ao menos um item na venda.");
    return;
  }
  const saleItems = rows
    .map((row) => {
      const productId = Number($("[data-product-sale-product]", row)?.value || 0);
      const quantity = Math.max(0, Number($("[data-product-sale-quantity]", row)?.value || 0));
      const product = getProductById(productId);
      return product
        ? {
            product,
            productId: product.id,
            name: product.name,
            quantity,
            unitPrice: Number(product.price || 0),
            lineTotal: quantity * Number(product.price || 0)
          }
        : null;
    })
    .filter((item) => item && item.quantity > 0);
  if (!saleItems.length) {
    showToast("Selecione itens válidos para a venda.");
    return;
  }
  const invalidStock = saleItems.find(
    (item) => Number(item.product.stock || 0) < item.quantity && !businessFinanceSettings.inventory.allowProductSaleWithoutStock
  );
  if (invalidStock) {
    showToast(`Estoque insuficiente para ${invalidStock.name}.`);
    return;
  }
  const sale = {
    id: getNextProductSaleId(),
    code: buildProductSaleCode(),
    date: getTodayISO(),
    time: getCurrentShortTime(),
    clientName: $("#productSaleClientName", dialog).value.trim() || "Cliente avulso",
    plate: $("#productSalePlate", dialog).value.trim(),
    paymentMethod: $("#productSalePaymentMethod", dialog).value || getPreferredPaymentMethodName("productSale", false),
    documentType: $("#productSaleDocumentType", dialog).value || businessFinanceSettings.documents.defaultProductDocumentType || "Recibo",
    operator: activeSessionUser || "Administrador",
    notes: $("#productSaleNotes", dialog).value.trim(),
    status: "Confirmado",
    items: saleItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal
    })),
    total: saleItems.reduce((sum, item) => sum + item.lineTotal, 0)
  };

  saleItems.forEach((item) => {
    const previousStock = Number(item.product.stock || 0);
    item.product.stock = previousStock - item.quantity;
    item.product.updatedAt = getTodayISO();
    registerInventoryMovement({
      kind: "product",
      itemId: item.product.id,
      itemName: item.product.name,
      type: "sale",
      quantity: -item.quantity,
      previousStock,
      currentStock: item.product.stock,
      unit: item.product.unit,
      reason: `Venda ${sale.code}`,
      sourceCode: sale.code
    });
  });

  const cashEntry = createCashEntryFromProductSale(sale);
  sale.cashEntryId = cashEntry.id;
  productSales.unshift(sale);
  saveProductCatalog();
  saveProductSales();
  closeInventoryDialog();
  renderProductSalesScreen($("#adminProductSalesContent"));
  renderProductsScreen($("#adminProductsContent"));
  renderInventoryScreen($("#adminInventoryContent"));
  refreshCashflowScreen();
  renderAdminDashboard();
  showToast(`Venda ${sale.code} registrada.`);
}

function saveServiceSupplies(dialog) {
  const service = serviceCatalog[inventoryDialogState?.serviceIndex];
  if (!service) {
    showToast("Serviço não localizado.");
    return;
  }
  const entries = $$("[data-service-supply-row]", dialog)
    .map((row) => ({
      supplyId: Number($("[data-service-supply-id]", row)?.value || 0),
      quantity: Math.max(0, Number($("[data-service-supply-quantity]", row)?.value || 0)),
      notes: $("[data-service-supply-notes]", row)?.value.trim() || ""
    }))
    .filter((entry) => entry.supplyId && entry.quantity > 0);
  const key = getServiceSupplyProfileKey(service);
  if (entries.length) serviceSupplyProfiles[key] = entries;
  else delete serviceSupplyProfiles[key];
  serviceSupplyProfiles = normalizeServiceSupplyProfiles(serviceSupplyProfiles);
  saveServiceSupplyProfiles();
  closeInventoryDialog();
  renderServicesScreen($("#adminServicesContent"));
  renderSuppliesScreen($("#adminSuppliesContent"));
  renderPatio();
  showToast("Ficha técnica do serviço atualizada.");
}

function generateProductSaleReceiptPdf(saleId) {
  const sale = productSales.find((item) => Number(item.id) === Number(saleId));
  if (!sale) return;
  const lines = [
    `Venda: ${sale.code}`,
    `Cliente: ${sale.clientName}`,
    sale.plate ? `Placa: ${sale.plate}` : "",
    `Data: ${formatDateBR(sale.date)} às ${sale.time}`,
    `Pagamento: ${sale.paymentMethod}`,
    "",
    ...sale.items.map((item) => `${item.name} - ${item.quantity} x ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.lineTotal)}`),
    "",
    `Total: ${formatCurrency(sale.total)}`,
    sale.notes ? `Observações: ${sale.notes}` : ""
  ].filter(Boolean);
  downloadPdfFile(`${sale.code.toLowerCase()}.pdf`, "COMPROVANTE DE VENDA", lines, {
    subtitle: `Venda ${sale.code}`,
    documentNumber: sale.code,
    category: sale.documentType,
    summary: `Venda de produtos para ${sale.clientName}.`,
    reportTarget: "receipts",
    sourceType: "productSale",
    sourceId: String(sale.id)
  });
  showToast("Comprovante da venda gerado.");
}

function getClientsScreenContent() {
  const rows = billingClients.map((client) => {
    const invoices = billingInvoices.filter((invoice) => invoice.clientId === client.id);
    const openValue = invoices
      .filter((invoice) => invoice.status !== "Paga")
      .reduce((total, invoice) => total + getInvoiceAmount(invoice.id), 0);
    return [client.name, client.document || "-", client.phone || "-", `${invoices.length} fatura(s)`, formatCurrency(openValue)];
  });

  return {
    searchIcon: "users",
    searchPlaceholder: "Buscar cliente",
    filters: ["Todos", "Faturados", "Com fatura aberta"],
    metrics: [
      { label: "Clientes ativos", value: billingClients.length, icon: "users" },
      { label: "Faturados", value: billingClients.length, icon: "invoice" },
      { label: "Total em aberto", value: formatCurrency(getOpenInvoicesTotal()), icon: "wallet" }
    ],
    kicker: "Cadastros",
    tableTitle: "Clientes cadastrados",
    columns: ["Cliente", "Documento", "Telefone", "Faturas", "Aberto"],
    rows,
    sideKicker: "Relacionamento",
    sideTitle: "Atalhos",
    sideItems: [
      { title: "Clientes com faturamento", value: billingClients.length, detail: "Cadastro usado na entrada faturada" },
      { title: "Contato principal", value: "Telefone", detail: "Base para confirmação e cobrança" },
      { title: "Histórico", value: "Próximo", detail: "Ligação futura com serviços por cliente" }
    ]
  };
}

function getOperatorsScreenContent() {
  return {
    searchIcon: "badge",
    searchPlaceholder: "Buscar operador",
    filters: ["Todos", "Ativos", "Turno atual"],
    metrics: [
      { label: "Operadores ativos", value: adminOperators.filter((operator) => operator.status === "Ativo").length, icon: "badge" },
      { label: "Serviços hoje", value: adminOperators.reduce((total, operator) => total + operator.today, 0), icon: "service" },
      { label: "Turnos abertos", value: 2, icon: "clock" }
    ],
    kicker: "Equipe",
    tableTitle: "Operadores",
    columns: ["Nome", "Função", "Turno", "Serviços hoje", "Status"],
    rows: adminOperators.map((operator) => [operator.name, operator.role, operator.shift, operator.today, operator.status]),
    sideKicker: "Permissões",
    sideTitle: "Perfis",
    sideItems: [
      { title: "Operador", value: "Pátio", detail: "Entrada, status e acompanhamento" },
      { title: "Administrador", value: "Completo", detail: "Operação, cadastros e financeiro" },
      { title: "Acesso", value: "Login", detail: "Usuário e senha por colaborador" }
    ]
  };
}

function getServicesScreenContent() {
  return {
    searchIcon: "service",
    searchPlaceholder: "Buscar serviço",
    filters: ["Todos", "Ativos", "Estética", "Lavagem"],
    metrics: [
      { label: "Serviços ativos", value: serviceCatalog.length, icon: "service" },
      { label: "Ticket médio", value: formatCurrency(getAverageServicePrice()), icon: "wallet" },
      { label: "Maior duração", value: "4h00", icon: "clock" }
    ],
    kicker: "Tabela",
    tableTitle: "Serviços e valores",
    columns: ["Serviço", "Tipo / categoria de veículo", "Tempo", "Preço", "Status"],
    rows: serviceCatalog.map((service) => [
      service.name,
      formatVehicleScope(service.vehicleType, service.vehicleCategory),
      service.duration,
      formatCurrency(service.price),
      service.status
    ]),
    sideKicker: "Comercial",
    sideTitle: "Composição",
    sideItems: [
      { title: "Preço base", value: "Obrigatório", detail: "Usado nas métricas e faturamento" },
      { title: "Duração prevista", value: "Agenda", detail: "Base para capacidade do pátio" },
      { title: "Categoria", value: "Filtro", detail: "Organiza lavagem, interna e estética" }
    ]
  };
}

function renderOpenPaymentsScreen(container) {
  const active = getActiveOpenPayments();
  const overdue = active.filter((payment) => isOpenPaymentOverdue(payment));
  const total = active.reduce((sum, payment) => sum + Number(payment.value || 0), 0);

  container.innerHTML = `
    <section class="screen-metrics cashflow-metrics" aria-label="Resumo dos pagamentos em aberto">
      ${[
        { label: "Em aberto", value: active.length, icon: "alert" },
        { label: "Valor pendente", value: formatCurrency(total), icon: "wallet" },
        { label: "Lembretes diários", value: overdue.length || active.length, icon: "clock" },
        { label: "Baixados", value: openPayments.filter((payment) => payment.status === "Baixado").length, icon: "check" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="cashflow-pending-panel open-payment-reminder-panel" aria-label="Lembretes de pagamento">
      <div>
        <p class="eyebrow">Pendências</p>
        <h2>Lembretes diários ao gestor</h2>
      </div>
      ${
        active.length
          ? `<div class="cashflow-pending-list">
              ${active
                .map(
                  (payment) => `
                    <article class="cashflow-pending-item">
                      <span>${escapeHtml(payment.clientName)}</span>
                      <strong>${formatCurrency(payment.value)}</strong>
                      <small>${escapeHtml(payment.plate)} / ${escapeHtml(payment.service)} / ${escapeHtml(payment.reminderFrequency || "Diário")}</small>
                    </article>
                  `
                )
                .join("")}
            </div>`
          : '<p class="empty-alert">Nenhum pagamento em aberto para lembrar hoje.</p>'
      }
    </section>

    <section class="screen-toolbar cashflow-toolbar" aria-label="Filtros de pagamentos em aberto">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.alert}</span>
        <input id="openPaymentSearchInput" type="search" placeholder="Buscar cliente, placa ou serviço" />
      </label>
      <div class="screen-filters" id="openPaymentFilters">
        ${["Todos", "Aberto", "Baixado"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-open-payment-filter="${filter.toLowerCase()}">${filter}</button>`)
          .join("")}
      </div>
      <div class="cashflow-export-actions">
        <button class="ghost-action" id="exportOpenPaymentsPdfButton" type="button">
          <span data-icon="invoice"></span>
          <span>Relatório PDF</span>
        </button>
      </div>
    </section>

    <article class="admin-panel screen-table-panel cashflow-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Financeiro</p>
          <h2>Serviços com pagamento em aberto</h2>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table cashflow-table open-payments-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Telefone</th>
              <th>Placa</th>
              <th>Serviço</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Lembrete</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${openPayments.map(renderOpenPaymentRow).join("")}
          </tbody>
        </table>
      </div>
    </article>
  `;

  initIcons();
  bindOpenPaymentsScreenControls(container);
}

function renderOpenPaymentRow(payment) {
  const isOpen = payment.status !== "Baixado";
  const description = payment.description && payment.description !== payment.service ? payment.description : "";
  const displayValue = payment.partialSettlement ? Number(payment.settledAmount || 0) : payment.value;
  return `
    <tr class="cashflow-row ${isOpen ? "is-outstanding" : "is-in"}" data-open-payment-row data-open-payment-status="${escapeHtml(payment.status.toLowerCase())}">
      <td data-label="Cliente">${escapeHtml(payment.clientName)}</td>
      <td data-label="Telefone">${escapeHtml(payment.phone || "-")}</td>
      <td data-label="Placa">${escapeHtml(payment.plate || "-")}</td>
      <td data-label="Serviço">
        <span>${escapeHtml(payment.service || "-")}</span>
        ${description ? `<small class="open-payment-description">${escapeHtml(description)}</small>` : ""}
      </td>
      <td data-label="Valor">${formatCurrency(displayValue)}</td>
      <td data-label="Status">${escapeHtml(payment.status)}</td>
      <td data-label="Lembrete">${escapeHtml(payment.reminderFrequency || "Diário")}${payment.lastReminderAt ? ` · ${escapeHtml(payment.lastReminderAt)}` : ""}</td>
      <td data-label="Ações">
        <div class="cashflow-row-actions">
          ${
            isOpen
              ? `<button class="ghost-action" type="button" data-send-open-payment-message="${payment.id}">WhatsApp</button>
                 <button class="primary-button compact-action" type="button" data-settle-open-payment="${payment.id}">Baixar</button>`
              : `<span class="table-plate-chip">Baixado em ${escapeHtml(payment.paidAt || "-")}</span>`
          }
        </div>
      </td>
    </tr>
  `;
}

function bindOpenPaymentsScreenControls(container) {
  $("#openPaymentSearchInput", container)?.addEventListener("input", () => applyOpenPaymentFilters(container));
  $$("[data-open-payment-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-open-payment-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyOpenPaymentFilters(container);
    });
  });
  $("#exportOpenPaymentsPdfButton", container)?.addEventListener("click", exportOpenPaymentsPdf);
  $$("[data-settle-open-payment]", container).forEach((button) => {
    button.addEventListener("click", () => settleOpenPayment(Number(button.dataset.settleOpenPayment)));
  });
  $$("[data-send-open-payment-message]", container).forEach((button) => {
    button.addEventListener("click", () => sendOpenPaymentWhatsapp(Number(button.dataset.sendOpenPaymentMessage)));
  });
}

function applyOpenPaymentFilters(container) {
  const query = normalizeText($("#openPaymentSearchInput", container)?.value || "");
  const activeFilter = $("#openPaymentFilters .is-active", container)?.dataset.openPaymentFilter || "todos";
  $$("[data-open-payment-row]", container).forEach((row) => {
    const textMatch = !query || normalizeText(row.textContent).includes(query);
    const filterMatch = activeFilter === "todos" || row.dataset.openPaymentStatus === activeFilter;
    row.hidden = !textMatch || !filterMatch;
  });
}

function getActiveOpenPayments() {
  return openPayments.filter((payment) => payment.status !== "Baixado");
}

function isOpenPaymentOverdue(payment) {
  return payment.status !== "Baixado" && (!payment.dueDate || payment.dueDate <= getTodayISO());
}

function getOpenPaymentsByClientId(clientId) {
  return getActiveOpenPayments().filter((payment) => Number(payment.clientId) === Number(clientId));
}

function getOpenPaymentById(id) {
  return openPayments.find((payment) => payment.id === Number(id));
}

function getOpenPaymentForCashEntry(entry) {
  if (!entry?.id) return null;
  const payment = getActiveOpenPayments().find((item) => Number(item.cashEntryId) === Number(entry.id));
  if (!payment) return null;
  const sameService = payment.service && normalizeText(entry.description || "").includes(normalizeText(payment.service));
  const samePlate = payment.plate && entry.plate && normalizeText(payment.plate) === normalizeText(entry.plate);
  return entry.openPayment || sameService || samePlate ? payment : null;
}

function getNextOpenPaymentId() {
  return Math.max(0, ...openPayments.map((payment) => payment.id || 0)) + 1;
}

function requestSettlementPaymentInfo({
  title,
  description,
  defaultMethod = "Pix",
  totalValue = 0,
  allowPartial = false,
  partialDestinations = null
}) {
  const dialog = $("#cashflowDialog");
  const hasBankAccounts = businessBankAccounts.length > 0;
  const settlementTotal = Math.max(0, Number(totalValue || 0));
  const canUsePartial = allowPartial && settlementTotal > 0;
  const canRoutePartialBalance = canUsePartial && Boolean(partialDestinations);
  const existingInvoices = partialDestinations?.existingInvoices || [];
  const requestedPartialDestination = partialDestinations?.defaultDestination || "new-invoice";
  const defaultPartialDestination = requestedPartialDestination === "existing-invoice" && !existingInvoices.length ? "new-invoice" : requestedPartialDestination;
  const defaultNewInvoiceDueDate = partialDestinations?.defaultDueDate || getTodayISO();
  dialog.innerHTML = `
    <form class="vehicle-box cashflow-box settlement-box" id="settlementPaymentForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Baixa financeira</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <button class="icon-button" id="closeSettlementDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>
      <p class="step-copy">${escapeHtml(description)}</p>
      <div class="vehicle-form-grid settlement-dialog-grid">
        <label class="login-field" for="settlementPaymentMethod">
          <span>Meio de pagamento</span>
          <select id="settlementPaymentMethod" required>
            ${renderRegistrySelectOptions(getSettlementPaymentMethods(), defaultMethod)}
          </select>
        </label>
        <label class="login-field settlement-bank-field" for="settlementBankAccount" hidden>
          <span>Conta bancária</span>
          <select id="settlementBankAccount" ${hasBankAccounts ? "" : "disabled"}>
            ${
              hasBankAccounts
                ? businessBankAccounts.map((account) => `<option value="${account.id}">${escapeHtml(getBusinessBankAccountLabel(account))}</option>`).join("")
                : '<option value="">Cadastre uma conta bancária</option>'
            }
          </select>
        </label>
        ${
          canUsePartial
            ? `
              <label class="switch-field settlement-partial-switch" for="settlementPartialEnabled">
                <input id="settlementPartialEnabled" type="checkbox" />
                <span class="switch-control"></span>
                <span>Pagamento parcial</span>
              </label>
              <label class="login-field settlement-partial-field" for="settlementPartialAmount" hidden>
                <span>Valor pago agora</span>
                <input id="settlementPartialAmount" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" />
              </label>
              <article class="cash-change-card partial-balance-card settlement-balance-card" id="settlementPartialBalanceField" hidden>
                <span>Saldo remanescente</span>
                <strong id="settlementPartialBalance">${formatCurrency(settlementTotal)}</strong>
              </article>
              ${
                canRoutePartialBalance
                  ? `
                    <label class="login-field settlement-destination-field" for="settlementPartialDestination" hidden>
                      <span>Destino do saldo</span>
                      <select id="settlementPartialDestination">
                        <option value="new-invoice" ${defaultPartialDestination === "new-invoice" ? "selected" : ""}>Nova fatura</option>
                        <option value="existing-invoice" ${defaultPartialDestination === "existing-invoice" ? "selected" : ""} ${existingInvoices.length ? "" : "disabled"}>Fatura em aberto</option>
                        <option value="open-payment" ${defaultPartialDestination === "open-payment" ? "selected" : ""}>Pagamento em aberto</option>
                      </select>
                    </label>
                    <label class="login-field settlement-target-invoice-field" for="settlementTargetInvoice" hidden>
                      <span>Fatura em aberto</span>
                      <select id="settlementTargetInvoice">
                        <option value="">Selecione a fatura</option>
                        ${existingInvoices
                          .map(
                            (invoice) =>
                              `<option value="${escapeHtml(invoice.id)}">${escapeHtml(invoice.code)} - ${formatDateBR(invoice.dueDate)} - ${formatCurrency(getInvoiceAmount(invoice.id))}</option>`
                          )
                          .join("")}
                      </select>
                    </label>
                    <label class="login-field settlement-new-invoice-field" for="settlementNewInvoiceDueDate" hidden>
                      <span>Vencimento da nova fatura</span>
                      <input id="settlementNewInvoiceDueDate" type="date" value="${escapeHtml(defaultNewInvoiceDueDate)}" min="${escapeHtml(getTodayISO())}" />
                    </label>
                  `
                  : ""
              }
            `
            : ""
        }
      </div>
      <div class="dialog-actions cashflow-dialog-actions">
        <button class="exit-button" id="cancelSettlementDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>Baixar</span>
        </button>
      </div>
    </form>
  `;
  initIcons();
  bindCurrencyInputs(dialog);

  return new Promise((resolve) => {
    let isSettled = false;
    const close = (value) => {
      if (isSettled) return;
      isSettled = true;
      if (typeof dialog.close === "function" && dialog.open) dialog.close();
      else dialog.removeAttribute("open");
      dialog.innerHTML = "";
      resolve(value);
    };
    const updateBankField = () => {
      const isBankDeposit = $("#settlementPaymentMethod", dialog).value === "Depósito bancário";
      const field = $(".settlement-bank-field", dialog);
      const select = $("#settlementBankAccount", dialog);
      field.hidden = !isBankDeposit;
      if (select) select.required = isBankDeposit;
    };
    const updatePartialField = () => {
      if (!canUsePartial) return;
      const isPartial = $("#settlementPartialEnabled", dialog)?.checked || false;
      const partialField = $(".settlement-partial-field", dialog);
      const balanceField = $("#settlementPartialBalanceField", dialog);
      const destinationField = $(".settlement-destination-field", dialog);
      const targetInvoiceField = $(".settlement-target-invoice-field", dialog);
      const newInvoiceField = $(".settlement-new-invoice-field", dialog);
      const destination = $("#settlementPartialDestination", dialog)?.value || defaultPartialDestination;
      const amount = getCurrencyInputValue("#settlementPartialAmount", dialog);
      const balance = Math.max(0, settlementTotal - amount);
      if (partialField) partialField.hidden = !isPartial;
      if (balanceField) balanceField.hidden = !isPartial;
      if (destinationField) destinationField.hidden = !isPartial;
      if (targetInvoiceField) targetInvoiceField.hidden = !isPartial || destination !== "existing-invoice";
      if (newInvoiceField) newInvoiceField.hidden = !isPartial || destination !== "new-invoice";
      if ($("#settlementPartialBalance", dialog)) {
        $("#settlementPartialBalance", dialog).textContent = formatCurrency(balance);
      }
    };

    $("#settlementPaymentMethod", dialog).addEventListener("change", updateBankField);
    $("#settlementPartialEnabled", dialog)?.addEventListener("change", updatePartialField);
    $("#settlementPartialAmount", dialog)?.addEventListener("input", updatePartialField);
    $("#settlementPartialDestination", dialog)?.addEventListener("change", updatePartialField);
    $("#closeSettlementDialog", dialog).addEventListener("click", () => close(null));
    $("#cancelSettlementDialog", dialog).addEventListener("click", () => close(null));
    dialog.addEventListener("cancel", () => close(null), { once: true });
    $("#settlementPaymentForm", dialog).addEventListener("submit", (event) => {
      event.preventDefault();
      const method = $("#settlementPaymentMethod", dialog).value;
      const isBankDeposit = method === "Depósito bancário";
      const bankAccountId = isBankDeposit ? Number($("#settlementBankAccount", dialog).value || 0) : null;
      const bankAccount = bankAccountId ? businessBankAccounts.find((account) => account.id === bankAccountId) : null;
      const partial = canUsePartial && ($("#settlementPartialEnabled", dialog)?.checked || false);
      const amount = partial ? getCurrencyInputValue("#settlementPartialAmount", dialog) : settlementTotal;
      const balance = Math.max(0, settlementTotal - amount);
      const destination = partial && canRoutePartialBalance ? $("#settlementPartialDestination", dialog)?.value || "new-invoice" : "";
      const targetInvoiceId = destination === "existing-invoice" ? Number($("#settlementTargetInvoice", dialog)?.value || 0) : null;
      const newInvoiceDueDate = destination === "new-invoice" ? $("#settlementNewInvoiceDueDate", dialog)?.value || "" : "";
      if (isBankDeposit && !bankAccount) {
        showToast("Cadastre e selecione uma conta bancária para depósito.");
        return;
      }
      if (partial && amount <= 0) {
        showToast("Informe o valor pago agora.");
        $("#settlementPartialAmount", dialog)?.focus();
        return;
      }
      if (partial && amount >= settlementTotal) {
        showToast("Para pagamento parcial, o valor pago agora deve ser menor que o saldo em aberto.");
        $("#settlementPartialAmount", dialog)?.focus();
        return;
      }
      if (partial && canRoutePartialBalance && destination === "existing-invoice" && !targetInvoiceId) {
        showToast("Selecione a fatura em aberto para receber o saldo.");
        $("#settlementTargetInvoice", dialog)?.focus();
        return;
      }
      if (partial && canRoutePartialBalance && destination === "new-invoice" && !newInvoiceDueDate) {
        showToast("Informe o vencimento da nova fatura.");
        $("#settlementNewInvoiceDueDate", dialog)?.focus();
        return;
      }
      close({
        method,
        bankAccountId: bankAccount?.id || null,
        bankAccountName: bankAccount ? getBusinessBankAccountLabel(bankAccount) : "",
        partial,
        amount,
        balance,
        destination,
        targetInvoiceId,
        newInvoiceDueDate
      });
    });

    updateBankField();
    updatePartialField();
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    else dialog.setAttribute("open", "");
    $("#settlementPaymentMethod", dialog).focus();
  });
}

function getBusinessBankAccountLabel(account) {
  return `${account.bank} / ${account.type} / Ag. ${account.agency} / Conta ${account.account}`;
}

async function settleOpenPayment(paymentId) {
  const payment = getOpenPaymentById(paymentId);
  if (!payment || payment.status === "Baixado") return;
  const settlement = await requestSettlementPaymentInfo({
    title: "Baixar pagamento em aberto",
    description: `${payment.clientName} / ${formatCurrency(payment.value)}`,
    defaultMethod: payment.paymentMethod || getPreferredPaymentMethodName("settlement", false),
    totalValue: payment.value,
    allowPartial: true
  });
  if (!settlement) return;

  payment.status = "Baixado";
  payment.paidAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  payment.settledBy = activeSessionUser || "Administrador";
  payment.settlementMethod = settlement.method;
  payment.paymentMethod = settlement.method;
  payment.settlementBankAccountId = settlement.bankAccountId;
  payment.settlementBankAccountName = settlement.bankAccountName;
  payment.partialSettlement = Boolean(settlement.partial);
  payment.settledAmount = settlement.partial ? settlement.amount : payment.value;
  payment.remainingBalance = settlement.partial ? settlement.balance : 0;

  const entry = payment.cashEntryId ? getCashEntryById(payment.cashEntryId) : null;
  if (entry) {
    entry.status = "Confirmado";
    entry.date = getTodayISO();
    entry.time = getCurrentShortTime();
    entry.method = settlement.method;
    entry.value = settlement.partial ? settlement.amount : payment.value;
    entry.description = settlement.partial ? `Baixa parcial pagamento em aberto - ${payment.clientName}` : entry.description;
    entry.bankAccountId = settlement.bankAccountId;
    entry.bankAccountName = settlement.bankAccountName;
  } else {
    cashEntries.unshift({
      id: getNextCashEntryId(),
      date: getTodayISO(),
      time: getCurrentShortTime(),
      type: "Entrada",
      description: `Baixa pagamento em aberto - ${payment.clientName}`,
      method: settlement.method,
      value: settlement.partial ? settlement.amount : payment.value,
      status: "Confirmado",
      category: "Serviços",
      costCenter: "Lavagem",
      bankAccountId: settlement.bankAccountId,
      bankAccountName: settlement.bankAccountName,
      openPaymentId: payment.id,
      operator: activeSessionUser || "Administrador"
    });
  }
  saveCashEntries();

  let remainingPayment = null;
  if (settlement.partial) {
    const pendingEntry = createRemainingOpenPaymentCashEntry(payment, settlement);
    remainingPayment = createRemainingOpenPayment(payment, settlement, pendingEntry);
  }

  const vehicle = getPatioVehicleById(payment.vehicleId);
  if (vehicle) {
    if (settlement.partial) {
      vehicle.partialPaymentOpen = true;
      vehicle.partialPaidAmount = Number(vehicle.partialPaidAmount || payment.paidAmount || 0) + settlement.amount;
      vehicle.partialBalance = settlement.balance;
      vehicle.paymentOpen = true;
      vehicle.paymentStatus = "Parcial";
      vehicle.paymentConfirmed = false;
    } else if (payment.partialPayment || payment.vehicleId) {
      vehicle.partialPaymentOpen = false;
      vehicle.partialBalance = 0;
      vehicle.paymentOpen = false;
      vehicle.paymentStatus = "Confirmado";
      vehicle.paymentConfirmed = true;
      vehicle.paymentConfirmedAt = getCurrentShortTime();
    }
  }

  renderAdminScreen("openPayments");
  refreshCashflowScreen();
  renderAdminDashboard();
  if (remainingPayment) {
    triggerAutomatedMessage("partial-open-payment", getMessageContextFromOpenPayment(payment));
    showToast(`Baixa parcial registrada. Saldo em aberto: ${formatCurrency(settlement.balance)}.`);
  } else {
    triggerAutomatedMessage("payment-confirmation", getMessageContextFromOpenPayment(payment));
    showToast("Pagamento em aberto baixado.");
  }
}

function createRemainingOpenPaymentCashEntry(payment, settlement) {
  const description = getRemainingOpenPaymentDescription(payment);
  const entry = {
    id: getNextCashEntryId(),
    date: getTodayISO(),
    time: getCurrentShortTime(),
    type: "Entrada",
    description,
    method: settlement.method,
    value: settlement.balance,
    status: "Pendente",
    category: "Serviços",
    costCenter: "Lavagem",
    plate: payment.plate || "",
    vehicleId: payment.vehicleId || null,
    openPayment: true,
    partialPayment: true,
    partialPaidAmount: Number(payment.paidAmount || 0) + settlement.amount,
    partialBalance: settlement.balance,
    previousOpenPaymentId: payment.id,
    operator: activeSessionUser || "Administrador"
  };
  cashEntries.unshift(entry);
  saveCashEntries();
  return entry;
}

function createRemainingOpenPayment(payment, settlement, cashEntry) {
  const paidAmount = Number(payment.paidAmount || 0) + settlement.amount;
  const remainingPayment = {
    id: getNextOpenPaymentId(),
    clientId: payment.clientId || null,
    clientName: payment.clientName || "Cliente avulso",
    phone: payment.phone || "",
    plate: payment.plate || "",
    service: payment.service || "",
    description: getRemainingOpenPaymentDescription(payment),
    value: settlement.balance,
    paymentMethod: settlement.method || payment.paymentMethod || getPreferredPaymentMethodName("service"),
    createdAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    dueDate: getDefaultOpenPaymentDueDate(),
    status: "Aberto",
    reminderFrequency: payment.reminderFrequency || "Diário",
    lastReminderAt: "",
    operator: activeSessionUser || payment.operator || "Administrador",
    vehicleId: payment.vehicleId || null,
    cashEntryId: cashEntry?.id || null,
    invoiceId: payment.invoiceId || null,
    invoiceCode: payment.invoiceCode || getOpenPaymentInvoiceCode(payment),
    partialPayment: true,
    paidAmount,
    previousOpenPaymentId: payment.id
  };
  openPayments.unshift(remainingPayment);
  return remainingPayment;
}

function getRemainingOpenPaymentDescription(payment) {
  return `Saldo remanescente referente ao pagamento em aberto de ${payment.service || payment.description || "serviço"} em ${formatDateBR(getTodayISO())}.`;
}

function sendOpenPaymentWhatsapp(paymentId) {
  const payment = getOpenPaymentById(paymentId);
  if (!payment) return;
  payment.lastReminderAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  sendManualMessage("open-service-payment", getMessageContextFromOpenPayment(payment));
  renderAdminScreen("openPayments");
}

function exportOpenPaymentsPdf() {
  const active = getActiveOpenPayments();
  const total = active.reduce((sum, payment) => sum + Number(payment.value || 0), 0);
  const lines = [
    `Total em aberto: ${formatCurrency(total)}`,
    `Quantidade: ${active.length}`,
    "",
    ...active.map(
      (payment) =>
        `${payment.clientName} | ${payment.phone || "-"} | ${payment.plate || "-"} | ${payment.description || payment.service || "-"} | ${formatCurrency(payment.value)} | ${payment.status}`
    )
  ];
  downloadPdfFile(`pagamentos-em-aberto-${getTodayISO()}.pdf`, "Relatório de pagamentos em aberto", lines, {
    subtitle: "Controle financeiro",
    category: "Financeiro",
    summary: `${active.length} pagamento(s) em aberto somando ${formatCurrency(total)}.`
  });
}

function renderCashflowScreen(container) {
  const activeEntries = getCashflowActiveEntries();
  const totalIn = activeEntries
    .filter((entry) => entry.value > 0 && entry.status === "Confirmado")
    .reduce((total, entry) => total + entry.value, 0);
  const pendingIn = activeEntries
    .filter((entry) => entry.value > 0 && entry.status !== "Confirmado")
    .reduce((total, entry) => total + entry.value, 0);
  const totalOut = Math.abs(activeEntries.filter((entry) => entry.value < 0).reduce((total, entry) => total + entry.value, 0));
  const scheduledToday = getCashflowScheduledDueToday();

  container.innerHTML = `
    <section class="screen-metrics cashflow-metrics" aria-label="Resumo do fluxo de caixa">
      ${[
        { label: "Entradas confirmadas", value: formatCurrency(totalIn), icon: "cashflow" },
        { label: "A confirmar", value: formatCurrency(pendingIn), icon: "clock" },
        { label: "Saídas", value: formatCurrency(totalOut), icon: "payable" },
        { label: "Saldo previsto", value: formatCurrency(totalIn + pendingIn - totalOut), icon: "wallet" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    ${
      scheduledToday.length
        ? `
          <section class="cashflow-pending-panel" aria-label="Pendências do caixa">
            <div>
              <p class="eyebrow">Pendências</p>
              <h2>Agendados para confirmação hoje</h2>
            </div>
            <div class="cashflow-pending-list">
              ${scheduledToday
                .map(
                  (entry) => `
                    <article class="cashflow-pending-item">
                      <span>${escapeHtml(entry.description)}</span>
                      <strong>${formatCurrency(entry.value)}</strong>
                      <small>${escapeHtml(entry.category || "Sem categoria")} / ${escapeHtml(entry.costCenter || "Sem centro")}</small>
                      <div class="cashflow-row-actions">
                        <button class="ghost-action" type="button" data-confirm-scheduled-cash="${entry.id}">Confirmar</button>
                        <button class="exit-button compact" type="button" data-cancel-cash-entry="${entry.id}">Cancelar</button>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>
        `
        : ""
    }

    <section class="screen-toolbar cashflow-toolbar" aria-label="Filtros do fluxo">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.cashflow}</span>
        <input id="cashflowSearchInput" type="search" placeholder="Buscar lançamento" />
      </label>
      <label class="login-field cashflow-filter-select" for="cashflowFilterSelect">
        <span>Filtro</span>
        <select id="cashflowFilterSelect">
          ${["Todos", "Entradas", "Saídas", "Agendados", "Pendentes", "Confirmados", "Excluídos"]
            .map((filter) => `<option value="${escapeHtml(filter.toLowerCase())}">${escapeHtml(filter)}</option>`)
            .join("")}
        </select>
      </label>
    </section>

    <article class="admin-panel screen-table-panel cashflow-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Movimento</p>
          <h2>Lançamentos do caixa</h2>
        </div>
        <div class="cashflow-panel-actions">
          <button class="ghost-action" id="openCashflowExportButton" type="button">
            <span data-icon="cashflow"></span>
            <span>Exportar</span>
          </button>
          <button class="new-vehicle-button" id="startCashEntryButton" type="button">
            <span data-icon="plus"></span>
            <span>Novo lançamento</span>
          </button>
        </div>
      </div>
      ${renderCashflowTable()}
    </article>

    <section class="cashflow-charts" aria-label="Gráficos do fluxo de caixa">
      ${renderCashflowCharts()}
    </section>
  `;

  initIcons();
  bindCashflowScreenControls(container);
}

function openCashflowRegistryDialog(kind, options = {}) {
  cashflowRegistryReturnToEntry = Boolean(options.returnToEntry);
  const dialog = $("#cashflowDialog");
  dialog.innerHTML = renderCashflowRegistryDialog(kind);
  initIcons();
  bindCashflowRegistryDialogControls(dialog, kind);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  $(`#cashflow${capitalize(kind)}Input`, dialog)?.focus();
}

function closeCashflowRegistryDialog() {
  if (cashflowRegistryReturnToEntry) {
    const draft = cashflowDialogDraft;
    cashflowRegistryReturnToEntry = false;
    openCashflowDialog(selectedCashEntryId, draft);
    return;
  }
  const dialog = $("#cashflowDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
}

function openCashflowExportDialog() {
  const dialog = $("#cashflowDialog");
  dialog.innerHTML = renderCashflowExportDialog();
  initIcons();
  bindCashflowExportDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  $("#cashflowExportStartDate", dialog)?.focus();
}

function closeCashflowExportDialog() {
  const dialog = $("#cashflowDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
}

function renderCashflowExportDialog() {
  const today = getTodayISO();
  const monthStart = `${today.slice(0, 8)}01`;
  const movementOptions = [
    ["todos", "Todos os movimentos"],
    ["entradas", "Entradas"],
    ["saidas", "Saídas"],
    ["pendentes", "Pendentes"],
    ["confirmados", "Confirmados"],
    ["agendados", "Agendados"],
    ["excluidos", "Excluídos"]
  ];
  return `
    <form class="vehicle-box cashflow-box cashflow-export-dialog-box" id="cashflowExportForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Relatório</p>
          <h2>Exportar fluxo de caixa</h2>
        </div>
        <button class="icon-button" id="closeCashflowExportDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <div class="vehicle-form-grid cashflow-export-grid">
        <label class="login-field" for="cashflowExportStartDate">
          <span>Data inicial</span>
          <input id="cashflowExportStartDate" type="date" value="${escapeHtml(monthStart)}" required />
        </label>
        <label class="login-field" for="cashflowExportEndDate">
          <span>Data final</span>
          <input id="cashflowExportEndDate" type="date" value="${escapeHtml(today)}" required />
        </label>
        <label class="login-field" for="cashflowExportMovement">
          <span>Movimentos</span>
          <select id="cashflowExportMovement" required>
            ${movementOptions.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("")}
          </select>
        </label>
        <label class="login-field" for="cashflowExportFormat">
          <span>Formato</span>
          <select id="cashflowExportFormat" required>
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
        </label>
      </div>

      <div class="dialog-actions cashflow-dialog-actions">
        <button class="exit-button" id="cancelCashflowExportDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>Exportar</span>
        </button>
      </div>
    </form>
  `;
}

function bindCashflowExportDialogControls(dialog) {
  $("#closeCashflowExportDialog", dialog).addEventListener("click", closeCashflowExportDialog);
  $("#cancelCashflowExportDialog", dialog).addEventListener("click", closeCashflowExportDialog);
  $("#cashflowExportForm", dialog).addEventListener("submit", (event) => {
    event.preventDefault();
    exportCashflowReport(dialog);
  });
}

function renderCashflowRegistryDialog(kind) {
  const config = getCashflowRegistryConfig(kind);
  return `
    <form class="vehicle-box cashflow-box cashflow-registry-dialog-box" id="cashflowRegistryForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Cadastro</p>
          <h2>${escapeHtml(config.title)}</h2>
        </div>
        <button class="icon-button" id="closeCashflowRegistryDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <div class="cashflow-registry-row">
        <input id="cashflow${capitalize(kind)}Input" type="text" placeholder="${escapeHtml(config.placeholder)}" required />
        <button class="ghost-action" type="submit">
          <span data-icon="plus"></span>
          <span>${escapeHtml(config.buttonLabel)}</span>
        </button>
      </div>

      <section class="cashflow-registry-list-panel">
        <div>
          <p class="eyebrow">Itens cadastrados</p>
          <h3>${escapeHtml(config.title)}</h3>
        </div>
        <div class="cashflow-registry-options">
          ${renderCashflowOptionRows(config.list, kind)}
        </div>
      </section>

      ${
        cashflowRegistryReturnToEntry
          ? `
            <div class="dialog-actions cashflow-dialog-actions">
              <button class="primary-button" id="returnCashflowEntryDialog" type="button">
                <span data-icon="check"></span>
                <span>Voltar ao lançamento</span>
              </button>
            </div>
          `
          : ""
      }
    </form>
  `;
}

function bindCashflowRegistryDialogControls(dialog, kind) {
  $("#closeCashflowRegistryDialog", dialog).addEventListener("click", closeCashflowRegistryDialog);
  dialog.addEventListener("cancel", closeCashflowRegistryDialog, { once: true });
  $("#returnCashflowEntryDialog", dialog)?.addEventListener("click", closeCashflowRegistryDialog);
  $("#cashflowRegistryForm", dialog).addEventListener("submit", (event) => {
    event.preventDefault();
    addCashflowOption(dialog, kind);
  });
  $$("[data-update-cashflow-option]", dialog).forEach((button) => {
    button.addEventListener("click", () => updateCashflowOption(dialog, button.dataset.updateCashflowOption, Number(button.dataset.optionIndex)));
  });
  $$("[data-delete-cashflow-option]", dialog).forEach((button) => {
    button.addEventListener("click", () => deleteCashflowOption(dialog, button.dataset.deleteCashflowOption, button.dataset.optionValue));
  });
}

function getCashflowRegistryConfig(kind) {
  const configs = {
    category: {
      title: "Categorias de lançamento",
      label: "categoria",
      list: cashflowCategories,
      placeholder: "Nova categoria",
      buttonLabel: "Adicionar categoria",
      protectedValues: []
    },
    costCenter: {
      title: "Centros de custo",
      label: "centro de custo",
      list: cashflowCostCenters,
      placeholder: "Novo centro de custo",
      buttonLabel: "Adicionar centro",
      protectedValues: []
    },
    paymentMethod: {
      title: "Formas de pagamento",
      label: "forma de pagamento",
      list: getAllPaymentMethodNames(),
      placeholder: "Nova forma de pagamento",
      buttonLabel: "Adicionar forma",
      protectedValues: ["Dinheiro", "Faturado"]
    }
  };
  return configs[kind] || configs.category;
}

function renderCashflowOptionRows(list, kind) {
  const protectedValues = getCashflowRegistryConfig(kind).protectedValues || [];
  return list
    .map((item, index) => {
      const isProtected = protectedValues.includes(item);
      return `
        <div class="cashflow-registry-option-row">
          <input id="cashflowOption${index}" type="text" value="${escapeHtml(item)}" ${isProtected ? "disabled" : ""} />
          <div class="cashflow-registry-option-actions">
            <button class="ghost-action compact" type="button" data-update-cashflow-option="${kind}" data-option-index="${index}" ${isProtected ? "disabled" : ""}>
              Salvar
            </button>
            <button class="exit-button compact" type="button" aria-label="Excluir ${escapeHtml(item)}" data-delete-cashflow-option="${kind}" data-option-value="${escapeHtml(item)}" ${isProtected ? "disabled" : ""}>
              Excluir
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderCashflowTable() {
  return `
    <div class="admin-table-wrap">
      <table class="admin-table cashflow-table">
        <thead>
          <tr>
            <th>Data / hora</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Centro de custo</th>
            <th>Forma</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${cashEntries.map(renderCashflowTableRow).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCashflowTableRow(entry) {
  const isDeleted = Boolean(entry.deleted);
  const isScheduled = Boolean(entry.scheduledDate);
  const openPayment = isDeleted ? null : getOpenPaymentForCashEntry(entry);
  const statusClass = normalizeText(getCashEntryStatus(entry)).replace(/\s+/g, "-");
  return `
    <tr class="cashflow-row ${entry.value < 0 ? "is-out" : "is-in"} ${isDeleted ? "is-deleted" : ""}" data-cash-row data-cash-type="${entry.value < 0 ? "saídas" : "entradas"}" data-cash-status="${escapeHtml(statusClass)}" data-cash-scheduled="${String(isScheduled)}" data-cash-deleted="${String(isDeleted)}">
      <td data-label="Data / hora">${formatDateBR(entry.date || getTodayISO())} ${escapeHtml(entry.time || "")}</td>
      <td data-label="Tipo"><span class="cash-type-pill ${entry.value < 0 ? "is-out" : "is-in"}">${escapeHtml(entry.type)}</span></td>
      <td data-label="Descrição">${escapeHtml(entry.description)}</td>
      <td data-label="Categoria">${escapeHtml(entry.category || "Sem categoria")}</td>
      <td data-label="Centro de custo">${escapeHtml(entry.costCenter || "Sem centro")}</td>
      <td data-label="Forma">${escapeHtml(entry.method || "-")}</td>
      <td data-label="Valor">${formatCurrency(entry.value)}</td>
      <td data-label="Status">${renderCashEntryStatusLabel(entry)}</td>
      <td data-label="Ações">
        <div class="cashflow-row-actions">
          <button class="ghost-action" type="button" data-open-cash-entry="${entry.id}">Abrir</button>
          ${
            openPayment
              ? `<button class="primary-button compact-action" type="button" data-settle-open-payment="${openPayment.id}">Baixar</button>`
              : ""
          }
          ${
            isScheduled && !isDeleted
              ? `<button class="ghost-action" type="button" data-cancel-cash-entry="${entry.id}">Cancelar agendamento</button>`
              : ""
          }
          ${
            !isDeleted
              ? `<button class="exit-button compact" type="button" data-delete-cash-entry="${entry.id}">Excluir</button>`
              : ""
          }
        </div>
      </td>
    </tr>
  `;
}

function getCashEntryStatus(entry) {
  return entry.status === "Confirmado" ? "Confirmado" : "Pendente";
}

function renderCashEntryStatusLabel(entry) {
  const status = getCashEntryStatus(entry);
  const details = [];
  if (entry.scheduledDate) details.push(`Agendado ${formatDateBR(entry.scheduledDate)}${entry.scheduledTime ? ` às ${entry.scheduledTime}` : ""}`);
  if (entry.deleted) details.push("Excluído do fluxo ativo");
  return `${escapeHtml(status)}${details.length ? ` · ${details.map(escapeHtml).join(" · ")}` : ""}`;
}

function renderCashflowCharts() {
  const activeEntries = getCashflowActiveEntries();
  const totalIn = activeEntries.filter((entry) => entry.value > 0).reduce((total, entry) => total + entry.value, 0);
  const totalOut = Math.abs(activeEntries.filter((entry) => entry.value < 0).reduce((total, entry) => total + entry.value, 0));
  const maxFlow = Math.max(totalIn, totalOut, 1);
  return `
    <article class="admin-panel cashflow-chart-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Análise</p>
          <h2>Entradas x saídas</h2>
        </div>
      </div>
      <div class="cashflow-bars">
        ${renderCashflowBar("Entradas", totalIn, maxFlow, "in")}
        ${renderCashflowBar("Saídas", totalOut, maxFlow, "out")}
      </div>
    </article>
    <article class="admin-panel cashflow-chart-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Categorias</p>
          <h2>Distribuição por categoria</h2>
        </div>
      </div>
      <div class="cashflow-bars">
        ${renderGroupedCashflowBars("category")}
      </div>
    </article>
    <article class="admin-panel cashflow-chart-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Centros</p>
          <h2>Centros de custo</h2>
        </div>
      </div>
      <div class="cashflow-bars">
        ${renderGroupedCashflowBars("costCenter")}
      </div>
    </article>
  `;
}

function renderGroupedCashflowBars(key) {
  const groups = getCashflowGroupedTotals(key);
  const max = Math.max(1, ...groups.map((item) => Math.abs(item.total)));
  if (!groups.length) return '<p class="empty-alert">Sem lançamentos para análise.</p>';
  return groups.map((item) => renderCashflowBar(item.label, Math.abs(item.total), max, item.total < 0 ? "out" : "in")).join("");
}

function renderCashflowBar(label, value, max, kind) {
  const width = Math.max(7, Math.round((value / max) * 100));
  return `
    <div class="cashflow-bar-row">
      <div class="cashflow-bar-label">
        <span>${escapeHtml(label)}</span>
        <strong>${formatCurrency(value)}</strong>
      </div>
      <span class="cashflow-bar-track">
        <span class="cashflow-bar-fill ${kind === "out" ? "is-out" : "is-in"}" style="width: ${width}%"></span>
      </span>
    </div>
  `;
}

function getCashflowGroupedTotals(key) {
  const totals = new Map();
  getCashflowActiveEntries().forEach((entry) => {
    const label = entry[key] || "Sem classificação";
    totals.set(label, (totals.get(label) || 0) + entry.value);
  });
  return [...totals.entries()].map(([label, total]) => ({ label, total })).sort((a, b) => Math.abs(b.total) - Math.abs(a.total));
}

function bindCashflowScreenControls(container) {
  $("#startCashEntryButton", container)?.addEventListener("click", () => openCashflowDialog());
  $("#openCashflowExportButton", container)?.addEventListener("click", openCashflowExportDialog);
  $("#cashflowSearchInput", container)?.addEventListener("input", () => applyCashflowFilters(container));
  $("#cashflowFilterSelect", container)?.addEventListener("change", () => applyCashflowFilters(container));
  $$("[data-open-cash-entry]", container).forEach((button) => {
    button.addEventListener("click", () => openCashflowDialog(Number(button.dataset.openCashEntry)));
  });
  $$("[data-settle-open-payment]", container).forEach((button) => {
    button.addEventListener("click", () => settleOpenPayment(Number(button.dataset.settleOpenPayment)));
  });
  $$("[data-delete-cash-entry]", container).forEach((button) => {
    button.addEventListener("click", () => deleteCashEntry(Number(button.dataset.deleteCashEntry)));
  });
  $$("[data-cancel-cash-entry]", container).forEach((button) => {
    button.addEventListener("click", () => cancelScheduledCashEntry(Number(button.dataset.cancelCashEntry)));
  });
  $$("[data-confirm-scheduled-cash]", container).forEach((button) => {
    button.addEventListener("click", () => confirmScheduledCashEntry(Number(button.dataset.confirmScheduledCash)));
  });
}

function applyCashflowFilters(container) {
  const query = normalizeText($("#cashflowSearchInput", container)?.value || "");
  const activeFilter = $("#cashflowFilterSelect", container)?.value || "todos";
  $$("[data-cash-row]", container).forEach((row) => {
    const textMatch = !query || normalizeText(row.textContent).includes(query);
    const filterMatch =
      activeFilter === "todos" ||
      row.dataset.cashType === activeFilter ||
      row.dataset.cashStatus === normalizeText(activeFilter).replace(/\s+/g, "-") ||
      (activeFilter === "pendentes" && row.dataset.cashStatus === "pendente") ||
      (activeFilter === "confirmados" && row.dataset.cashStatus === "confirmado") ||
      (activeFilter === "agendados" && row.dataset.cashScheduled === "true") ||
      (activeFilter === "excluídos" && row.dataset.cashDeleted === "true");
    row.hidden = !textMatch || !filterMatch;
  });
}

function addCashflowOption(container, kind) {
  const config = getCashflowRegistryConfig(kind);
  const list = config.list;
  const input = $(`#cashflow${capitalize(kind)}Input`, container);
  const value = input.value.trim();
  if (!value) {
    input.focus();
    showToast("Informe um nome para cadastrar.");
    return;
  }
  if (list.some((item) => normalizeText(item) === normalizeText(value))) {
    showToast("Item já cadastrado.");
    return;
  }
  list.push(value);
  openCashflowRegistryDialog(kind, { returnToEntry: cashflowRegistryReturnToEntry });
  showToast(`${capitalize(config.label)} cadastrada.`);
}

function updateCashflowOption(container, kind, index) {
  const config = getCashflowRegistryConfig(kind);
  const list = config.list;
  const currentValue = list[index];
  const input = $(`#cashflowOption${index}`, container);
  const nextValue = input?.value.trim();
  if (!currentValue || !nextValue) {
    showToast("Informe um nome válido.");
    input?.focus();
    return;
  }
  if (currentValue === nextValue) return;
  if ((config.protectedValues || []).includes(currentValue)) {
    showToast("Esta forma é essencial para rotinas do sistema e não pode ser alterada.");
    return;
  }
  if (list.some((item, itemIndex) => itemIndex !== index && normalizeText(item) === normalizeText(nextValue))) {
    showToast("Item já cadastrado.");
    input.focus();
    return;
  }
  list[index] = nextValue;
  updateCashflowOptionReferences(kind, currentValue, nextValue);
  openCashflowRegistryDialog(kind, { returnToEntry: cashflowRegistryReturnToEntry });
  showToast(`${capitalize(config.label)} atualizada.`);
}

async function deleteCashflowOption(container, kind, value) {
  const config = getCashflowRegistryConfig(kind);
  const list = config.list;
  const label = config.label;
  if ((config.protectedValues || []).includes(value)) {
    await showMessageBox({
      title: "Item protegido",
      message: `Esta ${label} é usada em rotinas essenciais do sistema e não pode ser excluída.`,
      confirmLabel: "Entendi"
    });
    return;
  }
  const used = isCashflowOptionInUse(kind, value);
  if (used) {
    await showMessageBox({
      title: "Item em uso",
      message: `Não é possível excluir esta ${label}, pois há lançamentos vinculados. Edite ou exclua os lançamentos antes.`,
      confirmLabel: "Entendi"
    });
    return;
  }
  const index = list.findIndex((item) => item === value);
  if (index >= 0) list.splice(index, 1);
  openCashflowRegistryDialog(kind, { returnToEntry: cashflowRegistryReturnToEntry });
  showToast(`${capitalize(label)} removido.`);
}

function isCashflowOptionInUse(kind, value) {
  if (kind === "category") return cashEntries.some((entry) => !entry.deleted && entry.category === value);
  if (kind === "costCenter") return cashEntries.some((entry) => !entry.deleted && entry.costCenter === value);
  if (kind === "paymentMethod") {
    return (
      cashEntries.some((entry) => !entry.deleted && entry.method === value) ||
      patioVehicles.some((vehicle) => vehicle.payment === value) ||
      openPayments.some((payment) => payment.paymentMethod === value) ||
      invoiceLineItems.some((item) => item.paymentMethod === value)
    );
  }
  return false;
}

function updateCashflowOptionReferences(kind, currentValue, nextValue) {
  if (kind === "category") {
    cashEntries.forEach((entry) => {
      if (entry.category === currentValue) entry.category = nextValue;
    });
    return;
  }
  if (kind === "costCenter") {
    cashEntries.forEach((entry) => {
      if (entry.costCenter === currentValue) entry.costCenter = nextValue;
    });
    return;
  }
  if (kind === "paymentMethod") {
    cashEntries.forEach((entry) => {
      if (entry.method === currentValue) entry.method = nextValue;
    });
    patioVehicles.forEach((vehicle) => {
      if (vehicle.payment === currentValue) vehicle.payment = nextValue;
    });
    openPayments.forEach((payment) => {
      if (payment.paymentMethod === currentValue) payment.paymentMethod = nextValue;
    });
    invoiceLineItems.forEach((item) => {
      if (item.paymentMethod === currentValue) item.paymentMethod = nextValue;
    });
  }
}

function getCashflowScreenContent() {
  const totalIn = cashEntries
    .filter((entry) => entry.value > 0 && entry.status === "Confirmado")
    .reduce((total, entry) => total + entry.value, 0);
  const pendingIn = cashEntries
    .filter((entry) => entry.value > 0 && entry.status !== "Confirmado")
    .reduce((total, entry) => total + entry.value, 0);
  const totalOut = Math.abs(cashEntries.filter((entry) => entry.value < 0).reduce((total, entry) => total + entry.value, 0));
  const zeroCurrency = formatCurrency(0);
  const methodSummary = getCashflowPaymentMethods()
    .map((method) => {
      const confirmed = cashEntries
        .filter((entry) => entry.value > 0 && entry.method === method && entry.status === "Confirmado")
        .reduce((total, entry) => total + entry.value, 0);
      const pending = cashEntries
        .filter((entry) => entry.value > 0 && entry.method === method && entry.status !== "Confirmado")
        .reduce((total, entry) => total + entry.value, 0);

      return {
        title: method,
        value: formatCurrency(confirmed + pending),
        detail: pending ? `${formatCurrency(confirmed)} confirmado / ${formatCurrency(pending)} pendente` : "Confirmado no caixa"
      };
    })
    .filter((item) => item.value !== zeroCurrency)
    .slice(0, 4);
  return {
    searchIcon: "cashflow",
    searchPlaceholder: "Buscar lançamento",
    filters: ["Hoje", "Entradas", "Saídas", "Pendentes"],
    metrics: [
      { label: "Entradas confirmadas", value: formatCurrency(totalIn), icon: "cashflow" },
      { label: "A confirmar", value: formatCurrency(pendingIn), icon: "clock" },
      { label: "Saídas", value: formatCurrency(totalOut), icon: "payable" },
      { label: "Saldo previsto", value: formatCurrency(totalIn + pendingIn - totalOut), icon: "wallet" }
    ],
    kicker: "Movimento",
    tableTitle: "Lançamentos do dia",
    columns: ["Hora", "Tipo", "Descrição", "Forma", "Valor", "Status"],
    rows: cashEntries.map((entry) => [
      entry.time,
      entry.type,
      entry.description,
      entry.method,
      formatCurrency(entry.value),
      entry.status
    ]),
    sideKicker: "Fechamento",
    sideTitle: "Conciliação",
    sideItems: methodSummary.length
      ? methodSummary
      : [{ title: "Sem recebimentos", value: zeroCurrency, detail: "Confirme pagamentos no pátio" }]
  };
}

function openCashflowDialog(entryId = null, draft = null) {
  selectedCashEntryId = entryId;
  if (draft) cashflowDialogDraft = draft;
  const entry = entryId ? getCashEntryById(entryId) : null;
  const dialog = $("#cashflowDialog");
  dialog.innerHTML = renderCashflowDialogForm(entry, draft);
  initIcons();
  bindCashflowDialogControls(dialog);
  updateCashflowScheduleFields(dialog);
  updateCashflowAttachmentState(dialog, entry);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  $("#cashEntryDescription", dialog).focus();
}

function closeCashflowDialog() {
  const dialog = $("#cashflowDialog");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedCashEntryId = null;
  cashflowDialogDraft = null;
  cashflowRegistryReturnToEntry = false;
}

function renderCashflowDialogForm(entry, draft = null) {
  const source = draft || entry || {};
  const isScheduled = Boolean(source.scheduledDate);
  const value = Math.abs(Number(source.value || ""));
  return `
    <form class="vehicle-box cashflow-box" id="cashflowForm" novalidate>
      <div class="dialog-head">
        <div>
          <p class="eyebrow">${entry ? "Edição" : "Cadastro"}</p>
          <h2>${entry ? escapeHtml(entry.description) : "Novo lançamento"}</h2>
        </div>
        <button class="icon-button" id="closeCashflowDialog" type="button" aria-label="Fechar">
          <span data-icon="x"></span>
        </button>
      </div>

      <div class="vehicle-form-grid cashflow-dialog-grid">
        <label class="login-field" for="cashEntryType">
          <span>Tipo</span>
          <select id="cashEntryType" required>
            ${renderSelectOptions(["Entrada", "Saída"], source.type || "Entrada")}
          </select>
        </label>
        <label class="login-field" for="cashEntryValue">
          <span>Valor</span>
          <input id="cashEntryValue" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(value))}" required />
        </label>
        <label class="login-field cashflow-description-field" for="cashEntryDescription">
          <span>Descrição</span>
          <input id="cashEntryDescription" type="text" placeholder="Ex.: Compra de insumos" value="${escapeHtml(source.description || "")}" required />
        </label>
        ${renderCashflowManagedSelectField({
          id: "cashEntryMethod",
          label: "Forma de Pagamento",
          optionsHtml: renderRegistrySelectOptions(getCashflowPaymentMethods(), source.method || getPreferredPaymentMethodName("cashflow")),
          registryKind: "paymentMethod",
          actionLabel: "Cadastrar forma de pagamento"
        })}
        ${renderCashflowManagedSelectField({
          id: "cashEntryCategory",
          label: "Categoria",
          optionsHtml: renderRegistrySelectOptions(cashflowCategories, source.category || cashflowCategories[0] || ""),
          registryKind: "category",
          actionLabel: "Cadastrar categoria"
        })}
        ${renderCashflowManagedSelectField({
          id: "cashEntryCostCenter",
          label: "Centro de custo",
          optionsHtml: renderRegistrySelectOptions(cashflowCostCenters, source.costCenter || cashflowCostCenters[0] || ""),
          registryKind: "costCenter",
          actionLabel: "Cadastrar centro de custo"
        })}
        <label class="login-field" for="cashEntryStatus">
          <span>Status</span>
          <select id="cashEntryStatus" required>
            ${renderSelectOptions(["Confirmado", "Pendente"], source.status || (entry ? getCashEntryStatus(entry) : "Confirmado"))}
          </select>
        </label>
        <label class="switch-field cashflow-schedule-switch" for="cashEntryScheduled">
          <input id="cashEntryScheduled" type="checkbox" ${isScheduled ? "checked" : ""} ${entry?.deleted ? "disabled" : ""} />
          <span class="switch-control"></span>
          <span>Agendar lançamento</span>
        </label>
        <label class="login-field cashflow-schedule-field" for="cashEntryScheduledDate">
          <span>Data agendada</span>
          <input id="cashEntryScheduledDate" type="date" value="${escapeHtml(source.scheduledDate || source.date || getTodayISO())}" />
        </label>
        <label class="login-field cashflow-schedule-field" for="cashEntryScheduledTime">
          <span>Hora agendada</span>
          <select id="cashEntryScheduledTime">
            ${getScheduleTimeOptionsHtml(source.scheduledTime || source.time || "")}
          </select>
        </label>
        <label class="login-field cashflow-attachment-field" for="cashEntryAttachment">
          <span>Comprovante</span>
          <input id="cashEntryAttachment" type="file" accept=".pdf,.jpg,.jpeg,.png,.xml,.doc,.docx" />
        </label>
        <div class="cashflow-attachment-actions">
          <p id="cashAttachmentState"></p>
          <button class="ghost-action" id="downloadCashAttachmentButton" type="button">
            Baixar comprovante
          </button>
        </div>
      </div>

      <div class="dialog-actions cashflow-dialog-actions">
        ${
          entry && !entry.deleted
            ? `<button class="exit-button" id="deleteCashEntryFromDialogButton" type="button">Excluir</button>`
            : `<button class="exit-button" id="cancelCashflowDialog" type="button">Cancelar</button>`
        }
        ${
          entry?.scheduledDate && !entry.deleted
            ? `<button class="ghost-action" id="cancelScheduledCashFromDialogButton" type="button">Cancelar agendamento</button>`
            : ""
        }
        <button class="primary-button" type="submit" ${entry?.deleted ? "disabled" : ""}>
          <span data-icon="check"></span>
          <span>${entry ? "Atualizar" : "Salvar"}</span>
        </button>
      </div>
    </form>
  `;
}

function renderCashflowManagedSelectField({ id, label, optionsHtml, registryKind, actionLabel }) {
  const buttonAttribute =
    registryKind === "paymentMethod"
      ? 'data-open-business-finance="payment-methods"'
      : `data-open-cashflow-dialog-registry="${escapeHtml(registryKind)}"`;
  return `
    <div class="cashflow-managed-select">
      <div class="cashflow-managed-select-head">
        <span>${escapeHtml(label)}</span>
        <button class="icon-button cashflow-add-option-button" type="button" ${buttonAttribute} aria-label="${escapeHtml(actionLabel)}">
          <span data-icon="plus"></span>
        </button>
      </div>
      <label class="login-field" for="${escapeHtml(id)}">
        <select id="${escapeHtml(id)}" required>
          ${optionsHtml}
        </select>
      </label>
    </div>
  `;
}

function bindCashflowDialogControls(dialog) {
  bindCurrencyInputs(dialog);
  $("#closeCashflowDialog", dialog).addEventListener("click", closeCashflowDialog);
  $("#cancelCashflowDialog", dialog)?.addEventListener("click", closeCashflowDialog);
  $("#cashEntryScheduled", dialog).addEventListener("change", () => updateCashflowScheduleFields(dialog));
  $("#cashEntryAttachment", dialog).addEventListener("change", () => updateCashflowAttachmentState(dialog, getCashEntryById(selectedCashEntryId)));
  $("#downloadCashAttachmentButton", dialog).addEventListener("click", () => downloadCashEntryAttachment(dialog));
  $("#deleteCashEntryFromDialogButton", dialog)?.addEventListener("click", () => deleteCashEntry(selectedCashEntryId));
  $("#cancelScheduledCashFromDialogButton", dialog)?.addEventListener("click", () => cancelScheduledCashEntry(selectedCashEntryId));
  $$("[data-open-cashflow-dialog-registry]", dialog).forEach((button) => {
    button.addEventListener("click", () => {
      cashflowDialogDraft = getCashflowDialogDraft(dialog);
      openCashflowRegistryDialog(button.dataset.openCashflowDialogRegistry, { returnToEntry: true });
    });
  });
  $$("[data-open-business-finance]", dialog).forEach((button) => {
    button.addEventListener("click", () => {
      cashflowDialogDraft = getCashflowDialogDraft(dialog);
      closeCashflowDialog();
      showAdminView("businessFinance");
    });
  });
  $("#cashflowForm", dialog).addEventListener("submit", (event) => {
    event.preventDefault();
    saveCashEntry(dialog);
  });
}

function getCashflowDialogDraft(dialog) {
  const rawValue = getCurrencyInputValue("#cashEntryValue", dialog);
  const type = $("#cashEntryType", dialog)?.value || "Entrada";
  const signedValue = type === "Saída" ? -Math.abs(rawValue) : Math.abs(rawValue);
  return {
    type,
    value: signedValue,
    description: $("#cashEntryDescription", dialog)?.value.trim() || "",
    method: $("#cashEntryMethod", dialog)?.value || getPreferredPaymentMethodName("cashflow"),
    category: $("#cashEntryCategory", dialog)?.value || cashflowCategories[0] || "",
    costCenter: $("#cashEntryCostCenter", dialog)?.value || cashflowCostCenters[0] || "",
    status: $("#cashEntryStatus", dialog)?.value || "Confirmado",
    scheduledDate: $("#cashEntryScheduled", dialog)?.checked ? $("#cashEntryScheduledDate", dialog)?.value || getTodayISO() : "",
    scheduledTime: $("#cashEntryScheduled", dialog)?.checked ? $("#cashEntryScheduledTime", dialog)?.value || "" : "",
    date: $("#cashEntryScheduledDate", dialog)?.value || getTodayISO(),
    time: $("#cashEntryScheduledTime", dialog)?.value || ""
  };
}

function updateCashflowScheduleFields(dialog) {
  const isScheduled = $("#cashEntryScheduled", dialog).checked;
  const statusSelect = $("#cashEntryStatus", dialog);
  if (statusSelect && isScheduled) statusSelect.value = "Pendente";
  if (statusSelect) statusSelect.disabled = isScheduled;
  $$(".cashflow-schedule-field", dialog).forEach((field) => {
    const input = $("input, select", field);
    field.hidden = !isScheduled;
    if (!input) return;
    input.disabled = !isScheduled;
    input.required = isScheduled;
  });
  const dateInput = $("#cashEntryScheduledDate", dialog);
  if (dateInput) dateInput.min = getTodayISO();
}

function updateCashflowAttachmentState(dialog, entry) {
  const file = $("#cashEntryAttachment", dialog)?.files?.[0];
  const attachment = file ? { name: file.name, type: "Arquivo anexado" } : entry?.attachment;
  $("#cashAttachmentState", dialog).textContent = attachment ? `${attachment.type || "Comprovante"}: ${attachment.name}` : "Nenhum comprovante anexado.";
  $("#downloadCashAttachmentButton", dialog).disabled = !attachment;
}

function saveCashEntry(dialog) {
  const description = $("#cashEntryDescription", dialog).value.trim();
  const type = $("#cashEntryType", dialog).value;
  const rawValue = getCurrencyInputValue("#cashEntryValue", dialog);
  const method = $("#cashEntryMethod", dialog).value;
  const category = $("#cashEntryCategory", dialog).value;
  const costCenter = $("#cashEntryCostCenter", dialog).value;
  const status = $("#cashEntryStatus", dialog).value;
  const isScheduled = $("#cashEntryScheduled", dialog).checked;
  const scheduledDate = $("#cashEntryScheduledDate", dialog).value;
  const scheduledTime = $("#cashEntryScheduledTime", dialog).value;
  const file = $("#cashEntryAttachment", dialog).files?.[0];

  if (!description || !rawValue || !method || !category || !costCenter) {
    showToast("Preencha os dados obrigatórios do lançamento.");
    return;
  }
  if (isScheduled && (!scheduledDate || !scheduledTime)) {
    showToast("Informe data e hora do agendamento.");
    return;
  }

  const existingEntry = getCashEntryById(selectedCashEntryId);
  const signedValue = type === "Saída" ? -Math.abs(rawValue) : Math.abs(rawValue);
  const referenceDate = isScheduled ? scheduledDate || getTodayISO() : existingEntry?.date || getTodayISO();
  const financeSnapshot = getCashEntryFinanceSnapshot(rawValue, method, type, referenceDate);
  const resolvedStatus = isScheduled ? "Pendente" : status === "Pendente" ? "Pendente" : getExpectedReceiptStatus(method, type);
  const payload = {
    id: existingEntry?.id || getNextCashEntryId(),
    date: isScheduled ? scheduledDate : existingEntry?.date || getTodayISO(),
    time: isScheduled ? scheduledTime : existingEntry?.time || getCurrentShortTime(),
    type,
    description,
    method,
    value: signedValue,
    category,
    costCenter,
    status: resolvedStatus,
    scheduledDate: isScheduled ? scheduledDate : "",
    scheduledTime: isScheduled ? scheduledTime : "",
    attachment: file ? { name: file.name, type: getAttachmentTypeLabel(file.name) } : existingEntry?.attachment || null,
    feePercent: financeSnapshot.feePercent,
    fixedFee: financeSnapshot.fixedFee,
    feeAmount: financeSnapshot.feeAmount,
    netAmount: financeSnapshot.netAmount,
    expectedReceiptDate: financeSnapshot.expectedReceiptDate,
    methodImmediateSettlement: financeSnapshot.methodImmediateSettlement,
    settlementDays: financeSnapshot.settlementDays,
    linkedBankAccountName: financeSnapshot.linkedBankAccountName,
    createdBy: existingEntry?.createdBy || activeSessionUser || "Administrador",
    updatedBy: activeSessionUser || "Administrador"
  };

  if (existingEntry) Object.assign(existingEntry, payload);
  else cashEntries.unshift(payload);
  saveCashEntries();

  closeCashflowDialog();
  renderAdminScreen("cashflow");
  renderAdminDashboard();
  showToast(existingEntry ? "Lançamento atualizado." : "Lançamento cadastrado.");
}

async function deleteCashEntry(entryId) {
  const entry = getCashEntryById(entryId);
  if (!entry || entry.deleted) return;
  const shouldDelete = await showMessageBox({
    title: "Excluir lançamento?",
    message: "O lançamento será removido dos totais, mas permanecerá no histórico e nos relatórios.",
    confirmLabel: "Excluir",
    cancelLabel: "Cancelar",
    confirmOnly: false
  });
  if (!shouldDelete) return;
  entry.deleted = true;
  entry.deletedAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  entry.deletedBy = activeSessionUser || "Administrador";
  saveCashEntries();
  closeCashflowDialog();
  renderAdminScreen("cashflow");
  renderAdminDashboard();
  showToast("Lançamento excluído do fluxo ativo.");
}

function cancelScheduledCashEntry(entryId) {
  const entry = getCashEntryById(entryId);
  if (!entry || !entry.scheduledDate) return;
  entry.scheduledDate = "";
  entry.scheduledTime = "";
  entry.status = "Pendente";
  entry.canceledAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  entry.canceledBy = activeSessionUser || "Administrador";
  saveCashEntries();
  closeCashflowDialog();
  renderAdminScreen("cashflow");
  renderAdminDashboard();
  showToast("Agendamento cancelado e mantido no histórico.");
}

function confirmScheduledCashEntry(entryId) {
  const entry = getCashEntryById(entryId);
  if (!entry || !entry.scheduledDate) return;
  entry.status = "Confirmado";
  entry.date = getTodayISO();
  entry.time = getCurrentShortTime();
  entry.scheduledDate = "";
  entry.scheduledTime = "";
  saveCashEntries();
  renderAdminScreen("cashflow");
  renderAdminDashboard();
  showToast("Lançamento agendado confirmado.");
}

function downloadCashEntryAttachment(dialog) {
  const entry = getCashEntryById(selectedCashEntryId);
  const file = $("#cashEntryAttachment", dialog)?.files?.[0];
  const attachment = file ? { name: file.name } : entry?.attachment;
  if (!attachment) {
    showToast("Nenhum comprovante anexado.");
    return;
  }
  const attachmentLines = [
    `Lançamento: ${entry?.description || "Novo lançamento"}`,
    `Valor: ${entry ? formatCurrency(entry.value) : ""}`,
    `Arquivo original: ${attachment.name}`,
    `Categoria: ${entry?.category || "-"}`,
    `Centro de custo: ${entry?.costCenter || "-"}`,
    `Status: ${entry ? getCashEntryStatus(entry) : "-"}`
  ];
  if (String(attachment.name || "").toLowerCase().endsWith(".pdf")) {
    downloadPdfFile(attachment.name || `comprovante-${entry?.id || "lancamento"}.pdf`, "COMPROVANTE DO LANCAMENTO", attachmentLines, {
      subtitle: "Anexo financeiro",
      category: "Financeiro",
      summary: entry ? `${entry.description} - ${formatCurrency(entry.value)}.` : "Comprovante financeiro gerado pelo sistema."
    });
    return;
  }
  downloadTextFile(
    attachment.name || `comprovante-${entry?.id || "lancamento"}.txt`,
    attachmentLines.join("\n"),
    "text/plain"
  );
}

function exportCashflowReport(dialog) {
  const startDate = $("#cashflowExportStartDate", dialog).value;
  const endDate = $("#cashflowExportEndDate", dialog).value;
  const movement = $("#cashflowExportMovement", dialog).value;
  const format = $("#cashflowExportFormat", dialog).value;

  if (!startDate || !endDate) {
    showToast("Informe o período do relatório.");
    return;
  }
  if (startDate > endDate) {
    showToast("A data inicial não pode ser maior que a data final.");
    return;
  }

  const filters = { startDate, endDate, movement };
  if (format === "csv") exportCashflowCsv(filters);
  else exportCashflowPdf(filters);

  closeCashflowExportDialog();
}

function getCashflowReportEntries({ startDate, endDate, movement }) {
  return cashEntries.filter((entry) => {
    const reportDate = getCashEntryReportDate(entry);
    if (!reportDate || reportDate < startDate || reportDate > endDate) return false;
    const status = normalizeText(getCashEntryStatus(entry));
    const isDeleted = Boolean(entry.deleted);
    if (movement === "todos") return true;
    if (movement === "entradas") return !isDeleted && entry.type === "Entrada";
    if (movement === "saidas") return !isDeleted && entry.type === "Saída";
    if (movement === "pendentes") return !isDeleted && status === "pendente";
    if (movement === "confirmados") return !isDeleted && status === "confirmado";
    if (movement === "agendados") return !isDeleted && Boolean(entry.scheduledDate);
    if (movement === "excluidos") return isDeleted;
    return true;
  });
}

function getCashEntryReportDate(entry) {
  return entry.scheduledDate || entry.date || "";
}

function getCashflowMovementLabel(movement) {
  const labels = {
    todos: "Todos os movimentos",
    entradas: "Entradas",
    saidas: "Saídas",
    pendentes: "Pendentes",
    confirmados: "Confirmados",
    agendados: "Agendados",
    excluidos: "Excluídos"
  };
  return labels[movement] || "Todos os movimentos";
}

function getCashflowReportFileSuffix(filters) {
  return `${filters.startDate}-a-${filters.endDate}-${filters.movement}`;
}

function exportCashflowCsv(filters = { startDate: "0000-01-01", endDate: "9999-12-31", movement: "todos" }) {
  const entries = getCashflowReportEntries(filters);
  const rows = [
    ["ID", "Data", "Hora", "Tipo", "Descrição", "Categoria", "Centro de custo", "Forma", "Valor", "Status", "Agendado", "Excluído", "Comprovante"],
    ...entries.map((entry) => [
      entry.id,
      entry.date || "",
      entry.time || "",
      entry.type,
      entry.description,
      entry.category || "",
      entry.costCenter || "",
      entry.method || "",
      entry.value,
      getCashEntryStatus(entry),
      entry.scheduledDate ? "Sim" : "Não",
      entry.deleted ? "Sim" : "Não",
      entry.attachment?.name || ""
    ])
  ];
  const csv = rows.map((row) => row.map(formatCsvCell).join(";")).join("\n");
  downloadTextFile(`fluxo-caixa-${getCashflowReportFileSuffix(filters)}.csv`, csv, "text/csv;charset=utf-8");
}

function exportCashflowPdf(filters = { startDate: "0000-01-01", endDate: "9999-12-31", movement: "todos" }) {
  const entries = getCashflowReportEntries(filters);
  const total = entries.reduce((sum, entry) => sum + Number(entry.value || 0), 0);
  const period = `${formatDateBR(filters.startDate)} a ${formatDateBR(filters.endDate)}`;
  const movementLabel = getCashflowMovementLabel(filters.movement);
  const lines = [
    `Relatório de fluxo de caixa - ${period}`,
    `Movimentos incluídos: ${movementLabel}`,
    `Total de lançamentos: ${entries.length}`,
    `Saldo do relatório: ${formatCurrency(total)}`,
    "",
    ...entries.map(
      (entry) =>
        `${entry.id}. ${entry.type} | ${entry.description} | ${entry.category || "-"} | ${entry.costCenter || "-"} | ${formatCurrency(entry.value)} | ${getCashEntryStatus(entry)}${entry.scheduledDate ? " | agendado" : ""}${entry.deleted ? " | excluído" : ""}`
    )
  ];
  downloadPdfFile(`fluxo-caixa-${getCashflowReportFileSuffix(filters)}.pdf`, "Relatório de fluxo de caixa", lines, {
    subtitle: "Fluxo de caixa",
    category: "Financeiro",
    summary: `${entries.length} lançamento(s) no período ${period}, filtrado por ${movementLabel.toLowerCase()}.`
  });
}

function getCashflowActiveEntries() {
  return cashEntries.filter((entry) => !entry.deleted);
}

function getCashflowScheduledDueToday() {
  const today = getTodayISO();
  return cashEntries.filter((entry) => !entry.deleted && entry.scheduledDate === today && getCashEntryStatus(entry) === "Pendente");
}

function getCashEntryById(id) {
  return cashEntries.find((entry) => entry.id === Number(id));
}

function getCashflowPaymentMethods() {
  const active = getSelectablePaymentMethodNames("cashflow", { allowBilled: true });
  const historical = cashEntries.map((entry) => getCanonicalPaymentMethodName(entry.method)).filter(Boolean);
  return [...new Set([...active, ...historical])];
}

function getSettlementPaymentMethods() {
  const active = getSelectablePaymentMethodNames("settlement", { allowBilled: false, includeBankDeposit: true });
  const historical = [...openPayments, ...billingInvoices]
    .map((item) => getCanonicalPaymentMethodName(item.settlementMethod || item.paymentMethod))
    .filter((method) => method && normalizeText(method) !== normalizeText("Faturado"));
  return [...new Set([...active, ...historical])];
}

function getAttachmentTypeLabel(fileName) {
  const extension = String(fileName).split(".").pop()?.toLowerCase();
  if (extension === "xml") return "NF eletrônica";
  if (["jpg", "jpeg", "png"].includes(extension)) return "Imagem";
  if (extension === "pdf") return "PDF";
  return "Comprovante";
}

function formatCsvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function downloadTextFile(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function downloadPdfFile(fileName, title, lines, options = {}) {
  const logoImage = getPdfLogoImage();
  const documentPayload = {
    fileName,
    title,
    subtitle: options.subtitle || getPdfDocumentSubtitle(title),
    documentNumber: options.documentNumber || createPdfDocumentNumber(fileName),
    responsible: options.responsible || activeSessionUser || "Sistema LavaPrime",
    category: options.category || getPdfDocumentCategory(title),
    summary: options.summary || getPdfDocumentSummary(title, lines),
    reportTarget: options.reportTarget || getPdfDocumentReportTarget({ fileName, title, subtitle: options.subtitle, category: options.category }),
    sourceType: options.sourceType || "",
    sourceId: options.sourceId || ""
  };
  if (options.reportLayout === "operatorProduction") {
    const pdf = createOperatorProductionPdfDocument({
      fileName,
      title,
      operator: options.operator,
      subtitle: Object.prototype.hasOwnProperty.call(options, "subtitle") ? options.subtitle : documentPayload.subtitle,
      documentNumber: documentPayload.documentNumber,
      responsible: documentPayload.responsible,
      category: documentPayload.category,
      summary: documentPayload.summary,
      reportTarget: documentPayload.reportTarget
    }, logoImage);
    downloadTextFile(fileName, pdf, "application/pdf");
    recordGeneratedDocument(documentPayload);
    return;
  }

  if (options.reportLayout === "operatorCommission") {
    const pdf = createOperatorCommissionPdfDocument({
      fileName,
      title,
      operator: options.operator,
      subtitle: Object.prototype.hasOwnProperty.call(options, "subtitle") ? options.subtitle : documentPayload.subtitle,
      documentNumber: documentPayload.documentNumber,
      responsible: documentPayload.responsible,
      category: documentPayload.category,
      summary: documentPayload.summary,
      reportTarget: documentPayload.reportTarget
    }, logoImage);
    downloadTextFile(fileName, pdf, "application/pdf");
    recordGeneratedDocument(documentPayload);
    return;
  }

  const pdf = createStandardPdfDocument({
    fileName,
    title,
    lines: Array.isArray(lines) ? lines : [lines],
    subtitle: documentPayload.subtitle,
    documentNumber: documentPayload.documentNumber,
    responsible: documentPayload.responsible,
    category: documentPayload.category,
    summary: documentPayload.summary,
    reportTarget: documentPayload.reportTarget
  }, logoImage);
  downloadTextFile(fileName, pdf, "application/pdf");
  recordGeneratedDocument(documentPayload);
}

/*
  Regra documental futura:
  toda rotina nova que gerar PDF ou relatorio deve usar downloadPdfFile().
  A funcao aplica o papel timbrado definido em assets/templates e preserva
  o padrao visual de recibos, check-lists, faturas e relatorios.
*/
function createStandardPdfDocument(document, logoImage = null) {
  const documentLines = shouldAddInvoicePaymentData(document)
    ? [...document.lines, "", "Dados para pagamento", ...getBusinessInvoicePaymentLines()]
    : document.lines;
  const rows = createPdfRows(documentLines);
  const pages = paginatePdfRows(rows);
  const imageObjectNumber = logoImage ? 6 : null;
  const firstPageObjectNumber = logoImage ? 7 : 6;
  const pageObjects = pages.map((pageRows, index) => createPdfPageContent(document, pageRows, index + 1, pages.length, logoImage));
  const kids = pages.map((_, index) => `${firstPageObjectNumber + index * 2} 0 R`).join(" ");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>"
  ];

  if (logoImage) objects.push(createPdfImageObject(logoImage));

  pageObjects.forEach((content, index) => {
    const pageNumber = firstPageObjectNumber + index * 2;
    const contentNumber = pageNumber + 1;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfDocumentStandard.page.width} ${pdfDocumentStandard.page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${imageObjectNumber ? ` /XObject << /Logo ${imageObjectNumber} 0 R >>` : ""} >> /Contents ${contentNumber} 0 R >>`
    );
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });

  return buildPdfDocument(objects);
}

function createOperatorProductionPdfDocument(document, logoImage = null) {
  const operator = document.operator || {};
  const productionRows = getOperatorProductionRows(operator);
  const stats = getOperatorProductionReportStats(productionRows);
  const pdfRows = createOperatorProductionPdfRows(productionRows);
  const pages = paginateOperatorProductionPdfRows(pdfRows);
  const imageObjectNumber = logoImage ? 6 : null;
  const firstPageObjectNumber = logoImage ? 7 : 6;
  const pageObjects = pages.map((pageRows, index) =>
    createOperatorProductionPdfPageContent(document, operator, stats, pageRows, index + 1, pages.length, logoImage)
  );
  const kids = pages.map((_, index) => `${firstPageObjectNumber + index * 2} 0 R`).join(" ");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>"
  ];

  if (logoImage) objects.push(createPdfImageObject(logoImage));

  pageObjects.forEach((content, index) => {
    const pageNumber = firstPageObjectNumber + index * 2;
    const contentNumber = pageNumber + 1;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfDocumentStandard.page.width} ${pdfDocumentStandard.page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${imageObjectNumber ? ` /XObject << /Logo ${imageObjectNumber} 0 R >>` : ""} >> /Contents ${contentNumber} 0 R >>`
    );
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });

  return buildPdfDocument(objects);
}

function getOperatorProductionReportStats(rows) {
  const totals = rows.reduce(
    (result, row) => ({
      services: result.services + 1,
      revenue: result.revenue + row.value,
      commission: result.commission + row.commission,
      netRevenue: result.netRevenue + row.netValue,
      minutes: result.minutes + parseServiceDurationMinutes(row.duration)
    }),
    { services: 0, revenue: 0, commission: 0, netRevenue: 0, minutes: 0 }
  );
  const sortedDates = [...new Set(rows.map((row) => row.date).filter(Boolean))].sort();
  const periodLabel = sortedDates.length
    ? sortedDates[0] === sortedDates[sortedDates.length - 1]
      ? formatDateBR(sortedDates[0])
      : `${formatDateBR(sortedDates[0])} a ${formatDateBR(sortedDates[sortedDates.length - 1])}`
    : "Sem produção";
  const byDate = sortedDates.map((date) => {
    const dateRows = rows.filter((row) => row.date === date);
    return {
      date,
      services: dateRows.length,
      revenue: dateRows.reduce((total, row) => total + row.value, 0),
      netRevenue: dateRows.reduce((total, row) => total + row.netValue, 0)
    };
  });

  return {
    ...totals,
    averageTicket: totals.services ? totals.revenue / totals.services : 0,
    averageMinutes: totals.services ? totals.minutes / totals.services : 0,
    profitabilityRate: totals.revenue ? totals.netRevenue / totals.revenue : 0,
    periodLabel,
    byDate
  };
}

function createOperatorProductionPdfRows(rows) {
  if (!rows.length) {
    return [
      {
        empty: true,
        serviceLines: ["Sem servicos registrados para o operador selecionado."],
        height: 30
      }
    ];
  }

  return rows.map((row) => {
    const serviceLines = wrapPdfTextByWidth(row.service, 172, 7.8);
    return {
      ...row,
      serviceLines,
      height: Math.max(24, 13 + serviceLines.length * 9.5)
    };
  });
}

function paginateOperatorProductionPdfRows(rows) {
  const firstPageCapacity = 292;
  const continuationCapacity = 580;
  const pages = [[]];
  let capacity = firstPageCapacity;
  let usedHeight = 0;

  rows.forEach((row) => {
    const rowHeight = row.height || 24;
    if (usedHeight + rowHeight > capacity && pages[pages.length - 1].length) {
      pages.push([]);
      capacity = continuationCapacity;
      usedHeight = 0;
    }
    pages[pages.length - 1].push(row);
    usedHeight += rowHeight;
  });

  return pages;
}

function createOperatorProductionPdfPageContent(document, operator, stats, rows, pageNumber, pageCount, logoImage = null) {
  const commands = [];
  const { colors, page } = pdfDocumentStandard;
  addPdfRect(commands, 0, 0, page.width, page.height, { fill: colors.white });
  drawOperatorProductionLetterhead(commands, document, logoImage);

  if (pageNumber === 1) {
    drawOperatorProductionTitleBox(commands, document);
    drawOperatorProductionMetaGrid(commands, operator, stats);
    drawOperatorProductionMetrics(commands, stats);
    drawOperatorProductionCharts(commands, stats);
    drawOperatorSectionTitle(commands, "SERVICOS EXECUTADOS", 408);
    drawOperatorProductionTable(commands, rows, 398);
  } else {
    drawOperatorProductionContinuationBox(commands, document, operator, pageNumber);
    drawOperatorSectionTitle(commands, "SERVICOS EXECUTADOS (CONTINUACAO)", 694);
    drawOperatorProductionTable(commands, rows, 686);
  }

  drawPdfDocumentFooter(commands, document, pageNumber, pageCount);
  return commands.join("\n");
}

function drawOperatorProductionLetterhead(commands, document, logoImage) {
  const { colors } = pdfDocumentStandard;
  const reportName = getBusinessReportDocumentName(document.reportTarget);
  const contactLine = getBusinessDocumentContactLine(document.reportTarget);
  if (logoImage) {
    const logoSize = getPdfLogoDrawSize(logoImage);
    addPdfImage(commands, "Logo", pdfLogoSizing.headerX, pdfLogoSizing.headerY, logoSize.width, logoSize.height);
    addPdfText(commands, truncatePdfText(reportName, 42), pdfLogoSizing.headerTextX, 805, { size: 9, font: "F2", color: colors.petrol });
    addPdfText(commands, truncatePdfText(contactLine, 50), pdfLogoSizing.headerTextX, 790, { size: 7.2, color: colors.muted });
  } else {
    addPdfText(commands, reportName, 45, 805, { size: 22, font: "F2", color: colors.petrol });
    addPdfRect(commands, 45, 792, 94, 3, { fill: colors.cyan });
    addPdfText(commands, truncatePdfText(contactLine || "Sistema de gestao operacional", 64), 45, 779, {
      size: 8,
      color: colors.muted
    });
  }
  addPdfText(commands, "RELATORIO OPERACIONAL", 522, 808, { size: 8, font: "F2", color: colors.cyan, align: "right" });
  addPdfText(commands, `${normalizePdfText(document.category)} | ${new Date().toLocaleDateString("pt-BR")}`, 550, 794, {
    size: 8,
    color: colors.muted,
    align: "right"
  });
  addPdfLine(commands, 45, 758, 550, 758, colors.cyan, 1.8);
}

function drawOperatorProductionTitleBox(commands, document) {
  const { colors } = pdfDocumentStandard;
  const documentCellX = 420;
  const documentCellWidth = 130;
  const documentCellCenterX = documentCellX + documentCellWidth / 2;
  addPdfRect(commands, 45, 704, 505, 46, { fill: colors.ice, stroke: colors.border });
  addPdfRect(commands, 45, 748, 505, 2, { fill: colors.cyan });
  addPdfLine(commands, documentCellX, 704, documentCellX, 750, colors.border, 0.8);
  const subtitle = normalizePdfText(document.subtitle);
  addPdfText(commands, truncatePdfText(document.title, 34), 59, subtitle ? 728 : 721, { size: 17, font: "F2", color: colors.petrol });
  if (subtitle) addPdfText(commands, truncatePdfText(subtitle, 64), 59, 712, { size: 8.6, font: "F3", color: colors.muted });
  addPdfText(commands, "DOCUMENTO", documentCellCenterX, 729, { size: 7.5, font: "F2", color: colors.cyan, align: "center" });
  addPdfText(commands, truncatePdfText(document.documentNumber, 18), documentCellCenterX, 712, {
    size: getPdfTextSizeToFit(document.documentNumber, documentCellWidth - 24, 10.2, 7.6),
    font: "F2",
    color: colors.petrol,
    align: "center"
  });
}

function drawOperatorProductionMetaGrid(commands, operator, stats) {
  const { colors } = pdfDocumentStandard;
  const rows = [
    ["Operador", operator.name || "-", "Periodo", stats.periodLabel],
    ["CPF", operator.cpf || "-", "Regra", formatCommissionRule(operator)],
    ["Funcao", operator.role || operator.accessProfile || "-", "Ticket medio", formatCurrency(stats.averageTicket)]
  ];
  const x = 45;
  const y = 646;
  const labelWidth = 58;
  const valueWidth = 194.5;
  const cellHeight = 16;

  rows.forEach((row, rowIndex) => {
    const rowY = y + (rows.length - 1 - rowIndex) * cellHeight;
    [0, 2].forEach((labelIndex, groupIndex) => {
      const groupX = x + groupIndex * (labelWidth + valueWidth);
      addPdfRect(commands, groupX, rowY, labelWidth, cellHeight, { fill: colors.soft, stroke: colors.border, lineWidth: 0.45 });
      addPdfRect(commands, groupX + labelWidth, rowY, valueWidth, cellHeight, { fill: colors.white, stroke: colors.border, lineWidth: 0.45 });
      addPdfText(commands, truncatePdfText(row[labelIndex], 12), groupX + 7, rowY + 5.5, { size: 6.5, font: "F2", color: colors.cyan });
      addPdfText(commands, truncatePdfText(row[labelIndex + 1], 32), groupX + labelWidth + 7, rowY + 5.5, {
        size: 7,
        color: colors.petrol
      });
    });
  });
}

function drawOperatorProductionMetrics(commands, stats) {
  const metrics = [
    { label: "Servicos", value: String(stats.services), detail: `${formatServiceDurationMinutes(stats.averageMinutes)} medio` },
    { label: "Produzido", value: formatCurrency(stats.revenue), detail: `${formatCurrency(stats.averageTicket)} ticket` },
    { label: "Comissao", value: formatCurrency(stats.commission), detail: "descontada do bruto" },
    { label: "Liquido", value: formatCurrency(stats.netRevenue), detail: `${Math.round(stats.profitabilityRate * 100)}% rentabilidade` }
  ];
  const gap = 8;
  const cardWidth = (505 - gap * 3) / 4;
  metrics.forEach((metric, index) => {
    drawOperatorMetricCard(commands, 45 + index * (cardWidth + gap), 580, cardWidth, 52, metric);
  });
}

function drawOperatorMetricCard(commands, x, y, width, height, metric) {
  const { colors } = pdfDocumentStandard;
  addPdfRect(commands, x, y, width, height, { fill: colors.ice, stroke: colors.border, lineWidth: 0.6 });
  addPdfRect(commands, x, y + height - 3, width, 3, { fill: colors.cyan });
  addPdfText(commands, truncatePdfText(metric.label, 18), x + 9, y + height - 17, { size: 7, font: "F2", color: colors.muted });
  const valueSize = getPdfTextSizeToFit(metric.value, width - 18, 12, 8.5);
  addPdfText(commands, truncatePdfText(metric.value, 22), x + 9, y + 19, { size: valueSize, font: "F2", color: colors.petrol });
  addPdfText(commands, truncatePdfText(metric.detail, 26), x + 9, y + 7, { size: 6.6, color: colors.muted });
}

function drawOperatorProductionCharts(commands, stats) {
  drawOperatorPerformanceChart(commands, 45, 438, 248, 122, stats);
  drawOperatorProfitabilityChart(commands, 302, 438, 248, 122, stats);
}

function drawOperatorPerformanceChart(commands, x, y, width, height, stats) {
  const { colors } = pdfDocumentStandard;
  const data = stats.byDate.slice(-6);
  const maxValue = Math.max(1, ...data.map((item) => item.revenue));
  const plotX = x + 14;
  const plotY = y + 30;
  const plotWidth = width - 28;
  const plotHeight = 52;
  const slot = data.length ? plotWidth / data.length : plotWidth;
  const barWidth = Math.min(22, slot * 0.42);

  addPdfRect(commands, x, y, width, height, { fill: colors.white, stroke: colors.border, lineWidth: 0.6 });
  addPdfText(commands, "PERFORMANCE POR DATA", x + 14, y + height - 19, { size: 8, font: "F2", color: colors.petrol });
  addPdfText(commands, "Barras: produzido / liquido", x + 14, y + height - 33, { size: 6.6, color: colors.muted });
  addPdfLine(commands, plotX, plotY, plotX + plotWidth, plotY, colors.border, 0.5);

  if (!data.length) {
    addPdfText(commands, "Sem dados para graficos.", x + 14, y + 56, { size: 7.2, color: colors.muted });
    return;
  }

  data.forEach((item, index) => {
    const centerX = plotX + slot * index + slot / 2;
    const revenueHeight = Math.max(2, (item.revenue / maxValue) * plotHeight);
    const netHeight = Math.max(2, (Math.max(0, item.netRevenue) / maxValue) * plotHeight);
    addPdfRect(commands, centerX - barWidth / 2, plotY, barWidth, revenueHeight, { fill: colors.soft });
    addPdfRect(commands, centerX - barWidth / 2, plotY, barWidth, netHeight, { fill: colors.cyan });
    addPdfText(commands, formatDateBR(item.date).slice(0, 5), centerX, y + 16, { size: 6.2, color: colors.muted, align: "center" });
  });
}

function drawOperatorProfitabilityChart(commands, x, y, width, height, stats) {
  const { colors } = pdfDocumentStandard;
  const safeRevenue = Math.max(0, stats.revenue);
  const commissionWidth = safeRevenue ? Math.max(0, Math.min(1, stats.commission / safeRevenue)) : 0;
  const netWidth = safeRevenue ? Math.max(0, Math.min(1, stats.netRevenue / safeRevenue)) : 0;
  const barX = x + 14;
  const barY = y + 53;
  const barWidth = width - 28;
  const barHeight = 18;

  addPdfRect(commands, x, y, width, height, { fill: colors.white, stroke: colors.border, lineWidth: 0.6 });
  addPdfText(commands, "RENTABILIDADE DO OPERADOR", x + 14, y + height - 19, { size: 8, font: "F2", color: colors.petrol });
  addPdfText(commands, "Receita depois da comissao do periodo", x + 14, y + height - 33, { size: 6.6, color: colors.muted });
  addPdfRect(commands, barX, barY, barWidth, barHeight, { fill: colors.soft });
  addPdfRect(commands, barX, barY, barWidth * netWidth, barHeight, { fill: colors.cyan });
  addPdfRect(commands, barX + barWidth * netWidth, barY, barWidth * commissionWidth, barHeight, { fill: "#B7F000" });
  addPdfText(commands, `Liquido ${formatCurrency(stats.netRevenue)}`, barX, y + 31, { size: 7.1, font: "F2", color: colors.petrol });
  addPdfText(commands, `Comissao ${formatCurrency(stats.commission)}`, barX, y + 18, { size: 7.1, color: colors.muted });
  addPdfText(commands, `${Math.round(stats.profitabilityRate * 100)}%`, x + width - 14, y + 31, {
    size: 16,
    font: "F2",
    color: colors.petrol,
    align: "right"
  });
}

function drawOperatorProductionContinuationBox(commands, document, operator, pageNumber) {
  const { colors } = pdfDocumentStandard;
  addPdfRect(commands, 45, 724, 505, 28, { fill: colors.ice, stroke: colors.border, lineWidth: 0.6 });
  addPdfRect(commands, 45, 750, 505, 2, { fill: colors.cyan });
  addPdfText(commands, truncatePdfText(document.title, 40), 59, 736, { size: 12, font: "F2", color: colors.petrol });
  addPdfText(commands, `Continuacao ${pageNumber}`, 535, 736, {
    size: 7.5,
    color: colors.muted,
    align: "right"
  });
}

function drawOperatorSectionTitle(commands, title, y) {
  const { colors } = pdfDocumentStandard;
  addPdfRect(commands, 45, y, 505, 20, { fill: colors.petrol });
  addPdfText(commands, title, 59, y + 7, { size: 8.4, font: "F2", color: colors.white });
}

function drawOperatorProductionTable(commands, rows, topY) {
  const { colors } = pdfDocumentStandard;
  const tableX = 45;
  const tableWidth = 505;
  const headerHeight = 24;
  const columns = [
    { key: "date", label: "DATA", x: tableX, width: 62, align: "left" },
    { key: "service", label: "SERVICO REALIZADO", x: tableX + 62, width: 186, align: "left" },
    { key: "duration", label: "TEMPO", x: tableX + 248, width: 54, align: "center" },
    { key: "value", label: "VALOR PRODUZIDO", x: tableX + 302, width: 90, align: "right" },
    { key: "netValue", label: "LIQUIDO OPERADOR", x: tableX + 392, width: 113, align: "right" }
  ];
  let y = topY;

  addPdfRect(commands, tableX, y - headerHeight, tableWidth, headerHeight, { fill: colors.petrol });
  columns.forEach((column) => {
    const textX = getOperatorTableTextX(column, column.key === "netValue" ? 17 : 7);
    addPdfText(commands, column.label, textX, y - 15, {
      size: column.key === "netValue" ? 6.2 : 6.8,
      font: "F2",
      color: colors.white,
      align: column.align === "right" ? "right" : column.align === "center" ? "center" : "left"
    });
  });
  y -= headerHeight;

  rows.forEach((row, index) => {
    const rowHeight = row.height || 24;
    const rowBottom = y - rowHeight;
    addPdfRect(commands, tableX, rowBottom, tableWidth, rowHeight, { fill: index % 2 === 0 ? colors.white : "#F8FBFC" });

    if (row.empty) {
      addPdfText(commands, row.serviceLines[0], tableX + 9, y - 16, { size: 8, font: "F3", color: colors.muted });
      y = rowBottom;
      return;
    }

    const baseline = y - 15;
    addPdfText(commands, formatDateBR(row.date), columns[0].x + 7, baseline, { size: 7.6, color: colors.petrol });
    row.serviceLines.forEach((line, lineIndex) => {
      addPdfText(commands, truncatePdfText(line, 42), columns[1].x + 7, baseline - lineIndex * 9.5, {
        size: 7.6,
        color: colors.petrol
      });
    });
    addPdfText(commands, truncatePdfText(row.duration, 11), columns[2].x + columns[2].width / 2, baseline, {
      size: 7.4,
      color: colors.muted,
      align: "center"
    });
    addPdfText(commands, formatCurrency(row.value), columns[3].x + columns[3].width - 11, baseline, {
      size: getPdfTextSizeToFit(formatCurrency(row.value), columns[3].width - 18, 7.2, 6.2),
      color: colors.petrol,
      align: "right"
    });
    addPdfText(commands, formatCurrency(row.netValue), columns[4].x + columns[4].width - 17, baseline, {
      size: getPdfTextSizeToFit(formatCurrency(row.netValue), columns[4].width - 24, 7.2, 6.2),
      font: "F2",
      color: row.netValue < 0 ? "#8F1F1F" : colors.petrol,
      align: "right"
    });
    y = rowBottom;
  });
}

function getOperatorTableTextX(column, padding) {
  if (column.align === "right") return column.x + column.width - padding;
  if (column.align === "center") return column.x + column.width / 2;
  return column.x + padding;
}

function wrapPdfTextByWidth(value, width, size) {
  const maxLength = Math.max(8, Math.floor(width / (size * 0.48)));
  return wrapPdfLine(value, maxLength);
}

function getPdfTextSizeToFit(value, maxWidth, preferredSize, minSize) {
  let size = preferredSize;
  while (size > minSize && estimatePdfTextWidth(value, size) > maxWidth) {
    size -= 0.4;
  }
  return Math.max(minSize, size);
}

function createOperatorCommissionPdfDocument(document, logoImage = null) {
  const operator = document.operator || {};
  const report = getOperatorCommissionReportData(operator);
  const pdfRows = createOperatorCommissionPdfRows(report.rows);
  const pages = paginateOperatorCommissionPdfRows(pdfRows);
  const imageObjectNumber = logoImage ? 6 : null;
  const firstPageObjectNumber = logoImage ? 7 : 6;
  const pageObjects = pages.map((pageData, index) =>
    createOperatorCommissionPdfPageContent(document, operator, report, pageData, index + 1, pages.length, logoImage)
  );
  const kids = pages.map((_, index) => `${firstPageObjectNumber + index * 2} 0 R`).join(" ");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>"
  ];

  if (logoImage) objects.push(createPdfImageObject(logoImage));

  pageObjects.forEach((content, index) => {
    const pageNumber = firstPageObjectNumber + index * 2;
    const contentNumber = pageNumber + 1;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfDocumentStandard.page.width} ${pdfDocumentStandard.page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${imageObjectNumber ? ` /XObject << /Logo ${imageObjectNumber} 0 R >>` : ""} >> /Contents ${contentNumber} 0 R >>`
    );
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });

  return buildPdfDocument(objects);
}

function getOperatorCommissionReportData(operator) {
  const rows = getOperatorProductionRows(operator).map((row) => ({
    ...row,
    commissionValue: row.commission
  }));
  const deductions = getOperatorCommissionDeductions(operator);
  const grossCommission = rows.reduce((total, row) => total + row.commissionValue, 0);
  const deductionsTotal = deductions.reduce((total, item) => total + item.value, 0);
  const netPayable = Math.max(0, grossCommission - deductionsTotal);
  const sortedDates = [...new Set(rows.map((row) => row.date).filter(Boolean))].sort();
  const periodLabel = sortedDates.length
    ? sortedDates[0] === sortedDates[sortedDates.length - 1]
      ? formatDateBR(sortedDates[0])
      : `${formatDateBR(sortedDates[0])} a ${formatDateBR(sortedDates[sortedDates.length - 1])}`
    : "Sem comissao";

  return {
    rows,
    deductions,
    grossCommission,
    deductionsTotal,
    netPayable,
    services: rows.length,
    periodLabel,
    amountWords: formatCurrencyInWordsPTBR(netPayable)
  };
}

function getOperatorCommissionDeductions(operator) {
  if (!operator) return [];
  const sources = [
    { items: operator.productPurchases, type: "Produtos adquiridos" },
    { items: operator.advances, type: "Adiantamentos" },
    { items: operator.discounts, type: "Descontos" },
    { items: operator.deductions, type: "Outros descontos" }
  ];

  return sources.flatMap((source) =>
    (Array.isArray(source.items) ? source.items : [])
      .map((item) => normalizeOperatorDeductionEntry(item, source.type))
      .filter((item) => item.value > 0)
  );
}

function normalizeOperatorDeductionEntry(item, fallbackType) {
  const value = Math.abs(Number(item?.value ?? item?.amount ?? item?.total ?? 0));
  return {
    date: item?.date || getTodayISO(),
    type: item?.type || fallbackType,
    description: item?.description || item?.name || fallbackType,
    value
  };
}

function createOperatorCommissionPdfRows(rows) {
  if (!rows.length) {
    return [
      {
        empty: true,
        serviceLines: ["Sem servicos com comissao para o operador selecionado."],
        height: 30
      }
    ];
  }

  return rows.map((row) => {
    const serviceLines = wrapPdfTextByWidth(row.service, 238, 7.7);
    return {
      ...row,
      serviceLines,
      height: Math.max(24, 13 + serviceLines.length * 9.5)
    };
  });
}

function paginateOperatorCommissionPdfRows(rows) {
  const pages = [{ rows: [], receipt: false }];
  let pageIndex = 0;
  let usedHeight = 0;

  rows.forEach((row) => {
    const rowHeight = row.height || 24;
    const capacity = getOperatorCommissionPageRowCapacity(pageIndex, false);
    if (usedHeight + rowHeight > capacity && pages[pageIndex].rows.length) {
      pages.push({ rows: [], receipt: false });
      pageIndex += 1;
      usedHeight = 0;
    }
    pages[pageIndex].rows.push(row);
    usedHeight += rowHeight;
  });

  let lastPage = pages[pages.length - 1];
  let lastUsedHeight = getPdfRowsHeight(lastPage.rows);
  const lastReceiptCapacity = getOperatorCommissionPageRowCapacity(pages.length - 1, true);
  if (lastUsedHeight <= lastReceiptCapacity) {
    lastPage.receipt = true;
    return pages;
  }

  const receiptPage = { rows: [], receipt: true };
  const receiptCapacity = getOperatorCommissionPageRowCapacity(pages.length, true);
  let receiptUsedHeight = 0;
  while (lastPage.rows.length) {
    const nextRow = lastPage.rows[lastPage.rows.length - 1];
    const nextHeight = nextRow.height || 24;
    if (receiptPage.rows.length && receiptUsedHeight + nextHeight > receiptCapacity) break;
    if (!receiptPage.rows.length && nextHeight > receiptCapacity) break;
    receiptPage.rows.unshift(lastPage.rows.pop());
    receiptUsedHeight += nextHeight;
  }

  if (!lastPage.rows.length && pages.length > 1) pages.pop();
  pages.push(receiptPage);
  return pages;
}

function getOperatorCommissionPageRowCapacity(pageIndex, hasReceipt) {
  const tableTop = pageIndex === 0 ? 566 : 704;
  const headerHeight = 24;
  if (!hasReceipt) return tableTop - headerHeight - 82;
  return tableTop - headerHeight - 314;
}

function getPdfRowsHeight(rows) {
  return rows.reduce((total, row) => total + (row.height || 24), 0);
}

function createOperatorCommissionPdfPageContent(document, operator, report, pageData, pageNumber, pageCount, logoImage = null) {
  const commands = [];
  const { colors, page } = pdfDocumentStandard;
  addPdfRect(commands, 0, 0, page.width, page.height, { fill: colors.white });
  drawOperatorProductionLetterhead(commands, document, logoImage);

  if (pageNumber === 1) {
    drawOperatorProductionTitleBox(commands, document);
    drawOperatorCommissionMetaGrid(commands, operator, report);
    drawOperatorCommissionMetrics(commands, report);
    drawOperatorCommissionTable(commands, pageData.rows, 566);
  } else {
    drawOperatorProductionContinuationBox(commands, document, operator, pageNumber);
    drawOperatorCommissionTable(commands, pageData.rows, 704);
  }

  if (pageData.receipt) drawOperatorCommissionReceipt(commands, document, operator, report);

  drawPdfDocumentFooter(commands, document, pageNumber, pageCount);
  return commands.join("\n");
}

function drawOperatorCommissionMetaGrid(commands, operator, report) {
  const { colors } = pdfDocumentStandard;
  const rows = [
    ["Operador", operator.name || "-", "Periodo", report.periodLabel],
    ["CPF", operator.cpf || "-", "Regra", formatCommissionRule(operator)],
    ["Funcao", operator.role || operator.accessProfile || "-", "Emissor", activeSessionUser || "Sistema LavaPrime"]
  ];
  const x = 45;
  const y = 646;
  const labelWidth = 58;
  const valueWidth = 194.5;
  const cellHeight = 16;

  rows.forEach((row, rowIndex) => {
    const rowY = y + (rows.length - 1 - rowIndex) * cellHeight;
    [0, 2].forEach((labelIndex, groupIndex) => {
      const groupX = x + groupIndex * (labelWidth + valueWidth);
      addPdfRect(commands, groupX, rowY, labelWidth, cellHeight, { fill: colors.soft, stroke: colors.border, lineWidth: 0.45 });
      addPdfRect(commands, groupX + labelWidth, rowY, valueWidth, cellHeight, { fill: colors.white, stroke: colors.border, lineWidth: 0.45 });
      addPdfText(commands, truncatePdfText(row[labelIndex], 12), groupX + 7, rowY + 5.5, { size: 6.5, font: "F2", color: colors.cyan });
      addPdfText(commands, truncatePdfText(row[labelIndex + 1], 32), groupX + labelWidth + 7, rowY + 5.5, {
        size: 7,
        color: colors.petrol
      });
    });
  });
}

function drawOperatorCommissionMetrics(commands, report) {
  const metrics = [
    { label: "Servicos", value: String(report.services), detail: "base de calculo" },
    { label: "Comissao bruta", value: formatCurrency(report.grossCommission), detail: "sobre servicos" },
    { label: "Descontos", value: formatCurrency(report.deductionsTotal), detail: "produtos / adiantamentos" },
    { label: "A pagar", value: formatCurrency(report.netPayable), detail: "valor liquido" }
  ];
  const gap = 8;
  const cardWidth = (505 - gap * 3) / 4;
  metrics.forEach((metric, index) => {
    drawOperatorMetricCard(commands, 45 + index * (cardWidth + gap), 580, cardWidth, 52, metric);
  });
}

function drawOperatorCommissionTable(commands, rows, topY) {
  const { colors } = pdfDocumentStandard;
  const tableX = 45;
  const tableWidth = 505;
  const headerHeight = 24;
  const columns = [
    { key: "date", label: "DATA", x: tableX, width: 62, align: "left" },
    { key: "service", label: "SERVICO EXECUTADO", x: tableX + 62, width: 254, align: "left" },
    { key: "value", label: "BASE", x: tableX + 316, width: 83, align: "right" },
    { key: "commissionValue", label: "COMISSAO", x: tableX + 399, width: 106, align: "right" }
  ];
  let y = topY;

  addPdfRect(commands, tableX, y - headerHeight, tableWidth, headerHeight, { fill: colors.petrol });
  columns.forEach((column) => {
    const rightColumn = column.align === "right";
    addPdfText(commands, column.label, getOperatorTableTextX(column, rightColumn ? 15 : 7), y - 15, {
      size: column.key === "commissionValue" ? 6.6 : 6.8,
      font: "F2",
      color: colors.white,
      align: rightColumn ? "right" : "left"
    });
  });
  y -= headerHeight;

  rows.forEach((row, index) => {
    const rowHeight = row.height || 24;
    const rowBottom = y - rowHeight;
    addPdfRect(commands, tableX, rowBottom, tableWidth, rowHeight, { fill: index % 2 === 0 ? colors.white : "#F8FBFC" });

    if (row.empty) {
      addPdfText(commands, row.serviceLines[0], tableX + 9, y - 16, { size: 8, font: "F3", color: colors.muted });
      y = rowBottom;
      return;
    }

    const baseline = y - 15;
    addPdfText(commands, formatDateBR(row.date), columns[0].x + 7, baseline, { size: 7.5, color: colors.petrol });
    row.serviceLines.forEach((line, lineIndex) => {
      addPdfText(commands, truncatePdfText(line, 58), columns[1].x + 7, baseline - lineIndex * 9.5, {
        size: 7.5,
        color: colors.petrol
      });
    });
    addPdfText(commands, formatCurrency(row.value), columns[2].x + columns[2].width - 12, baseline, {
      size: getPdfTextSizeToFit(formatCurrency(row.value), columns[2].width - 20, 7.1, 6.1),
      color: colors.muted,
      align: "right"
    });
    addPdfText(commands, formatCurrency(row.commissionValue), columns[3].x + columns[3].width - 16, baseline, {
      size: getPdfTextSizeToFit(formatCurrency(row.commissionValue), columns[3].width - 24, 7.3, 6.2),
      font: "F2",
      color: colors.petrol,
      align: "right"
    });
    y = rowBottom;
  });
}

function drawOperatorCommissionReceipt(commands, document, operator, report) {
  const { colors } = pdfDocumentStandard;
  const x = 45;
  const y = 82;
  const width = 505;
  const height = 218;
  const adminName = document.responsible || activeSessionUser || "Sistema LavaPrime";
  const receiptText = `Recebi de ${getBusinessDocumentName()} o valor de ${formatCurrency(report.netPayable)} (${report.amountWords}), referente a Servicos de limpeza e/ou cuidados esteticos em veiculos.`;
  const receiptLines = wrapPdfTextByWidth(receiptText, width - 28, 7.8);

  addPdfRect(commands, x, y, width, height, { fill: colors.ice, stroke: colors.border, lineWidth: 0.8 });
  addPdfRect(commands, x, y + height - 3, width, 3, { fill: colors.cyan });
  addPdfText(commands, "Recibo de Pagamento", x + 14, y + height - 22, {
    size: 9.2,
    font: "F2",
    color: colors.petrol
  });
  addPdfText(commands, `Valor liquido recebido: ${formatCurrency(report.netPayable)}`, x + width - 14, y + height - 22, {
    size: getPdfTextSizeToFit(`Valor liquido recebido: ${formatCurrency(report.netPayable)}`, 180, 8, 6.2),
    font: "F2",
    color: colors.petrol,
    align: "right"
  });

  addPdfText(commands, `Operador: ${operator.name || "-"} | CPF: ${operator.cpf || "-"} | Funcao: ${operator.role || operator.accessProfile || "-"}`, x + 14, y + height - 45, {
    size: 7.2,
    color: colors.petrol
  });
  addPdfText(commands, `Comissao bruta: ${formatCurrency(report.grossCommission)} | Descontos: ${formatCurrency(report.deductionsTotal)}`, x + 14, y + height - 60, {
    size: 7,
    color: colors.muted
  });

  receiptLines.slice(0, 5).forEach((line, index) => {
    addPdfText(commands, line, x + 14, y + height - 88 - index * 10.5, { size: 7.8, color: colors.petrol });
  });

  addPdfText(commands, `Emissao: ${new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}`, x + 14, y + 68, {
    size: 7,
    color: colors.muted
  });
  drawOperatorSignatureField(commands, x + 28, y + 24, 190, `Administrador emissor: ${adminName}`);
  drawOperatorSignatureField(commands, x + width - 218, y + 24, 190, `Operador recebedor: ${operator.name || "-"}`);
}

function drawOperatorSignatureField(commands, x, y, width, label) {
  const { colors } = pdfDocumentStandard;
  addPdfLine(commands, x, y + 18, x + width, y + 18, colors.border, 0.8);
  addPdfText(commands, truncatePdfText(label, 42), x + width / 2, y + 3, {
    size: 6.9,
    color: colors.muted,
    align: "center"
  });
}

function formatCurrencyInWordsPTBR(value) {
  const normalizedValue = Math.max(0, Number(value || 0));
  const reais = Math.floor(normalizedValue);
  const cents = Math.round((normalizedValue - reais) * 100);
  const realText = `${numberToWordsPTBR(reais)} ${reais === 1 ? "real" : "reais"}`;
  if (!cents) return realText;
  return `${realText} e ${numberToWordsPTBR(cents)} ${cents === 1 ? "centavo" : "centavos"}`;
}

function numberToWordsPTBR(value) {
  const number = Math.floor(Math.max(0, Number(value || 0)));
  if (number === 0) return "zero";
  if (number < 1000) return numberUnderThousandToWordsPTBR(number);

  const groups = [];
  let remaining = number;
  while (remaining > 0) {
    groups.unshift(remaining % 1000);
    remaining = Math.floor(remaining / 1000);
  }

  const scales = ["", "mil", "milhao", "bilhao"];
  const parts = [];
  groups.forEach((groupValue, index) => {
    if (!groupValue) return;
    const scaleIndex = groups.length - index - 1;
    if (scaleIndex === 1 && groupValue === 1) {
      parts.push("mil");
      return;
    }
    const scale = scales[scaleIndex] || "";
    const pluralScale = scale === "milhao" && groupValue > 1 ? "milhoes" : scale === "bilhao" && groupValue > 1 ? "bilhoes" : scale;
    parts.push(`${numberUnderThousandToWordsPTBR(groupValue)}${pluralScale ? ` ${pluralScale}` : ""}`);
  });

  return joinPortugueseWordParts(parts);
}

function numberUnderThousandToWordsPTBR(value) {
  const units = ["", "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const teens = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const tens = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const hundreds = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
  const number = Math.floor(Math.max(0, Number(value || 0)));

  if (number === 0) return "zero";
  if (number < 10) return units[number];
  if (number < 20) return teens[number - 10];
  if (number < 100) {
    const ten = Math.floor(number / 10);
    const unit = number % 10;
    return unit ? `${tens[ten]} e ${units[unit]}` : tens[ten];
  }
  if (number === 100) return "cem";
  const hundred = Math.floor(number / 100);
  const rest = number % 100;
  return rest ? `${hundreds[hundred]} e ${numberUnderThousandToWordsPTBR(rest)}` : hundreds[hundred];
}

function joinPortugueseWordParts(parts) {
  if (parts.length <= 1) return parts[0] || "zero";
  return `${parts.slice(0, -1).join(", ")} e ${parts[parts.length - 1]}`;
}

function buildPdfDocument(objects) {
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function getPdfLogoImage() {
  const source = getPdfLogoSource();
  if (pdfLogoImageCache && pdfLogoImageSourceCache === source) return pdfLogoImageCache;
  preloadPdfLogoImage();
  return null;
}

function preloadPdfLogoImage() {
  const source = getPdfLogoSource();
  if (pdfLogoImagePromise && pdfLogoImageSourceCache === source) return pdfLogoImagePromise;
  pdfLogoImageSourceCache = source;
  pdfLogoImagePromise = new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve(null);
      return;
    }

    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, pdfLogoSizing.sourceMaxSide / image.naturalWidth, pdfLogoSizing.sourceMaxSide / image.naturalHeight);
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const binary = atob(canvas.toDataURL("image/jpeg", pdfLogoSizing.jpegQuality).split(",")[1]);
      pdfLogoImageCache = { width, height, hex: binaryStringToHex(binary) };
      resolve(pdfLogoImageCache);
    };
    image.onerror = () => {
      pdfLogoImageCache = null;
      resolve(null);
    };
    image.src = source;
  });
  return pdfLogoImagePromise;
}

function resetPdfLogoCache() {
  pdfLogoImageCache = null;
  pdfLogoImageSourceCache = "";
  pdfLogoImagePromise = null;
  preloadPdfLogoImage();
}

function getPdfLogoSource() {
  return businessProfile.logoDataUrl || "./assets/brand/lavaprime-lockup.png";
}

function getPdfLogoDrawSize(logoImage) {
  const maxWidth = pdfLogoSizing.headerMaxWidth * (getBusinessLogoDimensionPercent("x") / 100);
  const maxHeight = pdfLogoSizing.headerMaxHeight * (getBusinessLogoDimensionPercent("y") / 100);
  if (!logoImage?.width || !logoImage?.height) return { width: maxWidth, height: maxHeight };
  const ratio = Math.min(maxWidth / logoImage.width, maxHeight / logoImage.height);
  return {
    width: Math.max(1, logoImage.width * ratio),
    height: Math.max(1, logoImage.height * ratio)
  };
}

function createPdfImageObject(image) {
  const stream = `${image.hex}>`;
  return `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter [/ASCIIHexDecode /DCTDecode] /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
}

function binaryStringToHex(binary) {
  let hex = "";
  for (let index = 0; index < binary.length; index += 1) {
    hex += binary.charCodeAt(index).toString(16).padStart(2, "0");
  }
  return hex;
}

function createPdfRows(lines) {
  const sourceLines = Array.isArray(lines) ? lines : [lines];
  const rows = [];

  sourceLines.forEach((sourceLine) => {
    if (sourceLine && typeof sourceLine === "object") {
      rows.push(createPdfStructuredRow(sourceLine));
      return;
    }

    const line = normalizePdfText(sourceLine);
    if (!line) {
      rows.push({ type: "spacer", height: 8 });
      return;
    }

    if (isPdfSectionTitle(line)) {
      rows.push({ type: "section", text: line, height: 22 });
      return;
    }

    const wrappedLines = wrapPdfLine(line, 92);
    rows.push({ type: "row", lines: wrappedLines, height: 16 + (wrappedLines.length - 1) * 11 });
  });

  return rows.length ? rows : [{ type: "row", lines: ["Sem registros para este documento."], height: 16 }];
}

function createPdfStructuredRow(line) {
  if (line.type === "checklistItem") {
    const condition = line.condition || checklistUnverifiedCondition;
    const text = `${line.part || "-"}: ${condition}`;
    const wrappedLines = wrapPdfLine(text, 82);
    return {
      type: "checklistItem",
      condition,
      lines: wrappedLines,
      height: 20 + (wrappedLines.length - 1) * 11
    };
  }

  return { type: "row", lines: wrapPdfLine(line.text || "", 92), height: 16 };
}

function paginatePdfRows(rows) {
  const contentHeight = pdfDocumentStandard.page.contentTopY - pdfDocumentStandard.page.bottomY;
  const pages = [[]];
  let usedHeight = 0;

  rows.forEach((row) => {
    const rowHeight = row.height || 16;
    if (usedHeight + rowHeight > contentHeight && pages[pages.length - 1].length) {
      pages.push([]);
      usedHeight = 0;
    }
    pages[pages.length - 1].push(row);
    usedHeight += rowHeight;
  });

  return pages;
}

function createPdfPageContent(document, rows, pageNumber, pageCount, logoImage = null) {
  const commands = [];
  const { colors, page } = pdfDocumentStandard;
  const reportName = getBusinessReportDocumentName(document.reportTarget);
  const contactLine = getBusinessDocumentContactLine(document.reportTarget);
  addPdfRect(commands, 0, 0, page.width, page.height, { fill: colors.white });
  if (logoImage) {
    const logoSize = getPdfLogoDrawSize(logoImage);
    addPdfImage(commands, "Logo", pdfLogoSizing.headerX, pdfLogoSizing.headerY, logoSize.width, logoSize.height);
    addPdfText(commands, truncatePdfText(reportName, 42), pdfLogoSizing.headerTextX, 805, { size: 9, font: "F2", color: colors.petrol });
    addPdfText(commands, truncatePdfText(contactLine, 50), pdfLogoSizing.headerTextX, 790, { size: 7.2, color: colors.muted });
  } else {
    addPdfText(commands, reportName, 45, 805, { size: 22, font: "F2", color: colors.petrol });
    addPdfRect(commands, 45, 792, 94, 3, { fill: colors.cyan });
    addPdfText(commands, truncatePdfText(contactLine || "Sistema de gestao operacional", 64), 45, 779, { size: 8, color: colors.muted });
  }
  addPdfText(commands, "MODELO PADRAO PARA PDF", 550, 808, { size: 8, font: "F2", color: colors.cyan, align: "right" });
  addPdfText(commands, `${normalizePdfText(document.category)} | ${new Date().toLocaleDateString("pt-BR")}`, 550, 794, {
    size: 8,
    color: colors.muted,
    align: "right"
  });
  addPdfLine(commands, 45, 758, 550, 758, colors.cyan, 1.8);

  drawPdfTitleBox(commands, document);
  drawPdfMetaGrid(commands, document);
  drawPdfSummary(commands, document);
  drawPdfItems(commands, rows);

  drawPdfDocumentFooter(commands, document, pageNumber, pageCount);
  return commands.join("\n");
}

function drawPdfDocumentFooter(commands, document, pageNumber, pageCount) {
  const { colors } = pdfDocumentStandard;
  addPdfLine(commands, 45, 58, 550, 58, colors.border, 0.8);
  addPdfText(commands, `${getBusinessReportDocumentName(document.reportTarget)} | Documento gerado pelo LavaPrime | Pagina ${pageNumber} de ${pageCount}`, 297, 42, {
    size: 8,
    color: colors.muted,
    align: "center"
  });
  addPdfText(commands, getBusinessDocumentFooterDetails(document.reportTarget) || `Padrao: ${pdfDocumentStandard.templateReference}`, 297, 30, {
    size: 7,
    color: colors.muted,
    align: "center"
  });
}

function drawPdfTitleBox(commands, document) {
  const { colors } = pdfDocumentStandard;
  addPdfRect(commands, 45, 692, 505, 58, { fill: colors.ice, stroke: colors.border });
  addPdfRect(commands, 45, 748, 505, 2, { fill: colors.cyan });
  addPdfLine(commands, 430, 692, 430, 750, colors.border, 0.8);
  addPdfText(commands, truncatePdfText(document.title, 34), 59, 724, { size: 18, font: "F2", color: colors.petrol });
  addPdfText(commands, truncatePdfText(document.subtitle, 68), 59, 706, { size: 9, font: "F3", color: colors.muted });
  addPdfText(commands, "DOCUMENTO", 535, 724, { size: 8, font: "F2", color: colors.cyan, align: "right" });
  addPdfText(commands, truncatePdfText(document.documentNumber, 18), 535, 706, { size: 12, font: "F2", color: colors.petrol, align: "right" });
}

function drawPdfMetaGrid(commands, document) {
  const { colors } = pdfDocumentStandard;
  const emittedAt = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  const rows = [
    ["Negocio", getBusinessReportDocumentName(document.reportTarget), "Emissao", emittedAt],
    ["Contato", getBusinessDocumentContactLine(document.reportTarget) || "-", "Responsavel", document.responsible],
    ["Arquivo", document.fileName, "Categoria", document.category]
  ];
  const x = 45;
  const y = 614;
  const labelWidth = 68;
  const valueWidth = 184.5;
  const cellHeight = 26;

  rows.forEach((row, rowIndex) => {
    const rowY = y + (2 - rowIndex) * cellHeight;
    [0, 2].forEach((labelIndex, groupIndex) => {
      const groupX = x + groupIndex * (labelWidth + valueWidth);
      addPdfRect(commands, groupX, rowY, labelWidth, cellHeight, { fill: colors.soft, stroke: colors.border });
      addPdfRect(commands, groupX + labelWidth, rowY, valueWidth, cellHeight, { fill: colors.white, stroke: colors.border });
      addPdfText(commands, truncatePdfText(row[labelIndex], 14), groupX + 8, rowY + 10, { size: 7, font: "F2", color: colors.cyan });
      addPdfText(commands, truncatePdfText(row[labelIndex + 1], 30), groupX + labelWidth + 8, rowY + 10, {
        size: 8,
        color: colors.petrol
      });
    });
  });
}

function drawPdfSummary(commands, document) {
  const { colors } = pdfDocumentStandard;
  addPdfRect(commands, 45, 574, 505, 20, { fill: colors.cyan, stroke: colors.cyan });
  addPdfText(commands, "RESUMO", 59, 581, { size: 9, font: "F2", color: colors.petrol });
  addPdfRect(commands, 45, 540, 505, 28, { fill: colors.soft, stroke: colors.border });
  addPdfText(commands, truncatePdfText(document.summary, 98), 59, 552, { size: 8.5, font: "F3", color: colors.muted });
  addPdfRect(commands, 45, 510, 505, 20, { fill: colors.petrol, stroke: colors.petrol });
  addPdfText(commands, "ITENS / LANCAMENTOS", 59, 517, { size: 9, font: "F2", color: colors.white });
}

function drawPdfItems(commands, rows) {
  const { colors, page } = pdfDocumentStandard;
  let y = page.contentTopY;
  let rowIndex = 0;

  rows.forEach((row) => {
    if (row.type === "spacer") {
      y -= row.height;
      return;
    }

    if (row.type === "section") {
      addPdfRect(commands, 45, y - row.height + 3, 505, row.height - 4, { fill: colors.soft, stroke: colors.border });
      addPdfText(commands, truncatePdfText(row.text, 88), 59, y - 12, { size: 8.5, font: "F2", color: colors.petrol });
      y -= row.height;
      return;
    }

    const fill = rowIndex % 2 === 0 ? colors.white : "#F8FBFC";
    addPdfRect(commands, 45, y - row.height + 2, 505, row.height, { fill, stroke: colors.border });
    if (row.type === "checklistItem") {
      drawPdfChecklistConditionIcon(commands, row.condition, 57, y - 16, 12);
      row.lines.forEach((line, lineIndex) => {
        addPdfText(commands, truncatePdfText(line, 86), 77, y - 11 - lineIndex * 11, { size: 8.2, color: colors.petrol });
      });
    } else {
      row.lines.forEach((line, lineIndex) => {
        addPdfText(commands, truncatePdfText(line, 96), 59, y - 11 - lineIndex * 11, { size: 8.2, color: colors.petrol });
      });
    }
    y -= row.height;
    rowIndex += 1;
  });
}

function drawPdfChecklistConditionIcon(commands, condition, x, y, size) {
  const normalized = normalizeText(condition || checklistUnverifiedCondition);
  const colors = {
    border: "#D7E5EB",
    green: "#22C55E",
    yellow: "#F5B700",
    red: "#EF4444",
    gray: "#94A3B8",
    cyan: "#00B8D9"
  };
  const cx = x + size / 2;
  const cy = y + size / 2;
  addPdfCircle(commands, cx, cy, size / 2, { fill: "#FFFFFF", stroke: colors.border, lineWidth: 0.7 });

  if (normalized === "conforme") {
    addPdfLine(commands, x + 3.2, y + 6.1, x + 5.3, y + 3.8, colors.green, 1.5);
    addPdfLine(commands, x + 5.3, y + 3.8, x + 9.1, y + 8.5, colors.green, 1.5);
    return;
  }

  if (normalized === "arranhado") {
    addPdfPolyline(commands, [
      [x + 2.2, y + 6],
      [x + 3.8, y + 7.8],
      [x + 5.4, y + 5.7],
      [x + 7, y + 7.8],
      [x + 8.6, y + 5.7],
      [x + 10, y + 7.2]
    ], colors.yellow, 1.3);
    return;
  }

  if (normalized === "amassado") {
    addPdfPolyline(commands, [
      [x + 2.2, y + 6],
      [x + 4, y + 4.5],
      [x + 5.8, y + 7.5],
      [x + 7.6, y + 4.5],
      [x + 9.8, y + 6.8]
    ], colors.green, 1.3);
    return;
  }

  if (normalized === "quebrado") {
    addPdfPolyline(commands, [
      [x + 3.4, y + 9],
      [x + 5.3, y + 6.4],
      [x + 4.4, y + 5.2],
      [x + 7.2, y + 2.8],
      [x + 6.7, y + 5.6],
      [x + 9.2, y + 3.6]
    ], colors.red, 1.3);
    return;
  }

  if (normalized === "faltando") {
    addPdfLine(commands, x + 3.2, y + 6, x + 8.8, y + 6, colors.red, 1.5);
    return;
  }

  if (normalized === "nao aplicavel") {
    addPdfLine(commands, x + 3.4, y + 3.4, x + 8.6, y + 8.6, colors.gray, 1.4);
    return;
  }

  addPdfText(commands, "?", cx, y + 2.5, { size: 9, font: "F2", color: colors.cyan, align: "center" });
}

function addPdfRect(commands, x, y, width, height, options = {}) {
  if (options.fill) commands.push(`${pdfRgb(options.fill)} rg ${formatPdfNumber(x)} ${formatPdfNumber(y)} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re f`);
  if (options.stroke) {
    commands.push(`${options.lineWidth || 0.8} w ${pdfRgb(options.stroke)} RG ${formatPdfNumber(x)} ${formatPdfNumber(y)} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re S`);
  }
}

function addPdfLine(commands, x1, y1, x2, y2, color, width = 1) {
  commands.push(`${width} w ${pdfRgb(color)} RG ${formatPdfNumber(x1)} ${formatPdfNumber(y1)} m ${formatPdfNumber(x2)} ${formatPdfNumber(y2)} l S`);
}

function addPdfPolyline(commands, points, color, width = 1) {
  if (!points.length) return;
  const [startX, startY] = points[0];
  const path = points
    .slice(1)
    .map(([x, y]) => `${formatPdfNumber(x)} ${formatPdfNumber(y)} l`)
    .join(" ");
  commands.push(`${width} w ${pdfRgb(color)} RG ${formatPdfNumber(startX)} ${formatPdfNumber(startY)} m ${path} S`);
}

function addPdfCircle(commands, cx, cy, radius, options = {}) {
  const c = radius * 0.5522847498;
  const path = [
    `${formatPdfNumber(cx + radius)} ${formatPdfNumber(cy)} m`,
    `${formatPdfNumber(cx + radius)} ${formatPdfNumber(cy + c)} ${formatPdfNumber(cx + c)} ${formatPdfNumber(cy + radius)} ${formatPdfNumber(cx)} ${formatPdfNumber(cy + radius)} c`,
    `${formatPdfNumber(cx - c)} ${formatPdfNumber(cy + radius)} ${formatPdfNumber(cx - radius)} ${formatPdfNumber(cy + c)} ${formatPdfNumber(cx - radius)} ${formatPdfNumber(cy)} c`,
    `${formatPdfNumber(cx - radius)} ${formatPdfNumber(cy - c)} ${formatPdfNumber(cx - c)} ${formatPdfNumber(cy - radius)} ${formatPdfNumber(cx)} ${formatPdfNumber(cy - radius)} c`,
    `${formatPdfNumber(cx + c)} ${formatPdfNumber(cy - radius)} ${formatPdfNumber(cx + radius)} ${formatPdfNumber(cy - c)} ${formatPdfNumber(cx + radius)} ${formatPdfNumber(cy)} c`
  ].join(" ");
  if (options.fill) commands.push(`${pdfRgb(options.fill)} rg ${path} f`);
  if (options.stroke) commands.push(`${options.lineWidth || 0.8} w ${pdfRgb(options.stroke)} RG ${path} S`);
}

function addPdfImage(commands, name, x, y, width, height) {
  commands.push(`q ${formatPdfNumber(width)} 0 0 ${formatPdfNumber(height)} ${formatPdfNumber(x)} ${formatPdfNumber(y)} cm /${name} Do Q`);
}

function addPdfText(commands, value, x, y, options = {}) {
  const size = options.size || 9;
  const color = options.color || pdfDocumentStandard.colors.petrol;
  const font = options.font || "F1";
  const text = escapePdfText(normalizePdfText(value));
  let adjustedX = x;
  if (options.align === "right") adjustedX = x - estimatePdfTextWidth(text, size);
  if (options.align === "center") adjustedX = x - estimatePdfTextWidth(text, size) / 2;
  commands.push(`BT /${font} ${formatPdfNumber(size)} Tf ${pdfRgb(color)} rg 1 0 0 1 ${formatPdfNumber(adjustedX)} ${formatPdfNumber(y)} Tm (${text}) Tj ET`);
}

function pdfRgb(hex) {
  const value = String(hex).replace("#", "");
  const rgb = [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16) / 255);
  return rgb.map((component) => formatPdfNumber(component, 3)).join(" ");
}

function formatPdfNumber(value, precision = 2) {
  const formatted = Number(value)
    .toFixed(precision)
    .replace(/\.?0+$/, "");
  return formatted || "0";
}

function normalizePdfText(value) {
  if (value && typeof value === "object") {
    return normalizePdfText(value.text || value.part || value.condition || "");
  }
  return removeDiacritics(value ?? "")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncatePdfText(value, maxLength) {
  const text = normalizePdfText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 3))}...`;
}

function wrapPdfLine(value, maxLength) {
  const words = normalizePdfText(value).split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if (word.length > maxLength) {
      if (currentLine) lines.push(currentLine);
      lines.push(...word.match(new RegExp(`.{1,${maxLength}}`, "g")));
      currentLine = "";
      return;
    }

    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > maxLength) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }
    currentLine = nextLine;
  });

  if (currentLine) lines.push(currentLine);
  return lines.length ? lines : [""];
}

function isPdfSectionTitle(line) {
  return line.length <= 42 && !line.includes(":") && !line.includes("|") && !line.startsWith("-") && !line.includes(".");
}

function estimatePdfTextWidth(value, size) {
  return normalizePdfText(value).length * size * 0.48;
}

function createPdfDocumentNumber(fileName) {
  const base = normalizePdfText(fileName)
    .replace(/\.pdf$/i, "")
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase()
    .slice(0, 12);
  return `${base || "DOC"}-${getTodayISO().replace(/-/g, "")}`;
}

function getPdfDocumentCategory(title) {
  const normalizedTitle = normalizeText(title);
  if (normalizedTitle.includes("fluxo") || normalizedTitle.includes("caixa")) return "Financeiro";
  if (normalizedTitle.includes("recibo")) return "Recibo";
  if (normalizedTitle.includes("check")) return "Operacional";
  if (normalizedTitle.includes("relatorio")) return "Relatorio";
  return "Documento";
}

function getPdfDocumentReportTarget(document = {}) {
  const source = normalizeText(`${document.title || ""} ${document.subtitle || ""} ${document.category || ""} ${document.fileName || ""}`);
  if (source.includes("producao")) return "operatorProduction";
  if (source.includes("comissao")) return "operatorCommission";
  if (source.includes("frequencia") || source.includes("attendance")) return "operatorAttendance";
  if (source.includes("fluxo") && source.includes("caixa")) return "cashflow";
  if (source.includes("pagamentos em aberto") || source.includes("pagamento em aberto")) return "openPayments";
  if (source.includes("fatura") || source.includes("faturamento")) return "invoices";
  if (source.includes("recibo")) return "receipts";
  if (source.includes("check")) return "checklists";
  if (source.includes("financeiro") || source.includes("comprovante")) return "financial";
  return "all";
}

function getPdfDocumentSubtitle(title) {
  const category = getPdfDocumentCategory(title);
  if (category === "Financeiro") return "Controle financeiro operacional";
  if (category === "Recibo") return "Comprovante de atendimento";
  if (category === "Operacional") return "Controle operacional do veiculo";
  if (category === "Relatorio") return "Relatorio administrativo";
  return "Fatura, relatorio, recibo ou controle operacional";
}

function getPdfDocumentSummary(title, lines) {
  const normalizedTitle = normalizePdfText(title);
  const firstLine = (Array.isArray(lines) ? lines : [lines])
    .map((line) => normalizePdfText(line))
    .find((line) => line && line !== normalizedTitle);
  return firstLine || "Documento gerado automaticamente pelo LavaPrime conforme o papel timbrado padrao.";
}

function getTodayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function getPayablesScreenContent() {
  const openPayables = payableAccounts.filter((account) => account.status !== "Pago");
  return {
    searchIcon: "payable",
    searchPlaceholder: "Buscar conta",
    filters: ["Todas", "A vencer", "Pagas", "Vencidas"],
    metrics: [
      { label: "Em aberto", value: openPayables.length, icon: "payable" },
      { label: "Valor aberto", value: formatCurrency(openPayables.reduce((total, account) => total + account.value, 0)), icon: "wallet" },
      { label: "Pagas", value: payableAccounts.filter((account) => account.status === "Pago").length, icon: "check" }
    ],
    kicker: "Obrigações",
    tableTitle: "Contas registradas",
    columns: ["Fornecedor", "Categoria", "Vencimento", "Valor", "Status"],
    rows: payableAccounts.map((account) => [
      account.supplier,
      account.category,
      formatDateBR(account.dueDate),
      formatCurrency(account.value),
      account.status
    ]),
    sideKicker: "Controle",
    sideTitle: "Categorias",
    sideItems: [
      { title: "Insumos", value: formatCurrency(420), detail: "Produtos e materiais de lavagem" },
      { title: "Operacional", value: formatCurrency(310), detail: "Contas variáveis da unidade" },
      { title: "Fixo", value: formatCurrency(1800), detail: "Custos recorrentes do negócio" }
    ]
  };
}

function renderInvoicesScreen(container) {
  const openInvoices = billingInvoices.filter((invoice) => invoice.status !== "Paga");
  const overdueInvoices = openInvoices.filter((invoice) => invoice.dueDate < getTodayISO());
  container.innerHTML = `
    <section class="screen-metrics cashflow-metrics" aria-label="Resumo da central de faturas">
      ${[
        { label: "Faturas abertas", value: openInvoices.length, icon: "invoice" },
        { label: "Vencidas", value: overdueInvoices.length, icon: "alert" },
        { label: "Total aberto", value: formatCurrency(getOpenInvoicesTotal()), icon: "wallet" },
        { label: "Pagas", value: billingInvoices.filter((invoice) => invoice.status === "Paga").length, icon: "check" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="screen-toolbar cashflow-toolbar" aria-label="Filtros da central de faturas">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.invoice}</span>
        <input id="invoiceSearchInput" type="search" placeholder="Buscar fatura ou cliente" />
      </label>
      <div class="screen-filters" id="invoiceFilters">
        ${["Todas", "Abertas", "Vencidas", "Pagas"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-invoice-filter="${filter.toLowerCase()}">${filter}</button>`)
          .join("")}
      </div>
    </section>

    <article class="admin-panel screen-table-panel cashflow-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Faturamento</p>
          <h2>Faturas</h2>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table cashflow-table">
          <thead>
            <tr>
              <th>Fatura</th>
              <th>Cliente</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${billingInvoices.map(renderInvoiceRow).join("")}
          </tbody>
        </table>
      </div>
    </article>
  `;

  initIcons();
  bindInvoicesScreenControls(container);
}

function renderInvoiceRow(invoice) {
  const status = invoice.status || "Aberta";
  const isPaid = status === "Paga";
  const isOverdue = !isPaid && invoice.dueDate < getTodayISO();
  const displayAmount = getInvoiceDisplayAmount(invoice);
  const statusLabel = invoice.partialSettlement ? "Paga parcial" : status;
  return `
    <tr class="cashflow-row ${isPaid ? "is-in" : isOverdue ? "is-outstanding" : ""}" data-invoice-row data-invoice-status="${isPaid ? "pagas" : isOverdue ? "vencidas" : "abertas"}">
      <td data-label="Fatura">${escapeHtml(invoice.code)}</td>
      <td data-label="Cliente">${escapeHtml(getBillingClientName(invoice.clientId))}</td>
      <td data-label="Vencimento">${formatDateBR(invoice.dueDate)}</td>
      <td data-label="Valor">${formatCurrency(displayAmount)}</td>
      <td data-label="Status">${escapeHtml(statusLabel)}${invoice.partialSettlement ? ` · saldo remanejado ${formatCurrency(invoice.remainingBalance || 0)}` : ""}${isOverdue ? " · Vencida" : ""}</td>
      <td data-label="Ações">
        <div class="cashflow-row-actions">
          ${!isPaid ? `<button class="ghost-action" type="button" data-send-invoice-message="${invoice.id}">Lembrete</button>
          <button class="primary-button compact-action" type="button" data-settle-invoice="${invoice.id}">Baixar</button>` : `<span class="table-plate-chip">Baixada</span>`}
        </div>
      </td>
    </tr>
  `;
}

function bindInvoicesScreenControls(container) {
  $("#invoiceSearchInput", container)?.addEventListener("input", () => applyInvoiceFilters(container));
  $$("[data-invoice-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-invoice-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyInvoiceFilters(container);
    });
  });
  $$("[data-send-invoice-message]", container).forEach((button) => {
    button.addEventListener("click", () => sendInvoiceReminder(Number(button.dataset.sendInvoiceMessage)));
  });
  $$("[data-settle-invoice]", container).forEach((button) => {
    button.addEventListener("click", () => settleInvoice(Number(button.dataset.settleInvoice)));
  });
}

function applyInvoiceFilters(container) {
  const query = normalizeText($("#invoiceSearchInput", container)?.value || "");
  const activeFilter = $("#invoiceFilters .is-active", container)?.dataset.invoiceFilter || "todas";
  $$("[data-invoice-row]", container).forEach((row) => {
    const textMatch = !query || normalizeText(row.textContent).includes(query);
    const filterMatch = activeFilter === "todas" || row.dataset.invoiceStatus === activeFilter;
    row.hidden = !textMatch || !filterMatch;
  });
}

function sendInvoiceReminder(invoiceId) {
  const invoice = billingInvoices.find((item) => item.id === Number(invoiceId));
  if (!invoice) return;
  sendManualMessage("open-invoice", getMessageContextFromInvoice(invoice));
}

async function settleInvoice(invoiceId) {
  const invoice = billingInvoices.find((item) => item.id === Number(invoiceId));
  if (!invoice || invoice.status === "Paga") return;
  const invoiceTotal = getInvoiceAmount(invoice.id);
  const settlement = await requestSettlementPaymentInfo({
    title: "Baixar fatura",
    description: `${invoice.code} / ${getBillingClientName(invoice.clientId)} / ${formatCurrency(invoiceTotal)}`,
    defaultMethod: invoice.settlementMethod || getPreferredPaymentMethodName("settlement", false),
    totalValue: invoiceTotal,
    allowPartial: true,
    partialDestinations: getInvoicePartialDestinationConfig(invoice)
  });
  if (!settlement) return;
  if (settlement.partial && !validateInvoicePartialDestination(invoice, settlement)) return;

  invoice.status = "Paga";
  invoice.paidAt = `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`;
  invoice.settlementMethod = settlement.method;
  invoice.paymentMethod = settlement.method;
  invoice.settlementBankAccountId = settlement.bankAccountId;
  invoice.settlementBankAccountName = settlement.bankAccountName;
  invoice.partialSettlement = Boolean(settlement.partial);
  invoice.settledAmount = settlement.partial ? settlement.amount : invoiceTotal;
  invoice.remainingBalance = settlement.partial ? settlement.balance : 0;
  invoice.remainingDestination = settlement.partial ? settlement.destination : "";

  cashEntries.unshift({
    id: getNextCashEntryId(),
    date: getTodayISO(),
    time: getCurrentShortTime(),
    type: "Entrada",
    description: settlement.partial ? `Baixa parcial fatura ${invoice.code}` : `Baixa fatura ${invoice.code}`,
    method: settlement.method,
    value: settlement.partial ? settlement.amount : invoiceTotal,
    status: "Confirmado",
    category: "Faturamento",
    costCenter: "Financeiro",
    bankAccountId: settlement.bankAccountId,
    bankAccountName: settlement.bankAccountName,
    invoiceId: invoice.id,
    operator: activeSessionUser || "Administrador"
  });
  saveCashEntries();
  const balanceResult = settlement.partial ? routeInvoiceRemainingBalance(invoice, settlement) : null;
  if (balanceResult?.destinationLabel) invoice.remainingDestinationLabel = balanceResult.destinationLabel;
  triggerAutomatedMessage(
    settlement.partial ? "partial-invoice-payment" : "payment-confirmation",
    getMessageContextFromInvoice(invoice)
  );
  renderAdminScreen("invoices");
  refreshCashflowScreen();
  renderAdminDashboard();
  showToast(getInvoiceSettlementToast(settlement, balanceResult));
}

function getInvoicePartialDestinationConfig(invoice) {
  return {
    existingInvoices: billingInvoices.filter(
      (item) => item.id !== invoice.id && item.clientId === invoice.clientId && item.status !== "Paga"
    ),
    defaultDestination: "new-invoice",
    defaultDueDate: getDefaultInvoiceDueDate()
  };
}

function validateInvoicePartialDestination(invoice, settlement) {
  if (settlement.destination === "existing-invoice") {
    const targetInvoice = getInvoicePartialTargetInvoice(invoice, settlement.targetInvoiceId);
    if (!targetInvoice) {
      showToast("Selecione uma fatura aberta do mesmo cliente para receber o saldo.");
      return false;
    }
  }
  if (settlement.destination === "new-invoice" && !settlement.newInvoiceDueDate) {
    showToast("Informe o vencimento da nova fatura.");
    return false;
  }
  return true;
}

function routeInvoiceRemainingBalance(invoice, settlement) {
  if (settlement.destination === "existing-invoice") {
    const targetInvoice = getInvoicePartialTargetInvoice(invoice, settlement.targetInvoiceId);
    addRemainingBalanceToInvoice(targetInvoice, invoice, settlement.balance);
    return { invoice: targetInvoice, destinationLabel: `fatura ${targetInvoice.code}` };
  }

  if (settlement.destination === "open-payment") {
    const openPayment = createOpenPaymentFromInvoiceBalance(invoice, settlement);
    return { openPayment, destinationLabel: "pagamento em aberto" };
  }

  const newInvoice = createInvoiceFromRemainingBalance(invoice, settlement);
  return { invoice: newInvoice, destinationLabel: `nova fatura ${newInvoice.code}` };
}

function getInvoicePartialTargetInvoice(sourceInvoice, targetInvoiceId) {
  return billingInvoices.find(
    (item) =>
      item.id === Number(targetInvoiceId) &&
      item.id !== sourceInvoice.id &&
      item.clientId === sourceInvoice.clientId &&
      item.status !== "Paga"
  );
}

function createInvoiceFromRemainingBalance(sourceInvoice, settlement) {
  const registryClient = getRegistryClientByBillingClientId(sourceInvoice.clientId);
  const dueDate = settlement.newInvoiceDueDate || getTodayISO();
  const invoice = {
    id: getNextBillingInvoiceId(),
    clientId: Number(sourceInvoice.clientId),
    code: getNextBillingInvoiceCode(dueDate),
    dueDate,
    status: "Aberta",
    approvedBy: registryClient?.approver || sourceInvoice.approvedBy || activeSessionUser || "Administrador",
    cycle: registryClient?.billingCycle || sourceInvoice.cycle || "Mensal",
    originInvoiceId: sourceInvoice.id,
    originInvoiceCode: sourceInvoice.code
  };

  billingInvoices.push(invoice);
  invoiceAmounts[invoice.id] = 0;
  addRemainingBalanceToInvoice(invoice, sourceInvoice, settlement.balance);
  return invoice;
}

function addRemainingBalanceToInvoice(targetInvoice, sourceInvoice, value) {
  invoiceAmounts[targetInvoice.id] = (invoiceAmounts[targetInvoice.id] || 0) + value;
  invoiceLineItems.push({
    invoiceId: targetInvoice.id,
    clientId: targetInvoice.clientId,
    plate: getInvoicePrimaryPlate(sourceInvoice),
    service: `Saldo remanescente ${sourceInvoice.code}`,
    value,
    operator: activeSessionUser || "Administrador",
    originInvoiceId: sourceInvoice.id
  });
}

function createOpenPaymentFromInvoiceBalance(invoice, settlement) {
  const billingClient = billingClients.find((client) => client.id === Number(invoice.clientId));
  const paymentId = getNextOpenPaymentId();
  const cashEntryId = getNextCashEntryId();
  const description = getInvoiceRemainingBalanceDescription(invoice);
  const cashEntry = {
    id: cashEntryId,
    date: getTodayISO(),
    time: getCurrentShortTime(),
    type: "Entrada",
    description,
    method: settlement.method,
    value: settlement.balance,
    status: "Pendente",
    category: "Faturamento",
    costCenter: "Financeiro",
    bankAccountId: settlement.bankAccountId,
    bankAccountName: settlement.bankAccountName,
    invoiceId: invoice.id,
    openPaymentId: paymentId,
    openPayment: true,
    partialPayment: true,
    partialPaidAmount: settlement.amount,
    partialBalance: settlement.balance,
    operator: activeSessionUser || "Administrador"
  };
  const openPayment = {
    id: paymentId,
    clientId: billingClient?.id || invoice.clientId,
    clientName: billingClient?.name || getBillingClientName(invoice.clientId),
    phone: billingClient?.phone || "",
    plate: getInvoicePrimaryPlate(invoice),
    service: "Fatura",
    description,
    value: settlement.balance,
    paymentMethod: settlement.method || getPreferredPaymentMethodName("service"),
    createdAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    dueDate: getDefaultOpenPaymentDueDate(),
    status: "Aberto",
    reminderFrequency: "Diário",
    lastReminderAt: "",
    operator: activeSessionUser || "Administrador",
    cashEntryId,
    invoiceId: invoice.id,
    invoiceCode: invoice.code,
    partialPayment: true,
    paidAmount: settlement.amount
  };

  cashEntries.unshift(cashEntry);
  saveCashEntries();
  openPayments.unshift(openPayment);
  return openPayment;
}

function getNextBillingInvoiceId() {
  return Math.max(0, ...billingInvoices.map((invoice) => invoice.id || 0)) + 1;
}

function getNextBillingInvoiceCode(dueDate) {
  return `FAT-${dueDate.slice(5, 7)}${dueDate.slice(2, 4)}-${String(billingInvoices.length + 1).padStart(3, "0")}`;
}

function getInvoicePrimaryPlate(invoice) {
  return invoiceLineItems.find((item) => item.invoiceId === invoice.id)?.plate || "";
}

function getInvoiceRemainingBalanceDescription(invoice) {
  return `Saldo remanescente da fatura ${invoice.code}`;
}

function getInvoiceSettlementToast(settlement, balanceResult) {
  if (!settlement.partial) return "Fatura baixada.";
  return `Baixa parcial registrada. Saldo ${formatCurrency(settlement.balance)} enviado para ${balanceResult?.destinationLabel || "destino escolhido"}.`;
}

function getInvoicesScreenContent() {
  const openInvoices = billingInvoices.filter((invoice) => invoice.status !== "Paga");
  return {
    searchIcon: "invoice",
    searchPlaceholder: "Buscar fatura",
    filters: ["Abertas", "Vencem no mês", "Pagas", "Em atraso"],
    metrics: [
      { label: "Faturas abertas", value: openInvoices.length, icon: "invoice" },
      { label: "Total aberto", value: formatCurrency(getOpenInvoicesTotal()), icon: "wallet" },
      { label: "Clientes faturados", value: billingClients.length, icon: "users" }
    ],
    kicker: "Faturamento",
    tableTitle: "Faturas",
    columns: ["Fatura", "Cliente", "Vencimento", "Valor", "Status"],
    rows: billingInvoices.map((invoice) => [
      invoice.code,
      getBillingClientName(invoice.clientId),
      formatDateBR(invoice.dueDate),
      formatCurrency(getInvoiceDisplayAmount(invoice)),
      invoice.partialSettlement ? "Paga parcial" : invoice.status || "Aberta"
    ]),
    sideKicker: "Ciclo",
    sideTitle: "Próximos vencimentos",
    sideItems: billingInvoices.slice(0, 3).map((invoice) => ({
      title: invoice.code,
      value: formatDateBR(invoice.dueDate),
      detail: getBillingClientName(invoice.clientId)
    }))
  };
}

function renderScreenMetric(metric) {
  return `
    <article class="screen-metric">
      <span class="metric-icon">${icons[metric.icon]}</span>
      <span>${escapeHtml(metric.label)}</span>
      <strong>${escapeHtml(metric.value)}</strong>
    </article>
  `;
}

function renderAdminTable(columns, rows) {
  return `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSideItem(item) {
  return `
    <article class="screen-side-item">
      <span>${escapeHtml(item.title)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <p>${escapeHtml(item.detail)}</p>
    </article>
  `;
}

function getBillingClientName(clientId) {
  const client = billingClients.find((item) => item.id === Number(clientId));
  return client ? client.name : "Cliente não localizado";
}

function getInvoiceAmount(invoiceId) {
  return invoiceAmounts[invoiceId] || 0;
}

function getInvoiceDisplayAmount(invoice) {
  return invoice?.partialSettlement ? Number(invoice.settledAmount || 0) : getInvoiceAmount(invoice?.id);
}

function getOpenInvoicesTotal() {
  return billingInvoices
    .filter((invoice) => invoice.status !== "Paga")
    .reduce((total, invoice) => total + getInvoiceAmount(invoice.id), 0);
}

function getAverageServicePrice() {
  return serviceCatalog.reduce((total, service) => total + service.price, 0) / Math.max(serviceCatalog.length, 1);
}

function getActiveServiceCatalog() {
  return serviceCatalog.filter((service) => service.status === "Ativo");
}

function findServiceDefinition(serviceName) {
  return serviceCatalog.find((service) => normalizeText(service.name) === normalizeText(serviceName));
}

function getServicesForVehicleTypeAndCategory(vehicleType, vehicleCategory) {
  const activeServices = getActiveServiceCatalog();
  if (isMotoType(vehicleType)) {
    return activeServices.filter((service) => isMotoType(service.vehicleType));
  }

  const scopedServices = activeServices.filter(
    (service) =>
      normalizeText(service.vehicleType) === normalizeText(vehicleType) &&
      normalizeText(service.vehicleCategory) === normalizeText(vehicleCategory)
  );

  return scopedServices.length ? scopedServices : activeServices;
}

function getVehicleServices(vehicle) {
  return (vehicle.services?.length ? vehicle.services : [vehicle.service]).filter(Boolean);
}

function getServicePrice(vehicle) {
  return getVehicleServices(vehicle).reduce((total, service) => {
    const registeredService = findServiceDefinition(service);
    return total + (registeredService?.price || 0);
  }, 0);
}

function getVehicleSoldProducts(vehicle) {
  if (!Array.isArray(vehicle?.productsSold)) vehicle.productsSold = [];
  return vehicle.productsSold;
}

function getVehicleProductsTotal(vehicle) {
  return getVehicleSoldProducts(vehicle).reduce((total, item) => total + Number(item.total || 0), 0);
}

function getVehicleProductsCostTotal(vehicle) {
  return getVehicleSoldProducts(vehicle).reduce((total, item) => total + Number(item.totalCost || 0), 0);
}

function getVehicleSubtotalBeforeAdjustments(vehicle) {
  return getServicePrice(vehicle) + getVehicleProductsTotal(vehicle);
}

function canManageAttendanceProducts(vehicle) {
  return ["aguardando", "lavando", "pronto"].includes(vehicle?.status);
}

function getVehiclePaymentTotal(vehicle) {
  const extras = Number(vehicle.extraCharges || 0);
  const discount = Number(vehicle.discount || 0);
  return Math.max(0, getVehicleSubtotalBeforeAdjustments(vehicle) + extras - discount);
}

function getDialogMoneyValue(selector) {
  const number = getCurrencyInputValue(selector);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function readPaymentAdjustmentsFromDialog(vehicle) {
  const extraEnabled = Boolean($("#paymentExtraEnabled")?.checked);
  const discountEnabled = Boolean($("#paymentDiscountEnabled")?.checked);
  const partialEnabled = Boolean($("#paymentPartialEnabled")?.checked);
  const extraCharges = extraEnabled ? getDialogMoneyValue("#paymentExtraCharges") : 0;
  const discount = discountEnabled ? getDialogMoneyValue("#paymentDiscount") : 0;
  const cashReceived = getDialogMoneyValue("#paymentCashReceived");
  const total = Math.max(0, getVehicleSubtotalBeforeAdjustments(vehicle) + extraCharges - discount);
  const partialAmount = partialEnabled ? Math.min(getDialogMoneyValue("#paymentPartialAmount"), total) : 0;
  return {
    extraEnabled,
    discountEnabled,
    partialEnabled,
    extraCharges,
    extraDescription: extraEnabled ? $("#paymentExtraDescription")?.value.trim() || "" : "",
    discount,
    discountDescription: discountEnabled ? $("#paymentDiscountDescription")?.value.trim() || "" : "",
    cashReceived,
    partialAmount,
    partialBalance: partialEnabled ? Math.max(0, total - partialAmount) : 0,
    total,
    change: Math.max(0, cashReceived - total)
  };
}

function getCurrentShortTime() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getPatioVehicleById(id = activeVehicleId) {
  return patioVehicles.find((item) => item.id === Number(id));
}

function getPaymentState(vehicle) {
  if (vehicle.partialPaymentOpen) return "Parcial";
  if (vehicle.paymentOpen) return "Em aberto";
  if (vehicle.payment === "Faturado") return vehicle.paymentStatus || "Pendente";
  if (vehicle.paymentConfirmed) return "Confirmado";
  if (vehicle.paymentAtEntry) return "Pago na entrada";
  return "A confirmar";
}

function getPaymentPillClass(vehicle) {
  const state = getPaymentState(vehicle);
  if (state === "Confirmado") return "payment-confirmed";
  if (state === "Pago na entrada") return "payment-confirmed";
  if (vehicle.payment === "Faturado") return "payment-billed";
  return "payment-pending";
}

function renderPaymentOptions(selectedMethod, allowBilled = true, context = "service") {
  const preferredMethod = getCanonicalPaymentMethodName(selectedMethod || "") || getPreferredPaymentMethodName(context, allowBilled);
  return renderRegistrySelectOptions(getSelectablePaymentMethodNames(context, { selectedValue: preferredMethod, allowBilled }), preferredMethod);
}

function isMotoType(type) {
  return normalizeText(type) === "moto";
}

function shouldUseVehicleCategory(type) {
  return !isMotoType(type);
}

function getVehicleCategoryValue(type, category) {
  return shouldUseVehicleCategory(type) ? category || "" : "";
}

function formatVehicleScope(type, category) {
  return shouldUseVehicleCategory(type) && category ? `${type} / ${category}` : type || "Veículo";
}

function formatServiceOptionLabel(service) {
  return `${service.name} - ${formatVehicleScope(service.vehicleType, service.vehicleCategory)} - ${formatCurrency(service.price)}`;
}

function formatServiceDetails(service) {
  return `${formatVehicleScope(service.vehicleType, service.vehicleCategory)} - ${service.duration} - ${formatCurrency(service.price)}`;
}

function getServicesForVehicleContext(vehicle) {
  const registryVehicle = findVehicleByPlate(vehicle.plate);
  const vehicleType = vehicle.type || registryVehicle?.type || "";
  const vehicleCategory = vehicle.category || registryVehicle?.category || "";
  return getServicesForVehicleTypeAndCategory(vehicleType, vehicleCategory);
}

function getChecklistTemplateForVehicleType(type) {
  return isMotoType(type) ? vehicleChecklistTemplates.moto : vehicleChecklistTemplates.default;
}

function renderChecklistPanel(scope, vehicleType, checklist = null) {
  const enabled = Boolean(checklist?.enabled);
  return `
    <section class="vehicle-checklist-panel" data-checklist-scope="${escapeHtml(scope)}">
      <label class="switch-field checklist-switch" for="${scope}ChecklistToggle">
        <input id="${scope}ChecklistToggle" type="checkbox" data-checklist-toggle="${escapeHtml(scope)}" ${enabled ? "checked" : ""} />
        <span class="switch-control"></span>
        <span>Check-list</span>
      </label>
      <div class="checklist-content" data-checklist-content="${escapeHtml(scope)}" ${enabled ? "" : "hidden"}>
        ${renderChecklistItems(scope, vehicleType, checklist)}
      </div>
    </section>
  `;
}

function renderChecklistItems(scope, vehicleType, checklist = null) {
  const savedItems = checklist?.items || [];
  return getChecklistTemplateForVehicleType(vehicleType)
    .map(
      (group) => {
        const areaVerified = isChecklistAreaVerified(group, savedItems);
        return `
        <article class="checklist-area" data-checklist-area="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}">
          <div class="checklist-area-header">
            <strong class="checklist-area-title">
              <span>${escapeHtml(group.area)}</span>
              <img class="checklist-area-verified-icon" src="${escapeHtml(getChecklistConditionIcon("Conforme"))}" alt="Verificado" ${areaVerified ? "" : "hidden"} />
            </strong>
            <button class="checklist-area-toggle is-collapsed" type="button" data-checklist-area-toggle="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}" aria-label="Mostrar ou ocultar ${escapeHtml(group.area)}" aria-expanded="false">
              ${icons.chevronDown}
              <span class="visually-hidden">${escapeHtml(group.area)}</span>
            </button>
            <button class="ghost-action checklist-area-verify ${areaVerified ? "is-verified" : ""}" type="button" data-checklist-area-verify="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}" aria-pressed="${areaVerified ? "true" : "false"}">
              <span data-icon="check"></span>
              <span>Verificado</span>
            </button>
          </div>
          <div class="checklist-grid" data-checklist-area-body="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}" hidden>
            ${group.parts
              .map((part) => {
                const saved = savedItems.find((item) => item.area === group.area && item.part === part);
                const selectedCondition = saved?.condition || checklistUnverifiedCondition;
                return `
                  <label class="login-field checklist-item" for="${escapeHtml(getChecklistInputId(scope, group.area, part))}">
                    <span>${escapeHtml(part)}</span>
                    ${renderChecklistConditionDropdown(scope, group.area, part, selectedCondition)}
                  </label>
                `;
              })
              .join("")}
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function renderChecklistConditionDropdown(scope, area, part, selectedCondition) {
  const inputId = getChecklistInputId(scope, area, part);
  return `
    <span class="checklist-condition-dropdown" data-checklist-condition-dropdown>
      <input
        id="${escapeHtml(inputId)}"
        type="hidden"
        value="${escapeHtml(selectedCondition)}"
        data-checklist-condition="${escapeHtml(scope)}"
        data-area="${escapeHtml(area)}"
        data-part="${escapeHtml(part)}"
      />
      <button class="checklist-condition-button" type="button" data-checklist-condition-button aria-haspopup="listbox" aria-expanded="false">
        ${renderChecklistConditionLabel(selectedCondition)}
      </button>
      <span class="checklist-condition-menu" role="listbox" data-checklist-condition-menu hidden>
        ${getChecklistConditionOptions()
          .map(
            (condition) => `
              <button class="checklist-condition-option" type="button" role="option" data-checklist-condition-option="${escapeHtml(condition)}" aria-selected="${condition === selectedCondition ? "true" : "false"}">
                ${renderChecklistConditionLabel(condition)}
              </button>
            `
          )
          .join("")}
      </span>
    </span>
  `;
}

function renderChecklistConditionLabel(condition) {
  return `
    <span class="checklist-condition-label">
      <img class="checklist-condition-icon" src="${escapeHtml(getChecklistConditionIcon(condition))}" alt="" aria-hidden="true" />
      <span>${escapeHtml(condition)}</span>
    </span>
  `;
}

function isChecklistAreaVerified(group, savedItems) {
  return group.parts.every((part) => {
    const saved = savedItems.find((item) => item.area === group.area && item.part === part);
    return saved?.condition === "Conforme";
  });
}

function getChecklistConditionOptions() {
  return [checklistUnverifiedCondition, ...checklistConditions.filter((condition) => condition !== checklistUnverifiedCondition)];
}

function getChecklistConditionIcon(condition) {
  return checklistConditionIconMap[condition] || checklistConditionIconMap[checklistUnverifiedCondition];
}

function getChecklistInputId(scope, area, part) {
  return `${scope}-${normalizeText(area)}-${normalizeText(part)}`.replace(/[^a-z0-9]+/g, "-");
}

function bindChecklistPanel(container, scope, vehicleType) {
  const toggle = $(`[data-checklist-toggle="${cssEscape(scope)}"]`, container);
  if (!toggle) return;
  toggle.addEventListener("change", () => updateChecklistPanel(container, scope, vehicleType));
  updateChecklistPanel(container, scope, vehicleType);
}

function updateChecklistPanel(container, scope, vehicleType) {
  const toggle = $(`[data-checklist-toggle="${cssEscape(scope)}"]`, container);
  const content = $(`[data-checklist-content="${cssEscape(scope)}"]`, container);
  if (!toggle || !content) return;
  content.hidden = !toggle.checked;
  content.innerHTML = toggle.checked ? renderChecklistItems(scope, vehicleType, collectChecklistFromPanel(container, scope)) : "";
  if (toggle.checked) bindChecklistAreaControls(content, scope);
  initIcons();
}

function bindChecklistAreaControls(container, scope) {
  container.addEventListener("click", (event) => {
    if (!event.target.closest("[data-checklist-condition-dropdown]")) closeChecklistConditionMenus(container);
  });
  $$(`[data-checklist-area-toggle="${cssEscape(scope)}"]`, container).forEach((button) => {
    button.addEventListener("click", () => toggleChecklistArea(container, scope, button.dataset.area));
  });
  $$(`[data-checklist-area-verify="${cssEscape(scope)}"]`, container).forEach((button) => {
    button.addEventListener("click", () => markChecklistAreaVerified(container, scope, button.dataset.area));
  });
  $$("[data-checklist-condition-button]", container).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleChecklistConditionMenu(button);
    });
  });
  $$("[data-checklist-condition-option]", container).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectChecklistCondition(button, container, scope);
    });
  });
}

function toggleChecklistArea(container, scope, area) {
  const body = $(`[data-checklist-area-body="${cssEscape(scope)}"][data-area="${cssEscape(area)}"]`, container);
  const toggle = $(`[data-checklist-area-toggle="${cssEscape(scope)}"][data-area="${cssEscape(area)}"]`, container);
  if (!body || !toggle) return;
  const shouldCollapse = !body.hidden;
  body.hidden = shouldCollapse;
  toggle.setAttribute("aria-expanded", String(!shouldCollapse));
  toggle.classList.toggle("is-collapsed", shouldCollapse);
}

function markChecklistAreaVerified(container, scope, area) {
  $$(`[data-checklist-condition="${cssEscape(scope)}"][data-area="${cssEscape(area)}"]`, container).forEach((input) => {
    setChecklistCondition(input, "Conforme");
  });
  updateChecklistAreaVerifiedState(container, scope, area);
}

function toggleChecklistConditionMenu(button) {
  const dropdown = button.closest("[data-checklist-condition-dropdown]");
  const menu = dropdown?.querySelector("[data-checklist-condition-menu]");
  if (!dropdown || !menu) return;
  const shouldOpen = menu.hidden;
  closeChecklistConditionMenus(dropdown.closest(".checklist-content"));
  menu.hidden = !shouldOpen;
  button.setAttribute("aria-expanded", String(shouldOpen));
  dropdown.classList.toggle("is-open", shouldOpen);
}

function closeChecklistConditionMenus(container = document) {
  $$("[data-checklist-condition-dropdown]", container).forEach((dropdown) => {
    dropdown.classList.remove("is-open");
    const button = $("[data-checklist-condition-button]", dropdown);
    const menu = $("[data-checklist-condition-menu]", dropdown);
    if (button) button.setAttribute("aria-expanded", "false");
    if (menu) menu.hidden = true;
  });
}

function selectChecklistCondition(optionButton, container, scope) {
  const dropdown = optionButton.closest("[data-checklist-condition-dropdown]");
  const input = dropdown?.querySelector(`[data-checklist-condition="${cssEscape(scope)}"]`);
  if (!input) return;
  setChecklistCondition(input, optionButton.dataset.checklistConditionOption || checklistUnverifiedCondition);
  closeChecklistConditionMenus(dropdown);
  updateChecklistAreaVerifiedState(container, scope, input.dataset.area);
}

function setChecklistCondition(input, condition) {
  input.value = condition || checklistUnverifiedCondition;
  const dropdown = input.closest("[data-checklist-condition-dropdown]");
  const button = dropdown?.querySelector("[data-checklist-condition-button]");
  if (button) button.innerHTML = renderChecklistConditionLabel(input.value);
  $$("[data-checklist-condition-option]", dropdown).forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.checklistConditionOption === input.value));
  });
}

function updateChecklistAreaVerifiedState(container, scope, area) {
  const inputs = $$(`[data-checklist-condition="${cssEscape(scope)}"][data-area="${cssEscape(area)}"]`, container);
  const verified = inputs.length > 0 && inputs.every((input) => input.value === "Conforme");
  const areaCard = $(`[data-checklist-area="${cssEscape(scope)}"][data-area="${cssEscape(area)}"]`, container);
  const button = $(`[data-checklist-area-verify="${cssEscape(scope)}"][data-area="${cssEscape(area)}"]`, container);
  const icon = areaCard?.querySelector(".checklist-area-verified-icon");
  if (button) {
    button.classList.toggle("is-verified", verified);
    button.setAttribute("aria-pressed", String(verified));
  }
  if (icon) icon.hidden = !verified;
}

function collectChecklistFromPanel(container, scope) {
  const toggle = $(`[data-checklist-toggle="${cssEscape(scope)}"]`, container);
  if (!toggle?.checked) return { enabled: false, vehicleType: "", completedAt: "", items: [] };

  const items = $$(`[data-checklist-condition="${cssEscape(scope)}"]`, container).map((select) => ({
    area: select.dataset.area,
    part: select.dataset.part,
    condition: select.value || checklistUnverifiedCondition
  }));

  return {
    enabled: true,
    vehicleType: "",
    completedAt: new Date().toISOString(),
    items
  };
}

function validateChecklistPanel(container, scope, vehicleType) {
  const checklist = collectChecklistFromPanel(container, scope);
  if (!checklist.enabled) return null;

  checklist.vehicleType = vehicleType || "";
  return checklist;
}

function attachChecklistFromPanel(vehicle, container, scope) {
  const checklist = validateChecklistPanel(container, scope, vehicle.type);
  if (checklist === false) return false;
  if (checklist) {
    checklist.id = vehicle.checklist?.id || `CHK-${vehicle.id || getNextPatioVehicleId()}-${Date.now()}`;
    vehicle.checklist = checklist;
  }
  else delete vehicle.checklist;
  return true;
}

function renderVehicleCards() {
  [$("#vehicleGrid"), $("#adminVehicleGrid")].filter(Boolean).forEach((container) => {
    container.innerHTML = statusOrder.map((status) => renderVehicleGroup(status)).join("");
  });
}

function renderVehicleGroup(status) {
  const meta = statusMeta[status];
  const groupLabel = getStatusGroupLabel(status);
  const vehicles = getVehiclesForStatusGroup(status);
  const sortedVehicles = status === "aguardando" ? sortWaitingVehiclesByArrival(vehicles) : vehicles;
  const cards = vehicles.length
    ? sortedVehicles.map((vehicle, index) => renderVehicleCard(vehicle, status === "aguardando" ? index + 1 : 0)).join("")
    : '<p class="empty-group">Nenhum veículo neste status.</p>';

  return `
    <section class="vehicle-status-group status-group-${status}" aria-label="${groupLabel}">
      <div class="vehicle-group-header">
        <span class="status-dot-icon status-${status}">${icons[meta.icon]}</span>
        <div>
          <h3>${groupLabel}</h3>
          <p>${vehicles.length} ${vehicles.length === 1 ? "veículo" : "veículos"}${status === "aguardando" && vehicles.length ? " · fila por ordem de chegada" : ""}</p>
        </div>
      </div>
      <div class="vehicle-group-grid">
        ${cards}
      </div>
    </section>
  `;
}

function getStatusGroupLabel(status) {
  return status === "finalizado" ? "Finalizados" : statusMeta[status]?.label || status;
}

function getVehiclesForStatusGroup(status) {
  if (status === "finalizado") return patioVehicles.filter((vehicle) => isFinalizedStatus(vehicle.status));
  return patioVehicles.filter((vehicle) => vehicle.status === status);
}

function sortWaitingVehiclesByArrival(vehicles) {
  return [...vehicles].sort((a, b) => getArrivalMinutes(a.entry) - getArrivalMinutes(b.entry));
}

function getArrivalMinutes(value) {
  const [hour = "0", minute = "0"] = String(value || "00:00")
    .replace(/[^\d:]/g, "")
    .split(":");
  return Number(hour) * 60 + Number(minute);
}

function renderVehicleCard(vehicle, queuePosition = 0) {
  const status = statusMeta[vehicle.status];
  const vehicleName = formatVehicleDisplayName(vehicle);
  const specialCareSummary = getVehicleSpecialCareSummary(vehicle);
  const cardLabel =
    vehicle.status === "cancelado"
      ? `Serviço cancelado de ${vehicle.plate}`
      : vehicle.status === "finalizado"
      ? `Emitir recibo de ${vehicle.plate}`
      : vehicle.status === "pronto"
        ? `Confirmar pagamento de ${vehicle.plate}`
        : `Alterar status de ${vehicle.plate}`;

  return `
    <button class="vehicle-card ${queuePosition ? "is-queued" : ""} ${queuePosition === 1 ? "is-next" : ""}" type="button" data-vehicle-id="${vehicle.id}" aria-label="${escapeHtml(cardLabel)}">
      ${queuePosition ? `<span class="queue-badge">${queuePosition === 1 ? "Próximo" : `Fila ${queuePosition}`}</span>` : ""}
      <span class="vehicle-visual">
        <img class="vehicle-car-icon" src="./assets/brand/icone_carro.png" alt="" />
        <span class="status-corner status-${vehicle.status}" aria-hidden="true">${icons[status.icon]}</span>
      </span>
      <span class="vehicle-info">
        <h3>${escapeHtml(vehicle.plate)} - ${escapeHtml(vehicleName)} ${escapeHtml(vehicle.color || "")}</h3>
        <p>${vehicle.owner}</p>
        <p>${vehicle.service}</p>
        ${getVehicleSoldProducts(vehicle).length ? `<p>Produtos: ${escapeHtml(getVehicleSoldProducts(vehicle).map((item) => item.productName).join(", "))}</p>` : ""}
        <span class="vehicle-meta">
          <span class="status-pill">${status.label}</span>
          <span class="time-pill">${getVehicleTimeLabel(vehicle)}</span>
          <span class="payment-pill ${getPaymentPillClass(vehicle)}">${escapeHtml(vehicle.payment)} / ${escapeHtml(getPaymentState(vehicle))}</span>
          ${
            specialCareSummary.count
              ? `<span class="vehicle-care-badge ${getVehicleSpecialCareLevelClass(specialCareSummary.highestLevel)}">Cuidado especial</span>`
              : ""
          }
        </span>
      </span>
    </button>
  `;
}

function getVehicleTimeLabel(vehicle) {
  if (vehicle.status === "agendado" && vehicle.scheduledDate && vehicle.scheduledTime) {
    return `Agendado ${formatScheduleDateTime(vehicle.scheduledDate, vehicle.scheduledTime)}`;
  }
  return `Entrada ${vehicle.entry}`;
}

function openStatusDialog(vehicleId) {
  const vehicle = patioVehicles.find((item) => item.id === vehicleId);
  if (!vehicle) return;

  if (vehicle.status === "cancelado") {
    showMessageBox({
      title: "Serviço cancelado",
      message:
        "Não é possível realizar alterações em serviço cancelado. Se necessário, faça uma nova entrada no pátio.",
      eyebrow: "Pátio",
      confirmLabel: "Entendi"
    });
    return;
  }

  activeVehicleId = vehicleId;
  resetStatusBillingSelection();
  renderStatusDialogContent(vehicle);

  const dialog = $("#statusDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function renderStatusDialogContent(vehicle) {
  $("#statusVehicleTitle").textContent = `${vehicle.plate} - ${formatVehicleDisplayName(vehicle)} ${vehicle.color || ""}`.trim();
  $("#statusDialogEyebrow").textContent =
    vehicle.status === "pronto" ? "Confirmar pagamento" : isFinalizedStatus(vehicle.status) ? "Recibo" : "Ações do veículo";
  $("#statusOptions").innerHTML = isFinalizedStatus(vehicle.status)
    ? renderReceiptPanel(vehicle)
    : vehicle.status === "pronto"
      ? renderPaymentConfirmationPanel(vehicle)
      : renderStatusActionPanel(vehicle);
  initIcons();
  bindCurrencyInputs($("#statusOptions"));
}

function resetStatusBillingSelection() {
  statusBillingMode = "";
  selectedStatusBillingClientId = "";
  selectedStatusBillingInvoiceId = "";
}

function renderVehicleActionSummary(vehicle) {
  return `
    <article class="status-vehicle-summary">
      <span class="status-dot-icon status-${vehicle.status}">${icons[statusMeta[vehicle.status].icon]}</span>
      <div>
        <strong>${escapeHtml(vehicle.service)}</strong>
        <p>${escapeHtml(vehicle.payment)} / ${escapeHtml(getPaymentState(vehicle))} / ${formatCurrency(getVehiclePaymentTotal(vehicle))}</p>
      </div>
    </article>
  `;
}

function renderVehicleSpecialCareDetailCard(vehicle) {
  const activeRecords = getVehicleActiveSpecialCareRecords(vehicle);
  const conflictResult = getVehicleCurrentCareConflictResult(vehicle);
  if (!activeRecords.length && !conflictResult.unknownTechnicalClassification.length) return "";
  const acknowledged = hasVehicleCareWarningAcknowledged(vehicle, conflictResult);
  return `
    <article class="status-detail-card vehicle-special-care-detail-card">
      <span>Cuidados especiais do veículo</span>
      ${
        activeRecords.length
          ? activeRecords
              .map(
                (record) => `
                  <div class="vehicle-special-care-detail-item">
                    <strong>${escapeHtml(record.type)}</strong>
                    <p>${escapeHtml(record.attentionLevel)}${record.source ? ` · ${escapeHtml(record.source)}` : ""}</p>
                    ${
                      record.restrictionTags?.length
                        ? `<div class="vehicle-special-care-inline-tags">${record.restrictionTags
                            .map((tag) => `<span>${escapeHtml(getVehicleSpecialCareRestrictionLabel(tag))}</span>`)
                            .join("")}</div>`
                        : ""
                    }
                    ${record.description ? `<small>${escapeHtml(record.description)}</small>` : ""}
                  </div>
                `
              )
              .join("")
          : '<p>Nenhum cuidado especial ativo.</p>'
      }
      ${
        conflictResult.hasConflicts || conflictResult.unknownTechnicalClassification.length
          ? `<p class="vehicle-special-care-detail-alert ${acknowledged ? "is-acknowledged" : ""}">${
              acknowledged
                ? "Alerta técnico já confirmado neste atendimento."
                : "Serviço selecionado exige conferência antes da execução."
            }</p>`
          : ""
      }
    </article>
  `;
}

function appendAttendanceHistory(vehicle, description, type = "note") {
  if (!Array.isArray(vehicle.attendanceHistory)) vehicle.attendanceHistory = [];
  vehicle.attendanceHistory.unshift({
    id: `${vehicle.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    description,
    createdAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    author: activeSessionUser || "Operador"
  });
}

function renderVehicleDetailSections(vehicle, options = {}) {
  const products = getVehicleSoldProducts(vehicle);
  const allowProductRemoval = Boolean(options.allowProductRemoval) && !isFinalizedStatus(vehicle.status);
  const financeSnapshot = getPaymentMethodFee(vehicle.payment, getVehiclePaymentTotal(vehicle), getTodayISO());
  const serviceTotal = getServicePrice(vehicle);
  const productsTotal = getVehicleProductsTotal(vehicle);
  const extras = Number(vehicle.extraCharges || 0);
  const discount = Number(vehicle.discount || 0);
  return `
    <section class="status-detail-grid">
      <article class="status-detail-card">
        <span>Dados do atendimento</span>
        <strong>${escapeHtml(vehicle.owner || "Cliente avulso")}</strong>
        <p>${escapeHtml(formatVehicleDisplayName(vehicle))} / ${escapeHtml(vehicle.plate)} / ${escapeHtml(statusMeta[vehicle.status]?.label || vehicle.status)}</p>
        <p>Entrada: ${escapeHtml(getVehicleTimeLabel(vehicle))}</p>
        <p>Pagamento: ${escapeHtml(vehicle.payment)} / ${escapeHtml(getPaymentState(vehicle))}</p>
      </article>

      ${renderVehicleSpecialCareDetailCard(vehicle)}

      <article class="status-detail-card">
        <span>Serviços contratados</span>
        ${getVehicleServices(vehicle)
          .map((serviceName) => {
            const service = findServiceDefinition(serviceName, vehicle.type, vehicle.category);
            return `
              <div class="status-line-item">
                <div>
                  <strong>${escapeHtml(serviceName)}</strong>
                  <p>${escapeHtml(service?.duration || "Serviço contratado")}</p>
                </div>
                <span>${formatCurrency(Number(service?.price || 0))}</span>
              </div>
            `;
          })
          .join("")}
      </article>

      <article class="status-detail-card">
        <span>Produtos vendidos no atendimento</span>
        ${
          products.length
            ? products
                .map(
                  (item) => `
                    <div class="status-line-item">
                      <div>
                        <strong>${escapeHtml(item.productName)}</strong>
                        <p>${item.quantity} x ${formatCurrency(item.unitPrice)}${item.discount ? ` / desconto ${formatCurrency(item.discount)}` : ""}</p>
                      </div>
                      <div class="status-line-item-actions">
                        <span>${formatCurrency(item.total)}</span>
                        ${
                          allowProductRemoval
                            ? `<button class="ghost-action compact" type="button" data-remove-attendance-product="${escapeHtml(item.id)}">Remover</button>`
                            : ""
                        }
                      </div>
                    </div>
                  `
                )
                .join("")
            : '<p class="empty-plates">Nenhum produto vendido neste atendimento.</p>'
        }
      </article>

      <article class="status-detail-card">
        <span>Resumo financeiro</span>
        <div class="status-line-item">
          <strong>Total de serviços</strong>
          <span>${formatCurrency(serviceTotal)}</span>
        </div>
        <div class="status-line-item">
          <strong>Total de produtos</strong>
          <span>${formatCurrency(productsTotal)}</span>
        </div>
        <div class="status-line-item">
          <strong>Avulsos</strong>
          <span>${formatCurrency(extras)}</span>
        </div>
        <div class="status-line-item">
          <strong>Descontos</strong>
          <span>${formatCurrency(discount)}</span>
        </div>
        <div class="status-line-item">
          <strong>Taxas previstas</strong>
          <span>${formatCurrency(financeSnapshot.feeAmount)}</span>
        </div>
        <div class="status-line-item is-total">
          <strong>Total geral</strong>
          <span>${formatCurrency(getVehiclePaymentTotal(vehicle))}</span>
        </div>
        <p>Valor líquido estimado: ${formatCurrency(financeSnapshot.netAmount)}${financeSnapshot.immediateSettlement ? " / na hora" : ` / previsto para ${formatDateBR(financeSnapshot.expectedDate)}`}</p>
      </article>
    </section>
  `;
}

function getFilteredAttendanceProducts(query = "") {
  const normalizedQuery = normalizeText(query);
  return productCatalog.filter((product) => {
    if (product.active === false) return false;
    if (!normalizedQuery) return true;
    const haystack = normalizeText(`${product.name} ${product.sku} ${product.barcode || ""}`);
    return haystack.includes(normalizedQuery);
  });
}

function renderAttendanceProductSelectOptions(query = "", selectedProductId = "") {
  const products = getFilteredAttendanceProducts(query);
  const preferredId = String(selectedProductId || products[0]?.id || "");
  return products.length
    ? products
        .map(
          (product) =>
            `<option value="${product.id}" ${String(product.id) === preferredId ? "selected" : ""}>${escapeHtml(product.name)} / ${escapeHtml(product.sku)} / ${formatCurrency(product.price)}</option>`
        )
        .join("")
    : '<option value="">Nenhum produto encontrado</option>';
}

function getSelectedAttendanceProduct(scope = $("#statusOptions")) {
  const productId = Number($("#attendanceProductSelect", scope)?.value || 0);
  return getProductById(productId);
}

function renderAttendanceProductPanel(vehicle) {
  const searchValue = $("#attendanceProductSearch")?.value || "";
  const selectedProductId = $("#attendanceProductSelect")?.value || "";
  const selectedProduct = getProductById(Number(selectedProductId || 0)) || getFilteredAttendanceProducts(searchValue)[0] || null;
  const quantity = Number($("#attendanceProductQuantity")?.value || 1) || 1;
  const discount = getDialogMoneyValue("#attendanceProductDiscount");
  const total = Math.max(0, quantity * Number(selectedProduct?.price || 0) - discount);
  $("#statusDialogEyebrow").textContent = "Adicionar produto";
  $("#statusOptions").innerHTML = `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      ${renderVehicleDetailSections(vehicle)}
      <section class="status-service-editor status-product-editor">
        <label class="login-field" for="attendanceProductSearch">
          <span>Buscar produto por nome ou código</span>
          <input id="attendanceProductSearch" type="search" value="${escapeHtml(searchValue)}" placeholder="Ex.: lava seco ou PRD-001" />
        </label>
        <label class="login-field" for="attendanceProductSelect">
          <span>Produto</span>
          <select id="attendanceProductSelect">
            ${renderAttendanceProductSelectOptions(searchValue, selectedProduct?.id)}
          </select>
        </label>
        <label class="login-field" for="attendanceProductQuantity">
          <span>Quantidade</span>
          <input id="attendanceProductQuantity" type="number" min="1" step="1" value="${escapeHtml(String(quantity))}" />
        </label>
        <label class="login-field" for="attendanceProductDiscount">
          <span>Desconto</span>
          <input id="attendanceProductDiscount" type="text" inputmode="decimal" data-money-input="true" value="${escapeHtml(formatCurrencyFieldValue(discount))}" />
        </label>
        <label class="login-field inventory-notes-field" for="attendanceProductNotes">
          <span>Observação</span>
          <textarea id="attendanceProductNotes" rows="2" placeholder="Ex.: cliente solicitou aromatizante premium"></textarea>
        </label>
        <article class="status-detail-card">
          <span>Resumo do item</span>
          <div class="status-line-item">
            <strong>Estoque atual</strong>
            <span id="attendanceProductStock">${selectedProduct ? formatInventoryQuantity(selectedProduct.stock, selectedProduct.unit) : "-"}</span>
          </div>
          <div class="status-line-item">
            <strong>Preço unitário</strong>
            <span id="attendanceProductPrice">${selectedProduct ? formatCurrency(selectedProduct.price) : formatCurrency(0)}</span>
          </div>
          <div class="status-line-item is-total">
            <strong>Total do item</strong>
            <span id="attendanceProductTotal">${formatCurrency(total)}</span>
          </div>
        </article>
      </section>
      <div class="dialog-actions status-dialog-actions">
        <button class="exit-button" type="button" data-status-action="back-actions">Voltar</button>
        <button class="primary-button" type="button" data-status-action="save-attendance-product">
          <span data-icon="check"></span>
          <span>Adicionar produto ao atendimento</span>
        </button>
      </div>
    </div>
  `;
  initIcons();
  bindCurrencyInputs($("#statusOptions"));
}

function updateAttendanceProductPanelPreview() {
  const panel = $("#statusOptions");
  if (!panel) return;
  const query = $("#attendanceProductSearch", panel)?.value || "";
  const select = $("#attendanceProductSelect", panel);
  if (select) {
    const currentValue = select.value;
    select.innerHTML = renderAttendanceProductSelectOptions(query, currentValue);
    if (!select.value && select.options.length) select.value = select.options[0].value;
  }
  const product = getSelectedAttendanceProduct(panel);
  const quantity = Math.max(1, Number($("#attendanceProductQuantity", panel)?.value || 1));
  const discount = getDialogMoneyValue("#attendanceProductDiscount");
  $("#attendanceProductStock", panel).textContent = product ? formatInventoryQuantity(product.stock, product.unit) : "-";
  $("#attendanceProductPrice", panel).textContent = product ? formatCurrency(product.price) : formatCurrency(0);
  $("#attendanceProductTotal", panel).textContent = formatCurrency(Math.max(0, quantity * Number(product?.price || 0) - discount));
}

function saveAttendanceProductToVehicle() {
  const vehicle = getPatioVehicleById();
  if (!vehicle || !canManageAttendanceProducts(vehicle)) {
    showToast("Este atendimento não permite adicionar produto neste status.");
    return;
  }
  const panel = $("#statusOptions");
  const product = getSelectedAttendanceProduct(panel);
  const quantity = Math.max(1, Number($("#attendanceProductQuantity", panel)?.value || 1));
  const discount = getDialogMoneyValue("#attendanceProductDiscount");
  const notes = $("#attendanceProductNotes", panel)?.value.trim() || "";
  if (!product) {
    showToast("Selecione um produto válido.");
    return;
  }
  if (Number(product.price || 0) <= 0) {
    showToast("Este produto ainda não possui preço de venda.");
    return;
  }
  if (Number(product.stock || 0) < quantity && !businessFinanceSettings.inventory.allowProductSaleWithoutStock) {
    showToast(`Estoque insuficiente para ${product.name}.`);
    return;
  }

  const previousStock = Number(product.stock || 0);
  const nextStock = previousStock - quantity;
  product.stock = nextStock;
  product.updatedAt = getTodayISO();
  const movement = registerInventoryMovement({
    kind: "product",
    itemId: product.id,
    itemName: product.name,
    type: "saida_venda_atendimento",
    quantity: -quantity,
    previousStock,
    currentStock: nextStock,
    unit: product.unit,
    reason: `Venda vinculada ao atendimento ${vehicle.plate}`,
    sourceCode: `PAT-${vehicle.id}`
  });
  getVehicleSoldProducts(vehicle).push({
    id: `prd-${vehicle.id}-${Date.now()}`,
    productId: product.id,
    productName: product.name,
    quantity,
    unitPrice: Number(product.price || 0),
    discount,
    total: Math.max(0, quantity * Number(product.price || 0) - discount),
    unitCost: Number(product.cost || 0),
    totalCost: quantity * Number(product.cost || 0),
    stockMovementId: movement?.id || null,
    notes,
    addedAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    addedBy: activeSessionUser || "Operador"
  });
  appendAttendanceHistory(vehicle, `${product.name} adicionado ao atendimento (${quantity} un).`, "product");
  syncBillingFromVehicleProducts(vehicle);
  saveProductCatalog();
  renderProductsScreen($("#adminProductsContent"));
  renderInventoryScreen($("#adminInventoryContent"));
  renderAdminDashboard();
  renderPatio();
  renderStatusDialogContent(vehicle);
  showToast(`Produto ${product.name} vinculado ao atendimento.`);
}

async function removeAttendanceProductFromVehicle(productLineId) {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;
  const index = getVehicleSoldProducts(vehicle).findIndex((item) => String(item.id) === String(productLineId));
  if (index < 0) return;
  const item = vehicle.productsSold[index];
  const confirmed = await showMessageBox({
    title: "Remover produto do atendimento?",
    message: "O estoque será estornado e o total do atendimento será recalculado.",
    confirmLabel: "Remover",
    cancelLabel: "Cancelar",
    confirmOnly: false
  });
  if (!confirmed) return;
  const product = getProductById(item.productId);
  if (product) {
    const previousStock = Number(product.stock || 0);
    product.stock = previousStock + Number(item.quantity || 0);
    product.updatedAt = getTodayISO();
    registerInventoryMovement({
      kind: "product",
      itemId: product.id,
      itemName: product.name,
      type: "estorno_venda_atendimento",
      quantity: Number(item.quantity || 0),
      previousStock,
      currentStock: product.stock,
      unit: product.unit,
      reason: `Remoção de produto do atendimento ${vehicle.plate}`,
      sourceCode: `PAT-${vehicle.id}`
    });
    saveProductCatalog();
  }
  vehicle.productsSold.splice(index, 1);
  appendAttendanceHistory(vehicle, `${item.productName} removido do atendimento.`, "product-reversal");
  syncBillingFromVehicleProducts(vehicle);
  renderProductsScreen($("#adminProductsContent"));
  renderInventoryScreen($("#adminInventoryContent"));
  renderAdminDashboard();
  renderPatio();
  renderStatusDialogContent(vehicle);
  showToast("Produto removido do atendimento.");
}

function revertAttendanceProducts(vehicle, reason = "") {
  const products = [...getVehicleSoldProducts(vehicle)];
  if (!products.length) return;
  products.forEach((item) => {
    const product = getProductById(item.productId);
    if (!product) return;
    const previousStock = Number(product.stock || 0);
    product.stock = previousStock + Number(item.quantity || 0);
    product.updatedAt = getTodayISO();
    registerInventoryMovement({
      kind: "product",
      itemId: product.id,
      itemName: product.name,
      type: "estorno_cancelamento_atendimento",
      quantity: Number(item.quantity || 0),
      previousStock,
      currentStock: product.stock,
      unit: product.unit,
      reason: reason || `Cancelamento do atendimento ${vehicle.plate}`,
      sourceCode: `PAT-${vehicle.id}`
    });
  });
  vehicle.productsSold = [];
  appendAttendanceHistory(vehicle, "Produtos vinculados ao atendimento foram estornados.", "product-cancel");
  saveProductCatalog();
}

function renderPaymentConfirmationPanel(vehicle) {
  const isConfirmed = getPaymentState(vehicle) === "Confirmado";
  const isEntryPayment = Boolean(vehicle.paymentAtEntry);
  const selectedPaymentMethod = vehicle.entryPaymentMethod || vehicle.payment || getPreferredPaymentMethodName("service");
  const confirmLabel = isEntryPayment ? "Finalizar atendimento" : vehicle.payment === "Faturado" ? "Registrar faturado" : "Confirmar pagamento";
  const serviceValue = getServicePrice(vehicle);
  const productsValue = getVehicleProductsTotal(vehicle);
  const canAddProduct = canManageAttendanceProducts(vehicle);
  const extraCharges = Number(vehicle.extraCharges || 0);
  const discount = Number(vehicle.discount || 0);
  const hasExtraCharges = Boolean(vehicle.extraChargesEnabled || extraCharges || vehicle.extraDescription);
  const hasDiscount = Boolean(vehicle.discountEnabled || discount || vehicle.discountDescription);
  const total = getVehiclePaymentTotal(vehicle);
  const isCash = !isEntryPayment && vehicle.payment === "Dinheiro";
  const cashReceived = Number(vehicle.cashReceived || 0);
  const change = Math.max(0, cashReceived - total);
  const hasPartialPayment = !isEntryPayment && Boolean(vehicle.partialPaymentOpen || vehicle.partialPaidAmount || vehicle.partialBalance);
  const hasOpenPayment = !isEntryPayment && Boolean(vehicle.paymentOpen && !hasPartialPayment);
  const partialPaidAmount = Number(vehicle.partialPaidAmount || 0);
  const partialBalance = hasPartialPayment ? Math.max(0, Number(vehicle.partialBalance || total - partialPaidAmount)) : total;

  return `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <section class="payment-confirm-panel ${isConfirmed ? "is-confirmed" : ""}">
        <div>
          <span>Valor do atendimento</span>
          <strong id="paymentConfirmTotal">${formatCurrency(total)}</strong>
          <p>${
            isConfirmed
              ? `Pagamento confirmado às ${escapeHtml(vehicle.paymentConfirmedAt || "agora")}.`
              : isEntryPayment
                ? `Pagamento informado na entrada por ${escapeHtml(selectedPaymentMethod)}. Ajuste avulsos e desconto antes de lançar no Fluxo de caixa.`
              : `Serviços: ${formatCurrency(serviceValue)} · Produtos: ${formatCurrency(productsValue)}. Ajuste avulsos e desconto antes de lançar no Fluxo de caixa.`
          }</p>
          <p id="paymentConfirmBreakdown">Avulsos: ${formatCurrency(extraCharges)} · Desconto: ${formatCurrency(discount)}</p>
        </div>
        <label class="login-field" for="paymentConfirmMethod">
          <span>Forma de pagamento</span>
          <select id="paymentConfirmMethod">
            ${renderPaymentOptions(selectedPaymentMethod, !isEntryPayment)}
          </select>
        </label>
      </section>

      ${renderVehicleDetailSections(vehicle, { allowProductRemoval: canAddProduct })}

      <section class="payment-adjustment-grid">
        <label class="switch-field payment-adjustment-switch" for="paymentExtraEnabled">
          <input id="paymentExtraEnabled" type="checkbox" ${hasExtraCharges ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Valores avulsos</span>
        </label>
        <label class="switch-field payment-adjustment-switch" for="paymentDiscountEnabled">
          <input id="paymentDiscountEnabled" type="checkbox" ${hasDiscount ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Desconto</span>
        </label>
        ${
          isEntryPayment
            ? ""
            : `<label class="switch-field payment-adjustment-switch payment-open-switch" for="paymentOpenEnabled">
          <input id="paymentOpenEnabled" type="checkbox" ${hasOpenPayment ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Pagamento em aberto</span>
        </label>
        <label class="switch-field payment-adjustment-switch payment-partial-switch" for="paymentPartialEnabled">
          <input id="paymentPartialEnabled" type="checkbox" ${hasPartialPayment ? "checked" : ""} />
          <span class="switch-control"></span>
          <span>Pagamento parcial</span>
        </label>`
        }
        <label class="login-field payment-adjustment-field" for="paymentExtraCharges" ${hasExtraCharges ? "" : "hidden"}>
          <span>Valor avulso</span>
          <input id="paymentExtraCharges" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(extraCharges))}" />
        </label>
        <label class="login-field payment-adjustment-field" for="paymentExtraDescription" ${hasExtraCharges ? "" : "hidden"}>
          <span>Descrição do valor avulso</span>
          <input id="paymentExtraDescription" type="text" placeholder="Ex.: Remoção de manchas" value="${escapeHtml(vehicle.extraDescription || "")}" />
        </label>
        <label class="login-field payment-adjustment-field" for="paymentDiscount" ${hasDiscount ? "" : "hidden"}>
          <span>Valor do desconto</span>
          <input id="paymentDiscount" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(discount))}" />
        </label>
        <label class="login-field payment-adjustment-field" for="paymentDiscountDescription" ${hasDiscount ? "" : "hidden"}>
          <span>Descrição do desconto</span>
          <input id="paymentDiscountDescription" type="text" placeholder="Ex.: Cortesia autorizada" value="${escapeHtml(vehicle.discountDescription || "")}" />
        </label>
        <label class="login-field payment-cash-field" id="paymentCashReceivedField" for="paymentCashReceived" ${isCash ? "" : "hidden"}>
          <span>Valor recebido</span>
          <input id="paymentCashReceived" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(cashReceived || total))}" />
        </label>
        <article class="cash-change-card" id="paymentCashChangeField" ${isCash ? "" : "hidden"}>
          <span>Troco</span>
          <strong id="paymentCashChange">${formatCurrency(change)}</strong>
        </article>
        <label class="login-field payment-partial-field" for="paymentPartialAmount" ${hasPartialPayment ? "" : "hidden"}>
          <span>Valor pago agora</span>
          <input id="paymentPartialAmount" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(partialPaidAmount))}" />
        </label>
        <article class="cash-change-card partial-balance-card" id="paymentPartialBalanceField" ${hasPartialPayment ? "" : "hidden"}>
          <span>Saldo em aberto</span>
          <strong id="paymentPartialBalance">${formatCurrency(partialBalance)}</strong>
        </article>
      </section>

      <div class="dialog-actions status-dialog-actions">
        ${canAddProduct ? `<button class="ghost-action" type="button" data-status-action="show-product-editor"><span data-icon="package"></span><span>Adicionar produto</span></button>` : ""}
        <button class="exit-button" type="button" data-status-action="edit-services">Editar serviços</button>
        <button class="ghost-action" type="button" data-status-action="show-status">
          <span data-icon="dashboard"></span>
          <span>Alterar status</span>
        </button>
        <button class="primary-button" type="button" data-status-action="confirm-payment">
          <span data-icon="check"></span>
          <span>${escapeHtml(confirmLabel)}</span>
        </button>
      </div>
    </div>
  `;
}

function renderReceiptPanel(vehicle) {
  return `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <section class="receipt-panel">
        <span class="receipt-status ${vehicle.status === "cancelado" ? "is-canceled" : ""}">
          ${escapeHtml(statusMeta[vehicle.status]?.label || "Finalizado")}
        </span>
        <div>
          <strong>${formatCurrency(getVehiclePaymentTotal(vehicle))}</strong>
          <p>Gere um recibo em PDF com dados do cliente, veículo, serviços, pagamento e operador responsável.</p>
        </div>
      </section>
      <div class="dialog-actions status-dialog-actions">
        <button class="exit-button" type="button" data-status-action="back-actions">Fechar</button>
        <button class="primary-button" type="button" data-status-action="emit-receipt">
          <span data-icon="invoice"></span>
          <span>Emitir recibo PDF</span>
        </button>
      </div>
    </div>
  `;
}

function generateReceiptPdf(vehicle) {
  const receiptPrefix = (businessFinanceSettings.documents.receiptNumberPrefix || "REC").trim().toUpperCase();
  const receiptNumber = `${receiptPrefix}-${String(vehicle.id).padStart(4, "0")}-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
  const issuedAt = new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
  const products = getVehicleSoldProducts(vehicle);
  const financeSnapshot = getPaymentMethodFee(vehicle.payment, getVehiclePaymentTotal(vehicle), getTodayISO());
  const lines = [
    `Recibo: ${receiptNumber}`,
    `Emissao: ${issuedAt}`,
    "",
    `Status: ${statusMeta[vehicle.status]?.label || vehicle.status}`,
    `Placa: ${vehicle.plate}`,
    `Veiculo: ${formatVehicleDisplayName(vehicle)} - ${vehicle.color}`,
    `Cliente: ${vehicle.owner}`,
    `Telefone: ${vehicle.phone || "-"}`,
    "",
    "Servicos",
    ...getVehicleServices(vehicle).map((serviceName) => {
      const service = findServiceDefinition(serviceName, vehicle.type, vehicle.category);
      return `${serviceName} - ${formatCurrency(Number(service?.price || 0))}`;
    }),
    `Total de servicos: ${formatCurrency(getServicePrice(vehicle))}`,
    "",
    "Produtos",
    ...(products.length
      ? products.map(
          (item) => `${item.productName} - ${item.quantity} x ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.total)}`
        )
      : ["Nenhum produto vendido neste atendimento."]),
    `Total de produtos: ${formatCurrency(getVehicleProductsTotal(vehicle))}`,
    "",
    `Forma de pagamento: ${vehicle.payment}`,
    `Situacao do pagamento: ${getPaymentState(vehicle)}`,
    vehicle.extraCharges
      ? `Valores avulsos: ${formatCurrency(vehicle.extraCharges)}${vehicle.extraDescription ? ` - ${vehicle.extraDescription}` : ""}`
      : "",
    vehicle.discount
      ? `Desconto: ${formatCurrency(vehicle.discount)}${vehicle.discountDescription ? ` - ${vehicle.discountDescription}` : ""}`
      : "",
    `Taxas previstas: ${formatCurrency(financeSnapshot.feeAmount)}`,
    `Valor liquido estimado: ${formatCurrency(financeSnapshot.netAmount)}`,
    `Valor total: ${formatCurrency(getVehiclePaymentTotal(vehicle))}`,
    vehicle.partialPaymentOpen ? `Valor pago agora: ${formatCurrency(vehicle.partialPaidAmount || 0)}` : "",
    vehicle.partialPaymentOpen ? `Saldo em aberto: ${formatCurrency(vehicle.partialBalance || 0)}` : "",
    vehicle.payment === "Dinheiro" ? `Valor recebido: ${formatCurrency(vehicle.cashReceived || 0)}` : "",
    vehicle.payment === "Dinheiro" ? `Troco: ${formatCurrency(vehicle.cashChange || 0)}` : "",
    getVehicleTimeLabel(vehicle),
    `Finalizacao: ${vehicle.finishedAt || vehicle.paymentConfirmedAt || "-"}`,
    `Operador: ${activeSessionUser || vehicle.operator || "Operador"}`,
    vehicle.billing ? `Fatura: ${vehicle.billing.invoiceCode} - vence ${formatDateBR(vehicle.billing.dueDate)}` : "",
    hasVehicleSpecialCare(vehicle) ? "Veiculo com cuidado especial cadastrado." : "",
    "",
    "Este recibo foi gerado automaticamente pelo LavaPrime."
  ].filter((line) => line !== "");

  downloadPdfFile(`${receiptNumber}-${vehicle.plate}.pdf`, "RECIBO DE ATENDIMENTO", lines, {
    subtitle: `Recibo ${receiptNumber}`,
    documentNumber: receiptNumber,
    category: "Recibo",
    summary: `Atendimento ${vehicle.plate} - ${formatCurrency(getVehiclePaymentTotal(vehicle))}.`
  });
  showToast("Recibo em PDF gerado.");
}

function createReceiptPdfDocument(lines) {
  const [brandLine, titleLine, ...contentLines] = Array.isArray(lines) ? lines : [lines];
  const hasBrandLine = normalizeText(brandLine).includes("lavaprime") && titleLine;
  return createStandardPdfDocument({
    fileName: "documento-lavaprime.pdf",
    title: hasBrandLine ? titleLine : brandLine || "Documento LavaPrime",
    lines: hasBrandLine ? contentLines : [titleLine, ...contentLines].filter(Boolean),
    subtitle: "Documento operacional",
    documentNumber: `DOC-${getTodayISO().replace(/-/g, "")}`,
    responsible: activeSessionUser || "Sistema LavaPrime",
    category: "Documento",
    summary: "Documento gerado automaticamente pelo LavaPrime conforme o papel timbrado padrao."
  });
}

function removeDiacritics(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapePdfText(value) {
  return String(value)
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function renderStatusActionPanel(vehicle) {
  const canAddProduct = canManageAttendanceProducts(vehicle);
  return `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <div class="status-action-list">
        ${vehicle.status === "agendado" ? renderScheduledEntryOption() : renderStatusOptions(vehicle.status)}
      </div>
      ${renderVehicleDetailSections(vehicle, { allowProductRemoval: canAddProduct })}
      <button class="status-option edit-services-option" type="button" data-status-action="edit-services">
        <span class="status-dot-icon">${icons.service}</span>
        <span>
          <strong>Editar serviços e pagamento</strong><br />
          <small>Adicionar ou remover serviços e alterar a forma de pagamento</small>
        </span>
      </button>
      ${
        canAddProduct
          ? `
            <button class="status-option edit-services-option" type="button" data-status-action="show-product-editor">
              <span class="status-dot-icon">${icons.package}</span>
              <span>
                <strong>Adicionar produto ao atendimento</strong><br />
                <small>Vende produtos no mesmo atendimento e baixa o estoque na hora</small>
              </span>
            </button>
          `
          : ""
      }
    </div>
  `;
}

function renderScheduledEntryOption() {
  return `
    <button class="status-option confirm-entry-option" type="button" data-status-option="aguardando">
      <span class="status-dot-icon status-aguardando">${icons.check}</span>
      <span>
        <strong>Confirmar entrada</strong><br />
        <small>Mover veículo para Aguardando Serviço</small>
      </span>
    </button>
    <button class="status-option cancel-schedule-option" type="button" data-status-option="cancelado">
      <span class="status-dot-icon status-cancelado">${icons.cancel}</span>
      <span>
        <strong>Cancelar agendamento</strong><br />
        <small>Mover veículo para Finalizados como cancelado</small>
      </span>
    </button>
  `;
}

function renderScheduledEntryConfirmationPanel(vehicle) {
  $("#statusDialogEyebrow").textContent = "Confirmar entrada";
  $("#statusOptions").innerHTML = `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <section class="status-billing-panel">
        <p class="billing-warning">Confirme a chegada do veículo agendado. Se necessário, acione o Check-list antes de mover para Aguardando Serviço.</p>
      </section>
      ${renderChecklistPanel("scheduledConfirm", vehicle.type, vehicle.checklist || null)}
      <div class="dialog-actions status-dialog-actions">
        <button class="exit-button" type="button" data-status-action="back-actions">Voltar</button>
        <button class="primary-button" type="button" data-status-action="finish-scheduled-entry">
          <span data-icon="check"></span>
          <span>Confirmar entrada</span>
        </button>
      </div>
    </div>
  `;
  bindChecklistPanel($("#statusOptions"), "scheduledConfirm", vehicle.type);
  initIcons();
}

function renderStatusOptions(currentStatus) {
  return getAllowedStatusTransitions(currentStatus)
    .map((status) => {
      const meta = statusMeta[status];
      return `
        <button class="status-option" type="button" data-status-option="${status}">
          <span class="status-dot-icon status-${status}">${icons[meta.icon]}</span>
          <span>
            <strong>${meta.label}</strong><br />
            <small>${meta.summary}</small>
          </span>
        </button>
      `;
    })
    .join("");
}

function getAllowedStatusTransitions(currentStatus) {
  const transitions = {
    aguardando: ["lavando", "cancelado"],
    lavando: ["aguardando", "pronto", "cancelado"],
    pronto: ["aguardando", "lavando", "cancelado"]
  };

  return transitions[currentStatus] || statusActionOrder.filter((status) => status !== currentStatus);
}

function handleStatusDialogAction(action) {
  if (action === "finish-quote-entry-checklist") {
    finishQuoteEntryWithChecklist();
    return;
  }

  if (action === "cancel-quote-entry-checklist") {
    closeStatusDialog();
    return;
  }

  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  if (action === "edit-services") {
    renderServiceEditPanel(vehicle);
    return;
  }

  if (action === "back-actions" || action === "show-status") {
    if (action === "back-actions" && isFinalizedStatus(vehicle.status)) {
      closeStatusDialog();
      return;
    }
    resetStatusBillingSelection();
    $("#statusDialogEyebrow").textContent = action === "show-status" ? "Alterar status" : vehicle.status === "pronto" ? "Confirmar pagamento" : "Ações do veículo";
    $("#statusOptions").innerHTML = action === "show-status" ? renderStatusActionPanel(vehicle) : vehicle.status === "pronto" ? renderPaymentConfirmationPanel(vehicle) : renderStatusActionPanel(vehicle);
    initIcons();
    bindCurrencyInputs($("#statusOptions"));
    return;
  }

  if (action === "add-service") {
    addStatusServiceFromDialog();
    return;
  }

  if (action === "save-service-edit") {
    saveStatusServiceEdit();
    return;
  }

  if (action === "show-product-editor") {
    renderAttendanceProductPanel(vehicle);
    return;
  }

  if (action === "save-attendance-product") {
    saveAttendanceProductToVehicle();
    return;
  }

  if (action === "confirm-payment") {
    confirmVehiclePayment();
    return;
  }

  if (action === "finish-scheduled-entry") {
    confirmScheduledVehicleEntryWithChecklist();
    return;
  }

  if (action === "emit-receipt") {
    generateReceiptPdf(vehicle);
    return;
  }

  if (action === "status-new-billing-client") {
    handleNewBillingClientFromEntry();
    return;
  }

  if (action === "status-open-invoice") {
    openStatusBillingInvoice();
    return;
  }

  if (action === "finish-status-billing") {
    finishStatusBillingFlow();
    return;
  }

  if (action === "back-status-billing") {
    if (statusBillingMode === "edit") renderServiceEditPanel(vehicle, { preserveEdited: true });
    else {
      $("#statusDialogEyebrow").textContent = "Confirmar pagamento";
      $("#statusOptions").innerHTML = renderPaymentConfirmationPanel(vehicle);
      initIcons();
      bindCurrencyInputs($("#statusOptions"));
    }
  }
}

function handleStatusDialogChange(event) {
  const target = event.target;
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  if (target.id === "statusPaymentSelect" && target.value === "Faturado" && !vehicle.billing) {
    renderStatusBillingPanel(vehicle, "edit");
    return;
  }

  if (target.id === "paymentConfirmMethod") {
    if (vehicle.paymentAtEntry && target.value === "Faturado") {
      target.value = vehicle.entryPaymentMethod || vehicle.payment || "Pix";
      showToast("Pagamento na entrada nao permite Faturado.");
      updatePaymentConfirmationPreview(vehicle);
      return;
    }
    if (target.value === "Faturado" && !vehicle.billing) {
      applyPaymentAdjustmentsFromDialog(vehicle, "Faturado");
      renderStatusBillingPanel(vehicle, "confirm");
      return;
    }
    updatePaymentConfirmationPreview(vehicle);
    return;
  }

  if (["paymentExtraEnabled", "paymentDiscountEnabled", "paymentOpenEnabled", "paymentPartialEnabled"].includes(target.id)) {
    if (target.id === "paymentOpenEnabled" && target.checked) {
      const partialToggle = $("#paymentPartialEnabled");
      if (partialToggle) partialToggle.checked = false;
    }
    if (target.id === "paymentPartialEnabled" && target.checked) {
      const openToggle = $("#paymentOpenEnabled");
      if (openToggle) openToggle.checked = false;
    }
    updatePaymentConfirmationPreview(vehicle);
    return;
  }

  if (target.id === "statusBillingClientSelect") {
    selectedStatusBillingClientId = target.value;
    selectedStatusBillingInvoiceId = "";
    renderStatusBillingPanel(vehicle, statusBillingMode);
    return;
  }

  if (target.id === "statusBillingInvoiceSelect") {
    selectedStatusBillingInvoiceId = target.value;
    updateStatusBillingReadyState();
    return;
  }

  if (target.id === "attendanceProductSelect") {
    updateAttendanceProductPanelPreview();
  }
}

function handleStatusDialogInput(event) {
  const target = event.target;
  if (target.id.startsWith("attendanceProduct")) {
    updateAttendanceProductPanelPreview();
    return;
  }
  if (
    ![
      "paymentExtraCharges",
      "paymentExtraDescription",
      "paymentDiscount",
      "paymentDiscountDescription",
      "paymentCashReceived",
      "paymentPartialAmount"
    ].includes(target.id)
  ) {
    return;
  }
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;
  updatePaymentConfirmationPreview(vehicle);
}

function updatePaymentConfirmationPreview(vehicle) {
  const method = $("#paymentConfirmMethod")?.value || vehicle.payment || "Pix";
  const isEntryPayment = Boolean(vehicle.paymentAtEntry);
  bindCurrencyInputs($("#statusOptions"));
  const adjustment = readPaymentAdjustmentsFromDialog(vehicle);
  const extraEnabled = $("#paymentExtraEnabled")?.checked || false;
  const discountEnabled = $("#paymentDiscountEnabled")?.checked || false;
  ["#paymentExtraCharges", "#paymentExtraDescription"].forEach((selector) => {
    const field = $(selector)?.closest(".payment-adjustment-field");
    if (field) field.hidden = !extraEnabled;
  });
  ["#paymentDiscount", "#paymentDiscountDescription"].forEach((selector) => {
    const field = $(selector)?.closest(".payment-adjustment-field");
    if (field) field.hidden = !discountEnabled;
  });

  const cashField = $("#paymentCashReceivedField");
  const cashChangeField = $("#paymentCashChangeField");
  const cashReceivedInput = $("#paymentCashReceived");
  const keepPaymentOpen = $("#paymentOpenEnabled")?.checked || false;
  const usePartialPayment = $("#paymentPartialEnabled")?.checked || false;
  const partialField = $("#paymentPartialAmount")?.closest(".payment-partial-field");
  const partialBalanceField = $("#paymentPartialBalanceField");
  const isCash = method === "Dinheiro" && !keepPaymentOpen && !usePartialPayment && !isEntryPayment;

  if (cashField) cashField.hidden = !isCash;
  if (cashChangeField) cashChangeField.hidden = !isCash;
  if (partialField) partialField.hidden = !usePartialPayment;
  if (partialBalanceField) partialBalanceField.hidden = !usePartialPayment;
  if (isCash && cashReceivedInput && !getCurrencyInputValue(cashReceivedInput)) {
    setCurrencyInputValue(cashReceivedInput, adjustment.total);
  }

  const updatedAdjustment = readPaymentAdjustmentsFromDialog(vehicle);
  $("#paymentConfirmTotal").textContent = formatCurrency(updatedAdjustment.total);
  const breakdown = [`Avulsos: ${formatCurrency(updatedAdjustment.extraCharges)}`, `Desconto: ${formatCurrency(updatedAdjustment.discount)}`];
  if (isEntryPayment) {
    breakdown.push(`Pago na entrada: ${method}`);
  }
  if (updatedAdjustment.partialEnabled) {
    breakdown.push(`Pago agora: ${formatCurrency(updatedAdjustment.partialAmount)}`);
    breakdown.push(`Saldo: ${formatCurrency(updatedAdjustment.partialBalance)}`);
  }
  $("#paymentConfirmBreakdown").textContent = breakdown.join(" · ");
  if ($("#paymentPartialBalance")) {
    $("#paymentPartialBalance").textContent = formatCurrency(updatedAdjustment.partialBalance);
  }
  if ($("#paymentCashChange")) {
    const cashMessage =
      updatedAdjustment.cashReceived < updatedAdjustment.total
        ? `Faltam ${formatCurrency(updatedAdjustment.total - updatedAdjustment.cashReceived)}`
        : formatCurrency(updatedAdjustment.change);
    $("#paymentCashChange").textContent = cashMessage;
  }
}

function renderServiceEditPanel(vehicle, options = {}) {
  if (!options.preserveEdited) editedStatusServices = getVehicleServices(vehicle);
  const availableServices = getServicesForVehicleContext(vehicle);

  $("#statusDialogEyebrow").textContent = "Editar lançamento";
  $("#statusOptions").innerHTML = `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <section class="status-service-editor">
        <label class="login-field" for="statusServiceSelect">
          <span>Serviço contratado</span>
          <select id="statusServiceSelect">
            ${availableServices
              .map(
                (service) =>
                  `<option value="${escapeHtml(service.name)}">${escapeHtml(formatServiceOptionLabel(service))}</option>`
              )
              .join("")}
          </select>
        </label>
        <button class="ghost-action" type="button" data-status-action="add-service">
          <span data-icon="plus"></span>
          <span>Adicionar serviço</span>
        </button>
        <div class="selected-services-list status-selected-services" id="statusServiceList"></div>
        <label class="login-field status-payment-field" for="statusPaymentSelect">
          <span>Forma de pagamento</span>
          <select id="statusPaymentSelect">
            ${renderPaymentOptions(vehicle.payment || getPreferredPaymentMethodName("service"), true, "service")}
          </select>
        </label>
      </section>
      <div class="dialog-actions status-dialog-actions">
        <button class="exit-button" type="button" data-status-action="back-actions">Voltar</button>
        <button class="primary-button" type="button" data-status-action="save-service-edit">
          <span data-icon="check"></span>
          <span>Salvar alterações</span>
        </button>
      </div>
    </div>
  `;
  renderStatusServiceChips();
  initIcons();
}

function renderStatusServiceChips() {
  const list = $("#statusServiceList");
  if (!list) return;

  list.innerHTML = editedStatusServices.length
    ? editedStatusServices
        .map((serviceName) => {
          const registeredService = findServiceDefinition(serviceName);
          const details = registeredService ? `${formatVehicleScope(registeredService.vehicleType, registeredService.vehicleCategory)} - ${formatCurrency(registeredService.price)}` : "Serviço contratado";
          return `
            <span class="selected-service-chip">
              <span>
                <strong>${escapeHtml(serviceName)}</strong>
                <small>${escapeHtml(details)}</small>
              </span>
              <button type="button" aria-label="Remover ${escapeHtml(serviceName)}" data-remove-status-service="${escapeHtml(serviceName)}">
                ${icons.x}
              </button>
            </span>
          `;
        })
        .join("")
    : '<p class="empty-plates">Nenhum serviço contratado.</p>';
}

function renderStatusBillingPanel(vehicle, mode) {
  statusBillingMode = mode;
  const registryClient = getApprovedBillingClientForEntry(vehicle);

  $("#statusDialogEyebrow").textContent = "Pagamento faturado";

  if (!registryClient) {
    $("#statusOptions").innerHTML = `
      <div class="status-action-panel">
        ${renderVehicleActionSummary(vehicle)}
        <section class="status-billing-panel">
          <p class="billing-warning">Para selecionar Faturado, o cliente vinculado a esta placa precisa estar cadastrado como faturado e aprovado por um administrador.</p>
        </section>
        <div class="dialog-actions status-dialog-actions">
          <button class="exit-button" type="button" data-status-action="back-status-billing">Voltar</button>
          <button class="ghost-action" type="button" data-status-action="status-new-billing-client">
            <span data-icon="users"></span>
            <span>Novo cliente</span>
          </button>
        </div>
      </div>
    `;
    initIcons();
    return;
  }

  const billingClient = billingClients.find((client) => client.id === Number(registryClient.billingClientId));
  if (!billingClient) {
    showToast("Cliente faturado aprovado não localizado.");
    return;
  }
  selectedStatusBillingClientId = selectedStatusBillingClientId || String(billingClient.id);
  const invoices = billingInvoices.filter(
    (invoice) => String(invoice.clientId) === String(selectedStatusBillingClientId) && invoice.status !== "Paga"
  );
  const selectedInvoiceExists = invoices.some((invoice) => String(invoice.id) === String(selectedStatusBillingInvoiceId));
  if (!selectedInvoiceExists) selectedStatusBillingInvoiceId = "";

  $("#statusOptions").innerHTML = `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <section class="status-billing-panel">
        <p class="billing-warning">Selecione a fatura aberta onde este atendimento será lançado. Se não houver fatura disponível, abra uma nova com vencimento aprovado.</p>
        <div class="status-billing-grid">
          <label class="login-field" for="statusBillingClientSelect">
            <span>Cliente faturado</span>
            <select id="statusBillingClientSelect">
              <option value="${escapeHtml(billingClient.id)}">${escapeHtml(billingClient.name)}</option>
            </select>
          </label>
          <label class="login-field" for="statusBillingInvoiceSelect">
            <span>Fatura</span>
            <select id="statusBillingInvoiceSelect">
              <option value="">Selecione a fatura</option>
              ${invoices
                .map(
                  (invoice) =>
                    `<option value="${escapeHtml(invoice.id)}" ${String(invoice.id) === String(selectedStatusBillingInvoiceId) ? "selected" : ""}>${escapeHtml(invoice.code)} - vence ${formatDateBR(invoice.dueDate)}</option>`
                )
                .join("")}
            </select>
          </label>
          <label class="login-field" for="statusInvoiceDueDate">
            <span>Vencimento nova fatura</span>
            <input id="statusInvoiceDueDate" type="date" />
          </label>
          <button class="ghost-action" type="button" data-status-action="status-open-invoice">
            <span data-icon="plus"></span>
            <span>Abrir nova fatura</span>
          </button>
        </div>
      </section>
      <div class="dialog-actions status-dialog-actions">
        <button class="exit-button" type="button" data-status-action="back-status-billing">Voltar</button>
        <button class="ghost-action" type="button" data-status-action="status-new-billing-client">
          <span data-icon="users"></span>
          <span>Novo cliente</span>
        </button>
        <button class="primary-button" id="finishStatusBillingButton" type="button" data-status-action="finish-status-billing" disabled>
          <span data-icon="check"></span>
          <span>Adicionar faturado</span>
        </button>
      </div>
    </div>
  `;

  $("#statusBillingClientSelect").value = selectedStatusBillingClientId;
  $("#statusBillingInvoiceSelect").value = selectedStatusBillingInvoiceId;
  setStatusInvoiceDateMin();
  updateStatusBillingReadyState();
  initIcons();
}

function setStatusInvoiceDateMin() {
  const input = $("#statusInvoiceDueDate");
  if (input) input.min = new Date().toISOString().slice(0, 10);
}

function updateStatusBillingReadyState() {
  const button = $("#finishStatusBillingButton");
  if (button) button.disabled = !selectedStatusBillingClientId || !selectedStatusBillingInvoiceId;
}

function openStatusBillingInvoice() {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  const dueDate = $("#statusInvoiceDueDate")?.value || "";
  const registryClient = getApprovedBillingClientForEntry(vehicle);

  if (!registryClient || !selectedStatusBillingClientId) {
    showToast("Cliente faturado aprovado não localizado.");
    return;
  }

  if (!dueDate) {
    showToast("Selecione o vencimento da fatura.");
    $("#statusInvoiceDueDate")?.focus();
    return;
  }

  const openInvoices = getOpenInvoicesByRegistryClient(registryClient);
  if (openInvoices.length && !registryClient.allowMultipleOpenInvoices) {
    showToast("Cliente não permite mais de uma fatura em aberto.");
    return;
  }

  const invoice = {
    id: Math.max(...billingInvoices.map((item) => item.id)) + 1,
    clientId: Number(selectedStatusBillingClientId),
    code: `FAT-${dueDate.slice(5, 7)}${dueDate.slice(2, 4)}-${String(billingInvoices.length + 1).padStart(3, "0")}`,
    dueDate,
    status: "Aberta",
    approvedBy: registryClient.approver,
    cycle: registryClient.billingCycle
  };

  billingInvoices.push(invoice);
  invoiceAmounts[invoice.id] = 0;
  selectedStatusBillingInvoiceId = String(invoice.id);
  renderStatusBillingPanel(vehicle, statusBillingMode);
  showToast("Nova fatura aberta.");
}

async function finishStatusBillingFlow() {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  const invoice = getSelectedStatusBillingInvoice();
  if (!invoice) {
    showToast("Selecione cliente e fatura para adicionar.");
    return;
  }

  if (statusBillingMode === "edit") {
    applyStatusServiceEdit("Faturado", invoice);
    return;
  }

  vehicle.payment = "Faturado";
  if (!vehicle.billing && !attachVehicleToInvoice(vehicle, invoice)) return;
  if (!consumeServiceSuppliesForVehicle(vehicle)) return;
  const cashEntry = upsertCashEntryFromVehicle(vehicle);
  vehicle.cashEntryId = cashEntry.id;
  vehicle.paymentStatus = cashEntry.status;
  vehicle.paymentConfirmed = false;
  vehicle.paymentConfirmedAt = cashEntry.time;
  vehicle.status = "finalizado";
  vehicle.finishedAt = getCurrentShortTime();
  updateVehicleServiceStatus(vehicle);

  renderPatio();
  refreshCashflowScreen();
  closeStatusDialog();
  await maybeSuggestVehicleCareFromCompletedServices(vehicle);
  showToast(`Lançamento faturado de ${vehicle.plate} registrado.`);
}

function getSelectedStatusBillingInvoice() {
  return billingInvoices.find(
    (invoice) =>
      String(invoice.id) === String(selectedStatusBillingInvoiceId) &&
      String(invoice.clientId) === String(selectedStatusBillingClientId)
  );
}

function addStatusServiceFromDialog() {
  const select = $("#statusServiceSelect");
  if (!select?.value) return;

  if (editedStatusServices.includes(select.value)) {
    showToast("Serviço já incluído.");
    return;
  }

  editedStatusServices.push(select.value);
  renderStatusServiceChips();
}

function removeStatusServiceFromDialog(serviceName) {
  editedStatusServices = editedStatusServices.filter((service) => service !== serviceName);
  renderStatusServiceChips();
}

function saveStatusServiceEdit() {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  if (!editedStatusServices.length) {
    showToast("Mantenha ao menos um serviço contratado.");
    return;
  }

  const nextPayment = $("#statusPaymentSelect")?.value || vehicle.payment;
  if (nextPayment === "Faturado" && !vehicle.billing) {
    renderStatusBillingPanel(vehicle, "edit");
    return;
  }

  applyStatusServiceEdit(nextPayment);
}

function applyStatusServiceEdit(nextPayment, billingInvoice = null) {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  const previousValue = getVehiclePaymentTotal(vehicle);
  const previousService = vehicle.service;
  const previousPayment = vehicle.payment;

  vehicle.services = [...editedStatusServices];
  vehicle.service = formatServices(vehicle.services);
  vehicle.payment = nextPayment;

  if (nextPayment === "Faturado" && !vehicle.billing) {
    if (!billingInvoice || !attachVehicleToInvoice(vehicle, billingInvoice)) return;
    vehicle.paymentStatus = "Pendente";
    vehicle.paymentConfirmed = false;
  } else {
    syncBillingAfterPatioEdit(vehicle, previousValue, previousService, previousPayment);
  }

  syncCashEntryAfterPatioEdit(vehicle);
  updateVehicleHistoryAfterServiceEdit(vehicle, previousService);

  renderPatio();
  refreshCashflowScreen();
  closeStatusDialog();
  showToast("Serviços e pagamento atualizados.");
}

function applyPaymentAdjustmentsFromDialog(vehicle, method) {
  const previousBillingValue = getVehiclePaymentTotal(vehicle);
  const adjustment = readPaymentAdjustmentsFromDialog(vehicle);

  vehicle.extraCharges = adjustment.extraCharges;
  vehicle.extraChargesEnabled = adjustment.extraEnabled;
  vehicle.extraDescription = adjustment.extraDescription;
  vehicle.discount = adjustment.discount;
  vehicle.discountEnabled = adjustment.discountEnabled;
  vehicle.discountDescription = adjustment.discountDescription;
  vehicle.paymentTotal = adjustment.total;
  vehicle.cashReceived = method === "Dinheiro" ? adjustment.cashReceived : 0;
  vehicle.cashChange = method === "Dinheiro" ? adjustment.change : 0;

  if (method === "Faturado" && vehicle.billing) {
    syncBillingValueAfterPaymentAdjustment(vehicle, previousBillingValue);
  }

  return adjustment;
}

function syncBillingValueAfterPaymentAdjustment(vehicle, previousValue) {
  const invoiceId = vehicle.billing?.invoiceId;
  if (!invoiceId) return;

  const lineItem = findInvoiceLineItemForVehicle(vehicle, invoiceId, vehicle.service);
  const currentValue = lineItem?.value ?? previousValue;
  const nextValue = getVehiclePaymentTotal(vehicle);
  invoiceAmounts[invoiceId] = Math.max(0, (invoiceAmounts[invoiceId] || 0) - currentValue + nextValue);

  if (lineItem) {
    lineItem.service = vehicle.service;
    lineItem.value = nextValue;
    lineItem.operator = activeSessionUser || lineItem.operator;
  }
}

async function confirmVehiclePayment() {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  const careConflictResult = getVehicleCurrentCareConflictResult(vehicle);
  if (!(await ensureVehicleCareWarningAcknowledged(vehicle, careConflictResult, "finish_service"))) return;

  const previousPayment = vehicle.payment;
  const previousService = vehicle.service;
  const previousBillingValue = getVehiclePaymentTotal(vehicle);
  const method = $("#paymentConfirmMethod")?.value || vehicle.payment || "Pix";
  const isEntryPayment = Boolean(vehicle.paymentAtEntry);
  if (isEntryPayment && method === "Faturado") {
    showToast("Pagamento na entrada nao permite Faturado.");
    return;
  }
  const adjustment = applyPaymentAdjustmentsFromDialog(vehicle, method);
  const keepPaymentOpen = isEntryPayment ? false : $("#paymentOpenEnabled")?.checked || false;
  const usePartialPayment = isEntryPayment ? false : $("#paymentPartialEnabled")?.checked || false;
  if (!isEntryPayment && !keepPaymentOpen && !usePartialPayment && method === "Dinheiro" && adjustment.cashReceived < adjustment.total) {
    showToast("Informe um valor recebido suficiente para calcular o troco.");
    $("#paymentCashReceived")?.focus();
    return;
  }

  if (isEntryPayment) {
    if (!consumeServiceSuppliesForVehicle(vehicle)) return;
    vehicle.payment = method;
    vehicle.entryPaymentMethod = method;
    if (previousPayment === "Faturado" && vehicle.billing) {
      detachVehicleFromBilling(vehicle, previousBillingValue, previousService);
    }
    vehicle.paymentOpen = false;
    vehicle.partialPaymentOpen = false;
    vehicle.partialPaidAmount = 0;
    vehicle.partialBalance = 0;
    vehicle.paymentStatus = "Confirmado";
    vehicle.paymentConfirmed = true;
    vehicle.paymentConfirmedAt = getCurrentShortTime();
    vehicle.status = "finalizado";
    if (method === "Dinheiro") {
      vehicle.cashReceived = adjustment.total;
      vehicle.cashChange = 0;
    }
    const cashEntry = upsertCashEntryFromVehicle(vehicle, {
      status: "Confirmado",
      description: `${vehicle.plate} - pagamento na entrada - ${vehicle.service}`,
      method,
      openPayment: false
    });
    vehicle.cashEntryId = cashEntry.id;
    vehicle.paymentConfirmedAt = cashEntry.time;
    vehicle.finishedAt = cashEntry.time;
    updateVehicleServiceStatus(vehicle);

    renderPatio();
    refreshCashflowScreen();
    renderAdminDashboard();
    closeStatusDialog();
    await maybeSuggestVehicleCareFromCompletedServices(vehicle);
    triggerAutomatedMessage("payment-confirmation", getMessageContextFromVehicle(vehicle));
    triggerAutomatedMessage("satisfaction", getMessageContextFromVehicle(vehicle));
    showToast(`Pagamento na entrada de ${vehicle.plate} confirmado.`);
    return;
  }

  if (usePartialPayment) {
    if (method === "Faturado") {
      showToast("Para pagamento parcial, selecione o meio pago agora; o saldo ficará em aberto.");
      return;
    }
    if (adjustment.total <= 0) {
      showToast("O valor do atendimento precisa ser maior que zero.");
      return;
    }
    if (adjustment.partialAmount <= 0) {
      showToast("Informe o valor pago agora.");
      $("#paymentPartialAmount")?.focus();
      return;
    }
    if (adjustment.partialAmount >= adjustment.total) {
      showToast("Para pagamento parcial, o valor pago agora deve ser menor que o total.");
      $("#paymentPartialAmount")?.focus();
      return;
    }

    if (!consumeServiceSuppliesForVehicle(vehicle)) return;
    vehicle.payment = method;
    if (previousPayment === "Faturado" && vehicle.billing) {
      detachVehicleFromBilling(vehicle, previousBillingValue, previousService);
    }

    vehicle.partialPaymentOpen = true;
    vehicle.partialPaidAmount = adjustment.partialAmount;
    vehicle.partialBalance = adjustment.partialBalance;
    vehicle.paymentStatus = "Parcial";
    vehicle.paymentConfirmed = false;
    vehicle.paymentConfirmedAt = getCurrentShortTime();
    if (method === "Dinheiro") {
      vehicle.cashReceived = adjustment.partialAmount;
      vehicle.cashChange = 0;
    }

    const paidEntry = upsertCashEntryFromVehicle(vehicle, {
      status: "Confirmado",
      value: adjustment.partialAmount,
      description: `${vehicle.plate} - pagamento parcial - ${vehicle.service}`,
      openPayment: false,
      partialPayment: true,
      partialPaidAmount: adjustment.partialAmount,
      partialBalance: adjustment.partialBalance
    });
    vehicle.cashEntryId = paidEntry.id;
    vehicle.paymentOpen = true;
    vehicle.status = "finalizado";
    vehicle.finishedAt = paidEntry.time;

    const openDescription = getPartialOpenPaymentDescription(vehicle);
    const pendingEntry = upsertCashEntryFromVehicle(vehicle, {
      forceNew: true,
      status: "Pendente",
      value: adjustment.partialBalance,
      description: openDescription,
      openPayment: true,
      partialPayment: true,
      partialPaidAmount: adjustment.partialAmount,
      partialBalance: adjustment.partialBalance
    });
    const openPayment = upsertOpenPaymentFromVehicle(vehicle, pendingEntry, {
      value: adjustment.partialBalance,
      description: openDescription,
      paymentMethod: method,
      partialPayment: true,
      paidAmount: adjustment.partialAmount
    });

    updateVehicleServiceStatus(vehicle);
    renderPatio();
    refreshCashflowScreen();
    renderAdminDashboard();
    closeStatusDialog();
    await maybeSuggestVehicleCareFromCompletedServices(vehicle);
    triggerAutomatedMessage("partial-yard-payment", getMessageContextFromVehicle(vehicle));
    showToast(`Pagamento parcial de ${vehicle.plate} registrado. Saldo em aberto: ${formatCurrency(adjustment.partialBalance)}.`);
    return;
  }

  if (!keepPaymentOpen && method === "Faturado" && !vehicle.billing) {
    renderStatusBillingPanel(vehicle, "confirm");
    return;
  }

  vehicle.payment = method;
  if (previousPayment === "Faturado" && method !== "Faturado" && vehicle.billing) {
    detachVehicleFromBilling(vehicle, previousBillingValue, previousService);
  }
  if (!keepPaymentOpen && method === "Faturado" && !vehicle.billing && !attachVehicleToOpenInvoice(vehicle)) return;

  if (keepPaymentOpen) {
    if (!consumeServiceSuppliesForVehicle(vehicle)) return;
    vehicle.paymentOpen = true;
    vehicle.paymentStatus = "Pendente";
    vehicle.paymentConfirmed = false;
    vehicle.paymentConfirmedAt = "";
    vehicle.status = "finalizado";
    vehicle.finishedAt = getCurrentShortTime();
    const cashEntry = upsertCashEntryFromVehicle(vehicle, { status: "Pendente", openPayment: true });
    vehicle.cashEntryId = cashEntry.id;
    const openPayment = upsertOpenPaymentFromVehicle(vehicle, cashEntry);
    updateVehicleServiceStatus(vehicle);
    renderPatio();
    refreshCashflowScreen();
    renderAdminDashboard();
    closeStatusDialog();
    await maybeSuggestVehicleCareFromCompletedServices(vehicle);
    triggerAutomatedMessage("open-service-payment", getMessageContextFromOpenPayment(openPayment));
    showToast(`Pagamento em aberto de ${vehicle.plate} registrado para ${openPayment.clientName}.`);
    return;
  }

  if (!consumeServiceSuppliesForVehicle(vehicle)) return;
  const cashEntry = upsertCashEntryFromVehicle(vehicle);
  vehicle.cashEntryId = cashEntry.id;
  vehicle.paymentStatus = cashEntry.status;
  vehicle.paymentConfirmed = cashEntry.status === "Confirmado";
  vehicle.paymentConfirmedAt = cashEntry.time;
  vehicle.status = "finalizado";
  vehicle.finishedAt = cashEntry.time;
  updateVehicleServiceStatus(vehicle);

  renderPatio();
  refreshCashflowScreen();
  closeStatusDialog();
  await maybeSuggestVehicleCareFromCompletedServices(vehicle);
  if (cashEntry.status === "Confirmado") {
    triggerAutomatedMessage("payment-confirmation", getMessageContextFromVehicle(vehicle));
    triggerAutomatedMessage("satisfaction", getMessageContextFromVehicle(vehicle));
  }
  showToast(
    cashEntry.status === "Confirmado"
      ? `Pagamento de ${vehicle.plate} confirmado.`
      : `Lançamento faturado de ${vehicle.plate} registrado.`
  );
}

function getPartialOpenPaymentDescription(vehicle) {
  return `Saldo aberto referente ao atendimento ${vehicle.plate} (${vehicle.service}${getVehicleProductsTotal(vehicle) ? " + produtos" : ""}) realizado em ${formatDateBR(getTodayISO())}.`;
}

function upsertCashEntryFromVehicle(vehicle, options = {}) {
  const existingEntry = options.forceNew ? null : cashEntries.find((entry) => entry.id && entry.id === vehicle.cashEntryId);
  const method = options.method || vehicle.payment || getPreferredPaymentMethodName("service");
  const status =
    options.status ||
    (vehicle.payment === "Faturado" || vehicle.paymentOpen ? "Pendente" : getExpectedReceiptStatus(method, "Entrada"));
  const value = Number.isFinite(Number(options.value)) ? Number(options.value) : getVehiclePaymentTotal(vehicle);
  const financeSnapshot = getCashEntryFinanceSnapshot(value, method, "Entrada", getTodayISO());
  const payload = {
    date: getTodayISO(),
    time: getCurrentShortTime(),
    type: "Entrada",
    description: options.description || `${vehicle.plate} - ${vehicle.service}${getVehicleProductsTotal(vehicle) ? " + produtos" : ""}`,
    method,
    value,
    status,
    category: "Serviços",
    costCenter: vehicle.type === "Carro" ? "Lavagem" : "Unidade principal",
    plate: vehicle.plate,
    vehicleId: vehicle.id,
    openPayment: options.openPayment === undefined ? Boolean(vehicle.paymentOpen) : Boolean(options.openPayment),
    partialPayment: Boolean(options.partialPayment),
    partialPaidAmount: Number(options.partialPaidAmount || 0),
    partialBalance: Number(options.partialBalance || 0),
    feePercent: financeSnapshot.feePercent,
    fixedFee: financeSnapshot.fixedFee,
    feeAmount: financeSnapshot.feeAmount,
    netAmount: financeSnapshot.netAmount,
    expectedReceiptDate: financeSnapshot.expectedReceiptDate,
    methodImmediateSettlement: financeSnapshot.methodImmediateSettlement,
    settlementDays: financeSnapshot.settlementDays,
    linkedBankAccountName: financeSnapshot.linkedBankAccountName,
    serviceAmount: getServicePrice(vehicle),
    productAmount: getVehicleProductsTotal(vehicle),
    operator: activeSessionUser || "Operador"
  };

  if (existingEntry) {
    Object.assign(existingEntry, payload, { id: existingEntry.id });
    saveCashEntries();
    return existingEntry;
  }

  const entry = {
    id: getNextCashEntryId(),
    ...payload
  };
  cashEntries.unshift(entry);
  saveCashEntries();
  return entry;
}

function upsertOpenPaymentFromVehicle(vehicle, cashEntry, options = {}) {
  const registeredVehicle = findVehicleByPlate(vehicle.plate);
  const client =
    (registeredVehicle?.currentClientId ? getClientById(registeredVehicle.currentClientId) : null) ||
    findClientByPlate(vehicle.plate) ||
    findClientByPhone(vehicle.phone);
  const existingPayment = openPayments.find((payment) => payment.status !== "Baixado" && payment.vehicleId === vehicle.id);
  const value = Number.isFinite(Number(options.value)) ? Number(options.value) : getVehiclePaymentTotal(vehicle);
  const payload = {
    clientId: client?.id || null,
    clientName: client ? getClientDisplayName(client) : vehicle.owner || "Cliente avulso",
    phone: client?.phone || vehicle.phone || "",
    plate: vehicle.plate,
    service: options.service || vehicle.service,
    description: options.description || "",
    value,
    paymentMethod: options.paymentMethod || vehicle.payment || getPreferredPaymentMethodName("service"),
    createdAt: `${formatDateBR(getTodayISO())} ${getCurrentShortTime()}`,
    dueDate: getDefaultOpenPaymentDueDate(),
    status: "Aberto",
    reminderFrequency: "Diário",
    operator: activeSessionUser || "Operador",
    vehicleId: vehicle.id,
    cashEntryId: cashEntry?.id || vehicle.cashEntryId || null,
    partialPayment: Boolean(options.partialPayment),
    paidAmount: Number(options.paidAmount || 0)
  };

  if (existingPayment) {
    Object.assign(existingPayment, payload, { id: existingPayment.id, lastReminderAt: existingPayment.lastReminderAt || "" });
    return existingPayment;
  }

  const openPayment = {
    id: getNextOpenPaymentId(),
    lastReminderAt: "",
    ...payload
  };
  openPayments.unshift(openPayment);
  return openPayment;
}

function getNextCashEntryId() {
  return Math.max(0, ...cashEntries.map((entry) => entry.id || 0)) + 1;
}

function syncCashEntryAfterPatioEdit(vehicle) {
  const entry = cashEntries.find((item) => item.id && item.id === vehicle.cashEntryId);
  if (!entry) return;

  entry.description = `${vehicle.plate} - ${vehicle.service}${getVehicleProductsTotal(vehicle) ? " + produtos" : ""}`;
  entry.method = vehicle.payment;
  entry.value = vehicle.partialPaymentOpen ? Number(vehicle.partialPaidAmount || entry.value || 0) : getVehiclePaymentTotal(vehicle);
  entry.status = vehicle.partialPaymentOpen ? "Confirmado" : vehicle.payment === "Faturado" || vehicle.paymentOpen ? "Pendente" : "Confirmado";
  vehicle.paymentStatus = entry.status;
  vehicle.paymentConfirmed = vehicle.partialPaymentOpen ? false : entry.status === "Confirmado";
  saveCashEntries();
}

function syncBillingAfterPatioEdit(vehicle, previousValue, previousService, previousPayment) {
  const nextValue = getVehiclePaymentTotal(vehicle);
  const hadBilling = previousPayment === "Faturado" && Boolean(vehicle.billing);

  if (previousPayment === "Faturado" && vehicle.payment !== "Faturado") {
    detachVehicleFromBilling(vehicle, previousValue, previousService);
    vehicle.paymentStatus = vehicle.cashEntryId ? vehicle.paymentStatus : "A confirmar";
    return;
  }

  if (vehicle.payment !== "Faturado") return;

  if (!vehicle.billing) {
    if (attachVehicleToOpenInvoice(vehicle)) {
      vehicle.paymentStatus = "Pendente";
      vehicle.paymentConfirmed = false;
    }
    return;
  }

  const invoiceId = vehicle.billing?.invoiceId;
  if (!invoiceId || !hadBilling) return;

  invoiceAmounts[invoiceId] = Math.max(0, (invoiceAmounts[invoiceId] || 0) - previousValue + nextValue);
  const lineItem = findInvoiceLineItemForVehicle(vehicle, invoiceId, previousService);
  if (lineItem) {
    lineItem.service = vehicle.service;
    lineItem.servicesTotal = getServicePrice(vehicle);
    lineItem.productsTotal = getVehicleProductsTotal(vehicle);
    lineItem.productSummary = getVehicleSoldProducts(vehicle).map((item) => item.productName).join(", ");
    lineItem.value = nextValue;
    lineItem.operator = activeSessionUser || lineItem.operator;
  }
  vehicle.paymentStatus = "Pendente";
  vehicle.paymentConfirmed = false;
}

function syncBillingFromVehicleProducts(vehicle) {
  const invoiceId = vehicle.billing?.invoiceId;
  if (!invoiceId) return;
  const lineItem = findInvoiceLineItemForVehicle(vehicle, invoiceId, vehicle.service);
  if (!lineItem) return;
  const previousValue = Number(lineItem.value || 0);
  const nextValue = getVehiclePaymentTotal(vehicle);
  invoiceAmounts[invoiceId] = Math.max(0, (invoiceAmounts[invoiceId] || 0) - previousValue + nextValue);
  lineItem.service = vehicle.service;
  lineItem.servicesTotal = getServicePrice(vehicle);
  lineItem.productsTotal = getVehicleProductsTotal(vehicle);
  lineItem.productSummary = getVehicleSoldProducts(vehicle).map((item) => item.productName).join(", ");
  lineItem.value = nextValue;
  lineItem.operator = activeSessionUser || lineItem.operator;
}

function attachVehicleToOpenInvoice(vehicle) {
  const invoice = getOpenInvoiceForVehicle(vehicle);
  if (!invoice) return false;

  return attachVehicleToInvoice(vehicle, invoice);
}

function attachVehicleToInvoice(vehicle, invoice) {
  const billingClient = billingClients.find((client) => client.id === Number(invoice.clientId));
  if (!billingClient) return false;

  vehicle.billing = {
    clientId: billingClient.id,
    clientName: billingClient.name,
    invoiceId: invoice.id,
    invoiceCode: invoice.code,
    dueDate: invoice.dueDate
  };
  invoiceAmounts[invoice.id] = (invoiceAmounts[invoice.id] || 0) + getVehiclePaymentTotal(vehicle);
  invoiceLineItems.push({
    invoiceId: invoice.id,
    clientId: billingClient.id,
    vehicleId: vehicle.id,
    plate: vehicle.plate,
    service: vehicle.service,
    servicesTotal: getServicePrice(vehicle),
    productsTotal: getVehicleProductsTotal(vehicle),
    productSummary: getVehicleSoldProducts(vehicle).map((item) => item.productName).join(", "),
    value: getVehiclePaymentTotal(vehicle),
    operator: activeSessionUser || "Operador"
  });
  return true;
}

function getOpenInvoiceForVehicle(vehicle) {
  const registryClient = getApprovedBillingClientForEntry(vehicle);
  if (!registryClient) return null;
  return getOpenInvoicesByRegistryClient(registryClient)[0] || null;
}

function detachVehicleFromBilling(vehicle, previousValue, previousService) {
  const invoiceId = vehicle.billing?.invoiceId;
  if (!invoiceId) return;

  const lineIndex = invoiceLineItems.findIndex(
    (item) =>
      item.vehicleId === vehicle.id ||
      (item.invoiceId === invoiceId && item.plate === vehicle.plate && item.service === previousService)
  );
  const lineValue = lineIndex >= 0 ? invoiceLineItems[lineIndex].value : previousValue;
  invoiceAmounts[invoiceId] = Math.max(0, (invoiceAmounts[invoiceId] || 0) - lineValue);
  if (lineIndex >= 0) invoiceLineItems.splice(lineIndex, 1);
  delete vehicle.billing;
}

function findInvoiceLineItemForVehicle(vehicle, invoiceId, previousService) {
  return (
    invoiceLineItems.find((item) => item.vehicleId === vehicle.id) ||
    invoiceLineItems.find((item) => item.invoiceId === invoiceId && item.plate === vehicle.plate && item.service === previousService)
  );
}

function updateVehicleHistoryAfterServiceEdit(vehicle, previousService) {
  const registryVehicle = findVehicleByPlate(vehicle.plate);
  if (!registryVehicle) return;

  const lastService = [...registryVehicle.serviceHistory]
    .reverse()
    .find((item) => item.service === previousService || item.service === vehicle.service);

  if (lastService) {
    lastService.service = vehicle.service;
    lastService.status = statusMeta[vehicle.status]?.label || vehicle.status;
    lastService.value = getVehiclePaymentTotal(vehicle);
    lastService.operator = activeSessionUser || lastService.operator;
    return;
  }

  updateVehicleServiceStatus(vehicle);
}

function refreshCashflowScreen() {
  const view = $("#adminCashflowView");
  if (view && !view.hidden) renderAdminScreen("cashflow");
  const openPaymentsView = $("#adminOpenPaymentsView");
  if (openPaymentsView && !openPaymentsView.hidden) renderAdminScreen("openPayments");
}

function closeStatusDialog() {
  const dialog = $("#statusDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  pendingQuotePatioEntry = null;
  pendingQuotePatioQuoteId = null;
  resetStatusBillingSelection();
}

function confirmScheduledVehicleEntryWithChecklist() {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;
  if (!attachChecklistFromPanel(vehicle, $("#statusOptions"), "scheduledConfirm")) return;
  updateVehicleStatus("aguardando");
}

async function updateVehicleStatus(status) {
  const vehicle = patioVehicles.find((item) => item.id === activeVehicleId);
  if (!vehicle || !statusMeta[status]) return;
  const previousStatus = vehicle.status;
  const wasScheduled = previousStatus === "agendado" && status === "aguardando";
  const wasCanceledSchedule = previousStatus === "agendado" && status === "cancelado";
  const previousValue = getVehiclePaymentTotal(vehicle);
  const previousService = vehicle.service;

  if (["lavando", "pronto"].includes(status)) {
    const careConflictResult = getVehicleCurrentCareConflictResult(vehicle);
    const careContext = status === "lavando" ? "start_service" : "finish_service";
    if (!(await ensureVehicleCareWarningAcknowledged(vehicle, careConflictResult, careContext))) return;
  }

  if (status === "cancelado") {
    if (vehicle.billing) detachVehicleFromBilling(vehicle, previousValue, previousService);
    revertAttendanceProducts(vehicle, `Cancelamento do atendimento ${vehicle.plate}`);
  }

  vehicle.status = status;
  if (wasScheduled) vehicle.entry = getCurrentShortTime();
  updateVehicleServiceStatus(vehicle);
  renderProductsScreen($("#adminProductsContent"));
  renderInventoryScreen($("#adminInventoryContent"));
  renderAdminDashboard();
  renderPatio();
  closeStatusDialog();
  if (wasScheduled) triggerAutomatedMessage("yard-entry", getMessageContextFromVehicle(vehicle));
  else if (wasCanceledSchedule) triggerAutomatedMessage("schedule-canceled", getMessageContextFromVehicle(vehicle));
  else if (status === "cancelado") triggerAutomatedMessage("service-canceled", getMessageContextFromVehicle(vehicle));
  else if (status === "pronto") triggerAutomatedMessage("vehicle-ready", getMessageContextFromVehicle(vehicle));
  showToast(
    wasScheduled
      ? `Entrada de ${vehicle.plate} confirmada.`
      : wasCanceledSchedule
        ? `Agendamento de ${vehicle.plate} cancelado.`
      : `Status de ${vehicle.plate} alterado para ${statusMeta[status].label}.`
  );
}

initIcons();
preloadPdfLogoImage();
startSplashScreen();
bindEvents();
void restoreSupabaseSession();





