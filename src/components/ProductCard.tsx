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
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group h-full"
    >
      <Link
        href={`/san-pham/${product.slug}`}
        onClick={playClick}
        className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-[var(--kuta-primary-teal)]/20 bg-white shadow-md transition-shadow group-hover:shadow-xl group-hover:border-[var(--kuta-primary-teal)]/40"
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--kuta-primary-teal)]/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute bottom-2 left-2 rounded-md border border-[var(--kuta-primary-teal)] bg-[var(--kuta-accent-yellow)] px-2 py-0.5 font-anton text-xs text-[var(--kuta-primary-teal)]">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4">
          <h3 className="font-baloo text-base font-bold leading-tight text-[var(--kuta-text)] group-hover:text-[var(--kuta-primary-teal)] sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--kuta-text)]/90">
            {product.description}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[var(--kuta-accent-neon)]">
            <Plus className="h-3.5 w-3.5" />
            Thêm vào giỏ
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
