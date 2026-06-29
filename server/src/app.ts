import express from "express"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit"
import { config } from "@/config"
import { errorHandler } from "@/middleware/error-handler"
import { authRouter } from "@/modules/auth/api/auth.routes"
import { weatherRouter } from "@/modules/weather/api/weather.routes"
import { userRouter } from "@/modules/user/api/user.routes"

const app = express()

app.use(helmet())
app.use(cors({ origin: config.cors.origin, credentials: true }))
app.use(compression())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use(morgan(config.isProduction ? "combined" : "dev"))

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use("/api", limiter)

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "SkyView API is running", timestamp: new Date().toISOString() })
})

app.use("/api/auth", authRouter)
app.use("/api/weather", weatherRouter)
app.use("/api/users", userRouter)

app.use(errorHandler)

export default app
