import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "../src/components/ProductCard";

describe("ProductCard", () => {
  it("shows name, sku and price", () => {
    render(<ProductCard product={{ id: 1, name: "Test Item", sku: "TT-001", category: "Gear", price: 10 }} />);
    expect(screen.getByRole("heading", { name: "Test Item" })).toBeInTheDocument();
    expect(screen.getByText("TT-001")).toBeInTheDocument();
    expect(screen.getByText(/\$10\.00/)).toBeInTheDocument();
  });
});
