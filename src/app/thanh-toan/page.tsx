"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useSound } from "@/hooks/useSound";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ThanhToanPage() {
  const { items, total, clearCart } = useCart();
  const { playClick } = useSound();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-[var(--text)]/70">Giỏ hàng trống. Thêm món rồi thanh toán nhé.</p>
        <Link
          href="/san-pham"
          onClick={playClick}
          className="mt-4 inline-block text-[var(--red)]"
        >
          ← Xem sản phẩm
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setError("");
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Vui lòng điền đầy đủ Họ tên, SĐT và Địa chỉ.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/notify-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          note: note.trim(),
          items: items.map((i) => ({
            name: i.name,
            comboName: i.comboName,
            toppingNames: i.toppingNames,
            quantity: i.quantity,
            price: i.price,
          })),
          total,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Gửi đơn thất bại.");
      clearCart();
      router.push("/thanh-toan/thanh-cong");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra. Thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <Link
        href="/gio-hang"
        onClick={playClick}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]/80 hover:text-[var(--red)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại giỏ hàng
      </Link>

      <div className="mb-2 inline-block rounded-r-lg border-l-4 border-[var(--red)] bg-[var(--bg-soft)] pl-4 pr-4 py-1">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl tracking-wide text-[var(--text)] md:text-4xl"
        >
          THANH <span className="text-[var(--red)]">TOÁN</span>
        </motion.h1>
      </div>
      <p className="mt-2 text-sm text-[var(--text)]/75 md:text-base">
        Điền thông tin — chúng tôi sẽ liên hệ xác nhận đơn.
      </p>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-xl border-2 border-[var(--border)] bg-[var(--bg-soft)] p-6"
      >
        <div>
          <label htmlFor="name" className="block font-semibold text-[var(--text)]">
            Họ tên *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="mt-2 w-full rounded-lg border-2 border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text)]/50 focus:border-[var(--red)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-semibold text-[var(--text)]">
            Số điện thoại *
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0900 123 456"
            className="mt-2 w-full rounded-lg border-2 border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text)]/50 focus:border-[var(--red)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="address" className="block font-semibold text-[var(--text)]">
            Địa chỉ giao hàng *
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Số nhà, đường, quận, TP"
            className="mt-2 w-full rounded-lg border-2 border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text)]/50 focus:border-[var(--red)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="note" className="block font-semibold text-[var(--text)]">
            Ghi chú
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Giao giờ trưa, không hành..."
            rows={3}
            className="mt-2 w-full rounded-lg border-2 border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text)]/50 focus:border-[var(--red)] focus:outline-none"
          />
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4">
          <p className="font-semibold text-[var(--text)]">Đơn hàng ({items.length} món)</p>
          <p className="mt-2 font-display text-2xl tabular-nums text-[var(--red)]">
            {total.toLocaleString("vi-VN")}₫
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-[var(--red)]/20 px-4 py-2 text-sm text-[var(--red)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          onClick={playClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--red)] py-4 font-display text-xl text-white transition-all hover:bg-[var(--red-soft)] disabled:opacity-60 glow-hover"
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Đang gửi...
            </>
          ) : (
            "Thanh toán"
          )}
        </button>
      </motion.form>
    </div>
  );
}
