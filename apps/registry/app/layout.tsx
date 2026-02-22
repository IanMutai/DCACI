import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Outfit, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "DCACI | Kenya National Carbon Registry",
    template: "%s | DCACI Registry",
  },
  description:
    "Kenya's national carbon credit registry — managing carbon projects, credit issuances, transfers, retirements, and Article 6 ITMO tracking.",
  keywords: [
    "carbon registry",
    "Kenya",
    "carbon credits",
    "climate action",
    "ITMO",
    "Article 6",
    "Paris Agreement",
    "KNCR",
    "carbon markets",
  ],
  authors: [{ name: "DCACI" }],
  creator: "Digital Center for Applied Carbon Intelligence",
  publisher: "DCACI",
  openGraph: {
    title: "DCACI | Kenya National Carbon Registry",
    description: "Kenya's national carbon credit registry and ITMO tracking platform",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#2D6A6A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
