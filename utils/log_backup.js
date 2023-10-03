import winston from "winston";

const errorColorizer = winston.format.colorize({ all: true });

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format((info) => {
      if (info.level === "error") {
        info.message = `${errorColorizer.colorize("error", "ERROR")}: ${
          info.message
        }`;
      }
      return info;
    })(),
    winston.format.json()
  ),
  defaultMeta: { service: "bookstore-api" },
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "info.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        errorColorizer,
        winston.format((info) => {
          if (info.level !== "error") {
            info.message = `${info.level}: ${info.message}`;
          }
          return info;
        })()
      ),
    })
  );
}

export default logger;
