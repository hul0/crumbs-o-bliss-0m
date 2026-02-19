
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
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
