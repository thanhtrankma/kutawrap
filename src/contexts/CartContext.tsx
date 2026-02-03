"use client";

import React, { createContext, useContext, useReducer, useMemo } from "react";
import type { CartItem, CartState } from "@/types/cart";

type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { productId: string; comboId?: string } }
  | { type: "UPDATE_QTY"; payload: { productId: string; quantity: number; comboId?: string } }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  const key = (p: CartItem) => `${p.productId}-${p.comboId ?? "base"}`;
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const k = key(item);
      const existing = state.find((i) => key(i) === k);
      if (existing) {
        return state.map((i) =>
          key(i) === k ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...state, { ...item, quantity: item.quantity || 1 }];
    }
    case "REMOVE":
      return state.filter(
        (i) =>
          !(i.productId === action.payload.productId && (i.comboId ?? "base") === (action.payload.comboId ?? "base"))
      );
    case "UPDATE_QTY": {
      const { productId, quantity, comboId } = action.payload;
      if (quantity <= 0) return state.filter((i) => !(i.productId === productId && (i.comboId ?? "base") === (comboId ?? "base")));
      return state.map((i) =>
        i.productId === productId && (i.comboId ?? "base") === (comboId ?? "base")
          ? { ...i, quantity }
          : i
      );
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addItem: CartState["addItem"] = (item, quantity = 1) => {
    dispatch({ type: "ADD", payload: { ...item, quantity } });
  };

  const removeItem: CartState["removeItem"] = (productId, comboId) => {
    dispatch({ type: "REMOVE", payload: { productId, comboId } });
  };

  const updateQuantity: CartState["updateQuantity"] = (productId, quantity, comboId) => {
    dispatch({ type: "UPDATE_QTY", payload: { productId, quantity, comboId } });
  };

  const clearCart = () => dispatch({ type: "CLEAR" });

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((c, i) => c + i.quantity, 0), [items]);

  const value: CartState = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      count,
    }),
    [items, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
