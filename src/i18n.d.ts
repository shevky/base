export type LanguageConfig = {
  default: string;
  supported: string[];
  canonical: Record<string, string>;
};

export type LanguageEntry = {
  langAttr: string;
  metaLanguage: string;
  ogLocale: string;
  altLocale: string[];
  canonical: string;
  path: string;
};

export type I18nApi = {
  load: (path: string) => Promise<Record<string, unknown>>;
  dictionary: Record<string, unknown>;
  default: string;
  supported: string[];
  get: (lang: string) => Record<string, unknown>;
  serialize: () => string;
  culture: (lang: string) => string;
  build: Record<string, LanguageEntry>;
  homePath: (lang: string) => string;
  flags: (lang: string) => {
    locale: {
      code: string;
      isEn: boolean;
      isTr: boolean;
      isDe: boolean;
      isEnglish: boolean;
      isTurkish: boolean;
      isGerman: boolean;
      isDefault: boolean;
    };
    isEnglish: boolean;
    isTurkish: boolean;
    isGerman: boolean;
  };
  getValue: (lang: string, path: string) => unknown;
  languageLabel: (lang: string) => string;
  t: (lang: string, path: string, fallback?: unknown) => unknown;
};

declare const i18n: I18nApi;
export default i18n;
