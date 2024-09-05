import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EndemicLife } from "@/types/endemic_life";

export default async function EndemicLifePage() {
  const jsonDirectory = path.join(
    process.cwd(),
    "public",
    "data",
    "endemicLife.json"
  );
  const fileContents = await fs.readFile(jsonDirectory, "utf8");
  const data = JSON.parse(fileContents);

  const endemicLife: EndemicLife[] = data.endemicLife;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Endemic Life</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {endemicLife.map((creature: EndemicLife) => (
          <Card key={creature.name} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{creature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {creature.game.map((gameInfo: any) => (
                <div key={gameInfo.game} className="mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {gameInfo.game}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-2">
                    {gameInfo.info}
                  </p>
                  {gameInfo.image && (
                    <div className="flex justify-center">
                      <Image
                        src={`/data/icons/${gameInfo.image}`}
                        alt={`${creature.name} icon`}
                        width={50}
                        height={50}
                      />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
