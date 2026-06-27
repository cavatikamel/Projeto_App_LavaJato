export function normalizeSourceId(sourceId) {
  if (sourceId == null) return "";
  return String(sourceId).trim();
}

export function buildCanonicalId(entityName, sourceId) {
  const normalizedEntityName = normalizeSourceId(entityName);
  const normalizedSourceId = normalizeSourceId(sourceId);

  if (!normalizedEntityName || !normalizedSourceId) return "";
  return `${normalizedEntityName}:legacy:${normalizedSourceId}`;
}

export function createError(code, message) {
  return `${code}: ${message}`;
}

export function createWarning(code, message, details = "") {
  const normalizedDetails = typeof details === "string" ? details.trim() : "";
  if (!normalizedDetails) return `${code}: ${message}`;
  return `${code}: ${message} (${normalizedDetails})`;
}

export function createValidationResult(
  configOrErrors = {},
  legacyWarnings = [],
  legacyMissingRequiredFields = [],
  legacyBlocking = false
) {
  const config = Array.isArray(configOrErrors)
    ? {
        errors: configOrErrors,
        warnings: legacyWarnings,
        missingRequiredFields: legacyMissingRequiredFields,
        blocking: legacyBlocking
      }
    : configOrErrors || {};
  const {
    errors = [],
    warnings = [],
    missingRequiredFields = [],
    blocking = false
  } = config;
  const uniqueErrors = uniqueStrings(errors.filter(Boolean));
  const uniqueWarnings = uniqueStrings(warnings.filter(Boolean));
  const uniqueMissingRequiredFields = uniqueStrings(missingRequiredFields.filter(Boolean));
  const isBlocking = Boolean(blocking) || uniqueErrors.length > 0;
  const ok = uniqueErrors.length === 0 && !isBlocking;

  return {
    ok,
    isValid: ok,
    blocking: isBlocking,
    errors: uniqueErrors,
    warnings: uniqueWarnings,
    missingRequiredFields: uniqueMissingRequiredFields
  };
}

export function mergeValidationResults(...validations) {
  return createValidationResult({
    errors: validations.flatMap((validation) => validation?.errors || []),
    warnings: validations.flatMap((validation) => validation?.warnings || []),
    missingRequiredFields: validations.flatMap((validation) => validation?.missingRequiredFields || []),
    blocking: validations.some((validation) => Boolean(validation?.blocking))
  });
}

export function toValidationSummary(validation) {
  return {
    ok: validation.ok,
    errors: [...validation.errors],
    missingRequiredFields: [...validation.missingRequiredFields],
    blocking: validation.blocking
  };
}

export function createMetadata(baseMetadata, extraMetadata = {}) {
  const merged = {
    ...clonePlainObject(baseMetadata),
    ...clonePlainObject(extraMetadata)
  };

  return removeEmptyObjectKeys(merged);
}

export function normalizeLegacyRefs(legacyRefs) {
  return clonePlainObject(legacyRefs);
}

export function createContractEnvelope({
  contractName,
  contractVersion,
  payload,
  organizationId,
  source,
  sourceId,
  createdAt,
  updatedAt,
  status,
  metadata,
  legacyRefs
}) {
  const envelope = {
    contractName,
    contractVersion,
    payload: isPlainObject(payload) ? { ...payload } : payload,
    organizationId,
    source,
    sourceId,
    createdAt,
    updatedAt,
    status,
    warnings: [],
    validation: createValidationResult(),
    metadata: clonePlainObject(metadata)
  };

  const normalizedLegacyRefs = normalizeLegacyRefs(legacyRefs);
  if (Object.keys(normalizedLegacyRefs).length) {
    envelope.legacyRefs = normalizedLegacyRefs;
  }

  return envelope;
}

function removeEmptyObjectKeys(value) {
  const cleaned = {};

  for (const [key, entry] of Object.entries(value)) {
    if (entry == null) continue;
    if (Array.isArray(entry) && entry.length === 0) continue;
    if (isPlainObject(entry) && Object.keys(entry).length === 0) continue;
    if (typeof entry === "string" && !entry.trim()) continue;
    cleaned[key] = entry;
  }

  return cleaned;
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function clonePlainObject(value) {
  if (!isPlainObject(value)) return {};

  const clone = {};
  for (const [key, entry] of Object.entries(value)) {
    clone[key] = cloneValue(entry);
  }

  return clone;
}

function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneValue(entry));
  }

  if (isPlainObject(value)) {
    return clonePlainObject(value);
  }

  return value;
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}
