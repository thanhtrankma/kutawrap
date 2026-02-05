"use client";

import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function Footer() {
  const { playClick } = useSound();

  return (
    <footer className="border-t-4 border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-teal)] shadow-[0_-4px_0_0_var(--kuta-primary-orange)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-baloo text-2xl font-bold tracking-wide text-[var(--kuta-text)]">
              KUTA<span className="text-[var(--kuta-accent-yellow)]"> WRAP</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--kuta-text)]/90">
              Gà rán, khoai chiên, wrap — Hip-hop, trẻ trung, phá cách.
            </p>
          </div>
          <div>
            <p className="font-anton text-sm uppercase tracking-wider text-[var(--kuta-accent-yellow)]">
              Liên hệ
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--kuta-text)]/90">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--kuta-secondary-orange)]" />
                083 281 8986
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--kuta-secondary-orange)]" />
                86a Lê Lợi, Gia Viên, Hải Phòng
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-[var(--kuta-secondary-orange)]" />
                @kutawrap
              </li>
            </ul>
          </div>
          <div>
            <p className="font-anton text-sm uppercase tracking-wider text-[var(--kuta-accent-yellow)]">
              Quick links
            </p>
            <ul className="mt-3 flex flex-wrap gap-4 text-sm">
              <li>
                <Link
                  href="/san-pham"
                  className="text-[var(--kuta-text)]/90 hover:text-[var(--kuta-accent-neon)]"
                  onClick={playClick}
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/su-kien"
                  className="text-[var(--kuta-text)]/90 hover:text-[var(--kuta-accent-neon)]"
                  onClick={playClick}
                >
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link
                  href="/gio-hang"
                  className="text-[var(--kuta-text)]/90 hover:text-[var(--kuta-accent-neon)]"
                  onClick={playClick}
                >
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t-2 border-[var(--kuta-primary-orange)]/50 pt-6 text-center text-sm text-[var(--kuta-text)]/70">
          © {new Date().getFullYear()} KUTA. Brand Kit 2025.
        </div>
      </div>
    </footer>
  );
}
