// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import 'chart.js/auto';
import * as chartjs from 'vitepress-plugin-chartjs';
import './style.css';

// https://nolebase-integrations.ayaka.io/pages/en/integrations/vitepress-plugin-enhanced-readabilities/#add-plugin-specific-options-into-configurations-of-vite
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => [
        // h(OtherComponent), // Your other nav components
        h(NolebaseEnhancedReadabilitiesMenu), // Enhanced Readabilities menu
      ],
      'nav-screen-content-after': () => [
        // h(OtherComponent), // Your other nav components
        h(NolebaseEnhancedReadabilitiesScreenMenu), // Enhanced Readabilities menu for small screens
      ],
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    const installers = [
      (chartjs as Record<string, unknown>).enhanceAppWithChartJS,
      (chartjs as Record<string, unknown>).enhanceAppWithChartjs,
      (chartjs as Record<string, unknown>).enhanceAppWithChart,
      (chartjs as Record<string, unknown>).enhanceApp,
      (chartjs as Record<string, unknown>).default,
    ];

    const installer = installers.find(
      (candidate) => typeof candidate === 'function',
    ) as
      | ((context: {
          app: unknown;
          router: unknown;
          siteData: unknown;
        }) => void)
      | ((app: unknown) => void)
      | undefined;

    if (!installer) return;

    try {
      installer({ app, router, siteData });
    } catch {
      installer(app);
    }
  },
} satisfies Theme;
