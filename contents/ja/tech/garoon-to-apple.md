---
title: ガルーンのイベントを Apple カレンダーにエクスポートするブックマークレット
description: 開いているガルーンのイベントを iCal ファイルに変換して Apple カレンダーに取り込むブックマークレットと、そのコードの解説です。
head:
  - - meta
    - name: keywords
      content: garoon, apple calendar, bookmarklet, javascript, ical, rfc 5545, calendar, cybozu
externalPostUrl: https://qiita.com/ahandsel/items/18308ff3a6daad9029a4
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

ガルーンから Apple カレンダーにイベントの詳細をコピーして貼り付けるのは面倒です。
このブックマークレットは、開いている任意のガルーンのイベントから iCal ファイルを生成するので、1 クリックでイベントの詳細を引き継げます。

ファイルはブラウザーの中で組み立てるため、イベントの標題とメモがページの外に出ることはありません。

![ガルーンのイベントを Apple カレンダーにエクスポートするブックマークレットのデモ][img-demo]


## 使い方


### 初期設定

1. 下記の[ブックマークレットのコード](#ブックマークレットのコード)をコピーします。
2. Chrome のアドレスバーに`@bookmarks`と入力します。
3. 右上の`⋮`アイコンをクリックします。
4. **ブックマークを追加**をクリックし、URL フィールドにコードを貼り付けます。

> [!NOTE] 補足
> URL フィールドに貼り付けたときにブラウザーが改行を取り除いても動作するように、コードではブロックコメントを使っています。


### ガルーンのイベントを Apple カレンダーにエクスポートする

1. ガルーンのイベントのページを開きます。
2. ブックマークレットをクリックします。
3. ダウンロードされた`garoon-<イベント ID>.ics`ファイルを開き、イベントが Apple カレンダーアプリに追加されていることを確認します。

ブックマークレットはファイルを組み立て、新しいタブを開かずにそのままダウンロードを開始します。


### トラブルシューティング

エクスポートに失敗した場合は、ブックマークレットがアラートを表示します。

* 「Error: Not on a Garoon event.」 - ページがガルーンのイベントページではないか、イベントに開始時刻がありません。特定のイベントを開いて、もう一度ブックマークレットをクリックします。
* 「Error: Could not build the iCal file.」 - イベントオブジェクトは取得できましたが、ファイルの組み立てに失敗しました。アラートにはエラーメッセージが含まれます。

アラートが表示されず、ファイルもダウンロードされない場合は、ブラウザーのコンソールでログに出力された`event`オブジェクトと生成された iCal のテキストを確認します。

1. ブラウザーのコンソールを開きます。
   * Mac：`Command+Option+C`
   * Windows、Linux、Chrome OS：`Control+Shift+C`
2. ログに出力された`event`オブジェクトと`ics`の文字列を確認します。


## ブックマークレットのコード

<<< @/public/garoon-to-apple/garoon-to-apple-bookmarklet-v1.js


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
})();
```


### ガルーンのイベントオブジェクトを取得する

[`garoon.schedule.event.get()`][garoon-event-get] JavaScript API を使って、開いているガルーンのイベントのイベントオブジェクトを取得します。

[`window`ウェブ API][window-api] により、グローバルスコープから`garoon`オブジェクトにアクセスできます。

```javascript
const event = window.garoon?.schedule?.event?.get();
```


### 入力を確認する

処理を進める前に、イベントに開始時刻があることを確認します。

```javascript
const event = window.garoon?.schedule?.event?.get();

if (!event?.start?.dateTime) {
  alert(`Error: Not on a Garoon event.\nPlease open a specific Garoon event.`);
  return;
}
```

以前のバージョンではイベントを`undefined`と比較していましたが、この書き方では値が`null`のときに条件をすり抜け、あとでわかりにくいエラーになります。
偽値かどうかを確認すれば、`undefined`と`null`の両方を 1 つの条件でカバーできます。

イベント自体ではなく`start.dateTime`を確認しているのは、これがスクリプトの処理に唯一欠かせないフィールドだからです。
ほかのフィールドは任意で、値がない場合はスクリプトが適切な既定値で処理します。


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


### iCal のテキストを組み立てる

iCal ファイルはプレーンテキストなので、どのサービスも呼び出さずにブラウザーだけで組み立てられます。
形式は [RFC 5545][rfc-5545] で定義されており、各行は`NAME:value`という形のプロパティです。

1 件のイベントには、1 つの`VEVENT`ブロックを囲む`VCALENDAR`が必要です。

```javascript
const lines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//tokyo-geek//garoon-to-apple//EN",
  "CALSCALE:GREGORIAN",
  "BEGIN:VEVENT",
  `UID:garoon-${event.id}@${host}`,
  `DTSTAMP:${utcStamp(now)}`,
  `SEQUENCE:${Math.floor(now.getTime() / 60000)}`,
  dtStart,
  dtEnd,
  `SUMMARY:${escapeText(event.subject)}`,
  `URL:${eventUrl}`,
];
if (event.notes) lines.push(`DESCRIPTION:${escapeText(event.notes)}`);
if (rooms) lines.push(`LOCATION:${escapeText(rooms)}`);
lines.push("END:VEVENT", "END:VCALENDAR");

return lines.map(foldLine).join("\r\n") + "\r\n";
```

最後の行には、重要な点が 2 つあります。

* 行の連結には、単なる改行ではなく`CRLF`を使います。RFC 5545 のセクション 3.1 で定められており、`LF`だけのファイルは厳密なパーサーに拒否されます。
* 連結の前に、すべての行が`foldLine`を通ります。詳細は[長い行を折り返す](#長い行を折り返す)を参照してください。

それぞれの値は、本来入るべきフィールドに入れます。メモは`DESCRIPTION`に、会議室は`LOCATION`に、ガルーンのリンクは`URL`に入れます。
リンクを説明文に混ぜないことが重要です。`URL`は TEXT 値ではなく URI 値なので、エスケープせずに保存され、Apple カレンダーはメモの末尾に並ぶただの文字列ではなく、本物のリンクとして表示できます。

会議室の名前はイベントの`facilities`配列から取得しますが、会議室のないイベントではこの配列自体が存在しないため、既定値として空の配列を使います。

```javascript
const rooms = (event.facilities ?? []).map((facility) => facility.name).join(", ");
```

`DESCRIPTION`と`LOCATION`は、入れる値があるときだけ追加されるため、メモも会議室もないイベントで空のプロパティが 2 つ残ることはありません。


### 開始時刻と終了時刻を書式設定する

ガルーンは`2026-08-20T14:30:00+09:00`のような絶対時刻の RFC 3339 のタイムスタンプを返します。
`toISOString()`を呼ぶと同じ瞬間が UTC に変換され、区切り記号を取り除くと iCal の日時形式になります。

```javascript
const utcStamp = (value) =>
  new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
```

Asia/Tokyo の 14:30 開始は`20260820T053000Z`になります。
末尾の`Z`はその値が UTC であることを示し、解釈は 1 通りしかないため、ファイルに`VTIMEZONE`ブロックは必要ありません。
Apple カレンダーは、イベントを表示するときにこの瞬間を閲覧者のローカルのタイムゾーンに変換します。

ファイルにタイムゾーン名を含めていないのも、この理由からです。
以前のバージョンは UTC のタイムスタンプと`Asia/Tokyo`のタイムゾーンパラメーターを同時に送っていましたが、これは矛盾した入力です。タイムスタンプはすでに絶対時刻なので、2 つ目のタイムゾーンは無視されるか、二重に適用されるかのどちらかになります。

終了時刻のないイベント（`isStartOnly`）には使える`end.dateTime`がないため、長さ 0 のイベントとしてエクスポートせずに 1 時間の長さを与えます。

```javascript
const end = event.end?.dateTime
  ? new Date(event.end.dateTime)
  : new Date(start.getTime() + 3600000);
```


### 終日のイベントを処理する

終日のイベントは、たまたま午前 0 時に始まる時刻指定のイベントではありません。
iCal には終日のイベント専用の形式があり、代わりに時刻指定の形式を使っていたことが、以前のバージョンが終日のイベントを間違った日にエクスポートしていた原因です。

```javascript
if (event.isAllDay === true) {
  const endSource = event.end?.dateTime ?? event.start.dateTime;
  dtStart = `DTSTART;VALUE=DATE:${dateStamp(event.start.dateTime)}`;
  dtEnd = `DTEND;VALUE=DATE:${dayAfter(dateStamp(endSource))}`;
}
```

ここで適用されるルールは 2 つです。

* `VALUE=DATE`は、その値が時刻もタイムゾーンも持たない暦日であることを示し、`20260820`のように書きます。
* `DTEND`は終了日を含まないため、8 月 20 日の 1 日だけのイベントは 8 月 21 日で終わります。1 日進めないと、Apple カレンダーでは長さ 0 のイベントになります。

日付そのものは、`Date`オブジェクトからではなく RFC 3339 の文字列を切り出して取得します。

```javascript
const dateStamp = (dateTime) => String(dateTime).slice(0, 10).replace(/-/g, "");
```

[スケジュールオブジェクト][garoon-schedule-object]のドキュメントによると、ガルーンは終日のイベントの開始をローカルのタイムゾーンの`00:00:00`として返します。
この午前 0 時を UTC に変換すると、JST の利用者では前日の 15:00 に移動してしまうため、この瞬間に対して日付の計算を行うとバグが再発します。
文字列を切り出せば、書かれているとおりのローカルの日付を取得でき、変換そのものを避けられます。

> [!NOTE] 補足
> ガルーンのドキュメントでは、JavaScript API が終日のイベントの終了を最終日の 00:00:00 として返すことが示唆されている一方で、REST API は 23:59:59 を返しますが、複数日にわたる終日のイベントでどちらが返るかは未確認です。


### テキストの値をエスケープする

RFC 5545 のセクション 3.3.11 では、TEXT の値の中で 4 つの文字に特別な意味を持たせています。バックスラッシュ、セミコロン、カンマ、そして改行です。
これらをそのまま書くと値が壊れます。とくに多いのがエスケープしていないカンマで、パーサーが 2 つ目の値の始まりと解釈し、1 つ目の値が途中で切れてしまいます。

```javascript
const escapeText = (input) =>
  String(input ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|[\r\n]/g, "\\n");
```

バックスラッシュを最初に置き換えるのは、後続のルールが追加したバックスラッシュを二重に置き換えないためです。
入力を`String(input ?? "")`で包んでいるため、標題やメモがなくてもエラーにならず、空の値になります。

次のようなメモは、

```text
Review the draft, then reply
Thanks
```

ファイルには次のように書き込まれます。

```text
DESCRIPTION:Review the draft\, then reply\nThanks
```

ここでの`\n`は改行ではなく、バックスラッシュと文字の 2 文字です。
値の中に本物の改行があると、そこでプロパティが終わってしまいます。


### 長い行を折り返す

RFC 5545 のセクション 3.1 は、1 つの内容行を 75 オクテットまでに制限し、それより長いものは複数行に分割します。
継続行は半角スペース 1 つで始まり、パーサーは`CRLF`とそのスペースを取り除いて元の値に戻します。

この上限が数えるのは、文字数ではなくオクテット数です。
ガルーンでは標題やメモが日本語であることが多いため、この違いは無視できません。日本語の 1 文字は UTF-8 で 3 バイトなので、75 文字の行は 225 オクテット、上限の 3 倍になります。
バイト数を数えるために使うのが [`TextEncoder`][text-encoder] です。

```javascript
const bytes = new TextEncoder().encode(line);
if (bytes.length <= 75) return line;
```

バイト配列を切るときには 2 つの危険があり、ループはその両方を防いでいます。

* マルチバイト文字の途中で切ると、壊れた断片が 2 つできます。UTF-8 の継続バイトはすべてビット`10`で始まるため、文字の先頭バイトに到達するまで切る位置を戻します。
* バックスラッシュとそれがエスケープする文字の間で切ると、エスケープの組が分断されます。切る位置の直前にあるバックスラッシュの数を数え、奇数なら 1 バイト戻すことで、組を保てます。

```javascript
while (end > cut + 1 && (bytes[end] & 0xc0) === 0x80) end--;
let slashes = 0;
while (bytes[end - 1 - slashes] === 0x5c) slashes++;
if (slashes % 2 === 1) end--;
```

継続行を 75 オクテットではなく 74 オクテットで切っているのは、先頭のスペースも上限に含まれるためです。

日本語の標題は、次のように折り返されます。

```text
SUMMARY:定例ミーティング：第三四半期の進捗確認と来期
 の予算計画のレビュー
```

1 行目は 74 オクテットです。`SUMMARY:`の 8 オクテットと、日本語 22 文字の 66 オクテットの合計です。
あと 1 文字増えると 77 オクテットになります。


### イベントに安定した UID を付与する

`UID`は、取り込まれたイベントが新しいイベントなのか、すでに持っているイベントの新しいコピーなのかを、カレンダーアプリが判断するための値です。
`UID`が変わらなければ、再エクスポートを同じイベントとして認識できるため、Apple カレンダーはコピーを追加せずに既存のイベントを更新できます。
`UID`がなければ、エクスポートのたびに重複が増えていきます。

```javascript
`UID:garoon-${event.id}@${host}`,
`DTSTAMP:${utcStamp(now)}`,
`SEQUENCE:${Math.floor(now.getTime() / 60000)}`,
```

ホスト名には`.s.`を取り除いたものを使うため、ガルーンの 2 つのアクセス URL のどちらからでも、同じイベントには同じ`UID`が生成されます。

`SEQUENCE`はイベントの版数で、更新として受け入れられるには値が増えている必要があります。
現在時刻を分単位で使えば、2 回目のエクスポートの値が 1 回目より必ず大きくなります。


### ファイルをダウンロードする

組み立てたテキストを [`Blob`][blob] に入れ、[`URL.createObjectURL()`][create-object-url] でその Blob をページからリンクできる URL に変換します。

```javascript
const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
const objectUrl = URL.createObjectURL(blob);
const anchor = document.createElement("a");
anchor.href = objectUrl;
anchor.download = fileName;
document.body.append(anchor);
anchor.click();
anchor.remove();
setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
```

[`download`属性][download-attribute]は、リンク先に移動する代わりに保存するようブラウザーに指示し、ファイル名も指定します。
オブジェクト URL は、それを作成したページと同一オリジンなので、この属性が有効になります。

ウィンドウを開かないため、ポップアップブロックと戦う必要はなく、2 回目のクリックなしでダウンロードが始まります。

オブジェクト URL は、ドキュメントが破棄されるまで Blob をメモリー上に保持するため、`revokeObjectURL()`で解放します。
ダウンロードが始まる時間を確保するために、この呼び出しは遅らせています。


### デバッグ用にログを出力する

デバッグに役立つように、`event`オブジェクトと生成された iCal のテキストをコンソールに出力し、スクリプトの入力と出力の両方を確認できるようにします。

```javascript
console.log({ event, ics });
```

スクリプト全体は`try`ブロックの中でも実行されるため、想定外のイベントの形が来ても、何も起きないのではなく、アラートの表示とスタックトレースの出力が行われます。

```javascript
} catch (error) {
  console.error(error);
  alert(`Error: Could not build the iCal file.\n${error.message}`);
}
```


## v1 へのアップグレード

このブックマークレットの最初のバージョンは、クエリー文字列を組み立てて`calndr.link`に渡していました。iCal ファイルを返す無料のサービスです。
そのサービスはもうありません。エンドポイントは AddCal にリダイレクトされ、カレンダーのファイルではなく HTML のページを返すようになり、ドキュメントに記載された後継の機能は有料プランの Dynamic Link Key を必要とします。
元のコードは [`garoon-to-apple-bookmarklet-v0.js`][source-code-v0] として参照用に残しています。

ブラウザーの中でファイルを生成すると、この依存がなくなります。さらに、イベントの標題、メモ、社内のガルーンの URL がページの外に出ることもなくなります。
メモに議事録、顧客名、会議のリンクが入りうる仕事のカレンダーでは、こちらのほうが重要な変更点です。


## お役に立ちましたか？

この記事やブックマークレットが参考になりましたら、[お茶をおごって][coffee]いただけると嬉しいです。🍵


## 参考資料

* [スケジュールオブジェクト - cybozu developer network][garoon-schedule-object]
* [スケジュールのイベントを取得する - cybozu developer network][garoon-event-get]
* [RFC 5545 - iCalendar の仕様][rfc-5545]
  * [セクション 3.1 - 内容行][rfc-5545-3-1]
  * [セクション 3.3.11 - テキスト][rfc-5545-3-3-11]
* [Blob - MDN][blob]
* [URL.createObjectURL() - MDN][create-object-url]
* [download 属性 - MDN][download-attribute]
* [TextEncoder - MDN][text-encoder]
* [garoon-to-apple-bookmarklet-v1.js - GitHub][source-code]
* 初出は [DEV][devto-original] と [Qiita][qiita-ja] です。

<!-- Links -->

[blob]: https://developer.mozilla.org/ja/docs/Web/API/Blob
[client-cert-auth]: https://jp.cybozu.help/general/ja/id/02047.html#list_access_secureaccess_10
[coffee]: https://ko-fi.com/ahandsel
[create-object-url]: https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL_static
[devto-original]: https://dev.to/ahandsel/import-a-garoon-event-to-apple-calendar-bookmarklet-cj0
[download-attribute]: https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/a#download
[garoon-event-get]: https://cybozu.dev/ja/garoon/docs/js-api/schedule/get-schedule-event/
[garoon-schedule-object]: https://cybozu.dev/ja/garoon/docs/overview/schedule-object/
[iife]: https://developer.mozilla.org/ja/docs/Glossary/IIFE
[origin]: https://developer.mozilla.org/ja/docs/Glossary/Origin
[qiita-ja]: https://qiita.com/ahandsel/items/18308ff3a6daad9029a4
[rfc-5545]: https://datatracker.ietf.org/doc/html/rfc5545
[rfc-5545-3-1]: https://datatracker.ietf.org/doc/html/rfc5545#section-3.1
[rfc-5545-3-3-11]: https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.11
[source-code]: https://github.com/ahandsel/tokyo-geek/blob/main/contents/public/garoon-to-apple/garoon-to-apple-bookmarklet-v1.js
[source-code-v0]: https://github.com/ahandsel/tokyo-geek/blob/main/contents/public/garoon-to-apple/garoon-to-apple-bookmarklet-v0.js
[text-encoder]: https://developer.mozilla.org/ja/docs/Web/API/TextEncoder
[window-api]: https://developer.mozilla.org/ja/docs/Web/API/Window

<!-- Image links -->

[img-demo]: /garoon-to-apple/garoon-to-apple-bookmarklet-demo.gif
