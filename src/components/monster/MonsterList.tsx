"use client";

import { useQuery } from "@tanstack/react-query";
import { MonsterCard } from "./MonsterCard";
import { Monster } from "@/types/monster";

async function fetchMonsters(page: number, elements: string[]) {
  const params = new URLSearchParams({ page: page.toString() });
  if (elements.length > 0) {
    params.append("elements", elements.join(","));
  }
  const response = await fetch(`/api/monsters?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

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
  });

  if (isLoading) return <div>Loading...</div>;
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
