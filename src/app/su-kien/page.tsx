"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { events } from "@/data/events";
import Link from "next/link";
import { useSound } from "@/hooks/useSound";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const posterItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function SuKienPage() {
  const { playClick } = useSound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="rounded-2xl page-content-backing px-6 py-8 md:px-8 md:py-10">
      <div className="mb-3 inline-block rounded-r-lg border-l-4 border-[var(--kuta-primary-orange)] bg-white px-4 py-1.5 shadow-sm">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-anton text-2xl uppercase tracking-wide text-[var(--kuta-text)] md:text-3xl"
        >
          Sự kiện & <span className="text-[var(--kuta-primary-orange)]">Khuyến mãi</span>
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-sm text-[var(--kuta-text)]/90 md:text-base"
      >
        Layout poster — rap show vibe
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {events.map((e) => (
          <motion.article
            key={e.id}
            variants={posterItem}
            className={`flex min-h-0 flex-col overflow-hidden rounded-xl border-2 border-[var(--kuta-primary-teal)]/25 bg-white shadow-sm ${
              e.highlight ? "lg:col-span-2" : ""
            }`}
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
              <Image
                src={e.image.startsWith("http") ? e.image : FALLBACK_IMG}
                alt={e.title}
                fill
                className="object-cover"
                sizes={e.highlight ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--kuta-primary-teal)]/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 font-anton text-lg text-[var(--kuta-accent-yellow)] drop-shadow-md md:text-xl">
                {e.date}
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
              <h2 className="font-baloo text-xl font-bold leading-tight text-[var(--kuta-text)] md:text-2xl">
                {e.title}
              </h2>
              <p className="mt-1 text-sm font-semibold text-[var(--kuta-accent-yellow)]">
                {e.subtitle}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--kuta-text)]/90">
                {e.description}
              </p>
              <Link
                href="/san-pham"
                onClick={playClick}
                className="mt-4 inline-block w-fit rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] px-4 py-2 font-anton text-sm uppercase text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)] hover:opacity-95"
              >
                Xem menu
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
