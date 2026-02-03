export type ProductCategory = "ga-ran" | "khoai-tay" | "combo" | "nuoc" | "trang-mien";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  bestSeller?: boolean;
  comboOptions?: { id: string; name: string; price: number }[];
  toppings?: { id: string; name: string; price: number }[];
}

export const categories: { id: ProductCategory; label: string }[] = [
  { id: "ga-ran", label: "Gà rán" },
  { id: "khoai-tay", label: "Khoai tây" },
  { id: "combo", label: "Combo" },
  { id: "nuoc", label: "Nước" },
  { id: "trang-mien", label: "Tráng miệng" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Gà giòn cay sốt đặc biệt",
    slug: "ga-gion-cay-sot-dac-biet",
    category: "ga-ran",
    price: 45000,
    image: "/images/kuta_gà_giòn.jpg",
    description: "Gà tẩm bột giòn rụm, sốt cay đặc biệt. Một miếng là ghiền.",
    bestSeller: true,
    comboOptions: [
      { id: "c1", name: "1 miếng", price: 45000 },
      { id: "c2", name: "2 miếng", price: 85000 },
      { id: "c3", name: "3 miếng + khoai", price: 120000 },
    ],
    toppings: [
      { id: "t1", name: "Thêm sốt phô mai", price: 10000 },
      { id: "t2", name: "Thêm sốt cay", price: 5000 },
    ],
  },
  {
    id: "2",
    name: "Gà sốt mật ong",
    slug: "ga-sot-mat-ong",
    category: "ga-ran",
    price: 49000,
    image: "/images/kuta_gagion_canhga.jpg",
    description: "Gà chiên vàng ươm, phủ sốt mật ong thơm lừng.",
    bestSeller: true,
    comboOptions: [
      { id: "c1", name: "1 miếng", price: 49000 },
      { id: "c2", name: "2 miếng", price: 92000 },
    ],
    toppings: [
      { id: "t1", name: "Thêm sốt phô mai", price: 10000 },
    ],
  },
  {
    id: "3",
    name: "Khoai tây chiên giòn",
    slug: "khoai-tay-chien-gion",
    category: "khoai-tay",
    price: 25000,
    image: "/images/kuta_khoai_gà.jpg",
    description: "Khoai tây cắt lát, chiên giòn rụm, rắc gia vị đặc trưng.",
    bestSeller: true,
    comboOptions: [
      { id: "s", name: "Size S", price: 25000 },
      { id: "m", name: "Size M", price: 35000 },
      { id: "l", name: "Size L", price: 45000 },
    ],
    toppings: [
      { id: "t1", name: "Sốt phô mai", price: 10000 },
      { id: "t2", name: "Sốt tắc", price: 5000 },
    ],
  },
  {
    id: "4",
    name: "Khoai tây lắc phô mai",
    slug: "khoai-tay-lac-pho-mai",
    category: "khoai-tay",
    price: 35000,
    image: "/images/kuta_sốt_aioli.jpg",
    description: "Khoai chiên + bột phô mai lắc đều. Ăn là nghiện.",
    comboOptions: [
      { id: "s", name: "Size S", price: 35000 },
      { id: "m", name: "Size M", price: 45000 },
    ],
    toppings: [],
  },
  {
    id: "5",
    name: "Combo 1 người no nê",
    slug: "combo-1-nguoi",
    category: "combo",
    price: 65000,
    image: "/images/kuta_canhga_banh.jpg",
    description: "1 gà + khoai M + nước. Combo tiết kiệm cho dân đường phố.",
    bestSeller: true,
    comboOptions: [{ id: "only", name: "Combo chuẩn", price: 65000 }],
    toppings: [],
  },
  {
    id: "6",
    name: "Combo đôi",
    slug: "combo-doi",
    category: "combo",
    price: 120000,
    image: "/images/kuta_canhganuong.jpg",
    description: "2 gà + 2 khoai M + 2 nước. Đi đôi cho đủ.",
    comboOptions: [{ id: "only", name: "Combo đôi", price: 120000 }],
    toppings: [],
  },
  {
    id: "7",
    name: "Trà chanh",
    slug: "tra-chanh",
    category: "nuoc",
    price: 15000,
    image: "/images/kuta_coca_cánhga.jpg",
    description: "Trà chanh mát lạnh, giải nhiệt ngày nắng.",
    comboOptions: [
      { id: "s", name: "Size M", price: 15000 },
      { id: "l", name: "Size L", price: 20000 },
    ],
    toppings: [],
  },
  {
    id: "8",
    name: "Soda dâu",
    slug: "soda-dau",
    category: "nuoc",
    price: 18000,
    image: "/images/kuta_coca_cánhga.jpg",
    description: "Soda dâu chua ngọt, bùng nổ vị giác.",
    comboOptions: [
      { id: "s", name: "Size M", price: 18000 },
      { id: "l", name: "Size L", price: 22000 },
    ],
    toppings: [],
  },
  {
    id: "9",
    name: "Bánh tráng trộn",
    slug: "banh-trang-tron",
    category: "trang-mien",
    price: 20000,
    image: "/images/kuta_bánh.jpg",
    description: "Bánh tráng trộn đủ topping. Món vặt không thể thiếu.",
    comboOptions: [{ id: "only", name: "1 phần", price: 20000 }],
    toppings: [
      { id: "t1", name: "Thêm trứng cút", price: 5000 },
      { id: "t2", name: "Thêm khô bò", price: 10000 },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}
