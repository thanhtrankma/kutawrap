"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSound } from "@/hooks/useSound";
import {
  WRAP_PROTEIN_OPTIONS,
  WRAP_SIZE_PRICES,
  WRAP_MOZZARELLA_OPTIONS,
} from "@/data/menu";

const WRAP_IMAGE = "/images/kuta_gà_giòn.jpg";

export default function CreateYourWrapConfigurator() {
  const { addItem } = useCart();
  const { playClick } = useSound();
  const [proteinId, setProteinId] = useState<string>(WRAP_PROTEIN_OPTIONS[0].id);
  const [sizeId, setSizeId] = useState<string>(WRAP_SIZE_PRICES[0].id);
  const [mozzarellaId, setMozzarellaId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const protein = WRAP_PROTEIN_OPTIONS.find((p) => p.id === proteinId);
  const sizePrice = WRAP_SIZE_PRICES.find((s) => s.id === sizeId);
  const mozzarella = mozzarellaId
    ? WRAP_MOZZARELLA_OPTIONS.find((m) => m.id === mozzarellaId)
    : null;

  const totalPrice = useMemo(() => {
    let p = sizePrice?.price ?? 0;
    if (mozzarella) p += mozzarella.price;
    return p;
  }, [sizePrice, mozzarella]);

  const displayName = useMemo(() => {
    const sizeLabel = WRAP_SIZE_PRICES.find((s) => s.id === sizeId)?.label ?? "";
    const proteinName = protein?.name ?? "";
    const mozText = mozzarella ? ` (+${mozzarella.label} Mozzarella)` : "";
    return `Create Your Own Wrap — ${sizeLabel} — ${proteinName}${mozText}`;
  }, [sizeId, protein, mozzarella]);

  const comboId = useMemo(() => {
    let id = `${sizeId}-${proteinId}`;
    if (mozzarellaId) id += `-${mozzarellaId}moz`;
    return id;
  }, [sizeId, proteinId, mozzarellaId]);

  const handleAddToCart = () => {
    playClick();
    addItem(
      {
        productId: "create-wrap",
        comboId,
        name: displayName,
        price: totalPrice,
        image: WRAP_IMAGE,
        comboName: `${sizePrice?.label ?? ""} · ${protein?.name ?? ""}${mozzarella ? ` · +${mozzarella.label} Mozzarella` : ""}`,
      },
      qty
    );
  }

  return (
    <section
      id="create_wrap"
      className="scroll-mt-24 rounded-2xl border-2 border-[var(--kuta-primary-orange)] bg-white p-6 shadow-lg md:p-8"
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-anton text-2xl uppercase tracking-wide text-[var(--kuta-primary-teal)] md:text-3xl">
            Create Your Own Wrap
          </h2>
          <p className="mt-1 text-sm text-[var(--kuta-text)]/90">
            Chọn nhân, size và thêm Mozzarella theo ý bạn
          </p>
        </div>
        <div className="relative h-32 w-40 shrink-0 overflow-hidden rounded-xl border-2 border-[var(--kuta-primary-teal)]/30 md:h-28 md:w-36">
          <Image
            src={WRAP_IMAGE}
            alt="Wrap"
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <p className="mb-2 font-baloo font-semibold text-[var(--kuta-text)]">
              Chọn nhân
            </p>
            <div className="flex flex-wrap gap-2">
              {WRAP_PROTEIN_OPTIONS.map((p) => (
                <motion.button
                  key={p.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playClick();
                    setProteinId(p.id);
                  }}
                  className={`rounded-lg border-2 px-4 py-2.5 text-left font-baloo text-sm transition-all ${
                    proteinId === p.id
                      ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                      : "border-[var(--kuta-primary-orange)]/40 bg-[var(--kuta-bg-orange-soft)] text-[var(--kuta-text)] hover:border-[var(--kuta-primary-orange)]"
                  }`}
                >
                  {p.name}
                  {p.nameEn && (
                    <span className="ml-1 text-xs opacity-80">({p.nameEn})</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-baloo font-semibold text-[var(--kuta-text)]">
              Chọn size
            </p>
            <div className="flex flex-wrap gap-2">
              {WRAP_SIZE_PRICES.map((s) => (
                <motion.button
                  key={s.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playClick();
                    setSizeId(s.id);
                  }}
                  className={`rounded-lg border-2 px-4 py-2.5 font-baloo text-sm transition-all ${
                    sizeId === s.id
                      ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                      : "border-[var(--kuta-primary-orange)]/40 bg-[var(--kuta-bg-orange-soft)] text-[var(--kuta-text)] hover:border-[var(--kuta-primary-orange)]"
                  }`}
                >
                  {s.label} — {s.price.toLocaleString("vi-VN")}₫
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-baloo font-semibold text-[var(--kuta-text)]">
              Thêm Mozzarella (tùy chọn)
            </p>
            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playClick();
                  setMozzarellaId(null);
                }}
                className={`rounded-lg border-2 px-4 py-2.5 font-baloo text-sm transition-all ${
                  mozzarellaId === null
                    ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                    : "border-[var(--kuta-primary-orange)]/40 bg-[var(--kuta-bg-orange-soft)] text-[var(--kuta-text)] hover:border-[var(--kuta-primary-orange)]"
                }`}
              >
                Không thêm
              </motion.button>
              {WRAP_MOZZARELLA_OPTIONS.map((m) => (
                <motion.button
                  key={m.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playClick();
                    setMozzarellaId(m.id);
                  }}
                  className={`rounded-lg border-2 px-4 py-2.5 font-baloo text-sm transition-all ${
                    mozzarellaId === m.id
                      ? "border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
                      : "border-[var(--kuta-primary-orange)]/40 bg-[var(--kuta-bg-orange-soft)] text-[var(--kuta-text)] hover:border-[var(--kuta-primary-orange)]"
                  }`}
                >
                  {m.label} — +{m.price.toLocaleString("vi-VN")}₫
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border-2 border-[var(--kuta-primary-teal)]/25 bg-[var(--kuta-bg-teal-soft)] p-5">
          <div>
            <p className="font-baloo font-semibold text-[var(--kuta-text)]">
              Tóm tắt
            </p>
            <p className="mt-1 text-sm text-[var(--kuta-text)]/90">{displayName}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-baloo text-[var(--kuta-text)]">Số lượng</span>
              <div className="flex items-center gap-1 rounded-lg border-2 border-[var(--kuta-primary-orange)] bg-white p-1">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setQty((n) => Math.max(1, n - 1));
                  }}
                  className="rounded-md bg-[var(--kuta-primary-orange)] px-2.5 py-1 font-anton text-white hover:opacity-90"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center font-anton">{qty}</span>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setQty((n) => n + 1);
                  }}
                  className="rounded-md bg-[var(--kuta-primary-orange)] px-2.5 py-1 font-anton text-white hover:opacity-90"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <p className="mt-4 font-anton text-2xl tabular-nums text-[var(--kuta-primary-teal)]">
            {(totalPrice * qty).toLocaleString("vi-VN")}₫
          </p>
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] py-3.5 font-anton text-lg uppercase tracking-wide text-[var(--kuta-primary-teal)] shadow-[4px_4px_0_0_var(--kuta-primary-teal)]"
          >
            <ShoppingCart className="h-5 w-5" />
            Thêm vào giỏ
          </motion.button>
        </div>
      </div>
    </section>
  );
}
