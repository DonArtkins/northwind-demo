# Feature: Search input and label redesign

Status: planned  
Branch: `feat/search-input-redesign`

## Problem and goal

The catalogue search works, but it still looks like a plain browser input with a small inline label. Give shoppers a clear, polished, accessible search control without changing how search behaves.

## Scope

### In scope

- Redesign the visible `Search products` label and search input.
- Improve layout, spacing, sizing, border, focus treatment, and responsive behaviour.
- Keep the control visually consistent with the creamy-white catalogue page and product cards.

### Out of scope

- Search matching rules or result-count wording.
- Empty-state behaviour, clear-search behaviour, or keyboard shortcuts.
- Category filters, pagination, sorting, product data, server functionality, or analytics.
- New dependencies, icon libraries, or component-prop changes.

## Existing behaviour to preserve

- Search matches names and SKUs case-insensitively.
- Multiple search terms all need to match.
- `/` focuses the input when another text field is not focused.
- `Escape` clears the query in the input.
- The input has ID `product-search`, placeholder `Search`, and an `onChange` prop accepting a string.
- The wrapper has `role="search"`.

## Requirements

- Keep a visible `Search products` label associated with the input using `htmlFor="product-search"`.
- Place the label above the input, with a clear visual relationship between them.
- The input should fill the available width of its search area but use a readable maximum width on large screens.
- Give the input comfortable padding, a subtle border, and a rounded shape consistent with the existing cards.
- Use a visible `:focus-visible` indicator with more than a colour-only difference, such as a ring or outline.
- Ensure the input and label remain legible against the creamy-white background.
- At a 320px viewport width, the label and input must fit without horizontal scrolling or clipping.
- Do not change the input’s functionality or add dependencies.

## Allowed files

- `src/components/SearchInput.tsx`
- `src/styles.css`
- `tests/Catalog.test.tsx`

## Acceptance criteria

- A visible `Search products` label remains programmatically associated with the input.
- The label appears above the input.
- The input remains keyboard reachable and exposes a visible `:focus-visible` state.
- Typing, `/`, and `Escape` work as before.
- The search control does not cause horizontal overflow at 320px viewport width.
- No dependency is added and no existing component prop changes.
- `npm test`, `npm run lint`, and `npm run build` pass.

## Test plan

- Confirm the input can still be found by role and accessible name `Search products`.
- Confirm `/` focuses it, `Escape` clears it, and text entry still filters the catalogue.
- Manually inspect the focused control at desktop and 320px widths.
