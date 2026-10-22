import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { products } from "../data/products";
import { countText, filterProducts } from "../lib/filterProducts";
import { ProductGrid } from "../components/ProductGrid";
import { SearchInput } from "../components/SearchInput";

export function Catalog() {
  const [query, setQuery] = useState("");
  const filteredProducts = filterProducts(products, query);

  function clearSearch() {
    setQuery("");
    document.getElementById("product-search")?.focus();
  }

  return (
    <main className="page">
      <h1 className="catalogue-heading">Catalogue</h1>
      <SearchInput value={query} onChange={setQuery} />
      <div className="catalogue-results" aria-live="polite">
        <p className="result-count">{countText(filteredProducts.length, products.length)}</p>
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
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
