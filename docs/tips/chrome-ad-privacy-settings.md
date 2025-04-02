# Chrome Tip - Turn off these Google Chrome settings to avoid tracking

> [!IMPORTANT]  
> These ad privacy settings are enabled by default, so you must disable them manually.

Chrome is my favorite browser, but I highly recommend turning off the following [ad privacy settings](https://support.google.com/chrome/answer/13355898) to prevent Google from collecting even more data about you:
* Ad topics - `chrome://settings/adPrivacy/interests`
* Site-suggested ads - `chrome://settings/adPrivacy/sites`
* Ad measurement - `chrome://settings/adPrivacy/measurement`

These settings are enabled by default, so you must manually disable them.


## Using multiple Chrome profiles?

If you use Chrome's [profiles feature](https://support.google.com/chrome/answer/2364824), you must turn off these settings for each profile.


## Tip - Open the ad privacy settings with a single command

Here is a bash command to open the ad privacy settings in Chrome:

```bash
open -a "Google Chrome" "chrome://settings/adPrivacy/interests" "chrome://settings/adPrivacy/sites" "chrome://settings/adPrivacy/measurement"
```


## Tip - Apple shortcut to open the ad privacy settings

Here is a shortcut to open the ad privacy settings in Chrome on macOS:
* [Chrome Privacy Check](https://www.icloud.com/shortcuts/6b9aeae513534afb9745d57564d9931f)

The shortcut opens the ad privacy settings in Chrome, so you can quickly disable them.
It uses AppleScript, so please enable `Allow Running AppleScript` in the Shortcuts app settings.
1. Choose the Shortcuts > Settings (from the menu bar at the top of the screen).
1. Select `Allow Running Scripts` in the Advanced tab.

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
