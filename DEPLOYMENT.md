# Domain split — 2026-11-09

- **Public website:** `www.psychcon.org` → GitHub Pages → `dafudo/Prod_Psychcon_Cloud_WEB` (static HTML, CSS, plain JavaScript; PL/EN).
- **Accounts/admin:** `app.psychcon.org` → Cloudflare Workers → `dafudo/Prod_Psychcon_Cloud` (React frontend + Worker API, D1 and private R2; same-origin HTTP routes).
- **API:** `https://app.psychcon.org/api/v1/*`, not the `www` host.
- **Magic-link login:** use the `app.psychcon.org` origin, not the GitHub Pages origin. Keep secure, httpOnly host-only cookies on the app host. Stripe callback and webhook URLs must likewise use the app origin.
- **Public verification:** if subsequently approved, public UI can link to an application Worker endpoint; never leak private case records to Pages.

**Required manual GitHub Pages cutover**: remove custom domain `www.psychcon.org` from the old repository's Settings → Pages; enable branch source `main / (root)` in this repository's Settings → Pages; set its custom domain to `www.psychcon.org`; enforce HTTPS after certificates become ready; open `https://www.psychcon.org/pl/` and `/en/` to verify it serves the new HTML. Do not edit DNS unless the existing GitHub Pages DNS records are incorrect.

**Not automatically accomplished by source commit**: old Pages detach, new Pages activation, Cloudflare app deployment, production D1/R2 and secrets, full application/Stripe testing. Existing Cloudflare staging Worker remains an informational preview. Do not claim full app is live. Public site's HTML is noindex until approved.
