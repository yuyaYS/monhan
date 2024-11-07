import { NextResponse } from "next/server";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { sql } from "drizzle-orm";
import { logErrorToSentry } from "@/lib/logging/log";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const sanitizedQuery = query.replace(/[%_]/g, "");

    const results = await db
      .select()
      .from(monsters)
      .where(sql`LOWER(${monsters.name}) LIKE LOWER(${`%${sanitizedQuery}%`})`)
      .limit(10);

    const response = NextResponse.json(results);

    response.headers.set(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate"
    );

    return response;
  } catch (error) {
    logErrorToSentry(error, "Search/route/get", "API_SEARCH_FAILURE");
    console.error("Error in GET request:", error);

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
