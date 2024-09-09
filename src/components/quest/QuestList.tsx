"use client";

import { useQuery } from "@tanstack/react-query";
import QuestCard from "./QuestCard";
import { PaginationQuest } from "./PaginationQuest";
import { Quest } from "@/db/schema";

async function getQuests(
  page: number
): Promise<{
  data: Quest[];
  pagination: { currentPage: number; totalPages: number; totalQuests: number };
}> {
  const res = await fetch(`/api/quest?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch quests");
  }
  return res.json();
}

export default function QuestList({ currentPage }: { currentPage: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quests", currentPage],
    queryFn: () => getQuests(currentPage),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data.map((quest: Quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
      <PaginationQuest
        currentPage={data?.pagination.currentPage || 1}
        totalPages={data?.pagination.totalPages || 1}
      />
    </>
  );
}
