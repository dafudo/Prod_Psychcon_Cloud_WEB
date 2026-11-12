# TDP / PCA — public static website

This repository contains the public-facing Polish and English TDP/PCA website: **https://www.psychcon.org/**. It consists only of static HTML/CSS/JavaScript, with no secret keys or user records. Source was adapted from the original `dafudo/Prod_Psychcon_Cloud` public preview.

The protected application remains in [Prod_Psychcon_Cloud](https://github.com/dafudo/Prod_Psychcon_Cloud) (private) and is intended for `https://app.psychcon.org` on Cloudflare Workers. Login and application links lead to `https://app.psychcon.org/pl/login` or its English equivalent; they will only function after the separate app is deployed.

Public pages: `/pl/`, `/en/`, and `about`, `board`, `assessment`, `apply`, `pricing`, `partners` per locale.

## GitHub Pages, no Actions or CI

Set **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. An existing GitHub Pages site that currently claims `www.psychcon.org` must first release its custom domain in its Pages settings. This repo has `CNAME` set to `www.psychcon.org`. DNS is already managed separately; verify its current target and SSL after switching Pages. Keep the domain DNS as-is when it already targets GitHub Pages. The Pages configuration itself cannot be completed through a source commit alone.

Keep the old website backed up. Do not deploy private applicant, admin or payment functionality onto GitHub Pages. As required by the project's `AGENTS.md`, no lint or GitHub Actions/CI workflow was created or run. Static public pages currently use `noindex` while publication and legal review gates remain pending; verify metadata, content and all hyperlinks before allowing search indexing.


## Landing-page and application-pathway update — 2026-11-13

- Promoted the full TDP/PCA association designation, clarified candidate benefits and made the primary "I want to apply" action more visible while preserving the existing visual design in Polish and English.
- Expanded **proposed**, not approved, Level I and II criteria to include relevant pedagogy and education degrees/specialisations for individual consideration. Higher levels III and IV retain their existing psychology requirements.
- Corrected the static /apply/?track= selector by pre-rendering consistent evidence and documentation for all six paths and adjusting the interest email subject to the selected pathway.
- All other public pages retain their content but use matching application-link labels and versioned CSS/JS references. The private application and its eligibility/acceptance logic were **not** changed.
- The public pages remain noindex, fee intake and awarding are still gated pending formal approval, and the public website does not collect applicant documents.
- Verification performed: source-text match assertions and cross-page six-track checks when preparing the Git objects. Not performed: lint, GitHub Actions/CI, local browser/render tests, production payments or manual deployment (per project instructions).
