---
title: Related guides list snippet
description: Generates a list of markdown pages in the same folder, excluding the current page.
excludeFromSidebar: true
---

<!-- markdownlint-disable MD033 MD041-->

<script setup lang="ts">
/**
 * Generates a flat list of all markdown pages in the including file's folder (excludes subfolders and the current page).
 *
 * Usage: Add under a "## Related guides" heading via a VitePress @include directive pointing at this file.
 *
 * Output: Alphabetically sorted <ul> with page titles and descriptions.
 */
import yaml from 'js-yaml'
import { useData } from 'vitepress'

/** Load Markdown files in this folder only (no subfolders). */
const modules = import.meta.glob('./*.md', {
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

/** Derive the current page's filename to exclude it from listings. */
const currentFileName = useData().page.value.relativePath.split('/').pop() ?? ''

/** Build list (including index.md but excluding the current page). */
type Row = { href: string; title: string; description?: string }
const pageList: Row[] = Object.entries(modules)
  .filter(([p]) => p.replace(/^\.\//, '') !== currentFileName)
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
