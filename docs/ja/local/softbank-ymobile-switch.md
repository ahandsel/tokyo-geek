---
title: 'SoftBankからY!mobileへのオンライン乗り換えガイド'
description: 'SoftBankからY!mobileへオンラインで番号移行する手順、費用、注意点をまとめたガイドです。'
head:
  - - meta
    - name: keywords
      content: softbank, ymobile, 番号移行, mnp, esim, sim, paypayカード, おうち割, 光セット
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]


## 概要

このケースでは、SoftBankからY!mobileへの移行は、一般的な「他社MNP」ではなく、SoftBankグループ内の「番号移行」扱いです。**MNP予約番号の取得は不要**です。Y!mobile公式も、SoftBank/LINEMOからの番号移行ではMNP予約番号の発行不要と案内しています。Y!mobileで申込完了後、SoftBank側は自動解約されます。

オンラインだけで進める場合、流れは大きく以下のとおりです。

1. 事前確認
2. Y!mobileオンライン申込
3. SIM/eSIM受領・回線切替
4. 初期設定
5. 割引申込・特典確認

eSIMは最短当日利用開始、SIMカードは最短当日発送です。


## 手順（オンラインのみ）


### 事前確認

**端末の対応確認**
使い続ける端末がY!mobileのSIM/eSIMで利用可能かを、Y!mobileの[動作確認端末ページ][ymobile-devices]で確認します。eSIM希望なら、端末がeSIM対応であることに加え、初期設定時にWi-Fi環境が必要です。

**SIMロック状態の確認**
近年の端末はSIMロックなしが多いですが、古いSoftBank端末では念のため確認した方が安全です。Y!mobileは他社端末利用時の[SIMロック解除案内][ymobile-unlock]を用意しています。

**契約情報の確認**
SoftBank側で、残債、日割り有無、割引終了の影響を確認します。SoftBank公式は、機種代金の分割残債は解約後も支払い継続、一部を除き解約月は日割りなし、割引は終了する場合があると案内しています。


### MNP予約番号について

**本ケースでは取得不要**
SoftBankからY!mobileは番号移行のため、MNP予約番号は不要です。Y!mobileの[申込手続きページ][ymobile-portability]でも、SoftBankからの番号移行時はMNP予約番号不要とされています。さらに、[オンライン申込ガイド][ymobile-necessaries]上では、SoftBankからの番号移行では本人確認書類が不要になるケースも案内されています。

**例外的に確認しておきたいこと**
名義不一致、未払い、特殊契約、法人契約、一部端末条件などがあると通常どおり進まないことがあります。Y!mobile側は、支払い確認ができない場合は手続きできない旨を案内しています。


### Y!mobileオンライン申込

**Y!mobile公式オンラインストアで申込**
「今の電話番号をそのまま使用」→「SoftBank/LINEMOからのりかえ」→「SIMのみ申し込む」を選んで進めます。オンラインストアの基本フローは、プラン・オプション選択、本人確認、情報入力、同意確認、申込完了です。

**SIMかeSIMを選ぶ**

* **eSIM**: 最短当日利用開始。すぐ切り替えたい人向け。Wi-Fi必須。
* **SIMカード**: 最短当日発送。設定が比較的わかりやすく、トラブル時に戻しやすい。

実務上のおすすめ:

* すぐ開通したい、eSIM経験がある - eSIM
* 初回で失敗したくない、端末相性が心配 - SIMカード

これは公式の所要時間と設定条件からみた実務的な推奨です。

**支払い方法を設定**
PayPayゴールドカードを支払い方法に設定すると、Y!mobileの`PayPayカード割`対象になります。2025年9月25日以降の`シンプル3`では、PayPayカードは月330円引き、PayPayカード ゴールドは月550円引きです。


### 開通・初期設定

**SIMカードの場合の開通**
商品到着後、自分で回線切替を行います。Y!mobileの[申込フローページ][ymobile-flow]では、切替窓口の受付時間は9:00-21:00、商品到着日から6日後の21:00までに切替しないと7日後に自動切替となります。

**eSIMの場合の開通**
Y!mobileの[eSIMフローページ][ymobile-flow-esim]では、手続き後15分ほどで切り替え完了とされています。回線切替受付時間は9:00-21:00です。

**APN・プロファイル設定**
iPhoneは比較的自動で進みやすいですが、端末によってはAPN設定が必要です。eSIMはプロファイルダウンロード、SIMカードは差し替え後に通信確認を行います。Y!mobileは[SIMフリーiPhone/iPad向けの通信設定ページ][ymobile-simfree-apn]も用意しています。


### 乗り換え後に必ず行うこと

**`おうち割 光セット（A）`の確認・申込**
SoftBank光を継続するなら、Y!mobile側で**`おうち割 光セット（A）`**に切り替えるのが重要です。Y!mobileは、[SoftBank 光/SoftBank Air等とY!mobile回線をセット契約すると月額割引][ymobile-hikari-set]と案内しています。[オンラインストア][ymobile-ouchiwari]にも、既にSoftBank光等を契約中の方向けの申込方法があります。

**PayPay/PayPayカード連携の再確認**
[PayPayカード側の案内][paypay-benefit]では、特典受取にはソフトバンク連携、スマホ料金のPayPayカード設定、必要に応じた光・でんきの請求まとめなどの設定確認が必要です。

[ymobile-devices]: https://www.ymobile.jp/store/sp/sim/
[ymobile-unlock]: https://www.ymobile.jp/support/process/unlock_procedure/
[ymobile-portability]: https://www.ymobile.jp/support/process/portability/
[ymobile-necessaries]: https://www.ymobile.jp/store/to_beginner/necessaries/
[ymobile-flow]: https://www.ymobile.jp/store/to_beginner/flow/
[ymobile-flow-esim]: https://www.ymobile.jp/store/to_beginner/flow_esim/
[ymobile-simfree-apn]: https://www.ymobile.jp/yservice/howto/simfree_iphone/apn/
[ymobile-hikari-set]: https://www.ymobile.jp/plan/discount/hikarisetwari/
[ymobile-ouchiwari]: https://www.ymobile.jp/store/to_beginner/ouchiwari/
[paypay-benefit]: https://www.paypay-card.co.jp/service/benefit/mobile/


## 費用内訳

* **SoftBankのMNP転出手数料**: 0円。[SoftBank公式FAQ][softbank-mnp-fee]で明記されています。
* **SoftBankの契約解除料**: 原則0円。2022年2月1日以降、一般向けの多くの料金プランは更新月外でも免除です。ただし法人向け一部プランや固定通信サービスは例外があります。[SoftBank解除料FAQ][softbank-cancel-fee]を参照してください。
* **Y!mobileオンライン契約事務手数料**: 3,850円（税込）。店頭は4,950円、オンラインは3,850円です。
* **SIM発行費用**: 通常の新規SIM/eSIM契約そのものに別建てのSIM発行料が明示されている公式根拠は確認できませんでした。確認した公式情報では、初回契約時に明示的に見える主費用は契約事務手数料です。
* **eSIM再発行費用**: 契約後にeSIMを再発行する場合は費用が発生し得ますが、`My Y!mobile`からのeSIM再発行は無料です。店頭手続きだと事務手数料が必要になる場合があります。
* **端末残債**: 端末代の分割が残っていれば、SoftBank解約後も支払い継続です。
* **解約月のSoftBank料金**: 一部を除き日割りなしで満額請求です。


### 想定総コスト

端末残債や例外的な解除料がない前提なら、実質の初期コストは主にY!mobileオンライン契約事務手数料3,850円（税込）です。月途中解約ならSoftBank最終月が満額、Y!mobile側の月額利用料が加わります。

[softbank-mnp-fee]: https://www.softbank.jp/support/faq/view/11028
[softbank-cancel-fee]: https://www.softbank.jp/support/faq/view/10617


## 既存サービスへの影響


### PayPayゴールドカード特典の変化

* カード自体はそのまま使えます。解約でカードが失効するわけではありません。
* ただし、SoftBank向け特典からY!mobile向け特典へ内容が切り替わると考えるのが正確です。[PayPayカード公式][paypay-benefit]では、Y!mobileでも通信料支払い設定で特典があります。
* 2025年9月25日以降のY!mobile`シンプル3`では、`PayPayカード割`がPayPayカードで330円/月、PayPayカード ゴールドで550円/月です。
* [PayPayカード公式の特典説明][paypay-benefit]では、`シンプル3`プランのスマホ通信料等のポイント付与率は、PayPayカード ゴールドでも最大1%、PayPayカードでも最大1%と読める内容です。過去の一部訴求で見かける「10%」を`シンプル3`に当てはめない方が安全です。


### SoftBank光のセット割・料金への影響

* SoftBank光そのものは、携帯回線を移しても自動解約されません。
* ただし、SoftBank携帯側で受けていた`おうち割 光セット`は、携帯解約で終了します。[SoftBank公式の注意事項ページ][softbank-cancel-notes]は、解約やMNP/番号移行で割引終了に注意するよう案内しています。
* その代わり、Y!mobile側で**`おうち割 光セット（A）`**へ組み替え可能です。[Y!mobile公式][ymobile-hikari-set]は、SoftBank 光/SoftBank Air等とのセットでY!mobile回線を割引するとしています。
* 割引額はページの表示文脈差があるため、申込画面か料金シミュレーションで最終確認するのが安全です。少なくとも、SoftBank光を維持しつつY!mobile側のセット割へ置き換えられる点は確定です。


### Y!mobileで適用できる代替割引

* `おうち割 光セット（A）`
* `PayPayカード割`
* 条件次第で`家族割引サービス`

ただし、Y!mobile公式は`家族割引サービス`と`おうち割 光セット（A）`は重複しないと案内しています。

[softbank-cancel-notes]: https://www.softbank.jp/mobile/support/cancellation/mnp/notification/


## キャンペーンおよび割引（オンライン）


### 現在確認できた公式系特典

* **Y!mobile公式オンラインストアのSIM/eSIM契約特典**: [公式キャンペーン一覧][ymobile-campaign]では、オンラインストアでSIMカード/eSIM契約で最大15,000円相当のPayPayポイントプレゼントと案内されています。
* **SIM/eSIM契約時のPayPayポイント特典**: [公式SIMページ][ymobile-sim]でも、eSIM/SIM契約特典としてPayPayポイントコードプレゼントが案内されています。
* **`PayPayカード割`**: 2025年9月25日以降の`シンプル3`では、PayPayカード 330円/月引き、PayPayカード ゴールド 550円/月引きです。これはキャンペーンではなく恒常割引です。
* **`おうち割 光セット（A）`加入関連特典**: Y!mobileには`おうち割 光セット（A）`加入キャンペーン系ページがあり、一定条件下で特典付与があります。ただし、店頭申込を前提にした条件が含まれるページもあり、オンラインのみで同条件適用とは限りません。申込導線ごとの条件確認が必要です。


### このケースで実際に狙いやすいもの

1. SIM/eSIMのオンライン申込特典
2. PayPayカード ゴールドの月550円割引
3. SoftBank光継続によるY!mobile側の`おうち割 光セット（A）`

この3つの重ね取りが、オンライン移行では現実的です。

[ymobile-campaign]: https://www.ymobile.jp/cp/
[ymobile-sim]: https://www.ymobile.jp/store/sp/sim/


## 推奨事項・アドバイス


### 最も安全な進め方

初回ならSIMカード、慣れているならeSIMをおすすめします。

eSIMは速いですが、Wi-Fi必須で、端末側のeSIM設定につまずくと復旧が面倒です。SIMカードは到着待ちがありますが、失敗しにくいです。


### コスト最小化のタイミング

月末近くの切替が有利になりやすいです。理由は、SoftBankは一部を除き解約月が日割りにならず満額だからです。Y!mobile側は契約当月の割引日割り案内があり、SIM/eSIMの開通タイミングも自分で調整しやすいです。一般論としては、月末の数日前から月末までが候補です。これは公式の日割りルールからの実務的な推奨です。


### セット割を部分維持する工夫

SoftBank光をやめる必要はありません。SoftBank光はそのまま残し、携帯だけY!mobileへ移し、Y!mobile側で`おうち割 光セット（A）`を申し込むのが最も自然です。これで固定回線の乗り換え工事なしに、セット割の恩恵を継続しやすいです。


### 申し込み時の最重要チェック

* SoftBankからの番号移行を選ぶこと
* PayPayゴールドカードを支払い方法に設定すること
* SoftBank光契約情報を手元に置くこと
* キャンペーン対象ページから申し込むこと

特に最後は重要で、Y!mobileはキャンペーンページごとに適用条件が分かれます。通常の申込導線から入ると、特典対象外になることがあります。


### 確定情報と要確認事項の線引き

**確定情報:**

* MNP予約番号は不要
* SoftBank転出手数料は0円
* 契約解除料は原則0円
* Y!mobileオンライン事務手数料は3,850円
* eSIMは最短当日利用開始
* SIMカードは最短当日発送
* SoftBank解約月は原則日割りなし

**要確認事項:**

* 現行SoftBankプランでの最終請求額
* 端末残債の有無
* Y!mobile側の`おうち割 光セット（A）`の最終割引額
* 申込時点のキャンペーン金額

これらは申込画面や`My SoftBank`での個別条件確認が必要です。


## 参考情報

* [Y!mobile - MNP・番号移行によるお申し込み手続き（転入）][ymobile-portability-ref]
  SoftBank/LINEMOからの番号移行ではMNP予約番号が不要であることを確認できる公式ページ。

* [Y!mobile - ご準備いただくもの][ymobile-necessaries-ref]
  オンライン申込前に必要なものを確認するページ。SoftBankからの番号移行で本人確認書類不要の案内あり。

* [Y!mobile - お申し込みからご利用開始までの流れ][ymobile-flow-ref]
  SIMカード申込後の流れ、回線切替、受付時間などを確認できるページ。

* [Y!mobile - お申し込みからご利用開始までの流れ（eSIM）][ymobile-flow-esim-ref]
  eSIMの開通時間、切替受付時間、初期設定の流れを確認できるページ。

* [Y!mobile - SIMカード/eSIM][ymobile-sim-ref]
  SIMとeSIMの違い、申込入口、動作確認端末ページへの導線がある公式ページ。

* [SoftBank FAQ - MNP転出手数料はかかるか][softbank-mnp-fee-ref]
  転出手数料0円、端末残債、日割り、割引終了の注意点を確認できる公式FAQ。

* [SoftBank FAQ - 解約時の契約解除料][softbank-cancel-fee-ref]
  一般向けプランでは原則として契約解除料が免除であることを確認できる公式FAQ。

* [SoftBank - のりかえ（MNP/番号移行）・解約に関する注意事項][softbank-cancel-notes-ref]
  解約月の日割りなし、残債継続など、乗り換え前に見るべき注意事項の公式ページ。

* [Y!mobile - おうち割 光セット（A）][ymobile-hikari-ref]
  SoftBank光やSoftBank Airを使っている場合のY!mobile側セット割の公式案内。

* [Y!mobile - おうち割 光セット（A）のオンラインストアでのお申し込み方法][ymobile-ouchiwari-ref]
  SoftBank光契約済みの人がオンライン申込時におうち割を進めるための公式ガイド。

* [PayPayカード - ソフトバンク/ワイモバイルサービスご利用特典][paypay-benefit-ref]
  PayPayカード ゴールド利用時のモバイル特典、連携方法、付与率を確認できる公式ページ。

* [PayPayカード - ワイモバイル特典の一部変更のご案内][paypay-notice]
  `シンプル3`開始後の`PayPayカード割`変更内容を確認できる公式案内。

* [Y!mobile - キャンペーン情報][ymobile-campaign-ref]
  公式キャンペーンの総合入口。SIM/eSIMのPayPayポイント特典確認用。

* [mybest - ワイモバイルキャンペーン解説][mybest-ymobile]
  公式条件の読み替えや比較整理に役立つ第三者記事。最終判断は必ず公式条件書と併読推奨。

[ymobile-portability-ref]: https://www.ymobile.jp/support/process/portability/
[ymobile-necessaries-ref]: https://www.ymobile.jp/store/to_beginner/necessaries/
[ymobile-flow-ref]: https://www.ymobile.jp/store/to_beginner/flow/
[ymobile-flow-esim-ref]: https://www.ymobile.jp/store/to_beginner/flow_esim/
[ymobile-sim-ref]: https://www.ymobile.jp/store/sp/sim/
[softbank-mnp-fee-ref]: https://www.softbank.jp/support/faq/view/11028
[softbank-cancel-fee-ref]: https://www.softbank.jp/support/faq/view/10617
[softbank-cancel-notes-ref]: https://www.softbank.jp/mobile/support/cancellation/mnp/notification/
[ymobile-hikari-ref]: https://www.ymobile.jp/plan/discount/hikarisetwari/
[ymobile-ouchiwari-ref]: https://www.ymobile.jp/store/to_beginner/ouchiwari/
[paypay-benefit-ref]: https://www.paypay-card.co.jp/service/benefit/mobile/
[paypay-notice]: https://www.paypay-card.co.jp/info/008592.html
[ymobile-campaign-ref]: https://www.ymobile.jp/cp/
[mybest-ymobile]: https://my-best.com/articles/657
