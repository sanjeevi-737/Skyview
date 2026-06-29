import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Providers } from "@/lib/providers"

export const metadata: Metadata = {
  title: "SkyView — Beautiful Weather, Every Day",
  description: "A premium weather application with real-time forecasts, air quality data, and stunning 3D visualizations.",
  keywords: ["weather", "forecast", "skyview", "weather app", "air quality", "3d weather"],
  authors: [{ name: "SkyView" }],
  openGraph: {
    title: "SkyView — Beautiful Weather, Every Day",
    description: "Real-time weather with stunning 3D visualizations.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0F9FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('skyview-theme') || 'system';
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
