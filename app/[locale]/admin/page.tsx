
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity, ShoppingBag, Package } from "lucide-react"
import ExportCsvButton from "@/components/admin/export-csv-button"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Date calculation for filtering
  const now = new Date()
  
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay()) // Assuming Sunday is 0
  startOfWeek.setHours(0,0,0,0)
  const startOfWeekIso = startOfWeek.toISOString()
  
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString()

  // 1. Revenue Calculations
  const { data: revenueData } = await supabase
    .from('orders')
    .select('total_amount, created_at')
    .not('status', 'eq', 'cancelled'); // Don't count cancelled orders
  
  let revenueToday = 0;
  let revenueWeek = 0;
  let revenueMonth = 0;
  let revenueYear = 0;
  let totalRevenue = 0;

  revenueData?.forEach(order => {
      const amount = order.total_amount || 0;
      totalRevenue += amount;
      
      if (order.created_at >= startOfDay) revenueToday += amount;
      if (order.created_at >= startOfWeekIso) revenueWeek += amount;
      if (order.created_at >= startOfMonth) revenueMonth += amount;
      if (order.created_at >= startOfYear) revenueYear += amount;
  });

  // 2. Total Orders
  const { count: totalOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  // 3. Total Products
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  // 4. Recent Orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  // 5. Top Viewed Items
  const { data: topViewed } = await supabase
    .from('products')
    .select('id, name, view_count')
    .order('view_count', { ascending: false })
    .limit(5);

  // 6. Top Selling Items
  // Since we can't easily do a SUM() GROUP BY in standard Supabase JS client without an RPC,
  // we either create an RPC or fetch all order_items and reduce them in JS.
  // Given potential volume, an RPC is better, but for now we reduce order_items if small, 
  // or just fetch latest order items. Let's do a simple JS reduction for MVP.
  const { data: allOrderItems } = await supabase
    .from('order_items')
    .select('product_id, product_name, quantity');
    
  let salesCount: Record<string, {name: string, count: number}> = {};
  allOrderItems?.forEach(item => {
      if (!item.product_id) return;
      if (!salesCount[item.product_id]) {
          salesCount[item.product_id] = { name: item.product_name, count: 0 };
      }
      salesCount[item.product_id].count += item.quantity;
  });
  
  const topSelling = Object.values(salesCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ExportCsvButton />
      </div>
      
      {/* Stats Cards Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueToday.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Since midnight</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (This Week)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueWeek.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Since Sunday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (This Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Since 1st of month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (Year)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueYear.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Since Jan 1st</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards Row 2 */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders (All Time)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (All Time)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Lists */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {recentOrders?.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{order.user_name || 'Guest'}</p>
                            <p className="text-xs text-muted-foreground truncate w-32">TKT: {order.ticket_id}</p>
                        </div>
                        <div className="text-right">
                           <div className="font-medium">₹{order.total_amount}</div>
                           <div className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                ))}
                
                {!recentOrders?.length && (
                    <div className="text-center text-muted-foreground text-sm py-4">No orders yet.</div>
                )}
             </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Selling</CardTitle>
            <CardDescription>By quantity sold</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {topSelling.map((item: {name: string, count: number}, i: number) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                        <p className="text-sm font-medium leading-none truncate pr-4">{item.name}</p>
                        <div className="font-medium bg-muted px-2 py-1 rounded text-xs">{item.count} sold</div>
                    </div>
                ))}
                
                {!topSelling.length && (
                    <div className="text-center text-muted-foreground text-sm py-4">No sales data.</div>
                )}
             </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Viewed</CardTitle>
            <CardDescription>By page views</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {topViewed?.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                        <p className="text-sm font-medium leading-none truncate pr-4">{item.name}</p>
                        <div className="font-medium bg-muted px-2 py-1 rounded text-xs">{item.view_count || 0} views</div>
                    </div>
                ))}
                
                {!topViewed?.length && (
                    <div className="text-center text-muted-foreground text-sm py-4">No view data.</div>
                )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
