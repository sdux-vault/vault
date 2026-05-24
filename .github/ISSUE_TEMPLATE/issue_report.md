---
name: Issue Report
about: Report an issue or unexpected behavior
title: '[Issue] '
labels: issue
assignees: ''
---

> **Tip:** Use the **Report Issue** button in the SDuX Debugger widget — it will automatically download the debug dump and open this form with a pre-filled template. If filing manually, see [How to Capture a Debug Dump](#how-to-capture-a-debug-dump).

## Description

A clear description of the issue.

## Steps to Reproduce

1.
2.
3.

## Expected vs. Actual Behavior

- **Expected:** What you expected to happen.
- **Actual:** What actually happened.

## Severity

- [ ] Blocker — completely prevents usage
- [ ] Major — core functionality broken, workaround exists
- [ ] Minor — non-critical, cosmetic, or edge case

## Reproducibility

- [ ] Always
- [ ] Sometimes
- [ ] Only once

## Debug Dump (Required)

Attach an SDuX debug dump so we can diagnose the issue. Issues submitted without a debug dump may be closed.

### How to Capture a Debug Dump

1. Enable **devMode** in your Vault instance:
   ```
   Vault({ logLevel: 'off', devMode: true })
   provideVault({ logLevel: 'off', devMode: true })
   ```
2. Enable **insights** in your FeatureCell:
   ```
   insights: { wantsErrors: true, wantsPayload: true, wantsState: true }
   ```
   _(wantsState is optional if your state contains sensitive data)_
3. Open your application in the browser.
4. Use the **SDuX Debugger** widget to record the issue.
5. Click **Download Logs** to export the debug JSON file.
6. Drag and drop the `.json` file into this issue.

## Additional Context

Any other relevant information (screenshots, console errors, steps that triggered the issue, etc.).
