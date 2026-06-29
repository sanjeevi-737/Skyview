import app from "./app"
import { config } from "./config"
import { connectDatabase } from "./config/database"
import { connectRedis } from "./config/redis"
import { logger } from "./utils/logger"

async function start(): Promise<void> {
  try {
    await connectDatabase()

    await connectRedis()

    app.listen(config.port, () => {
      logger.info(`SkyView API running on port ${config.port} in ${config.nodeEnv} mode`)
    })
  } catch (error) {
    logger.error("Failed to start server", { error })
    process.exit(1)
  }
}

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", { reason })
})

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", { error })
  process.exit(1)
})

start()
