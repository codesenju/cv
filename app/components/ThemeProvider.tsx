'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'light',
  setTheme: () => null,
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme
    if (stored) {
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    }
  }, [])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}