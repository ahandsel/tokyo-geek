// Main vitepress configuration

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

const contentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(contentsRoot, 'public');

// Ignore dead-link errors for files that actually exist under contents/public.
// VitePress page routes do not include public assets, so those links otherwise fail.
function isPublicAssetLink(url) {
  if (typeof url !== 'string' || url.includes('://') || url.startsWith('#')) {
    return false;
  }
  const pathname = url.split('?')[0].split('#')[0];
  const relative = pathname
    .replace(/^\/tokyo-geek(?=\/|$)/, '')
    .replace(/^\//, '');
  if (!relative) return false;
  return existsSync(resolve(publicDir, relative));
}

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  vite: {
    ssr: {
      noExternal: ['@nolebase/*'],
    },
  },
  title: 'Tokyo Geek',
  titleTemplate: ':title - Tokyo Geek',
  description: "Let's go to Japan!",
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/png', href: '/tokyo-geek/cat-icon-clear.png' },
    ],
    // iOS "Add to Home Screen" bookmark icon. iOS fills transparent areas with
    // black, so this points at the opaque 180x180 variant rather than the
    // transparent cat-icon-clear.png.
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/tokyo-geek/apple-touch-icon-180x180.png',
      },
    ],
    // Name shown under the icon on the iOS home screen.
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Tokyo Geek' }],
  ],

  rewrites: { 'en/:rest*': ':rest*' },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  // Public assets are not page routes. Ignore a link only when the file exists
  // under contents/public, so typos like /share/Brewfile still fail the build.
  ignoreDeadLinks: [isPublicAssetLink],

  // Snippets are contributor include templates, not site pages.
  // temp.md is gitignored as a local draft stub; never publish it.
  srcExclude: ['snippets/**', '**/temp.md'],

  markdown: {
    config(md) {
      // Interpolate {{$frontmatter.title}} in headings before anchors and
      // aria-labels are generated, so permalinks do not leak the template.
      md.core.ruler.before('inline', 'interpolate-frontmatter-title', (state) => {
        const title = state.env?.frontmatter?.title;
        if (typeof title !== 'string' || title.trim().length === 0) return;
        for (const token of state.tokens) {
          if (token.type !== 'inline' || typeof token.content !== 'string') {
            continue;
          }
          if (!token.content.includes('$frontmatter.title')) continue;
          token.content = token.content.replace(
            /\{\{\s*\$frontmatter\.title\s*\}\}/g,
            title,
          );
        }
      });
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // Display the git-based last-updated timestamp (enabled via `lastUpdated`
    // above) as a date-only value in the page footer. `forceLocale` renders the
    // date in the page's language rather than the visitor's browser locale.
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'long',
        forceLocale: true,
      },
    },
    footer: {
      message:
        'Found it helpful? <a href="https://ko-fi.com/ahandsel" target="_blank">Consider buying me coffee ☕</a>',
      // showWithSidebar: true, // https://github.com/vuejs/vitepress/pull/4532
    },
    outline: { level: [2, 3], label: 'Outline' },
    docFooter: {
      // Disable docFooter globally; using "related docs" footer instead
      prev: false,
      next: false,
    },
    search: {
      provider: 'local',
      options: {
        async _render(src, env, md) {
          // First pass populates env.frontmatter
          await md.renderAsync(src, env);

          const fm = env.frontmatter ?? {};

          // Honor per-page opt out
          if (fm.search === false) return '';

          let rewritten = src;

          // Replace headings like "# {{ $frontmatter.title }}" with a concrete title
          if (typeof fm.title === 'string' && fm.title.trim().length > 0) {
            // Replace H1 that is exactly an interpolation of frontmatter.title
            rewritten = rewritten.replace(
              /^#\s*\{\{\s*\$frontmatter\.title\s*\}\}\s*$/m,
              `# ${fm.title}`,
            );
            // Drop any other heading levels that interpolate frontmatter.title
            rewritten = rewritten.replace(
              /^#{2,6}\s*\{\{\s*\$frontmatter\.title\s*\}\}\s*$/gm,
              '',
            );
          }

          // Strip any remaining $frontmatter interpolations from the indexable text
          rewritten = rewritten.replace(/\{\{\s*\$frontmatter\.[^}]+\}\}/g, '');

          // Final render used for indexing
          return await md.renderAsync(rewritten, env);
        }, // end of search options
        // remove manual sidebar; withSidebar will generate it
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ahandsel/tokyo-geek' },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`,
        },
        link: 'https://ko-fi.com/ahandsel',
      },
    ],
    editLink: {
      pattern: 'https://github.com/ahandsel/tokyo-geek/edit/main/contents/:path',
      text: 'Edit this page on GitHub',
    },
  },
  base: '/tokyo-geek/',
  sitemap: {
    // Trailing slash is required so page paths append to /tokyo-geek/ instead
    // of replacing that segment (URL resolution rule).
    hostname: 'https://ahandsel.github.io/tokyo-geek/',
  },

  // https://vitepress.dev/guide/internationalization
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      dir: 'ltr',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Travel guides', link: '/guides/general/' },
          { text: 'Living in Japan', link: '/local/' },
          { text: 'Tech blog', link: '/tech/' },
          { text: 'Random Tips', link: '/tips/' },
        ],
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      dir: 'ltr',
      themeConfig: {
        lastUpdated: {
          text: '最終更新日',
          formatOptions: {
            dateStyle: 'long',
            forceLocale: true,
          },
        },
        outline: { level: [2, 3], label: '目次' },
        editLink: {
          pattern:
            'https://github.com/ahandsel/tokyo-geek/edit/main/contents/:path',
          text: 'GitHub でこのページを編集',
        },
        footer: {
          message:
            '役に立った？ <a href="https://ko-fi.com/ahandsel" target="_blank">コーヒーをおごってください ☕</a>',
        },
        darkModeSwitchLabel: '外観',
        lightModeSwitchTitle: 'ライトモードに切り替え',
        darkModeSwitchTitle: 'ダークモードに切り替え',
        sidebarMenuLabel: 'メニュー',
        returnToTopLabel: '先頭に戻る',
        langMenuLabel: '言語を切り替え',
        skipToContentLabel: '本文へスキップ',
        search: {
          options: {
            translations: {
              button: {
                buttonText: '検索',
                buttonAriaLabel: '検索',
              },
              modal: {
                displayDetails: '詳細を表示',
                resetButtonTitle: 'リセット',
                backButtonTitle: '戻る',
                noResultsText: '結果がありません',
                footer: {
                  selectText: '選択',
                  navigateText: '移動',
                  closeText: '閉じる',
                },
              },
            },
          },
        },
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: '旅行ガイド', link: '/ja/guides/' },
          { text: '日本生活', link: '/ja/local/' },
          { text: 'テックブログ', link: '/ja/tech/' },
          { text: 'ヒント', link: '/ja/tips/' },
        ],
      },
    },
  },
};

const rootLocale = 'en';
const supportedLocales = [rootLocale, 'ja'];
const sections = ['guides', 'local', 'tips', 'tech'];

const commonSidebarConfigs = {
  // https://vitepress-sidebar.cdget.com/guide/options
  // ============ [ RESOLVING PATHS ] ============
  documentRootPath: 'docs',
  // scanStartPath: null,
  // resolvePath: null,
  // basePath: null,
  // followSymlinks: false,
  //
  // ============ [ GROUPING ] ============
  collapsed: false,
  // collapseDepth: 2,
  // rootGroupText: "Table of Contents",
  // rootGroupLink: '',
  // rootGroupCollapsed: false,
  //
  // ============ [ GETTING MENU TITLE ] ============
  // useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  // useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
  frontmatterTitleFieldName: 'title',
  //
  // ============ [ GETTING MENU LINK ] ============
  // useFolderLinkFromSameNameSubFile: false,
  // folderLinkNotIncludesFileName: false,
  //
  // ============ [ INCLUDE / EXCLUDE ] ============
  excludeByGlobPattern: ['README.md', 'temp', 'temp.*', 'temp-*.md'],
  excludeFilesByFrontmatterFieldName: 'excludeFromSidebar',
  // excludeByFolderDepth: null,
  // includeDotFiles: false,
  // includeEmptyFolder: false,
  // includeRootIndexFile: false,
  includeFolderIndexFile: true,
  //
  // ============ [ STYLING MENU TITLE ] ============
  // hyphenToSpace: false,
  // underscoreToSpace: false,
  // capitalizeFirst: false,
  // capitalizeEachWords: false,
  // keepMarkdownSyntaxFromTitle: false,
  // removePrefixAfterOrdering: false,
  // prefixSeparator: '.',
  //
  // ============ [ SORTING ] ============
  // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
  sortFolderTo: 'top',
  // sortMenusByName: false,
  // sortMenusByFileDatePrefix: false,
  sortMenusByFrontmatterOrder: true,
  frontmatterOrderDefaultValue: 10,
  // sortMenusByFrontmatterDate: false,
  // sortMenusOrderByDescending: false,
  // sortMenusOrderNumericallyFromTitle: false,
  // sortMenusOrderNumericallyFromLink: false,
  //
  // ============ [ MISC ] ============
  // debugPrint: true,
};

const vitePressSidebarConfigs = [
  // VitePress Sidebar's options here...
  // Per-section sidebars for each locale
  // documentRootPath must include the locale to avoid doubled paths in links
  ...supportedLocales.flatMap((lang) => {
    const isRoot = lang === rootLocale;
    const prefix = isRoot ? '' : `/${lang}`;
    return sections.map((section) => ({
      ...commonSidebarConfigs,
      documentRootPath: `contents/${lang}`,
      scanStartPath: section,
      basePath: `${prefix}/${section}/`,
      resolvePath: `${prefix}/${section}/`,
    }));
  }),
  // Root-level sidebars for each locale (fallback for pages not in a section)
  ...supportedLocales.map((lang) => {
    const isRoot = lang === rootLocale;
    return {
      ...commonSidebarConfigs,
      ...(isRoot ? {} : { basePath: `/${lang}/` }),
      documentRootPath: `contents/${lang}`,
      resolvePath: isRoot ? '/' : `/${lang}/`,
    };
  }),
];

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarConfigs),
);
