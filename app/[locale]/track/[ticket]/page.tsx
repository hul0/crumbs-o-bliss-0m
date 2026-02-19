
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import OrderTrackingClient from '@/components/order-tracking-client'

type Props = {
  params: Promise<{ ticket: string; locale: string }>
}

export default async function TrackOrderPage({ params }: Props) {
  const { ticket, locale } = await params
  const supabase = await createClient()
  
  // Fetch order summary first just to check existence (and public columns if we had them public)
  // But due to RLS, we might not be able to read it without a "privileged" fetch or public policy.
  // My RLS said: "Admins/Managers view all orders". "Public can create orders".
  // Public CANNOT select orders by default.
  // So standard 'select' will return empty.
  
  // STRATEGY:
  // We need a secure way to fetch the order IF the user provides the correct phone number.
  // Since we don't have a backend logic (Edge Function) set up for this specific RPC yet,
  // we might need to bypass RLS or use `supabase-admin` (service role) to fetch and verify.
  // But `createClient` uses user session or anon key. Anon key has strict RLS.
  
  // Option 1: Create a Server Action that uses Service Role?
  // I need the SERVICE_ROLE_KEY for that. It's usually in env as SUPABASE_SERVICE_ROLE_KEY.
  // Let's assume I have it or I need to add it.
  
  // Option 2: Adjust RLS to allow reading an order if you know the `ticket_id` AND `user_phone`?
  // "orders" policy: `create policy "Public can view order with phone" on orders for select using (ticket_id = current_setting('app.current_ticket') AND user_phone = current_setting('app.current_phone'));`
  // That's complex.
  
  // Let's check if we have SERVICE_ROLE_KEY in env.
  
  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
       <OrderTrackingClient ticket={ticket} />
    </div>
  )
}
