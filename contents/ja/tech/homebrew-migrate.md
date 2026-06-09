---
title: Homebrew を使って macOS アプリを移行する
description: Homebrew と Brewfile を使って macOS アプリケーションをエクスポート・インポートする方法です。
head:
  - - meta
    - name: keywords
      content: homebrew, macos, apps, brewfile, migrate, export, import, backup
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

Brew とも呼ばれる[Homebrew][homebrew]は、macOS でソフトウェアをインストール・管理するのにとても便利なツールです。リポジトリで**Brewfile**を管理することで、インストール済みのアプリケーションを簡単にエクスポート・インポートできます。

ここでは、Homebrew と Brewfile を使って、ある Mac から別の Mac に macOS アプリケーションを移行する方法を紹介します。

[homebrew]: https://brew.sh/


## ステップ 1：既存の Mac から Brewfile をエクスポートする

現在の Mac で、以下のコマンドを実行します。

```shell
brew bundle dump --describe --force --file=~/Brewfile
```

`brew bundle dump`コマンドは、インストール済みのすべての Homebrew パッケージと cask をリストした Brewfile をホームディレクトリに作成します。

* `--describe`：Brewfile にコメントを追加して分かりやすくします。
* `--force`：既存の Brewfile を上書きします。
* `--file=~/Brewfile`：Brewfile の保存先を指定します。_この場合、ホームディレクトリに保存されます。_


## ステップ 2：Brewfile を新しい Mac に転送する

**Brewfile**を AirDrop、USB ドライブ、またはクラウドストレージを使って新しい Mac にコピーします。


## ステップ 3：新しい Mac で Brewfile をインポートする

新しい Mac で、以下のコマンドを実行して Brewfile に記載されたすべてのアプリをインストールします。

```shell
brew bundle install --file=~/Brewfile
```

このコマンドは Brewfile を読み込み、指定されたすべてのアプリケーションとパッケージをインストールします。


## その他のヒント

* 新しい Mac にインポートする前に、Brewfile から不要なアプリを削除しましょう。
* Alfred ユーザーの方は、[Homebrew Search][alfred-homebrew-search]ワークフローを使うとアプリの検索とインストールが素早くできます。
* 定期的に Brewfile を更新して、インストール済みアプリケーションを把握しておきましょう。

[alfred-homebrew-search]: https://alfred.app/workflows/chrisgrieser/homebrew-search/
