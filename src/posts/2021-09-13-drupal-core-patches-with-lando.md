---
title: "Drupal Core Patches With Lando"
subtitle: A quick and easy workflow, it turns out!
date: 2021-09-13T13:55:45+12:00
tags:
    - contribution
    - opensource
---

I have been working on a tidy setup for contribution using available community tools, and today I needed the same for core. Core patches and Contrib have slightly different workflows.

Anyway, it turned out really easy to do this.

## Get your codebase

I already had a copy of the Drupal core codebase in `~/Projects/src/drupal`, checked out to my branch (`3232222-pager-no-h4`).

## Copy in `.lando.*`

I copied in the following two Lando `.yml` files:

### .lando.yml

```yaml
name: drupal-core
config:
  # Change to `true` and run `lando rebuild` to enable XDebug.
  xdebug: false
```

### .lando.base.yml

```yaml
name: unconfigured
recipe: drupal9
env_file:
  - .env
config:
  webroot: .
  database: mysql
  via: nginx
services:
  appserver:
    build_as_root:
      - apt update && apt install libxslt1-dev -y && docker-php-ext-install xsl
    build:
      - composer install --prefer-dist
  memcache:
    type: memcached:1
  mailhog:
    type: mailhog
  node:
    type: node:14
tooling:
  phpunit:
    service: appserver
    cmd: "php /app/vendor/bin/phpunit -c /app/core/phpunit.xml.dist"
  # lando composer require --dev squizlabs/php_codesniffer
  # lando phpcs --config-set installed_paths /app/vendor/drupal/coder/coder_sniffer
  phpcs:
    service: appserver
    cmd: /app/vendor/bin/phpcs --standard=Drupal,DrupalPractice
  phpcbf:
    service: appserver
    cmd: /app/vendor/bin/phpcbf --standard=Drupal,DrupalPractice
```

## Start your engines

`lando start`

## Run tests

PHPUnit has various ways of filtering which tests to run. In this case I had only one test I needed to run:

`lando phpunit core/tests/Drupal/KernelTests/Core/Theme/ConfirmClassyCopiesTest.php`

It's fast :)

```
$ lando phpunit core/tests/Drupal/KernelTests/Core/Theme/ConfirmClassyCopiesTest.php
PHPUnit 8.5.19 by Sebastian Bergmann and contributors.

Testing Drupal\KernelTests\Core\Theme\ConfirmClassyCopiesTest
.....                                                               5 / 5 (100%)

Time: 2.23 seconds, Memory: 6.00 MB
OK (5 tests, 2481 assertions)
```

## Upload your changes

Pushed my changes to the merge request per the instructions on the issue. Done!

For more information on contributing to Drupal, see [Contributor Guide: Quick Info](https://www.drupal.org/community/contributor-guide/reference-information/quick-info).
