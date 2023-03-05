---
title: "Behat, Drupal and related tools"
subtitle: "A quick intro to how I'm using and recommending Behat + Drupal"
tags: ["behat", "drupal", "testing", "development"]
date: 2020-07-07
type: "post"
---

This is really a brain dump for a developer joining one of many projects I'm using Behat, Drupal & some related tools on at the moment. But ... if I write it up generally instead of as a stream in some chat program, it won't be lost quite as quickly. Or I can link to it next time.

First of all: Why Behat? For me, after a few times clicking through the same webform, I start to feel a little ... impaired. Seriously. I cannot manually test effectively; my brain is gone elsewhere. But that's fine, because repetitive manual testing is not something we need humans to be doing, and we can deliver it repeatably and reliably for Drupal using Behat.

Behat abstracts the steps of testing into Feature and Scenario definitions written in Cucumber syntax. I recommend absorbing the way that Cucumber / Gherkin is written [1](https://behat.org/en/latest/user_guide/writing_scenarios.html), [2](https://cucumber.io/docs/gherkin/reference/),

```
Scenario: Wilson posts to his own blog
  Given I am logged in as Wilson
  When I try to post to "Expensive Therapy"
  Then I should see "Your article was published."
```

The Steps in the Scenario above (and the associated components like Feature, Background etc) describe in plain language how something is used.

## Developing with Behat

What's ideally going to happen in your development cycle looks like this:

* You're asked to implement a feature
* You understand enough about the requirements to write a meaningful Feature / Scenario
* This won't pass at first, and that's OK
* You'll then modify the application / website to implement the requirements
* The test will begin to pass, and you'll improve the test as the implementation develops
* You'll submit an MR with the test and the code changes
* The test will be proven to pass in CI before it is merged
* You'll have confidence that the functionality continues to work in future

## Understanding Behat structure

```
<project>
+ composer.json
  + tests
    + behat
      - behat.yml
      - features/bootstrap/FeatureContext.php
      - features/*/foo.feature
```

`composer.json` - In `composer.json` we reference composer libraries for Behat, and a set of other supporting components. Some of these might be:

* `behat/behat` - the main Behat library
* `behat/mink` - mink drives various browser implementations such as Goutte, Chromedriver, Selenium.
* `behat/mink-goutte-driver` - Goutte is a PHP-only "browser" which implements the HTTP spec and can do basics, but lacks JS support or a rendering display.
* `bex/behat-screenshot` - A Behat extension which watches for failed Steps and takes screenshots on failure
* `dmore/behat-chrome-extension` - Allows Behat to drive Chromium via Chromedriver
* `rpkamp/mailhog-behat-extension` - Connects Behat to Mailhog, so we can capture and read emails sent during testing
* `drupal/drupal-extension` - integration layer between Behat, Mink and Drupal. Provides many common Drupal-specific Steps (eg `Given I create an Article node with title "Foo"`)
* `drupal/drupal-driver` - Drupal Driver for Behat to talk to a Drupal site. Contains Drupal, Drush and Blackbox connectors.

Install Behat libraries using `composer require --dev` so they don't get sent to production.

`behat.yml` - This is the configuration file for Behat. It has configuration sections for Behat packages, and supports multiple profiles so you can (for example) switch profiles for different environments. It can sprawl a bit, but mostly you won't need to change it.

`features/bootstrap/FeatureContext.php` - each project has a FeatureContext like this, although you can add your own custom contexts either in the Behat directory or as extensions. For example, if you had a set of sites to test together you could create an BauersiteContext class which encapsulated functionality specific to that suite of sites.

`features/*/foo.feature` - this is where the Features live. Organise as you wish (if they don't auto-load, check the top of your `behat.yml`). Tag your features and use tags to run specific features: `behat --tags=@payment`. I often tag tests with the associated WR during development, so I can `behat --tags=@wr277853`.

## Writing good Scenarios

* This is advice to myself too and in some of the linked examples I won't have done perfectly. It's OK to do what works! But this is a list of what's *good* too.
* Write idempotent tests. Don't hardcode in `Given I log in as user test@example.com with password "fruity"` because your tests will break when the content (user account) they depend on
* Try to avoid `When I click on the element with ID "#user-1-send-message"`, instead writing `When I click on "Send message" for user 1` and creating a StepDefinition to match. Your Scenarios should ideally not incorporate low-level details such as DOM IDs because these things may change in the application / content and you don't want that to break your Scenario. Ideally your StepDefinition should parse the document rather than just packaging up the lower-level details, but even the latter is better than putting hard to comprehend language into your Scenarios.

## Good blog posts / docs / videos

- [Behat's Writing Scenarios](http://behat.org/en/latest/user_guide/writing_scenarios.html) is worth your time.
- [Making your life easier with Behat + Mink + Drupal Extension (youtube)](https://www.youtube.com/watch?v=2TJfbGYKBiM)
- [Automated testing in Drupal with Behat (youtube)](https://www.youtube.com/watch?v=i6-940AnZxc)
- [Mink at a glance](http://mink.behat.org/en/latest/at-a-glance.html) to understand Mink's place in things
- [Drupal 8 and Behat tests](https://gorannikolovski.com/blog/drupal-8-and-behat-tests) - introductory, but a decent walkthrough / intro
- [Docs for the Drupal Extension](https://behat-drupal-extension.readthedocs.io/)

## To do

Things I could expand on more here.

- How to use a clean install to run your tests (no requirement for a DB dump) - ideal scenario
- How to use DB dumps and use those (no examples yet)
  - How to sanitise / reduce DBs in preparation for CI runs
  - Kirill recommends to not do this - I think for existing sites this is a pragmatic path towards testing; otherwise the leap can be too big for projects to justify
- Behat in CI (probably another post), incl
  - Switching configuration for CI (eg showing backtraces, capturing error logs)
  - Long install times / short job runs
