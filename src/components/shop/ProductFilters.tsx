"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category { id: string; name: string; slug: string }

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  function update(key: string, value: string | null) {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/products?${p.toString()}`);
  }

  const activeCategory = params.get("category");
  const activeSort = params.get("sort") ?? "newest";

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden flex items-center gap-2 btn-outline mb-4"
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal size={16} /> Filters
      </button>

      <aside className={cn(
        "w-full lg:w-56 xl:w-64 space-y-6 shrink-0",
        open ? "block" : "hidden lg:block"
      )}>
        {/* Search */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Search</h3>
          <input
            type="text"
            className="input"
            placeholder="Search products…"
            defaultValue={params.get("search") ?? ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") update("search", (e.target as HTMLInputElement).value || null);
            }}
          />
        </div>

        {/* Sort */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sort By</h3>
          <div className="space-y-1">
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => update("sort", o.value)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  activeSort === o.value
                    ? "bg-brand-50 text-brand-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
          <div className="space-y-1">
            <button
              onClick={() => update("category", null)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                !activeCategory
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => update("category", cat.slug)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  activeCategory === cat.slug
                    ? "bg-brand-50 text-brand-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Price (GHS)</h3>
          <div className="flex gap-2">
            <input
              type="number"
              className="input text-sm"
              placeholder="Min"
              defaultValue={params.get("minPrice") ?? ""}
              onBlur={(e) => update("minPrice", e.target.value || null)}
            />
            <input
              type="number"
              className="input text-sm"
              placeholder="Max"
              defaultValue={params.get("maxPrice") ?? ""}
              onBlur={(e) => update("maxPrice", e.target.value || null)}
            />
          </div>
        </div>

        {/* Featured toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={params.get("featured") === "true"}
              onChange={(e) => update("featured", e.target.checked ? "true" : null)}
              className="w-4 h-4 accent-brand-600"
            />
            <span className="text-sm text-gray-700 font-medium">Featured only</span>
          </label>
        </div>

        {/* Clear */}
        {(activeCategory || params.get("search") || params.get("featured")) && (
          <button
            onClick={() => router.push("/products")}
            className="text-sm text-red-500 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </aside>
    </>
  );
}
