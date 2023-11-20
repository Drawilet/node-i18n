enum LogLevel {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  DEBUG = "debug",
}

class Logger {
  private static getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.INFO:
        return "\x1b[32m"; // green
      case LogLevel.WARNING:
        return "\x1b[33m"; // yellow
      case LogLevel.ERROR:
        return "\x1b[31m"; // red
      case LogLevel.DEBUG:
        return "\x1b[36m"; // cyan
      default:
        return "\x1b[0m"; // reset color
    }
  }

  private static log(level: LogLevel, message: string): void {
    const color = Logger.getColor(level);
    console.log(`${color}[${level.toUpperCase()}]\x1b[0m i18n: ${message}`);
  }

  public static info(message: string): void {
    Logger.log(LogLevel.INFO, message);
  }

  public static warning(message: string): void {
    Logger.log(LogLevel.WARNING, message);
  }

  public static error(message: string): void {
    Logger.log(LogLevel.ERROR, message);
  }

  public static debug(message: string): void {
    Logger.log(LogLevel.DEBUG, message);
  }
}

export default Logger;
