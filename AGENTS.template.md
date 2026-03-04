# AI Development Guide - Facilitator Network Cell

This document provides essential development commands and workflows for the Facilitator Network Cell project.

## Project Overview
See section [Project Structure](./README.md).

## Development Commands
See section [Development basics](./bs/README.md).

## Important Notes for AI Code Assistants

1. After implementing new features:
	- Run All Checks `bs/dev/lint.js` and fix errors.
	- Format code `bs/dev/biome.js Formatting --fix`, it may be needed change code manually if autofix fails.
1. **Use `bs/` scripts** in other cases
1. **No test runner YET**: There are no Jest/Vitest tests configured


## Web App Structure
See section [App structure](./src/README.md) and [Colocation convention](./src/app/README.md).

## Additional Resources
See section [Additional resources](./README.md).
