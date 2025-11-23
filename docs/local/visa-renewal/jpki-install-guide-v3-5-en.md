---
title: 'JPKI User Software Ver.3.5 Installation Guide'
description: English machine translation of the JPKI User Software Ver.3.5 installation guide.
---

# {{$frontmatter.title}}

This is a English machine translation of the [JPKI User Software Ver.3.5 installation guide](jpki-install-guide-v3-5.md).


## Table of contents <!-- omit in toc -->

* [Chapter 2 Overview of steps](#chapter-2-overview-of-steps)
  * [Requirements](#requirements)
* [Chapter 3 Installing JPKI User Software](#chapter-3-installing-jpki-user-software)
* [Chapter 4 Starting JPKI User Software](#chapter-4-starting-jpki-user-software)
* [Chapter 5 Uninstalling JPKI User Software](#chapter-5-uninstalling-jpki-user-software)
* [Chapter 6 Pairing with Android devices](#chapter-6-pairing-with-android-devices)
* [Appendix 1 System environment variable "Path" length limitation](#appendix-1-system-environment-variable-path-length-limitation)
* [Appendix 2 About updates](#appendix-2-about-updates)
* [Appendix 3 IC card reader/writer settings](#appendix-3-ic-card-readerwriter-settings)
* [Appendix 4 Changing update notification settings](#appendix-4-changing-update-notification-settings)

---


## Chapter 2 Overview of steps

The overall steps are as follows:

* Install JPKI User Software  
  Install the JPKI User Software. See [Chapter 3 Installing JPKI User Software](#chapter-3-installing-jpki-user-software).

* Install IC card reader/writer driver  
  Install the driver software for the IC card reader/writer you use.  
  For connection and driver installation steps, follow the setup guide provided with your device.  
  (If you have already installed the driver, you can skip this step.)

* Start JPKI User Software  
  Start the JPKI User Software. See [Chapter 4 Starting JPKI User Software](#chapter-4-starting-jpki-user-software) and the help included with the software for details.


### Requirements

Some functions of JPKI User Software require JRE (Java Runtime Environment). For details on functions that need JRE, see the help of JPKI User Software.  
To download and install JRE, see the Oracle website.  
Reference information is also provided on the JPKI portal site: <https://www.jpki.go.jp/e-apply/jre.html>.

---


## Chapter 3 Installing JPKI User Software

This chapter describes how to install JPKI User Software. (Example: Windows 10)

You must log in as a user belonging to the Administrator group. Installation is not possible under non-Administrator accounts.

1. Exit all running software on Windows. (See each software's manual for how to exit.)
2. Open File Explorer, locate the file `JPKIAppli03-05.exe` downloaded from the JPKI portal site, and double-click to start the installer.

   **Note:**
   * You can update from older versions. See Appendix 2 for update steps.
   * A "User Account Control" dialog may appear. If so, check that you are running the downloaded `JPKIAppli03-05.exe` from the JPKI portal site, and click `はい(Y)` ("Yes") to continue.

3. The JPKI User Software setup screen appears.
4. Click `次へ(N)` ("Next") to proceed.
5. Follow the on-screen instructions. If a license agreement is shown, review it, then click `同意する(A)` ("I Agree").
6. When asked for the installation folder, keep the default unless you need to change it. Click `次へ(N)` ("Next").
7. When the installation is ready, click `インストール(I)` ("Install").
8. After installation finishes, click `完了(F)` ("Finish").

---


## Chapter 4 Starting JPKI User Software

1. Insert the IC card into your IC card reader/writer.
2. From the Windows start menu, open `JPKI利用者ソフト` ("JPKI User Software").
3. The main window will open. Use the menu to access functions.  
   Example menu items:
   * `証明書の確認` ("Check certificate")
   * `パスワードの変更` ("Change password")
   * `署名用電子証明書` ("Signature certificate")

For help, use the built-in Help menu.

---


## Chapter 5 Uninstalling JPKI User Software

1. Open Windows "Settings" > "Apps".
2. In the list, find `JPKI利用者ソフト` ("JPKI User Software").
3. Select it and click "Uninstall".
4. Follow the on-screen instructions to complete uninstallation.

---


## Chapter 6 Pairing with Android devices

You can pair your Windows PC with an Android smartphone to use JPKI functions.

1. On your Android device, install the JPKI app from Google Play.
2. Start the app and choose "Pairing" (`ペアリング`).
3. On the PC, start JPKI User Software and open the "Pairing" menu.
4. Scan the displayed QR code or enter the code shown to complete pairing.

---


## Appendix 1 System environment variable "Path" length limitation

If the Windows system environment variable "Path" becomes too long, it may cause errors.  
To check or adjust the "Path" length:

1. Open "System Properties".
2. Select "Environment Variables".
3. Check the "Path" entry length. If it is too long, reduce unnecessary entries.

---


## Appendix 2 About updates

You can update from older versions without uninstalling.

1. Download the new installer from the JPKI portal site.
2. Run it. The existing version will be updated automatically.
3. After the update, restart your PC if requested.

---


## Appendix 3 IC card reader/writer settings

For most IC card readers, the driver setup is automatic. If the device does not work:

1. Check that the driver is installed correctly.
2. If not, download the driver from the manufacturer's website and install it.
3. Reconnect the reader and try again.

---


## Appendix 4 Changing update notification settings

The software can notify you when updates are available.

1. Start JPKI User Software.
2. From the menu, select "Settings" (`設定`).
3. Open "Update notifications" (`更新通知`).
4. Choose either "Enable" (`有効`) or "Disable" (`無効`).
