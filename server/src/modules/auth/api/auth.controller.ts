import { type Request, type Response, type NextFunction } from "express"
import { sendSuccess } from "@/utils/api-response"
import { AuthService } from "../infrastructure/auth-service"
import type { RegisterInput, LoginInput } from "./auth.validation"

const authService = new AuthService()

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const input = req.body as RegisterInput
    const result = await authService.register(input)
    sendSuccess(res, result, "Registration successful", 201)
  } catch (error) {
    next(error)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const input = req.body as LoginInput
    const result = await authService.login(input)
    sendSuccess(res, result, "Login successful")
  } catch (error) {
    next(error)
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      res.status(400).json({ success: false, message: "Refresh token is required" })
      return
    }
    const result = await authService.refresh(refreshToken)
    sendSuccess(res, result, "Token refreshed")
  } catch (error) {
    next(error)
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    sendSuccess(res, { user: req.user }, "Authenticated user retrieved")
  } catch (error) {
    next(error)
  }
}
