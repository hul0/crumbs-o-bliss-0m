-- Force Fix Permissions
-- 1. Ensure the user has the 'admin' role (Explicitly targeting the ID from logs)
UPDATE public.profiles
SET role = 'admin'
WHERE id = '1307d75d-fbb4-4c18-8f24-326c2a3daad0';

-- 2. Validate/Redefine the security definer function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  current_role text;
BEGIN
  -- Case-insensitive check
  SELECT lower(role) INTO current_role FROM public.profiles WHERE id = auth.uid();
  RETURN current_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS BOOLEAN AS $$
DECLARE
  current_role text;
BEGIN
  -- Case-insensitive check
  SELECT lower(role) INTO current_role FROM public.profiles WHERE id = auth.uid();
  RETURN current_role IN ('admin', 'manager');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Re-apply Policies (Drop first to be safe)
DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  public.is_admin()
);

-- 4. Grant access to authenticated users (just in case RLS defaults are weird)
GRANT ALL ON public.products TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
