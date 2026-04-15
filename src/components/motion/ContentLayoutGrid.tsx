import { Columns2, Grid2x2, List } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";

type LayoutMode = "1" | "2" | "4";

type ContentItem = {
  id: string;
  href: string;
  title: string;
  description?: string;
  dateText: string;
  meta?: string;
};

type ContentLayoutGridProps = {
  items: ContentItem[];
  storageKey?: string;
  defaultLayout?: LayoutMode;
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
}: ContentLayoutGridProps) {
  // Always initialize with defaultLayout so SSR and first client render match.
  // Then sync from localStorage after mount to avoid hydration mismatch.
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved && VALID_LAYOUTS.includes(saved as LayoutMode)) {
      setLayout(saved as LayoutMode);
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, layout);
  }, [layout, storageKey]);

  const gridClasses = useMemo(() => {
    return `grid gap-4 ${gridClassMap[layout]}`;
  }, [layout]);

  return (
    <>
      <div className="mb-4 flex justify-end">
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
      <div className={gridClasses}>
        {items.map((item) => (
          <ContentGridCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
