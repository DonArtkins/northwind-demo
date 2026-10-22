import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Catalog } from "../src/pages/Catalog";

describe("Catalog page", () => {
  it("shows all 48 products", () => {
    render(<Catalog />);
    expect(screen.getByRole("heading", { name: "Catalogue" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(48);
  });

  it("renders an accessible search input and result announcement", () => {
    const { container } = render(<Catalog />);
    const input = screen.getByRole("textbox", { name: "Search products" });

    expect(input).toBeInTheDocument();
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
    expect(screen.getAllByRole("article")).toHaveLength(48);
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

});
