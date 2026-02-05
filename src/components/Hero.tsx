"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const HERO_IMAGE = "/images/kuta_gà_giòn.jpg";

export default function Hero() {
  const { playClick } = useSound();

  return (
    <section className="relative overflow-hidden border-b-4 border-[var(--kuta-primary-orange)] bg-[var(--kuta-secondary-teal)] shadow-[0_6px_0_0_var(--kuta-primary-orange)]">
      <div className="absolute inset-0 bg-grid-texture opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <span className="inline-block rounded-lg border-4 border-[var(--kuta-accent-yellow)] bg-[var(--kuta-accent-yellow)]/20 px-4 py-1.5 font-anton text-sm uppercase tracking-widest text-[var(--kuta-primary-teal)] md:text-base">
            Street Food — Street Vibe
          </span>
          <h1 className="mt-5 font-anton text-4xl leading-[1.05] tracking-tight text-[var(--kuta-text-on-dark)] md:text-5xl lg:text-6xl">
            GÀ RÁN
            <br />
            <span className="text-[var(--kuta-accent-yellow)]">KHOAI CHIÊN</span>
            <br />
            COMBO CHẤT
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--kuta-text-on-dark)]/95">
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
              className="inline-flex items-center gap-2 rounded-xl border-4 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] px-6 py-3.5 font-anton text-lg uppercase tracking-wide text-[var(--kuta-primary-teal)] shadow-[6px_6px_0_0_var(--kuta-primary-teal)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--kuta-primary-teal)]"
            >
              Đặt hàng ngay
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/su-kien"
              onClick={playClick}
              className="inline-flex items-center gap-2 rounded-xl border-4 border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-orange)]/20 px-6 py-3.5 font-baloo font-semibold text-[var(--kuta-text-on-dark)] transition-all hover:bg-[var(--kuta-primary-orange)]"
            >
              Sự kiện
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-1 aspect-square overflow-hidden rounded-2xl border-4 border-[var(--kuta-primary-orange)] shadow-[8px_8px_0_0_var(--kuta-primary-orange)] md:order-2"
        >
          <Image
            src={HERO_IMAGE}
            alt="Gà rán KUTA"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--kuta-primary-teal)]/70 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
