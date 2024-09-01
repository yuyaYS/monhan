export type Monster = {
  id: number;
  monsterId: string;
  name: string;
  type: string;
  isLarge: boolean | null;
  elements: string[] | null;
  ailments: string[] | null;
  weakness: string[] | null;
  games: {
    game: string;
    image: string;
    info: string;
    danger?: string;
  }[];
};
