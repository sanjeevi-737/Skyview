# SkyView Design System — MASTER.md

## Brand
- **App Name:** SkyView
- **Tagline:** Beautiful weather, every day.
- **Personality:** Premium, minimal, serene, data-rich

## Style
- **Primary Style:** Glassmorphism
- **Mode Support:** Light + Dark (full parity)
- **Keywords:** Frosted glass, transparent, blurred background, layered, light source, depth

## Color Tokens

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| Primary | `#0284C7` | `#38BDF8` | Interactive elements, links |
| Primary Light | `#38BDF8` | `#7DD3FC` | Hover states, highlights |
| Primary Dark | `#0369A1` | `#0284C7` | Active states |
| Secondary | `#0EA5E9` | `#0EA5E9` | Secondary actions |
| Accent | `#F59E0B` | `#FBBF24` | CTA, highlights, special badges |
| Background | `#F0F9FF` | `#0B1120` | Page background |
| Foreground | `#0F172A` | `#F1F5F9` | Body text |
| Muted | `#EFF7FB` | `#1E293B` | Subtle backgrounds |
| Border | `#E0F0F8` | `#1E293B` | Dividers, borders |
| Surface | `rgba(255,255,255,0.65)` | `rgba(15,23,42,0.6)` | Card backgrounds |
| Card Shadow | `0 8px 32px rgba(0,0,0,0.06)` | `0 8px 32px rgba(0,0,0,0.3)` | Card elevation |
| Glass Blur | `backdrop-filter: blur(20px)` | `backdrop-filter: blur(20px)` | Glass effect |

## Typography
- **Font Family:** Inter (sans-serif)
- **Weights:** 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale:** 12/14/16/18/20/24/30/36/48/60
- **Body:** base 16px, line-height 1.6
- **Headings:** font-weight 600-700, tracking -0.02em

## Effects
- **Backdrop Blur:** 16-24px (glass)
- **Card Border:** 1px solid rgba(white, 0.2) light / rgba(white, 0.06) dark
- **Border Radius:** 12-16px (cards), 8px (buttons), 24px (pill buttons)
- **Shadows:** Layered, soft, 2-tier depth
- **Transitions:** 200-300ms ease-out

## Glassmorphism Rules
- Cards must have `backdrop-filter: blur(20px)`
- Use `background: rgba(255,255,255,0.45-0.7)` light / `rgba(15,23,42,0.5-0.8)` dark
- Light border on top/left edges to simulate light source
- Avoid solid backgrounds — always use transparency + blur
- Multiple glass layers create depth

## Icons
- **Library:** Lucide React (consistent 1.5px stroke)
- **Sizes:** 16px (inline), 20px (small), 24px (default), 32px (large)
- **No emoji icons**

## Spacing
- **System:** 4/8/12/16/20/24/32/40/48/64px
- **Card padding:** 20-24px
- **Grid gap:** 16-24px
- **Section spacing:** 32-48px

## Anti-Patterns
- ✗ No emoji as structural icons
- ✗ No solid backgrounds (always use glass)
- ✗ No mixing icon families
- ✗ No animations that trigger layout reflow
- ✗ No text < 12px
- ✗ No horizontal scrolling
