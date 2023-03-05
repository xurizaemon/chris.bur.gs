---
title: "Demo: Commerce Demo & Commerce DPS"
subtitle: 
date: 2021-03-29T16:06:34+13:00
tags: ["drupal", "commerce", "dps", "windcave"]
---

Last week [Frederik asked](https://chat.catalyst.net.nz/#/room/!XoBQPKshjvZopRDGnb:catalyst.net.nz/$-uN2AOZtb-qYOkuIJv3lcYvKFyZ3Abljb2FASf0ZjhU?via=catalyst.net.nz&via=catalyst-eu.net&via=bots.chat.catalyst.net.nz) about DPS on Drupal Commerce (Commerce DPS is a Drupal payment module I maintain, but which I hadn't had a chance to road test the Drupal 8 version of). I figured I should get familiar!

I ran up a Commerce Demo site with DPS payments and threw a Behat test on it locally. Then made that all execute in CI.

Cos I'm thinking about Treasury re-usable process I used my [drupal-builder](https://gitlab.com/xurizaemon/drupal-builder) tool to kick things off. This is a tool which implements the "New Drupal Site" process, but is IMO tidier and more reproducible on account of demonstrating ideas from [Drupal new project proposal](/post/2020-12-17-drupal-new-project-proposal).

I also implemented [inserting creds into Drupal configuration from Gitlab variables to CI runs](https://gitlab.com/xurizaemon/commerce-demo/-/blob/f0cf53d13ff06388f1cb1208e87165533e18c10b/.gitlab-ci.yml#L71-75), because I didn't want to expose them on a public project.

I included some example things such as [taking screenshots](https://gitlab.com/xurizaemon/commerce-demo/-/blob/main/tests/behat/features/screenshots.feature) (see CI/CD => latest pipeline => test behat => files) and [checking out via configured DPS gateway](https://gitlab.com/xurizaemon/commerce-demo/-/blob/main/tests/behat/features/purchase.feature).

Next step: fix the Commerce DPS tests :)