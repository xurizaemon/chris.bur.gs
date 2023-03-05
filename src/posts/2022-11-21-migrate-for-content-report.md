---
title: "Using Drupal Migrate to report on content"
subtitle:
date: 2022-11-21T12:19:56+13:00
tags:
  - drupal
  - drupal migrate
  - content
---

A customer requested a report of:

1. How many times a given token (`[foo:some-value:3]`) could be found in a content corpus
2. The specific IDs of each value in each content item

The content corpus in question is a decent size (150K content items) stored in a Drupal 7 DB. While this request might be deliverable via a SQL query, the risk of bypassing application logic is that we might not account for some detail of implementation that means we miss some content items.

Since we're already writing migrations for this Drupal 7 site, why not use Drupal Migrate to report on it?

Here's my plan, and how it worked out:

1. Add a temporary field to the Drupal 9 destination content fields
2. Add a migration which extracts the tokens _only_ from the source content and stores it to that field.
3. Run the migration and see

----

## Implementation

This request came in before we had the Drupal 9 site codebase for the site in question ready, so I opted to hijack another similar site's DB for the purpose.

I brought up the Drupal 7 dev environment in Lando, and reconfigured the destination site's Migrate source connection to use the same credentials but with a changed hostname. Lando makes the DB for an environment available at something like `database.name.internal` where `name` is derived from the D7 site's `name` value.

Drupal 9 `web/sites/default/settings.php`:

```php
if (getenv('MIGRATION_DATABASE_NAME')) {
  $databases['migrate']['default'] = [
    'database' => getenv('MIGRATION_DATABASE_NAME'),
    'username' => getenv('MIGRATION_DATABASE_USERNAME'),
    'password' => getenv('MIGRATION_DATABASE_PASSWORD'),
    'prefix' => '',
    // 'host' => getenv('MIGRATION_DATABASE_HOST'),
    'host' => 'database.SITENAME.internal',
    'port' => getenv('MIGRATION_DATABASE_PORT'),
    'driver' => getenv('MIGRATION_DATABASE_DRIVER'),
  ];
}
```

I confirmed that I could now see the alternate D7 source data via `drush migrate:status`.

> ### Side quest: performance challenge!
>
> This `drush migrate:status` command was _really really_ slow. In another terminal I connected to the D7 source system and executed `watch -n5 "mysql -uroot -e 'SHOW FULL PROCESSLIST'"` to see what was going on. The query was checking content for regex matches against `%src="/file%`, and sure enough this led me to the Media Migrate plugin and a [performance issue I'd raised 11months ago](https://www.drupal.org/project/media_migration/issues/3209706), which now had a patch. Win!

I didn't want to have to iterate through the entire content set to develop, so I used `drush migrate:import migration_id --limit=1 --migrate-debug` to identify the first node we'd get out of the system. This would become my sacrificial test node, even though it didn't originally contain the tokens in question.

I modified the D7 DB state directly so that I would be able to retrieve a matching result from the first source row. It's intentional that the tokens aren't identical.

```sql
update field_revision_body set body_value='blah\n\n[foo:grouped-media:0]\n\n[foo:grouped-media-table:1]\n\n[foo:grouped-media:2]\n\nblah' where entity_id=74
update field_data_body set body_value='blah\n\n[foo:grouped-media:0]\n\n[foo:grouped-media-table:1]\n\n[foo:grouped-media:2]\n\nblah' where entity_id=74
```

I reconfigured the D9 site to have an additional field `field_tmp_token_count` (text) to store the report values. This can be later used in Views to report for the client. I exported the Drupal 9 configuration to preserve the field configuration.

I now created a node classic migration for the content type we were interested in. I modified it to process the body field directly into the temporary field.

```
  field_tmp_token_count: body/0/value
```

I commented out almost all other process pipelines; I only wanted the essentials: nid, vid, title, and anything else required for the migration to work as expected.

I then wrote the process plugin, testing my `preg_match_all()` using `php -a` (or `drush core-cli`).

`web/modules/custom/foo_migrate/src/Plugin/migrate/process/TokenCount.php`:

```php
<?php

namespace Drupal\foo_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\node\Entity\Node;

/**
 * Count the number of tokens in a string.
 *
 * @MigrateProcessPlugin(
 *   id = "token_count"
 * )
 *
 * @code
 * field_token_count:
 *   plugin: token_count
 *   source: body/value
 * @endcode
 */
class TokenCount extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\migrate\MigrateException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    $matches = [];
    $pattern = '/\[foo\:[^\[]*\]/';
    $res = preg_match_all($pattern, $value, $matches);
    if ($res) {
      return implode(' ', $matches[0]);
    }
  }

}
```

Now I can use my process plugin in the migration:

```
  field_tmp_token_count:
    -
      plugin: token_count
      source: body/0/value
```

I imported this configuration change using `drush config:import` and re-ran the migration with `drush migrate:import migration_id --update --limit=1 --migrate-debug`.

I could see the matched tokens extracted and stored in the destination field.

Now I could kick off the full migration and let it run. This took two and a half hours.

```
 [notice] Processed 48046 items (19490 created, 22960 updated, 0 failed, 5596 ignored) in 8539.5 seconds (337.6/min) - done with 'foo_d7_node_resource'
```

## The migration yaml

```
uuid: 91a9f5db-d4fc-4387-9adc-24d672a89286
langcode: en
status: true
dependencies: {  }
id: cass_d7_node_resource
class: Drupal\node\Plugin\migrate\D7NodeTranslation
field_plugin_method: null
cck_plugin_method: null
migration_tags:
  - 'Drupal 7'
  - Content
  - CASS
migration_group: migrate_drupal_7
label: 'Node (Resource)'
source:
  plugin: d7_node_complete
  node_type: resource
  revision_log_append: '@logMessage'
process:
  nid:
    -
      plugin: get
      source: tnid
  vid:
    -
      plugin: get
      source: vid
  langcode:
    -
      plugin: default_value
      source: language
      default_value: und
  moderation_state:
    -
      plugin: static_map
      default_value: draft
      source: '@moderation_state'
      map:
        draft: draft
        published: published
        archive: archived
        needs_review: draft
  title:
    -
      plugin: get
      source: title
  uid:
    -
      plugin: get
      source: node_uid
  status:
    -
      plugin: get
      source: status
  field_tmp_token_count:
    -
      plugin: token_count
      source: body/0/value
destination:
  plugin: 'entity_complete:node'
  translations: true
  default_bundle: resource
migration_dependencies:
  required:
    - cass_d7_media_document
    - cass_d7_media_image
    - cass_d7_media_video
    - cass_d7_taxonomy_term_author_corporate
    - cass_d7_taxonomy_term_content_status
    - cass_d7_taxonomy_term_copyright_licensing
    - cass_d7_taxonomy_term_region
    - cass_d7_taxonomy_term_resource_types
    - cass_d7_taxonomy_term_solr_keywords
    - cass_d7_taxonomy_term_tags
    - cass_d7_taxonomy_term_viewpoint
    - cass_d7_user
    - cass_embedded_taxonomy_term
```
