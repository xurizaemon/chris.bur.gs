---
title: Hugo, Gitlab, let's go!
subtitle: It's a first post, until I backfill some stuff
date: 2020-02-24
tags: ["hugo", "gitlab", "working loud"]
type: post
---

I caught Ben Bradshaw's [Pizza Thursday](https://wiki.wgtn.cat-it.co.nz/wiki/Pizza_Thursday) talk on [How to turn Gitlab into a '90s web host](https://alfresco.wgtn.cat-it.co.nz/share/page/site/pizza-thursday/document-details?nodeRef=workspace://SpacesStore/5240b7a3-76b2-4bf9-b8a6-50ca93a27d4b) and decided I should get around to doing this.

Here's how I set this up:

- Cloned the [example Hugo Gitlab Pages repo](https://gitlab.com/pages/hugo) to a local folder
- Blew away and re-inited the git repo in that folder
- Created a new personal repo on the internal Gitlab
- Messed around with this repo until I was happy
- Added the personal repo as the remote origin
- Pushed my code and watched the CI task build
- Via the repo sidebar, I found the Pages URL
- Updated config.toml to reflect the base URL
