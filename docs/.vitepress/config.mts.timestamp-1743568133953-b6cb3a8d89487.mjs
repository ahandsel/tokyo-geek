// docs/.vitepress/config.mts
import { defineConfig } from "file:///workspaces/tokyo-geek/node_modules/vitepress/dist/node/index.js";
import { withSidebar } from "file:///workspaces/tokyo-geek/node_modules/vitepress-sidebar/dist/index.js";
import { withPwa } from "file:///workspaces/tokyo-geek/node_modules/@vite-pwa/vitepress/dist/index.mjs";
var vitePressOptions = {
  title: "Tokyo Geek",
  description: "Let's go to Japan!",
  head: [
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["link", { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
    ["link", { rel: "mask-icon", href: "/favicon.ico", color: "#ffffff" }],
    ["meta", { name: "keywords", content: "Japan, Tokyo, Geek, Travel, Guide, ahandsel, GitHub, VitePress" }],
    ["link", { rel: "apple-touch-icon", href: "/pwa-192x192.png", sizes: "192x192" }],
    ["link", { rel: "icon", href: "/favicon.ico" }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: 'Found it helpful? <a href="https://ko-fi.com/ahandsel" target="_blank">Consider buying me coffee \u2615</a>'
      // showWithSidebar: true, // https://github.com/vuejs/vitepress/pull/4532
    },
    search: {
      provider: "local"
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Travel guides", link: "/guides/start-here" },
      { text: "Living in Japan", link: "/local/local" },
      { text: "Random Tips", link: "/tips/tips" }
    ],
    sidebar: [
      {
        text: "Travel guides",
        items: [
          { text: "Get started", link: "/guides/start-here" },
          { text: "Book ahead", link: "/guides/reserve-ahead" },
          { text: "Tokyo", link: "/guides/tokyo-trip" },
          { text: "Kyoto", link: "/guides/kyoto-trip" }
        ]
      },
      {
        text: "Was this helpful?",
        items: [
          {
            text: "Consider buying me a cup of coffee \u2615",
            link: "https://ko-fi.com/ahandsel"
          }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/ahandsel/tokyo-geek" },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`
        },
        link: "https://ko-fi.com/ahandsel"
      }
    ],
    editLink: {
      pattern: "https://github.com/ahandsel/tokyo-geek/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    }
  },
  base: "/tokyo-geek/",
  sitemap: {
    hostname: "https://ahandsel.github.io/tokyo-geek/"
  },
  ignoreDeadLinks: true,
  pwa: {
    strategies: "generateSW",
    mode: "development",
    registerType: "autoUpdate",
    injectRegister: "script-defer",
    includeAssets: ["favicon.ico", "pwa-192x192.png"],
    manifest: {
      name: "Tokyo Geek",
      short_name: "Tokyo-Geek",
      theme_color: "#ffffff"
    },
    pwaAssets: {
      config: true
    },
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"]
    },
    experimental: {
      includeAllowlist: true
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallback: "/"
    }
  }
};
var vitePressSidebarOptions = [
  // VitePress Sidebar's options here...
  {
    documentRootPath: "docs",
    scanStartPath: "guides",
    basePath: "/guides/",
    resolvePath: "/guides/",
    useTitleFromFileHeading: true,
    includeDotFiles: true
  },
  {
    documentRootPath: "docs",
    scanStartPath: "local",
    resolvePath: "/local/",
    useTitleFromFileHeading: true,
    includeDotFiles: true
  },
  {
    documentRootPath: "docs",
    scanStartPath: "tips",
    resolvePath: "/tips/",
    useTitleFromFileHeading: true,
    includeDotFiles: true
  }
];
var config_default = defineConfig(withPwa(withSidebar(vitePressOptions, vitePressSidebarOptions)));
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy90b2t5by1nZWVrL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvdG9reW8tZ2Vlay9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlcy90b2t5by1nZWVrL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuaW1wb3J0IHsgd2l0aFNpZGViYXIgfSBmcm9tIFwidml0ZXByZXNzLXNpZGViYXJcIjtcbmltcG9ydCB7IHdpdGhQd2EgfSBmcm9tIFwiQHZpdGUtcHdhL3ZpdGVwcmVzc1wiO1xuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5jb25zdCB2aXRlUHJlc3NPcHRpb25zID0ge1xuICB0aXRsZTogXCJUb2t5byBHZWVrXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkxldCdzIGdvIHRvIEphcGFuIVwiLFxuICBoZWFkOiBbXG4gICAgWydtZXRhJywgeyBuYW1lOiAndGhlbWUtY29sb3InLCBjb250ZW50OiAnI2ZmZmZmZicgfV0sXG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJy9mYXZpY29uLmljbycsIHR5cGU6ICdpbWFnZS94LWljb24nIH1dLFxuICAgIFsnbGluaycsIHsgcmVsOiAnbWFzay1pY29uJywgaHJlZjogJy9mYXZpY29uLmljbycsIGNvbG9yOiAnI2ZmZmZmZicgfV0sXG4gICAgWydtZXRhJywgeyBuYW1lOiAna2V5d29yZHMnLCBjb250ZW50OiBcIkphcGFuLCBUb2t5bywgR2VlaywgVHJhdmVsLCBHdWlkZSwgYWhhbmRzZWwsIEdpdEh1YiwgVml0ZVByZXNzXCIsIH1dLFxuICAgIFsnbGluaycsIHsgcmVsOiAnYXBwbGUtdG91Y2gtaWNvbicsIGhyZWY6ICcvcHdhLTE5MngxOTIucG5nJywgc2l6ZXM6ICcxOTJ4MTkyJyB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgaHJlZjogXCIvZmF2aWNvbi5pY29cIiB9XSxcbiAgXSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOlxuICAgICAgICAnRm91bmQgaXQgaGVscGZ1bD8gPGEgaHJlZj1cImh0dHBzOi8va28tZmkuY29tL2FoYW5kc2VsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q29uc2lkZXIgYnV5aW5nIG1lIGNvZmZlZSBcdTI2MTU8L2E+JyxcbiAgICAgIC8vIHNob3dXaXRoU2lkZWJhcjogdHJ1ZSwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3ZpdGVwcmVzcy9wdWxsLzQ1MzJcbiAgICB9LFxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6IFwibG9jYWxcIixcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiBcIkhvbWVcIiwgbGluazogXCIvXCIgfSxcbiAgICAgIHsgdGV4dDogXCJUcmF2ZWwgZ3VpZGVzXCIsIGxpbms6IFwiL2d1aWRlcy9zdGFydC1oZXJlXCIgfSxcbiAgICAgIHsgdGV4dDogXCJMaXZpbmcgaW4gSmFwYW5cIiwgbGluazogXCIvbG9jYWwvbG9jYWxcIiB9LFxuICAgICAgeyB0ZXh0OiBcIlJhbmRvbSBUaXBzXCIsIGxpbms6IFwiL3RpcHMvdGlwc1wiIH0sXG4gICAgXSxcblxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJUcmF2ZWwgZ3VpZGVzXCIsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiBcIkdldCBzdGFydGVkXCIsIGxpbms6IFwiL2d1aWRlcy9zdGFydC1oZXJlXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiQm9vayBhaGVhZFwiLCBsaW5rOiBcIi9ndWlkZXMvcmVzZXJ2ZS1haGVhZFwiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlRva3lvXCIsIGxpbms6IFwiL2d1aWRlcy90b2t5by10cmlwXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiS3lvdG9cIiwgbGluazogXCIvZ3VpZGVzL2t5b3RvLXRyaXBcIiB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJXYXMgdGhpcyBoZWxwZnVsP1wiLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ29uc2lkZXIgYnV5aW5nIG1lIGEgY3VwIG9mIGNvZmZlZSBcdTI2MTVcIixcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9rby1maS5jb20vYWhhbmRzZWxcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vYWhhbmRzZWwvdG9reW8tZ2Vla1wiIH0sXG4gICAgICB7XG4gICAgICAgIGljb246IHtcbiAgICAgICAgICBzdmc6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgY2xhc3M9XCJsdWNpZGUgbHVjaWRlLWNvZmZlZVwiPjxwYXRoIGQ9XCJNMTAgMnYyXCIvPjxwYXRoIGQ9XCJNMTQgMnYyXCIvPjxwYXRoIGQ9XCJNMTYgOGExIDEgMCAwIDEgMSAxdjhhNCA0IDAgMCAxLTQgNEg3YTQgNCAwIDAgMS00LTRWOWExIDEgMCAwIDEgMS0xaDE0YTQgNCAwIDEgMSAwIDhoLTFcIi8+PHBhdGggZD1cIk02IDJ2MlwiLz48L3N2Zz5gLFxuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBcImh0dHBzOi8va28tZmkuY29tL2FoYW5kc2VsXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgZWRpdExpbms6IHtcbiAgICAgIHBhdHRlcm46IFwiaHR0cHM6Ly9naXRodWIuY29tL2FoYW5kc2VsL3Rva3lvLWdlZWsvZWRpdC9tYWluL2RvY3MvOnBhdGhcIixcbiAgICAgIHRleHQ6IFwiRWRpdCB0aGlzIHBhZ2Ugb24gR2l0SHViXCIsXG4gICAgfSxcbiAgfSxcbiAgYmFzZTogXCIvdG9reW8tZ2Vlay9cIixcbiAgc2l0ZW1hcDoge1xuICAgIGhvc3RuYW1lOiBcImh0dHBzOi8vYWhhbmRzZWwuZ2l0aHViLmlvL3Rva3lvLWdlZWsvXCIsXG4gIH0sXG4gIGlnbm9yZURlYWRMaW5rczogdHJ1ZSxcbiAgcHdhOiB7XG4gICAgc3RyYXRlZ2llczogXCJnZW5lcmF0ZVNXXCIsXG4gICAgbW9kZTogXCJkZXZlbG9wbWVudFwiLFxuICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgaW5qZWN0UmVnaXN0ZXI6IFwic2NyaXB0LWRlZmVyXCIsXG4gICAgaW5jbHVkZUFzc2V0czogW1wiZmF2aWNvbi5pY29cIiwgXCJwd2EtMTkyeDE5Mi5wbmdcIl0sXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6IFwiVG9reW8gR2Vla1wiLFxuICAgICAgc2hvcnRfbmFtZTogXCJUb2t5by1HZWVrXCIsXG4gICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgfSxcbiAgICBwd2FBc3NldHM6IHtcbiAgICAgIGNvbmZpZzogdHJ1ZSxcbiAgICB9LFxuICAgIHdvcmtib3g6IHtcbiAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57Y3NzLGpzLGh0bWwsc3ZnLHBuZyxpY28sdHh0LHdvZmYyfVwiXSxcbiAgICB9LFxuICAgIGV4cGVyaW1lbnRhbDoge1xuICAgICAgaW5jbHVkZUFsbG93bGlzdDogdHJ1ZSxcbiAgICB9LFxuICAgIGRldk9wdGlvbnM6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgc3VwcHJlc3NXYXJuaW5nczogdHJ1ZSxcbiAgICAgIG5hdmlnYXRlRmFsbGJhY2s6IFwiL1wiLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCB2aXRlUHJlc3NTaWRlYmFyT3B0aW9ucyA9IFtcbiAgLy8gVml0ZVByZXNzIFNpZGViYXIncyBvcHRpb25zIGhlcmUuLi5cblxuICB7XG4gICAgZG9jdW1lbnRSb290UGF0aDogXCJkb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJndWlkZXNcIixcbiAgICBiYXNlUGF0aDogXCIvZ3VpZGVzL1wiLFxuICAgIHJlc29sdmVQYXRoOiBcIi9ndWlkZXMvXCIsXG4gICAgdXNlVGl0bGVGcm9tRmlsZUhlYWRpbmc6IHRydWUsXG4gICAgaW5jbHVkZURvdEZpbGVzOiB0cnVlLFxuICB9LFxuICB7XG4gICAgZG9jdW1lbnRSb290UGF0aDogXCJkb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJsb2NhbFwiLFxuICAgIHJlc29sdmVQYXRoOiBcIi9sb2NhbC9cIixcbiAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICBpbmNsdWRlRG90RmlsZXM6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBkb2N1bWVudFJvb3RQYXRoOiBcImRvY3NcIixcbiAgICBzY2FuU3RhcnRQYXRoOiBcInRpcHNcIixcbiAgICByZXNvbHZlUGF0aDogXCIvdGlwcy9cIixcbiAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICBpbmNsdWRlRG90RmlsZXM6IHRydWUsXG4gIH0sXG5dO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcod2l0aFNpZGViYXIodml0ZVByZXNzT3B0aW9ucywgdml0ZVByZXNzU2lkZWJhck9wdGlvbnMpKTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh3aXRoUHdhKHdpdGhTaWRlYmFyKHZpdGVQcmVzc09wdGlvbnMsIHZpdGVQcmVzc1NpZGViYXJPcHRpb25zKSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0UixTQUFTLG9CQUFvQjtBQUN6VCxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLGVBQWU7QUFHeEIsSUFBTSxtQkFBbUI7QUFBQSxFQUN2QixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsSUFDSixDQUFDLFFBQVEsRUFBRSxNQUFNLGVBQWUsU0FBUyxVQUFVLENBQUM7QUFBQSxJQUNwRCxDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsTUFBTSxnQkFBZ0IsTUFBTSxlQUFlLENBQUM7QUFBQSxJQUNwRSxDQUFDLFFBQVEsRUFBRSxLQUFLLGFBQWEsTUFBTSxnQkFBZ0IsT0FBTyxVQUFVLENBQUM7QUFBQSxJQUNyRSxDQUFDLFFBQVEsRUFBRSxNQUFNLFlBQVksU0FBUyxpRUFBa0UsQ0FBQztBQUFBLElBQ3pHLENBQUMsUUFBUSxFQUFFLEtBQUssb0JBQW9CLE1BQU0sb0JBQW9CLE9BQU8sVUFBVSxDQUFDO0FBQUEsSUFDaEYsQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBQUEsRUFDaEQ7QUFBQSxFQUNBLGFBQWE7QUFBQTtBQUFBLElBRVgsUUFBUTtBQUFBLE1BQ04sU0FDRTtBQUFBO0FBQUEsSUFFSjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILEVBQUUsTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUFBLE1BQzFCLEVBQUUsTUFBTSxpQkFBaUIsTUFBTSxxQkFBcUI7QUFBQSxNQUNwRCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sZUFBZTtBQUFBLE1BQ2hELEVBQUUsTUFBTSxlQUFlLE1BQU0sYUFBYTtBQUFBLElBQzVDO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBRSxNQUFNLGVBQWUsTUFBTSxxQkFBcUI7QUFBQSxVQUNsRCxFQUFFLE1BQU0sY0FBYyxNQUFNLHdCQUF3QjtBQUFBLFVBQ3BELEVBQUUsTUFBTSxTQUFTLE1BQU0scUJBQXFCO0FBQUEsVUFDNUMsRUFBRSxNQUFNLFNBQVMsTUFBTSxxQkFBcUI7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLGFBQWE7QUFBQSxNQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0seUNBQXlDO0FBQUEsTUFDakU7QUFBQSxRQUNFLE1BQU07QUFBQSxVQUNKLEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQSxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCLEtBQUs7QUFBQSxJQUNILFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWUsQ0FBQyxlQUFlLGlCQUFpQjtBQUFBLElBQ2hELFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxXQUFXO0FBQUEsTUFDVCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsY0FBYyxDQUFDLDBDQUEwQztBQUFBLElBQzNEO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1Qsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLDBCQUEwQjtBQUFBO0FBQUEsRUFHOUI7QUFBQSxJQUNFLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLHlCQUF5QjtBQUFBLElBQ3pCLGlCQUFpQjtBQUFBLEVBQ25CO0FBQUEsRUFDQTtBQUFBLElBQ0Usa0JBQWtCO0FBQUEsSUFDbEIsZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBLElBQ2IseUJBQXlCO0FBQUEsSUFDekIsaUJBQWlCO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsSUFDRSxrQkFBa0I7QUFBQSxJQUNsQixlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYix5QkFBeUI7QUFBQSxJQUN6QixpQkFBaUI7QUFBQSxFQUNuQjtBQUNGO0FBR0EsSUFBTyxpQkFBUSxhQUFhLFFBQVEsWUFBWSxrQkFBa0IsdUJBQXVCLENBQUMsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
