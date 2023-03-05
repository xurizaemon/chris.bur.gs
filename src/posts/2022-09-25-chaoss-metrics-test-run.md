---
title: "Chaoss Metrics Test Run"
subtitle: 
date: 2022-09-25T16:23:19+13:00
tags: []
---

[CHAOSS Metrics](https://chaoss.community/metrics/) is a series of proposed metrics for a project to assess its health. A metric might be something like "how many clones of this repo were made in the most recent 90 days". Metrics such as these, proposed by CHAOSS for measuring OSS ecosystem health, could be useful for organisations or OSS communities to self-assess. This has the advantage that process doesn't need to be invented by each organisation individually, and that organisations can use a common yardstick to compare success.

Metrics have their challenges (Goodhart's law: "When a measure becomes a target, it ceases to be a good measure.", or [many of these quotes](https://twitter.com/allenholub/status/1551218052448108544)), so we have to use them carefully and appropriately. Measuring things is helpful when appropriate and these metrics seem to be a pretty well considered set. It's interesting to consider how these metrics might compare when evaluated against the needs of Catalyst as a business, and the needs of the OSS communities we engage with.

## An example metric: Contributions - Clones

Number of clones in a time period is available from both Github and Gitlab APIs, apparently. A Git server would be able to report on this too - most would already have the data recorded in its logs.

Trying to extract the data from Gitlab - using Gitlab's [GraphQL explorer](https://gitlab.com/-/graphql-explorer), I don't see this stat available in GraphQL:

```graphql
query {
  project(fullPath: "behat-chrome/behat-chrome-extension") {
    id
    statistics {
      containerRegistrySize
      pipelineArtifactsSize
      snippetsSize
      uploadsSize
      wikiSize
    }
  }
}
```

Curl has it:
```
curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" https://gitlab.com/api/v4/projects/3329075/statistics
```

But, it's forbidden for projects you aren't admin of? Got a 403 for https://gitlab.com/api/v4/projects/278964/statistics (gitlab's repo).