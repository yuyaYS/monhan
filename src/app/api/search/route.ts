import { NextResponse } from "next/server";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { like } from "drizzle-orm";
import { logErrorToSentry } from "@/lib/logging/log";

export async function GET(request: Request) {
  try {
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
  } catch (error) {
    logErrorToSentry(error, "Search/route/get", "API_SEARCH_FAILURE");
    console.error("Error in GET request:", error);

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
