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
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-[var(--border)]" />
        <h2 className="mt-4 font-heading text-2xl tracking-wide text-[var(--text)]">
          Giỏ hàng trống
        </h2>
        <p className="mt-2 text-[var(--text)]/70">
          Thêm món ngon rồi quay lại nhé.
        </p>
        <Link
          href="/san-pham"
          onClick={playClick}
          className="mt-6 inline-block rounded-lg bg-[var(--red)] px-6 py-3 font-semibold text-white"
        >
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="mb-2 inline-block rounded-r-lg border-l-4 border-[var(--red)] bg-[var(--bg-soft)] pl-4 pr-4 py-1">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl tracking-wide text-[var(--text)] md:text-4xl"
        >
          GIỎ <span className="text-[var(--red)]">HÀNG</span>
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
                className="flex gap-4 rounded-xl border-2 border-[var(--border)] bg-[var(--bg-soft)] p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={i.image}
                    alt={i.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[var(--text)]">{i.name}</h3>
                  {i.comboName && (
                    <p className="text-sm text-[var(--orange)]">{i.comboName}</p>
                  )}
                  {i.toppingNames?.length ? (
                    <p className="text-xs text-[var(--text)]/60">
                      + {i.toppingNames.join(", ")}
                    </p>
                  ) : null}
                  <p className="mt-1 font-display text-base text-[var(--red)] tabular-nums">
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
                    className="rounded p-1 text-[var(--text)]/60 hover:bg-[var(--red)] hover:text-white"
                    aria-label="Xóa"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-1">
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        updateQuantity(i.productId, Math.max(0, i.quantity - 1), i.comboId);
                      }}
                      className="rounded p-1 text-[var(--text)] hover:bg-[var(--border)]"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                      {i.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        updateQuantity(i.productId, i.quantity + 1, i.comboId);
                      }}
                      className="rounded p-1 text-[var(--text)] hover:bg-[var(--border)]"
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
          className="h-fit rounded-xl border-2 border-[var(--red)] bg-[var(--bg-soft)] p-6"
        >
          <p className="flex justify-between text-[var(--text)]">
            <span>Tạm tính ({count} món)</span>
            <span className="font-display text-xl tabular-nums text-[var(--red)]">
              {total.toLocaleString("vi-VN")}₫
            </span>
          </p>
          <Link
            href="/thanh-toan"
            onClick={playClick}
            className="mt-6 block w-full rounded-xl border-2 border-[var(--red)] bg-[var(--red)] py-4 text-center font-display text-lg text-white transition-all hover:bg-[var(--red-soft)] glow-hover"
          >
            Thanh toán
          </Link>
          <Link
            href="/san-pham"
            onClick={playClick}
            className="mt-3 block text-center text-sm text-[var(--text)]/70 hover:text-[var(--orange)]"
          >
            Tiếp tục mua
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
