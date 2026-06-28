import {
  buildCanonicalId,
  createError,
  createMetadata,
  createValidationResult as createValidation,
  createWarning,
  normalizeLegacyRefs,
  normalizeSourceId,
  toValidationSummary
} from "./adapterHelpers.js";

export const ID_RESOLVER_VERSION = "1.0.0";

const FORBIDDEN_QUERY_FIELDS = new Set([
  "name",
  "displayName",
  "legalName",
  "plate",
  "vehiclePlate",
  "licensePlate",
  "phone",
  "email",
  "document",
  "text"
]);

const FORBIDDEN_REFERENCE_SEGMENTS = [
  "name",
  "displayname",
  "legalname",
  "plate",
  "vehicleplate",
  "licenseplate",
  "phone",
  "email",
  "document",
  "text"
];

const APPROVED_REFERENCE_SUFFIXES = ["id", "sourceid", "legacyid", "ref", "code"];

export function createResolutionIndex(contracts, options = {}) {
  const entries = [];
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];
  const byCanonicalId = Object.create(null);
  const bySourceId = Object.create(null);
  const byLegacyReference = Object.create(null);

  if (!Array.isArray(contracts)) {
    missingRequiredFields.push("contracts");
    errors.push(createError("INDEX_INPUT_INVALID", "contracts must be an array."));
  }

  const sourceContracts = Array.isArray(contracts) ? contracts : [];
  sourceContracts.forEach((contract, index) => {
    const entry = normalizeContractEntry(contract, options, index);
    entries.push(entry);

    if (!entry.canonicalId) {
      warnings.push(
        createWarning(
          "INDEX_ENTRY_CANONICAL_ID_MISSING",
          "one contract entry could not expose a canonical id and will only participate in restricted lookups.",
          `entry=${index}`
        )
      );
    } else {
      appendIndex(byCanonicalId, entry.canonicalId, entry.entryKey);
    }

    if (!entry.sourceId) {
      warnings.push(
        createWarning(
          "INDEX_ENTRY_SOURCE_ID_MISSING",
          "one contract entry could not expose sourceId and may fail cross-domain reconciliation.",
          `entry=${index}`
        )
      );
    } else {
      appendIndex(bySourceId, entry.sourceId, entry.entryKey);
    }

    for (const pair of entry.legacyReferencePairs) {
      appendIndex(byLegacyReference, buildLegacyReferenceIndexKey(pair.path, pair.value), entry.entryKey);
    }
  });

  const duplicateCanonicalIds = findDuplicateKeys(byCanonicalId);
  const duplicateSourceIds = findDuplicateKeys(bySourceId);
  const duplicateLegacyReferenceKeys = findDuplicateKeys(byLegacyReference);

  if (duplicateCanonicalIds.length) {
    warnings.push(
      createWarning(
        "INDEX_CANONICAL_ID_AMBIGUOUS",
        "the index contains duplicated canonical ids and those lookups will remain blocked until reconciled.",
        duplicateCanonicalIds.join(", ")
      )
    );
  }

  if (duplicateSourceIds.length) {
    warnings.push(
      createWarning(
        "INDEX_SOURCE_ID_AMBIGUOUS",
        "the index contains duplicated sourceIds and source-based lookups may be ambiguous without extra filters.",
        duplicateSourceIds.join(", ")
      )
    );
  }

  if (duplicateLegacyReferenceKeys.length) {
    warnings.push(
      createWarning(
        "INDEX_LEGACY_REFERENCE_AMBIGUOUS",
        "the index contains duplicated legacy reference keys and those lookups will remain blocked until reconciled.",
        duplicateLegacyReferenceKeys.join(", ")
      )
    );
  }

  const validation = createValidation({
    errors,
    warnings,
    missingRequiredFields,
    blocking: false
  });

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    version: ID_RESOLVER_VERSION,
    entries,
    byCanonicalId,
    bySourceId,
    byLegacyReference,
    validation: toValidationSummary(validation),
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata: createMetadata(
      {
        resolverVersion: ID_RESOLVER_VERSION,
        entryCount: entries.length
      },
      {
        duplicateCanonicalIds,
        duplicateSourceIds,
        duplicateLegacyReferenceKeys
      }
    )
  };
}

export function resolveCanonicalId(index, query = {}) {
  const indexValidation = validateIndex(index);
  if (!indexValidation.ok) {
    return createResolutionResult({
      code: "INDEX_INVALID",
      reason: "resolution index is invalid.",
      errors: indexValidation.errors,
      warnings: indexValidation.warnings,
      missingRequiredFields: indexValidation.missingRequiredFields,
      blocking: true
    });
  }

  const normalizedQuery = normalizeQuery(query);
  const forbiddenFields = findForbiddenQueryFields(normalizedQuery);
  if (forbiddenFields.length) {
    return createResolutionResult({
      code: "FORBIDDEN_LOOKUP_FIELD",
      reason: "the query uses a forbidden identity field.",
      errors: [
        createError(
          "FORBIDDEN_LOOKUP_FIELD",
          `resolver rejects non-canonical lookup fields: ${forbiddenFields.join(", ")}`
        )
      ],
      blocking: true,
      metadata: { queryType: "canonical" }
    });
  }

  const canonicalId = normalizeSourceId(normalizedQuery.canonicalId || normalizedQuery.id);
  const sourceId = normalizeSourceId(normalizedQuery.sourceId);
  const contractKey = normalizeContractKey(normalizedQuery.contractName);
  const organizationId = normalizeSourceId(normalizedQuery.organizationId);
  const source = normalizeSourceId(normalizedQuery.source);

  if (!canonicalId && !sourceId) {
    return createResolutionResult({
      code: "RESOLUTION_IDENTIFIER_REQUIRED",
      reason: "canonicalId or sourceId is required for canonical resolution.",
      errors: [
        createError(
          "RESOLUTION_IDENTIFIER_REQUIRED",
          "canonical resolution requires canonicalId or sourceId."
        )
      ],
      missingRequiredFields: ["canonicalIdOrSourceId"],
      blocking: true,
      metadata: { queryType: "canonical" }
    });
  }

  const candidates = canonicalId
    ? index.entries.filter((entry) => entry.canonicalId === canonicalId)
    : index.entries.filter((entry) => entry.sourceId === sourceId);
  const matches = candidates.filter((entry) =>
    matchesEntryFilters(entry, {
      contractKey,
      organizationId,
      source
    })
  );

  return finalizeMatches(matches, {
    codePrefix: "CANONICAL",
    reasonLabel: "canonical resolution",
    queryType: "canonical",
    canonicalId,
    sourceId
  });
}

export function resolveLegacyReference(index, query = {}) {
  const indexValidation = validateIndex(index);
  if (!indexValidation.ok) {
    return createResolutionResult({
      code: "INDEX_INVALID",
      reason: "resolution index is invalid.",
      errors: indexValidation.errors,
      warnings: indexValidation.warnings,
      missingRequiredFields: indexValidation.missingRequiredFields,
      blocking: true
    });
  }

  const normalizedQuery = normalizeQuery(query);
  const forbiddenFields = findForbiddenQueryFields(normalizedQuery);
  if (forbiddenFields.length) {
    return createResolutionResult({
      code: "FORBIDDEN_LOOKUP_FIELD",
      reason: "the query uses a forbidden identity field.",
      errors: [
        createError(
          "FORBIDDEN_LOOKUP_FIELD",
          `resolver rejects non-canonical lookup fields: ${forbiddenFields.join(", ")}`
        )
      ],
      blocking: true,
      metadata: { queryType: "legacy-reference" }
    });
  }

  const refPath = normalizeReferencePath(
    normalizedQuery.refPath || normalizedQuery.path || normalizedQuery.legacyRefPath
  );
  const refValue = normalizeSourceId(
    normalizedQuery.refValue || normalizedQuery.value || normalizedQuery.legacyRefValue
  );
  const contractKey = normalizeContractKey(normalizedQuery.contractName);
  const organizationId = normalizeSourceId(normalizedQuery.organizationId);
  const source = normalizeSourceId(normalizedQuery.source);

  const missingRequiredFields = [];
  const errors = [];

  if (!refPath) {
    missingRequiredFields.push("refPath");
    errors.push(createError("LEGACY_REFERENCE_PATH_REQUIRED", "refPath is required."));
  }

  if (!refValue) {
    missingRequiredFields.push("refValue");
    errors.push(createError("LEGACY_REFERENCE_VALUE_REQUIRED", "refValue is required."));
  }

  if (errors.length) {
    return createResolutionResult({
      code: "LEGACY_REFERENCE_REQUIRED",
      reason: "legacy reference resolution requires path and value.",
      errors,
      missingRequiredFields,
      blocking: true,
      metadata: { queryType: "legacy-reference" }
    });
  }

  if (isForbiddenReferencePath(refPath)) {
    return createResolutionResult({
      code: "FORBIDDEN_LEGACY_REFERENCE",
      reason: "the requested legacy reference cannot be used as official identity.",
      errors: [
        createError(
          "FORBIDDEN_LEGACY_REFERENCE",
          `legacy reference path ${refPath} is not allowed for identity resolution.`
        )
      ],
      blocking: true,
      metadata: { queryType: "legacy-reference", refPath }
    });
  }

  if (!isApprovedReferencePath(refPath)) {
    return createResolutionResult({
      code: "LEGACY_REFERENCE_NOT_APPROVED",
      reason: "the requested legacy reference path is outside the approved identity baseline.",
      errors: [
        createError(
          "LEGACY_REFERENCE_NOT_APPROVED",
          `legacy reference path ${refPath} is outside the approved resolver scope.`
        )
      ],
      blocking: true,
      metadata: { queryType: "legacy-reference", refPath }
    });
  }

  const matches = index.entries.filter((entry) => {
    if (
      !matchesEntryFilters(entry, {
        contractKey,
        organizationId,
        source
      })
    ) {
      return false;
    }

    return entry.legacyReferencePairs.some(
      (pair) => pair.path === refPath && pair.value === refValue
    );
  });

  return finalizeMatches(matches, {
    codePrefix: "LEGACY_REFERENCE",
    reasonLabel: "legacy reference resolution",
    queryType: "legacy-reference",
    refPath,
    refValue
  });
}

export function createResolutionResult(options = {}) {
  const {
    code = "",
    reason = "",
    errors = [],
    warnings = [],
    missingRequiredFields = [],
    blocking = false,
    match = null,
    matches = [],
    canonicalId = "",
    sourceId = "",
    contractName = "",
    organizationId = "",
    source = "",
    legacyRefs = {},
    metadata = {}
  } = options;

  const validation = createValidation({
    errors,
    warnings,
    missingRequiredFields,
    blocking
  });
  const normalizedMatch = normalizeMatch(match);
  const normalizedMatches = Array.isArray(matches)
    ? uniqueMatches(matches.map((entry) => normalizeMatch(entry)).filter(Boolean))
    : normalizedMatch
      ? [normalizedMatch]
      : [];
  const resolvedCanonicalId = normalizeSourceId(canonicalId || normalizedMatch?.canonicalId);
  const resolvedSourceId = normalizeSourceId(sourceId || normalizedMatch?.sourceId);
  const resolvedContractName = normalizeSourceId(
    contractName || normalizedMatch?.contractName
  );
  const resolvedOrganizationId = normalizeSourceId(
    organizationId || normalizedMatch?.organizationId
  );
  const resolvedSource = normalizeSourceId(source || normalizedMatch?.source);
  const resolvedLegacyRefs = normalizeLegacyRefs(
    Object.keys(normalizeLegacyRefs(legacyRefs)).length
      ? legacyRefs
      : normalizedMatch?.legacyRefs
  );
  const result = {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    code: normalizeSourceId(code),
    reason: normalizeSourceId(reason),
    validation: toValidationSummary(validation),
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    matches: normalizedMatches,
    metadata: createMetadata(
      {
        resolverVersion: ID_RESOLVER_VERSION,
        matchCount: normalizedMatches.length
      },
      metadata
    )
  };

  if (normalizedMatch) result.match = normalizedMatch;
  if (resolvedCanonicalId) result.canonicalId = resolvedCanonicalId;
  if (resolvedSourceId) result.sourceId = resolvedSourceId;
  if (resolvedContractName) result.contractName = resolvedContractName;
  if (resolvedOrganizationId) result.organizationId = resolvedOrganizationId;
  if (resolvedSource) result.source = resolvedSource;
  if (Object.keys(resolvedLegacyRefs).length) result.legacyRefs = resolvedLegacyRefs;

  return result;
}

function normalizeContractEntry(contract, options, index) {
  const candidate = toPlainObject(contract);
  const payload = isPlainObject(candidate.payload) ? toPlainObject(candidate.payload) : candidate;
  const contractName = normalizeSourceId(
    candidate.contractName || payload.contractName || options.defaultContractName
  );
  const contractKey = normalizeContractKey(contractName);
  const sourceId =
    normalizeSourceId(candidate.sourceId || payload.sourceId) ||
    extractSourceIdFromCanonicalId(payload.id || candidate.id);
  const canonicalId =
    normalizeSourceId(payload.id || candidate.id) ||
    buildCanonicalId(contractKey, sourceId);
  const organizationId = normalizeSourceId(
    payload.organizationId || candidate.organizationId || options.organizationId
  );
  const source = normalizeSourceId(candidate.source || payload.source || options.defaultSource);
  const legacyRefs = normalizeLegacyRefs(payload.legacyRefs || candidate.legacyRefs);

  return {
    entryKey: createEntryLookupKey(index, canonicalId, contractKey),
    entryIndex: index,
    canonicalId,
    sourceId,
    contractName,
    contractKey,
    organizationId,
    source,
    legacyRefs,
    legacyReferencePairs: collectLegacyReferencePairs(legacyRefs),
    payload
  };
}

function finalizeMatches(matches, context) {
  if (!matches.length) {
    return createResolutionResult({
      code: `${context.codePrefix}_NOT_FOUND`,
      reason: `${context.reasonLabel} did not find a unique match.`,
      errors: [
        createError(
          `${context.codePrefix}_NOT_FOUND`,
          `${context.reasonLabel} did not find a compatible contract.`
        )
      ],
      blocking: true,
      metadata: buildResolutionMetadata(context, matches)
    });
  }

  if (matches.length > 1) {
    return createResolutionResult({
      code: `${context.codePrefix}_AMBIGUOUS`,
      reason: `${context.reasonLabel} found more than one compatible match.`,
      errors: [
        createError(
          `${context.codePrefix}_AMBIGUOUS`,
          `${context.reasonLabel} found more than one compatible contract.`
        )
      ],
      blocking: true,
      matches,
      metadata: buildResolutionMetadata(context, matches)
    });
  }

  const [match] = matches;
  return createResolutionResult({
    code: `${context.codePrefix}_OK`,
    reason: `${context.reasonLabel} resolved a unique canonical contract.`,
    match,
    matches,
    metadata: buildResolutionMetadata(context, matches)
  });
}

function validateIndex(index) {
  if (
    !index ||
    typeof index !== "object" ||
    !Array.isArray(index.entries) ||
    typeof index.byCanonicalId !== "object" ||
    typeof index.bySourceId !== "object" ||
    typeof index.byLegacyReference !== "object"
  ) {
    return createValidation({
      errors: [createError("INDEX_SHAPE_INVALID", "resolution index shape is invalid.")],
      missingRequiredFields: ["index"],
      blocking: true
    });
  }

  return createValidation();
}

function normalizeQuery(query) {
  return isPlainObject(query) ? { ...query } : {};
}

function findForbiddenQueryFields(query) {
  return Object.keys(query).filter((key) => {
    if (!FORBIDDEN_QUERY_FIELDS.has(key)) return false;
    return normalizeSourceId(query[key]) !== "";
  });
}

function matchesEntryFilters(entry, filters) {
  if (filters.contractKey && entry.contractKey !== filters.contractKey) return false;
  if (filters.organizationId && entry.organizationId !== filters.organizationId) return false;
  if (filters.source && entry.source !== filters.source) return false;
  return true;
}

function normalizeMatch(entry) {
  if (!entry || typeof entry !== "object") return null;

  return {
    canonicalId: normalizeSourceId(entry.canonicalId),
    sourceId: normalizeSourceId(entry.sourceId),
    contractName: normalizeSourceId(entry.contractName),
    organizationId: normalizeSourceId(entry.organizationId),
    source: normalizeSourceId(entry.source),
    legacyRefs: normalizeLegacyRefs(entry.legacyRefs)
  };
}

function uniqueMatches(matches) {
  const seen = new Set();
  const result = [];

  for (const match of matches) {
    const key = `${match.canonicalId}::${match.contractName}::${match.organizationId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(match);
  }

  return result;
}

function buildResolutionMetadata(context, matches) {
  return createMetadata({
    queryType: context.queryType,
    canonicalId: normalizeSourceId(context.canonicalId),
    sourceId: normalizeSourceId(context.sourceId),
    refPath: normalizeReferencePath(context.refPath),
    refValue: normalizeSourceId(context.refValue),
    matchCount: matches.length
  });
}

function collectLegacyReferencePairs(legacyRefs) {
  const pairs = [];

  walkLegacyReferenceValue(normalizeLegacyRefs(legacyRefs), [], pairs);

  return pairs;
}

function walkLegacyReferenceValue(value, pathSegments, pairs) {
  if (Array.isArray(value)) {
    value.forEach((entry) => walkLegacyReferenceValue(entry, pathSegments, pairs));
    return;
  }

  if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, entry]) => {
      walkLegacyReferenceValue(entry, [...pathSegments, normalizeSourceId(key)], pairs);
    });
    return;
  }

  const normalizedValue = normalizeSourceId(value);
  const normalizedPath = normalizeReferencePath(pathSegments.join("."));
  if (!normalizedPath || !normalizedValue) return;
  pairs.push({ path: normalizedPath, value: normalizedValue });
}

function isForbiddenReferencePath(path) {
  const segments = normalizeReferencePath(path).split(".").filter(Boolean);
  return segments.some((segment) =>
    FORBIDDEN_REFERENCE_SEGMENTS.includes(segment.replace(/[^a-z0-9]/gi, "").toLowerCase())
  );
}

function isApprovedReferencePath(path) {
  const segments = normalizeReferencePath(path).split(".").filter(Boolean);
  return segments.some((segment) => {
    const normalizedSegment = segment.replace(/[^a-z0-9]/gi, "").toLowerCase();
    return APPROVED_REFERENCE_SUFFIXES.some((suffix) => normalizedSegment.endsWith(suffix));
  });
}

function normalizeReferencePath(path) {
  return normalizeSourceId(path)
    .replace(/\[(\d+)\]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(/^\./, "")
    .replace(/\.$/, "");
}

function normalizeContractKey(contractName) {
  return normalizeSourceId(contractName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function extractSourceIdFromCanonicalId(canonicalId) {
  const normalizedCanonicalId = normalizeSourceId(canonicalId);
  const separatorIndex = normalizedCanonicalId.lastIndexOf(":legacy:");
  if (separatorIndex === -1) return "";
  return normalizeSourceId(normalizedCanonicalId.slice(separatorIndex + 8));
}

function appendIndex(index, key, value) {
  if (!key || !value) return;
  if (!Array.isArray(index[key])) {
    index[key] = [];
  }
  if (!index[key].includes(value)) {
    index[key].push(value);
  }
}

function buildLegacyReferenceIndexKey(path, value) {
  return `${normalizeReferencePath(path)}::${normalizeSourceId(value)}`;
}

function findDuplicateKeys(index) {
  return Object.entries(index)
    .filter(([, values]) => Array.isArray(values) && values.length > 1)
    .map(([key]) => key);
}

function createEntryLookupKey(entryIndex, canonicalId, contractKey) {
  const resolvedCanonicalId = normalizeSourceId(canonicalId);
  if (resolvedCanonicalId) {
    return `${resolvedCanonicalId}#${entryIndex}`;
  }

  return `${contractKey || "contract"}::${entryIndex}`;
}

function toPlainObject(value) {
  if (!isPlainObject(value)) return {};

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, cloneValue(entry)])
  );
}

function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneValue(entry));
  }

  if (isPlainObject(value)) {
    return toPlainObject(value);
  }

  return value;
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}
