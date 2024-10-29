"use client";

import { useQuery } from "@tanstack/react-query";
import { EndemicLife } from "@/types/endemic_life";
import EndemicLifeCard from "./EndemicLifeCard";
import PaginationEndemicLife from "./PaginationEndemicLife";
import SyncSpinner from "@/lib/loadingspiner";

async function getEndemicLife(page: number): Promise<{
  data: EndemicLife[];
  pagination: { currentPage: number; totalPages: number; totalItems: number };
}> {
  const res = await fetch(`/api/endemic_life?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch endemic life data");
  }
  return res.json();
}

export default function EndemicLifeList({
  currentPage,
}: {
  currentPage: number;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["endemicLife", currentPage],
    queryFn: () => getEndemicLife(currentPage),
  });

  if (isLoading)
    return (
      <SyncSpinner color="#009933" size={20} margin={3} speedMultiplier={0.8} />
    );
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
