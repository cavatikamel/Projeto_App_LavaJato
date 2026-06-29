import {
  buildCanonicalId,
  createContractEnvelope,
  createError,
  createMetadata,
  createValidationResult as createValidation,
  createWarning,
  mergeValidationResults as mergeValidations,
  normalizeSourceId,
  toValidationSummary
} from "./shared/adapterHelpers.js";

export const CUSTOMER_CONTRACT_NAME = "Customer";
export const CUSTOMER_CONTRACT_VERSION = "1.0.0";

const ADAPTER_NAME = "customerAdapter";
const CONTRACT_NAMESPACE = "customer";
const DEFAULT_SOURCE = "web.clientRegistry";
const DEFAULT_SOURCE_COLLECTION = "clientRegistry";
const DEFAULT_ID_STRATEGY = "namespaceLegacySource";
const DEFAULT_MASTER_DATA_STATUS = "active";
const MASTER_DATA_STATUSES = ["draft", "active", "inactive", "archived"];
const REQUIRED_FIELDS = [
  "id",
  "organizationId",
  "kind",
  "name",
  "status",
  "billingApproved",
  "createdAt",
  "updatedAt"
];

export function toCustomerContract(legacyCustomer, context = {}) {
  const source = toPlainObject(legacyCustomer);
  const options = normalizeLegacyContext(source, context);
  const customerContract = buildCustomerContract(source, options);
  const validation = mergeValidations(
    validateCustomerContract(customerContract),
    validatePayloadContext(customerContract, source, options)
  );
  const metadata = buildMetadata("legacy-to-contract-payload", options, {
    emittedAt: options.now,
    notes: []
  });

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    customerContract,
    validation: toValidationSummary(validation),
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata,
    source: options.source,
    sourceId: options.sourceId
  };
}

export function validateCustomerContract(customerContract) {
  const candidate = toPlainObject(customerContract);
  const payload = isPlainObject(candidate.payload) ? toPlainObject(candidate.payload) : candidate;
  const payloadValidation = validateCustomerPayload(payload);

  if (!isPlainObject(candidate.payload)) {
    return payloadValidation;
  }

  const envelopeValidation = validateCustomerEnvelope(candidate, payload);
  return mergeValidations(payloadValidation, envelopeValidation);
}

export function createCustomerContractEnvelope(customerContract, context = {}) {
  const payload = toPlainObject(customerContract);
  const options = normalizeEnvelopeContext(payload, context);
  const provisionalWarnings = collectEnvelopeWarnings(payload, options);

  if (!options.now && !options.emittedAt) {
    provisionalWarnings.push(
      createWarning(
        "CTX_EMITTED_AT_REQUIRED",
        "metadata.emittedAt should come from context.now or context.emittedAt because the adapter does not read runtime time implicitly."
      )
    );
  }

  const emittedAt = options.emittedAt || options.now;
  const legacyRefs = buildEnvelopeLegacyRefs(payload, options);
  const metadata = buildMetadata("legacy-to-contract-envelope", options, {
    emittedAt,
    notes: []
  });
  const customerContractEnvelope = createContractEnvelope({
    contractName: CUSTOMER_CONTRACT_NAME,
    contractVersion: options.contractVersion || CUSTOMER_CONTRACT_VERSION,
    payload,
    organizationId: normalizeString(payload.organizationId || options.organizationId),
    source: options.source,
    sourceId: options.sourceId,
    createdAt: normalizeIsoTimestamp(payload.createdAt || options.createdAt),
    updatedAt: normalizeIsoTimestamp(payload.updatedAt || options.updatedAt),
    status: normalizeStatus(payload.status || options.status || options.defaultStatus),
    metadata,
    legacyRefs
  });

  const validation = mergeValidations(
    validateCustomerContract(customerContractEnvelope),
    createValidation([], provisionalWarnings, [], false)
  );

  customerContractEnvelope.warnings = validation.warnings;
  customerContractEnvelope.validation = toValidationSummary(validation);

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    customerContractEnvelope,
    validation: customerContractEnvelope.validation,
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata
  };
}

function buildCustomerContract(source, options) {
  const status = resolveContractStatus(options);
  const createdAt = resolveCreatedAt(options);
  const updatedAt = resolveUpdatedAt(options);
  const vehicleIds = normalizeStringArray(options.vehicleIds);
  const customerContract = {
    id: resolveCanonicalId(options),
    organizationId: normalizeString(options.organizationId),
    kind: resolveCustomerKind(source, options),
    name: resolveCustomerName(source),
    document: normalizeDocument(source.document),
    status,
    billingApproved: hasBoolean(source.billingApproved) ? source.billingApproved : false,
    createdAt,
    updatedAt
  };

  const customerCode = normalizeString(options.customerCode || source.customerCode);
  if (customerCode) customerContract.customerCode = customerCode;

  const legalName = normalizeString(source.legalName || options.legalName);
  if (legalName) customerContract.legalName = legalName;

  const phonePrimary = normalizePhone(source.phone || options.phonePrimary);
  if (phonePrimary) customerContract.phonePrimary = phonePrimary;

  const phoneSecondary = normalizePhone(options.phoneSecondary || source.phoneSecondary);
  if (phoneSecondary) customerContract.phoneSecondary = phoneSecondary;

  const email = normalizeEmail(options.email || source.email);
  if (email) customerContract.email = email;

  const address = mapLegacyAddress(source.address, options.address);
  if (address) customerContract.address = address;

  const billingCycle = normalizeString(options.billingCycle || source.billingCycle);
  if (billingCycle) customerContract.billingCycle = billingCycle;

  if (hasBoolean(options.allowMultipleOpenInvoices)) {
    customerContract.allowMultipleOpenInvoices = options.allowMultipleOpenInvoices;
  } else if (hasBoolean(source.allowMultipleOpenInvoices)) {
    customerContract.allowMultipleOpenInvoices = source.allowMultipleOpenInvoices;
  }

  if (vehicleIds.length) customerContract.vehicleIds = vehicleIds;

  const notes = normalizeString(options.notes || source.notes);
  if (notes) customerContract.notes = notes;

  const legacyRefs = buildLegacyRefs(source, options, vehicleIds);
  if (Object.keys(legacyRefs).length) customerContract.legacyRefs = legacyRefs;

  return customerContract;
}

function validateCustomerPayload(payload) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];
    const isMissing = typeof value === "boolean" ? false : !normalizeString(value);

    if (isMissing) {
      missingRequiredFields.push(field);
      errors.push(createError("PAYLOAD_REQUIRED_FIELD_MISSING", `Missing required field: ${field}`));
    }
  }

  if (payload.kind && !["PF", "PJ"].includes(payload.kind)) {
    errors.push(createError("PAYLOAD_KIND_INVALID", "Field kind must be PF or PJ."));
  }

  if (payload.document && !isNormalizedDocument(payload.document)) {
    errors.push(createError("PAYLOAD_DOCUMENT_INVALID", "Field document must contain a normalized CPF or CNPJ."));
  }

  const billedCustomer = isBilledCustomerPayload(payload);
  if (billedCustomer && !normalizeString(payload.document)) {
    missingRequiredFields.push("document");
    errors.push(
      createError(
        "PAYLOAD_BILLED_DOCUMENT_REQUIRED",
        "Field document is required when the customer is configured for billed/faturado operation."
      )
    );
  } else if (!billedCustomer && !normalizeString(payload.document)) {
    warnings.push(
      createWarning(
        "PAYLOAD_COMMON_DOCUMENT_RECOMMENDED",
        "Common customers may operate without document in the legacy routine, but document remains recommended for future billing readiness."
      )
    );
  }

  if (payload.phonePrimary && !isNormalizedPhone(payload.phonePrimary)) {
    warnings.push(createWarning("PAYLOAD_PHONE_PRIMARY_NON_STANDARD", "phonePrimary should be normalized to 10 or 11 digits."));
  }

  if (payload.phoneSecondary && !isNormalizedPhone(payload.phoneSecondary)) {
    warnings.push(createWarning("PAYLOAD_PHONE_SECONDARY_NON_STANDARD", "phoneSecondary should be normalized to 10 or 11 digits."));
  }

  if (payload.createdAt && !isIsoTimestamp(payload.createdAt)) {
    errors.push(createError("PAYLOAD_CREATED_AT_INVALID", "Field createdAt must be an ISO 8601 timestamp."));
  }

  if (payload.updatedAt && !isIsoTimestamp(payload.updatedAt)) {
    errors.push(createError("PAYLOAD_UPDATED_AT_INVALID", "Field updatedAt must be an ISO 8601 timestamp."));
  }

  if (payload.status && !MASTER_DATA_STATUSES.includes(payload.status)) {
    warnings.push(
      createWarning(
        "PAYLOAD_STATUS_NON_STANDARD",
        "Status is outside the shared master data defaults and should be reviewed before cross-surface adoption."
      )
    );
  }

  if (payload.address && !isPlainObject(payload.address)) {
    errors.push(createError("PAYLOAD_ADDRESS_INVALID", "Field address must be an object when present."));
  }

  if (payload.vehicleIds && !Array.isArray(payload.vehicleIds)) {
    errors.push(createError("PAYLOAD_VEHICLE_IDS_INVALID", "Field vehicleIds must be an array when present."));
  }

  if (Array.isArray(payload.vehicleIds) && payload.vehicleIds.some((value) => !normalizeString(value))) {
    errors.push(createError("PAYLOAD_VEHICLE_IDS_EMPTY", "Field vehicleIds must not contain empty identifiers."));
  }

  if (payload.legacyRefs && !isPlainObject(payload.legacyRefs)) {
    errors.push(createError("PAYLOAD_LEGACY_REFS_INVALID", "Field legacyRefs must be an object when present."));
  }

  if (isPlainObject(payload.legacyRefs)) {
    const legacyRefsValidation = validateLegacyRefsStructure(payload.legacyRefs, "payload.legacyRefs");
    errors.push(...legacyRefsValidation.errors);
    warnings.push(...legacyRefsValidation.warnings);
  }

  if (Object.prototype.hasOwnProperty.call(payload, "billingApproved") && typeof payload.billingApproved !== "boolean") {
    errors.push(createError("PAYLOAD_BILLING_APPROVED_INVALID", "Field billingApproved must be boolean."));
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function validateCustomerEnvelope(envelope, payload) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (envelope.contractName !== CUSTOMER_CONTRACT_NAME) {
    errors.push(createError("ENV_CONTRACT_NAME_INVALID", `Field contractName must be ${CUSTOMER_CONTRACT_NAME}.`));
  }

  if (!normalizeString(envelope.contractVersion)) {
    missingRequiredFields.push("contractVersion");
    errors.push(createError("ENV_CONTRACT_VERSION_REQUIRED", "Field contractVersion must be a non-empty string."));
  } else if (normalizeString(envelope.contractVersion) !== CUSTOMER_CONTRACT_VERSION) {
    warnings.push(
      createWarning(
        "ENV_CONTRACT_VERSION_REVIEW",
        `contractVersion differs from ${CUSTOMER_CONTRACT_VERSION} and should be reviewed against shared compatibility rules.`
      )
    );
  }

  if (!isPlainObject(envelope.payload)) {
    missingRequiredFields.push("payload");
    errors.push(createError("ENV_PAYLOAD_REQUIRED", "Field payload must be an object."));
  }

  if (!normalizeString(envelope.organizationId)) {
    missingRequiredFields.push("organizationId");
    errors.push(createError("ENV_ORGANIZATION_ID_REQUIRED", "Field organizationId is required on the envelope."));
  }

  if (!normalizeString(envelope.source)) {
    missingRequiredFields.push("source");
    errors.push(createError("ENV_SOURCE_REQUIRED", "Field source is required on the envelope."));
  }

  if (!normalizeString(envelope.sourceId)) {
    missingRequiredFields.push("sourceId");
    errors.push(createError("ENV_SOURCE_ID_REQUIRED", "Field sourceId is required on the envelope."));
  }

  if (!normalizeIsoTimestamp(envelope.createdAt)) {
    missingRequiredFields.push("createdAt");
    errors.push(createError("ENV_CREATED_AT_REQUIRED", "Field createdAt must be an ISO 8601 timestamp on the envelope."));
  }

  if (!normalizeIsoTimestamp(envelope.updatedAt)) {
    missingRequiredFields.push("updatedAt");
    errors.push(createError("ENV_UPDATED_AT_REQUIRED", "Field updatedAt must be an ISO 8601 timestamp on the envelope."));
  }

  if (!normalizeString(envelope.status)) {
    missingRequiredFields.push("status");
    errors.push(createError("ENV_STATUS_REQUIRED", "Field status is required on the envelope."));
  }

  if (!Array.isArray(envelope.warnings)) {
    missingRequiredFields.push("warnings");
    errors.push(createError("ENV_WARNINGS_REQUIRED", "Field warnings must be an array."));
  } else if (envelope.warnings.some((warning) => !normalizeString(warning))) {
    errors.push(createError("ENV_WARNINGS_INVALID", "Field warnings must contain only non-empty strings."));
  }

  if (!isPlainObject(envelope.validation)) {
    missingRequiredFields.push("validation");
    errors.push(createError("ENV_VALIDATION_REQUIRED", "Field validation must be an object."));
  } else {
    const validationShape = validateValidationShape(envelope.validation, "validation");
    errors.push(...validationShape.errors);
  }

  if (!isPlainObject(envelope.metadata)) {
    missingRequiredFields.push("metadata");
    errors.push(createError("ENV_METADATA_REQUIRED", "Field metadata must be an object."));
  } else {
    const metadataValidation = validateMetadataStructure(envelope.metadata, "metadata");
    errors.push(...metadataValidation.errors);
    warnings.push(...metadataValidation.warnings);
  }

  if (envelope.legacyRefs && !isPlainObject(envelope.legacyRefs)) {
    errors.push(createError("ENV_LEGACY_REFS_INVALID", "Field legacyRefs must be an object when present."));
  }

  if (isPlainObject(envelope.legacyRefs)) {
    const legacyRefsValidation = validateLegacyRefsStructure(envelope.legacyRefs, "legacyRefs");
    errors.push(...legacyRefsValidation.errors);
    warnings.push(...legacyRefsValidation.warnings);
  }

  if (normalizeString(envelope.organizationId) && normalizeString(payload.organizationId) && envelope.organizationId !== payload.organizationId) {
    errors.push(createError("ENV_PAYLOAD_ORGANIZATION_ID_MISMATCH", "Envelope organizationId must match payload.organizationId."));
  }

  if (normalizeString(envelope.status) && normalizeString(payload.status) && envelope.status !== payload.status) {
    errors.push(createError("ENV_PAYLOAD_STATUS_MISMATCH", "Envelope status must match payload.status."));
  }

  if (normalizeIsoTimestamp(envelope.createdAt) && normalizeIsoTimestamp(payload.createdAt) && envelope.createdAt !== payload.createdAt) {
    errors.push(createError("ENV_PAYLOAD_CREATED_AT_MISMATCH", "Envelope createdAt must match payload.createdAt."));
  }

  if (normalizeIsoTimestamp(envelope.updatedAt) && normalizeIsoTimestamp(payload.updatedAt) && envelope.updatedAt !== payload.updatedAt) {
    errors.push(createError("ENV_PAYLOAD_UPDATED_AT_MISMATCH", "Envelope updatedAt must match payload.updatedAt."));
  }

  if (normalizeString(envelope.sourceId) && isPlainObject(envelope.legacyRefs) && normalizeString(envelope.legacyRefs.sourceId) && envelope.sourceId !== envelope.legacyRefs.sourceId) {
    warnings.push(
      createWarning(
        "ENV_LEGACY_SOURCE_ID_DIFFERENT",
        "Envelope sourceId differs from legacyRefs.sourceId and should be reviewed for intentional cross-source traceability."
      )
    );
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function validatePayloadContext(customerContract, source, options) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (!normalizeString(options.organizationId)) {
    warnings.push(
      createWarning(
        "CTX_ORGANIZATION_ID_REQUIRED",
        "organizationId must be provided explicitly by context because the legacy customer shape does not own tenant identity."
      )
    );
  }

  if (!normalizeString(options.sourceId)) {
    errors.push(createError("CTX_SOURCE_ID_REQUIRED", "sourceId is required by the shared adapter baseline and could not be resolved from context or legacy input."));
    missingRequiredFields.push("sourceId");
    warnings.push(
      createWarning(
        "CTX_SOURCE_ID_REQUIRED",
        "sourceId is required for shared envelope traceability and remains unresolved in this scenario."
      )
    );
  }

  if (options.sourceWasInferred) {
    warnings.push(
      createWarning(
        "CTX_SOURCE_INFERRED",
        `source was inferred as ${options.source} because context.source was not provided explicitly.`
      )
    );
  }

  if (options.statusWasDefaulted) {
    warnings.push(
      createWarning(
        "CTX_DEFAULT_STATUS_APPLIED",
        `status defaulted to ${customerContract.status} using the shared master data baseline because no explicit context status was provided.`
      )
    );
  }

  if (!options.now && !options.createdAt && !options.updatedAt) {
    warnings.push(
      createWarning(
        "CTX_NOW_REQUIRED",
        "context.now should be provided when createdAt and updatedAt are not supplied explicitly, because the adapter does not read runtime time implicitly."
      )
    );
  }

  const legacyPlates = normalizeStringArray(source.plates);
  if (!normalizeStringArray(customerContract.vehicleIds).length && legacyPlates.length) {
    warnings.push(
      createWarning(
        "LEGACY_PLATES_PRESERVED",
        "vehicleIds were not derived from legacy plates in this phase; plate references were preserved only inside legacyRefs."
      )
    );
  }

  if (normalizeString(source.billingClientId)) {
    warnings.push(
      createWarning(
        "LEGACY_PARALLEL_CUSTOMER_SOURCE",
        "billingClients remains a legacy parallel source and was preserved only for traceability, not for canonical ownership."
      )
    );
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function normalizeLegacyContext(source, context) {
  const options = toPlainObject(context);
  const sourceWasInferred = !normalizeString(options.source);
  const sourceName = normalizeString(options.source) || inferSourceName(source);
  const sourceId = resolveLegacySourceId(source, options);
  const explicitStatus = normalizeStatus(options.status);
  const defaultStatus = normalizeStatus(options.defaultStatus);
  const status = explicitStatus || defaultStatus || DEFAULT_MASTER_DATA_STATUS;
  const now = normalizeIsoTimestamp(options.now);
  const createdAt = normalizeIsoTimestamp(options.createdAt) || now;
  const updatedAt = normalizeIsoTimestamp(options.updatedAt) || now;

  return {
    ...options,
    organizationId: normalizeString(options.organizationId),
    now,
    createdAt,
    updatedAt,
    emittedAt: normalizeIsoTimestamp(options.emittedAt),
    source: sourceName,
    sourceId,
    sourceCollection: resolveSourceCollection(sourceName, options.sourceCollection),
    sourceWasInferred,
    status,
    statusWasDefaulted: !explicitStatus && !defaultStatus,
    defaultStatus: defaultStatus || DEFAULT_MASTER_DATA_STATUS,
    idStrategy: normalizeIdStrategy(options.idStrategy) || DEFAULT_ID_STRATEGY,
    strictMode: options.strictMode !== false,
    allowWarnings: options.allowWarnings !== false,
    vehicleIds: normalizeStringArray(options.vehicleIds)
  };
}

function normalizeEnvelopeContext(customerContract, context) {
  const options = toPlainObject(context);
  const payload = toPlainObject(customerContract);
  const payloadLegacyRefs = toPlainObject(payload.legacyRefs);
  const sourceName = normalizeString(options.source) || inferEnvelopeSource(payloadLegacyRefs);
  const sourceId =
    normalizeString(options.sourceId) ||
    normalizeString(payloadLegacyRefs.sourceId) ||
    normalizeString(payloadLegacyRefs.alternateIds?.billingClientId) ||
    "";
  const explicitStatus = normalizeStatus(options.status);
  const defaultStatus = normalizeStatus(options.defaultStatus);
  const status = explicitStatus || defaultStatus || normalizeStatus(payload.status) || DEFAULT_MASTER_DATA_STATUS;
  const now = normalizeIsoTimestamp(options.now);

  return {
    ...options,
    organizationId: normalizeString(options.organizationId || payload.organizationId),
    now,
    createdAt: normalizeIsoTimestamp(options.createdAt || payload.createdAt) || now,
    updatedAt: normalizeIsoTimestamp(options.updatedAt || payload.updatedAt) || now,
    emittedAt: normalizeIsoTimestamp(options.emittedAt),
    contractVersion: normalizeString(options.contractVersion),
    source: sourceName,
    sourceId,
    sourceCollection: resolveSourceCollection(sourceName, payloadLegacyRefs.sourceCollection),
    status,
    statusWasDefaulted: !explicitStatus && !defaultStatus && !normalizeStatus(payload.status),
    defaultStatus: defaultStatus || DEFAULT_MASTER_DATA_STATUS,
    idStrategy: normalizeIdStrategy(options.idStrategy) || DEFAULT_ID_STRATEGY,
    strictMode: options.strictMode !== false,
    allowWarnings: options.allowWarnings !== false,
    legacyRefs: toPlainObject(options.legacyRefs)
  };
}

function resolveCanonicalId(options) {
  const explicitCanonicalId = normalizeString(options.canonicalId);
  if (explicitCanonicalId) return explicitCanonicalId;

  const preservedId = normalizeString(options.preservedId);
  if (options.idStrategy === "preserveCanonicalId" && preservedId) return preservedId;

  const sourceId = normalizeSourceId(options.sourceId);
  if (options.idStrategy === DEFAULT_ID_STRATEGY && sourceId) {
    return buildCanonicalId(CONTRACT_NAMESPACE, sourceId);
  }

  return "";
}

function resolveLegacySourceId(source, options) {
  const explicitSourceId = normalizeString(options.sourceId);
  if (explicitSourceId) return explicitSourceId;

  const legacySourceId = normalizeString(source.id);
  if (legacySourceId) return legacySourceId;

  return normalizeString(source.billingClientId || options.billingClientId);
}

function resolveCustomerKind(source, options) {
  const explicitKind = normalizeKind(options.kind);
  if (explicitKind) return explicitKind;

  const legacyKind = normalizeKind(source.personType || source.kind);
  if (legacyKind) return legacyKind;

  return "";
}

function resolveCustomerName(source) {
  const primaryName = normalizeString(source.name);
  if (primaryName) return primaryName;
  return normalizeString(source.legalName);
}

function resolveContractStatus(options) {
  return normalizeStatus(options.status || options.defaultStatus || DEFAULT_MASTER_DATA_STATUS);
}

function resolveCreatedAt(options) {
  return normalizeIsoTimestamp(options.createdAt) || normalizeIsoTimestamp(options.now);
}

function resolveUpdatedAt(options) {
  return normalizeIsoTimestamp(options.updatedAt) || normalizeIsoTimestamp(options.now);
}

function buildLegacyRefs(source, options, vehicleIds) {
  const legacyRefs = {};
  const alternateIds = {};
  const relatedCollections = [];
  const legacyPlates = normalizeStringArray(source.plates);
  const notes = [];

  if (options.sourceCollection) legacyRefs.sourceCollection = options.sourceCollection;
  if (options.sourceId) legacyRefs.sourceId = options.sourceId;

  const legacyRegistryId = normalizeString(source.id);
  const billingClientId = normalizeString(source.billingClientId || options.billingClientId);

  if (billingClientId && billingClientId !== options.sourceId) {
    alternateIds.billingClientId = billingClientId;
  }

  if (legacyRegistryId && options.sourceCollection === "billingClients" && legacyRegistryId !== options.sourceId) {
    alternateIds.clientRegistryId = legacyRegistryId;
  }

  if (legacyRegistryId && options.sourceCollection !== "clientRegistry") {
    relatedCollections.push("clientRegistry");
  }

  if (billingClientId && options.sourceCollection !== "billingClients") {
    relatedCollections.push("billingClients");
  }

  if (legacyPlates.length) {
    legacyRefs.legacyPlates = legacyPlates;
    if (!vehicleIds.length) {
      notes.push("vehicleIds remain unresolved and legacyPlates were preserved only for traceability.");
    }
  }

  const personType = normalizeKind(source.personType);
  if (personType) legacyRefs.personType = personType;

  if (hasBoolean(source.billing)) legacyRefs.billingFlag = source.billing;
  if (Object.keys(alternateIds).length) legacyRefs.alternateIds = alternateIds;
  if (relatedCollections.length) legacyRefs.relatedCollections = uniqueStrings(relatedCollections);
  if (notes.length) legacyRefs.notes = uniqueStrings(notes);

  return mergeLegacyRefs(legacyRefs, toPlainObject(options.legacyRefs));
}

function buildEnvelopeLegacyRefs(payload, options) {
  const payloadLegacyRefs = toPlainObject(payload.legacyRefs);
  return mergeLegacyRefs(payloadLegacyRefs, toPlainObject(options.legacyRefs));
}

function collectEnvelopeWarnings(payload, options) {
  const warnings = [];
  const legacyRefs = toPlainObject(payload.legacyRefs);

  if (!normalizeStringArray(payload.vehicleIds).length && normalizeStringArray(legacyRefs.legacyPlates).length) {
    warnings.push(
      createWarning(
        "LEGACY_PLATES_PRESERVED",
        "vehicleIds were not derived from legacy plates in this phase; plate references were preserved only inside legacyRefs."
      )
    );
  }

  if (normalizeString(legacyRefs.alternateIds?.billingClientId) || normalizeStringArray(legacyRefs.relatedCollections).includes("billingClients")) {
    warnings.push(
      createWarning(
        "LEGACY_PARALLEL_CUSTOMER_SOURCE",
        "billingClients remains a legacy parallel source and was preserved only for traceability, not for canonical ownership."
      )
    );
  }

  if (options.statusWasDefaulted) {
    warnings.push(
      createWarning(
        "CTX_DEFAULT_STATUS_APPLIED",
        `status defaulted to ${DEFAULT_MASTER_DATA_STATUS} using the shared master data baseline because no explicit context status was provided.`
      )
    );
  }

  return warnings;
}

function mergeLegacyRefs(baseRefs, extraRefs) {
  const base = toPlainObject(baseRefs);
  const extra = toPlainObject(extraRefs);
  const merged = {};

  merged.sourceCollection = normalizeString(extra.sourceCollection || base.sourceCollection);
  merged.sourceId = normalizeString(extra.sourceId || base.sourceId);

  const alternateIds = mergeStringObject(base.alternateIds, extra.alternateIds);
  const relatedCollections = uniqueStrings([
    ...normalizeStringArray(base.relatedCollections),
    ...normalizeStringArray(extra.relatedCollections)
  ]);
  const legacyPlates = uniqueStrings([
    ...normalizeStringArray(base.legacyPlates),
    ...normalizeStringArray(extra.legacyPlates),
    ...normalizeStringArray(extra.plates)
  ]);
  const derivedKeys = uniqueStrings([
    ...normalizeStringArray(base.derivedKeys),
    ...normalizeStringArray(extra.derivedKeys)
  ]);
  const notes = uniqueStrings([
    ...normalizeStringArray(base.notes),
    ...normalizeStringArray(extra.notes)
  ]);

  if (merged.sourceCollection) merged.sourceCollection = merged.sourceCollection;
  if (merged.sourceId) merged.sourceId = merged.sourceId;
  if (Object.keys(alternateIds).length) merged.alternateIds = alternateIds;
  if (relatedCollections.length) merged.relatedCollections = relatedCollections;
  if (legacyPlates.length) merged.legacyPlates = legacyPlates;
  if (derivedKeys.length) merged.derivedKeys = derivedKeys;
  if (notes.length) merged.notes = notes;

  const personType = normalizeKind(extra.personType || base.personType);
  if (personType) merged.personType = personType;

  const billingFlag = resolveBoolean(extra.billingFlag, base.billingFlag);
  if (typeof billingFlag === "boolean") merged.billingFlag = billingFlag;

  return removeEmptyObjectKeys(merged);
}

function buildMetadata(adapterMode, options, extra = {}) {
  return createMetadata({
    adapterName: ADAPTER_NAME,
    adapterMode,
    contractNamespace: CONTRACT_NAMESPACE,
    idStrategy: normalizeIdStrategy(options.idStrategy) || DEFAULT_ID_STRATEGY,
    strictMode: options.strictMode !== false,
    allowWarnings: options.allowWarnings !== false,
    emittedAt: normalizeIsoTimestamp(extra.emittedAt || options.emittedAt || options.now),
    notes: normalizeStringArray(extra.notes)
  });
}

function validateLegacyRefsStructure(legacyRefs, pathLabel) {
  const errors = [];
  const warnings = [];

  if (Object.prototype.hasOwnProperty.call(legacyRefs, "alternateIds") && !isPlainObject(legacyRefs.alternateIds)) {
    errors.push(createError("LEGACY_REFS_ALTERNATE_IDS_INVALID", `${pathLabel}.alternateIds must be an object when present.`));
  }

  if (Object.prototype.hasOwnProperty.call(legacyRefs, "relatedCollections") && !Array.isArray(legacyRefs.relatedCollections)) {
    errors.push(createError("LEGACY_REFS_RELATED_COLLECTIONS_INVALID", `${pathLabel}.relatedCollections must be an array when present.`));
  }

  if (Object.prototype.hasOwnProperty.call(legacyRefs, "legacyPlates") && !Array.isArray(legacyRefs.legacyPlates)) {
    errors.push(createError("LEGACY_REFS_LEGACY_PLATES_INVALID", `${pathLabel}.legacyPlates must be an array when present.`));
  }

  if (Object.prototype.hasOwnProperty.call(legacyRefs, "derivedKeys") && !Array.isArray(legacyRefs.derivedKeys)) {
    errors.push(createError("LEGACY_REFS_DERIVED_KEYS_INVALID", `${pathLabel}.derivedKeys must be an array when present.`));
  }

  if (Object.prototype.hasOwnProperty.call(legacyRefs, "notes") && !Array.isArray(legacyRefs.notes)) {
    errors.push(createError("LEGACY_REFS_NOTES_INVALID", `${pathLabel}.notes must be an array when present.`));
  }

  if (normalizeString(legacyRefs.sourceCollection) && !normalizeString(legacyRefs.sourceId)) {
    warnings.push(
      createWarning(
        "LEGACY_REFS_SOURCE_ID_REVIEW",
        `${pathLabel}.sourceCollection is present without sourceId and should be reviewed for traceability completeness.`
      )
    );
  }

  return createValidation(errors, warnings, []);
}

function validateValidationShape(validation, pathLabel) {
  const errors = [];

  if (typeof validation.ok !== "boolean") {
    errors.push(createError("ENV_VALIDATION_OK_INVALID", `${pathLabel}.ok must be boolean.`));
  }

  if (!Array.isArray(validation.errors)) {
    errors.push(createError("ENV_VALIDATION_ERRORS_INVALID", `${pathLabel}.errors must be an array.`));
  }

  if (!Array.isArray(validation.missingRequiredFields)) {
    errors.push(createError("ENV_VALIDATION_MISSING_REQUIRED_INVALID", `${pathLabel}.missingRequiredFields must be an array.`));
  }

  if (typeof validation.blocking !== "boolean") {
    errors.push(createError("ENV_VALIDATION_BLOCKING_INVALID", `${pathLabel}.blocking must be boolean.`));
  }

  return createValidation(errors, [], []);
}

function validateMetadataStructure(metadata, pathLabel) {
  const errors = [];
  const warnings = [];

  if (!normalizeString(metadata.adapterName)) {
    errors.push(createError("ENV_METADATA_ADAPTER_NAME_REQUIRED", `${pathLabel}.adapterName is required.`));
  }

  if (!normalizeString(metadata.adapterMode)) {
    errors.push(createError("ENV_METADATA_ADAPTER_MODE_REQUIRED", `${pathLabel}.adapterMode is required.`));
  }

  if (!normalizeString(metadata.contractNamespace)) {
    errors.push(createError("ENV_METADATA_NAMESPACE_REQUIRED", `${pathLabel}.contractNamespace is required.`));
  }

  if (Object.prototype.hasOwnProperty.call(metadata, "strictMode") && typeof metadata.strictMode !== "boolean") {
    errors.push(createError("ENV_METADATA_STRICT_MODE_INVALID", `${pathLabel}.strictMode must be boolean when present.`));
  }

  if (Object.prototype.hasOwnProperty.call(metadata, "allowWarnings") && typeof metadata.allowWarnings !== "boolean") {
    errors.push(createError("ENV_METADATA_ALLOW_WARNINGS_INVALID", `${pathLabel}.allowWarnings must be boolean when present.`));
  }

  if (!normalizeIsoTimestamp(metadata.emittedAt)) {
    warnings.push(
      createWarning(
        "ENV_METADATA_EMITTED_AT_REVIEW",
        `${pathLabel}.emittedAt should be an ISO 8601 timestamp supplied from context for cross-surface auditing.`
      )
    );
  }

  return createValidation(errors, warnings, []);
}

function inferSourceName(source) {
  if (normalizeString(source.id)) return DEFAULT_SOURCE;
  if (normalizeString(source.billingClientId)) return "web.billingClients";
  return DEFAULT_SOURCE;
}

function inferEnvelopeSource(legacyRefs) {
  const sourceCollection = normalizeString(legacyRefs.sourceCollection);
  if (sourceCollection === "billingClients") return "web.billingClients";
  if (sourceCollection === "clientRegistry") return DEFAULT_SOURCE;
  return DEFAULT_SOURCE;
}

function resolveSourceCollection(sourceName, fallbackValue) {
  const explicitSourceCollection = normalizeString(fallbackValue);
  if (explicitSourceCollection) return explicitSourceCollection;

  const normalizedSourceName = normalizeString(sourceName);
  if (!normalizedSourceName) return DEFAULT_SOURCE_COLLECTION;
  if (normalizedSourceName.endsWith("billingClients")) return "billingClients";
  if (normalizedSourceName.endsWith("clientRegistry")) return "clientRegistry";

  const sourceSegments = normalizedSourceName.split(".");
  return normalizeString(sourceSegments[sourceSegments.length - 1]) || DEFAULT_SOURCE_COLLECTION;
}

function mapLegacyAddress(legacyAddress, explicitAddress) {
  if (isPlainObject(explicitAddress)) return { ...explicitAddress };

  const rawAddress = normalizeString(legacyAddress);
  if (!rawAddress) return null;

  return { raw: rawAddress };
}

function mergeStringObject(baseValue, extraValue) {
  const base = toPlainObject(baseValue);
  const extra = toPlainObject(extraValue);
  const merged = {};

  for (const [key, value] of Object.entries(base)) {
    const normalized = normalizeString(value);
    if (normalized) merged[key] = normalized;
  }

  for (const [key, value] of Object.entries(extra)) {
    const normalized = normalizeString(value);
    if (normalized) merged[key] = normalized;
  }

  return merged;
}

function resolveBoolean(primaryValue, fallbackValue) {
  if (typeof primaryValue === "boolean") return primaryValue;
  if (typeof fallbackValue === "boolean") return fallbackValue;
  return undefined;
}

function isBilledCustomerPayload(payload) {
  const legacyRefs = toPlainObject(payload.legacyRefs);
  if (payload.billingApproved === true) return true;
  if (normalizeString(payload.billingCycle)) return true;
  if (payload.allowMultipleOpenInvoices === true) return true;
  if (legacyRefs.billingFlag === true) return true;
  if (normalizeString(legacyRefs.alternateIds?.billingClientId)) return true;
  return false;
}

function removeEmptyObjectKeys(value) {
  const cleaned = {};

  for (const [key, entry] of Object.entries(value)) {
    if (Array.isArray(entry) && entry.length === 0) continue;
    if (isPlainObject(entry) && Object.keys(entry).length === 0) continue;
    if (typeof entry === "string" && !normalizeString(entry)) continue;
    cleaned[key] = entry;
  }

  return cleaned;
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function normalizeDocument(value) {
  return normalizeString(value).replace(/\D/g, "");
}

function normalizePhone(value) {
  return normalizeString(value).replace(/\D/g, "");
}

function normalizeEmail(value) {
  const normalized = normalizeString(value).toLowerCase();
  return normalized || "";
}

function normalizeIsoTimestamp(value) {
  const normalized = normalizeString(value);
  if (!normalized) return "";
  return isIsoTimestamp(normalized) ? normalized : "";
}

function normalizeKind(value) {
  const normalized = normalizeString(value).toUpperCase();
  return normalized === "PF" || normalized === "PJ" ? normalized : "";
}

function normalizeStatus(value) {
  return normalizeString(value).toLowerCase();
}

function normalizeIdStrategy(value) {
  const normalized = normalizeString(value);
  if (!normalized) return "";

  const supportedStrategies = ["preserveCanonicalId", "namespaceLegacySource", "externalResolverRequired"];
  return supportedStrategies.includes(normalized) ? normalized : "";
}

function normalizeStringArray(values) {
  if (!Array.isArray(values)) return [];
  return uniqueStrings(values.map((value) => normalizeString(value)).filter(Boolean));
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function hasBoolean(value) {
  return typeof value === "boolean";
}

function isNormalizedDocument(value) {
  return /^\d{11}$|^\d{14}$/.test(value);
}

function isNormalizedPhone(value) {
  return /^\d{10,11}$/.test(value);
}

function isIsoTimestamp(value) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function toPlainObject(value) {
  return isPlainObject(value) ? { ...value } : {};
}
