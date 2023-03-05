---
title: "Trying CodeLingo playbooks"
subtitle: A look at CodeLingo playbooks
date: 2020-12-17T11:00:00+13:00
tags: ["communication", "development", "tools"]
---

I had a demo of CodeLingo's Playbooks today - an interesting tool they've pivoted to from their static analysis (I think) tool.

CodeLingo are a startup based in Dunedin who built a tool for reviewing and I guess "enshrining" development processes, to support team communication and knowledge sharing about correct procedure. We all like that, right?

CodeLingo's v1 tool looked like this, if I get it right:

- on a merge request, a reviewer might identify a block of code that has a "code smell"
- reviewer adds a note, saying "This block should use the internal HTTP client rather than this more verbose instantiation of a custom client"
- reviewer pings a bot in the MR, saying `@codelingobot add rule prefer internal HTTP client`
- codelingobot adds a rule (name?) to the project ruleset
- team expands the rule docs, test and guidance
- in future, the code smell is automatically identified

This was done with a custom [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and a query language which comprehends syntax using the AST, so that your rule ends up as an XPath-like description of the incorrect pattern (finding a custom HTTP client instantiation inside classes known to have an HTTP client available).

CodeLingo Playbooks are a variation of this; it's now about capturing blocks of code and describing them in playbooks, so focusing less on rules and more on documenting and communicating (but with the rules capability still available).

This feels partly like functionality I'd enjoy, and partly like functionality I'm already familiar with - I can link to code in context using line numbers so that's pretty easy to communicate amongst team members. But the ability for this documentation to track the referenced code via the AST query selectors is cool.

I've committed to give it a go documenting some things and see how useful it is to me as part of my workflow.

I do think the "playbook" name is a bit confusing to me, and it probably conveys an aspect of the product I'm missing.
