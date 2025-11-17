---
title: Google Doc automation - append weekly report with a template
description: Example of a Google Apps Script automation that appends a Google Doc with a template on a given schedule.
head:
  - - meta
    - name: keywords
      content: google docs, apps script, automation, template, weekly report
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

Google Apps Script automation that inserts content from a source Google Doc into another Google Doc after a specified phrase.

* The Google Doc with the template will be referred to as the "source" Google Doc.
* The Google Doc that will receive the template will be referred to as the "target" Google Doc.


## Table of contents <!-- omit in toc -->

* [What this automation does](#what-this-automation-does)
* [Google Apps Script code](#google-apps-script-code)
* [Setup instructions](#setup-instructions)
* [Code explanation](#code-explanation)
  * [Variables](#variables)
  * [Extract content from the source and target Google Docs](#extract-content-from-the-source-and-target-google-docs)
  * [Verify and find the insertion point](#verify-and-find-the-insertion-point)
  * [Inserting a separator and building the source elements array](#inserting-a-separator-and-building-the-source-elements-array)
  * [Insert copied content into the target document](#insert-copied-content-into-the-target-document)
  * [Inserting each element into the target document](#inserting-each-element-into-the-target-document)
  * [Log a success message](#log-a-success-message)
* [References](#references)


## What this automation does

* The script inserts the content of one Google Doc (the source) into another (the target) after a specific phrase.
  * It uses the Google Apps Script's DocumentApp service to interact with Google Docs.
* You can configure the script to run on a weekly basis.


## Google Apps Script code

<<< @/tips/google-doc-auto-appending.js


## Setup instructions

1. **Create a Google Apps Script project**
   * Open Google Drive → Click **+ New** → More → Google Apps Script.
2. **Paste the script above.**
3. **Add the Google Doc IDs**
   * Replace the placeholders `SOURCE_GOOGLE_DOC_ID` and `TARGET_GOOGLE_DOC_ID` with the actual Google Doc IDs.
   * The Google Doc ID is the unique identifier found in the URL of the document. For example, in `https://docs.google.com/document/d/1_h0aQdM1mBSZawk2stu9Ng_TCZm4UvsFJ9y5prYuCtU/edit`, the ID is `1_h0aQdM1mBSZawk2stu9Ng_TCZm4UvsFJ9y5prYuCtU`.
4. **Replace the target phrase**
   * Replace `Insert Below:` with the phrase in the target Google Doc where you want to insert the template.
5. **Save the script**
   * Click **File** → **Save**.
6. **Set up a trigger to run weekly**
   * Click on **Triggers** (clock icon in Apps Script).
   * Click **+ Add Trigger**.
   * Choose function: `insertDocContentAfterPhrase`
   * Choose event source: **Time-driven**
   * Choose type: **Week timer**
   * Select a day and time to run.

> [!IMPORTANT]  
> Google Doc permissions: Ensure your script has permission to access and modify both the source and target documents. Set the sharing permissions accordingly before running the script.


## Code explanation


### Variables

* `srcDocId`: The source Google Doc's unique identifier.
* `targetDocId`: The target Google Doc's unique identifier.
* `insertLocation`: A case-sensitive string in the target document where the new content will be inserted below. If there are multiple instances of this phrase, the content will be inserted after the first occurrence.
* `separator`: A hard-coded value used as a visual separator (optional). The code inserts an empty paragraph instead of the separator text for clarity.


### Extract content from the source and target Google Docs

```javascript
const srcDoc = DocumentApp.openById(srcDocId).getBody();
const targetBody = DocumentApp.openById(targetDocId).getBody();
```

* The identifiers provided in the `srcDocId` and `targetDocId` variables are used to locate these Google Docs files.
* Using the `DocumentApp` service, the function opens both the source and target Google Docs.
* The `getBody()` method retrieves the main content (body) of each document, which contains all the paragraphs, tables, and other elements that make up the document.


### Verify and find the insertion point

```javascript
const targetParagraphs = targetBody.getParagraphs();
const targetIndex = targetParagraphs.findIndex((paragraph) =>
  paragraph.getText().includes(insertLocation),
);
if (targetIndex === -1) {
  Logger.log("Phrase not found in the target document.");
  return;
}

let insertIndex = targetIndex + 1;
```

* Use the `getParagraphs()` method to retrieve an array of all paragraphs in the target document.
* Use the `findIndex()` method to locate the paragraph that contains the specified marker phrase (`insertLocation`). If the phrase is not found, log an error message and exit the function.
* If the phrase is found, calculate the insertion point (`insertIndex`) as the paragraph immediately following the one that contains the marker.

> [!IMPORTANT]  
> `insertLocation` value is a case-sensitive string that must match the exact text in the target document. Ensure that the marker phrase is correctly specified to avoid errors.


### Inserting a separator and building the source elements array

```javascript
// Insert a separator for clarity
targetBody.insertParagraph(insertIndex, separator);
insertIndex++;

// Build an array of source elements using Array.from.
const srcElements = Array.from({ length: srcDoc.getNumChildren() }, (_, j) =>
  srcDoc.getChild(j),
);
```

* Insert an empty paragraph along with the string stored in the `separator` variable at the insertion point to visually separate the existing content from the new content.
* Use the `getNumChildren()` method to determine the number of elements in the source document.
* Use the `Array.from()` method to create an array of copied elements from the source document. The `copy()` method is used to create a duplicate of each element, ensuring that the original source document is not modified.

> [!TIP]  
> Add `.setBold(true)` or `.setUnderline(true)` to format the separator line for better visibility.


### Insert copied content into the target document

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
      console.log("Element type not supported: " + element.getType());
      targetBody.insertParagraph(index, element.copy()); // Insert as a paragraph by default.
      break;
  }
};
```

* Iterate over each copied element from the source document using the `forEach()` method.
* Use the `getType()` method to determine the type of each element (paragraph, table, or list item).
* Use the `switch` statement to handle each element type accordingly:
  * If the element is an inline image, insert it into the target document using `insertImage()`.
  * If the element is a page break, insert it using `insertPageBreak()`.
  * If the element is a paragraph, insert it into the target document using `insertParagraph()`.
  * If the element is a table, insert it using `insertTable()`.
  * If the element is a list item, insert it using `insertListItem()`. To avoid losing formatting, the script copies the attributes and glyph type from the source list item to the newly inserted list item.
* Insert as a paragraph by default.
* The helper function `insertElement` checks each element's type and uses the appropriate insertion method. It handles inline images, page breaks, paragraphs, tables, and list items. For list items, it applies additional formatting.


### Inserting each element into the target document

```javascript
srcElements.forEach((element) => {
  insertElement(element, insertIndex);
  insertIndex++;
});
```

* Iterate over each element in the `srcElements` array.
* For each element, call the `insertElement()` function to insert it into the target document at the specified index.
* Increment the `insertIndex` after inserting each element to ensure that the elements are inserted in the correct order.


### Log a success message

```javascript
Logger.log("Content inserted successfully after the target phrase.");
```

* After all elements are inserted into the target document, a log message is generated to indicate that the content has been inserted successfully.


## References

* [Enum ElementType - Apps Script - Google for Developers](https://developers.google.com/apps-script/reference/document/element-type)
* [Class Body - Apps Script - Google for Developers](https://developers.google.com/apps-script/reference/document/body)
