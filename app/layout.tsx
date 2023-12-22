
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/components/theme-porvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameFlow',
  description: 'Created by abdelkader gnichi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class"
            forcedTheme="dark" storageKey="GameFlow-theme"> 
            {children} 
          </ThemeProvider>
          
          </body>
      </html>
    </ClerkProvider>
  )
}




