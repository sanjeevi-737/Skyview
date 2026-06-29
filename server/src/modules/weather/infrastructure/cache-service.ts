import NodeCache from "node-cache"
import type { ICacheService } from "@skyview/shared"

const memoryCache = new NodeCache({ stdTTL: 300, checkperiod: 60 })

async function getRedisClient() {
  try {
    const { getRedisClient } = await import("@/config/redis")
    return getRedisClient()
  } catch {
    return null
  }
}

export class CacheService implements ICacheService {
  async get<T>(key: string): Promise<T | null> {
    const memoryResult = memoryCache.get<T>(key)
    if (memoryResult) return memoryResult

    try {
      const redis = await getRedisClient()
      if (redis?.isReady) {
        const raw = await redis.get(key)
        if (raw) {
          const parsed = JSON.parse(raw) as T
          memoryCache.set(key, parsed)
          return parsed
        }
      }
    } catch {
      // Redis unavailable
    }
    return null
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    memoryCache.set(key, value, ttlSeconds)

    try {
      const redis = await getRedisClient()
      if (redis?.isReady) {
        await redis.setEx(key, ttlSeconds, JSON.stringify(value))
      }
    } catch {
      // Redis unavailable
    }
  }

  async delete(key: string): Promise<void> {
    memoryCache.del(key)

    try {
      const redis = await getRedisClient()
      if (redis?.isReady) {
        await redis.del(key)
      }
    } catch {
      // Redis unavailable
    }
  }
}
