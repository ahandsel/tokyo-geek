---
title: Add big Home Screen icons that run Shortcuts on iPad
description: Use a Scriptable widget to place a large custom image on the iPad Home Screen and run an iOS Shortcut when you tap it.
head:
  - - meta
    - name: keywords
      content: ipad, scriptable, shortcuts, home screen, widget, custom icon, ios shortcut, big icons
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]


## Overview

* This guide shows how to put a large custom image on the iPad Home Screen that runs an iOS Shortcut when you tap it.
* Goal: add a big, tappable icon for a Shortcut without relying on the default Shortcuts app icon.
* The setup uses the free [Scriptable][scriptable] app and a short JavaScript widget script.
* Target audience: iPad users who already use Shortcuts and want larger, custom Home Screen launchers.


## Preparations


### Install Scriptable

1. Open the App Store on your iPad.
2. Search for **Scriptable**, then install [Scriptable][scriptable-app-store].

Scriptable runs JavaScript on the device and can draw Home Screen widgets.


### Create or choose a Shortcut

1. Open the **Shortcuts** app.
2. Create a new Shortcut, or note the exact name of an existing one.
3. Name it `Example Shortcut` for this walkthrough, or keep your own name and update the script later.

The widget opens the Shortcut by name, so the string in the script must match the Shortcuts app exactly.


### Prepare a widget image

Pick a square or near-square image that reads clearly at widget size. Medium and large Home Screen widgets work best for a "big icon" look on iPad.


## Steps to add a big Shortcut icon


### Step 1: Add the Scriptable script

1. Open **Scriptable**.
2. Tap **+** to create a new script.
3. Paste the [widget script](#widget-script) below into the editor.
4. If your Shortcut name is not `Example Shortcut`, change the `SHORTCUT_NAME` value near the top of the script so it matches the Shortcuts app exactly.
5. Tap **Done** or the close control to save the script.
6. Rename the script in Scriptable to something you will recognize later, such as `Example Shortcut icon`.

> [!CAUTION] Caution: Do not rename the script after you choose its image.
> The saved image is named after the script, so a renamed script can no longer find it, and the widget shows "Open Scriptable and run this script once." again. If you rename the script, run it again and choose the image again.


### Step 2: Choose the widget image

1. Open the script in Scriptable.
2. Tap the **Play** button to run it inside the app.
3. When the photo picker appears, select the image you prepared.
4. When Scriptable asks for a preview size, choose the widget size you plan to add, such as **Medium** or **Large**.
5. Confirm the preview that Scriptable shows.

Running the script once inside Scriptable shrinks the image to widget size and saves it to Scriptable's local files. The Home Screen widget needs that saved file.


### Step 3: Add the Scriptable widget to the Home Screen

1. On the iPad Home Screen, touch and hold an empty area until the apps jiggle.
2. Tap **Edit** in the top-left corner, then tap **Add Widget**.
3. Search for **Scriptable**, then choose a **medium** or **large** widget size.
4. Tap **Add Widget**, then tap **Done**.
5. Touch and hold the new widget, then tap **Edit Widget**.
6. Set **Script** to the script you created.
7. Leave the other options at their defaults unless you already use Scriptable parameters.
8. Tap outside the configuration sheet, then tap **Done** if the Home Screen is still in jiggle mode.

The widget should fill with your custom image. Tap it to run the Shortcut named in `SHORTCUT_NAME`.


## Widget script

<<< @/public/ipad-big-shortcut-icons/shortcut-widget.js


## Additional information

* **Add more icons.** Duplicate the script in Scriptable for each Shortcut. Give every copy a unique name and its own `SHORTCUT_NAME`, then run each copy once to pick its image. Each copy saves its image under its own script name, so the widgets do not overwrite each other.
* **Change the image later.** Open the script in Scriptable and run it again. The photo picker replaces the saved image, and the widget updates on the next refresh. To preview the current image without replacing it, cancel the photo picker.
* **Widget size.** The same script works for small, medium, and large Scriptable widgets. Medium and large sizes look closest to oversized app icons on iPad.


## Troubleshooting


### The widget shows "Open Scriptable and run this script once."

The widget has no saved image yet, or the script was renamed after the image was saved. Open the script in Scriptable, run it with **Play**, and choose an image.


### Tapping the widget does nothing, or the wrong Shortcut runs

Confirm that `SHORTCUT_NAME` matches the Shortcut name in the Shortcuts app, including capitalization and spacing. Rename either the Shortcut or the constant, save the script, then edit the widget and select the script again.


### The widget is blank or shows an old image

1. Run the script once inside Scriptable to rewrite the saved image.
2. Touch and hold the widget, tap **Edit Widget**, and confirm the correct script is selected.
3. Restart the iPad if the widget still does not refresh.


### Scriptable asks for Photos access

Allow Photos access when prompted. The in-app run uses `Photos.fromLibrary()` to pick the widget image.


## References

* [Scriptable][scriptable]
* [Scriptable on the App Store][scriptable-app-store]
* [Create a shortcut on iPhone or iPad - Apple Support][apple-create-shortcut]

<!-- Links -->

[apple-create-shortcut]: https://support.apple.com/guide/shortcuts/create-a-shortcut-apd9b06193df/ios
[scriptable]: https://scriptable.app/
[scriptable-app-store]: https://apps.apple.com/app/scriptable/id1405459188
