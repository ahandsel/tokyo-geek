---
title: Chrome tip - Simplify disabling ad privacy settings
description: Shortcut to quickly open Chrome ad privacy settings to turn off tracking.
head:
  - - meta
    - name: keywords
      content: chrome, privacy, ads, settings, shortcut
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

> [!IMPORTANT]  
> These ad privacy settings are enabled by default, so you need to disable them manually.

Chrome is my favorite browser, but I highly recommend disabling the following [ad privacy settings][chrome-adsettings] to prevent Google from collecting additional data about you:

* Ad topics - `chrome://settings/adPrivacy/interests`
* Site-suggested ads - `chrome://settings/adPrivacy/sites`
* Ad measurement - `chrome://settings/adPrivacy/measurement`

These settings are enabled by default, so you need to disable them manually.


## Using multiple Chrome profiles?

If you are using Chrome's [profiles feature][chrome-profiles], you need to disable these settings for each profile you use.


## Tip - Open the ad privacy settings with a single command

Here is a Bash command to open the ad privacy settings in Chrome:

```bash
open -a "Google Chrome" "chrome://settings/adPrivacy/interests" "chrome://settings/adPrivacy/sites" "chrome://settings/adPrivacy/measurement"
```


## Tip - Apple shortcut to open the ad privacy settings

Here is a shortcut to open the ad privacy settings in Chrome on macOS:

* [Chrome Privacy Check][shortcut-link]

The shortcut simply opens the ad privacy settings in Chrome, so you can quickly disable them.  
It uses AppleScript, so please enable `Allow Running AppleScript` in the Shortcuts app settings.

1. Add the [Chrome Privacy Check][shortcut-link] shortcut to your Mac.
2. Open the Shortcuts app and click the `...` button to view the settings.
3. Select `Allow Running Scripts` in the Advanced tab.

<!-- markdownlint-disable MD010 -->

```AppleScript
tell application "Google Chrome"
	activate
	open location "chrome://settings/adPrivacy/interests"
	delay 0.5
	open location "chrome://settings/adPrivacy/sites"
	delay 0.5
	open location "chrome://settings/adPrivacy/measurement"
end tell
```

<!-- markdownlint-enable MD010 -->

[chrome-adsettings]: https://support.google.com/chrome/answer/13355898
[chrome-profiles]: https://support.google.com/chrome/answer/2364824
[shortcut-link]: https://www.icloud.com/shortcuts/6b9aeae513534afb9745d57564d9931f
