## Context

This repo the personal website of Sef Kloninger. It contains both the
hand-edited files that are source content for the site as well as
the compiled assets that get served. It is a static website using the
[Nikola](https://getnikola.com/) framework.

Repo layout

- `conf.py` - main configuration
- `posts/` - blog posts, generally in markdown. Each contains its
  metadata. Tags are used to group into common themes
- `stories/` - site pages that are undated and and untagged, like the landing
  and about pages.
- `files/` - Assets, like images

The `dev` branch is where work happens. Publishing is done using the `nikola
github_deploy` command.

## Constraints

Commits can be safely made to the "dev" branch and pushed to Github.

Only the user can push to production. Claude, Gemini, or any other coding agents
are prohibited from using the `nikola github_deploy` command.
