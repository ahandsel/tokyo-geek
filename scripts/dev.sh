#!/usr/bin/env bash
set -Eeuo pipefail

ENV_FILE="${ENV_FILE:-.env}"
REQUIRED_VAR="CFP_PASSWORD"

# Validate environment file
if [[ ! -f "$ENV_FILE" ]]; then
	printf '%s\n' ".env file not found at: $ENV_FILE" >&2
	exit 1
fi

# Extract required var safely without sourcing the file
line="$(grep -m1 -E "^${REQUIRED_VAR}=" "$ENV_FILE" || true)"
if [[ -z "$line" ]]; then
	printf 'Missing required variable: %s\n' "$REQUIRED_VAR" >&2
	exit 1
fi

value="${line#${REQUIRED_VAR}=}"

# Strip surrounding single or double quotes if present
if [[ "$value" =~ ^\".*\"$ ]]; then
	value="${value:1:${#value}-2}"
elif [[ "$value" =~ ^\'.*\'$ ]]; then
	value="${value:1:${#value}-2}"
fi

# Export without word splitting
export "$REQUIRED_VAR=$value"

# Require pnpm
if ! command -v pnpm >/dev/null 2>&1; then
	printf '%s\n' "pnpm is not installed or not on PATH" >&2
	exit 1
fi

# Start dev server
# Run pnpm docs:build, then run pnpm docs:preview and pnpm pages:dev concurrently.
# If either process exits or the script receives a signal, ensure both are terminated.

# Build docs first (fail fast if build fails)
pnpm docs:build

# Start docs preview in background
pnpm docs:preview &
PREVIEW_PID=$!

# Start pages dev in background as well so we can supervise both
pnpm pages:dev &
PAGES_PID=$!

cleanup() {
	# terminate any running child processes
	for pid in "$PREVIEW_PID" "$PAGES_PID"; do
		if [ -n "$pid" ] && kill -0 "$pid" >/dev/null 2>&1; then
			kill "$pid" >/dev/null 2>&1 || true
		fi
	done
	# reap children
	wait "$PREVIEW_PID" 2>/dev/null || true
	wait "$PAGES_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Wait until either process exits. Prefer pages' exit code if available.
EXIT_CODE=0
while true; do
	if ! kill -0 "$PAGES_PID" >/dev/null 2>&1; then
		wait "$PAGES_PID"
		EXIT_CODE=$?
		break
	fi
	if ! kill -0 "$PREVIEW_PID" >/dev/null 2>&1; then
		wait "$PREVIEW_PID"
		EXIT_CODE=$?
		break
	fi
	sleep 1
done

# Ensure children are cleaned up (trap will also run on exit)
cleanup

exit "${EXIT_CODE:-0}"
