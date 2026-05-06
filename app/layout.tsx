import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Providocs — Built by Providers, for Providers",
  description:
    "Simplify documentation, streamline operations, and stay compliant — without burning out you or your staff. Join the Providocs waitlist.",
  openGraph: {
    title: "Providocs — Built by Providers, for Providers",
    description:
      "The all-in-one platform for waiver, behavioral health, and home & community-based service providers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-ink-900">{children}</body>
    </html>
  );
}
