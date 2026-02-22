import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DCACI | Digital Center for Applied Carbon Intelligence",
    template: "%s | DCACI",
  },
  description:
    "Kenya's unified digital platform for applied carbon intelligence — integrating MRV systems, NDC tracking, carbon registry, and climate finance analytics.",
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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
