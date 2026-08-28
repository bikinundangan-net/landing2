update public.invitation_templates
set
  theme = 'Navy ivory animated',
  palette = '{"background":"#fffaf0","accent":"#173b69","deep":"#081f3d","soft":"#dbe3ed"}'::jsonb,
  image_path = '/images/designs/vintage-blue.png',
  is_active = true
where slug = 'vintage-blue';
