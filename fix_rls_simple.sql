-- Emergency Fix: Hardcode access for your specific Admin ID.
-- This bypasses the separate function check to rule out any logic errors there.

-- 1. Reset Policies for Products
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Public products are viewable by everyone" ON products;

-- 2. Allow Public Read
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);

-- 3. Allow YOUR User ID to do EVERYTHING (Insert, Update, Delete)
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  auth.uid() = '1307d75d-fbb4-4c18-8f24-326c2a3daad0'::uuid
);

-- 4. Do the same for Catalogues and Catalogue Items just in case
DROP POLICY IF EXISTS "Admins can manage catalogues" ON custom_catalogues;
CREATE POLICY "Admins can manage catalogues" ON custom_catalogues FOR ALL USING (
  auth.uid() = '1307d75d-fbb4-4c18-8f24-326c2a3daad0'::uuid
);

DROP POLICY IF EXISTS "Admins manage catalogue items" ON catalogue_items;
CREATE POLICY "Admins manage catalogue items" ON catalogue_items FOR ALL USING (
  auth.uid() = '1307d75d-fbb4-4c18-8f24-326c2a3daad0'::uuid
);

-- 5. Force public read on these too
DROP POLICY IF EXISTS "Public catalogues are viewable by everyone" ON custom_catalogues;
CREATE POLICY "Public catalogues are viewable by everyone" ON custom_catalogues FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public catalogue items viewable" ON catalogue_items;
CREATE POLICY "Public catalogue items viewable" ON catalogue_items FOR SELECT USING (true);
