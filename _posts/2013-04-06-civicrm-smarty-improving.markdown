---
layout: post
title: "CiviCRM, Smarty looking better"
date: 2013-04-06 00:24
comments: true
categories: 
---

Tim Gummer asked me to look at a template tweak for Natural Areas a few days ago - they wanted to display a little extra contact info (membership type, status, what have you) on the contact summary page.

I'd been resistant to CiviCRM's Smarty syntax from days of yore when it was a crazy nested mess of .tpl files, and a right pain to substantially rejig in any shape except the defaults. I did not expect to have much fun ... in fact my initial impulse was to sidestep Smarty entirely and use JS + CiviCRM REST API to get the data. Yeah, that resistant.

Well, since Tim asked nicely I figured we should take a look at it. And as it turned out, it wasn't so bad after all. It was still pretty crazy - I didn't look to see what happens on the backend, but we end up with three `crmapi` calls here. It's still Smarty, and it's still CiviCRM.

{% gist 5318647 crmapi-membership-on-contact-summary.tpl %}

That worked.
