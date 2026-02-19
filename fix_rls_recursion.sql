-- Fix Infinite Recursion in RLS Policies

-- 1. Create a secure function to check if the current user is an admin or manager.
-- reliable and bypasses RLS on the profiles table because it is SECURITY DEFINER.
CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS BOOLEAN AS $$
DECLARE
  current_role text;
BEGIN
  -- Select role directly. Since this is SECURITY DEFINER, it runs with owner privileges.
  SELECT role INTO current_role FROM public.profiles WHERE id = auth.uid();
  RETURN current_role IN ('admin', 'manager');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create a secure function to check if the current user is an admin.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  current_role text;
BEGIN
  SELECT role INTO current_role FROM public.profiles WHERE id = auth.uid();
  RETURN current_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Drop existing recursive policies
DROP POLICY IF EXISTS "Admins/Managers view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins and Managers can view all profiles" ON profiles; -- Covers potential name variations
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage catalogues" ON custom_catalogues;
DROP POLICY IF EXISTS "Admins manage catalogue items" ON catalogue_items;
DROP POLICY IF EXISTS "Admins/Managers view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Admins/Managers view order items" ON order_items;

-- 4. Re-create policies using the new secure functions

-- Profiles
CREATE POLICY "Admins/Managers view all profiles" ON profiles FOR SELECT USING (
  auth.uid() = id OR public.is_admin_or_manager()
);

-- Products
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  public.is_admin()
);

-- Custom Catalogues
CREATE POLICY "Admins can manage catalogues" ON custom_catalogues FOR ALL USING (
  public.is_admin()
);

-- Catalogue Items
CREATE POLICY "Admins manage catalogue items" ON catalogue_items FOR ALL USING (
  public.is_admin()
);

-- Orders
CREATE POLICY "Admins/Managers view all orders" ON orders FOR SELECT USING (
  public.is_admin_or_manager()
);

CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (
  public.is_admin()
);

-- Order Items
CREATE POLICY "Admins/Managers view order items" ON order_items FOR SELECT USING (
  public.is_admin_or_manager()
);
