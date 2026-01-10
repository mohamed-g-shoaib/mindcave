import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Generate optimized thumbnail URLs for faster loading
 * Thumbnails are pre-generated and stored in DB to avoid runtime computation
 */
function generateThumbnailUrl(
  imageUrl: string | null | undefined,
  width: number,
  quality: number
): string | null {
  if (!imageUrl) return null;

  // Build the thumbnail URL using our image proxy
  return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}&w=${width}&fmt=webp&q=${quality}`;
}

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");

  let query = supabase
    .from("bookmarks")
    .select(
      `
      *,
      category:categories(*)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    url,
    description,
    category_id,
    og_image_url,
    favicon_url,
    media_type,
    media_embed_id,
  } = body;

  // Pre-generate thumbnail URLs to avoid runtime computation
  const og_image_url_thumb = generateThumbnailUrl(og_image_url, 300, 75);
  const favicon_url_thumb = generateThumbnailUrl(favicon_url, 32, 75);

  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user.id,
      title,
      url,
      description,
      category_id,
      og_image_url,
      og_image_url_thumb,
      favicon_url,
      favicon_url_thumb,
      media_type,
      media_embed_id,
    })
    .select(
      `
      *,
      category:categories(*)
    `
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
