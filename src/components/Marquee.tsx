"use client";

import { motion } from "framer-motion";

const TEXTS = [
  "🔥 GÀ RÁN — KHOAI CHIÊN — COMBO CHẤT 🔥",
  "⚡ SHIP TẬN NƠI — FREE SHIP ĐƠN 100K ⚡",
  "🎤 KUTA — GANG GANG HIP-HOP 🎤",
  "🍗 ORDER NGAY — GỌI LÀ CÓ 🍗",
];

export default function Marquee() {
  const row = [...TEXTS, ...TEXTS];
  return (
    <div className="relative overflow-hidden border-y-4 border-[var(--kuta-primary-orange)] bg-[var(--kuta-secondary-teal)] py-3 shadow-[0_4px_0_0_var(--kuta-primary-orange)]">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-10 font-anton text-lg tracking-wider text-[var(--kuta-accent-cream)] md:text-xl"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
