import winston from "winston"
import { config } from "@/config"

const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 }

const level = config.isDevelopment ? "debug" : "info"

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  config.isDevelopment
    ? winston.format.colorize()
    : winston.format.uncolorize(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ""
    return `${timestamp} [${level}]: ${message}${metaStr}`
  }),
)

const transports: winston.transport[] = [
  new winston.transports.Console(),
]

if (config.isProduction) {
  transports.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  )
}

export const logger = winston.createLogger({
  levels,
  level,
  format,
  transports,
})
