
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Send, Save, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type OrderActionsProps = {
  order: any
}

export default function OrderActions({ order }: OrderActionsProps) {
  const [status, setStatus] = useState(order.status)
  const [notes, setNotes] = useState(order.admin_notes || '')
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function getRole() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        setRole(data?.role)
      }
    }
    getRole()
  }, [])

  async function handleUpdate() {
    setLoading(true)
    const { error } = await supabase
      .from('orders')
      .update({ status, admin_notes: notes })
      .eq('id', order.id)

    if (error) {
      alert('Failed to update order')
      console.error(error)
    } else {
      router.refresh()
    }
    setLoading(false)
  }

  function handleWhatsApp() {
    const domain = window.location.origin
    const trackingLink = `${domain}/track/${order.ticket_id}`
    const message = `Hello ${order.user_name}, 
    
Your order #${order.ticket_id} is *${status.toUpperCase()}*.
Total Amount: ₹${order.total_amount}

You can track your order and download your e-bill here:
${trackingLink}

Thank you for choosing CrumsOBliss!`

    const encodedMessage = encodeURIComponent(message)
    const phone = order.user_phone.replace(/\D/g, '') // Basic cleanup
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
  }

  if (!role) return null // Or skeleton

  const isAdmin = role === 'admin'

  return (
    <Card className="rounded-sm shadow-none border">
      <CardHeader className="border-b pb-4 mb-4">
        <CardTitle className="text-base font-semibold uppercase tracking-wider">Execute Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdmin && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Modify Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="rounded-sm h-8 text-xs font-semibold uppercase tracking-wider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-sm">
                  <SelectItem value="pending" className="text-xs font-semibold uppercase tracking-wider">PENDING</SelectItem>
                  <SelectItem value="confirmed" className="text-xs font-semibold uppercase tracking-wider">CONFIRMED</SelectItem>
                  <SelectItem value="delivered" className="text-xs font-semibold uppercase tracking-wider">DELIVERED</SelectItem>
                  <SelectItem value="cancelled" className="text-xs font-semibold uppercase tracking-wider">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin Audit Notes</label>
              <Textarea
                placeholder="Log internal system notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-sm min-h-[80px] text-sm"
              />
            </div>

            <Button onClick={handleUpdate} disabled={loading} className="w-full rounded-sm h-8 text-xs font-semibold uppercase tracking-wider">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : <Save className="h-3.5 w-3.5 mr-2" />}
              {loading ? "COMMITTING..." : "COMMIT CHANGES"}
            </Button>
          </>
        )}

        <Button variant="outline" onClick={handleWhatsApp} className="w-full rounded-sm h-8 text-xs font-semibold uppercase tracking-wider border-green-500/50 text-green-600 dark:text-green-500 hover:bg-green-500/10">
          <Send className="h-3.5 w-3.5 mr-2" />
          NOTIFY VIA WHATSAPP
        </Button>

        <Button variant="outline" onClick={() => window.open(`/api/generate-bill?ticket_id=${order.ticket_id}`, '_blank')} className="w-full rounded-sm h-8 text-xs font-semibold uppercase tracking-wider">
          <Download className="h-3.5 w-3.5 mr-2" />
          GENERATE PDF BILL
        </Button>
      </CardContent>
    </Card>
  )
}
