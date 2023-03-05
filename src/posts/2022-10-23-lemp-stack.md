---
title: "Lemp Stack"
subtitle:
date: 2022-10-23T17:54:00+13:00
tags:
    - catalyst cloud
    - operations
gitlab_comments: 19
---

We've got a fresh Ubuntu install by way of [create a Catalyst Cloud compute instance](/post/2022-10-23-catalyst-cloud-instance). Now we'll install a simple LEMP stack (Linux, NginX, MariaDB, PHP).

First, decide your project name - eg I'm using this to test for ODT, so I'll use `odt` where `PROJECT` appears below. You also need the IP address of your webserver. The instance IP from is shown below as `x.x.x.x` below, but you should use your provisioned IP from [create a Catalyst Cloud compute instance](/post/2022-10-23-catalyst-cloud-instance).

SSH into your instance.

```
ssh ubuntu@x.x.x.x
```

Install MariaDB.

```
$ sudo apt update && sudo apt install -y nginx mariadb-server
$ sudo mysql_secure_installation
```

Create a DB and grant access.
```
$ sudo mariadb
```
```
MariaDB [(none)]> create database odt;
Query OK, 1 row affected (0.001 sec)
MariaDB [(none)]> grant all on odt.* to odt@localhost identified by 'odt';
Query OK, 0 rows affected (0.009 sec)
$ mariadb -u odt -p
```

Install PHP and required libraries for Drupal 9.

```
$ sudo apt install -y php-fpm php-mysql php-curl php-gd php-json php-mbstring php-xml php-curl php-gd php-mbstring php-xml
```

Create nginx config in `/etc/nginx/sites-available/PROJECT` using [`config/nginx/drupal.conf`](https://gitlab.catalyst.net.nz/apl/odt/-/blob/ci-deploy/config/nginx/drupal.conf) as a reference implementation. Symlink to the NginX config to enable it.

```
sudo ln -s /etc/nginx/sites-available/odt /etc/nginx/sites-enabled/
```

Reload NginX.

```
sudo nginx -t && sudo nginx -s reload
```

Create a test `.php` file.

```
mkdir /var/www/PROJECT/current/web
echo '<?php phpinfo();' > /var/www/PROJECT/current/web/index.php
```

Verify that the phpinfo works when accessed over http (use the IP address) by visiting `http://x.x.x.x` in your browser.

If it works, we'll remove it to prepare for the next step.

```
$ rm /var/www/odt/current/web/index.php
```

Now we need to ensure the deployment can SSH in and exec commands as a user. In this example we'll use `ubuntu` as the deploy _and_ login user. In a real setup we'd use separate users.

Generate an SSH key on your local system.

```
$ ssh-keygen -t ecdsa -f ~/.ssh/deploy-key
Generating public/private ecdsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/ubuntu/.ssh/deploy-key
Your public key has been saved in /home/ubuntu/.ssh/deploy-key.pub
The key fingerprint is:
SHA256:tH1EZ4oOL4uyu+s59ho2Gwk1wrUF/xqZVG4MUmLrKe0 ubuntu@deploy-instance
The key's randomart image is:
+---[ECDSA 256]---+
|    *o+ .   . o  |
| . o B =   o +   |
|  o = o * . o    |
|   = + * * .     |
|  o + + S + .    |
|   + . + o .     |
|    E o .        |
|   .oO           |
|   oXB.          |
+----[SHA256]-----+
```

Add the SSH key to deploy user `.ssh/authorized_keys` on the compute instance.

Test SSH access from your computer.

```
ssh -i ~/.ssh/deploy-key ubuntu@x.x.x.x
```

Next up: [Set up a Gitlab CI runner](/post/2022-10-23-gitlab-ci-runner).
