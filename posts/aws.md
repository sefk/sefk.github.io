<!-- 
.. title: Lessons from Three Years Living in AWS
.. slug: aws
.. link: 
.. description: 
.. tags: Tech,draft
.. date: 2015/04/06 20:07
-->

<img style="float:right" class="postimage" src="/f/aws.png" alt="AWS" width=30%>

I've spent the last three years building and operating services
that are all-in on Amazon Web Services. This long post is my brain
dump on many of the lessons I've learned along the way.

I wouldn't necessarily call myself an Amazon fanboy, but I am
generally really happy with their service and would use them again
to build my business on.


## AZ's Aren't All That Decoupled

Amazon makes a big fuss about how their Availability Zones are
independent. Separate physical infrastructure (power, cooling) and
infrastructure should keep things, well, separate. But there was
an [infamous Amazon outage][2011] in their Northern Virginia site
in 2011 that called into question the whole AZ thing. But that was
just a fluke, right?

Well, it [happened again just last month][2015], albeit on a much
smaller scale. This time it was internal DNS that affected some
VPC's that spanned availability zones in Oregon (US-WEST-2). It was
definitely noticeable at Wavefront, where I was working at the time,
and we got through it OK. But it "wasn't supposed to happen."

The lesson is that AZ's are a good idea but don't bet the farm on
them having truly decoupled failure modes.


## S3 Is Amazing

As an engineer you just have to marvel at something that is well
built. Whatever compromises they had to make were the right ones.
Because as a user of Amazon's Simple Storage Service (S3) it occupies
a really nice space: cheap, practically infinitely scalable, pretty
fast, with good availability. And did I mention it was cheap? At
**$0.03** per GB/mo you can store a lot of logs and videos.

The key thing they did right was to not build on a filesystem, but
instead their own BLOB store, [Dynamo][dynamo] (the famous paper
is linked from that post).

When I was at Akamai we operated a storage service that fell short
of these marks. Originally built on NetApp filers, and later farms
of JBOD's, it was complicated and never got to the
price/performance/availability neighborhood of S3. Now, I left
Akamai in 2008 and they've likely built something better by now,
but at least back then, we struggled with storage.

You'll be amazed how much you can stick in S3 for so cheap. It
really changes the way you think of building a system having something
like that around that you can count on.


## Secondary Services Just Work

It's safe to say that Amazon makes its money from their Big Kahuna
services, especially EC2. But what they've been good at over the
last few years they've continued to roll out a

## Qualify Machines Before Using

## Start With Machine IAM Roles

## CloudFormation No, Boto Yes

## Managing Costs: Spot's No, Reserved Yes

## VPC Yes, NAT No

## Support Isn't Great Unless You're Big

## The Real Power Is From On Demand

Most people have drunk the Koolaid on cloud computing, so I won't beat that horse here. I just want to recount two stories 



  [2011]: http://www.networkworld.com/article/2202805/cloud-computing/amazon-ec2-outage-calls--availability-zones--into-question.html
  [2015]: https://www.reddit.com/r/aws/comments/2zpag7/aws_internal_dns_outage/
  [dynamo]: http://www.allthingsdistributed.com/2007/10/amazons_dynamo.html
