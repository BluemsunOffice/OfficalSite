import {
  Check,
  ChevronDown,
  Columns2,
  Filter,
  Grid2x2,
  List,
  Search,
  X,
} from "lucide-react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type LayoutMode = "1" | "2" | "4";

export type ContentItem = {
  id: string;
  href: string;
  title: string;
  description?: string;
  dateText: string;
  meta?: string;
  dateValue: string;
  author?: string;
  tags: string[];
};

type ContentLayoutGridProps = {
  items: ContentItem[];
  storageKey?: string;
  defaultLayout?: LayoutMode;
  emptyText?: string;
};

type TagMenuPosition = {
  top: number;
  left: number;
  width: number;
};

const VALID_LAYOUTS: LayoutMode[] = ["1", "2", "4"];

const gridClassMap: Record<LayoutMode, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 md:grid-cols-2",
  "4": "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

const iconByMode = {
  "1": List,
  "2": Columns2,
  "4": Grid2x2,
} as const;

const labelByMode: Record<LayoutMode, string> = {
  "1": "每行 1 列",
  "2": "每行 2 列",
  "4": "每行 4 列",
};

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

const ContentGridCard = memo(function ContentGridCard({
  item,
}: {
  item: ContentItem;
}) {
  return (
    <article className="surface-card group grid gap-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <time className="mono text-xs text-ink-500">{item.dateText}</time>
        {item.meta ? (
          <span className="text-xs text-ink-500">{item.meta}</span>
        ) : null}
      </div>
      <h3 className="m-0 text-[1.08rem] font-semibold text-ink-900">
        <a
          href={item.href}
          className="inline-flex items-center gap-1.5 transition group-hover:text-brand-500"
        >
          <span>{item.title}</span>
          <span className="mono text-xs text-brand-400 transition group-hover:translate-x-0.5 group-hover:text-brand-500">
            -&gt;
          </span>
        </a>
      </h3>
      {item.description ? (
        <p className="m-0 text-sm leading-6 text-ink-500">{item.description}</p>
      ) : null}
    </article>
  );
});

export default function ContentLayoutGrid({
  items,
  storageKey = "content-index-layout-columns",
  defaultLayout = "2",
  emptyText = "暂无内容。",
}: ContentLayoutGridProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const [tagMenuPosition, setTagMenuPosition] = useState<TagMenuPosition | null>(
    null,
  );
  const tagMenuRef = useRef<HTMLDivElement | null>(null);
  const tagButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved && VALID_LAYOUTS.includes(saved as LayoutMode)) {
      setLayout(saved as LayoutMode);
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, layout);
  }, [layout, storageKey]);

  useEffect(() => {
    if (!isTagMenuOpen) {
      return;
    }

    const updateTagMenuPosition = () => {
      const rect = tagButtonRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      setTagMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updateTagMenuPosition();

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !tagMenuRef.current?.contains(target) &&
        !tagButtonRef.current?.contains(target)
      ) {
        setIsTagMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("resize", updateTagMenuPosition);
    window.addEventListener("scroll", updateTagMenuPosition, true);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("resize", updateTagMenuPosition);
      window.removeEventListener("scroll", updateTagMenuPosition, true);
    };
  }, [isTagMenuOpen]);

  const gridClasses = useMemo(() => {
    return `grid gap-4 ${gridClassMap[layout]}`;
  }, [layout]);

  const authors = useMemo(() => {
    return [...new Set(items.map((item) => item.author).filter(Boolean))].sort(
      (a, b) => a!.localeCompare(b!, "zh-CN"),
    ) as string[];
  }, [items]);

  const years = useMemo(() => {
    return [...new Set(items.map((item) => item.dateValue.slice(0, 4)))].sort(
      (a, b) => Number(b) - Number(a),
    );
  }, [items]);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();

    items.forEach((item) => {
      item.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });

    return [...counts.entries()]
      .sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1];
        }
        return a[0].localeCompare(b[0], "zh-CN");
      })
      .map(([tag, count]) => ({ tag, count }));
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedKeyword = normalizeText(keyword);

    return items.filter((item) => {
      const matchesAuthor =
        selectedAuthor === "all" || item.author === selectedAuthor;
      const matchesYear =
        selectedYear === "all" || item.dateValue.startsWith(selectedYear);
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => item.tags.includes(tag));
      const haystack = normalizeText(
        [
          item.title,
          item.description ?? "",
          item.author ?? "",
          item.tags.join(" "),
        ].join(" "),
      );
      const matchesKeyword =
        normalizedKeyword.length === 0 || haystack.includes(normalizedKeyword);

      return matchesAuthor && matchesYear && matchesTag && matchesKeyword;
    });
  }, [items, keyword, selectedAuthor, selectedTags, selectedYear]);

  const hasActiveFilters =
    keyword.trim().length > 0 ||
    selectedAuthor !== "all" ||
    selectedYear !== "all" ||
    selectedTags.length > 0;
  const activeFilterCount = [
    keyword.trim().length > 0,
    selectedAuthor !== "all",
    selectedYear !== "all",
    selectedTags.length > 0,
  ].filter(Boolean).length;
  const selectedTagSummary =
    selectedTags.length === 0
      ? "全部标签"
      : selectedTags.length === 1
        ? selectedTags[0]
        : `${selectedTags[0]} +${selectedTags.length - 1}`;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={() => setIsFilterOpen((current) => !current)}
            aria-expanded={isFilterOpen}
            className={[
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-ink-600 shadow-[0_4px_14px_rgb(15_23_42/8%)] transition",
              isFilterOpen
                ? "border-brand-300 bg-brand-50 text-brand-700"
                : "hover:border-brand-300 hover:text-brand-700",
            ].join(" ")}
            title="展开筛选"
            aria-label="展开筛选"
          >
            <Filter size={16} />
          </button>

          {isFilterOpen ? (
            <div className="min-w-0 flex-1 overflow-x-auto">
              <div className="flex min-w-max items-center gap-2 pr-1">
                <label className="relative w-[260px] shrink-0">
                  <Search
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                  <input
                    type="search"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="搜索标题、摘要、作者或标签"
                    className="h-10 w-full rounded-xl border border-brand-100 bg-white pl-9 pr-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                  />
                </label>

                <label className="w-[144px] shrink-0">
                  <span className="sr-only">作者</span>
                  <select
                    value={selectedAuthor}
                    onChange={(event) => setSelectedAuthor(event.target.value)}
                    className="h-10 w-full rounded-xl border border-brand-100 bg-white px-3 text-sm text-ink-900 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="all">全部作者</option>
                    {authors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="w-[128px] shrink-0">
                  <span className="sr-only">年份</span>
                  <select
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(event.target.value)}
                    className="h-10 w-full rounded-xl border border-brand-100 bg-white px-3 text-sm text-ink-900 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="all">全部年份</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year} 年
                      </option>
                    ))}
                  </select>
                </label>

                {tags.length > 0 ? (
                  <div className="w-[190px] shrink-0">
                    <button
                      ref={tagButtonRef}
                      type="button"
                      onClick={() => setIsTagMenuOpen((current) => !current)}
                      aria-expanded={isTagMenuOpen}
                      className="inline-flex h-10 w-full items-center justify-between rounded-xl border border-brand-100 bg-white px-3 text-sm text-ink-900 outline-none transition hover:border-brand-300 focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                    >
                      <span className="truncate">标签: {selectedTagSummary}</span>
                      <ChevronDown
                        size={15}
                        className={[
                          "shrink-0 text-ink-400 transition-transform",
                          isTagMenuOpen ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </button>
                    {isTagMenuOpen && tagMenuPosition
                      ? createPortal(
                          <div
                            ref={tagMenuRef}
                            className="fixed z-[60] rounded-2xl border border-brand-100 bg-white p-2 shadow-[0_18px_44px_rgb(15_23_42/14%)]"
                            style={{
                              top: `${tagMenuPosition.top}px`,
                              left: `${tagMenuPosition.left}px`,
                              width: `${tagMenuPosition.width}px`,
                            }}
                          >
                        <div className="mb-2 flex items-center justify-between gap-2 px-2 py-1">
                          <span className="text-xs font-medium text-ink-500">
                            选择标签
                          </span>
                          {selectedTags.length > 0 ? (
                            <button
                              type="button"
                              onClick={() => setSelectedTags([])}
                              className="text-xs font-medium text-brand-500 transition hover:text-brand-700"
                            >
                              清空
                            </button>
                          ) : null}
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {tags.map(({ tag, count }) => {
                            const active = selectedTags.includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => {
                                  setSelectedTags((current) =>
                                    current.includes(tag)
                                      ? current.filter((item) => item !== tag)
                                      : [...current, tag],
                                  );
                                }}
                                className={[
                                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                                  active
                                    ? "bg-brand-50 text-brand-700"
                                    : "text-ink-700 hover:bg-brand-50/70",
                                ].join(" ")}
                              >
                                <span className="flex min-w-0 items-center gap-2">
                                  <span
                                    className={[
                                      "inline-flex h-4 w-4 items-center justify-center rounded border",
                                      active
                                        ? "border-brand-300 bg-brand-500 text-white"
                                        : "border-brand-200 bg-white text-transparent",
                                    ].join(" ")}
                                  >
                                    <Check size={12} />
                                  </span>
                                  <span className="truncate">{tag}</span>
                                </span>
                                <span className="ml-3 shrink-0 text-xs text-ink-400">
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                          </div>,
                          document.body,
                        )
                      : null}
                  </div>
                ) : null}

                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={() => {
                      setKeyword("");
                      setSelectedAuthor("all");
                      setSelectedYear("all");
                      setSelectedTags([]);
                      setIsTagMenuOpen(false);
                    }}
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-brand-200 bg-white px-3 text-xs font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-500"
                  >
                    <X size={14} />
                    清空
                  </button>
                ) : null}
              </div>
            </div>
          ) : hasActiveFilters ? (
            <span className="text-xs text-ink-500">
              已启用 {activeFilterCount} 个筛选条件
            </span>
          ) : null}
        </div>

        <div
          className="inline-flex items-center gap-1 rounded-xl bg-white p-1 shadow-[0_4px_14px_rgb(15_23_42/8%)]"
          role="group"
          aria-label="切换内容布局"
        >
          {VALID_LAYOUTS.map((mode) => {
            const Icon = iconByMode[mode];
            const active = layout === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setLayout(mode)}
                aria-label={labelByMode[mode]}
                title={labelByMode[mode]}
                aria-pressed={active}
                className={[
                  "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] border-0 transition-colors duration-100",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300",
                  active
                    ? "bg-brand-100 text-brand-700"
                    : "bg-transparent text-ink-500 hover:bg-brand-50 hover:text-ink-700",
                ].join(" ")}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>
      {filteredItems.length > 0 ? (
        <div className={gridClasses}>
          {filteredItems.map((item) => (
            <ContentGridCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="surface-card p-4 text-sm leading-6 text-ink-500">
          {emptyText}
          {hasActiveFilters ? " 当前筛选条件下没有匹配结果，请尝试放宽条件。" : ""}
        </div>
      )}
    </>
  );
}
