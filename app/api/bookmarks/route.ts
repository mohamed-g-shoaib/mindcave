import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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

  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user.id,
      title,
      url,
      description,
      category_id,
      og_image_url,
      favicon_url,
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
