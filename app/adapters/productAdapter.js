import {
  buildCanonicalId,
  createContractEnvelope,
  createError,
  createMetadata,
  createValidationResult as createValidation,
  createWarning,
  mergeValidationResults as mergeValidations,
  normalizeLegacyRefs,
  normalizeSourceId,
  toValidationSummary
} from "./shared/adapterHelpers.js";

export const PRODUCT_CONTRACT_NAME = "Product";
export const PRODUCT_CONTRACT_VERSION = "1.0.0";

const ADAPTER_NAME = "productAdapter";
const CONTRACT_NAMESPACE = "product";
const DEFAULT_SOURCE = "web.productCatalog";
const DEFAULT_SOURCE_COLLECTION = "productCatalog";
const DEFAULT_ID_STRATEGY = "namespaceLegacySource";
const DEFAULT_MASTER_DATA_STATUS = "active";
const MASTER_DATA_STATUSES = ["draft", "active", "inactive", "archived"];
const REQUIRED_FIELDS = [
  "id",
  "organizationId",
  "sku",
  "name",
  "unit",
  "salePrice",
  "isActive",
  "createdAt",
  "updatedAt"
];

export function toProductContract(legacyProduct, context = {}) {
  const source = toPlainObject(legacyProduct);
  const options = normalizeLegacyContext(source, context);
  const productContract = buildProductContract(source, options);
  const validation = mergeValidations(
    validateProductContract(productContract),
    validatePayloadContext(productContract, source, options)
  );
  const metadata = buildMetadata("legacy-to-contract-payload", options, {
    emittedAt: options.now,
    notes: []
  });

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    productContract,
    validation: toValidationSummary(validation),
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata,
    source: options.source,
    sourceId: options.sourceId
  };
}

export function validateProductContract(productContract) {
  const candidate = toPlainObject(productContract);
  const payload = isPlainObject(candidate.payload) ? toPlainObject(candidate.payload) : candidate;
  const payloadValidation = validateProductPayload(payload);

  if (!isPlainObject(candidate.payload)) {
    return payloadValidation;
  }

  const envelopeValidation = validateProductEnvelope(candidate, payload);
  return mergeValidations(payloadValidation, envelopeValidation);
}

export function createProductContractEnvelope(productContract, context = {}) {
  const payload = toPlainObject(productContract);
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
  const productContractEnvelope = createContractEnvelope({
    contractName: PRODUCT_CONTRACT_NAME,
    contractVersion: options.contractVersion || PRODUCT_CONTRACT_VERSION,
    payload,
    organizationId: normalizeString(payload.organizationId || options.organizationId),
    source: options.source,
    sourceId: options.sourceId,
    createdAt: normalizeIsoTimestamp(payload.createdAt || options.createdAt),
    updatedAt: normalizeIsoTimestamp(payload.updatedAt || options.updatedAt),
    status: resolveEnvelopeStatus(payload, options),
    metadata,
    legacyRefs
  });

  const validation = mergeValidations(
    validateProductContract(productContractEnvelope),
    createValidation([], provisionalWarnings, [], false)
  );

  productContractEnvelope.warnings = validation.warnings;
  productContractEnvelope.validation = toValidationSummary(validation);

  return {
    ok: validation.ok,
    isValid: validation.isValid,
    blocking: validation.blocking,
    productContractEnvelope,
    validation: productContractEnvelope.validation,
    errors: validation.errors,
    warnings: validation.warnings,
    missingRequiredFields: validation.missingRequiredFields,
    metadata
  };
}

function buildProductContract(source, options) {
  const notes = resolveNotes(source, options);
  const productContract = {
    id: resolveCanonicalId(options),
    organizationId: normalizeString(options.organizationId),
    sku: resolveSku(source, options),
    name: resolveProductName(source, options),
    unit: resolveUnit(source, options),
    salePrice: resolveSalePrice(source, options),
    isActive: resolveIsActive(source, options),
    createdAt: resolveCreatedAt(source, options),
    updatedAt: resolveUpdatedAt(source, options)
  };

  const costPrice = normalizeOptionalMoney(options.costPrice ?? source.costPrice ?? source.cost);
  if (costPrice != null) productContract.costPrice = costPrice;

  const stockBalance = normalizeOptionalNumber(options.stockBalance ?? source.stockBalance ?? source.stock);
  if (stockBalance != null) productContract.stockBalance = stockBalance;

  const minStock = normalizeOptionalNumber(options.minStock ?? source.minStock);
  if (minStock != null) productContract.minStock = minStock;

  const category = normalizeString(options.category || source.category);
  if (category) productContract.category = category;

  const barcode = normalizeString(options.barcode || source.barcode);
  if (barcode) productContract.barcode = barcode;

  if (notes) productContract.notes = notes;

  const legacyRefs = buildLegacyRefs(source, options, {
    notesDerivedFromDescription:
      normalizeString(source.description) && !normalizeString(source.notes) && notes === normalizeString(source.description)
  });
  if (Object.keys(legacyRefs).length) productContract.legacyRefs = legacyRefs;

  return productContract;
}

function validateProductPayload(payload) {
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

  if (!isFiniteNumber(payload.salePrice) || Number(payload.salePrice) < 0) {
    errors.push(createError("PAYLOAD_SALE_PRICE_INVALID", "Field salePrice must be a non-negative number."));
  }

  if (Object.prototype.hasOwnProperty.call(payload, "costPrice") && !isNonNegativeNumber(payload.costPrice)) {
    errors.push(createError("PAYLOAD_COST_PRICE_INVALID", "Field costPrice must be a non-negative number when present."));
  }

  if (Object.prototype.hasOwnProperty.call(payload, "stockBalance") && !isFiniteNumber(payload.stockBalance)) {
    errors.push(createError("PAYLOAD_STOCK_BALANCE_INVALID", "Field stockBalance must be numeric when present."));
  }

  if (Object.prototype.hasOwnProperty.call(payload, "minStock") && !isFiniteNumber(payload.minStock)) {
    errors.push(createError("PAYLOAD_MIN_STOCK_INVALID", "Field minStock must be numeric when present."));
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

  if (payload.legacyRefs && !isPlainObject(payload.legacyRefs)) {
    errors.push(createError("PAYLOAD_LEGACY_REFS_INVALID", "Field legacyRefs must be an object when present."));
  }

  if (payload.legacyRefs && isPlainObject(payload.legacyRefs)) {
    const legacyRefsValidation = validateLegacyRefsStructure(payload.legacyRefs, "payload.legacyRefs");
    errors.push(...legacyRefsValidation.errors);
    warnings.push(...legacyRefsValidation.warnings);
  }

  if (payload.sku && /\s/.test(payload.sku)) {
    warnings.push(
      createWarning(
        "PAYLOAD_SKU_NON_STANDARD",
        "Field sku should remain a normalized operational identifier without whitespace."
      )
    );
  }

  if (payload.category && !normalizeString(payload.category)) {
    warnings.push(createWarning("PAYLOAD_CATEGORY_EMPTY", "Field category should not be an empty string when present."));
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function validateProductEnvelope(envelope, payload) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (envelope.contractName !== PRODUCT_CONTRACT_NAME) {
    errors.push(createError("ENV_CONTRACT_NAME_INVALID", `Field contractName must be ${PRODUCT_CONTRACT_NAME}.`));
  }

  if (!normalizeString(envelope.contractVersion)) {
    missingRequiredFields.push("contractVersion");
    errors.push(createError("ENV_CONTRACT_VERSION_REQUIRED", "Field contractVersion must be a non-empty string."));
  } else if (normalizeString(envelope.contractVersion) !== PRODUCT_CONTRACT_VERSION) {
    warnings.push(
      createWarning(
        "ENV_CONTRACT_VERSION_REVIEW",
        `contractVersion differs from ${PRODUCT_CONTRACT_VERSION} and should be reviewed against shared compatibility rules.`
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
    errors.push(createError("ENV_STATUS_REQUIRED", "Field status must be a non-empty string on the envelope."));
  } else if (!MASTER_DATA_STATUSES.includes(normalizeString(envelope.status))) {
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

  const validationShape = validateValidationShape(envelope.validation, "validation");
  errors.push(...validationShape.errors);
  warnings.push(...validationShape.warnings);

  const metadataValidation = validateMetadataStructure(envelope.metadata, "metadata");
  errors.push(...metadataValidation.errors);
  warnings.push(...metadataValidation.warnings);

  if (envelope.legacyRefs != null) {
    if (!isPlainObject(envelope.legacyRefs)) {
      errors.push(createError("ENV_LEGACY_REFS_INVALID", "Field legacyRefs must be an object when present."));
    } else {
      const legacyRefsValidation = validateLegacyRefsStructure(envelope.legacyRefs, "legacyRefs");
      errors.push(...legacyRefsValidation.errors);
      warnings.push(...legacyRefsValidation.warnings);
    }
  }

  if (isPlainObject(envelope.payload) && isPlainObject(payload)) {
    if (normalizeString(envelope.organizationId) !== normalizeString(payload.organizationId)) {
      warnings.push(
        createWarning(
          "ENV_PAYLOAD_ORGANIZATION_ID_MISMATCH",
          "Envelope organizationId differs from payload.organizationId and should be reviewed."
        )
      );
    }
  }

  return createValidation(errors, warnings, missingRequiredFields);
}

function validatePayloadContext(productContract, source, options) {
  const errors = [];
  const warnings = [];
  const missingRequiredFields = [];

  if (!normalizeString(options.organizationId)) {
    missingRequiredFields.push("organizationId");
    warnings.push(
      createWarning(
        "CTX_ORGANIZATION_ID_REQUIRED",
        "organizationId must come from context or a controlled source before promoting the contract."
      )
    );
  }

  if (!normalizeString(options.sourceId)) {
    missingRequiredFields.push("sourceId");
    warnings.push(
      createWarning(
        "CTX_SOURCE_ID_REQUIRED",
        "sourceId must be explicit so canonical identity stays separated from runtime or UI state."
      )
    );
  }

  if (!normalizeString(options.now)) {
    warnings.push(
      createWarning(
        "CTX_NOW_REQUIRED",
        "createdAt and updatedAt should come from context.now or explicit timestamps because the adapter does not read runtime time implicitly."
      )
    );
  }

  if (!normalizeString(productContract.id) && normalizeString(options.sourceId)) {
    errors.push(createError("PAYLOAD_ID_UNRESOLVED", "Canonical id could not be resolved from sourceId."));
  }

  if (normalizeString(source.supplier || options.supplierName)) {
    warnings.push(
      createWarning(
        "LEGACY_SUPPLIER_PRESERVED_AS_REF",
        "Legacy supplier data is preserved in legacyRefs because Product does not own supplierName as a first-class contract field."
      )
    );
  }

  if (normalizeString(source.type || options.type) && !normalizeString(productContract.category)) {
    warnings.push(
      createWarning(
        "LEGACY_TYPE_PRESERVED_AS_REF",
        "Legacy product type is preserved in legacyRefs until category semantics are standardized."
      )
    );
  }

  if (normalizeString(source.description) && normalizeString(source.notes)) {
    warnings.push(
      createWarning(
        "LEGACY_DESCRIPTION_NOT_PROMOTED",
        "Legacy description stays outside the canonical contract when notes already exist."
      )
    );
  }

  return createValidation(errors, warnings, missingRequiredFields, errors.length > 0);
}

function normalizeLegacyContext(source, context) {
  const sourceName = normalizeString(context.source || inferSourceName(source) || DEFAULT_SOURCE);
  const sourceId = resolveLegacySourceId(source, context);
  const now = normalizeIsoTimestamp(context.now);

  return {
    source: sourceName,
    sourceId,
    sourceCollection: resolveSourceCollection(
      sourceName,
      normalizeString(context.sourceCollection || source.sourceCollection || DEFAULT_SOURCE_COLLECTION)
    ),
    organizationId: normalizeString(context.organizationId || source.organizationId),
    now,
    emittedAt: normalizeIsoTimestamp(context.emittedAt),
    createdAt: normalizeIsoTimestamp(context.createdAt || source.createdAt || now),
    updatedAt: normalizeIsoTimestamp(context.updatedAt || source.updatedAt || now),
    status: normalizeStatus(context.status),
    defaultStatus: normalizeStatus(context.defaultStatus) || DEFAULT_MASTER_DATA_STATUS,
    contractVersion: normalizeString(context.contractVersion || PRODUCT_CONTRACT_VERSION),
    idStrategy: normalizeIdStrategy(context.idStrategy) || DEFAULT_ID_STRATEGY,
    strictMode: Boolean(context.strictMode),
    allowWarnings: context.allowWarnings !== false,
    legacyRefs: normalizeLegacyRefs(context.legacyRefs || source.legacyRefs),
    supplierName: normalizeString(context.supplierName)
  };
}

function normalizeEnvelopeContext(productContract, context) {
  const payload = toPlainObject(productContract);
  const sourceName = normalizeString(context.source || inferEnvelopeSource(payload.legacyRefs) || DEFAULT_SOURCE);
  const sourceId = normalizeSourceId(
    context.sourceId ||
      payload.sourceId ||
      payload.legacyRefs?.sourceId ||
      payload.legacyRefs?.productCatalogId ||
      payload.legacyRefs?.legacyProductId
  );
  const now = normalizeIsoTimestamp(context.now);

  return {
    source: sourceName,
    sourceId,
    sourceCollection: resolveSourceCollection(
      sourceName,
      normalizeString(context.sourceCollection || payload.legacyRefs?.sourceCollection || DEFAULT_SOURCE_COLLECTION)
    ),
    organizationId: normalizeString(context.organizationId || payload.organizationId),
    now,
    emittedAt: normalizeIsoTimestamp(context.emittedAt),
    createdAt: normalizeIsoTimestamp(context.createdAt || payload.createdAt || now),
    updatedAt: normalizeIsoTimestamp(context.updatedAt || payload.updatedAt || now),
    status: normalizeStatus(context.status),
    defaultStatus:
      normalizeStatus(context.defaultStatus) || (payload.isActive === false ? "inactive" : DEFAULT_MASTER_DATA_STATUS),
    contractVersion: normalizeString(context.contractVersion || PRODUCT_CONTRACT_VERSION),
    idStrategy: normalizeIdStrategy(context.idStrategy) || DEFAULT_ID_STRATEGY,
    strictMode: Boolean(context.strictMode),
    allowWarnings: context.allowWarnings !== false,
    legacyRefs: normalizeLegacyRefs(context.legacyRefs || payload.legacyRefs)
  };
}

function resolveCanonicalId(options) {
  if (options.idStrategy === "namespaceLegacySource") {
    return buildCanonicalId(CONTRACT_NAMESPACE, options.sourceId);
  }

  return buildCanonicalId(CONTRACT_NAMESPACE, options.sourceId);
}

function resolveLegacySourceId(source, options) {
  return normalizeSourceId(
    options.sourceId ||
      source.sourceId ||
      source.id ||
      source.productId ||
      source.inventoryItemId
  );
}

function resolveSku(source, options) {
  return normalizeString(options.sku || source.sku || source.productCode);
}

function resolveProductName(source, options) {
  return normalizeString(options.name || source.name || source.title);
}

function resolveUnit(source, options) {
  return normalizeString(options.unit || source.unit);
}

function resolveSalePrice(source, options) {
  const explicitValue = options.salePrice ?? source.salePrice ?? source.price;
  if (explicitValue == null || normalizeString(explicitValue) === "") return null;
  return normalizeMoney(explicitValue);
}

function resolveIsActive(source, options) {
  if (typeof options.isActive === "boolean") return options.isActive;
  if (typeof source.isActive === "boolean") return source.isActive;
  if (typeof source.active === "boolean") return source.active;
  const normalizedStatus = normalizeStatus(options.status || source.status);
  if (normalizedStatus === "inactive" || normalizedStatus === "archived") return false;
  return true;
}

function resolveCreatedAt(source, options) {
  return normalizeIsoTimestamp(options.createdAt || source.createdAt || options.now);
}

function resolveUpdatedAt(source, options) {
  return normalizeIsoTimestamp(options.updatedAt || source.updatedAt || options.now);
}

function resolveEnvelopeStatus(payload, options) {
  return (
    normalizeStatus(payload.status || options.status || options.defaultStatus) ||
    (payload.isActive === false ? "inactive" : DEFAULT_MASTER_DATA_STATUS)
  );
}

function resolveNotes(source, options) {
  return normalizeString(
    options.notes ||
      source.notes ||
      source.observations ||
      source.observation ||
      source.description
  );
}

function buildLegacyRefs(source, options, state = {}) {
  const baseRefs = normalizeLegacyRefs(source.legacyRefs);
  const contextRefs = normalizeLegacyRefs(options.legacyRefs);
  const refs = {
    sourceCollection: options.sourceCollection
  };

  const productCatalogId = normalizeSourceId(source.id || source.productId);
  if (productCatalogId) refs.productCatalogId = productCatalogId;

  const legacyProductId = normalizeSourceId(source.inventoryItemId);
  if (legacyProductId) refs.legacyProductId = legacyProductId;

  const legacyType = normalizeString(source.type || source.productType);
  if (legacyType) refs.legacyType = legacyType;

  const legacySupplierName = normalizeString(options.supplierName || source.supplier || source.vendor);
  if (legacySupplierName) refs.legacySupplierName = legacySupplierName;

  const legacyDescription = normalizeString(source.description);
  if (legacyDescription && !state.notesDerivedFromDescription) refs.legacyDescription = legacyDescription;

  const internalCode = normalizeString(source.internalCode || source.code);
  if (internalCode) refs.internalCode = internalCode;

  return mergeLegacyRefs(baseRefs, contextRefs, refs);
}

function buildEnvelopeLegacyRefs(payload, options) {
  return mergeLegacyRefs(payload.legacyRefs, options.legacyRefs, {});
}

function collectEnvelopeWarnings(payload, options) {
  const warnings = [];

  if (!normalizeString(options.organizationId || payload.organizationId)) {
    warnings.push(
      createWarning(
        "CTX_ORGANIZATION_ID_REQUIRED",
        "Envelope generation expects organizationId from payload or explicit context."
      )
    );
  }

  if (!normalizeString(options.sourceId)) {
    warnings.push(
      createWarning(
        "CTX_SOURCE_ID_REQUIRED",
        "Envelope generation expects sourceId from payload legacy refs or explicit context."
      )
    );
  }

  if (payload.isActive === false && normalizeStatus(options.status || options.defaultStatus) === "active") {
    warnings.push(
      createWarning(
        "ENV_STATUS_ACTIVE_WITH_INACTIVE_PAYLOAD",
        "Envelope status remains active while payload.isActive is false; review cross-surface expectations."
      )
    );
  }

  return warnings;
}

function mergeLegacyRefs(...refValues) {
  const merged = {};

  for (const value of refValues) {
    const plainValue = isPlainObject(value) ? value : {};

    for (const [key, entry] of Object.entries(plainValue)) {
      if (entry == null) continue;
      if (typeof entry === "string" && !entry.trim()) continue;
      if (Array.isArray(entry) && entry.length === 0) continue;
      if (isPlainObject(entry) && Object.keys(entry).length === 0) continue;
      merged[key] = cloneValue(entry);
    }
  }

  return merged;
}

function buildMetadata(adapterMode, options, extra = {}) {
  return createMetadata(
    {
      adapter: ADAPTER_NAME,
      adapterMode,
      contractName: PRODUCT_CONTRACT_NAME,
      source: options.source,
      sourceId: options.sourceId,
      sourceCollection: options.sourceCollection,
      idStrategy: options.idStrategy,
      strictMode: Boolean(options.strictMode),
      allowWarnings: options.allowWarnings !== false
    },
    extra
  );
}

function validateLegacyRefsStructure(legacyRefs, pathLabel) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(legacyRefs)) {
    errors.push(createError("LEGACY_REFS_INVALID", `${pathLabel} must be an object.`));
    return createValidation(errors, warnings);
  }

  for (const [key, value] of Object.entries(legacyRefs)) {
    const nextPath = `${pathLabel}.${key}`;

    if (typeof value === "string") {
      if (!normalizeString(value)) {
        warnings.push(createWarning("LEGACY_REFS_EMPTY_STRING", `${nextPath} should not be empty.`));
      }
      continue;
    }

    if (Array.isArray(value)) {
      const hasUnsupportedItem = value.some(
        (entry) => !(typeof entry === "string" || typeof entry === "number" || typeof entry === "boolean" || isPlainObject(entry))
      );
      if (hasUnsupportedItem) {
        errors.push(createError("LEGACY_REFS_ARRAY_INVALID", `${nextPath} contains unsupported values.`));
      }
      continue;
    }

    if (isPlainObject(value)) {
      const nestedValidation = validateLegacyRefsStructure(value, nextPath);
      errors.push(...nestedValidation.errors);
      warnings.push(...nestedValidation.warnings);
      continue;
    }

    if (typeof value !== "number" && typeof value !== "boolean") {
      errors.push(createError("LEGACY_REFS_VALUE_INVALID", `${nextPath} must contain only plain values.`));
    }
  }

  return createValidation(errors, warnings);
}

function validateValidationShape(validation, pathLabel) {
  const errors = [];
  const warnings = [];

  if (!validation || typeof validation !== "object") {
    errors.push(createError("VALIDATION_SHAPE_INVALID", `${pathLabel} must be an object.`));
    return createValidation(errors, warnings);
  }

  if (typeof validation.ok !== "boolean") {
    errors.push(createError("VALIDATION_OK_INVALID", `${pathLabel}.ok must be boolean.`));
  }

  if (!Array.isArray(validation.errors)) {
    errors.push(createError("VALIDATION_ERRORS_INVALID", `${pathLabel}.errors must be an array.`));
  }

  if (!Array.isArray(validation.missingRequiredFields)) {
    errors.push(
      createError("VALIDATION_MISSING_REQUIRED_FIELDS_INVALID", `${pathLabel}.missingRequiredFields must be an array.`)
    );
  }

  if (typeof validation.blocking !== "boolean") {
    errors.push(createError("VALIDATION_BLOCKING_INVALID", `${pathLabel}.blocking must be boolean.`));
  }

  if (Array.isArray(validation.warnings)) {
    warnings.push(
      createWarning(
        "VALIDATION_WARNINGS_EXTRA_FIELD",
        `${pathLabel}.warnings is not part of the shared summary shape and should stay outside validation summary.`
      )
    );
  }

  return createValidation(errors, warnings);
}

function validateMetadataStructure(metadata, pathLabel) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(metadata)) {
    errors.push(createError("METADATA_INVALID", `${pathLabel} must be an object.`));
    return createValidation(errors, warnings);
  }

  if (metadata.emittedAt && !isIsoTimestamp(metadata.emittedAt)) {
    errors.push(createError("METADATA_EMITTED_AT_INVALID", `${pathLabel}.emittedAt must be an ISO 8601 timestamp.`));
  }

  if (!normalizeString(metadata.adapter)) {
    warnings.push(createWarning("METADATA_ADAPTER_RECOMMENDED", `${pathLabel}.adapter should be present.`));
  }

  if (!normalizeString(metadata.adapterMode)) {
    warnings.push(createWarning("METADATA_ADAPTER_MODE_RECOMMENDED", `${pathLabel}.adapterMode should be present.`));
  }

  return createValidation(errors, warnings);
}

function inferSourceName(source) {
  if (normalizeString(source.source)) return normalizeString(source.source);
  return DEFAULT_SOURCE;
}

function inferEnvelopeSource(legacyRefs) {
  if (isPlainObject(legacyRefs) && normalizeString(legacyRefs.source)) {
    return normalizeString(legacyRefs.source);
  }

  return DEFAULT_SOURCE;
}

function resolveSourceCollection(sourceName, fallbackValue) {
  const normalizedFallback = normalizeString(fallbackValue);
  if (normalizedFallback) return normalizedFallback;

  if (normalizeString(sourceName) === DEFAULT_SOURCE) {
    return DEFAULT_SOURCE_COLLECTION;
  }

  return DEFAULT_SOURCE_COLLECTION;
}

function normalizeString(value) {
  if (value == null) return "";
  return String(value).trim();
}

function normalizeIsoTimestamp(value) {
  const normalizedValue = normalizeString(value);
  return isIsoTimestamp(normalizedValue) ? normalizedValue : "";
}

function normalizeStatus(value) {
  return normalizeString(value).toLowerCase();
}

function normalizeIdStrategy(value) {
  const normalizedValue = normalizeString(value);
  return normalizedValue || DEFAULT_ID_STRATEGY;
}

function normalizeMoney(value) {
  const normalizedValue = Number(value);
  if (!Number.isFinite(normalizedValue)) return 0;
  return Math.max(0, normalizedValue);
}

function normalizeOptionalMoney(value) {
  if (value == null || normalizeString(value) === "") return null;
  const normalizedValue = Number(value);
  if (!Number.isFinite(normalizedValue)) return null;
  return Math.max(0, normalizedValue);
}

function normalizeOptionalNumber(value) {
  if (value == null || normalizeString(value) === "") return null;
  const normalizedValue = Number(value);
  if (!Number.isFinite(normalizedValue)) return null;
  return normalizedValue;
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function isNonNegativeNumber(value) {
  return isFiniteNumber(value) && Number(value) >= 0;
}

function isIsoTimestamp(value) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(normalizeString(value));
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function toPlainObject(value) {
  return isPlainObject(value) ? { ...value } : {};
}

function cloneValue(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneValue(entry));
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneValue(entry)]));
  }

  return value;
}
