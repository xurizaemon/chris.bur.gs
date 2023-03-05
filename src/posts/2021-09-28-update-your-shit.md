---
title: "Update. Your. Shit."
subtitle: "A horrific recollection"
date: 2021-09-28T11:05:26+13:00
tags: ["drupal", "updates"]
---

A few years back, I was working on a migration project. A project which shall not be named. Tonight I was reminded of a very particular thing I ran into there.

As part of the migration process, I had to regularly reload DBs from the customer source. That process took a long time. The compressed DBs weren't big, but the DB loading took ... longer than felt right.

Eventually, and with the time that you end up with waiting on a slow task, I made an effort to ask myself why. Looking, I saw the DB load spent ages writing to a particular table: `{epsacrop_files}`.

This table stored image crop settings for every image in the Drupal content DB. The intent was to store an array of dimensions, but a wrong JS expectation in the module's admin UI -

```js
var presets = [];
presets[1234] = { x: 123, y: 456 };
// presets.length = 1235
```

- had resulted in every image stored being padded with a vast number of `NULL` values before you got to the dimensions.

This bug ([epsacrop#1823940: Simplify data storage to avoid massive amounts of null values](https://www.drupal.org/project/epsacrop/issues/1823940) was fixed in 2015, but the copy of the site we'd been supplied was still using a version that predated the fix, and so the busy content DB had many GiB of NULL in it. A massive DB table full of almost entirely NULL, NULL, NULL, NULL.

What a waste of developer time, leaving that in the system for years!