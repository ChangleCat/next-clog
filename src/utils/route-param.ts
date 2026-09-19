/**
 * Normalises a dynamic route segment (`[tag]`, `[category]`, …) to its real
 * value.
 *
 * Next.js 16.3.5 does not hand both entry points the same string: a page
 * component receives the still percent-encoded segment (`%E6%8A%80%E6%9C%AF`),
 * while `generateMetadata` receives the already decoded one (`技术`) — measured
 * against a probe route that logged `params` from both. Decoding once here is
 * therefore required for the page and a no-op for metadata, so the heading and
 * the document title stay in sync.
 *
 * Unlike a bare `decodeURIComponent` it never throws, so a tag or category
 * whose name contains a stray `%` cannot turn a request into a 500.
 */
export function decodeRouteParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
