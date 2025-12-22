!--
.. title: Tools
.. slug: tools
.. date: 2025/08/28
-->

## This Site

This is a static website generated using **[Nikola][]**. Static sites are great.
I wrote a [blog post][static] about why the choice of this particular site
generator a while back, but frankly any one will do and there are many to chose
from. All the pieces I use are free.

- **[GitHub Pages][]**. The [README][] describes the authoring/publish workflow.
- **[CloudFlare][]** for Delivery.
- **[Let's Encrypt][]** for self-signed TLS certificates.
- **[Google Analytics][]**

[Nikola]:           https://getnikola.com/
[static]:           /posts/switching-to-static/
[Github Pages]:     https://pages.github.com/
[CloudFlare]:       https://www.cloudflare.com/
[Let's Encrypt]:    https://letsencrypt.org/
[Google Analytics]: https://analytics.google.com/
[README]:           https://github.com/sefk/sefk.github.io/blob/dev/README.md

## My Resume

I maintain two versions of my resume, in [HTML][] and [PDF][] formats. It's
written in hand-coded simple HTML. It's formatted the way you would format
something back in 1998: just barely css; tables and colspans for layout.  I use
the utility `wkhtmltopdf` to render HTML into a [PDF][]. This is just a wrapper
around the webkit engine, and seems to work OK, but I'd switch to something more
modern and distributed via `brew` if I could find one.

Formatting is orchestrated by good old fashioned `make`. I know there are much
better ways to do the content and workflow these days.

[HTML]:  https://rawgit.com/sefk/sef-resume/master/sef-kloninger-resume.html
[PDF]:   https://rawgit.com/sefk/sef-resume/master/sef-kloninger-resume.pdf

## Editors

**vim**. Still my go-to tool for writing: text, code (unless it's very complex),
simple lists, meeting minutes. Lots to like about it: ubiquity, speed, easy on
the fingers.

**Visual Studio Code** with VI keybindings. This still works well, but with
every passing day I worry about it becoming bloated and enshittified.

**Google Docs**.

## The Command Line

**Ghostty**. Terminal replacement. After a long-time user, I switched from
iTerm2 to Ghostty as it seems just a little cleaner and more Mac-like.

**Autojump**. Watches what you `cd` to and then you can quickly jump back there.
`j posts` takes me to my "posts" directory. Magic.

**Zsh**. I finally switched over to Zsh when MacOS switched the default shell to
Zsh several years ago (Catalina). I've found **[Oh My Zsh][]** to be a helpful
way to manage themes and plugins. I expected its trick of checking for updates
updating every time you open a window to be onerous, but it hasn't troubled me
yet.

[Oh My Zsh]: https://ohmyz.sh/

## Mac Things

**[Homebrew][]**. The missing package manager for the Mac has proven remarkably
durable.

**[CopyClip][]**. I've come to rely on a clipboard manager quite a bit and it's
one of the things I miss most when moving to another OS. This one has always
done the job for me.

**[Moom][]**. I've tried a bunch of Mac things for moving windows around and
this one is the best. The hotkey I've assigned is easy to type
(ctrl-shift-semicolon), pushing once gets me to some nice instant macros (top,
right, full screen) but the best thing is pushing *twice* to bring up this nice
little micro-manager where I can place windows manually. Well done and works.

**[Alt-Tab][]**. My key requirement is I need to quickly switch between
windows with alt-tab. I prefer lots of windows to tabs, and alt-tab is
hard-wired into my fingers from so many years on Windows.  And the Mac has never
done this right, differentiating between windows and apps (why?). Prior apps I
tried for this were Witch and Hyperswitch, but it's hard to find one that's
reliable.

[Homebrew]:  https://brew.sh/
[CopyClip]:  https://fiplab.com/apps/copyclip-for-mac
[Moom]:      https://manytricks.com/moom/
[Alt-Tab]:   https://github.com/lwouis/alt-tab-macos

## Productivity and Apps

**Gmail**. Keep trying other things but keep coming back.

**Google Calendar and Tasks**. I use my calendar as my journal and todos too.
There are much fancier systems for keeping and managing task lists but I keep
coming back to the basic one.
