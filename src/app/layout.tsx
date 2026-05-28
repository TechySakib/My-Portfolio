import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nazmus Sakib — Developer & AI Engineer",
  description:
    "Portfolio of Nazmus Sakib — Creative developer, AI engineer, and storyteller. Exploring the intersection of code, creativity, and intelligence.",
  keywords: [
    "Nazmus Sakib",
    "AI Engineer",
    "Developer",
    "Portfolio",
    "Machine Learning",
    "Next.js",
  ],
  openGraph: {
    title: "Nazmus Sakib — Developer & AI Engineer",
    description:
      "Creative developer, AI engineer, and storyteller. Three versions of one person.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        {/* Atmospheric overlays */}
        <div className="noise" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
