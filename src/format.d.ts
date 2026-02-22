export type FormatApi = {
  escape: (value: unknown) => string;
  rssDate: (date: Date | string | number) => string;
  lastMod: (date: Date | string | number) => string | null;
  date: (value: Date | string | number, lang?: string) => string | null;
  readingTime: (value: number | string) => number;
  normalizeStringArray: (value: unknown) => string[];
  uniqueStringArray: (value: unknown) => string[];
  toPositiveInteger: (value: unknown) => number | null;
  toDurationIso: (value: unknown) => string;
  slugify: (value: string) => string;
  ensureDirectoryTrailingSlash: (value: string) => string;
  resolveUrl: (value: string, baseUrl?: string) => string;
  escapeRegExp: (value: string) => string;
  isObject: (value: unknown) => boolean;
  isString: (value: unknown) => value is string;
  isRecord: (value: unknown) => value is Record<string, any>;
  isFunction: (value: unknown) => value is (...args: any[]) => unknown;
  isBoolean: (value: unknown) => value is boolean;
  toRecord: (
    value: unknown,
    fallback?: Record<string, any> | null,
  ) => Record<string, any> | null;
  pickFirstRecord: (...values: unknown[]) => Record<string, any> | null;
  hasText: (value: unknown) => value is string;
  text: (value: unknown, fallback?: unknown) => string;
  toLocaleArray: (value: unknown) => string[];
  serializeForInlineScript: (value: unknown) => string;
  pickFirstText: (...values: unknown[]) => string;
  humanizeSlugLikeText: (value: unknown, lang?: string) => string;
  normalizeLabel: (value: unknown, lang?: string) => string;
  buildLookupKeyVariants: (value: unknown) => string[];
  boolean: (value: unknown) => boolean;
  order: (value: number | string) => number;
};

declare const format: FormatApi;
export default format;
