insert into public.invitation_templates (slug, name, theme, image_path, palette)
values (
  'vintage-blue',
  'Vintage Blue',
  'Blue ivory animated',
  '/images/designs/vintage-blue.png',
  '{"background":"#fffaf0","accent":"#557797","deep":"#3f607e","soft":"#d9e9f2"}'::jsonb
)
on conflict (slug) do update set
  name = excluded.name,
  theme = excluded.theme,
  image_path = excluded.image_path,
  palette = excluded.palette,
  is_active = true;
