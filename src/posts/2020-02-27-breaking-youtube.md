---
title: Breaking YouTube & friends
subtitle: A wee tweak to prevent distraction in the mornings
date: 2020-02-26
tags: ["parenting", "youtube"]
type: post
---

We have a couple of young kids (currently 10 and 12) and "devices" in the home. We have a pretty good arrangement but one thing that's hard for them - one in particular - to resist is YouTube in the mornings.

We also have a [PiHole](https://pi-hole.net/) device on the network, and it's quite a bit more flexible (being "plain old unix", as far as I care) for scripting behaviours.

I added a couple of cronjobs to prevent access to certain sites during certain hours. This has resulted in the occasional "Dad, SITENAME doesn't work" but I'm firm that Dad doesn't do technical support before 9am (not domestic tech support anyway).

Here's the recipe - nothing special, but it works nicely enough for my needs.

**/etc/cron.d/blocked-sites**
```cron
0 6 * * * pi bash /usr/local/bin/pihole --regex '(^|\.)(googlevideo|snapchat|tiktok|youtube)\.com$'
0 9 * * * pi bash /usr/local/bin/pihole --regex --delmode '(^|\.)(googlevideo|snapchat|tiktok|youtube)\.com$'
```

Previously this used a file `/etc/pihole/blocked-sites` but that got fiddly and required wrapper scripts to work from cron ... this Just Works.

I haven't found a commenting solution for this static-hosted blog yet, you can use [chrisburgess/working-load issue queue](https://gitlab.wgtn.cat-it.co.nz/chrisburgess/working-loud/issues) for comments if you have a suggestion.
