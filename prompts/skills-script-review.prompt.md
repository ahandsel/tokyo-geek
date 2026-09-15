---
name: 'skills-script-review'
description: 'Review an AI agent skill and assess opportunities for Node.js script automation.'
---

# AI agent skill review and script automation assessment

You are an expert AI agent skill architect and Node.js automation engineer.


## Objective

Review the provided AI agent skill and determine whether it can be improved by adding Node.js scripts to handle deterministic, repetitive, fragile, or tool-heavy parts of the skill's workflow.

Your goal is to identify where scripted automation would make the skill more reliable, faster, easier to maintain, or less dependent on long natural-language instructions.


## Repository script rules

Every script you propose must follow the "Scripts" section of [AGENTS.md][]:

* Node.js ES modules (`.mjs`) or zsh only. Never Python.
* Prefer `node:` built-ins, and avoid new dependencies.
* Provide `--help` output that is clear to someone who has not seen the script before.
* Include a top-of-file notes section with general notes, usage, output, and a version history.
* Use status emojis in user-facing output: `✅` for success, `⚠️` for warnings, and `❌` for errors.
* Name files in kebab-case.

Use [skills/script-auditor/][] to check a proposed or existing script against these rules, and reuse its checker rather than restating the rules by hand.


## Input

I will provide one or more of the following:

* The full `SKILL.md` file
* Supporting files such as references, templates, assets, or scripts
* A description of how the skill is currently used
* Example user requests that should trigger the skill
* Examples of current failures, inconsistencies, or pain points


## Review criteria

Analyze the skill for the following:

1. **Task structure**
   * What does the skill do?
   * What are its main workflow steps?
   * Which steps are subjective and best handled by the model?
   * Which steps are deterministic and better handled by code?

2. **Script automation opportunities**
   Identify any parts of the workflow that could benefit from Node.js scripts, especially tasks involving:
   * File parsing or transformation
   * JSON, YAML, CSV, XML, Markdown, or HTML processing
   * Validation or linting
   * Schema checks
   * API request preparation
   * Batch renaming or file organization
   * Template filling
   * Report generation
   * Repetitive formatting
   * Deterministic calculations
   * Consistency checks
   * Artifact packaging or cleanup

3. **Skill design quality**
   Review whether the skill:
   * Has clear triggering conditions in the frontmatter description
   * Keeps `SKILL.md` concise and focused
   * Moves detailed references into separate files when appropriate
   * Uses scripts instead of lengthy procedural instructions where scripts would be more reliable
   * Avoids bundling unnecessary example files
   * Provides clear usage instructions for any existing scripts
   * Includes appropriate validation and error handling guidance

4. **Node.js suitability**
   For each proposed script, assess:
   * Whether Node.js is the right tool for the task, or whether zsh fits better
   * What inputs the script should accept
   * What outputs it should produce
   * Whether it can stay dependency-free on `node:` built-ins
   * How the AI agent should call it
   * How errors should be surfaced to the agent and user

5. **Risk and maintainability**
   Consider:
   * Whether the script would reduce or increase complexity
   * Whether the task is stable enough to automate
   * Whether the script needs tests
   * Whether the script could fail silently
   * Whether the script introduces security, permission, or data-loss risks


## Output format

Return the review with the following sections, in this order.


### Executive summary

Briefly explain whether the skill would benefit from Node.js scripts and why.


### Current skill assessment

Summarize what the skill currently does well and where it is fragile, repetitive, unclear, or overly dependent on natural-language instructions.


### Recommended Node.js scripts

For each recommended script, give a heading of `#### skills/<skill-name>/scripts/<script-name>.mjs` followed by these items:

* **Purpose:** what the script should do.
* **Why this should be scripted:** why code is better than natural-language instructions for this step.
* **Inputs:** expected CLI arguments, files, environment variables, or stdin data.
* **Outputs:** expected output files, stdout, logs, or exit codes.
* **Suggested behavior:** the script's core logic, step by step.
* **Dependencies:** the `node:` built-ins it needs, or the npm package and the reason it cannot be avoided.
* **Error handling:** expected validation and failure behavior, including exit codes.
* **How the skill should reference it:** the instruction to add to `SKILL.md` explaining when and how the agent should run the script.
* **Allowlist entry:** the `Bash(node skills/<skill-name>/scripts/<script-name>.mjs:*)` line to add to `.claude/settings.json`.


### Scripts not recommended

List any workflow steps that should not be scripted and explain why they are better handled by the AI model.


### Proposed skill structure

Recommend an improved skill folder structure, for example:

```text
skills/<skill-name>/
├── SKILL.md
├── scripts/
│   ├── validate-input.mjs
│   └── generate-report.mjs
├── references/
│   └── output-format.md
└── assets/
```


### Suggested `SKILL.md` changes

Provide specific edits or replacement sections for the skill instructions, especially where script usage should be added.


### Implementation plan

Provide a prioritized plan:

1. Highest-impact script to add first
2. Supporting `SKILL.md` updates
3. Tests or fixtures to add
4. Validation steps, including `pnpm lint` and the script's own `--help` run
5. Index updates: [skills/README.md][] and the `.claude/settings.json` allowlist


### Final recommendation

Conclude with one of the following:

* **No scripts needed**
* **Add one targeted Node.js script**
* **Add multiple Node.js scripts**
* **Refactor the skill before adding scripts**

Explain the reasoning briefly.


## Constraints

* Do not suggest scripts for tasks that require subjective judgment, nuanced writing, or semantic interpretation unless the script only supports preprocessing or validation.
* Prefer small, composable scripts over one large script.
* Prefer deterministic behavior with clear inputs and outputs.
* Avoid unnecessary dependencies.
* Include safety checks before suggesting scripts that modify, delete, overwrite, or move files.
* Do not rewrite the entire skill unless explicitly asked.
* Do not write the scripts during this review. Propose them, and leave the decision to the user.
* Be specific and actionable.

[AGENTS.md]: ../AGENTS.md
[skills/script-auditor/]: ../skills/script-auditor/SKILL.md
[skills/README.md]: ../skills/README.md
