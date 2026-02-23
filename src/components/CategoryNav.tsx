"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { MenuCategory } from "@/types/menu";

const SECTION_IDS: MenuCategory["id"][] = [
  "create_wrap",
  "combo_wrap",
  "wings",
  "cheese_sandwich",
  "nuggets_sides",
  "sauces_drinks",
];

const LABELS: Record<MenuCategory["id"], string> = {
  create_wrap: "Tự tạo Wrap",
  combo_wrap: "Combo",
  wings: "Wings",
  cheese_sandwich: "Sandwich",
  nuggets_sides: "Sides",
  sauces_drinks: "Sốt & Nước",
};

export default function CategoryNav() {
  const [activeId, setActiveId] = useState<string | null>(SECTION_IDS[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <nav
      ref={scrollRef}
      className="sticky top-0 z-10 -mx-4 border-b-2 border-[var(--kuta-primary-teal)]/20 bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:-mx-6 md:px-6"
      aria-label="Menu categories"
    >
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:flex-wrap md:justify-center">
        {SECTION_IDS.map((id) => (
          <motion.button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`shrink-0 rounded-xl border-2 px-4 py-2 font-baloo text-sm font-semibold transition-all ${
              activeId === id
                ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                : "border-[var(--kuta-primary-orange)]/30 bg-[var(--kuta-bg-orange-soft)] text-[var(--kuta-text)] hover:border-[var(--kuta-primary-orange)]"
            }`}
          >
            {LABELS[id]}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
