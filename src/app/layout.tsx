import SessionProvider from "@/Components/SessionProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/Components/ui/sonner";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Next.JS LangChain App",
  description: "Next.JS LangChain AI SaaS App"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `min-h-screen bg-background ${geistSans.variable} ${geistMono.variable} antialiased max-w-8xl mx-auto`
        )}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster richColors />
      </body>
    </html>
  )
};