---
title: Gitlab's Directed Acyclic Graph functionality
subtitle: A small speed boost for CI runs, but a minute less wait time is worth it
date: 2020-07-14
tags: ["gitlab", "ci", "developer"]
type: post
---

Gitlab has a DAG (Directed Acyclic Graph) feature for managing dependencies between jobs, which improves on the previous behaviour of stage precedence. The old behaviour is that jobs are grouped in stages, and jobs from a later stage only start if the previous stages complete successfully. The new behaviour is that with a `depends:` property on a job, you can name other jobs which much be completed, and that job can commence as soon as its dependencies have been met.

By way of example, I tested this on a project which had three stages: lint, build, test.

* Stage `lint`
  * Job `grumphp` would run `composer install` then `grumphp`, run time ~ 60".
* Stage `build`
  * Job `drush make` would build the site codebase, run time ~ 1'45".
* Stage `test`
  * Job `behat` would install the site (using MySQL service) then run Behat, run time ~ 1'11".

This was totalling to about 3'30" on average (excluding the Behat test time).

In the above, `behat` depends on `drush make`, `composer install` and the DB being loaded. Because Gitlab CI services currently can't be shared between jobs, the DB load has to happen in the same job as Behat. `composer install` can be decoupled from `grumphp`, but this appears to offer little time saving: initialising an additional job adds some overhead, so you might think there's not much to be gained from splitting the two. With stages only that's true - but in this case it also permits us to run `composer install` and `drush make` simultaneously. And that's where the win is!

Reorganised:

* Stage `build`
  * Job `composer install` prepares for running `behat` and `grumphp`, run time ~ 1'.
  * Job `drush make`, run time ~ 1'15".
* Stage `lint`
  * Job `grumphp` checks the codebase, run time ~ 45".
* Stage `test`
  * Job `behat` loads the DB and runs tests, run time ~ 1'20".

The real advantage in the above, which totals to a longer run time (and more charges against your Gitlab allocated CI minutes, if that's a consideration), is that we can start `composer install` and `drush make` immediately, and then start `grumphp` and `behat` as soon as the first two jobs are completed. Totalling the change, the `behat` task can be taken as a constant since it doesn't shift, and what we can vary is how fast `behat` starts. In the first scenario, completing `grumphp` then `drush make` took ~ 2'30" - 2'45". In the second scenario, that's down to 2'.

## Samples

| job name           | run times observed                                     | notes                     |
|--------------------|--------------------------------------------------------|---------------------------|
| grumphp + composer | 45", 46", 46", 52"                                     | includes composer install |
| composer install   | 50", 57", 58", 58"                                     |                           |
| grumphp            | 32", 36", 38", 39"                                     |                           |
| drush make         | 1'05", 1'16", 1'16", 1'16", 1'17", 1'19", 1'20", 1'27" |                           |
| behat              | (not significant here)                                 |                           |

This is a really simple example of the advantages of the DAG model. In this case it's somewhat constructed; rearranging with the `grumphp` into the `test` stage could have the same time saving. But for more complex CI layouts where you might have developers waiting or attending to the outcome of results, this is a real win in terms of keeping focus up and development progressing. Attention switching is a cost and long CI run times can be costly for that.

I can't explain why the measured run times of a task which included `composer install` and `grumphp` went up when the task was reduced to just `composer install`. Maybe with more samples this would iron itself out ... I'm intrigued. Also keen to measure a few CI runs of a job which does just `echo hello world` so I get a feel for the overhead of any single job added to the CI process - this obviously depends on the image used, and artifacts each end of the job too.

The DAG feature isn't (yet, as of July 2020) visible / available on Catalyst's Gitlab instances; the CE docs indicate that it's something to manually enable while in beta. I'm looking forward to being able to use it!

Details & links:

* [Directed Acyclic Graph in Gitlab Docs](https://docs.gitlab.com/ce/ci/directed_acyclic_graph/)
* [gitlab-org/gitlab#215517: DAG Visualization MVC]()(https://gitlab.com/gitlab-org/gitlab/-/issues/215517)
* [gitlab-org/gitlab#220368: Feedback for beta version of DAG (directed acyclic graph)](https://gitlab.com/gitlab-org/gitlab/-/issues/220368)
