---
title: "Contriblog"
subtitle: 
date: 2022-09-25T17:26:05+13:00
tags: []
---

ContribLog ([adaptdk/contrib](https://github.com/adaptdk/contrib)) is a tool for capturing contribution records on the commandline.

On first run the user does some interactive setup of their organisation and first project. After that, users can select the project and interactively add contributions. Trying it out, it's a lightweight but manual method for capturing a personal record of contributions.

```
www-data@ea69a85560cf:~$ ./contriblog add
The "contributions.yml" file does not exist yet. Do you want to generate initialize it? (y/n) y
[1/2] What is the name of the organization? Catalyst IT
What is main URL for the organization? https://catalyst.net.nz
[1/7] Which project received the contribution?
  [0] New project
 > 
What is the machine name of the project? (E.g. drupal/migrate_plus): dmore/behat-chrome-extension
What is the name of the project? (E.g. Migrate Plus): Behat Chrome Extension
What is the main URL of the project? (E.g. https://www.drupal.org/project/migrate_plus): https://gitlab.com/behat-chrome/behat-chrome-extension
Please provide tags for the project, e.g. drupal (one per line)
Use EOL to finish, e.g. Ctrl+D on an empty line to finish input
behat
testing

[2/7] Please give the contribution a title: Some thing
[3/7] What was the main type of the contribution? [default: code]
  [code            ] Writing Code
  [code_review     ] Reviewing Code
  [triage          ] Bug Triaging
  [qa              ] Quality Assurance and Testing
  [security        ] Security-Related Activities
  [localization    ] Localization/L10N and Translation
  [event           ] Event Organization
  [documentation   ] Documentation Authorship
  [community       ] Community Building and Management
  [teaching        ] Teaching and Tutorial Building
  [troubleshooting ] Troubleshooting and Support
  [creative        ] Creative Work and Design
  [ux              ] User Interface, User Experience, and Accessibility
  [social          ] Social Media Management
  [user-support    ] User Support and Answering Questions
  [write           ] Writing Articles
  [public_relations] Public Relations - Interviews with Technical Press
  [speak           ] Speaking at Events
  [marketing       ] Marketing and Campaign Advocacy
  [website         ] Website Development
  [legal           ] Legal Council
  [financial       ] Financial Management
 > teaching
[4/7] Who is making the the contribution?
  [0] New person
 > 
What is the name of the person? (E.g. José Saramago): Chris Burgess
What is the identifier for the person? (E.g. Jose): chris
[5/7] When was the contribution first published? (E.g. 2020-01-22) [default: 2022-09-25]: 
[6/7] How would you describe the contribution? (multiline)
Use EOL to finish, e.g. Ctrl+D on an empty line to finish input
Teaching a workshop
[7/7] Please provide public links related to the contribution? (one per line)
Use EOL to finish, e.g. Ctrl+D on an empty line to finish input
https://gitlab.com/behat-chrome/behat-chrome-extension/-/issues/123
The file "contributions.yml" was updated correctly
```

On second run, we won't get so many questions:

```
www-data@ea69a85560cf:~$ ./contriblog add
[1/7] Which project received the contribution?
  [0] New project
  [1] dmore/behat-chrome-extension
 > 
```

And contributions are logged to a local `.yml` file:

```
www-data@ea69a85560cf:~$ cat contributions.yml 
organization:
    name: Catalyst IT
    url: 'https://catalyst.net.nz'
people:
    xurizaemon: 'Chris Burgess'
projects:
    dmore/behat-chrome-extension:
        name: 'Behat Chrome Extension'
        url: 'https://gitlab.com/behat-chrome/behat-chrome-extension'
        tags:
            - drupal
contributions:
    -
        project: catalyst-it/cass_base
        title: 'Some thing'
        type: teaching
        who: chris
        start: 2022-09-25T00:00:00+00:00
        description: 'Deliver presentation'
        links:
            - 'https://gitlab.com/behat-chrome/behat-chrome-extension/-/issues/123'
```

What I like about the tool is that it enables tracking of non-code contributions on an equal standing with code ones. This tool could suit CLI users if we asked staff to manually track contributions. It uses PHP, but could be packaged as a `phar` for distribution.

## Engari ko te raruraru

The chief challenge of this tool for me is ... it's a lot like timesheeting, right? Timesheeting is effort, and introducing a new task steals energy from other tasks. I sense anyone who's ever had to chase timesheets knows it's not reliable either.

That's why I think that if we can do so responsibly, we should prefer unobtrusive tools to gather data in the first instance, and bolster automated approaches with ways of capturing this information together - perhaps a discussion roundup at the end of the week, in which we might capture a handful of contributions. A team's `contriblog` output might be captured there and consumed by a tool like GrimoireLab.

There are some other challenges/opportunities too - eg I see that the contribution is associated with an individual in the example above? Perhaps the tool could push contributions entered to a centralised (organisation or community) service as well. The UX is that of a decent prototype and could be improved.