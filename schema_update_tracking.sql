
-- Function to securely fetch order details by ticket and phone
create or replace function get_order_details(p_ticket_id text, p_phone text)
returns json
language plpgsql
security definer
as $$
declare
  v_order json;
  v_items json;
begin
  -- Check if order exists and phone matches
  -- Note: p_phone might need normalization logic in real app, here exact match
  select to_json(o) into v_order
  from orders o
  where o.ticket_id = p_ticket_id and o.user_phone = p_phone;

  if v_order is null then
    return null;
  end if;

  -- Fetch items
  select json_agg(i) into v_items
  from order_items i
  where i.order_id = (v_order->>'id')::uuid;

  -- Return combined result
  return json_build_object(
    'order', v_order,
    'items', v_items
  );
end;
$$;
