import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tokyo Geek",
  description: "Collection of my random notes about Japan",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: 'Was this helpful? <a href="https://ko-fi.com/ahandsel" target="_blank">Consider buying me coffee ☕</a>',
    },
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Travel guides', link: '/guides/start-here' },
      { text: 'Living in Japan', link: '/local' },
      { text: 'Random Tips', link: '/tips' }
    ],

    sidebar: [
      {
        text: 'Get started',
        items: [
          { text: 'Markdown Examples', link: '/guides/start-here' },
        ]
      },
      {
        text: 'Travel guides',
        items: [
          { text: 'Get started', link: '/guides/start-here' },
          { text: 'Book ahead', link: '/guides/reserve-ahead' },
          { text: 'Tokyo', link: '/guides/tokyo' },
          { text: 'Kyoto', link: '/guides/kyoto' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ahandsel/tokyo-geek' }
    ],
    editLink: {
      pattern: 'https://github.com/ahandsel/tokyo-geek/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },
  base: '/tokyo-geek/',
  sitemap: {
    hostname: 'https://ahandsel.github.io/tokyo-geek/'
  }
})
