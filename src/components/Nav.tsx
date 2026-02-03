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
    <header className="sticky top-0 z-50 border-b-2 border-[var(--red)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={playClick}
        >
          <Image
            src="/images/kuta_logo.jpg"
            alt="KUTAWRAP"
            width={120}
            height={40}
            className="h-8 w-auto object-contain md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold tracking-wide text-[var(--text)] transition-colors hover:text-[var(--red)]"
              onClick={playClick}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/gio-hang"
            className="relative rounded-lg p-2 text-[var(--text)] transition-colors hover:bg-[var(--border)] hover:text-[var(--red)]"
            onClick={playClick}
          >
            <ShoppingBag className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--red)] text-xs font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-[var(--text)] md:hidden"
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
            className="flex flex-col gap-2 overflow-hidden border-t border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 md:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 font-semibold text-[var(--text)]"
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
