---
title: Markdown index list snippet
description: Generates a list of markdown pages in the same folder, excluding index.md.
excludeFromSidebar: true
---

<!-- markdownlint-disable MD033 MD041-->

<script setup lang="ts">
/**
 * Generate a list of markdown pages in the same folder, excluding index.md.
 * Each entry includes metadata (title and description) parsed from frontmatter.
 */
import yaml from 'js-yaml'

/** Load markdown in this folder (and subfolders) as raw strings. */
const modules = import.meta.glob('./**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

/** Normalize module value to string for older Vite/VitePress builds. */
function toString(mod: unknown): string {
  if (typeof mod === 'string') return mod
  if (mod && typeof mod === 'object' && 'default' in (mod as any)) {
    const v = (mod as any).default
    if (typeof v === 'string') return v
  }
  return ''
}

/** Parse YAML frontmatter safely. */
function parseFrontmatter(md: string): { title?: string; description?: string } {
  const m = md.match(/^---\s*[\r\n]([\s\S]*?)\n---\s*[\r\n]?/)
  if (!m) return {}
  try { return (yaml.load(m[1]) || {}) as any } catch { return {} }
}

/** Build list and exclude index.md. */
type Row = { href: string; title: string; description?: string }
const pageList: Row[] = Object.entries(modules)
  .filter(([p]) => !/\/?index\.md$/i.test(p))
  .map(([p, mod]) => {
    const src = toString(mod)
    const fm = parseFrontmatter(src)
    const file = p.replace(/^\.\//, '')
    return {
      href: `./${file.replace(/\.md$/i, '')}`,
      title: fm.title ?? file,
      description: fm.description ?? ''
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
</script>

<ul>
  <li v-for="page in pageList" :key="page.href">
    <a :href="page.href">{{ page.title }}</a>
    <ul v-if="page.description"><li>{{ page.description }}</li></ul>
  </li>
</ul>
