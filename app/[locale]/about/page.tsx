import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Crumbs O' Bliss",
  description: "Artisan bakery focused on fresh, honest, small-batch baked goods made with time-tested techniques",
}

async function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary text-balance">About Crumbs O' Bliss</h1>

        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <p className="text-lg text-foreground leading-relaxed mb-6 text-balance">
            Crumbs O' Bliss is an artisan bakery focused on fresh, honest, small-batch baked goods made with time-tested
            techniques and thoughtfully sourced ingredients. Baking is treated as both science and soul, balancing
            precision with warmth and care. Every item we create reflects our commitment to quality and our dedication
            to bringing joy through exceptional baked goods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Our Values */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">Our Values</h2>
            <ul className="space-y-4">
              {[
                {
                  title: "Quality Ingredients",
                  description: "We source only the finest, freshest ingredients from trusted suppliers.",
                },
                {
                  title: "Time-Tested Techniques",
                  description: "Traditional baking methods combined with precision and care.",
                },
                {
                  title: "Small Batches",
                  description: "Limited production ensures freshness and attention to detail.",
                },
              ].map((value, idx) => (
                <li key={idx} className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission & Vision */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground text-balance">
                To create exceptional baked goods that celebrate the art and craft of traditional baking while building
                a warm community around the love of fresh, quality food.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Craft</h2>
              <p className="text-muted-foreground text-balance">
                Baking is where science meets soul. Each morning, our bakers begin their work with precision and
                passion. We measure ingredients with exactitude, respect fermentation times, and understand the
                chemistry of a perfect rise. Yet, we also bring warmth, creativity, and care to every batch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
