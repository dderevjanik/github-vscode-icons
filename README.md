# Github-vscode-icons

[![Build Status](https://travis-ci.org/dderevjanik/github-vscode-icons.svg?branch=master)](https://travis-ci.org/dderevjanik/github-vscode-icons)
[![Known Vulnerabilities](https://snyk.io/test/github/dderevjanik/github-vscode-icons/badge.svg)](https://snyk.io/test/github/dderevjanik/github-vscode-icons)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**Download For:**
[![chrome-favicon](docs/icons/chrome-favicon.png) Chrome](https://chrome.google.com/webstore/detail/vscode-github-icons/hoccpcefjcgnabbmojbfoflggkecmpgd?utm_source=github),
![opera-favicon](docs/icons/opera-favicon.png) *Opera*

**Supported websites:**
![github-favicon](docs/icons/github-favicon.ico) Github (also Gist),
![gitlab-favicon](docs/icons/gitlab-favicon.ico) Gitlab,
![bitbucket-favicon](docs/icons/bitbucket-favicon.png) Bitbucket,
![pastebin-favicon](docs/icons/pastebin-favicon.ico) Pastebin,
![sourceforge-favicon](./docs/icons/sourceforge-favicon.ico) SourceForge

## About

Extension for browser, which displays [vscode-icons](https://github.com/vscode-icons/vscode-icons) in github, gitlab and bitbucket repositories. It also displays `vscode-icons` in user's pastebin list.

If you're familiar with beautiful extension for vscode called `vscode-icons`, then you know that you need also one for Web. Brain will recognize different
icons much faster and when you're spending several hours per day on websites like github, gitlab or bitbucket, this extension is for you. If you look at github repository with displayed `vscode-icons`, you'll get instant overview of used technologies by their specific icons (*look at screenshots below*).

## Screenshots

![screen_repo](./docs/screenshots/repo_screens.png)

## Development

To stay updated with `vscode-icons`, you need to extract compiled `icons.json` from `vscode-icons` everytime when it updates
After that, you need run script called `npm run preprocess`, which will generate definition chunks from `icons.json` for easier
work with them.

Goals:

- ![github-favicon](./docs/icons/github-favicon.ico) GitHub (with Gist)
    - [x] Display icons in Repo Tree
    - [x] Display icons in Path segments
    - [x] Display icons in Gist
- ![gitlab-favicon](./docs/icons/gitlab-favicon.ico) GitLab
    - [x] Display icons in Repo Tree
    - [ ] Display icons in Path segments
- ![bitbucket-favicon](./docs/icons/bitbucket-favicon.png) BitBucket
    - [x] Display icons in Repo Tree
    - [ ] Display icons in Path segments
- ![pastebin-favicon](./docs/icons/pastebin-favicon.ico) Pastebin
    - [x] Display icons in user's profile
- ![sourceforge-favicon](./docs/icons/sourceforge-favicon.ico) SourceForge
    - [x] Display icons in Repo Tree
- Test
    - [x] Test for filenames
    - [x] Test for extensions
    - [x] Test for languages
    - [x] Test for folders
    - [x] Test for pastebin syntaxes
- Automation
    - [x] Create `zip` archive from `output` folder
    - [ ] Copy icons from generated `vscode-icons` artifact
    - [ ] Update `icons.json` from generated `vscode-icons` artifact
