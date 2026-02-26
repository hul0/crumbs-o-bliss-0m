
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
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Catalogue Definitions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-sm font-semibold text-xs tracking-wider uppercase h-8 px-3">
              <Plus className="mr-2 h-3.5 w-3.5" />
              NEW CATALOGUE
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-sm">
            <DialogHeader>
              <DialogTitle>Create Catalogue</DialogTitle>
            </DialogHeader>
            <CatalogueForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-sm bg-card shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px] text-xs uppercase tracking-wider font-semibold">IMAGE</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">NAME</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">ACTIVE</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">CREATED</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {catalogues?.map((cat) => (
              <TableRow key={cat.id} className="group">
                <TableCell>
                  {cat.image_url ? (
                    <div className="relative w-8 h-8 rounded-[2px] overflow-hidden border">
                      <Image src={cat.image_url} alt={cat.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded-[2px] border flex items-center justify-center text-[10px] text-muted-foreground font-mono">N/A</div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-sm">{cat.name}</TableCell>
                <TableCell className="text-sm">
                  {cat.is_active ?
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">TRUE</span> :
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">FALSE</span>
                  }
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(cat.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" asChild className="rounded-sm h-8 text-xs hover:bg-muted font-medium">
                      <Link href={`/${locale}/admin/catalogues/${cat.id}`}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        MANAGE
                      </Link>
                    </Button>
                    <DeleteCatalogueButton id={cat.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!catalogues?.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-sm text-muted-foreground">
                  No database entries found for catalogues.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
