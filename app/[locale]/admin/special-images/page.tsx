
import { createClient } from '@/utils/supabase/server'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus, Image as ImageIcon, ExternalLink, Edit } from 'lucide-react'
import Image from 'next/image'
import SpecialImageForm from '@/components/admin/special-image-form'
import { Badge } from '@/components/ui/badge'

export default async function SpecialImagesPage() {
  const supabase = await createClient()

  const { data: images } = await supabase
    .from('special_images')
    .select('*')
    .order('category', { ascending: true })
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Special Images</h1>
          <p className="text-sm text-muted-foreground">
            Manage images for the landing page gallery, menu, and other sections.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-sm h-9 text-xs font-semibold uppercase tracking-wider">
              <Plus className="mr-2 h-4 w-4" />
              ADD IMAGE
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Special Image</DialogTitle>
              <DialogDescription>
                Add a new image to be used in specific sections of the website.
              </DialogDescription>
            </DialogHeader>
            <SpecialImageForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px]">Preview</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images?.map((image) => (
              <TableRow key={image.id}>
                <TableCell>
                  <div className="relative h-12 w-12 rounded-sm overflow-hidden bg-muted border">
                    <Image
                      src={image.image_url}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{image.name}</span>
                    {image.link_url && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="h-2 w-2" /> {image.link_url}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-sm text-[10px] uppercase font-bold tracking-widest">
                    {image.category}
                  </Badge>
                </TableCell>
                <TableCell>{image.display_order}</TableCell>
                <TableCell>
                  {image.is_active ? (
                    <Badge className="bg-green-500 hover:bg-green-600 rounded-sm text-[10px] uppercase">Active</Badge>
                  ) : (
                    <Badge variant="secondary" className="rounded-sm text-[10px] uppercase">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Special Image</DialogTitle>
                        <SpecialImageForm specialImage={image} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
            {(!images || images.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                  No images found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
