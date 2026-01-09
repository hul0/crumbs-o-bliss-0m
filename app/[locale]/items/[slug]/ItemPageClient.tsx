"use client"

import Image from "next/image"
import { notFound } from "next/navigation"
import type { items } from "@/lib/items"

interface ItemPageClientProps {
  item: (typeof items)[0] | undefined
  locale: string
}

function BuyButton({ item, locale }: { item: (typeof items)[0]; locale: string }) {
  return (
    <button
      onClick={() => {
        const debugInfo = {
          item,
          locale,
          theme:
            typeof window !== "undefined"
              ? document.documentElement.classList.contains("dark")
                ? "dark"
                : "light"
              : "light",
          timestamp: new Date().toISOString(),
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        }
        console.log("Buy Now Button Clicked:", debugInfo)
      }}
      className="w-full px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
    >
      Buy Now
    </button>
  )
}

export default function ItemPageClient({ item, locale }: ItemPageClientProps) {
  if (!item) {
    notFound()
  }

  const isEnglish = locale === "en"
  const name = isEnglish ? item.name.en : item.name.bn
  const description = isEnglish ? item.description.en : item.description.bn

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary text-balance">{name}</h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance">{description}</p>

            <div className="space-y-6 mb-8">
              {/* Price */}
              <div className="border-b border-border pb-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Price</p>
                <p className="text-3xl font-bold text-primary">₹{item.price}</p>
              </div>

              {/* Calories */}
              <div className="border-b border-border pb-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Calories per serving</p>
                <p className="text-xl">{item.calories} kcal</p>
              </div>

              {/* Ingredients */}
              <div className="border-b border-border pb-4">
                <p className="text-sm font-medium text-muted-foreground mb-3">Ingredients</p>
                <ul className="space-y-2">
                  {item.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-accent/20 text-accent-foreground text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Buy Button */}
            <BuyButton item={item} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  )
}
