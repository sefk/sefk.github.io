<!--
.. title: I Built This: Leafletter
.. slug: leafletter
.. date: 2026-03-24 22:00:00 UTC-07:00
.. tags: AI,Engineering
.. type: text
-->

<img style="float:right" class="postimage" src="/f/leafletter-icon-large.png"
alt="Leafletter app icon" width=50%>

I wrote an app and I wanted to write about it. Not so much the app itself, but
how I made it and why.

You can try it out yourself. The web version is [Leafletter.app][l]. And there's
an iPhone app available on the [Apple App Store][a]. The [about page][] has a
bit of description, and there are a couple of test campaigns where you can log a
trip. That's what those test campaigns are for!

The two main use cases are: volunteers who distribute these leaflets ("workers")
need to know what neighborhoods have already been covered; workers can report in
so others don't double up their efforts.

[l]: https://leafletter.app/
[a]: https://apps.apple.com/us/app/leafletter/id6760505256
[about page]: https://leafletter.app/about/

![Screenshot of Leafletter App's worker view](/f/leafletter-worker-screenshot.png)

## Why?

I built this app for a few reasons.

First was to help my wife Maren out who has been organizing leaflet distribution
for [Indivisible Mid-Peninsula][] here in the SF Bay Area. 

There are existing apps out there for organizing campaigns like this, but they
all cost money, and they all are much more heavyweight than what we need here.
Most of them assume that you're hiring gig workers to do this work, so there's
a lot of workflow around keeping track of inventory and tracking with GPS or
photos &mdash; you wouldn't want all those flyers just in a trashcan somewhere.
Most important to me was that the "worker" interface was simple to use and low
friction. In particular I didn't want any sign-in or accounts. The honor system
is fine.

Second, this was the capstone project in the Vibe Coding class I took this
quarter. I spent a few more weeks tweaking, and making more robust, and adding
some features, but the basics were working in that week I spent on it in class. 

Third, it was just plain fun to do. I learned a ton living in Claude Code. I
recorded a two-minute [screencast][] showing the typical workflow. This was
adding a little feature, [issue #100] actually. This enabled panning the map
when in trip-selection mode, a feature request from my sister actually.

But the overall experience was joyful and fun. While I'd like for this to get
some use, the fun was in the making.

[Indivisible Mid-Peninsula]: https://indivisiblemp.org/
[screencast]: https://youtu.be/gyJbiEwGMoU
[issue #100]: https://github.com/sefk/leafletter-app/issues/100

## What Was Hard?

It actually wasn't very hard at all!

The only tricky part was managing the download of all this street information
and stitching it together into something manageable to download to a mobile
client. Since this required retries and long running operations this required a
queue and a worker. Below you can see what that looks like through the interface
an organizer would use to publish an event, and then the console up on Railway
which I'm using for hosting.

![Leafletter list of campaigns](/f/leafletter-campaigns.png)
![Leafletter ops console on railway](/f/leafletter-railway.png)

I did all of this easily within my $20/month Claude Code token budget. Hosting
costs so far haven't added up to much more than that. The biggest expense was
the $100 fee to have the privilege of putting something up on Apple's App Store
(boo).

## Future work

Mobile still could use some work

- I tried an iOS native interface for a while, but could never get it to perform
  well enough. But that'd still probably give a better experience
- I'd like to do an Android app too. I don't have a dev phone, but I imagine I
  could buy one from a friend at some point.

And then a ton of features: organization views and ACL's, correlating streets
with household demographics, better UX for selecting streets, etc. If you have
feedback please [file a bug]!

I'm looking forward to getting this in the hands of some real users soon and
getting some feedback.

[file a bug]: https://github.com/sefk/leafletter-app/issues