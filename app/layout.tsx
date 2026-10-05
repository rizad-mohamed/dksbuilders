import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const sans = localFont({
  src: "../public/fonts/dm-sans-latin.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});
const serif = localFont({
  src: "../public/fonts/newsreader-latin.woff2",
  variable: "--font-serif",
  weight: "200 800",
  preload: false,
  display: "swap",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: {
    default: "DKS Builders | Construction & Civil Engineering in Sri Lanka",
    template: "%s | DKS Builders",
  },
  description:
    "Turnkey building and civil engineering from Elpitiya, Sri Lanka. Building, highway, bridge, water, irrigation and house construction by DKS Builders.",
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "DKS Builders",
    title: "DKS Builders | Built with purpose",
    description: "Sri Lankan expertise. From first idea to built reality.",
    images: siteUrl
      ? [
          {
            url: "/assets/dks-hero-poster-1280.webp",
            width: 1280,
            height: 720,
            alt: "Illustrative construction montage",
          },
        ]
      : [],
  },
  twitter: {
    card: siteUrl ? "summary_large_image" : "summary",
    title: "DKS Builders | Built with purpose",
    images: siteUrl ? ["/assets/dks-hero-poster-1280.webp"] : [],
  },
  icons: { icon: "/assets/dks-logo-transparent.png" },
};
export const viewport: Viewport = { themeColor: "#f7fafc" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-LK" className={sans.variable + " " + serif.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
