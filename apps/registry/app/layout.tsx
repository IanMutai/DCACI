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
    default: "ARC | African Registry for Carbon",
    template: "%s | ARC",
  },
  description:
    "A digital public goods carbon registry platform empowering African nations with transparent, efficient carbon credit management.",
  generator: "v0.app",
  keywords: [
    "carbon registry",
    "Africa",
    "carbon credits",
    "climate action",
    "sustainability",
    "ITMO",
    "digital public goods",
    "Article 6",
    "Paris Agreement",
  ],
  authors: [{ name: "GIZ" }, { name: "Verst Carbon" }],
  creator: "GIZ & Verst Carbon",
  publisher: "African Registry for Carbon",
  openGraph: {
    title: "ARC | African Registry for Carbon",
    description: "Digital public goods carbon registry platform for African nations",
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
