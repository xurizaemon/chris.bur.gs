---
title: "Drupal Core patch testing locally with Lando"
subtitle: 
date: 2021-12-23T11:33:33+13:00
tags: ["drupal", "contrib"]
---

Testing patches for Drupal core can be fiddly, but it's a process worth making easy so we can better engage in upstream fixes.

Here's my current approach (as of 2021).

## Prerequisites

You'll need Lando installed, which requires Docker as well.

## Upstream codebase

I keep a long-lived copy of the Drupal core codebase in `~/Projects/drupal-core`. This is a git clone of https://git.drupalcode.org/project/drupal.git and the workflow is either to create patches for upload (old style) or use Gitlab's merge requests (new style) to submit proposed changes.

So, step one: clone a copy of Drupal core! Note that I change the cloned repo name to "drupal-core" for my own sanity.

```
cd ~/Projects # or whereever you'd like to keep it
git clone --branch=9.4.x https://git.drupalcode.org/project/drupal.git drupal-core
```

You can switch between branches of upstream, but we want to default to the current dev branch for proposed changes. Most patches will apply to your current version.

## Local Lando environment

I like Lando and this setup works for me. We need to add a handful of files into the core codebase, and then not accidentally commit those files. These files are:

- `.lando.yml`
- `.lando.base.yml`
- `phpunit.xml`
- `sites/default/settings.php`

It may feel unfamiliar that the Drupal core codebase has the codebase as the root of the repo - there's no `web/` subdirectory. For projects, we use the `web/` subdirectory, but for core, we don't use that. 🤷 It's OK!

### Additions

These are the files I put into the Drupal codebase:

#### `.lando.yml`

This file and the next could be combined, and in this project there's little advantage to the separation. However, I track these Lando configs across multiple projects, so the separation is an advantage to me in that I can copy changes to the base file more easily across [various](https://gitlab.com/xurizaemon/commerce-demo/) [Drupal](https://gitlab.com/xurizaemon/drupal-contrib) [projects](https://gitlab.com/xurizaemon/drupal-contrib).

```yaml
name: drupal-core
config:
  # Change to `true` and run `lando rebuild` to enable XDebug.
  xdebug: false
```

#### `.lando.base.yml`

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
  mailhog:
    type: mailhog
  node:
    type: node:14
tooling:
  phpunit:
    service: appserver
    cmd: "php /app/vendor/bin/phpunit -c /app/phpunit.xml"
  phpcs-install:
    service: appserver
    cmd:
      - composer require --dev squizlabs/php_codesniffer
      - phpcs --config-set installed_paths /app/vendor/drupal/coder/coder_sniffer
  phpcs:
    service: appserver
    cmd: /app/vendor/bin/phpcs --standard=Drupal,DrupalPractice
  phpcbf:
    service: appserver
    cmd: /app/vendor/bin/phpcbf --standard=Drupal,DrupalPractice
  site-install:
    service: appserver
    cmd: drush site:install -y
```

#### `phpunit.xml`

This configures PHPUnit to run in this environment.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- TODO set checkForUnintentionallyCoveredCode="true" once https://www.drupal.org/node/2626832 is resolved. -->
<!-- PHPUnit expects functional tests to be run with either a privileged user
 or your current system user. See core/tests/README.md and
 https://www.drupal.org/node/2116263 for details.
-->
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" bootstrap="/app/core/tests/bootstrap.php" colors="true" beStrictAboutTestsThatDoNotTestAnything="true" beStrictAboutOutputDuringTests="true" beStrictAboutChangesToGlobalState="true" failOnWarning="true" printerClass="\Drupal\Tests\Listeners\HtmlOutputPrinter" cacheResult="false" xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.3/phpunit.xsd">
  <php>
    <!-- Set error reporting to E_ALL. -->
    <ini name="error_reporting" value="32767"/>
    <!-- Do not limit the amount of memory tests take to run. -->
    <ini name="memory_limit" value="-1"/>
    <!-- Example SIMPLETEST_BASE_URL value: http://localhost -->
    <env name="SIMPLETEST_BASE_URL" value="http://appserver_nginx" force="true"/>
    <!-- Example SIMPLETEST_DB value: mysql://username:password@localhost/databasename#table_prefix -->
    <env name="SIMPLETEST_DB" value=""/>
    <!-- Example BROWSERTEST_OUTPUT_DIRECTORY value: /path/to/webroot/sites/simpletest/browser_output -->
    <env name="BROWSERTEST_OUTPUT_DIRECTORY" value=""/>
    <!-- To have browsertest output use an alternative base URL. For example if
     SIMPLETEST_BASE_URL is an internal DDEV URL, you can set this to the
     external DDev URL so you can follow the links directly.
    -->
    <env name="BROWSERTEST_OUTPUT_BASE_URL" value=""/>
    <!-- To disable deprecation testing completely uncomment the next line. -->
    <!-- <env name="SYMFONY_DEPRECATIONS_HELPER" value="disabled"/> -->
    <!-- Example for changing the driver class for mink tests MINK_DRIVER_CLASS value: 'Drupal\FunctionalJavascriptTests\DrupalSelenium2Driver' -->
    <env name="MINK_DRIVER_CLASS" value=""/>
    <!-- Example for changing the driver args to mink tests MINK_DRIVER_ARGS value: '["http://127.0.0.1:8510"]' -->
    <env name="MINK_DRIVER_ARGS" value=""/>
    <!-- Example for changing the driver args to webdriver tests MINK_DRIVER_ARGS_WEBDRIVER value: '["chrome", { "chromeOptions": { "w3c": false } }, "http://localhost:4444/wd/hub"]' For using the Firefox browser, replace "chrome" with "firefox" -->
    <env name="MINK_DRIVER_ARGS_WEBDRIVER" value=""/>
  </php>
  <testsuites>
    <testsuite name="unit">
      <file>./core/tests/TestSuites/UnitTestSuite.php</file>
    </testsuite>
    <testsuite name="kernel">
      <file>./core/tests/TestSuites/KernelTestSuite.php</file>
    </testsuite>
    <testsuite name="functional">
      <file>./core/tests/TestSuites/FunctionalTestSuite.php</file>
    </testsuite>
    <testsuite name="functional-javascript">
      <file>./core/tests/TestSuites/FunctionalJavascriptTestSuite.php</file>
    </testsuite>
    <testsuite name="build">
      <file>./core/tests/TestSuites/BuildTestSuite.php</file>
    </testsuite>
  </testsuites>
  <listeners>
    <listener class="\Drupal\Tests\Listeners\DrupalListener">
    </listener>
  </listeners>
  <!-- Filter for coverage reports. -->
</phpunit>
```

#### `sites/default/settings.php`

```php
//$settings['config_sync_directory'] = '../config/drupal/sync';
$databases['default']['default'] = array (
  'database' => 'drupal9',
  'username' => 'drupal9',
  'password' => 'drupal9',
  'prefix' => '',
  'host' => 'database',
  'port' => '',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);
```

### How to use it

With these in place, I should be able to execute `lando start` and bring up a workable Drupal 9 site.

More importantly, I should be able to execute `lando phpunit` to run core tests.

I'll now follow the instructions from the issue to check out a local working branch with the existing MR or patch applied.

I can use PHPUnit's `--group` and `--filter` to run specific tests (eg those related to the issue, or those already failing).
