import React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Vizit Africa - Book Your Rwanda Experience",
  description:
    "Discover and book flights, hotels, BnBs, car rentals, and unforgettable experiences in Rwanda. Your home away from home in the Land of a Thousand Hills.",
  keywords:
    "Rwanda travel, booking, hotels, flights, car rentals, tourism, experiences",
  openGraph: {
    title: "Vizit Africa - Book Your Rwanda Experience",
    description:
      "Discover and book flights, hotels, BnBs, car rentals, and unforgettable experiences in Rwanda.",
    images: [
      "https://www.discoverafrica.com/wp-content/uploads/wetu/14988/sinamatella_-_rwanda_-_virunga_-_20180914_-_630.jpg",
    ],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3d5a42",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
