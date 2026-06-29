import { type Request, type Response, type NextFunction } from "express"
import { ApiError } from "@/utils/api-error"
import { sendError } from "@/utils/api-response"
import { logger } from "@/utils/logger"

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  void _req
  void _next
  if (err instanceof ApiError) {
    sendError(res, err.statusCode, err.message, err.errors)
    return
  }

  logger.error("Unhandled error", { error: err.message, stack: err.stack })

  sendError(res, 500, "Internal server error")
}
