export type LogDetails = Record<string, string | number | boolean | null | undefined>;

export type LogApi = {
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  err: (...args: unknown[]) => void;
  debug: (message: unknown, details?: LogDetails) => void;
  step: (action: unknown, details?: LogDetails) => void;
};

declare const log: LogApi;
export default log;
