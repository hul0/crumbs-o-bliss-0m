import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cart | Crumbs O' Bliss",
  description: "Shopping cart for Crumbs O' Bliss",
}

async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Shopping Cart</h1>

        {/* Empty State */}
        <div className="text-center py-20">
          <p className="text-2xl text-muted-foreground mb-8">Your cart is empty</p>
          <Link
            href={`/${locale}/items`}
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Cart Summary (UI Only) */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-4 border-b border-border">
                <span className="font-semibold">Subtotal</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-border">
                <span className="font-semibold">Shipping</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between items-center py-4 text-lg font-bold text-primary">
                <span>Total</span>
                <span>₹0.00</span>
              </div>
            </div>
            <button
              className="w-full px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
