# Tour de Dar — original experience preview

This is a public, standalone, no-login interactive walkthrough for a developer portfolio. Its design reference is the **last full Tour de Dar implementation before the AugmentFX-inspired visual evolution**, specifically:

- Historical repository: [`smart01-bot/FRONTEND-TOURE-DE-ROTARY`](https://github.com/smart01-bot/FRONTEND-TOURE-DE-ROTARY)
- Exact source commit: [`a2e569ffc252388f07f0c0ddd2d8927606c3e64b`](https://github.com/smart01-bot/FRONTEND-TOURE-DE-ROTARY/tree/a2e569ffc252388f07f0c0ddd2d8927606c3e64b)
- First AugmentFX-derived visual-system commit: `2c3ef8941e8e568aee0c786542c447f973dde6c4` (its parent is the above source snapshot)

**Scope:** original-style landing experience, race information, course map, stories, event archive, participant registration walkthrough, dashboard, ticket, training, community feed, fundraising, profile, teams, challenges, and race-day/results/memory information.

**Excluded:** HQ/admin routes, dashboards, management tools, real authentication, Supabase, payment processing, provider integrations, participant databases and privileged functionality. No code in the source repository is modified.

## Hosting

All client assets and code are plain HTML/CSS/JavaScript. Deploy to GitHub Pages using **Settings → Pages → Deploy from a branch → main → / (root)**. It works without a build process or runtime server. Navigation uses hash routes so deep links work under the GitHub Pages repository path. `.nojekyll` is included.

Expected URL after Pages is enabled: `https://smart01-bot.github.io/tour-de-dar-preview/`

## Demo interactions

1. Open the public landing experience; use the race information, map, and stories navigation.
2. Click **Explore registration**, select a race category, enter a fictional name and example email, review, and create a locally simulated pending registration.
3. Enter **My portal**, inspect dashboard, ticket, training and profile. Use **Show sample confirmed ticket** for a **fictional** bib state; it cannot be used for entry.
4. Publish a local example feed post, toggle an encouragement reaction, create a fictional fundraising pledge, and save a sample story/profile.
5. Explore teams, challenges, results and archive: unconfigured official functionality remains accurately marked as unavailable.
6. Use **Reset demo** to erase example state from the session.

Data persists only via `sessionStorage` in the visitor's browser. It is never sent to a server or to the Tour application. Nothing on this preview is authoritative event information, an official registration, an actual payment, a bib issuance, or a live community activity report.

## Design provenance and media

The presentation intentionally follows the **pre-AugmentFX** visual style: navy `#0D1B3D`, bronze `#C8953C`, coral `#E85D3A`, sand `#F7F3EB`; Playfair Display headlines, Montserrat interfaces and Plus Jakarta Sans numbers. Landing sections and participant layout are newly authored static demonstrations modelled on the historical implementation; this is **not** a byte-for-byte deployment of the Next.js application.

To retain photographic continuity without copying large media into another repository, the demo references the public original source repository's image URLs pinned to the historical commit SHA via `raw.githubusercontent.com`. These are illustrative images from the source project, not verified photographs of the race route. Fonts load from Google Fonts, with system fallbacks; all content and interactions are independent of a backend.

## Local test

Open `index.html` in a browser, or use a static server such as `python -m http.server 8000` from the repository root. Run `node tests/preview.test.cjs` to check route scope, safe state transitions, and HTML/CSS/JS integrity.

## Portfolio link

After verifying that Pages is live, update the Tour de Rotary / Tour de Dar project call-to-action in `smart01-bot/smart01-bot.github.io` to the URL above.