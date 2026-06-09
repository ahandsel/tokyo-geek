---
title: Markdown index list with folders snippet
description: Generates a list of markdown pages grouped by folder, excluding index.md.
excludeFromSidebar: true
---

<!-- markdownlint-disable MD033 MD041-->

<script setup lang="ts">
/**
 * Generates a hierarchical page list from markdown files in the current folder and subfolders.
 * Pages are grouped by directory with headings derived from each folder's index.md frontmatter title.
 *
 * Usage: Include this snippet in an index.md file via <!--@include: ...-->
 *
 * Output: Hierarchical sections with folder headings (h2-h6) from index.md frontmatter titles and alphabetically sorted page lists with titles and descriptions.
 */
import yaml from 'js-yaml'
import { useData } from 'vitepress'

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

/** Normalize module value to string (handles older Vite/VitePress builds). */
function toString(mod: unknown): string {
  if (typeof mod === 'string') return mod
  if (mod && typeof mod === 'object' && 'default' in (mod as any)) {
    const v = (mod as any).default
    if (typeof v === 'string') return v
  }
  return ''
}

/** Parse YAML frontmatter; returns empty object on missing/invalid frontmatter. */
function parseFrontmatter(md: string): { title?: string; description?: string } {
  const m = md.match(/^---\s*[\r\n]([\s\S]*?)\n---\s*[\r\n]?/)
  if (!m) return {}
  try { return (yaml.load(m[1]) || {}) as any } catch { return {} }
}

/** Convert tree depth to heading level (h2-h6). */
function headingLevel(depth: number): number {
  return Math.min(6, depth + 2)
}

// ---------------------------------------------------------------------------
// Load and process markdown modules (single pass)
// ---------------------------------------------------------------------------

/** Load all markdown files as raw strings. */
const modules = import.meta.glob('./**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

type Page = { href: string; title: string; description?: string; dir: string }

/** Derive the current page's filename to exclude it from listings. */
const currentFileName = useData().page.value.relativePath.split('/').pop() ?? ''

/** Directory path → title (from index.md frontmatter). Note: descriptions are not collected. */
const dirTitles = new Map<string, string>()

/** Directory path → list of pages in that directory. */
const pagesByDir = new Map<string, Page[]>()

// Process all modules in a single pass: collect directory titles from index.md
// files and build the page list from all other markdown files.
for (const [p, mod] of Object.entries(modules)) {
  const src = toString(mod)
  const fm = parseFrontmatter(src)
  const file = p.replace(/^\.\//, '')
  const dir = file.includes('/') ? file.split('/').slice(0, -1).join('/') : ''
  const isIndex = /\/?index\.md$/i.test(p)

  if (isIndex) {
    // Use index.md title as the directory heading
    if (fm.title) dirTitles.set(dir, fm.title)
  } else {
    // Skip the current page so it does not appear in its own listing
    if (file === currentFileName) continue
    // Add non-index pages to their directory's list
    const page: Page = {
      href: `./${file.replace(/\.md$/i, '')}`,
      title: fm.title ?? file,
      description: fm.description ?? '',
      dir
    }
    if (!pagesByDir.has(dir)) pagesByDir.set(dir, [])
    pagesByDir.get(dir)!.push(page)
  }
}

// Sort pages within each directory alphabetically by title
for (const list of pagesByDir.values()) {
  list.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
}

// ---------------------------------------------------------------------------
// Build folder tree structure
// ---------------------------------------------------------------------------

type Node = { name: string; path: string; children: Map<string, Node> }
const root: Node = { name: '', path: '', children: new Map() }

/** Insert a directory path into the tree, creating intermediate nodes as needed. */
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

// ---------------------------------------------------------------------------
// Flatten tree into ordered sections for rendering
// ---------------------------------------------------------------------------

type Section = { key: string; path: string; depth: number; level: number; title: string; pages: Page[] }
const sections: Section[] = []

/** Walk the tree depth-first, emitting sections for nodes that have pages. */
function walk(node: Node, depth: number): void {
  const pages = pagesByDir.get(node.path) ?? []
  if (pages.length) {
    // Use index.md title if available, otherwise fall back to folder name
    const fallbackTitle = node.path ? node.name : ''
    const title = dirTitles.get(node.path) ?? fallbackTitle
    sections.push({
      key: node.path || '__root__',
      path: node.path,
      depth,
      level: headingLevel(depth),
      title,
      pages
    })
  }
  // Sort children alphabetically for deterministic output
  const children = Array.from(node.children.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  )
  for (const child of children) walk(child, depth + 1)
}

walk(root, 0)

// True if any section has a non-empty path (i.e., we have subdirectories)
const hasSubfolders = sections.some(s => s.path)

/** Determine if a divider should appear before this section. */
function showDivider(index: number, section: Section): boolean {
  if (index === 0) return false                    // Never before the first section
  if (!hasSubfolders) return false                 // No dividers for flat structure
  if (!section.title) return false                 // Skip untitled sections
  return section.level >= 3 && section.level <= 5 // Dividers for h3-h5 headings only
}

/** Determine if a heading should appear for this section. */
function showHeading(section: Section): boolean {
  if (!section.title) return false
  // Skip root heading when there are no subfolders (flat structure)
  if (!section.path && !hasSubfolders) return false
  return true
}
</script>

<section v-for="(section, index) in sections" :key="section.key" class="md-index-section">
  <hr v-if="showDivider(index, section)" class="md-index-page-break" />
  <component v-if="showHeading(section)" :is="`h${section.level}`">{{ section.title }}</component>
  <ul v-if="section.pages.length">
    <li v-for="page in section.pages" :key="page.href">
      <a :href="page.href">{{ page.title }}</a>
      <ul v-if="page.description"><li>{{ page.description }}</li></ul>
    </li>
  </ul>
</section>
