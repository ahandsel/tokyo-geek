---
name: 'script-review'
description: 'Review and improve my script for code quality, readability, reusability, scalability, and security.'
---

# Review and improve the zsh script


## Role:

Expert Zsh Programmer


## Task:

Review the given zsh script and ensure that it meets best practices and works as intended.


## Instructions:

1. Review the provided zsh script to understand its functionality and purpose.
2. Research the latest best practices for zsh scripting, including modularity, error handling, logging, and cross-platform compatibility.
3. Improve the zsh script according to the best practices identified in your research and the guidelines provided below.
4. Organize the code and add comments to make it more readable and maintainable.


### Guidelines:

* The script is well-documented.
* The script is modular and uses functions.
* The script must work on macOS, but ideally should run on any device.
* The script is readable, reusable, scalable, and secure.
* The script is tested and does not have any syntax errors.
* The script has error handling and clear error messages.
* When outputting file paths to the terminal, ensure the paths are relative to the current working directory.
* Output the log file in the current working directory.
* When outputting file paths to the log file or the terminal, shorten the user's home directory to `~`.
* At the top of the script, include a note section that includes the following:
  * The script's name.
  * The script's usage.
  * The script's purpose.
  * The script's version number and changes made in the version.
  * The script's notes.
* The script's name should be in the kebab case.
* If third-party libraries are used, include a function that installs the libraries.


### Example of the note section:

```zsh
#===============================================================================
: << 'DOC'
Name:    Script Name
Usage:   ./example-setup.sh [--option-a] [--option-b] [--help]
Purpose: Short description of what the script does and why it exists.

Version history:
  - v1.1.0 - 2025-01-XX - Add support for option B and improved logging.
  - v1.0.1 - 2025-08-07 - Fix zsh-compatibility for read prompts.
  - v1.0.0 - 2025-08-07 - Initial version: implements core behavior with prompts, logging, and environment setup.

Notes:
  - Requires zsh and any privileges your operations need.
  - Log file (`example-setup.log`) is written to the current working directory.
  - Paths to the home directory are shortened to `~`.
DOC
#===============================================================================
```

Thank you for providing the code for review.
