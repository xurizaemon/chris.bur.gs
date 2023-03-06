---
title: Commit credit carry-on
date: 2023-03-05
tags:
    - drupal
    - contribution
---
Drupal was an early proponent of crediting community contribution visibly. Today the community faces an interesting consequence of this policy - a large number of (perceived to be) low-value contributions are being submitted through the issue queues, with the apparent aim of increasing promotion via the [Drupal.org contribution recognition systems](https://www.drupal.org/drupalorg/contribution-credit).

Organisations which contribute to Drupal are recognised and have placement benefits on the Drupal.org website. This creates a motivation to earn commit credits, which some feel has recently resulted in submissions which are of low value (eg "Rename README.txt to README.md", or unnecessary patch re-rolls), which in turn _increases_ maintainer workload in dealing with the influx of submissions.

Bad patch re-rolls and poor review process have the risk of introducing bugs and all increased workload has a human cost in maintainer workload. The increased effort can only be worthwhile if it's appropriately focused, or the impact to the wider community will be negative.

It's worth noting that the organisational recognition system through commit credits is a form of hybrid, source-unavailable leaderboard - agencies can sponsor Drupal.org to a certain tier, then I think have their promotional placement increased by achieving a given number of contribution recognitions. Leaderboards can be problematic, and because they encode both community and implementation decisions, are gamable interfaces. Much to say here about metrics too, and we've [faced leaderboards before](https://www.lullabot.com/articles/how-we-compare-leaderboards-and-related-comparison-metrics-drupal-community).

I have appreciated that Drupal's contribution system was flexible enough for people to use in innovative ways, eg how [Talking Drupal]() and several working groups use d.o issues for crediting those involved in non-code labour. That's cool. The credit system also can't ever perfectly reflect contribution valuing, because a community is complicated. As a community, I think we need to build a solid understanding of what commits are most valuable and effective.

One response I've found helpful in response to community behaviour I find challenging is to have a ready reply which is generic, simple and clear ... and re-usable! Eg I have a [no email / private support gist](https://gist.github.com/xurizaemon/656d36d15a1e2619a129d26eab158746) to copy paste when a community support discussion gets redirected to a PM support request I can't meet. I saw a [comment by @jrockowitz](https://www.drupal.org/project/schemadotorg/issues/3344879#comment-14944642) which I thought was a well-phrased response and that got me thinking about how to have a clear, community response to correcting a behaviour we want to reduce.

(It's so important to keep in mind that this is a value judgement, that there may be more complexity to the situation, that )

I'm not sure if Drupal has made a "community comment" on the behaviour yet - it's complicated, and from conversations I've seen it looks like there's been direct communication at least with some of the agencies doing it. I also see maintainers struggling with getting 40 issue queue updates a night who are being prevented from doing their regular maintainer workload. At that point it'll be hard to maintain cool or even continuing maintaining components and we risk real community loss. Even so, I've observed _some_ "low-value" contributions being worthwhile and I try to give a fair response.

I'm concerned that if a brigade against entry-level contributions was set off, that could be really harmful for the community.

The Drupal community was a fore-runner of commit credits and even leaderboards - something we know can have significant impact for good and bad. I've seen proposed that we track negative credits and even display those against "offending" organisations to disincentivise, which I fear would have unintended consequences of its own. I'm realising the interesting complexity of Drupal's contribution data, how it reflects (or doesn't reflect) values across a diverse community, and the responsibility of having an established process for this which we'll have to continue to improve upon over time as long as it exists.

For me the reflection is about how we best redirect people who have time and energy to contribute from "commit credit carry-on" to outcomes which are those which are appreciated.

- I worry we might redirect people to review, then see an uptick in low-effort RTBC reviews.
- I worry that as tooling improves, automated low-effort contributions will increase
- I think we can predict that even more automated (eg LLM-generated) contributions will be on their way

I think there's a danger that a change in the balance of labour will affect thinking here. Agencies committing to contribution efforts will do well to be present and focus their contributions effectively.

We can be confident we'll see more automated commits in the future. Maybe getting ahead of that wave offers some relief but I'm guessing it won't be a refuge.
