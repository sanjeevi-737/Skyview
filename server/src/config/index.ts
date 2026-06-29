import dotenv from "dotenv"

dotenv.config()

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",

  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/skyview",
  },

  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "dev-jwt-secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  openweather: {
    apiKey: process.env.OPENWEATHER_API_KEY || "",
    baseUrl: process.env.OPENWEATHER_BASE_URL || "https://api.openweathermap.org",
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  },
} as const
