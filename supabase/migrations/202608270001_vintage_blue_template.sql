insert into public.invitation_templates (slug, name, theme, image_path, palette)
values (
  'vintage-blue',
  'Vintage Blue',
  'Navy ivory animated',
  '/images/designs/vintage-blue.png',
  '{"background":"#fffaf0","accent":"#173b69","deep":"#081f3d","soft":"#dbe3ed"}'::jsonb
)
on conflict (slug) do update set
  name = excluded.name,
  theme = excluded.theme,
  image_path = excluded.image_path,
  palette = excluded.palette,
  is_active = true;
