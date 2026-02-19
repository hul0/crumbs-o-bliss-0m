
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderStatusBadge } from '@/components/admin/order-status-badge'
import { Separator } from '@/components/ui/separator'
// We will create a client component for actions (Update Status, WhatsApp)
import OrderActions from '@/components/admin/order-actions'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export default async function OrderDetailsPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch Order
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (!order) {
    notFound()
  }

  // Fetch Items
  const { data: items } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-lg font-semibold md:text-2xl">Order Details</h1>
            <p className="text-muted-foreground">Ticket ID: {order.ticket_id}</p>
        </div>
        <div className="flex items-center gap-2">
             <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          {items?.map((item) => (
                              <div key={item.id} className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                                  <div>
                                      <p className="font-medium">{item.product_name}</p>
                                      <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ${item.price_at_time}</p>
                                  </div>
                                  <div className="font-medium">
                                      ${(item.quantity * item.price_at_time).toFixed(2)}
                                  </div>
                              </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between items-center pt-2">
                              <span className="font-semibold">Total</span>
                              <span className="font-bold text-lg">${order.total_amount}</span>
                          </div>
                      </div>
                  </CardContent>
              </Card>

              {/* Order Actions - Pass locale for link generation if needed */}
              <OrderActions order={order} />
          </div>

          <div className="space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Customer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Name</p>
                          <p>{order.user_name}</p>
                      </div>
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{order.user_phone}</p>
                      </div>
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Address</p>
                          <p>{order.delivery_address}</p>
                      </div>
                      {order.user_email && (
                          <div>
                              <p className="text-sm font-medium text-muted-foreground">Email</p>
                              <p>{order.user_email}</p>
                          </div>
                      )}
                  </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {order.admin_notes || "No notes added."}
                    </p>
                </CardContent>
              </Card>
          </div>
      </div>
    </div>
  )
}
