# TDP / PCA — public static website

This repository contains the public-facing Polish and English TDP/PCA website: **https://www.psychcon.org/**. It consists only of static HTML/CSS/JavaScript, with no secret keys or user records. Source was adapted from the original `dafudo/Prod_Psychcon_Cloud` public preview.

The protected application remains in [Prod_Psychcon_Cloud](https://github.com/dafudo/Prod_Psychcon_Cloud) (private) and is intended for `https://app.psychcon.org` on Cloudflare Workers. Login and application links lead to `https://app.psychcon.org/pl/login` or its English equivalent; they will only function after the separate app is deployed.

Public pages: `/pl/`, `/en/`, and `about`, `board`, `assessment`, `apply`, `pricing`, `partners` per locale.

## GitHub Pages, no Actions or CI

Set **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. An existing GitHub Pages site that currently claims `www.psychcon.org` must first release its custom domain in its Pages settings. This repo has `CNAME` set to `www.psychcon.org`. DNS is already managed separately; verify its current target and SSL after switching Pages. Keep the domain DNS as-is when it already targets GitHub Pages. The Pages configuration itself cannot be completed through a source commit alone.

Keep the old website backed up. Do not deploy private applicant, admin or payment functionality onto GitHub Pages. As required by the project's `AGENTS.md`, no lint or GitHub Actions/CI workflow was created or run. Static public pages currently use `noindex` while publication and legal review gates remain pending; verify metadata, content and all hyperlinks before allowing search indexing.
