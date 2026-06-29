import { Router } from "express"
import { register, login, refresh, me } from "./auth.controller"
import { validate } from "@/middleware/validate"
import { authenticate } from "@/middleware/auth"
import { registerSchema, loginSchema } from "./auth.validation"

export const authRouter = Router()

authRouter.post("/register", validate(registerSchema), register)
authRouter.post("/login", validate(loginSchema), login)
authRouter.post("/refresh", refresh)
authRouter.get("/me", authenticate, me)
