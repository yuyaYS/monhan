import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monster } from "@/types/monster";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

export function MonsterCard({
  name,
  monsterId,
  type,
  elements,
  weakness,
  games,
}: Monster) {
  return (
    <Suspense fallback={<MonsterCardSkeleton />}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <Link href={`/monster/${monsterId}`} className="hover:underline">
            <CardTitle className="cursor-pointer hover:text-blue-600">
              {name}
            </CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Type: {type || "Unknown"}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {elements && elements.length > 0 ? (
              elements.map((element: string) => (
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
            {weakness && weakness.length > 0 ? weakness.join(", ") : "None"}
          </p>
          {games && games[0] && games[0].image && (
            <div className="flex justify-center">
              <Image
                src={`/data/icons/${games[0].image}`}
                alt={`${name} icon`}
                width={80}
                height={80}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Suspense>
  );
}

export function MonsterCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2 mb-2" />
        <div className="flex gap-1 mb-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-4 w-3/4 mb-2" />
        <div className="flex justify-center">
          <Skeleton className="h-20 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
