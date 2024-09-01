import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Monster } from "@/types/monster";

export default async function MonsterPage({
  params,
}: {
  params: { id: string };
}) {
  const [monster]: Monster[] = await db
    .select()
    .from(monsters)
    .where(eq(monsters.monsterId, params.id))
    .limit(1);

  if (!monster) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{monster.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Type: {monster.type}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {monster.elements &&
              monster.elements.map((element: string) => (
                <Badge key={element} variant="secondary">
                  {element}
                </Badge>
              ))}
          </div>
          <p className="mb-2">
            Weakness: {monster.weakness ? monster.weakness.join(", ") : "None"}
          </p>
          <p className="mb-2">
            Ailments: {monster.ailments ? monster.ailments.join(", ") : "None"}
          </p>
          {monster.games.map((game) => (
            <div key={game.game} className="mb-4">
              <h3 className="font-bold">{game.game}</h3>
              <p>{game.info}</p>
              {game.danger && <p>Danger: {game.danger}</p>}
              {game.image && (
                <Image
                  src={`/data/icons/${game.image}`}
                  alt={`${monster.name} icon`}
                  width={100}
                  height={100}
                  className="mt-2"
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
