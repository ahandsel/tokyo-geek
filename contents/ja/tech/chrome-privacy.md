---
title: Chrome ヒント - 広告プライバシー設定を簡単に無効化する方法
description: Chrome の広告プライバシー設定を素早く開いてトラッキングをオフにするショートカットです。
head:
  - - meta
    - name: keywords
      content: chrome, privacy, ads, settings, shortcut
---

# {{$frontmatter.title}}

> [!IMPORTANT]
> これらの広告プライバシー設定はデフォルトで有効になっているため、手動で無効にする必要があります。

Chrome はお気に入りのブラウザですが、Google による追加データ収集を防ぐために、以下の[広告プライバシー設定][chrome-adsettings]を無効にすることを強くおすすめします。

* 広告トピック - `chrome://settings/adPrivacy/interests`
* サイトが提案する広告 - `chrome://settings/adPrivacy/sites`
* 広告の測定 - `chrome://settings/adPrivacy/measurement`

これらの設定はデフォルトで有効になっているため、手動で無効にする必要があります。


## 複数の Chrome プロフィールを使っている場合

Chrome の[プロフィール機能][chrome-profiles]を使っている場合は、使用しているプロフィールごとにこれらの設定を無効にする必要があります。


## ヒント - コマンド 1 つで広告プライバシー設定を開く

Chrome の広告プライバシー設定を開く Bash コマンドはこちらです。

```bash
open -a "Google Chrome" "chrome://settings/adPrivacy/interests" "chrome://settings/adPrivacy/sites" "chrome://settings/adPrivacy/measurement"
```


## ヒント - Apple ショートカットで広告プライバシー設定を開く

macOS で Chrome の広告プライバシー設定を開くショートカットはこちらです。

* [Chrome Privacy Check][shortcut-link]

このショートカットは Chrome の広告プライバシー設定を開くだけなので、すぐに無効化できます。
AppleScript を使用するため、ショートカットアプリの設定で`AppleScriptの実行を許可`を有効にしてください。

1. [Chrome Privacy Check][shortcut-link]ショートカットを Mac に追加します。
2. ショートカットアプリを開き、`...`ボタンをクリックして設定を表示します。
3. 「詳細」タブで`スクリプトの実行を許可`を選択します。

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
