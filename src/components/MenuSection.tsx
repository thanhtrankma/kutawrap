"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import MenuProductCard from "@/components/MenuProductCard";
import type { MenuProduct, MenuCategoryId } from "@/types/menu";

interface MenuSectionProps {
  id: MenuCategoryId;
  title: string;
  description?: string;
  products: MenuProduct[];
}

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

export default function MenuSection({ id, title, description, products }: MenuSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  if (products.length === 0) return null;

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-mt-24 rounded-2xl border-2 border-[var(--kuta-primary-teal)]/15 bg-white/95 p-6 shadow-sm md:p-8"
    >
      <div className="mb-4 inline-block rounded-r-lg border-l-4 border-[var(--kuta-primary-teal)] bg-[var(--kuta-bg-teal-soft)] px-4 py-1.5">
        <motion.h2
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-anton text-xl uppercase tracking-wide text-[var(--kuta-primary-teal)] md:text-2xl"
        >
          {title}
        </motion.h2>
      </div>
      {description && (
        <p className="mt-1 text-sm text-[var(--kuta-text)]/85">{description}</p>
      )}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((p) => (
          <motion.div key={p.id} variants={item} className="min-h-0">
            <MenuProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
