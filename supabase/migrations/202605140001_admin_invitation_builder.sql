create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_profiles_role_check check (role in ('admin'))
);

create table if not exists public.invitation_templates (
  slug text primary key,
  name text not null,
  theme text not null,
  image_path text not null,
  palette jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.packages (
  slug text primary key,
  name text not null,
  price numeric(12, 0) not null,
  duration_months int not null,
  features jsonb not null default '[]'::jsonb,
  is_popular boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint packages_price_check check (price >= 0),
  constraint packages_duration_check check (duration_months > 0)
);

create table if not exists public.addons (
  slug text primary key,
  name text not null,
  category text not null,
  price numeric(12, 0) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint addons_price_check check (price >= 0)
);

create table if not exists public.invitation_orders (
  id bigint generated always as identity primary key,
  created_by uuid references auth.users(id) on delete set null,
  public_slug text not null unique,
  customer_name text not null,
  customer_whatsapp text not null,
  customer_email text,
  groom_name text not null,
  bride_name text not null,
  package_slug text not null references public.packages(slug),
  package_name text not null,
  template_slug text not null references public.invitation_templates(slug),
  payment_status text not null default 'belum_bayar',
  work_status text not null default 'baru',
  subtotal_price numeric(12, 0) not null default 0,
  addon_total numeric(12, 0) not null default 0,
  total_price numeric(12, 0) not null default 0,
  active_until timestamptz,
  music_title text,
  love_story text,
  gift_account text,
  notes text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint invitation_orders_slug_check check (public_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint invitation_orders_payment_status_check check (payment_status in ('belum_bayar', 'menunggu', 'lunas', 'refund')),
  constraint invitation_orders_work_status_check check (work_status in ('baru', 'data_lengkap', 'dikerjakan', 'review', 'selesai')),
  constraint invitation_orders_price_check check (subtotal_price >= 0 and addon_total >= 0 and total_price >= 0)
);

create table if not exists public.order_events (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.invitation_orders(id) on delete cascade,
  event_type text not null default 'akad',
  title text not null,
  event_date date not null,
  event_time time,
  location_name text not null,
  maps_url text,
  created_at timestamptz not null default now(),
  constraint order_events_type_check check (event_type in ('akad', 'resepsi', 'other'))
);

create table if not exists public.order_addons (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.invitation_orders(id) on delete cascade,
  addon_slug text not null references public.addons(slug),
  addon_name text not null,
  price_snapshot numeric(12, 0) not null,
  created_at timestamptz not null default now(),
  constraint order_addons_price_check check (price_snapshot >= 0)
);

create table if not exists public.order_assets (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.invitation_orders(id) on delete cascade,
  asset_type text not null,
  file_name text not null,
  storage_path text not null,
  public_url text not null,
  file_size bigint not null default 0,
  mime_type text,
  created_at timestamptz not null default now(),
  constraint order_assets_type_check check (asset_type in ('gallery', 'video', 'music', 'hero', 'save_the_date', 'other'))
);

create table if not exists public.rsvps (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.invitation_orders(id) on delete cascade,
  guest_name text not null,
  attendance text not null,
  guest_count int not null default 1,
  message text,
  created_at timestamptz not null default now(),
  constraint rsvps_attendance_check check (attendance in ('hadir', 'tidak_hadir', 'ragu')),
  constraint rsvps_guest_count_check check (guest_count between 1 and 10)
);

create table if not exists public.guestbook_entries (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.invitation_orders(id) on delete cascade,
  guest_name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists invitation_orders_status_created_idx
  on public.invitation_orders (work_status, created_at desc);

create index if not exists invitation_orders_payment_created_idx
  on public.invitation_orders (payment_status, created_at desc);

create index if not exists invitation_orders_customer_idx
  on public.invitation_orders (customer_name);

create index if not exists invitation_orders_published_slug_idx
  on public.invitation_orders (public_slug)
  where is_published = true;

create index if not exists order_events_order_id_idx
  on public.order_events (order_id);

create index if not exists order_addons_order_id_idx
  on public.order_addons (order_id);

create index if not exists order_assets_order_id_idx
  on public.order_assets (order_id);

create index if not exists rsvps_order_id_created_idx
  on public.rsvps (order_id, created_at desc);

create index if not exists guestbook_entries_order_id_created_idx
  on public.guestbook_entries (order_id, created_at desc);

alter table public.admin_profiles enable row level security;
alter table public.invitation_templates enable row level security;
alter table public.packages enable row level security;
alter table public.addons enable row level security;
alter table public.invitation_orders enable row level security;
alter table public.order_events enable row level security;
alter table public.order_addons enable row level security;
alter table public.order_assets enable row level security;
alter table public.rsvps enable row level security;
alter table public.guestbook_entries enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop policy if exists "Admins manage profiles" on public.admin_profiles;
create policy "Admins manage profiles" on public.admin_profiles
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins read templates" on public.invitation_templates;
create policy "Admins read templates" on public.invitation_templates
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads active templates" on public.invitation_templates;
create policy "Public reads active templates" on public.invitation_templates
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Admins manage packages" on public.packages;
create policy "Admins manage packages" on public.packages
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads active packages" on public.packages;
create policy "Public reads active packages" on public.packages
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Admins manage addons" on public.addons;
create policy "Admins manage addons" on public.addons
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads active addons" on public.addons;
create policy "Public reads active addons" on public.addons
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Admins manage orders" on public.invitation_orders;
create policy "Admins manage orders" on public.invitation_orders
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads published orders" on public.invitation_orders;
create policy "Public reads published orders" on public.invitation_orders
  for select
  to anon, authenticated
  using (is_published = true and (active_until is null or active_until > now()));

drop policy if exists "Admins manage order events" on public.order_events;
create policy "Admins manage order events" on public.order_events
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads published events" on public.order_events;
create policy "Public reads published events" on public.order_events
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.invitation_orders orders
      where orders.id = order_events.order_id
        and orders.is_published = true
        and (orders.active_until is null or orders.active_until > now())
    )
  );

drop policy if exists "Admins manage order addons" on public.order_addons;
create policy "Admins manage order addons" on public.order_addons
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads published addons" on public.order_addons;
create policy "Public reads published addons" on public.order_addons
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.invitation_orders orders
      where orders.id = order_addons.order_id
        and orders.is_published = true
        and (orders.active_until is null or orders.active_until > now())
    )
  );

drop policy if exists "Admins manage order assets" on public.order_assets;
create policy "Admins manage order assets" on public.order_assets
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads published assets" on public.order_assets;
create policy "Public reads published assets" on public.order_assets
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.invitation_orders orders
      where orders.id = order_assets.order_id
        and orders.is_published = true
        and (orders.active_until is null or orders.active_until > now())
    )
  );

drop policy if exists "Admins read rsvps" on public.rsvps;
create policy "Admins read rsvps" on public.rsvps
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public inserts rsvps" on public.rsvps;
create policy "Public inserts rsvps" on public.rsvps
  for insert
  to anon, authenticated
  with check (
    exists (
      select 1 from public.invitation_orders orders
      where orders.id = rsvps.order_id
        and orders.is_published = true
        and (orders.active_until is null or orders.active_until > now())
    )
  );

drop policy if exists "Admins read guestbook" on public.guestbook_entries;
create policy "Admins read guestbook" on public.guestbook_entries
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public reads published guestbook" on public.guestbook_entries;
create policy "Public reads published guestbook" on public.guestbook_entries
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.invitation_orders orders
      where orders.id = guestbook_entries.order_id
        and orders.is_published = true
        and (orders.active_until is null or orders.active_until > now())
    )
  );

drop policy if exists "Public inserts guestbook" on public.guestbook_entries;
create policy "Public inserts guestbook" on public.guestbook_entries
  for insert
  to anon, authenticated
  with check (
    exists (
      select 1 from public.invitation_orders orders
      where orders.id = guestbook_entries.order_id
        and orders.is_published = true
        and (orders.active_until is null or orders.active_until > now())
    )
  );

insert into public.invitation_templates (slug, name, theme, image_path, palette)
values
  ('classic-rose', 'Classic Rose', 'Romantic floral', '/images/designs/classic-rose.png', '{"background":"#fff7f4","accent":"#b94b60","deep":"#4b0f1a","soft":"#f7dfe3"}'),
  ('modern-minimal', 'Modern Minimal', 'Clean editorial', '/images/designs/modern-minimal.png', '{"background":"#faf7f1","accent":"#35302b","deep":"#171513","soft":"#e7dfd4"}'),
  ('garden-sage', 'Garden Sage', 'Botanical green', '/images/designs/garden-sage.png', '{"background":"#f5f8ee","accent":"#6f8266","deep":"#2f3d2b","soft":"#dae8d1"}'),
  ('luxury-maroon', 'Luxury Maroon', 'Maroon gold', '/images/designs/luxury-maroon.png', '{"background":"#fff4e8","accent":"#9d2b3f","deep":"#4b0f1a","soft":"#f3d2b1"}'),
  ('islamic-elegant', 'Islamic Elegant', 'Navy gold', '/images/designs/islamic-elegant.png', '{"background":"#f1f5f2","accent":"#2c6a67","deep":"#102636","soft":"#d5b46d"}'),
  ('rustic-cream', 'Rustic Cream', 'Terracotta rustic', '/images/designs/rustic-cream.png', '{"background":"#fff7ec","accent":"#c56a48","deep":"#553224","soft":"#f5ddb8"}'),
  ('pastel-floral', 'Pastel Floral', 'Lilac peach', '/images/designs/pastel-floral.png', '{"background":"#fff6fb","accent":"#9d7ac2","deep":"#47294e","soft":"#ffd1c5"}'),
  ('gold-premium', 'Gold Premium', 'Black gold', '/images/designs/gold-premium.png', '{"background":"#111111","accent":"#c59b4a","deep":"#050505","soft":"#f2dfad"}')
on conflict (slug) do update set
  name = excluded.name,
  theme = excluded.theme,
  image_path = excluded.image_path,
  palette = excluded.palette,
  is_active = true;

insert into public.packages (slug, name, price, duration_months, is_popular, features)
values
  ('basic', 'Basic', 49000, 6, false, '["Semua template premium","Nama tamu otomatis","Background music request","Countdown acara","Google Maps","RSVP kehadiran","Buku tamu digital","Amplop digital","Love story","Galeri foto maksimal 6 foto","1 video prewedding","Share WhatsApp unlimited","Masa aktif 6 bulan"]'),
  ('premium', 'Premium', 99000, 12, true, '["Semua fitur Paket Basic","Tanpa watermark","Unlimited nama tamu","Galeri foto hingga 20 foto","Request lagu bebas","Multi acara","Live streaming","Save to calendar","Tema premium eksklusif","Masa aktif 1 tahun"]'),
  ('exclusive', 'Exclusive', 149000, 24, false, '["Semua fitur Paket Premium","Video background hero","Custom warna & font","Unlimited galeri foto","Opening screen premium","Animasi premium","Masa aktif 2 tahun","Save the date image","Instagram story wedding"]')
on conflict (slug) do update set
  name = excluded.name,
  price = excluded.price,
  duration_months = excluded.duration_months,
  is_popular = excluded.is_popular,
  features = excluded.features,
  is_active = true;

insert into public.addons (slug, name, category, price)
values
  ('domain-my-id', 'Domain .my.id', 'domain', 29000),
  ('domain-biz-id', 'Domain .biz.id', 'domain', 49000),
  ('domain-id', 'Domain .id', 'domain', 149000),
  ('domain-com', 'Domain .com', 'domain', 199000),
  ('express', 'Express pengerjaan', 'service', 49000),
  ('extend-active', 'Tambah masa aktif', 'service', 25000),
  ('custom-design', 'Custom design', 'creative', 199000),
  ('instagram-filter', 'Wedding Instagram filter', 'creative', 25000),
  ('video-gallery', 'Tambah video gallery', 'media', 15000)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  price = excluded.price,
  is_active = true;

insert into storage.buckets (id, name, public)
values ('invitation-assets', 'invitation-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Admins upload invitation assets" on storage.objects;
create policy "Admins upload invitation assets" on storage.objects
  for all
  to authenticated
  using (bucket_id = 'invitation-assets' and public.is_admin())
  with check (bucket_id = 'invitation-assets' and public.is_admin());

drop policy if exists "Public reads invitation assets" on storage.objects;
create policy "Public reads invitation assets" on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'invitation-assets');
