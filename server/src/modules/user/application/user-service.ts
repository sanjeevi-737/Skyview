import { MongoUserRepository } from "../infrastructure/user-repository"
import { ApiError } from "@/utils/api-error"

const repo = new MongoUserRepository()

export class UserService {
  async getProfile(userId: string) {
    const user = await repo.findById(userId)
    if (!user) throw ApiError.notFound("User not found")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user.toObject()
    return safeUser
  }

  async updatePreferences(userId: string, preferences: Record<string, unknown>) {
    const user = await repo.updatePreferences(userId, preferences)
    if (!user) throw ApiError.notFound("User not found")
    return user.preferences
  }

  async addFavorite(userId: string, location: { lat: number; lon: number; name?: string }) {
    const user = await repo.addFavorite(userId, location)
    return user.favorites
  }

  async removeFavorite(userId: string, lat: number, lon: number) {
    const user = await repo.removeFavorite(userId, lat, lon)
    return user.favorites
  }

  async saveSearchHistory(userId: string, entry: { query: string; lat: number; lon: number }) {
    const user = await repo.addSearchHistory(userId, entry)
    return user.searchHistory
  }

  async getSearchHistory(userId: string) {
    return repo.getSearchHistory(userId)
  }
}
