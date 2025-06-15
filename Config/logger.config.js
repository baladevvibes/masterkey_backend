require("winston-daily-rotate-file");
const winston = require("winston");
const path = require("path");
const fs = require("fs");
require("winston-mongodb")
const db = require("./db");


const logsDir = path.join(__dirname, "../logs"); // Path to the logs folder

// Create the logs folder if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
const logConfiguration = {
  transports: [
    new winston.transports.DailyRotateFile({
      filename: `${logsDir}/logs-%DATE%.log`,
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    // new winston.transports.MongoDB({
    //   db: process.env.MONGO_URL,
    //   collection: "online-log",
    // }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
