import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Monster } from "@/types/monster";

const getElementColor = (element: string) => {
  switch (element.toLowerCase()) {
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "thunder":
      return "bg-yellow-500";
    case "ice":
      return "bg-cyan-500";
    case "dragon":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

export default async function MonsterPage({
  params,
}: {
  params: { monsterId: string };
}) {
  const [monster]: Monster[] = await db
    .select()
    .from(monsters)
    .where(eq(monsters.monsterId, params.monsterId))
    .limit(1);

  if (!monster) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 bg-[#F5F5DC]">
      <Card className="max-w-3xl mx-auto bg-[#F5F5DC] border-2 border-[#8B5A2B]">
        <CardHeader className="bg-[#A52A2A] text-white">
          <CardTitle className="text-3xl font-serif">{monster.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4 text-lg">
            <strong className="text-[#8B5A2B]">Type:</strong> {monster.type}
          </p>
          <div className="mb-4">
            <strong className="text-lg text-[#8B5A2B]">Elements:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {monster.elements &&
                monster.elements.map((element: string) => (
                  <Badge
                    key={element}
                    className={`${getElementColor(
                      element
                    )} text-white px-3 py-1`}
                  >
                    {element}
                  </Badge>
                ))}
            </div>
          </div>
          <p className="mb-4 text-lg">
            <strong className="text-[#8B5A2B]">Weakness:</strong>{" "}
            {monster.weakness ? monster.weakness.join(", ") : "None"}
          </p>
          <p className="mb-4 text-lg">
            <strong className="text-[#8B5A2B]">Ailments:</strong>{" "}
            {monster.ailments ? monster.ailments.join(", ") : "None"}
          </p>
          {monster.games.map((game) => (
            <div
              key={game.game}
              className="mb-6 p-4 bg-[#FFFAF0] rounded-lg border border-[#8B5A2B]"
            >
              <h3 className="font-bold text-xl text-[#A52A2A] mb-2">
                {game.game}
              </h3>
              <p className="mb-2 text-[#4E7C31]">{game.info}</p>
              {game.danger && (
                <p className="text-red-600">Danger: {game.danger}</p>
              )}
              {game.image && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={`/data/icons/${game.image}`}
                    alt={`${monster.name} icon`}
                    width={120}
                    height={120}
                    className="border-2 border-[#8B5A2B] rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
