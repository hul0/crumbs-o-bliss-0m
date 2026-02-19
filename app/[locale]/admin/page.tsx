
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"
import ExportCsvButton from "@/components/admin/export-csv-button"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Fetch stats (placeholder for now)
  // In real implementation, we would query the 'orders' table.
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  // Revenue calculation would require a sum query, arguably better done via a custom RPC or client side for small data
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          <ExportCsvButton />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orderCount || 0}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount || 0}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Chart will go here */}
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Revenue Chart Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Recent sales list */}
             <div className="space-y-8">
                <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Olivia Martin</p>
                        <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
