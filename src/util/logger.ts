import winston from "winston";
const console = new winston.transports.Console();

export default winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf((info) => `[${info.level}] i18n: ${info.message}`)
  ),
  transports: [console],
});
