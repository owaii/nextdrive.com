export class Logger {
  private static isDev = process.env.NODE_ENV === "development";

  static info(...args: any[]) {
    if (Logger.isDev) console.log("[INFO]", ...args);
  }

  static warn(...args: any[]) {
    if (Logger.isDev) console.warn("[WARN]", ...args);
  }

  static error(...args: any[]) {
    console.error("[ERROR]", ...args);
  }

  static debug(...args: any[]) {
    if (Logger.isDev) console.debug("[DEBUG]", ...args);
  }
}
