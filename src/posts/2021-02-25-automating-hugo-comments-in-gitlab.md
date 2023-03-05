---
title: "Automating Gitlab comments in Hugo"
subtitle: 
date: 2021-02-25T09:05:00+13:00
tags: ["comments", "hugo"]
---

OK, let's think about Gitlab as a comments platform for Hugo.

I have an environment where all staff (theoretically) have access to Gitlab.

If they don't, I'll happily post comments on behalf.

Gitlab API permits opening issues and fetching / rendering issues.

This should happen via JS so the comments are current. If not via JS, then we just link to the thread. Maybe copy the article text into the issue description?

