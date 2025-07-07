import "./globals.css"
import cx from "classnames"
import { sfPro, inter } from "./fonts"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Suspense } from "react"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Fullstackopen Blogapp refactored with next.js",
  description:
    "Tech stack using: React next.js Tailwind RadixUI MongoDB Vercel...Precedent code as starter kit",
  // metadataBase: new URL(""),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="z-[-1] fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <Suspense fallback={<div className="text-2xl">Loading Navbar...</div>}>
          <Navbar />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center pt-16 pb-32">
          {children}
        </main>
        <Footer />
        <VercelAnalytics />
      </body>
    </html>
  )
}
