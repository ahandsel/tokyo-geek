# Tokyo Geek

A revamp to my Japan_Guide blog using [VitePress static site generator](https://vitepress.dev/).

Also using the following plugins:
* [VitePress Sidebar - Powerful auto sidebar generator](https://vitepress-sidebar.cdget.com/)
* [VitePress - Frameworks - Vite PWA](https://vite-pwa-org.netlify.app/frameworks/vitepress.html)


## Dev notes

Start the dev server

```bash
npm run docs:dev
```

Markdown Linting

```bash
~/.scripts/md-lint.sh ./docs
```

Link Checking

```bash
markdownlint-cli2 "**/*.md" "#node_modules"
```
