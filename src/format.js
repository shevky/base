import i18n from "./i18n.js";

const extraMap = {
  ß: "ss",
  Ø: "o",
  ø: "o",
  Æ: "ae",
  æ: "ae",
  Å: "a",
  å: "a",
  Đ: "d",
  đ: "d",
  Ł: "l",
  ł: "l",
  Ń: "n",
  ń: "n",
  Ř: "r",
  ř: "r",
  Ś: "s",
  ś: "s",
  Š: "s",
  š: "s",
  Ž: "z",
  ž: "z",
  Ż: "z",
  ż: "z",
  Ź: "z",
  ź: "z",
  Ý: "y",
  ý: "y",
  Ğ: "g",
  ğ: "g",
  Ș: "s",
  ș: "s",
  Ț: "t",
  ț: "t",
  Ñ: "n",
  ñ: "n",
  Ç: "c",
  ç: "c",
};

function slugify(str) {
  if (!str || typeof str !== "string") {
    return "";
  }

  let normalized = str.normalize("NFD");
  normalized = normalized.replace(/[\u0300-\u036f]/g, "");
  normalized = normalized
    .split("")
    .map((ch) => extraMap[ch] ?? ch)
    .join("");

  return normalized
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureDirectoryTrailingSlash(input) {
  if (typeof input !== "string") {
    return input;
  }

  const value = input.trim();
  if (!value) {
    return value;
  }

  const hashIndex = value.indexOf("#");
  let hash = "";
  let path = value;
  if (hashIndex !== -1) {
    hash = value.slice(hashIndex);
    path = value.slice(0, hashIndex);
  }

  const queryIndex = path.indexOf("?");
  let query = "";
  if (queryIndex !== -1) {
    query = path.slice(queryIndex);
    path = path.slice(0, queryIndex);
  }

  if (!path || path.endsWith("/")) {
    return `${path}${query}${hash}`;
  }

  const lastSlashIndex = path.lastIndexOf("/");
  const lastSegment =
    lastSlashIndex >= 0 ? path.slice(lastSlashIndex + 1) : path;

  if (!lastSegment || lastSegment.includes(".") || lastSegment === "~") {
    return `${path}${query}${hash}`;
  }

  return `${path}/${query}${hash}`;
}

function resolveUrl(value, baseUrl = "") {
  const trimmedValue = typeof value === "string" ? value.trim() : "";
  if (!trimmedValue) {
    return ensureDirectoryTrailingSlash(baseUrl);
  }

  if (
    trimmedValue.startsWith("http://") ||
    trimmedValue.startsWith("https://")
  ) {
    return ensureDirectoryTrailingSlash(trimmedValue);
  }

  const resolvedBase = typeof baseUrl === "string" ? baseUrl : "";
  let absolute;
  if (trimmedValue.startsWith("~/")) {
    absolute = `${resolvedBase}/${trimmedValue.slice(2)}`;
  } else if (trimmedValue.startsWith("/")) {
    absolute = `${resolvedBase}${trimmedValue}`;
  } else {
    absolute = `${resolvedBase}/${trimmedValue}`;
  }

  const normalized = absolute.replace(/([^:]\/)\/+/g, "$1");
  return ensureDirectoryTrailingSlash(normalized);
}

/** @param {string} value */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** @param {unknown} value */
function isObject(value) {
  return Boolean(value) && typeof value === "object";
}

/** @param {unknown} value */
function isString(value) {
  return typeof value === "string";
}

/** @param {unknown} value */
function isRecord(value) {
  return isObject(value) && !Array.isArray(value);
}

/** @param {unknown} value */
function isFunction(value) {
  return typeof value === "function";
}

/** @param {unknown} value */
function isBoolean(value) {
  return typeof value === "boolean";
}

/** @param {unknown} value @param {Record<string, any> | null} [fallback] */
function toRecord(value, fallback = null) {
  return isRecord(value) ? value : fallback;
}

/** @param {unknown[]} values */
function pickFirstRecord(...values) {
  for (const value of values) {
    if (isRecord(value)) {
      return value;
    }
  }

  return null;
}

/** @param {unknown} value */
function hasText(value) {
  return isString(value) && value.trim().length > 0;
}

/** @param {unknown} value @param {unknown} [fallback] */
function text(value, fallback = "") {
  if (hasText(value)) {
    return value.trim();
  }

  return hasText(fallback) ? fallback.trim() : "";
}

/** @param {unknown} value */
function toLocaleArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (isString(value) && value.trim().length > 0) {
    return value.split(",").map((item) => item.trim());
  }

  return [];
}

/** @param {unknown} value */
function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => text(item)).filter(hasText);
}

/** @param {unknown} value */
function uniqueStringArray(value) {
  return [...new Set(normalizeStringArray(value))];
}

/** @param {unknown} value */
function toPositiveInteger(value) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return null;
  }

  const rounded = Math.round(numberValue);
  return rounded > 0 ? rounded : null;
}

/** @param {unknown} value */
function toDurationIso(value) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "";
  }

  const rounded = Math.max(1, Math.round(minutes));
  return `PT${rounded}M`;
}

/** @param {unknown} input */
function serializeForInlineScript(input) {
  return JSON.stringify(input ?? {})
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** @param {unknown[]} values */
function pickFirstText(...values) {
  for (const value of values) {
    if (hasText(value)) {
      return value.trim();
    }
  }

  return "";
}

/** @param {string | null | undefined} lang */
function resolveLocaleTag(lang) {
  return String(i18n.culture(lang) ?? lang ?? "en").replace("_", "-");
}

/** @param {unknown} value */
function humanizeSlugLikeText(value, lang) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) {
    return "";
  }

  const locale = resolveLocaleTag(lang);
  return trimmed
    .split(/[-_]+/g)
    .filter(hasText)
    .map((word) => word.charAt(0).toLocaleUpperCase(locale) + word.slice(1))
    .join(" ");
}

/** @param {unknown} value */
function normalizeLabel(value, lang) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) {
    return "";
  }

  const isSlugLike = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/.test(trimmed);
  return isSlugLike ? humanizeSlugLikeText(trimmed, lang) : trimmed;
}

/** @param {unknown} value */
function buildLookupKeyVariants(value) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) {
    return [];
  }

  const normalized = trimmed.toLowerCase();
  const hyphenated = normalized.replace(/\s+/g, "-");
  const underscored = hyphenated.replace(/-/g, "_");

  return [...new Set([trimmed, normalized, hyphenated, underscored])];
}

// ========== API Definition ========== //
const API = {
  escape: function (value) {
    if (value == null) {
      return "";
    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  },

  rssDate: function (date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (Number.isNaN(date.getTime())) {
      return new Date().toUTCString();
    }

    return date.toUTCString();
  },
  lastMod: function (date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString().split("T")[0];
  },
  date: function (value, lang) {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(i18n.culture(lang).replace("_", "-"), {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  },

  readingTime: function (value) {
    const num = typeof value === "number" ? value : Number.parseFloat(value);
    if (!Number.isFinite(num) || num <= 0) {
      return 0;
    }

    return Math.round(num);
  },
  normalizeStringArray,
  uniqueStringArray,
  toPositiveInteger,
  toDurationIso,
  slugify,
  ensureDirectoryTrailingSlash,
  resolveUrl,
  escapeRegExp,
  isObject,
  isString,
  isRecord,
  isFunction,
  isBoolean,
  toRecord,
  pickFirstRecord,
  hasText,
  text,
  toLocaleArray,
  serializeForInlineScript,
  pickFirstText,
  humanizeSlugLikeText,
  normalizeLabel,
  buildLookupKeyVariants,
  boolean: function (value) {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized === "true") {
        return true;
      }

      if (normalized === "false") {
        return false;
      }
    }

    return Boolean(value);
  },
  order: function (value) {
    const num = typeof value === "number" ? value : Number.parseFloat(value);
    return Number.isFinite(num) ? num : Number.MAX_SAFE_INTEGER;
  },
};

export default API;
