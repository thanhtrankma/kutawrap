"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSound } from "@/hooks/useSound";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/su-kien", label: "Sự kiện" },
  { href: "/gio-hang", label: "Giỏ hàng" },
];

export default function Nav() {
  const { count } = useCart();
  const { playClick } = useSound();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-teal)]/98 shadow-[0_4px_0_0_var(--kuta-primary-orange)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={playClick}>
          <Image
            src="/images/kuta_logo.jpg"
            alt="KUTA"
            width={120}
            height={40}
            className="h-9 w-auto object-contain md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-baloo text-base font-semibold text-[var(--kuta-text)] transition-colors hover:text-[var(--kuta-accent-neon)]"
              onClick={playClick}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/gio-hang"
            className="relative rounded-lg border-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-orange)]/20 p-2 text-[var(--kuta-text)] transition-colors hover:bg-[var(--kuta-primary-orange)]"
            onClick={playClick}
          >
            <ShoppingBag className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] font-anton text-xs text-[var(--kuta-primary-teal)]">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-lg border-2 border-[var(--kuta-primary-orange)] p-2 text-[var(--kuta-text)] md:hidden"
            onClick={() => {
              playClick();
              setOpen((o) => !o);
            }}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-2 overflow-hidden border-t-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-secondary-teal)] px-4 py-3 md:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-baloo py-2 font-semibold text-[var(--kuta-text)]"
                onClick={() => {
                  playClick();
                  setOpen(false);
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
