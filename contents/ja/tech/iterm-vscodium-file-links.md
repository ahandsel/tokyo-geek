---
title: iTerm2のfile:lineリンクをVSCodiumで開く
description: iTerm2でCmd-クリックしたfile:line:columnのパスを、VSCodiumの正しい行と列で開く方法です。
head:
  - - meta
    - name: keywords
      content: iterm2, vscodium, codium, semantic history, macos, terminal, editor, line number
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}


## 問題

[iTerm2][iterm2]で`notes/todo.md:12`のようなパスをCmd-クリックするとVSCodiumが開きますが、12行目に移動せず、`notes/todo.md:12`という名前の空のファイルが新規作成されます。


## 原因

Cmd-クリックしたパスをどう開くかは、iTerm2の**Semantic History**で決まります。

* デフォルトの**Open with default app**は、テキストをそのままmacOSの`open`に渡します。`open`は行番号を解釈しないため、文字列全体がファイル名として扱われます。
* **Open with editor**はVS CodeやSublime Textなどの「指定行へ移動」フラグに対応していますが、[VSCodium][vscodium]は一覧にありません。


## 解決方法

iTerm2から直接`codium --goto`を実行するように設定します。

1. `which codium`を実行して、VSCodiumのコマンドラインツールのフルパスを確認します（例：`/usr/local/bin/codium`）。
2. **iTerm2**→**Settings**→**Profiles**→使用中のプロファイル→**Advanced**を開きます。
3. **Semantic History**で**Run command...**を選択します。
4. 以下を貼り付けます。パスが異なる場合は`/usr/local/bin/codium`を置き換えてください。

```shell
f="\(semanticHistory.path)"
l="\(semanticHistory.lineNumber)"
c="\(semanticHistory.columnNumber)"
if [ -n "$c" ]; then /usr/local/bin/codium -g "$f:$l:$c"; elif [ -n "$l" ]; then /usr/local/bin/codium -g "$f:$l"; else /usr/local/bin/codium "$f"; fi
```

設定後は、Cmd-クリックしたパスが次のように開きます。

| クリックしたテキスト | 結果                        |
| -------------------- | --------------------------- |
| `notes/todo.md:12:5` | 12行目の5文字目で開きます。 |
| `notes/todo.md:12`   | 12行目で開きます。          |
| `notes/todo.md`      | ファイルを開きます。        |


## 補足

* `-g`（`--goto`）は`file:line[:character]`の形式を受け付けます。VS Codeの`code`コマンドも同じフラグに対応しています。
* iTerm2はコマンドを実行する前に`\(semanticHistory.*)`の変数を置き換えます。パスはターミナルの作業ディレクトリを基準に解決されるため、相対パスも使えます。
* iTerm2はコマンド実行時にシェルの`PATH`を読み込まないため、`codium`はフルパスで指定してください。
* 実際のハイパーリンク（OSC 8、`file://...`）として出力されたリンクはSemantic HistoryではなくmacOSのURLハンドラーで開かれるため、この設定は適用されません。

<!-- Links -->

[iterm2]: https://iterm2.com/
[vscodium]: https://vscodium.com/
