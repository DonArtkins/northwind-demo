# Northwind Catalogue: AI agent entry point

This file is the starting point for every AI agent working in this repository.

## Read before acting

1. Read this file, `README.md`, and the one approved feature specification named below.
2. Identify the one feature that has been approved for work.
3. Inspect only the code and tests relevant to that feature.
4. Give a plan listing the files to change, tests to add or update, and any ambiguity.
5. Do not edit code until a human approves the plan.

## Branch and feature rule

- Implement exactly one feature per branch and one branch per feature.
- Create a branch before implementation using the name given in the feature specification.
- Do not combine, start, or partially implement a later feature in the current branch.
- Merge or close the current feature branch before beginning the next feature.
- This directory currently has no Git metadata. If it has not been initialized or cloned as a Git repository, stop and ask the human to provide a repository before creating a feature branch.

## Product today

The application is a React catalogue of 48 products. It currently provides:

- a responsive product-card grid;
- a creamy-white visual foundation;
- client-side search by product name and SKU;
- case-insensitive, whitespace-normalized multi-term search;
- a result count, no-results message, and clear-search action;
- accessible search markup and `/` / `Escape` keyboard shortcuts.

These behaviours are complete and must continue working unless an approved feature specification explicitly changes them.

## Feature roadmap

Work in this order and only after human approval:

1. **Search input and label redesign** — [`specs/search-input-redesign.md`](specs/search-input-redesign.md) — `feat/search-input-redesign`
2. **Catalogue layout, category filters, and pagination** — [`specs/catalog-filters-pagination.md`](specs/catalog-filters-pagination.md) — `feat/catalog-filters-pagination`

Each feature has its own complete specification. Read only the specification for the current feature branch; do not start the next feature early.

## Engineering rules

- Use TypeScript and existing React patterns.
- Do not add dependencies unless the approved feature explicitly allows them.
- Preserve existing component props unless the approved feature explicitly permits a change.
- Keep changes within the allowed-file list for the selected feature.
- Add focused tests for each acceptance criterion; do not weaken or remove existing tests.
- Do not refactor unrelated code or change product data.

## Verification and hand-off

Run these commands before reporting completion:

```bash
npm test
npm run lint
npm run build
```

Report the branch name, changed files, test results, and each acceptance criterion as met or not met. State assumptions and any unverified item plainly.
