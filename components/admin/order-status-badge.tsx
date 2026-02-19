
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, Package, XCircle } from 'lucide-react'

export function OrderStatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
      switch(status) {
          case 'pending': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 order-status-pending';
          case 'confirmed': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 order-status-confirmed';
          case 'delivered': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 order-status-delivered';
          case 'cancelled': return 'bg-red-500/10 text-red-500 hover:bg-red-500/20 order-status-cancelled';
          default: return 'bg-gray-500/10 text-gray-500';
      }
  }

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'pending': return <Clock className="h-3 w-3" />;
          case 'confirmed': return <CheckCircle2 className="h-3 w-3" />;
          case 'delivered': return <Package className="h-3 w-3" />;
          case 'cancelled': return <XCircle className="h-3 w-3" />;
          default: return <Clock className="h-3 w-3" />;
      }
  }

  return (
    <Badge variant="outline" className={`gap-1.5 ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        <span className="capitalize">{status}</span>
    </Badge>
  )
}
