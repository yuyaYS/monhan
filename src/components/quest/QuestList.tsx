"use client";

import { useQuery } from "@tanstack/react-query";
import QuestCard from "./QuestCard";
import { PaginationQuest } from "./PaginationQuest";
import LoadSpinner from "@/lib/loadingspiner";
import { getQuests } from "@/db/queries/queries";
import { Quest } from "@/types/quest";

export default function QuestList({ currentPage }: { currentPage: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quests", currentPage],
    queryFn: () => getQuests(currentPage),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <LoadSpinner />;
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
