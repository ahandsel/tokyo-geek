---
title: Migrate macOS apps with Homebrew
description: Export and import macOS applications using Homebrew and Brewfile.
head:
  - - meta
    - name: keywords
      content: homebrew, macos, apps, brewfile, migrate, export, import, backup
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[Homebrew][homebrew], also known as Brew, is a great way to install and manage software on macOS. Managing **Brewfile** in a repository allows you to easily export and import your installed applications.

Here is how to migrate your macOS applications from one Mac to another using Homebrew and a Brewfile.

[homebrew]: https://brew.sh/


## Step 1: Export Brewfile from existing Mac

On your current Mac, run the following:

```shell
brew bundle dump --describe --force --file=~/Brewfile
```

`brew bundle dump` command creates a Brewfile in your home directory, listing all installed Homebrew packages and casks.

* `--describe`: Adds comments to the Brewfile for clarity.
* `--force`: Overwrites any existing Brewfile.
* `--file=~/Brewfile`: Specifies the location to save the Brewfile. _In this case, it is saved in the home directory._


## Step 2: Transfer Brewfile to new Mac

Copy the **Brewfile** to your new Mac using AirDrop, USB drive, or cloud storage.


## Step 3: Import Brewfile on new Mac

On your new Mac, run the following command to install all apps listed in the Brewfile:

```shell
brew bundle install --file=~/Brewfile
```

This command reads the Brewfile and installs all specified applications and packages.


## Additional tips

* Delete unnecessary apps from the Brewfile before importing on the new Mac.
* For Alfred users, the [Homebrew Search][alfred-homebrew-search] workflow can help find and install apps quickly.
* Regularly update your Brewfile to keep track of installed applications.

[alfred-homebrew-search]: https://alfred.app/workflows/chrisgrieser/homebrew-search/
