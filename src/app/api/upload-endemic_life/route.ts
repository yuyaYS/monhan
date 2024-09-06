import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { endemicLife } from "@/db/schema";

export async function POST() {
  const jsonDirectory = path.join(
    process.cwd(),
    "public",
    "data",
    "endemicLife.json"
  );

  try {
    const rawData = await fs.readFile(jsonDirectory, "utf-8");
    const data = JSON.parse(rawData);
    console.log(data);
    console.log(typeof data.endemicLife);

    // Transform and insert the data
    for (const life of data.endemicLife) {
      await db.insert(endemicLife).values({
        name: life.name,
        game: life.game,
      });
    }

    return NextResponse.json(
      { message: "Endemic life data uploaded successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading endemic life data:", error);
    return NextResponse.json(
      { message: "Failed to upload endemic life data" },
      { status: 500 }
    );
  }
}
