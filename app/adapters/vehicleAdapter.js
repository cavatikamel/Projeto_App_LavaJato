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

export const VEHICLE_CONTRACT_NAME = "Vehicle";
export const VEHICLE_CONTRACT_VERSION = "1.0.0";

const ADAPTER_NAME = "vehicleAdapter";
const CONTRACT_NAMESPACE = "vehicle";
const RELATED_CUSTOMER_NAMESPACE = "customer";
const DEFAULT_SOURCE = "web.vehicleRegistry";
const DEFAULT_SOURCE_COLLECTION = "vehicleRegistry";
const DEFAULT_ID_STRATEGY = "namespaceLegacySource";
const DEFAULT_MASTER_DATA_STATUS = "active";
const MASTER_DATA_STATUSES = ["draft", "active", "inactive", "archived"];
const REQUIRED_FIELDS = [
  "id",
  "organizationId",
  "currentCustomerId",
  "plate",
  "brand",
  "model",
  "vehicleType",
  "status",
  "createdAt",
  "updatedAt"
];

export function toVehicleContract(legacyVehicle, context = {}) {
  const source = toPlainObject(legacyVehicle);
  const options = normalizeLegacyContext(source, context);
  const vehicleContract = buildVehicleContract(source, options);
  const validation = mergeValidations(
    validateVehicleContract(vehicleContract),
    validatePayloadContext(vehicleContract, source, options)
  );
  const metadata = buildMetadata("legacy-to-contract-payload", options, {
    emittedAt: options.now,
    notes: []
  });

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    vehicleContract,
    validation: toValidationSummary(validation),
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata,
    source: options.source,
    sourceId: options.sourceId
  };
}

export function validateVehicleContract(vehicleContract) {
  const candidate = toPlainObject(vehicleContract);
  const payload = isPlainObject(candidate.payload) ? toPlainObject(candidate.payload) : candidate;
  const payloadValidation = validateVehiclePayload(payload);

  if (!isPlainObject(candidate.payload)) {
    return payloadValidation;
  }

  const envelopeValidation = validateVehicleEnvelope(candidate, payload);
  return mergeValidations(payloadValidation, envelopeValidation);
}

export function createVehicleContractEnvelope(vehicleContract, context = {}) {
  const payload = toPlainObject(vehicleContract);
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
  const vehicleContractEnvelope = createContractEnvelope({
    contractName: VEHICLE_CONTRACT_NAME,
    contractVersion: options.contractVersion || VEHICLE_CONTRACT_VERSION,
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
    validateVehicleContract(vehicleContractEnvelope),
    createValidation([], provisionalWarnings, [], false)
  );

  vehicleContractEnvelope.warnings = validation.warnings;
  vehicleContractEnvelope.validation = toValidationSummary(validation);

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    vehicleContractEnvelope,
    validation: vehicleContractEnvelope.validation,
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata
  };
}

function buildVehicleContract(source, options) {
  const status = resolveContractStatus(options);
  const createdAt = resolveCreatedAt(options);
  const updatedAt = resolveUpdatedAt(options);
  const plate = normalizePlate(source.plate || source.vehiclePlate || options.plate);
  const manufactureYear = resolveManufactureYear(source, options);
  const modelYear = resolveModelYear(source, options);
  const specialCareRefs = resolveSpecialCareRefs(source, options);
  const ownerHistoryRefs = resolveOwnerHistoryRefs(source, options);
  const vehicleContract = {
    id: resolveCanonicalId(options),
    organizationId: normalizeString(options.organizationId),
    currentCustomerId: normalizeString(options.currentCustomerId),
    plate,
    brand: normalizeString(options.brand || source.brand),
    model: normalizeString(options.model || source.model),
    vehicleType: resolveVehicleType(source, options),
    status,
    createdAt,
    updatedAt
  };

  const category = normalizeString(options.category || source.category);
  if (category) vehicleContract.category = category;

  if (manufactureYear != null) vehicleContract.manufactureYear = manufactureYear;
  if (modelYear != null) vehicleContract.modelYear = modelYear;

  const color = normalizeString(options.color || source.color);
  if (color) vehicleContract.color = color;

  const fuel = normalizeString(options.fuel || source.fuel);
  if (fuel) vehicleContract.fuel = fuel;

  const notes = normalizeString(options.notes || source.notes);
  if (notes) vehicleContract.notes = notes;

  if (specialCareRefs.length) vehicleContract.specialCareRefs = specialCareRefs;
  if (ownerHistoryRefs.length) vehicleContract.ownerHistoryRefs = ownerHistoryRefs;

  const fipeRef = normalizeFipeRef(options.fipeRef || source.fipeRef);
  if (fipeRef) vehicleContract.fipeRef = fipeRef;

  const legacyRefs = buildLegacyRefs(source, options, {
    plate,
    specialCareRefs,
    ownerHistoryRefs
  });
  if (Object.keys(legacyRefs).length) vehicleContract.legacyRefs = legacyRefs;

  return vehicleContract;
}

function validateVehiclePayload(payload) {
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

  if (payload.plate && !isNormalizedPlate(payload.plate)) {
    errors.push(createError("PAYLOAD_PLATE_INVALID", "Field plate must contain a normalized vehicle plate."));
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

  if (Object.prototype.hasOwnProperty.call(payload, "manufactureYear") && !isValidYear(payload.manufactureYear)) {
    errors.push(createError("PAYLOAD_MANUFACTURE_YEAR_INVALID", "Field manufactureYear must be a valid 4-digit year."));
  }

  if (Object.prototype.hasOwnProperty.call(payload, "modelYear") && !isValidYear(payload.modelYear)) {
    errors.push(createError("PAYLOAD_MODEL_YEAR_INVALID", "Field modelYear must be a valid 4-digit year."));
  }

  if (
    Object.prototype.hasOwnProperty.call(payload, "manufactureYear") &&
    Object.prototype.hasOwnProperty.call(payload, "modelYear") &&
    Number(payload.modelYear) < Number(payload.manufactureYear)
  ) {
    warnings.push(
      createWarning(
        "PAYLOAD_MODEL_YEAR_BEFORE_MANUFACTURE_YEAR",
        "modelYear is earlier than manufactureYear and should be reviewed for legacy compatibility."
      )
    );
  }

  if (payload.specialCareRefs && !Array.isArray(payload.specialCareRefs)) {
    errors.push(createError("PAYLOAD_SPECIAL_CARE_REFS_INVALID", "Field specialCareRefs must be an array when present."));
  }

  if (Array.isArray(payload.specialCareRefs) && payload.specialCareRefs.some((value) => !normalizeString(value))) {
    errors.push(createError("PAYLOAD_SPECIAL_CARE_REFS_EMPTY", "Field specialCareRefs must not contain empty references."));
  }

  if (payload.ownerHistoryRefs && !Array.isArray(payload.ownerHistoryRefs)) {
    errors.push(createError("PAYLOAD_OWNER_HISTORY_REFS_INVALID", "Field ownerHistoryRefs must be an array when present."));
  }

  if (Array.isArray(payload.ownerHistoryRefs) && payload.ownerHistoryRefs.some((value) => !normalizeString(value))) {
    errors.push(createError("PAYLOAD_OWNER_HISTORY_REFS_EMPTY", "Field ownerHistoryRefs must not contain empty references."));
  }

  if (payload.fipeRef && !isPlainObject(payload.fipeRef)) {
    errors.push(createError("PAYLOAD_FIPE_REF_INVALID", "Field fipeRef must be an object when present."));
  }

  if (payload.legacyRefs && !isPlainObject(payload.legacyRefs)) {
    errors.push(createError("PAYLOAD_LEGACY_REFS_INVALID", "Field legacyRefs must be an object when present."));
  }

  if (isPlainObject(payload.legacyRefs)) {
    const legacyRefsValidation = validateLegacyRefsStructure(payload.legacyRefs, "payload.legacyRefs");
    errors.push(...legacyRefsValidation.errors);
    warnings.push(...legacyRefsValidation.warnings);
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function validateVehicleEnvelope(envelope, payload) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (envelope.contractName !== VEHICLE_CONTRACT_NAME) {
    errors.push(createError("ENV_CONTRACT_NAME_INVALID", `Field contractName must be ${VEHICLE_CONTRACT_NAME}.`));
  }

  if (!normalizeString(envelope.contractVersion)) {
    missingRequiredFields.push("contractVersion");
    errors.push(createError("ENV_CONTRACT_VERSION_REQUIRED", "Field contractVersion must be a non-empty string."));
  } else if (normalizeString(envelope.contractVersion) !== VEHICLE_CONTRACT_VERSION) {
    warnings.push(
      createWarning(
        "ENV_CONTRACT_VERSION_REVIEW",
        `contractVersion differs from ${VEHICLE_CONTRACT_VERSION} and should be reviewed against shared compatibility rules.`
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

function validatePayloadContext(vehicleContract, source, options) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (!normalizeString(options.organizationId)) {
    warnings.push(
      createWarning(
        "CTX_ORGANIZATION_ID_REQUIRED",
        "organizationId must be provided explicitly by context because the legacy vehicle shape does not own tenant identity."
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
        `status defaulted to ${vehicleContract.status} using the shared master data baseline because no explicit context status was provided.`
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

  if (options.currentCustomerIdDerivedFromLegacy) {
    warnings.push(
      createWarning(
        "LEGACY_CUSTOMER_REFERENCE_PRESERVED",
        "currentCustomerId was derived from a legacy currentClientId and remains a transitional contract reference until the runtime relationship is governed by a dedicated integration slice."
      )
    );
  }

  if (options.rawLegacyYear && options.manufactureYear == null && options.modelYear == null) {
    warnings.push(
      createWarning(
        "LEGACY_SINGLE_YEAR_PRESERVED",
        "Legacy year was preserved only for compatibility notes because the current contract separates manufactureYear and modelYear."
      )
    );
  }

  if (options.ownerHistoryPreservedOnly) {
    warnings.push(
      createWarning(
        "LEGACY_OWNER_HISTORY_PRESERVED",
        "Owner history remains preserved only as legacy traceability because the current phase does not publish dedicated ownerHistoryRefs without stable legacy references."
      )
    );
  }

  if (options.specialCareRefsDerivedFromLegacy) {
    warnings.push(
      createWarning(
        "LEGACY_SPECIAL_CARE_REFERENCE_PRESERVED",
        "specialCareRefs were derived from legacy care record identifiers and remain transitional references until a dedicated contract governs this domain."
      )
    );
  } else if (options.specialCareRecordsPresentWithoutRefs) {
    warnings.push(
      createWarning(
        "LEGACY_SPECIAL_CARE_UNRESOLVED",
        "Legacy special care data exists but does not expose stable IDs for specialCareRefs in this phase."
      )
    );
  }

  if (options.legacyPlateHistoryCount > 0) {
    warnings.push(
      createWarning(
        "LEGACY_PLATE_HISTORY_PRESERVED",
        "Legacy plate history was preserved inside legacyRefs and was not promoted to canonical identity."
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
  const currentCustomerIdState = resolveCurrentCustomerIdState(source, options);
  const rawLegacyYear = resolveRawLegacyYear(source, options);
  const specialCareRefsState = resolveSpecialCareRefsState(source, options);
  const ownerHistoryRefsState = resolveOwnerHistoryRefsState(source, options);
  const legacyPlateHistory = extractLegacyPlateHistory(source, options);

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
    currentCustomerId: currentCustomerIdState.currentCustomerId,
    currentCustomerIdDerivedFromLegacy: currentCustomerIdState.currentCustomerIdDerivedFromLegacy,
    currentCustomerLegacySourceId: currentCustomerIdState.currentCustomerLegacySourceId,
    rawLegacyYear,
    manufactureYear: normalizeYearValue(options.manufactureYear || source.manufactureYear),
    modelYear: normalizeYearValue(options.modelYear || source.modelYear),
    specialCareRefs: specialCareRefsState.specialCareRefs,
    specialCareRefsDerivedFromLegacy: specialCareRefsState.specialCareRefsDerivedFromLegacy,
    specialCareRecordsPresentWithoutRefs: specialCareRefsState.specialCareRecordsPresentWithoutRefs,
    ownerHistoryRefs: ownerHistoryRefsState.ownerHistoryRefs,
    ownerHistoryPreservedOnly: ownerHistoryRefsState.ownerHistoryPreservedOnly,
    legacyPlateHistory,
    legacyPlateHistoryCount: legacyPlateHistory.length
  };
}

function normalizeEnvelopeContext(vehicleContract, context) {
  const options = toPlainObject(context);
  const payload = toPlainObject(vehicleContract);
  const payloadLegacyRefs = toPlainObject(payload.legacyRefs);
  const sourceName = normalizeString(options.source) || inferEnvelopeSource(payloadLegacyRefs);
  const sourceId = normalizeString(options.sourceId) || normalizeString(payloadLegacyRefs.sourceId) || "";
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
    legacyRefs: toPlainObject(options.legacyRefs),
    rawLegacyYear: extractLegacyYearFromRefs(payloadLegacyRefs),
    currentCustomerIdDerivedFromLegacy: hasLegacyCurrentCustomerRef(payloadLegacyRefs),
    ownerHistoryPreservedOnly: normalizeStringArray(payloadLegacyRefs.notes).some((note) => note.includes("owner history")),
    specialCareRefsDerivedFromLegacy: Array.isArray(payload.specialCareRefs) && payload.specialCareRefs.some((ref) => normalizeString(ref).includes("vehicle-special-care:legacy:")),
    specialCareRecordsPresentWithoutRefs: false,
    legacyPlateHistory: normalizeStringArray(payloadLegacyRefs.legacyPlates),
    legacyPlateHistoryCount: normalizeStringArray(payloadLegacyRefs.legacyPlates).length,
    manufactureYear: normalizeYearValue(payload.manufactureYear),
    modelYear: normalizeYearValue(payload.modelYear)
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

  return normalizeString(source.vehicleId || options.vehicleId);
}

function resolveVehicleType(source, options) {
  return normalizeString(options.vehicleType || source.vehicleType || source.type);
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

function resolveManufactureYear(source, options) {
  if (options.manufactureYear != null) return options.manufactureYear;
  return normalizeYearValue(source.manufactureYear);
}

function resolveModelYear(source, options) {
  if (options.modelYear != null) return options.modelYear;
  return normalizeYearValue(source.modelYear);
}

function resolveCurrentCustomerIdState(source, options) {
  const explicitCurrentCustomerId = normalizeString(options.currentCustomerId);
  if (explicitCurrentCustomerId) {
    return {
      currentCustomerId: explicitCurrentCustomerId,
      currentCustomerIdDerivedFromLegacy: false,
      currentCustomerLegacySourceId: normalizeString(options.currentCustomerLegacySourceId)
    };
  }

  const preservedCurrentCustomerId = normalizeString(source.currentCustomerId);
  if (preservedCurrentCustomerId) {
    return {
      currentCustomerId: preservedCurrentCustomerId,
      currentCustomerIdDerivedFromLegacy: false,
      currentCustomerLegacySourceId: normalizeString(source.currentCustomerId)
    };
  }

  const legacyCurrentCustomerId = normalizeString(source.currentClientId || source.customerId || options.currentClientId);
  if (!legacyCurrentCustomerId) {
    return {
      currentCustomerId: "",
      currentCustomerIdDerivedFromLegacy: false,
      currentCustomerLegacySourceId: ""
    };
  }

  return {
    currentCustomerId: `${RELATED_CUSTOMER_NAMESPACE}:legacy:${legacyCurrentCustomerId}`,
    currentCustomerIdDerivedFromLegacy: true,
    currentCustomerLegacySourceId: legacyCurrentCustomerId
  };
}

function resolveSpecialCareRefs(source, options) {
  return normalizeStringArray(options.specialCareRefs || source.specialCareRefs);
}

function resolveOwnerHistoryRefs(source, options) {
  return normalizeStringArray(options.ownerHistoryRefs || source.ownerHistoryRefs);
}

function resolveSpecialCareRefsState(source, options) {
  const explicitSpecialCareRefs = normalizeStringArray(options.specialCareRefs || source.specialCareRefs);
  if (explicitSpecialCareRefs.length) {
    return {
      specialCareRefs: explicitSpecialCareRefs,
      specialCareRefsDerivedFromLegacy: false,
      specialCareRecordsPresentWithoutRefs: false
    };
  }

  const specialCareRecords = Array.isArray(source.specialCareRecords) ? source.specialCareRecords : [];
  const derivedSpecialCareRefs = specialCareRecords
    .map((record) => normalizeString(record?.id))
    .filter(Boolean)
    .map((recordId) => `vehicle-special-care:legacy:${recordId}`);

  return {
    specialCareRefs: uniqueStrings(derivedSpecialCareRefs),
    specialCareRefsDerivedFromLegacy: derivedSpecialCareRefs.length > 0,
    specialCareRecordsPresentWithoutRefs: specialCareRecords.length > 0 && derivedSpecialCareRefs.length === 0
  };
}

function resolveOwnerHistoryRefsState(source, options) {
  const explicitOwnerHistoryRefs = normalizeStringArray(options.ownerHistoryRefs || source.ownerHistoryRefs);
  if (explicitOwnerHistoryRefs.length) {
    return {
      ownerHistoryRefs: explicitOwnerHistoryRefs,
      ownerHistoryPreservedOnly: false
    };
  }

  const ownerHistory = Array.isArray(source.ownerHistory) ? source.ownerHistory : [];
  const derivedOwnerHistoryRefs = ownerHistory
    .map((entry) => normalizeString(entry?.id))
    .filter(Boolean)
    .map((entryId) => `vehicle-owner-history:legacy:${entryId}`);

  return {
    ownerHistoryRefs: uniqueStrings(derivedOwnerHistoryRefs),
    ownerHistoryPreservedOnly: ownerHistory.length > 0 && derivedOwnerHistoryRefs.length === 0
  };
}

function resolveRawLegacyYear(source, options) {
  const explicitLegacyYear = normalizeString(options.legacyYear);
  if (explicitLegacyYear) return explicitLegacyYear;
  return normalizeString(source.year);
}

function buildLegacyRefs(source, options, state) {
  const legacyRefs = {};
  const alternateIds = {};
  const relatedIds = {};
  const relatedCollections = [];
  const notes = [];

  if (options.sourceCollection) legacyRefs.sourceCollection = options.sourceCollection;
  if (options.sourceId) legacyRefs.sourceId = options.sourceId;

  const explicitVehicleId = normalizeString(source.vehicleId);
  if (explicitVehicleId && explicitVehicleId !== options.sourceId) {
    alternateIds.vehicleId = explicitVehicleId;
  }

  if (options.currentCustomerLegacySourceId) {
    relatedCollections.push("clientRegistry");
    relatedIds.currentCustomerLegacyId = options.currentCustomerLegacySourceId;
  }

  if (Array.isArray(source.specialCareRecords) && source.specialCareRecords.length) {
    relatedCollections.push("vehicleSpecialCareRecords");
  }

  const sourceCollection = normalizeString(options.sourceCollection);
  if (normalizeString(source.id) && sourceCollection !== DEFAULT_SOURCE_COLLECTION) {
    relatedCollections.push(DEFAULT_SOURCE_COLLECTION);
  }

  if (options.legacyPlateHistoryCount > 0) {
    legacyRefs.legacyPlates = options.legacyPlateHistory;
  }

  if (options.rawLegacyYear && options.manufactureYear == null && options.modelYear == null) {
    notes.push(`Legacy single year preserved for compatibility: ${options.rawLegacyYear}.`);
  }

  if (options.ownerHistoryPreservedOnly) {
    notes.push("Legacy owner history remains embedded in the source shape and was not promoted to ownerHistoryRefs without stable identifiers.");
  }

  if (options.specialCareRecordsPresentWithoutRefs) {
    notes.push("Legacy special care records exist but do not expose stable IDs for specialCareRefs in this phase.");
  }

  const ownerDisplayName = normalizeString(source.owner);
  if (ownerDisplayName && !options.currentCustomerLegacySourceId) {
    notes.push(`Legacy owner display preserved only for traceability: ${ownerDisplayName}.`);
  }

  const serviceHistory = Array.isArray(source.serviceHistory) ? source.serviceHistory : [];
  if (serviceHistory.length) {
    relatedCollections.push("patioVehicles");
    notes.push("Service history remains a legacy operational shape and was not promoted into the Vehicle contract.");
  }

  if (Object.keys(alternateIds).length) legacyRefs.alternateIds = alternateIds;
  if (Object.keys(relatedIds).length) legacyRefs.relatedIds = relatedIds;
  if (relatedCollections.length) legacyRefs.relatedCollections = uniqueStrings(relatedCollections);
  if (notes.length) legacyRefs.notes = uniqueStrings(notes);

  return mergeLegacyRefs(legacyRefs, toPlainObject(options.legacyRefs), state.plate);
}

function buildEnvelopeLegacyRefs(payload, options) {
  const payloadLegacyRefs = toPlainObject(payload.legacyRefs);
  return mergeLegacyRefs(payloadLegacyRefs, toPlainObject(options.legacyRefs), normalizePlate(payload.plate));
}

function collectEnvelopeWarnings(payload, options) {
  const warnings = [];
  const legacyRefs = toPlainObject(payload.legacyRefs);

  if (normalizeStringArray(legacyRefs.legacyPlates).length) {
    warnings.push(
      createWarning(
        "LEGACY_PLATE_HISTORY_PRESERVED",
        "Legacy plate history was preserved inside legacyRefs and was not promoted to canonical identity."
      )
    );
  }

  if (options.currentCustomerIdDerivedFromLegacy) {
    warnings.push(
      createWarning(
        "LEGACY_CUSTOMER_REFERENCE_PRESERVED",
        "currentCustomerId was derived from a legacy currentClientId and remains a transitional contract reference until a dedicated integration slice exists."
      )
    );
  }

  if (options.rawLegacyYear && options.manufactureYear == null && options.modelYear == null) {
    warnings.push(
      createWarning(
        "LEGACY_SINGLE_YEAR_PRESERVED",
        "Legacy year was preserved only for compatibility notes because the current contract separates manufactureYear and modelYear."
      )
    );
  }

  if (options.ownerHistoryPreservedOnly) {
    warnings.push(
      createWarning(
        "LEGACY_OWNER_HISTORY_PRESERVED",
        "Owner history remains preserved only as legacy traceability because the current phase does not publish dedicated ownerHistoryRefs without stable legacy references."
      )
    );
  }

  if (options.specialCareRefsDerivedFromLegacy) {
    warnings.push(
      createWarning(
        "LEGACY_SPECIAL_CARE_REFERENCE_PRESERVED",
        "specialCareRefs were derived from legacy care record identifiers and remain transitional references until a dedicated contract governs this domain."
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

function mergeLegacyRefs(baseRefs, extraRefs, currentPlate = "") {
  const base = toPlainObject(baseRefs);
  const extra = toPlainObject(extraRefs);
  const merged = {};

  merged.sourceCollection = normalizeString(extra.sourceCollection || base.sourceCollection);
  merged.sourceId = normalizeString(extra.sourceId || base.sourceId);

  const alternateIds = mergeStringObject(base.alternateIds, extra.alternateIds);
  const relatedIds = mergeStringObject(base.relatedIds, extra.relatedIds);
  const relatedCollections = uniqueStrings([
    ...normalizeStringArray(base.relatedCollections),
    ...normalizeStringArray(extra.relatedCollections)
  ]);
  const legacyPlates = uniqueStrings([
    ...normalizeLegacyPlateArray(base.legacyPlates),
    ...normalizeLegacyPlateArray(extra.legacyPlates),
    ...normalizeLegacyPlateArray(extra.oldPlates),
    ...normalizeLegacyPlateArray(extra.previousPlates)
  ]).filter((plate) => plate && plate !== currentPlate);
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
  if (Object.keys(relatedIds).length) merged.relatedIds = relatedIds;
  if (relatedCollections.length) merged.relatedCollections = relatedCollections;
  if (legacyPlates.length) merged.legacyPlates = legacyPlates;
  if (derivedKeys.length) merged.derivedKeys = derivedKeys;
  if (notes.length) merged.notes = notes;

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

  if (Object.prototype.hasOwnProperty.call(legacyRefs, "relatedIds") && !isPlainObject(legacyRefs.relatedIds)) {
    errors.push(createError("LEGACY_REFS_RELATED_IDS_INVALID", `${pathLabel}.relatedIds must be an object when present.`));
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
  if (normalizeString(source.vehicleId)) return "web.patioVehicles";
  return DEFAULT_SOURCE;
}

function inferEnvelopeSource(legacyRefs) {
  const sourceCollection = normalizeString(legacyRefs.sourceCollection);
  if (sourceCollection === "patioVehicles") return "web.patioVehicles";
  if (sourceCollection === DEFAULT_SOURCE_COLLECTION) return DEFAULT_SOURCE;
  return DEFAULT_SOURCE;
}

function resolveSourceCollection(sourceName, fallbackValue) {
  const explicitSourceCollection = normalizeString(fallbackValue);
  if (explicitSourceCollection) return explicitSourceCollection;

  const normalizedSourceName = normalizeString(sourceName);
  if (!normalizedSourceName) return DEFAULT_SOURCE_COLLECTION;
  if (normalizedSourceName.endsWith("patioVehicles")) return "patioVehicles";
  if (normalizedSourceName.endsWith("vehicleRegistry")) return DEFAULT_SOURCE_COLLECTION;

  const sourceSegments = normalizedSourceName.split(".");
  return normalizeString(sourceSegments[sourceSegments.length - 1]) || DEFAULT_SOURCE_COLLECTION;
}

function extractLegacyPlateHistory(source, options) {
  return uniqueStrings([
    ...normalizeLegacyPlateArray(source.legacyPlates),
    ...normalizeLegacyPlateArray(source.oldPlates),
    ...normalizeLegacyPlateArray(source.previousPlates),
    ...normalizeLegacyPlateArray(options.legacyPlates),
    ...normalizeLegacyPlateArray(options.legacyRefs?.legacyPlates)
  ]);
}

function extractLegacyYearFromRefs(legacyRefs) {
  const notes = normalizeStringArray(legacyRefs.notes);
  const yearNote = notes.find((note) => note.startsWith("Legacy single year preserved for compatibility: "));
  if (!yearNote) return "";
  return yearNote.replace("Legacy single year preserved for compatibility: ", "").replace(/\.$/, "");
}

function hasLegacyCurrentCustomerRef(legacyRefs) {
  return Boolean(normalizeString(toPlainObject(legacyRefs.relatedIds).currentCustomerLegacyId));
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

function normalizePlate(value) {
  return normalizeString(value).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeIsoTimestamp(value) {
  const normalized = normalizeString(value);
  if (!normalized) return "";
  return isIsoTimestamp(normalized) ? normalized : "";
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

function normalizeLegacyPlateArray(values) {
  if (!Array.isArray(values)) return [];
  return uniqueStrings(values.map((value) => normalizePlate(value)).filter(Boolean));
}

function normalizeYearValue(value) {
  const normalized = normalizeString(value);
  if (!normalized) return null;

  const numericYear = Number(normalized);
  if (!Number.isInteger(numericYear) || numericYear < 1900 || numericYear > 2999) return null;
  return numericYear;
}

function normalizeFipeRef(value) {
  return isPlainObject(value) ? { ...value } : null;
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function isNormalizedPlate(value) {
  return /^[A-Z0-9]{7}$/.test(value);
}

function isIsoTimestamp(value) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

function isValidYear(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 1900 && Number(value) <= 2999;
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function toPlainObject(value) {
  return isPlainObject(value) ? { ...value } : {};
}
