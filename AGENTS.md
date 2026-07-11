# Agent Instructions

## Verification Commands

Do not run tests, builds, type checks, linters, Prettier, formatters, or other verification commands unless the user explicitly requests that specific verification in the current prompt.

This restriction includes, but is not limited to:

- Test commands and test suites
- Application or library builds
- TypeScript type checking
- ESLint and other linters
- Prettier and other formatting tools
- Format checks and automatic formatting
- Validation or verification scripts

After making changes, report what was changed without running these commands by default.
