import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NCTP | National Climate Transparency Platform",
    template: "%s | NCTP",
  },
  description:
    "Unified platform for climate transparency, MRV systems, NDC tracking, and carbon credit registry management in alignment with Paris Agreement obligations.",
  keywords: [
    "climate transparency",
    "MRV",
    "NDC",
    "carbon registry",
    "Paris Agreement",
    "greenhouse gas",
    "emissions",
  ],
};

export const viewport: Viewport = {
  themeColor: "#2D6A6A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
