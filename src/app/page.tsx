import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/monster/PaginationControls";
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
  const monstersData = await db
    .select()
    .from(monsters)
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Monsters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {monstersData.map((monster: Monster) => (
          <Card key={monster.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Link
                href={`/monster/${monster.monsterId}`}
                className="hover:underline"
              >
                <CardTitle className="cursor-pointer hover:text-blue-600">
                  {monster.name}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Type: {monster.type || "Unknown"}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {monster.elements && monster.elements.length > 0 ? (
                  monster.elements.map((element: string) => (
                    <Badge key={element} variant="secondary">
                      {element}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="secondary">No Elements</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Weakness:{" "}
                {monster.weakness && monster.weakness.length > 0
                  ? monster.weakness.join(", ")
                  : "None"}
              </p>
              {monster.games && monster.games[0] && monster.games[0].image && (
                <div className="flex justify-center">
                  <Image
                    src={`/data/icons/${monster.games[0].image}`}
                    alt={`${monster.name} icon`}
                    width={80}
                    height={80}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  );
}
