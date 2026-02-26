
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

export default function DeleteCatalogueButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    async function handleDelete() {
        setLoading(true)
        const { error } = await supabase.from('custom_catalogues').delete().eq('id', id)
        if (error) {
            console.error(error)
            alert('Failed to delete catalogue')
        } else {
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
                        This will sever the catalogue entity. Associated products remain in the database unlinked.
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
