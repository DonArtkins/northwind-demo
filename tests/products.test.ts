import { describe, expect, it } from "vitest";
import { products } from "../src/data/products";

describe("products data", () => {
  it("has 48 products with unique SKUs", () => {
    expect(products).toHaveLength(48);
    expect(new Set(products.map((p) => p.sku)).size).toBe(48);
  });
});
