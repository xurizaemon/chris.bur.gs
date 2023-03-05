---
title: "Blackbird nest & rPi cam"
modified:
categories:
excerpt: Now I'm concerned about small critter privacy issues.
tags: []
image:
  feature: blackbird-nestcam.jpg
date: 2015-12-05T06:45:00+13:00
comments: true
---

Outside our bedroom window and beside the front door, a blackbird has nested in the rose bushes. After watching her for a few days at breakfast and saying hello out the bedroom window, we added a nest cam for a better viewpoint.

<iframe width="560" height="315" src="http://www.youtube.com/c/ChrisBurgess/live" frameborder="0" allowfullscreen style="border: 1px solid #666; margin-bottom: 20px;"></iframe>

*[nest cam on YouTube](https://youtu.be/JKlW9DHOFYg)*

I was cautious about installing the camera, as I thought there were no eggs and had read that birds are more likely to abandon their nesting if they aren't invested fully. Turned out there were four eggs but the nest was quite deep and they weren't visible when holding a camera out the window to get a view.

If making any changes near the nest, I'll watch her from the breakfast table, and get to work with any changes when she breakfasts soon after dawn. She knows we're here as she can see us in the bedroom window, so I think she's decided we're mostly harmless, if noisy.

There was a bit of crawling around in the roof to get a Raspberry Pi within range of the nest, and some small holes drilled - yay for being a homeowner, I can drill where I like! Have to go back up there and wire the Pi power off the porch light so I can remove the extension cable snaking into the laundry ceiling.

The rPi is running Raspbian Jessie, and the camera is a Microsoft HD-3000. From the feel of the base I thought I'd be able to drill mounting holes into the camera, but it turns out the base was steel and broke a drill bit. I make a small wooden mount that the base slots into, so I can affix that to the underside of the eave.

Initially I used [Motion](http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome) to capture the stream, which worked pretty much out of the box. For security & bandwidth reasons I decided to push the stream out to a CDN for viewing, so after a day of Motion I swapped to `avconv` last night, and am now pushing it to YouTube (hence the embed above).

Since night is too dark to see activity, I'm deactivating the stream from dark (10pm) until dawn (5:30am). Running the `avconv` stream inside a `tmux` session to observe output - expected to have to do more to keep it running TBH, since video encoding, but so far it's fine.

There's not really a lot of "how to" to this, since it worked out of the box after installing `libav-tools`. Still I can share the successful results of some trial and error :)

<script src="https://gist.github.com/xurizaemon/e338363d550016bcc8d6.js"></script>

*Cron entries to start & stop a named tmux session for the stream.*

<script src="https://gist.github.com/xurizaemon/795f1f8fab9dab448f74.js"></script>

*Shell script to run the actual encode.*

* YouTube seems to ignore streams without audio, so this adds silent audio channel.
* Submits FLV - YouTube grumbles about "unsupported codec" occasionally in the video manager, but `-c:v libx264` doesn't encode efficiently on the Pi. Need to play with this.

Pushing off to CDN and back for viewing introduces a short delay, so if I need to adjust the camera I swap back to Motion for a few minutes - it's much faster for local only delivery. It's probably possible to run the two side by side.

Quite impressed with what the rPi and cheap camera can do here, and happy that YouTube appear to be offering unlimited free rtmp:// broadcast. I did check out Twitch.tv and Ustream, but found it easier to navigate YouTube's live broadcast setup than the others.
