export type SeoConfig = {
  defaultImage: string;
  includeCollections: boolean;
  includePaging: boolean;
  footerTagCount: number;
};

export type AnalyticsConfig = {
  enabled: boolean;
  gtmId: string;
  gaId: string;
  clarityId: string;
  metaPixelId: string;
};

export type ShareOptions = {
  enabled: boolean;
  whatsapp: boolean;
  x: boolean;
  linkedin: boolean;
  facebook: boolean;
  copy: boolean;
};

export type PostOperationsConfig = {
  enabled: boolean;
  like: boolean;
  dislike: boolean;
  comment: boolean;
  share: ShareOptions;
};

export type FeaturesConfig = {
  postOperations: PostOperationsConfig;
  search: boolean;
};

export type MarkdownConfig = {
  highlight: boolean;
};

export type PaginationConfig = {
  pageSize: number;
  segment: { tr: string; en: string };
};

export type ContentConfig = {
  pagination: PaginationConfig;
  languages: { default: string; supported: string[]; canonical: Record<string, string> };
  collections: Record<string, unknown>;
};

export type BuildConfig = {
  minify: boolean;
  debug: boolean;
};

export type SocialIdentityConfig = {
  rss: boolean;
  github: string;
  linkedin: string;
  x: string;
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  substack: string;
  medium: string;
  devto: string;
  stackoverflow: string;
  mastodon: string;
};

export type IdentityConfig = {
  author: string;
  email: string;
  url: string;
  themeColor: string;
  social: SocialIdentityConfig;
};

export type RobotsConfig = {
  allow: string[];
  disallow: string[];
};

export type ShevkyConfig = {
  seo: SeoConfig;
  analytics: AnalyticsConfig;
  features: FeaturesConfig;
  markdown: MarkdownConfig;
  content: ContentConfig;
  build: BuildConfig;
  identity: IdentityConfig;
  robots: RobotsConfig;
  ui: Record<string, unknown>;
  pluginConfigs: Record<string, unknown>;
  plugins: string[];
};

export type ConfigApi = ShevkyConfig & {
  load: (path: string) => Promise<Partial<ShevkyConfig>>;
  get: (key: string) => unknown;
};

declare const config: ConfigApi;
export default config;
