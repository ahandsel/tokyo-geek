import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { withPwa } from "@vite-pwa/vitepress";

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "Tokyo Geek",
  description: "Collection of my random notes about Japan",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message:
        'Was this helpful? <a href="https://ko-fi.com/ahandsel" target="_blank">Consider buying me coffee ☕</a>',
      // showWithSidebar: true, // https://github.com/vuejs/vitepress/pull/4532
    },
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Travel guides", link: "/guides/start-here" },
      { text: "Living in Japan", link: "/local/local" },
      { text: "Random Tips", link: "/tips/tips" },
    ],

    sidebar: [
      {
        text: "Travel guides",
        items: [
          { text: "Get started", link: "/guides/start-here" },
          { text: "Book ahead", link: "/guides/reserve-ahead" },
          { text: "Tokyo", link: "/guides/tokyo-trip" },
          { text: "Kyoto", link: "/guides/kyoto-trip" },
        ],
      },
      {
        text: "Was this helpful?",
        items: [
          {
            text: "Consider buying me a cup of coffee ☕",
            link: "https://ko-fi.com/ahandsel",
          },
        ],
      },
    ],

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
    hostname: "https://ahandsel.github.io/tokyo-geek/",
  },
  ignoreDeadLinks: true,
};

const vitePressSidebarOptions = [
  // VitePress Sidebar's options here...

  {
    documentRootPath: "docs",
    scanStartPath: "guides",
    basePath: "/guides/",
    resolvePath: "/guides/",
    useTitleFromFileHeading: true,
    includeDotFiles: true,
  },
  {
    documentRootPath: "docs",
    scanStartPath: "local",
    resolvePath: "/local/",
    useTitleFromFileHeading: true,
    includeDotFiles: true,
  },
  {
    documentRootPath: "docs",
    scanStartPath: "tips",
    resolvePath: "/tips/",
    useTitleFromFileHeading: true,
    includeDotFiles: true,
  },
];

// export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
export default withPwa(
  defineConfig(
    withSidebar(
      { 
        ...vitePressOptions,
        pwa: {
          strategies: 'generateSW',
          workbox: { /* your workbox configuration if any */ },
          experimental: {
            includeAllowlist: true
          }
        }
      },
      vitePressSidebarOptions
    )
  )
);