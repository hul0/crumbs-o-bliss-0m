"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

// Define the type here based on what's passed from the server component
// Assuming the structure from your other files
interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    ingredients?: string[];
    slug: string;
}

export default function ItemPageClient({ item, locale }: { item: Item, locale: string }) {
  const t = useTranslations('Items');
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        slug: item.slug
    });
    
    // Show feedback animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href={`/${locale}/items`}
        className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('back')}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg group">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-foreground">
            {item.name}
          </h1>
          
          <div className="text-2xl font-bold text-primary mb-6">
            ${item.price.toFixed(2)}
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {item.description}
          </p>

          {item.ingredients && (
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3 font-playfair">{t('ingredients')}</h3>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1 bg-accent/50 rounded-full text-sm text-foreground/80">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] ${
                    isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
            >
              {isAdded ? (
                <>
                    <Check className="w-5 h-5" /> {t('added')}
                </>
              ) : (
                <>
                    <ShoppingCart className="w-5 h-5" /> {t('addToCart')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}