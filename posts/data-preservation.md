<!--
.. title: Data Is Worth Preserving
.. slug: data-preservation
.. date: 2026-01-04 15:00:00 UTC-08:00
.. tags: Life,Tech,Civics
.. type: text
-->

<img style="float:right" class="postimage" src="/f/drp-logo.jpg" alt="Logo for the Data Rescue Project" width=30%>

Governments should produce [public goods], like navigation aids, roads, and
water treatment infrastructure. That seems like a reasonable thing to expect of
a functioning government, right?

I consider data a public good too. We all benefit from accurate maps,
measurements of the natural world, and trustworthy economic data.

Which is why it was I was so upset when I heard how the the current US
administration has been on a tear to **remove data**. All through 2025, websites
were taking down and datasets were taken offline. This [Wikipedia page] tells
catalogs what's been happening; this report by the [American Statistical
Association] tells the whole story and implications.

In response the [Data Rescue Project] sprang into action. They're a group of
concerned academics, librarians, and citizens who have been copying and
cataloging datasets so they aren't lost. The [project's press page] has links to
many articles and presentations that describe their work and its impact.

I saw a call for volunteers for DRP on a mailing list of ex-Googlers. I was
eager to help.

### Homeland Infrastructure Foundation-Level Data (HIFLD)

It's worth describing a bit about the particular dataset I actually worked on,
Homeland Infrastructure Foundation-Level Data (HIFLD). It's a good case study.

HIFLD is a collection of maps. Basic stuff: roads, levees, river depth charts,
locations of military bases. Beyond just being good, generally accessible maps,
a big part of its value is when everyone uses _the same maps_. HIFLD is mostly
curating data. Most of the data comes from other (USGS, Army Corps of Engineers,
Census Bureau) that HIFLD brings together and provides it in a trustworthy,
central place. Well, I should say "provided" because in September the
[government stopped providing it]. The story is well told in this [overview].
It's a good read so I don't have to report it all here.

This is where the Data Rescue Project comes in. DRP volunteers scooped up the
data into temporary storage and organized a bucket brigade of volunteers to put
[snapshots] into long-term storage. Importantly, this was coupled with metadata
to ensure they're findable later. That's the part I worked on, uploading and
entering metadata. [Frank Donnelly], the project manager, wrote up a nice
[summary] of what we did. I used a nice Selenium driver, written by another
volunteer, to create over a hundred projects ([screen recording]).

Note that this is just one of many DRP efforts. Check out their [tracker] to see
the breadth of work.

While I'm proud of the work, and very supportive, I keep in mind that this i
still playing defense. Having a one-time snapshot isn't nearly as good as having
the government actually do its job. Which is why we need to keep demanding the
government does better! Assert your rights and [protest] ❌ 👑.

[public goods]: https://en.wikipedia.org/wiki/Public_good
[Wikipedia page]: https://en.wikipedia.org/wiki/2025_United_States_government_online_resource_removals
[Data Rescue Project]: https://www.datarescueproject.org/
[project's press page]: https://www.datarescueproject.org/press/
[government stopped providing it]: https://www.reddit.com/r/gis/comments/1lkol3s/sad_news_hifld_open_to_be_discontinued_by_sept_30/
[American Statistical Association]: https://www.amstat.org/policy-and-advocacy/the-nation's-data-at-risk-meeting-american's-information-needs-for-the-21st-century
[overview]: https://projectgeospatial.org/geospatial-frontiers/the-rise-power-and-uncertain-future-of-americas-open-infrastructure-data
[Frank Donnelly]: https://libguides.brown.edu/prf.php?account_id=276524
[summary]: https://www.datarescueproject.org/hifld-data-saved/
[snapshots]: https://www.datalumos.org/datalumos/search/studies?q=hifld%20open
[screen recording]: https://youtu.be/dVadwqbJoSs
[tracker]: https://www.datarescueproject.org/data-rescue-tracker/
[protest]: https://www.nokings.org/