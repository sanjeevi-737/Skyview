import { describe, it, expect } from "vitest"
import {
  locationSchema,
  weatherQuerySchema,
  registerSchema,
  loginSchema,
  preferencesSchema,
} from "../types"

describe("locationSchema", () => {
  it("accepts valid location", () => {
    const result = locationSchema.safeParse({ lat: 10.79, lon: 78.7 })
    expect(result.success).toBe(true)
  })

  it("rejects lat out of range", () => {
    const result = locationSchema.safeParse({ lat: 100, lon: 0 })
    expect(result.success).toBe(false)
  })

  it("rejects lon out of range", () => {
    const result = locationSchema.safeParse({ lat: 0, lon: 200 })
    expect(result.success).toBe(false)
  })

  it("accepts optional name", () => {
    const result = locationSchema.safeParse({ lat: 0, lon: 0, name: "Chennai" })
    expect(result.success).toBe(true)
  })

  it("rejects missing lat", () => {
    const result = locationSchema.safeParse({ lon: 0 })
    expect(result.success).toBe(false)
  })
})

describe("weatherQuerySchema", () => {
  it("parses string lat/lon with coerce", () => {
    const result = weatherQuerySchema.safeParse({ lat: "10.5", lon: "78.5" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.lat).toBe(10.5)
      expect(result.data.lon).toBe(78.5)
    }
  })

  it("defaults units to metric", () => {
    const result = weatherQuerySchema.safeParse({ lat: 10, lon: 20 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.units).toBe("metric")
    }
  })

  it("accepts imperial units", () => {
    const result = weatherQuerySchema.safeParse({ lat: 10, lon: 20, units: "imperial" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.units).toBe("imperial")
    }
  })

  it("rejects invalid units", () => {
    const result = weatherQuerySchema.safeParse({ lat: 10, lon: 20, units: "kelvin" })
    expect(result.success).toBe(false)
  })
})

describe("registerSchema", () => {
  it("accepts valid registration", () => {
    const result = registerSchema.safeParse({
      name: "John",
      email: "john@test.com",
      password: "password123",
    })
    expect(result.success).toBe(true)
  })

  it("rejects short name", () => {
    const result = registerSchema.safeParse({
      name: "J",
      email: "john@test.com",
      password: "password123",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({
      name: "John",
      email: "not-an-email",
      password: "password123",
    })
    expect(result.success).toBe(false)
  })

  it("rejects short password", () => {
    const result = registerSchema.safeParse({
      name: "John",
      email: "john@test.com",
      password: "short",
    })
    expect(result.success).toBe(false)
  })
})

describe("loginSchema", () => {
  it("accepts valid login", () => {
    const result = loginSchema.safeParse({ email: "john@test.com", password: "pwd" })
    expect(result.success).toBe(true)
  })

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({ email: "john@test.com", password: "" })
    expect(result.success).toBe(false)
  })
})

describe("preferencesSchema", () => {
  it("accepts partial preferences", () => {
    const result = preferencesSchema.safeParse({ unit: "imperial" })
    expect(result.success).toBe(true)
  })

  it("rejects invalid unit", () => {
    const result = preferencesSchema.safeParse({ unit: "invalid" })
    expect(result.success).toBe(false)
  })

  it("rejects invalid theme", () => {
    const result = preferencesSchema.safeParse({ theme: "fluorescent" })
    expect(result.success).toBe(false)
  })
})
