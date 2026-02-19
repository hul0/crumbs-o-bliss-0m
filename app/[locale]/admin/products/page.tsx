
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Create a new product for the catalog.</DialogDescription>
                </DialogHeader>
                <ProductForm />
            </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg p-4 bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                    {product.image_url && (
                        <div className="relative w-10 h-10 rounded overflow-hidden">
                            <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                        </div>
                    )}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.view_count}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
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
                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                        No products found. Add some!
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
