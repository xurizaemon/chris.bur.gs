---
title: "Gitlab CI Runner"
subtitle:
date: 2022-10-23T17:55:00+13:00
tags:
    - catalyst cloud
    - operations
gitlab_comments: 19
---

This doesn't need to be on the same instance as you're deploying to - in fact it shouldn't be. For the purposes of the ODT prototype I did re-use the same instance. You could split to a second instance if you want.

SSH into the instance you're going to host the Gitlab CI runner on.

## Install Docker

We're following the Docker documentation for [install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) here.

```
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -a -G docker ubuntu
```

Log out and back in to get the new group `docker` for your user. Test Docker.

```
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete
Digest: sha256:18a657d0cc1c7d0678a3fbea8b7eb4918bba25968d3e1b0adebfa71caddbc346
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
```

Great, that worked.

## Install & run Gitlab Runner

Now we're going to follow Gitlab's [run Gitlab Runner in a container](https://docs.gitlab.com/runner/install/docker.html) docs.

You might want to put the configuration directory somewhere other than `/etc/gitlab-runner`, up to you.

```
$ sudo mkdir /etc/gitlab-runner
$ docker run -d --name gitlab-runner --restart always \
  -v /etc/gitlab-runner:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
```

Obtain a registration key from your Gitlab instance and register the runner ([docs](https://docs.gitlab.com/runner/register/)) with your Gitlab instance.

```
$ docker run --rm -it -v /etc/gitlab-runner:/etc/gitlab-runner gitlab/gitlab-runner register
Runtime platform                                    arch=amd64 os=linux pid=6 revision=0d4137b8 version=15.5.0
Running in system-mode.

Enter the GitLab instance URL (for example, https://gitlab.com/):
https://gitlab.example.org
Enter the registration token:
GR123456abcdefg-dddddEEEEEfff
Enter a description for the runner:
[123abc456def]: deploy-runner
Enter tags for the runner (comma-separated):
docker
Enter optional maintenance note for the runner:

Registering runner... succeeded                     runner=GR123456abcdefg-x
Enter an executor: docker, shell, virtualbox, docker+machine, docker-ssh+machine, custom, docker-ssh, parallels, ssh, instance, kubernetes:
docker
Enter the default Docker image (for example, ruby:2.7):
alpine:latest
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!

Configuration (with the authentication token) was saved in "/etc/gitlab-runner/config.toml"
```

Once your runner shows up as connected in Gitlab on Settings > CI > Runners, you can move on to [configure a deployment pipeline from CI to webserver](/post/2022-10-23-gitlab-ci-deployment).
