import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EndemicLife } from "@/types/endemic_life";

export default function EndemicLifeCard({
  creature,
}: {
  creature: EndemicLife;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{creature.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {creature.game.map((gameInfo, index) => (
          <div key={index} className="mb-4">
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
  );
}
