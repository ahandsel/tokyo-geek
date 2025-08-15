// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

// https://nolebase-integrations.ayaka.io/pages/en/integrations/vitepress-plugin-enhanced-readabilities/#add-plugin-specific-options-into-configurations-of-vite
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";

import RegisterSW from "./components/RegisterSW.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () => [
        // h(OtherComponent), // Your other nav components
        h(NolebaseEnhancedReadabilitiesMenu), // Enhanced Readabilities menu
      ],
      "nav-screen-content-after": () => [
        // h(OtherComponent), // Your other nav components
        h(NolebaseEnhancedReadabilitiesScreenMenu), // Enhanced Readabilities menu for small screens
      ],
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "layout-bottom": () => h(RegisterSW),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme;
