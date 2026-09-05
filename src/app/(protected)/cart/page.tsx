"use client";
import { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Container } from "@/components/shared/Container";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Cardioplus Remedy",
      category: "Heart Health",
      price: 70.0,
      quantity: 2,
      image: "/default-image.avif",
      isSale: true,
    },
    {
      id: 2,
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      price: 60.0,
      quantity: 1,
      image: "/default-image.avif",
      isSale: true,
    },
    {
      id: 3,
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      price: 60.0,
      quantity: 1,
      image: "/default-image.avif",
      isSale: true,
    },
    {
      id: 4,
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      price: 60.0,
      quantity: 1,
      image: "/default-image.avif",
      isSale: true,
    },
    {
      id: 5,
      title: "Cardioplus Remedy",
      category: "Heart Health",
      price: 70.0,
      quantity: 1,
      image: "/default-image.avif",
      isSale: false,
    },
    {
      id: 6,
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      price: 60.0,
      quantity: 1,
      image: "/default-image.avif",
      isSale: false,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 5.0 : 0.0;
  const total = subtotal + shipping;

  return (
    // h-screen aur overflow-hidden se page ka main scroll khatam, poora content screen mein fit rahega
    <section className="w-full bg-[#FAFAFA] text-[#111827] h-screen flex flex-col overflow-hidden">
      <Container className="py-6 flex flex-col h-full max-w-7xl mx-auto w-full">
        {/* Modern Header Banner Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200/80 pb-5 mb-6 gap-4 flex-shrink-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-3">
              <ShoppingCart className="w-7 h-7 text-[#1A6B4C]" />
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Review your items below before proceeding to secure checkout.
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={() => setCartItems([])}
              className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 self-start md:self-auto bg-red-50 px-4 py-2 rounded-xl"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Entire Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Professional Empty State */
          <div className="text-center py-28 bg-white rounded-3xl border border-gray-200/60 shadow-xs max-w-xl mx-auto my-auto w-full">
            <div className="w-20 h-20 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingCart className="w-10 h-10 text-[#1A6B4C]" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">
              Your cart is currently empty
            </h3>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
              Explore our health essentials and add items to your cart to get
              started.
            </p>
            <Button className="bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-full px-8 font-bold text-sm h-11 shadow-none">
              Start Shopping Now
            </Button>
          </div>
        ) : (
          /* Main Layout Grid - Wide width maintained, internal scrolling applied */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start overflow-hidden flex-1 pb-4">
            {/* Left Column: Wide card with dynamic height matching screen and internal scrolling list */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs flex flex-col h-full min-h-0">
              {/* Sticky Table Header inside the card */}
              <div className="hidden sm:grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider pb-4 border-b border-gray-100 mb-4 bg-white sticky top-0 z-10 flex-shrink-0">
                <span className="col-span-6">Product Details</span>
                <span className="col-span-3 text-center">Quantity</span>
                <span className="col-span-3 text-right">Subtotal</span>
              </div>

              {/* Scrollable Items Container (Sirf yahi list scroll hogi, width bilkul wide rahegi) */}
              <div className="overflow-y-auto pr-3 divide-y divide-gray-100 scrollbar-thin scrollbar-thumb-gray-200 flex-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 group"
                  >
                    {/* Product Image & Info (6 Cols) */}
                    <div className="flex items-center gap-4 col-span-6 w-full">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF6F0] rounded-2xl relative overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100">
                        {item.isSale && (
                          <Badge className="badge-sale absolute top-2 left-2 z-10 text-[9px] px-2 py-0.5">
                            Sale
                          </Badge>
                        )}
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1A6B4C] block mb-0.5">
                          {item.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <span className="text-xs sm:text-sm font-bold text-gray-500">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls (3 Cols) */}
                    <div className="flex items-center justify-between sm:justify-center col-span-3 w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/80">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2.5 text-gray-600 hover:bg-gray-200/70 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 text-xs sm:text-sm font-extrabold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2.5 text-gray-600 hover:bg-gray-200/70 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Delete Action (3 Cols) */}
                    <div className="flex items-center justify-between sm:justify-end col-span-3 w-full sm:w-auto mt-2 sm:mt-0 gap-4">
                      <span className="text-base font-black text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm flex-shrink-0">
              <h3 className="text-lg font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Order Summary
              </h3>

              <div className="space-y-4 text-sm font-medium text-gray-600 mb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-black text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-[#1A6B4C]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <Button className="w-full bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-2xl text-base font-extrabold h-14 gap-3 shadow-md shadow-[#1A6B4C]/20 transition-all mb-6">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Trust Badges */}
              <div className="space-y-3 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#1A6B4C]" />
                  <span>Secure & Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-[#1A6B4C]" />
                  <span>30-Day Easy Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
