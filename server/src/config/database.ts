import mongoose from "mongoose"
import { logger } from "@/utils/logger"
import { config } from "./index"

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.mongodb.uri)
    logger.info("MongoDB connected successfully")
  } catch (error) {
    logger.error("MongoDB connection failed", { error })
    process.exit(1)
  }

  mongoose.connection.on("error", (error) => {
    logger.error("MongoDB connection error", { error })
  })

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected")
  })
}
