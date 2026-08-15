import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { Nav } from "@/components/chrome/Nav";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import "./globals.css";

/**
 * Display : Archivo variable, axe `wdth` piloté en CSS (--display-wdth: 78)
 * pour retrouver le bold condensé de l'identité AgroMetha.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  metadataBase: new URL(site.meta.url),
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: site.meta.url,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${archivo.variable} ${manrope.variable}`}>
      <body className="bg-canvas font-sans text-ink-soft antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-forest focus:px-3 focus:py-2 focus:text-canvas"
        >
          Aller au contenu
        </a>
        <GsapProvider>
          <SmoothScroll>
            <CustomCursor />
            <Nav />
            <ScrollProgress />
            {children}
          </SmoothScroll>
        </GsapProvider>
      </body>
    </html>
  );
}
