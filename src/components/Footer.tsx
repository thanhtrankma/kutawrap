"use client";

import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function Footer() {
  const { playClick } = useSound();

  return (
    <footer className="border-t-4 border-[var(--red)] bg-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading text-2xl tracking-wide text-[var(--text)]">
              KUTA<span className="text-[var(--red)]">WRAP</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text)]/80">
              Street food — Street vibe. Gà rán, khoai chiên, combo chất.
            </p>
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-wider text-[var(--orange)]">Liên hệ</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text)]/85">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--red)]" />083 281 8986
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--red)]" />
                86a Lê Lợi , phường Gia Viên, Hai Phong, Vietnam
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-[var(--red)]" />
                @kutawrap
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-wider text-[var(--orange)]">Quick links</p>
            <ul className="mt-3 flex flex-wrap gap-4 text-sm">
              <li>
                <Link href="/san-pham" className="text-[var(--text)]/80 hover:text-[var(--red)]" onClick={playClick}>
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/su-kien" className="text-[var(--text)]/80 hover:text-[var(--red)]" onClick={playClick}>
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link href="/gio-hang" className="text-[var(--text)]/80 hover:text-[var(--red)]" onClick={playClick}>
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--bg-soft)] pt-6 text-center text-sm text-[var(--text)]/60">
          © {new Date().getFullYear()} KUTAWRAP. Street food, street style.
        </div>
      </div>
    </footer>
  );
}
