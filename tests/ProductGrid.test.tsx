import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductGrid } from "../src/components/ProductGrid";

describe("ProductGrid", () => {
  it("renders one card per product", () => {
    render(
      <ProductGrid
        products={[
          { id: 1, name: "A", sku: "A-1", category: "Gear", price: 1 },
          { id: 2, name: "B", sku: "B-2", category: "Gear", price: 2 },
        ]}
      />,
    );
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });
});
