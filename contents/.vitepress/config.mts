// Main vitepress configuration

import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

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
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  rewrites: { 'en/:rest*': ':rest*' },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
    hostname: 'https://ahandsel.github.io',
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
