import { ApiError } from "../api-error"

describe("ApiError", () => {
  it("creates error with status code and message", () => {
    const err = new ApiError(400, "Bad request")
    expect(err.statusCode).toBe(400)
    expect(err.message).toBe("Bad request")
    expect(err.isOperational).toBe(true)
  })

  it("is instance of Error", () => {
    const err = new ApiError(500, "Error")
    expect(err).toBeInstanceOf(Error)
  })

  describe("static factories", () => {
    it("badRequest returns 400", () => {
      const err = ApiError.badRequest("Invalid input", [{ field: "email" }])
      expect(err.statusCode).toBe(400)
      expect(err.errors).toEqual([{ field: "email" }])
    })

    it("unauthorized returns 401", () => {
      const err = ApiError.unauthorized()
      expect(err.statusCode).toBe(401)
      expect(err.message).toBe("Unauthorized")
    })

    it("unauthorized accepts custom message", () => {
      const err = ApiError.unauthorized("Invalid token")
      expect(err.message).toBe("Invalid token")
    })

    it("forbidden returns 403", () => {
      const err = ApiError.forbidden()
      expect(err.statusCode).toBe(403)
    })

    it("notFound returns 404", () => {
      const err = ApiError.notFound()
      expect(err.statusCode).toBe(404)
    })

    it("notFound accepts custom message", () => {
      const err = ApiError.notFound("City not found")
      expect(err.message).toBe("City not found")
    })

    it("conflict returns 409", () => {
      const err = ApiError.conflict("Email exists")
      expect(err.statusCode).toBe(409)
      expect(err.message).toBe("Email exists")
    })

    it("tooMany returns 429", () => {
      const err = ApiError.tooMany()
      expect(err.statusCode).toBe(429)
    })

    it("internal returns 500", () => {
      const err = ApiError.internal()
      expect(err.statusCode).toBe(500)
    })
  })

  describe("stack trace", () => {
    it("captures stack trace", () => {
      const err = new ApiError(400, "test")
      expect(err.stack).toBeDefined()
    })
  })
})
