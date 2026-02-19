
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Pencil, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import DeleteCatalogueButton from '@/components/admin/delete-catalogue-button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import CatalogueForm from '@/components/admin/catalogue-form'

export default async function CataloguesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: catalogues } = await supabase.from('custom_catalogues').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Custom Catalogues</h1>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Catalogue
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Catalogue</DialogTitle>
                </DialogHeader>
                <CatalogueForm />
            </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg p-4 bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {catalogues?.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>
                    {cat.image_url ? (
                        <div className="relative w-10 h-10 rounded overflow-hidden">
                            <Image src={cat.image_url} alt={cat.name} fill className="object-cover" />
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">None</div>
                    )}
                </TableCell>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>{cat.is_active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(cat.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={`/${locale}/admin/catalogues/${cat.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Manage
                            </Link>
                        </Button>
                        <DeleteCatalogueButton id={cat.id} />
                    </div>
                </TableCell>
              </TableRow>
            ))}
            {!catalogues?.length && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                        No catalogues found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
