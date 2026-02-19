'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

export default function ExportCsvButton() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    async function handleExport() {
        setLoading(true)
        // Fetch all orders with details
        const { data: orders } = await supabase
            .from('orders')
            .select(`
                id,
                ticket_id,
                user_name,
                user_phone,
                total_amount,
                status,
                created_at
            `)
            .order('created_at', { ascending: false })
            
        if (!orders || orders.length === 0) {
            alert('No data to export')
            setLoading(false)
            return
        }

        // Convert to CSV
        const headers = ['Ticket ID', 'Customer', 'Phone', 'Total', 'Status', 'Date']
        const csvContent = [
            headers.join(','),
            ...orders.map(order => [
                order.ticket_id,
                `"${order.user_name || ''}"`, // Wrap in quotes for commas
                order.user_phone,
                order.total_amount,
                order.status,
                new Date(order.created_at).toISOString().split('T')[0]
            ].join(','))
        ].join('\n')

        // Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', 'orders_export.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        setLoading(false)
    }

    return (
        <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
        </Button>
    )
}
