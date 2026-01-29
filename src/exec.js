import { spawn } from "child_process";
import { createRequire } from "module";
import _io from "./io.js";

function getNpmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function getNpxCommand() {
  return process.platform === "win32" ? "npx.cmd" : "npx";
}

/**
 * @param {string[]} packages
 * @param {boolean} saveDev
 * @param {string?} cwd
 */
function installPackage(packages, saveDev = false, cwd = process.cwd()) {
  const options = ["install", ...packages];
  if (saveDev) {
    options.push("--save-dev");
  }

  return run(getNpmCommand(), options, cwd);
}

/**
 * @param {readonly string[]} args
 * @param {string?} cwd
 */
function runNpx(args, cwd = process.cwd()) {
  return run(getNpxCommand(), args, cwd);
}

/**
 * @param {string} command
 * @param {readonly string[]} options
 * @param {string?} cwd
 */
function run(command, options, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, options, { stdio: "inherit", cwd });
    child.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${command} exited with code ${code}`)),
    );
    child.on("error", reject);
  });
}

function getRequire() {
  return createRequire(import.meta.url);
}

function resolve(name, cwd = process.cwd()) {
  try {
    const resolved = getRequire().resolve(name, { paths: [cwd] });
    return _io.url.toURL(resolved).href;
  } catch {
    return null;
  }
}

const API = {
  execute: run,
  executeNpx: runNpx,
  installPackage,
  resolve,
};

export default API;
