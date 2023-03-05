---
title: "Catalyst Cloud Instance"
subtitle: 
date: 2022-10-23T17:53:00+13:00
tags: []
gitlab_comments: 19
---

These are very brief instructions to get an instance up and running with a recent Ubuntu release. This is basically what's documented at more length in [Catalyst Cloud Docs: ](https://docs.catalystcloud.nz/first-instance/overview.html). The Ubuntu image we use will mean we end up with a default user account of `ubuntu`.

We need to be logged into a Catalyst Cloud account with some available resources. I'm using `test.chc.cat-it.co.nz` here, in region `nz-por-1`.

- Log into [Catalyst Cloud](https://dashboard.cloud.catalyst.net.nz/project/)
- [Create an SSH key](https://dashboard.cloud.catalyst.net.nz/project/key_pairs) (or you can re-use an existing key of yours) 
- [Create a network](https://dashboard.cloud.catalyst.net.nz/project/networks/)
	- name = deploy-network
	- subnet = 192.168.x.0/254
- [Create a router](https://dashboard.cloud.catalyst.net.nz/project/routers/)
	- name = deploy-router
- Add an interface to the router, connecting to the network's subnet
- [Create a security group](https://dashboard.cloud.catalyst.net.nz/project/security_groups/) (or re-use an existing again)
	- name = deploy-secgroup
	- ingress http, https, ssh for 0.0.0.0/0
- [Create and launch an instance](https://dashboard.cloud.catalyst.net.nz/project/instances/)
	- instance name = deploy-prototype
	- source = ubuntu-22.04-x86_64
	- flavor = c1.c2r4
	- network = deploy-network
	- security group = 
	- ssh key = yours
	- launch instance
    - associate a floating IP to the instance

When it's done, you should be able to `ssh ubuntu@x.x.x.x` where `x.x.x.x` is the IP associated with the compute instance

Next: [Set up a webserver environment](/post/2022-10-23-lemp-stack)
