export const billingClients = [
  { id: 1, name: "Frota Prime Ltda", document: "12.345.678/0001-90", phone: "(11) 91111-0001" },
  { id: 2, name: "CondomÃ­nio Reserva Azul", document: "98.765.432/0001-10", phone: "(11) 92222-0002" },
  { id: 3, name: "Auto Center Vila Norte", document: "23.456.789/0001-20", phone: "(11) 93333-0003" }
];

export const billingInvoices = [
  { id: 1, clientId: 1, code: "FAT-0526-001", dueDate: "2026-05-30" },
  { id: 2, clientId: 2, code: "FAT-0526-002", dueDate: "2026-05-25" },
  { id: 3, clientId: 3, code: "FAT-0626-001", dueDate: "2026-06-05" }
];

export const invoiceAmounts = {
  1: 980,
  2: 620,
  3: 440
};

export const invoiceLineItems = [
  { invoiceId: 1, clientId: 1, plate: "KML7D10", service: "VitrificaÃ§Ã£o", value: 490, operator: "Carlos" },
  { invoiceId: 2, clientId: 2, plate: "AGD4H22", service: "Lavagem Prime", value: 65, operator: "Carlos" },
  { invoiceId: 3, clientId: 3, plate: "LVP3E72", service: "Detailing completo", value: 320, operator: "Juliana" }
];

export const patioVehicles = [
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
    service: "HigienizaÃ§Ã£o interna",
    payment: "CartÃ£o de dÃ©bito",
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
    payment: "CartÃ£o de crÃ©dito",
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
    service: "VitrificaÃ§Ã£o",
    payment: "Faturado",
    entry: "11:20",
    status: "cancelado"
  }
];

export const clientRegistry = [
  {
    id: 1,
    billingClientId: 1,
    personType: "PJ",
    billing: true,
    name: "",
    legalName: "Frota Prime Ltda",
    document: "12.345.678/0001-90",
    phone: "(11) 91111-0001",
    address: "Av. Paulista, 1000 - SÃ£o Paulo/SP",
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
    legalName: "CondomÃ­nio Reserva Azul",
    document: "98.765.432/0001-10",
    phone: "(11) 92222-0002",
    address: "Rua das AcÃ¡cias, 450 - SÃ£o Paulo/SP",
    email: "administracao@reservaazul.com.br",
    responsible: "LÃ­via Ramos",
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
    address: "Rua Norte, 78 - SÃ£o Paulo/SP",
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

export const vehicleRegistry = [
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
    notes: "VeÃ­culo de cliente avulso com recorrÃªncia mensal.",
    ownerHistory: [{ date: "2026-05-18", owner: "Marina Alves", note: "ProprietÃ¡ria atual" }],
    serviceHistory: [{ date: "2026-05-18", service: "Lavagem Prime", status: "Aguardando serviÃ§o", value: 65 }]
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
    notes: "Cliente prefere higienizaÃ§Ã£o interna trimestral.",
    ownerHistory: [{ date: "2026-05-18", owner: "Rafael Nunes", note: "ProprietÃ¡rio atual" }],
    serviceHistory: [{ date: "2026-05-18", service: "HigienizaÃ§Ã£o interna", status: "Em ServiÃ§o", value: 140 }]
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
    notes: "HistÃ³rico preservado mesmo com serviÃ§o cancelado.",
    ownerHistory: [
      { date: "2025-11-10", owner: "Pedro Martins", note: "ProprietÃ¡rio anterior" },
      { date: "2026-05-18", owner: "Frota Prime Ltda", note: "Transferido para cliente faturado" }
    ],
    serviceHistory: [{ date: "2026-05-18", service: "VitrificaÃ§Ã£o", status: "Cancelado", value: 490 }]
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
    notes: "Entrada agendada aguardando confirmaÃ§Ã£o.",
    ownerHistory: [{ date: "2026-05-18", owner: "CondomÃ­nio Reserva Azul", note: "Cliente faturado atual" }],
    serviceHistory: [{ date: "2026-05-18", service: "Lavagem Prime", status: "Agendado", value: 65 }]
  }
];

export const openPayments = [
  {
    id: 1,
    clientId: 5,
    clientName: "Rafael Nunes",
    phone: "(21) 97777-2041",
    plate: "BRT8C41",
    service: "HigienizaÃ§Ã£o interna",
    value: 140,
    paymentMethod: "Pix",
    createdAt: "2026-05-25 10:30",
    dueDate: "2026-05-26",
    status: "Aberto",
    reminderFrequency: "DiÃ¡rio",
    lastReminderAt: "",
    operator: "Carlos",
    vehicleId: 2,
    cashEntryId: 3
  }
];

export const lavaprimeDemoDataCleanupMap = {
  classification: "embedded-demo-test-seed",
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
    customerRegistryCount: 5,
    billedCustomerCount: 3,
    commonCustomerCount: 2,
    vehicleRegistryCount: 5,
    patioVehicleCount: 5,
    openPaymentCount: 1,
    billingInvoiceCount: 3,
    invoiceLineItemCount: 3
  }
};
