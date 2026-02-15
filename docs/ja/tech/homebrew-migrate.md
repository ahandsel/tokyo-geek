---
title: Homebrewを使ってmacOSアプリを移行する
description: HomebrewとBrewfileを使ってmacOSアプリケーションをエクスポート・インポートする方法です。
head:
  - - meta
    - name: keywords
      content: homebrew, macos, apps, brewfile, migrate, export, import, backup
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

Brewとも呼ばれる[Homebrew][homebrew]は、macOSでソフトウェアをインストール・管理するのにとても便利なツールです。リポジトリで**Brewfile**を管理することで、インストール済みのアプリケーションを簡単にエクスポート・インポートできます。

ここでは、HomebrewとBrewfileを使って、あるMacから別のMacにmacOSアプリケーションを移行する方法を紹介します。

[homebrew]: https://brew.sh/


## ステップ1：既存のMacからBrewfileをエクスポートする

現在のMacで、以下のコマンドを実行します。

```shell
brew bundle dump --describe --force --file=~/Brewfile
```

`brew bundle dump`コマンドは、インストール済みのすべてのHomebrewパッケージとcaskをリストしたBrewfileをホームディレクトリに作成します。

* `--describe`：Brewfileにコメントを追加して分かりやすくします。
* `--force`：既存のBrewfileを上書きします。
* `--file=~/Brewfile`：Brewfileの保存先を指定します。_この場合、ホームディレクトリに保存されます。_


## ステップ2：Brewfileを新しいMacに転送する

**Brewfile**をAirDrop、USBドライブ、またはクラウドストレージを使って新しいMacにコピーします。


## ステップ3：新しいMacでBrewfileをインポートする

新しいMacで、以下のコマンドを実行してBrewfileに記載されたすべてのアプリをインストールします。

```shell
brew bundle install --file=~/Brewfile
```

このコマンドはBrewfileを読み込み、指定されたすべてのアプリケーションとパッケージをインストールします。


## その他のヒント

* 新しいMacにインポートする前に、Brewfileから不要なアプリを削除しましょう。
* Alfredユーザーの方は、[Homebrew Search][alfred-homebrew-search]ワークフローを使うとアプリの検索とインストールが素早くできます。
* 定期的にBrewfileを更新して、インストール済みアプリケーションを把握しておきましょう。

[alfred-homebrew-search]: https://alfred.app/workflows/chrisgrieser/homebrew-search/
