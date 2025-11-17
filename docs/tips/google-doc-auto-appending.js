/**
 * Inserts content from a source Google Doc into a target Google Doc after a specified phrase.
 * Versions:
 * + 1.0.4 (2025-03-13): Addressed teh list format issue
 * + 1.0.2 (2025-03-13): Polished code; added more element-specific handling.
 *
 * @param {string} srcDocId - Source Google Doc's ID.
 * @param {string} targetDocId - Target Google Doc's ID.
 * @param {string} insertLocation - Phrase in the target Google Doc after which content will be inserted.
 * @param {string} separator - Optional separator text for clarity.
 */

function insertDocContentAfterPhrase() {
  const srcDocId = 'SOURCE_GOOGLE_DOC_ID';
  const targetDocId = 'TARGET_GOOGLE_DOC_ID';
  const insertLocation = 'Insert Below:';
  const separator = '----------------------';

  const srcDoc = DocumentApp.openById(srcDocId).getBody();
  const targetBody = DocumentApp.openById(targetDocId).getBody();

  // Find the paragraph index that contains the insert location phrase.
  const targetParagraphs = targetBody.getParagraphs();
  const targetIndex = targetParagraphs.findIndex((paragraph) =>
    paragraph.getText().includes(insertLocation),
  );
  if (targetIndex === -1) {
    Logger.log('Phrase not found in the target document.');
    return;
  }

  let insertIndex = targetIndex + 1;

  // Insert a separator for clarity
  targetBody.insertParagraph(insertIndex, separator);
  insertIndex++;

  // Build an array of source elements using Array.from.
  const srcElements = Array.from({ length: srcDoc.getNumChildren() }, (_, j) =>
    srcDoc.getChild(j),
  );

  // Helper function to insert elements based on type.
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

  // Insert each source element into the target document.
  srcElements.forEach((element) => {
    insertElement(element, insertIndex);
    insertIndex++;
  });

  Logger.log('Content inserted successfully after the target phrase.');
}
