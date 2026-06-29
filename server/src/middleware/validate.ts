import { type Request, type Response, type NextFunction } from "express"
import { ApiError } from "@/utils/api-error"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validate(schema: any, source: "body" | "query" | "params" = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source])

    if (!result.success) {
      const errors = result.error.errors.map((e: { path: string[]; message: string }) => ({
        field: e.path.join("."),
        message: e.message,
      }))
      next(ApiError.badRequest("Validation failed", errors))
      return
    }

    req[source] = result.data
    next()
  }
}
