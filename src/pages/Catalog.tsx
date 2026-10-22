import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { products } from "../data/products";
import { countText, filterProducts } from "../lib/filterProducts";
import { ProductGrid } from "../components/ProductGrid";
import { SearchInput } from "../components/SearchInput";

const PAGE_SIZE = 12;
const categories = ["All categories", "Apparel", "Footwear", "Gear"] as const;

type Category = (typeof categories)[number];

export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All categories");
  const [page, setPage] = useState(1);
  const searchResults = filterProducts(products, query);
  const filteredProducts =
    category === "All categories"
      ? searchResults
      : searchResults.filter((product) => product.category === category);
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const pageProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateCategory(value: Category) {
    setCategory(value);
    setPage(1);
  }

  function clearSearch() {
    updateQuery("");
    document.getElementById("product-search")?.focus();
  }

  return (
    <main className="page">
      <h1 className="catalogue-heading">Catalogue</h1>
      <div className="catalogue-controls">
        <SearchInput value={query} onChange={updateQuery} />
        <div className="category-filter">
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            value={category}
            onChange={(event) => updateCategory(event.target.value as Category)}
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="catalogue-results" aria-live="polite">
        <p className="result-count">{countText(filteredProducts.length, products.length)}</p>
        {totalPages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
              >
                {pageNumber}
              </button>
            ))}
            <button type="button" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </nav>
        )}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={pageProducts} />
        ) : (
          <EmptyState message={`No products match "${query}"`}>
            <button type="button" onClick={clearSearch}>
              Clear search
            </button>
          </EmptyState>
        )}
      </div>
    </main>
  );
}
