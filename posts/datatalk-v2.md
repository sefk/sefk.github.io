<!--
.. title: We Built This: DataTalk V2
.. slug: datatalk-v2
.. date: 2026-08-22 13:00:00 UTC-07:00
.. tags: AI,Journalism
.. category: 
.. link: 
.. description: 
.. type: text
-->

<img style="float:right" class="postimage" src="/f/datatalk-v2.png" alt="Screenshot of DataTalk" width=60%>

Since April I've been working with the [Big Local News] team at Stanford building DataTalk, a website where journalists can ask look for story leads in US federal campaign finance data using plain English. It's been a fun project and I'm proud of what we've built.

Before reading on, why not [try it out for yourself][datatalk]? You can select one of the four sample queries on the homepage. Or type your own query, something you're interested in, like "*show a list of all the donors who have donated to either AOC or Bernie Sanders this election cycle*". Ask follow-up questions to drill down, and then download your data in a spreadsheet alongside helpful context.

We re-launched this at the annual Investigative Reporters and Editors conference ([IRE 2026]) in Washington DC in June. That was a lot of fun. Since then we've been polishing it up and improving quality. It's ready for this election cycle -- I hope it gets a lot of use to report on the messy world of election finance over the coming months.

[Big Local News]: https://biglocalnews.org
[datatalk]: https://datatalk.biglocalnews.org/
[IRE 2026]: https://2026-ire-conference.sessionize.com/session/1234294

## How DataTalk V2 Came About

V1 of the site had been built and launched by the [Open Virtual Assistant Lab (OVAL)][oval] at Stanford two years ago. V1 was developed as a showpiece for NL to SQL processing technology that OVAL had built, and did that just fine. Campaign Finance was chosen as a showpiece dataset because it was complex enough that a query interface is helpful. The US FEC makes the dataset readily available. And when V1 was done, two years ago, it was an election year.

But there were a couple of places where DataTalk V1 fell short.

* **The data had gotten stale**. Election reporting is seasonal. During election years it's interesting and then it's not. After the 2024 election season people stopped minding it and the loaders stopped loading.

* **The site needed more domain expertise**. Part of DataTalk's value is to *bake in knowledge* about this particular dataset and domain. The FEC dataset is a bit quirky. The people who work with it have developed expertise in using this data well. There was a lot more we could do to not just encapsulate the schemas, but specific know-how too.

It's an election year. When I found Cheryl and Big Local News in the spring ([prior post]), Stanford had to decide to make it better or take it down. DataTalk was still out there, prominent in search results.

![search results for the query term "how can I query FEC data with English"](/f/fec-query-search-results.png)
I was looking for a project so I volunteered to take it on. Big Local News took over the code and responsibility from OVAL. I partnered up with two folks from Big Local News: [Gerald Rich], a strong journalist/engineer, and [Ryan Pitts] the team's engineering director. [Cheryl Phillips] runs Big Local News and was a strong direction-setter on the project. Together we stood up a little project with sprints and demos and CI. Over ten weeks we fixed the loaders, rewired the LLM interface, and refreshed the UI. We got it into good enough shape to show off at IRE, and then spent the summer making it good.

[oval]: https://oval.cs.stanford.edu/
[prior post]: /posts/biglocalnews
[Gerald Rich]: https://www.linkedin.com/in/geraldrich/
[Ryan Pitts]: https://www.linkedin.com/in/ryanapitts
[Cheryl Phillips]: https://journalism.stanford.edu/people/cheryl-phillips

## What We Built and Why

What we got from V1 was the core NL to SQL engine. That has always worked really well and we haven't had to change that much. Around that, however, we made some improvements in three main areas: an eval system, transparency around how we use AI, and supporting features for journalists.

### 1. A New Eval System

My main contribution to the product was driving the need for a formal eval system. From the start I identified this as a gap in V1.

I'm using "eval" here in the way that we used it at Google Search: having humans rate search results and using that feedback to monitor and improve quality. Google has a whole set of tools and workflows to work with human raters. 

We needed to do the same with DataTalk. I built a little workflow system that would put our answers in front of human raters and ask them how we did. We built up a set of test queries, about 100, and then asked raters to score our work on them. The methodology and rubric are right on the homepage of the eval site: [datatalk-eval.biglocalnews.org][eval], check it out for yourself there. You can even do a one-question eval yourself!

<div style="justify-content: center">
  <img src="/f/datatalk-eval.png" alt="Screenshot of the DataTalk eval system home page">
</div>

We engaged a domain expert in the field, [Derek Willis] from the University of Maryland. He brought a ton of experience with this quirky dataset to the product. He was also a pleasure to work with. We coded a bunch of his campaign-finance knowledge into our prompts. Derek also built up a corpus of eval questions, more than 100. Some are easy and some are hard; most are ones that have a correct answer that we score for, but some are ones where we shouldn't answer and for those we should politely refuse and explain why. As we've added features we've added questions.

We got some journalism students and ex-journalists to run through all our questions and do a complete quality pass. For the questions where we scored poorly we opened up bugs and chased them down. I also used AI raters (Fable from Anthropic, Sol from ChatGPT) to do their own assessment too and compared their scores to the humans -- not as good, but a helpful first pass.

We also use cheaper AI rating (gemini-2.5-pro) to measure how we're doing as part of our engineering process. This has proven critical as our prompts change. I've seen a seemingly innocuous prompt change cause a regression to one of our benchmark queries that we would never have caught without doing automated evals in the development process. We do smoke tests with every pull request and can do full judged eval passes on request.

[eval]: https://datatalk-eval.biglocalnews.org
[Derek Willis]: https://merrill.umd.edu/directory/derek-willis

### 2. AI Transparency

This project makes heavy use of AI. It's the first project of any size where I've leaned so heavily on AI for primary coding. It's been pretty great. 

- Our velocity has been pretty high. We turn around features and fixes quickly. We use it for production issues, so even with a small team we can have pretty good engineering and ops practice (push to staging first...)

- I've got a nice rhythm where I use my $100/month Anthropic/Claude Code plan for primary coding, but then use a $20/month OpenAI/Codex plan to review work before submitting a PR. 

And then for the product itself, we make it very clear where we are using AI and where we are not. Journalists are a naturally skeptical bunch. We lean into that by making it clear that we only use AI in two ways: to convert the natural language input into SQL, and then to interpret the results we get into a narrative. We call out the narrative in a prominent yellow box to make it clear what is AI-generated, and remind people over and over to double-check.

The screenshot below shows the AI narrative in the yellow "scare quotes" box, the result of our double-check (all OK), calling out any special gotchas in this dataset with links into a tipsheet, and then links to download the artifact as an Excel spreadsheet on your local machine or into Google Sheets.

<div style="justify-content: center">
  <img src="/f/datatalk-results.png" alt="Screenshot showing DataTalk results">
</div>

We tried a couple of AI models and found the Gemini 2.5 series fine for what we need. We use `gemini-2.5-flash` for a first pass, and if it can't handle the query we escalate to `gemini-2.5-pro`. That's proven effective.

### 3. Tailored to Journalist Use

It's been great working with a team that knows their users well. While V1 was a bit more general, part of Big Local News taking it over was looking to lean into the Journalist use case. I think we've done that well.

1. **We only use primary sources**. Currently we have two: the data reported by law by campaigns, gathered and collated by the Federal Election Commission, loaded nightly. And the [DIME dataset] maintained by Prof. Adam Bonica at Stanford used to judge the political leaning of a PAC or Super PAC -- this lets us answer questions like "who has gotten the most funding this year from conservative PACs?"

    This is the main differentiator between DataTalk and normal search or chatbots. you can drop in a query to a chatbot today and get *something*, and in many cases it's not bad. But that won't do for reporting.

2. **Transparency tools**. If you want to get into the SQL itself, we have a whole hosted query site. You can take the SQL we generate, run it yourself directly on FEC and DIME data tables, modify and repost. V1 had a similar SQL interface too which we mostly brought forward.

3. **Downloadable, self-contained spreadsheet**. We take the whole chat and give you a nice way to download the whole thing in a single, easy-to-use artifact. It has basic information about where this came from, the data itself in a nicely-formatted table, a data dictionary, the AI-generated narrative, and the whole transcript of the chat. This can be a useful takeaway for further analysis, or something to show your editor to prove where this came from and how.

Here's an example. This one was the result of a query asking for all people who have donated to either AOC or Bernie this cycle: [Google sheet][artifact].

[DIME dataset]: https://dime.stanford.edu
[artifact]: https://docs.google.com/spreadsheets/d/1PgtyhizvOpK5gQZ64khgGj91UZZ3hUl9j5eNcrrxCyQ/edit

### Also: Running A Good Service

I'd like to also mention that I'm proud of the ops side: it's a nicely-run little service. We have good monitoring and alerting in case a nightly loader looks weird or the site starts throwing errors. We have good dev tooling in place for local testing and qualification in staging before release. Releases are reliable and cheap.

Costs aren't too bad. Cheap queries cost about $0.01 per query, and escalating to the fancier model costs about $0.04. The Google Cloud stack has been great for this. Cloud Run instances have great horizontal scaling. Big Query is fast and reliable and cheap.

## What's Next

While I'd love to keep improving DataTalk, we've kind of reached the pencils-down point now. Almost all of this product's use will come over the next eight weeks or so as we ramp up to the 2026 midterm elections in early November. So while I'd love to keep refining our prompts and benchmarking new models, we need to lock it down.

We've started training sessions with journalists now. It's great to see it get some real use.

- Training materials: [Product Overview] and [Tipsheet]
- How to use for reporting: [Follow the Money] by Sarah Cohen -- veteran reporter, also now with Big Local News

[Product Overview]: https://docs.google.com/presentation/d/1p1A4Bh7DiR_oRCiRNuS7qtTvEEyA1FlhFns6JLqfQGo/edit?slide=id.g3f648aa6935_2_53

[Tipsheet]: https://docs.google.com/document/d/1nO3x9AREfmM9oGa05MI50UtT_Hl8Om4Ocuzkxxe01Ds/edit?tab=t.0#heading=h.nj23sjpj5u97

[Follow the Money]: https://docs.google.com/presentation/d/1yA3rMRz01SE-Ym65tcxZLilYpBXMZtNtpNaaEZadoI8/edit?slide=id.g3f75e90ccd1_1_1505

We won't take it down after the election, but it won't be used much, and that's fine.

We may use this same approach for other data sets. The whole point of Big Local News is to arm local journalists with tools to do investigative journalism better, faster, cheaper. We don't want to use AI to write stories, but maybe we can use AI to *generate leads* and *find stories in the flood of data* all around us. And by doing that, hold more powerful people to account.

