"use client"

import { useState } from "react"
import { useWeatherStore } from "@/store/weather-store"
import { IconButton } from "@/components/ui/icon-button"
import { SearchDialog } from "@/components/layout/search-dialog"
import { CloudSun, Search, Moon, Sun, Thermometer } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { ThemeMode } from "@/types/weather"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme, unit, setUnit, activeCity } = useWeatherStore()

  const cycleTheme = () => {
    const modes: ThemeMode[] = ["system", "light", "dark"]
    const idx = modes.indexOf(theme)
    setTheme(modes[(idx + 1) % modes.length])
  }

  return (
    <>
      <header className="sticky top-0 z-50 glass-strong border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CloudSun className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold tracking-tight hidden sm:inline">SkyView</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 ml-2 px-3 py-1 rounded-full bg-foreground/5">
                <span className="text-xs text-foreground/60 truncate max-w-[180px]">{activeCity}</span>
              </div>
            </div>

            <nav className="flex items-center gap-1" aria-label="Main navigation">
              <IconButton
                label="Search location"
                onClick={() => setSearchOpen(true)}
                aria-haspopup="dialog"
              >
                <Search className="h-4 w-4" />
              </IconButton>

              <IconButton
                label={`Switch temperature unit to ${unit === "celsius" ? "Fahrenheit" : "Celsius"}`}
                onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
              >
                <Thermometer className="h-4 w-4" />
              </IconButton>

              <IconButton
                label={`Switch theme (current: ${theme})`}
                onClick={cycleTheme}
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </IconButton>
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
