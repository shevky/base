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

  normalizeStringArray: function (value) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
      .filter((tag) => tag.length > 0);
  },
  slugify,
  ensureDirectoryTrailingSlash,
  resolveUrl,
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
