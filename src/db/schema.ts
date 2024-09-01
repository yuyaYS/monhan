import { pgTable, serial, text, boolean, jsonb } from "drizzle-orm/pg-core";

export const monsters = pgTable("monsters", {
  id: serial("id").primaryKey(),
  monsterId: text("monster_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  isLarge: boolean("is_large"),
  elements: jsonb("elements").$type<string[]>(),
  ailments: jsonb("ailments").$type<string[]>(),
  weakness: jsonb("weakness").$type<string[]>(),
  games: jsonb("games").notNull().$type<
    {
      game: string;
      image: string;
      info: string;
      danger?: string;
    }[]
  >(),
});
