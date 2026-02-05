"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { CheckCircle2 } from "lucide-react";

export default function ThanhCongPage() {
  const { playClick } = useSound();

  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <div className="rounded-2xl page-content-backing px-8 py-12 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-[var(--kuta-accent-neon)] bg-[var(--kuta-accent-neon)]/20 text-[var(--kuta-accent-neon)]"
      >
        <CheckCircle2 className="h-14 w-14" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 font-anton text-3xl uppercase tracking-wide text-[var(--kuta-text)] md:text-4xl"
      >
        Đặt hàng thành công
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-[var(--kuta-text)]/90"
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
          className="rounded-xl border-4 border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-neon)] px-6 py-3 font-anton text-lg uppercase text-[var(--kuta-primary-teal)] shadow-[4px_4px_0_0_var(--kuta-primary-teal)]"
        >
          Về trang chủ
        </Link>
        <Link
          href="/san-pham"
          onClick={playClick}
          className="rounded-xl border-4 border-[var(--kuta-primary-orange)] bg-[var(--kuta-primary-orange)]/30 px-6 py-3 font-baloo font-semibold text-[var(--kuta-text)] hover:bg-[var(--kuta-primary-orange)]/50"
        >
          Tiếp tục mua
        </Link>
      </motion.div>
      </div>
    </div>
  );
}
