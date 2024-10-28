import { NextResponse } from "next/server";
import { db } from "@/db";
import { endemicLife } from "@/db/schema";
import { sql } from "drizzle-orm";
import { logErrorToSentry } from "@/lib/logging/log";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 16;

  try {
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(endemicLife);

    const totalItems = countResult.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    const offset = (page - 1) * pageSize;
    const data = await db
      .select()
      .from(endemicLife)
      .limit(pageSize)
      .offset(offset);

    return NextResponse.json({
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
    });
  } catch (error) {
    console.error("Error fetching endemic life data:", error);
    logErrorToSentry(
      error,
      "endemic_life/route/GET",
      "API_ENDEMIC_LIFE_FAILURE"
    );
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
