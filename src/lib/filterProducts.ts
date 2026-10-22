type SearchableProduct = {
  name: string;
  sku: string;
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function filterProducts<T extends SearchableProduct>(items: T[], query: string): T[] {
  const terms = normalize(query).split(" ").filter(Boolean);

  if (terms.length === 0) {
    return items;
  }

  return items.filter((item) => {
    const haystack = normalize(`${item.name} ${item.sku}`);
    return terms.every((term) => haystack.includes(term));
  });
}

export function countText(shown: number, total: number) {
  return `Showing ${shown} of ${total} products`;
}
