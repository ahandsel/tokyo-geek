#!/usr/bin/env node

// update-branch-from-main.mjs notes
// General notes:
// * Purpose: Bring the current git branch up to date with a base branch
//   (default `main`) using rebase by default, or merge when requested. Used by
//   the gh-sync-with-main skill.
// * Refuses to run while checked out on the base branch and refuses a dirty
//   working tree unless --allow-dirty is passed.
// * Fetches the base branch from the remote first, then rebases or merges onto
//   the remote-tracking ref (e.g. origin/main). Exits on the first git failure
//   and leaves the repository in git's native conflict state for manual
//   resolution.
// * With --verify, runs a read-only assessment instead: it fetches the base
//   branch (updating the remote-tracking ref only), reports the ahead and
//   behind commit counts, previews conflicts, and prints a recommendation. It
//   never rebases, merges, or changes the branch or working tree.
// Usage:
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs --strategy merge
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs --base-branch main --remote origin
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs --allow-dirty
//   node skills/gh-sync-with-main/scripts/update-branch-from-main.mjs --verify
// Options:
//   --base-branch <name>  Base branch to sync from. Defaults to main.
//   --remote <name>       Remote to fetch from. Defaults to origin.
//   --strategy <mode>     Update strategy: rebase or merge. Defaults to rebase.
//                         In --verify mode this selects the recommended strategy.
//   --allow-dirty         Allow updating even if the working tree has local changes.
//   --verify              Read-only assessment. Report ahead and behind counts,
//                         a conflict preview, and a recommendation without
//                         rebasing, merging, or changing the branch.
//   --help, -h            Show this message.
// Output:
// * Sync mode: prints the planned git commands, then runs them, then a final
//   status line.
// * Verify mode: prints the fetch plan, then a read-only assessment (branch,
//   base, working tree, ahead and behind counts, conflict preview, and a
//   recommendation), then a final status line.
// * Status emojis: ✅ success or up to date, ⚠️ refusal or sync recommended,
//   ❌ git command failure.
// * Exit codes: 0 success (including a completed --verify assessment, whatever
//   it recommends), 1 refusal (on base branch, dirty tree, no branch),
//   2 invalid arguments, or the failing git command's exit code.
// Version history:
// * v1.1 - 2026-07-14 - Add --verify read-only assessment mode (ahead and behind
//   counts, merge-tree conflict preview, and a recommendation) with no changes.
// * v1.0 - 2026-06-08 - Initial release. Port of update_branch_from_main.py to a Node.js ES module.

import { spawnSync } from 'node:child_process';

function printUsage() {
  console.log(`Usage: node update-branch-from-main.mjs [options]

Bring the current git branch up to date with a base branch. Rebases by default
for a clean linear history; use --strategy merge when history should not be
rewritten. Use --verify for a read-only check that reports the sync status
without changing anything.

Options:
  --base-branch <name>  Base branch to sync from. Defaults to main.
  --remote <name>       Remote to fetch from. Defaults to origin.
  --strategy <mode>     Update strategy: rebase or merge. Defaults to rebase.
                        In --verify mode this selects the recommended strategy.
  --allow-dirty         Allow updating even if the working tree has local
                        changes. Ignored in --verify mode.
  --verify              Read-only assessment. Fetch the base branch, then report
                        the ahead and behind counts, a conflict preview, and a
                        recommendation without rebasing, merging, or changing
                        the branch or working tree.
  --help, -h            Show this message.

Exit codes:
  0  Success, including a completed --verify assessment whatever it recommends.
  1  Refusal (checked out on the base branch, dirty working tree, or the
     current branch could not be determined).
  2  Invalid arguments.
  *  The failing git command's exit code on a git error.
`);
}

function fail(code, message) {
  console.error(message);
  process.exit(code);
}

// Run git and capture its output. Used for read-only inspection commands.
function git(args) {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  if (result.error) {
    fail(1, `❌ Failed to run git: ${result.error.message}`);
  }
  return result;
}

function parseArgs(argv) {
  const options = {
    baseBranch: 'main',
    remote: 'origin',
    strategy: 'rebase',
    allowDirty: false,
    verify: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
        break;
      case '--base-branch':
        options.baseBranch = argv[++i];
        if (!options.baseBranch) fail(2, '❌ --base-branch requires a value.');
        break;
      case '--remote':
        options.remote = argv[++i];
        if (!options.remote) fail(2, '❌ --remote requires a value.');
        break;
      case '--strategy':
        options.strategy = argv[++i];
        if (options.strategy !== 'rebase' && options.strategy !== 'merge') {
          fail(2, '❌ --strategy must be "rebase" or "merge".');
        }
        break;
      case '--allow-dirty':
        options.allowDirty = true;
        break;
      case '--verify':
        options.verify = true;
        break;
      default:
        fail(2, `❌ Unknown argument: ${arg}. Run with --help for usage.`);
    }
  }

  return options;
}

function ensureGitRepo() {
  const result = git(['rev-parse', '--show-toplevel']);
  if (result.status !== 0) {
    fail(1, '❌ Not inside a git repository.');
  }
}

function currentBranch() {
  return git(['branch', '--show-current']).stdout.trim();
}

function isWorktreeClean() {
  return git(['status', '--short']).stdout.trim() === '';
}

function printPlan(commands) {
  console.log('Plan:');
  for (const command of commands) {
    console.log(`  ${command.join(' ')}`);
  }
}

// Return true when the installed git is at least the given major.minor version.
// Used to gate the merge-tree conflict preview, which requires git 2.38+.
function gitVersionAtLeast(major, minor) {
  const match = git(['--version']).stdout.match(/(\d+)\.(\d+)/);
  if (!match) return false;
  const [, gotMajor, gotMinor] = match.map(Number);
  return gotMajor > major || (gotMajor === major && gotMinor >= minor);
}

// Read-only assessment: fetch the base branch, then report ahead and behind
// counts, a conflict preview, and a recommendation. Never changes the branch.
function verify(options, branch) {
  const baseRef = `${options.remote}/${options.baseBranch}`;

  console.log(
    'Verify mode: read-only assessment (no rebase, merge, or working-tree changes).',
  );
  console.log('');
  printPlan([['git', 'fetch', options.remote, options.baseBranch]]);

  // Fetch to make the counts accurate. This updates the remote-tracking ref
  // only; it does not touch the current branch or working tree.
  const fetch = spawnSync(
    'git',
    ['fetch', options.remote, options.baseBranch],
    { stdio: 'inherit' },
  );
  if (fetch.status !== 0) {
    const code = fetch.status === null ? 1 : fetch.status;
    fail(
      code,
      `❌ Command failed with exit code ${code}: git fetch ${options.remote} ${options.baseBranch}`,
    );
  }

  if (git(['rev-parse', '--verify', '--quiet', baseRef]).status !== 0) {
    fail(
      1,
      `❌ Could not resolve ${baseRef} after fetch. Check the remote and base branch names.`,
    );
  }

  const ahead = Number(
    git(['rev-list', '--count', `${baseRef}..HEAD`]).stdout.trim() || '0',
  );
  const behind = Number(
    git(['rev-list', '--count', `HEAD..${baseRef}`]).stdout.trim() || '0',
  );
  const clean = isWorktreeClean();

  // Preview conflicts with a trial merge that writes nothing. git merge-tree
  // --write-tree exits 0 for a clean merge and 1 when it conflicts (git 2.38+).
  let conflicts = 'unknown';
  if (gitVersionAtLeast(2, 38)) {
    const status = git(['merge-tree', '--write-tree', baseRef, 'HEAD']).status;
    if (status === 0) conflicts = 'none';
    else if (status === 1) conflicts = 'likely';
  }

  let recommendation;
  if (behind === 0) {
    recommendation = 'up to date';
  } else if (conflicts === 'likely') {
    recommendation = `sync recommended (${options.strategy}), resolve conflicts manually`;
  } else {
    recommendation = `sync recommended (${options.strategy})`;
  }

  console.log('');
  console.log(`Branch: ${branch}`);
  console.log(`Base: ${baseRef}`);
  console.log(`Working tree: ${clean ? 'clean' : 'has uncommitted changes'}`);
  console.log(`Ahead of base: ${ahead} commit(s)`);
  console.log(`Behind base: ${behind} commit(s)`);
  console.log(
    `Conflicts (merge preview): ${conflicts === 'unknown' ? 'unknown (requires git 2.38+)' : conflicts}`,
  );
  console.log(`Recommendation: ${recommendation}`);
  console.log('');

  if (behind === 0) {
    console.log(`✅ ${branch} is up to date with ${baseRef}. No sync needed.`);
  } else {
    console.log(
      `⚠️ ${recommendation}. ${branch} is behind ${baseRef} by ${behind} commit(s).`,
    );
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  ensureGitRepo();

  const branch = currentBranch();
  if (!branch) {
    fail(1, '⚠️ Could not determine the current branch.');
  }

  if (branch === options.baseBranch) {
    const action = options.verify ? 'verify' : 'update';
    fail(
      1,
      `⚠️ Refusing to ${action} while checked out on ${options.baseBranch}. Switch to a feature branch first.`,
    );
  }

  if (options.verify) {
    verify(options, branch);
    return;
  }

  if (!options.allowDirty && !isWorktreeClean()) {
    fail(
      1,
      '⚠️ Working tree is not clean. Commit, stash, or rerun with --allow-dirty.',
    );
  }

  const baseRef = `${options.remote}/${options.baseBranch}`;
  const commands = [['git', 'fetch', options.remote, options.baseBranch]];
  if (options.strategy === 'rebase') {
    commands.push(['git', 'rebase', baseRef]);
  } else {
    commands.push(['git', 'merge', baseRef]);
  }

  printPlan(commands);

  for (const [, ...args] of commands) {
    const result = spawnSync('git', args, { stdio: 'inherit' });
    if (result.status !== 0) {
      const code = result.status === null ? 1 : result.status;
      fail(
        code,
        `❌ Command failed with exit code ${code}: git ${args.join(' ')}`,
      );
    }
  }

  console.log(
    `✅ Branch ${branch} is now updated from ${baseRef} using ${options.strategy}.`,
  );
}

main();
