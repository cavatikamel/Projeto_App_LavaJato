export const SERVICE_CONTRACT_NAME = "Service";
export const SERVICE_CONTRACT_VERSION = "1.0.0";

const ADAPTER_NAME = "serviceAdapter";
const CONTRACT_NAMESPACE = "service";
const DEFAULT_SOURCE = "web.serviceCatalog";
const DEFAULT_SOURCE_COLLECTION = "serviceCatalog";
const DEFAULT_ID_STRATEGY = "namespaceLegacySource";
const DEFAULT_MASTER_DATA_STATUS = "active";
const MASTER_DATA_STATUSES = ["draft", "active", "inactive", "archived"];
const REQUIRED_FIELDS = [
  "id",
  "organizationId",
  "serviceCode",
  "name",
  "price",
  "isActive",
  "createdAt",
  "updatedAt"
];

export function toServiceContract(legacyService, context = {}) {
  const source = toPlainObject(legacyService);
  const options = normalizeLegacyContext(source, context);
  const serviceContract = buildServiceContract(source, options);
  const validation = mergeValidations(
    validateServiceContract(serviceContract),
    validatePayloadContext(serviceContract, source, options)
  );
  const metadata = buildMetadata("legacy-to-contract-payload", options, {
    emittedAt: options.now,
    notes: []
  });

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    serviceContract,
    validation: toValidationSummary(validation),
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata,
    source: options.source,
    sourceId: options.sourceId
  };
}

export function validateServiceContract(serviceContract) {
  const candidate = toPlainObject(serviceContract);
  const payload = isPlainObject(candidate.payload) ? toPlainObject(candidate.payload) : candidate;
  const payloadValidation = validateServicePayload(payload);

  if (!isPlainObject(candidate.payload)) {
    return payloadValidation;
  }

  const envelopeValidation = validateServiceEnvelope(candidate, payload);
  return mergeValidations(payloadValidation, envelopeValidation);
}

export function createServiceContractEnvelope(serviceContract, context = {}) {
  const payload = toPlainObject(serviceContract);
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
  const serviceContractEnvelope = {
    contractName: SERVICE_CONTRACT_NAME,
    contractVersion: options.contractVersion || SERVICE_CONTRACT_VERSION,
    payload,
    organizationId: normalizeString(payload.organizationId || options.organizationId),
    source: options.source,
    sourceId: options.sourceId,
    createdAt: normalizeIsoTimestamp(payload.createdAt || options.createdAt),
    updatedAt: normalizeIsoTimestamp(payload.updatedAt || options.updatedAt),
    status: normalizeStatus(payload.status || options.status || options.defaultStatus),
    warnings: [],
    validation: createValidation(),
    metadata
  };

  if (Object.keys(legacyRefs).length) {
    serviceContractEnvelope.legacyRefs = legacyRefs;
  }

  const validation = mergeValidations(
    validateServiceContract(serviceContractEnvelope),
    createValidation([], provisionalWarnings, [], false)
  );

  serviceContractEnvelope.warnings = validation.warnings;
  serviceContractEnvelope.validation = toValidationSummary(validation);

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    serviceContractEnvelope,
    validation: serviceContractEnvelope.validation,
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata
  };
}

function buildServiceContract(source, options) {
  const status = resolveContractStatus(source, options);
  const serviceCode = resolveServiceCode(source, options);
  const serviceContract = {
    id: resolveCanonicalId(options),
    organizationId: normalizeString(options.organizationId),
    serviceCode,
    name: resolveServiceName(source, options),
    price: normalizeMoney(options.price ?? source.price),
    isActive: resolveIsActive(source, options, status),
    createdAt: resolveCreatedAt(source, options),
    updatedAt: resolveUpdatedAt(source, options)
  };

  const description = normalizeString(options.description || source.description);
  if (description) serviceContract.description = description;

  const durationMinutes = resolveDurationMinutes(source, options);
  if (durationMinutes != null) serviceContract.durationMinutes = durationMinutes;

  const vehicleType = normalizeString(options.vehicleType || source.vehicleType || source.type);
  if (vehicleType) serviceContract.vehicleType = vehicleType;

  const vehicleCategory = normalizeString(
    options.vehicleCategory || source.vehicleCategory || source.category
  );
  if (vehicleCategory) serviceContract.vehicleCategory = vehicleCategory;

  const defaultVehicleCareType = normalizeString(
    options.defaultVehicleCareType || source.defaultVehicleCareType || source.autoCreateVehicleCareType
  );
  if (defaultVehicleCareType) serviceContract.defaultVehicleCareType = defaultVehicleCareType;

  const maintenanceRequired = resolveMaintenanceRequired(source, options);
  if (maintenanceRequired != null) serviceContract.maintenanceRequired = maintenanceRequired;

  const maintenanceInterval = normalizeString(options.maintenanceInterval || source.maintenanceInterval);
  if (maintenanceInterval) serviceContract.maintenanceInterval = maintenanceInterval;

  const maintenanceDate = normalizeIsoDate(options.maintenanceDate || source.maintenanceDate);
  if (maintenanceDate) serviceContract.maintenanceDate = maintenanceDate;

  const supplyProfileRefs = normalizeStringArray(options.supplyProfileRefs || source.supplyProfileRefs);
  if (supplyProfileRefs.length) serviceContract.supplyProfileRefs = supplyProfileRefs;

  const notes = normalizeString(options.notes || source.notes || source.observations || source.observation);
  if (notes) serviceContract.notes = notes;

  const legacyRefs = buildLegacyRefs(source, options, {
    generatedServiceCode: shouldGenerateServiceCode(source, options),
    durationMinutes
  });
  if (Object.keys(legacyRefs).length) serviceContract.legacyRefs = legacyRefs;

  return serviceContract;
}

function validateServicePayload(payload) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  for (const field of REQUIRED_FIELDS) {
    if (isMissingRequiredField(field, payload[field])) {
      missingRequiredFields.push(field);
      errors.push(createError("PAYLOAD_REQUIRED_FIELD_MISSING", `Missing required field: ${field}`));
    }
  }

  if (!isFiniteNumber(payload.price) || Number(payload.price) < 0) {
    errors.push(createError("PAYLOAD_PRICE_INVALID", "Field price must be a non-negative number."));
  }

  if (Object.prototype.hasOwnProperty.call(payload, "durationMinutes") && !isPositiveInteger(payload.durationMinutes)) {
    errors.push(
      createError("PAYLOAD_DURATION_MINUTES_INVALID", "Field durationMinutes must be a positive integer when present.")
    );
  }

  if (Object.prototype.hasOwnProperty.call(payload, "isActive") && typeof payload.isActive !== "boolean") {
    errors.push(createError("PAYLOAD_IS_ACTIVE_INVALID", "Field isActive must be boolean."));
  }

  if (payload.createdAt && !isIsoTimestamp(payload.createdAt)) {
    errors.push(createError("PAYLOAD_CREATED_AT_INVALID", "Field createdAt must be an ISO 8601 timestamp."));
  }

  if (payload.updatedAt && !isIsoTimestamp(payload.updatedAt)) {
    errors.push(createError("PAYLOAD_UPDATED_AT_INVALID", "Field updatedAt must be an ISO 8601 timestamp."));
  }

  if (payload.maintenanceRequired != null && typeof payload.maintenanceRequired !== "boolean") {
    errors.push(
      createError("PAYLOAD_MAINTENANCE_REQUIRED_INVALID", "Field maintenanceRequired must be boolean when present.")
    );
  }

  if (payload.maintenanceDate && !isIsoDate(payload.maintenanceDate)) {
    errors.push(createError("PAYLOAD_MAINTENANCE_DATE_INVALID", "Field maintenanceDate must be an ISO date."));
  }

  if (payload.supplyProfileRefs && !Array.isArray(payload.supplyProfileRefs)) {
    errors.push(createError("PAYLOAD_SUPPLY_PROFILE_REFS_INVALID", "Field supplyProfileRefs must be an array when present."));
  }

  if (Array.isArray(payload.supplyProfileRefs) && payload.supplyProfileRefs.some((value) => !normalizeString(value))) {
    errors.push(
      createError("PAYLOAD_SUPPLY_PROFILE_REFS_EMPTY", "Field supplyProfileRefs must not contain empty references.")
    );
  }

  if (payload.legacyRefs && !isPlainObject(payload.legacyRefs)) {
    errors.push(createError("PAYLOAD_LEGACY_REFS_INVALID", "Field legacyRefs must be an object when present."));
  }

  if (payload.legacyRefs && isPlainObject(payload.legacyRefs)) {
    const legacyRefsValidation = validateLegacyRefsStructure(payload.legacyRefs, "payload.legacyRefs");
    errors.push(...legacyRefsValidation.errors);
    warnings.push(...legacyRefsValidation.warnings);
  }

  if (payload.serviceCode && /\s/.test(payload.serviceCode)) {
    warnings.push(
      createWarning(
        "PAYLOAD_SERVICE_CODE_NON_STANDARD",
        "Field serviceCode should remain a normalized technical code without whitespace."
      )
    );
  }

  if (payload.maintenanceRequired && payload.maintenanceInterval === "custom" && !payload.maintenanceDate) {
    warnings.push(
      createWarning(
        "PAYLOAD_MAINTENANCE_DATE_RECOMMENDED",
        "maintenanceDate should be present when maintenanceInterval is custom."
      )
    );
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function validateServiceEnvelope(envelope, payload) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (envelope.contractName !== SERVICE_CONTRACT_NAME) {
    errors.push(createError("ENV_CONTRACT_NAME_INVALID", `Field contractName must be ${SERVICE_CONTRACT_NAME}.`));
  }

  if (!normalizeString(envelope.contractVersion)) {
    missingRequiredFields.push("contractVersion");
    errors.push(createError("ENV_CONTRACT_VERSION_REQUIRED", "Field contractVersion must be a non-empty string."));
  } else if (normalizeString(envelope.contractVersion) !== SERVICE_CONTRACT_VERSION) {
    warnings.push(
      createWarning(
        "ENV_CONTRACT_VERSION_REVIEW",
        `contractVersion differs from ${SERVICE_CONTRACT_VERSION} and should be reviewed against shared compatibility rules.`
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
  } else if (!MASTER_DATA_STATUSES.includes(normalizeStatus(envelope.status))) {
    warnings.push(
      createWarning(
        "ENV_STATUS_NON_STANDARD",
        "Envelope status is outside the shared master data defaults and should be reviewed before cross-surface adoption."
      )
    );
  }

  if (!Array.isArray(envelope.warnings)) {
    errors.push(createError("ENV_WARNINGS_INVALID", "Field warnings must be an array."));
  }

  if (!isPlainObject(envelope.validation)) {
    errors.push(createError("ENV_VALIDATION_INVALID", "Field validation must be an object."));
  }

  if (!isPlainObject(envelope.metadata)) {
    errors.push(createError("ENV_METADATA_INVALID", "Field metadata must be an object."));
  } else if (!normalizeIsoTimestamp(envelope.metadata.emittedAt)) {
    errors.push(createError("ENV_METADATA_EMITTED_AT_REQUIRED", "metadata.emittedAt must be an ISO 8601 timestamp."));
  }

  if (
    normalizeString(payload.id) &&
    normalizeString(envelope.sourceId) &&
    normalizeString(payload.id) === normalizeString(envelope.sourceId)
  ) {
    warnings.push(
      createWarning(
        "ENV_CANONICAL_ID_MATCHES_SOURCE_ID",
        "Canonical id should remain namespaced and separated from sourceId even when both originate from the same legacy key."
      )
    );
  }

  if (envelope.legacyRefs && !isPlainObject(envelope.legacyRefs)) {
    errors.push(createError("ENV_LEGACY_REFS_INVALID", "Field legacyRefs must be an object when present."));
  }

  if (envelope.legacyRefs && isPlainObject(envelope.legacyRefs)) {
    const legacyRefsValidation = validateLegacyRefsStructure(envelope.legacyRefs, "envelope.legacyRefs");
    errors.push(...legacyRefsValidation.errors);
    warnings.push(...legacyRefsValidation.warnings);
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function validatePayloadContext(serviceContract, source, options) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (!normalizeString(options.sourceId)) {
    missingRequiredFields.push("sourceId");
    errors.push(
      createError(
        "CTX_SOURCE_ID_REQUIRED",
        "sourceId is required by context or legacy source because the observed service catalog does not expose a stable runtime id."
      )
    );
    warnings.push(
      createWarning(
        "CTX_SOURCE_ID_REQUIRED",
        "sourceId should come from context or legacy source before any service payload is promoted beyond the adapter boundary."
      )
    );
  }

  if (!normalizeString(options.organizationId)) {
    missingRequiredFields.push("organizationId");
    errors.push(
      createError(
        "CTX_ORGANIZATION_ID_REQUIRED",
        "organizationId is required by context because the service payload must remain tenant-aware."
      )
    );
    warnings.push(
      createWarning(
        "CTX_ORGANIZATION_ID_REQUIRED",
        "organizationId should come from adapter context and must not be inferred from runtime globals."
      )
    );
  }

  if (!normalizeString(source.id)) {
    warnings.push(
      createWarning(
        "LEGACY_SERVICE_ID_MISSING",
        "Observed legacy service entries do not expose a stable id, so sourceId from context remains mandatory in the current foundation."
      )
    );
  }

  if (shouldGenerateServiceCode(source, options)) {
    warnings.push(
      createWarning(
        "PAYLOAD_SERVICE_CODE_DERIVED_FROM_SOURCE_ID",
        "serviceCode was derived from sourceId because the current legacy service catalog does not expose a stable technical code."
      )
    );
  }

  if (normalizeString(source.duration || options.duration) && serviceContract.durationMinutes == null) {
    warnings.push(
      createWarning(
        "LEGACY_DURATION_UNPARSEABLE",
        "Legacy duration could not be converted to durationMinutes and should be reviewed before runtime integration."
      )
    );
  }

  if (normalizeString(source.status) && !mapLegacyStatus(source.status)) {
    warnings.push(
      createWarning(
        "LEGACY_STATUS_NON_STANDARD",
        "Legacy status could not be mapped to the shared master data status defaults and should be reviewed before cross-surface use."
      )
    );
  }

  if (serviceContract.maintenanceRequired && serviceContract.maintenanceInterval === "custom" && !serviceContract.maintenanceDate) {
    warnings.push(
      createWarning(
        "LEGACY_MAINTENANCE_DATE_MISSING",
        "A custom maintenance interval should provide maintenanceDate before runtime integration."
      )
    );
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function normalizeLegacyContext(source, context) {
  const now = normalizeIsoTimestamp(context.now);
  const createdAt = normalizeIsoTimestamp(context.createdAt) || now;
  const updatedAt = normalizeIsoTimestamp(context.updatedAt) || now;

  return {
    source: normalizeString(context.source || source.source || DEFAULT_SOURCE),
    sourceCollection: normalizeString(context.sourceCollection || source.sourceCollection || DEFAULT_SOURCE_COLLECTION),
    sourceId: normalizeString(context.sourceId || source.sourceId || source.id),
    organizationId: normalizeString(context.organizationId || source.organizationId),
    contractVersion: normalizeString(context.contractVersion || source.contractVersion || SERVICE_CONTRACT_VERSION),
    status: normalizeStatus(context.status || source.contractStatus),
    defaultStatus: normalizeStatus(context.defaultStatus || DEFAULT_MASTER_DATA_STATUS),
    createdAt,
    updatedAt,
    emittedAt: normalizeIsoTimestamp(context.emittedAt),
    now,
    idStrategy: normalizeString(context.idStrategy || DEFAULT_ID_STRATEGY),
    strictMode: context.strictMode !== false,
    allowWarnings: context.allowWarnings !== false,
    serviceCode: normalizeServiceCode(context.serviceCode || source.serviceCode),
    price: context.price,
    description: normalizeString(context.description),
    vehicleType: normalizeString(context.vehicleType),
    vehicleCategory: normalizeString(context.vehicleCategory),
    defaultVehicleCareType: normalizeString(context.defaultVehicleCareType),
    maintenanceInterval: normalizeString(context.maintenanceInterval),
    maintenanceDate: normalizeIsoDate(context.maintenanceDate),
    supplyProfileRefs: normalizeStringArray(context.supplyProfileRefs),
    serviceSupplyProfileKey: normalizeString(context.serviceSupplyProfileKey),
    legacyRefs: isPlainObject(context.legacyRefs) ? toPlainObject(context.legacyRefs) : {},
    metadata: isPlainObject(context.metadata) ? toPlainObject(context.metadata) : {},
    name: normalizeString(context.name),
    notes: normalizeString(context.notes),
    duration: normalizeString(context.duration)
  };
}

function normalizeEnvelopeContext(payload, context) {
  const options = normalizeLegacyContext(payload, context);
  const payloadId = normalizeString(payload.id);
  return {
    ...options,
    sourceId: normalizeString(context.sourceId || payload.sourceId || extractSourceIdFromCanonicalId(payloadId)),
    organizationId: normalizeString(context.organizationId || payload.organizationId || options.organizationId),
    createdAt: normalizeIsoTimestamp(context.createdAt || payload.createdAt || options.createdAt),
    updatedAt: normalizeIsoTimestamp(context.updatedAt || payload.updatedAt || options.updatedAt)
  };
}

function resolveCanonicalId(options) {
  const sourceId = normalizeString(options.sourceId);
  if (!sourceId) return "";

  if (normalizeString(options.idStrategy) === "sourceOnly") {
    return sourceId;
  }

  return `${CONTRACT_NAMESPACE}:legacy:${sourceId}`;
}

function resolveServiceCode(source, options) {
  const explicitServiceCode = normalizeServiceCode(options.serviceCode || source.serviceCode);
  if (explicitServiceCode) return explicitServiceCode;

  const sourceId = normalizeString(options.sourceId);
  if (!sourceId) return "";

  const token = toCodeToken(sourceId);
  return token ? `SRV-${token}` : "";
}

function resolveServiceName(source, options) {
  return normalizeString(options.name || source.name || source.serviceName || source.title);
}

function resolveContractStatus(source, options) {
  const explicitStatus = normalizeStatus(options.status);
  if (explicitStatus) return explicitStatus;

  const legacyStatus = mapLegacyStatus(source.status);
  if (legacyStatus) return legacyStatus;

  return normalizeStatus(options.defaultStatus || DEFAULT_MASTER_DATA_STATUS);
}

function resolveCreatedAt(source, options) {
  return normalizeIsoTimestamp(options.createdAt) || normalizeIsoTimestamp(options.now);
}

function resolveUpdatedAt(source, options) {
  return normalizeIsoTimestamp(options.updatedAt) || normalizeIsoTimestamp(options.now);
}

function resolveIsActive(source, options, status) {
  if (typeof options.isActive === "boolean") return options.isActive;
  if (typeof source.isActive === "boolean") return source.isActive;
  if (typeof source.active === "boolean") return source.active;

  const normalizedStatus = normalizeStatus(source.status);
  if (normalizedStatus === "active") return true;
  if (normalizedStatus === "inactive" || normalizedStatus === "archived" || normalizedStatus === "draft") return false;

  return status === "active";
}

function resolveDurationMinutes(source, options) {
  if (isFiniteNumber(options.durationMinutes)) return Math.round(Number(options.durationMinutes));
  return parseDurationToMinutes(options.duration || source.duration);
}

function resolveMaintenanceRequired(source, options) {
  if (typeof options.maintenanceRequired === "boolean") return options.maintenanceRequired;
  if (typeof source.maintenanceRequired === "boolean") return source.maintenanceRequired;
  return null;
}

function buildLegacyRefs(source, options, state) {
  const legacyRefs = mergeLegacyRefObjects(source.legacyRefs, options.legacyRefs);
  const legacyId = normalizeString(source.id);
  const rawDuration = normalizeString(source.duration);
  const rawStatus = normalizeString(source.status);
  const legacyType = normalizeString(source.type);
  const legacyCategory = normalizeString(source.category);
  const serviceSupplyProfileKey = normalizeString(options.serviceSupplyProfileKey || source.serviceSupplyProfileKey);
  const rawVehicleCareType = normalizeString(source.autoCreateVehicleCareType);

  if (legacyId && legacyId !== normalizeString(options.sourceId)) {
    pushLegacyRef(legacyRefs, "legacyIds", legacyId);
  }

  if (rawStatus) legacyRefs.legacyStatus = rawStatus;
  if (rawDuration) legacyRefs.legacyDuration = rawDuration;
  if (legacyType) legacyRefs.legacyType = legacyType;
  if (legacyCategory) legacyRefs.legacyCategory = legacyCategory;
  if (rawVehicleCareType) legacyRefs.legacyVehicleCareType = rawVehicleCareType;
  if (serviceSupplyProfileKey) pushLegacyRef(legacyRefs, "serviceSupplyProfileKeys", serviceSupplyProfileKey);

  if (state.generatedServiceCode) {
    legacyRefs.generatedServiceCode = normalizeString(state.generatedServiceCode);
  }

  if (state.durationMinutes == null && rawDuration) {
    legacyRefs.unparsedDuration = rawDuration;
  }

  return compactPlainObject(legacyRefs);
}

function buildEnvelopeLegacyRefs(payload, options) {
  const legacyRefs = mergeLegacyRefObjects(payload.legacyRefs, options.legacyRefs);
  const serviceSupplyProfileKey = normalizeString(options.serviceSupplyProfileKey);
  if (serviceSupplyProfileKey) {
    pushLegacyRef(legacyRefs, "serviceSupplyProfileKeys", serviceSupplyProfileKey);
  }
  return compactPlainObject(legacyRefs);
}

function collectEnvelopeWarnings(payload, options) {
  const warnings = [];

  if (!normalizeString(options.organizationId) && !normalizeString(payload.organizationId)) {
    warnings.push(
      createWarning(
        "CTX_ORGANIZATION_ID_REQUIRED",
        "organizationId should come from context or payload before the contract envelope is promoted beyond the adapter boundary."
      )
    );
  }

  if (!normalizeString(options.sourceId) && !extractSourceIdFromCanonicalId(payload.id)) {
    warnings.push(
      createWarning(
        "CTX_SOURCE_ID_REQUIRED",
        "sourceId should come from context or be recoverable from the canonical id before the contract envelope is promoted beyond the adapter boundary."
      )
    );
  }

  return warnings;
}

function buildMetadata(adapterMode, options, extra = {}) {
  return compactPlainObject({
    adapterName: ADAPTER_NAME,
    adapterMode,
    contractName: SERVICE_CONTRACT_NAME,
    contractVersion: options.contractVersion || SERVICE_CONTRACT_VERSION,
    source: options.source,
    sourceCollection: options.sourceCollection,
    sourceId: options.sourceId,
    organizationId: options.organizationId,
    emittedAt: normalizeIsoTimestamp(extra.emittedAt || options.emittedAt || options.now),
    now: options.now,
    status: options.status || options.defaultStatus,
    idStrategy: options.idStrategy,
    strictMode: options.strictMode !== false,
    allowWarnings: options.allowWarnings !== false,
    notes: Array.isArray(extra.notes) ? extra.notes : [],
    ...options.metadata
  });
}

function parseDurationToMinutes(value) {
  if (isFiniteNumber(value)) return Math.max(0, Math.round(Number(value)));

  const rawValue = normalizeString(value);
  if (!rawValue) return null;

  const normalized = rawValue.toLowerCase().replace(/\s+/g, "");
  const hoursMatch = normalized.match(/^(\d+)h(\d{1,2})?$/);
  if (hoursMatch) {
    const hours = Number(hoursMatch[1] || 0);
    const minutes = Number(hoursMatch[2] || 0);
    return hours * 60 + minutes;
  }

  const minutesMatch = normalized.match(/^(\d+)(min|m)$/);
  if (minutesMatch) {
    return Number(minutesMatch[1]);
  }

  if (/^\d+$/.test(normalized)) {
    return Number(normalized);
  }

  return null;
}

function mapLegacyStatus(value) {
  const normalized = normalizeTextToken(value);

  if (!normalized) return "";
  if (normalized === "ativo" || normalized === "active") return "active";
  if (normalized === "inativo" || normalized === "inactive") return "inactive";
  if (normalized === "arquivado" || normalized === "archived") return "archived";
  if (normalized === "rascunho" || normalized === "draft") return "draft";

  return "";
}

function shouldGenerateServiceCode(source, options) {
  return !normalizeServiceCode(options.serviceCode || source.serviceCode) && !!normalizeString(options.sourceId);
}

function extractSourceIdFromCanonicalId(value) {
  const normalized = normalizeString(value);
  if (!normalized.startsWith(`${CONTRACT_NAMESPACE}:legacy:`)) return "";
  return normalized.slice(`${CONTRACT_NAMESPACE}:legacy:`.length);
}

function mergeLegacyRefObjects(base, overlay) {
  const result = {};

  if (isPlainObject(base)) {
    for (const [key, value] of Object.entries(base)) {
      result[key] = cloneLegacyRefValue(value);
    }
  }

  if (isPlainObject(overlay)) {
    for (const [key, value] of Object.entries(overlay)) {
      if (Array.isArray(result[key]) && Array.isArray(value)) {
        result[key] = uniqueArray(result[key].concat(value.map((item) => normalizeString(item)).filter(Boolean)));
      } else {
        result[key] = cloneLegacyRefValue(value);
      }
    }
  }

  return result;
}

function cloneLegacyRefValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => cloneLegacyRefValue(item));
  }

  if (isPlainObject(value)) {
    const clone = {};
    for (const [key, entry] of Object.entries(value)) {
      clone[key] = cloneLegacyRefValue(entry);
    }
    return clone;
  }

  return value;
}

function validateLegacyRefsStructure(legacyRefs, label) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(legacyRefs)) {
    errors.push(createError("LEGACY_REFS_INVALID", `${label} must be an object.`));
    return createValidation(errors, warnings, []);
  }

  for (const [key, value] of Object.entries(legacyRefs)) {
    if (!normalizeString(key)) {
      errors.push(createError("LEGACY_REFS_KEY_INVALID", `${label} contains an empty key.`));
    }

    if (Array.isArray(value)) {
      if (value.some((item) => !normalizeString(item))) {
        errors.push(createError("LEGACY_REFS_ARRAY_VALUE_INVALID", `${label}.${key} must not contain empty values.`));
      }
      continue;
    }

    if (isPlainObject(value)) continue;
    if (typeof value === "boolean") continue;
    if (isFiniteNumber(value)) continue;
    if (normalizeString(value)) continue;

    warnings.push(
      createWarning(
        "LEGACY_REFS_VALUE_REVIEW",
        `${label}.${key} contains a value that should be reviewed before cross-surface adoption.`
      )
    );
  }

  return createValidation(errors, warnings, []);
}

function isMissingRequiredField(field, value) {
  if (field === "price") return !isFiniteNumber(value);
  if (field === "isActive") return typeof value !== "boolean";
  if (typeof value === "number") return false;
  return !normalizeString(value);
}

function toCodeToken(value) {
  return normalizeString(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeServiceCode(value) {
  const token = normalizeString(value)
    .toUpperCase()
    .replace(/\s+/g, "-")
    .replace(/[^A-Z0-9:_-]+/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

  return token;
}

function normalizeMoney(value) {
  if (isFiniteNumber(value)) return roundMoney(Number(value));

  const rawValue = normalizeString(value);
  if (!rawValue) return null;

  const normalized = rawValue.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? roundMoney(parsed) : null;
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function normalizeIsoTimestamp(value) {
  const rawValue = normalizeString(value);
  if (!rawValue) return "";

  const parsed = new Date(rawValue);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString();
}

function normalizeIsoDate(value) {
  const rawValue = normalizeString(value);
  if (!rawValue) return "";
  return isIsoDate(rawValue) ? rawValue : "";
}

function normalizeStatus(value) {
  const mapped = mapLegacyStatus(value);
  if (mapped) return mapped;

  const normalized = normalizeTextToken(value);
  return MASTER_DATA_STATUSES.includes(normalized) ? normalized : "";
}

function normalizeString(value) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return uniqueArray(value.map((entry) => normalizeString(entry)).filter(Boolean));
  }

  const rawValue = normalizeString(value);
  return rawValue ? [rawValue] : [];
}

function normalizeTextToken(value) {
  return normalizeString(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function compactPlainObject(value) {
  if (!isPlainObject(value)) return {};

  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry == null) continue;
    if (typeof entry === "string" && !normalizeString(entry)) continue;
    if (Array.isArray(entry) && !entry.length) continue;
    if (isPlainObject(entry) && !Object.keys(entry).length) continue;
    result[key] = entry;
  }
  return result;
}

function pushLegacyRef(target, key, value) {
  const normalizedValue = normalizeString(value);
  if (!normalizedValue) return;

  const current = Array.isArray(target[key]) ? target[key] : [];
  target[key] = uniqueArray(current.concat(normalizedValue));
}

function uniqueArray(values) {
  return [...new Set(values)];
}

function toPlainObject(value) {
  return isPlainObject(value) ? { ...value } : {};
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isIsoTimestamp(value) {
  return !!normalizeIsoTimestamp(value);
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(normalizeString(value));
}

function createValidation(errors = [], warnings = [], missingRequiredFields = [], blocking = false) {
  const normalizedErrors = uniqueArray(errors.filter(Boolean));
  const normalizedWarnings = uniqueArray(warnings.filter(Boolean));
  const normalizedMissingRequiredFields = uniqueArray(missingRequiredFields.filter(Boolean));
  const isBlocking = blocking || normalizedErrors.length > 0;
  const ok = normalizedErrors.length === 0;

  return {
    ok,
    isValid: ok,
    blocking: isBlocking,
    errors: normalizedErrors,
    warnings: normalizedWarnings,
    missingRequiredFields: normalizedMissingRequiredFields
  };
}

function mergeValidations(...validations) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];
  let blocking = false;

  for (const validation of validations) {
    if (!validation) continue;
    errors.push(...(Array.isArray(validation.errors) ? validation.errors : []));
    warnings.push(...(Array.isArray(validation.warnings) ? validation.warnings : []));
    missingRequiredFields.push(
      ...(Array.isArray(validation.missingRequiredFields) ? validation.missingRequiredFields : [])
    );
    blocking = blocking || validation.blocking === true;
  }

  return createValidation(errors, warnings, missingRequiredFields, blocking);
}

function toValidationSummary(validation) {
  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    errors: [...validation.errors],
    warnings: [...validation.warnings],
    missingRequiredFields: [...validation.missingRequiredFields]
  };
}

function createError(code, message) {
  return `${code}: ${message}`;
}

function createWarning(code, message) {
  return `${code}: ${message}`;
}
