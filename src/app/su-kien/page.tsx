"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { events } from "@/data/events";
import Link from "next/link";
import { useSound } from "@/hooks/useSound";

const POSTER_IMG =
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const posterItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function SuKienPage() {
  const { playClick } = useSound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="mb-2 inline-block rounded-r-lg border-l-4 border-[var(--orange)] bg-[var(--bg-soft)] pl-4 pr-4 py-1">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl tracking-wide text-[var(--text)] md:text-4xl"
        >
          SỰ KIỆN & <span className="text-[var(--red)]">KHUYẾN MÃI</span>
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-sm text-[var(--text)]/75 md:text-base"
      >
        Layout poster — rap show vibe
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {events.map((e) => (
          <motion.article
            key={e.id}
            variants={posterItem}
            className={`overflow-hidden rounded-2xl border-2 bg-[var(--bg-soft)] ${
              e.highlight
                ? "border-[var(--red)] shadow-[0_4px_20px_rgba(196,92,106,0.2)] lg:col-span-2 lg:flex"
                : "border-[var(--border)]"
            }`}
          >
            <div className="relative aspect-[3/4] shrink-0 md:aspect-[4/3] lg:aspect-auto lg:h-64 lg:w-72">
              <Image
                src={POSTER_IMG}
                alt={e.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 font-heading text-xl text-[var(--red)] drop-shadow-lg md:text-2xl">
                {e.date}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h2 className="font-display text-xl tracking-tight text-[var(--text)] md:text-2xl">
                  {e.title}
                </h2>
                <p className="mt-1 text-sm font-semibold text-[var(--orange)]">
                  {e.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text)]/80">
                  {e.description}
                </p>
              </div>
              <Link
                href="/san-pham"
                onClick={playClick}
                className="mt-4 inline-block w-fit rounded-lg bg-[var(--red)] px-4 py-2 font-semibold text-white transition-all hover:bg-[var(--red-soft)]"
              >
                Xem menu
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
