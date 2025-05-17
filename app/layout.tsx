import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Source_Code_Pro } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const scp = Source_Code_Pro({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Minimalist Portfolio",
  description: "A dark-themed minimalist portfolio website",
  generator: 'v0.dev',
  icons: {
    icon: '/raxhacks.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${scp.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
