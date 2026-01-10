import type { Metadata } from "next"
import { items } from "@/lib/items" // Points to the file created in previous turn
import { ItemsGrid } from "@/components/items-grid" // Points to the file above

export const metadata: Metadata = {
  title: "Items | Crumbs O' Bliss",
  description: "Browse our collection of artisan baked goods",
}

async function ItemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Default to English if locale is missing or invalid
  const currentLocale = locale === "bn" ? "bn" : "en"

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {currentLocale === "en" ? "Our Creations" : "আমাদের সৃষ্টি"}
          </h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl">
            {currentLocale === "en" 
              ? "Handcrafted with care, each item is a testament to our passion for baking"
              : "যত্ন সহকারে তৈরি, প্রতিটি আইটেম আমাদের বেকিংয়ের প্রতি আবেগের প্রমাণ"}
          </p>
        </div>

        {/* We pass the raw items to the Client Component.
          The Client Component handles the search, sort, and filtering logic.
        */}
        <ItemsGrid items={items} locale={currentLocale} />
      </div>
    </div>
  )
}

export default ItemsPage