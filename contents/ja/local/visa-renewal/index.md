---
title: Mac での日本のビザオンライン更新方法
description: Mac を使って日本のビザをオンラインで更新する手順をまとめたガイドです。
order: 1
head:
  - - meta
    - name: keywords
      content: visa-renewal, mac, windows-vm, my-number-card, jpki
localization: sync
---

# Mac での日本のビザオンライン更新方法

これは今までやった中でもかなり面倒な手続きでした。
正直なところ、直接窓口に行く方が簡単かもしれません。

自分がどうやったかの簡単な記録です。誰かの参考になれば幸いです。

> [!WARNING]
> JPKI アプリは macOS ではビザ更新に使えません！Windows 仮想マシン (VM) が必要です！

[[toc]]


## 準備


### マイナンバーカード

[マイナンバーカード オンライン申請](https://www.kojinbango-card.go.jp/en-mynumber/)にアクセスして、マイナンバーカードをお持ちでない場合は申請してください。紙の通知カードではなく、IC チップと写真付きの物理カードが必要です。


### 対応する IC カードリーダーを入手する

友人に借りるか、Amazon で購入しましょう。

[マイナンバーカード対応 IC カードリーダライタの一覧](https://www.jpki.go.jp/prepare/pdf/num_rwlist11.pdf)

> [!TIP]
> Android スマートフォンをお持ちの場合は、[JPKI 利用者ソフト](https://play.google.com/store/apps/details?id=jp.go.jpki.mobile.utility&pcampaignid=web_share)アプリをインストールして、IC カードリーダーとして使うこともできます。


### Windows 仮想マシン (VM) を準備する

Mac 上で直接使おうとしましたが、JPKI アプリは macOS では動きませんでした。

Windows VM 用に Mac を準備しましょう。

* Mac に VM を動かすのに十分なディスク容量と RAM があることを確認してください。
* 最低 30 GB のディスク容量と 8 GB の RAM が必要です。
* MacBook Pro がおすすめですが、他のアプリをすべて閉じて外付けファンで冷却すれば、MacBook Air でも動作可能です。
* ディスク容量や RAM が不足していると、Windows VM がクラッシュします。

UTM と Parallels Desktop のどちらを選ぶ？

* UTM と Parallels Desktop の両方を試しましたが、どちらも動作しました。
* Parallels Desktop の方がセットアップは少し簡単でしたが、100 ドルの費用に見合うほどではありませんでした。
* UTM は無料でオープンソースですが、セットアップがやや複雑です。
* 予備知識なしの状態で、UTM のセットアップに 3 時間、Parallels Desktop に 2 時間かかりました。
  * _残念ながら、私の時給は 100 ドルではありません。_

> [!CAUTION]
> Mac の RAM（8 GB 以上）とディスク容量（30 GB 以上）が十分にあることを確認してください。不足するとクラッシュします！


#### 方法 1：UTM - 無料でオープンソース

UTM とは？

* UTM は、Mac 上で仮想マシン (VM) を実行できる無料のオープンソース仮想化ソフトウェアです。
* QEMU ベースで、VM の作成と管理ができるわかりやすいインターフェイスを提供しています。
* まずこの[YouTube の動画チュートリアル](https://www.youtube.com/watch?v=hdddzyIPasU)を見てから設定すると、スムーズにセットアップできます。

UTM に Windows 11 をインストールする手順の概要：

1. [UTM](https://mac.getutm.app/)をインストールして、Mac 上で Windows VM を実行します。
   * 選択肢 1：[公式サイトからダウンロード](https://mac.getutm.app/) - 完全に無料でオープンソースです。
   * 選択肢 2：[Mac App Store で購入](https://apps.apple.com/app/utm-virtual-machines/id1538878817)（$9.99）で開発者を支援。
     * App Store 版はアップデートと管理が簡単ですが、[公式 Microsoft サイト](https://www.microsoft.com/software-download/windows11)から無料版をダウンロードすることもできます。
2. Windows 11 の ISO ファイルをダウンロード - [CrystalFetch][]を使うか、Microsoft から直接ダウンロードします。
   * [Mac App Store の CrystalFetch][crystalfetch-app-store]を使って最新の Windows 11 ISO をダウンロードしました。
   * Windows 11 Home Edition の ISO を英語でダウンロードしましたが、後で言語設定を日本語に変更する必要がありました。
3. UTM で新しい VM を作成し、Windows 11 の ISO ファイルを設定します。
   * UTM を開き、「+」をクリックして新しい VM を作成します。
   * 「Virtualize」を選択し、「Windows」を選びます。
   * ダウンロードした Windows 11 の ISO ファイルをブートディスクとして選択します。
   * VM に最低 8 GB の RAM と 30 GB のディスク容量を割り当てます。
     * _8000 MiB は 8.39 GB です_
   * 「Create」をクリックして VM のセットアップを完了します。
4. VM を起動し、Windows のインストールウィザードに従います。
   * VM 起動直後に「Enter」キーをすぐに押して、ISO ファイルからブートします。
   * 画面の指示に従って Windows 11 をインストールします。

詳しい手順は[UTM 公式ドキュメントの Windows 11 インストールガイド](https://docs.getutm.app/guides/windows/)をご覧ください。

[CrystalFetch]: https://github.com/TuringSoftware/CrystalFetch
[crystalfetch-app-store]: https://apps.apple.com/app/crystalfetch-iso-downloader/id6454431289


#### 方法 2：Parallels Desktop - 有料だが簡単

[Parallels Desktop](https://www.parallels.com/products/desktop/trial/)をインストールして、Mac 上で Windows VM を実行します。

* すべての Mac で 14 日間の無料トライアルが利用できます。
* トライアル終了後は、サブスクリプションの購入が必要です（約 100 ドル、またはセール時を待ちましょう）。

Parallels Desktop に Windows 11 をインストール：

* 安定したインターネット接続があることを確認してください。
* インストール中は Mac を電源に接続し、スリープさせないでください。


#### Windows 11 のライセンスキーは不要

ビザの更新だけなら Windows 11 のライセンスキーは不要です。試用版で十分です。


#### オプション：Microsoft アカウントなしでセットアップ

Microsoft アカウントを使いたくなかったので、コマンドプロンプトを開いて以下のコマンドを実行し、Windows セットアップ中の Microsoft アカウントログインをバイパスしました。

* コマンドプロンプトを開くには、Windows セットアップ中に`fn` + `SHIFT` + `F10`を押します。
* コマンドプロンプトで次のコマンドを実行します：`start ms-cxh:localonly`


#### 言語と地域の設定を日本語に変更する {#change-language-and-region-settings-to-japanese}

> [!TIP]
> すでに Windows パソコンをお持ちの方は、ここから始められます。

ご想像の通り、これは日本の政府が作ったソフトウェアです。Windows 上で動かすだけでなく、正しく動作するには言語と地域の設定を日本語に変更する必要があります。

1. Windows の`Unicode対応でないプログラムの言語`設定を日本語に変更します。
   * `コントロールパネル` > `地域` > `管理`タブに移動します。
   * `システムロケールの変更...`をクリックし、`日本語 (日本)`を選択します。
   * 変更を適用し、コンピューターを再起動します。
   * ![windows-non-unicode-programs-settings.png](/windows-non-unicode-programs-settings.png)

2. 言語と地域の設定を日本語に変更します。
   * `設定` > `時刻と言語` > `言語` > `優先する言語`に移動します。
   * `言語の追加`をクリックして`日本語`を選択します。
   * 日本語の言語パックをインストールします。
   * 表示言語として設定します。
   * 変更を適用し、コンピューターを再起動します。
   * ![windows-language-settings.png](/windows-language-settings.png)


### この動画チュートリアルを見る

続ける前に、こちらの動画チュートリアルをご覧ください。

* [日本在留資格オンライン申請（在留資格线上申請） - YouTube](https://www.youtube.com/watch?v=IWJOFH99NpM)

動画は中国語ですが、Windows 上での JPKI アプリのセットアップからビザ更新までの流れが最もわかりやすく説明されているため、ぜひご覧になることをおすすめします。


### Windows に JPKI アプリと Java をインストールする

Windows を日本語設定にした後、以下をインストールします。

* [JPKI アプリ（JPKI 利用者ソフト）](https://www.jpki.go.jp/download/win.html)
* [最新の Java アップデート（Java8 Update 371）](https://www.java.com/en/download/)
  * パッケージマネージャーではなく、直接ダウンロードしてください。
  * 「JRE」や「Java Runtime Environment」は Java のことです。
* [利用者クライアントソフト Edge/Chrome - Chrome ウェブストア](https://chromewebstore.google.com/detail/%E5%88%A9%E7%94%A8%E8%80%85%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%BD%E3%83%95%E3%83%88-edgechrome/ddhaancdmkmeigppopkakhpbboccibla?hl=ja)

アプリを管理者として実行し、バックグラウンドでの実行を許可してください。

* アプリのショートカットまたは実行ファイルを右クリックして、コンテキストメニューから「管理者として実行」を選択します。
* ![windows-run-as-admin-settings.png](/windows-run-as-admin-settings.png)

> [!WARNING]
> Java を先にインストールし、その後で JPKI アプリをインストールしてください。順番が重要です。


#### JPKI アプリのインストール確認

JPKI アプリ（`JPKI利用者ソフト`）を開き、エラーなく動作することを確認します。

> [!TIP]
> インストール後に VM を保存してスナップショットを取りましょう。JPKI アプリと Java のインストール後に VM を再起動することもおすすめです。


### オンラインビザ更新

JPKI アプリと Java のインストールが完了したら、オンラインでのビザ更新手続きに進めます。

1. 出入国在留管理庁の[在留申請オンラインシステム](https://www.moj.go.jp/isa/applications/online/onlineshinsei.html?hl=en)のウェブページを開きます。
2. `在留申請オンラインシステムのご利用はこちらから。（在留申請オンラインシステムのトップページへリンクします。）`と書かれた緑色の大きなボタンをクリックします。
   * `https://www.ras-immi.moj.go.jp/WC01/WCAAS010/`
   * ![ビザのホームページのボタンをハイライトしたスクリーンショット](/visa-renewal/visa-website-button.png)


## トラブルシューティング

Windows VM のセットアップ、JPKI アプリのインストールと使用中に遭遇した問題と、その解決方法をまとめました。


### Windows VM の問題

* 問題：Windows インストーラーの代わりに`UEFI Iterative Shell v2.2`の黒い画面が表示される。
  * 状況：Windows VM を初めて起動したとき、Windows のインストールウィザードではなく、`UEFI Iterative Shell v2.2`の黒い画面が表示される。
  * 原因：Windows ブート ISO イメージファイルからのブート時に`Enter`キーを押し忘れました。VM のシェル画面が表示されています。
  * 解決方法：Windows VM を再起動し、起動直後に`Enter`キーをすぐに押してください。
  * ![UEFI Iterative Shell v2.2 画面のスクリーンショット](/visa-renewal/windows-black-shell.png)

* 問題：VM がクラッシュまたはフリーズする。
  * 原因：ディスク容量または RAM の不足。
  * 解決方法：30 GB のディスク容量と 8 GB の RAM を割り当ててください。


### JPKI 利用者ソフト実行時のエラーメッセージが文字化けする

問題：JPKI のインストーラーを実行しようとすると、以下のような文字化けしたエラーメッセージが表示されることがあります。

* ![JPKI 利用者ソフト実行時の文字化けエラーメッセージ](/visa-renewal/jpki-broken-error.png)

原因：JPKI アプリは Unicode 非対応の文字を使用しており、Windows の`Unicode対応でないプログラムの言語`が日本語に設定されていません（日本人でもこの設定をしていない人がいるかもしれません...）。

解決方法：上記の[言語と地域の設定を日本語に変更する](#change-language-and-region-settings-to-japanese)セクションの手順に従ってください。


### JPKI 利用者ソフトの EW000J0200 エラー

JPKI 利用者ソフトの実行時に以下のエラーが表示されることがあります。

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

* ![利用者クライアントソフトエラー エラーコード：EW000J0200 のスクリーンショット](/visa-renewal/jpki-reader-error.png)

考えられる原因：

* マイナンバーカードリーダーが Windows VM に接続されていない - Mac に接続していないか、USB デバイスが VM にパススルーされていない可能性があります。
* マイナンバーカードが IC カードリーダーに正しく挿入されていない。
* JPKI アプリが正しくインストールされていないか、管理者として実行されていない。

解決方法：

* マイナンバーカードが IC カードリーダーに正しく挿入されていることを確認してください（チップがリーダーに接触していること）。
* IC カードリーダーが Mac に接続されていることを確認してください - 一度抜いて再接続してみましょう。
* IC カードリーダーが Windows VM にパススルーされていることを確認してください - UTM または Parallels Desktop アプリを再起動し、VM の設定を確認してください。
* JPKI アプリが正しくインストールされ、管理者として実行されていることを確認してください。


### JPKI 利用者ソフトの EW104J1502 エラー

JPKI 利用者ソフトの実行時に以下のエラーが表示されることがあります。

```txt
利用者クライアントソフトエラー

カードとの通信中にエラーが発生しました。
エラーコード：EW104J1502
エラー詳細：0x00000006
```

英語訳：

```txt
User Client Software Error

An error occurred while communicating with the card.
Error code: EW104J1502
Error details: 0x00000006
```

* ![JPKI 利用者ソフトの EW104J1502 エラー](/visa-renewal/jpki-error-ew104j1502.png)

考えられる原因：

* マイナンバーカードが IC カードリーダーに正しく挿入されていない（チップがリーダーに接触していること）。
* IC カードリーダーが Mac に接続されていない - 一度抜いて再接続してみましょう。
* IC カードリーダーが Windows VM にパススルーされていない - UTM または Parallels Desktop アプリを再起動し、VM の設定を確認してください。
* 問題が解決しない場合は、カードリーダーを挿し直すか、以下のセクションで説明するドライバーを手動でダウンロードしてみてください。


## 参考資料

* [日本のビザ更新（オンライン・窓口）ガイド - Tokyo Cheapo](https://tokyocheapo.com/living/renew-visa-online-japan/)
* [マイナンバーカードのご用意 | 公的個人認証サービス ポータルサイト](https://www.jpki.go.jp/prepare/juki.html)
