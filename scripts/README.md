# Scripts

Shell and Node.js scripts that support repository tooling. Most are also exposed as `pnpm` scripts in `package.json`. Run [index.sh][] to list the available `pnpm` scripts.


## Content tools

| Script                         | pnpm command         | Description                                                                                           | Last updated |
| ------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| [check-content.mjs][]          | `pnpm check-content` | Enforce EN/JA pairing, required frontmatter, and no `-en`/`-ja` suffixes in locale folders.           | 2026-08-22   |
| [check-sitemap.mjs][]          | `pnpm check-sitemap` | After a build, assert sitemap locs use the `/tokyo-geek/` GitHub Pages base.                          | 2026-08-22   |
| [cleanup-temp-files.sh][]      | `pnpm run cleanup`   | Find and list temporary files, delete empty ones, then optionally delete the rest after confirmation. | 2026-08-18   |
| [generate-doc-structure.mjs][] | `pnpm run tree`      | Generate a tree-view snapshot of the `contents/` folder into `docs/contents-structure.md`.            | 2026-08-18   |
| [index.sh][]                   | `pnpm run index`     | List all `pnpm` scripts defined in `package.json`.                                                    | 2026-08-18   |
| [targeted-linting.sh][]        | `pnpm lint-target`   | Run Prettier and markdownlint-cli2 on a single file or folder instead of the whole repo.              | 2026-08-18   |

[check-content.mjs]: check-content.mjs
[check-sitemap.mjs]: check-sitemap.mjs
[cleanup-temp-files.sh]: cleanup-temp-files.sh
[generate-doc-structure.mjs]: generate-doc-structure.mjs
[index.sh]: index.sh
[targeted-linting.sh]: targeted-linting.sh
