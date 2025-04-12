---
title: nightTab - Custom new tab setup
description: Tailor your browser's new tab page with nightTab extension.
---


# {{ $frontmatter.title }}

*Customizable new tab replacement extension for Chrome*

[zombieFox/nightTab](https://github.com/zombieFox/nightTab) is a highly customizable new tab replacement extension for your browser.

It is a nice alternative to the default new tab page, which is often cluttered with ads and suggestions.


## Notable features

* **Easy to share**: Export and share the config JSON file.
* **Edit from VS Code**: Bulk edit bookmarks, organizational structure, and settings in a JSON file.
* **Privacy**: [All data is stored locally](https://github.com/zombieFox/nightTab/wiki/Respecting-your-privacy).
* **Cross-browser**: Available for Chrome, Firefox, and Edge.


## Try it out and see if it works for you!

|                         Live demo                         |                                                 Chrome Extension                                                  |                                   Firefox Add-On                                    |                        Support the project                        |                   Join the community                   |
| :-------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :---------------------------------------------------------------: | :----------------------------------------------------: |
| [nightTab example](https://zombiefox.github.io/nightTab/) | [Install nightTab Extension](https://chrome.google.com/webstore/detail/nighttab/hdpcadigjkbcpnlcpbcohpafiaefanki) | [Install nightTab Add-On](https://addons.mozilla.org/en-GB/firefox/addon/nighttab/) | [Buy zombieFox a coffee](https://www.buymeacoffee.com/zombieFox/) | [Reddit community](https://www.reddit.com/r/nighttab/) |


## Suggested setup

* Create a GitHub repo to keep track of your nightTab's configuration JSON file(s) (also [Brewfile](https://homebrew-file.readthedocs.io/en/latest/usage.html#brewfile)).
* Install the nightTab extension.
* Create different nightTab instances for different purposes: work, personal, banking, side projects, etc.
* Import the JSON file into nightTab.


## Use cases

* Work - easily share bookmarks with coworkers
  * Share links to HR rules, IT support desk, PTO form, client portal, etc. easily to the new coworker.
* Personal - freely switch browsers
  * Easily switch between Chrome, Firefox, and Edge without losing bookmarks.
  * Search through all bookmarks to find the ones you need quickly.
* Students - bulk edit bookmarks
  * Easily bulk edit bookmarks in the JSON file to match the URLs to the new classes or projects.
  * Move bookmark groups easily based on your current classes or projects.


## Tips for using nightTab

Use the `Add unique accent to each Bookmark` option to easily set the color of each bookmark.
* Theme -> Bookmark -> Bottom -> `Add unique accent to each Bookmark`

Ask ChatGPT to edit the JSON file to automatically suggest a color or icon for each bookmark.
* Export the JSON file from nightTab.
* Prompt ChatGPT to edit the JSON file and suggest a color or icon for each bookmark.
* Verify the changes in the JSON file. (Compare the original and edited JSON files on VS Code.)
* Import the edited JSON file back into nightTab.


## Examples


### Google product suite

Here is a nightTab setup to quickly access the various Google products.

<!-- markdownlint-disable MD033 -->
<details>
  <summary>Click to expand <a href="https://github.com/ahandsel/tokyo-geek/blob/main/docs/tips/nighttab/google-bookmarks.json">google-bookmarks.json</a></summary>

  <<< @/tips/nighttab/google-bookmarks.json
</details>
<!-- markdownlint-enable MD033 -->


### Travel

Here is a nightTab setup to quickly access travel-related bookmarks.

<!-- markdownlint-disable MD033 -->
<details>
  <summary>Click to expand <a href="https://github.com/ahandsel/tokyo-geek/blob/main/docs/tips/nighttab/travel-bookmarks.json">travel-bookmarks.json</a></summary>

  <<< @/tips/nighttab/travel-bookmarks.json

</details>
<!-- markdownlint-enable MD033 -->


## References

* How to export and import your nightTab settings:
  * [Data backup and restore · zombieFox/nightTab Wiki · GitHub](https://github.com/zombieFox/nightTab/wiki/Data-backup-and-restore#restore-data)
* How to use a specific background video or image:
  * [Setting a background video or image · zombieFox/nightTab Wiki · GitHub](https://github.com/zombieFox/nightTab/wiki/Setting-a-background-video-or-image)
* Firefox user?
  * [Setting nightTab as your Firefox homepage · zombieFox/nightTab Wiki · GitHub](https://github.com/zombieFox/nightTab/wiki/Setting-nightTab-as-your-Firefox-homepage)
* Limitations:
  * [Cannot open internal browser links like `chrome://…`, `about:...`, or `edge:...`](https://github.com/zombieFox/nightTab/wiki/Protected-URLs)
  * [No native feature to upload an image](https://github.com/zombieFox/nightTab/wiki/Local-background-image)
