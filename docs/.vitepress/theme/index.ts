// Custom VitePress theme entry that augments DefaultTheme
// Enables ImageViewer and Mermaid diagram rendering site-wide
// Related docs:
// https://vitepress.dev/guide/custom-theme
// https://vitepress.dev/guide/extending-default-theme#layout-slots

// https://nolebase-integrations.ayaka.io/pages/en/integrations/vitepress-plugin-enhanced-readabilities/#add-plugin-specific-options-into-configurations-of-vite
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';

import { defineComponent, h, nextTick, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import type { DefaultTheme as DefaultThemeConfig, Theme } from 'vitepress';
import DefaultTheme, { VPImage } from 'vitepress/theme';
import './style.css';

// Mermaid diagram renderer
import { createMermaidRenderer } from 'vitepress-mermaid-renderer';
import './vitepress-mermaid-renderer.css'; // Import manually for Cloudflare Pages compatibility

// ImageViewer activator component
import ImageViewerActivator from './components/ImageViewerActivator.vue';
import VideoViewer from './components/VideoViewer.vue';

// Render the ImageViewer activator only after hydration to avoid SSR mismatch.
const DeferredImageViewerActivator = defineComponent({
  name: 'DeferredImageViewerActivator',
  setup() {
    const shouldRender = ref(false);
    onMounted(() => {
      shouldRender.value = true;
    });
    return () => (shouldRender.value ? h(ImageViewerActivator) : null);
  },
});

// Set no-viewer class to disable the ImageViewer for the hero image
const HomeHeroImage = defineComponent({
  name: 'HomeHeroImage',
  setup() {
    const { frontmatter } = useData();
    return () => {
      const heroImage = frontmatter.value?.hero?.image as
        | DefaultThemeConfig.ThemeableImage
        | undefined;
      if (!heroImage) return null;
      return h(VPImage, {
        class: 'image-src no-viewer',
        image: heroImage,
      });
    };
  },
});

const HomeFeaturesNoViewer = defineComponent({
  name: 'HomeFeaturesNoViewer',
  setup() {
    // The feature grid renders on the client, so flag its images after mount.
    const disableFeatureViewer = () => {
      document
        .querySelectorAll<HTMLImageElement>('.VPFeature img')
        .forEach((img) => img.classList.add('no-viewer'));
    };

    onMounted(() => {
      if (import.meta.env.SSR) return;
      nextTick(disableFeatureViewer);
    });

    return () => null;
  },
});

export default {
  extends: DefaultTheme,
  Layout: () => {
    const activateImageViewer = () => h(DeferredImageViewerActivator);
    const renderHomeHeroImage = () => h(HomeHeroImage);
    const renderHomeFeatures = () => h(HomeFeaturesNoViewer);
    const { isDark } = useData();

    // Use the client-safe wrapper for SSR compatibility

    // Pass custom Mermaid configuration (optional)
    // Mermaid initialization handled in Layout so it can react to theme changes.
    const initMermaid = () => {
      createMermaidRenderer({
        // https://mermaid.js.org/config/schema-docs/config.html
        // theme options are 'default', 'forest', 'dark', 'neutral'
        theme: isDark.value ? 'dark' : 'forest', // Default to 'forest' but use 'dark' in dark mode
        // look options are 'default', 'handDrawn', 'simple'
        look: isDark.value ? 'default' : 'handDrawn', // Default to 'handDrawn' but use 'default' in dark mode
        layout: 'dagre', // 'default', 'dagre', 'elk'
        flowchart: {
          useMaxWidth: false,
        },
        markdownAutoWrap: true,
      });
      // Optional toolbar customization example:
      // mermaidRenderer.setToolbar({ ... });
    };

    // Initial Mermaid setup after first render
    nextTick(() => initMermaid());

    // Re-run Mermaid when the color mode changes
    watch(
      () => isDark.value,
      () => {
        nextTick(() => initMermaid());
      },
    );

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
      'doc-top': activateImageViewer, // Activate ImageViewer on all doc pages.
      'home-hero-image': renderHomeHeroImage, // Disable ImageViewer on hero image.
      'home-features-before': renderHomeFeatures, // Disable ImageViewer on feature images.
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Use the client-safe wrapper for SSR compatibility
    app.component('VideoViewer', VideoViewer);
  },
} satisfies Theme;
