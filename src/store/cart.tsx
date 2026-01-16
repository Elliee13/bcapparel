import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { UUID } from "../types/catalog";

export type CartItem = {
  productId: UUID;
  title: string;
  imageUrl: string;
  supplierName: string;
  category: string;
  variantId: UUID;
  sku: string;
  color: string;
  size: string;
  unitPrice: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

type CartActions = {
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (variantId: UUID) => void;
  setQty: (variantId: UUID, qty: number) => void;
  clear: () => void;
};

const CART_KEY = "bcapparel_demo_cart_v1";

const CartContext = createContext<(CartState & CartActions) | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useLocalStorage<CartState>(CART_KEY, { items: [] });

  const api: CartState & CartActions = useMemo(() => {
    function addItem(item: Omit<CartItem, "qty">, qty = 1) {
      setState((prev) => {
        const existing = prev.items.find((x) => x.variantId === item.variantId);
        if (existing) {
          return {
            items: prev.items.map((x) =>
              x.variantId === item.variantId ? { ...x, qty: x.qty + qty } : x
            ),
          };
        }
        return { items: [{ ...item, qty }, ...prev.items] };
      });
    }

    function removeItem(variantId: UUID) {
      setState((prev) => ({ items: prev.items.filter((x) => x.variantId !== variantId) }));
    }

    function setQty(variantId: UUID, qty: number) {
      const safeQty = Math.max(1, Math.min(99, Math.trunc(qty)));
      setState((prev) => ({
        items: prev.items.map((x) => (x.variantId === variantId ? { ...x, qty: safeQty } : x)),
      }));
    }

    function clear() {
      setState({ items: [] });
    }

    return { ...state, addItem, removeItem, setQty, clear };
  }, [state, setState]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function calcSubtotal(items: CartItem[]) {
  return items.reduce((sum, x) => sum + x.unitPrice * x.qty, 0);
}
