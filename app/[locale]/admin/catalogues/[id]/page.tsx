
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import CatalogueForm from '@/components/admin/catalogue-form'
import CatalogueManager from '@/components/admin/catalogue-manager'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export default async function CatalogueDetailsPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch Catalogue
  const { data: catalogue } = await supabase
    .from('custom_catalogues')
    .select('*')
    .eq('id', id)
    .single()

  if (!catalogue) {
    notFound()
  }

  // Fetch Items in Catalogue
  const { data: itemsRef } = await supabase
    .from('catalogue_items')
    .select('product_id')
    .eq('catalogue_id', id)
  
  const productIds = itemsRef?.map(i => i.product_id) || []
  
  let existingItems: any[] = []
  if (productIds.length > 0) {
      const { data: products } = await supabase
        .from('products')
        .select('id, name, image_url')
        .in('id', productIds)
      existingItems = products || []
  }

  // Fetch All Products (for adding)
  const { data: allProducts } = await supabase
    .from('products')
    .select('id, name, image_url')
    .eq('is_active', true)

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-lg font-semibold md:text-2xl">Manage Catalogue</h1>
            <p className="text-muted-foreground">{catalogue.name}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Products in Catalogue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CatalogueManager 
                            catalogueId={id} 
                            existingItems={existingItems} 
                            allProducts={allProducts || []} 
                        />
                    </CardContent>
                 </Card>
            </div>
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CatalogueForm catalogue={catalogue} />
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  )
}
