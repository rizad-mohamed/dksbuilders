import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: { default: "DKS Builders | Construction & Civil Engineering in Sri Lanka", template: "%s | DKS Builders" },
  description: "Turnkey building and civil engineering from Elpitiya, Sri Lanka. Building, highway, bridge, water, irrigation and house construction by DKS Builders.",
  openGraph: {
    type: "website", locale: "en_LK", siteName: "DKS Builders",
    title: "DKS Builders | Built with purpose",
    description: "Sri Lankan expertise. From first idea to built reality.",
    images: [{ url: "/assets/dks-hero-poster-1280.webp", width: 1280, height: 720, alt: "Illustrative construction montage" }]
  },
  twitter: { card: "summary_large_image", title: "DKS Builders | Built with purpose", images: ["/assets/dks-hero-poster-1280.webp"] },
  icons: { icon: "/assets/dks-original-logo.webp" }
};
export const viewport: Viewport = { themeColor: "#f5f7f8" };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en-LK"><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}