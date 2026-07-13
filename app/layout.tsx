import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "./smooth-scroll";
import { IntroSequence } from "./intro-sequence";
import { ScrollReveal } from "./scroll-reveal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlantic Interactive",
  description:
    "We build games players love and empower the teams behind them with production, LiveOps, analytics, and growth strategy.",
  icons: {
    icon: "/icon.png",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="intro-pending min-h-full flex flex-col">
        <SmoothScroll />
        <ScrollReveal />
        <IntroSequence />
        {children}
      </body>
    </html>
  );
}
