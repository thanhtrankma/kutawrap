"use client";

import { motion } from "framer-motion";

const TEXTS = [
  "🔥 GÀ RÁN — KHOAI CHIÊN — COMBO CHẤT 🔥",
  "⚡ SHIP TẬN NƠI — FREE SHIP ĐƠN 100K ⚡",
  "🎤 STREET FOOD — STREET VIBE 🎤",
  "🍗 ORDER NGAY — GỌI LÀ CÓ 🍗",
];

export default function Marquee() {
  const row = [...TEXTS, ...TEXTS];
  return (
    <div className="relative overflow-hidden border-y-2 border-[var(--red)] bg-[var(--bg-soft)] py-2.5 font-heading text-lg tracking-widest text-[var(--red)] md:text-xl">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="mx-8">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
