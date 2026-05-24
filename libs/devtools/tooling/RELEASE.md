# Deploying @sdux-vault/devtools-tooling

This package uses a fully automated release pipeline.

All build, validation, versioning, tagging, and packaging steps are handled by the release script.

---

## Prerequisites

- Node.js (LTS recommended)
- NPM account with publish access
- Logged in locally:

```bash
npm login
```

---

## Usage

Run the release command:

```bash
npm run release
```

You will be prompted for:

- Library to release
- Version type (`patch`, `minor`, `major`)

The script will:

- verify the workspace (lint, format, typecheck, tests)
- bump the version
- sync internal version files
- commit changes and create a git tag
- push changes and tags
- build the library
- apply appropriate licenses
- validate the build output
- generate a package tarball

---

## Dry Run (Recommended)

To preview the release without making changes:

```bash
npm run release
```

> Select `run mode`: 1) Dry run (no files will be written)

This executes the full pipeline without:

- modifying files
- creating commits
- pushing changes

---

## Publish to NPM

After a successful release, publish from the built output:

```bash
cd dist/devtools/tooling
npm-where   # ensure correct registry
npm publish --access public
```

---

## Recommended Setup (Safe Publishing Workflow)

To ensure a safe and repeatable release process, it is strongly recommended to use a local registry during development and testing.

### Use a Local Registry (Verdaccio)

```bash
npm config set @sdux-vault:registry http://localhost:4873
```

This configures all `@sdux-vault/*` packages to publish to your local registry by default.

---

## Registry Switching

```bash
alias npm-local="export npm_config_registry=http://localhost:4873"
alias npm-prod="unset npm_config_registry"
alias npm-where='REG=${npm_config_registry:-$(npm config get registry)}; [[ "$REG" == *"localhost"* ]] && echo "LOCAL → $REG" || echo "PROD → $REG"'
```

### Usage

```bash
npm-local
npm publish   # local registry

npm-prod
npm publish   # public npm registry
```

---

## Notes

- Do not manually run `npm version`, `build`, or `publish` outside this workflow
- Always use the release script to ensure consistency
- Ensure your working directory is clean before running a release
- Use dry-run before publishing to production

---

## Install

```bash
npm install @sdux-vault/devtools-tooling
```
