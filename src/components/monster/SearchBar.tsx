"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Monster } from "@/types/monster";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

async function searchMonsters(query: string): Promise<Monster[]> {
  if (!query) return [];
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch monsters");
  }
  return response.json();
}

export function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const {
    data: monsters,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["searchMonsters", inputValue],
    queryFn: () => searchMonsters(inputValue),
    enabled: inputValue.length >= 3,
    placeholderData: keepPreviousData,
  });

  const showResults = inputValue.length >= 0;

  return (
    <div className="relative">
      <Command className="rounded-lg border shadow-md w-full max-w-xs">
        <CommandInput
          placeholder="Search monsters..."
          value={inputValue}
          onValueChange={setInputValue}
        />
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
            <CommandList>
              {isFetching ? (
                <div className="p-2">Loading...</div>
              ) : isSuccess && monsters?.length === 0 ? (
                <CommandEmpty>No monsters found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {monsters?.map((monster) => (
                    <CommandItem
                      key={monster.id}
                      onSelect={() => {
                        router.push(`/monster/${monster.monsterId}`);
                      }}
                    >
                      {monster.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
