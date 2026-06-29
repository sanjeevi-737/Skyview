import { describe, it, expect } from "vitest"
import {
  DEFAULT_LOCATION,
  DEFAULT_CITY,
  BREAKPOINTS,
  REFETCH_INTERVAL,
  STALE_TIME,
  AQI_LEVELS,
} from "../constants"

describe("constants", () => {
  it("DEFAULT_LOCATION is Tamilnadu, India", () => {
    expect(DEFAULT_LOCATION).toEqual({ lat: 10.7905, lon: 78.7047 })
  })

  it("DEFAULT_CITY is Tamilnadu, India", () => {
    expect(DEFAULT_CITY).toBe("Tamilnadu, India")
  })

  it("BREAKPOINTS has all screen sizes", () => {
    expect(BREAKPOINTS.sm).toBe(375)
    expect(BREAKPOINTS.md).toBe(768)
    expect(BREAKPOINTS.lg).toBe(1024)
    expect(BREAKPOINTS.xl).toBe(1440)
    expect(BREAKPOINTS["2xl"]).toBe(1920)
  })

  it("REFETCH_INTERVAL is 10 minutes", () => {
    expect(REFETCH_INTERVAL).toBe(10 * 60 * 1000)
  })

  it("STALE_TIME is 5 minutes", () => {
    expect(STALE_TIME).toBe(5 * 60 * 1000)
  })

  it("AQI_LEVELS has all 5 levels", () => {
    expect(AQI_LEVELS).toHaveLength(5)
    expect(AQI_LEVELS[0].label).toBe("Good")
    expect(AQI_LEVELS[4].label).toBe("Very Poor")
  })
})
