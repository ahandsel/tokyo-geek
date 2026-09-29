# Technical document writing style guide for English content

This guide defines documentation-specific writing rules for help documentation.
It supplements the [general style guide](./general-style-guide-english.md), which covers baseline language, grammar, capitalization, punctuation, and word usage.

**Audience:** Human writers and AI writing agents contributing to this repository's content.

**Scope:** Rules in this guide apply to help documentation only (how-to guides, reference documents, tutorials, and explanations). Refer to the general style guide for baseline English writing rules.

**Priority:** When this guide and the general style guide conflict, this guide takes precedence for help and technical documentation.


## Table of contents <!-- omit in toc -->

* [Sentence structure](#sentence-structure)
* [Lists](#lists)
* [Preparations sections](#preparations-sections)
* [Procedural steps](#procedural-steps)
* [Inline formatting](#inline-formatting)
* [Punctuation in definitions](#punctuation-in-definitions)
* [Do not use exclamation marks](#do-not-use-exclamation-marks)
* [Alert banners](#alert-banners)


## Sentence structure


### Express one key point per sentence

Each sentence or clause should convey a single key point.
If a sentence contains multiple ideas, split it into separate sentences or clauses to improve clarity.

**Do ✅:**

```md
All published guides are shown on the guides index page and can be read in English or Japanese.
```

```md
This guide provides step-by-step instructions for renewing a visa online.
Use the online system to submit an application without visiting an immigration office.
```

**Do not ❌:**

```md
All published guides are readable on the guides index page in English or Japanese.
```

This sentence bundles two points (where the guides appear and which languages they are available in) into one clause, which reduces focus.

```md
This guide provides step-by-step instructions for renewing a visa online and submitting an application through the online system without visiting an immigration office.
```


### Always pair "the following" with a noun

When using "the following" to introduce a list, include a noun that describes the items. Do not use "the following" on its own before a colon.

* **Do ✅:** `To renew a visa online, you need the following documents:`
* **Do not ❌:** `To renew a visa online, you need the following:`


### Do not end an introductory line with a dangling preposition

Do not end an introductory clause with "by", "with", "from", or "of" followed by a colon.
Rewrite the sentence to eliminate the dangling preposition.

**Do ✅:**

```md
Collect a reserved ticket using one of these methods:

- Scan the pickup QR code at a reserved-seat ticket machine.
- Enter the 16-digit pickup code at a reserved-seat ticket machine.
```

Or use an imperative lead-in:

```md
To collect a reserved ticket:

- Scan the pickup QR code at a reserved-seat ticket machine.
- Enter the 16-digit pickup code at a reserved-seat ticket machine.
```

**Do not ❌:**

```md
Collect a reserved ticket by:

- Scan the pickup QR code at a reserved-seat ticket machine.
- Enter the 16-digit pickup code at a reserved-seat ticket machine.
```


## Lists


### Introduce every bulleted list

Always precede a bulleted list with an introductory phrase or label that explains what the list items represent.
Do not place a bulleted list immediately after a paragraph with no lead-in.

**Do ✅:**

```md
Furusato nozei is a tax program that redirects part of your residence tax to a municipality of your choice.
Key features of furusato nozei:

- Each donation consists of a payment and a choice of local gift.
- All completed donations are listed on the donation portal and can be applied to the following year's residence tax.
- Receipts can be filed through the one-stop exception or a full tax return.
```

**Do not ❌:**

```md
Furusato nozei is a tax program that redirects part of your residence tax to a municipality of your choice.

- Each donation consists of a payment and a choice of local gift.
- All completed donations are applicable to the following year's residence tax from the donation portal.
- Receipts can be filed through the one-stop exception or a full tax return.
```

The list appears disconnected from the paragraph because it lacks a lead-in.


## Preparations sections

All h3 headings within an h2 "Preparations" section should be action-oriented, using a verb phrase rather than a noun phrase. This helps users understand what they need to do at a glance.

* OK: `### Check your residence status`
* NOT: `### Residence status`

Preparations section refers to `* Preparations (h2) (optional)` as defined in the [How-to guides style guide](./templates/how-to-guides-template-structure.md).


## Procedural steps


### Reserve numbered steps for user actions

Numbered steps in a procedure must describe actions that the user performs.
Do not format system responses, outcomes, or explanatory statements as steps.

After a user-action step, describe the system response as a regular paragraph or a note outside the numbered list.

**Do ✅:**

```md
4. Click **Save**.

The reservation is saved and appears on the reservations page.
```

**Do not ❌:**

```md
4. Click **Save**.

5. The reservation is saved and can be viewed on the reservations page.
```


## Inline formatting

Use the following formatting conventions to distinguish different types of content:

| Format   | Use for                                                    | Example                                                              |
| -------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| **Bold** | UI elements (button names, field labels, menu items, etc.) | Click the **Save** button to save your reservation.                  |
| `Code`   | User input, commands, or keyboard keys                     | Type `指定席` in the search field to find reserved seats.            |
| "Quotes" | System messages (errors, confirmations, etc.)              | A "Seat not available" message appears if the train is fully booked. |

> [!TIP]
> Do not use italics for emphasis. Italic text cannot be rendered distinctly in Japanese, so it does not translate well.


## Punctuation in definitions


### Use dash to separate terms from definitions in the glossary section

When defining a term in the glossary section of a document, separate the term from its definition with a dash (`-`), not a colon (`:`).
This format is specific to glossary sections of the document. In other contexts, use a colon to separate a term from its definition.

**Do ✅:**

```md
## Glossary

- **Furusato nozei** - A tax program that redirects part of your residence tax to a municipality of your choice.
```

**Do not ❌:**

```md
## Glossary

- **Furusato nozei**: A tax program that redirects part of your residence tax to a municipality of your choice.
```

For other cases, refer to the [Colons `:` section](./general-style-guide-english.md#colons-) of the general style guide for rules on using colons.


## Do not use exclamation marks

Refer to the [Exclamation marks `!` section](./general-style-guide-english.md#exclamation-marks-) of the general style guide for rules on using exclamation marks.


## Alert banners

Use GitHub-flavored alert syntax to highlight important information. VitePress renders these as styled callout boxes.


### Available banner types

| Type           | Purpose                                                            |
| -------------- | ------------------------------------------------------------------ |
| `[!NOTE]`      | Useful supplementary information for readers skimming the document |
| `[!TIP]`       | Optional best practices or recommendations                         |
| `[!IMPORTANT]` | Critical information necessary for users to succeed                |
| `[!CAUTION]`   | Potential negative consequences of an action, such as data loss    |

Do not use `[!WARNING]` to avoid confusion with `[!CAUTION]` and `[!IMPORTANT]`.

* Use `[!CAUTION]` for warnings about potential negative consequences.
* Use `[!IMPORTANT]` for critical information necessary for success.


### One-line format

Use the one-line format when the message is a single sentence with no links or formatted text. Write a complete sentence with punctuation.

```md
> [!NOTE] Note: A reservation number is required to collect a ticket at the station.
```

**Constraint:** One-line banners support plaintext only. If you need links or formatted text, use the multi-line format.


### Multi-line format

Use the multi-line format when the banner needs links, formatted text, or additional detail. Place a short title (in title case, without terminal punctuation) on the first line, and write the body on subsequent lines.

```md
> [!NOTE] Note: Residence card requirements
> You can check the current requirements on the [Residence card][id-residence-card-url] page of the Immigration Services Agency site.
```

The title and body **must** be on separate lines. VitePress does not render inline links or formatting on the title line.


### General rules for banner usage

* Use banners sparingly. Overusing them reduces their effectiveness.
* Prefer the one-line format when no links or rich formatting are needed.
* Place linked text and rich text in the body of a multi-line banner, never in the title.
  * Due to VitePress rendering constraints, title line can only contain plaintext.
* Use sentence case for banner titles to maintain consistency with heading formatting.
  * Do not use title case in banner titles, even if the title is only one line.
