import type { Metadata } from "next"
import { items } from "@/lib/items"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Items | Crumbs O' Bliss",
  description: "Browse our collection of artisan baked goods",
}

async function ItemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Our Creations</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Handcrafted with care, each item is a testament to our passion for baking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/items/${item.slug}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-square bg-muted relative overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {locale === "en" ? item.name.en : item.name.bn}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {locale === "en" ? item.description.en : item.description.bn}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                  <span className="text-xs font-medium text-muted-foreground">{item.calories} cal</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItemsPage
