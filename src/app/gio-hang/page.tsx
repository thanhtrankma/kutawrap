"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useSound } from "@/hooks/useSound";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function GioHangPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();
  const { playClick } = useSound();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-2xl page-content-backing px-8 py-12 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-[var(--kuta-secondary-cyan)]" />
          <h2 className="mt-4 font-baloo text-2xl font-bold text-[var(--kuta-text)]">
            Giỏ hàng trống
          </h2>
          <p className="mt-2 text-[var(--kuta-text)]/80">
            Thêm món ngon rồi quay lại nhé.
          </p>
          <Link
            href="/san-pham"
            onClick={playClick}
            className="mt-6 inline-block rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] px-6 py-3 font-anton text-lg uppercase text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="rounded-2xl page-content-backing px-6 py-8 md:px-8 md:py-10">
      <div className="mb-3 inline-block rounded-r-lg border-l-4 border-[var(--kuta-primary-teal)] bg-white px-4 py-1.5 shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-anton text-2xl uppercase tracking-wide text-[var(--kuta-text)] md:text-3xl"
        >
          Giỏ hàng
        </motion.h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((i, idx) => {
            const key = `${i.productId}-${i.comboId ?? "base"}`;
            return (
              <motion.li
                key={key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex gap-4 rounded-xl border-2 border-[var(--kuta-primary-teal)]/25 bg-white p-4 shadow-sm"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[var(--kuta-primary-teal)]">
                  <Image
                    src={i.image}
                    alt={i.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-baloo font-bold text-[var(--kuta-text)]">{i.name}</h3>
                  {i.comboName && (
                    <p className="text-sm text-[var(--kuta-accent-yellow)]">{i.comboName}</p>
                  )}
                  {i.toppingNames?.length ? (
                    <p className="text-xs text-[var(--kuta-text)]/70">
                      + {i.toppingNames.join(", ")}
                    </p>
                  ) : null}
                  <p className="mt-1 font-anton text-base tabular-nums text-[var(--kuta-accent-yellow)]">
                    {(i.price * i.quantity).toLocaleString("vi-VN")}₫
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      removeItem(i.productId, i.comboId);
                    }}
                    className="rounded p-1 text-[var(--kuta-text)]/70 hover:bg-[var(--kuta-secondary-red)] hover:text-white"
                    aria-label="Xóa"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-1 rounded-lg border border-[var(--kuta-primary-teal)]/50 bg-[var(--kuta-bg-teal-soft)] p-1">
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        updateQuantity(i.productId, Math.max(0, i.quantity - 1), i.comboId);
                      }}
                      className="rounded p-1 text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-teal)]/30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[1.5rem] text-center font-anton text-sm">
                      {i.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        updateQuantity(i.productId, i.quantity + 1, i.comboId);
                      }}
                      className="rounded p-1 text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-teal)]/30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-fit rounded-xl border-2 border-[var(--kuta-primary-teal)]/25 bg-white p-6 shadow-sm"
        >
          <p className="flex justify-between text-[var(--kuta-text)]">
            <span>Tạm tính ({count} món)</span>
            <span className="font-anton text-xl tabular-nums text-[var(--kuta-primary-teal)]">
              {total.toLocaleString("vi-VN")}₫
            </span>
          </p>
          <Link
            href="/thanh-toan"
            onClick={playClick}
            className="mt-6 block w-full rounded-xl border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] py-4 text-center font-anton text-lg uppercase text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
          >
            Thanh toán
          </Link>
          <Link
            href="/san-pham"
            onClick={playClick}
            className="mt-3 block text-center text-sm text-[var(--kuta-text)]/80 hover:text-[var(--kuta-accent-neon)]"
          >
            Tiếp tục mua
          </Link>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
