import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { PageReveal } from "@/components/page-reveal";
import { CursorGlow } from "@/components/cursor-glow";
import { BackToTop } from "@/components/back-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://malekbsaissa.vercel.app"),
  title: {
    default: "Malek Bsaissa | Software Engineer",
    template: "%s | Malek Bsaissa",
  },
  description:
    "Cloud engineering student at ESPRIT — building full-stack applications, transportation platforms, and cloud-native systems from Tunisia.",
  icons: {
    icon: [
      { url: "/favicon-32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-icon.png?v=3",
  },
  openGraph: {
    title: "Malek Bsaissa",
    description:
      "Cloud engineering student at ESPRIT — building full-stack applications, transportation platforms, and cloud-native systems from Tunisia.",
    url: "https://malekbsaissa.vercel.app",
    siteName: "Malek Bsaissa",
    images: [{ url: "/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malek Bsaissa",
    description:
      "Cloud engineering student at ESPRIT — building full-stack applications, transportation platforms, and cloud-native systems from Tunisia.",
    images: ["/og"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=3" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=3" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <PageReveal />
          <CursorGlow />
          <div className="scroll-progress" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <BackToTop />
        </ThemeProvider>
      </body>
      <Script id="clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wodv4uc6u2");`}
      </Script>
    </html>
  );
}
