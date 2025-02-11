# Tokyo Geek

A revamp to my Japan_Guide blog using [VitePress static site generator](https://vitepress.dev/).


## Dev notes

Markdown Linting

```bash
~/.scripts/md-lint.sh ./docs
```

Link Checking

```bash
find . -name "*.md" -not -path "*/node_modules/*" -print0 | xargs -0 -n1 markdown-link-check --config .linkConfig.json > link-check-output.txt
```
