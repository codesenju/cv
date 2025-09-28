'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-card border border-border hover:bg-secondary transition-colors"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}