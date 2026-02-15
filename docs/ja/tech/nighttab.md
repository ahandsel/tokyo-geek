---
title: nightTab - カスタム新規タブの設定
description: nightTab拡張機能でブラウザの新規タブページをカスタマイズする方法です。
head:
  - - meta
    - name: keywords
      content: nighttab, browser, extension, bookmarks, customization
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

_Chrome向けのカスタマイズ可能な新規タブ置き換え拡張機能_

[zombieFox/nightTab][nightTab-repo]は、ブラウザの新規タブを自由にカスタマイズできる拡張機能です。

広告やおすすめで散らかりがちなデフォルトの新規タブページの良い代替になります。


## 主な特徴

* **簡単に共有できる**：設定のJSONファイルをエクスポートして共有できます。
* **VS Codeで編集できる**：ブックマーク、整理構造、設定をJSONファイルで一括編集できます。
* **プライバシー**：[すべてのデータはローカルに保存されます][privacy]。
* **クロスブラウザ対応**：Chrome、Firefox、Edgeで利用できます。


## 試してみましょう

|        ライブデモ         |              Chrome拡張機能              |              Firefoxアドオン              |               プロジェクトを応援                |      コミュニティに参加      |
| :-----------------------: | :--------------------------------------: | :---------------------------------------: | :---------------------------------------------: | :--------------------------: |
| [nightTabの例][live-demo] | [nightTab拡張機能をインストール][chrome] | [nightTabアドオンをインストール][firefox] | [zombieFoxにコーヒーをおごる][zombieFox-coffee] | [Redditコミュニティ][reddit] |


## おすすめのセットアップ

* GitHubリポジトリを作成して、nightTabの設定JSONファイルを管理しましょう（[Brewfile][brewfile]も一緒に）。
* nightTab拡張機能をインストールします。
* 目的別にnightTabのインスタンスを作成します：仕事用、個人用、銀行用、サイドプロジェクト用など。
* JSONファイルをnightTabにインポートします。


## 活用例

* 仕事 - 同僚とブックマークを簡単に共有
  * 人事規則、ITサポートデスク、有休申請フォーム、クライアントポータルなどへのリンクを、新しい同僚に簡単に共有できます。
* 個人 - ブラウザを自由に切り替え
  * Chrome、Firefox、Edge間をブックマークを失わずに簡単に切り替えられます。
  * すべてのブックマークを検索して、必要なものを素早く見つけられます。
* 学生 - ブックマークの一括編集
  * JSONファイルでブックマークを一括編集して、新しい授業やプロジェクトのURLに合わせられます。
  * 現在の授業やプロジェクトに合わせて、ブックマークグループを簡単に移動できます。


## nightTabを使うヒント

`Add unique accent to each Bookmark`オプションを使うと、各ブックマークの色を簡単に設定できます。

* Theme -> Bookmark -> Bottom -> `Add unique accent to each Bookmark`

ChatGPTにJSONファイルを編集してもらい、各ブックマークの色やアイコンを自動的に提案させましょう。

* nightTabからJSONファイルをエクスポートします。
* ChatGPTにJSONファイルを編集して、各ブックマークの色やアイコンを提案するようプロンプトを送ります。
* JSONファイルの変更内容を確認します（VS Codeで元のJSONと編集後のJSONを比較）。
* 編集されたJSONファイルをnightTabにインポートします。


## 設定例


### Google製品スイート

さまざまなGoogle製品に素早くアクセスするためのnightTab設定です。

<!-- markdownlint-disable MD033 -->
<details>
  <summary>クリックして展開 <a href="../share/nighttab/google-bookmarks.json">google-bookmarks.json</a></summary>

<<< @/share/nighttab/google-bookmarks.json

</details>
<!-- markdownlint-enable MD033 -->

### 旅行

旅行関連のブックマークに素早くアクセスするためのnightTab設定です。

<!-- markdownlint-disable MD033 -->
<details>
  <summary>クリックして展開 <a href="../share/nighttab/travel-bookmarks.json">travel-bookmarks.json</a></summary>

<<< @/share/nighttab/travel-bookmarks.json

</details>
<!-- markdownlint-enable MD033 -->

### ストリーミングサービス

さまざまなストリーミングサービスに素早くアクセスするためのnightTab設定です。

<!-- markdownlint-disable MD033 -->
<details>
  <summary>クリックして展開 <a href="../share/nighttab/streaming-bookmarks.json">streaming-bookmarks.json</a></summary>

<<< @/share/nighttab/streaming-bookmarks.json

</details>
<!-- markdownlint-enable MD033 -->

## 参考リンク

* nightTabの設定をエクスポート・インポートする方法：
  * [Data backup and restore · zombieFox/nightTab Wiki · GitHub][backup-restore]
* 特定の背景動画や画像を使用する方法：
  * [Setting a background video or image · zombieFox/nightTab Wiki · GitHub][background]
* Firefoxユーザーの方へ：
  * [Setting nightTab as your Firefox homepage · zombieFox/nightTab Wiki · GitHub][firefox-homepage]
* 制限事項：
  * [`chrome://…`、`about:...`、`edge:...`のようなブラウザ内部リンクは開けません][protected-urls]
  * [画像をアップロードするネイティブ機能はありません][no-image]

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
