-- Seed Products from lib/items.ts
-- Note: Images are set to null or placeholder as requested by user to be handled in dashboard.

INSERT INTO public.products (name, description, price, stock, category, is_active, image_url)
VALUES 
  (
    'Butter scoth Cake (1 Pound)', 
    'Rich and creamy butterscotch cake topped with crunchy praline and butterscotch sauce.', 
    0, 
    50, -- Default stock
    'Cake', 
    true,
    '/assets/products/1 pound butter scotch p310.png'
  ),
  (
    'Chocolate Cake (1 Pound)', 
    'Decadent chocolate cake made with premium cocoa and layered with rich chocolate ganache.', 
    0, 
    50,
    'Cake', 
    true,
    '/assets/products/1 pound chocolate p320.png'
  ),
  (
    'Choco Vanilla Pastry', 
    'A perfect blend of chocolate and vanilla layers in a light, airy pastry.', 
    0, 
    50,
    'Pastry', 
    true,
    '/assets/products/Choco Vanilla Pastry p29.png'
  ),
  (
    'Straw berry Pastry', 
    'Fresh strawberry-flavored pastry with cream and real fruit bits.', 
    0, 
    50,
    'Pastry', 
    true,
    '/assets/products/Strawberry Pastry p35.png'
  );
