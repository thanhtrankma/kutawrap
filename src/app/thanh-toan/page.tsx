"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useSound } from "@/hooks/useSound";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Copy, Check } from "lucide-react";

function generateOrderCode(): string {
  const now = new Date();
  const d = now.toISOString().slice(0, 10).replace(/-/g, "");
  const t = now.toTimeString().slice(0, 5).replace(":", "");
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KUTA-${d}-${t}-${r}`;
}

type Step = 1 | 2;

export default function ThanhToanPage() {
  const { items, total, clearCart } = useCart();
  const { playClick } = useSound();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [confirmedTransfer, setConfirmedTransfer] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-2xl page-content-backing px-8 py-12 text-center">
          <p className="text-[var(--kuta-text)]/80">Giỏ hàng trống. Thêm món rồi thanh toán nhé.</p>
          <Link
            href="/san-pham"
            onClick={playClick}
            className="mt-4 inline-block font-semibold text-[var(--kuta-accent-neon)]"
          >
            ← Xem sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const goToStep2 = () => {
    playClick();
    setError("");
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Vui lòng điền đầy đủ Họ tên, SĐT và Địa chỉ.");
      return;
    }
    setOrderCode(generateOrderCode());
    setStep(2);
  };

  const copyOrderCode = () => {
    playClick();
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async () => {
    playClick();
    setError("");
    if (!transactionCode.trim()) {
      setError("Vui lòng nhập Mã giao dịch / Mã tham chiếu sau khi chuyển khoản.");
      return;
    }
    if (!confirmedTransfer) {
      setError("Vui lòng xác nhận bạn đã chuyển khoản đúng số tiền và nội dung.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/notify-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode,
          transactionCode: transactionCode.trim(),
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
        href={step === 1 ? "/gio-hang" : "#"}
        onClick={() => {
          playClick();
          if (step === 2) setStep(1);
        }}
        className="mb-6 inline-flex items-center gap-2 font-baloo font-semibold text-[var(--kuta-text)]/90 hover:text-[var(--kuta-accent-neon)]"
      >
        <ArrowLeft className="h-4 w-4" />
        {step === 1 ? "Quay lại giỏ hàng" : "Quay lại sửa thông tin"}
      </Link>

      <div className="rounded-2xl page-content-backing px-6 py-8 md:px-8 md:py-10">
      <div className="mb-3 inline-block rounded-r-lg border-l-4 border-[var(--kuta-primary-teal)] bg-white px-4 py-1.5 shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-anton text-2xl uppercase tracking-wide text-[var(--kuta-text)] md:text-3xl"
        >
          Thanh toán {step === 2 && "— Chuyển khoản"}
        </motion.h1>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-8 space-y-6 rounded-xl border-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-secondary-teal)] p-6 shadow-[2px_2px_0_0_var(--kuta-primary-orange)]"
          >
            <p className="text-sm text-[var(--kuta-text)]/90">
              Bước 1 — Điền thông tin giao hàng. Sau đó bạn sẽ chuyển khoản và xác nhận để hoàn tất đơn.
            </p>
            <div>
              <label htmlFor="name" className="block font-baloo font-semibold text-[var(--kuta-text)]">
                Họ tên *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="mt-2 w-full rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-primary-teal)]/50 px-4 py-3 text-[var(--kuta-text)] placeholder:text-[var(--kuta-text)]/50 focus:border-[var(--kuta-accent-neon)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-baloo font-semibold text-[var(--kuta-text)]">
                Số điện thoại *
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0900 123 456"
                className="mt-2 w-full rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-primary-teal)]/50 px-4 py-3 text-[var(--kuta-text)] placeholder:text-[var(--kuta-text)]/50 focus:border-[var(--kuta-accent-neon)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="address" className="block font-baloo font-semibold text-[var(--kuta-text)]">
                Địa chỉ giao hàng *
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Số nhà, đường, quận, TP"
                className="mt-2 w-full rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-primary-teal)]/50 px-4 py-3 text-[var(--kuta-text)] placeholder:text-[var(--kuta-text)]/50 focus:border-[var(--kuta-accent-neon)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="note" className="block font-baloo font-semibold text-[var(--kuta-text)]">
                Ghi chú
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Giao giờ trưa, không hành..."
                rows={2}
                className="mt-2 w-full rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-primary-teal)]/50 px-4 py-3 text-[var(--kuta-text)] placeholder:text-[var(--kuta-text)]/50 focus:border-[var(--kuta-accent-neon)] focus:outline-none"
              />
            </div>
            <div className="rounded-lg border-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-teal)]/50 p-4">
              <p className="font-baloo font-semibold text-[var(--kuta-text)]">Tạm tính ({items.length} món)</p>
              <p className="mt-2 font-anton text-2xl tabular-nums text-[var(--kuta-accent-yellow)]">
                {total.toLocaleString("vi-VN")}₫
              </p>
            </div>
            {error && (
              <p className="rounded-lg bg-[var(--kuta-secondary-red)]/30 px-4 py-2 text-sm text-[var(--kuta-accent-cream)]">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={goToStep2}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] py-4 font-anton text-lg uppercase text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)]"
            >
              Tiếp tục → Chuyển khoản
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-8 space-y-6"
          >
            <div className="rounded-xl border-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-secondary-teal)] p-6 shadow-[2px_2px_0_0_var(--kuta-primary-orange)]">
              <p className="mb-4 text-sm font-semibold text-[var(--kuta-accent-yellow)]">
                Bước 2 — Chuyển khoản đúng số tiền, ghi nội dung mã đơn. Sau khi chuyển, nhập mã giao dịch và xác nhận.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="relative shrink-0 overflow-hidden rounded-xl border-2 border-[var(--kuta-primary-teal)] bg-white p-2">
                  <Image
                    src="/images/QR_code.JPG"
                    alt="QR Code chuyển khoản"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <p className="font-anton text-xl text-[var(--kuta-text)]">
                    Số tiền: <span className="text-[var(--kuta-accent-yellow)]">{total.toLocaleString("vi-VN")}₫</span>
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-[var(--kuta-text)]/90">Nội dung chuyển khoản (bắt buộc):</p>
                    <div className="mt-1 flex items-center gap-2 rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-primary-teal)]/30 px-3 py-2">
                      <code className="flex-1 font-mono text-sm font-bold text-[var(--kuta-accent-neon)]">
                        {orderCode}
                      </code>
                      <button
                        type="button"
                        onClick={copyOrderCode}
                        className="rounded p-1.5 text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-orange)]"
                        title="Sao chép"
                      >
                        {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-[var(--kuta-text)]/70">
                      Ghi chính xác mã này vào nội dung chuyển khoản để cửa hàng đối chiếu.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[var(--kuta-primary-orange)] bg-[var(--kuta-secondary-teal)] p-6 shadow-[2px_2px_0_0_var(--kuta-primary-orange)]">
              <label htmlFor="txn" className="block font-baloo font-semibold text-[var(--kuta-text)]">
                Mã giao dịch / Mã tham chiếu *
              </label>
              <p className="mt-1 text-xs text-[var(--kuta-text)]/70">
                Sau khi chuyển khoản, app ngân hàng sẽ hiển thị mã giao dịch hoặc mã tham chiếu. Nhập vào đây để cửa hàng xác nhận đã nhận tiền.
              </p>
              <input
                id="txn"
                type="text"
                value={transactionCode}
                onChange={(e) => setTransactionCode(e.target.value)}
                placeholder="VD: FT24031234567890 hoặc 1234567890"
                className="mt-2 w-full rounded-lg border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-primary-teal)]/50 px-4 py-3 font-mono text-[var(--kuta-text)] placeholder:text-[var(--kuta-text)]/50 focus:border-[var(--kuta-accent-neon)] focus:outline-none"
              />
              <label className="mt-4 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={confirmedTransfer}
                  onChange={(e) => setConfirmedTransfer(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-2 border-[var(--kuta-primary-teal)] accent-[var(--kuta-accent-neon)]"
                />
                <span className="text-sm text-[var(--kuta-text)]/95">
                  Tôi đã chuyển khoản đúng số tiền <strong>{total.toLocaleString("vi-VN")}₫</strong> và nội dung chuyển khoản là mã đơn <strong>{orderCode}</strong>. Tôi hiểu đơn hàng chỉ được xử lý sau khi cửa hàng xác nhận đã nhận tiền.
                </span>
              </label>
            </div>

            {error && (
              <p className="rounded-lg bg-[var(--kuta-secondary-red)]/30 px-4 py-2 text-sm text-[var(--kuta-accent-cream)]">
                {error}
              </p>
            )}

            <motion.button
              type="button"
              disabled={loading}
              onClick={handleConfirmPayment}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] py-4 font-anton text-xl uppercase text-[var(--kuta-primary-teal)] shadow-[2px_2px_0_0_var(--kuta-primary-teal)] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                "Xác nhận đã chuyển khoản — Gửi đơn"
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
