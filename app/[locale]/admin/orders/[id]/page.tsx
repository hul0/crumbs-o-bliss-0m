
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
            <div className="flex items-center justify-between pb-4 border-b">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground uppercase">Order Manifest</h1>
                    <p className="text-sm font-mono text-muted-foreground mt-1">ID: {order.ticket_id}</p>
                </div>
                <div className="flex items-center gap-2">
                    <OrderStatusBadge status={order.status} />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card className="rounded-sm shadow-none border">
                        <CardHeader className="border-b pb-4 mb-4">
                            <CardTitle className="text-base font-semibold uppercase tracking-wider">Line Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {items?.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center bg-muted/30 p-3 rounded-sm border">
                                        <div>
                                            <p className="font-medium text-sm">{item.product_name}</p>
                                            <p className="text-xs font-mono text-muted-foreground mt-0.5">QTY: {item.quantity} × ₹{item.price_at_time}</p>
                                        </div>
                                        <div className="font-semibold text-sm">
                                            ₹{(item.quantity * item.price_at_time).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm font-bold uppercase tracking-wider">Summary Total</span>
                                    <span className="font-bold text-lg">₹{order.total_amount}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Actions - Pass locale for link generation if needed */}
                    <OrderActions order={order} />
                </div>

                <div className="space-y-6">
                    <Card className="rounded-sm shadow-none border">
                        <CardHeader className="border-b pb-4 mb-4">
                            <CardTitle className="text-base font-semibold uppercase tracking-wider">Client Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity Name</p>
                                <p className="text-sm">{order.user_name}</p>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</p>
                                <p className="text-sm font-mono">{order.user_phone}</p>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location Drop</p>
                                <p className="text-sm leading-relaxed">{order.delivery_address}</p>
                            </div>
                            {order.user_email && (
                                <div className="grid gap-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Identifier</p>
                                    <p className="text-sm">{order.user_email}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-sm shadow-none border bg-muted/10">
                        <CardHeader className="border-b pb-4 mb-4">
                            <CardTitle className="text-base font-semibold uppercase tracking-wider flex items-center gap-2">System Audit Logs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs font-mono text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                {order.admin_notes || "NO AUDIT ENTRIES LOGGED."}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
