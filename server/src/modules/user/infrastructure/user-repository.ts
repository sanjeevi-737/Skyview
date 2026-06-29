import { User } from "./user-model"
import type { IUserRepository } from "@skyview/shared"
import type { IUserDocument } from "./user-model"
import { ApiError } from "@/utils/api-error"

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id)
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email: email.toLowerCase() })
  }

  async create(data: { name: string; email: string; password: string }): Promise<IUserDocument> {
    return User.create(data)
  }

  async updatePreferences(id: string, preferences: Record<string, unknown>): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, { preferences }, { new: true, runValidators: true })
  }

  async addFavorite(id: string, location: { lat: number; lon: number; name?: string }): Promise<IUserDocument> {
    const user = await User.findById(id)
    if (!user) throw ApiError.notFound("User not found")

    const exists = user.favorites.some((f) => f.lat === location.lat && f.lon === location.lon)
    if (exists) throw ApiError.conflict("Location already in favorites")

    user.favorites.push({ lat: location.lat, lon: location.lon, name: location.name || "" })
    await user.save()
    return user
  }

  async removeFavorite(id: string, lat: number, lon: number): Promise<IUserDocument> {
    const user = await User.findById(id)
    if (!user) throw ApiError.notFound("User not found")

    user.favorites = user.favorites.filter((f) => !(f.lat === lat && f.lon === lon))
    await user.save()
    return user
  }

  async addSearchHistory(id: string, entry: { query: string; lat: number; lon: number }): Promise<IUserDocument> {
    const user = await User.findById(id)
    if (!user) throw ApiError.notFound("User not found")

    user.searchHistory.push({ ...entry, timestamp: new Date() })
    if (user.searchHistory.length > 50) {
      user.searchHistory = user.searchHistory.slice(-50)
    }
    await user.save()
    return user
  }

  async getSearchHistory(id: string): Promise<unknown[]> {
    const user = await User.findById(id)
    if (!user) throw ApiError.notFound("User not found")

    return user.searchHistory
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 20)
  }
}
