---
title: Islandora and ISLE DC
tags:
    - islandora
    - drupal
    - lando
    - docker-compose
---

For work reasons I ran up an [Isle DC](https://github.com/Islandora-Devops/isle-dc) instance or two on Thursday. OK, first let's unpack that!

- Islandora is an open source digital asset manager and digital heritage repository. It's composed of a _lot_ of services.
- ISLE is Islandora: Enterprise 2 (I think)
- ISLE DC is a Docker Compose environment to spin up Islandora sites

The ISLE DC installer uses a Makefile (love it) and brings up several containers to run the various services that make an Islandora environment. (You can configure lots of this, eg swapping in your preferred DB backend service for the Matomo or Drupal components).

The environment which it brings up has lots to it. I'm planning on making some post-it notes to list out the services that it include, since I look at the list and boggle.

We use Lando quite a lot on other projects, and both Lando and ISLE DC drop in a Traefik proxy which wants (out of the box) to bind port 80. I'd _love_ to be able to have both run alongside each other, so I'm interested to see whether we can do that. Ideally we want to be able to switch quickly between projects without needing to shut down all the others. The conflict is really around the default ports, which can be resolved of course, and this is a challenge you can run into with running (say) Vagrant and Lando sites in parallel.

I wonder if we can have the two systems co-operate on a common Traefik proxy ... there are other options.

The installer for the demo Islandora site takes a wee while, during which my everyday laptop lagged crazily. But it came up and it's an impressive work of orchestration to bring each of those several services up and connect them. Really impressed. I can see that the orchestration here is keeping deployment to other platforms in mind too, and it got me wondering about how we plan to deploy Islandora ourselves.

I don't require local development environments to faithfully reproduce hosted environments, I see that as an anti-pattern. It's beneficial to not couple too tightly to a specific deployment implementation, and so I like to treat local dev and CI as a loose parallel which may run up only the required services. If I'm not developing or testing against Matomo, I'll choose to omit that from the dev and CI layouts unless it's of significance. To my thinking, this actually tests that things work in a broader array of configurations.

## Thoughts
A few notes on the deployment it brought up. I've only had a brief introduction to the software so far, so I'm not going to leap ahead and propose changes yet. These are just first impressions!

### Use of `sudo`
I was a bit uncomfortable with the Makefile prompting me for my system password part way through the process. This doesn't feel like it should be necessary, and is always worth a careful review. On doing so I saw [this code which is triggered from the presence of an environment variable](https://github.com/Islandora-Devops/isle-dc/blob/3261fc9223350aa443b4ea7bfc702ab69636d1de/Makefile#L492) in `.env`:
```makefile
CMD := $(shell [ $(IS_DRUPAL_PSSWD_FILE_READABLE) -eq 1 ] && echo 'tee' || echo 'sudo -k tee')
```
It's a little hard to read - I think this is only using `sudo` to read the contents of the file, right? But it makes me nervous seeing `sudo` scattered around as a workaround for correct file permissions configuration, and until I read that carefully I wondered if I could exec something by setting `DRUPAL_DEFAULT_ACCOUNT_PASSWORD` to `"password"; adduser baddie <...>`.

Docker Compose or otherwise, calling `sudo` commands on the host OS are something to be wary of. Lando does some fancy shenanigans behind the scenes to keep file ownership aligned, which is nice. Many services which are fully self-contained don't need this treatment at all; for those which permit direct edits in a volume mount, it's important to get right. (For Drupal media, configuring [$settings['skip_permissions_hardening'] = TRUE;](https://git.drupalcode.org/project/drupal/-/blob/9.5.x/sites/example.settings.local.php#L121-131) in local dev helps with this.)

### I disagree with `update_settings_php`
On first impression I don't agree with [`update_settings_php`](https://github.com/Islandora-Devops/isle-buildkit/blob/4be2994f4658c59ce92391e3a6b76f826a1e6a31/drupal/rootfs/etc/islandora/utilities.sh#L341-L400).

1. I don't like that it places configuration AFTER `include settings.local.php`, which is supposed to be at the very bottom of Drupal's `settings.php`. `settings.local.php` should IMO still be able to override any of the values set in that snippet. The snippet generated should be placed above that final include, or in a separate include if it's intended to be generated per environment/build rather than committed to the codebase.
2. I don't like that the implementation is a bash function stashed away inside a built container, which can hide how things are working if you're trying to understand what's going on by reading the source of your Islandora codebase.

### Traefik and sharing proxy
As mentioned above, this is on my mind ... I see in ISLE DC that there's a configuration `INCLUDE_TRAEFIK_SERVICE`, which apparently permits the environment to use an external Traefix proxy if set false. Lando also has a global config `proxy` which can be set "OFF" to disable Lando's Traefik

### Do we need all this?
Some of the containers may not be necessary? I don't know yet which, but I was glad that the inclusion of VS Code server is not activated by default (!!!), and I would probably turn Matomo off by default. The services which did come up had [related settings for memory limits](https://github.com/Islandora-Devops/isle-dc/blob/3261fc9223350aa443b4ea7bfc702ab69636d1de/sample.env#L156-L175), and the total of all those memory limits was in the neighbourhood of 50GB for services which did come up in my test. Whoa!

### Resource demand
The fcrepo service certainly gave my work laptop a run for its money and I killed some updating daemons at one point when the system lagged to a standstill with a loadavg just shy of 400. I may have to requisition an appropriate 64GB RAM stick, or a standalone environment! But I'd rather be able to hack on my laptop and not remotely. Maybe that's why VS Code server got in there ... With things as they are, I probably won't casually put an Islandora environment on my personal laptop to test things out.

## In summary
This project is *exciting*. The above criticisms / thoughts are just an early response, and my bigger feeling is - wow, this is really well put together, and reminds me of other community efforts where people find something that works and make progress. I'm stoked to see that the Islandora community has got things so well put together so far and I'm excited to see what a deployment of this looks like. We have a handful of existing Islandora projects I look forward to trying it out on.

The Islandora community looks really exciting to be a part of, and I look forward to getting to work on some of these projects in future, and building a connection with the community.

Working with digital heritage and culture artifacts is something I'd love to see myself doing more in the next few years, and I'd be excited to work directly engaged with institutions implementing these systems. I think it's so important to have a strong connection to the people involved in working with the objects of significance in order to best support building tools that reflect both the community best practice and the special nature of the heritage at hand.

I'm thankful to [Jonathan Hunt](https://github.com/kayakr) and [Ant Brown](https://github.com/antbrown) for making the introduction, and giving me a good roadmap to begin my journey with Islandora!
