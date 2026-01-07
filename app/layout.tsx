import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/providers";
import "./globals.css";

const spaceMono = localFont({
  src: [
    {
      path: "./fonts/SpaceMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpaceMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mindcave.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mind Cave | Your Digital Library, Perfectly Organized",
    template: "%s | Mind Cave",
  },
  description:
    "Save, organize, and access your bookmarks from anywhere. Built for people who collect resources and need them to be findable.",
  keywords: [
    "bookmark manager",
    "digital library",
    "link organizer",
    "resource management",
    "bookmark app",
    "save links",
    "organize bookmarks",
  ],
  authors: [{ name: "Devloop", url: "https://www.devloop.software" }],
  creator: "Devloop",
  publisher: "Devloop",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mind Cave",
    title: "Mind Cave | Your Digital Library, Perfectly Organized",
    description:
      "Save, organize, and access your bookmarks from anywhere. Built for people who collect resources and need them to be findable.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mind Cave - Your Digital Library, Perfectly Organized",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mind Cave | Your Digital Library, Perfectly Organized",
    description:
      "Save, organize, and access your bookmarks from anywhere. Built for people who collect resources and need them to be findable.",
    images: ["/twitter-image.png"],
    creator: "@devloopsoftware",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
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
      className={`${spaceMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className={`${spaceMono.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
