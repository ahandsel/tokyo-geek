// hero-img-speech-bubble
// ----------------------------------------------------------------------------
// Clicking the home page hero image pops a small speech bubble out of it.
// Bilingual by default: it says "meow" on English pages and "ニャー" on Japanese
// pages (paths under `/ja/`, or an `<html lang="ja...">` document).
//
// Drop-in, framework-only dependencies. See README.md for setup.

import './style.css';

export interface HeroSpeechBubbleOptions {
  /**
   * Text shown on English (default) pages. Pass a single string, or a list to
   * pick one at random on each click.
   */
  en?: string | string[];
  /**
   * Text shown on Japanese pages (path under `/ja/` or `<html lang="ja">`).
   * Pass a single string, or a list to pick one at random on each click.
   */
  ja?: string | string[];
  /** How long the bubble stays fully visible before fading out, in ms. */
  visibleMs?: number;
  /** CSS selector for the clickable hero image element. */
  containerSelector?: string;
}

const DEFAULTS: Required<HeroSpeechBubbleOptions> = {
  en: ['meow', 'purr', 'mrrp', 'nya~', '🐾', 'Need coffee'],
  ja: ['ニャー', 'にゃん', 'にゃ〜', 'ゴロゴロ', '🐾', 'お茶が欲しいの'],
  visibleMs: 1800,
  containerSelector: '.VPHero .image-container',
};

/** Return `value` if it is a string, or a random entry if it is a list. */
function pickPhrase(value: string | string[]): string {
  if (!Array.isArray(value)) return value;
  if (value.length === 0) return '';
  return value[Math.floor(Math.random() * value.length)];
}

function popSpeechBubble(container: Element, text: string, visibleMs: number) {
  // Restart cleanly if the image is clicked again while a bubble is showing.
  container.querySelector('.hero-speech-bubble')?.remove();

  const bubble = document.createElement('div');
  bubble.className = 'hero-speech-bubble';
  bubble.textContent = text;
  container.appendChild(bubble);

  // Next frame: add the class so the entrance transition runs.
  requestAnimationFrame(() => bubble.classList.add('is-visible'));

  // Fade out, then remove from the DOM.
  setTimeout(() => {
    bubble.classList.remove('is-visible');
    bubble.addEventListener('transitionend', () => bubble.remove(), {
      once: true,
    });
  }, visibleMs);
}

/**
 * Wire up the hero image speech bubble. Call once from `enhanceApp` in your
 * theme's `index.ts`. Safe to call during SSR (it no-ops without a `window`).
 */
export function wireHeroSpeechBubble(options: HeroSpeechBubbleOptions = {}) {
  if (typeof window === 'undefined') return;
  const opts = { ...DEFAULTS, ...options };

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const container = target?.closest(opts.containerSelector);
    if (!container) return;
    event.preventDefault();
    const isJapanese =
      window.location.pathname.includes('/ja/') ||
      document.documentElement.lang.startsWith('ja');
    const phrase = pickPhrase(isJapanese ? opts.ja : opts.en);
    popSpeechBubble(container, phrase, opts.visibleMs);
  });
}
