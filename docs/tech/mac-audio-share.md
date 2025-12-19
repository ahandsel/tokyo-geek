---
title: 'How to share audio to multiple AirPods on Macs'
description: 'Steps to share audio to two AirPods sets using a Multi-Output Device on macOS.'
head:
  - - meta
    - name: keywords
      content: mac, airpods, audio, multi-output, macos, bluetooth
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]


## 1. Pair and connect both AirPods Pro pairs to your Mac

* Open **System Settings**, then choose **Bluetooth**.
* Connect the first AirPods Pro pair, then connect the second pair.
* Each pair should appear as its own device.


## 2. Create a Multi-Output Device

* Open **Finder** → **Applications** → **Utilities** → **Audio MIDI Setup**.
* If you do not see the device list, open **Window** and choose **Show Audio Devices**.
* Click the **+** button (bottom-left) and choose **Create Multi-Output Device**.
* In the right pane, check the **Use** box for both AirPods Pro devices.
* Set **Primary Device** (called **Master Device** on some macOS versions) to one AirPods pair, and enable **Drift Correction** for the other pair.


## 3. Switch your Mac audio output to the Multi-Output Device

* Select your **Multi-Output Device** as your audio output:
  * Open **Control Center** and choose **Sound**
  * or open **System Settings**, then choose **Sound** → **Output**.


## Compatibility and limitations

* **macOS versions:** The Audio MIDI Setup utility is available across modern macOS releases. The Multi-Output Device workflow is stable on macOS Monterey and later; UI and Bluetooth behavior may vary on much older macOS versions.
* **Synchronization:** Bluetooth audio introduces latency. Even with **Drift Correction** enabled for the non-primary device, perfect lip-sync across two AirPods pairs is not guaranteed. Expect small delays that are more noticeable with video and fast-paced music.
* **App behavior:** Some apps select their own audio device independently of the system output. If an app does not play through the Multi-Output Device, check the app's audio settings.
* **Microphone and calls:** Multi-Output Device typically handles output only. Microphone input will still come from a single device (the Mac or one AirPods set). Using both AirPods for a single call (with both microphones active) is not supported.


## Helpful tips

* Enable **Drift Correction** on the device that is not set as the **Primary Device** in Audio MIDI Setup - this helps reduce audible drift between devices.
* Rename the Multi-Output Device (double-click its name in Audio MIDI Setup) to something memorable like "Shared AirPods" so it is easy to spot in Control Center.
* Add quick access to Sound: open Control Center and drag `Sound` to the menu bar (or go to System Settings → Control Center → Sound on newer macOS) for faster switching.


## Troubleshooting

* No audio after selecting the Multi-Output Device: open Audio MIDI Setup, select the Multi-Output Device, verify each device is checked under **Use**, and make sure volume sliders are up.
* One AirPods pair not showing: open System Settings → Bluetooth, confirm the pair is connected. If it is connected but not listed, try disconnecting and reconnecting the AirPods.
* Audio noticeably out of sync: toggle **Drift Correction** on and off for the non-primary device, or swap which device is the **Primary Device** and test again.
* An app does not output audio: check the app's audio output setting, or quit and reopen the app after you change the system output.
* Cannot find Audio MIDI Setup: open Finder → Applications → Utilities and run `Audio MIDI Setup.app` directly.


## References

[Play audio through multiple devices at once in Audio MIDI Setup on Mac - Apple Support][apple-multi-output]

[apple-multi-output]: https://support.apple.com/guide/audio-midi-setup/play-audio-through-multiple-devices-at-once-ams7c093f372/mac
