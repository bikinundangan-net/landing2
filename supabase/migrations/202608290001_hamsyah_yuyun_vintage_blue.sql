update public.invitation_orders
set
  template_slug = 'vintage-blue',
  music_title = 'Kusuma Wijaya',
  love_story = coalesce(
    nullif(btrim(love_story), ''),
    $story$
Berawal dari sebuah pertemuan yang tak pernah direncanakan.

Awal tahun 2024 menjadi awal dari sebuah cerita yang tak pernah kami sangka sebelumnya. Kami dipertemukan tanpa sengaja, dalam sebuah pertemuan sederhana yang perlahan membawa kami pada kisah yang begitu berarti.

Seiring berjalannya waktu, rasa nyaman tumbuh menjadi rasa sayang. Kami mulai mengenal satu sama lain lebih dalam, berbagi cerita, melewati berbagai momen bersama, hingga akhirnya menyadari bahwa ada seseorang yang ingin kami jadikan tempat untuk pulang.

Bukan hanya kami yang semakin dekat, tetapi juga kedua keluarga. Kehangatan, doa, dan dukungan dari orang-orang yang kami sayangi membuat hubungan ini semakin yakin untuk melangkah ke tahap berikutnya.

Hingga akhirnya, dengan penuh rasa syukur dan keyakinan, kami memutuskan untuk menyatukan dua hati dalam sebuah ikatan pernikahan.

Dari sebuah pertemuan yang tak disengaja, tumbuh sebuah cinta yang kami pilih untuk dijaga selamanya.

Dan kini, kami siap menulis babak baru dalam perjalanan cinta kami bersama, dalam satu ikatan, menuju selamanya. 🤍
$story$
  ),
  updated_at = now()
where public_slug = 'hamsyah-yuyun';
