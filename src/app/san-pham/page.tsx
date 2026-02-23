"use client";

import { motion } from "framer-motion";
import CategoryNav from "@/components/CategoryNav";
import CreateYourWrapConfigurator from "@/components/CreateYourWrapConfigurator";
import MenuSection from "@/components/MenuSection";
import {
  menuCategories,
  getMenuProductsByCategory,
} from "@/data/menu";
import type { MenuCategoryId } from "@/types/menu";

const SECTION_TITLES: Record<MenuCategoryId, string> = {
  create_wrap: "Create Your Own Wrap",
  combo_wrap: "Combo Wrap & Sandwich",
  wings: "Special Kuta Wings (Gà nướng)",
  cheese_sandwich: "Cheese Sandwich (BnC Sandwich)",
  nuggets_sides: "Nuggets & Sides",
  sauces_drinks: "Sốt & Nước",
};

const SECTION_DESCRIPTIONS: Partial<Record<MenuCategoryId, string>> = {
  combo_wrap: "Combo tiết kiệm — Wrap, Sandwich kèm nước.",
  wings: "Cánh gà nướng đặc trưng Kuta, pack và combo.",
  nuggets_sides: "Gà viên, khoai chiên, snack.",
  sauces_drinks: "Extra sốt và nước uống.",
};

export default function SanPhamPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div className="rounded-2xl page-content-backing px-4 py-6 md:px-6 md:py-8">
        <div className="mb-3 inline-block rounded-r-xl border-l-4 border-[var(--kuta-primary-teal)] bg-white px-5 py-2 shadow-sm">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-anton text-2xl uppercase tracking-wide text-[var(--kuta-text)] md:text-3xl"
          >
            Menu
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-sm text-[var(--kuta-text)]/90 md:text-base"
        >
          Tự tạo wrap, chọn combo hoặc món lẻ — thêm vào giỏ và thanh toán.
        </motion.p>

        <CategoryNav />

        <div className="mt-8 space-y-10">
          {/* 1. Create Your Own Wrap — configurator */}
          <CreateYourWrapConfigurator />

          {/* 2–6. Các nhóm menu từ data */}
          {menuCategories
            .filter((c) => c.id !== "create_wrap")
            .map((cat) => {
              const products = getMenuProductsByCategory(cat.id);
              if (products.length === 0) return null;
              return (
                <MenuSection
                  key={cat.id}
                  id={cat.id}
                  title={SECTION_TITLES[cat.id]}
                  description={SECTION_DESCRIPTIONS[cat.id]}
                  products={products}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
