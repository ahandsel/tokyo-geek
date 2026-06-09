---
name: extract-copy-from-figma
description: Extract UX copy and layer names from a Figma frame, page, or component using the Figma MCP server and emit a Markdown table compatible with the project's UX copy workflow. Use when a user provides a Figma URL and asks to pull text into a copy table for review, key naming, or localization.
---

# Figma UX copy extractor

Extract every TEXT layer under a Figma node, paired with its layer name, and emit a Markdown table that downstream copy review and localization workflows can consume.

This skill is extract-only. It does not propose keys, edit copy, or translate.


## Required input

A Figma URL that points to the exact frame, page, or component to extract from. The URL must contain both a fileKey and a `node-id` query parameter.

Examples:

* `https://www.figma.com/design/<fileKey>/<fileName>?node-id=123-456`
* `https://www.figma.com/design/<fileKey>/branch/<branchKey>/<fileName>?node-id=123-456`

If the URL is missing `node-id`, stop and ask the user for a link to the specific node.


## Preflight

1. Confirm the Figma MCP server is configured and reachable. If MCP tools are unavailable, point the user to [`doc-figma-mcp.md`](/doc-figma-mcp.md) and stop.
2. Parse the URL:
   * Extract `fileKey` from the path after `/design/`.
   * Extract `nodeId` from `node-id=...` and convert `-` to `:` (for example, `123-456` becomes `123:456`).
3. Do not browse the URL. The MCP client extracts the node ID from the link only.
4. Load the [`figma-use`](../figma-use/SKILL.md) skill before extraction. This skill uses `use_figma` to read the literal layer names and text, and `figma-use` is a mandatory prerequisite for any `use_figma` call. Batch-load Figma tool schemas with a single `ToolSearch` call: `select:use_figma,get_metadata,get_screenshot`.


## Default workflow

1. **Fetch metadata.** Call `get_metadata` on the target node to confirm the node exists, identify its type, and size the extraction scope. Do NOT use the names returned by `get_design_context` for the `Key` column - that payload renames things for code generation and will not match the Figma layers panel.
2. **Extract TEXT nodes via `use_figma`.** Run one read-only script on the target node. This is the only reliable source for the literal Figma layer name (`node.name` = the name shown in the layers panel) paired with the rendered text (`node.characters`).

   ```js
   // skillNames: "figma-use"
   // figma.currentPage resets between use_figma calls - locate the node by ID, then switch to its page if needed.
   figma.skipInvisibleInstanceChildren = false; // include hidden layers so the script can flag them as Skipped
   const target = await figma.getNodeByIdAsync('NODE_ID_HERE'); // e.g. '123:456'
   if (!target) throw new Error('Target node not found');
   const page =
     target.type === 'PAGE'
       ? target
       : (function up(n) {
           return n.parent && n.parent.type !== 'PAGE'
             ? up(n.parent)
             : n.parent || n;
         })(target);
   if (page && page.type === 'PAGE' && figma.currentPage.id !== page.id) {
     await figma.setCurrentPageAsync(page);
   }
   // node.query() is the CSS-like selector documented in figma-use.
   const nodes =
     target.type === 'TEXT' ? [target] : target.query('TEXT').toArray();
   const rows = nodes
     .map((n) => ({
       id: n.id,
       name: n.name, // literal layer name - the Key column
       characters: n.characters, // rendered text - the English column
       visible: n.visible && !n.removed,
       x: n.absoluteBoundingBox ? n.absoluteBoundingBox.x : n.x,
       y: n.absoluteBoundingBox ? n.absoluteBoundingBox.y : n.y,
       parentName: n.parent ? n.parent.name : null,
     }))
     .sort((a, b) => a.y - b.y || a.x - b.x);
   return { count: rows.length, rows };
   ```

   Pass `skillNames: "figma-use"` when invoking `use_figma`. If the response is truncated, narrow the scope to a child frame and re-run.

3. **Handle truncation.** If the response is truncated or too large, narrow scope to a child frame and ask the user to confirm before extracting subsets.
4. **Fetch a screenshot.** Call `get_screenshot` on the target node for a visual reference. Keep the localhost URL in the output report so the user can open it.
5. **Build rows from the script output.** Consume the array returned by `use_figma`:
   * `English`: the `characters` value. Replace newlines with `<br>` so Markdown table cells stay intact.
   * `Key`: the `name` value - the literal Figma layer name. If `name` collides with another row's `name`, disambiguate as `parentName / name`.
   * Skip rows where `visible === false`; list them at the end of the report in a `Skipped (hidden)` section.
   * Skip rows where `characters` is empty, pure whitespace, or a placeholder glyph (`-`, `Lorem ipsum`); list them in a `Skipped (placeholder)` section.
6. **Preserve reading order.** The script already sorts by `y` then `x`. Do not remove duplicates; list every occurrence.
7. **Confirm output destination.** Ask the user where to save the table. Default to a new Markdown file named after the Figma frame in kebab-case, and ask the user which folder to save it in. If the user wants inline output instead, return the table in the response.
8. **Write the file.** Use the structure in the `Saved file template` section below. Fill in the H1, description paragraph, Figma link line, identifier bullets, the main table, and any `Skipped` sections. Leave `Description` empty in the table for downstream fill-in. Set `Notes` to `Extracted` on a fresh extraction, or `Pulled` when refreshing existing rows with the latest text from Figma.
9. **Report.** Summarize: number of TEXT nodes extracted, any nodes skipped (with reason), the screenshot URL, and recommended next steps.


## Output format

Default Markdown table:

```markdown
| English | Key     | Description | Notes     |
| ------- | ------- | ----------- | --------- |
| <text>  | <layer> |             | Extracted |
```

Columns:

* `English`: the English text extracted from the Figma text layer.
* `Key`: the layer name of the text layer in Figma.
* `Description`: leave blank for now.
* `Notes`: `Extracted` when the row is freshly pulled from Figma for the first time. `Pulled` when the row already existed and the latest text has just been re-fetched from Figma. If a TEXT node references a Figma variable, append `; Variable: <name>`.

Rules:

* Pad pipes and dashes so columns align visually (match the convention in existing copy table files).
* Wrap multi-line text using `<br>`. Do not split a single TEXT node across multiple rows.
* Preserve placeholders, variables, Markdown-like syntax, product names, and capitalization exactly as they appear in Figma.


## Saved file template

Use this exact structure for the saved file:

```markdown
# <kebab-case-file-name>

<one or two short sentences describing what the frame contains>

Figma: [<Figma file title>](<original Figma URL with node-id intact>)

- fileKey: `<fileKey>`
- nodeId: `<nodeId>`
- Screenshot: [<asset-id>](<screenshot URL from get_screenshot>)

## UX copy

| English | Key     | Description | Notes     |
| ------- | ------- | ----------- | --------- |
| <text>  | <layer> |             | Extracted |

## Skipped (hidden)

| English | Key     | Notes  |
| ------- | ------- | ------ |
| <text>  | <layer> | Hidden |
```

Rules:

* H1: the kebab-case file name (same slug as the saved filename, without `.md`).
* Description paragraph: one to two sentences. Source it from the Figma file title, the target frame's name, and any prominent heading text inside the frame. Do not invent product context that is not visible in Figma.
* `Figma:` paragraph link text: the **Figma file title**. Get it from `get_metadata` when available; otherwise decode it from the URL slug between `/design/<fileKey>/` and the next `/` or `?` by applying these substitutions in order: (1) a leading `-` becomes `#`, (2) each `---` (three hyphens) becomes a hyphen surrounded by single spaces, (3) any remaining `-` becomes a single space. Keep the URL exactly as the user provided it, including the `node-id` query parameter.
* `fileKey` / `nodeId` / `Screenshot`: top-level bullets directly under the Figma link paragraph, with no heading above them.
* `Screenshot` link text: the asset ID (the final path segment of the `get_screenshot` URL, for example `b90c2fe8-6db1-4fad-82e7-6d88572a8781`). Use Markdown link syntax: `[<asset-id>](<screenshot URL>)`. Do not wrap the URL in angle brackets.
* Use `## UX copy` for the main table heading. Do not use `## Source` or `## Extracted copy`.
* Include `## Skipped (hidden)` only when at least one TEXT layer was hidden. Same columns as the main table minus `Description`; set `Notes` to `Hidden`.
* Include `## Skipped (placeholder)` only when at least one TEXT layer was skipped as a placeholder. Use the same shape as `## Skipped (hidden)` with `Notes` set to `Placeholder`.


## What to skip and what to flag

* Skip rows where `visible === false`; list them at the end of the report in a `Skipped (hidden)` section. The script returns `visible` for every TEXT node, so there is no separate hidden-layer pass.
* Skip rows whose `characters` is empty, pure whitespace, or a placeholder glyph (for example, `-`, `Lorem ipsum`); list them in a `Skipped (placeholder)` section.
* For component instances, `node.characters` already returns the resolved instance text, including any local overrides. No extra handling is required.
* If a layer name is auto-generated (for example, `Frame 12345`), still include it; do not invent a friendlier name.


## Report format

This is the summary returned in the chat response after the file is written, not the file content itself. For the file structure, see the `Saved file template` section above.

Return results in this order:

1. Source:
   * Figma URL
   * Parsed `fileKey` and `nodeId`
   * Screenshot URL (from `get_screenshot`)
2. Summary:
   * Total TEXT nodes extracted
   * Number skipped (hidden, placeholder)
   * Output file path (or `inline` if returned in the response)
3. Next steps:
   * Review the extracted English copy, then add keys and localize as needed.


## Why use_figma instead of get_design_context

`get_design_context` is optimized for design-to-code: it returns `componentName`, `source`, a rendered code snippet, and design tokens (see [`skills/figma-generate-library/references/code-connect-setup.md`](../figma-generate-library/references/code-connect-setup.md)). Identifiers inside that snippet are transformed for code (camelCased, deduplicated, etc.) and do not match the literal Figma layer names. To preserve layer names exactly as authored, this skill reads them via the Plugin API:

* `node.name` - defined in `BaseNodeMixin` as "the name of the layer that appears in the layers panel" (see [`skills/figma-use/references/plugin-api-standalone.d.ts`](../figma-use/references/plugin-api-standalone.d.ts)).
* `node.characters` - the rendered text for `TEXT` nodes, including any local overrides on component instances.


## Related skills

* [`figma-generate-design`](../figma-generate-design/SKILL.md) - design-to-code workflow when implementing the extracted screen.
