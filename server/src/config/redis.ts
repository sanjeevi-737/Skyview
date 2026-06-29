import { createClient, type RedisClientType } from "redis"
import { logger } from "@/utils/logger"
import { config } from "./index"

let redisClient: RedisClientType
let redisLogged = false

export async function connectRedis(): Promise<RedisClientType | null> {
  redisClient = createClient({
    url: config.redis.url,
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 3) {
          if (!redisLogged) {
            logger.warn("Redis unavailable after 3 retries — running without cache")
            redisLogged = true
          }
          return false
        }
        return Math.min(retries * 100, 1000)
      },
    },
  })

  redisClient.on("error", () => {
    if (!redisLogged) {
      logger.warn("Redis connection refused — running without cache")
      redisLogged = true
    }
  })

  redisClient.on("connect", () => {
    logger.info("Redis connected successfully")
    redisLogged = false
  })

  try {
    await redisClient.connect()
    return redisClient
  } catch {
    logger.warn("Redis unavailable — running without cache")
    return null
  }
}

export function getRedisClient(): RedisClientType | null {
  if (!redisClient || !redisClient.isReady) {
    return null
  }
  return redisClient
}
