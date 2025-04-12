---
title: nightTab - Custom new tab setup
description: Tailor your browser's new tab page with nightTab extension.
---


# {{ $frontmatter.title }}

*Customizable new tab replacement extension for Chrome*

[zombieFox/nightTab](https://github.com/zombieFox/nightTab) is a highly customizable new tab replacement extension for Chrome, Firefox, and Edge.  
It is an easy way to personalized the browser without browser lock-in.

This open-source extension is a nice alternative to the increasingly bloated new tab pages from Google and Microsoft.  
I find it to be an excellent way to manage bookmarks and organize your new tab page.


## Key features

* **Customizability**: Choose the layout, style, color, and background of your new tab page.
* **Bookmarks**: Add and organize bookmarks with useful features like groups and open-all-at-once button.
* **Search**: Configure the search to include your bookmarks and use a custom search engine.
* **Privacy**: All data is stored locally - [nothing is synced to the cloud](https://github.com/zombieFox/nightTab/wiki/Respecting-your-privacy).
* **Cross-browser**: Available for Chrome, Firefox, and Edge.


## My favorite features

* **Easy to share**: Export the JSON file and share it with your friends or coworkers.
* **Edit from VS Code**: Bulk edit bookmarks, organizational structure, and settings in a JSON file.
* **Data stays local**: Ideal for work Google accounts that you do not want to sync bookmarks with.
* **Time and date**: Display the time and date exactly how you want it.

Try it out and see if it works for you!

|                         Live demo                         |                                                 Chrome Extension                                                  |                                   Firefox Add-On                                    |                        Support the project                        |                   Join the community                   |
| :-------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :---------------------------------------------------------------: | :----------------------------------------------------: |
| [nightTab example](https://zombiefox.github.io/nightTab/) | [Install nightTab Extension](https://chrome.google.com/webstore/detail/nighttab/hdpcadigjkbcpnlcpbcohpafiaefanki) | [Install nightTab Add-On](https://addons.mozilla.org/en-GB/firefox/addon/nighttab/) | [Buy zombieFox a coffee](https://www.buymeacoffee.com/zombieFox/) | [Reddit community](https://www.reddit.com/r/nighttab/) |


## My setup

* GitHub repository to keep track of my configuration files including nightTab and [Brewfile](https://homebrew-file.readthedocs.io/en/latest/usage.html#brewfile).
* Different nightTab instances for work and personal use.
I have a GitHub repository of my nightTab configuration files that I use to back up my settings. It allows me to easily create different instances for different uses.


## Use cases


### Work - Easy to share with coworkers

* Create a nightTab instance for your work-related bookmarks and settings (HR rules, IT support desk, email, calendar, etc.).
* If you want to share your nightTab setup with a coworker, you can export the JSON file and send it to them.
* They can import the JSON file into their nightTab instance, and they can either import just the bookmarks or the entire setup (including layout settings).
* You can easily edit the JSON file to add/remove bookmarks or change URLs.


### Personal - Freely switch browsers

* Create a nightTab instance for your personal bookmarks and settings (news, social media, etc.).
* Just export and import the JSON file to share your nightTab setup across devices.
* Do not need to sign in to a Google or Microsoft account to sync bookmarks.
* You can easily change browsers without losing your bookmarks.
For personal use, nightTab can help you organize your favorite websites, news sources, and frequently visited pages into groups. This organization makes it easier to navigate your interests and hobbies.


### Students - Bulk edit bookmarks

* Create a nightTab instance for your school-related bookmarks and settings (school website, online resources, etc.).
* Easily bulk edit bookmarks in the JSON file to match the URLs to the new classes or projects.
* Move bookmark groups easily based on your current classes or projects.
* Search through all bookmarks to find the ones you need quickly.


## Tips for using nightTab:

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
