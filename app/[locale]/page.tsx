import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { items } from "@/lib/items";
import {
  ArrowRight,
  Star,
  Leaf,
  Clock,
  Heart,
  Sparkles,
  Award,
  Users,
  MapPin,
} from "lucide-react";
import CircularGallery from "@/components/CircularGallery";

export const metadata: Metadata = {
  title: "Crumbs O' Bliss | Artisan Bakery",
  description:
    "Fresh, honest, small-batch baked goods made with time-tested techniques.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const featuredItems = items.filter((item) =>
    ["sourdough-bread", "macaron-assortment", "chocolate-croissant"].includes(
      item.slug
    )
  );

  // Bakery-themed items for the CircularGallery
  const bakeryGalleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1585478479636-1999ff953e63?w=800&q=80',
      text: 'Classic Sourdough'
    },
    {
      image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80',
      text: 'Chocolate Croissant'
    },
    {
      image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80',
      text: 'Blueberry Muffin'
    },
    {
      image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80',
      text: 'Cinnamon Roll'
    },
    {
      image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&q=80',
      text: 'Almond Croissant'
    },
    {
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80',
      text: 'Macaron Assortment'
    },
    {
      image: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=800&q=80',
      text: 'French Baguette'
    },
    {
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf80fd44?w=800&q=80',
      text: 'Red Velvet Cupcake'
    },
    {
      image: 'https://images.unsplash.com/photo-1573145402507-42bf25c3459c?w=800&q=80',
      text: 'Rosemary Focaccia'
    },
    {
      image: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf446?w=800&q=80',
      text: 'Choco Chip Cookie'
    }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-[var(--hero-bg-start)] via-[var(--hero-bg-via)] to-[var(--hero-bg-end)] transition-colors duration-500">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--blob-1)] rounded-full blur-3xl animate-pulse opacity-40" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--blob-2)] rounded-full blur-3xl animate-pulse delay-700 opacity-40" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[var(--blob-3)] rounded-full blur-3xl animate-pulse delay-1000 opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Badge with animation */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--badge-bg)] backdrop-blur-md border border-[var(--badge-border)] text-[var(--badge-text)] font-semibold text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-lg hover:shadow-xl transition-all">
            <Star className="w-4 h-4 fill-[var(--badge-icon)] text-[var(--badge-icon)] animate-spin-slow" />
            <span className="tracking-wide">{t("hero.cta")}</span>
            <Sparkles className="w-4 h-4 text-[var(--badge-icon)]" />
          </div>

          {/* Main Heading with dramatic typography */}
          <h1
            className="text-6xl md:text-9xl font-black mb-6 text-balance bg-gradient-to-br from-[var(--text-heading-grad-from)] via-[var(--text-heading-grad-via)] to-[var(--text-heading-grad-to)] bg-clip-text text-transparent tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t("hero.title")}
          </h1>

          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-in fade-in duration-1000 delay-400">
            <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-[var(--divider-color)]" />
            <Leaf className="w-6 h-6 text-[var(--divider-color)]" />
            <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-[var(--divider-color)]" />
          </div>

          <p
            className="text-xl md:text-3xl text-[var(--text-body-color)] mb-14 text-balance max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500"
            style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Link
              href={`/${locale}/items`}
              className="group relative flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[var(--btn-primary-start)] to-[var(--btn-primary-end)] text-white font-bold rounded-full hover:brightness-110 transition-all hover:scale-105 shadow-2xl shadow-[var(--btn-shadow)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-lg tracking-wide">
                Shop Collection
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/about`}
              className="px-12 py-5 bg-[var(--badge-bg)] backdrop-blur-sm border-2 border-[var(--badge-border)] text-[var(--badge-text)] font-bold rounded-full hover:bg-[var(--badge-bg)] hover:brightness-105 transition-all hover:scale-105 shadow-lg text-lg tracking-wide"
            >
              Our Story
            </Link>
          </div>

          {/* Floating Images Gallery */}
          <div className="mt-20 relative h-64 md:h-80 animate-in fade-in duration-1000 delay-1000">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-stone-800">
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80"
                alt="Artisan bread"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute left-[15%] md:left-[25%] top-8 w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-stone-800 opacity-90 hover:opacity-100">
              <Image
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80"
                alt="Croissants"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute right-[15%] md:right-[25%] top-12 w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-xl rotate-12 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-stone-800 opacity-90 hover:opacity-100">
              <Image
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80"
                alt="Pastries"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-24 md:h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white dark:fill-background"
            ></path>
          </svg>
        </div>
      </section>

      {/* --- PHILOSOPHY STATS --- */}
      <section className="py-16 bg-white dark:bg-background border-y border-[var(--lp-card-border)]/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: Leaf,
              label: "100% Organic",
              color: "text-green-600 dark:text-green-400",
              bgColor: "bg-green-50 dark:bg-green-950/30",
            },
            {
              icon: Clock,
              label: "24h Fermented",
              color: "text-[var(--badge-icon)]",
              bgColor: "bg-[var(--blob-1)]/30",
            },
            {
              icon: Heart,
              label: "Small Batch",
              color: "text-rose-600 dark:text-rose-400",
              bgColor: "bg-rose-50 dark:bg-rose-950/30",
            },
            {
              icon: Star,
              label: "Master Bakers",
              color: "text-orange-600 dark:text-orange-400",
              bgColor: "bg-orange-50 dark:bg-orange-950/30",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 group cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <span className="text-sm font-black uppercase tracking-widest text-[var(--text-body-color)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Circular Gallery Section with Bakery Items */}
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={3} items={bakeryGalleryItems} />
      </div>

      {/* --- FEATURED COLLECTIONS --- */}
      <section className="py-28 md:py-36 px-4 bg-gradient-to-b from-[var(--feat-bg-start)] to-[var(--feat-bg-end)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <div className="inline-block mb-4 px-4 py-1 bg-[var(--blob-1)]/50 text-[var(--badge-text)] text-xs font-bold uppercase tracking-widest rounded-full">
                Featured Collection
              </div>
              <h2
                className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[var(--text-heading-grad-from)] to-[var(--text-heading-grad-via)] bg-clip-text text-transparent leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {t("items.title")}
              </h2>
              <p
                className="text-xl md:text-2xl text-[var(--text-body-color)] leading-relaxed"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontStyle: "italic",
                }}
              >
                {t("items.description")}
              </p>
            </div>
            <Link
              href={`/${locale}/items`}
              className="group text-[var(--badge-text)] font-bold flex items-center gap-2 hover:gap-4 transition-all text-lg"
            >
              View All Items
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <Link
                key={item.slug}
                href={`/${locale}/items/${item.slug}`}
                className="group relative bg-[var(--lp-card-bg)] rounded-3xl overflow-hidden border-2 border-[var(--lp-card-border)] hover:border-[var(--lp-card-border-hover)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name.en}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Floating Price Tag */}
                  <div className="absolute top-6 right-6 bg-[var(--lp-card-bg)]/95 backdrop-blur-md text-[var(--badge-text)] font-black px-5 py-3 rounded-2xl shadow-xl border border-[var(--lp-card-border)] group-hover:scale-110 transition-transform">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground block">
                      From
                    </span>
                    <span className="text-2xl">₹{item.price}</span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 left-6 bg-[var(--badge-icon)] text-white font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider shadow-lg">
                    Bestseller
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider font-black px-3 py-1 rounded-full bg-[var(--blob-1)]/30 text-[var(--badge-text)] border border-[var(--lp-card-border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-3xl font-black mb-4 text-[var(--text-heading-grad-from)] group-hover:text-[var(--text-heading-grad-via)] transition-colors leading-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {locale === "en" ? item.name.en : item.name.bn}
                  </h3>
                  <p
                    className="text-[var(--text-body-color)] line-clamp-3 text-base leading-relaxed mb-6"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {locale === "en"
                      ? item.description.en
                      : item.description.bn}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--lp-card-border)]">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--badge-icon)]" />
                      {item.calories} Cal
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[var(--blob-1)]/50 flex items-center justify-center group-hover:bg-[var(--btn-primary-start)] group-hover:text-white transition-all duration-300 shadow-md">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 px-4 bg-white dark:bg-background">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 bg-rose-100 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 text-xs font-bold uppercase tracking-widest rounded-full">
            Customer Love
          </div>
          <h2
            className="text-4xl md:text-6xl font-black mb-4 text-foreground"
            style={{ fontFamily: "Georgia, serif" }}
          >
            What Our Family Says
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              name: "Priya Sharma",
              role: "Food Blogger",
              quote:
                "The sourdough here is absolutely divine. You can taste the passion in every bite!",
              rating: 5,
            },
            {
              name: "Rahul Mehta",
              role: "Local Chef",
              quote:
                "Finally, an authentic bakery that respects traditional methods. Their croissants are perfection.",
              rating: 5,
            },
            {
              name: "Anita Desai",
              role: "Regular Customer",
              quote:
                "I drive 30 minutes just for their macarons. Worth every second of the journey!",
              rating: 5,
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[var(--hero-bg-start)] to-[var(--hero-bg-via)] p-8 rounded-3xl border-2 border-[var(--lp-card-border)] hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-5 h-5 fill-[var(--badge-icon)] text-[var(--badge-icon)]"
                  />
                ))}
              </div>
              <p
                className="text-[var(--text-body-color)] text-lg mb-6 leading-relaxed italic"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BRAND STORY --- */}
      <section className="relative py-32 md:py-48 px-4 bg-gradient-to-br from-[var(--brand-bg-start)] via-[var(--brand-bg-via)] to-[var(--brand-bg-end)] text-white overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80"
            alt="texture"
            fill
            className="object-cover"
          />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Award className="w-16 h-16 mx-auto mb-8 text-[var(--badge-icon)]" />
          <h2
            className="text-5xl md:text-7xl font-black mb-12 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t("about.title")}
          </h2>
          <p
            className="text-xl md:text-3xl mb-16 leading-relaxed font-light"
            style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
            }}
          >
            "{t("about.description")}"
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[var(--divider-color)]" />
            <Sparkles className="w-6 h-6 text-[var(--divider-color)]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[var(--divider-color)]" />
          </div>

          <Link
            href={`/${locale}/about`}
            className="group inline-block px-14 py-6 bg-white dark:bg-stone-800 text-[var(--badge-text)] dark:text-amber-100 font-black rounded-full hover:scale-110 transition-all shadow-2xl hover:shadow-white/20 text-lg tracking-wide relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--btn-primary-start)] to-[var(--btn-primary-end)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors">
              Read Our Philosophy
            </span>
          </Link>
        </div>
      </section>

      {/* --- VISIT US SECTION --- */}
      <section className="py-24 px-4 bg-gradient-to-b from-white dark:from-background to-[var(--hero-bg-start)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-1 bg-[var(--blob-1)]/50 text-[var(--badge-text)] text-xs font-bold uppercase tracking-widest rounded-full">
                Visit Us
              </div>
              <h2
                className="text-4xl md:text-6xl font-black mb-6 text-foreground"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Experience the Magic
              </h2>
              <p
                className="text-xl text-[var(--text-body-color)] mb-8 leading-relaxed"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Come visit our bakery and watch master bakers craft each item
                with love and precision. The aroma alone is worth the trip.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[var(--badge-icon)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-foreground">
                      Shyamnagar, West Bengal
                    </p>
                    <p className="text-muted-foreground">India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[var(--badge-icon)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-foreground">Open Daily</p>
                    <p className="text-muted-foreground">7:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--btn-primary-start)] to-[var(--btn-primary-end)] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
              >
                Get Directions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80"
                alt="Bakery interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}