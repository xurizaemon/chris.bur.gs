---
layout: post
title: "Archimedes - a tool for tracking Drupal Sites"
modified:
categories:
excerpt: Did a quick show & tell of Archimedes at Drupal Dunedin & Wellington, here are some notes / links.
tags: [drupal, archimedes]
image:
  feature:
date: 2015-09-01T21:36:06+12:00
---

Visited the Drupal Wellington Meetup tonight and did a quick presentation of a couple of integrations we're using with Archimedes to monitor a network of Drupal sites. Here are my notes on the same, in case anyone wants to look further!

## Setup

Running Archimedes involves setting up an Archimedes server ([profile](https://github.com/xurizaemon/archimedes_server)) and installing a copy of the Archimedes module ([module](https://github.com/xurizaemon/archimedes)) on each client site. (Run `drush pm-update --security-only` on the server at a minimum, since I've not been updating the modules in the profile. You might also have to add some Bootstrap libs?)

You'll then need to configure each site by copying the *Public Key* from the server to each client, and setting the *Submission URL* to point to the server's `$base_url` + `/archimedes/update`. These details are available from the server at `admin/reports/archimedes/settings`.

## Updates

Updates will happen daily per default, or whenever you run `drush arch-send` on the client site. The server cron will process the incoming submissions via Drupal cron, so you may want to run the Archimedes's server's cron task frequently when there are updates in the queue - typically early morning.

## Additional Integrations

**I'll publish more about this shortly**, but we use some additional Drupal Views to expose data over the web to -

* Hubot
* Dashing
* Munin
* Nagios

Here's Hubot reporting on which sites use a module, and what versions they have installed. This is helpful on Thursdays, when security updates drop.

![Who uses $MODULE?](/images/hubot-who-uses-coffee.png)

Here's Dashing telling us the current state of play on a Thursday, after some core and contrib security updates have shipped. We can click on these numbers to see a (protected) View of which sites need attention.

![Dashing update notification](/images/dashing-updates-pending.png)

I don't have demo images for these, but we also generate Nagios and Munin config snippets from data gathered in Archimedes, and that lets us monitor site outages, track site load times, and graph additional figures like DB size, user registrations and other indicators of site activity.

## Resources

* [Archimedes Server](https://github.com/xurizaemon/archimedes_server), the server profile.
* [Archimedes](https://github.com/xurizaemon/archimedes), the client module.
* [Archimedes Extras](https://github.com/xurizaemon/archimedes_extras), some additional checks you might want to explore :)
* [Dashing](http://dashing.io/), an exceptionally handsome dashboarding toolkit.
* [Hubot](https://hubot.github.com/), your personal robot assistant.
* [Munin](http://munin-monitoring.org/) and  [Nagios](https://www.nagios.org/), tools to monitor your things.
* [Frosty Meadow](https://github.com/andyhmltn/frosty-meadow), which I used to bulk-rename our client sites for the purpose of demonstration. I used its [metal mode](https://github.com/andyhmltn/frosty-meadow/blob/master/lib/data/metal.json).

## Credits

We did a bit of this work, but Catalyst did most of the work with the release of Archimedes v1, which Josh Waihi presented back in 2010 (?) at Drupal Down Under in Brisbane.
