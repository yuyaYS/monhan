import { Suspense } from "react";
import { Monster } from "@/types/monster";
import { MonsterCard, MonsterCardSkeleton } from "./MonsterCard";

export function MonsterList({ monsters }: { monsters: Monster[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {monsters.map((monster) => (
        <Suspense key={monster.id} fallback={<MonsterCardSkeleton />}>
          <MonsterCard {...monster} />
        </Suspense>
      ))}
    </div>
  );
}
