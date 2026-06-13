# Scripts

Shell and Node.js scripts that support repository tooling. Most are also exposed as `pnpm` scripts in `package.json`. Run [index.sh][] to list the available `pnpm` scripts.


## Content tools

| Script                         | pnpm command       | Description                                                                                           | Last updated (UTC) |
| ------------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------- | ------------------ |
| [cleanup-temp-files.sh][]      | `pnpm run cleanup` | Find and list temporary files, delete empty ones, then optionally delete the rest after confirmation. | 2026-04-08 08:15   |
| [generate-doc-structure.mjs][] | `pnpm run tree`    | Generate a tree-view snapshot of the `contents/` folder into `docs/contents-structure.md`.            | 2026-06-09 00:00   |
| [index.sh][]                   | `pnpm run index`   | List all `pnpm` scripts defined in `package.json`.                                                    | 2026-05-28 05:59   |
| [targeted-linting.sh][]        | `pnpm lint-target` | Run Prettier and markdownlint-cli2 on a single file or folder instead of the whole repo.              | 2026-06-12 00:00   |

[cleanup-temp-files.sh]: cleanup-temp-files.sh
[generate-doc-structure.mjs]: generate-doc-structure.mjs
[index.sh]: index.sh
[targeted-linting.sh]: targeted-linting.sh
