---
layout: post
title: "Getting TiddlyBot on the wireless"
modified:
categories:
excerpt: Tiddly up and running with the Wifi device you have handy.
tags: [pi]
image:
  feature:
date: 2015-08-01T15:56:40+12:00
comments: true
---

[TiddlyBot](http://www.pibot.org/tiddlybot/) arrived in the mail a week or two back! The boys and I had a fun time assembling it (really simple kit, no breakages) although there was a few days pause when we tried to mount the Pi and realised we needed a v2 Pi not a v1 ... [nicegear](http://nicegear.co.nz) shipped it quickly and we picked up the next weekend. Once we had it assembled, the AP mode didn't work out of the box, so I'm writing a quick post on how we got it to work so far.

----

The TiddlyBot image v1.1 contains hostapd v0.8.x_rtw_r7475.20130812_beta while Debian currently has v1.0; the Pibot crew recommend the Edimax EW-7811Un and confirm it works with a few others. We had a miscellany of wifi devices for pi, all of which have worked out of the box on Raspbian. I didn't want to wait for another part to ship, so here's the process I'm using to bring up `hostapd` starting with TiddlyBot and a v1.1 image.

My wifi card is: `Bus 001 Device 004: ID 148f:5370 Ralink Technology, Corp. RT5370 Wireless Adapter` - this device requires the `nl80211` driver in hostapd.

The version of hostapd in TiddlyBot v1.1 doesn't include RT5370 support, so I want to swap in the binary from Debian's current package of the same without changing Tiddly's startup configuration by installing the full Debian package.

My current process is to -

* ethernet the device
* find Tiddly's DHCP assigned ethernet IP from the router
* ssh into Tiddly
* start raspi-config and grow the filesystem (default install is close to 4GB)
* reboot, ssh back in
* aptitude upgrade all the packages
* aptitude install libnl-route-3-200
* apt-get download hostapd
* dpkg -x the downloaded hostapd .deb to a temp dir
* copy the deb's binaries over the shipped ones in /usr/local/bin
* modify /etc/hostapd/hostapd.conf to use the correct driver for this USB wifi
* sudo hostapd -dd /etc/hostapd/hostapd.conf to check it works

If the above process works for you and you can connect to Tiddly over wifi at this point, then the steps to turning the bot on and connecting are still a little longer than "just works".

* ethernet the device, turn it on
* ssh in as above
* `sudo service hostapd restart`
* connect to Tiddly wifi

I suspect at this point `hostapd` is starting on boot, but works on second / delayed start; I don't yet know why. Still fiddly but will do for tonight - I have a working TiddlyBot today instead of when a new USB device would have arrived.

Might not hurt to have hostapd logging to a specific file, that way we have a bit more to look at when things don't work. I've been running it with -dd in a tmux session but not out of the init scripts.

I'd recommend asking questions on the [TiddlyBot forum](http://pibot.org/forum) rather than posting questions as comments here :)
