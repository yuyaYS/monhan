import { NextResponse } from "next/server";
import { db } from "@/db";
import { quests } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 16;

  try {
    const offset = (page - 1) * pageSize;

    const [questsData, totalCountResult] = await Promise.all([
      db.select().from(quests).limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(quests),
    ]);

    const totalQuests = totalCountResult[0].count;
    const totalPages = Math.ceil(totalQuests / pageSize);

    return NextResponse.json({
      data: questsData,
      pagination: {
        currentPage: page,
        totalPages,
        totalQuests,
      },
    });
  } catch (error) {
    console.error("Error fetching quests:", error);
    return NextResponse.json(
      { error: "Failed to fetch quests" },
      { status: 500 }
    );
  }
}
