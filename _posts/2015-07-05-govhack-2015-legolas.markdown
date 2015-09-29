---
layout: post
title: "GovHack 2015: Legolas"
modified:
categories:
excerpt: Take the legislation, make a conversation.
tags: [govhacknz, dunedin, javascript, drupal]
image:
  feature: govhack-action-shot.png
  credit: Clare Curran
  creditlink: https://twitter.com/clarecurranmp/status/617537610257334272
date: 2015-07-07T10:32:50+12:00
comments: true
---

(see also: [GovHack 2015: My writeup](/govhack-2015-my-writeup/))

Law is commonly represented as a rigid "thing" that happens to us, and changes reduced to simple catchphrases that don't mean the same things that laws say. We become polarised and we are disengaged from taking part in how laws are built.

Making law a conversation which all citizens can engage in might just enable the kinds of behaviour that open source has demonstrated; open source empowers users to contribute to fix bugs, and open laws can enable citizens to build a better society.

Laws are a code, and our GovHack project for 2015 seeks to bring citizens onboard as stakeholders.

## How it works (the concept)

Legislation is imported into an environment which supports free and nuanced discussion. This platform aims to provide -

* clarity and visibility to inform citizens,
* a discussion model to permit informed public debate,
* SCM-style presentation of "fork and submit" to clarify proposed changes to laws,
* side-by-side "diff" views of amendments and legislative changes over time,
* submission tools to permit community organisations to canvas submissions, and
* support for additional data layers to allow all stakeholders to overlay additional information related to legislation.

From there, we support various uses of the platform according to different needs -

* **Susan wants to understand her legal responsibilities as an employer.** Using Legolas search and comment tools, she can use identify using terms familiar to her (*"holiday", "sick leave"*) and find both specific legislation and citizens experiences on relevant topics.
* **Bruce and Alice are discussing a technical point of law on social media.** They can refer to specific aspects of various laws, linking directly to specific clauses of existing legislation as references in their discussion. Legislative changes over time are exposed using a Github-like "diff" interface which clarifies the dates and amendments made to laws.
* **Dave feels that local laws on keeping chickens are unjust.** He can use Legolas to inform himself of the specifics of poultry law in his region, and to discover that there is already a lively community active around driving change in this area.
* **Members of a local RSA wish to submit to a bill on pension amendments.** The platform lets them gather for a meeting and read through the bill as a group, formulating responses to each section. When their input is gathered they can submit their group feedback in a clear format, contextualised alongside the proposed changes.
* **Rebecca is an MP who wants to better understand how citizens feel about an amendment before the house.** She can review comments on the existing law over the last few years, and identify contentious and troublesome aspects which need to be addressed in the upcoming debate.
* **A lobby group wants to provide a library of legal advice to members.** The platform provides methods for additional data layers to be displayed in context with legislation, informing citizens of their responsibilities and rights under the law in ways which can be contextualised to their current needs.
* **Bob is a practicing lawyer who refers frequently to criminal law.** On his mobile device he has an app which exposes Legolas with additional overlays for both case law references retrieved from a popular commercial case law service and his company's internal team practice notes.
* **Samwise is a citizen who aims to bring change to existing legislation on small business.** As well as discussing the law on the platform, he can submit a special form of comment which proposes an amendment to legislation; this is visible to others and can be discussed separately without having any special legal significance.

Legolas is a proposal to support legislative documentation with tools for online engagement of the community - discussion relating to specific legislative "elements", history as legislation evolves over time, search and crowd-sourced supplementary documentation, and whatever other APIs, extensions, hooks and elements may prove useful over time.

## How the prototype works (under the hood)

* a [nodejs importer](https://github.com/xurizaemon/legolas) which retrieves legislation and does various things with it (commit XML & PDF to Git repo, push XML to storage on Drupal site)
* an XSL stylesheet which renders legislation to output formats
* a Drupal site ([source](https://github.com/xurizaemon/legolas/tree/drupal-7.x)) which as of now supports search, display and commenting
