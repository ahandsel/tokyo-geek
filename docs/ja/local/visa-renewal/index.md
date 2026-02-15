---
title: Macでの日本のビザオンライン更新方法
description: Macを使って日本のビザをオンラインで更新する手順をまとめたガイドです。
order: 1
head:
  - - meta
    - name: keywords
      content: visa-renewal, mac, windows-vm, my-number-card, jpki
---

# Macでの日本のビザオンライン更新方法

これは今までやった中でもかなり面倒な手続きでした。
正直なところ、直接窓口に行く方が簡単かもしれません。

自分がどうやったかの簡単な記録です。誰かの参考になれば幸いです。

> [!WARNING]
> JPKIアプリはmacOSではビザ更新に使えません！Windows仮想マシン (VM) が必要です！

[[toc]]


## 準備


### マイナンバーカード

[マイナンバーカード オンライン申請](https://www.kojinbango-card.go.jp/en-mynumber/)にアクセスして、マイナンバーカードをお持ちでない場合は申請してください。紙の通知カードではなく、ICチップと写真付きの物理カードが必要です。


### 対応するICカードリーダーを入手する

友人に借りるか、Amazonで購入しましょう。

[マイナンバーカード対応ICカードリーダライタの一覧](https://www.jpki.go.jp/prepare/pdf/num_rwlist11.pdf)

> [!TIP]
> Androidスマートフォンをお持ちの場合は、[JPKI利用者ソフト](https://play.google.com/store/apps/details?id=jp.go.jpki.mobile.utility&pcampaignid=web_share)アプリをインストールして、ICカードリーダーとして使うこともできます。


### Windows仮想マシン (VM) を準備する

Mac上で直接使おうとしましたが、JPKIアプリはmacOSでは動きませんでした。

Windows VM用にMacを準備しましょう。

* MacにVMを動かすのに十分なディスク容量とRAMがあることを確認してください。
* 最低30 GBのディスク容量と8 GBのRAMが必要です。
* MacBook Proがおすすめですが、他のアプリをすべて閉じて外付けファンで冷却すれば、MacBook Airでも動作可能です。
* ディスク容量やRAMが不足していると、Windows VMがクラッシュします。

UTMとParallels Desktopのどちらを選ぶ？

* UTMとParallels Desktopの両方を試しましたが、どちらも動作しました。
* Parallels Desktopの方がセットアップは少し簡単でしたが、100ドルの費用に見合うほどではありませんでした。
* UTMは無料でオープンソースですが、セットアップがやや複雑です。
* 予備知識なしの状態で、UTMのセットアップに3時間、Parallels Desktopに2時間かかりました。
  * _残念ながら、私の時給は100ドルではありません。_

> [!CAUTION]
> MacのRAM（8 GB以上）とディスク容量（30 GB以上）が十分にあることを確認してください。不足するとクラッシュします！


#### 方法1：UTM - 無料でオープンソース

UTMとは？

* UTMは、Mac上で仮想マシン (VM) を実行できる無料のオープンソース仮想化ソフトウェアです。
* QEMUベースで、VMの作成と管理ができるわかりやすいインターフェイスを提供しています。
* まずこの[YouTubeの動画チュートリアル](https://www.youtube.com/watch?v=hdddzyIPasU)を見てから設定すると、スムーズにセットアップできます。

UTMにWindows 11をインストールする手順の概要：

1. [UTM](https://mac.getutm.app/)をインストールして、Mac上でWindows VMを実行します。
   * 選択肢1：[公式サイトからダウンロード](https://mac.getutm.app/) - 完全に無料でオープンソースです。
   * 選択肢2：[Mac App Storeで購入](https://apps.apple.com/app/utm-virtual-machines/id1538878817)（$9.99）で開発者を支援。
     * App Store版はアップデートと管理が簡単ですが、[公式Microsoftサイト](https://www.microsoft.com/software-download/windows11)から無料版をダウンロードすることもできます。
2. Windows 11のISOファイルをダウンロード - [CrystalFetch][]を使うか、Microsoftから直接ダウンロードします。
   * [Mac App StoreのCrystalFetch][crystalfetch-app-store]を使って最新のWindows 11 ISOをダウンロードしました。
   * Windows 11 Home EditionのISOを英語でダウンロードしましたが、後で言語設定を日本語に変更する必要がありました。
3. UTMで新しいVMを作成し、Windows 11のISOファイルを設定します。
   * UTMを開き、「+」をクリックして新しいVMを作成します。
   * 「Virtualize」を選択し、「Windows」を選びます。
   * ダウンロードしたWindows 11のISOファイルをブートディスクとして選択します。
   * VMに最低8 GBのRAMと30 GBのディスク容量を割り当てます。
     * _8000 MiBは8.39 GBです_
   * 「Create」をクリックしてVMのセットアップを完了します。
4. VMを起動し、Windowsのインストールウィザードに従います。
   * VM起動直後に「Enter」キーをすぐに押して、ISOファイルからブートします。
   * 画面の指示に従ってWindows 11をインストールします。

詳しい手順は[UTM公式ドキュメントのWindows 11インストールガイド](https://docs.getutm.app/guides/windows/)をご覧ください。

[CrystalFetch]: https://github.com/TuringSoftware/CrystalFetch
[crystalfetch-app-store]: https://apps.apple.com/app/crystalfetch-iso-downloader/id6454431289


#### 方法2：Parallels Desktop - 有料だが簡単

[Parallels Desktop](https://www.parallels.com/products/desktop/trial/)をインストールして、Mac上でWindows VMを実行します。

* すべてのMacで14日間の無料トライアルが利用できます。
* トライアル終了後は、サブスクリプションの購入が必要です（約100ドル、またはセール時を待ちましょう）。

Parallels DesktopにWindows 11をインストール：

* 安定したインターネット接続があることを確認してください。
* インストール中はMacを電源に接続し、スリープさせないでください。


#### Windows 11のライセンスキーは不要

ビザの更新だけならWindows 11のライセンスキーは不要です。試用版で十分です。


#### オプション：Microsoftアカウントなしでセットアップ

Microsoftアカウントを使いたくなかったので、コマンドプロンプトを開いて以下のコマンドを実行し、Windowsセットアップ中のMicrosoftアカウントログインをバイパスしました。

* コマンドプロンプトを開くには、Windowsセットアップ中に`fn` + `SHIFT` + `F10`を押します。
* コマンドプロンプトで次のコマンドを実行します：`start ms-cxh:localonly`


#### 言語と地域の設定を日本語に変更する {#change-language-and-region-settings-to-japanese}

> [!TIP]
> すでにWindowsパソコンをお持ちの方は、ここから始められます。

ご想像の通り、これは日本の政府が作ったソフトウェアです。Windows上で動かすだけでなく、正しく動作するには言語と地域の設定を日本語に変更する必要があります。

1. Windowsの`Unicode対応でないプログラムの言語`設定を日本語に変更します。
   * `コントロールパネル` > `地域` > `管理`タブに移動します。
   * `システムロケールの変更...`をクリックし、`日本語 (日本)`を選択します。
   * 変更を適用し、コンピューターを再起動します。
   * ![windows-non-unicode-programs-settings.png](/public/windows-non-unicode-programs-settings.png)

2. 言語と地域の設定を日本語に変更します。
   * `設定` > `時刻と言語` > `言語` > `優先する言語`に移動します。
   * `言語の追加`をクリックして`日本語`を選択します。
   * 日本語の言語パックをインストールします。
   * 表示言語として設定します。
   * 変更を適用し、コンピューターを再起動します。
   * ![windows-language-settings.png](/public/windows-language-settings.png)


### この動画チュートリアルを見る

続ける前に、こちらの動画チュートリアルをご覧ください。

* [日本在留資格オンライン申請（在留資格线上申請） - YouTube](https://www.youtube.com/watch?v=IWJOFH99NpM)

動画は中国語ですが、Windows上でのJPKIアプリのセットアップからビザ更新までの流れが最もわかりやすく説明されているため、ぜひご覧になることをおすすめします。


### WindowsにJPKIアプリとJavaをインストールする

Windowsを日本語設定にした後、以下をインストールします。

* [JPKIアプリ（JPKI利用者ソフト）](https://www.jpki.go.jp/download/win.html)
* [最新のJavaアップデート（Java8 Update 371）](https://www.java.com/en/download/)
  * パッケージマネージャーではなく、直接ダウンロードしてください。
  * 「JRE」や「Java Runtime Environment」はJavaのことです。
* [利用者クライアントソフト Edge/Chrome - Chrome ウェブストア](https://chromewebstore.google.com/detail/%E5%88%A9%E7%94%A8%E8%80%85%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%BD%E3%83%95%E3%83%88-edgechrome/ddhaancdmkmeigppopkakhpbboccibla?hl=ja)

アプリを管理者として実行し、バックグラウンドでの実行を許可してください。

* アプリのショートカットまたは実行ファイルを右クリックして、コンテキストメニューから「管理者として実行」を選択します。
* ![windows-run-as-admin-settings.png](/public/windows-run-as-admin-settings.png)

> [!WARNING]
> Javaを先にインストールし、その後でJPKIアプリをインストールしてください。順番が重要です。


#### JPKIアプリのインストール確認

JPKIアプリ（`JPKI利用者ソフト`）を開き、エラーなく動作することを確認します。

> [!TIP]
> インストール後にVMを保存してスナップショットを取りましょう。JPKIアプリとJavaのインストール後にVMを再起動することもおすすめです。


### オンラインビザ更新

JPKIアプリとJavaのインストールが完了したら、オンラインでのビザ更新手続きに進めます。

1. 出入国在留管理庁の[在留申請オンラインシステム](https://www.moj.go.jp/isa/applications/online/onlineshinsei.html?hl=en)のウェブページを開きます。
1. `在留申請オンラインシステムのご利用はこちらから。（在留申請オンラインシステムのトップページへリンクします。）`と書かれた緑色の大きなボタンをクリックします。
   * `https://www.ras-immi.moj.go.jp/WC01/WCAAS010/`
   * ![ビザのホームページのボタンをハイライトしたスクリーンショット](/visa-renewal/img-visa-website-button.png)


## トラブルシューティング

Windows VMのセットアップ、JPKIアプリのインストールと使用中に遭遇した問題と、その解決方法をまとめました。


### Windows VMの問題

* 問題：Windowsインストーラーの代わりに`UEFI Iterative Shell v2.2`の黒い画面が表示される。
  * 状況：Windows VMを初めて起動したとき、Windowsのインストールウィザードではなく、`UEFI Iterative Shell v2.2`の黒い画面が表示される。
  * 原因：WindowsブートISOイメージファイルからのブート時に`Enter`キーを押し忘れました。VMのシェル画面が表示されています。
  * 解決方法：Windows VMを再起動し、起動直後に`Enter`キーをすぐに押してください。
  * ![UEFI Iterative Shell v2.2画面のスクリーンショット](/visa-renewal/img-windows-black-shell.png)

* 問題：VMがクラッシュまたはフリーズする。
  * 原因：ディスク容量またはRAMの不足。
  * 解決方法：30 GBのディスク容量と8 GBのRAMを割り当ててください。


### JPKI利用者ソフト実行時のエラーメッセージが文字化けする

問題：JPKIのインストーラーを実行しようとすると、以下のような文字化けしたエラーメッセージが表示されることがあります。

* ![JPKI利用者ソフト実行時の文字化けエラーメッセージ](/visa-renewal/img-jpki-broken-error.png)

原因：JPKIアプリはUnicode非対応の文字を使用しており、Windowsの`Unicode対応でないプログラムの言語`が日本語に設定されていません（日本人でもこの設定をしていない人がいるかもしれません...）。

解決方法：上記の[言語と地域の設定を日本語に変更する](#change-language-and-region-settings-to-japanese)セクションの手順に従ってください。


### JPKI利用者ソフトのEW000J0200エラー

JPKI利用者ソフトの実行時に以下のエラーが表示されることがあります。

```txt
利用者クライアントソフトエラー
...
エラーコード：EW000J0200
```

英語訳：

```txt
User Client Software Error
...
Error code: EW000J0200
```

* ![利用者クライアントソフトエラー エラーコード：EW000J0200のスクリーンショット](/visa-renewal/img-jpki-reader-error.png)

考えられる原因：

* マイナンバーカードリーダーがWindows VMに接続されていない - Macに接続していないか、USBデバイスがVMにパススルーされていない可能性があります。
* マイナンバーカードがICカードリーダーに正しく挿入されていない。
* JPKIアプリが正しくインストールされていないか、管理者として実行されていない。

解決方法：

* マイナンバーカードがICカードリーダーに正しく挿入されていることを確認してください（チップがリーダーに接触していること）。
* ICカードリーダーがMacに接続されていることを確認してください - 一度抜いて再接続してみましょう。
* ICカードリーダーがWindows VMにパススルーされていることを確認してください - UTMまたはParallels Desktopアプリを再起動し、VMの設定を確認してください。
* JPKIアプリが正しくインストールされ、管理者として実行されていることを確認してください。


### JPKI利用者ソフトのEW104J1502エラー

JPKI利用者ソフトの実行時に以下のエラーが表示されることがあります。

```txt
利用者クライアントソフトエラー

カードとの通信中にエラーが発生しました。
エラーコード： EW104J1502
エラー詳細：0x00000006
```

英語訳：

```txt
User Client Software Error

An error occurred while communicating with the card.
Error code: EW104J1502
Error details: 0x00000006
```

* ![JPKI利用者ソフトのEW104J1502エラー](/visa-renewal/img-jpki-error-ew104j1502.png)

考えられる原因：

* マイナンバーカードがICカードリーダーに正しく挿入されていない（チップがリーダーに接触していること）。
* ICカードリーダーがMacに接続されていない - 一度抜いて再接続してみましょう。
* ICカードリーダーがWindows VMにパススルーされていない - UTMまたはParallels Desktopアプリを再起動し、VMの設定を確認してください。
* 問題が解決しない場合は、カードリーダーを挿し直すか、以下のセクションで説明するドライバーを手動でダウンロードしてみてください。


## 参考資料

* [日本のビザ更新（オンライン・窓口）ガイド - Tokyo Cheapo](https://tokyocheapo.com/living/renew-visa-online-japan/)
* [マイナンバーカードのご用意 | 公的個人認証サービス ポータルサイト](https://www.jpki.go.jp/prepare/juki.html)
