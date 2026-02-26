
import { createClient } from '@/utils/supabase/server'
import ProductForm from '@/components/admin/product-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
import DeleteProductButton from '@/components/admin/delete-product-button'

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Products Database</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-sm font-semibold text-xs tracking-wider uppercase h-8 px-3">
              <Plus className="mr-2 h-3.5 w-3.5" />
              ADD RECORD
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-sm">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Create a new product for the catalog.</DialogDescription>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-sm bg-card shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px] text-xs uppercase tracking-wider font-semibold">IMAGE</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">NAME</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">CATEGORY</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">PRICE</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">STOCK</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">VIEWS</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id} className="group">
                <TableCell>
                  {product.image_url && (
                    <div className="relative w-8 h-8 rounded-[2px] overflow-hidden border">
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-sm">{product.name}</TableCell>
                <TableCell className="capitalize text-sm text-muted-foreground">{product.category}</TableCell>
                <TableCell className="text-sm">₹{product.price}</TableCell>
                <TableCell className="text-sm">{product.stock}</TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground">{product.view_count}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-sm hover:bg-muted">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-sm">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        <ProductForm product={product} />
                      </DialogContent>
                    </Dialog>
                    <DeleteProductButton id={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!products?.length && (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-sm text-muted-foreground">
                  No records found in database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
