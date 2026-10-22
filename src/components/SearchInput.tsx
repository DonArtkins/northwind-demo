import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        target.matches("input, textarea, select, [contenteditable='true']");

      if (event.key === "/" && !event.defaultPrevented && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", focusSearch);
    return () => document.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <div className="search-control" role="search">
      <label className="search-label" htmlFor="product-search">
        Search products
      </label>
      <input
        ref={inputRef}
        id="product-search"
        type="text"
        className="search"
        placeholder="Search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onChange("");
          }
        }}
      />
    </div>
  );
}
