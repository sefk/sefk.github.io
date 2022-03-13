<!--
.. title: About
.. slug: about
.. date: 2015/04/06 12:00
-->

I wrote my first computer program when I was twelve years old on
an Apple //e. It was a simple [robots game][] handwritten 6502
assembly. It took all summer to write. That's when I caught the
programming bug and I've still got it. Still it's a good day when
I get to write some code.

[robots game]: http://en.wikipedia.org/wiki/Robots_%28BSD_game%29

<img src="/f/sefface-soxhat-big.png" 
     style="float:right; padding-left:20px;"
     alt="Sef in baseball hat" width=280px>

At some point I wanted to have an impact beyond just my own two
hands so I became an engineering manager. I went from line managing
engineers (fun) to managing managers (harder) to being VP Engineering
and/or Operations (less fun). While I can do the bigger job, I've
been tending to do more hands-on work and managing smaller teams
lately.

I'm a father of two great kids and enjoy card and board games.

My GPG key is [`4C79 48F2 2057 0647 D573  937B AFD1 2F02 88AC 23B2`](../../f/sef-public-gpg-key-2015-06.asc)

[gpg]:      http://pgp.mit.edu/pks/lookup?op=vindex&search=0x1C97549F426D2123

# Tools

Here's a rundown of what I use all the live-long day.

## Editors

**Vi**. Still my go-to tool for writing: text, code (unless it's
very complex), simple lists, meeting minutes. I love modal editing.
I love its extensibility. I love how fast it starts up and runs.
I love how it is on every machine I need it to be on. I love how
rarely I have to use control key sequences, and even when I do,
since I remap caps-lock to control even that isn't so onerous. I
like fiddling with my `.vimrc` and plugins.

**Google Docs**. I have drunk the koolaid on Google Docs. The
collaboration is fantastic. If its missing a features that's usually
a good thing vs. PowerPoint or Excel or Word.

## Development

**IntelliJ and Friends**. I stayed writing code in Vi only for a
long time, probably too long, but now I've learned to love the IDE,
and to me that means PyCharm and WebStorm and of course IntelliJ.
They are impressive pieces of software and a great value.

If you don't know about the **CodeGlance** plugin, check it out.
It gives you a pretty little view of your code on the right -- you
know, that thing that Sublime Text has that every other editor
covets.

**Chrome**. The developer tools are outstanding. The **Postman** Chrome App 
(now also a standalone tool) is useful for driving API's and intercepting
traffic.

**Vagrant**. I used to work at VMware, so I appreciate virtualization.
What the Vagrant team did that is so impressive, is all the unglamorous
work to make it usable: error handling, integration, packaging,
etc. I've tried using it with the Fusion plugin, due to my allegiance
to VMware, but the additional cost and complexity solved problems
that I didn't have. I've gone back to VirtualBox and that's fine.

## The Command Line

**ITerm2**. Totally worth replacing Terminal.app with and it's worked
very well for me.

**Autojump**. Watches what you `cd` to and then you can quickly
jump back there. `j posts` takes me to my "posts" directory. Magic.

**bash**. I keep thinking I'm going to try some new shell hotness but
this one keeps working. Still my go-to scripting tool like
[this little gem][diary].

[diary]: https://github.com/sefk/sef-dotfiles/blob/master/bash_startup/diary.sh

## Mac Things

**Hyperswitch**. My key requirement is I need to quickly switch
between windows with alt-tab. I prefer lots of windows to tabs, and
alt-tab is hard-wired into my fingers from so many years on Windows.
And the Mac has never done this right, differentiating between
windows and apps (why!?). I was a longtime user of Witch for this,
but found it got flaky.

**Moom**. I've tried a bunch of Mac things for moving windows around
and this one is the best. The hotkey I've assigned is easy to type
(ctrl-shift-semicolon), pushing once gets me to some nice instant
macros (top, right, full screen) but the best thing is pushing
*twice* to bring up this nice little micro-manager where I can place
windows manually. Well done and works.

**CopyClip**. Does the job.

## Productivity and Apps

**Gmail**. I have two problems with GMail: needing a decent Internet
connection, since the offline client stinks, and giving Google all my
email. But on the first one, I haven't found a [fat client][airmail]
as good as Google's thin one: good keyboard shortcuts, excellent
auto-sorting into tabs. And whenever I've tried to move my mail
away from Google I'm astonished by the spam! Those guys are fighting
the good fight, and it keeps me from leaving. I also use the Gmail
native app on my iPhone now, it's just a bit nicer than the built-in
one, especially how it exposes the tabs.

**Google Calendar**. Is there a better way to share calendars amongst
a family? If so I haven't seen it. Pretty solid integration with
my iPhone built-in calendar.

## This Site

This site is generated using the **[Nikola][]** static site generator.
For information about why I chose Nikola, and how that works, I
wrote a [blog post][static] about that in Dec 2013. I wish the
themes were more customizable, for now I'm using it pretty stock.
My site [README][] shows the authoring/publish workflow. It's pretty
slick when you set up the branches and GitHub correctly.

This site is hosted on **[GitHub Pages][Pages]** and delivered over
**[CloudFlare][]**.  Thanks to them for providing free hosting and
delivery &mdash; over https!

So far I've been pleased with moving my comments to **[Disqus][]**.
My comment volume isn't much. It does what it claims to on the tin.
And **[Google Analytics][ga]** is more than enough visibility for
me.

**[My resume][]** is hard-coded simple HTML. It's formatted
the way you would format something back in 1998: just barely css,
tables with colspans / divs only for formatting, etc. I use
 `wkhtmltopdf` to render that HTML into a [PDF][], all managed
 by good old fashioned [make][].

[Nikola]:     http://getnikola.com/
[static]:     http://sef.kloninger.com/posts/switching-to-static.html
[airmail]:    http://sef.kloninger.com/posts/201312airmail.html
[Pages]:      https://pages.github.com/
[CloudFlare]: https://www.cloudflare.com/
[Disqus]:     https://disqus.com/
[ga]:         https://analytics.google.com/
[README]:     https://raw.githubusercontent.com/sefk/sefk.github.io/dev/README.md
[My resume]:  https://rawgit.com/sefk/sef-resume/master/sef-kloninger-resume.html
[make]:       https://github.com/sefk/sef-resume
[PDF]:        https://rawgit.com/sefk/sef-resume/master/sef-kloninger-resume.pdf
