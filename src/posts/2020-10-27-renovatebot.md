---
title: Renovate - Automated update MRs
subtitle: Hand that boring update MR task off to a new teammate, RenovateBot
date: 2020-10-27T18:45:00+12:00
tags: ["renovate", "gitlab ci", "composer"]
---

I found the docs and error output quite unclear, to be honest - perhaps because the first result referred to a Github token, and I wasn't using Github at all. Turned out (I think) the Github token is required for reading package changelogs ... OK then.

So:

```
GITHUB_COM_TOKEN=<token from github>
RENOVATE_TOKEN=<token for your project>
```

The Gitlab token can be a project token with API access, rather than a user token, so I'd recommend that; then the MRs appear to come from the bot rather than your user.

The tool acts on the remote repository, _not your local codebase_. I spent a while trying `renovate .` and wondering why it didn't see the renovate config ... cos that config wasn't in the repo.
