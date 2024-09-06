import {
  pgTable,
  serial,
  text,
  boolean,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

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
export const endemicLife = pgTable("endemic_life", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  game: jsonb("game").$type<
    {
      game: string;
      info: string;
      image: string;
    }[]
  >(),
});
