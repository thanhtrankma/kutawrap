import type { MenuCategory, MenuProduct, MenuCategoryId } from "@/types/menu";

export const menuCategories: MenuCategory[] = [
  { id: "create_wrap", label: "Create Your Own Wrap", shortLabel: "Wrap" },
  { id: "combo_wrap", label: "Combo Wrap & Sandwich", shortLabel: "Combo" },
  { id: "wings", label: "Special Kuta Wings (Gà nướng)", shortLabel: "Wings" },
  { id: "cheese_sandwich", label: "Cheese Sandwich (BnC)", shortLabel: "Sandwich" },
  { id: "nuggets_sides", label: "Nuggets & Sides", shortLabel: "Sides" },
  { id: "sauces_drinks", label: "Sốt & Nước", shortLabel: "Sốt & Nước" },
];

/** Create Your Own Wrap: nhân + size + mozzarella add-on */
export const WRAP_PROTEIN_OPTIONS = [
  { id: "beef", name: "Bò băm", nameEn: "Minced Beef" },
  { id: "nugget", name: "Gà giòn", nameEn: "Crispy Nugget" },
  { id: "grilled", name: "Gà nướng", nameEn: "Grilled Chicken" },
] as const;

export const WRAP_SIZE_PRICES: { id: string; label: string; price: number }[] = [
  { id: "s", label: "Size S", price: 65000 },
  { id: "m", label: "Size M", price: 125000 },
  { id: "l", label: "Size L", price: 185000 },
];

export const WRAP_MOZZARELLA_OPTIONS: { id: string; label: string; price: number }[] = [
  { id: "50", label: "50g", price: 20000 },
  { id: "100", label: "100g", price: 35000 },
];

/** Sản phẩm menu (combo, single, addon, drink) — không bao gồm Create Your Own Wrap (xử lý riêng) */
export const menuProducts: MenuProduct[] = [
  // ========== COMBO WRAP & SANDWICH ==========
  {
    id: "combo-s1",
    slug: "combo-s1",
    name: "Combo S1 (Wrap S & Nuggets)",
    description: "1 Wrap S, 1 Gà viên, 1 Nước",
    category: "combo_wrap",
    type: "combo",
    image: "/images/kuta_canhga_banh.jpg",
    priceVariants: [{ id: "only", label: "Combo", price: 109000 }],
    includes: ["1 Wrap S", "1 Gà viên", "1 Nước"],
    tags: ["best_seller"],
  },
  {
    id: "combo-s2",
    slug: "combo-s2",
    name: "Combo S2 (Wrap S & Khoai S)",
    description: "1 Wrap S, 1 Khoai tây chiên S, 1 Nước",
    category: "combo_wrap",
    type: "combo",
    image: "/images/kuta_khoai_gà.jpg",
    priceVariants: [{ id: "only", label: "Combo", price: 95000 }],
    includes: ["1 Wrap S", "1 Khoai tây chiên S", "1 Nước"],
  },
  {
    id: "combo-s3",
    slug: "combo-s3",
    name: "Combo S3 (Wrap S & Sandwich)",
    description: "1 Wrap S, 1 BnC Sandwich, 1 Nước",
    category: "combo_wrap",
    type: "combo",
    image: "/images/kuta_canhga_banh.jpg",
    priceVariants: [{ id: "only", label: "Combo", price: 138000 }],
    includes: ["1 Wrap S", "1 BnC Sandwich", "1 Nước"],
  },
  {
    id: "combo-s4",
    slug: "combo-s4",
    name: "Combo S4 (Wrap S & Snack)",
    description: "1 Wrap S, 1 Wapwap Size S, 1 Nước",
    category: "combo_wrap",
    type: "combo",
    image: "/images/kuta_khoai_gà.jpg",
    priceVariants: [{ id: "only", label: "Combo", price: 88000 }],
    includes: ["1 Wrap S", "1 Wapwap Size S", "1 Nước"],
  },
  {
    id: "couple-combo-1",
    slug: "couple-combo-1",
    name: "Couple Combo 1 (2 Wrap S & Nuggets)",
    description: "2 Wrap S, 1 Gà viên, 2 Nước",
    category: "combo_wrap",
    type: "combo",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "Combo", price: 179000 }],
    includes: ["2 Wrap S", "1 Gà viên", "2 Nước"],
  },
  {
    id: "combo-fill-n-chill",
    slug: "combo-fill-n-chill",
    name: "Combo Fill N Chill",
    description: "2 Wrap S, 2 Sandwiches, 1 Gà viên, 1 Khoai S, 2 Nước",
    category: "combo_wrap",
    type: "combo",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "Combo", price: 338000 }],
    includes: ["2 Wrap S", "2 Sandwiches", "1 Gà viên", "1 Khoai S", "2 Nước"],
    tags: ["best_seller"],
  },
  {
    id: "pack-sm",
    slug: "pack-sm",
    name: "Pack SM",
    description: "1 BnC Sandwich, 1 Gà viên, 1 Nước",
    category: "combo_wrap",
    type: "combo",
    image: "/images/kuta_canhga_banh.jpg",
    priceVariants: [{ id: "only", label: "Pack", price: 115000 }],
    includes: ["1 BnC Sandwich", "1 Gà viên", "1 Nước"],
  },
  // ========== WINGS ==========
  {
    id: "wings-4",
    slug: "wings-4",
    name: "4 Wings (4 Cánh nướng)",
    category: "wings",
    type: "single",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "4 cánh", price: 80000 }],
  },
  {
    id: "wings-box-10",
    slug: "wings-box-10",
    name: "Box 10 Wings (10 Cánh nướng)",
    category: "wings",
    type: "single",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "10 cánh", price: 169000 }],
  },
  {
    id: "salad-ga-nuong",
    slug: "salad-ga-nuong",
    name: "Salad Gà Nướng",
    category: "wings",
    type: "single",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "1 phần", price: 48000 }],
  },
  {
    id: "sandwich-ga-nuong",
    slug: "sandwich-ga-nuong",
    name: "Sandwich Gà Nướng",
    category: "wings",
    type: "single",
    image: "/images/kuta_canhga_banh.jpg",
    priceVariants: [{ id: "only", label: "1 phần", price: 70000 }],
  },
  {
    id: "pack-c1",
    slug: "pack-c1",
    name: "Pack C1",
    description: "4 Cánh, 1 Wrap S, 1 Khoai S",
    category: "wings",
    type: "combo",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "Pack", price: 149000 }],
    includes: ["4 Cánh nướng", "1 Wrap S", "1 Khoai S"],
  },
  {
    id: "pack-c2",
    slug: "pack-c2",
    name: "Pack C2",
    description: "4 Cánh, 1 Gà viên, 1 Khoai S, 1 Sốt chấm",
    category: "wings",
    type: "combo",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "Pack", price: 139000 }],
    includes: ["4 Cánh nướng", "1 Gà viên", "1 Khoai S", "1 Sốt chấm"],
  },
  {
    id: "munchie-box",
    slug: "munchie-box",
    name: "Munchie Box",
    description: "1 Wrap S, 4 Cánh nướng, 1 Gà viên, 1 Khoai S, 1 Sốt chấm, 1 Nước",
    category: "wings",
    type: "combo",
    image: "/images/kuta_canhganuong.jpg",
    priceVariants: [{ id: "only", label: "Box", price: 229000 }],
    includes: ["1 Wrap S", "4 Cánh nướng", "1 Gà viên", "1 Khoai S", "1 Sốt chấm", "1 Nước"],
    tags: ["best_seller"],
  },
  // ========== CHEESE SANDWICH (BnC) ==========
  {
    id: "bnc-ga-gion",
    slug: "bnc-ga-gion",
    name: "Gà giòn Mozzarella",
    category: "cheese_sandwich",
    type: "single",
    image: "/images/kuta_gà_giòn.jpg",
    priceVariants: [{ id: "only", label: "1 phần", price: 69000 }],
  },
  {
    id: "bnc-bo-bam",
    slug: "bnc-bo-bam",
    name: "Bò băm Mozzarella",
    category: "cheese_sandwich",
    type: "single",
    image: "/images/kuta_gà_giòn.jpg",
    priceVariants: [{ id: "only", label: "1 phần", price: 69000 }],
  },
  // ========== NUGGETS & SIDES ==========
  {
    id: "nuggets",
    slug: "nuggets",
    name: "Nuggets (Gà viên - 160g)",
    category: "nuggets_sides",
    type: "single",
    image: "/images/kuta_gà_giòn.jpg",
    priceVariants: [{ id: "only", label: "160g", price: 50000 }],
  },
  {
    id: "box-nuggets-khoai",
    slug: "box-nuggets-khoai",
    name: "Box Nuggets & Khoai",
    description: "1 Gà viên, 1 Khoai S, 1 Sốt chấm",
    category: "nuggets_sides",
    type: "combo",
    image: "/images/kuta_khoai_gà.jpg",
    priceVariants: [{ id: "only", label: "Box", price: 69000 }],
    includes: ["1 Gà viên", "1 Khoai S", "1 Sốt chấm"],
  },
  {
    id: "wapwap-s",
    slug: "wapwap-s",
    name: "Wapwap Snack Size S",
    category: "nuggets_sides",
    type: "single",
    image: "/images/kuta_khoai_gà.jpg",
    priceVariants: [{ id: "s", label: "Size S", price: 16000 }],
  },
  {
    id: "wapwap-m",
    slug: "wapwap-m",
    name: "Wapwap Snack Size M",
    category: "nuggets_sides",
    type: "single",
    image: "/images/kuta_khoai_gà.jpg",
    priceVariants: [{ id: "m", label: "Size M (Tặng sốt Aioli)", price: 30000, note: "Tặng sốt Aioli" }],
  },
  {
    id: "fries-s",
    slug: "fries-s",
    name: "French Fries (Khoai tây chiên) Size S",
    category: "nuggets_sides",
    type: "single",
    image: "/images/kuta_khoai_gà.jpg",
    priceVariants: [{ id: "s", label: "Size S", price: 26000 }],
  },
  {
    id: "fries-m",
    slug: "fries-m",
    name: "French Fries (Khoai tây chiên) Size M",
    category: "nuggets_sides",
    type: "single",
    image: "/images/kuta_khoai_gà.jpg",
    priceVariants: [{ id: "m", label: "Size M", price: 36000 }],
  },
  // ========== SAUCES (add-on) ==========
  {
    id: "sauce-aioli",
    slug: "sauce-aioli",
    name: "Extra Sauces — Aioli (Sốt tỏi)",
    category: "sauces_drinks",
    type: "addon",
    image: "/images/kuta_sốt_aioli.jpg",
    priceVariants: [{ id: "only", label: "+12.000đ", price: 12000 }],
  },
  {
    id: "sauce-bearnaise",
    slug: "sauce-bearnaise",
    name: "Extra Sauces — Bearnaise",
    category: "sauces_drinks",
    type: "addon",
    image: "/images/kuta_sốt_aioli.jpg",
    priceVariants: [{ id: "only", label: "+12.000đ", price: 12000 }],
  },
  {
    id: "sauce-umami",
    slug: "sauce-umami",
    name: "Extra Sauces — Umami Spicy (Sốt cay)",
    category: "sauces_drinks",
    type: "addon",
    image: "/images/kuta_sốt_aioli.jpg",
    priceVariants: [{ id: "only", label: "+12.000đ", price: 12000 }],
  },
  {
    id: "sauce-bbq",
    slug: "sauce-bbq",
    name: "Extra Sauces — BBQ Sauce",
    category: "sauces_drinks",
    type: "addon",
    image: "/images/kuta_sốt_aioli.jpg",
    priceVariants: [{ id: "only", label: "+12.000đ", price: 12000 }],
  },
  {
    id: "sauce-garlic-aioli",
    slug: "sauce-garlic-aioli",
    name: "Extra Sauces — Garlic Aioli (Phiên bản tỏi phi)",
    category: "sauces_drinks",
    type: "addon",
    image: "/images/kuta_sốt_aioli.jpg",
    priceVariants: [{ id: "only", label: "+12.000đ", price: 12000 }],
  },
  // ========== DRINKS ==========
  {
    id: "drink-soft",
    slug: "drink-soft",
    name: "Nước ngọt (Pepsi, Coca-Cola, 7Up)",
    category: "sauces_drinks",
    type: "drink",
    image: "/images/kuta_coca_cánhga.jpg",
    priceVariants: [{ id: "only", label: "1 ly", price: 20000 }],
  },
];

export function getMenuProductsByCategory(category: MenuCategoryId): MenuProduct[] {
  return menuProducts.filter((p) => p.category === category);
}

export function getMenuProductById(id: string): MenuProduct | undefined {
  return menuProducts.find((p) => p.id === id);
}

export function getMenuBestSellers(): MenuProduct[] {
  return menuProducts.filter((p) => p.tags?.includes("best_seller"));
}

