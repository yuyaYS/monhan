export type Quest = {
  id: number;
  quest_id: string;
  name: string;
  client: string;
  description: string;
  map: string;
  isKey?: boolean;
  questType: string;
  game: string;
  difficulty: string;
  objective: string;
  targets?: string[];
};
