import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ReduxProvider from "@/components/ReduxProvider"
import ThemeProvider from "@/components/ThemeProvider"
import Wrapper from "@/components/Wrapper"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Apex Store",
  description: "E-Commerce App built in Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <ClerkProvider>
        <html lang="en">
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="min-h-[calc(100vh-60px)] grid place-content-center">
                <Wrapper className="py-10">{children}</Wrapper>
              </main>
              <Toaster />
              <Footer />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ReduxProvider>
  )
}
