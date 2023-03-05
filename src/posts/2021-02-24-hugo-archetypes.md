---
title: "Hugo archetypes"
subtitle: Making things *slightly* easier on myself.
date: 2021-03-02T17:05:00+13:00
tags: ["hugo"]
---

I should update this version of Hugo and get myself using archetypes to create new posts ...

* https://gohugo.io/content-management/archetypes/

Then I won't have to manually set the date every time.

...

OMFG, it works already. I no longer need to set the date. See {{<commit eec0ddc>}}.

```
hugo new --kind post content/posts/2021-02-25-bleh-bleh.md
```

And now I no longer need to trim out the date at the start of the title.
