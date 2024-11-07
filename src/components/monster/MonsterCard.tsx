import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monster } from "@/types/monster";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

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

export function MonsterCard({
  name,
  monsterId,
  type,
  elements,
  weakness,
  games,
}: Monster) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set("monsterId", monsterId);

  return (
    <Suspense fallback={<MonsterCardSkeleton />}>
      <Card className="overflow-hidden bg-[#F5F5DC] border border-[#8B5A2B] hover:shadow-lg transition-shadow cursor-pointer">
        <Link href={`/monster?${currentParams.toString()}`} scroll={false}>
          <CardHeader className="bg-[#A52A2A] text-white">
            <CardTitle>{name}</CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-2">
              Type: {type || "Unknown"}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {elements && elements.length > 0 ? (
                elements.map((element: string) => (
                  <Badge
                    key={element}
                    className={`${getElementColor(element)} text-white`}
                  >
                    {element}
                  </Badge>
                ))
              ) : (
                <Badge className="bg-gray-500 text-white">No Elements</Badge>
              )}
            </div>
            <p className="text-sm mb-2">
              <strong>Weakness:</strong>{" "}
              {weakness && weakness.length > 0 ? weakness.join(", ") : "None"}
            </p>
            {games && games[0] && games[0].image && (
              <div className="flex justify-center mt-2">
                <Image
                  src={`/data/icons/${games[0].image}`}
                  alt={`${name} icon`}
                  width={80}
                  height={80}
                />
              </div>
            )}
          </CardContent>
        </Link>
      </Card>
    </Suspense>
  );
}

export function MonsterCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-[#F5F5DC] border border-[#8B5A2B]">
      <CardHeader className="bg-[#A52A2A]">
        <Skeleton className="h-6 w-3/4 bg-white/50" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-4 w-1/2 mb-2 bg-[#8B5A2B]/20" />
        <div className="flex gap-1 mb-2">
          <Skeleton className="h-6 w-16 bg-[#8B5A2B]/20" />
          <Skeleton className="h-6 w-16 bg-[#8B5A2B]/20" />
        </div>
        <Skeleton className="h-4 w-3/4 mb-2 bg-[#8B5A2B]/20" />
        <div className="flex justify-center mt-2">
          <Skeleton className="h-20 w-20 bg-[#8B5A2B]/20" />
        </div>
      </CardContent>
    </Card>
  );
}
