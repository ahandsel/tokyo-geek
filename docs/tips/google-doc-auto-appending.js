/**
 * Inserts content from a source Google Doc into a target Google Doc after a specified phrase.
 * Versions:
 * + 1.0.1 (2025-03-13): Polished code; added more element-specific handling.
 * 
 * @param {string} sourceDocId - The ID of the source Google Doc.
 * @param {string} targetDocId - The ID of the target Google Doc.
 * @param {string} insertLocation - The phrase after which content will be inserted.
 * @param {string} separator - Optional separator text for clarity.
 */

function insertDocContentAfterPhrase() {
  const sourceDocId = "SOURCE_GOOGLE_DOC_ID"; // Source Google Doc ID
  const targetDocId = "TARGET_GOOGLE_DOC_ID"; // Target Google Doc ID
  const insertLocation = "Insert Below:"; // Target phrase
  const separator = "----------------------";

  const sourceDoc = DocumentApp.openById(sourceDocId);
  const targetDoc = DocumentApp.openById(targetDocId);

  const sourceBody = sourceDoc.getBody();
  const targetBody = targetDoc.getBody();

  // Find the paragraph insertIndex that contains the phrase using Array.findIndex
  const targetParagraphs = targetBody.getParagraphs();
  const targetIndex = targetParagraphs.findIndex((paragraph) =>
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

  // Insert each copied element into the target document with the appropriate method
  sourceElements.forEach((element) => {
    const type = element.getType();
    switch (type) {
      case DocumentApp.ElementType.INLINE_IMAGE:
        targetBody.insertImage(insertIndex, element);
        break;
      case DocumentApp.ElementType.PAGE_BREAK:
        targetBody.insertPageBreak(insertIndex, element);
        break;
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
        // For any unhandled element types, default to inserting as a paragraph.
        targetBody.insertParagraph(insertIndex, element);
        break;
    }
    insertIndex++;
  });

  Logger.log("Content inserted successfully after the target phrase.");
}
