---
layout: post
title: "PGP in Parliament."
date: 2013-06-28T12:34:00.007Z
comments: true
---

With greater awareness of the visibility of email content and traffic, I got wondering whether any NZ elected representatives had published PGP keys in order to give the public a means of communicating with some level of privacy.

S/MIME? I don't know of a way to look up Parliamentary certificates to obtain the recipients' cert, and otherwise you'd have to get an email from an MP or EA with their cert. (If such a directory exists, I'll be happy to update this.)

I checked the MIT PGP keyserver for results in the @parliament.govt.nz domain as well as seven @partyname.org.nz domains (sorry if I forgot your favourite party, I've got that wrong before). The results are few, out of date, and not encouraging.

[PGP keys in @parliament.govt.nz](http://pgp.mit.edu:11371/pks/lookup?search=parliament.govt.nz)

* Rodney Hide
* EAs belonging to (I think) ACT, Labour and National (1 each)
* A few others

[PGP keys in @national.org.nz](http://pgp.mit.edu:11371/pks/lookup?search=national.org.nz)

* One person

[PGP keys for @labour.org.nz](http://pgp.mit.edu:11371/pks/lookup?search=labour.org.nz), [@greens.org.nz](http://pgp.mit.edu:11371/pks/lookup?search=greens.org.nz), [@act.org.nz](http://pgp.mit.edu:11371/pks/lookup?search=act.org.nz), [@maoriparty.org](http://pgp.mit.edu:11371/pks/lookup?search=maoriparty.org), [@unitedfuture.org.nz](http://pgp.mit.edu:11371/pks/lookup?search=unitedfuture.org.nz), [@mana.org.nz](http://pgp.mit.edu:11371/pks/lookup?search=mana.org.nz)

* Nobody.

Friends in Parliamentary Service tell me that encryption is a hard proposition for use within Parliament, because there is tight control over what software can and can't be installed. I'm not sure what encryption options are offered by Parliamentary Services IT, but it doesn't look like it's PGP.

I emailed a handful of MPs to enquire about their current approaches to private / secure comms with consituents. National MP Amy Adams, the Communications and Information Technology Minister, referred me to Parliamentary Services. Through a response from PS I learned about [SEEMail](http://ict.govt.nz/common-capabilities/communications/seemail) ("Secure Electronic Environment Mail"), which provides secure mail gateways to communicate between SEEMail-using agencies. By my reading of [this document](http://ict.govt.nz/common-capabilities/communications/seemail)) it seems like SEEMail

 * is only available to participating organisations,
 * has mail gateways apply rules to communications (eg recipient
   constraints on a document marked [RESTRICTED],
 * outsources PKI management to Dimension Data,
 * encrypts and secures based on *agency* certificates rather than
   certificates for individual recipients

References -

 * [SMX announcement of cloud-based email for govt agencies](http://www.computerworld.co.nz/article/472424/smx_opens_cloud-based_email_service_govt_agencies/)
 * [SEEMail keeps delivering (2004 PR)](http://www.scoop.co.nz/stories/PO0406/S00093.htm)
 * [ICT.govt.nz overview of internet messaging](http://ict.govt.nz/guidance-and-resources/standards-compliance/authentication-standards/security-assertion-messaging-framework/appendix-overview-in/)
