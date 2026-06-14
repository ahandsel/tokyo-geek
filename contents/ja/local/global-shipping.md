---
title: 日本から海外への配送メモ
description: 日本郵便の国際郵便マイページサービスの使い方、EAD ルール、連絡先アップロード、ラベル作成について説明します。
head:
  - - meta
    - name: keywords
      content: japan post, international shipping, ead, my page, postal
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]


## 日本郵便 - 国際郵便

* 国際郵便のラベルは[電子的事前データ送信（EAD）](https://www.post.japanpost.jp/int/ead/index_en.html)で作成する必要があります。
* 日本郵便では、アメリカ宛の手書きラベルの郵便物は受け付けていません。
* EMS や国際小包、小形包装物などの発送には、「[国際郵便マイページサービス](https://www.post.japanpost.jp/intmypage/whatsmypage_en.html)」をご利用ください。


## 国際郵便マイページサービス

* [ログイン - 国際郵便マイページサービス](https://www.int-mypage.post.japanpost.jp/mypage/M010000.do?request_locale=en)
* [オンライン配送ツール - 日本郵便](https://www.post.japanpost.jp/intmypage/online_en.html)
* 電話サポート：
  * 日本語：0120-5931-55
  * 英語：0570-046-111
    * 英語の方がつながりが早かったです
  * 受付時間
    * 平日：8:00~21:00
    * 土日祝：9:00~21:00
* [jp-post-contact-upload.csv](#jp-post-contact-upload-csv-file)をテンプレートにして、連絡先を一括アップロードできます。
* 2021 年 3 月 29 日時点で、日本郵便はアメリカ宛には[小形包装物](https://www.post.japanpost.jp/int/service/small_packing_en.html)のみ送付可能です。
  * [国際郵便マイページサービス](https://www.int-mypage.post.japanpost.jp/mypage/M010000.do)のデフォルトオプションは`国際eパケット`ですが、これは利用できません！
* 配送の種類：[小形包装物](https://www.post.japanpost.jp/int/service/small_packing_en.html) & `AIR`


### 日本郵便を利用するヒント

* [アドレス帳](https://www.post.japanpost.jp/intmypage/address_en.html)機能で連絡先を一括アップロードできます。
  * [jp-post-contact-upload.csv](#jp-post-contact-upload-csv-file)をテンプレートとして使用してください。
  * すべてのテキストがクォーテーション（`"`）で囲まれていること、クォーテーションとカンマの間にスペースがないこと（`","`）を確認してください。
  * 1 行目にはヘッダーを含めてください：

    ```csv
    "User ID","Name","CompanyName","Department","Postal code","Address 1","Address 2","Address 3","STATES, etc.","COUNTRY","Tel","Fax","E-mail address"
    ```

  * 最終行は空にしてください。

* ラベル作成の前に、[内容品リスト](https://www.post.japanpost.jp/intmypage/contents_en.html)ツールで発送する品物を事前に登録しておきましょう。
* ホーム、アドレス帳、アドレス帳のデータインポート画面は、下のデモ動画で確認できます。


### デモ

デモ動画で紹介しているページの流れ：

1. ホーム
2. ラベル作成
3. 差出人住所の登録（自分の住所）
4. 届け先住所の登録（相手の住所）
5. 配送オプションの選択（[小形包装物](https://www.post.japanpost.jp/int/service/small_packing_en.html) & `AIR`）
6. 内容品の登録
7. 荷物の詳細
8. 確認
9. ラベルの保存と印刷

* デモ動画（MP4）：

<!-- markdownlint-disable MD033 -->
<video controls>
  <source src="/global-shipping/global-shipping-demo.mp4" type="video/mp4">
</video>
<!-- markdownlint-enable MD033 -->


### jp-post-contact-upload csv file {#jp-post-contact-upload-csv-file}

```csv
<!--@include: ../../public/global-shipping/jp-post-contact-upload.csv-->
```
