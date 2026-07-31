# Codex Suggestions

Review performed July 31, 2026. The site builds cleanly, but I would address
the following items in roughly this order.

## 1. Fix likely accidental publishing issues

- `posts/local-retail.md` is dated `3026`, so deployment will treat it as a
  future post.
- The same post references a missing `helmet-repair.png` image.
- `stories/ai-sandbox.md` has no Nikola metadata and is currently included in
  the generated sitemap. It reads like working notes rather than a public page.

## 2. Make broken-link checking part of the normal workflow

`nikola check -l` currently fails. Beyond the globally referenced, absent
resume files, it found:

- Links to Markdown source, such as the link to `switching-to-static.md` in
  `posts/gemini-claude-cleanup.md`.
- Old `.html` and WordPress-era paths.
- Broken relative links to `daleks`.
- The missing helmet image.
- Mixed-content `http://sef.kloninger.com` links.

Add a small allowlist for intentionally external deployment artifacts such as
the resume, then require the remainder to pass.

## 3. Consolidate `Tech` and `Technology`

They currently generate separate category pages: 6 posts use `Tech`, while 28
use `Technology`. The hand-maintained category list in `stories/about.md` only
exposes `Technology`. Ideally, generate this list from Nikola's tags instead of
duplicating it manually.

## 4. Add reproducible dependencies and CI

`requirements.txt` is entirely unpinned, and there is no `pyproject.toml`,
`uv.lock`, or GitHub Actions workflow. Given the repository's preference for
`uv`, add a locked environment plus CI that runs:

- A clean Nikola build.
- `nikola check -l`.
- Tests for the editorial scripts.
- Optionally, an HTML and accessibility audit.

## 5. Repair the editorial scripts before relying on them

- Both scanners contain absolute, machine-specific paths.
- `scripts/scan-spelling.py` looks for `.tmp/allowed-words.txt`, but the
  checked-in file is `scripts/allowed-words.txt`.
- `scripts/filter-spelling.py` lowercases a word before calling `isupper()`, so
  that branch can never succeed.
- The grammar scanner does not strip HTML tags, producing many false positives.

Despite the noise, the grammar scan found real repeated-word errors in
`posts/atp.md`, `posts/two-things-at-once.md`, and `posts/values.md`.

## 6. Improve page-specific metadata

Fifty-one of 73 Markdown posts have a blank description. The template falls
back to the same site-wide description, so many pages get duplicate meta
descriptions. Adding descriptions to recent and high-traffic posts would
improve search snippets without requiring a full historical cleanup.

## 7. Do a focused accessibility and content-modernization pass

- Eleven images have empty alt text; some are meaningful screenshots rather
  than decorative images.
- Several images lack intrinsic dimensions, increasing layout shift.
- Old content contains invalid attributes and elements such as `width=`,
  `<font>`, and presentation tables.
- Add responsive defaults such as `max-width: 100%; height: auto`, and disable
  image floats on narrow screens.

## 8. Reduce asset clutter

`files/f` contains 225 files and about 43 MB. A conservative reference scan
found 132 apparently unused files totaling about 19.8 MB, largely old WordPress
thumbnail variants. Verify these against the production branch and external
URLs before removing them.

## 9. Reduce theme-upgrade friction

`templates/base_helper.tmpl` copies a large upstream template to make three
small changes. That risks silently missing future Nikola fixes. A smaller
override, plugin hook, or build-time transformation would be easier to
maintain.

## 10. Refresh the README

It still documents Bootstrap 3 and `pip`, while the site uses Bootstrap 4 and
the preferred tooling is `uv`. It also contains an incorrect virtualenv
activation path.

## Verification performed

- `nikola build` passed.
- `nikola check -f` passed.
- `nikola check -l` failed with the link issues described above.
- `python3 scripts/scan-grammar.py` reported 33 potential issues, mostly false
  positives plus the genuine repeated words noted above.
