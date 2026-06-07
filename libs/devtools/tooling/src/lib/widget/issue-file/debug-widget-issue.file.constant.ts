/** Markdown template for GitHub issue reports including debug dump instructions. */
export const SDUX_DEBUG_WIDGET_GITHUB_CONSTANT = `

# SDuX Issue Report

Please include an **SDuX debug dump** so we can diagnose the issue.

Without the debug dump we cannot investigate runtime behavior.  
Issues submitted without a debug dump may be closed.

---

## How to Capture a Debug Dump

1. Enable **devMode** in your Vault instance.

### React / Vue / Typescript

\`\`\`
Vault({ logLevel: 'off', devMode: true })
provideVault({ logLevel: 'off', devMode: true })
\`\`\`

2. Enable **insights** in your FeatureCell.

\`\`\`
insights: { wantsErrors: true, wantsPayload: true, wantsState: true, wantsCandidates: false }
\`\`\`

*(wantsState and wantsCandidates are optional if your state contains sensitive data)*

3. Open your application in the browser.

4. Use the **SDuX Debugger** to record the issue.

5. Click **Download Logs** to export the debug JSON file.

6. Attach the downloaded \`.json\` file to this GitHub issue.

---

## Issue Summary

Briefly describe the problem.

Example:
> State updates appear delayed during heavy stream processing.

---

## What Happened?

Describe the behavior you observed.

- What did the system do?
- What appeared incorrect or unexpected?

---

## What Did You Expect to Happen?

Describe the expected behavior.

Example:
> State updates should propagate immediately after controller execution.

---

## Debug Dump (Required)

Attach the SDuX debug JSON dump from the SDuX Debugger.

Drag and drop the \`.json\` file when creating the GitHub issue.

---

## Optional Context

Add any other helpful context if relevant:

- screenshots
- console errors
- steps that triggered the issue

`;
