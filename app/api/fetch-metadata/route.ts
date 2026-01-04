import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Check if it's a YouTube URL
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);

    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return NextResponse.json({
        og_image_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        favicon_url: "https://www.youtube.com/favicon.ico",
        media_type: "youtube",
        media_embed_id: videoId,
      });
    }

    // Check if it's a Vimeo URL
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);

    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      // Fetch Vimeo thumbnail via their API
      const vimeoResponse = await fetch(
        `https://vimeo.com/api/v2/video/${videoId}.json`
      );
      if (vimeoResponse.ok) {
        const vimeoData = await vimeoResponse.json();
        return NextResponse.json({
          og_image_url: vimeoData[0]?.thumbnail_large || null,
          favicon_url: "https://vimeo.com/favicon.ico",
          media_type: "vimeo",
          media_embed_id: videoId,
        });
      }
    }

    // Fetch OpenGraph metadata for other URLs
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        og_image_url: null,
        favicon_url: null,
        media_type: "default",
        media_embed_id: null,
      });
    }

    const html = await response.text();

    // Extract og:image
    const ogImageMatch = html.match(
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i
    );
    const ogImage = ogImageMatch ? ogImageMatch[1] : null;

    // Extract favicon - try multiple common patterns
    let faviconUrl = null;

    // Try link rel="icon"
    const iconMatch =
      html.match(
        /<link\s+[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i
      ) ||
      html.match(
        /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:icon|shortcut icon)["']/i
      );

    if (iconMatch) {
      faviconUrl = iconMatch[1];
      // Make absolute URL if relative
      if (faviconUrl && !faviconUrl.startsWith("http")) {
        const urlObj = new URL(url);
        if (faviconUrl.startsWith("//")) {
          faviconUrl = urlObj.protocol + faviconUrl;
        } else if (faviconUrl.startsWith("/")) {
          faviconUrl = urlObj.origin + faviconUrl;
        } else {
          faviconUrl = urlObj.origin + "/" + faviconUrl;
        }
      }
    } else {
      // Default to /favicon.ico
      const urlObj = new URL(url);
      faviconUrl = `${urlObj.origin}/favicon.ico`;
    }

    return NextResponse.json({
      og_image_url: ogImage,
      favicon_url: faviconUrl,
      media_type: "default",
      media_embed_id: null,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json({
      og_image_url: null,
      favicon_url: null,
      media_type: "default",
      media_embed_id: null,
    });
  }
}
