#!/usr/bin/env zsh

#===============================================================================
: << 'DOC'
Name:     targeted-linting.sh
Usage:    targeted-linting.sh [-c|--check] [-h|--help] [-V|--version] <file-or-folder>
Purpose:  Run Prettier and markdownlint-cli2 on a single file or folder, instead of the whole repo.

Version history:
- v1.0, 2026-06-12; Initial version.

Notes:
* Mirrors the repo-wide `pnpm lint` (prettier --write + markdownlint-cli2 --fix),
  but scoped to one target path so you can lint just the file or folder you touched.
* Markdownlint only understands Markdown, so it is skipped for non-Markdown files
  and, for folders, runs against the `<folder>/**/*.{md,markdown}` glob.
* Both tools auto-discover their config (.prettierrc.json5, .markdownlint-cli2.jsonc)
  from the repo root, so run this from anywhere inside the repo.
* By default both tools fix in place; pass --check to report problems without writing.
DOC
#===============================================================================

# Zsh strict mode
setopt ERR_EXIT NO_UNSET PIPE_FAIL

# Configuration
SCRIPT_NAME="targeted-linting.sh"
VERSION="1.0"

# ----------------------------
# Utilities
# ----------------------------

err() { printf '%s\n' "$*" >&2; }

on_error() {
  err "❌ A failure occurred. Exiting."
}
trap on_error ZERR

# ----------------------------
# Core
# ----------------------------

usage() {
  cat << EOF
$SCRIPT_NAME v$VERSION

🧭 Usage:
  $SCRIPT_NAME [-c|--check] [-h|--help] [-V|--version] <file-or-folder>

🧩 Options:
  -c, --check    Report problems without writing changes (Prettier --check, no markdownlint --fix).
  -h, --help     Show this help message and exit.
  -V, --version  Print version and exit.

📝 Description:
  + Runs Prettier and markdownlint-cli2 on a single file or folder.
  + Mirrors the repo-wide \`pnpm lint\`, but scoped to the target you pass.
  + Markdownlint is skipped for non-Markdown files; for folders it lints *.md and *.markdown.

📂 Examples:
  $SCRIPT_NAME contents/en/tech/coding-fonts.md
  $SCRIPT_NAME contents/en/guides/bullet-train-shinkansen
  $SCRIPT_NAME --check contents/public/share/Brewfile

EOF
}

# Run a pnpm-exec command, printing it first so the user sees what ran.
# verify-deps-before-run is disabled so `pnpm exec` does not trigger a full
# install check just to launch a local binary.
run_step() {
  local label="${1:?label required}"
  shift
  printf '\n▶️  %s\n   pnpm exec %s\n' "$label" "$*"
  pnpm_config_verify_deps_before_run=false pnpm exec "$@"
}

main() {
  local check="no"
  local target=""

  while (($# > 0)); do
    case "$1" in
      -h | --help)
        usage
        exit 0
        ;;
      -V | --version)
        printf '%s v%s\n' "$SCRIPT_NAME" "$VERSION"
        exit 0
        ;;
      -c | --check) check="yes" ;;
      -*)
        err "Unknown option: $1"
        usage
        exit 2
        ;;
      *)
        if [[ -n "$target" ]]; then
          err "❌ Only one file or folder may be given (got '$target' and '$1')."
          exit 2
        fi
        target="$1"
        ;;
    esac
    shift
  done

  if [[ -z "$target" ]]; then
    err "❌ No file or folder given."
    usage
    exit 2
  fi

  if [[ ! -e "$target" ]]; then
    err "❌ Path does not exist: $target"
    exit 1
  fi

  printf '🎯 Target: %s\n' "$target"

  # --- Prettier ---
  local prettier_mode="--write"
  [[ "$check" == "yes" ]] && prettier_mode="--check"
  run_step "Prettier ($prettier_mode)" prettier "$prettier_mode" -- "$target"

  # --- markdownlint-cli2 ---
  local -a md_args=()
  if [[ -d "$target" ]]; then
    md_args=("${target%/}/**/*.md" "${target%/}/**/*.markdown")
  elif [[ "$target" == *.md || "$target" == *.markdown ]]; then
    md_args=("$target")
  fi

  if ((${#md_args[@]} == 0)); then
    printf '\nℹ️  Skipping markdownlint: %s is not a Markdown file.\n' "$target"
  else
    local -a md_flags=()
    [[ "$check" == "no" ]] && md_flags=(--fix)
    run_step "markdownlint-cli2 ${md_flags:-(check)}" markdownlint-cli2 "${md_flags[@]}" "${md_args[@]}"
  fi

  printf '\n✅ Done.\n'
}

main "$@"
