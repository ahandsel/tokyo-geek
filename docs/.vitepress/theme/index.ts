import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import RegisterSW from './components/RegisterSW.vue'
import ShareButton from './components/ShareButton.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [
        h(RegisterSW),
        h(ShareButton)
      ]
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
