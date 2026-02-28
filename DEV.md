## Context

This repo the personal website of Sef Kloninger. It contains both the
hand-edited files that are source content for the site as well as the
compiled assets that get served. It is a static website using the
[Nikola](https://getnikola.com/) framework. The site is hosted via
Github pages via a custom subdomain, https://sef.kloninger.com/.

Repository Layout

- `conf.py` - main configuration
- `posts/` - blog posts, generally in markdown. Each contains its
  metadata. Tags are used to group into common themes
- `stories/` - site pages that are undated and and untagged, like the
  landing and about pages.
- `files/` - Assets, like images

Branching

- `dev` - where work happens
- `master` - the production version of the site. Includes both source
  and compiled assets. `nikola github_deploy` orchestrates build, merge,
  and push to production.

## Posts and Stories

All posts follow a similar layout.

- Markdown text per Nikola
- A header block at the top as HTML comments with Nikola metadata.
- A hero image, right aligned that text can flow around. To get the
  formatting right, this is done via an IMG tag instead of markdown
- Images locally copied into the `/files/f` subdirectory so they can be
  versioned and self-hosted.
- H2 elements for section headers.

## Constraints

Commits can be safely made to the "dev" branch and pushed to Github.

Only the user can push to production. Claude, Gemini, or any other
coding agents are prohibited from using the `nikola github_deploy`
command.
