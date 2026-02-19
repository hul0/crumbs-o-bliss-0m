-- Create a table for public profiles linked to auth.users
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  role text check (role in ('admin', 'manager', 'user')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for products
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  stock integer default 0,
  image_url text, -- Store the full ImageKit URL
  image_file_path text, -- Store the file path in ImageKit for easier deletion
  category text,
  view_count integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for custom catalogues
create table custom_catalogues (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for linking products to catalogues (Many-to-Many)
create table catalogue_items (
  catalogue_id uuid references custom_catalogues(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  primary key (catalogue_id, product_id)
);

-- Create a table for orders
create table orders (
  id uuid default gen_random_uuid() primary key,
  ticket_id text unique not null, -- Usage: Random string generated on client
  user_name text,
  user_email text, -- Optional
  user_phone text, -- Required for tracking
  total_amount numeric not null,
  status text check (status in ('pending', 'confirmed', 'cancelled', 'delivered')) default 'pending',
  admin_notes text,
  delivery_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for order items
create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete set null, -- Keep verification history even if product deleted
  product_name text not null, -- Snapshot of product name at time of order
  quantity integer not null,
  price_at_time numeric not null, -- Snapshot of price at time of order
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table products enable row level security;
alter table custom_catalogues enable row level security;
alter table catalogue_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies

-- Profiles:
-- Users can view their own profile.
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
-- Admins and Managers can view all profiles.
create policy "Admins/Managers view all profiles" on profiles for select using (
  auth.uid() in (select id from profiles where role in ('admin', 'manager'))
);

-- Products:
-- Everyone can view products (public read).
create policy "Public products are viewable by everyone" on products for select using (true);
-- Only Admins can insert/update/delete products.
create policy "Admins can manage products" on products for all using (
  auth.uid() in (select id from profiles where role = 'admin')
);

-- Custom Catalogues:
-- Everyone can view active catalogues.
create policy "Public catalogues are viewable by everyone" on custom_catalogues for select using (is_active = true);
-- Admins can manage catalogues.
create policy "Admins can manage catalogues" on custom_catalogues for all using (
  auth.uid() in (select id from profiles where role = 'admin')
);
-- Catalogue Items: Public read, Admin write
create policy "Public catalogue items viewable" on catalogue_items for select using (true);
create policy "Admins manage catalogue items" on catalogue_items for all using (
  auth.uid() in (select id from profiles where role = 'admin')
);


-- Orders:
-- Public can create orders (INSERT).
create policy "Public can create orders" on orders for insert with check (true);
-- Users can view their order if they have the ticket_id (Handled via tracking page logic, but for RLS we need a strategy).
-- Strategy: We might use a secure function or just allow public read on orders specific columns if they know ticket_id? 
-- Better approach: "Admins and Managers can view all orders."
create policy "Admins/Managers view all orders" on orders for select using (
  auth.uid() in (select id from profiles where role in ('admin', 'manager'))
);
-- Admins can update orders.
create policy "Admins can update orders" on orders for update using (
  auth.uid() in (select id from profiles where role = 'admin')
);
-- Managers can only view (already covered) or maybe update status?
-- Requirement: "Manager -> can only generate e-bill". So read-only on orders table + maybe write logs.

-- Order Items:
-- Public can insert order items.
create policy "Public can create order items" on order_items for insert with check (true);
-- Admins/Managers can view.
create policy "Admins/Managers view order items" on order_items for select using (
  auth.uid() in (select id from profiles where role in ('admin', 'manager'))
);


-- Function to handle new user signup (Trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed an Admin User (Optional - You'll likely do this manually or update the role)
-- update profiles set role = 'admin' where email = 'your-email@example.com';
