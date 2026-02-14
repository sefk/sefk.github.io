<!--
.. title: Vibe Coding
.. slug: daleks
.. date: 2026-02-13 16:02:00 UTC-08:00
.. tags: Tech,War Stories
.. category: 
.. link: 
.. description: 
.. type: text
-->

<img style="float:right" class="postimage" src="/f/daleks-1984.jpeg" alt="Original Daleks game from 1984" width=45%>

When I was fourteen years old, I spent the summer hand-coding a video game. I'd
gone to a family gathering and my older cousin Erik brought his Mac from
college. I loved it, of course. I thought the [Daleks] game he had running on it
was so cool. The screenshot on the right is from that Classic Mac website and is
exactly how I remember it looking back then.

I was mesmerized. I'd played video games on my computer, like Hard Hat Mack
([gameplay video][hhm]), that were state of the art back then. But those were
coded by someone else. This seemed like something I could do.

Once I got back home to Fresno I got to work. I spent most of the rest of that
summer writing a clone of that game on my Apple //e. It was all done in
hand-coded 6502 assembly, I didn't even have an assembler back then, so I had to
do all the opcodes by hand. I had to learn twos complement math to do all the
branch offsets, in pencil on graph paper. The hardest part was getting smooth
animation working, since the Apple //e graphics system was super quirky,
especially the non-linear frame buffer. The high-res graphics section of this
[wikipedia page] describes it well enough.

I remember it took about two months to get it working. It's the first time I can
remember being in a flow state. It began my lifelong love of computers.

[hhm]: https://www.youtube.com/watch?v=zanShXo4btw
[Daleks]: https://www.macintoshrepository.org/3913-daleks
[wikipedia page]: https://en.wikipedia.org/wiki/Apple_II_graphics

<img style="float:right" class="postimage" src="/f/daleks-2026.png" alt="Screenshot of my recent Daleks game" width=50%>

Now, forty years later I'm [on a break] and taking a [Vibe Coding class]. Our
week one assignment is to code up a game. Out of nostalgia, I chose my old
friend, Daleks. **In about two hours, and spending about $10, I had a working
prototype.** I spent another couple of hours cleaning things up and getting into
version control. You can [play it here].

This was my first experience with Replit. Super impressive. This was also what
the rest of the students in the class used, and most of what they came up with
were much fancier than what I did, with 3d graphics and more interactive game
play. Although I also heard from some students that they ended up spending much
more to get their game stood up.

What was also impressive about this first experience with Vibe Coding was
dealing with backend and integration issues. To get their code deployed onto
this site required wiring up a GitHub workflow. Replit handled that just fine
too, although it took a couple of round trips.

Earlier today I asked Gemini to get local hosting running. There were some
permissions and crashing issues, and I had to resist the urge to run from the
command line myself and start Googling error messages like I normally do.
Instead I had Gemini debug and fix its own errors, which it did quickly.

If you'd like to check out the code or see some construction notes, they can all
be found in [GitHub].

[on a break]: /posts/leaving-google/
[Vibe Coding class]: https://continuingstudies.stanford.edu/courses/detail/20252_TECH-42
[play it here]: /daleks
[GitHub]: https://github.com/sefk/daleks