---
layout: post
title: "CiviCRM, payment, and processing"
date: 2013-03-15T00:24+12:00
comments: true
categories:
excerpt: 
tags: []
image:
  feature:
---

CiviCRM's contribution pages are no Obama campaign. Certainly not out of the box. On the backend, there are issues too - like the fact that CiviCRM's forms layer drops submitted data to the DB while processing submissions, and that contribution form submissions contain credit card details. (It's OK, provided your contribution doesn't fail, CiviCRM will clear your PAN and CVV *really soon*, promise.)

Unless a client has a dedicated security team (in the CiviCRM space, probably only the EFF) I push them to use a hosted processor. I'd rather you use PayPal than stored PANs in the DB. But onsite transactions are a thing, and if we're building modern contribution pages, we're not going to 302 you off to paypal mid process.

So - how to get some contributions into CiviCRM and sidestep the horrors of CiviCRM's forms layer? Glad you asked :)

For the AU Green Party in the 2010 Australian Federal Election, we added an API method to CiviCRM so that we could access transaction processing via the API. (Nothing to do with PAN storage, all about the horrors of Smarty at the time.) We used Drupal FAPI to build a simple form for the donate interface, then called `civicrm_api()` from Drupal's form submit hook to do the CiviCRM layer stuff.

This year is election year in Australia as well, and so the same question comes up. I expect we'll face this in 2014 with both Labour and the Greens in NZ using the Drupal/CiviCRM combo.

If I was rewriting that three years later, I'd be thinking about these things -

* How can CiviCRM's Contribute forms be better modularised? Last I saw of the contribute flow, it was a sprawling mess (and getting messier) of pledge blocks, profile includes, contribution and donation fieldsets, event and membership generation, and all sorts of other things.
* What parts *can't* be done yet at API layer? This is the real kicker. I'd really rather not have to clean up the various elements of form processing, but I can help make sure the right replacement elements come into play.
* How can payment processors expose themselves to the API? Currently CiviCRM payment processors implement some magic function names, but really seem to be a morass of special cases and checks.
