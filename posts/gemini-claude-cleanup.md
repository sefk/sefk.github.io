<!--
.. title: AI Excels At Cleanup
.. slug: gemini-claude-cleanup
.. date: 2026-02-17 21:00:00 UTC-08:00
.. tags: AI,Tech
.. type: text
-->

<img style="float:right" class="postimage" src="/f/gemini-claude-cleanup.png" alt="Claude Code on the left, Gemini on the right" width=60%>

I really enjoy having AI take care of grungy cleanup work for me. You know those
kind projects that necessitate a little program or script. Sure you can write it
yourself but it's not fun and fulfilling, that's for sure, so it just doesn't
get done.

Instead of just knocking this out I decided this was a good opportunity to give
the same task to **Gemini** and **Claude** (CLI interfaces both) to see how they
do. Not really a bakeoff, since it's just those two and it's not an especially
hard task.

**Results**: Both did very well! Gemini got it right on the first try; Claude
had two bugs that I had to tell it to fix, but it did so itself. Claude was a
little nicer to work with, and ended up with a nicer description of its work.
They produced nearly identical results.

## The Task

I wanted to clean up the some of the old files backing this blog. I migrated the
site from Wordpress to Nikola in 2013. Even back then, as I complained about in
[my post](/posts/switching-to-static.md), I didn't like the file layout, but
couldn't be bothered to fix it.

I put the [prompt](#prompt) at the bottom of this post. It's probably too long.

The best way to see what they did is to just look at the commits: [Gemini][gc]
and [Claude][cc]. Check out either, they're pretty similar. Pay attention to the
`migration_scripts` subdirectory, that's where the conversion script(s) ended up
as well as a each tool's description of what it did and a full log.

[gc]: https://github.com/sefk/sefk.github.io/commit/4a91a57dc965b1e77c05fafbc05fa14f1a293c7f
[cc]: https://github.com/sefk/sefk.github.io/commit/78cee0789d98677c5298df543e895d7e2002ff72

I pay $20/month for "Pro" access, giving me Gemini 3 and Claude Sonnet 4.6, the
best backends for each at this writing.

## Thoughts on Claude

I didn't describe the problem as "Wordpress-style naming" but Claude sussed that
out. Honestly I'd forgotten that was the source of the problem. Nice!

I like that Claude inserted comments in the configuration file without being
asked to.

Despite being told to test, there were two bugs that I had to find.

* Some of redirects broken. I pointed the problem out and it did more thorough
  testing using `curl` and found the problem. The new format was what Gemini
  came up with in the first pass (luck? smarts?).
  
* A missing newline between the metadata and the body caused the hero images
  to be dropped.

![screenshot](/f/cleanup-missing-hero.png)

## Thoughts on Gemini

I haven't used the Gemini CLI as much by this point. It seems to have borrowed
much of it's UI and flow from Claude code (slash commands, asking questions
as it goes) so it's familiar and done pretty well. Just a little less mature and
polished, but that's OK.

I think Claude did a little better writeup. But aside from that, Gemini nailed
it on the first try.

## Usage

I really liked how Claude shows how much of it's context window is used via the
`/context` command. I had a harder time getting this kind of thing out of
Gemini, and even when I did it was harder to grok.

I couldn't tell with either if I'm getting close to any global usage limits. I
should hope not, this wasn't a very big job.

### Claude

![Claude context window usage](/f/claude-context.png)

### Gemini

![Gemini "stats for nerds"](/f/gemini-context.png)

## Prompt

I gave the same prompt to both:

```text
First read DEV.md for context about this web site.
 
In the posts subdirectory are many files that follow an old 
naming convention.  Please convert them all to the new file
naming convention.
 
The old convention has files of the format YYYYMM<slug>.SUFFIX,
where YYYY is the year, MM is the month, and SUFFIX is html or
meta. <slug> is the short form of the the title, and should match
the "slug" field in the metadata
 
To convert to the new convention
 
1. Drop the YYYYMM file prefix
 
2. Combine the "html" and "meta" files into one markdown file
   with a "md" suffix. The contents of "meta" are at the top of
   the file as an HTML comment
  
3. Add redirects so the old names can still be served. Add tuples
   in the REDIRECTIONS of conf.py
 
Use the `nikola build` and `nikola serve` commands to test your
work. Make sure all old URL's still function. Make sure pages
look the same. Make sure tags still work.

Do not commit changes. Do not push to production.
```

I also checked in a [`DEV.md`][dev] file that described the purpose, directory
layout, and some constraints. Again, maybe overkill, but I figured this isn't
the last time I'll be asking one of these tools to help me futz with this site.

[dev]: https://github.com/sefk/sefk.github.io/blob/dev/DEV.md