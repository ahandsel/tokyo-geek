---
title: nightTab - Custom new tab setup
description: Tailor your browser's new tab page with the nightTab extension.
head:
  - - meta
    - name: keywords
      content: nighttab, browser, extension, bookmarks, customization
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

_Customizable new tab replacement extension for Chrome_

[zombieFox/nightTab][nightTab-repo] is a highly customizable new tab replacement extension for your browser.

It is a good alternative to the default new tab page, which is often cluttered with advertisements and suggestions.


## Notable features

* **Easy to share**: Export and share the configuration JSON file.
* **Edit from VS Code**: Bulk edit bookmarks, organizational structure, and settings in a JSON file.
* **Privacy**: [All data is stored locally][privacy].
* **Cross-browser**: Available for Chrome, Firefox, and Edge.


## Try it out and see if it works for you

|           Live demo           |           Chrome Extension           |           Firefox Add-On           |            Support the project             |     Join the community     |
| :---------------------------: | :----------------------------------: | :--------------------------------: | :----------------------------------------: | :------------------------: |
| [nightTab example][live-demo] | [Install nightTab Extension][chrome] | [Install nightTab Add-On][firefox] | [Buy zombieFox a coffee][zombieFox-coffee] | [Reddit community][reddit] |


## Suggested setup

* Create a GitHub repo to keep track of your nightTab's configuration JSON file(s) (also [Brewfile][brewfile]).
* Install the nightTab extension.
* Create different nightTab instances for different purposes: work, personal, banking, side projects, etc.
* Import the JSON file into nightTab.


## Use cases

* Work - easily share bookmarks with coworkers
  * Share links to HR rules, IT support desk, PTO form, client portal, etc. easily with a new coworker.
* Personal - freely switch browsers
  * Easily switch between Chrome, Firefox, and Edge without losing bookmarks.
  * Search through all bookmarks to find the ones you need quickly.
* Students - bulk edit bookmarks
  * Bulk edit bookmarks in the JSON file to match the URLs to new classes or projects.
  * Move bookmark groups easily based on your current classes or projects.


## Tips for using nightTab

Use the `Add unique accent to each Bookmark` option to easily set the color of each bookmark.

* Theme -> Bookmark -> Bottom -> `Add unique accent to each Bookmark`

Ask ChatGPT to edit the JSON file to automatically suggest a color or icon for each bookmark.

* Export the JSON file from nightTab.
* Prompt ChatGPT to edit the JSON file and suggest a color or icon for each bookmark.
* Verify the changes in the JSON file (compare the original and edited JSON files in VS Code).
* Import the edited JSON file back into nightTab.


## Examples


### Google product suite

Here is a nightTab setup to quickly access various Google products.

<!-- markdownlint-disable MD033 -->
<details>
  <summary>Click to expand <a href="https://github.com/ahandsel/tokyo-geek/blob/main/docs/tips/tech/nighttab/google-bookmarks.json">google-bookmarks.json</a></summary>

<<< @/tips/tech/nighttab/google-bookmarks.json

</details>
<!-- markdownlint-enable MD033 -->

### Travel

Here is a nightTab setup to quickly access travel-related bookmarks.

<!-- markdownlint-disable MD033 -->
<details>
  <summary>Click to expand <a href="https://github.com/ahandsel/tokyo-geek/blob/main/docs/tips/tech/nighttab/travel-bookmarks.json">travel-bookmarks.json</a></summary>

<<< @/tips/tech/nighttab/travel-bookmarks.json

</details>
<!-- markdownlint-enable MD033 -->

## References

* How to export and import your nightTab settings:
  * [Data backup and restore · zombieFox/nightTab Wiki · GitHub][backup-restore]
* How to use a specific background video or image:
  * [Setting a background video or image · zombieFox/nightTab Wiki · GitHub][background]
* Firefox user?
  * [Setting nightTab as your Firefox homepage · zombieFox/nightTab Wiki · GitHub][firefox-homepage]
* Limitations:
  * [Cannot open internal browser links like `chrome://…`, `about:...`, or `edge:...`][protected-urls]
  * [No native feature to upload an image][no-image]

[privacy]: https://github.com/zombieFox/nightTab/wiki/Respecting-your-privacy
[nightTab-repo]: https://github.com/zombieFox/nightTab
[live-demo]: https://zombiefox.github.io/nightTab/
[chrome]: https://chrome.google.com/webstore/detail/nighttab/hdpcadigjkbcpnlcpbcohpafiaefanki
[firefox]: https://addons.mozilla.org/en-GB/firefox/addon/nighttab/
[zombieFox-coffee]: https://www.buymeacoffee.com/zombieFox/
[reddit]: https://www.reddit.com/r/nighttab/
[brewfile]: https://homebrew-file.readthedocs.io/en/latest/usage.html#brewfile
[backup-restore]: https://github.com/zombieFox/nightTab/wiki/Data-backup-and-restore#restore-data
[background]: https://github.com/zombieFox/nightTab/wiki/Setting-a-background-video-or-image
[firefox-homepage]: https://github.com/zombieFox/nightTab/wiki/Setting-nightTab-as-your-Firefox-homepage
[protected-urls]: https://github.com/zombieFox/nightTab/wiki/Protected-URLs
[no-image]: https://github.com/zombieFox/nightTab/wiki/Local-background-image
