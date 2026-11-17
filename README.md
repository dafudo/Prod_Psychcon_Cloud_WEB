# TDP / PCA — public static website

This repository contains the public-facing Polish and English TDP/PCA website: **https://www.psychcon.org/**. It consists only of static HTML/CSS/JavaScript.


## Publiczny cennik z D1 / indeksowanie — 2026-11-17
- Dwie strony cennika PL/EN otrzymały `data-price-kind` w czterech kwotach. Oddzielny Cloudflare Worker `psychcon-public-pricing` (źródło: `dafudo/Prod_Psychcon_Cloud/edge/psychcon-public-pricing.mjs`) ma renderować aktualne ceny z produkcyjnej D1 bezpośrednio do HTML, bez wykonywania JavaScript po stronie klienta; statyczny fallback GitHub Pages odpowiada cenom 300/150/349/199 PLN z D1 w dniu publikacji.
- Opisy opłat na stronach /assessment/ nie zawierają nieaktualnych kwot, komunikaty /apply/ kierują do portalu; linki do regulaminów w stopkach PL/EN używają kanonicznej domeny www.
- Sitemap obejmuje 16 stron marketingowych PL/EN i cztery dokumenty prawne w www, razem 20. Sam publiczny endpoint JSON /api/public/pricing/ oraz konta/QR nie trafiają do sitemap. Przykładowe PDF-y powinny mieć nagłówek noindex z Workera.
- [ ] Przeprowadzić testy produkcyjne: HTML cennika po zmianie D1, JSON, SEO canonical/hreflang, dostępność obu języków, nagłówki PDF i przekierowania ze starych URL legal. Nie włączano GitHub Actions ani linta.
