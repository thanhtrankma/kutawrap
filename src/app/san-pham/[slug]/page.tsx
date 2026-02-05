"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useSound } from "@/hooks/useSound";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { playClick } = useSound();

  const [comboId, setComboId] = useState<string | null>(
    product?.comboOptions?.[0]?.id ?? null
  );
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-2xl page-content-backing px-8 py-12 text-center">
          <p className="text-[var(--kuta-text)]/80">Không tìm thấy sản phẩm.</p>
          <Link href="/san-pham" className="mt-4 inline-block font-semibold text-[var(--kuta-accent-neon)]" onClick={playClick}>
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const combo = product.comboOptions?.find((c) => c.id === comboId);
  const basePrice = combo?.price ?? product.price;
  const toppings = (product.toppings ?? []).filter((t) => toppingIds.includes(t.id));
  const toppingTotal = toppings.reduce((s, t) => s + t.price, 0);
  const total = (basePrice + toppingTotal) * qty;

  const handleAddToCart = () => {
    playClick();
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: basePrice + toppingTotal,
        image: product.image,
        comboId: comboId ?? undefined,
        comboName: combo?.name,
        toppingIds: toppingIds.length ? toppingIds : undefined,
        toppingNames: toppings.map((t) => t.name),
      },
      qty
    );
    router.push("/gio-hang");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <Link
        href="/san-pham"
        onClick={playClick}
        className="mb-6 inline-flex items-center gap-2 font-baloo font-semibold text-[var(--kuta-text)]/90 hover:text-[var(--kuta-accent-neon)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Link>

      <div className="rounded-2xl page-content-backing px-6 py-8 md:px-8 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 md:grid-cols-2 md:items-start"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-[var(--kuta-primary-orange)] shadow-[2px_2px_0_0_var(--kuta-primary-orange)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="font-baloo text-3xl font-bold tracking-tight text-[var(--kuta-text)] md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--kuta-text)]/90">
            {product.description}
          </p>

          {product.comboOptions && product.comboOptions.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 inline-block rounded-md border border-[var(--kuta-accent-yellow)] bg-[var(--kuta-accent-yellow)]/20 px-2.5 py-0.5 font-anton text-sm uppercase text-[var(--kuta-primary-teal)]">
                Chọn size / combo
              </p>
              <div className="flex flex-wrap gap-3">
                {product.comboOptions.map((c) => (
                  <motion.button
                    key={c.id}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playClick();
                      setComboId(c.id);
                    }}
                    className={`rounded-lg border-2 px-3 py-2 font-anton text-sm transition-all ${
                      comboId === c.id
                        ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                        : "border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-orange)]/15 text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-orange)]/30"
                    }`}
                  >
                    {c.name} — {c.price.toLocaleString("vi-VN")}₫
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {product.toppings && product.toppings.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 inline-block rounded-md border border-[var(--kuta-accent-yellow)] bg-[var(--kuta-accent-yellow)]/20 px-2.5 py-0.5 font-anton text-sm uppercase text-[var(--kuta-primary-teal)]">
                Thêm topping
              </p>
              <div className="flex flex-wrap gap-3">
                {product.toppings.map((t) => {
                  const on = toppingIds.includes(t.id);
                  return (
                    <motion.button
                      key={t.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        playClick();
                        setToppingIds((prev) =>
                          on ? prev.filter((id) => id !== t.id) : [...prev, t.id]
                        );
                      }}
                      className={`rounded-lg border-2 px-3 py-2 text-sm font-baloo font-semibold transition-all ${
                        on
                          ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-yellow)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                          : "border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-orange)]/15 text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-orange)]/30"
                      }`}
                    >
                      {t.name} +{t.price.toLocaleString("vi-VN")}₫
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <span className="font-baloo font-semibold text-[var(--kuta-text)]">Số lượng</span>
            <div className="flex items-center gap-1 rounded-lg border-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-secondary-teal)] p-1">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setQty((q) => Math.max(1, q - 1));
                }}
                className="rounded-lg bg-[var(--kuta-primary-orange)] px-3 py-1.5 font-anton text-white hover:opacity-90"
              >
                −
              </button>
              <span className="min-w-[2.5rem] text-center font-anton text-lg">{qty}</span>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setQty((q) => q + 1);
                }}
                className="rounded-lg bg-[var(--kuta-primary-orange)] px-3 py-1.5 font-anton text-white hover:opacity-90"
              >
                +
              </button>
            </div>
          </div>

          <p className="mt-6 font-anton text-2xl tabular-nums text-[var(--kuta-accent-yellow)]">
            {total.toLocaleString("vi-VN")}₫
          </p>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] py-4 font-anton text-xl uppercase tracking-wide text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)] md:w-auto md:px-12"
          >
            <ShoppingCart className="h-6 w-6" />
            Chốt đơn
          </motion.button>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
