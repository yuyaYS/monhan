"use client";

import { useQuery } from "@tanstack/react-query";
import { EndemicLife } from "@/types/endemic_life";
import EndemicLifeCard from "./EndemicLifeCard";

const fetchEndemicLife = async (): Promise<EndemicLife[]> => {
  const response = await fetch("/api/endemic_life");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function EndemicLifeList() {
  const {
    data: endemicLife,
    isLoading,
    error,
  } = useQuery<EndemicLife[]>({
    queryKey: ["endemicLife"],
    queryFn: fetchEndemicLife,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {endemicLife?.map((creature: EndemicLife) => (
        <EndemicLifeCard key={creature.id} creature={creature} />
      ))}
    </div>
  );
}
