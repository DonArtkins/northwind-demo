import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Catalog } from "../src/pages/Catalog";

describe("Catalog page", () => {
  it("shows the first page of all 48 products", () => {
    render(<Catalog />);
    expect(screen.getByRole("heading", { name: "Catalogue" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
  });

  it("renders an accessible search input and result announcement", () => {
    const { container } = render(<Catalog />);
    const input = screen.getByRole("textbox", { name: "Search products" });
    const label = screen.getByText("Search products", { selector: "label" });

    expect(input).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "product-search");
    expect(label.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByText("Showing 48 of 48 products")).toBeInTheDocument();
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it("filters products and updates the result count", async () => {
    const user = userEvent.setup();
    render(<Catalog />);

    await user.type(screen.getByRole("textbox", { name: "Search products" }), "shoe trail");

    expect(screen.getByText("Showing 1 of 48 products")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Trail Runner Shoe" })).toBeInTheDocument();
  });

  it("shows an empty state and clears the search", async () => {
    const user = userEvent.setup();
    render(<Catalog />);
    const input = screen.getByRole("textbox", { name: "Search products" });

    await user.type(input, "zzz");

    expect(screen.getByText("Showing 0 of 48 products")).toBeInTheDocument();
    expect(screen.getByText('No products match "zzz"')).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    expect(screen.getAllByRole("article")).toHaveLength(12);
  });

  it("supports the search keyboard shortcuts", async () => {
    const user = userEvent.setup();
    render(<Catalog />);
    const input = screen.getByRole("textbox", { name: "Search products" });

    await user.keyboard("/");
    expect(input).toHaveFocus();
    await user.type(input, "trail");
    await user.keyboard("{Enter}");
    expect(input).toHaveValue("trail");
    await user.keyboard("{Escape}");

    expect(input).toHaveValue("");
    await user.type(input, "/");
    expect(input).toHaveValue("/");
  });

  it("filters by category and combines it with search", async () => {
    const user = userEvent.setup();
    render(<Catalog />);
    const category = screen.getByLabelText("Category");

    await user.selectOptions(category, "Apparel");

    expect(category).toHaveValue("Apparel");
    expect(screen.getByText("Showing 17 of 48 products")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(
      screen.getAllByRole("article").every((article) => article.textContent?.includes("Apparel")),
    ).toBe(true);

    await user.type(screen.getByRole("textbox", { name: "Search products" }), "trail");

    expect(screen.getByText("Showing 1 of 48 products")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Trail Jacket" })).toBeInTheDocument();
  });

  it("paginates results and resets to page 1 when filters change", async () => {
    const user = userEvent.setup();
    render(<Catalog />);

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("heading", { name: "Down Vest" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "4" }));
    expect(screen.getByRole("button", { name: "4" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getByRole("heading", { name: "Fire Starter" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("heading", { name: "Trekking Poles" })).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Category"), "Gear");
    expect(screen.getByText("Showing 29 of 48 products")).toBeInTheDocument();
    expect(
      screen.getAllByRole("article").every((article) => article.textContent?.includes("Gear")),
    ).toBe(true);
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("heading", { name: "Water Bottle" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "3" }));
    await user.type(screen.getByRole("textbox", { name: "Search products" }), "gr-2");
    expect(screen.getByText("Showing 28 of 48 products")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("heading", { name: "Canvas Backpack" })).toBeInTheDocument();
  });

  it("keeps category controls and clear search available for no results", async () => {
    const user = userEvent.setup();
    render(<Catalog />);
    const category = screen.getByLabelText("Category");
    const input = screen.getByRole("textbox", { name: "Search products" });

    await user.selectOptions(category, "Footwear");
    expect(screen.getByText("Showing 2 of 48 products")).toBeInTheDocument();
    expect(
      screen.getAllByRole("article").every((article) => article.textContent?.includes("Footwear")),
    ).toBe(true);
    await user.type(input, "zzz");

    expect(category).toHaveValue("Footwear");
    expect(screen.getByText('No products match "zzz"')).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(input).toHaveFocus();
    expect(screen.getByText("Showing 2 of 48 products")).toBeInTheDocument();
  });
});
