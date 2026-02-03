"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const HERO_IMAGE =
  "/images/kuta_gà_giòn.jpg";

export default function Hero() {
  const { playClick } = useSound();

  return (
    <section className="relative overflow-hidden border-b-4 border-[var(--red)] bg-[var(--bg-soft)]">
      <div className="absolute inset-0 bg-grid-texture opacity-50" />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <span className="inline-block rounded-md border-2 border-[var(--orange)] bg-[var(--orange)]/10 px-3 py-1 font-heading text-sm tracking-[0.2em] text-[var(--orange)] md:text-base">
            STREET FOOD — STREET VIBE
          </span>
          <h1 className="mt-4 font-heading text-4xl leading-[1.1] tracking-tight text-[var(--text)] md:text-5xl lg:text-6xl">
            GÀ RÁN
            <br />
            <span className="text-[var(--red)]">KHOAI CHIÊN</span>
            <br />
            COMBO CHẤT
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text)]/85">
            Một miếng là ghiền. Order ngay — gọi là có. Giao tận nơi, freeship đơn từ 100K.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/san-pham"
              onClick={playClick}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--red)] px-6 py-3 font-semibold text-white transition-all hover:bg-[var(--red-soft)] glow-hover"
            >
              Xem menu
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/su-kien"
              onClick={playClick}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--orange)] px-6 py-3 font-semibold text-[var(--orange)] transition-all hover:bg-[var(--orange)]/10"
            >
              Sự kiện
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-1 aspect-square overflow-hidden rounded-2xl border-2 border-[var(--red)] md:order-2"
        >
          <Image
            src={HERO_IMAGE}
            alt="Gà rán giòn"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
