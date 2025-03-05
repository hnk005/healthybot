import winston from "winston";

// Định nghĩa cấp độ log và màu sắc
const logLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
    trace: "white",
  },
};

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, colorize, printf, splat } = format;

const myFormat = printf((info) => {
  return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
});

// Format log trên console
export const logFormat = combine(
  colorize(),
  label({ label: "[server]" }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  splat(),
  myFormat,
);

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      levels: logLevels.levels,
      level: process.env.NODE_ENV === "production" ? "info" : "trace",
      format: logFormat,
      transports: [new transports.Console()],
    });
  }

  trace(msg: string, meta?: any) {
    this.logger.log("trace", msg, meta);
  }

  debug(msg: string, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: string, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: string, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: string, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: string, meta?: any) {
    this.logger.log("fatal", msg, meta);
  }
}

export const logger = new Logger();
