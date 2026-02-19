"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Loader from "@/components/loader";
import details from '@/config/details.json'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
function CartPageContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  const handleCheckoutSubmit = async (userDetails: { name: string; phone: string; address: string }) => {
    setIsSubmitting(true);
    
    try {
      const subtotal = getTotal();
      const shippingCost = subtotal > 500 ? 0 : 50;
      const totalAmount = subtotal + shippingCost;
      
      const orderId = typeof crypto !== 'undefined' && crypto.randomUUID 
          ? crypto.randomUUID() 
          : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });

      const ticketId = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          ticket_id: ticketId,
          user_name: userDetails.name,
          user_phone: userDetails.phone,
          delivery_address: userDetails.address,
          total_amount: totalAmount,
          status: 'pending'
        });

      if (orderError) throw orderError;

      const orderItemsToInsert = items.map(cartItem => ({
        order_id: orderId,
        product_id: typeof cartItem.item.id === 'string' ? cartItem.item.id : null, 
        product_name: locale === 'bn' ? cartItem.item.name.bn : cartItem.item.name.en,
        quantity: cartItem.quantity,
        price_at_time: cartItem.item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      clearCart();
      setIsCheckoutModalOpen(false);
      router.push(`/${locale}/track/${ticketId}`);
      
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (isLoading) {
    return <Loader />;
  }

  const subtotal = getTotal();
  const shippingCost = subtotal > 0 ? (subtotal > 500 ? 0 : 50) : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {t("cart.title")}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6 opacity-50" />
            <p className="text-2xl text-muted-foreground mb-8">
              {t("cart.empty")}
            </p>
            <Link
              href={`/${locale}/items`}
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("cart.continue")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="flex gap-4 bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={cartItem.item.image || "/placeholder.svg"}
                      alt={cartItem.item.name.en}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-primary mb-1">
                      {locale === "bn"
                        ? cartItem.item.name.bn
                        : cartItem.item.name.en}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      ₹{cartItem.item.price} × {cartItem.quantity} = ₹
                      {cartItem.item.price * cartItem.quantity}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            cartItem.item.id,
                            cartItem.quantity - 1,
                          )
                        }
                        className="p-1 rounded hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={cartItem.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            cartItem.item.id,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="w-12 text-center border border-border rounded px-2 py-1"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(
                            cartItem.item.id,
                            cartItem.quantity + 1,
                          )
                        }
                        className="p-1 rounded hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(cartItem.item.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors ml-auto self-start"
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                  {t("cart.title")}
                </h2>

                <div className="space-y-3 mb-6 border-b border-border pb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {t("cart.subtotal")}
                    </span>
                    <span className="font-semibold">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {t("cart.shipping")}
                    </span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 text-xl font-bold text-primary mb-6">
                  <span>{t("cart.total")}</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  disabled={items.length === 0}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("cart.checkout")}
                </button>

                <Link
                  href={`/${locale}/items`}
                  className="mt-4 block text-center px-6 py-2 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                >
                  {t("cart.continue")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-md rounded-lg p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">Checkout Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCheckoutSubmit({
                  name: formData.get('name') as string,
                  phone: formData.get('phone') as string,
                  address: formData.get('address') as string,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium">Full Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">WhatsApp Number (For Tracking)</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Delivery Address</label>
                <textarea
                  required
                  name="address"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  disabled={isSubmitting}
                  className="rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  return <CartPageContent locale={locale} />;
}
