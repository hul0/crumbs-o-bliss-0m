"use client";

import { useCart } from "@/lib/CartContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Cart');
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    // Mock checkout
    alert(t('checkoutSuccess'));
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-playfair font-bold mb-4">{t('title')}</h1>
        <p className="text-muted-foreground text-lg mb-8">{t('empty')}</p>
        <Link 
          href={`/${locale}/items`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
        >
          {t('startShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-8 text-center md:text-left">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className="bg-card border rounded-xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair font-bold text-lg">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    title={t('remove')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-primary font-bold mb-3">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{t('quantity')}:</span>
                  <div className="flex items-center bg-muted rounded-lg border">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-background rounded-l-lg transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-background rounded-r-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-4 font-playfair">{t('checkout')}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (Est.)</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>{t('total')}</span>
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:translate-y-[-2px]"
            >
              {t('checkout')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}