---
title: "Dependency Track"
subtitle:
date: 2021-11-11T08:51:26+13:00
tags:
    - drupal south
    - dependency track
    - component analysis
    - security
    - talks
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/luwOif1mSmo?start=1290" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Below are my notes for the lightning talk above, given at DrupalSouth Shorts 2021.

## The situation

- We like components, they allow composition of complex things
- This means we need to understand the components we're using
- As an organisation, we'll have many projects with many components
- There are advantages to understanding this - reducing complexity by consolidation

## Our context, briefly

- Many DrupalSouths ago (2010?!), Catalyst released Archimedes
- Over time, Archimedes became Mataara
- Other tools exist for various spaces - what system packages are installed, host info etc
- We want to consolidate on process and reduce complexity - better team process, less siloing/divergence
- For the same reasons as we might use a tool like this, 11 years later we don't need to write *our own* tool

## Software composition analysis for development

- For a Drupal project, hundreds (to thousands) of packages in the dependency tree
- Applies outside Composer - NPM, frameworks, containers, OS, firmware
- What are we running? What else is running x?
- What vulnerabilities do we need to care about?
- What license considerations are there?

## Dependency Track

- Enter Dependency Track, an OWASP project to analyse, process and report on composition
- v4.3.6 today
- Ran it up in Catalyst Cloud for purpose of demo

## How it works

- BOM = Bill of Materials
- Uses a BOM format called CycloneDX
- Turns composer.json/lock, package.json/package-lock.json into BOM
- Automated inbound data (via your CI)
- Imports into Dependency Track, analyses & extracts metadata (version, license, ...)
- Sources vulnerability intelligence externally - public and licensed
- Configure to apply your organisational rules - license, reporting, alerts

- Docker install was pretty easy, maybe configure SSL first cos CORS failure + static frontend took a minute to spot
- Give it lots of RAM, it has to eat all the vulns that came out in 2005 - failed at 4GB, worked at 16GB, thanks Catalyst Cloud :)
- Give it half an hour to haul all the data in initially - you can use it in that time - and let it chug through analysis on its own time
- Feed it from CI or manually at first

## What do you get?

- High level reporting of vulnerabilities
- Alerting / notification for newly identified vulnerabilities
- Identify policy violations on licensing
- Drill into projects, components, search, report
- Export report data for signoff

## What can this mean

- Reference for developers considering a new component
- Added review step for new components - firming up our approach here

## What else is there?

- Tidelift provides a similar paid, hosted service
- ... tell me about other things?

## What did you learn?

- Some projects aren't licensed!
- Some repackage licensed things without add a license!
- Vulnerabilities view shows all known vulns?
- Lots of CLI tools to handle turning everybody's Gemfile/Composer/whatever into a BOM
- Had to remove Byte Order Markers from Bill of Materials XML
