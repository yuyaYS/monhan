import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { quests } from "@/db/schema";

//tem solution to store json to supabase.
export async function POST() {
  const jsonDirectory = path.join(
    process.cwd(),
    "public",
    "data",
    "quests.json"
  );

  try {
    const rawData = await fs.readFile(jsonDirectory, "utf-8");
    const data = JSON.parse(rawData);
    console.log(data);
    console.log(typeof data.monsters);

    for (const quest of data.quests) {
      await db.insert(quests).values({
        quest_id: quest._id.$oid,
        name: quest.name,
        client: quest.client,
        description: quest.description,
        map: quest.map,
        isKey: quest.isKey,
        questType: quest.questType,
        game: quest.game,
        difficulty: quest.difficulty,
        objective: quest.objective,
        targets: quest.targets,
      });
    }

    return NextResponse.json(
      { message: "Quests data uploaded successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading Quests data:", error);
    return NextResponse.json(
      { message: "Failed to upload Quests data" },
      { status: 500 }
    );
  }
}
