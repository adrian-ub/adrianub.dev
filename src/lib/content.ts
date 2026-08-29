/**
 * Shared utilities for date-based collections (posts, etc.).
 */

export function readingTime(body: string | undefined): number {
  const words = (body || "").trim().split(/\s+/).filter(Boolean);
  return Math.ceil(words.length / 200);
}

export function formattedDate(date: Date | string | number): string {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// --- Year grouping helpers (for index pages) ---

type DatedEntry = { data: { publishedAt: Date | string | number } };

export const getYear = (a: Date | string | number) =>
  new Date(a).getFullYear();

export const isFuture = (a?: Date | string | number) =>
  a && new Date(a) > new Date();

export const isSameYear = (
  a?: Date | string | number,
  b?: Date | string | number,
) => a && b && getYear(a) === getYear(b);

export function isSameGroup<T extends DatedEntry>(a: T, b?: T) {
  return (
    isFuture(a.data.publishedAt) === isFuture(b?.data.publishedAt) &&
    isSameYear(a.data.publishedAt, b?.data.publishedAt)
  );
}
