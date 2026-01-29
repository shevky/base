export type DirectoryApi = {
  exists: (path: string) => Promise<boolean>;
  read: (path: string) => Promise<string[]>;
  copy: (sourcePath: string, destinationPath: string) => Promise<void>;
  create: (dir: string) => Promise<void>;
  remove: (path: string) => Promise<void>;
};

export type FileApi = {
  exists: (path: string) => Promise<boolean>;
  read: (path: string) => Promise<string>;
  write: (path: string, content: string) => Promise<void>;
  copy: (sourcePath: string, destinationPath: string) => Promise<void>;
  stat: (path: string) => Promise<import("fs").Stats | null>;
  size: (path: string) => Promise<number>;
};

export type PathApi = {
  name: (path: string) => string;
  combine: (...paths: string[]) => string;
  resolve: (...paths: string[]) => string;
  separator: string;
};

export type UrlApi = {
  toPath: (url: string | URL) => string;
  toURL: (path: string) => URL;
};

export type IoApi = {
  directory: DirectoryApi;
  file: FileApi;
  path: PathApi;
  url: UrlApi;
};

declare const io: IoApi;
export default io;
