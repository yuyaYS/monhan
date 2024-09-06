import { NextResponse } from "next/server";
import { db } from "@/db";
import { endemicLife } from "@/db/schema";

export async function GET(request: Request) {
  try {
    // Query the database using Drizzle ORM
    const endemicLifeData = await db.select().from(endemicLife);

    // Return the endemic life data as a JSON response
    return NextResponse.json(endemicLifeData);
  } catch (error) {
    console.error("Error fetching endemic life data:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
