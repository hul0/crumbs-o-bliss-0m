import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity, ShoppingBag, Package, Eye, AlertTriangle } from "lucide-react"
import ExportCsvButton from "@/components/admin/export-csv-button"
import DashboardCharts from '@/components/admin/dashboard-charts'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Date calculation for filtering
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  const startOfWeekIso = startOfWeek.toISOString()

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString()

  // 1. Revenue & Orders Fetch
  const { data: allOrders } = await supabase
    .from('orders')
    .select('id, total_amount, created_at, status')

  let revenueToday = 0;
  let revenueWeek = 0;
  let revenueMonth = 0;
  let revenueYear = 0;
  let totalRevenue = 0;

  // Data grouping for charts
  const last7DaysRevenue: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    last7DaysRevenue[d.toISOString().split('T')[0]] = 0;
  }

  const statusCount: Record<string, number> = { pending: 0, confirmed: 0, delivered: 0, cancelled: 0 };

  allOrders?.forEach(order => {
    const amount = order.total_amount || 0;

    // Revenue aggregation (skip cancelled for revenue)
    if (order.status !== 'cancelled') {
      totalRevenue += amount;
      if (order.created_at >= startOfDay) revenueToday += amount;
      if (order.created_at >= startOfWeekIso) revenueWeek += amount;
      if (order.created_at >= startOfMonth) revenueMonth += amount;
      if (order.created_at >= startOfYear) revenueYear += amount;

      // Chart grouping
      const dateKey = order.created_at.split('T')[0];
      if (last7DaysRevenue[dateKey] !== undefined) {
        last7DaysRevenue[dateKey] += amount;
      }
    }

    // Status aggregation
    if (order.status) {
      statusCount[order.status] = (statusCount[order.status] || 0) + 1;
    }
  });

  const revenueChartData = Object.entries(last7DaysRevenue).map(([date, amount]) => ({ date, amount }));
  const statusChartData = Object.entries(statusCount).map(([status, count]) => ({ status, count }));

  // 2. Fetch Products
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  // 3. CounterAPI Views
  let totalPageViews = 0;
  try {
    const counterToken = process.env.COUNTERAPI_TOKEN || process.env.COUNTERAPI_KEY || '';
    if (counterToken) {
      const res = await fetch('https://api.counterapi.dev/v2/crumbsoblisss-team-2979/page-view-crumbsobliss', {
        headers: { 'Authorization': `Bearer ${counterToken}` },
        next: { revalidate: 60 } // Cache for 60 seconds
      });
      if (res.ok) {
        const resData = await res.json();
        totalPageViews = resData?.data?.up_count || 0;
      }
    }
  } catch (error) {
    console.error("Failed to fetch CounterAPI stats", error);
  }

  // 4. Recent Orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  // 5. Top Viewed Items (Supabase internal)
  const { data: topViewed } = await supabase
    .from('products')
    .select('id, name, view_count')
    .order('view_count', { ascending: false })
    .limit(5);

  // 6. Top Selling Items
  const { data: allOrderItems } = await supabase
    .from('order_items')
    .select('product_id, product_name, quantity, orders!inner(status)')
    .neq('orders.status', 'cancelled');

  let salesCount: Record<string, { name: string, count: number }> = {};
  allOrderItems?.forEach(item => {
    if (!item.product_id) return;
    if (!salesCount[item.product_id]) salesCount[item.product_id] = { name: item.product_name, count: 0 };
    salesCount[item.product_id].count += item.quantity;
  });

  const topSelling = Object.values(salesCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 7. Low Stock Alerts
  const { data: lowStockItems } = await supabase
    .from('products')
    .select('id, name, stock')
    .lt('stock', 5)
    .order('stock', { ascending: true })
    .limit(5);

  return (
    <div className="flex flex-col gap-6 w-full pb-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            System Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time administrative metrics and status
          </p>
        </div>
        <div className="self-start sm:self-auto">
          <ExportCsvButton />
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-sm shadow-none border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Revenue (Today)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueToday.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Since 00:00</p>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Revenue (Month)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Current billing cycle</p>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allOrders?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">System total records</p>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Traffic</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPageViews > 0 ? totalPageViews.toLocaleString() : '---'}</div>
            <p className="text-xs text-muted-foreground mt-1">Total impressions</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts Component */}
      <div className="w-full">
        <DashboardCharts revenueByDay={revenueChartData} ordersByStatus={statusChartData} />
      </div>

      {/* Lists Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-sm shadow-none border col-span-1 lg:col-span-1">
          <CardHeader className="border-b pb-4 mb-4">
            <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders?.map((order: any) => (
                <div key={order.id} className="flex justify-between items-start text-sm pb-3 border-b last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <span className="font-medium">{order.user_name || 'System User'}</span>
                    <p className="text-xs text-muted-foreground font-mono">ID: {order.ticket_id}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">₹{order.total_amount}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {!recentOrders?.length && <div className="text-sm text-muted-foreground">No records.</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none border col-span-1 lg:col-span-1">
          <CardHeader className="border-b pb-4 mb-4">
            <CardTitle className="text-base font-semibold">Volume Leaders</CardTitle>
            <CardDescription className="text-xs">Based on cleared orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSelling.map((item: { name: string, count: number }, i: number) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="truncate pr-2 font-medium">{item.name}</span>
                  <span className="text-[10px] text-muted-foreground border px-1.5 py-0.5 rounded-[2px] bg-muted/30 whitespace-nowrap">{item.count} units</span>
                </div>
              ))}
              {!topSelling.length && <div className="text-sm text-muted-foreground">No data.</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none border col-span-1 lg:col-span-1">
          <CardHeader className="border-b pb-4 mb-4">
            <CardTitle className="text-base font-semibold">Traffic Leaders</CardTitle>
            <CardDescription className="text-xs">Based on views metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topViewed?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="truncate pr-2 font-medium">{item.name}</span>
                  <span className="text-[10px] text-muted-foreground border px-1.5 py-0.5 rounded-[2px] bg-muted/30 whitespace-nowrap">{item.view_count || 0} hits</span>
                </div>
              ))}
              {!topViewed?.length && <div className="text-sm text-muted-foreground">No data.</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm shadow-none border col-span-1 lg:col-span-1">
          <CardHeader className="border-b pb-4 mb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Stock Flags
            </CardTitle>
            <CardDescription className="text-xs">Inventory depletion detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="truncate pr-2 font-medium">{item.name}</span>
                  <span className="text-[10px] text-red-600 border border-red-200 bg-red-50/50 px-1.5 py-0.5 rounded-[2px] whitespace-nowrap">{item.stock} left</span>
                </div>
              ))}
              {(!lowStockItems || lowStockItems.length === 0) && <div className="text-sm text-muted-foreground">All levels optimal.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
