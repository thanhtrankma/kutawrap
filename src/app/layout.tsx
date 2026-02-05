import type { Metadata } from "next";
import { Baloo_2, Anton, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const baloo = Baloo_2({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-baloo",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "KUTA — Gà rán, khoai chiên, wrap | Brand 2025",
  description: "KUTA - Hip-hop, trẻ trung, phá cách. Gà rán, khoai tây chiên, wrap. Order ngay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${baloo.variable} ${anton.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-[var(--kuta-primary-teal)] font-sans text-[var(--kuta-text)] antialiased">
        <CartProvider>
          <Nav />
          <Marquee />
          <main className="min-h-screen bg-grid-texture">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
