
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
            <div className="flex items-center justify-between pb-2 border-b">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items ({existingItems.length})</h3>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] justify-between rounded-sm h-8 text-[10px] font-semibold uppercase tracking-wider">
                            <Plus className="mr-2 h-3 w-3" />
                            LINK PRODUCT
                            <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[180px] p-0 rounded-sm">
                        <Command>
                            <CommandInput placeholder="Search product..." className="text-xs" />
                            <CommandList>
                                <CommandEmpty className="text-xs py-4 text-center">No results.</CommandEmpty>
                                <CommandGroup>
                                    {availableProducts.map((product) => (
                                        <CommandItem
                                            key={product.id}
                                            value={product.name}
                                            onSelect={() => addProduct(product.id)}
                                            className="text-xs"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-3 w-3",
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {existingItems.map(product => (
                    <div key={product.id} className="flex items-center space-x-3 border border-border/50 p-2 rounded-[2px] bg-muted/10 hover:bg-muted/30 transition-colors">
                        <div className="relative w-8 h-8 rounded-[2px] overflow-hidden bg-muted border border-border/50">
                            {product.image_url && (
                                <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{product.name}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-[2px] text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeProduct(product.id)} disabled={loading}>
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
            </div>
            {existingItems.length === 0 && (
                <div className="text-center py-8 text-xs font-mono text-muted-foreground border border-dashed rounded-[2px]">
                    NO BINDINGS EXIST FOR THIS CATALOGUE.
                </div>
            )}
        </div>
    )
}
