import { getFilteredMonsters } from "@/db/queries/monsters";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const elements =
      searchParams.get("elements")?.split(",").filter(Boolean) || [];
    const ITEMS_PER_PAGE = 16;

    const result = await getFilteredMonsters(page, elements, ITEMS_PER_PAGE);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in monsters API:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
