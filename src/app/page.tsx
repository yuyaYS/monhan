import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/monster/PaginationControls";

const ITEMS_PER_PAGE = 16;

export default async function MonstersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const jsonDirectory = path.join(
    process.cwd(),
    "public",
    "data",
    "monsters.json"
  );
  const fileContents = await fs.readFile(jsonDirectory, "utf8");
  const data = JSON.parse(fileContents);

  const totalMonsters = data.monsters.length;
  const totalPages = Math.ceil(totalMonsters / ITEMS_PER_PAGE);

  const monsters = data.monsters.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Monsters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {monsters.map((monster: any) => (
          <Card key={monster._id.$oid} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Link
                href={`/monster/${monster._id.$oid}`}
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
