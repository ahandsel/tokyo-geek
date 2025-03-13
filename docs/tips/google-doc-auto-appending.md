# Automatically append weekly report Google Doc with a template

Google Apps Script automation that appends a template Google Doc to another Google Doc.

* The Google Doc with the template will be referred to as the "source" Google Doc.
* The Google Doc that will receive the template will be referred to as the "target" Google Doc.


## What this automation does

* The script inserts the content of one Google Doc (the source) into another (the target) after a specific phrase.
  * It uses the Google App Script's DocumentApp service to interact with Google Docs.
* You can configure the script to run on a weekly basis.


## Google Apps Script code

```javascript
function insertDocContentAfterPhrase() {
  const sourceDocId = 'SOURCE_GOOGLE_DOC_ID'; // Source Google Doc ID
  const targetDocId = 'TARGET_GOOGLE_DOC_ID'; // Target Google Doc ID
  const insertLocation = "Insert Below:"; // Target phrase
  const separator = "----------------------";

  const sourceDoc = DocumentApp.openById(sourceDocId);
  const targetDoc = DocumentApp.openById(targetDocId);

  const sourceBody = sourceDoc.getBody();
  const targetBody = targetDoc.getBody();

  // Find the paragraph index that contains the phrase using Array.findIndex
  const targetParagraphs = targetBody.getParagraphs();
  const targetIndex = targetParagraphs.findIndex(paragraph => 
    paragraph.getText().includes(insertLocation)
  );
  if (targetIndex === -1) {
    Logger.log("Phrase not found in the target document.");
    return;
  }

  let insertIndex = targetIndex + 1;
  
  // Insert a separator for clarity
  targetBody.insertParagraph(insertIndex, separator);
  insertIndex++;

  // Build an array of copied source elements using Array.from
  const numChildren = sourceBody.getNumChildren();
  const sourceElements = Array.from({ length: numChildren }, (_, j) =>
    sourceBody.getChild(j).copy()
  );

  // Use forEach to insert each copied element into the target document
  sourceElements.forEach(element => {
    const type = element.getType();
    switch (type) {
      case DocumentApp.ElementType.PARAGRAPH:
        targetBody.insertParagraph(insertIndex, element);
        break;
      case DocumentApp.ElementType.TABLE:
        targetBody.insertTable(insertIndex, element);
        break;
      case DocumentApp.ElementType.LIST_ITEM:
        targetBody.insertListItem(insertIndex, element);
        break;
      default:
        targetBody.insertParagraph(insertIndex, element);
        break;
    }
    insertIndex++;
  });

  Logger.log("Content inserted successfully after the target phrase.");
}
```


## Setup instructions

1. **Create a Google Apps Script project**  
    * Open Google Drive → Click **+ New** → More → Google Apps Script.
2. **Paste the script above.**
3. **Replace 'GOOGLE_DOC_ID'**  
    * Open your Google Doc → Copy its ID from the URL (between `/d/` and `/edit`).
    * Replace `'GOOGLE_DOC_ID'` in the script.
4. **Replace the target phrase**  
    * Replace `"INSERT NEXT WEEK'S TEMPLATE HERE:"` with the phrase in the target Google Doc where you want to insert the template.
5. **Save the script**  
    * Click **File** → **Save**.
6. **Set up a trigger to run weekly**  
    * Click on **Triggers** (clock icon in Apps Script).
    * Click **+ Add Trigger**.
    * Choose function: `insertDocContentAfterPhrase`
    * Choose event source: **Time-driven**
    * Choose type: **Week timer**
    * Select a day and time to run.


## Code explanation


### Variables

Hard-coded variables:
* `sourceDocId`: The source Google Doc's unique identifier.
* `targetDocId`: The target Google Doc's unique identifier.
* `insertLocation`: A case-sensitive string in the target document where the new content will be inserted below. If there are multiple instances of this phrase, the content will be inserted after the first occurrence.
* `separator`: A hard-coded value used as a visual separator (optional). The code inserts an empty paragraph instead of the separator text for clarity.


### Extract content from the source and target Google Docs

```javascript
const sourceDoc = DocumentApp.openById(sourceDocId);
const targetDoc = DocumentApp.openById(targetDocId);
const sourceBody = sourceDoc.getBody();
const targetBody = targetDoc.getBody();
```

* The identifiers provided in the `sourceDocId` and `targetDocId` variables are used to locate these Google Docs files.
* Using the `DocumentApp` service, the function opens both the source and target Google Docs.
* The `getBody()` method retrieves the main content (body) of each document, which contains all the paragraphs, tables, and other elements that make up the document.


### Verify and find the insertion point

```javascript
const targetParagraphs = targetBody.getParagraphs();
const targetIndex = targetParagraphs.findIndex(paragraph => 
  paragraph.getText().includes(insertLocation)
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


### Copy and prepare content for insertion

```javascript
targetBody.insertParagraph(insertIndex, separator);
insertIndex++;
const numChildren = sourceBody.getNumChildren();
const sourceElements = Array.from({ length: numChildren }, (_, j) =>
  sourceBody.getChild(j).copy()
);
```

* Insert an empty paragraph along with `separator` variable stored string at the insertion point to visually separate the existing content from the new content.
* Using the `getNumChildren()` method, determine the number of elements in the source document.
* Using the `Array.from()` method, create an array of copied elements from the source document. The `copy()` method is used to create a duplicate of each element, ensuring that the original source document is not modified.

> [!TIP]
> Add `.setBold(true)` or `.setUnderline(true)` to format the separator line for better visibility.


### Insert copied content into the target document

```javascript
sourceElements.forEach(element => {
  const type = element.getType();
  switch (type) {
    case DocumentApp.ElementType.PARAGRAPH:
      targetBody.insertParagraph(insertIndex, element);
      break;
    case DocumentApp.ElementType.TABLE:
      targetBody.insertTable(insertIndex, element);
      break;
    case DocumentApp.ElementType.LIST_ITEM:
      targetBody.insertListItem(insertIndex, element);
      break;
    default:
      targetBody.insertParagraph(insertIndex, element);
      break;
  }
  insertIndex++;
});
```

* Iterate over each copied element from the source document using the `forEach()` method.
* Use the `getType()` method to determine the type of each element (paragraph, table, or list item).
* Use the `switch` statement to handle each element type accordingly:
  * If the element is a paragraph, insert it into the target document using `insertParagraph()`.
  * If the element is a table, insert it using `insertTable()`.
  * If the element is a list item, insert it using `insertListItem()`.
  * Insert as a paragraph by default.

> [!TIP]
> If your documents include other types of elements, you may want to add additional cases to handle them appropriately.


### Log a success message

```javascript
Logger.log("Content inserted successfully after the target phrase.");
```

After all elements are inserted into the target document, a log message is generated to indicate that the content has been inserted successfully.


### Notes and considerations

* Expanding the switch statement:
  * The switch statement handles paragraphs, tables, and list items.
• Optimizing content copying:
If the source document is very large, copying every element might slow down the process. In such cases, consider inserting only the necessary portions or using batch processing techniques.
• Using Logger for debugging:
The Logger.log statements are useful for tracking the progress of your script. They can be replaced with other debugging methods if required.

> [!IMPORTANT]  
> Google Doc permissions: Make sure to give your script the permission to access and modify both the source and target documents. Set the sharing permissions accordingly before running the script.


## References

* [Enum ElementType - Apps Script - Google for Developers](https://developers.google.com/apps-script/reference/document/element-type)
* [Class Body - Apps Script - Google for Developers](https://developers.google.com/apps-script/reference/document/body)
