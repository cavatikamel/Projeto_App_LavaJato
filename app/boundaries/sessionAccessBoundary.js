export function createSessionBoundary({ syncLegacySessionState } = {}) {
  const state = {
    activeProfile: "",
    currentUser: "",
    isAuthenticated: false
  };

  const syncLegacyState =
    typeof syncLegacySessionState === "function" ? syncLegacySessionState : () => {};

  function syncLegacySessionStateFromBoundary() {
    syncLegacyState({
      activeProfile: state.activeProfile,
      currentUser: state.currentUser,
      isAuthenticated: state.isAuthenticated
    });
  }

  return {
    selectProfile(profile) {
      state.activeProfile = typeof profile === "string" ? profile : "";
      syncLegacySessionStateFromBoundary();
      return this.getState();
    },
    startSession({ user, profile = state.activeProfile } = {}) {
      state.currentUser = typeof user === "string" ? user.trim() : "";
      state.activeProfile = typeof profile === "string" ? profile : "";
      state.isAuthenticated = Boolean(state.currentUser && state.activeProfile);
      syncLegacySessionStateFromBoundary();
      return this.getState();
    },
    clearSession() {
      state.currentUser = "";
      state.activeProfile = "";
      state.isAuthenticated = false;
      syncLegacySessionStateFromBoundary();
      return this.getState();
    },
    getState() {
      return {
        activeProfile: state.activeProfile,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated
      };
    },
    getActiveProfile() {
      return state.activeProfile;
    },
    getCurrentUser() {
      return state.currentUser;
    },
    isLoggedIn() {
      return state.isAuthenticated;
    },
    hasAdminAccess() {
      return state.isAuthenticated && state.activeProfile === "Administrador";
    },
    hasOperatorAccess() {
      return state.isAuthenticated && state.activeProfile === "Operador";
    }
  };
}

export function createAccessBoundary(sessionManager) {
  const adminViewPolicies = {
    dashboard: "canAccessAdminArea",
    patio: "canAccessYard",
    quotes: "canManageQuotes",
    clients: "canManageClientRegistrations",
    vehicles: "canManageVehicleRegistrations",
    services: "canManageServices",
    operators: "canManageTeam",
    products: "canManageProducts",
    supplies: "canManageSupplies",
    inventory: "canManageSupplies",
    productSales: "canManageProducts",
    documents: "canAccessDocuments",
    cashflow: "canAccessFinance",
    openPayments: "canAccessFinance",
    payables: "canAccessFinance",
    invoices: "canAccessFinance",
    business: "canAccessSettings",
    businessFinance: "canManageBusinessSettings",
    businessSocial: "canAccessSettings",
    businessMessages: "canAccessSettings"
  };

  const sensitiveActionPolicies = {
    "edit-client-registry": "canManageClientRegistrations",
    "edit-vehicle-registry": "canManageVehicleRegistrations",
    "manage-quotes": "canManageQuotes",
    "manage-products": "canManageProducts",
    "manage-supplies": "canManageSupplies",
    "manage-team": "canManageTeam",
    "manage-services": "canManageServices",
    "manage-finance-settings": "canManageBusinessSettings",
    "view-finance": "canAccessFinance",
    "view-documents": "canAccessDocuments",
    "view-reports": "canAccessReports",
    "access-settings": "canAccessSettings",
    "approve-billing-client": "canApproveBillingClients"
  };

  function normalizeBoundaryKey(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  return {
    isAuthenticated() {
      return sessionManager.isLoggedIn();
    },
    isAdminProfile() {
      return sessionManager.hasAdminAccess();
    },
    isOperatorProfile() {
      return sessionManager.hasOperatorAccess();
    },
    canAccessAdminArea() {
      return this.isAdminProfile();
    },
    canAccessOperatorArea() {
      return this.isOperatorProfile();
    },
    canAccessYard() {
      return this.isAuthenticated() && (this.isAdminProfile() || this.isOperatorProfile());
    },
    canManageBusinessSettings() {
      return this.canAccessSettings();
    },
    canAccessFinance() {
      return this.canAccessAdminArea();
    },
    canViewFinancial() {
      return this.canAccessFinance();
    },
    canAccessReports() {
      return this.canAccessAdminArea();
    },
    canAccessDocuments() {
      return this.canAccessReports();
    },
    canManageUsers() {
      return this.canAccessAdminArea();
    },
    canManageTeam() {
      return this.canManageUsers();
    },
    canManageClientRegistrations() {
      return this.canAccessAdminArea();
    },
    canManageVehicleRegistrations() {
      return this.canAccessAdminArea();
    },
    canManageProducts() {
      return this.canAccessAdminArea();
    },
    canManageSupplies() {
      return this.canAccessAdminArea();
    },
    canManageServices() {
      return this.canAccessAdminArea();
    },
    canManageQuotes() {
      return this.canAccessAdminArea();
    },
    canAccessSettings() {
      return this.canAccessAdminArea();
    },
    canApproveBillingClients() {
      return this.canAccessAdminArea();
    },
    canLogout() {
      return this.isAuthenticated();
    },
    canAccessAdminView(viewName) {
      const normalizedView = normalizeBoundaryKey(viewName);
      const policyName = adminViewPolicies[normalizedView];
      if (!policyName) return this.canAccessAdminArea();
      return typeof this[policyName] === "function" ? this[policyName]() : false;
    },
    canPerformSensitiveAction(actionName) {
      const normalizedAction = normalizeBoundaryKey(actionName).toLowerCase();
      const policyName = sensitiveActionPolicies[normalizedAction];
      if (!policyName) return false;
      return typeof this[policyName] === "function" ? this[policyName]() : false;
    },
    getState() {
      return {
        isAuthenticated: this.isAuthenticated(),
        isAdminProfile: this.isAdminProfile(),
        isOperatorProfile: this.isOperatorProfile(),
        canAccessAdminArea: this.canAccessAdminArea(),
        canAccessOperatorArea: this.canAccessOperatorArea(),
        canAccessYard: this.canAccessYard(),
        canAccessFinance: this.canAccessFinance(),
        canAccessReports: this.canAccessReports(),
        canAccessDocuments: this.canAccessDocuments(),
        canAccessSettings: this.canAccessSettings(),
        canManageBusinessSettings: this.canManageBusinessSettings(),
        canViewFinancial: this.canViewFinancial(),
        canManageUsers: this.canManageUsers(),
        canManageTeam: this.canManageTeam(),
        canManageClientRegistrations: this.canManageClientRegistrations(),
        canManageVehicleRegistrations: this.canManageVehicleRegistrations(),
        canManageProducts: this.canManageProducts(),
        canManageSupplies: this.canManageSupplies(),
        canManageServices: this.canManageServices(),
        canManageQuotes: this.canManageQuotes(),
        canApproveBillingClients: this.canApproveBillingClients(),
        canLogout: this.canLogout()
      };
    }
  };
}
