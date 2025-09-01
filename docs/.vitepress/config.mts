// .vitepress/config.mts
import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { withPwa } from "@vite-pwa/vitepress";

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "Tokyo Geek",
  description: "Let's go to Japan!",
  // head: []            // remove favicon/theme-color when using PWA assets injection
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message:
        'Found it helpful? <a href="https://ko-fi.com/ahandsel" target="_blank">Consider buying me coffee ☕</a>',
      // showWithSidebar: true, // https://github.com/vuejs/vitepress/pull/4532
    },
    search: { provider: "local" },
    nav: [
      { text: "Home", link: "/" },
      { text: "Travel guides", link: "/guides/general/start-here" },
      { text: "Living in Japan", link: "/local/" },
      { text: "Random Tips", link: "/tips/" },
    ],
    // remove manual sidebar; withSidebar will generate it
    socialLinks: [
      { icon: "github", link: "https://github.com/ahandsel/tokyo-geek" },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`,
        },
        link: "https://ko-fi.com/ahandsel",
      },
    ],
    editLink: {
      pattern: "https://github.com/ahandsel/tokyo-geek/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
  base: "/tokyo-geek/",
  sitemap: {
    hostname: "https://ahandsel.github.io",
  },
  ignoreDeadLinks: true,

  // PWA options handled by @vite-pwa/vitepress
  pwa: {
    strategies: "generateSW",
    mode: "development",
    registerType: "autoUpdate",
    injectRegister: "script-defer",
    includeAssets: ["favicon.ico", "pwa-192x192.png"],
    manifest: {
      name: "Tokyo Geek",
      short_name: "Tokyo-Geek",
      theme_color: "#ffffff",
      start_url: "/tokyo-geek/",
      display: "standalone",
      background_color: "#ffffff",
      icons: [], // generated
    },
    // Ensure a preset is provided for the assets generator
    pwaAssets: {
      // config: true,
      preset: "minimal-2023",
      image: "cat-icon-profile.png",
    },
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
    },
    experimental: { includeAllowlist: true },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallback: "/",
    },
  },

  vite: {
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
        "@nolebase/ui",
      ],
    },
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/ui",
      ],
    },
  },
};

const commonSidebarConfigs = {
  // VitePress Sidebar's options here...
  // https://vitepress-sidebar.cdget.com/guide/options
  // basePath: null,
  capitalizeEachWords: false,
  capitalizeFirst: false,
  collapsed: true,
  collapseDepth: 1,
  debugPrint: false,
  documentRootPath: "docs",
  excludeByFolderDepth: null,
  excludeByGlobPattern: ["README.md"],
  excludeFilesByFrontmatterFieldName: null,
  folderLinkNotIncludesFileName: false,
  followSymLinks: false,
  frontmatterOrderDefaultValue: 10,
  frontmatterTitleFieldName: "title",
  hyphenToSpace: false,
  includeDotFiles: false,
  includeEmptyFolder: false,
  includeFolderIndexFile: true,
  includeRootIndexFile: false,
  keepMarkdownSyntaxFromTitle: false,
  manualSortFileNameByPriority: [],
  prefixSeparator: ".",
  removePrefixAfterOrdering: false,
  // resolvePath: "/",
  rootGroupCollapsed: null,
  rootGroupLink: null,
  // rootGroupText: "Table of Contents",
  // scanStartPath: null,
  sortFolderTo: "top",
  sortMenusByFileDatePrefix: false,
  sortMenusByFrontmatterDate: false,
  sortMenusByFrontmatterOrder: true,
  sortMenusByName: false,
  sortMenusOrderByDescending: false,
  sortMenusOrderNumericallyFromLink: false,
  sortMenusOrderNumericallyFromTitle: false,
  underscoreToSpace: false,
  useFolderLinkFromIndexFile: true,
  useFolderLinkFromSameNameSubFile: false,
  useFolderTitleFromIndexFile: true,
  useTitleFromFileHeading: false,
  useTitleFromFrontmatter: true,
};

const vitePressSidebarOptions = [
  // VitePress Sidebar's options here...
  {
    ...commonSidebarConfigs,
    scanStartPath: "guides",
    basePath: "/guides/",
    resolvePath: "/guides/",
  },
  {
    ...commonSidebarConfigs,
    scanStartPath: "local",
    basePath: "/local/",
    resolvePath: "/local/",
  },
  {
    ...commonSidebarConfigs,
    scanStartPath: "tips",
    basePath: "/tips/",
    resolvePath: "/tips/",
  },
];

// export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
// export default defineConfig(
//   withPwa(withSidebar(vitePressOptions, vitePressSidebarOptions))
export default withPwa(
  defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))
);
