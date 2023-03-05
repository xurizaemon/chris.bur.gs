---
title: "Drush Sql Sanitize Config"
subtitle: 
date: 2021-04-13T20:38:45+12:00
tags: []
---

A handy snippet to sanitize DB snippets:

```
# drush/drush.yml
# ...
sql:
  structure-tables:
    # Data to exclude from default sync/dump.
    common:
      - cache
      - 'cache_*'
      - history
      - queue
      - 'search_*'
      - 'session'
      - watchdog
      - 'webform_*'
  skip-tables:
    # Whole tables to exclude from default sync/dump.
    common:
      - 'migration_*'
      - 'migrate_*'
command:
  sql:
    dump:
      options:
        structure-tables-key: common
        skip-tables-key: common
    sync:
      options:
        structure-tables-key: common
        skip-tables-key: common
```

Via [@sime on Drupal Slack](https://drupal.slack.com/archives/C45SW3FLM/p1618298597023300?thread_ts=1618273874.010500&cid=C45SW3FLM).