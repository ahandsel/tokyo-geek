---
title: 'VS Code 向けコーディングフォント'
description: 'VS Code で使っているフォントの選び方、インストール、設定のガイドです。'
head:
  - - meta
    - name: keywords
      content: fonts, vscode, homebrew, monospace, fira code, hack nerd font, opendyslexic, hackgen, sarasa, ligatures, brewfile
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

等幅フォントを選ぶとコードが読みやすくなります。リガチャで演算子が整理され、追加グリフでアイコンが表示され、日本語対応のフォントなら英日混在の表も揃います。

お気に入りのフォント、[Homebrew][homebrew] での入れ方、VS Code でのフォールバック順をまとめます。


## フォント一覧

| フォント               | Homebrew cask                  | 向いている用途                                       |
| ---------------------- | ------------------------------ | ---------------------------------------------------- |
| Fira Code              | `font-fira-code`               | プログラミング用リガチャでコードが読みやすい         |
| Hack Nerd Font         | `font-hack-nerd-font`          | 開発者向けグリフとアイコンを足したパッチ済みフォント |
| OpenDyslexic Nerd Font | `font-open-dyslexic-nerd-font` | ディスレクシアに配慮した字形に Nerd Font アイコン    |
| HackGen Console        | `font-hackgen`                 | 英日混在の揃え - やや太め                            |
| Sarasa Mono J          | `font-sarasa-gothic`           | 英日混在の揃え - やや細め                            |


### Fira Code

* プログラミング用リガチャ付きの等幅フォントです。`=>`、`!=`、`>=` のような連続文字を 1 つの記号として描画します。元のテキストは ASCII のままです。


### Hack Nerd Font

* 作業用の等幅フォントに [Nerd Fonts][nerd-fonts] のグリフを足したパッチ版です。ターミナルやステータスバーのファイル種別アイコンやプロンプト記号が欠けません。


### OpenDyslexic Nerd Font

* 文字の下部を重くして文字の入れ替わりを減らす、ディスレクシアに配慮した書体です。Nerd Font アイコンも入っています。


### HackGen Console

* 全角の日本語が半角ラテン文字の 2 倍幅になる、日本語向け等幅フォントです。英語と日本語が混ざる Markdown の表が崩れません。やや太めです。迷ったらこれでよいです。


### Sarasa Mono J

* HackGen Console と同じ日本語揃えの利点があり、少し細く繊細な見た目です。


## Homebrew で入れる


### 方法 A: コマンドを直接実行する

使いたいフォントだけ Homebrew cask で入れます。

```shell
brew install --cask font-fira-code
brew install --cask font-hack-nerd-font
brew install --cask font-open-dyslexic-nerd-font
brew install --cask font-hackgen
brew install --cask font-sarasa-gothic
```

何度実行しても安全です。Homebrew は入っているものはスキップします。


### 方法 B: Brewfile

[Brewfile][brewfile] を使えば、フォントをまとめて入れられます。
Brewfile をマシンに保存して、次を実行します。

```shell
brew bundle install --file=./Brewfile
```

Brewfile の流れは [Homebrew で macOS アプリを移行する][migrate-macos-apps-homebrew] を参照してください。


### 入ったフォントを確認する

VS Code には、フォントの正確なファミリー名（次の出力でコロンの後ろ）が必要です。推測せずに調べます。

```shell
fc-list | grep -iE "fira|hack|dyslexic|sarasa"
```

参考までに、各フォントのファミリー名は次のとおりです。

| フォント               | VS Code でのファミリー名 |
| ---------------------- | ------------------------ |
| Fira Code              | `Fira Code`              |
| Hack Nerd Font         | `Hack Nerd Font`         |
| OpenDyslexic Nerd Font | `OpenDyslexic Nerd Font` |
| HackGen Console        | `HackGen Console`        |
| Sarasa Mono J          | `Sarasa Mono J`          |


## VS Code の設定

VS Code の設定は 2 層あります。


### ユーザー設定

* そのマシン上のすべてのプロジェクトに効きます。普段使いのフォント向きです。


### ワークスペース（プロジェクト）設定

* プロジェクトの `.vscode/settings.json` に置き、そのプロジェクト内だけに効きます。特定のリポジトリだけ別フォントにしたいとき（日本語の表が多いドキュメントリポジトリなど）や、設定をチームと共有したいときに使います。

同じキーではワークスペース設定がユーザー設定より優先されます。全体の既定を一度決めて、プロジェクトごとに上書きできます。

いちばん早い開き方は `Cmd+Shift+P` を押し、**Preferences: Open User Settings (JSON)** または **Preferences: Open Workspace Settings (JSON)** を実行することです。


### ユーザーレベル

すべてのファイルの既定エディタフォントを決めるには、ユーザーの `settings.json` に次を足します。

```jsonc
{
  "editor.fontFamily": "'Fira Code', monospace",
  "editor.fontLigatures": true
}
```

`editor.fontLigatures` は Fira Code のリガチャをオンにします。リガチャが要らないフォントでは省略するか `false` にします。


### プロジェクトレベル

1 つのプロジェクトだけ別フォントにする場合は、そのプロジェクトの `.vscode/settings.json` に書きます。次の例は Markdown ファイルだけ日本語向けフォントにし、ほかのファイルは普段のフォントのままにします。

```jsonc
{
  "[markdown]": {
    "editor.fontFamily": "'HackGen Console', 'Sarasa Mono J', monospace"
  }
}
```

`"[markdown]"` ブロックは言語別の上書きです。`"[python]"` や `"[go]"` に差し替えてほかの言語を対象にできます。すべてに効かせるならトップレベルで `editor.fontFamily` を設定します。


## フォントの優先順とフォールバック

`editor.fontFamily` はカンマ区切りのリストです。VS Code は、入っていて必要なグリフを持つ最初のフォントを使い、文字がなければ次に進みます。空白を含む名前は単一引用符で囲み、最後は必ず汎用の `monospace` にして最終フォールバックを残します。

```jsonc
{
  "editor.fontFamily": "'Fira Code', 'Hack Nerd Font', 'HackGen Console', monospace"
}
```

左から次の意味です。

1. **Fira Code** で、ほとんどのラテン文字のコードとリガチャを担当します。
2. **Hack Nerd Font** は、Fira Code にない Nerd Font アイコンを補います。
3. **HackGen Console** は、最初の 2 つにない日本語を担当します。
4. **`monospace`** は、上のどれも入っていないときのシステムフォールバックです。

補足です。

* いちばん使いたいフォントを先頭に置きます。全体の見た目は先頭で決まり、後続は欠けたグリフだけを補います。
* 必ず `monospace`（または `monospace, sans-serif`）で終えます。名前付きフォントを入れる前でもエディタが使えます。
* 幅の違うフォントを混ぜると列がずれます。揃えた Markdown 表に頼るなら、英語と日本語の両方をカバーする 1 フォント（HackGen Console や Sarasa Mono J）を先頭にしてください。

フォントを変えたら、VS Code を再読み込みします（`Cmd+Shift+P` のあと **Developer: Reload Window**、または開き直す）と反映されます。


## 参考

* [Visual Studio Code - editor.fontFamily setting][vscode-fonts]
* [Nerd Fonts][nerd-fonts]
* [Homebrew Cask Fonts][homebrew]

<!-- Links -->

[brewfile]: /Brewfile
[homebrew]: https://brew.sh/
[migrate-macos-apps-homebrew]: homebrew-migrate.md
[nerd-fonts]: https://www.nerdfonts.com/
[vscode-fonts]: https://code.visualstudio.com/docs/editor/settings
