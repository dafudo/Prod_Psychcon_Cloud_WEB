# TDP / PCA — public static website

This repository contains the public-facing Polish and English TDP/PCA website: **https://www.psychcon.org/**. It consists only of static HTML/CSS/JavaScript.


## Publiczny cennik z D1 / indeksowanie — 2026-11-17
- Dwie strony cennika PL/EN otrzymały `data-price-kind` w czterech kwotach. Oddzielny Cloudflare Worker `psychcon-public-pricing` (źródło: `dafudo/Prod_Psychcon_Cloud/edge/psychcon-public-pricing.mjs`) ma renderować aktualne ceny z produkcyjnej D1 bezpośrednio do HTML, bez wykonywania JavaScript po stronie klienta; statyczny fallback GitHub Pages odpowiada cenom 300/150/349/199 PLN z D1 w dniu publikacji.
- Opisy opłat na stronach /assessment/ nie zawierają nieaktualnych kwot, komunikaty /apply/ kierują do portalu; linki do regulaminów w stopkach PL/EN używają kanonicznej domeny www.
- Sitemap obejmuje 16 stron marketingowych PL/EN i cztery dokumenty prawne w www, razem 20. Sam publiczny endpoint JSON /api/public/pricing/ oraz konta/QR nie trafiają do sitemap. Przykładowe PDF-y powinny mieć nagłówek noindex z Workera.
- [ ] Przeprowadzić testy produkcyjne: HTML cennika po zmianie D1, JSON, SEO canonical/hreflang, dostępność obu języków, nagłówki PDF i przekierowania ze starych URL legal. Nie włączano GitHub Actions ani linta.


## Wdrożenie cennika i SEO — potwierdzono 2026-11-17
- [x] Po aktualizacji `main` witryna WWW zachowała GitHub Pages i dotychczasowy DNS, bez migracji hostingu. Linki PL/EN do regulaminu i prywatności kierują do kanonicznych wersji `www.psychcon.org`; /assessment/ odsyła do cennika, a /apply/ kieruje do portalu.
- [x] Sitemap produkcyjnie zawiera 20 parowanych URL PL/EN: 16 stron statycznych i cztery strony prawne na www. Potwierdzono obecność dokumentów prawnych i przykładowych dokumentów w produkcyjnej sitemap.
- [x] Worker `psychcon-public-pricing` obsługuje /pl/pricing/, /en/pricing/, /api/public/pricing i przykładowe pliki PDF. Wersja `c5feb71b-bbb0-4803-ac5e-5b76f60454aa` i deployment `70e4661f-45e2-4f5e-97b2-7ca4431d97a0` mają 100% ruchu; źródło i binding produkcyjnej D1 znajdują się w `dafudo/Prod_Psychcon_Cloud/edge/psychcon-public-pricing.mjs`.
- [x] Dla polskiego i angielskiego HTML cennika Browser Rendering potwierdził cztery aktualne ceny 300/150/349/199 PLN, a publiczny JSON odczyt tej samej D1. Polski PDF demonstracyjny zwrócił HTTP 200 i nagłówek `X-Robots-Tag: noindex, nofollow`.
- [x] Stare ścieżki dokumentów prawnych `app.psychcon.org` przekierowują 308 na www; testowano /en/privacy. Nie zmieniano żadnych wydanych prywatnych dokumentów.
- [ ] Niezależne testy E2E całej witryny, Lighthouse, indeksacji Google, realnej zmiany ceny w D1 i wszystkich PDF nie zostały wykonane. Nie uruchamiano linta, GitHub Actions ani migracji.
