import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { ThemeToggle } from './components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lehlogonolo Masubelele - Resume',
  description: 'AWS Cloud DevOps Engineer with 6 years of experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}