# Dashboard Performance Optimization Plan

**Date**: January 10, 2026  
**Status**: Phase 1 ✅ Complete | Phase 2 ✅ Complete | Phase 3-4 Ready  
**Target**: 85% performance improvement (5.49s → 0.8s page load)

---

## Table of Contents

1. [Phase 1: Quick Wins](#phase-1-quick-wins-15-minutes)
2. [Phase 2: Image Optimization](#phase-2-image-optimization-2-hours)
3. [Phase 3: Advanced Features](#phase-3-advanced-features-3-hours)
4. [Phase 4: Database Optimization](#phase-4-optional-database-optimization-5-hours)
5. [Testing & Validation](#testing--validation)
6. [Deployment Strategy](#deployment-strategy)

---

## Phase 1: Quick Wins (15 minutes)

### Objective

Implement native lazy loading and extend caching for quick 36% performance gain without code complexity.

### 1.1 Add Native Lazy Loading to BookmarkCard

**File**: `components/dashboard/bookmark-card.tsx`

**Changes**:

- Add `loading="lazy"` to og_image_url `<img>`
- Add `loading="lazy"` to favicon_url `<img>`
- Add dimension hints to prevent layout shift

**Affected Lines**: 78-89, 101-112

```tsx
// Current (line 78-89)
<img
  src={getProxiedImageUrl(bookmark.og_image_url) || undefined}
  alt={bookmark.title}
  className="h-full w-full object-cover transition-transform group-hover:scale-105"
/>

// Change to:
<img
  src={getProxiedImageUrl(bookmark.og_image_url) || undefined}
  alt={bookmark.title}
  loading="lazy"
  width={300}
  height={169}
  className="h-full w-full object-cover transition-transform group-hover:scale-105"
/>

// Current (line 101-107)
<img
  src={getProxiedImageUrl(bookmark.favicon_url) || undefined}
  alt=""
  className="h-8 w-8 object-contain"
  onError={(e) => { ... }}
/>

// Change to:
<img
  src={getProxiedImageUrl(bookmark.favicon_url) || undefined}
  alt=""
  loading="lazy"
  width={32}
  height={32}
  className="h-8 w-8 object-contain"
  onError={(e) => { ... }}
/>
```

### 1.2 Add Native Lazy Loading to BookmarkListItem

**File**: `components/dashboard/bookmark-list-item.tsx`

**Changes**:

- Add `loading="lazy"` to favicon_url `<img>`
- Add dimension hints

**Affected Lines**: 64-73

```tsx
// Current
<img
  src={getProxiedImageUrl(bookmark.favicon_url) || undefined}
  alt=""
  className="h-5 w-5 object-contain md:h-6 md:w-6 transition-transform"
  onError={(e) => { ... }}
/>

// Change to:
<img
  src={getProxiedImageUrl(bookmark.favicon_url) || undefined}
  alt=""
  loading="lazy"
  width={24}
  height={24}
  className="h-5 w-5 object-contain md:h-6 md:w-6 transition-transform"
  onError={(e) => { ... }}
/>
```

### 1.3 Extend Image Cache Duration

**File**: `app/api/image-proxy/route.ts`

**Changes**:

- Extend `Cache-Control` from 24 hours to 365 days
- Update max-age value from 86400 to 31536000

**Affected Lines**: 41

```typescript
// Current (line 41)
"Cache-Control": "public, max-age=86400", // Cache for 24 hours

// Change to:
"Cache-Control": "public, max-age=31536000", // Cache for 365 days
```

### 1.4 Validation Checklist

- [ ] BookmarkCard images have `loading="lazy"` and dimensions
- [ ] BookmarkListItem images have `loading="lazy"` and dimensions
- [ ] Image proxy cache extended to 365 days
- [ ] Test on Chrome DevTools Network tab:
  - [ ] Images below fold don't load on page visit
  - [ ] Images load when scrolling into view
  - [ ] Dimensions prevent CLS (Cumulative Layout Shift)

### 1.5 Expected Results

- **Image Load Time**: 1.5-1.6s → 1.5-1.6s (visible only)
- **Page Load Time**: 5.49s → ~3.5s
- **Improvement**: 36% faster
- **User Impact**: Faster initial page display, smoother scrolling

---

## Phase 2: Image Optimization (2 hours)

### Objective

Implement image resizing and WebP conversion for 60% image size reduction.

### 2.1 Upgrade image-proxy with Sharp

**File**: `app/api/image-proxy/route.ts`

**Prerequisites**:

```bash
npm install sharp
# or
pnpm add sharp
```

**Changes**:

- Import Sharp library
- Add width/format query parameter handling
- Add image resizing logic
- Add WebP conversion
- Update Content-Type header dynamically

**Full Implementation**:

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import sharp from "sharp";

export async function GET(request: Request) {
  // Authenticate the request
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");
  const width = searchParams.get("w"); // e.g., ?w=300
  const format = searchParams.get("fmt"); // e.g., &fmt=webp
  const quality = searchParams.get("q") || "75"; // default quality

  if (!imageUrl) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Validate URL
    const url = new URL(imageUrl);

    // Only allow http and https protocols
    if (!["http:", "https:"].includes(url.protocol)) {
      return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
    }

    // Fetch the image
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "image/*",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status }
      );
    }

    let buffer = await response.arrayBuffer();
    let contentType = response.headers.get("content-type") || "image/jpeg";

    // Resize and convert format if requested
    if (width || format) {
      try {
        let pipeline = sharp(buffer);

        // Resize if width is specified
        if (width) {
          const widthNum = Math.min(parseInt(width), 2000); // Max 2000px
          pipeline = pipeline.resize(widthNum, null, {
            withoutEnlargement: true,
          });
        }

        // Convert format if specified, otherwise use original
        const targetFormat =
          format || (contentType.includes("webp") ? "webp" : "jpeg");
        const qualityNum = Math.min(Math.max(parseInt(quality), 50), 95);

        if (targetFormat === "webp") {
          pipeline = pipeline.webp({ quality: qualityNum });
          contentType = "image/webp";
        } else if (targetFormat === "jpeg" || targetFormat === "jpg") {
          pipeline = pipeline.jpeg({ quality: qualityNum, progressive: true });
          contentType = "image/jpeg";
        } else if (targetFormat === "png") {
          pipeline = pipeline.png({ compression: 9 });
          contentType = "image/png";
        }

        buffer = await pipeline.toBuffer();
      } catch (sharpError) {
        console.error("Sharp processing error:", sharpError);
        // Fall back to original buffer if processing fails
      }
    }

    // Return the image with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000", // Cache for 365 days
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    );
  }
}
```

### 2.2 Update getProxiedImageUrl Helper

**File**: `lib/image-proxy.ts`

**Add new function** for generating optimized URLs:

```typescript
/**
 * Generates an optimized image URL with width and format parameters.
 *
 * @param url Original image URL
 * @param width Optional width in pixels (will be resized)
 * @param format Optional format: 'webp', 'jpeg', 'png' (default: webp)
 * @param quality Optional quality 50-95 (default: 75)
 * @returns Proxied URL with optimization parameters
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  width?: number,
  format?: "webp" | "jpeg" | "png",
  quality?: number
): string | null {
  if (!url) return null;

  // Don't proxy data URLs, local URLs, or already-proxied URLs
  if (
    url.startsWith("data:") ||
    url.startsWith("/") ||
    url.startsWith(window.location.origin)
  ) {
    return url;
  }

  // Build proxy URL with parameters
  let proxyUrl = `/api/image-proxy?url=${encodeURIComponent(url)}`;

  if (width) {
    proxyUrl += `&w=${width}`;
  }

  if (format) {
    proxyUrl += `&fmt=${format}`;
  }

  if (quality) {
    proxyUrl += `&q=${quality}`;
  }

  return proxyUrl;
}
```

### 2.3 Update BookmarkCard Image URLs

**File**: `components/dashboard/bookmark-card.tsx`

**Changes**:

- Import `getOptimizedImageUrl`
- Update og_image_url to use optimized version (300px width, webp)
- Update favicon_url to use optimized version (32px width, webp)

```tsx
// Add import at top
import { getOptimizedImageUrl } from "@/lib/image-proxy";

// Current (line 78-89)
<img
  src={getProxiedImageUrl(bookmark.og_image_url) || undefined}
  alt={bookmark.title}
  loading="lazy"
  width={300}
  height={169}
  className="h-full w-full object-cover transition-transform group-hover:scale-105"
/>

// Change to:
<img
  src={getOptimizedImageUrl(bookmark.og_image_url, 300, "webp", 75) || undefined}
  alt={bookmark.title}
  loading="lazy"
  width={300}
  height={169}
  className="h-full w-full object-cover transition-transform group-hover:scale-105"
/>

// Current (line 101-107)
<img
  src={getProxiedImageUrl(bookmark.favicon_url) || undefined}
  alt=""
  loading="lazy"
  width={32}
  height={32}
  className="h-8 w-8 object-contain"
  onError={(e) => { ... }}
/>

// Change to:
<img
  src={getOptimizedImageUrl(bookmark.favicon_url, 32, "webp") || undefined}
  alt=""
  loading="lazy"
  width={32}
  height={32}
  className="h-8 w-8 object-contain"
  onError={(e) => { ... }}
/>
```

### 2.4 Update BookmarkListItem Image URLs

**File**: `components/dashboard/bookmark-list-item.tsx`

**Changes**:

- Import `getOptimizedImageUrl`
- Update favicon_url to use optimized version (32px width, webp)

```tsx
// Add import at top
import { getOptimizedImageUrl } from "@/lib/image-proxy";

// Current (line 64-73)
<img
  src={getProxiedImageUrl(bookmark.favicon_url) || undefined}
  alt=""
  loading="lazy"
  width={24}
  height={24}
  className="h-5 w-5 object-contain md:h-6 md:w-6 transition-transform"
  onError={(e) => { ... }}
/>

// Change to:
<img
  src={getOptimizedImageUrl(bookmark.favicon_url, 32, "webp") || undefined}
  alt=""
  loading="lazy"
  width={24}
  height={24}
  className="h-5 w-5 object-contain md:h-6 md:w-6 transition-transform"
  onError={(e) => { ... }}
/>
```

### 2.5 Responsive Image Sizes (Optional Enhancement)

For even better performance with responsive images, update BookmarkCard:

```tsx
// Handle responsive widths based on column count
const getOgImageWidth = () => {
  // Calculate based on viewport and columns
  if (isMobile || columns === 1) return 300;
  if (columns === 2) return 400;
  if (columns === 3) return 350;
  return 300; // fallback
};

<img
  src={
    getOptimizedImageUrl(
      bookmark.og_image_url,
      getOgImageWidth(),
      "webp",
      75
    ) || undefined
  }
  alt={bookmark.title}
  loading="lazy"
  width={300}
  height={169}
  className="h-full w-full object-cover transition-transform group-hover:scale-105"
/>;
```

### 2.6 Validation Checklist

- [ ] Sharp library installed successfully
- [ ] Image proxy handles `?w=` parameter
- [ ] Image proxy handles `?fmt=webp` parameter
- [ ] Image proxy handles `?q=` quality parameter
- [ ] Test in DevTools Network:
  - [ ] og_image 476KB reduced to ~150KB
  - [ ] Content-Type is `image/webp`
  - [ ] 60-70% size reduction achieved
- [ ] Verify fallback works if Sharp fails
- [ ] Test on slow network (DevTools throttling)

### 2.7 Expected Results

- **og_image Size**: 476 KB → 150 KB (69% reduction)
- **favicon Size**: 1.5 KB → 0.8 KB (47% reduction)
- **Total Image Load**: 6-8 images × 150 KB reduction
- **Page Load Time**: 3.5s → ~2.0s
- **Improvement**: 64% faster overall

---

## Phase 3: Advanced Features (3 hours)

### Objective

Implement YouTube iframe lazy loading and virtual scrolling for 76% improvement.

### 3.1 Lazy Load YouTube Embeds

**File**: `components/dashboard/bookmark-card.tsx`

**Changes**:

- Add state to track YouTube iframe loaded status
- Show placeholder instead of iframe initially
- Load iframe on click

```tsx
// Add state at component level
const [youtubeLoaded, setYoutubeLoaded] = useState(false);

// Update media rendering section (current line 70-76)
{isYouTube ? (
  youtubeLoaded ? (
    <div className="aspect-video w-full bg-muted">
      <iframe
        src={`https://www.youtube.com/embed/${bookmark.media_embed_id}`}
        title={bookmark.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full pointer-events-none"
      />
    </div>
  ) : (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setYoutubeLoaded(true);
      }}
      className="aspect-video w-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer group"
      title="Click to load YouTube video"
    >
      <div className="text-center">
        <HugeiconsIcon
          icon={PlayIcon}
          className="h-12 w-12 text-foreground/60 mx-auto mb-2"
        />
        <p className="text-xs text-foreground/50">Click to load video</p>
      </div>
    </button>
  )
) : bookmark.og_image_url ? (
  // ... rest of media section
)}
```

### 3.2 Add Virtual Scrolling (Optional, for 100+ bookmarks)

**Prerequisites**:

```bash
npm install @tanstack/react-virtual
# or
pnpm add @tanstack/react-virtual
```

**File**: `app/dashboard/page.tsx`

**Add at top of imports**:

```typescript
import { useVirtualizer } from "@tanstack/react-virtual";
```

**Replace grid rendering section** (around line 500):

```tsx
// Only implement if bookmarks.length > 100
const shouldVirtualize = bookmarks.length > 100;

// Estimate card height (varies by view mode)
const getEstimatedItemSize = () => {
  if (viewMode === "card") {
    return 320; // card height + gap
  }
  return 60; // list item height + gap
};

// Virtual list component
const virtualizer = useVirtualizer({
  count: bookmarks.length,
  getScrollElement: () => scrollContainerRef.current,
  estimateSize: () => getEstimatedItemSize(),
  measureElement: typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
    ? (element) => element?.getBoundingClientRect().height
    : undefined,
  overscan: 10,
});

return (
  <>
    {/* ... header section ... */}

    {bookmarks.length === 0 ? (
      // ... empty state ...
    ) : shouldVirtualize ? (
      // Virtual scrolling version
      <div
        ref={scrollContainerRef}
        className="relative h-[calc(100vh-200px)] overflow-auto"
      >
        <div
          className={cn(
            "grid gap-4",
            getGridClasses(),
            viewMode === "card" && "auto-rows-fr"
          )}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const bookmark = bookmarks[virtualItem.index];
            return (
              <div
                key={bookmark.id}
                data-index={virtualItem.index}
                style={{
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {viewMode === "card" ? (
                  <BookmarkCard {...cardProps} />
                ) : (
                  <BookmarkListItem {...listProps} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      // Standard grid version (current implementation)
      <LayoutGroup>
        <motion.div
          layout
          className={cn(
            "grid gap-4",
            getGridClasses(),
            viewMode === "card" && "auto-rows-fr"
          )}
        >
          {/* ... existing grid code ... */}
        </motion.div>
      </LayoutGroup>
    )}
  </>
);
```

### 3.3 Validation Checklist

- [ ] YouTube placeholders show instead of iframes
- [ ] Clicking placeholder loads iframe
- [ ] Virtual scrolling works for 100+ bookmarks
- [ ] Scroll performance is smooth
- [ ] Memory usage is stable (DevTools Memory tab)
- [ ] Grid layout works correctly with virtual items

### 3.4 Expected Results

- **YouTube Embed Savings**: 2-3 × 150KB JS per iframe = ~300-450KB
- **Virtual Scrolling Rendering**: 50 visible cards instead of 500 (90% DOM reduction)
- **Memory Usage**: -40% for large collections
- **Page Load Time**: 2.0s → ~1.3s
- **Improvement**: 76% faster overall

---

## Phase 4: Optional Database Optimization (5 hours)

### Objective

Pre-generate and store thumbnail URLs for instant loading.

### 4.1 Extend Bookmarks Schema

**File**: `supabase/migrations/add-image-thumbnails.sql`

```sql
-- Add thumbnail columns to bookmarks table
ALTER TABLE public.bookmarks ADD COLUMN IF NOT EXISTS og_image_url_thumb text;

-- Create index for faster queries if filtering by thumbnails
CREATE INDEX IF NOT EXISTS bookmarks_has_thumbnail_idx ON public.bookmarks(og_image_url_thumb) WHERE og_image_url_thumb IS NOT NULL;

-- Comment for documentation
COMMENT ON COLUMN public.bookmarks.og_image_url_thumb IS 'Pre-generated 300x169px WebP thumbnail URL';
```

### 4.2 Generate Thumbnails on Bookmark Creation

**File**: `app/api/bookmarks/route.ts`

**Add thumbnail generation** to POST handler:

```typescript
// Add this helper function at top of file
async function generateThumbnail(imageUrl: string | null): Promise<string | null> {
  if (!imageUrl) return null;

  try {
    // Use your image proxy to generate thumbnail
    const thumbUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}&w=300&fmt=webp&q=75`;
    // Verify it's accessible by making a request
    const response = await fetch(thumbUrl);
    return response.ok ? thumbUrl : null;
  } catch (error) {
    console.error("Thumbnail generation failed:", error);
    return null;
  }
}

// In POST handler, after getting og_image_url
const og_image_url_thumb = await generateThumbnail(og_image_url);

const { data, error } = await supabase
  .from("bookmarks")
  .insert({
    user_id: user.id,
    title,
    url,
    description,
    category_id,
    og_image_url,
    og_image_url_thumb,  // Add this
    favicon_url,
    media_type,
    media_embed_id,
  })
  .select(...)
  .single();
```

### 4.3 Update Component to Use Thumbnails

**File**: `components/dashboard/bookmark-card.tsx`

```tsx
// Update image source to prefer thumbnail
<img
  src={
    bookmark.og_image_url_thumb ||
    getOptimizedImageUrl(bookmark.og_image_url, 300, "webp", 75) ||
    undefined
  }
  alt={bookmark.title}
  loading="lazy"
  width={300}
  height={169}
  className="h-full w-full object-cover transition-transform group-hover:scale-105"
/>
```

### 4.4 Validation Checklist

- [ ] Migration applied successfully
- [ ] Thumbnails generated for new bookmarks
- [ ] Existing bookmarks fallback to proxy
- [ ] Images load from thumbnail URLs
- [ ] No performance regression

### 4.5 Expected Results

- **Thumbnail Load Time**: Instant (pre-generated)
- **Database Size**: +1-2MB (small text URLs)
- **User Experience**: Better cold cache performance

---

## Testing & Validation

### Performance Testing

1. **Baseline Measurement**

   ```bash
   # Use Chrome DevTools Network tab
   # Throttle: Fast 3G or Slow 4G
   # Clear cache
   # Measure:
   # - Page Load time
   # - Image total size
   # - Number of requests
   # - Time to interactive
   ```

2. **Phase-by-Phase Testing**

   - After Phase 1: Verify lazy loading works
   - After Phase 2: Confirm WebP images load and are smaller
   - After Phase 3: Test YouTube placeholder and virtual scrolling
   - After Phase 4: Verify thumbnail loading

3. **Cross-Browser Testing**
   - Chrome (DevTools Network tab)
   - Firefox (Monitor Network tab)
   - Safari (System Preferences > Network)
   - Mobile browsers (throttle to 4G)

### Metrics to Track

| Metric              | Current | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
| ------------------- | ------- | ------- | ------- | ------- | ------- |
| Page Load           | 5.49s   | 3.5s    | 2.0s    | 1.3s    | 1.2s    |
| Image Total         | 2.0MB   | 2.0MB   | 0.8MB   | 0.5MB   | 0.5MB   |
| Requests            | 18      | 12      | 12      | 8       | 8       |
| Time to Interactive | 3.5s    | 2.5s    | 1.5s    | 1.0s    | 0.9s    |
| CLS                 | TBD     | ↓       | ↓       | ↓       | ↓       |

### User Testing

- [ ] Test on actual user devices
- [ ] Verify responsive images at all breakpoints
- [ ] Check accessibility (alt texts, labels)
- [ ] Test with real bookmarks (100+)
- [ ] Monitor for visual glitches

---

## Deployment Strategy

### Pre-Deployment Checklist

- [ ] All phases implemented and tested locally
- [ ] No console errors in DevTools
- [ ] Performance improvements validated
- [ ] Cross-browser testing complete
- [ ] Git branches created for each phase
- [ ] Code reviewed

### Deployment Order

1. **Phase 1** (Low risk)

   - Deploy lazy loading + cache extension
   - Monitor for 24 hours
   - No database changes, pure frontend

2. **Phase 2** (Medium risk)

   - Deploy Sharp library upgrade
   - Deploy image proxy changes
   - Deploy component updates
   - Monitor image serving

3. **Phase 3** (Medium risk)

   - Deploy YouTube lazy loading
   - Deploy virtual scrolling (if using)
   - Test with large bookmark collections

4. **Phase 4** (Optional, low risk)
   - Run migration in production
   - Deploy thumbnail generation
   - Backfill existing bookmarks (async job)

### Rollback Plan

- Each phase has independent git commits
- Revert to previous commit if issues arise
- Keep cache headers flexible for quick fixes
- Monitor error rates post-deployment

### Monitoring

- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Monitor image proxy endpoint performance
- [ ] Track page load times
- [ ] Monitor server resources (CPU, memory)

---

## Files Modified Summary

### Phase 1

- `components/dashboard/bookmark-card.tsx` (5 lines)
- `components/dashboard/bookmark-list-item.tsx` (5 lines)
- `app/api/image-proxy/route.ts` (1 line)

### Phase 2

- `app/api/image-proxy/route.ts` (full rewrite)
- `lib/image-proxy.ts` (new function)
- `components/dashboard/bookmark-card.tsx` (3 sections)
- `components/dashboard/bookmark-list-item.tsx` (1 section)

### Phase 3

- `components/dashboard/bookmark-card.tsx` (YouTube section)
- `app/dashboard/page.tsx` (if virtual scrolling)

### Phase 4

- `supabase/migrations/add-image-thumbnails.sql` (new)
- `app/api/bookmarks/route.ts` (thumbnail generation)
- `components/dashboard/bookmark-card.tsx` (use thumbnails)

---

## Quick Reference Commands

```bash
# Install dependencies
pnpm add sharp @tanstack/react-virtual

# Test locally
pnpm dev

# Build
pnpm build

# Check for errors
pnpm lint

# Deploy migration
# (Use Supabase dashboard or CLI)
supabase migration deploy

# Clear browser cache for testing
# Chrome DevTools → Application → Cache Storage → Clear
```

---

## Expected Timeline

- **Phase 1**: 15 minutes
- **Phase 2**: 2 hours
- **Phase 3**: 3 hours
- **Phase 4**: 5 hours
- **Testing & Deployment**: 1 hour

**Total**: ~11 hours (can be split across multiple days)

---

## Contact & Support

For questions or blockers during implementation:

- Check dashboard-analysis.md for detailed explanations
- Refer to Next.js docs for image optimization
- Review Sharp documentation for image processing
- Test incrementally after each change

---

**Status**: Ready for Phase 1 implementation ✓
