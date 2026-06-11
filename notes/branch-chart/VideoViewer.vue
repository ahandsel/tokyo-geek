<!--
How to use the VideoViewer component in Markdown files:

<VideoViewer
  videoPath="/path/to/video.mp4"
  posterPath="/path/to/poster.png"
  :posterWidth="optional width in pixels"
  :posterHeight="optional height in pixels"
  title="Video title"
  ariaLabel="Accessible video title"
/>

Props:
+ videoPath (required)
+ posterPath (required)
+ posterWidth (optional number)
+ posterHeight (optional number)
+ title (optional string, default "Video player")
+ ariaLabel (optional string, default "Video player")

Notes:
- Use Vue bindings (:) for :posterWidth and :posterHeight to ensure numeric values.
- When omitted, the video will size based on its intrinsic dimensions or CSS.
-->

<template>
  <video
    ref="videoRef"
    :poster="posterPath"
    :width="posterWidth"
    :height="posterHeight"
    controls
    :title="title"
    :aria-label="ariaLabel"
    :preload="shouldLoad ? 'metadata' : 'none'"
    class="video-player"
  >
    <source v-if="shouldLoad" :src="videoPath" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

// Lazily load video metadata/source once the player is near the viewport.
const videoRef = ref<HTMLVideoElement | null>(null);
const shouldLoad = ref(false);
let observer: IntersectionObserver | null = null;

withDefaults(
  defineProps<{
    videoPath: string;
    posterPath: string;
    posterWidth?: number;
    posterHeight?: number;
    title?: string;
    ariaLabel?: string;
  }>(),
  {
    title: 'Video player',
    ariaLabel: 'Video player',
  },
);

onMounted(() => {
  // Guard for SSR/build-time execution where window is unavailable.
  if (typeof window === 'undefined') {
    return;
  }

  // Fallback: if IntersectionObserver is missing, load immediately.
  if (!('IntersectionObserver' in window)) {
    shouldLoad.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      // Start loading once any observation entry intersects.
      if (entries.some((entry) => entry.isIntersecting)) {
        shouldLoad.value = true;
        observer?.disconnect();
        observer = null;
      }
    },
    // Start loading slightly before the video scrolls into view.
    { rootMargin: '200px' },
  );

  // Observe the video element only after the ref is bound.
  if (videoRef.value) {
    observer.observe(videoRef.value);
  }
});

onBeforeUnmount(() => {
  // Cleanup to avoid leaks if the component unmounts early.
  observer?.disconnect();
  observer = null;
});
</script>
