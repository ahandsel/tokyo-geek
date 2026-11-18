---
title: Open file:line links from iTerm2 in VSCodium
description: Make Cmd-clicked file:line:column paths in iTerm2 open VSCodium at the right line and column.
head:
  - - meta
    - name: keywords
      content: iterm2, vscodium, codium, semantic history, macos, terminal, editor, line number
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}


## Problem

Cmd-clicking a path such as `notes/todo.md:12` in [iTerm2][iterm2] opens VSCodium, but VSCodium creates a new, empty file named `notes/todo.md:12` instead of jumping to line 12.


## Cause

iTerm2's **Semantic History** decides what happens when you Cmd-click a path.

* The default, **Open with default app**, runs a plain macOS `open` on the text. `open` does not understand line numbers, so the whole string is treated as the filename.
* **Open with editor** includes **VS Codium**. iTerm2 looks for `Contents/Resources/app/bin/code` inside the app bundle. [VSCodium][vscodium] ships that program as `bin/codium`, so this menu item opens the app and does not jump to the clicked line.


## Fix

Tell iTerm2 to run `codium --goto` yourself.

1. Run `which codium` to find the full path of the VSCodium command line tool (for example, `/usr/local/bin/codium`).
2. Open **iTerm2** → **Settings** → **Profiles** → your profile → **Advanced**.
3. Under **Semantic History**, choose **Run command...**.
4. Paste the following, replacing `/usr/local/bin/codium` with your path if it differs:

```shell
f=\(semanticHistory.path)
l=\(semanticHistory.lineNumber)
c=\(semanticHistory.columnNumber)
if [ -n "$c" ]; then /usr/local/bin/codium -g "$f:$l:$c"; elif [ -n "$l" ]; then /usr/local/bin/codium -g "$f:$l"; else /usr/local/bin/codium "$f"; fi
```

Now Cmd-clicking a path behaves as follows:

| Clicked text         | Result                      |
| -------------------- | --------------------------- |
| `notes/todo.md:12:5` | Opens at line 12, column 5. |
| `notes/todo.md:12`   | Opens at line 12.           |
| `notes/todo.md`      | Opens the file.             |


## Notes

* `-g` (`--goto`) accepts `file:line[:character]`. VS Code's `code` command accepts the same flag.
* iTerm2 fills in the `\(semanticHistory.*)` variables before running the command. The path is resolved against the terminal's working directory, so relative paths work.
* `\(semanticHistory.path)` is already shell-escaped. Leave the assignment unquoted so the shell consumes those backslashes. Quoting the assignment keeps the backslashes, and a path that contains a space opens the wrong file.
* Use the full path to `codium`, because iTerm2 does not load your shell's `PATH` when it runs the command.
* Links printed as real hyperlinks (OSC 8, `file://...`) go to the macOS URL handler instead of Semantic History, so this fix does not apply to them.

<!-- Links -->

[iterm2]: https://iterm2.com/
[vscodium]: https://vscodium.com/
