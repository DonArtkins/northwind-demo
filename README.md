# Northwind Catalogue (lab starter)

A small React + TypeScript + Vitest project for the "Stop Prompting. Start Specifying." lab.

**Current state (intentionally incomplete):** the catalogue page lists 48 products and shows a
search box, but the search box is not wired to anything. Typing does nothing.

**Not included on purpose:** `AGENTS.md` and `specs/product-search-filter.md`. Write them yourselves
during the lab. Put the spec in `specs/`.

## Setup (do this once, while you still have internet)

    npm install

## Commands (work offline after setup)

    npm test        # run the existing tests (all must pass before and after the feature)
    npm run lint    # type-check with tsc
    npm run dev     # open the page in a browser (http://localhost:5173)
    npm run build   # production build

## Layout

    src/pages/Catalog.tsx          renders the heading, search box and grid
    src/components/ProductGrid.tsx preserve
    src/components/ProductCard.tsx preserve
    src/components/SearchInput.tsx existing; wire it up, keep its props
    src/components/EmptyState.tsx  reuse (message + optional children)
    src/data/products.ts           48 fictional products
    tests/                         existing tests must still pass

## Reset to the starting point

    git reset --hard && git clean -fd

(Only if you ran the init script, which creates the first commit.)
