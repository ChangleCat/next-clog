import { REMOTE_IMAGE_HOSTS } from "@/utils/image-hosts";

interface MdxImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * `src` is acceptable when it is a same-origin path (public/asset) or an https
 * URL on an allowlisted host.
 */
function isAllowedSource(src: string): boolean {
  if (src.startsWith("/")) {
    return true;
  }
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return false;
  }
  return (
    url.protocol === "https:" &&
    (REMOTE_IMAGE_HOSTS as readonly string[]).includes(url.hostname)
  );
}

/**
 * Rendered for every plain `<img>` / markdown `![alt](src)` in MDX content.
 * Without this mapping such an image becomes a bare <img> pointing anywhere,
 * so content could make every visitor's browser contact an arbitrary origin
 * (tracking pixel, hotlink, third-party outage). Content is compiled at build
 * time, so a non-allowlisted host fails the build loudly instead of shipping.
 */
export default function MdxImage({ src, alt = "", width, height }: MdxImageProps) {
  if (!src) {
    return null;
  }
  if (!isAllowedSource(src)) {
    throw new Error(
      `[mdx-image]: host not allowlisted for "${src}". Add it to REMOTE_IMAGE_HOSTS in src/utils/image-hosts.ts.`
    );
  }
  return (
    <img src={src} alt={alt} width={width} height={height} loading="lazy" />
  );
}
