"use client";

import { useQuery } from "@tanstack/react-query";
import { MonsterCard } from "./MonsterCard";
import { Monster } from "@/types/monster";
import LoadSpinner from "@/lib/loadingspiner";
import { fetchMonsters } from "@/db/queries/queries";

export function MonsterList({
  page,
  elements,
}: {
  page: number;
  elements: string[];
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["monsters", page, elements],
    queryFn: () => fetchMonsters(page, elements),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <LoadSpinner />;
  if (error) return <div>An error occurred: {error.message}</div>;

  if (data.monsters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl font-semibold">No monsters found</p>
        <p className="text-gray-600">
          No monsters match all of the selected elements: {elements.join(", ")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.monsters.map((monster: Monster) => (
        <MonsterCard key={monster.id} {...monster} />
      ))}
    </div>
  );
}
