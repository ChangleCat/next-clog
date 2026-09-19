import type { NextConfig } from "next";
import { REMOTE_IMAGE_HOSTS } from "./src/utils/image-hosts";

/**
 * `script-src` has to keep `'unsafe-inline'`: Next.js inlines its RSC payload
 * and bootstrap scripts, and the only way to drop `'unsafe-inline'` is a nonce,
 * which forces per-request rendering and would discard the prerender/CDN setup
 * this site relies on. Every origin is still pinned, `object-src`/`base-uri`
 * are dead, and nothing may frame the site.
 *
 * `connect-src`/`img-src` cover what the page fetches at runtime: the Artalk
 * widget (same-origin `/artalk` proxy, gravatar avatars, jsdelivr emoticon
 * pack), the Iconify icon API and the GitHub API behind <GitHubCard>.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com https://api.iconify.design https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // No includeSubDomains: other hosts under the same registrable domain are
  // not guaranteed to be HTTPS-only.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    remotePatterns: REMOTE_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: securityHeaders,
    },
  ],
  rewrites: async () => {
    return [
      {
        // 评论服务（自建）走同源反向代理：Artalk 需要同源才能带上会话 Cookie。
        source: "/artalk/:path*",
        destination: "https://api.changlecat.me/artalk/:path*"
      }
    ]
  },
};

export default nextConfig;
