"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { ShoppingBag } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    category: {
      name: string;
    };
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      quantity: 1,
      category: product.category.name,
    });
  };

  return (
    <Button
      variant="default"
      className="w-full gap-2"
      size="sm"
      onClick={handleAddToCart}
    >
      <ShoppingBag className="w-4 h-4" />
      Add to Cart
    </Button>
  );
}
