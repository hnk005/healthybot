import { logFormat } from "@/utils/logger";
import expressWinston from "express-winston";
import winston from "winston";

// Middleware để log request
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({ forceConsole: true, level: "debug" }),
  ],
  format: logFormat,
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} - {{res.responseTime}}ms",
  expressFormat: true,
  colorize: true,
});

export default requestLogger;
