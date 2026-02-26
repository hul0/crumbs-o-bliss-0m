
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  image_url: z.string().optional(), // Could add image upload here too if needed
  is_active: z.boolean().default(true),
})

type CatalogueFormProps = {
  catalogue?: any
  onSuccess?: () => void
}

export default function CatalogueForm({ catalogue, onSuccess }: CatalogueFormProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: catalogue?.name || '',
      description: catalogue?.description || '',
      image_url: catalogue?.image_url || '',
      is_active: catalogue?.is_active ?? true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    let error

    if (catalogue?.id) {
      const { error: updateError } = await supabase
        .from('custom_catalogues')
        .update(values)
        .eq('id', catalogue.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('custom_catalogues')
        .insert([values])
      error = insertError
    }

    setLoading(false)

    if (error) {
      console.error(error)
      alert('Failed to save catalogue')
    } else {
      router.refresh()
      if (onSuccess) onSuccess()
      // If inside a dialog, we might want to close it. 
      // onSuccess callback handles that if provided.
      // But we can also refresh.
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Summer Sale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Catalogue description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full rounded-sm h-10 text-xs font-semibold uppercase tracking-wider">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "COMMITTING..." : "COMMIT CHANGES"}
        </Button>
      </form>
    </Form>
  )
}
