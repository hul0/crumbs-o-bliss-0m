
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, Package, XCircle } from 'lucide-react'

export function OrderStatusBadge({ status }: { status: string }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'border-yellow-500/50 text-yellow-600 dark:text-yellow-500 bg-yellow-500/10 order-status-pending';
            case 'confirmed': return 'border-blue-500/50 text-blue-600 dark:text-blue-500 bg-blue-500/10 order-status-confirmed';
            case 'delivered': return 'border-green-500/50 text-green-600 dark:text-green-500 bg-green-500/10 order-status-delivered';
            case 'cancelled': return 'border-red-500/50 text-red-600 dark:text-red-500 bg-red-500/10 order-status-cancelled';
            default: return 'border-gray-500/50 text-gray-600 dark:text-gray-500 bg-gray-500/10';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="h-2.5 w-2.5" />;
            case 'confirmed': return <CheckCircle2 className="h-2.5 w-2.5" />;
            case 'delivered': return <Package className="h-2.5 w-2.5" />;
            case 'cancelled': return <XCircle className="h-2.5 w-2.5" />;
            default: return <Clock className="h-2.5 w-2.5" />;
        }
    }

    return (
        <Badge variant="outline" className={`gap-1 rounded-[2px] font-mono text-[10px] uppercase tracking-widest px-1.5 py-0 border ${getStatusColor(status)}`}>
            {getStatusIcon(status)}
            <span>{status}</span>
        </Badge>
    )
}
