/* eslint-disable @typescript-eslint/no-namespace */
import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"
import { config } from "@/config"
import { ApiError } from "@/utils/api-error"
import type { JwtPayload } from "@skyview/shared"

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(ApiError.unauthorized("Missing or invalid authorization header"))
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload
    req.user = decoded
    next()
  } catch {
    next(ApiError.unauthorized("Invalid or expired token"))
  }
}
