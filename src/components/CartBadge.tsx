"use client";

import { useCart } from "@/store/useCart";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function CartBadge() {
  const items = useCart((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative p-2 rounded-full hover:bg-secondary transition-colors flex items-center justify-center"
    >
      <ShoppingBag className="w-5 h-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
