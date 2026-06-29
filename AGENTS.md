<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Goal
- Build a full-stack weather platform (SkyView) with Next.js 16 frontend, Express.js backend, MongoDB, Redis, 3D visualizations, and glassmorphism design.

## Constraints & Preferences
- Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + Three.js/R3F + Zustand + TanStack Query (frontend)
- Backend: Express.js + TypeScript + MongoDB + Redis + JWT + Zod + Winston (server/)
- Design: Premium glassmorphism, Apple/Linear quality, dark/light mode, Inter font
- API: OpenWeatherMap OneCall 3.0 proxied through Express backend (key stays server-side)
- Backend architecture: Clean Architecture with domain/application/infrastructure/api per module
- Shared types package: `packages/shared/` for Zod schemas, TypeScript types, domain interfaces, and event definitions (consumed by both frontend and backend via `@skyview/shared` path alias)
- Default location: Tamilnadu, India (lat: 10.7905, lon: 78.7047)
- All components production-ready with loading/error/empty states
- 3D elements lazy-loaded via `next/dynamic` with `ssr: false`
- WCAG 2.2 AA, 44×44px touch targets, keyboard nav, reduced-motion support
- No placeholder code, no `any` types (except Zod schema validation middleware)

## Progress
### Done
- Scaffolded Next.js 16.2.9 project with TypeScript, Tailwind v4, ESLint, App Router, `src/` directory
- Installed all frontend dependencies (framer-motion, three/R3F, zustand, @tanstack/react-query, lucide-react, date-fns, clsx, tailwind-merge, react-hook-form, zod)
- Created `design-system/MASTER.md` with design tokens
- Created design tokens in `globals.css` (CSS variables, glassmorphism utilities, animations, dark mode)
- Created TypeScript types (`src/types/weather.ts`): WeatherData, CurrentWeather, HourlyForecast, DailyForecast, AQI, alerts, all helpers
- Created Zustand store (`src/store/weather-store.ts`): location, unit, theme, recentSearches with localStorage persistence
- Created hooks: `use-media-query.ts`, `use-geolocation.ts`, `use-weather.ts` (TanStack Query wrappers)
- Created 12 UI primitives: Button, Card, Skeleton, Badge, Input, IconButton, Tooltip, Divider, VisuallyHidden, Toast, ErrorBoundary, Container
- Created 11 weather data cards: CurrentWeather, HourlyForecast, WeeklyForecast, AirQuality, HumidityCard, WindCard, PressureCard, UVIndexCard, SunriseSunset, VisibilityCard, WeatherAlerts
- Created 4 layout components: Header, SearchDialog, DashboardGrid, Footer
- Created 6 Three.js 3D components: WeatherScene3D, EarthGlobe, CloudScene, RainParticles, SnowParticles, SunGlow — all with seeded PRNG for React 19 purity
- Created pages: HomePage, loading.tsx, error.tsx, global-error.tsx, not-found.tsx
- Created Providers wrapper with QueryClientProvider + theme application
- Fixed: `-z-10` hiding 3D scene → `z-0` + body background moved to `html`
- Fixed: API route `exclude` param overwritten by request params
- Fixed: RainParticles speed array for natural variation
- Fixed: React 19 purity (Math.random → seeded PRNG), hydration (SSR-safe initializer)
- Removed unused imports, dead code (`src/app/location/`, `src/app/error/`), unused files
- **Built backend (`server/`)**: Express.js + TypeScript, 3 modules (auth, user, weather), 2-tier cache (NodeCache + Redis), JWT auth, bcrypt, Zod validation, Docker Compose (app + MongoDB 7 + Redis 7)
- **Restructured backend to Clean Architecture**: Each module split into domain/ (ports), application/ (use cases), infrastructure/ (adapters), api/ (HTTP layer)
- **Created `packages/shared/`**: Zod schemas, TypeScript types, domain event definitions, port interfaces (IAuthService, IUserRepository, IWeatherService, ICacheService, IEventBus)
- **Added in-process EventBus** in `server/src/shared/event-bus.ts` with typed events (`user.registered`, `user.preferences.updated`, `weather.searched`)
- **Added frontend path aliases**: `@skyview/shared` → `./packages/shared/src`
- **Fixed**: Redis connection error spam (reconnectStrategy with 3 retries, single warning)
- **Fixed**: Mongoose duplicate index warning (removed redundant `userSchema.index({ email: 1 })`)
- **Fixed**: Zod type mismatch in validate middleware (accepts `any` for schema param)
- **Changed**: Frontend API proxy (`src/app/api/weather/[endpoint]/route.ts`) now forwards to `http://localhost:4000` instead of OpenWeatherMap directly
- **Installed Vitest + testing-library** for frontend testing
- **Created Jest config** (`server/jest.config.js`) with path aliases `@/` and `@skyview/shared`
- **Created Vitest config** (`vitest.config.ts`) with jsdom environment + React Testing Library setup
- **Added test scripts**: `npm test` (frontend), `cd server && npm test` (backend)
- **Wrote unit tests (59 total)**:
  - Frontend: `cn()` utility (5 tests), weather-utils (18 tests), constants (6 tests), shared Zod schemas (18 tests) — all pass
  - Backend: ApiError class hierarchy (12 tests) — all pass
- Removed old monolithic module files from backend (auth.service, user.service, weather.service, types/)
- Build: frontend ✅ (production build), backend ✅ (tsc --noEmit), lint ✅ (0 errors), tests ✅ (59/59)

### In Progress
- (none)

### Blocked
- (none)

## Key Decisions
- OpenWeatherMap OneCall 3.0 as data provider, proxied through Express backend instead of Next.js API route (clean separation of concerns)
- Backend follows Modular Monolith → Clean Architecture pattern for future microservice extraction
- Domain interfaces defined in `packages/shared/` to enforce Dependency Inversion — modules depend on abstractions, not concretions
- In-process EventBus for cross-module communication instead of direct imports (prepares for event-driven extraction)
- Vitest over Jest for frontend (faster, native ESM, Vite integration, React 19 compatible)
- Jest + ts-jest for backend (already installed, stable for Node.js)
- `any` type accepted in validate middleware to avoid dual Zod instance type conflicts between packages
- `.env.local` no longer needs `NEXT_PUBLIC_OPENWEATHER_API_KEY` (now configured in `server/.env`)

## Next Steps
- Add OpenWeatherMap API key to `server/.env`: `OPENWEATHER_API_KEY=your_key_here`
- Run both servers: `cd server && npm run dev` + `npm run dev`
- Consider adding Playwright e2e tests for critical flows
- Consider using `next/image` for weather icons (eliminates 3 ESLint warnings — low priority)
- Consider separate Zod instance configuration to eliminate `any` cast in validate middleware

## Critical Context
- Next.js 16.2.9 — `params` is a Promise in route handlers; Tailwind v4 uses `@import "tailwindcss"` / `@theme` directives
- React 19 — strict lint rule against `Math.random()` in render (seeded PRNG everywhere)
- Backend requires MongoDB + Redis running locally or via Docker: `docker compose up` from `server/`
- Frontend API proxy forwards to `http://localhost:4000` — backend must be running
- `packages/shared/` has no dependency on React or Next.js — pure TypeScript + Zod
- OpenWeatherMap OneCall 3.0 requires paid subscription (free tier is OneCall 2.5)
- Build commands: `npm run build` (frontend), `cd server && npm run build` (backend)

## Relevant Files
- `packages/shared/`: Shared types, Zod schemas, domain events, port interfaces consumed by both frontend and backend
- `server/src/modules/*/`: Clean Architecture modules with domain/application/infrastructure/api layers
- `server/src/shared/event-bus.ts`: In-process typed EventBus with subscribe/publish
- `server/src/config/redis.ts`: Redis client with controlled reconnect (3 retries, no spam)
- `server/jest.config.js`: Jest config for backend with path aliases
- `vitest.config.ts` / `vitest.setup.ts`: Vitest config for frontend with jsdom + testing-library
- `src/app/api/weather/[endpoint]/route.ts`: Frontend API proxy forwarding to backend
- `src/lib/weather-utils.ts`: Pure utility functions for temperature/speed/date formatting
- `server/src/utils/api-error.ts`: Error class hierarchy
- `design-system/MASTER.md`: Persisted design tokens for SkyView brand
