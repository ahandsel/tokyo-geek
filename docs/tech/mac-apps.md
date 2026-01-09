---
title: My Favorite Mac Apps
description: A list of great apps for Mac users.
head:
  - - meta
    - name: keywords
      content: mac, apps, productivity, utilities, brew
---

# {{$frontmatter.title}}

Here are some of my favorite apps for Mac users. Hopefully, you find them useful too!


## Table of contents <!-- omit in toc -->

* [Brewlist - Breakdown of my favorite Mac apps](#brewlist---breakdown-of-my-favorite-mac-apps)
  * [Productivity \& Utilities](#productivity--utilities)
  * [Web Browsers](#web-browsers)
  * [Communication \& Collaboration](#communication--collaboration)
  * [Design \& Media](#design--media)
  * [Entertainment](#entertainment)
  * [Development Tools](#development-tools)
    * [Markdown Tools](#markdown-tools)
  * [Fonts](#fonts)
* [Brewfile - Quick installation](#brewfile---quick-installation)


## Brewlist - Breakdown of my favorite Mac apps

See my [Brewfile](#brewfile---quick-installation) to install these apps using Homebrew.


### Productivity & Utilities

* `1password` - **1Password** - Secure password manager for storing and autofilling credentials.
* `alfred` - **Alfred** - Productivity app for launching applications, searching files, and automating workflows.
* `macupdater` - **MacUpdater** - Keeps your macOS apps up to date by checking for new versions.
* `rocket` - **Rocket** - System-wide emoji picker for quick emoji insertion anywhere.
* `keycastr` - **KeyCastr** - Visualizes your keystrokes for demos, screencasts, and presentations.
* `karabiner-elements` - **Karabiner-Elements** - Powerful keyboard customizer for remapping keys on macOS.
* `iterm2` - **iTerm2** - Advanced terminal emulator for macOS with split panes, hotkeys, and more.
* `grammarly-desktop` - **Grammarly** - Desktop writing assistant for grammar, spelling, and style suggestions.
* `setapp` - **Setapp** - Subscription-based app library offering a curated suite of Mac applications.
* `pareto-security` - **Pareto Security** - Automatically audits your Mac for basic security hygiene.


### Web Browsers

* `firefox` - **Firefox** - Open-source web browser focused on privacy and customization.
* `google-chrome` - **Google Chrome** - Fast, secure web browser developed by Google.
* `microsoft-edge` - **Microsoft Edge** - Chromium-based browser by Microsoft with built-in security features.


### Communication & Collaboration

* `discord` - **Discord** - Voice, video, and text chat platform for communities and gaming.
* `slack` - **Slack** - Collaboration hub for messaging, file sharing, and integrations.
* `chatgpt` - **ChatGPT Desktop** - Unofficial desktop client for interacting with OpenAI's ChatGPT.
* `google-drive` - **Google Drive** - Desktop client for syncing and accessing files in Google Drive cloud storage.


### Design & Media

* `figma` - **Figma** - Collaborative interface design tool for UI/UX prototyping.


### Entertainment

* `spotify` - **Spotify** - Music streaming application with a massive library of songs and podcasts.
* `vlc` - **VLC media player** - Versatile multimedia player supporting nearly all audio/video formats.


### Development Tools

* `visual-studio-code` - **Visual Studio Code** - Feature-rich source-code editor with extensions and Git integration.
* `github` - **GitHub Desktop** - GUI client for managing Git repositories and GitHub workflows.
* `gh` - **GitHub CLI** - Command-line tool for interacting with GitHub from your terminal.
* `asciinema` - **Asciinema** - Records terminal sessions and shares them as lightweight screencasts.
* `hugo` - **Hugo** - High-performance static site generator written in Go.
* `pandoc` - **Pandoc** - Universal document converter supporting multiple markup formats.
* `nodenv` - **Nodenv** - Manages and switches between multiple Node.js versions.
* `pyenv` - **Pyenv** - Installs and manages multiple Python versions seamlessly.
* `powerlevel10k` - **Powerlevel10k** - Fast Zsh prompt theme with advanced customization.
* `tree` - **Tree** - Displays directory structure in a tree-like format.
* `numi-cli` - **Numi CLI** - Calculator tool for the terminal with natural language input.
* `yarn` - **Yarn** - Fast, reliable JavaScript package manager for project dependencies.


#### Markdown Tools

* `qlmarkdown` - **QuickLook Markdown** - Enables live Quick Look previews of markdown files.
* `macdown` - **MacDown** - Markdown editor with live preview and syntax highlighting.
* `lychee` - **Lychee Link Checker** - Fast link checker for markdown and HTML files.
* `markdownlint-cli` - **markdownlint CLI** - Lints markdown files to ensure consistent style.
* `markdownlint-cli2` - **markdownlint CLI v2** - Alternative CLI for markdownlint with extended config support.
* `github-markdown-toc` - **GitHub Markdown TOC** - Generates tables of contents for markdown documents.


### Fonts

* `font-fira-code` - **Fira Code** - Monospaced font with programming ligatures for clearer code.
* `font-hack-nerd-font` - **Hack Nerd Font** - Patched font with additional glyphs for development.
* `font-open-dyslexic-nerd-font` - **OpenDyslexic Nerd Font** - Dyslexia-friendly font with Nerd Font icons.


## Brewfile - Quick installation

> [!TIP] Import Brewfile to your Mac with bundle command
> Save the following content into a file named `Brewfile`, then run the command below to install all listed apps.
> `brew bundle install --file=path/to/Brewfile`

My Brewfile:

```txt
<!-- @include: ./share/Brewfile -->
```
