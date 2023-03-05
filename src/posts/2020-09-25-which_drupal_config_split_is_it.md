---
title: Which Drupal config split is currently active
subtitle: How to get the info from the CLI
date: 2020-09-25
tags: ["drupal", "environment", "configuration"]
type: post
---

This information is also shown at `admin/config/development/configuration/config-split`. I have to figure this one out periodically for CLI debugging, so here's a note.

```
$environments = [
  'development',
  'ci',
  'staging',
  'uat',
  'production',
];
foreach ($environments as $environment) {
  if (\Drupal::config("config_split.config_split.$environment")->get('status')) {
    print "$environment";
  }
}
```
