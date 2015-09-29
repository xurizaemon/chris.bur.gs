---
layout: post
title: "Archimedes - Drupal platform for managing Drupal platforms"
date: 2015-06-13
comments: true
categories:
image:
  feature: archimedes-palimpset.png
  credit: Archimedes Palimpsest
  credit_url: http://archimedespalimpsest.net/
---
When you have Drupal sites you have Drupal updates, and if you have update notification emails turned on then you'll have lots of notices in your INBOX too.

At first I thought more informative update notices would help, but it can be a weekly deluge. We used Droptor for a while too, but it was hosted so it only did what was in the box.

Archimedes allows you to centralise this deluge of notices / "critical business intelligence" into a single website. It allows Drupal sites to report in to a central (Drupal) service which collates info about each site - update notices but also other site data (number of nodes, users; DB, file sizes; etc).

The site data comes in as nodes for each website and records upgrade status for each module / theme so you can view your sites in cross-section instead of digging through emails -

> which production sites are reporting views at version less than 7.x-3.11?

Once this data is collected together you can query it much more easily, and make pretty dashboards or chatbot commands to look up useful facts about how bad thursday just got.

Archimedes was first presented at [Drupal Down Under 2011](http://2011.drupaldownunder.org/session/archimedes-application-monitoring) by Josh Waihi, who developed it as an internal tool for Catalyst NZ. I started using it that year and

HOLY SHIT I NEED TO PUT AUTHENTICATION ON THAT. API key thingyfy it.
