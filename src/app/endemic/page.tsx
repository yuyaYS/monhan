"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EndemicLife } from "@/types/endemic_life";

// Function to fetch endemic life data
const fetchEndemicLife = async (): Promise<EndemicLife[]> => {
  const response = await fetch("/api/endemic_life");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function EndemicLifePage() {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Endemic Life</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {endemicLife?.map((creature: EndemicLife) => (
          <Card key={creature.name} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{creature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {creature.game.map((gameInfo, index) => (
                <div key={index} className="mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {gameInfo.game}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-2">
                    {gameInfo.info}
                  </p>
                  {gameInfo.image && (
                    <div className="flex justify-center">
                      <Image
                        src={`/data/icons/${gameInfo.image}`}
                        alt={`${creature.name} icon`}
                        width={50}
                        height={50}
                      />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
