import config from "./config.js";
import log from "./log.js";
import io from "./io.js";

const HOOKS = Object.freeze({
  DIST_CLEAN: "dist:clean",
  ASSETS_COPY: "assets:copy",
  CONTENT_LOAD: "content:load",
  CONTENT_READY: "content:ready",
  PAGE_META: "page:meta",
});
const SCHEMA = Object.freeze({
  POST: "post",
  JOB_POST: "job-post",
  JOB_LISTING: "job-listing",
  NOT_FOUND: "not-found",
  PAGE: "page",
  HOME: "home",
  CONTACT: "contact",
  ABOUT: "about",
  PRESS: "press",
  HELP: "help",
  FAQ: "faq",
  COLLECTION: "collection",
  POLICY: "policy",
});
const SCHEMA_TYPES = Object.freeze(Object.values(SCHEMA));
const COLLECTION = Object.freeze({
  TAG: "tag",
  CATEGORY: "category",
  SERIES: "series",
});
const COLLECTION_TYPES = Object.freeze(Object.values(COLLECTION));

/** @param {unknown} value */
function isSchemaType(value) {
  return (
    typeof value === "string" && SCHEMA_TYPES.includes(value.trim().toLowerCase())
  );
}

/** @param {unknown} value */
function isCollectionType(value) {
  return (
    typeof value === "string" &&
    COLLECTION_TYPES.includes(value.trim().toLowerCase())
  );
}

function createBaseContext() {
  return {
    config,
    log,
    file: {
      read: io.file.read,
      write: io.file.write,
      exists: io.file.exists,
    },
    directory: {
      read: io.directory.read,
      exists: io.directory.exists,
      create: io.directory.create,
    },
    path: {
      combine: io.path.combine,
      resolve: io.path.resolve,
      name: io.path.name,
    },
  };
}

const API = {
  hooks: HOOKS,
  schema: SCHEMA,
  schemaTypes: SCHEMA_TYPES,
  isSchemaType,
  collection: COLLECTION,
  collectionTypes: COLLECTION_TYPES,
  isCollectionType,
  createBaseContext,
};

export default API;
