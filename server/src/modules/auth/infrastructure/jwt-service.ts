import jwt, { type SignOptions } from "jsonwebtoken"
import { config } from "@/config"
import type { JwtPayload } from "@skyview/shared"

export class JwtService {
  generateTokens(payload: JwtPayload): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as SignOptions["expiresIn"],
    })
    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn as SignOptions["expiresIn"],
    })
    return { accessToken, refreshToken }
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, config.jwt.secret) as JwtPayload
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, config.jwt.refreshSecret) as JwtPayload
  }

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as SignOptions["expiresIn"],
    })
  }
}
