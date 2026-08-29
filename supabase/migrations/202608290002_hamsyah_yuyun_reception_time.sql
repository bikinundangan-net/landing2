update public.order_events
set event_time = '10:30:00'
where event_type = 'resepsi'
  and order_id in (
    select id
    from public.invitation_orders
    where public_slug = 'hamsyah-yuyun'
  );
