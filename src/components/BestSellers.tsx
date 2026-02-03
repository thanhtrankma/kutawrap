"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getBestSellers } from "@/data/products";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function BestSellers() {
  const best = getBestSellers();

  return (
    <section className="border-b-2 border-[var(--border)] bg-[var(--bg)] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-2 inline-block rounded-r-lg border-l-4 border-[var(--red)] bg-[var(--bg-soft)] pl-4 pr-4 py-1">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl tracking-wide text-[var(--text)] md:text-4xl"
          >
            BEST <span className="text-[var(--red)]">SELLER</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-2 text-sm text-[var(--text)]/75 md:text-base"
        >
          Bán chạy nhất — một miếng là ghiền
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {best.map((p) => (
            <motion.div key={p.id} variants={item}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
