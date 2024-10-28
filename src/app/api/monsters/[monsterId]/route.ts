import { NextResponse } from "next/server";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logErrorToSentry } from "@/lib/logging/log";

export async function GET(
  request: Request,
  { params }: { params: { monsterId: string } }
) {
  const monsterId = params.monsterId;

  try {
    const monster = await db
      .select()
      .from(monsters)
      .where(eq(monsters.monsterId, monsterId))
      .limit(1);

    if (monster.length === 0) {
      return NextResponse.json({ error: "Monster not found" }, { status: 404 });
    }

    return NextResponse.json(monster[0]);
  } catch (error) {
    console.error("Error fetching a single monster data:", error);
    logErrorToSentry(
      error,
      "monsters/[monsterid]/route/GET",
      "API_MONSTERID_FAILURE"
    );

    return NextResponse.json(
      { error: "Failed to fetch monster data" },
      { status: 500 }
    );
  }
}
