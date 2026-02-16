<!-- Boots the global image viewer plugin without rendering any UI -->
<script setup lang="ts">
import { onMounted, onUnmounted, getCurrentInstance } from 'vue';
import ImageViewer from '@davidingplus/vitepress-image-viewer';
import '@davidingplus/vitepress-image-viewer/style.css'; // ImageViewer related

const INSTALLATION_FLAG = '__imageViewerInstalled__';
let svgObserver: MutationObserver | null = null;
let markFrame: number | null = null;
let markPending = false;

const markSvgImages = () => {
  document
    .querySelectorAll<HTMLImageElement>('img[src$=".svg"]')
    .forEach((img) => img.classList.add('no-viewer'));
};

const scheduleSvgMark = () => {
  if (markPending) return;
  markPending = true;
  markFrame = requestAnimationFrame(() => {
    markPending = false;
    markSvgImages();
  });
};

// VitePress executes theme components during SSR, so we wait for onMounted
// to ensure the plugin only runs on the client (same timing as enhanceApp).
onMounted(() => {
  if (import.meta.env.SSR) return;

  const instance = getCurrentInstance();
  if (!instance) return;

  // This is the same app instance you would receive in enhanceApp(ctx)
  const app = instance.appContext.app;
  const globals = app.config.globalProperties as Record<string, unknown>;
  if (globals[INSTALLATION_FLAG]) return;

  ImageViewer(app);
  globals[INSTALLATION_FLAG] = true;

  markSvgImages();
  svgObserver = new MutationObserver(scheduleSvgMark);
  svgObserver.observe(document.body, { childList: true, subtree: true });
});

onUnmounted(() => {
  if (markFrame !== null) {
    cancelAnimationFrame(markFrame);
    markFrame = null;
    markPending = false;
  }
  svgObserver?.disconnect();
  svgObserver = null;
});
</script>

<!-- Adding empty template to satisfy Vue SFC structure -->
<template>
  <!-- No UI needed; this component only runs the plugin on mount -->
  <div style="display: none"></div>
</template>
