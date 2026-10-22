import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

type Props = { products: Product[] };

export function ProductGrid({ products }: Props) {
  return (
    <section className="grid" aria-label="Products">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
