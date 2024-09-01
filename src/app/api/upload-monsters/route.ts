import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { monsters } from "@/db/schema";

//tem solution to store json to supabase.
export async function POST() {
  const jsonDirectory = path.join(
    process.cwd(),
    "public",
    "data",
    "monsters.json"
  );

  try {
    const rawData = await fs.readFile(jsonDirectory, "utf-8");
    const data = JSON.parse(rawData);
    console.log(data);
    console.log(typeof data.monsters);

    // Transform and insert the data
    for (const monster of data.monsters) {
      await db.insert(monsters).values({
        monsterId: monster._id.$oid,
        name: monster.name,
        type: monster.type,
        isLarge: monster.isLarge,
        elements: monster.elements,
        ailments: monster.ailments,
        weakness: monster.weakness,
        games: monster.games,
      });
    }

    return NextResponse.json(
      { message: "Monsters data uploaded successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading monsters data:", error);
    return NextResponse.json(
      { message: "Failed to upload monsters data" },
      { status: 500 }
    );
  }
}
