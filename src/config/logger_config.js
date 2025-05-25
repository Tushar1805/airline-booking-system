const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} :  ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: "API" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), customFormat),
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: customFormat,
    }),
    new transports.File({
      filename: "logs/combined.log",
      format: customFormat,
    }),
  ],
});

module.exports = logger;
