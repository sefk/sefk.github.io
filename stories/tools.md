<!--
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
- **[CloudFlare][]**
- **[Let's Encrypt][]** for self-signed TLS certificates.
- **[Disqus][]** for comments. I picked them years ago and frankly I'm surprised
they're still a going concern. I'm ready to drop them though [if needed][shit].
- **[Google Analytics][]**

**[My resume][]** is hard-coded simple HTML. It's formatted the way you would
format something back in 1998: just barely css, tables with colspans for layout.
 `wkhtmltopdf` renders HTML into a [PDF][], orchestrated by good old fashioned
`make`. I know there are much better ways to do the content and workflow these
days.

## Editors

**vim**. Still my go-to tool for writing: text, code (unless it's
very complex), simple lists, meeting minutes. Lots to like about it: ubiquity,
speed, easy on the fingers.

**VS Code** with VI keybindings.

**Google Docs**.

## The Command Line

**ITerm2**. A nice replacement for the mac's built-in Terminal.app. It's always
worked well and seems to be maintained well.

**Autojump**. Watches what you `cd` to and then you can quickly jump back there.
`j posts` takes me to my "posts" directory. Magic.

**Zsh**. I finally switched over to Zsh when MacOS switched the default shell to
Zsh several years ago (Catalina). I've found **<a href="https://ohmyz.sh/">Oh My Zsh</a>** to be
a helpful way to manage themes and plugins. I expected it's trick of updating
every time you open a window to be more onerous, but it hasn't troubled me yet.

## Mac Things

**<a href="https://github.com/lwouis/alt-tab-macos">Alt-tab</a>**. My key
requirement is I need to quickly switch between windows with alt-tab. I prefer
lots of windows to tabs, and alt-tab is hard-wired into my fingers from so many
years on Windows.  And the Mac has never done this right, differentiating
between windows and apps (why?). Prior apps I tried for this were Witch and
Hyperswitch, but it's hard to find one that's reliable.

**<a href="https://manytricks.com/moom/">Moom</a>**. I've tried a bunch of Mac
things for moving windows around and this one is the best. The hotkey I've
assigned is easy to type (ctrl-shift-semicolon), pushing once gets me to some
nice instant macros (top, right, full screen) but the best thing is pushing
*twice* to bring up this nice little micro-manager where I can place windows
manually. Well done and works.

**<a href="https://fiplab.com/apps/copyclip-for-mac">CopyClip</a>**. I've come
to rely on a clipbar manager quite a bit and it's one of the things I miss most
when moving to another OS like Linux or Chrome. This one has always done the job
for me.

**<a href="https://brew.sh/">Homebrew</a>**. The missing package manager for the
mac has proven remarkably durable.

## Productivity and Apps

**Gmail**. Keep trying other things but keep coming back. 

My GPG key is [`4C79 48F2 2057 0647 D573  937B AFD1 2F02 88AC 23B2`](../../f/sef-public-gpg-key-2015-06.asc).
Don't really use anymore.

[gpg]:      http://pgp.mit.edu/pks/lookup?op=vindex&search=0x1C97549F426D2123

**Google Calendar and Tasks**. I use my calendar as my journal and todos too.
There are much fancier systems for keeping and managing task lists but I keep
coming back to the basic one.

[Nikola]:           https://getnikola.com/
[static]:           /posts/switching-to-static/
[Github Pages]:     https://pages.github.com/
[CloudFlare]:       https://www.cloudflare.com/
[Let's Encrypt]:    https://letsencrypt.org/
[Disqus]:           https://disqus.com/
[shit]:             https://en.wikipedia.org/wiki/Enshittification
[Google Analytics]: https://analytics.google.com/
[README]:           https://github.com/sefk/sefk.github.io/blob/dev/README.md
[My resume]:        https://rawgit.com/sefk/sef-resume/master/sef-kloninger-resume.html
[PDF]:              https://rawgit.com/sefk/sef-resume/master/sef-kloninger-resume.pdf
