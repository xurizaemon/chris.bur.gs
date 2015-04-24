---
layout: post
title: "Atom Remote Edit UI & speed of opening remote files"
modified:
categories:
excerpt: A very small observation about interface.
tags: [atom, emacs]
date: 2015-04-24T21:28:08+12:00
comments: true
---

I quite like Atom as an editor - it ticks most of the boxes for an editor I'll enjoy using. I've been using Emacs for a Very Long Time and it's one of the harder habits to kick in this world.

Atom has a dialog UI which it seems to encourage - most Atom plugins follow suit and use the same interface to present a list of options. It's very reminiscent of the sheet that Sublime Text presented for option lists, and maybe in turn that interface came from another editor I don't recognise.

I use Tramp in Emacs to open files on remote servers. Sometimes you want to edit a file on a remote server from the editor instance you're already using. I noticed how much slower this experience seemed to be when using Atom than when using Emacs, so I made a quick screencapture of it and was surprised to see how much longer it really was.

Note the benefit of tab completion here too - in opening the same file path using Tramp, I made two typos which were corrected so fast I didn't recall making them until watching the animation play back.

**Emacs + Tramp**

![Opening the same file with Tramp](/images/file-open-tramp.gif)

**Atom + Remote Edit**

![Opening a file with Atom + Remote Edit](/images/file-open-remote-edit.gif)

The time to set up the SSH connection is similar both times, but the delay IMO is introduced where Atom's sheet interface doesn't have as quick a tab-selection (even though it presents a visual list of options to choose from, a feature Tramp lacks).

Another interesting observation watching those animations is the time Atom's Remote Edit spends saying "no matches found". While the plugin isn't "selling" anything, the psychology of showing a "no matches found" message while waiting for files to show might be looked into - I expect just changing the message would improve perceived performance. (Brings [this recent article about website experience and perception management](http://www.smashingmagazine.com/2015/11/why-performance-matters-part-2-perception-management/) to mind for me.)

This has also shown me how much I tend to keep a memory of file paths on remote systems; to me the visual interface just slows things down, but I also tend to perceive unexpected layouts as a bit of a bug (mostly this comes up when a predictable structure isn't kept to consistently). If I didn't have that internal reference, I'd probably not mind picking from a list each time. As it is, I haven't the patience!

Both Atom & its Remote Edit plugin are great tools - thanks @sveale and the Atom team for your work. I'm still flapping between Atom and Emacs on the desktop, but I'll be sticking with Tramp for this task. Implementing a Tramp style UX on Atom would be a fun project.
