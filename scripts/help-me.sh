#!/usr/bin/env zsh

#===============================================================================
: << 'DOC'
Name:     help-me.sh
Usage:    help-me.sh [-h|--help]
Purpose:  List all pnpm scripts defined in package.json.

Version history:
- v1.1, 2026-03-24; Remove jq dependency; parse JSON with pure zsh.
- v1.0, 2026-03-24; Initial version.

Notes:
* Reads nearest package.json and prints each script name & its command.
* Parses JSON with pure zsh pattern matching.
DOC
#===============================================================================

# Zsh strict mode
setopt ERR_EXIT NO_UNSET PIPE_FAIL

# Configuration
SCRIPT_NAME="help-me.sh"
VERSION="1.1"

# ----------------------------
# Utilities
# ----------------------------

err() { printf '%s\n' "$*" >&2; }

on_error() {
  err "A failure occurred. Exiting."
}
trap on_error ZERR

# ----------------------------
# Core
# ----------------------------

usage() {
  cat << EOF
$SCRIPT_NAME v$VERSION

🧭 Usage:
  $SCRIPT_NAME [-h|--help]

🧩 Options:
  -h, --help  Show this help message and exit.

📝 Description:
  + Lists all pnpm scripts defined in the nearest package.json.
  + Each script is shown with its name and command.

EOF
}

find_package_json() {
  local dir="${1:?directory required}"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/package.json" ]]; then
      printf '%s\n' "$dir/package.json"
      return 0
    fi
    dir="${dir:h}"
  done
  err "No package.json found."
  return 1
}

list_scripts() {
  local pkg_json="$1"
  local in_scripts=0
  local line name cmd

  printf '\n📦 Available scripts:\n\n'

  while IFS= read -r line; do
    # Detect the "scripts" block opening
    if [[ "$line" == *'"scripts"'*'{' ]]; then
      in_scripts=1
      continue
    fi

    # Detect the closing brace of the scripts block
    if ((in_scripts)) && [[ "$line" == *'}'* ]]; then
      break
    fi

    # Parse "key": "value" lines inside the scripts block
    if ((in_scripts)); then
      if [[ "$line" =~ '"([^"]+)"[[:space:]]*:[[:space:]]*"(.*)"' ]]; then
        name="${match[1]}"
        cmd="${match[2]}"
        printf '  pnpm %-15s → %s\n' "$name" "$cmd"
      fi
    fi
  done < "$pkg_json"

  printf '\n'
}

# ----------------------------
# Main
# ----------------------------

main() {
  while (($# > 0)); do
    case "$1" in
      -h | --help)
        usage
        exit 0
        ;;
      *)
        err "Unknown option: $1"
        usage
        exit 2
        ;;
    esac
    shift
  done

  local pkg_json
  pkg_json="$(find_package_json "$PWD")"

  list_scripts "$pkg_json"
}

main "$@"
