import { Suspense } from "react";
import { PaginationControls } from "@/components/monster/PaginationControls";
import { MonsterList } from "@/components/monster/MonsterList";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { sql } from "drizzle-orm";
import { Monster } from "@/types/monster";

const ITEMS_PER_PAGE = 16;

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;

  // Query total count of monsters
  const [{ count }] = await db
    .select({
      count: sql<number>`cast(count(*) as integer)`,
    })
    .from(monsters);

  const totalMonsters = Number(count);
  const totalPages = Math.ceil(totalMonsters / ITEMS_PER_PAGE);

  // Query monsters with pagination
  const monstersData: Monster[] = await db
    .select()
    .from(monsters)
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Monsters</h1>
      <Suspense fallback={<div>Loading monsters...</div>}>
        <MonsterList monsters={monstersData} />
      </Suspense>
      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  );
}
