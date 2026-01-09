import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ThemeProvider from "@/components/theme-provider"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crumbs O' Bliss | Artisan Bakery",
  description:
    "Fresh, honest, small-batch baked goods made with time-tested techniques and thoughtfully sourced ingredients.",
  generator: "v0.app",
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
  openGraph: {
    title: "Crumbs O' Bliss | Artisan Bakery",
    description: "Fresh, honest, small-batch baked goods made with time-tested techniques",
    type: "website",
  },
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }]
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

  if (!["en", "bn"].includes(locale)) {
    notFound()
  }

  let messages
  try {
    messages = await getMessages()
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
