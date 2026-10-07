// CHANGE THIS to the exact name of your Apple Shortcut.
const SHORTCUT_NAME = 'Example Shortcut';

// Longest side, in pixels, of the saved image.
// Widgets have little memory, so full-size photos can render blank.
const MAX_IMAGE_SIZE = 1000;

const fm = FileManager.local();

// Each script saves its own image, named after the script.
const imagePath = fm.joinPath(fm.documentsDirectory(), Script.name() + '.png');

// Build the widget, or a reminder to pick an image if none is saved yet.
function createWidget(image) {
  const widget = new ListWidget();

  if (!image) {
    widget.addText('Open Scriptable and run this script once.');
    return widget;
  }

  // Use the selected picture as the entire widget background.
  widget.backgroundImage = image;

  // Remove unnecessary internal spacing.
  widget.setPadding(0, 0, 0, 0);

  // Tapping anywhere on the widget runs the Apple Shortcut.
  widget.url =
    'shortcuts://run-shortcut?name=' + encodeURIComponent(SHORTCUT_NAME);

  return widget;
}

// Shrink the image so its longest side is at most MAX_IMAGE_SIZE.
function resizeImage(image) {
  const { width, height } = image.size;
  const scale = MAX_IMAGE_SIZE / Math.max(width, height);

  if (scale >= 1) {
    return image;
  }

  const size = new Size(Math.round(width * scale), Math.round(height * scale));
  const context = new DrawContext();
  context.size = size;
  context.opaque = false;
  context.respectScreenScale = false;
  context.drawImageInRect(image, new Rect(0, 0, size.width, size.height));

  return context.getImage();
}

// Let you choose a new image. Returns null if you cancel the picker.
async function pickImage() {
  try {
    return resizeImage(await Photos.fromLibrary());
  } catch {
    return null;
  }
}

function loadSavedImage() {
  return fm.fileExists(imagePath) ? fm.readImage(imagePath) : null;
}

// Preview the widget at the size you use on the Home Screen.
async function previewWidget(widget) {
  const alert = new Alert();
  alert.title = 'Preview';
  alert.message = 'Choose the widget size you use on the Home Screen.';
  alert.addAction('Small');
  alert.addAction('Medium');
  alert.addAction('Large');
  alert.addCancelAction('Skip');

  const choice = await alert.presentAlert();

  if (choice === 0) {
    await widget.presentSmall();
  } else if (choice === 1) {
    await widget.presentMedium();
  } else if (choice === 2) {
    await widget.presentLarge();
  }
}

if (config.runsInApp) {
  // When you manually run this script inside Scriptable,
  // let you choose or replace the widget image.
  // Cancel the picker to preview the saved image again.
  const pickedImage = await pickImage();

  if (pickedImage) {
    fm.writeImage(imagePath, pickedImage);
  }

  const image = pickedImage ?? loadSavedImage();

  if (image) {
    await previewWidget(createWidget(image));
  }
} else {
  // When iOS runs this as a Home Screen widget:
  Script.setWidget(createWidget(loadSavedImage()));
}

Script.complete();
