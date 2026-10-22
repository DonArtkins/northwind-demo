import { describe, expect, it } from "vitest";
import { countText, filterProducts } from "../src/lib/filterProducts";

const products = [
  { name: "Trail Runner Shoe", sku: "TR-100" },
  { name: "Road Runner Shoe", sku: "RR-200" },
  { name: "Trail Jacket", sku: "TJ-300" },
  { name: "Water Bottle", sku: "WB-400" },
];

describe("filterProducts", () => {
  it("returns all products for an empty query", () => {
    expect(filterProducts(products, "")).toEqual(products);
  });

  it("matches case-insensitively after normalizing whitespace", () => {
    const matches = filterProducts(products, "trail");

    expect(filterProducts(products, "TRAIL")).toEqual(matches);
    expect(filterProducts(products, " trail ")).toEqual(matches);
  });

  it("requires every term to match in any order", () => {
    expect(filterProducts(products, "shoe   trail")).toEqual([products[0]]);
  });

  it("matches product SKUs", () => {
    expect(filterProducts(products, "tr-100")).toEqual([products[0]]);
  });

  it("returns runner products and no products for unmatched terms", () => {
    expect(filterProducts(products, "runner")).toEqual([products[0], products[1]]);
    expect(filterProducts(products, "zzz")).toEqual([]);
  });
});

describe("countText", () => {
  it("reports the visible and total product counts", () => {
    expect(countText(2, 4)).toBe("Showing 2 of 4 products");
  });
});
