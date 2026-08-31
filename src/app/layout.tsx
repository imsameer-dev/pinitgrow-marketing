import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pinitgrow.com"),
  title: {
    default: "PinitGrow — Pinterest research",
    template: "%s | PinitGrow",
  },
  description:
    "Keyword explorer, top pins, accounts, boards, and rank tracking in one cloud workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans">
        <ThemeProvider>
          <LenisProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
