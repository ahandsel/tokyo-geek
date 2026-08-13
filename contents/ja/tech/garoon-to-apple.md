---
title: ガルーンのイベントを Apple カレンダーにエクスポートするブックマークレット
description: 開いているガルーンのイベントを iCal ファイルに変換して Apple カレンダーに取り込むブックマークレットと、そのコードの解説です。
head:
  - - meta
    - name: keywords
      content: garoon, apple calendar, bookmarklet, javascript, ical, calndr, cybozu
externalPostUrl: https://qiita.com/ahandsel/items/18308ff3a6daad9029a4
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

ガルーンから Apple カレンダーにイベントの詳細をコピーして貼り付けるのは面倒です。
このブックマークレットは、開いている任意のガルーンのイベントから iCal ファイルを生成するので、1 クリックでイベントの詳細を引き継げます。

![ガルーンのイベントを Apple カレンダーにエクスポートするブックマークレットのデモ][img-demo]


## 使い方


### 初期設定

1. 下記の[ブックマークレットのコード](#ブックマークレットのコード)をコピーします。
2. Chrome のアドレスバーに`@bookmarks`と入力します。
3. 右上の`⋮`アイコンをクリックします。
4. **ブックマークを追加**をクリックし、URL フィールドにコードを貼り付けます。


### ガルーンのイベントを Apple カレンダーにエクスポートする

1. ガルーンのイベントのページを開きます。
2. ブックマークレットをクリックします。
3. 生成された iCal ファイルをダウンロードします。
4. ファイルを開き、イベントが Apple カレンダーアプリに追加されていることを確認します。


### トラブルシューティング

ブックマークレットをクリックしても何も起きない場合は、ブラウザーのコンソールでエラーメッセージを確認します。

1. ブラウザーのコンソールを開きます。
   * Mac：`Command+Option+C`
   * Windows、Linux、Chrome OS：`Control+Shift+C`
2. ログに出力された`event`オブジェクトとエラーメッセージを確認します。


## ブックマークレットのコード

<<< @/public/garoon-to-apple/garoon-to-apple-bookmarklet-v0.js


## ブックマークレットとは

ブックマークレットとは、ウェブブラウザーのブックマークとして保存する小さな JavaScript のコードです。

クリックすると開いているウェブページ上でコードが実行されるため、拡張機能をインストールせずにブラウザーの機能を拡張できます。


## コードの解説


### コードを IIFE で囲む

まず、コードの言語として`javascript`を指定します。

次に、コードを[即時実行関数式（IIFE）][iife]で囲みます。
ブックマークレットはグローバルスコープで実行されるため、この囲みによってスクリプトの変数がページのグローバルスコープに漏れないようにします。

```javascript
javascript: (() => {
  // ... (コードスニペット)
  addCalendar(event);
})();
```


### ガルーンのイベントオブジェクトを取得する

[`garoon.schedule.event.get()`][garoon-event-get] JavaScript API を使って、開いているガルーンのイベントのイベントオブジェクトを取得します。

[`window`ウェブ API][window-api] により、グローバルスコープから`garoon`オブジェクトにアクセスできます。

```javascript
const event = window.garoon?.schedule?.event?.get();
```


### 入力を確認する

処理を進める前に、`event`オブジェクトが`undefined`でないことを確認します。これにより、開いているページがガルーンのイベントページであることを確認できます。

```javascript
const event = window.garoon?.schedule?.event?.get();

if (event === undefined) {
  alert(`Error: Not on a Garoon schedule.\nPlease open a specific Garoon event.`);
  return;
}
```


### メイン関数 - addCalendar

`addCalendar`関数は`event`オブジェクトを引数として受け取り、URL を組み立てるためのいくつかの処理を実行します。
その URL を開くと、Apple カレンダーの新しいイベントのフィールドが自動的に入力されます。


### 開始時刻と終了時刻を書式設定する

`formatTimestamp`ヘルパー関数を呼び出し、イベントの開始日時と終了日時の文字列を必要な形式に変換します。

```javascript
const start = formatTimestamp(event.start.dateTime);
const end = formatTimestamp(event.end.dateTime);
```

`formatTimestamp`関数は日付の文字列を受け取り、ISO 8601 形式に変換したあと、ハイフンとコロンを取り除きます。

```javascript
const formatTimestamp = (dateString) =>
  new Date(dateString).toISOString().replaceAll(/[-:]|\.\d+/g, '');
```


### オリジン URL を変更する

`location.origin`を使って、開いているページの[オリジン][origin] URL を取得します。

[クライアント証明書認証][client-cert-auth]の機能はサブドメインとドメインの間に`.s`を追加して URL を変更するため、エクスポートの前に取り除きます。

```javascript
const origin = location.origin.replace(".s.", ".");
```


### イベントの URL を組み立てる

オリジン URL とイベント ID を組み合わせて、短くて分かりやすいイベントの URL を生成します。

```javascript
const url = `${origin}${location.pathname}?event=${event.id}`;
```


### URL パラメーターを初期化する

`URLSearchParams`オブジェクトを初期化し、サービスに`apple`を設定します。

```javascript
const params = new URLSearchParams({ service: "apple" });
```


### イベントのメモを書式設定する

`bodyFormat`ヘルパー関数を呼び出し、イベントのメモを Calndr が想定する形式に変換します。

```javascript
const body = bodyFormat(event.notes);
```

この関数は文字列を受け取り、すべての改行をキャリッジリターンに置き換えます。

```javascript
const bodyFormat = (inputText) => inputText.replace(/\n/g, '\r');
```


### URL パラメーターを設定する

Apple カレンダーのイベントに必要なパラメーターを設定します。

```javascript
params.set("start", start);
params.set("end", end);
params.set("title", event.subject);
params.set("description", body);
params.set("location", url);
params.set("timezone", event.start.timeZone);
params.set("calname", `${start}-${event.id}`);
```


### 終日のイベントを処理する

以前のバージョンのブックマークレットでは、終日のイベントに`all_day`パラメーターを渡していました。

```javascript
if (event.isAllDay) {
  params.set("all_day", "true");
}
```

> [!CAUTION] 注意：`all_day`パラメーターに`true`または`false`のどちらを設定しても、Calndr はエラーを返します。
> 2024 年 1 月 17 日に確認したため、上記のブックマークレットではこのパラメーターを省いています。


### カレンダーのイベント URL を作成して開く

[calndr.link][calndr] は、[atymic][atymic] が作成した無料のカレンダーリンクジェネレーターです。

パラメーターを Calndr の[ダイナミック API][calndr-api] に渡して、iCal ファイルをダウンロードします。

```javascript
open(`https://calndr.link/d/event/?${params.toString()}`);
```


### デバッグ用にログを出力する

デバッグに役立つように、`event`オブジェクトと`params`オブジェクトをコンソールに出力し、スクリプトの入力と出力を確認できるようにします。

```javascript
console.log({ event });
// ...
console.log(params.toString());
```


## calndr.link プロジェクトを応援する

このブックマークレットは iCal ファイルの生成を Calndr に頼っています。
[calndr.link][calndr] を作成した [atymic][atymic] に、[コーヒーをごちそうしてみてはいかがでしょうか][calndr-kofi]。


## 参考資料

* [ダイナミック API - Calndr][calndr-api]
* [スケジュールオブジェクト - cybozu developer network][garoon-schedule-object]
* [スケジュールのイベントを取得する - cybozu developer network][garoon-event-get]
* [RFC 5545 - iCalendar の仕様][rfc-5545]
* [garoon-to-apple-bookmarklet-v0.js - GitHub][source-code]
* 初出は [DEV][devto-original] と [Qiita][qiita-ja] です。

<!-- Links -->

[atymic]: https://atymic.dev/
[calndr]: https://calndr.link/
[calndr-api]: https://calndr.link/api-docs#dynamic
[calndr-kofi]: https://ko-fi.com/slashdev
[client-cert-auth]: https://jp.cybozu.help/general/ja/id/02047.html#list_access_secureaccess_10
[devto-original]: https://dev.to/ahandsel/import-a-garoon-event-to-apple-calendar-bookmarklet-cj0
[garoon-event-get]: https://cybozu.dev/ja/garoon/docs/js-api/schedule/get-schedule-event/
[garoon-schedule-object]: https://cybozu.dev/ja/garoon/docs/overview/schedule-object/
[iife]: https://developer.mozilla.org/ja/docs/Glossary/IIFE
[origin]: https://developer.mozilla.org/ja/docs/Glossary/Origin
[qiita-ja]: https://qiita.com/ahandsel/items/18308ff3a6daad9029a4
[rfc-5545]: https://datatracker.ietf.org/doc/html/rfc5545
[source-code]: https://github.com/ahandsel/articles/blob/main/garoon-to-apple/garoon-to-apple-bookmarklet-v0.js
[window-api]: https://developer.mozilla.org/ja/docs/Web/API/Window

<!-- Image links -->

[img-demo]: /garoon-to-apple/garoon-to-apple-bookmarklet-demo.gif
