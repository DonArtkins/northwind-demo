# Feature: Catalogue layout, category filters, and pagination

Status: planned  
Branch: `feat/catalog-filters-pagination`

## Problem and goal

The catalogue displays all 48 products in one long list. Make browsing feel intentional: improve the page hierarchy, let shoppers narrow results by category, and present no more than 12 cards at once.

## Scope

### In scope

- Improve the visual hierarchy and spacing around the catalogue heading, search, result count, controls, and grid.
- Add a category filter with **All categories**, **Apparel**, **Footwear**, and **Gear**.
- Combine category filtering with the existing search.
- Paginate filtered results with 12 products per page.
- Add accessible pagination controls.
- Preserve the existing creamy-white visual direction and responsive product-card grid.

### Out of scope

- Server-side filtering or pagination.
- Sorting, fuzzy search, new product data, URL query-state persistence, analytics, or new dependencies.
- Changes to search matching rules, search keyboard shortcuts, or product-card component props.

## Existing behaviour to preserve

- Search matches product name and SKU case-insensitively with whitespace-normalized, multi-term matching.
- The search field, `/` shortcut, `Escape` shortcut, result count, polite live region, and no-results state continue to work.
- A zero-result search keeps the existing **Clear search** action and returns focus to the input.
- `ProductGrid`, `ProductCard`, `EmptyState`, and `SearchInput` props remain unchanged.

## Behaviour rules

- **All categories** is the default selection and includes every product.
- The selectable categories are exactly Apparel, Footwear, and Gear, matching the current product data.
- Search and category filters use AND logic: a displayed product must match the search query and selected category when both are active.
- Changing the search query or selected category returns the shopper to page 1.
- The result count reads `Showing N of 48 products`, where `N` is the total after search and category filtering, not the number on the current page.
- Show 12 product cards per page at most.
- Show pagination only when filtered results require more than one page.
- Pagination provides Previous, Next, and numbered page buttons.
- Disable Previous on page 1 and Next on the final page.
- The current numbered page has `aria-current="page"`.
- If a selected category and query produce no products, show the existing empty state. Keep category controls available so shoppers can choose another category.

## Visual and accessibility requirements

- Use a visible `Category` label associated with the category control.
- Use native form controls or native buttons with accessible names for filtering and pagination.
- Keep tab order logical: search, category control, pagination controls, then product grid.
- Make active, disabled, hover, and focus states clear.
- On narrow screens, controls wrap rather than introducing horizontal scrolling; the product cards remain readable.
- Use spacing and subtle borders consistent with the creamy-white page and existing cards.

## Allowed files

- `src/pages/Catalog.tsx`
- `src/styles.css`
- `tests/Catalog.test.tsx`

## Acceptance criteria

- With All categories active, all 48 products are available across four pages of 12 cards.
- Apparel, Footwear, and Gear each show only matching products and reset pagination to page 1.
- Search and category filtering work together.
- Changing a query or category resets the selected page to 1.
- Previous, Next, and each numbered button show the correct 12-card page slice.
- Previous and Next have correct disabled states, and the active page has `aria-current="page"`.
- The count is based on all filtered results out of 48 and remains in the polite live region.
- No-results and **Clear search** continue to work.
- Controls are visible, labelled, keyboard accessible, responsive, and visually coherent with the catalogue.
- No dependency or unrelated component-prop change is introduced.
- `npm test`, `npm run lint`, and `npm run build` pass.

## Test plan

- Verify All categories displays the first 12 of 48 products and exposes four pages.
- Verify each category contains only its own products.
- Search within a selected category and verify the intersection and count.
- Navigate with Previous, Next, and page numbers; verify the cards and disabled states.
- Change the query and category from a later page; verify each returns to page 1.
- Verify zero results preserve the empty state, clear action, and accessible category controls.
