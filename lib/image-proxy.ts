/**
 * Converts an external image URL to use our image proxy.
 * This bypasses CORS restrictions by fetching images server-side.
 *
 * @param url The original image URL
 * @returns The proxied URL, or the original if it's already a local/data URL
 */
export function getProxiedImageUrl(
  url: string | null | undefined
): string | null {
  if (!url) return null;

  // Don't proxy data URLs, local URLs, or already-proxied URLs
  if (
    url.startsWith("data:") ||
    url.startsWith("/") ||
    url.startsWith(window.location.origin) ||
    url.includes("/api/image-proxy")
  ) {
    return url;
  }

  // Proxy external URLs
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}
