---
layout: post
title: "CiviCRM upgrades via Vagrant"
date: 2013-04-06T00:24+12:00
comments: true
categories: 
draft: true
---

The last few weeks I've been working for the NZ Green Party on an update to their CiviCRM DB. I expect a bit of suffering in any CiviCRM upgrade, and I wasn't disappointed. (I accept suffering as inevitable, but that doesn't mean I need to embrace it.)

I wanted to kick off with a recipe which would let me reproducibly bring up upgraded versions of CiviCRM with a fresh copy of the site data. (See @todo Obfuscating CiviCRM test data for more on that.) 

(@todo I should write an embargo plugin for Jekyll so I can say `embargo: +3mo` in my post's YAML.)

(@todo I should write a @todo plugin too.)

Ideally, all this would also build towards a more reproducible infrastructure for the NZ Green Party to hand out to developers. The current setup (a dev / staging box) was bottlenecking new developer contributions, and there were no quick answers to the "how do we bring a new team member onboard" available.

I look forward to a situation where a new volunteer can be given instructions to deploy a Drupal/CiviCRM instance, fetch a sample dataset (defanged of sensitive info), and start hacking for world domination.

The tools chosen so far for this round turned out to be -

* Lots of RAM.
* Vagrant and VirtualBox for VMs, chef-solo to deployed instances. (Baby steps.)
* Librarian to manage a set of fairly standard LAMP (& drush) cookbooks.
* Drush make to build the Drupal / CiviCRM "app".
* A custom DB upgrade script, which output on provision & called on demand.
* Patience.

The interesting elements turned out to be -

* CiviCRM upgrades are fraught. If your DB isn't in the exact configuration CiviCRM expects, it chokes hard on upgrade. CiviCRM upgrades and DB issues.
* CiviCRM relocation requires a few gentle taps in the right place. Deploying CiviCRM.
* Obfuscating DB content for sharing.

(@todo I plan on writing more.)
