# Analytics Tracking Plan (via marketingskills/analytics + plausible 28k⭐)

## Decisions
Berapa booking dari Google vs IG? Paket mana paling laku? Tanggal mana bentrok paling sering?

## Events (Object-Action)
page_viewed | unit_card_clicked | booking_form_started | booking_date_selected | booking_bentrok_shown | booking_submitted | wa_clicked | wa_prefill_sent

## Props
unit_id, paket, tgl_mulai, tgl_selesai, total, source (utm_source)

## Implementation
- Plausible script di layout.tsx (privacy-first, no cookie)
- GA4 via GTM jika mau ads nanti
- Dub UTM: wa.me/6281289538855?text=...&utm_source=instagram

## Naming
button_clicked { button: "wa_admin_header" }
form_submitted { form: "booking", unit_id: "SD-PS4-01" }
