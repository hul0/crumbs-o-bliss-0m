1. Supabase Auth for Admin and Manager & Panels for both.
- Admin panel must have : Product Management system, Statistical Dashboard, Order Management System.


### Product Management system 
Create, update, delete products.
Supabase to store product data & imagekit to store images.

Create, update, delete custom catalogues.

### Statistical Dashboard
Various statistics Like - Total website analytics, top viewed items, top selling items, revenue today, this week, this month, this year.
Export data to CSV.

### Order Management system 
User orders -> save this order to supabase orders table with order details + user details with Order UID (which will be ticket , Randomly Generated client side and sent to supabase , not generated in supabase) -> Order details + User details + live tracking ticket with link host.com/track/TICKET -> Admin decides what to do next.

Admin logs in -> updates the status of the order (from Pending to -> Confirmed/Cancelled/Delivered) -> can add notes for the user -> can generate an e-bill and send to user's whatsapp directly using whatsapp's free API wa.me/ 

Manager -> can only generate e-bill

User -> can only check order, view and download the bill. User will be prompted for his phone number before he can track the order.

No User Login/Auth needed. Only admin and manager auth will be happened from direct supabase dashboard only. So no signup, only login.