import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Crumbs O' Bliss | Home",
  description: "Fresh, honest, small-batch baked goods made with time-tested techniques",
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-primary">{t("hero.title")}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <Link
            href={`/${locale}/items`}
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{t("items.title")}</h2>
          <p className="text-lg text-muted-foreground mb-12 text-balance">{t("items.description")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-muted relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&query=bakery item ${i}`}
                    alt={`Bakery item ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Item {i}</h3>
                  <p className="text-sm text-muted-foreground mb-4">A delicious baked good crafted with care</p>
                  <p className="font-bold text-primary">₹{200 + i * 50}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Why Choose Crumbs O' Bliss</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            We believe in the power of fresh, honest, handcrafted baked goods. Every item is made with care, using
            quality ingredients and time-tested techniques that have been perfected over generations.
          </p>
          <Link
            href={`/${locale}/about`}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  )
}
