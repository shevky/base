export type ExecApi = {
  execute: (command: string, options: readonly string[], cwd?: string) => Promise<void>;
  executeNpx: (args: readonly string[], cwd?: string) => Promise<void>;
  installPackage: (packages: string[], saveDev?: boolean, cwd?: string) => Promise<void>;
  resolve: (name: string, cwd?: string) => string | null;
};

declare const exec: ExecApi;
export default exec;
