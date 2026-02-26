
'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DeleteProductButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    async function handleDelete() {
        setLoading(true)
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        console.log('Current User in Delete Component:', user?.id, user?.email, authError)

        console.log('Attempting to delete product with ID:', id)
        const { data, error } = await supabase.from('products').delete().eq('id', id).select()

        console.log('Delete response:', { data, error })

        if (error) {
            console.error('Supabase Delete Error:', error)
            alert(`Failed to delete product: ${error.message}`)
        } else if (!data || data.length === 0) {
            console.error('Delete succeeded but no rows returned. Possible RLS issue or ID mismatch.')
            alert('Failed to delete product: No rows affected. Check permissions.')
        } else {
            console.log('Product deleted successfully:', data)
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-sm text-destructive hover:text-destructive hover:bg-destructive/10">
                    {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-sm">
                <AlertDialogHeader>
                    <AlertDialogTitle className="uppercase tracking-wider text-sm font-semibold text-destructive">Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        This action is irreversible. The record will be permanently purged from the system database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-sm h-8 px-3 text-xs font-semibold uppercase tracking-wider">CANCEL</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="rounded-sm h-8 px-3 text-xs font-semibold uppercase tracking-wider bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        CONFIRM PURGE
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
