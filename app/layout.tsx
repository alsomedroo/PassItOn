import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClientNavBarWrapper } from "@/components/Layout/ClientNavBarWrapper";
import Footer from "@/components/Layout/Footer";
import { Suspense } from "react";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import ClientOnly from "@/components/Layout/ClientOnly";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pass It On",
  description: "By PassionWriters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This hook only works in client components, so wrap NavBar in a client component
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: "Sora, sans-serif" }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientOnly>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ClientOnly>
      </body>
    </html>
  );
}

// Client component to conditionally render NavBar
