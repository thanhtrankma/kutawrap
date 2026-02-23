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
    <section className="relative overflow-hidden border-b-4 border-[var(--kuta-primary-orange)] shadow-[0_6px_0_0_var(--kuta-primary-orange)]">
      {/* Nền hai màu vẽ bằng SVG: đỏ cam + teal, ranh giới sóng mềm */}
      <div className="absolute inset-0" aria-hidden>
        <svg
          className="h-full w-full object-cover"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Màu theo ảnh: đỏ cam #CD5F31, teal đậm #2C6B6B */}
            <linearGradient id="hero-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--kuta-secondary-teal)" />
              <stop offset="100%" stopColor="#2C6B6B" />
            </linearGradient>
            <linearGradient id="hero-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CD5F31" />
              <stop offset="100%" stopColor="var(--kuta-primary-orange)" />
            </linearGradient>
          </defs>
          {/* Lớp teal phủ toàn bộ */}
          <rect width="1200" height="800" fill="url(#hero-teal)" />
          {/* Vùng đỏ cam với đường ranh giới sóng (path Bezier mô phỏng sóng lỏng) */}
          <path
            fill="url(#hero-orange)"
            d="M 0,0 L 1200,0 L 1200,800 
               Q 1000,720 800,520 
               Q 600,380 400,480 
               Q 200,580 0,420 
               L 0,0 Z"
          />
          {/* Blob nhỏ teal trong vùng cam (tạo cảm giác hòa trộn) */}
          <ellipse cx="280" cy="220" rx="120" ry="100" fill="#2C6B6B" opacity="0.85" />
          <ellipse cx="920" cy="580" rx="140" ry="110" fill="#2C6B6B" opacity="0.9" />
          {/* Blob nhỏ cam trong vùng teal */}
          <ellipse cx="1000" cy="680" rx="100" ry="80" fill="#CD5F31" opacity="0.75" />
          <ellipse cx="120" cy="620" rx="90" ry="70" fill="#CD5F31" opacity="0.7" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-grid-texture opacity-50" />
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
            CREATE YOUR
            <br />
            <span className="text-[var(--kuta-accent-yellow)]">OWN WRAP</span>
            <br />
            COMBO CHẤT
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--kuta-text-on-dark)]/95">
            Tự chọn nhân, size và topping. Wings, Sandwich, Combo — order ngay, giao tận nơi.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/san-pham#create_wrap"
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
