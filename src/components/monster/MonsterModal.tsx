"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Monster } from "@/types/monster";
import LoadSpinner from "@/lib/loadingspiner";

const getElementColor = (element: string) => {
  switch (element.toLowerCase()) {
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "thunder":
      return "bg-yellow-500";
    case "ice":
      return "bg-cyan-500";
    case "dragon":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

async function fetchMonsterDetails(monsterId: string): Promise<Monster> {
  const response = await fetch(`/api/monsters/${monsterId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch monster details");
  }
  return response.json();
}

export function MonsterModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const monsterId = searchParams.get("monsterId");

  const {
    data: monster,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["monster", monsterId],
    queryFn: () => fetchMonsterDetails(monsterId as string),
    enabled: !!monsterId,
  });

  const handleClose = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("monsterId");

    const newPath = `/monster${
      currentParams.toString() ? `?${currentParams.toString()}` : ""
    }`;
    router.push(newPath);
  };

  if (!monsterId) return null;

  return (
    <Dialog open={!!monsterId} onOpenChange={handleClose}>
      <DialogContent className="bg-[#F5F5DC] border-2 border-[#8B5A2B] max-w-3xl">
        <DialogHeader className="bg-[#A52A2A] text-white p-4 -mx-6 -mt-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">
            {monster?.name || "Monster Details"}
          </DialogTitle>
        </DialogHeader>
        {isLoading && <LoadSpinner />}
        {error && (
          <p className="text-center py-8 text-red-500">
            Error: {(error as Error).message}
          </p>
        )}
        {monster && (
          <div className="mt-4 space-y-4">
            <p className="text-lg">
              <strong className="text-[#8B5A2B]">Type:</strong>{" "}
              {monster.type || "Unknown"}
            </p>
            <div>
              <strong className="text-lg text-[#8B5A2B]">Elements:</strong>
              <div className="flex flex-wrap gap-2 my-2">
                {monster.elements?.map((element) => (
                  <Badge
                    key={element}
                    className={`${getElementColor(
                      element
                    )} text-white px-3 py-1`}
                  >
                    {element}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-lg">
              <strong className="text-[#8B5A2B]">Weakness:</strong>{" "}
              {monster.weakness?.join(", ") || "None"}
            </p>
            {monster.games && monster.games[0]?.image && (
              <div className="flex justify-center mt-4">
                <Image
                  src={`/data/icons/${monster.games[0].image}`}
                  alt={`${monster.name} icon`}
                  width={120}
                  height={120}
                  className="border-2 border-[#8B5A2B] rounded-lg"
                />
              </div>
            )}
            {monster.games && (
              <div className="mt-6">
                <strong className="text-lg text-[#8B5A2B]">Games:</strong>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  {monster.games.map((game, index) => (
                    <li key={index} className="text-[#4E7C31]">
                      <strong>{game.game}</strong>: {game.info}
                      {game.danger && (
                        <p className="ml-4 text-red-600">
                          Danger: {game.danger}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
