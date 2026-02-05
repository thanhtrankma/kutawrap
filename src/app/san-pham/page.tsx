"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { categories, products, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function SanPhamPage() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return [...products];
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="mb-3 inline-block rounded-r-xl border-l-4 border-[var(--kuta-accent-neon)] bg-[var(--kuta-secondary-teal)] px-5 py-2 shadow-[2px_2px_0_0_var(--kuta-primary-orange)]">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-anton text-2xl uppercase tracking-wide text-[var(--kuta-text)] md:text-3xl"
        >
          Sản phẩm
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-sm text-[var(--kuta-text)]/90 md:text-base"
      >
        Lọc theo loại — chọn món bạn thích
      </motion.p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-lg border-2 px-4 py-2 font-baloo font-semibold transition-all ${
            filter === "all"
              ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
              : "border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-orange)]/20 text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-orange)]/40"
          }`}
        >
          Tất cả
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            className={`rounded-lg border-2 px-4 py-2 font-baloo font-semibold transition-all ${
              filter === c.id
                ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                : "border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-orange)]/20 text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-orange)]/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <motion.div
        key={filter}
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p) => (
          <motion.div key={p.id} variants={item} className="min-h-0">
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
