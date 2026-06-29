import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

const ENDPOINT_MAP: Record<string, string> = {
  current: "/api/weather/current",
  forecast: "/api/weather/forecast",
  aqi: "/api/weather/air-quality",
  alerts: "/api/weather/current",
  search: "/api/weather/search",
}

const REQUIRED_PARAMS: Record<string, string[]> = {
  current: ["lat", "lon"],
  forecast: ["lat", "lon"],
  aqi: ["lat", "lon"],
  alerts: ["lat", "lon"],
  search: ["q"],
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> },
) {
  const { endpoint } = await params

  const backendPath = ENDPOINT_MAP[endpoint]
  if (!backendPath) {
    return NextResponse.json({ error: `Unknown endpoint: ${endpoint}` }, { status: 400 })
  }

  const requiredParams = REQUIRED_PARAMS[endpoint]
  const searchParams = request.nextUrl.searchParams

  for (const param of requiredParams) {
    if (!searchParams.has(param)) {
      return NextResponse.json(
        { error: `Missing required parameter: ${param}` },
        { status: 400 },
      )
    }
  }

  const url = new URL(backendPath, BACKEND_URL)
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value)
  })

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Backend service unavailable. Ensure the server is running." },
      { status: 503 },
    )
  }
}
