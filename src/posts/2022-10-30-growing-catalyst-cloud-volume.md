---
title: "Growing Catalyst Cloud Volume"
subtitle: 
date: 2022-10-30T06:35:47+13:00
tags: []
---

So, I ran up a couple of cloud instances recently, and this week looked back and both had full volumes. Le sigh.

(No, I probably wouldn't have run into this if I'd had one of our excellent ops team deploy an instance for us.)

Time to grow the available diskspace for them!

## Docs

Catalyst Cloud has an entry on this in their [Block Storage FAQ](https://docs.catalystcloud.nz/block-storage/faq.html).

On first read I actually missed what looks like the easy instructions at the top. Second time around I'm going to use those better.

## Documentation

I logged into https://dashboard.cloud.catalyst.net.nz and found my instances, making a note of the storage size and type (b1.standard is the default, and that uses spinning disks which are cheaper but slower).

I have an instance with a 10GB disk and another with a 40GB disk. I'll tackle the 10GB first, then repeat for the other once I'm happy with round one.

The [FAQ answer](https://docs.catalystcloud.nz/block-storage/faq.html#boot-volumes) to growing boot volumes give three answers:

- Deploy a new instance and configure from scratch - good advice generally, not doing that thanks
- Use a volume snapshot - looks easy but says I can never delete the source volume, which seems wrong
- "Old fashioned method" is what we'll be doing today, then

> Am I deterred by the label "old-fashioned method"? Why doesn't it describe the process ("clone data to new volume"), but instead makes a comment on the process ("old-fashioned method")? It feels like this ought to dissuade us - everyone knows old-fashioned means bad, right? Well, no, I'm not deterred - option one is labour intensive, option two has a weird gotcha, let's try option three.

## Process followed (v1)

> I suggest you read the whole article before following this, as the first attempt didn't work out.

In the Catalyst Cloud dashboard, I create a new volume, with a size of `40GB` and a type of `b1.sr-r3-nvme-1000`. The default label is `b1.standard`[^defaults] which I believe from experience means a spinning disk storage - much slower. I can see "nvme" in this label, and while Catalyst Cloud doesn't specify what the types are in the UX, I find clues on the [pricing page](https://catalystcloud.nz/pricing/price-list/) - "3 replicas on NVME with 1000 IOPS burst limit".

I don't need to answer the "Volume name" question, it'll get a UUID generated if I leave it blank. And the instructions say this new volume needs to be bootable; that option isn't available when creating the new volume, but it is if I create the volume, then edit it and check the "Bootable" option.

I can now attach the volume to my running instance, by using the menu on the volume. This asks just for the compute instance to connect to. It also asks for a device ID and the placeholder value shown is `/dev/vdc`, but I notice that when I leave that blank and attach it, the volume shows up as `/dev/vdb`. Also fine, just one to keep an eye on.

Now I can SSH into that running instance.

First we want to make a filesystem on the new volume, and mount it at a target destination to be copied to. (This isn't stated in the docs. If you omit this, you'll end up copying to the same disk.)

```
mkfs.ext4 /dev/vdb
mkdir /media/newvolume
mount /dev/vdb /media/newvolume
```

The docs have a command for us to perform the copy at the top of the page, but it seems to be explicitly referring to non-boot volumes. Let's see what that `rsync` command does:

`rsync -avxHAXSW --numeric-ids --info=progress2 /data/ /mnt/data_new/`

```
-a  : all files, with permissions, etc..
-v  : verbose, mention files
-x  : stay on one file system
-H  : preserve hard links (not included with -a)
-A  : preserve ACLs/permissions (not included with -a)
-X  : preserve extended attributes (not included with -a)
-S  : handle sparse files, such as virtual disks, efficiently
-W  : copy files whole (w/o delta-xfer algorithm)
--info=progress2 : will show the overall progress info and transfer speed
--numeric-ids : don't map uid/gid values by user/group name
```

I'd probably drop the `-v` here since I don't need to see all files listead (I wonder if that plays nicely with `--info=progress2`?). `-x` is going to take care of skipping mounts like `/dev`, `/proc`, `/sys`. `-HAX` looks good. `-S` seems reasonable? `-W` I guess?

Let's try it with `-v` first:

`rsync -avxHAXSW --numeric-ids --info=progress2 / /media/newvolume/`

```
root@deploy-instance:~$ rsync -avxHAXSW --numeric-ids --info=progress2 / /media/newvolume/
sending incremental file list
./
bin -> usr/bin
lib -> usr/lib
lib32 -> usr/lib32
lib64 -> usr/lib64
libx32 -> usr/libx32
sbin -> usr/sbin
boot/
boot/System.map-5.15.0-52-generic
     12,494,544  11%   20.67MB/s    0:00:00 (xfr#2, ir-chk=1039/1065)
boot/config-5.15.0-52-generic
     13,018,266  11%   19.17MB/s    0:00:00 (xfr#4, ir-chk=1037/1065)
boot/initrd.img -> initrd.img-5.15.0-52-generic
boot/initrd.img-5.15.0-52-generic
     52,744,423  48%   24.63MB/s    0:00:02  ^Crsync error: received SIGINT, SIGTERM, or SIGHUP (code 20) at io.c(503) [generator=3.2.3]

rsync error: received SIGINT, SIGTERM, or SIGHUP (code 20) at rsync.c(703) [sender=3.2.3]
```

OK, that's doing per-file progress updates. I don't need that at all.

`rsync -axHAXSW --numeric-ids --info=progress2 / /media/newvolume/`

Much nicer - now I've got a percentage progress bar (which leaps around a bit?) and not too much output. Just right.

The copy does its thing.

[^defaults]: I think the entry tier nVME storage would be a better default option honestly - it's similarly priced ($0.21/GB/month for spinning disk, $0.23/GB/month for nVME with double the burst limits). Current defaults will mean newly onboarded customers experience spinning disk until they migrate away.

## Launch with new volume

Since I was doing "old fashioned method" I figured this next would work as though for a physical machine - I'd detach the old volume and leave only the newer one connected.

I found I couldn't detach the original volume from the existing instance. The instructions actually say "Attach the new volume and the original to another instance.".

I'd already done the clone so instead I launched a new instance with the new volume.

Using **Launch Instance**

- Details
  - name: deploy-instance-2
  - source: volume deploy-volume
  - flavor: c2r4
  - networks: deploy-network
  - secgroups: deploy-secgroup
  - key pair: chrisburgess

Then I'll need to move the allocated IP over from the original. Under **Floating IPs**

- Disassociate the existing IP (lol)
- Associate it to the new instance

This didn't boot up (ok, maybe I did need to run grub, sigh). 

Couldn't detach the new volume from the new instance to put it back on the old instance. Ugh.

Tried uploading the volume to image, no dice. Tried a few things to see if I could "unlock" the volume (unlock the instance, set the volume not bootable) but nope. Huh.

## That didn't work, let's try again

I deleted the new instance created above, so I had just the original additional volume. I attached that to the original instance. (Thank heck I didn't get eager and delete the instance early.)

Inspect the attached volume's partition table:

```
root@deploy-instance:~# fdisk -l /dev/vdb
Disk /dev/vdb: 40 GiB, 42949672960 bytes, 83886080 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
root@deploy-instance:~# fdisk -l /dev/vda
Disk /dev/vda: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 6845360D-8391-4A07-9961-267A575B1271

Device      Start      End  Sectors  Size Type
/dev/vda1  227328 20971486 20744159  9.9G Linux filesystem
/dev/vda14   2048    10239     8192    4M BIOS boot
/dev/vda15  10240   227327   217088  106M EFI System

Partition table entries are not in disk order.
```

Clone the old partition to the new volume's partition:

```
root@deploy-instance:~# dd if=/dev/vda of=/dev/vdb bs=16M status=progress
10737418240 bytes (11 GB, 10 GiB) copied, 239 s, 44.9 MB/s 
640+0 records in
640+0 records out
10737418240 bytes (11 GB, 10 GiB) copied, 240.109 s, 44.7 MB/s
```

Take another look at the partition table on the new volume:

```
root@deploy-instance:~# fdisk -l /dev/vdb
GPT PMBR size mismatch (20971519 != 83886079) will be corrected by write.
The backup GPT table is not on the end of the device.
Disk /dev/vdb: 40 GiB, 42949672960 bytes, 83886080 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 6845360D-8391-4A07-9961-267A575B1271

Device      Start      End  Sectors  Size Type
/dev/vdb1  227328 20971486 20744159  9.9G Linux filesystem
/dev/vdb14   2048    10239     8192    4M BIOS boot
/dev/vdb15  10240   227327   217088  106M EFI System

Partition table entries are not in disk order.
```

Expand the partition on the new volume:

```
root@deploy-instance:~# growpart /dev/vdb 1
CHANGED: partition=1 start=227328 old: size=20744159 end=20971487 new: size=83658719 end=83886047
```

Take another look of the changed partition table:

```
root@deploy-instance:~# fdisk -l /dev/vdb
Disk /dev/vdb: 40 GiB, 42949672960 bytes, 83886080 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 6845360D-8391-4A07-9961-267A575B1271

Device      Start      End  Sectors  Size Type
/dev/vdb1  227328 83886046 83658719 39.9G Linux filesystem
/dev/vdb14   2048    10239     8192    4M BIOS boot
/dev/vdb15  10240   227327   217088  106M EFI System

Partition table entries are not in disk order.
```

Mount in the required things to chroot and run grub:

```
root@deploy-instance:/mnt# mount /dev/vdb1 /mnt
root@deploy-instance:/mnt# for i in /dev /dev/pts /proc /sys /run ; do mount -B $i .$i ; done
root@deploy-instance:/mnt# chroot /mnt
root@deploy-instance:/# mount
/dev/vdb1 on / type ext4 (rw,relatime)
udev on /dev type devtmpfs (rw,nosuid,relatime,size=1989100k,nr_inodes=497275,mode=755,inode64)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
tmpfs on /run type tmpfs (rw,nosuid,nodev,noexec,relatime,size=401816k,mode=755,inode64)
```

Grub it:

```
root@deploy-instance:/# grub-install /dev/vdb
Installing for i386-pc platform.
Installation finished. No error reported.
root@deploy-instance:/# update-grub
Sourcing file `/etc/default/grub'
Sourcing file `/etc/default/grub.d/50-cloudimg-settings.cfg'
Sourcing file `/etc/default/grub.d/init-select.cfg'
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-5.15.0-52-generic
Found initrd image: /boot/initrd.img-5.15.0-52-generic
Found linux image: /boot/vmlinuz-5.15.0-48-generic
Found initrd image: /boot/initrd.img-5.15.0-48-generic
Warning: os-prober will not be executed to detect other bootable partitions.
Systems on them will not be added to the GRUB boot configuration.
Check GRUB_DISABLE_OS_PROBER documentation entry.
done
root@deploy-instance:/# 
exit
```

Now detach the new volume and launch a new compute instance, selecting "Volume" under Source. If the volume doesn't appear in the list you may need to edit the volume first and check "Bootable".

Yay, and it came up OK! Now I can shelve then later delete the old instance.

--- 

This got me thinking about driving built versions of the site from Gitlab CI => Catalyst Cloud Openstack. I know that's what Cove offers but it requires K8s and the config overhead feels pretty big.

Easy for me to say after making a LEMP stack though, there's a lot more to maintaining infra than spinning it up.