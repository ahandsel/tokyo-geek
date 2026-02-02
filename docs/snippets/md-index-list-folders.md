---
title: Markdown index list with folders snippet
description: Generates a list of markdown pages grouped by folder, excluding index.md.
excludeFromSidebar: true
---

<!-- markdownlint-disable MD033 MD041-->

<script setup lang="ts">
/**
 * Generate a list of markdown pages in the current folder and subfolders,
 * grouped by folder with headings for each level.
 */
import yaml from 'js-yaml'

/** Load Markdown in this folder (and subfolders) as raw strings. */
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

/** Build directory titles from index.md frontmatter. */
const dirTitles = new Map<string, string>()
for (const [p, mod] of Object.entries(modules)) {
  if (!/\/?index\.md$/i.test(p)) continue
  const src = toString(mod)
  const fm = parseFrontmatter(src)
  const file = p.replace(/^\.\//, '')
  const dir = file.includes('/') ? file.split('/').slice(0, -1).join('/') : ''
  if (fm.title) dirTitles.set(dir, fm.title)
}

/** Build page list and exclude index.md. */
type Page = { href: string; title: string; description?: string; dir: string }
const pages: Page[] = Object.entries(modules)
  .filter(([p]) => !/\/?index\.md$/i.test(p))
  .map(([p, mod]) => {
    const src = toString(mod)
    const fm = parseFrontmatter(src)
    const file = p.replace(/^\.\//, '')
    const dir = file.includes('/') ? file.split('/').slice(0, -1).join('/') : ''
    return {
      href: `./${file.replace(/\.md$/i, '')}`,
      title: fm.title ?? file,
      description: fm.description ?? '',
      dir
    }
  })

const pagesByDir = new Map<string, Page[]>()
for (const page of pages) {
  if (!pagesByDir.has(page.dir)) pagesByDir.set(page.dir, [])
  pagesByDir.get(page.dir)!.push(page)
}
for (const list of pagesByDir.values()) {
  list.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
}

/** Build a folder tree so we can render headings per depth. */
type Node = { name: string; path: string; children: Map<string, Node> }
const root: Node = { name: '', path: '', children: new Map() }

function addDir(dir: string): void {
  if (!dir) return
  const parts = dir.split('/')
  let node = root
  let currentPath = ''
  for (const part of parts) {
    currentPath = currentPath ? `${currentPath}/${part}` : part
    let child = node.children.get(part)
    if (!child) {
      child = { name: part, path: currentPath, children: new Map() }
      node.children.set(part, child)
    }
    node = child
  }
}

for (const dir of pagesByDir.keys()) addDir(dir)

/** Flatten the tree into display sections in depth-first order. */
type Section = { key: string; path: string; depth: number; level: number; title: string; pages: Page[] }
const sections: Section[] = []

function walk(node: Node, depth: number): void {
  const pages = pagesByDir.get(node.path) ?? []
  if (pages.length) {
    const fallbackTitle = node.path ? node.name : ''
    const title = dirTitles.get(node.path) ?? fallbackTitle
    const level = headingLevel(depth)
    sections.push({
      key: node.path || '__root__',
      path: node.path,
      depth,
      level,
      title,
      pages
    })
  }

  const children = Array.from(node.children.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  )
  for (const child of children) walk(child, depth + 1)
}

walk(root, 0)

function headingLevel(depth: number): number {
  return Math.min(6, depth + 2)
}
</script>

<section v-for="section in sections" :key="section.key" class="md-index-section">
  <hr v-if="section.level >= 3 && section.level <= 5" class="md-index-page-break" />
    <component :is="`h${section.level}`">{{ section.title }}</component>
  <ul v-if="section.pages.length">
    <li v-for="page in section.pages" :key="page.href">
      <a :href="page.href">{{ page.title }}</a>
      <ul v-if="page.description"><li>{{ page.description }}</li></ul>
    </li>
  </ul>
</section>
