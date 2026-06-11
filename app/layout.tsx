import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/src/common/Header/header";
import Footer from "@/src/common/Footer/footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const literataItalic = localFont({
  src: '../fonts/Literata/Literata-Italic-VariableFont.ttf',
  variable: '--font-literata-italic',
  display: 'swap',
})

const literataRegular = localFont({
  src: '../fonts/Literata/Literata-VariableFont.ttf',
  variable: '--font-literata-regular',
  display: 'swap',
})

const fustat = localFont({
  src: [
    { path: '../fonts/Fustat/static/Fustat-ExtraLight.ttf', weight: '200' },
    { path: '../fonts/Fustat/static/Fustat-Light.ttf', weight: '300' },
    { path: '../fonts/Fustat/static/Fustat-Regular.ttf', weight: '400' },
    { path: '../fonts/Fustat/static/Fustat-Medium.ttf',  weight: '500' },
    { path: '../fonts/Fustat/static/Fustat-SemiBold.ttf',  weight: '600' },
    { path: '../fonts/Fustat/static/Fustat-Bold.ttf',    weight: '700' },
    { path: '../fonts/Fustat/static/Fustat-ExtraBold.ttf',    weight: '800' },
  ],
  variable: '--font-fustat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Paisa Rupay - Business & Personal Loans Made Simple",
    template: "%s | Paisa Rupay",
  },
  description: "Paisa Rupay helps you find the right business and personal lenders quickly, easily, and transparently. No endless bank visits, no spam, just clear matching and guidance.",
  metadataBase: new URL('https://paisarupay.com'),
  keywords: ["business loan", "personal loan", "loan advisor", "financial consultant", "Paisa Rupay", "lender matching"],
  openGraph: {
    title: "Paisa Rupay - Business & Personal Loans Made Simple",
    description: "Find your ideal lender without the runaround. Transparent fees, dedicated advisor support, and fast processing.",
    url: "https://paisarupay.com",
    siteName: "Paisa Rupay",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paisa Rupay - Business & Personal Loans Made Simple",
    description: "Find your ideal lender without the runaround. Transparent fees, dedicated advisor support, and fast processing.",
  },
  icons: {
    icon: [
      { url: '/favicons/icon.png', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: '32x32' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicons/favicon.ico',
  },
  manifest: '/favicons/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${literataItalic.variable} ${literataRegular.variable} ${fustat.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""} />
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
