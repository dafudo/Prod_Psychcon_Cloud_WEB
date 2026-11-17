# Domain split — 2026-11-09

- **Public website:** `www.psychcon.org` → GitHub Pages → `dafudo/Prod_Psychcon_Cloud_WEB` (static HTML, CSS, plain JavaScript; PL/EN).
- **Accounts/admin:** `app.psychcon.org` → Cloudflare Workers → `dafudo/Prod_Psychcon_Cloud` (React frontend + Worker API, D1 and private R2; same-origin HTTP routes).
- **API:** `https://app.psychcon.org/api/v1/*`, not the `www` host.
- **Magic-link login:** use the `app.psychcon.org` origin, not the GitHub Pages origin. Keep secure, httpOnly host-only cookies on the app host. Stripe callback and webhook URLs must likewise use the app origin.
- **Public verification:** if subsequently approved, public UI can link to an application Worker endpoint; never leak private case records to Pages.

**Required manual GitHub Pages cutover**: remove custom domain `www.psychcon.org` from the old repository's Settings → Pages; enable branch source `main / (root)` in this repository's Settings → Pages; set its custom domain to `www.psychcon.org`; enforce HTTPS after certificates become ready; open `https://www.psychcon.org/pl/` and `/en/` to verify it serves the new HTML. Do not edit DNS unless the existing GitHub Pages DNS records are incorrect.

**Not automatically accomplished by source commit**: old Pages detach, new Pages activation, Cloudflare app deployment, production D1/R2 and secrets, full application/Stripe testing. Existing Cloudflare staging Worker remains an informational preview. Do not claim full app is live. Public site's HTML is noindex until approved.

## Public-site publication consent — 2026-11-13

The owner expressly authorised publication and SEO indexing of the 14 public informational pages in both languages. Their HTML and sitemap/robots now permit indexing. The `main` source has been prepared for GitHub Pages; confirm Pages source is `main / (root)`, that `www.psychcon.org` is assigned to this repository, HTTPS is enforced, and that the root, PL/EN routes and sitemap are actually served. Earlier notes in this document saying noindex is pending refer to the state before this owner decision. This release does not remove private application safety or payment/award feature gates. Do not enable GitHub Actions or CI as a workaround.


## Wyświetlanie cen na publicznym WWW — 2026-11-17
Nie zmieniać obecnego hostingu GitHub Pages ani DNS. Oddzielny Cloudflare Worker `psychcon-public-pricing` ma wyłącznie cztery wąskie trasy: `www.psychcon.org/pl/pricing*`, `www.psychcon.org/en/pricing*`, `www.psychcon.org/api/public/pricing*`, `www.psychcon.org/documents/examples/*`. Binding `DB` wskazuje istniejącą produkcyjną D1. Wyszukiwanie cen korzysta wyłącznie z SELECT; finalny Checkout nadal pobiera aktualną cenę po stronie Workera aplikacji. Bez zmian tras prywatnej aplikacji, płatności ani GitHub Pages.
