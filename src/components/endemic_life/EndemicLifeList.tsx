"use client";

import { useQuery } from "@tanstack/react-query";
import { EndemicLife } from "@/types/endemic_life";
import EndemicLifeCard from "./EndemicLifeCard";
import PaginationEndemicLife from "./PaginationEndemicLife";
import LoadSpinner from "@/lib/loadingspiner";
import { getEndemicLife } from "@/db/queries/queries";

export default function EndemicLifeList({
  currentPage,
}: {
  currentPage: number;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["endemicLife", currentPage],
    queryFn: () => getEndemicLife(currentPage),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <LoadSpinner />;
  if (error)
    return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data.map((creature: EndemicLife) => (
          <EndemicLifeCard key={creature.name} creature={creature} />
        ))}
      </div>
      <PaginationEndemicLife
        currentPage={data?.pagination.currentPage || 1}
        totalPages={data?.pagination.totalPages || 1}
      />
    </div>
  );
}
