---
layout: post
title: "GovHack 2015: my writeup"
modified:
categories:
excerpt: My experience of GovHack NZ 2015.
tags: [govhacknz, dunedin]
image:
  feature: govhack-action-shot.png
  credit: Clare Curran
  creditlink: https://twitter.com/clarecurranmp/status/617537610257334272
date: 2015-07-05T01:02:50+12:00
comments: true
---

GovHack 2015 was a fun weekend.

We gathered on Friday night at the Sargood Centre in Logan Park - great venue, a large open space for working, and a room full of desks on wheels arranged exactly as you'd expect to find them, especially if you factor in that the students are physed students.

When I arrived there were two humans (@philwheeler and @vinlew) and a lot of chocolate biscuits.

----

I decided to jump onboard GovHack for multiple reasons. Firstly, as a hacker with a focus in social / political sphere, it's right up my alley. Secondly, my work environment has felt pretty isolated of late, and I wanted to do something as part of a team. Thirdly, I wanted a chance to explore some technology that's outside my regular work tasks.

So I signed up pretty much immediately on hearing that it was happening in Dunedin, but I wasn't sure I'd be able to do it until close to the last minute - it all fell together because Saira took leave from work expecting family to visit, and then they couldn't come at the last minute and I was able to commit my time to the weekend. Fortunate for me!

----

Friday night, and there were three of us - Phil the organiser, and Vin and I the participants. Vin and I decided we should team up. Great! A team, first objective nailed. We were in a large nautically themed room, and decided to retire to the room full of desks and whiteboards to plan goals. We sketched out a handful of concepts that might work.

Another participant arrived, Ross; he explained he was just checking it out, and probably wouldn't commit to the full weekend. (I don't think he came back.)

We bounced the ideas around. I can't remember what the other ideas were, but one of them I put forward was something that had been in my head for a few years, the idea that our legislation should be more open, more of a discussion, more forum and less rulebook. This was at the forefront of my mind after OS//OS in Wellington a few weeks before, where amongst many other inspirational exchanges I saw [Ben Balter](http://ben.balter.com/) talk about open government and where it's going in the U.S.A.

Huh, I'm rambling and I haven't even touched on the idea of the project yet. Maybe I should split that out into another post. This is what happened, and it's late and I'm typing like crazy. (see also: [GovHack 2015: My writeup](/govhack-2015-legolas/))

We bounced ideas around. One seemed to stand out, but I was a bit precious about it since it was an idea that I'd been keeping quite close to my heart for a long time, and I wasn't sure it was the right thing to burn on a weekend project. Also I'd come in hoping to contribute to someone else's idea! But ... well, we decided to go for it.

(I don't think we kept a record of the other ideas.)

----

So the basic concept was: _A platform for making legislation a conversation._

What's that mean? Well, I feel like citizens could engage more in the laws that we are bound by. To me, it seems the reason that "bad" laws stay on the rulebooks so long is that they are not obvious to us. If law was a thing you could check out, look at and discuss, would you feel differently about the laws that affect you? Would laws be written in language that were more accessible to citizens? Would laws change to reflect attitudes more quickly?

So, while we officially have input into our legislation, the real process is harder than it needs to be for citizens.

Damnit, I was going to write a separate post on that part.

So. We picked a goal. We started doing some research and fleshing out concepts. Phil Wheeler gave us some great guidance on how to achieve results over the course of the weekend - identifying the whole set of tasks, which would include making a video and other requirements of entry before the close of play Sunday evening.

I can't remember what time we left the Sargood Centre, but I went home and stayed up late, pulling apart some prior works, exploring the government dataset (NZ legislation) we were working with, and knocking together a crawler that could haul it into some platform to host discussion.

Saturday morning came around, and I was up early and hacking, then took an hour to walk in to Logan Park on the slightly icy roads. Walking helps me think, especially when I haven't had a full complement of sleep. I reached out to Beau and got him onboard; three is better than two, and Beau's legal training and perspective brought a lot of useful understanding to what Vin and I had achieved.

Saturday and Sunday were a whirl. I remember

* turning up at the venue Sunday before the organisers had it open, tapping away on my laptop.
* reluctantly deciding to use Drupal as a content store - turned out it was a fine choice for what we needed it to do, and thanks to existing community contributions (thanks Dan Morrison) came with the tools to handle the legislation XML and output it nicely. (Writing your own XSL is another story, though, and an ongoing one.)
* deciding in the last few hours that it was OK to make something with just demo in mind.
* Clare Curran visiting us and saying heartwarmingly encouraging things. Thanks Clare!
* enjoying hacking in NodeJS a lot.
* finding XSL a headfuck.
* regretting the choice of project name pretty much from the get-go.

And I learned some interesting things too.

* I enjoyed working with NodeJS; I still really like Javascript.
* [Drupal Services](https://drupal.org/project/services) is pretty cool for remote actions; I'll be hanging on to this tool.
* [Drupal Services API npm package](https://www.npmjs.com/package/drupal-services-api) does a great job.
* With legislation whizzing past my eyes, I got to ponder about things like [our treatment of undischarged bankrupts](https://twitter.com/xurizaemon/status/617244527812722688).
* I occasionally sat back to keep up via Twitter as other teams nationwide experienced the full gamut of GovHack feels.

And then it was Sunday evening, and we'd turned in a video and made some commits in a repo, and imported a bunch of legislation and served it up, and thrown a site up around that to "sell" the idea, and made friends, and eaten all the chocolate biscuits, and we had to down tools.

Today it's the school holidays - I probably won't have a chance to revisit this for a while, but it was great fun & you should get in on it next year.

Here's a [Storify of our weekend](https://storify.com/xurizaemon/govhack-dunedin-2015), probably missing bits.

Thanks [@hackdunedin](https://twitter.com/hackdunedin) for organising it, and Phil Wheeler & Josh Jenkins for all the time you put into helping make it happen for us.
