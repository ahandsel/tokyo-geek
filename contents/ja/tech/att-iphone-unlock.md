---
title: 'AT&T iPhoneのunlock方法'
description: '対象条件の確認、AT&T iPhoneのdevice unlock申請、別キャリアや現地SIMでの利用手順です。'
head:
  - - meta
    - name: keywords
      content: att, iphone, sim unlock, device unlock, imei, carrier, esim, japan sim, travel
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]


## 概要

* このガイドでは、対象条件の確認から新しいSIMでの初回利用まで、iPhoneのAT&T `device unlock` の申請手順を説明します。
* 目的：AT&TのiPhoneを、日本のSIMや旅行用eSIMなど、別のキャリアで使えるようにすることです。
* AT&Tは対象条件を満たす端末の `unlock` を無料で行うため、有料の第三者 `unlock` サービスは不要です。
* 対象読者：キャリアを乗り換えたい、または海外へ引っ越したいAT&T `postpaid` および `AT&T Prepaid` の契約者です。

> [!IMPORTANT] 重要：`unlock` で解除されるのは `carrier lock` のみです。
> 回線の解約、分割払い残高の清算、`Apple Account` に紐づく `Activation Lock` の解除は行われません。


## 対象条件

AT&Tは、次の条件をすべて満たす端末のみ `unlock` します。

* **端末代金の完済** - 分割払いまたは契約の支払いが完了しており、分割払い残高が0です。
* **アカウントの状態が良好** - アカウントに未払い残高がありません。
* **紛失または盗難の届出がない** - 端末が紛失、盗難、または不正利用として届け出られたことがありません。
* **アクティブな回線** - `postpaid` 端末は60日以上アクティブである必要があります。`AT&T Prepaid` 端末は6か月以上アクティブである必要があります。

> [!TIP] ヒント：AT&Tの回線プランで対象条件を満たしたApple端末は、自動的に `unlock` されます。
> 申請の前に、`IMEI` を使って[`device unlock status` ページ][att-unlock-status]で状態を確認してください。


## 事前準備


### アカウント情報を用意する

開始前に、次の情報を用意してください。

* `AT&T account number` と、アカウントのセキュリティ `PIN` またはパスワード。
* 端末の `IMEI number` - iPhoneの固有識別子です。
* **購入証明** - レシートまたは請求書です。AT&Tが所有権の確認を求める場合があります。


### iPhoneで `IMEI` を確認する

次のいずれかの方法を使います。

* `Settings` → `General` → `About` を開き、下にスクロールして `IMEI` を確認します。
* `Phone` アプリを開き、`*#06#` をダイヤルすると、画面に `IMEI` が表示されます。


## ステップ1：`unlock` リクエストを送信する

1. [AT&T `device unlock` ポータル][att-unlock]にアクセスします。
2. `Unlock your device` を選択し、対象条件と手順を確認します。
3. iPhoneの `IMEI number` を入力します。
4. 氏名、メールアドレス、電話番号を入力します。
5. `AT&T account number` と、アカウントのセキュリティ `PIN` またはパスワードを入力します。
6. `Request unlock` を選択してフォームを送信します。

送信前に、すべての項目を確認してください。リクエストが却下される最も多い原因は、`IMEI` またはアカウント番号の入力ミスです。


## ステップ2：メールからリクエストを確認する

AT&Tは、`unlock request number` と送信完了用のリンクが記載された確認メールを送ります。

リンクは24時間以内に開いてください。それ以降、AT&Tはリクエストをキャンセルするため、最初からやり直す必要があります。


## ステップ3：AT&Tの処理を待つ

ほとんどのリクエストは2営業日以内に承認され、数分で承認される場合もあります。承認または却下されると、AT&Tからメールが届きます。

* 承認された場合、メールに端末の `unlock` 手順が記載されます。
* 却下された場合、メールに理由が記載されます。理由の例は、未払い残高や、まだ対象条件を満たしていない端末です。問題を解消してから、新しいリクエストを送信してください。

`IMEI` と `unlock request number` を使って、[`device unlock status` ページ][att-unlock-status]で進捗を確認することもできます。


## ステップ4：新しいSIMでiPhoneを有効化する

1. iPhoneの電源を切ります。
2. AT&TのSIMカードを取り出し、新しいキャリアのSIMカードを挿入します。eSIMの場合は、代わりに新しいキャリアのQRコードをスキャンします。
3. iPhoneの電源を入れ、セットアップ手順に従います。
4. 案内が表示されたら、Wi-Fiに接続します。
5. テスト通話を行い、モバイルデータでWebページを開きます。

iPhoneが新しいネットワークに登録されると、`unlock` は完了です。「`SIM not supported`」と表示される場合は、`carrier lock` が残っています。


## 補足情報

* **iPhoneの消去は任意です。** `unlock` は端末に対して適用され、データには影響しません。端末を他人に渡す場合は、先に `Settings` → `General` → `Transfer or Reset iPhone` → `Erase All Content and Settings` を開いてください。
* **`unlock` の確認メールは保管してください。** リクエスト番号が記載されており、フォローアップが必要なときにAT&Tサポートが確認します。
* **現地プランを契約する前に、対応バンドを確認してください。** `unlock` 済みのiPhoneでも、新しいキャリアが使う周波数帯に対応している必要があります。


## トラブルシューティング

* **新しいSIMで「`SIM not supported`」と表示される。** 承認メールのあと数時間待ってから、iPhoneを再起動してください。`unlock` が端末に届くまでに、メールが示すより時間がかかることがあります。
* **再起動してもiPhoneが接続しない。** `Settings` → `General` → `About` を開き、数秒待って `carrier settings` の更新案内が出たら `Update` を選択します。
* **`status` ページでリクエストが2営業日を超えて `pending` のままになる。** `unlock request number` を用意してAT&Tサポートに連絡してください。
* **リクエストが却下され、理由が不明確である。** 分割払い残高が0であることと、アカウントに未払いがないことを確認してから、新しいリクエストを送信してください。


## 参考リンク

* [携帯電話または端末を `unlock` する - AT&T `device unlock`][att-unlock]
* [AT&Tの携帯電話または端末を `unlock` する方法 - AT&T support][att-unlock-lsreg]
* [携帯電話または端末の `unlock` 状態を確認する - AT&T `device unlock`][att-unlock-status]
* [AT&T iPhoneの `unlock` 方法：手順ガイド - TechBloat][techbloat-att-unlock]

<!-- Links -->

[att-unlock]: https://www.att.com/deviceunlock/
[att-unlock-lsreg]: https://lsreg.att.com/support/article/wireless/KM1008728
[att-unlock-status]: https://www.att.com/deviceunlock/status
[techbloat-att-unlock]: https://www.techbloat.com/how-to-unlock-an-att-iphone-step-by-step-guide.html
