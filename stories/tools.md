<!--
.. title: The Tools I Use
.. slug: tools
.. date: 2015/04/28 1:00
-->

Here's a rundown of what I use all the live-long day.

<h2>Editors</h2>

**Vi**. Still my go-to tool for writing: text, code (unless it's
very complex), simple lists, meeting minutes. I love modal editing.
I love its extensibility. I love how fast it starts up and runs.
I love how it is on every machine I need it to be on. I love how
rarely I have to use control key sequences, and even when I do,
since I remap caps-lock to control even that isn't so onerous.  I
<strike>spend</strike> waste time fiddling with my
<tt>.vimrc</tt> and plugins.

**Google Docs**. I have drunk the koolaid on Google Docs. The
collaboration is fantastic. If its missing a features that's usually
a good thing vs. PowerPoint or Excel or Word.


<h2>Development</h2>

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


<h2>The Command Line</h2>

**ITerm2**. Totally worth replacing Terminal.app with and it's worked
very well for me. 

**Autojump**. Watches what you <tt>cd</tt> to and then you can quickly
jump back there. <tt>j posts</tt> takes me to my "posts" directory. 
Magic.

**bash**. I keep thinking I'm going to try some new shell hotness but
this one keeps working. Still my go-to scripting tool like
[this little gem][diary].

  [diary]: https://github.com/sefk/sef-dotfiles/blob/master/bash_startup/diary.sh



<h2>Mac Things</h2>
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

**Flux**. Easy on the eyes, especially for us night owls.

<h2>Productivity and Apps</h2>

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


<h2>This Site</h2>

**Nikola**. This blog is written using the [Nikola static site generator][nikola].
For information about why I chose Nikola, and how that works, I
wrote a [blog post][static] about that in Dec 2013. I wish the
themes were more customizable, for now I'm using it pretty stock.

**GitHub Pages**. This site is served by GitHub Pages. They do a
good job and even give me basic CDN integration. The only big
downside of such low-rent hosting is now SSL, at least as long as
I want to use my own domain.  Once they support HTTPS I'll gladly
use it!

So far I've been pleased with moving my comments to **Disqus**, but
my comment volume isn't much. But it does what it claims to on the
tin. And **Google Analytics** is more than enough visibility for me.




  [nikola]: http://getnikola.com/
  [static]: http://sef.kloninger.com/posts/switching-to-static.html
  [airmail]: http://sef.kloninger.com/posts/201312airmail.html
