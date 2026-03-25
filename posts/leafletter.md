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

The two main use cases are: volunteers who distribute these leaflets need to
know what neighborhoods have already been covered; workers can report in so
others don't double up their efforts.

Most of the interaction is through a "worker view". By default you see a map
showing what's already been done, and you can log your own trip. There's a
web and iOS versions, although the iOS one is mostly just a webview.

![Screenshot of Leafletter App's worker view](/f/leafletter-worker-screenshot.png)

[l]: https://leafletter.app/
[a]: https://apps.apple.com/us/app/leafletter/id6760505256
[about page]: https://leafletter.app/about/


## Why?

I built this app for a few reasons.

First was to help my wife out who has been organizing leaflet distribution for
[Indivisible Mid-Peninsula][] here in the SF Bay Area.

There are existing apps out there for organizing campaigns, but they all cost
money, and are much more heavyweight than what we need here. They seem to
target people hiring and managing gig workers to do this work and they need
workflow to keep track of inventory and tracking work (GPS, photos) &mdash; you
wouldn't want all those flyers just in a trashcan somewhere. Most important to
me was that the main interface was simple to use and low friction -- no
accounts!

Second, this was the capstone project in the Vibe Coding class I took this
quarter. I spent a few more weeks tweaking it, making it more robust, and adding
features, but the basics were working in that week I spent on it in class.

Third, it was just plain fun to do. I learned a ton living in Claude Code.  I
liked managing things mostly through GitHub Issues. I have a nice workflow:

1. File a bug describing what I wanted
2. "Let's fix issue #100"
3. Simple things just got coded up right then, harder things would go through
   planning
4. Local testing
5. "Commit it and close the bug"
6. I do the git push
7. Infra notices and does its build and push

I recorded a two-minute [screencast][] showing this in action, adding a [little
feature]. This one request came from my sister.

I also found it helpful to set up some personas that I could delegate tasks to.
A *Developer* to do most of the work, adhering to some rules I put in for good
coding practices ("always run tests"). And then two others that were rarely
used, on demand: a *Project Manager* to debug GitHub and a *UX Engineer* to
review and make suggestions ("Great, please open bugs for all of those").

The overall experience was joyful. While I'd like for this to get some use, the fun
was in the making.

[Indivisible Mid-Peninsula]: https://indivisiblemp.org/
[screencast]: https://youtu.be/gyJbiEwGMoU
[little feature]: https://github.com/sefk/leafletter-app/issues/100

## Was Anything Hard?

The tricky part was managing the download of the street data and stitching it
together into something manageable. It's a fair amount of data, and the
OpenStreetView backend isn't very reliable. Retries and long-running operations
needed a queue and worker. The screenshots below show the organizer interface
showing one event still being processed, and the ops console showing the
different servers.

![Leafletter list of campaigns](/f/leafletter-campaigns.png)
![Leafletter ops console on railway](/f/leafletter-railway.png)

I'm using Railway for hosting for the moment, which has been OK. Their storage
setup is a bit wonky ([#102]) and it might prove to be expensive, we'll see.

I did all of this easily within my $20/month Claude Code token budget. The
biggest expense was the $100 fee to have the privilege of putting something up
on Apple's App Store (boo).

[#102]: https://github.com/sefk/leafletter-app/issues/102

## Future work

Mobile still could use some work.

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