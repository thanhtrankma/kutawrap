"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getBestSellers } from "@/data/products";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function BestSellers() {
  const best = getBestSellers();

  return (
    <section className="border-b-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-teal)] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-3 inline-block rounded-r-lg border-l-2 border-[var(--kuta-accent-neon)] bg-[var(--kuta-secondary-teal)] px-4 py-1.5 shadow-[2px_2px_0_0_var(--kuta-primary-orange)]">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-anton text-xl uppercase tracking-wide text-[var(--kuta-text)] md:text-2xl"
          >
            Best <span className="text-[var(--kuta-accent-yellow)]">Seller</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-2 text-sm text-[var(--kuta-text)]/90 md:text-base"
        >
          Bán chạy nhất — một miếng là ghiền
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {best.map((p) => (
            <motion.div key={p.id} variants={item} className="min-h-0">
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
