import type { ConfigApi } from "./config.js";
import type { LogApi } from "./log.js";

export type PluginPaths = {
  root: string;
  src: string;
  dist: string;
  tmp: string;
  content: string;
  layouts: string;
  components: string;
  templates: string;
  assets: string;
  siteConfig: string;
  i18nConfig: string;
};

export type ContentSummaryLike = {
  id?: string;
  title?: string;
  date?: string | number | Date;
  description?: string;
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
  readingTime?: number;
  dateDisplay?: string | null;
};

export type ContentHeaderLike = {
  status?: string;
  id?: string;
  lang?: string;
  slug?: string;
  canonical?: string;
  title?: string;
  template?: string;
  featured?: boolean;
  category?: string;
  tags?: string[];
  keywords?: string[];
  series?: string;
  collectionType?: string;
  date?: string | number | Date;
  updated?: string | number | Date;
  description?: string;
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
  readingTime?: number;
  seriesTitle?: string;
  menu?: string;
  show?: boolean;
  order?: number;
  layout?: string;
};

export type ContentBodyLike = {
  content?: string;
};

export type ContentFileLike = {
  header?: ContentHeaderLike;
  body?: ContentBodyLike;
  content?: string;
  isValid?: boolean;
  sourcePath?: string;
  status?: string;
  id?: string;
  lang?: string;
  slug?: string;
  canonical?: string;
  title?: string;
  template?: string;
  isFeatured?: boolean;
  category?: string;
  tags?: string[];
  keywords?: string[];
  series?: string;
  collectionType?: string;
  date?: string | number | Date;
  updated?: string | number | Date;
  dateDisplay?: string | null;
  description?: string;
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
  readingTime?: number;
  seriesTitle?: string;
  menuLabel?: string;
  isHiddenOnMenu?: boolean;
  menuOrder?: number;
  layout?: string;
  isPublished?: boolean;
  isDraft?: boolean;
  isPostTemplate?: boolean;
  toSummary?: () => ContentSummaryLike;
};

export type PluginContext = {
  config: ConfigApi;
  log: LogApi;
  file: {
    read: (path: string) => Promise<string>;
    write: (path: string, content: string) => Promise<void>;
    exists: (path: string) => Promise<boolean>;
  };
  directory: {
    read: (path: string) => Promise<string[]>;
    exists: (path: string) => Promise<boolean>;
    create: (path: string) => Promise<void>;
  };
  path: {
    combine: (...paths: string[]) => string;
    resolve: (...paths: string[]) => string;
    name: (path: string) => string;
  };
  paths: PluginPaths;
  contentFiles?: ContentFileLike[];
};

export type PluginLoadContext = {
  config: ConfigApi;
  paths: PluginPaths;
};

export type HookHandler = (ctx: PluginContext) => Promise<void> | void;

export enum PluginHook {
  DIST_CLEAN = "dist:clean",
  ASSETS_COPY = "assets:copy",
  CONTENT_LOAD = "content:load",
  CONTENT_READY = "content:ready",
}

export type PluginHooks = Partial<Record<PluginHook, HookHandler>> & {
  [hook: string]: HookHandler | undefined;
};

export type PluginDefinition = {
  name: string;
  version: string;
  hooks: PluginHooks;
  load?: (ctx: PluginLoadContext) => void;
};

export type BasePluginContext = Omit<PluginContext, "paths">;

export type PluginHooksMap = Readonly<{
  DIST_CLEAN: "dist:clean";
  ASSETS_COPY: "assets:copy";
  CONTENT_LOAD: "content:load";
  CONTENT_READY: "content:ready";
}>;

export function createBaseContext(): BasePluginContext;

export type PluginApi = {
  hooks: PluginHooksMap;
  createBaseContext: typeof createBaseContext;
};

declare const plugin: PluginApi;
export default plugin;
