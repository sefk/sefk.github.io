<!--
.. title: I'm About To Launch This
.. slug: about-to-launch
.. date: 3025-09-26 09:12:46 UTC-07:00
.. tags: Engineering
.. description: 
.. type: text
-->

<!--
https://docs.google.com/document/d/1Cwo6eJQp5Dub0gFSPj3AJiUzMg49uvuAY-J1ZVWsj9I/edit?tab=t.0#heading=h.x6q5nzfc369r
-->
<img style="float:right;border:2px solid #555" class="postimage" src="https://www.nasa.gov/wp-content/uploads/static/history/afj/ap15fj/csmlc/5-01.gif" alt="One page from the Apollo 15 flight journal, checklist for Earth Orbit Entry Vehicle Prep." width=40%>

Right before launching something it's important to take stock and make sure you
know what you're doing. This post argues for taking a beat, thinking through how
it will go, and capturing that thinking in a document. Let's call it a premortem \[[1](#note1)\].

In the past I've gotten pushback when asking for these: why a new document? why
this, why now? I know how to do my jobs let me do it. Instead, I've asked for
them one-off or as part of a launch process. And then, when I get them, they're
one of the things I review most closely.

First, why are they useful?

1. **As-Planned vs As-Built**.  A design document is what you plan to build. But
    once you get into it, things change, for lots of good reasons. Sometimes
    it's due to your better understanding, so the solution came out different --
    maybe significantly so! Or maybe you're following good engineering practice
    and releasing things in stages, and this just one part.

    There's a phrase from the world of physical engineering that is useful here,
    referring to the two kinds of, as-planned and as-built. Gemini describes the
    difference well. 

2. **Operational Considerations**. Many parts of the launch doc cover things
    that you can't know until you've built it. For example, what data validation
    did you do? How complete was your testing? Did you show it to users? What is
    the actual capacity impact?

    And other parts are things that you might think you can think through at
    design time, but in practice it's hard. What is the rollback strategy? Any
    special release tactics like avoiding release freezes? If it fails, would
    anyone notice (monitoring, alerting)? If users have problems, what channels
    would they use to communicate that to you (e.g. YAQ's), are you watching
    those channels?

3. **Quality and Process Control**. This is usually the last place that our management (including me) gets a
    chance to look over the process that you went through. Again, the PCB, PRD,
    and Design might say what you plan to do, but this doc is a place to review.
    Do those docs have approvals, were comments addressed? 

With that in mind, here are some of the qualities I look for in a launch doc.

1. **It should be well written**. Use complete sentences. Have a summary describing
   what you're planning to do: the when, how, and why. If copy/pasting some of
   this from the PRD or Design makes sense, go ahead. But assume that the reader
   doesn't have all the context you have, so you might need to do some
   explaining.

2. **Show your homework**. If you did data validation, show how your method and
   interpretation, not just the results

3. **Include well-written comms**. The launch doc links user-facing documents and
   the launch announcement. Mike covered much of what he's looking for in the
   announcement in this recent deck. That all applies to usage docs too.

Launching features thoughtfully is part of being a good engineer. And it's also
part of how we show respect for your customers and your other engineers. It's
worth your time to do well.

#### Notes
<a name="note1"></a>

1. Some people use the word "premortem" to describes more of a _process_ than a
   document, like in [this article][].
   
[this article]: https://hbr.org/2007/09/performing-a-project-premortem
