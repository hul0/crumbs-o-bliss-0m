
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { IKContext, IKUpload } from 'imagekitio-react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.enum(['landing', 'menu', 'other']),
  image_url: z.string().url('Image is required'),
  link_url: z.string().optional(),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  display_order: z.preprocess((val) => Number(val), z.number().default(0)),
})

type SpecialImageFormProps = {
  specialImage?: any
  onSuccess?: () => void
}

export default function SpecialImageForm({ specialImage, onSuccess }: SpecialImageFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: specialImage?.name || '',
      category: specialImage?.category || 'landing',
      image_url: specialImage?.image_url || '',
      link_url: specialImage?.link_url || '',
      description: specialImage?.description || '',
      is_active: specialImage?.is_active ?? true,
      display_order: specialImage?.display_order || 0,
    },
  })

  const authenticator = async () => {
    try {
      const response = await fetch(`/api/imagekit/auth`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      return { signature: data.signature, expire: data.expire, token: data.token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err: any) => {
    console.error('Upload Error', err)
    setUploading(false)
    alert('Image upload failed')
  }

  const onSuccessUpload = (res: any) => {
    setUploading(false)
    form.setValue('image_url', res.url)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    let error

    if (specialImage?.id) {
      const { error: updateError } = await supabase
        .from('special_images')
        .update(values)
        .eq('id', specialImage.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('special_images')
        .insert([values])
      error = insertError
    }

    setLoading(false)

    if (error) {
      console.error(error)
      alert('Failed to save image')
    } else {
      router.refresh()
      if (onSuccess) onSuccess()
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
              <FormLabel>Name (Admin Reference)</FormLabel>
              <FormControl>
                <Input placeholder="Home Hero Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-sm">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="menu">Menu Gallery</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <IKContext
          publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value ? (
                      <div className="relative w-full aspect-video border rounded-lg overflow-hidden group">
                        <Image src={field.value} alt="Special Image" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => field.onChange('')}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border border-dashed rounded-lg p-8 text-center bg-muted/50">
                        {uploading ? (
                          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <span className="text-sm font-medium">Uploading to Cloud...</span>
                          </div>
                        ) : (
                          <IKUpload
                            fileName="special_"
                            onError={onError}
                            onSuccess={onSuccessUpload}
                            onUploadStart={() => setUploading(true)}
                            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </IKContext>

        <FormField
          control={form.control}
          name="link_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="/customization or external link" {...field} />
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
              <FormLabel>Description / Caption (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description seen by users..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="display_order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 mt-6">
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
        </div>

        <Button type="submit" disabled={loading || uploading} className="w-full rounded-sm h-10 text-xs font-semibold uppercase tracking-wider">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "SAVING..." : "SAVE IMAGE"}
        </Button>
      </form>
    </Form>
  )
}
