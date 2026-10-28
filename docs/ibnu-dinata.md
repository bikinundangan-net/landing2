# Ibnu & Dinata

The Garden Sage template renders this custom design only for `ibnu-dinata`.
Copy and managed asset paths live in `lib/admin/ibnu-dinata.json`.

## Gate revision

The cover is a gold wrought-iron garden gate drawn as inline SVG: two pillars, an arched crest under the floral garland, and two doors hinged at the outer edges. The I & D monogram (`IbnuDinataLogo`, also inline SVG) sits on the seam, rendered as two clipped halves that each ride on one door, so the logo splits as the gate opens. The same logo appears above the hero names and in the closing.

One Framer Motion sequence pulses the logo and fades the guest copy (0–0.6 s) while the whole gate scene pushes in toward the logo (1.3× by about 1 s, 2× by 3.2 s). The doors swing 105° outward (0.75–3.15 s) as the crest lifts and the pillars and bouquets slide away (0.9–3.1 s). From 2.85 s the cover crossfades into the ready hero beneath it, finishing at about 3.85 s. The hero transform is normalized and the cover removed only after the sequence completes; there is no timeout controlling completion.

While closed, the cover has slowly turning light rays, falling petals, twinkling sparkles and swaying flowers. After opening, a lighter layer of falling petals stays over the page, the hero names enter letter by letter, and sections use varied reveals (blur, zoom, left/right, staggered), gold dividers that draw in, framed cards, tiled countdown, a shimmering bank card and a floating bottom navigation. All ambient motion is CSS on transform/opacity, with fewer particles on screens up to 620 px.

A finite burst of opening petals still runs only while opening: 18 visible on screens up to 620 px, 30 on larger screens. Reduced motion bypasses the sequence and hides petals and sparkles. Scroll remains locked and content inert until the sequence ends; focus moves after React has committed the active content. Unmounting stops playback and restores scroll styles. This revision changes no order data, database schema, or publication state.

## Data and local preview

Run `node scripts/seed-ibnu-dinata.mjs` with the existing local Supabase environment. It creates a draft with a real database ID, an empty customer contact, Basic as the technical package, zero unconfirmed totals, and the default unpaid state. Repeated runs update invitation content and managed assets without changing existing contact, package, billing, workflow, expiry, guestbook entries, or publication state. Do not run concurrent seeds for the same order.

Run `npm run dev:invitation` and open `http://127.0.0.1:3000/ibnu-dinata?to=Nama%20Tamu`. This command explicitly enables draft preview and binds to the local machine. The ignored `.env.development.local` in this checkout also sets `IBNU_DINATA_PREVIEW=1`, so an ordinary `npm run dev` retains the preview after restarting. On a fresh checkout, use the explicit command or add that flag to your own `.env.development.local`.

This development-only mode can read the draft and write test responses using the server-only service role. It cannot be enabled by a URL parameter or in production. Preview responses are real database records; remove only explicitly marked QA records after testing. Never expose the development server publicly. Next.js allows `127.0.0.1` and `localhost` as additional development origins so the local HMR connection is not blocked.

If this draft route returns 404 after restarting, confirm the server was started with preview enabled and the Supabase order still exists. This draft is intentionally unavailable to the normal public query until release; HMR origin configuration is a separate setting and does not publish it.

## Release order

1. Apply `supabase/migrations/202610270001_event_end_time.sql` with the existing database migration process.
2. Run `node scripts/seed-ibnu-dinata.mjs` again. Confirm one managed akad event and two managed asset records, with end time `09:00:00`.
3. Run TypeScript and the production build, then deploy through the existing Vercel project for bikinundangan.net.
4. After deployment is ready, run `node scripts/seed-ibnu-dinata.mjs --publish`. Confirm the custom design, assets, metadata, anonymous RSVP, and guestbook on the production URL. Publication is separate so the old production template never displays incomplete assets during development.

`order_events(*)` in the public query includes the additive end-time column once applied and stays compatible with an older schema. Until migration, the custom view uses the configured `09:00:00` end time. This does not mean the SQL migration has been applied.

The current environment has a Supabase service-role credential for order data, but no direct database/migration credential or Vercel/GitHub deployment credential. A service-role API key alone cannot run SQL migrations or deploy application source.

## Guest responses

The two forms use separate server actions and resolve the real order by slug on the server. The normal production client and database policies require a published, active order. Validation limits names to 2–100 characters, guest counts to integers 1–10, and wishes to 2–2,000 characters. Success follows a successful database insert. An optional per-order Google Sheet mirrors persisted answers; failure to mirror does not change a saved response to a failure.

The invitation is silent. No photos or demo guest messages are used. An actual uploaded gallery can be displayed later. Image generation provenance and prompt descriptions are in `public/images/invitations/ibnu-dinata/ASSETS.md`.

## Checks

With the local preview server running, use `npm run test:invitation`. For the real RSVP/guestbook persistence test, use `RUN_INVITATION_DB_TESTS=1 npm run test:invitation`; that test requires the unpublished order and cleans up its uniquely named responses in a `finally` block. The explicit CLI path keeps the test runner aligned with the installed `@playwright/test` package when older npm and pnpm executables coexist.
