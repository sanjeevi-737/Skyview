import { describe, it, expect } from "vitest"
import {
  formatTemp,
  formatTempValue,
  formatHour,
  formatDay,
  convertSpeed,
  speedUnit,
  convertVisibility,
  formatPressure,
  formatPercentage,
} from "../weather-utils"

describe("formatTemp", () => {
  it("returns celsius with °", () => {
    expect(formatTemp(25, "celsius")).toBe("25°")
  })

  it("converts and rounds fahrenheit", () => {
    expect(formatTemp(25, "imperial")).toBe("77°")
  })

  it("rounds to nearest integer", () => {
    expect(formatTemp(25.7, "celsius")).toBe("26°")
  })
})

describe("formatTempValue", () => {
  it("returns rounded celsius value", () => {
    expect(formatTempValue(22.7, "celsius")).toBe(23)
  })

  it("converts to fahrenheit", () => {
    expect(formatTempValue(0, "imperial")).toBe(32)
  })
})

describe("formatHour", () => {
  it("formats unix timestamp to hour with am/pm", () => {
    const ts = 1718200000
    const offset = 0
    const result = formatHour(ts, offset)
    expect(result).toMatch(/^\d{1,2}(AM|PM)$/)
  })
})

describe("formatDay", () => {
  it("returns Today for current day", () => {
    const now = Math.floor(Date.now() / 1000)
    expect(formatDay(now, 0)).toBe("Today")
  })

  it("returns Tomorrow for next day", () => {
    const tomorrow = Math.floor(Date.now() / 1000) + 86400
    expect(formatDay(tomorrow, 0)).toBe("Tomorrow")
  })

  it("returns day name for future dates", () => {
    const future = Math.floor(Date.now() / 1000) + 86400 * 3
    const result = formatDay(future, 0)
    expect(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).toContain(result)
  })
})

describe("convertSpeed", () => {
  it("converts m/s to km/h", () => {
    expect(convertSpeed(10, "celsius")).toBe(36)
  })

  it("converts m/s to mph", () => {
    expect(convertSpeed(10, "imperial")).toBe(22)
  })
})

describe("speedUnit", () => {
  it("returns km/h for metric", () => {
    expect(speedUnit("celsius")).toBe("km/h")
  })

  it("returns mph for imperial", () => {
    expect(speedUnit("imperial")).toBe("mph")
  })
})

describe("convertVisibility", () => {
  it("shows km for metric when >= 1000m", () => {
    expect(convertVisibility(10000, "celsius")).toBe("10.0 km")
  })

  it("shows meters for metric when < 1000m", () => {
    expect(convertVisibility(500, "celsius")).toBe("500 m")
  })

  it("shows miles for imperial", () => {
    const result = convertVisibility(1609, "imperial")
    expect(result).toMatch(/mi$/)
  })
})

describe("formatPressure", () => {
  it("formats hPa value", () => {
    expect(formatPressure(1013.25)).toBe("1013 hPa")
  })
})

describe("formatPercentage", () => {
  it("converts decimal to percentage string", () => {
    expect(formatPercentage(0.45)).toBe("45%")
  })
})
