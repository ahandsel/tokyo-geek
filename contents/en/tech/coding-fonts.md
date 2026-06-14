---
title: 'Coding fonts for VS Code'
description: 'My choice of fonts for VS Code: install and setup guide.'
head:
  - - meta
    - name: keywords
      content: fonts, vscode, homebrew, monospace, fira code, hack nerd font, opendyslexic, hackgen, sarasa, ligatures, brewfile
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

The right monospaced font makes code easier to read: ligatures clean up operators, extra glyphs fill in icons, and a font with proper Japanese support keeps mixed English/Japanese tables lined up.

Here are a few favorites, how to install them with [Homebrew][homebrew], and how to wire them into VS Code with a fallback order.


## The fonts

| Font                   | Homebrew cask                   | Good for                                              |
| ---------------------- | ------------------------------- | ----------------------------------------------------- |
| Fira Code              | `font-fira-code`                | Programming ligatures for clearer code                |
| Hack Nerd Font         | `font-hack-nerd-font`           | A patched font with extra developer glyphs and icons  |
| OpenDyslexic Nerd Font | `font-open-dyslexic-nerd-font`  | Dyslexia-friendly reading, plus Nerd Font icons       |
| HackGen Console        | `font-hackgen`                  | Mixed English/Japanese alignment - a little bolder    |
| Sarasa Mono J          | `font-sarasa-gothic`            | Mixed English/Japanese alignment - a little lighter   |


### Fira Code

* A monospaced font with programming ligatures. Multi-character sequences like `=>`, `!=`, and `>=` render as single, clearer symbols while the underlying text stays plain ASCII.


### Hack Nerd Font

* A clean, workhorse coding font patched with [Nerd Fonts][nerd-fonts] glyphs, so file-type icons and prompt symbols in tools like terminals and status bars display correctly.


### OpenDyslexic Nerd Font

* A dyslexia-friendly typeface with weighted letter bottoms to reduce letter swapping, also patched with Nerd Font icons.


### HackGen Console

* A Japanese-friendly monospaced font where full-width Japanese characters are exactly twice the width of half-width Latin characters. This keeps Markdown tables that mix English and Japanese aligned. A little bolder; a good default if you cannot decide.


### Sarasa Mono J

* Same Japanese-alignment benefit as HackGen Console, with a slightly lighter, more delicate look.


## Install with Homebrew


### Option A: Direct commands

Install any font as a Homebrew cask. Run only the ones you want:

```shell
brew install --cask font-fira-code
brew install --cask font-hack-nerd-font
brew install --cask font-open-dyslexic-nerd-font
brew install --cask font-hackgen
brew install --cask font-sarasa-gothic
```

These are safe to re-run; Homebrew skips anything already installed.


### Option B: Brewfile

Use my [Brewfile][brewfile] and install all fonts in one shot.
Save the Brewfile to your machine, then run:

```shell
brew bundle install --file=./Brewfile
```

See [Migrate macOS apps with Homebrew][migrate-macos-apps-homebrew] for more on Brewfile workflows.


### Confirm what got installed

VS Code needs the font's exact family name (the text after the colon in the output below). Look it up rather than guessing:

```shell
fc-list | grep -iE "fira|hack|dyslexic|sarasa"
```

For reference, the family names for these fonts are:

| Font                   | Family name in VS Code   |
| ---------------------- | ------------------------ |
| Fira Code              | `Fira Code`              |
| Hack Nerd Font         | `Hack Nerd Font`         |
| OpenDyslexic Nerd Font | `OpenDyslexic Nerd Font` |
| HackGen Console        | `HackGen Console`        |
| Sarasa Mono J          | `Sarasa Mono J`          |


## Configure VS Code

VS Code has two levels of settings:


### User settings

* apply to every project on your machine. Best for your personal default font.


### Workspace (project) settings

* live in a project's `.vscode/settings.json` and apply only inside that project. Best when a specific repo needs a specific font (for example, a docs repo with Japanese tables), or when you want to share the setting with teammates through version control.

Workspace settings win over user settings for the same key, so you can set a general default once and override it per project.

The fastest way to open either file: press `Cmd+Shift+P`, then run **Preferences: Open User Settings (JSON)** or **Preferences: Open Workspace Settings (JSON)**.


### User level

To set your default editor font for all files, add this to your user `settings.json`:

```jsonc
{
  "editor.fontFamily": "'Fira Code', monospace",
  "editor.fontLigatures": true
}
```

`editor.fontLigatures` turns on the ligatures that make Fira Code worthwhile; leave it out (or set it to `false`) for fonts where you do not want them.


### Project level

To use a font only inside one project, add it to that project's `.vscode/settings.json`. This example scopes a Japanese-friendly font to Markdown files only, so your other files keep their usual font:

```jsonc
{
  "[markdown]": {
    "editor.fontFamily": "'HackGen Console', 'Sarasa Mono J', monospace"
  }
}
```

The `"[markdown]"` block is a language-specific override; swap it for `"[python]"`, `"[go]"`, and so on to target other languages, or set `editor.fontFamily` at the top level to cover everything.


## Font preference order and fallback

`editor.fontFamily` accepts a comma-separated list. VS Code uses the first font that is installed and contains the glyph it needs to render, falling back to the next one if a character is missing. Wrap any name with spaces in single quotes, and end the list with the generic `monospace` keyword so there is always a final fallback:

```jsonc
{
  "editor.fontFamily": "'Fira Code', 'Hack Nerd Font', 'HackGen Console', monospace"
}
```

Read that left to right:

1. **Fira Code** for most Latin code and ligatures.
2. **Hack Nerd Font** supplies any Nerd Font icon glyphs Fira Code lacks.
3. **HackGen Console** covers Japanese characters neither of the first two include.
4. **`monospace`** is the system fallback if none of the above are installed.

A few tips:

* Put your most-wanted font first; it sets the overall look. Later fonts only fill in glyphs that earlier fonts are missing.
* Always finish with `monospace` (or `monospace, sans-serif`) so the editor stays usable even before you install the named fonts.
* Mixing fonts of different widths can make columns drift. If you rely on aligned Markdown tables, lead with a single font that covers both English and Japanese (like HackGen Console or Sarasa Mono J) instead of stacking several.

After changing fonts, reload VS Code (`Cmd+Shift+P` then **Developer: Reload Window**, or just reopen it) to see the change take effect.


## References

* [Visual Studio Code - editor.fontFamily setting][vscode-fonts]
* [Nerd Fonts][nerd-fonts]
* [Homebrew Cask Fonts][homebrew]

<!-- Links -->

[brewfile]: /share/Brewfile
[homebrew]: https://brew.sh/
[migrate-macos-apps-homebrew]: homebrew-migrate.md
[nerd-fonts]: https://www.nerdfonts.com/
[vscode-fonts]: https://code.visualstudio.com/docs/editor/settings
