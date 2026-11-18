---
title: 'SoftBankからY!mobileへのeSIMオンライン乗り換えガイド'
description: 'SoftBankからY!mobileへeSIMでオンライン番号移行する手順、費用、注意点をまとめたガイドです。'
head:
  - - meta
    - name: keywords
      content: softbank, ymobile, 番号移行，mnp, esim, paypayカード，おうち割，光セット
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]


## 概要

SoftBankからY!mobileへの移行は、一般的な`他社MNP`ではなく、SoftBankグループ内の`番号移行`として扱われます。`MNP予約番号`を取得する必要はありません。Y!mobile公式も、SoftBankまたはLINEMOからの番号移行ではMNP予約番号の発行は不要と案内しています。Y!mobileで回線の切り替え（開通）が完了した時点で、SoftBank側の旧回線は自動で解約されます。

eSIMの場合、オンラインでの流れは大きく次のとおりです。

1. 事前確認
2. Y!mobileオンライン申込
3. eSIMの開通と回線切替
4. 初期設定
5. 割引の適用と特典の確認

eSIMは最短当日から使えます。


## オンラインでの移行手順


### 事前確認

申し込む前に、次の3点を確認します。

* **端末の対応状況**
* **SIMロックの状態**
* **契約情報**（端末の残債、日割りの有無、割引の終了など）

**端末の対応状況を確認する**
使い続ける端末がY!mobileのeSIMに対応しているかを、Y!mobileの[動作確認端末ページ][ymobile-devices]（`SIM動作確認済み機種検索`）で確認します。端末がeSIMに対応していることに加え、初期設定時にWi-Fi環境が必要です。

**SIMロックの状態を確認する**
SoftBankで購入した端末の場合、Y!mobileはeSIMの初期設定前に`My SoftBank`で`SIMロック解除`を済ませるよう案内しています。2015年4月以前に発売されたSoftBank端末はSIMロック解除ができないため、Y!mobileでは使えません。Y!mobileの[SIMロック解除ページ][ymobile-unlock]に、各社の手続き方法へのリンクがあります。

**契約情報を確認する**
SoftBank側で、分割払いの残債、日割りの有無、割引終了の影響を確認します。SoftBank公式は、端末の分割払いの残債は解約後も支払いが続くこと、解約月は原則として日割りにならないこと、割引が終了する場合があることを案内しています。


### MNP予約番号

SoftBankからY!mobileへの移行は`番号移行`のため、MNP予約番号は不要です。Y!mobileの[申込手続きページ][ymobile-portability]でも確認できます。[オンライン申込ガイド][ymobile-necessaries]でも、SoftBankからの番号移行で`My SoftBank`のアカウントでログインした場合は、`本人確認書類`が不要と案内されています。

Y!mobileの[eSIMフローページ][ymobile-flow-esim]によると、SoftBankに登録された氏名や住所が古い場合、たとえば古い住所のまま、都道府県名が入っていない、旧姓のままといった場合は、申込がキャンセルになります。申し込む前日までに`My SoftBank`で更新してください。3G専用の料金プランや3G専用の端末を使っている場合は、オンラインストアでは申し込めません。


### Y!mobileオンライン申込

Y!mobileのeSIMについては、まず[Y!mobileのSIMカード・eSIMページ][ymobile-sim-esim]を確認してください。eSIMの仕組みと申込の入口が説明されており、動作確認端末ページへのリンクもあります。

1. 現在SoftBank回線を使っているスマートフォンで、[Y!mobileのSIMカード・eSIMページ][ymobile-sim-esim]を開いて申込を始めます。申込には`My SoftBank`へのログインが必要なため、Y!mobileはそのスマートフォンから申し込むよう案内しています。
2. `今の電話番号をそのまま使用する`、`ワイモバイル以外`、`ソフトバンクやLINEMOからののりかえですか？`に`はい`、`いいえ（SIMのみ申し込む）`の順に選び、eSIMを選択します。SoftBankからの番号移行の場合、流れは、プランとオプションの選択、お客さま情報の入力、同意事項の確認と申込完了、申込完了メールの受信です。本人確認書類をアップロードする代わりに、`My SoftBank`にログインします。

**支払い方法を設定する**
PayPayカード ゴールドを支払い方法に設定すると、Y!mobileの`PayPayカード割`の対象になります。Y!mobileの[料金プランページ][ymobile-plan]によると、`シンプル3`では、PayPayカードは月330円割引されます。PayPayカード ゴールドは、2026年6月2日以降、`PayPayカード割`の月550円に`PayPayカード割 増額特典（ゴールド）`の月220円が加わり、月770円割引されます。PayPayカード ゴールドの年会費は11,000円です。


### 開通と初期設定

**eSIMの開通**
Y!mobileの[eSIMフローページ][ymobile-flow-esim]によると、`eSIMご利用手続きのお知らせ`メールに記載されたURLから手続きを進めると、手続き後15分ほどで切り替えが完了します。同ページのSoftBankとLINEMOからののりかえの欄では、新しいスマートフォンを購入する場合の受付時間が4:00-23:15（年中無休）と案内されています。eSIMのみの場合は受付時間の記載がありません。同ページの9:00-21:00は、他社からののりかえの受付時間です。設定中はWi-Fiが必要です。

**APNとプロファイルの設定**
iPhoneでは、iOSを最新バージョンにしていれば原則として通信設定は不要だと、Y!mobileは案内しています。端末によっては、プロファイルのダウンロードやAPNの設定が必要です。Y!mobileは、[SIMフリーのiPhoneとiPad向けの通信設定ページ][ymobile-simfree-apn]も用意しています。


### 乗り換え後

**`おうち割 光セット（A）`を確認して申し込む**
SoftBank光を継続する場合は、Y!mobile側で**`おうち割 光セット（A）`**に切り替えます。Y!mobileは、[SoftBank光やSoftBank Airなどのサービス][ymobile-hikari-set]とY!mobile回線をセットで契約すると、月額料金が割引されると案内しています。[オンラインストアのガイド][ymobile-ouchiwari]によると、SoftBankからのりかえる場合は、オンラインストアの申込時に同時に申し込むことはできません。Y!mobileの開通後に、SoftBank光のS-IDとパスワードを使って`My Y!mobile`から申し込みます。

**PayPayとPayPayカードの連携を再確認する**
[PayPayカードの特典ページ][paypay-benefit]によると、特典を受け取るには、ソフトバンク連携の設定確認、スマホ料金の支払い方法へのPayPayカードの設定、必要に応じて光とでんきの請求まとめの設定が必要です。ポイントはソフトバンクポイントとして付与されるため、`My SoftBank`または`My Y!mobile`で、PayPayポイントへの自動交換も設定しておきます。


## 費用内訳

* **SoftBankのMNP転出手数料**：0円。[SoftBank公式FAQ][softbank-mnp-fee]に明記されています。
* **SoftBankの契約解除料**：0円。[SoftBankの契約解除料FAQ][softbank-cancel-fee]では、SoftBankからY!mobileまたはLINEMOへ番号移行する場合は契約解除料が発生しないと案内されています。2026年7月1日以降に加入し、12ヵ月以内に解約した回線の契約解除料（最大1,100円）も対象外です。ただし、法人契約や固定通信サービスでは別途契約解除料が発生する場合があります。
* **Y!mobileのオンライン契約事務手数料**：3,850円（税込）。店頭では4,950円、オンラインでは3,850円です。
* **eSIM再発行手数料**：契約後にeSIMを再発行する場合、`My Y!mobile`からの再発行は無料です。店頭で手続きする場合は事務手数料がかかることがあります。
* **端末の残債**：端末の分割払いが残っている場合、SoftBankの解約後も支払いが続きます。
* **解約月のSoftBank料金**：一部を除き、日割りなしで満額請求されます。
* **12ヵ月以内のY!mobileの契約解除料**：Y!mobileの[申込手続きページ][ymobile-portability]によると、回線提供開始月から12ヵ月以内にY!mobileを解約すると、契約解除料として858円（`シンプル3 S/M`）または1,100円（`シンプル3 L`）がかかります。


### 想定総コスト

端末の残債がない場合、実質の初期費用は主にY!mobileのオンライン契約事務手数料3,850円（税込）です。SoftBankの最終月は満額請求されますが、Y!mobile側では[`基本料初月0円特典（ワイモバイル）`][ymobile-first-month-free]により、SoftBankから番号移行すると初月の基本料と対象オプション料が0円になります。そのため、切り替え月に両社の基本料を二重に払うことはありません。通話料など一部の料金は対象外です。旧SoftBank回線の終了時に`基本料初月0円特典（ソフトバンク）`が適用されている場合は、この特典は適用されません。


## 既存サービスへの影響


### PayPayカード ゴールドの特典の変化

* SoftBankを解約すると、SoftBank回線向けの特典は終了します。[PayPayカードの特典ページ][paypay-benefit]では、これは特典の解除条件として記載されており、カード自体の解約条件ではありません。
* 特典はSoftBank向けからY!mobile向けに切り替わります。[PayPayカードの公式情報][paypay-benefit]で、通信料金の支払い方法に設定するとY!mobileでも特典があることを確認できます。
* Y!mobileの`シンプル3`では、`PayPayカード割`はPayPayカードで月330円、PayPayカード ゴールドで月770円です。ゴールドの金額には、2026年6月2日に追加された`PayPayカード割 増額特典（ゴールド）`の月220円が含まれます。
* [PayPayカードの特典説明][paypay-benefit]によると、`シンプル3`のスマホ通信料金に対するポイント付与率は、PayPayカードとPayPayカード ゴールドのどちらも最大1%です。過去のキャンペーンで見かける「10%」が`シンプル3`にも当てはまるとは考えないでください。


### SoftBank光のセット割への影響

* 携帯回線を移しても、SoftBank光そのものは自動で解約されません。
* SoftBankの携帯側で受けていた`おうち割 光セット`は、携帯の解約で終了します。[SoftBankの解約に関する注意事項ページ][softbank-cancel-notes]でも、解約や番号移行で割引が終了する場合があると案内されています。
* Y!mobile側で**`おうち割 光セット（A）`**に切り替えられます。[Y!mobileのセット割ページ][ymobile-hikari-set]で、SoftBank光やSoftBank Airなどとセットにすると、Y!mobile回線が割引されることを確認できます。
* `シンプル3`のS、M、Lでは、Y!mobileの[料金プランページ][ymobile-plan]で、`おうち割 光セット（A）`は1回線あたり月1,650円（税込）の割引と表示されています。SoftBank光を維持したまま、SoftBank側のセット割をY!mobile側のセット割に置き換えられます。


### Y!mobileで使える代わりの割引

* `おうち割 光セット（A）`
* `PayPayカード割`
* 条件によっては`家族割引サービス`
* [`超！おトク割`][ymobile-cho-otokuwari]：`シンプル3 M/L`が対象で、加入翌月から12ヵ月間、月1,100円割引。SoftBankからの番号移行が対象かどうかは未確認

Y!mobile公式は、`家族割引サービス`と`おうち割 光セット（A）`は併用できないと案内しています。`超！おトク割`は、`おうち割 光セット（A）`、`家族割引サービス`、`おうち割 でんきセット（E）`と併用できず、これらの割引が優先されます。SoftBank光を継続して`おうち割 光セット（A）`を受ける場合、`超！おトク割`は適用されません。


## キャンペーンと割引（オンライン）


### 現在確認できる特典

* **基本料の初月0円**：[`基本料初月0円特典（ワイモバイル）`][ymobile-first-month-free]により、SoftBankから番号移行すると、Y!mobileの初月の基本料と対象オプション料が0円になります。eSIMのみなど、端末を購入しない契約も対象です。
* **eSIMのPayPayポイント特典は対象外**：[SIMカード・eSIMページ][ymobile-sim-esim]では、SIMカード・eSIMの契約で最大15,000円相当のPayPayポイントがもらえると案内されていますが、SoftBank、LINEMO、LINEモバイル（ソフトバンク回線）からののりかえは対象外です。また、`データ増量オプション`（月550円）への加入も条件です。
* **`PayPayカード割`**：`シンプル3`では、PayPayカードで月330円、PayPayカード ゴールドで月770円（ゴールドの増額特典月220円を含む）の割引です。これはキャンペーンではなく、常設の割引です。


### 現実的に狙える特典

1. 基本料の初月0円（`基本料初月0円特典（ワイモバイル）`）
2. PayPayカード ゴールドの月770円割引
3. SoftBank光の継続によるY!mobile側の`おうち割 光セット（A）`

オンラインでの移行では、この3つを組み合わせるのが現実的です。


## 推奨事項とアドバイス


### 切り替えのタイミングと費用

SoftBankは、ほとんどの場合、解約月を日割りせずに満額請求します。一方、Y!mobile側では`基本料初月0円特典（ワイモバイル）`により、SoftBankからの番号移行では初月の基本料が0円になります。切り替え月は、何日に切り替えてもSoftBankの1ヵ月分を満額で払い、Y!mobileの基本料はかからないため、月内のタイミングによる月額料金の差はほとんどありません。この判断は、公式の日割りルールと初月0円特典にもとづいています。


### セット割を維持する方法

SoftBank光を解約する必要はありません。SoftBank光はそのまま残し、携帯回線だけをY!mobileに移して、開通後に`My Y!mobile`から`おうち割 光セット（A）`を申し込みます。これで、固定回線の切り替え工事なしでセット割を受け続けられます。


### 申し込み時の重要なチェック項目

* SoftBankからの番号移行を選び、SoftBank回線を使っているスマートフォンで申し込む
* `My SoftBank`の氏名と住所が最新か確認する
* PayPayカード ゴールドを支払い方法に設定する
* 開通後の`My Y!mobile`での申込に備えて、SoftBank光のS-IDとパスワードを手元に用意する

SoftBankに登録された氏名や住所が古いと申込がキャンセルされるため、申し込む前日までに更新してください。


### 確定情報と要確認事項

**確定情報：**

* MNP予約番号は不要
* SoftBankの転出手数料は0円
* Y!mobileへの番号移行ではSoftBankの契約解除料は0円
* Y!mobileのオンライン事務手数料は3,850円
* SoftBankからの番号移行ではY!mobileの初月の基本料は0円
* eSIMは最短当日から利用可能
* SoftBankの解約月は原則日割りなし

**要確認事項：**

* 現在のSoftBankプランでの最終請求額
* 端末の残債の有無
* 端末のSIMロックが解除済みか
* 申込時点のキャンペーン条件

これらは、申込画面や`My SoftBank`で個別に確認する必要があります。


## 参考情報

* [Y!mobile - MNP・番号移行によるお申し込み手続き（転入）][ymobile-portability]
  SoftBankまたはLINEMOからの番号移行では、MNP予約番号が不要であることを確認できる公式ページ。12ヵ月以内のY!mobileの契約解除料も記載されている。

* [Y!mobile - ご準備いただくもの][ymobile-necessaries]
  オンライン申込の前に必要なものを確認できるページ。SoftBankからの番号移行で`My SoftBank`のアカウントでログインした場合は本人確認書類が不要という案内を含む。

* [Y!mobile - お申し込みからご利用開始までの流れ（eSIM）][ymobile-flow-esim]
  SoftBankからののりかえについて、eSIMの開通時間、受付時間、初期設定の流れを確認できるページ。

* [Y!mobile - SIMカード/eSIM][ymobile-sim-esim]
  eSIMの仕組みと申込の入口を説明する公式ページ。eSIMのPayPayポイント特典の条件も記載されており、SoftBankからののりかえは対象外。

* [Y!mobile - SIM動作確認済み機種検索][ymobile-devices]
  Y!mobileのSIMとeSIMで動作確認済みの機種を検索できる公式ページ。

* [Y!mobile - SIMロック解除方法][ymobile-unlock]
  SoftBank端末を含め、eSIMの初期設定前に必要なSIMロック解除を携帯会社ごとに案内する公式ページ。

* [Y!mobile - SIMフリーiPhoneの通信設定][ymobile-simfree-apn]
  SIMフリーまたはSIMロック解除済みのiPhoneとiPad向けの公式設定ページ。

* [Y!mobile - 料金プラン][ymobile-plan]
  `シンプル3`での`PayPayカード割`と`おうち割 光セット（A）`の割引額を確認できる公式ページ。

* [Y!mobile - `基本料初月0円特典（ワイモバイル）`][ymobile-first-month-free]
  SoftBank、LINEMO、LINEモバイルからののりかえが対象の、基本料初月0円特典の公式提供条件。

* [Y!mobile - `超！おトク割`][ymobile-cho-otokuwari]
  `シンプル3 M/L`の12ヵ月間の割引と、併用できない割引を確認できる公式ページ。

* [SoftBank FAQ - MNP転出手数料はかかるか][softbank-mnp-fee]
  転出手数料0円、端末の残債、日割り、割引終了の注意点を確認できる公式FAQ。

* [SoftBank FAQ - 解約時の契約解除料][softbank-cancel-fee]
  SoftBankからY!mobileまたはLINEMOへの番号移行では契約解除料が発生しないことを確認できる公式FAQ。

* [SoftBank - のりかえ（MNP/番号移行）・解約に関する注意事項][softbank-cancel-notes]
  解約月の日割りなし、分割払いの残債の継続など、乗り換え前に確認したい注意事項の公式ページ。

* [Y!mobile - おうち割 光セット（A）][ymobile-hikari-set]
  SoftBank光やSoftBank Airを使っている場合の、Y!mobile側のセット割の公式案内。

* [Y!mobile - おうち割 光セット（A）のオンラインストアでのお申し込み方法][ymobile-ouchiwari]
  オンラインストアでの申込時にセット割を申し込む方法の公式ガイド。SoftBankからのりかえる場合は、開通後に`My Y!mobile`から申し込む必要があると案内している。

* [PayPayカード - ソフトバンク/ワイモバイルサービスご利用特典][paypay-benefit]
  モバイル特典、ポイントの自動交換を含む連携方法、ポイント付与率を確認できる公式ページ。

* [PayPayカード - ワイモバイル特典の一部変更のご案内][paypay-notice]
  `シンプル3`開始後の`PayPayカード割`の変更内容を確認できる公式案内。2026年6月に追加されたゴールドの月220円の増額特典は含まない。

* [Y!mobile - キャンペーン情報][ymobile-campaign]
  公式キャンペーンの総合入口。SoftBankからののりかえが対象の基本料初月0円特典を確認できる。eSIMのPayPayポイント特典は、SoftBankからののりかえが対象外。

* [mybest - ワイモバイルキャンペーン解説][mybest-ymobile]
  公式条件の読み解きに役立つ第三者の記事。最終判断は、必ず公式の利用条件とあわせて行う。

<!-- Links -->

[mybest-ymobile]: https://my-best.com/articles/657
[paypay-benefit]: https://www.paypay-card.co.jp/service/benefit/mobile/
[paypay-notice]: https://www.paypay-card.co.jp/info/008592.html
[softbank-cancel-fee]: https://www.softbank.jp/support/faq/view/10617
[softbank-cancel-notes]: https://www.softbank.jp/mobile/support/cancellation/mnp/notification/
[softbank-mnp-fee]: https://www.softbank.jp/support/faq/view/11028
[ymobile-campaign]: https://www.ymobile.jp/cp/
[ymobile-cho-otokuwari]: https://www.ymobile.jp/cp/cho-otokuwari/
[ymobile-devices]: https://www.ymobile.jp/store/lineup/sim_devices/
[ymobile-first-month-free]: https://www.ymobile.jp/cp/sblm_tesuryomuryo/
[ymobile-flow-esim]: https://www.ymobile.jp/store/to_beginner/flow_esim/
[ymobile-hikari-set]: https://www.ymobile.jp/plan/discount/hikarisetwari/
[ymobile-necessaries]: https://www.ymobile.jp/store/to_beginner/necessaries/
[ymobile-ouchiwari]: https://www.ymobile.jp/store/to_beginner/ouchiwari/
[ymobile-plan]: https://www.ymobile.jp/plan/
[ymobile-portability]: https://www.ymobile.jp/support/process/portability/
[ymobile-sim-esim]: https://www.ymobile.jp/store/sp/sim/
[ymobile-simfree-apn]: https://www.ymobile.jp/yservice/howto/simfree_iphone/apn/
[ymobile-unlock]: https://www.ymobile.jp/store/to_beginner/esim_app/unlock/
