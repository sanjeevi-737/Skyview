import { Router } from "express"
import {
  getProfile,
  updatePreferences,
  addFavoriteLocation,
  removeFavoriteLocation,
  saveSearchHistory,
  getHistory,
} from "./user.controller"
import { authenticate } from "@/middleware/auth"
import { validate } from "@/middleware/validate"
import { locationSchema } from "@skyview/shared"

export const userRouter = Router()

userRouter.use(authenticate)

userRouter.get("/me", getProfile)
userRouter.patch("/preferences", updatePreferences)
userRouter.post("/favorites", validate(locationSchema), addFavoriteLocation)
userRouter.delete("/favorites/:lat/:lon", removeFavoriteLocation)
userRouter.post("/history", validate(locationSchema), saveSearchHistory)
userRouter.get("/history", getHistory)
