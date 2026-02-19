
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown, Plus, Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Product = {
    id: string
    name: string
    image_url: string
}

type CatalogueManagerProps = {
    catalogueId: string
    existingItems: Product[]
    allProducts: Product[]
}

export default function CatalogueManager({ catalogueId, existingItems, allProducts }: CatalogueManagerProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    // Filter out products already in catalogue
    const availableProducts = allProducts.filter(p => !existingItems.some(item => item.id === p.id))

    async function addProduct(productId: string) {
        setLoading(true)
        const { error } = await supabase
            .from('catalogue_items')
            .insert({ catalogue_id: catalogueId, product_id: productId })
        
        if (error) {
            console.error(error)
            alert('Failed to add product')
        } else {
            router.refresh()
            setOpen(false)
        }
        setLoading(false)
    }

    async function removeProduct(productId: string) {
        if (!confirm('Remove this product from catalogue?')) return
        setLoading(true)
        const { error } = await supabase
            .from('catalogue_items')
            .delete()
            .eq('catalogue_id', catalogueId)
            .eq('product_id', productId)

        if (error) {
            console.error(error)
            alert('Failed to remove product')
        } else {
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Items ({existingItems.length})</h3>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search product..." />
                            <CommandList>
                                <CommandEmpty>No product found.</CommandEmpty>
                                <CommandGroup>
                                    {availableProducts.map((product) => (
                                        <CommandItem
                                            key={product.id}
                                            value={product.name}
                                            onSelect={() => addProduct(product.id)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    "opacity-0" // Always hidden as verified by logic
                                                )}
                                            />
                                            {product.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {existingItems.map(product => (
                    <div key={product.id} className="flex items-center space-x-4 border p-4 rounded-lg bg-card">
                         <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                            {product.image_url && (
                                <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeProduct(product.id)} disabled={loading}>
                             <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
            {existingItems.length === 0 && (
                <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                    No items in this catalogue.
                </div>
            )}
        </div>
    )
}
