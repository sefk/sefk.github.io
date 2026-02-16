# Migration Transcript: YYYYMM Post File Conversion

**Date:** 2026-02-16
**Agent:** Claude Opus 4.6
**Branch:** dev-claude

---

## Task

Convert blog posts from the old two-file naming convention (`YYYYMM<slug>.html` +
`YYYYMM<slug>.meta`) to the new single-file convention (`<slug>.md`), with
metadata as an HTML comment at the top. Add redirects so old URLs still work.

---

## Phase 1: Investigation

Read `DEV.md` and `conf.py` to understand the site structure. Key findings:

- Nikola static site, hosted on GitHub Pages
- `POSTS` config supports both `*.md` and `*.html` in `posts/`
- 22 files matched the old `YYYYMM` naming convention
- Existing `REDIRECTIONS` list already handled WordPress-era URL redirects
- One file (`absorb-uncertainty.html/meta`) uses the two-file format but has no
  YYYYMM prefix — left untouched

Examined sample files to understand formats:
- `.meta` files contain Nikola metadata in `.. key: value` format
- `.html` files contain HTML body wrapped in `<html><body>...</body></html>`
- Existing `.md` files wrap metadata in `<!-- ... -->` HTML comments with a
  blank line before content

## Phase 2: File Conversion

Wrote and ran a Python script (`migration_scripts/convert_yyyymm_posts.py`)
that for each of the 22 file pairs:

1. Read the `.meta` and `.html` files
2. Updated the `slug` field to remove the YYYYMM prefix
3. Stripped `<html><body>` and `</body></html>` wrappers
4. Combined into a single `.md` file with metadata in `<!-- ... -->` comment
5. Deleted the old `.html` and `.meta` files

All 22 files converted successfully:

| Old Slug | New Slug |
|---|---|
| 201203those-little-utilities | those-little-utilities |
| 201203too-many-clouds | too-many-clouds |
| 201204browsers-for-web-apps | browsers-for-web-apps |
| 201204measuring-an-engineering-manager | measuring-an-engineering-manager |
| 201204my-sabbatical | my-sabbatical |
| 201205concentration | concentration |
| 201205danny-lewin-42nd-birthday | danny-lewin-42nd-birthday |
| 201205engineering-culture-litmus-tests | engineering-culture-litmus-tests |
| 201205fizzbuzz-for-managers | fizzbuzz-for-managers |
| 201206two-things-at-once | two-things-at-once |
| 201207on-line-education | on-line-education |
| 201207taking-down-100000-sites | taking-down-100000-sites |
| 201208wip-folders-with-ls | wip-folders-with-ls |
| 201210halloween-candy-data | halloween-candy-data |
| 201301why-so-long | why-so-long |
| 201303online-ed-retention | online-ed-retention |
| 201304coding-on-a-flight | coding-on-a-flight |
| 201306launch-day | launch-day |
| 201309knr-c-label | knr-c-label |
| 201311halloween-2013 | halloween-2013 |
| 201311seven-things | seven-things |
| 201312airmail | airmail |

## Phase 3: Redirect Updates in conf.py

Updated `REDIRECTIONS` in `conf.py`:

1. **WordPress-era redirects** — updated destinations from old YYYYMM slug URLs
   to new slug URLs
2. **New YYYYMM redirects** — added 22 entries so old YYYYMM URLs redirect to
   new URLs

## Phase 4: Build and Test (Initial)

Ran `nikola build` — succeeded with no errors. Started `nikola serve` and tested:

- All 22 new post URLs returned 200
- All 22 old YYYYMM redirect URLs returned 200
- WordPress-era redirects working
- Tags/categories pages showed converted posts
- Blog index rendered correctly
- `absorb-uncertainty` (unchanged) still worked

## Bug Fix 1: Directory-Style URL Redirects

**Problem:** User reported `/posts/201207on-line-education/` gave an error.

**Root cause:** Redirects were created as flat `.html` files (e.g.,
`posts/201207on-line-education.html`) but Nikola serves posts at directory-style
URLs (`/posts/<slug>/`). The old URLs would have been directory-style too
(`/posts/201207on-line-education/`).

Two issues:
- "From" paths needed to be `<slug>/index.html`, not `<slug>.html`
- "To" destinations needed to be `/posts/<slug>/`, not `/posts/<slug>.html`

**Fix:** Updated all redirect entries in `conf.py`:
- From: `(u'posts/201207on-line-education.html', u'/posts/on-line-education.html')`
- To: `(u'posts/201207on-line-education/index.html', u'/posts/on-line-education/')`

Also updated WordPress-era redirect destinations and removed stale flat `.html`
files from the output directory.

## Bug Fix 2: Missing Hero Images

**Problem:** Hero images (the `<img>` element at the start of posts) were
present in the `.md` source files but stripped during build.

**Root cause:** No blank line between the closing `-->` of the metadata comment
and the post content. Nikola's markdown processor treats everything through the
first blank line as the metadata block, so the first line of content (the hero
image) was consumed as metadata.

Working files like `switching-to-static.md` had:
```
-->

<img style="float:right" ...>
```

Converted files had:
```
-->
<img class="alignright" ...>
```

**Fix:** Added a blank line after `-->` in all 22 converted files. Updated the
migration script to include `\n\n` after `-->` instead of just `\n`.

Verified by checking `cache/posts/airmail.html` — the `<img>` tag was now
present in the rendered output. Spot-checked multiple other posts to confirm.

## Files Changed

- `conf.py` — updated `REDIRECTIONS` list
- `posts/` — 22 old `.html`/`.meta` pairs removed, 22 new `.md` files created
- `migration_scripts/convert_yyyymm_posts.py` — conversion script (new)
- `migration_scripts/transcript.md` — this file (new)
