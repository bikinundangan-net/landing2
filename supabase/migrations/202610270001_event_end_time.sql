-- Apply before deploying a client that explicitly selects event_end_time.
-- Existing invitations keep their original start time and a null end time.
alter table public.order_events
  add column if not exists event_end_time time;

update public.order_events
set event_end_time = '09:00:00'
where event_type = 'akad'
  and event_date = '2026-11-08'
  and order_id in (
    select id from public.invitation_orders where public_slug = 'ibnu-dinata'
  );
