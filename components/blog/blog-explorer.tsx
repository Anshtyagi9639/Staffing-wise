"use client";

import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import type { BlogCardData } from "@/lib/blog";
import { cn } from "@/lib/utils/cn";

const PAGE_SIZE = 9;

/**
 * Article grid with text search, category filter and "load more". All articles are in the server-rendered HTML
 * (the filters only hide cards), so every article link is crawlable without JavaScript.
 * The featured article is shown above the grid, so it is left out of the unfiltered grid but included in search and filters.
 */
export function BlogExplorer({ posts, categories, featuredSlug }: { posts: BlogCardData[]; categories: readonly string[]; featuredSlug?: string }) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtering = category !== "All" || query.trim() !== "";
  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter(
      (p) =>
        (filtering || p.slug !== featuredSlug) &&
        (category === "All" || p.category === category) &&
        words.every((w) => p.searchText.includes(w)),
    );
  }, [posts, query, category, filtering, featuredSlug]);
  const shown = results.slice(0, visible);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setVisible(PAGE_SIZE);
              }}
              className={cn(
                "min-h-10 rounded-full border px-4 text-[0.92rem] font-semibold transition-colors",
                category === c ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-navy-900 hover:border-navy-900",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor={searchId} className="sr-only">
            Search articles
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-slate" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search articles"
            className="block min-h-11 w-full rounded-full border-[1.5px] border-line bg-white pr-4 pl-10 text-base text-ink placeholder:text-slate/80 focus:border-navy-700 focus:ring-3 focus:ring-navy-700/20 focus:outline-none"
          />
        </div>
      </div>

      <p role="status" className="mt-5 text-[0.92rem] text-ink-soft">
        {filtering ? `${results.length} ${results.length === 1 ? "article" : "articles"} found` : `${results.length} more articles`}
      </p>

      {results.length ? (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const isShown = shown.includes(p);
            return (
              <li key={p.slug} hidden={!isShown}>
                <BlogCard post={p} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-6 rounded-brand border-2 border-dashed border-line bg-white p-8 text-center">
          <h3 className="text-[1.4rem]">No articles match your search</h3>
          <p className="mt-2 text-ink-soft">Try a different word, choose another topic, or browse all articles.</p>
          <Button variant="outline" size="sm" className="mt-5" onClick={reset}>
            <X aria-hidden /> Clear filters
          </Button>
        </div>
      )}

      {results.length > visible ? (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more articles
          </Button>
        </div>
      ) : null}
    </div>
  );
}
