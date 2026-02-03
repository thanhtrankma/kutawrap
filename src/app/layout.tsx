import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "KUTAWRAP — Gà rán, khoai chiên, street vibe",
  description: "Street food, street style. Gà rán, khoai tây chiên, combo chất. Order ngay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="min-h-screen bg-[var(--bg)] font-sans text-[var(--text)] antialiased">
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
