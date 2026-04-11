import { getCollection, type CollectionEntry } from "astro:content";
import type { CollectionName } from "./page-composition";

type AnyEntry = CollectionEntry<"blog" | "news" | "projects">;
type CollectionQueryOptions = {
  homepageOnly?: boolean;
};

function sortEntries<T extends AnyEntry>(items: T[]): T[] {
  return items.sort(
    (a, b) =>
      a.data.sticky - b.data.sticky ||
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

function filterEntries<T extends AnyEntry>(
  items: T[],
  options?: CollectionQueryOptions,
): T[] {
  if (!options?.homepageOnly) {
    return items;
  }
  return items.filter((entry) => entry.data.homepage);
}

export async function getPublishedCollection(
  collection: CollectionName,
  options?: CollectionQueryOptions,
) {
  if (collection === "blog") {
    const items = await getCollection(
      "blog",
      ({ data }) => import.meta.env.DEV || !data.draft,
    );
    return sortEntries(filterEntries(items, options));
  }

  if (collection === "news") {
    const items = await getCollection(
      "news",
      ({ data }) => import.meta.env.DEV || !data.draft,
    );
    return sortEntries(filterEntries(items, options));
  }

  const items = await getCollection(
    "projects",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return sortEntries(filterEntries(items, options));
}
