// Generates doc-structure.md with a tree view of the help doc content.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve repository root from this script location.
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

// Write a generated tree snapshot into the repo root.
const outputPath = resolve(repoRoot, 'doc-structure.md');

// Entries to ignore in the generated doc structure.
const filesToIgnore = new Set(['temp.md', '.DS_Store']);

// Build the tree command args to list docs folders with a narrow, stable filter.
const args = [
  'docs',
  '-gitignore',
  '-only=0:(en|ja|snippets|public)$',
  '-charset=utf8-icons',
];

let output = '';
try {
  // Run tree-extended to capture the docs subtree.
  output = execFileSync('tree-extended', args, {
    cwd: repoRoot,
    encoding: 'utf8',
  });
} catch (error) {
  if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
    console.error(
      'Error: missing dependency!\ntree-extended not found. Please install all dependencies or add tree-extended to dependencies.\n\nPotential solutions:\npnpm install\nor\npnpm add -D tree-extended\n',
    );
    process.exit(1);
  }
  console.error(
    'Failed to run tree-extended. Install dependencies with "pnpm install" and ensure tree-extended is available in PATH.',
  );
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1);
}

if (output) {
  const lines = output.split('\n');
  let writeIndex = 0;
  for (const line of lines) {
    let shouldIgnore = false;
    for (const entry of filesToIgnore) {
      if (line.includes(entry)) {
        shouldIgnore = true;
        break;
      }
    }
    if (!shouldIgnore) {
      lines[writeIndex] = line;
      writeIndex += 1;
    }
  }
  output = lines.slice(0, writeIndex).join('\n');
}

// Save the tree output as a Markdown file.
writeFileSync(outputPath, `# Doc structure\n\n${output}`, 'utf8');
