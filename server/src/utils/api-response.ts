import { type Response } from "express"
import type { ApiResponse } from "@skyview/shared"

export function sendSuccess<T>(res: Response, data: T, message = "Success", statusCode = 200, meta?: ApiResponse["meta"]): void {
  const response: ApiResponse<T> = { success: true, message, data, meta }
  res.status(statusCode).json(response)
}

export function sendError(res: Response, statusCode: number, message: string, errors?: unknown): void {
  const response: ApiResponse = { success: false, message, errors }
  res.status(statusCode).json(response)
}
