"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { CheckCircle2 } from "lucide-react";

export default function ThanhCongPage() {
  const { playClick } = useSound();

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[var(--red)]/20 text-[var(--red)]"
      >
        <CheckCircle2 className="h-14 w-14" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 font-heading text-3xl tracking-wide text-[var(--text)] md:text-4xl"
      >
        ĐẶT HÀNG THÀNH CÔNG
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-[var(--text)]/70"
      >
        Chúng tôi đã nhận đơn và sẽ liên hệ xác nhận sớm. Cảm ơn bạn!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        <Link
          href="/"
          onClick={playClick}
          className="rounded-xl bg-[var(--red)] px-6 py-3 font-semibold text-white hover:bg-[var(--red-soft)]"
        >
          Về trang chủ
        </Link>
        <Link
          href="/san-pham"
          onClick={playClick}
          className="rounded-xl border-2 border-[var(--orange)] px-6 py-3 font-semibold text-[var(--orange)] hover:bg-[var(--orange)]/10"
        >
          Tiếp tục mua
        </Link>
      </motion.div>
    </div>
  );
}
