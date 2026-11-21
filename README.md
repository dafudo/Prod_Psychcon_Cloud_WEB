## Aktualna architektura publicznej strony — 2026-11-21
`www.psychcon.org` jest statycznym GitHub Pages z repozytorium `dafudo/Prod_Psychcon_Cloud_WEB`. Regulamin i polityka prywatności PL/EN są od dziś zapisane bezpośrednio jako `/{pl|en}/{terms|privacy}/index.html` oraz korzystają ze wspólnego `legal.css` (16 sekcji każdej wersji). Dwa pomocnicze skrypty Cloudflare `psychcon-legal` i `psychcon-public-pricing` oraz ich 12 tras zostały usunięte; `app.psychcon.org` pozostał na głównym Workerze `tdp-psychcon-staging`. Stare adresy prawne na `app.psychcon.org` przekierowuje pojedyncza reguła Cloudflare Redirect Rules (`psychcon_legacy_legal_static`).

Cennik `/pl/pricing/` i `/en/pricing/` jest statyczny: 300 PLN ocena, 300 PLN odwołanie, 150 PLN rocznie (zgodne z odczytaną D1 21.11.2026). Przyszła zmiana ceny w D1 wymaga **ręcznej aktualizacji obu stron HTML**; Stripe Checkout sam pobiera cenę z D1. Dawny publiczny JSON `/api/public/pricing` został wyłączony. Pliki demonstracyjne PDF nadal znajdują się w GitHub Pages; `robots.txt` blokuje ich indeksowanie przez współpracujące roboty, ale nie zastępuje wcześniejszego nagłówka `X-Robots-Tag: noindex`. Zweryfikowano stronę główną, oba cenniki, polski regulamin i angielską politykę prywatności za pomocą Browser Rendering. Pełne E2E wszystkich wariantów i PDF pozostaje do odrębnego potwierdzenia.

# TDP / PCA — public static website

## 2026-11-20: Pricing simplification
- PL/EN: new applications cost PLN 300 each, appeals PLN 300, annual online certificate access PLN 150. All displayed prices are tax-inclusive and final amounts; no separate upgrade offering.
- Public pricing Worker must read only initial/appeal/annual kinds; static fallback matches the D1 gross amounts. Stripe Checkout inline prices use `tax_behavior: 'inclusive'`. Historical Stripe subscriptions are not cancelled by the test-data reset.


## Appeals and legal terms — 2026-11-20
- PL/EN `/assessment/` clarify that an appeal is separately paid (current price list; authorised waiver possible) and must be submitted within 30 days of receipt of the decision, defined in the portal as publication to the applicant's account. After that period the form is hidden. PL/EN wording is equivalent.
- The binding terms pages linked at `/pl/terms` and `/en/terms` are **not files in this repository**. Their authoritative source is `dafudo/Prod_Psychcon_Cloud/legal/psychcon-legal-worker.mjs` (dedicated Cloudflare legal Worker), updated in parallel. Editing this static repository alone would not modify that legal Worker; its deployment must be checked separately.


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

## Procedura, wybór stopnia i formaty dokumentów — 2026-11-18

- PL/EN `/assessment/`: zachowano dziesięć etapów z opłatą 300 PLN przed formularzem i 150 PLN rocznie wyłącznie po decyzji pozytywnej. W etapie formularza dopisano wszystkie kierunki studiów (również zagraniczne), indywidualną ocenę programu, limit **2 plików PDF/JPG/PNG/WebP na wpis, 5 MB na plik**, zakaz przesyłania danych klientów oraz zachowano wymóg DOI stopni III–IV.
- PL/EN `/apply/`: doprecyzowano, że wybór poziomu potwierdza się w portalu **przed** płatnością, załączniki przypisuje się do wpisów wykształcenia / doświadczenia, a odnowienie 150 PLN następuje w kolejnych latach. Stopa 300+150=450 PLN jest warunkowa (po decyzji pozytywnej i aktywacji).
- Strony pozostają statyczne, bez API i danych użytkownika. Aktualne ceny w `/pricing/` nadal pochodzą z dedykowanego Workera/D1.
- Zmiana samych plików nie stanowi potwierdzenia publikacji GitHub Pages ani wdrożenia Workera aplikacji; wymaga osobnej kontroli produkcyjnej.

