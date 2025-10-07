<!--
.. title: A Good Interview Question
.. slug: interview-question
.. date: 2025-10-07 15:00 UTC-07:00
.. tags: Management,Engineering,War Stories
.. type: text
-->

<img style="float:right" class="postimage" src="/f/python.png" alt="Python language logo" width=25%>

I liked the question that I got when interviewing at YouTube in 2015. At Google
then we'd have an interview panel of four or five people, each assigned to cover
a different area. [Billy Biggs][] was the TL on my panel asked to evaluate
"architecture." For a manager candidate that mostly meant evaluating technical
cluefulness (someone else had me do some simple [programming][fb]).

Billy's question: **Discuss what would cause a Python interpreter to crash. Not
a _program written in Python_, but the interpreter itself.**

I remember this leading to a fun, rambling, back-and-forth discussion of the
**ways computers can fail**. There are so many! Every level of the stack can
fail in interesting ways: storage, RAM, memory management, networking. How would
a bit flip in a TLB manifest? How does TCP/IP detect and handle ordering?
collisions?

We also covered a bunch of **engineering and process questions**. How is the
interpreter itself implemented, in what language and by whom? What would the
quality processes be like for a product like that, especially given Python is
presumably a really large open source project? How would you manage this? How
important to quality is the role of the [BDFL][]? 

And then that lead to a some more interesting higher-level discussions about the
actual **costs and benefits of addressing failures** like these in the field.
When should programs hard-fail versus detect and recover? How would you staff an
engineering team to find and chase down errors? What's the user impact to a
failure like this?

One of my favorite things about this question is most likely it was something
they'd actually seen right in their backyard. In 2015 significant parts of
YouTube was [written in Python][gm] (that's likely not the case anymore, I don't
know). Crashes like these must have come up in the field. Not only are
real-world problems relatively easy to ask, but they have the added benefit of
showing the candidate the kinds of issues that the team actually deals with. It's
also a well-shaped question: open ended, no right/wrong answers.

I got the job.

[Billy Biggs]: https://www.linkedin.com/in/billy-biggs-7ab1023/
[BDFL]: https://en.wikipedia.org/wiki/Benevolent_dictator_for_life
[gm]: https://mail.python.org/pipermail/python-dev/2006-December/070323.html
[fb]: /posts/201205fizzbuzz-for-managers