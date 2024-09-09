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
    <Card className="overflow-hidden bg-[#F5F5DC] border border-[#8B5A2B] hover:shadow-lg transition-shadow">
      <CardHeader className="bg-[#A52A2A] text-white">
        <CardTitle>{creature.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {creature.game.map((gameInfo, index) => (
          <div key={index} className="mb-4">
            <Badge className="bg-[#4E7C31] text-white mb-2">
              {gameInfo.game}
            </Badge>
            <p className="text-sm text-gray-700 mb-2">{gameInfo.info}</p>
            {gameInfo.image && (
              <div className="flex justify-center mt-2">
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
