---
title: Google Doc 自動化 - テンプレートで週次レポートを追記する
description: 指定されたスケジュールで Google Doc にテンプレートを追記する Google Apps Script の自動化の例です。
head:
  - - meta
    - name: keywords
      content: google docs, apps script, automation, template, weekly report
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

ソースの Google Doc のコンテンツを、指定されたフレーズの後に別の Google Doc に挿入する Google Apps Script の自動化です。

* テンプレートが入っている Google Doc を「ソース」Google Doc と呼びます。
* テンプレートを受け取る Google Doc を「ターゲット」Google Doc と呼びます。

[[toc]]


## この自動化でできること

* このスクリプトは、1 つの Google Doc（ソース）のコンテンツを、特定のフレーズの後に別の Google Doc（ターゲット）に挿入します。
  * Google Apps Script の DocumentApp サービスを使って Google Docs を操作します。
* スクリプトを毎週実行するように設定できます。


## Google Apps Script コード

<<< @/public/share/google-doc-auto-appending.js


## セットアップ手順

1. **Google Apps Script プロジェクトを作成する**
   * Google Drive を開く → **+ 新規** → その他 → Google Apps Script をクリックします。
2. **上記のスクリプトを貼り付けます。**
3. **Google Doc ID を追加する**
   * プレースホルダーの`SOURCE_GOOGLE_DOC_ID`と`TARGET_GOOGLE_DOC_ID`を実際の Google Doc ID に置き換えます。
   * Google Doc ID はドキュメントの URL に含まれる一意の識別子です。例えば、`https://docs.google.com/document/d/1_h0aQdM1mBSZawk2stu9Ng_TCZm4UvsFJ9y5prYuCtU/edit`の場合、ID は`1_h0aQdM1mBSZawk2stu9Ng_TCZm4UvsFJ9y5prYuCtU`です。
4. **ターゲットフレーズを置き換える**
   * `Insert Below:`を、テンプレートを挿入したいターゲット Google Doc 内のフレーズに置き換えます。
5. **スクリプトを保存する**
   * **ファイル** → **保存**をクリックします。
6. **毎週実行するトリガーを設定する**
   * Apps Script の**トリガー**（時計アイコン）をクリックします。
   * **+ トリガーを追加**をクリックします。
   * 関数を選択：`insertDocContentAfterPhrase`
   * イベントのソースを選択：**時間主導型**
   * タイプを選択：**週タイマー**
   * 実行する曜日と時間を選択します。

> [!IMPORTANT]
> Google Doc の権限：スクリプトがソースとターゲットの両方のドキュメントにアクセス・変更できる権限があることを確認してください。スクリプトを実行する前に、共有権限を適切に設定してください。


## コードの説明


### 変数

* `srcDocId`：ソース Google Doc の一意の識別子です。
* `targetDocId`：ターゲット Google Doc の一意の識別子です。
* `insertLocation`：ターゲットドキュメント内の大文字小文字を区別する文字列で、この文字列の下に新しいコンテンツが挿入されます。このフレーズが複数ある場合、最初の出現箇所の後にコンテンツが挿入されます。
* `separator`：視覚的な区切り線として使用されるハードコードされた値です（オプション）。コードは分かりやすさのため、区切りテキストの代わりに空の段落を挿入します。


### ソースとターゲットの Google Doc からコンテンツを取得する

```javascript
const srcDoc = DocumentApp.openById(srcDocId).getBody();
const targetBody = DocumentApp.openById(targetDocId).getBody();
```

* `srcDocId`と`targetDocId`変数で指定された識別子を使って、これらの Google Docs ファイルを特定します。
* `DocumentApp`サービスを使って、ソースとターゲットの両方の Google Docs を開きます。
* `getBody()`メソッドで各ドキュメントのメインコンテンツ（本文）を取得します。本文にはドキュメントを構成するすべての段落、テーブル、その他の要素が含まれています。


### 挿入ポイントの確認と検索

```javascript
const targetParagraphs = targetBody.getParagraphs();
const targetIndex = targetParagraphs.findIndex((paragraph) =>
  paragraph.getText().includes(insertLocation),
);
if (targetIndex === -1) {
  Logger.log('Phrase not found in the target document.');
  return;
}

let insertIndex = targetIndex + 1;
```

* `getParagraphs()`メソッドを使って、ターゲットドキュメント内のすべての段落の配列を取得します。
* `findIndex()`メソッドを使って、指定されたマーカーフレーズ（`insertLocation`）を含む段落を検索します。フレーズが見つからない場合は、エラーメッセージをログに記録して関数を終了します。
* フレーズが見つかった場合、マーカーを含む段落の直後を挿入ポイント（`insertIndex`）として計算します。

> [!IMPORTANT]
> `insertLocation`の値は大文字小文字を区別する文字列で、ターゲットドキュメント内の正確なテキストと一致する必要があります。エラーを防ぐため、マーカーフレーズが正しく指定されていることを確認してください。


### セパレーターの挿入とソース要素配列の構築

```javascript
// Insert a separator for clarity
targetBody.insertParagraph(insertIndex, separator);
insertIndex++;

// Build an array of source elements using Array.from.
const srcElements = Array.from({ length: srcDoc.getNumChildren() }, (_, j) =>
  srcDoc.getChild(j),
);
```

* 挿入ポイントに`separator`変数に格納された文字列とともに空の段落を挿入し、既存のコンテンツと新しいコンテンツを視覚的に区切ります。
* `getNumChildren()`メソッドを使って、ソースドキュメント内の要素数を取得します。
* `Array.from()`メソッドを使って、ソースドキュメントからコピーされた要素の配列を作成します。`copy()`メソッドを使って各要素の複製を作成し、元のソースドキュメントが変更されないようにします。

> [!TIP]
> `.setBold(true)`や`.setUnderline(true)`を追加して、セパレーター行を目立たせるようにフォーマットできます。


### コピーしたコンテンツをターゲットドキュメントに挿入する

```javascript
const insertElement = (element, index) => {
  switch (element.getType()) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      targetBody.insertImage(index, element.copy());
      break;
    case DocumentApp.ElementType.PAGE_BREAK:
      targetBody.insertPageBreak(index, element.copy());
      break;
    case DocumentApp.ElementType.PARAGRAPH:
      targetBody.insertParagraph(index, element.copy());
      break;
    case DocumentApp.ElementType.TABLE:
      targetBody.insertTable(index, element.copy());
      break;
    case DocumentApp.ElementType.LIST_ITEM: {
      const newListItem = targetBody.insertListItem(index, element.getText());
      newListItem.setAttributes(element.getAttributes());
      newListItem.setGlyphType(element.getGlyphType());
      break;
    }
    default:
      console.log('Element type not supported: ' + element.getType());
      targetBody.insertParagraph(index, element.copy()); // Insert as a paragraph by default.
      break;
  }
};
```

* `forEach()`メソッドを使って、ソースドキュメントからコピーした各要素を反復処理します。
* `getType()`メソッドを使って、各要素のタイプ（段落、テーブル、リストアイテム）を判定します。
* `switch`文を使って各要素タイプを処理します。
  * インライン画像の場合、`insertImage()`を使ってターゲットドキュメントに挿入します。
  * ページブレークの場合、`insertPageBreak()`を使って挿入します。
  * 段落の場合、`insertParagraph()`を使ってターゲットドキュメントに挿入します。
  * テーブルの場合、`insertTable()`を使って挿入します。
  * リストアイテムの場合、`insertListItem()`を使って挿入します。フォーマットが失われないように、ソースのリストアイテムから属性とグリフタイプを新しいリストアイテムにコピーします。
* デフォルトでは段落として挿入します。
* ヘルパー関数`insertElement`は、各要素のタイプをチェックして適切な挿入メソッドを使用します。インライン画像、ページブレーク、段落、テーブル、リストアイテムを処理します。リストアイテムには追加のフォーマットを適用します。


### 各要素をターゲットドキュメントに挿入する

```javascript
srcElements.forEach((element) => {
  insertElement(element, insertIndex);
  insertIndex++;
});
```

* `srcElements`配列内の各要素を反復処理します。
* 各要素に対して`insertElement()`関数を呼び出し、指定されたインデックスの位置にターゲットドキュメントに挿入します。
* 各要素の挿入後に`insertIndex`をインクリメントして、要素が正しい順序で挿入されるようにします。


### 成功メッセージをログに記録する

```javascript
Logger.log('Content inserted successfully after the target phrase.');
```

* すべての要素がターゲットドキュメントに挿入された後、コンテンツが正常に挿入されたことを示すログメッセージが生成されます。


## 参考リンク

* [Enum ElementType - Apps Script - Google for Developers](https://developers.google.com/apps-script/reference/document/element-type)
* [Class Body - Apps Script - Google for Developers](https://developers.google.com/apps-script/reference/document/body)
