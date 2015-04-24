<!-- 
.. title: Lessons from Three Years in AWS
.. slug: aws
.. link: 
.. description: 
.. tags: Tech
.. date: 2015/04/24 00:10
-->

<img style="float:right" class="postimage" src="/f/aws.png" 
     alt="AWS Logo" width=30%>

I've spent the last three years building and operating web sites
with Amazon Web Services and here are a few lessons I've learned. 
But I first have to come clean that I'm a fan of AWS with only
casual experience with other IAAS/PAAS platforms.

**S3 Is Amazing**. They made the right engineering choices and
compromises: cheap, practically infinitely scalable, fast enough,
with good availability. $0.03/GB/mo covers up for a lot of sins.
Knowing it's there changes how you build systems.

**IAM Machine Roles From The Start**. IAM with [Instance Metadata][im]
is a powerful way to manage secrets and rights. Trouble is you can't add
to existing machines. Provision with machine roles in big categories
(e.g. app servers, utility machines, databases) at the start, even if 
just placeholders.

**Availability Zoness Are Only Mostly Decoupled**. After the 2011
[us-east-1 outage][2011] we were reassured that a coordinated 
outage wouldn't happen again, but it happened again just
[last month][2015].

**They Will Lock You In And You'll Like It**. They secondary services
work well, are cheap, and are handy. I'm speaking of SQS, SES,
Glacier, even Elastic Transcoder. Who *wants* to run a durable queue
again?

**CloudFormation No**. It's tough to get right. My
objection isn't programming in YAML, I don't mind writing Ansible plays, it's the
complexity/structure of CloudFormation that is impenetrable. Plus
even if you get it working once, you'd never run it again on something
that is running.

**Boto Yes**. Powerful and expressive. Don't script the CLI, use
Boto. Easy as pie.

**Qualify Machines Before Use**. Some VMs have lousy networking,
presumably due to a chatty same-host or same-rack neighbor. Test
for loss and latency to other hosts you own and on EBS. (I've used
home-grown scripts, don't know of a standard open-source widget,
someone should write one).

**VPC Yes**. If you have machines talking to each other (i.e. not a
lone machine doing something lonely) then put them in a VPC. It's not
hard.

**NAT No**. You think that'll improve security, but it will just
introduce SPOFS and capacity chokepoints. Give your machines publicly
routable IP's and use security groups.

**Network ACLs Are A Pain**. Try to get as far as you can with just security
groups.

**You'll Peer VPC's Someday**. Choose non-overlapping subnet IP ranges
at the start. It's hard to change later.

**Spot Instances Are Tricky**. They're only For a very specific use
case that likely isn't yours. Setting up a test network? You can
spend the money you save by using spot on swear jar fees.

**Pick a Management Toolset**. Ansible, Chef, all those things aren't
*all* that different when it comes down to it. Just don't dither back
and forth. There's a little bit of extra Chef love w/ AWS but not enough to tip
the scales in your decision I'd reckon. 

**Tech Support Is Terrible**. My [last little
startup][wf] didn't get much out of the [business level tech
support][sup] we bought. We needed it so we could call in to get
help when we needed it, and we used that for escalating some problems.
It was nice to have a number to call when I urgently need to up a
system limit, say. But debugging something real, like a networking
problem? Pretty rough.

**...Unless You Are Big**. Stanford, on the other hand, had a named
rep who was responsive and helpful. I guess she was sales, but I
used her freely on support issues and she worked the backchannels
for us. Presumably this is what any big/important customer would
get, that's just not you, sorry.

**The Real Power Is On Demand**. I'm reaffirming cloud
koolaid here. Running this way lets you build and run systems
differently, *much better*. I've relied on the cloud this to bring
up emergency capacity. I've used it to convert a class of machines
on the fly to the double-price double-RAM tier when hitting a
surprising capacity crunch. There are a whole class of problems
that get much easier when you can have 2x the machines for just a
little while.  When someone comes to you with that cost/benefit
spreadsheet arguing why you should self-host, that's when you need
your file of "the cloud saved my bacon" stories at the ready.

  [2011]: http://www.networkworld.com/article/2202805/cloud-computing/amazon-ec2-outage-calls--availability-zones--into-question.html
  [2015]: https://www.reddit.com/r/aws/comments/2zpag7/aws_internal_dns_outage/
  [sup]: https://aws.amazon.com/premiumsupport/
  [wf]: http://www.wavefront.com/
  [im]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
