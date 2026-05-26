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
  wallet: '<svg viewBox="0 0 24 24"><path d="M4.5 7.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h12"/><path d="M16.5 13.5h4"/><circle cx="16.5" cy="13.5" r=".8"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M12 4l9 16H3L12 4z"/><path d="M12 9v4M12 17h.01"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 19a4 4 0 0 0-8 0"/><circle cx="12" cy="9" r="3"/><path d="M20 18a3.3 3.3 0 0 0-3-3.1"/><path d="M4 18a3.3 3.3 0 0 1 3-3.1"/><path d="M18 8.5a2.2 2.2 0 0 1 .2 4.2"/><path d="M6 8.5a2.2 2.2 0 0 0-.2 4.2"/></svg>',
  badge: '<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8.5 16a3.8 3.8 0 0 1 7 0"/><path d="M9 4V2.8M15 4V2.8"/></svg>',
  service: '<svg viewBox="0 0 24 24"><path d="M14.5 5.5l4 4"/><path d="M13 7l4 4-8.5 8.5H4.5v-4L13 7z"/><path d="M6 15l3 3"/></svg>',
  cashflow: '<svg viewBox="0 0 24 24"><path d="M4 7h11a3 3 0 0 1 0 6H8"/><path d="M8 10l-4 3 4 3"/><path d="M20 17H9a3 3 0 0 1 0-6h7"/><path d="M16 8l4 3-4 3"/></svg>',
  payable: '<svg viewBox="0 0 24 24"><path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M15 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>',
  invoice: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21V3z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  card: '<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M3.5 10h17"/><path d="M7 15h3"/></svg>'
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
let activeSessionUser = "";
let lastOpenInvoiceNoticePlate = "";
let messageDialogResolver = null;
let editedStatusServices = [];
let statusBillingMode = "";
let selectedStatusBillingClientId = "";
let selectedStatusBillingInvoiceId = "";
let vehicleEntryMode = "entry";
let selectedScheduleVehicleId = null;
let pdfLogoImageCache = null;
let pdfLogoImageSourceCache = "";
let pdfLogoImagePromise = null;

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
const paymentMethods = ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro", "Transferência", "Faturado"];
const checklistUnverifiedCondition = "Não Verificado";
const checklistConditions = ["Conforme", "Arranhado", "Amassado", "Quebrado", "Faltando", "Não Aplicável"];
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
const businessStorageKeys = {
  profile: "lavaprime-business-profile-v1",
  bankAccounts: "lavaprime-business-bank-accounts-v1",
  pix: "lavaprime-business-pix-v1",
  social: "lavaprime-business-social-v1"
};
const businessSocialChannels = [
  { key: "whatsapp", label: "WhatsApp", placeholder: "(11) 99999-9999" },
  { key: "instagram", label: "Instagram", placeholder: "@perfil" },
  { key: "tiktok", label: "TikTok", placeholder: "@perfil" },
  { key: "facebook", label: "Facebook", placeholder: "facebook.com/perfil" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/company/perfil" },
  { key: "site", label: "Site", placeholder: "https://site.com.br" }
];
let businessProfile = loadBusinessStorageItem(businessStorageKeys.profile, getDefaultBusinessProfile());
let businessBankAccounts = loadBusinessStorageItem(businessStorageKeys.bankAccounts, []);
let businessPixInfo = loadBusinessStorageItem(businessStorageKeys.pix, getDefaultBusinessPixInfo());
let businessSocialLinks = loadBusinessStorageItem(businessStorageKeys.social, getDefaultBusinessSocialLinks());

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
      { date: "2026-05-22", services: 6, revenue: 520, attendance: "Presente" },
      { date: "2026-05-21", services: 7, revenue: 610, attendance: "Presente" }
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
      { date: "2026-05-22", services: 4, revenue: 460, attendance: "Presente" },
      { date: "2026-05-20", services: 5, revenue: 530, attendance: "Presente" }
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
      { date: "2026-05-22", services: 2, revenue: 180, attendance: "Presente" },
      { date: "2026-05-19", services: 3, revenue: 260, attendance: "Presente" }
    ]
  }
];

const serviceCatalog = [
  { name: "Lavagem Prime", price: 65, duration: "35 min", vehicleType: "Carro", vehicleCategory: "Hatch", status: "Ativo" },
  { name: "Higienização interna", price: 140, duration: "1h20", vehicleType: "Carro", vehicleCategory: "Sedan", status: "Ativo" },
  { name: "Detailing completo", price: 320, duration: "3h00", vehicleType: "Carro", vehicleCategory: "SUV", status: "Ativo" },
  { name: "Vitrificação", price: 490, duration: "4h00", vehicleType: "Caminhonete", vehicleCategory: "Picape", status: "Ativo" }
];

const vehicleTypes = ["Carro", "Moto", "Caminhonete", "Van", "Utilitário"];
const vehicleCategories = ["Hatch", "Sedan", "SUV", "Picape", "Executivo", "Comercial", "Outro"];

const cashflowCategories = ["Serviços", "Insumos", "Faturamento", "Taxas", "Manutenção", "Outros"];
const cashflowCostCenters = ["Unidade principal", "Lavagem", "Estética", "Administrativo", "Financeiro"];

const cashEntries = [
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

const payableAccounts = [
  { supplier: "CleanPro Distribuidora", category: "Insumos", dueDate: "2026-05-20", value: 420, status: "A vencer" },
  { supplier: "Energia", category: "Operacional", dueDate: "2026-05-22", value: 310, status: "A vencer" },
  { supplier: "Aluguel do ponto", category: "Fixo", dueDate: "2026-05-10", value: 1800, status: "Pago" }
];

const walletMethods = [
  { name: "Pix", type: "Conta principal", balance: 1840, settlement: "Imediato", status: "Ativa" },
  { name: "Cartão de crédito", type: "Maquininha", balance: 1260, settlement: "D+30", status: "Ativa" },
  { name: "Cartão de débito", type: "Maquininha", balance: 520, settlement: "D+1", status: "Ativa" },
  { name: "Dinheiro", type: "Caixa físico", balance: 210, settlement: "Manual", status: "Ativa" }
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

function confirmLogin() {
  const user = $("#loginUser").value.trim();
  const password = $("#loginPassword").value.trim();

  if (!user || !password) {
    showToast("Preencha Usuario e Senha para continuar.");
    return;
  }

  if (!selectedProfile) {
    showToast("Escolha Administrador ou Operador para continuar.");
    return;
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
  $$(".profile-button").forEach((button) => {
    button.addEventListener("click", () => selectProfile(button));
  });

  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    confirmLogin();
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
    window.setTimeout(focusVehicleForm, 0);
  });
  $("#startOperatorFormButton").addEventListener("click", () => {
    showAdminView("operators");
    window.setTimeout(() => openOperatorDialog(), 0);
  });
  $("#startServiceFormButton").addEventListener("click", () => {
    showAdminView("services");
    window.setTimeout(() => openServiceDialog(), 0);
  });
  $$("[data-admin-view]").forEach((button) => {
    button.addEventListener("click", () => showAdminView(button.dataset.adminView));
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
  $("#vehicleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    handleVehicleEntrySubmit();
  });
  $("#vehiclePayment").addEventListener("change", () => {
    updatePaymentAction();
    renderActiveVehicleChecklist();
  });
  $$(".color-swatch").forEach((button) => {
    button.addEventListener("click", () => selectVehicleColor(button));
  });
  $("#vehiclePlate").addEventListener("input", (event) => {
    event.currentTarget.value = formatPlate(event.currentTarget.value);
    handleEntryPlateLookup(event.currentTarget.value);
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
  $("#newBillingClientButton").addEventListener("click", handleNewBillingClientFromEntry);
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
  $$("[data-admin-view]").forEach((button) => {
    const isActive = button.dataset.adminView === view;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  $$(".admin-view").forEach((section) => {
    const isActive = section.id === `admin${capitalize(view)}View`;
    section.hidden = !isActive;
    section.classList.toggle("is-active", isActive);
  });

  if (view === "dashboard") renderAdminDashboard();
  if (view === "patio") renderPatio();
  if (!["dashboard", "patio"].includes(view)) renderAdminScreen(view);
}

function returnToLogin() {
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
  const dialog = $("#vehicleDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  $("#vehiclePlate").focus();
}

function closeVehicleDialog() {
  const dialog = $("#vehicleDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  resetVehicleForm();
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
              ${paymentMethods.map((method) => `<option value="${escapeHtml(method)}">${escapeHtml(method)}</option>`).join("")}
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
    model: registryVehicle.model || registryVehicle.brand || "Veículo",
    color: registryVehicle.color || "Não informada",
    type: registryVehicle.type || "",
    category: registryVehicle.category || "",
    owner: client ? getClientDisplayName(client) : "Cliente não vinculado",
    phone: client?.phone || "",
    services,
    service: formatServices(services),
    payment: options.payment || "A definir",
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
  renderScheduleTimeOptions();
  updateVehicleEntryCategoryState();
  renderVehicleServiceOptions();
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
  return $("#vehicleType")?.value || pendingVehicle?.type || "Carro";
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
  const toggle = $("#vehicleScheduleToggle");
  if (toggle) toggle.checked = isSchedule;
  $("#vehicleDialogEyebrow").textContent = isSchedule ? "Agendamento" : "Entrada no pátio";
  $("#vehicleDialogTitle").textContent = isSchedule ? "Novo veículo para agendamento" : "Novo veículo";
  $("#vehicleEntryStepCopy").textContent = "Dados do veículo";

  setScheduleDateMin("#vehicleScheduleDate");
  renderScheduleTimeOptions();
}

function handleVehicleScheduleToggle(event) {
  vehicleEntryMode = event.currentTarget.checked ? "schedule" : "entry";
  pendingVehicle = null;
  updateVehicleDialogMode();
  updatePaymentAction();

  const activeStep = $(".vehicle-step.is-active")?.dataset.vehicleStep;
  if (activeStep === "schedule" && vehicleEntryMode === "entry") {
    showVehicleStep("client");
  }
}

function getEntryServiceOptions() {
  const vehicleType = $("#vehicleType")?.value || "";
  const vehicleCategory = $("#vehicleCategory")?.value || "";
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
}

function goToVehicleClientStep() {
  const requiredFields = ["#vehiclePlate", "#vehicleModel", "#vehicleType"].concat(
    shouldUseVehicleCategory($("#vehicleType").value) ? ["#vehicleCategory"] : []
  );
  const isValid = requiredFields.every((selector) => $(selector).reportValidity());
  if (!isValid) return;

  if (!getSelectedEntryServices().length) {
    showToast("Selecione ao menos um serviço contratado.");
    return;
  }

  showVehicleStep("client");
  $("#vehiclePhone").focus();
}

async function handleVehicleEntrySubmit() {
  const form = $("#vehicleForm");
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const vehicle = buildVehicleFromForm(data, { requireSchedule: false });
  if (!vehicle) return;

  if (vehicle.payment !== "Faturado" && vehicleEntryMode !== "schedule" && !attachChecklistFromPanel(vehicle, form, "vehicleClient")) {
    return;
  }

  const ownershipReady = await resolveEntryOwnership(vehicle);
  if (!ownershipReady) return;

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
  const isSchedule = vehicleEntryMode === "schedule";
  const scheduledDate = String(data.get("scheduleDate") || "").trim();
  const scheduledTime = String(data.get("scheduleTime") || "").trim();
  const selectedColor = String(data.get("color")).trim();
  const otherColor = String(data.get("otherColor")).trim();
  const color = selectedColor === "Outra" ? otherColor : selectedColor;
  const services = data.getAll("services").map((service) => String(service).trim()).filter(Boolean);

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

  return {
    id: getNextPatioVehicleId(),
    plate: String(data.get("plate")).trim().toUpperCase(),
    model: String(data.get("model")).trim(),
    color,
    type: String(data.get("type")).trim(),
    category: getVehicleCategoryValue(String(data.get("type")).trim(), String(data.get("category")).trim()),
    owner: String(data.get("owner")).trim(),
    phone: String(data.get("phone")).trim(),
    services,
    service: formatServices(services),
    payment: String(data.get("payment")).trim(),
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

function handleEntryPlateLookup(plateValue) {
  const plate = formatPlate(plateValue);
  const list = $("#vehiclePlateResults");
  if (!list) return;

  if (!plate) {
    clearEntryPlateResults();
    return;
  }

  const matches = vehicleRegistry.filter((vehicle) => vehicle.plate.startsWith(plate)).slice(0, 6);
  if (!matches.length) {
    clearEntryPlateResults();
    return;
  }

  list.hidden = false;
  list.innerHTML = matches.map(renderEntryVehicleOption).join("");
  $$("[data-entry-vehicle-id]", list).forEach((button) => {
    button.addEventListener("click", () => selectEntryVehicle(Number(button.dataset.entryVehicleId)));
  });
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

function selectEntryVehicle(vehicleId) {
  const vehicle = findVehicleById(vehicleId);
  if (!vehicle) return;

  $("#vehiclePlate").value = vehicle.plate;
  clearEntryPlateResults();
  fillEntryFromVehicle(vehicle);
  notifyOpenInvoicesForVehicle(vehicle);
}

function clearEntryPlateResults() {
  const list = $("#vehiclePlateResults");
  if (!list) return;
  list.innerHTML = "";
  list.hidden = true;
}

function fillEntryFromVehicle(vehicle) {
  $("#vehicleModel").value = vehicle.model || $("#vehicleModel").value;
  if (vehicle.color) setEntryVehicleColor(vehicle.color);
  if (vehicle.type && vehicleTypes.includes(vehicle.type)) $("#vehicleType").value = vehicle.type;
  if (vehicle.category && vehicleCategories.includes(vehicle.category)) $("#vehicleCategory").value = vehicle.category;
  updateVehicleEntryCategoryState();
  renderVehicleServiceOptions();

  const client = vehicle.currentClientId ? getClientById(vehicle.currentClientId) : findClientByPlate(vehicle.plate);
  if (!client) return;
  fillEntryOwnerFromClient(client);
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
  syncVehicleFromPatioEntry(vehicle);
  closeVehicleDialog();
  renderPatio();
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
  selectedBillingClientId = "";
  selectedBillingInvoiceId = "";
  lastOpenInvoiceNoticePlate = "";
  vehicleEntryMode = "entry";
  clearEntryPlateResults();
  resetVehicleColor();
  updateVehicleDialogMode();
  showVehicleStep("entry");
  updatePaymentAction();
  clearBillingSubforms();
}

function updatePaymentAction() {
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
  const select = $("#billingClientSelect");
  const approvedClients = billingClients.filter((client) => isBillingClientApproved(client.id));
  select.innerHTML = [
    '<option value="">Selecione o cliente</option>',
    ...approvedClients.map((client) => `<option value="${client.id}">${client.name}</option>`)
  ].join("");
  select.value = selectedBillingClientId;
}

function renderInvoiceSelect() {
  const select = $("#billingInvoiceSelect");
  const invoices = billingInvoices.filter((invoice) => String(invoice.clientId) === String(selectedBillingClientId));
  const emptyLabel = selectedBillingClientId ? "Selecione a fatura" : "Selecione o cliente primeiro";
  select.innerHTML = [`<option value="">${emptyLabel}</option>`]
    .concat(
      invoices.map(
        (invoice) => `<option value="${invoice.id}">${invoice.code} - vence ${formatDateBR(invoice.dueDate)}</option>`
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
    email: "",
    address: "",
    logoDataUrl: ""
  };
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

function getDefaultBusinessSocialLinks() {
  return businessSocialChannels.reduce((links, channel) => {
    links[channel.key] = { value: "", showInFooter: false };
    return links;
  }, {});
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
  } catch (error) {
    showToast("Não foi possível salvar no navegador.");
  }
}

function getBusinessDocumentName() {
  const preferred = businessProfile.displayNameMode === "legalName" ? businessProfile.legalName : businessProfile.tradeName;
  return preferred || businessProfile.tradeName || businessProfile.legalName || "LavaPrime";
}

function getBusinessDocumentContactLine() {
  return [businessProfile.cnpj, businessProfile.phone, businessProfile.email, businessProfile.address].filter(Boolean).join(" | ");
}

function getBusinessDocumentFooterDetails() {
  return businessSocialChannels
    .map((channel) => {
      const item = businessSocialLinks[channel.key];
      return item?.showInFooter && item.value ? `${channel.label}: ${item.value}` : "";
    })
    .filter(Boolean)
    .join(" | ");
}

function shouldAddInvoicePaymentData(document) {
  return normalizeText(`${document.title} ${document.category}`).includes("fatura") && getBusinessInvoicePaymentLines().length > 0;
}

function getBusinessInvoicePaymentLines() {
  const bankLines = businessBankAccounts
    .filter((account) => account.showInInvoices)
    .map(
      (account) =>
        `${account.bank} - ${account.type} - Agencia ${account.agency} - Conta ${account.account} - Titular ${account.holder || getBusinessDocumentName()}`
    );
  const hasValidPixQr = isValidPixCopyPastePayload(businessPixInfo.qrPayload);
  const pixLines =
    businessPixInfo.showInInvoices && (businessPixInfo.key || hasValidPixQr)
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

function countByStatus(status) {
  if (status === "finalizado") return patioVehicles.filter((vehicle) => isFinalizedStatus(vehicle.status)).length;
  return patioVehicles.filter((vehicle) => vehicle.status === status).length;
}

function isFinalizedStatus(status) {
  return ["finalizado", "cancelado"].includes(status);
}

function renderAdminDashboard() {
  const metricsContainer = $("#adminMetrics");
  const flowContainer = $("#adminStatusFlow");
  const alertsContainer = $("#adminAlerts");
  if (!metricsContainer || !flowContainer || !alertsContainer) return;

  const activeVehicles = patioVehicles.filter((vehicle) =>
    ["aguardando", "lavando", "pronto"].includes(vehicle.status)
  );
  const expectedRevenue = activeVehicles.reduce((total, vehicle) => total + getVehiclePaymentTotal(vehicle), 0);
  const billedOpen = patioVehicles
    .filter((vehicle) => vehicle.payment === "Faturado" && !isFinalizedStatus(vehicle.status))
    .reduce((total, vehicle) => total + getVehiclePaymentTotal(vehicle), 0);

  const metrics = [
    { label: "Receita prevista", value: formatCurrency(expectedRevenue), icon: "wallet" },
    { label: "Veículos no pátio", value: activeVehicles.length, icon: "carFront" },
    { label: "Agendados", value: countByStatus("agendado"), icon: "hourglass" },
    { label: "Em Serviço", value: countByStatus("lavando"), icon: "drop" },
    { label: "Prontos", value: countByStatus("pronto"), icon: "sparkle" },
    { label: "Finalizados", value: countByStatus("finalizado"), icon: "check" },
    { label: "Faturado aberto", value: formatCurrency(billedOpen), icon: "wallet" }
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
}

function renderAdminAlerts(billedOpen) {
  const scheduledCashDue = getCashflowScheduledDueToday();
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
    countByStatus("finalizado") ? `${countByStatus("finalizado")} atendimento(s) em Finalizados.` : ""
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

  if (view === "operators") {
    renderOperatorsScreen(container);
    return;
  }

  if (view === "services") {
    renderServicesScreen(container);
    return;
  }

  if (view === "cashflow") {
    renderCashflowScreen(container);
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

function renderBusinessScreen(container) {
  const displayName = getBusinessDocumentName();
  const completeness = getBusinessProfileCompleteness();
  const logoSource = businessProfile.logoDataUrl || "./assets/brand/lavaprime-lockup.png";

  container.innerHTML = `
    <section class="screen-metrics business-metrics" aria-label="Resumo do negócio">
      ${[
        { label: "Cadastro", value: `${completeness}%`, icon: "shield" },
        { label: "Nome em documentos", value: displayName, icon: "invoice" },
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
          <label class="login-field" for="businessCnpj">
            <span>CNPJ</span>
            <input id="businessCnpj" type="text" value="${escapeHtml(businessProfile.cnpj)}" placeholder="00.000.000/0000-00" />
          </label>
          <label class="login-field" for="businessLegalName">
            <span>Razão Social</span>
            <input id="businessLegalName" type="text" value="${escapeHtml(businessProfile.legalName)}" placeholder="Razão social" />
          </label>
          <label class="login-field" for="businessTradeName">
            <span>Nome Fantasia</span>
            <input id="businessTradeName" type="text" value="${escapeHtml(businessProfile.tradeName)}" placeholder="Nome fantasia" />
          </label>
          <label class="login-field" for="businessDisplayNameMode">
            <span>Exibir nos documentos</span>
            <select id="businessDisplayNameMode">
              <option value="tradeName" ${businessProfile.displayNameMode === "tradeName" ? "selected" : ""}>Nome Fantasia</option>
              <option value="legalName" ${businessProfile.displayNameMode === "legalName" ? "selected" : ""}>Razão Social</option>
            </select>
          </label>
          <label class="login-field" for="businessPhone">
            <span>Telefone de contato</span>
            <input id="businessPhone" type="text" value="${escapeHtml(businessProfile.phone)}" placeholder="(11) 99999-9999" />
          </label>
          <label class="login-field" for="businessEmail">
            <span>E-mail</span>
            <input id="businessEmail" type="email" value="${escapeHtml(businessProfile.email || "")}" placeholder="contato@empresa.com.br" />
          </label>
          <label class="login-field business-address-field" for="businessAddress">
            <span>Endereço</span>
            <textarea id="businessAddress" rows="3" placeholder="Rua, número, bairro, cidade">${escapeHtml(businessProfile.address)}</textarea>
          </label>
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
        <div class="business-logo-preview">
          <img src="${escapeHtml(logoSource)}" alt="Logomarca do negócio" />
        </div>
        <label class="login-field" for="businessLogoFile">
          <span>Arquivo PNG ou JPG</span>
          <input id="businessLogoFile" type="file" accept="image/png,image/jpeg" />
        </label>
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
  $("#businessProfileForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    businessProfile = getBusinessProfileFormValues(container);
    saveBusinessStorageItem(businessStorageKeys.profile, businessProfile);
    resetPdfLogoCache();
    renderBusinessScreen(container);
    showToast("Dados do negócio salvos.");
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
  return {
    ...businessProfile,
    cnpj: $("#businessCnpj", container).value.trim(),
    legalName: $("#businessLegalName", container).value.trim(),
    tradeName: $("#businessTradeName", container).value.trim(),
    displayNameMode: $("#businessDisplayNameMode", container).value,
    phone: $("#businessPhone", container).value.trim(),
    email: $("#businessEmail", container).value.trim(),
    address: $("#businessAddress", container).value.trim()
  };
}

function renderBusinessFinanceScreen(container) {
  const visibleAccounts = businessBankAccounts.filter((account) => account.showInInvoices).length;
  container.innerHTML = `
    <section class="screen-metrics business-metrics" aria-label="Resumo financeiro do negócio">
      ${[
        { label: "Contas cadastradas", value: businessBankAccounts.length, icon: "wallet" },
        { label: "Exibir em faturas", value: visibleAccounts, icon: "invoice" },
        { label: "Pix", value: businessPixInfo.key ? "Configurado" : "Pendente", icon: "cashflow" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="business-two-column-grid">
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
        </form>
        ${renderBusinessPixQr()}
      </article>
    </section>
  `;

  initIcons();
  bindBusinessFinanceControls(container);
}

function renderBusinessBankAccounts() {
  if (!businessBankAccounts.length) return '<p class="empty-alert">Nenhuma conta bancária cadastrada.</p>';
  return businessBankAccounts
    .map(
      (account) => `
        <article class="business-account-card">
          <div>
            <strong>${escapeHtml(account.bank)}</strong>
            <p>${escapeHtml(account.type)} / Agência ${escapeHtml(account.agency)} / Conta ${escapeHtml(account.account)}</p>
            <span>${escapeHtml(account.holder || getBusinessDocumentName())}</span>
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
      `
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

function bindBusinessFinanceControls(container) {
  $("#businessBankAccountForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    const bank = $("#businessBankName", container).value.trim();
    const agency = $("#businessBankAgency", container).value.trim();
    const account = $("#businessBankAccount", container).value.trim();
    if (!bank || !agency || !account) {
      showToast("Informe banco, agência e conta.");
      return;
    }
    businessBankAccounts.push({
      id: getNextBusinessBankAccountId(),
      bank,
      type: $("#businessBankType", container).value,
      agency,
      account,
      holder: $("#businessBankHolder", container).value.trim(),
      showInInvoices: $("#businessBankShowInvoices", container).checked
    });
    saveBusinessStorageItem(businessStorageKeys.bankAccounts, businessBankAccounts);
    renderBusinessFinanceScreen(container);
    showToast("Conta bancária cadastrada.");
  });

  $("#businessPixForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    saveBusinessPixInfo(container, false);
  });
  $("#generatePixQrButton", container).addEventListener("click", () => saveBusinessPixInfo(container, true));
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
      businessBankAccounts = businessBankAccounts.filter((account) => account.id !== Number(button.dataset.deleteBusinessAccount));
      saveBusinessStorageItem(businessStorageKeys.bankAccounts, businessBankAccounts);
      renderBusinessFinanceScreen(container);
      showToast("Conta bancária removida.");
    });
  });
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

  businessPixInfo = nextPixInfo;
  saveBusinessStorageItem(businessStorageKeys.pix, businessPixInfo);
  renderBusinessFinanceScreen(container);
  showToast(shouldGenerateQr ? "QR Code Pix gerado." : "Informações Pix salvas.");
}

function renderBusinessSocialScreen(container) {
  const visibleChannels = businessSocialChannels.filter((channel) => businessSocialLinks[channel.key]?.showInFooter).length;
  container.innerHTML = `
    <section class="screen-metrics business-metrics" aria-label="Resumo de comunicação">
      ${[
        { label: "Canais", value: businessSocialChannels.length, icon: "users" },
        { label: "No rodapé", value: visibleChannels, icon: "invoice" },
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
            const item = businessSocialLinks[channel.key] || { value: "", showInFooter: false };
            return `
              <section class="business-social-card">
                <label class="login-field" for="businessSocial${capitalize(channel.key)}">
                  <span>${escapeHtml(channel.label)}</span>
                  <input id="businessSocial${capitalize(channel.key)}" data-social-value="${channel.key}" type="text" value="${escapeHtml(item.value)}" placeholder="${escapeHtml(channel.placeholder)}" />
                </label>
                <label class="switch-field" for="businessSocialShow${capitalize(channel.key)}">
                  <input id="businessSocialShow${capitalize(channel.key)}" data-social-footer="${channel.key}" type="checkbox" ${item.showInFooter ? "checked" : ""} />
                  <span class="switch-control"></span>
                  <span>Exibir no rodapé</span>
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
  $("#businessSocialForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    businessSocialChannels.forEach((channel) => {
      businessSocialLinks[channel.key] = {
        value: $(`[data-social-value="${channel.key}"]`, container).value.trim(),
        showInFooter: $(`[data-social-footer="${channel.key}"]`, container).checked
      };
    });
    saveBusinessStorageItem(businessStorageKeys.social, businessSocialLinks);
    renderBusinessSocialScreen(container);
    showToast("Comunicação salva.");
  });
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

function bindClientsScreenControls(container) {
  $("#clientSearchInput", container).addEventListener("input", () => applyClientTableFilter(container));
  $$("[data-edit-client]", container).forEach((button) => {
    button.addEventListener("click", () => editClientRegistration(container, Number(button.dataset.editClient)));
  });
  $$("[data-client-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-client-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyClientTableFilter(container);
    });
  });
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

  const existingClient = findClientByPlate(plate);
  if (existingClient && existingClient.id !== selectedClientId) {
    showToast(`${plate} já está vinculada a ${getClientDisplayName(existingClient)}.`);
    input.focus();
    return;
  }

  pendingClientPlates.push(plate);
  input.value = "";
  renderClientPlateTags(container);
  input.focus();
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
      brand: "",
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
  const selectedVehicle = selectedVehicleId ? findVehicleById(selectedVehicleId) : null;
  const historyVehicle = selectedVehicle || vehicleRegistry[0] || null;

  container.innerHTML = `
    <section class="screen-metrics vehicle-metrics" aria-label="Resumo de veículos">
      ${[
        { label: "Veículos cadastrados", value: vehicleRegistry.length, icon: "carFront" },
        { label: "Vinculados a cliente", value: vehicleRegistry.filter((vehicle) => vehicle.currentClientId).length, icon: "users" },
        { label: "Com histórico", value: vehicleRegistry.filter((vehicle) => vehicle.serviceHistory.length).length, icon: "service" },
        { label: "No pátio hoje", value: getActivePatioPlates().length, icon: "clock" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="vehicle-registry-grid">
      <form class="admin-panel vehicle-registry-form" id="vehicleRegistryForm" novalidate>
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${selectedVehicle ? "Edição" : "Cadastro"}</p>
            <h2>${selectedVehicle ? selectedVehicle.plate : "Ficha do veículo"}</h2>
          </div>
          <span class="client-status-label">${selectedVehicle ? "Editando" : "Novo"}</span>
        </div>

        <div class="vehicle-form-grid client-form-grid">
          <label class="login-field" for="vehicleRegistryPlate">
            <span>Placa</span>
            <input
              id="vehicleRegistryPlate"
              type="text"
              placeholder="ABC1D23"
              maxlength="8"
              value="${escapeHtml(selectedVehicle?.plate || "")}"
              ${selectedVehicle ? "disabled" : ""}
              required
            />
          </label>
          <label class="login-field" for="vehicleRegistryBrand">
            <span>Marca</span>
            <input id="vehicleRegistryBrand" type="text" placeholder="Chevrolet" value="${escapeHtml(selectedVehicle?.brand || "")}" />
          </label>
          <label class="login-field" for="vehicleRegistryModel">
            <span>Modelo</span>
            <input id="vehicleRegistryModel" type="text" placeholder="Onix" value="${escapeHtml(selectedVehicle?.model || "")}" required />
          </label>
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
          <label class="login-field" for="vehicleRegistryClient">
            <span>Proprietário atual</span>
            <select id="vehicleRegistryClient">
              ${renderVehicleOwnerOptions(selectedVehicle?.currentClientId || "")}
            </select>
          </label>
          <label class="login-field vehicle-notes-field" for="vehicleRegistryNotes">
            <span>Observações do veículo</span>
            <input id="vehicleRegistryNotes" type="text" placeholder="Preferências, restrições, histórico relevante" value="${escapeHtml(selectedVehicle?.notes || "")}" />
          </label>
        </div>

        <div class="dialog-actions">
          <button class="exit-button" id="clearVehicleRegistryButton" type="button">Limpar</button>
          <button class="primary-button" type="submit">
            <span data-icon="check"></span>
            <span>${selectedVehicle ? "Atualizar veículo" : "Salvar veículo"}</span>
          </button>
        </div>
      </form>

      <article class="admin-panel vehicle-history-panel" id="vehicleHistoryPanel">
        ${renderVehicleHistoryPanel(historyVehicle)}
      </article>
    </section>

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

function bindVehiclesScreenControls(container) {
  updateVehicleRegistryCategoryState(container);
  $("#vehicleRegistryType", container).addEventListener("change", () => updateVehicleRegistryCategoryState(container));
  $("#vehicleRegistryPlate", container)?.addEventListener("input", (event) => {
    event.currentTarget.value = formatPlate(event.currentTarget.value);
  });
  $("#vehicleRegistryYear", container).addEventListener("input", (event) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 4);
  });
  $("#vehicleRegistryForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    saveVehicleRegistration(container);
  });
  $("#clearVehicleRegistryButton", container).addEventListener("click", () => {
    selectedVehicleId = null;
    renderVehiclesScreen(container);
    focusVehicleForm();
  });
  $("#vehicleSearchInput", container).addEventListener("input", () => applyVehicleTableFilter(container));
  $$("[data-vehicle-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-vehicle-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyVehicleTableFilter(container);
    });
  });
  $$("[data-edit-vehicle]", container).forEach((button) => {
    button.addEventListener("click", () => {
      selectedVehicleId = Number(button.dataset.editVehicle);
      renderVehiclesScreen(container);
      focusVehicleForm();
    });
  });
  $$("[data-history-vehicle]", container).forEach((button) => {
    button.addEventListener("click", () => {
      selectedVehicleId = Number(button.dataset.historyVehicle);
      renderVehiclesScreen(container);
      $("#vehicleHistoryPanel", container)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
  $$("[data-checklist-pdf]", container).forEach((button) => {
    button.addEventListener("click", () => generateChecklistPdf(Number(button.dataset.checklistVehicle), button.dataset.checklistPdf));
  });
}

function saveVehicleRegistration(container) {
  const form = $("#vehicleRegistryForm", container);
  if (!form.reportValidity()) return;

  const selectedVehicle = selectedVehicleId ? findVehicleById(selectedVehicleId) : null;
  const plate = selectedVehicle ? selectedVehicle.plate : formatPlate($("#vehicleRegistryPlate", container).value);
  if (!plate) {
    showToast("Informe a placa do veículo.");
    $("#vehicleRegistryPlate", container).focus();
    return;
  }

  const duplicate = vehicleRegistry.find((vehicle) => vehicle.plate === plate && vehicle.id !== selectedVehicleId);
  if (duplicate) {
    selectedVehicleId = duplicate.id;
    renderVehiclesScreen(container);
    showToast(`${plate} já está cadastrada. Ficha aberta para edição.`);
    return;
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

  selectedVehicleId = vehicle.id;
  renderVehiclesScreen(container);
  renderAdminDashboard();
  showToast(`${vehicle.plate} salvo no cadastro de veículos.`);
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
  return (vehicle.serviceHistory?.length || 0) + (vehicle.checklistHistory?.length || 0);
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

  const checklistItems = vehicle.checklistHistory?.length
    ? vehicle.checklistHistory
        .slice()
        .reverse()
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
      <h3>Check-lists em PDF</h3>
      ${checklistItems}
    </div>
    <div class="history-section">
      <h3>Proprietários</h3>
      ${ownerItems}
    </div>
  `;
}

function generateChecklistPdf(vehicleId, checklistId) {
  const vehicle = findVehicleById(vehicleId);
  const checklist = vehicle?.checklistHistory?.find((item) => item.id === checklistId);
  if (!vehicle || !checklist) {
    showToast("Check-list não localizado no histórico do veículo.");
    return;
  }

  downloadPdfFile(checklist.pdfName || `checklist-${vehicle.plate}.pdf`, "CHECK-LIST VEICULAR", getChecklistPdfLines(vehicle, checklist));
  showToast("Check-list em PDF gerado.");
}

function getChecklistPdfLines(vehicle, checklist) {
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

  Object.entries(groupedItems).forEach(([area, items]) => {
    lines.push(area);
    items.forEach((item) => {
      lines.push(`- ${item.part}: ${item.condition || checklistUnverifiedCondition}`);
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

function renderVehicleOwnerOptions(selectedClientId) {
  return [
    `<option value="">Sem cliente vinculado</option>`,
    ...clientRegistry.map((client) => {
      const value = String(client.id);
      return `<option value="${value}" ${String(selectedClientId) === value ? "selected" : ""}>${escapeHtml(getClientDisplayName(client))}</option>`;
    })
  ].join("");
}

function renderSelectOptions(options, selectedValue) {
  return options
    .map((option) => `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(option)}</option>`)
    .join("");
}

function focusVehicleForm() {
  const input = $("#adminVehiclesView:not([hidden]) #vehicleRegistryPlate:not([disabled]), #adminVehiclesView:not([hidden]) #vehicleRegistryBrand");
  if (input) input.focus();
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
      brand: "",
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
}

function updateVehicleServiceStatus(patioVehicle) {
  const vehicle = findVehicleByPlate(patioVehicle.plate);
  if (!vehicle) return;

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

  registryVehicle.checklistHistory = registryVehicle.checklistHistory || [];
  const completedAt = patioVehicle.checklist.completedAt || new Date().toISOString();
  const checklistId = patioVehicle.checklist.id || `CHK-${patioVehicle.id}-${Date.parse(completedAt) || Date.now()}`;
  patioVehicle.checklist.id = checklistId;

  const record = {
    ...patioVehicle.checklist,
    id: checklistId,
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

  const existingIndex = registryVehicle.checklistHistory.findIndex((item) => item.id === checklistId);
  if (existingIndex >= 0) registryVehicle.checklistHistory[existingIndex] = record;
  else registryVehicle.checklistHistory.push(record);
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

function renderOperatorsScreen(container) {
  const selectedOperator = selectedOperatorId ? findOperatorById(selectedOperatorId) : null;
  const referenceOperator = selectedOperator || adminOperators[0] || null;

  container.innerHTML = `
    <section class="screen-metrics operator-metrics" aria-label="Resumo de operadores">
      ${[
        { label: "Operadores ativos", value: adminOperators.filter((operator) => operator.status === "Ativo").length, icon: "badge" },
        { label: "Administradores", value: adminOperators.filter((operator) => operator.accessProfile === "Administrador").length, icon: "shield" },
        { label: "Serviços hoje", value: adminOperators.reduce((total, operator) => total + operator.today, 0), icon: "service" },
        { label: "Comissão prevista", value: formatCurrency(getOperatorsCommissionTotal()), icon: "wallet" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="operator-registration-grid">
      <form class="admin-panel operator-form-panel" id="operatorForm" novalidate>
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${selectedOperator ? "Edição" : "Cadastro"}</p>
            <h2>${selectedOperator ? selectedOperator.name : "Ficha do operador"}</h2>
          </div>
          <span class="client-status-label">${selectedOperator ? "Editando" : "Novo"}</span>
        </div>

        <div class="vehicle-form-grid operator-form-grid">
          <label class="login-field" for="operatorName">
            <span>Nome</span>
            <input id="operatorName" type="text" placeholder="Nome completo" value="${escapeHtml(selectedOperator?.name || "")}" required />
          </label>
          <label class="login-field" for="operatorCpf">
            <span>CPF</span>
            <input id="operatorCpf" type="text" inputmode="numeric" placeholder="000.000.000-00" maxlength="14" value="${escapeHtml(selectedOperator?.cpf || "")}" required />
          </label>
          <label class="login-field" for="operatorPhone">
            <span>Telefone</span>
            <input id="operatorPhone" type="tel" inputmode="tel" placeholder="(11) 99999-9999" maxlength="15" value="${escapeHtml(selectedOperator?.phone || "")}" required />
          </label>
          <label class="login-field" for="operatorAccessProfile">
            <span>Perfil de acesso</span>
            <select id="operatorAccessProfile" required>
              ${renderSelectOptions(["Operador", "Administrador"], selectedOperator?.accessProfile || "Operador")}
            </select>
          </label>
          <label class="login-field" for="operatorRole">
            <span>Função</span>
            <input id="operatorRole" type="text" placeholder="Ex.: Lavagem e acabamento" value="${escapeHtml(selectedOperator?.role || "")}" />
          </label>
          <label class="login-field" for="operatorShift">
            <span>Turno</span>
            <input id="operatorShift" type="text" placeholder="08:00 - 17:00" value="${escapeHtml(selectedOperator?.shift || "")}" />
          </label>
          <label class="login-field" for="operatorUsername">
            <span>Login</span>
            <input id="operatorUsername" type="text" placeholder="usuario.sistema" value="${escapeHtml(selectedOperator?.username || "")}" autocomplete="off" required />
          </label>
          <label class="login-field" for="operatorPassword">
            <span>Senha</span>
            <input id="operatorPassword" type="text" placeholder="Senha de acesso" value="${escapeHtml(selectedOperator?.password || "")}" autocomplete="off" required />
          </label>
          <label class="login-field" for="operatorCommissionType">
            <span>Comissão</span>
            <select id="operatorCommissionType" required>
              ${renderSelectOptions(["Valor fixo por serviço", "Percentual por serviço"], getCommissionTypeLabel(selectedOperator?.commissionType || "fixed"))}
            </select>
          </label>
          <label class="login-field" for="operatorCommissionValue">
            <span>Valor / percentual</span>
            <input
              id="operatorCommissionValue"
              type="text"
              inputmode="decimal"
              data-money-input="${(selectedOperator?.commissionType || "fixed") === "fixed" ? "true" : "false"}"
              placeholder="${(selectedOperator?.commissionType || "fixed") === "fixed" ? "R$ 0,00" : "Ex.: 8"}"
              value="${escapeHtml((selectedOperator?.commissionType || "fixed") === "fixed" ? formatCurrencyFieldValue(selectedOperator?.commissionValue) : selectedOperator?.commissionValue ?? "")}"
              required
            />
          </label>
          <label class="login-field" for="operatorStatus">
            <span>Status</span>
            <select id="operatorStatus" required>
              ${renderSelectOptions(["Ativo", "Inativo"], selectedOperator?.status || "Ativo")}
            </select>
          </label>
        </div>

        <div class="dialog-actions">
          <button class="exit-button" id="clearOperatorFormButton" type="button">Limpar</button>
          <button class="primary-button" type="submit">
            <span data-icon="check"></span>
            <span>${selectedOperator ? "Atualizar operador" : "Salvar operador"}</span>
          </button>
        </div>
      </form>

      <article class="admin-panel operator-history-panel">
        ${renderOperatorHistoryPanel(referenceOperator)}
      </article>
    </section>

    <section class="screen-toolbar" aria-label="Filtros de operadores">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.badge}</span>
        <input id="operatorSearchInput" type="search" placeholder="Buscar nome, CPF, login ou telefone" />
      </label>
      <div class="screen-filters" id="operatorFilters">
        <button class="is-active" type="button" data-operator-filter="all">Todos</button>
        <button type="button" data-operator-filter="Ativo">Ativos</button>
        <button type="button" data-operator-filter="Operador">Operadores</button>
        <button type="button" data-operator-filter="Administrador">Administradores</button>
      </div>
    </section>

    <article class="admin-panel screen-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Equipe</p>
          <h2>Operadores cadastrados</h2>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table operator-table">
          <thead>
            <tr>
              <th>Operador</th>
              <th>Perfil</th>
              <th>Login</th>
              <th>Contato</th>
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

    <article class="admin-panel operator-report-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Relatórios</p>
          <h2>${referenceOperator ? referenceOperator.name : "Selecione um operador"}</h2>
        </div>
      </div>
      <div class="operator-report-actions">
        <button class="ghost-action" type="button" data-operator-report="production" ${referenceOperator ? "" : "disabled"}>
          <span data-icon="service"></span>
          <span>Produção</span>
        </button>
        <button class="ghost-action" type="button" data-operator-report="commission" ${referenceOperator ? "" : "disabled"}>
          <span data-icon="wallet"></span>
          <span>Comissão</span>
        </button>
        <button class="ghost-action" type="button" data-operator-report="attendance" ${referenceOperator ? "" : "disabled"}>
          <span data-icon="clock"></span>
          <span>Frequência</span>
        </button>
      </div>
    </article>
  `;

  initIcons();
  bindOperatorsScreenControls(container);
}

function bindOperatorsScreenControls(container) {
  updateOperatorCommissionInputMode(container);
  $("#operatorCommissionType", container).addEventListener("change", () => updateOperatorCommissionInputMode(container));
  $("#operatorCpf", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatCpf(event.currentTarget.value);
  });
  $("#operatorPhone", container).addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $("#clearOperatorFormButton", container).addEventListener("click", () => {
    selectedOperatorId = null;
    renderOperatorsScreen(container);
  });
  $("#operatorForm", container).addEventListener("submit", (event) => {
    event.preventDefault();
    saveOperatorRegistration(container);
  });
  $("#operatorSearchInput", container).addEventListener("input", () => applyOperatorTableFilter(container));
  $$("[data-operator-filter]", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-operator-filter]", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyOperatorTableFilter(container);
    });
  });
  $$("[data-edit-operator]", container).forEach((button) => {
    button.addEventListener("click", () => {
      selectedOperatorId = Number(button.dataset.editOperator);
      renderOperatorsScreen(container);
      window.setTimeout(() => $("#operatorName")?.focus(), 0);
    });
  });
  $$("[data-operator-report]", container).forEach((button) => {
    button.addEventListener("click", () => emitOperatorReport(button.dataset.operatorReport));
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
    const newOperator = {
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
    adminOperators.push(newOperator);
    selectedOperatorId = newOperator.id;
  }

  renderOperatorsScreen(container);
  renderAdminDashboard();
  showToast(operator ? "Operador atualizado." : "Operador cadastrado.");
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

function emitOperatorReport(type) {
  const operator = selectedOperatorId ? findOperatorById(selectedOperatorId) : adminOperators[0];
  if (!operator) {
    showToast("Selecione um operador para emitir relatório.");
    return;
  }

  const reportMap = {
    production: "Relatório de produção",
    commission: "Relatório de comissão",
    attendance: "Relatório de frequência"
  };
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

function getOperatorProductionTotals(operator) {
  return operator.production.reduce(
    (totals, item) => ({
      services: totals.services + item.services,
      revenue: totals.revenue + item.revenue
    }),
    { services: 0, revenue: 0 }
  );
}

function getOperatorCommission(operator) {
  const totals = getOperatorProductionTotals(operator);
  if (operator.commissionType === "percent") return totals.revenue * (operator.commissionValue / 100);
  return totals.services * operator.commissionValue;
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

function renderOperatorsScreen(container) {
  const reportOperator = getSelectedReportOperator();

  container.innerHTML = `
    <section class="screen-metrics operator-metrics" aria-label="Resumo de operadores">
      ${[
        { label: "Operadores ativos", value: adminOperators.filter((operator) => operator.status === "Ativo").length, icon: "badge" },
        { label: "Administradores", value: adminOperators.filter((operator) => operator.accessProfile === "Administrador").length, icon: "shield" },
        { label: "Serviços hoje", value: adminOperators.reduce((total, operator) => total + operator.today, 0), icon: "service" },
        { label: "Comissão prevista", value: formatCurrency(getOperatorsCommissionTotal()), icon: "wallet" }
      ]
        .map(renderScreenMetric)
        .join("")}
    </section>

    <section class="operator-insights-grid">
      <article class="admin-panel operator-report-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Relatórios</p>
            <h2>Emissão por operador</h2>
          </div>
        </div>
        <label class="login-field operator-report-selector" for="operatorReportSelect">
          <span>Operador do relatório</span>
          <select id="operatorReportSelect">
            ${renderOperatorReportOptions(reportOperator?.id)}
          </select>
        </label>
        ${renderOperatorReportSummary(reportOperator)}
        <div class="operator-report-actions">
          <button class="ghost-action" type="button" data-operator-report="production" ${reportOperator ? "" : "disabled"}>
            <span data-icon="service"></span>
            <span>Produção</span>
          </button>
          <button class="ghost-action" type="button" data-operator-report="commission" ${reportOperator ? "" : "disabled"}>
            <span data-icon="wallet"></span>
            <span>Comissão</span>
          </button>
          <button class="ghost-action" type="button" data-operator-report="attendance" ${reportOperator ? "" : "disabled"}>
            <span data-icon="clock"></span>
            <span>Frequência</span>
          </button>
        </div>
      </article>

      <article class="admin-panel operator-history-panel">
        ${renderOperatorHistoryPanel(reportOperator)}
      </article>
    </section>

    <section class="screen-toolbar" aria-label="Filtros de operadores">
      <label class="screen-search">
        <span class="screen-search-icon">${icons.badge}</span>
        <input id="operatorSearchInput" type="search" placeholder="Buscar nome, CPF, login ou telefone" />
      </label>
      <div class="screen-filters" id="operatorFilters">
        <button class="is-active" type="button" data-operator-filter="all">Todos</button>
        <button type="button" data-operator-filter="Ativo">Ativos</button>
        <button type="button" data-operator-filter="Operador">Operadores</button>
        <button type="button" data-operator-filter="Administrador">Administradores</button>
      </div>
    </section>

    <article class="admin-panel screen-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Equipe</p>
          <h2>Operadores cadastrados</h2>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table operator-table">
          <thead>
            <tr>
              <th>Operador</th>
              <th>Perfil</th>
              <th>Login</th>
              <th>Contato</th>
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
  `;

  initIcons();
  bindOperatorsScreenControls(container);
}

function renderOperatorReportOptions(selectedId) {
  if (!adminOperators.length) return '<option value="">Nenhum operador cadastrado</option>';
  return adminOperators
    .map((operator) => {
      const value = String(operator.id);
      return `<option value="${value}" ${String(selectedId) === value ? "selected" : ""}>${escapeHtml(operator.name)} / ${escapeHtml(operator.accessProfile)}</option>`;
    })
    .join("");
}

function renderOperatorReportSummary(operator) {
  if (!operator) return '<p class="empty-plates">Cadastre um operador para emitir relatórios.</p>';
  const totals = getOperatorProductionTotals(operator);
  return `
    <div class="operator-summary">
      <span>${escapeHtml(operator.accessProfile)} / ${escapeHtml(operator.status)}</span>
      <strong>${formatCurrency(getOperatorCommission(operator))}</strong>
      <p>${totals.services} serviço(s) / ${formatCurrency(totals.revenue)} em produção registrada</p>
    </div>
  `;
}

function bindOperatorsScreenControls(container) {
  $("#operatorSearchInput", container).addEventListener("input", () => applyOperatorTableFilter(container));
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
    selectedReportOperatorId = Number(event.currentTarget.value) || null;
    renderOperatorsScreen(container);
  });
  $$("[data-operator-report]", container).forEach((button) => {
    button.addEventListener("click", () => emitOperatorReport(button.dataset.operatorReport));
  });
}

function openOperatorDialog(operatorId = null) {
  selectedOperatorId = operatorId ? Number(operatorId) : null;
  const operator = selectedOperatorId ? findOperatorById(selectedOperatorId) : null;
  const dialog = $("#operatorDialog");
  dialog.innerHTML = renderOperatorDialogForm(operator);
  initIcons();
  bindOperatorDialogControls(dialog);

  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  else dialog.setAttribute("open", "");

  window.setTimeout(() => $("#operatorName", dialog)?.focus(), 0);
}

function closeOperatorDialog() {
  const dialog = $("#operatorDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  dialog.innerHTML = "";
  selectedOperatorId = null;
}

function renderOperatorDialogForm(operator) {
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
          <span>Nome</span>
          <input id="operatorName" type="text" placeholder="Nome completo" value="${escapeHtml(operator?.name || "")}" required />
        </label>
        <label class="login-field" for="operatorCpf">
          <span>CPF</span>
          <input id="operatorCpf" type="text" inputmode="numeric" placeholder="000.000.000-00" maxlength="14" value="${escapeHtml(operator?.cpf || "")}" required />
        </label>
        <label class="login-field" for="operatorPhone">
          <span>Telefone</span>
          <input id="operatorPhone" type="tel" inputmode="tel" placeholder="(11) 99999-9999" maxlength="15" value="${escapeHtml(operator?.phone || "")}" required />
        </label>
        <label class="login-field" for="operatorAccessProfile">
          <span>Perfil de acesso</span>
          <select id="operatorAccessProfile" required>
            ${renderSelectOptions(["Operador", "Administrador"], operator?.accessProfile || "Operador")}
          </select>
        </label>
        <label class="login-field" for="operatorRole">
          <span>Função</span>
          <input id="operatorRole" type="text" placeholder="Ex.: Lavagem e acabamento" value="${escapeHtml(operator?.role || "")}" />
        </label>
        <label class="login-field" for="operatorShift">
          <span>Turno</span>
          <input id="operatorShift" type="text" placeholder="08:00 - 17:00" value="${escapeHtml(operator?.shift || "")}" />
        </label>
        <label class="login-field" for="operatorUsername">
          <span>Login</span>
          <input id="operatorUsername" type="text" placeholder="usuario.sistema" value="${escapeHtml(operator?.username || "")}" autocomplete="off" required />
        </label>
        <label class="login-field" for="operatorPassword">
          <span>Senha</span>
          <input id="operatorPassword" type="text" placeholder="Senha de acesso" value="${escapeHtml(operator?.password || "")}" autocomplete="off" required />
        </label>
        <label class="login-field" for="operatorCommissionType">
          <span>Comissão</span>
          <select id="operatorCommissionType" required>
            ${renderSelectOptions(["Valor fixo por serviço", "Percentual por serviço"], getCommissionTypeLabel(operator?.commissionType || "fixed"))}
          </select>
        </label>
        <label class="login-field" for="operatorCommissionValue">
          <span>Valor / percentual</span>
          <input
            id="operatorCommissionValue"
            type="text"
            inputmode="decimal"
            data-money-input="${(operator?.commissionType || "fixed") === "fixed" ? "true" : "false"}"
            placeholder="${(operator?.commissionType || "fixed") === "fixed" ? "R$ 0,00" : "Ex.: 8"}"
            value="${escapeHtml((operator?.commissionType || "fixed") === "fixed" ? formatCurrencyFieldValue(operator?.commissionValue) : operator?.commissionValue ?? "")}"
            required
          />
        </label>
        <label class="login-field" for="operatorStatus">
          <span>Status</span>
          <select id="operatorStatus" required>
            ${renderSelectOptions(["Ativo", "Inativo"], operator?.status || "Ativo")}
          </select>
        </label>
      </div>

      <div class="dialog-actions">
        <button class="exit-button" id="cancelOperatorDialog" type="button">Cancelar</button>
        <button class="primary-button" type="submit">
          <span data-icon="check"></span>
          <span>${operator ? "Atualizar operador" : "Salvar operador"}</span>
        </button>
      </div>
    </form>
  `;
}

function bindOperatorDialogControls(dialog) {
  updateOperatorCommissionInputMode(dialog);
  $("#operatorCommissionType", dialog).addEventListener("change", () => updateOperatorCommissionInputMode(dialog));
  $("#operatorCpf", dialog).addEventListener("input", (event) => {
    event.currentTarget.value = formatCpf(event.currentTarget.value);
  });
  $("#operatorPhone", dialog).addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });
  $("#closeOperatorDialog", dialog).addEventListener("click", closeOperatorDialog);
  $("#cancelOperatorDialog", dialog).addEventListener("click", closeOperatorDialog);
  $("#operatorForm", dialog).addEventListener("submit", (event) => {
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
        { label: "Ticket médio", value: formatCurrency(getAverageServicePrice()), icon: "wallet" }
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
  $("#serviceForm", dialog).addEventListener("submit", (event) => {
    event.preventDefault();
    saveServiceRegistration(dialog);
  });
}

function saveServiceRegistration(container) {
  const name = $("#serviceName", container).value.trim();
  const vehicleType = $("#serviceVehicleType", container).value;
  const vehicleCategory = getVehicleCategoryValue(vehicleType, $("#serviceVehicleCategory", container).value);
  const price = getCurrencyInputValue("#servicePrice", container);
  const duration = $("#serviceDuration", container).value.trim() || "A definir";
  const status = $("#serviceStatus", container).value;

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

  const previousService = selectedServiceIndex !== null ? serviceCatalog[selectedServiceIndex] : null;
  const previousName = previousService?.name || "";
  const serviceData = { name, price, duration, vehicleType, vehicleCategory, status };

  if (previousService) {
    serviceCatalog[selectedServiceIndex] = serviceData;
    syncRenamedService(previousName, name, price);
  } else {
    serviceCatalog.push(serviceData);
  }

  closeServiceDialog();
  renderServicesScreen($("#adminServicesContent"));
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

function renderRegistrySelectOptions(list, selectedValue) {
  const options = list.includes(selectedValue) || !selectedValue ? list : [selectedValue, ...list];
  return renderSelectOptions(options, selectedValue || options[0] || "");
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
    invoices: getInvoicesScreenContent,
    wallet: getWalletScreenContent
  };

  return screens[view] ? screens[view]() : null;
}

function getClientsScreenContent() {
  const rows = billingClients.map((client) => {
    const invoices = billingInvoices.filter((invoice) => invoice.clientId === client.id);
    const openValue = invoices.reduce((total, invoice) => total + getInvoiceAmount(invoice.id), 0);
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
    kicker: "Carteira",
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

    <div class="cashflow-action-row">
      <button class="new-vehicle-button" id="startCashEntryButton" type="button">
        <span data-icon="plus"></span>
        <span>Novo lançamento</span>
      </button>
    </div>

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
      <div class="screen-filters" id="cashflowFilters">
        ${["Todos", "Entradas", "Saídas", "Agendados", "Pendentes", "Confirmados", "Excluídos"]
          .map((filter, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-cashflow-filter="${filter.toLowerCase()}">${filter}</button>`)
          .join("")}
      </div>
      <div class="cashflow-export-actions">
        <button class="ghost-action" id="exportCashflowCsvButton" type="button">Exportar CSV</button>
        <button class="ghost-action" id="exportCashflowPdfButton" type="button">Exportar PDF</button>
      </div>
    </section>

    <section class="cashflow-registry-grid">
      ${renderCashflowRegistryPanel("category", "Categorias de lançamento", cashflowCategories)}
      ${renderCashflowRegistryPanel("costCenter", "Centros de custo", cashflowCostCenters)}
    </section>

    <article class="admin-panel screen-table-panel cashflow-table-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Movimento</p>
          <h2>Lançamentos do caixa</h2>
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

function renderCashflowRegistryPanel(kind, title, list) {
  const placeholder = kind === "category" ? "Nova categoria" : "Novo centro";
  const buttonLabel = kind === "category" ? "Adicionar categoria" : "Adicionar centro";
  return `
    <article class="admin-panel cashflow-registry-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Cadastro</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
      </div>
      <div class="cashflow-registry-row">
        <input id="cashflow${capitalize(kind)}Input" type="text" placeholder="${escapeHtml(placeholder)}" />
        <button class="ghost-action" type="button" data-add-cashflow-option="${kind}">
          <span data-icon="plus"></span>
          <span>${escapeHtml(buttonLabel)}</span>
        </button>
      </div>
      <div class="client-plate-tags">
        ${renderCashflowOptionChips(list, kind)}
      </div>
    </article>
  `;
}

function renderCashflowOptionChips(list, kind) {
  return list
    .map(
      (item) => `
        <span class="table-plate-chip registry-option-chip">
          <span>${escapeHtml(item)}</span>
          <button type="button" aria-label="Excluir ${escapeHtml(item)}" data-delete-cashflow-option="${kind}" data-option-value="${escapeHtml(item)}">
            ${icons.x}
          </button>
        </span>
      `
    )
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
  $("#cashflowSearchInput", container)?.addEventListener("input", () => applyCashflowFilters(container));
  $$("#cashflowFilters button", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$("#cashflowFilters button", container).forEach((item) => item.classList.toggle("is-active", item === button));
      applyCashflowFilters(container);
    });
  });
  $("#exportCashflowCsvButton", container)?.addEventListener("click", exportCashflowCsv);
  $("#exportCashflowPdfButton", container)?.addEventListener("click", exportCashflowPdf);
  $$("[data-add-cashflow-option]", container).forEach((button) => {
    button.addEventListener("click", () => addCashflowOption(container, button.dataset.addCashflowOption));
  });
  $$("[data-delete-cashflow-option]", container).forEach((button) => {
    button.addEventListener("click", () => deleteCashflowOption(container, button.dataset.deleteCashflowOption, button.dataset.optionValue));
  });
  $$("[data-open-cash-entry]", container).forEach((button) => {
    button.addEventListener("click", () => openCashflowDialog(Number(button.dataset.openCashEntry)));
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
  const activeFilter = $("#cashflowFilters .is-active", container)?.dataset.cashflowFilter || "todos";
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
  const list = kind === "category" ? cashflowCategories : cashflowCostCenters;
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
  renderCashflowScreen(container);
  showToast(kind === "category" ? "Categoria cadastrada." : "Centro de custo cadastrado.");
}

async function deleteCashflowOption(container, kind, value) {
  const list = kind === "category" ? cashflowCategories : cashflowCostCenters;
  const label = kind === "category" ? "categoria" : "centro de custo";
  const used = cashEntries.some((entry) => !entry.deleted && (kind === "category" ? entry.category : entry.costCenter) === value);
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
  renderCashflowScreen(container);
  showToast(`${capitalize(label)} removido.`);
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
  const methodSummary = paymentMethods
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

function openCashflowDialog(entryId = null) {
  selectedCashEntryId = entryId;
  const entry = entryId ? getCashEntryById(entryId) : null;
  const dialog = $("#cashflowDialog");
  dialog.innerHTML = renderCashflowDialogForm(entry);
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
}

function renderCashflowDialogForm(entry) {
  const isScheduled = Boolean(entry?.scheduledDate);
  const value = Math.abs(Number(entry?.value || ""));
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
            ${renderSelectOptions(["Entrada", "Saída"], entry?.type || "Entrada")}
          </select>
        </label>
        <label class="login-field" for="cashEntryValue">
          <span>Valor</span>
          <input id="cashEntryValue" type="text" inputmode="decimal" data-money-input="true" placeholder="R$ 0,00" value="${escapeHtml(formatCurrencyFieldValue(value))}" required />
        </label>
        <label class="login-field cashflow-description-field" for="cashEntryDescription">
          <span>Descrição</span>
          <input id="cashEntryDescription" type="text" placeholder="Ex.: Compra de insumos" value="${escapeHtml(entry?.description || "")}" required />
        </label>
        <label class="login-field" for="cashEntryMethod">
          <span>Forma</span>
          <select id="cashEntryMethod" required>
            ${renderSelectOptions(getCashflowPaymentMethods(), entry?.method || "Pix")}
          </select>
        </label>
        <label class="login-field" for="cashEntryCategory">
          <span>Categoria</span>
          <select id="cashEntryCategory" required>
            ${renderRegistrySelectOptions(cashflowCategories, entry?.category || cashflowCategories[0] || "")}
          </select>
        </label>
        <label class="login-field" for="cashEntryCostCenter">
          <span>Centro de custo</span>
          <select id="cashEntryCostCenter" required>
            ${renderRegistrySelectOptions(cashflowCostCenters, entry?.costCenter || cashflowCostCenters[0] || "")}
          </select>
        </label>
        <label class="login-field" for="cashEntryStatus">
          <span>Status</span>
          <select id="cashEntryStatus" required>
            ${renderSelectOptions(["Confirmado", "Pendente"], entry ? getCashEntryStatus(entry) : "Confirmado")}
          </select>
        </label>
        <label class="switch-field cashflow-schedule-switch" for="cashEntryScheduled">
          <input id="cashEntryScheduled" type="checkbox" ${isScheduled ? "checked" : ""} ${entry?.deleted ? "disabled" : ""} />
          <span class="switch-control"></span>
          <span>Agendar lançamento</span>
        </label>
        <label class="login-field cashflow-schedule-field" for="cashEntryScheduledDate">
          <span>Data agendada</span>
          <input id="cashEntryScheduledDate" type="date" value="${escapeHtml(entry?.scheduledDate || entry?.date || getTodayISO())}" />
        </label>
        <label class="login-field cashflow-schedule-field" for="cashEntryScheduledTime">
          <span>Hora agendada</span>
          <select id="cashEntryScheduledTime">
            ${getScheduleTimeOptionsHtml(entry?.scheduledTime || entry?.time || "")}
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

function bindCashflowDialogControls(dialog) {
  bindCurrencyInputs(dialog);
  $("#closeCashflowDialog", dialog).addEventListener("click", closeCashflowDialog);
  $("#cancelCashflowDialog", dialog)?.addEventListener("click", closeCashflowDialog);
  $("#cashEntryScheduled", dialog).addEventListener("change", () => updateCashflowScheduleFields(dialog));
  $("#cashEntryAttachment", dialog).addEventListener("change", () => updateCashflowAttachmentState(dialog, getCashEntryById(selectedCashEntryId)));
  $("#downloadCashAttachmentButton", dialog).addEventListener("click", () => downloadCashEntryAttachment(dialog));
  $("#deleteCashEntryFromDialogButton", dialog)?.addEventListener("click", () => deleteCashEntry(selectedCashEntryId));
  $("#cancelScheduledCashFromDialogButton", dialog)?.addEventListener("click", () => cancelScheduledCashEntry(selectedCashEntryId));
  $("#cashflowForm", dialog).addEventListener("submit", (event) => {
    event.preventDefault();
    saveCashEntry(dialog);
  });
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
    status: isScheduled ? "Pendente" : status,
    scheduledDate: isScheduled ? scheduledDate : "",
    scheduledTime: isScheduled ? scheduledTime : "",
    attachment: file ? { name: file.name, type: getAttachmentTypeLabel(file.name) } : existingEntry?.attachment || null,
    createdBy: existingEntry?.createdBy || activeSessionUser || "Administrador",
    updatedBy: activeSessionUser || "Administrador"
  };

  if (existingEntry) Object.assign(existingEntry, payload);
  else cashEntries.unshift(payload);

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
    downloadPdfFile(attachment.name || `comprovante-${entry?.id || "lancamento"}.pdf`, "COMPROVANTE DO LANÇAMENTO", attachmentLines, {
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

function exportCashflowCsv() {
  const rows = [
    ["ID", "Data", "Hora", "Tipo", "Descrição", "Categoria", "Centro de custo", "Forma", "Valor", "Status", "Agendado", "Excluído", "Comprovante"],
    ...cashEntries.map((entry) => [
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
  downloadTextFile(`fluxo-caixa-${getTodayISO()}.csv`, csv, "text/csv;charset=utf-8");
}

function exportCashflowPdf() {
  const lines = [
    `Relatório de fluxo de caixa - ${formatDateBR(getTodayISO())}`,
    "",
    ...cashEntries.map(
      (entry) =>
        `${entry.id}. ${entry.type} | ${entry.description} | ${entry.category || "-"} | ${entry.costCenter || "-"} | ${formatCurrency(entry.value)} | ${getCashEntryStatus(entry)}${entry.scheduledDate ? " | agendado" : ""}${entry.deleted ? " | excluído" : ""}`
    )
  ];
  downloadPdfFile(`fluxo-caixa-${getTodayISO()}.pdf`, "Relatório de fluxo de caixa", lines);
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
  return [...new Set([...paymentMethods.filter((method) => method !== "Faturado"), "Faturado", "Carteira", "Boleto"])];
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
  const pdf = createStandardPdfDocument({
    fileName,
    title,
    lines: Array.isArray(lines) ? lines : [lines],
    subtitle: options.subtitle || getPdfDocumentSubtitle(title),
    documentNumber: options.documentNumber || createPdfDocumentNumber(fileName),
    responsible: options.responsible || activeSessionUser || "Sistema LavaPrime",
    category: options.category || getPdfDocumentCategory(title),
    summary: options.summary || getPdfDocumentSummary(title, lines)
  }, logoImage);
  downloadTextFile(fileName, pdf, "application/pdf");
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
      const maxWidth = 360;
      const scale = Math.min(1, maxWidth / image.naturalWidth);
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const binary = atob(canvas.toDataURL("image/jpeg", 0.88).split(",")[1]);
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
  const sourceLines = (Array.isArray(lines) ? lines : [lines]).map((line) => normalizePdfText(line));
  const rows = [];

  sourceLines.forEach((line) => {
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
  addPdfRect(commands, 0, 0, page.width, page.height, { fill: colors.white });
  if (logoImage) {
    const logoWidth = 156;
    const logoHeight = Math.min(52, logoWidth * (logoImage.height / logoImage.width));
    addPdfImage(commands, "Logo", 45, 785, logoWidth, logoHeight);
    addPdfText(commands, truncatePdfText(getBusinessDocumentName(), 42), 45, 775, { size: 8.5, font: "F2", color: colors.petrol });
    addPdfText(commands, truncatePdfText(getBusinessDocumentContactLine(), 58), 45, 764, { size: 7.2, color: colors.muted });
  } else {
    addPdfText(commands, getBusinessDocumentName(), 45, 805, { size: 22, font: "F2", color: colors.petrol });
    addPdfRect(commands, 45, 792, 94, 3, { fill: colors.cyan });
    addPdfText(commands, truncatePdfText(getBusinessDocumentContactLine() || "Sistema de gestao operacional", 64), 45, 779, { size: 8, color: colors.muted });
  }
  addPdfText(commands, "MODELO PADRAO PARA PDF", 550, 808, { size: 8, font: "F2", color: colors.cyan, align: "right" });
  addPdfText(commands, `${normalizePdfText(document.category)} | ${new Date().toLocaleDateString("pt-BR")}`, 550, 794, {
    size: 8,
    color: colors.muted,
    align: "right"
  });
  addPdfLine(commands, 45, 768, 550, 768, colors.cyan, 1.8);

  drawPdfTitleBox(commands, document);
  drawPdfMetaGrid(commands, document);
  drawPdfSummary(commands, document);
  drawPdfItems(commands, rows);

  addPdfLine(commands, 45, 58, 550, 58, colors.border, 0.8);
  addPdfText(commands, `${getBusinessDocumentName()} | Documento gerado pelo LavaPrime | Pagina ${pageNumber} de ${pageCount}`, 297, 42, {
    size: 8,
    color: colors.muted,
    align: "center"
  });
  addPdfText(commands, getBusinessDocumentFooterDetails() || `Padrao: ${pdfDocumentStandard.templateReference}`, 297, 30, {
    size: 7,
    color: colors.muted,
    align: "center"
  });
  return commands.join("\n");
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
    ["Negocio", getBusinessDocumentName(), "Emissao", emittedAt],
    ["Contato", getBusinessDocumentContactLine() || "-", "Responsavel", document.responsible],
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
    row.lines.forEach((line, lineIndex) => {
      addPdfText(commands, truncatePdfText(line, 96), 59, y - 11 - lineIndex * 11, { size: 8.2, color: colors.petrol });
    });
    y -= row.height;
    rowIndex += 1;
  });
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

function getInvoicesScreenContent() {
  return {
    searchIcon: "invoice",
    searchPlaceholder: "Buscar fatura",
    filters: ["Abertas", "Vencem no mês", "Pagas", "Em atraso"],
    metrics: [
      { label: "Faturas abertas", value: billingInvoices.length, icon: "invoice" },
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
      formatCurrency(getInvoiceAmount(invoice.id)),
      "Aberta"
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

function getWalletScreenContent() {
  return {
    searchIcon: "wallet",
    searchPlaceholder: "Buscar forma de recebimento",
    filters: ["Todas", "Ativas", "Cartões", "Caixa"],
    metrics: [
      { label: "Saldo total", value: formatCurrency(walletMethods.reduce((total, item) => total + item.balance, 0)), icon: "wallet" },
      { label: "Métodos ativos", value: walletMethods.filter((item) => item.status === "Ativa").length, icon: "card" },
      { label: "Liquidação imediata", value: "2", icon: "check" }
    ],
    kicker: "Recebimentos",
    tableTitle: "Carteiras e métodos",
    columns: ["Forma", "Tipo", "Saldo", "Liquidação", "Status"],
    rows: walletMethods.map((method) => [
      method.name,
      method.type,
      formatCurrency(method.balance),
      method.settlement,
      method.status
    ]),
    sideKicker: "Conciliação",
    sideTitle: "Resumo por origem",
    sideItems: [
      { title: "Pix", value: "Imediato", detail: "Entrada direta no caixa" },
      { title: "Cartões", value: "D+1 / D+30", detail: "Depende da modalidade" },
      { title: "Dinheiro", value: "Manual", detail: "Conferência no fechamento" }
    ]
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

function getOpenInvoicesTotal() {
  return billingInvoices.reduce((total, invoice) => total + getInvoiceAmount(invoice.id), 0);
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

function getVehiclePaymentTotal(vehicle) {
  const extras = Number(vehicle.extraCharges || 0);
  const discount = Number(vehicle.discount || 0);
  return Math.max(0, getServicePrice(vehicle) + extras - discount);
}

function getDialogMoneyValue(selector) {
  const number = getCurrencyInputValue(selector);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function readPaymentAdjustmentsFromDialog(vehicle) {
  const extraEnabled = Boolean($("#paymentExtraEnabled")?.checked);
  const discountEnabled = Boolean($("#paymentDiscountEnabled")?.checked);
  const extraCharges = extraEnabled ? getDialogMoneyValue("#paymentExtraCharges") : 0;
  const discount = discountEnabled ? getDialogMoneyValue("#paymentDiscount") : 0;
  const cashReceived = getDialogMoneyValue("#paymentCashReceived");
  const total = Math.max(0, getServicePrice(vehicle) + extraCharges - discount);
  return {
    extraEnabled,
    discountEnabled,
    extraCharges,
    extraDescription: extraEnabled ? $("#paymentExtraDescription")?.value.trim() || "" : "",
    discount,
    discountDescription: discountEnabled ? $("#paymentDiscountDescription")?.value.trim() || "" : "",
    cashReceived,
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
  if (vehicle.payment === "Faturado") return vehicle.paymentStatus || "Pendente";
  if (vehicle.paymentConfirmed) return "Confirmado";
  return "A confirmar";
}

function getPaymentPillClass(vehicle) {
  const state = getPaymentState(vehicle);
  if (state === "Confirmado") return "payment-confirmed";
  if (vehicle.payment === "Faturado") return "payment-billed";
  return "payment-pending";
}

function renderPaymentOptions(selectedMethod, allowBilled = true) {
  return paymentMethods
    .filter((method) => allowBilled || method !== "Faturado")
    .map((method) => `<option value="${escapeHtml(method)}" ${method === selectedMethod ? "selected" : ""}>${escapeHtml(method)}</option>`)
    .join("");
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
      (group) => `
        <article class="checklist-area" data-checklist-area="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}">
          <div class="checklist-area-header">
            <button class="checklist-area-toggle" type="button" data-checklist-area-toggle="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}" aria-expanded="true">
              <span data-icon="dashboard"></span>
              <strong>${escapeHtml(group.area)}</strong>
            </button>
            <button class="ghost-action checklist-area-verify" type="button" data-checklist-area-verify="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}">
              <span data-icon="check"></span>
              <span>Marcar tópico como verificado</span>
            </button>
          </div>
          <div class="checklist-grid" data-checklist-area-body="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}">
            ${group.parts
              .map((part) => {
                const saved = savedItems.find((item) => item.area === group.area && item.part === part);
                const selectedCondition = saved?.condition || checklistUnverifiedCondition;
                return `
                  <label class="login-field checklist-item" for="${escapeHtml(getChecklistInputId(scope, group.area, part))}">
                    <span>${escapeHtml(part)}</span>
                    <select id="${escapeHtml(getChecklistInputId(scope, group.area, part))}" data-checklist-condition="${escapeHtml(scope)}" data-area="${escapeHtml(group.area)}" data-part="${escapeHtml(part)}">
                      ${getChecklistConditionOptions()
                        .map(
                          (condition) =>
                            `<option value="${escapeHtml(condition)}" ${selectedCondition === condition ? "selected" : ""}>${escapeHtml(condition)}</option>`
                        )
                        .join("")}
                    </select>
                  </label>
                `;
              })
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function getChecklistConditionOptions() {
  return [checklistUnverifiedCondition, ...checklistConditions.filter((condition) => condition !== checklistUnverifiedCondition)];
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
  $$(`[data-checklist-area-toggle="${cssEscape(scope)}"]`, container).forEach((button) => {
    button.addEventListener("click", () => toggleChecklistArea(container, scope, button.dataset.area));
  });
  $$(`[data-checklist-area-verify="${cssEscape(scope)}"]`, container).forEach((button) => {
    button.addEventListener("click", () => markChecklistAreaVerified(container, scope, button.dataset.area));
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
  $$(`[data-checklist-condition="${cssEscape(scope)}"][data-area="${cssEscape(area)}"]`, container).forEach((select) => {
    select.value = "Conforme";
  });
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
        <h3>${vehicle.plate} - ${vehicle.model} ${vehicle.color}</h3>
        <p>${vehicle.owner}</p>
        <p>${vehicle.service}</p>
        <span class="vehicle-meta">
          <span class="status-pill">${status.label}</span>
          <span class="time-pill">${getVehicleTimeLabel(vehicle)}</span>
          <span class="payment-pill ${getPaymentPillClass(vehicle)}">${escapeHtml(vehicle.payment)} / ${escapeHtml(getPaymentState(vehicle))}</span>
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
  $("#statusVehicleTitle").textContent = `${vehicle.plate} - ${vehicle.model} ${vehicle.color}`;
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

function renderPaymentConfirmationPanel(vehicle) {
  const isConfirmed = getPaymentState(vehicle) === "Confirmado";
  const confirmLabel = vehicle.payment === "Faturado" ? "Registrar faturado" : "Confirmar pagamento";
  const serviceValue = getServicePrice(vehicle);
  const extraCharges = Number(vehicle.extraCharges || 0);
  const discount = Number(vehicle.discount || 0);
  const hasExtraCharges = Boolean(vehicle.extraChargesEnabled || extraCharges || vehicle.extraDescription);
  const hasDiscount = Boolean(vehicle.discountEnabled || discount || vehicle.discountDescription);
  const total = getVehiclePaymentTotal(vehicle);
  const isCash = vehicle.payment === "Dinheiro";
  const cashReceived = Number(vehicle.cashReceived || 0);
  const change = Math.max(0, cashReceived - total);

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
              : `Serviços: ${formatCurrency(serviceValue)}. Ajuste avulsos e desconto antes de lançar no Fluxo de caixa.`
          }</p>
          <p id="paymentConfirmBreakdown">Avulsos: ${formatCurrency(extraCharges)} · Desconto: ${formatCurrency(discount)}</p>
        </div>
        <label class="login-field" for="paymentConfirmMethod">
          <span>Forma de pagamento</span>
          <select id="paymentConfirmMethod">
            ${renderPaymentOptions(vehicle.payment || "Pix")}
          </select>
        </label>
      </section>

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
      </section>

      <div class="dialog-actions status-dialog-actions">
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
  const receiptNumber = `REC-${String(vehicle.id).padStart(4, "0")}-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
  const issuedAt = new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
  const lines = [
    "LavaPrime",
    "RECIBO DE ATENDIMENTO",
    `Recibo: ${receiptNumber}`,
    `Emissao: ${issuedAt}`,
    "",
    `Status: ${statusMeta[vehicle.status]?.label || vehicle.status}`,
    `Placa: ${vehicle.plate}`,
    `Veiculo: ${vehicle.model} - ${vehicle.color}`,
    `Cliente: ${vehicle.owner}`,
    `Telefone: ${vehicle.phone || "-"}`,
    `Servicos: ${vehicle.service}`,
    `Forma de pagamento: ${vehicle.payment}`,
    `Situacao do pagamento: ${getPaymentState(vehicle)}`,
    `Valor dos servicos: ${formatCurrency(getServicePrice(vehicle))}`,
    vehicle.extraCharges
      ? `Valores avulsos: ${formatCurrency(vehicle.extraCharges)}${vehicle.extraDescription ? ` - ${vehicle.extraDescription}` : ""}`
      : "",
    vehicle.discount
      ? `Desconto: ${formatCurrency(vehicle.discount)}${vehicle.discountDescription ? ` - ${vehicle.discountDescription}` : ""}`
      : "",
    `Valor total: ${formatCurrency(getVehiclePaymentTotal(vehicle))}`,
    vehicle.payment === "Dinheiro" ? `Valor recebido: ${formatCurrency(vehicle.cashReceived || 0)}` : "",
    vehicle.payment === "Dinheiro" ? `Troco: ${formatCurrency(vehicle.cashChange || 0)}` : "",
    getVehicleTimeLabel(vehicle),
    `Finalizacao: ${vehicle.finishedAt || vehicle.paymentConfirmedAt || "-"}`,
    `Operador: ${activeSessionUser || vehicle.operator || "Operador"}`,
    vehicle.billing ? `Fatura: ${vehicle.billing.invoiceCode} - vence ${formatDateBR(vehicle.billing.dueDate)}` : "",
    "",
    "Este recibo foi gerado automaticamente pelo LavaPrime."
  ].filter((line) => line !== "");

  downloadPdfFile(`${receiptNumber}-${vehicle.plate}.pdf`, "RECIBO DE ATENDIMENTO", lines.slice(2), {
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
  return `
    <div class="status-action-panel">
      ${renderVehicleActionSummary(vehicle)}
      <div class="status-action-list">
        ${vehicle.status === "agendado" ? renderScheduledEntryOption() : renderStatusOptions(vehicle.status)}
      </div>
      <button class="status-option edit-services-option" type="button" data-status-action="edit-services">
        <span class="status-dot-icon">${icons.service}</span>
        <span>
          <strong>Editar serviços e pagamento</strong><br />
          <small>Adicionar ou remover serviços e alterar a forma de pagamento</small>
        </span>
      </button>
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
    if (target.value === "Faturado" && !vehicle.billing) {
      applyPaymentAdjustmentsFromDialog(vehicle, "Faturado");
      renderStatusBillingPanel(vehicle, "confirm");
      return;
    }
    updatePaymentConfirmationPreview(vehicle);
    return;
  }

  if (["paymentExtraEnabled", "paymentDiscountEnabled"].includes(target.id)) {
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
  }
}

function handleStatusDialogInput(event) {
  const target = event.target;
  if (
    ![
      "paymentExtraCharges",
      "paymentExtraDescription",
      "paymentDiscount",
      "paymentDiscountDescription",
      "paymentCashReceived"
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
  const isCash = method === "Dinheiro";

  if (cashField) cashField.hidden = !isCash;
  if (cashChangeField) cashChangeField.hidden = !isCash;
  if (isCash && cashReceivedInput && !getCurrencyInputValue(cashReceivedInput)) {
    setCurrencyInputValue(cashReceivedInput, adjustment.total);
  }

  const updatedAdjustment = readPaymentAdjustmentsFromDialog(vehicle);
  $("#paymentConfirmTotal").textContent = formatCurrency(updatedAdjustment.total);
  $("#paymentConfirmBreakdown").textContent = `Avulsos: ${formatCurrency(updatedAdjustment.extraCharges)} · Desconto: ${formatCurrency(updatedAdjustment.discount)}`;
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
            ${renderPaymentOptions(vehicle.payment || "Pix")}
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

function finishStatusBillingFlow() {
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

function confirmVehiclePayment() {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;

  const previousPayment = vehicle.payment;
  const previousService = vehicle.service;
  const previousBillingValue = getVehiclePaymentTotal(vehicle);
  const method = $("#paymentConfirmMethod")?.value || vehicle.payment || "Pix";
  const adjustment = applyPaymentAdjustmentsFromDialog(vehicle, method);
  if (method === "Dinheiro" && adjustment.cashReceived < adjustment.total) {
    showToast("Informe um valor recebido suficiente para calcular o troco.");
    $("#paymentCashReceived")?.focus();
    return;
  }

  if (method === "Faturado" && !vehicle.billing) {
    renderStatusBillingPanel(vehicle, "confirm");
    return;
  }

  vehicle.payment = method;
  if (previousPayment === "Faturado" && method !== "Faturado" && vehicle.billing) {
    detachVehicleFromBilling(vehicle, previousBillingValue, previousService);
  }
  if (method === "Faturado" && !vehicle.billing && !attachVehicleToOpenInvoice(vehicle)) return;
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
  showToast(
    cashEntry.status === "Confirmado"
      ? `Pagamento de ${vehicle.plate} confirmado.`
      : `Lançamento faturado de ${vehicle.plate} registrado.`
  );
}

function upsertCashEntryFromVehicle(vehicle) {
  const existingEntry = cashEntries.find((entry) => entry.id && entry.id === vehicle.cashEntryId);
  const status = vehicle.payment === "Faturado" ? "Pendente" : "Confirmado";
  const payload = {
    date: getTodayISO(),
    time: getCurrentShortTime(),
    type: "Entrada",
    description: `${vehicle.plate} - ${vehicle.service}`,
    method: vehicle.payment,
    value: getVehiclePaymentTotal(vehicle),
    status,
    category: "Serviços",
    costCenter: vehicle.type === "Carro" ? "Lavagem" : "Unidade principal",
    plate: vehicle.plate,
    vehicleId: vehicle.id,
    operator: activeSessionUser || "Operador"
  };

  if (existingEntry) {
    Object.assign(existingEntry, payload, { id: existingEntry.id });
    return existingEntry;
  }

  const entry = {
    id: getNextCashEntryId(),
    ...payload
  };
  cashEntries.unshift(entry);
  return entry;
}

function getNextCashEntryId() {
  return Math.max(0, ...cashEntries.map((entry) => entry.id || 0)) + 1;
}

function syncCashEntryAfterPatioEdit(vehicle) {
  const entry = cashEntries.find((item) => item.id && item.id === vehicle.cashEntryId);
  if (!entry) return;

  entry.description = `${vehicle.plate} - ${vehicle.service}`;
  entry.method = vehicle.payment;
  entry.value = getVehiclePaymentTotal(vehicle);
  entry.status = vehicle.payment === "Faturado" ? "Pendente" : "Confirmado";
  vehicle.paymentStatus = entry.status;
  vehicle.paymentConfirmed = entry.status === "Confirmado";
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
    lineItem.value = nextValue;
    lineItem.operator = activeSessionUser || lineItem.operator;
  }
  vehicle.paymentStatus = "Pendente";
  vehicle.paymentConfirmed = false;
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
}

function closeStatusDialog() {
  const dialog = $("#statusDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  resetStatusBillingSelection();
}

function confirmScheduledVehicleEntryWithChecklist() {
  const vehicle = getPatioVehicleById();
  if (!vehicle) return;
  if (!attachChecklistFromPanel(vehicle, $("#statusOptions"), "scheduledConfirm")) return;
  updateVehicleStatus("aguardando");
}

function updateVehicleStatus(status) {
  const vehicle = patioVehicles.find((item) => item.id === activeVehicleId);
  if (!vehicle || !statusMeta[status]) return;
  const wasScheduled = vehicle.status === "agendado" && status === "aguardando";
  const wasCanceledSchedule = vehicle.status === "agendado" && status === "cancelado";

  vehicle.status = status;
  if (wasScheduled) vehicle.entry = getCurrentShortTime();
  updateVehicleServiceStatus(vehicle);
  renderPatio();
  closeStatusDialog();
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
