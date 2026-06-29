import { User } from "@/modules/user/infrastructure/user-model"
import { EventBus } from "@/shared/event-bus"
import { ApiError } from "@/utils/api-error"
import { JwtService } from "./jwt-service"
import { PasswordHasher } from "./password-hasher"
import type { RegisterInput, LoginInput } from "../api/auth.validation"
import type { JwtPayload } from "@skyview/shared"

export class AuthService {
  private jwt = new JwtService()
  private hasher = new PasswordHasher()
  private events = EventBus.getInstance()

  async register(input: RegisterInput) {
    const existing = await User.findOne({ email: input.email.toLowerCase() })
    if (existing) {
      throw ApiError.conflict("Email already registered")
    }

    const hashedPassword = await this.hasher.hash(input.password)
    const user = await User.create({
      name: input.name,
      email: input.email.toLowerCase(),
      password: hashedPassword,
    })

    const payload: JwtPayload = { userId: user._id.toString(), email: user.email }
    const tokens = this.jwt.generateTokens(payload)

    this.events.publish({
      name: "user.registered",
      timestamp: new Date(),
      payload: { userId: user._id.toString(), email: user.email },
    })

    return {
      user: { id: user._id, name: user.name, email: user.email },
      ...tokens,
    }
  }

  async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email.toLowerCase() }).select("+password")
    if (!user) {
      throw ApiError.unauthorized("Invalid email or password")
    }

    const isMatch = await this.hasher.compare(input.password, user.password)
    if (!isMatch) {
      throw ApiError.unauthorized("Invalid email or password")
    }

    const payload: JwtPayload = { userId: user._id.toString(), email: user.email }
    const tokens = this.jwt.generateTokens(payload)

    return {
      user: { id: user._id, name: user.name, email: user.email },
      ...tokens,
    }
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwt.verifyRefreshToken(refreshToken)
      const payload: JwtPayload = { userId: decoded.userId, email: decoded.email }
      const accessToken = this.jwt.generateAccessToken(payload)
      return { accessToken }
    } catch {
      throw ApiError.unauthorized("Invalid or expired refresh token")
    }
  }
}
