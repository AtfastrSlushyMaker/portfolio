import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { PortfolioMotionProvider } from "@/components/motion-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

const display = localFont({
  src: [
    { path: "../../public/fonts/clash-display-500.woff2", weight: "500" },
    { path: "../../public/fonts/clash-display-600.woff2", weight: "600" },
    { path: "../../public/fonts/clash-display-700.woff2", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "../../public/fonts/satoshi-400.woff2", weight: "400" },
    { path: "../../public/fonts/satoshi-500.woff2", weight: "500" },
    { path: "../../public/fonts/satoshi-700.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

// Runs before first paint: applies the saved theme and holds the hero for its intro when motion is allowed.
const bootScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="pending";`;

export const metadata: Metadata = {
  metadataBase: new URL("https://malekbsaissa.vercel.app"),
  title: {
    default: "Malek Bsaissa | Software Engineer",
    template: "%s | Malek Bsaissa",
  },
  description:
    "Malek Bsaissa, final-year software and cloud engineering student in Tunisia seeking an end-of-study internship. Explore projects in geospatial systems, community platforms, machine learning, and hybrid cloud.",
  icons: {
    icon: [
      { url: "/favicon.svg?v=4", type: "image/svg+xml" },
      { url: "/favicon-32.png?v=4", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png?v=4", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-icon.png?v=4",
  },
  openGraph: {
    title: "Malek Bsaissa",
    description:
      "Malek Bsaissa, final-year software and cloud engineering student in Tunisia seeking an end-of-study internship. Explore projects in geospatial systems, community platforms, machine learning, and hybrid cloud.",
    url: "https://malekbsaissa.vercel.app",
    siteName: "Malek Bsaissa",
    images: [{ url: "/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malek Bsaissa",
    description:
      "Malek Bsaissa, final-year software and cloud engineering student in Tunisia seeking an end-of-study internship. Explore projects in geospatial systems, community platforms, machine learning, and hybrid cloud.",
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} dark h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=4" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=4" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=4" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=4" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PortfolioMotionProvider>
          <ThemeProvider>
          <SmoothScroll>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          </SmoothScroll>
          </ThemeProvider>
        </PortfolioMotionProvider>
      <Analytics />
      <SpeedInsights />
      {process.env.NODE_ENV === "production" && <Script id="clarity" strategy="afterInteractive">
        {`if(!["localhost","127.0.0.1"].includes(location.hostname))(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wodv4uc6u2");`}
      </Script>}
      </body>
    </html>
  );
}
