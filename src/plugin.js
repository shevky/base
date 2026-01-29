import config from "./config.js";
import log from "./log.js";
import io from "./io.js";

const HOOKS = Object.freeze({
  DIST_CLEAN: "dist:clean",
  ASSETS_COPY: "assets:copy",
  CONTENT_LOAD: "content:load",
  CONTENT_READY: "content:ready",
});

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
  createBaseContext,
};

export default API;
