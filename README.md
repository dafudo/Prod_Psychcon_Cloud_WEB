# TDP / PCA — public static website

This repository contains the public-facing Polish and English TDP/PCA website: **https://www.psychcon.org/**. It consists only of static HTML/CSS/JavaScript, with no secret keys or user records. Source was adapted from the original `dafudo/Prod_Psychcon_Cloud` public preview.

The protected application remains in [Prod_Psychcon_Cloud](https://github.com/dafudo/Prod_Psychcon_Cloud) (private) and is intended for `https://app.psychcon.org` on Cloudflare Workers. Login and application links lead to `https://app.psychcon.org/pl/login` or its English equivalent; they will only function after the separate app is deployed.

Public pages: `/pl/`, `/en/`, and `about`, `board`, `assessment`, `apply`, `pricing`, `partners` per locale.

## GitHub Pages, no Actions or CI

Set **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. An existing GitHub Pages site that currently claims `www.psychcon.org` must first release its custom domain in its Pages settings. This repo has `CNAME` set to `www.psychcon.org`. DNS is already managed separately; verify its current target and SSL after switching Pages. Keep the domain DNS as-is when it already targets GitHub Pages. The Pages configuration itself cannot be completed through a source commit alone.

Keep the old website backed up. Do not deploy private applicant, admin or payment functionality onto GitHub Pages. As required by the project's `AGENTS.md`, no lint or GitHub Actions/CI workflow was created or run. The owner explicitly authorised public publication and search-engine indexing on 2026-11-13; all 14 static PL/EN public informational pages now permit indexing. The separate application and payment/award functions remain gated.


## Landing-page and application-pathway update — 2026-11-13

- Promoted the full TDP/PCA association designation, clarified candidate benefits and made the primary "I want to apply" action more visible while preserving the existing visual design in Polish and English.
- Expanded **proposed**, not approved, Level I and II criteria to include relevant pedagogy and education degrees/specialisations for individual consideration. At this stage higher levels III and IV retained their original scope; see the later multidisciplinary criteria update below, which supersedes this older copy.
- Corrected the static /apply/?track= selector by pre-rendering consistent evidence and documentation for all six paths and adjusting the interest email subject to the selected pathway.
- All other public pages retain their content but use matching application-link labels and versioned CSS/JS references. The private application and its eligibility/acceptance logic were **not** changed.
- The public pages remain noindex, fee intake and awarding are still gated pending formal approval, and the public website does not collect applicant documents.
- Verification performed: source-text match assertions and cross-page six-track checks when preparing the Git objects. Not performed: lint, GitHub Actions/CI, local browser/render tests, production payments or manual deployment (per project instructions).

## Multidisciplinary criteria and application UX — 2026-11-13

- Replaced the vague contact action with explicit "send an email enquiry", followed immediately by the application portal action (https://app.psychcon.org/pl/login or English equivalent).
- Earlier navigation sent level selection to /assessment/#track-... . The 2026-11-13 navigation and SEO correction documented below supersedes that behaviour.
- Proposed recognition descriptions consider psychology, pedagogy, counselling, sociology, philosophy, education and relevant social/humanities disciplines including overseas degrees; supplementary courses and supervised practice may be considered to bridge a curriculum gap.
- Proposed Levels III–IV continue to require three / over five years of experience respectively and five distinct DOI publications. Courses never automatically substitute for a degree or the DOI requirement.
- These descriptions are NOT approved regulations and do not change the private application, awards, eligibility engine, payment or intake gates. All public pages remain noindex.
- Polish and English descriptions were revised together; JavaScript/CSS URLs were refreshed on all 14 locale pages.
- Project restrictions honoured: no lint, GitHub Actions/CI or deployment. Source-level checks and JavaScript parsing only. No live-browser verification.
- Background and academic examples: ELIGIBILITY-PROPOSAL-2026-11-13.md.

## Direct recognition-level detail links — 2026-11-13

- The six homepage "Zobacz szczegóły" / "See details" links now open the matching detailed criteria on /pl/apply/?track=...#selected-pathway or /en/apply/?track=...#selected-pathway, instead of the near-duplicate grid on /assessment/. The selected criteria, evidence and contact/portal actions appear immediately.
- The existing informational /assessment/ page and its in-page criteria accordions remain available for people exploring all levels. The separate application portal, privacy and intake/legal gates are unchanged.
- The selected content has an accessible, deep-linkable anchor with sticky-header scroll offset. Static source checks performed; no lint, Actions/CI, browser end-to-end test or manual deployment.

## Recognition wording, navigation and SEO audit — 2026-11-13

- On /pl/apply/ and /en/apply/, selecting a level now **updates that level's criteria in the current detail view immediately**, changes the address to /apply/?track=<level>#selected-pathway, scrolls and focuses the selected level; it never sends users back to the all-level /assessment/ overview. Browser Back restores previous selection. Switching language preserves the chosen level and direct assessment anchor. Links from the six /assessment/ cards now land on the right detail section.
- Marketing copy and metadata clearly present the **association's discretionary title recognising documented education, professional practice, development and achievements**, not a statutory qualification, professional licence or qualification equivalence decision. Both languages have been revised. Also corrected text spacing in the displayed "TDP I–IV" headings.
- All 14 locale HTML pages have individual, consistent meta title/description, canonical, reciprocal PL/EN/x-default hreflang, OG/Twitter and a parsed Organization, WebSite, WebPage and (for subpages) BreadcrumbList schema.org graph. The SPA script now updates canonical, alternate language tags, robots metadata and structured data when navigating without a full page reload.
- sitemap.xml lists **12 public content routes** (six types x PL/EN: home, about, board, assessment, pricing and partners), each with language alternatives. It deliberately excludes /apply, the account portal, private/API routes and unfinished policies in accordance with the project SEO specification. robots.txt advertises the sitemap.
- All public HTML still has **noindex**; the sitemap does not override this. Robots allow public crawling so that crawlers can read the noindex tag. Do not remove noindex without the owner's formal legal/publication approval and a separate deployment decision.
- Static audit: all 14 public HTML pages checked for canonical, hreflang, title, description and JSON-LD; 402 internal links and 60 in-page anchors resolved with zero broken targets. JavaScript syntax parsed. These are source checks, NOT live browser, Core Web Vitals, build, Search Console or production verification. No lint, CI/GitHub Actions or deployment performed.
- Detailed notes and remaining go-live gates: SEO-AUDIT-2026-11-13.md.

## Public website publication authorisation — 2026-11-13

The owner expressly authorised publishing and indexing the public TDP/PCA marketing website. This release removes `noindex` from all **14** public static PL/EN pages (including the informational `/apply/` guides); root `/` has a canonical to `/pl/` and retains a visible language choice and redirect. `404.html` correctly remains noindex. `robots.txt` provides a 14-page sitemap, with reciprocal PL/EN/x-default alternates. No private application URLs or account data appear in the sitemap. Proposals for levels remain labelled as proposed, since public-site release consent is distinct from formally approving award regulations or enabling paid intake.

The GitHub commit updates `main`, the configured intended publication branch. **Live GitHub Pages enablement/custom-domain assignment and production HTTP checks must still be independently verified**; updating source alone does not establish them. No lint or GitHub Actions/CI workflows were enabled. A legal or operational release of the private application has NOT been authorised by this change.
