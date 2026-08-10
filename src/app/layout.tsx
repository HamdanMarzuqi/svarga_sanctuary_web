import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
  },
};

import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Default lang="id" — the [locale] layout syncs this via JS effect
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable}`}>
        {children}
      </body>
    </html>
  );
}