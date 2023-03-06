---
title: "Testing a fork of Sector distribution"
subtitle: This is tricky, so here's some notes.
date: 2021-08-04T00:44:56+12:00
tags:
    - composer
    - sector
    - fork
    - contribution
---

This is my notes on how to test a fork of Sector. This is tricky because we are using `composer create-project` and Composer needs to recursively resolve package dependencies, and we're testing a change in a required package.

## Background

We want to test that running `composer create-project sparksinteractive/sector-project` will do the right thing with a patch which we've submitted to a dependency, `sparksinteractive/sector-distribution`. Our change will be that we are modifying `composer.json` in the *distribution* project to use an updated patch to another contrib module.

- sector-project is the template, which is used with `composer create-project`
- sector-distribution is the profile, which depends on a large number of contrib modules

## Preparation

- Identify your working directory
- Clone both projects there
- Modify `sector-project` repository to incorporate the local copy of `sector-distribution`
- Modify `sector-distribution` to incorporate the upstream patch
- Run `create-project` with some additional args
- Verify that the patch is applied

## Caveats

If Composer appears to not notice your changes, clear your Composer cache with `composer clearcache`. This can add ~5min to your next download run.

## Process

### Identify your working directory

I'm going to do this in `/tmp` so all paths are short.

### Clone both projects there

```
cd /tmp
git clone https://github.com/sparksi/sector-distribution.git sector-distribution
git clone https://github.com/sparksi/sector-project.git sector-project
```

### Modify `sector-project` to reference the local copy of `sector-distribution`

In `/tmp/sector-project`, modify `composer.json` to add a new local repository entry in the `repositories` key.

```diff
commit ee8af146a1643f3cfce4de6fafe00af77ab227a2 (HEAD -> local-distro)
Author: Chris Burgess <chris.burgess@catalyst.net.nz>
Date:   Tue Aug 3 23:44:53 2021 +1200

    Use local copy of sector-distribution

diff --git a/composer.json b/composer.json
index d594d36..20e3bf0 100644
--- a/composer.json
+++ b/composer.json
@@ -39,6 +39,16 @@
         }
     },
     "repositories": {
+        "sector-distribution-local": {
+            "type": "path",
+            "url": "/tmp/sector-distribution",
+            "options": {
+                "symlink": false,
+                "versions": {
+                    "sparksinteractive/sector-distribution": "9.1.4"
+                }
+            }
+        },
         "packagist.drupal": {
             "type": "composer",
             "url": "https://packages.drupal.org/8"
```

| key | value | description |
|-----|-------|-------------|
| type | path | use the current state of this local directory |
| url  | /tmp/sector-distribution | the local path to your modified distribution codebase |
| options.symlink | false | copy the files into place |
| options.versions | sparksinteractive/sector-distribution: 9.1.4 | increment above the current release |

### Modify `sector-distribution` to reference the upstream patch we want

In `/tmp/sector-distribution`, modify `composer.json` to update the patch URL we want to change. (This could be any other change to the local distro codebase.)

```diff
commit a5dd78ffbb61667f5a191467f6d767d980b6f01c (HEAD -> patch-updates)
Author: Chris Burgess <chris.burgess@catalyst.net.nz>
Date:   Tue Aug 3 23:47:49 2021 +1200

    Update patch for Menu Block

diff --git a/composer.json b/composer.json
index be7ab2e..aa931e4 100644
--- a/composer.json
+++ b/composer.json
@@ -103,7 +103,7 @@
         "patches": {
             "drupal/menu_block": {
                 "No contextual link to edit menu": "https://www.drupal.org/files/issues/2799821-2.menu_block.contextual_links.patch",
-                "Hide menu block title if empty": "https://www.drupal.org/files/issues/2018-05-08/menu_block-hide_block_if_no_links-2757215-9.patch"
+                "Hide menu block title if empty": "https://www.drupal.org/files/issues/2020-02-12/menu_block-hide_block_if_no_links-2757215-13.patch"
             },
             "drupal/entity_usage": {
                 "Better tracking per entity": "https://www.drupal.org/files/issues/2020-06-16/per-node-tracking_3151920_4.patch"
```

### Run `create-project` with the additional args required

Switch back to the parent directory, and run `composer create-project` with a `--repository` parameter which will instruct Composer to discover the local copy of `sector-project` and create the templated site in subdirectory `sector-test`.

```
cd /tmp
composer create-project --prefer-dist --repository='{"type":"path", "url":"/tmp/sector-project","options":{"symlink":false, "versions":{"sparksinteractive/sector-project":"9.1.4"}}}' sparksinteractive/sector-project sector-test
```

Keys and values here are much as documented in the changes for `sector-project`.

### Verify that the output contains the correct applied patch

```
  - Applying patches for drupal/menu_block
    https://www.drupal.org/files/issues/2799821-2.menu_block.contextual_links.patch (No contextual link to edit menu)
    https://www.drupal.org/files/issues/2020-02-12/menu_block-hide_block_if_no_links-2757215-13.patch (Hide menu block title if empty)
```
