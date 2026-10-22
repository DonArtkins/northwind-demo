import type { Product } from "../types";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  return (
    <article className="card">
      <h3>{product.name}</h3>
      <p className="sku">{product.sku}</p>
      <p className="meta">
        {product.category} · ${product.price.toFixed(2)}
      </p>
    </article>
  );
}
