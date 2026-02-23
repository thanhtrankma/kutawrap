/** Id nhóm menu — dùng cho nav và section */
export type MenuCategoryId =
  | "create_wrap"
  | "combo_wrap"
  | "wings"
  | "cheese_sandwich"
  | "nuggets_sides"
  | "sauces_drinks";

/** Loại món: đơn, combo, cấu hình (wrap), add-on, nước */
export type MenuProductType = "single" | "combo" | "configurable" | "addon" | "drink";

export interface PriceVariant {
  id: string;
  label: string;
  price: number;
  note?: string;
}

export interface MenuProduct {
  id: string;
  slug: string;
  name: string;
  description?: string;
  category: MenuCategoryId;
  type: MenuProductType;
  image: string;
  /** Giá cố định hoặc nhiều biến thể (size, option) */
  priceVariants: PriceVariant[];
  /** Combo: mô tả chi tiết gồm gì (vd: "1 Wrap S, 1 Gà viên, 1 Nước") */
  includes?: string[];
  /** Configurable: các lựa chọn (vd: nhân Wrap: Bò băm, Gà giòn...) */
  options?: { id: string; name: string; nameEn?: string }[];
  /** Tag hiển thị: best_seller, spicy... */
  tags?: string[];
}

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  shortLabel?: string;
  description?: string;
}
