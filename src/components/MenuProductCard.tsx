"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSound } from "@/hooks/useSound";
import type { MenuProduct } from "@/types/menu";

interface MenuProductCardProps {
  product: MenuProduct;
}

export default function MenuProductCard({ product }: MenuProductCardProps) {
  const { addItem } = useCart();
  const { playClick } = useSound();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.priceVariants[0]?.id ?? "only"
  );

  const variant = product.priceVariants.find((v) => v.id === selectedVariantId);
  const price = variant?.price ?? 0;
  const hasMultipleVariants = product.priceVariants.length > 1;

  const handleAddToCart = () => {
    playClick();
    const displayName =
      hasMultipleVariants && variant
        ? `${product.name} — ${variant.label}`
        : product.name;
    addItem(
      {
        productId: product.id,
        comboId: hasMultipleVariants ? selectedVariantId : undefined,
        name: displayName,
        price,
        image: product.image,
        comboName: variant?.note ?? (hasMultipleVariants ? variant?.label : undefined),
      },
      1
    );
  };

  return (
    <motion.article
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-[var(--kuta-primary-teal)]/20 bg-white shadow-md transition-shadow hover:border-[var(--kuta-primary-teal)]/40 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.tags?.includes("best_seller") && (
          <span className="absolute left-2 top-2 rounded bg-[var(--kuta-primary-orange)] px-2 py-0.5 font-anton text-xs text-white">
            Bán chạy
          </span>
        )}
        <span className="absolute bottom-2 left-2 rounded border border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-yellow)] px-2 py-0.5 font-anton text-xs text-[var(--kuta-primary-teal)]">
          {product.priceVariants.length === 1
            ? `${price.toLocaleString("vi-VN")}₫`
            : `Từ ${Math.min(...product.priceVariants.map((v) => v.price)).toLocaleString("vi-VN")}₫`}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-baloo text-base font-bold leading-tight text-[var(--kuta-text)] sm:text-lg">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-[var(--kuta-text)]/90">
            {product.description}
          </p>
        )}
        {product.includes && product.includes.length > 0 && (
          <ul className="mt-2 space-y-0.5 text-xs text-[var(--kuta-text)]/80">
            {product.includes.map((item, i) => (
              <li key={i} className="flex items-center gap-1">
                <span className="text-[var(--kuta-primary-teal)]">•</span>
                {item}
              </li>
            ))}
          </ul>
        )}
        {hasMultipleVariants && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.priceVariants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedVariantId(v.id);
                }}
                className={`rounded-lg border-2 px-2.5 py-1 text-xs font-baloo transition-all ${
                  selectedVariantId === v.id
                    ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)]"
                    : "border-[var(--kuta-primary-orange)]/30 bg-[var(--kuta-bg-orange-soft)] text-[var(--kuta-text)] hover:border-[var(--kuta-primary-orange)]"
                }`}
              >
                {v.label}
                {v.price > 0 && ` — ${v.price.toLocaleString("vi-VN")}₫`}
              </button>
            ))}
          </div>
        )}
        <div className="mt-auto pt-3">
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] py-2.5 font-baloo text-sm font-semibold text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)] transition-all hover:shadow-[1px_1px_0_0_var(--kuta-primary-teal)]"
          >
            <Plus className="h-4 w-4" />
            Thêm vào giỏ
            {hasMultipleVariants && variant && (
              <span className="tabular-nums">
                — {(variant.price * 1).toLocaleString("vi-VN")}₫
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
