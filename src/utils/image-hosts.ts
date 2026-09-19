/**
 * Hosts allowed to serve images referenced from MDX content.
 *
 * Single source of truth: `next.config.ts` turns this into the `next/image`
 * `remotePatterns` allowlist, and `components/shortcodes/mdx-image.tsx` refuses
 * any other origin before a visitor's browser can be pointed at it.
 *
 * Add a host here (and rebuild) instead of letting content hotlink an
 * arbitrary origin.
 */
export const REMOTE_IMAGE_HOSTS = ["blog-images.s3.bitiful.net"] as const;
