"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { playClick } = useSound();

  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link
        href={`/san-pham/${product.slug}`}
        onClick={playClick}
        className="block overflow-hidden rounded-xl border-2 border-[var(--border)] bg-[var(--bg-soft)] transition-all duration-300 group-hover:border-[var(--red)] group-hover:shadow-[0_4px_16px_rgba(196,92,106,0.25)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute bottom-3 left-3 rounded-md border-2 border-white/30 bg-[var(--red)] px-2.5 py-1 font-display text-sm font-bold text-white shadow-lg">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg tracking-tight text-[var(--text)] group-hover:text-[var(--red)]">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--text)]/75">
            {product.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--orange)] tabular-nums">
            <Plus className="h-4 w-4" />
            Thêm vào giỏ
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
