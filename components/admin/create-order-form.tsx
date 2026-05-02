'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, Save, Store, ShoppingBag, Loader2 } from 'lucide-react'

// Basic UUID generator for order offline usage
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function CreateOrderForm({ products }: { products: any[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const [items, setItems] = useState<any[]>([])
  const [dbItem, setDbItem] = useState({ productId: '', name: '', price: '', quantity: 1 })

  const totalAmount = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0)

  const addItem = () => {
    if (!dbItem.name || !dbItem.price) return
    setItems([...items, {
      id: dbItem.productId || generateUUID(),
      name: dbItem.name,
      price: dbItem.price,
      quantity: dbItem.quantity,
      isCustom: !dbItem.productId
    }])
    setDbItem({ productId: '', name: '', price: '', quantity: 1 })
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return alert('Add at least one item')

    setLoading(true)
    const orderId = generateUUID()
    const ticketId = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Create Order
    const { error: orderError } = await supabase.from('orders').insert({
      id: orderId,
      ticket_id: ticketId,
      user_name: customer.name,
      user_phone: customer.phone,
      total_amount: totalAmount,
      status: 'confirmed', // offline orders default to confirmed
      delivery_address: customer.address || 'In-Store Pickup',
      user_email: `${customer.phone}@offline.local` // Mock email for offline
    })

    if (orderError) {
      alert('Failed to save order')
      console.error(orderError)
      setLoading(false)
      return
    }

    // Insert Items
    const orderItems = items.map(item => ({
      order_id: orderId,
      product_id: item.isCustom ? null : item.id,
      product_name: item.name,
      quantity: item.quantity,
      price_at_time: item.price
    }))

    await supabase.from('order_items').insert(orderItems)

    // Decrement stock
    for (const item of items) {
      if (!item.isCustom && item.id) {
        await supabase.rpc('decrement_stock', {
          product_id: item.id,
          quantity_to_subtract: item.quantity
        });
      }
    }

    router.push('/admin/orders')
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Items Column */}
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4 font-serif text-lg flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Basket
            </h3>

            {/* Unified Add Item */}
            <div className="bg-muted/30 p-4 sm:p-6 rounded-3xl border border-border/60 mb-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Quick Add Item</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-4 space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Product Lookup</Label>
                  <Select
                    value={dbItem.productId}
                    onValueChange={(value) => {
                      if (value === 'manual') {
                        setDbItem({ ...dbItem, productId: '', name: '', price: '' })
                        return
                      }
                      const p = products.find(prod => prod.id === value)
                      if (p) {
                        setDbItem({ ...dbItem, productId: p.id, name: p.name, price: p.price.toString() })
                      }
                    }}
                  >
                    <SelectTrigger className="h-11 rounded-2xl bg-background border-border/60 focus:ring-primary/20">
                      <SelectValue placeholder="Select from Catalog" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                      <SelectItem value="manual" className="font-bold text-muted-foreground italic">None (Manual Entry)</SelectItem>
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id} className="font-medium">
                          {p.name} <span className="text-primary ml-1 font-bold">₹{p.price}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3 space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Item Name</Label>
                  <Input
                    placeholder="Enter custom name"
                    className="h-11 rounded-2xl bg-background border-border/60 focus-visible:ring-primary/20"
                    value={dbItem.name}
                    onChange={e => setDbItem({ ...dbItem, name: e.target.value, productId: e.target.value === dbItem.name ? dbItem.productId : '' })}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-11 rounded-2xl bg-background border-border/60 focus-visible:ring-primary/20"
                    value={dbItem.price}
                    onChange={e => setDbItem({ ...dbItem, price: e.target.value })}
                  />
                </div>

                <div className="md:col-span-3 flex gap-4 items-end">
                  <div className="space-y-2 flex-1">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      className="h-11 rounded-2xl bg-background border-border/60 focus-visible:ring-primary/20"
                      value={dbItem.quantity}
                      onChange={e => setDbItem({ ...dbItem, quantity: parseInt(e.target.value) })}
                    />
                  </div>
                  <Button type="button" onClick={addItem} className="h-11 px-6 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all whitespace-nowrap">
                    Add Item
                  </Button>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">No items added to this order yet.</div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-border/50 rounded-2xl bg-background shadow-sm group hover:border-primary/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{item.isCustom ? 'Manual Entry' : 'Catalog Item'}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-xs font-bold block text-muted-foreground">{item.quantity} x ₹{item.price}</span>
                        <span className="text-sm font-black text-primary">₹{item.quantity * item.price}</span>
                      </div>
                      <button type="button" onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details & Summary Column */}
      <div className="space-y-6">
        <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-bold mb-2 font-serif text-lg flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" /> Customer Info
            </h3>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Name</Label>
              <Input required placeholder="E.g. John Doe" className="h-11 rounded-2xl bg-background border-border/60 focus-visible:ring-primary/20" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Phone Number</Label>
              <Input required placeholder="10 Digits" className="h-11 rounded-2xl bg-background border-border/60 focus-visible:ring-primary/20" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex justify-between items-center pl-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Address</span>
                <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">(Optional)</span>
              </Label>
              <Textarea rows={2} className="rounded-2xl bg-background border-border/60 focus-visible:ring-primary/20" placeholder="Delivery address or Pickup notes" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20 relative overflow-hidden rounded-3xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <CardContent className="p-6 relative z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-primary/10 pb-4">
              <span className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Subtotal</span>
              <span className="font-bold text-lg">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xl font-bold font-serif italic">Total</span>
              <span className="text-3xl font-black text-primary drop-shadow-sm">₹{totalAmount}</span>
            </div>

            <Button type="submit" disabled={loading || items.length === 0} className="w-full h-14 text-lg tracking-widest uppercase font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
              Generate Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
