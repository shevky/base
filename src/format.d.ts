export type FormatApi = {
  escape: (value: unknown) => string;
  rssDate: (date: Date | string | number) => string;
  lastMod: (date: Date | string | number) => string | null;
  date: (value: Date | string | number, lang?: string) => string | null;
  readingTime: (value: number | string) => number;
  normalizeStringArray: (value: unknown) => string[];
  slugify: (value: string) => string;
  ensureDirectoryTrailingSlash: (value: string) => string;
  resolveUrl: (value: string, baseUrl?: string) => string;
  boolean: (value: unknown) => boolean;
  order: (value: number | string) => number;
};

declare const format: FormatApi;
export default format;
