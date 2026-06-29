# hero-img-speech-bubble

Clicking the VitePress home page hero image pops a small speech bubble out of it.
Bilingual by default: `meow` on English pages and `ニャー` on Japanese pages (any path under `/ja/`, or an `<html lang="ja...">` document).

Self-contained: one folder, no extra dependencies, and it pulls in its own CSS.


## Files

| File        | Purpose                                               |
| ----------- | ----------------------------------------------------- |
| `index.ts`  | The behavior. Exports `wireHeroSpeechBubble()`.       |
| `style.css` | Bubble styling. Imported by `index.ts` automatically. |
| `README.md` | This file.                                            |


## Setup

To port this to another VitePress site, copy the whole `hero-img-speech-bubble/` folder into your theme directory (`.vitepress/theme/`), then wire it up in your theme's `index.ts`.


### 1. `.vitepress/theme/index.ts`

Import the function and call it inside `enhanceApp`:

```ts
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { wireHeroSpeechBubble } from './hero-img-speech-bubble';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    wireHeroSpeechBubble();
  },
} satisfies Theme;
```

That is all that is required.
The CSS is imported by the module, so you do not need to touch `style.css`.


### 2. `.vitepress/theme/style.css` (optional)

You do not need to edit `style.css`.
The bubble styling ships in this folder's own `style.css` and is loaded by `index.ts`.
Only add overrides here if you want to restyle the bubble site-wide (see "Styling" below).


## Options

`wireHeroSpeechBubble()` accepts an optional config object. Pass a single string
for fixed text, or a list of strings to pick one at random on each click:

```ts
wireHeroSpeechBubble({
  en: ['meow', 'purr', 'mrrp', 'nya~'], // English: random pick per click
  ja: ['ニャー', 'にゃん', 'にゃ〜', 'ゴロゴロ'], // Japanese: random pick per click
  visibleMs: 1800,                       // how long it stays up, in ms
  containerSelector: '.VPHero .image-container', // the clickable hero image
});
```

| Option              | Default                              | Description                                                              |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| `en`                | `['meow', 'purr', 'mrrp', 'nya~']`   | Text on English (default) pages. String, or a list for a random pick.    |
| `ja`                | `['ニャー', 'にゃん', 'にゃ〜', 'ゴロゴロ']` | Text on Japanese pages. String, or a list for a random pick.             |
| `visibleMs`         | `1800`                               | Time the bubble stays fully visible before fading out.                   |
| `containerSelector` | `'.VPHero .image-container'`         | CSS selector for the clickable hero image element.                       |


## Styling

The bubble uses VitePress theme variables (`--vp-c-bg-elv`, `--vp-c-text-1`, etc.), so it follows light and dark mode automatically.
To restyle it, edit `style.css` in this folder, or override `.hero-speech-bubble` in your theme's `style.css`.


## How it works

A single delegated `click` listener on `document` catches clicks on the hero image container, so it keeps working across SPA route changes without re-binding.
On click it injects a `.hero-speech-bubble` element into the container (which the default theme positions relatively), transitions it in, and removes it after `visibleMs`.
The locale is detected from the URL path (`/ja/`) or the `<html lang>` attribute.
