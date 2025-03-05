# Automatically append weekly report Google Doc with a template

Google Apps Script automation that appends a template Google Doc to another Google Doc.

* The Google Doc with the template will be referred to as the "source" Google Doc.
* The Google Doc that will receive the template will be referred to as the "target" Google Doc.


## What this automation does

* The script appends the content of the source Google Doc to the target Google Doc.
* You can configure the script to run on a weekly basis.


## Google Apps Script code

```javascript
function insertDocContentAfterPhrase() {
    var sourceDocId = 'SOURCE_GOOGLE_DOC_ID'; // Replace with the source Google Doc ID 
    var targetDocId = 'TARGET_GOOGLE_DOC_ID'; // Replace with the target Google Doc ID 
    var phraseToFind = "panda:"; // Target phrase

    var sourceDoc = DocumentApp.openById(sourceDocId);
    var targetDoc = DocumentApp.openById(targetDocId);

    var sourceBody = sourceDoc.getBody();
    var targetBody = targetDoc.getBody();
    
    var text = targetBody.getText();
    var index = text.indexOf(phraseToFind);

    if (index === -1) {
        Logger.log("Phrase not found in the target document.");
        return;
    }

    var targetParagraphs = targetBody.getParagraphs();
    for (var i = 0; i < targetParagraphs.length; i++) {
        if (targetParagraphs[i].getText().includes(phraseToFind)) {
            var insertIndex = i + 1; // Insert content after this paragraph

            // Insert a separator for clarity
            targetBody.insertParagraph(insertIndex, "").setBold(true);
            insertIndex++;

            // Insert each element from the source document
            var numChildren = sourceBody.getNumChildren();
            for (var j = 0; j < numChildren; j++) {
                var element = sourceBody.getChild(j).copy();
                var type = element.getType();

                if (type == DocumentApp.ElementType.PARAGRAPH) {
                    targetBody.insertParagraph(insertIndex, element);
                } else if (type == DocumentApp.ElementType.TABLE) {
                    targetBody.insertTable(insertIndex, element);
                } else if (type == DocumentApp.ElementType.LIST_ITEM) {
                    targetBody.insertListItem(insertIndex, element);
                } else {
                    targetBody.insertParagraph(insertIndex, element);
                }
                insertIndex++;
            }

            Logger.log("Content inserted successfully after the target phrase.");
            return;
        }
    }
}
```


## Setup instructions

1. **Create a Google Apps Script project**  
    * Open Google Drive → Click **+ New** → More → Google Apps Script.
2. **Paste the script above.**
3. **Replace 'GOOGLE_DOC_ID'**  
    * Open your Google Doc → Copy its ID from the URL (between `/d/` and `/edit`).
    * Replace `'GOOGLE_DOC_ID'` in the script.
4. **Set up a trigger to run weekly**  
    * Click on **Triggers** (clock icon in Apps Script).
    * Click **+ Add Trigger**.
    * Choose function: `insertDocContentAfterPhrase`
    * Choose event source: **Time-driven**
    * Choose type: **Week timer**
    * Select a day and time to run.
