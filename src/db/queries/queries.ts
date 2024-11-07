import { EndemicLife } from "@/types/endemic_life";
import { Monster } from "@/types/monster";
import { Quest } from "@/types/quest";

export async function fetchMonsters(page: number, elements: string[]) {
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

export async function fetchMonsterDetails(monsterId: string): Promise<Monster> {
  const response = await fetch(`/api/monsters/${monsterId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch monster details");
  }
  return response.json();
}

export async function getQuests(page: number): Promise<{
  data: Quest[];
  pagination: { currentPage: number; totalPages: number; totalQuests: number };
}> {
  const res = await fetch(`/api/quest?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch quests");
  }
  return res.json();
}

export async function getEndemicLife(page: number): Promise<{
  data: EndemicLife[];
  pagination: { currentPage: number; totalPages: number; totalItems: number };
}> {
  const res = await fetch(`/api/endemic_life?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch endemic life data");
  }
  return res.json();
}
