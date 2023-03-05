---
title: Patching modules from D8 to D9
subtitle:
date: 2020-09-25
tags: ["drupal", "drupal9", "patch", "workflow"]
type: post
---

Currently there's an interesting obstacle to working with Drupal 9: if a D8 module doesn't yet have D9 support, and a patch is sitting in the issue queue, cweagans/composer-patches can't handle the scenario ... because the  composer dependency tree prevents the module version being installed installed. What can you do?

* Contribute! Step up as a co-maintainer. But if the module is already slow to merge D9 patches, you might find it's not maintained.
* Fork the module to modules/custom ... please don't do this.
* Work around it in composer.json

The last option looks like this:

Add a package entry specifically for this Drupal module to your composer.json:

```
{
    "type": "package",
    "package": {
        "name": "drupal/cache_control_override",
        "type": "drupal-module",
        "version": "1.0.0",
        "source": {
            "type": "git",
            "url": "https://git.drupalcode.org/project/cache_control_override.git",
            "reference": "8db91684a427366d8f9c51f60cbac10c2d586d95"
        }
    }
},
```

We've used a Git SHA so Composer won't bother with version specifics, and the presence of the package entry means we won't look this up in packages.drupal.org

* [Composer packages entries](https://getcomposer.org/doc/05-repositories.md#packages)
* [d.o#3168047: Handling undermaintained projects from Drupal.org](https://www.drupal.org/project/ideas/issues/3168047#comment-13806926)
