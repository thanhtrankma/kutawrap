"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { categories, products, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

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

export default function SanPhamPage() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="mb-2 inline-block rounded-r-lg border-l-4 border-[var(--red)] bg-[var(--bg-soft)] pl-4 pr-4 py-1">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl tracking-wide text-[var(--text)] md:text-4xl"
        >
          SẢN <span className="text-[var(--red)]">PHẨM</span>
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-sm text-[var(--text)]/75 md:text-base"
      >
        Lọc theo loại — chọn món bạn thích
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-8 flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-lg border-2 px-4 py-2 font-semibold transition-all ${
            filter === "all"
              ? "border-[var(--red)] bg-[var(--red)] text-white"
              : "border-[var(--border)] text-[var(--text)] hover:border-[var(--orange)]"
          }`}
        >
          Tất cả
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            className={`rounded-lg border-2 px-4 py-2 font-semibold transition-all ${
              filter === c.id
                ? "border-[var(--red)] bg-[var(--red)] text-white"
                : "border-[var(--border)] text-[var(--text)] hover:border-[var(--orange)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p) => (
          <motion.div key={p.id} variants={item}>
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
