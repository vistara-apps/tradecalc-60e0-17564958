
import "./globals.css"
import "@coinbase/onchainkit/styles.css"
import type { Metadata, Viewport } from "next"
import { Providers } from "./providers"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "TradeCalc - Calculate your crypto trades in seconds",
  description: "A web3 tool for crypto traders to calculate optimal position sizes, liquidation prices, and risk/reward ratios.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      button: {
        title: "Launch TradeCalc",
        action: {
          type: "launch_frame",
          name: "TradeCalc",
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE,
          splashBackgroundColor: "#f8f9fa",
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
