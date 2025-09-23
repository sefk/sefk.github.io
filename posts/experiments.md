<!--
.. title: Learn From Experiments
.. slug: experiments
.. date: 2025-09-23 11:00:00 UTC-07:00
.. tags: Management,Data
.. type: text
-->

<img style="float:right" class="postimage" src="/f/experiment.jpeg" alt="Line art of an experiment" width=60%>

_What's the value of an experiment or a prototype?_

There are all kinds of ways to have impact. A feature can improve user
experience; a hardening project can reduce risk of a production outage;
refactoring or test coverage can improve velocity or make software easier and
safer to maintain. And good engineers care a lot about impact. While it's not
the only thing that matters (the "how" is important too), if you start with
impact, you'll generally do well.

An engineer's job to put ideas into practice, to make things. But sometimes
we're not sure what to make. Or we think we know, but aren't sure it'll work.
The best way to figure that out is often running a set of experiments, or maybe
building a prototype (an n=1 experiment).

But crucially, an experiment doesn't have value itself. An experiment is
successful only if we've learned something. The intent of the test rig or
prototype isn't to live on. Indeed, knowing that we plan to throw it away is
part of what makes it fast and cheap to build, and it shouldn't have all the
trappings of production-quality software, like test coverage and code reviews.

So how do we ensure that value gets delivered? When you work in a team or a
company people turn over. It's not just enough to do the experiment, you need to
write it up and share your results. To produce a good writeup, you should:

1. **Figure out your hypothesis(es)** that you're testing. Often this is in the
   form of one or more questions. For prototypes, it might be a boolean, i.e. we
   can build X that will work. But even then, consider what "done" means.
   Stating your hypothesis in terms of a metric is often easiest. NB I find the
   goal/driver/guardrail framework from Thanks [Diane][]'s book helpful,
   [Trustworthy Online Controlled Experiments][book]. 

2. **State your assumptions and method**. This is where you usually get the most
   feedback. Note that this usually isn't a project plan, as your reviewers
   usually don't care how long it takes or what happens when. 

3. **Seek feedback** from your peers. Publish the doc stating the method to have
   smart people poke holes in your plan and make sure what you're measuring will
   actually address the hypothesis. And then when the experiment is done, get it
   reviewed by someone senior to ensure that your work supports your conclusion.
   This also spreads knowledge about this work (both that you're doing it, and
   the results) so the overall organization benefits.

The artifact produced has many benefits. It's useful for you as you discuss
follow-on work; it's useful come performance evaluation time. But most
importantly, it benefits the organization. Contemporary and future peers can
learn from this work. 

You'll benefit from taking the time to write it up, the reviewers learn from
reading, and it'll live on past your time with the team.

[Diane]: https://research.google/people/author3770/?&type=google
[book]: https://www.google.com/books/edition/Trustworthy_Online_Controlled_Experiment/TFjPDwAAQBAJ?hl=en&gbpv=1