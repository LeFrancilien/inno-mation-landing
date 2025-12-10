import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AllInvestor | Stock & Crypto Dashboard",
  description: "Track stocks and cryptocurrencies with real-time charts and news.",
  keywords: ["stocks", "crypto", "investment", "dashboard", "finance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
