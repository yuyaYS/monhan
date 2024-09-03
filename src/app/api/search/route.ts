import { NextResponse } from "next/server";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { like } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const results = await db
    .select()
    .from(monsters)
    .where(like(monsters.name, `%${query}%`))
    .limit(10);

  return NextResponse.json(results);
}
