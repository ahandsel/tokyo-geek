---
name: 'vitepress-show-translations'
description: 'Keep the VitePress language switcher (.VPNavBarTranslations) visible at every viewport width so it tracks the search button instead of disappearing into the hamburger menu below the default theme breakpoint. Diagnoses the scoped media-query rule that hides it, then adds a specificity-winning CSS override scoped to the switcher.'
---

# Keep the VitePress language switcher visible at all widths

The VitePress default theme hides the nav-bar language switcher
(`.VPNavBarTranslations`) below a fixed breakpoint and folds the locale links
into the mobile hamburger menu. On a site where the search button stays visible
at narrow widths, this looks inconsistent: search shows but the language toggle
vanishes. Make the switcher follow the search button so the two controls appear
and disappear together at every width.

This prompt applies to any site built on the VitePress default theme.


## Role

You are a senior front-end engineer with deep expertise in VitePress, its
default theme, and Vue 3. You diagnose the cascade before changing anything and
prefer the smallest scoped override that fixes the problem.


## Step 1: Confirm the setup

Verify the site uses the VitePress default theme and has a custom stylesheet you
can extend. Typical locations:

* Theme entry: `.vitepress/theme/index.ts` (imports `vitepress/theme` and a local `./style.css`).
* Theme styles: `.vitepress/theme/style.css`.

If there is no custom `style.css` imported by the theme, create one and import
it from the theme entry. Do all edits in the site's own stylesheet, never in
`node_modules`.


## Step 2: Diagnose why the switcher is hidden

Read the default theme component that styles the switcher and note the exact
rule and breakpoint. Do not guess the breakpoint - read it.

```sh
sed -n '/<style/,/<\/style>/p' \
  node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue
```

You will find a **scoped** rule of this shape (the breakpoint may differ by
VitePress version, commonly `min-width: 1280px`):

```css
.VPNavBarTranslations { display: none; }
@media (min-width: 1280px) {
  .VPNavBarTranslations { display: flex; align-items: center; }
}
```

Key point for the fix: Vue compiles scoped styles to an **attribute selector**
(`.VPNavBarTranslations[data-v-hash]`, specificity `0,2,0`). A plain
`.VPNavBarTranslations { display: flex }` override is only `0,1,0`, so it loses
the cascade below the breakpoint and the switcher stays hidden.


## Step 3: Find the search button's visibility rule

The search button is the single source of truth - the switcher must match it.
Read its styles:

```sh
sed -n '/<style/,/<\/style>/p' \
  node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue
```

In the current default theme `.VPNavBarSearch` is `display: flex` with **no
hiding media query**, so it is visible at every width. If that holds, the
switcher should also be visible at every width. If a future theme version hides
the search button at some breakpoint, match that breakpoint instead so the two
toggle together.


## Step 4: Add the override

Add or extend a rule in the site's `style.css`, scoped only to
`.VPNavBarTranslations` so no other nav element is affected. Use `!important` to
beat the scoped attribute selector from Step 2 (this is the standard way to
override VitePress scoped theme styles, and the default theme's own
`.DocSearch` override uses the same technique).

```css
/**
 * Component: Nav Bar Translations (language switcher)
 *
 * The default theme's scoped rule in VPNavBarTranslations.vue hides the
 * switcher below its breakpoint (compiled to `.VPNavBarTranslations[data-v-hash]`,
 * specificity 0,2,0), so a plain override loses the cascade. The search button
 * has no hiding rule and is visible at every width. Force the switcher visible
 * at all widths with `!important` so the two controls appear and disappear
 * together: whenever search shows, the switcher shows.
 * -------------------------------------------------------------------------- */

.VPNavBarTranslations {
  display: flex !important;
  align-items: center;
}
```

If the search button instead hides at a breakpoint (see Step 3), wrap the
`display: flex !important` in a matching `@media (min-width: <px>)` block and
keep `display: none` below it, so the switcher mirrors the search button rather
than always showing.

Prefer VitePress config and documented theme-customization hooks where possible.
There is no config option for this breakpoint, so a scoped CSS override in the
theme stylesheet is the correct tool.


## Step 5: Decide on the mobile menu duplicate

The default theme also renders locale links inside the hamburger
(`nav-screen`) menu. With the switcher now always in the nav bar, that entry is
redundant on small screens. Pick whichever is cleaner and state your choice:

* **Leave it** (recommended): zero extra code, no regression risk; the redundancy
  is harmless because the hamburger is a separate overlay.
* **Remove it**: hide the `nav-screen` locale entry with an extra scoped rule.
  Only do this if the duplication is unwanted - it is more surface area.


## Step 6: Verify

Start the dev server and resize the browser, watching the nav bar:

```sh
pnpm dev
```

Confirm the language switcher and search button toggle together at every width,
especially:

* At the old translations breakpoint from Step 2 (for example 1280px): the
  switcher no longer vanishes; search is also visible.
* At intermediate widths (for example 960px, 768px): both remain visible.
* Below the mobile breakpoint (for example 375px): the search icon and the
  switcher both stay in the nav bar; the hamburger, theme toggle, and menu links
  still work (no regression), and the switcher does not overlap or crowd search.

At no width should search be visible while the switcher is hidden. Run the
project's linter on the stylesheet before finishing.
