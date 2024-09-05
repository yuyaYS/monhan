import { db } from "@/db";
import { monsters } from "@/db/schema";
import { sql } from "drizzle-orm";
import { Monster } from "@/types/monster";

export async function getFilteredMonsters(
  page: number,
  elements: string[],
  itemsPerPage: number
) {
  let whereClause = undefined;

  if (elements.length > 0) {
    const elementsJsonArray = JSON.stringify(elements);
    whereClause = sql`${monsters.elements}::jsonb @> ${elementsJsonArray}::jsonb`;
  }

  const [totalMonstersResult, monstersData] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(monsters)
      .where(whereClause),
    db
      .select()
      .from(monsters)
      .where(whereClause)
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage),
  ]);

  const totalMonsters = totalMonstersResult[0]?.count ?? 0;
  const totalPages = Math.ceil(totalMonsters / itemsPerPage);

  return {
    monsters: monstersData as Monster[],
    totalPages,
    totalMonsters,
  };
}
