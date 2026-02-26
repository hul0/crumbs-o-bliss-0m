
import { createClient } from '@/utils/supabase/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { OrderStatusBadge } from '@/components/admin/order-status-badge'

export default async function AdminOrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Order Repository</h1>
      </div>

      <div className="border rounded-sm bg-card shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px] text-xs uppercase tracking-wider font-semibold">TICKET ID</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">CUSTOMER</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">PHONE</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">TOTAL</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">STATUS</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">DATE</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id} className="group">
                <TableCell className="font-mono text-xs">{order.ticket_id}</TableCell>
                <TableCell className="text-sm">{order.user_name}</TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground">{order.user_phone}</TableCell>
                <TableCell className="text-sm font-medium">₹{order.total_amount}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild className="rounded-sm h-8 text-xs hover:bg-muted font-medium">
                    <Link href={`/${locale}/admin/orders/${order.id}`}>
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      VIEW
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!orders?.length && (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-sm text-muted-foreground">
                  No records exist in the repository.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
