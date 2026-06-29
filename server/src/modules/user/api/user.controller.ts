import { type Request, type Response, type NextFunction } from "express"
import { UserService } from "../application/user-service"
import { sendSuccess } from "@/utils/api-response"

const userService = new UserService()

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getProfile(req.user!.userId)
    sendSuccess(res, user, "User profile retrieved")
  } catch (error) {
    next(error)
  }
}

export async function updatePreferences(req: Request, res: Response, next: NextFunction) {
  try {
    const preferences = await userService.updatePreferences(req.user!.userId, req.body)
    sendSuccess(res, { preferences }, "Preferences updated")
  } catch (error) {
    next(error)
  }
}

export async function addFavoriteLocation(req: Request, res: Response, next: NextFunction) {
  try {
    const favorites = await userService.addFavorite(req.user!.userId, req.body)
    sendSuccess(res, { favorites }, "Location added to favorites")
  } catch (error) {
    next(error)
  }
}

export async function removeFavoriteLocation(req: Request, res: Response, next: NextFunction) {
  try {
    const { lat, lon } = req.params
    const favorites = await userService.removeFavorite(req.user!.userId, parseFloat(lat), parseFloat(lon))
    sendSuccess(res, { favorites }, "Location removed from favorites")
  } catch (error) {
    next(error)
  }
}

export async function saveSearchHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const history = await userService.saveSearchHistory(req.user!.userId, req.body)
    sendSuccess(res, { history }, "Search history updated")
  } catch (error) {
    next(error)
  }
}

export async function getHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const history = await userService.getSearchHistory(req.user!.userId)
    sendSuccess(res, { history }, "Search history retrieved")
  } catch (error) {
    next(error)
  }
}
