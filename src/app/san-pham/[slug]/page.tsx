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
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-[var(--text)]/70">Không tìm thấy sản phẩm.</p>
        <Link href="/san-pham" className="mt-4 inline-block text-[var(--red)]">
          ← Quay lại danh sách
        </Link>
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
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]/80 hover:text-[var(--red)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 md:grid-cols-2 md:items-start"
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[var(--red)]">
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
          <h1 className="font-heading text-3xl tracking-tight text-[var(--text)] md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--text)]/85">{product.description}</p>

          {product.comboOptions && product.comboOptions.length > 0 && (
            <div className="mt-8">
              <p className="font-semibold text-[var(--orange)]">Chọn combo / size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.comboOptions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setComboId(c.id);
                    }}
                    className={`rounded-lg border-2 px-4 py-2 font-semibold transition-all ${
                      comboId === c.id
                        ? "border-[var(--red)] bg-[var(--red)] text-white"
                        : "border-[var(--border)] text-[var(--text)] hover:border-[var(--orange)]"
                    }`}
                  >
                    {c.name} — {c.price.toLocaleString("vi-VN")}₫
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.toppings && product.toppings.length > 0 && (
            <div className="mt-8">
              <p className="font-semibold text-[var(--orange)]">Thêm topping</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.toppings.map((t) => {
                  const on = toppingIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        playClick();
                        setToppingIds((prev) =>
                          on ? prev.filter((id) => id !== t.id) : [...prev, t.id]
                        );
                      }}
                      className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                        on
                          ? "border-[var(--orange)] bg-[var(--orange)]/20 text-[var(--orange)]"
                          : "border-[var(--border)] text-[var(--text)] hover:border-[var(--orange)]"
                      }`}
                    >
                      {t.name} +{t.price.toLocaleString("vi-VN")}₫
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <span className="font-semibold text-[var(--text)]">Số lượng</span>
            <div className="flex items-center gap-2 rounded-lg border-2 border-[var(--border)] bg-[var(--bg-soft)] p-1">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setQty((q) => Math.max(1, q - 1));
                }}
                className="rounded bg-[var(--border)] px-3 py-1 font-bold text-white hover:bg-[var(--red)]"
              >
                −
              </button>
              <span className="min-w-[2rem] text-center font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setQty((q) => q + 1);
                }}
                className="rounded bg-[var(--border)] px-3 py-1 font-bold text-white hover:bg-[var(--red)]"
              >
                +
              </button>
            </div>
          </div>

          <p className="mt-6 font-display text-2xl tabular-nums text-[var(--red)]">
            {total.toLocaleString("vi-VN")}₫
          </p>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--red)] py-4 font-display text-xl text-white transition-all glow-hover md:w-auto md:px-12"
          >
            <ShoppingCart className="h-6 w-6" />
            Chốt đơn
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
