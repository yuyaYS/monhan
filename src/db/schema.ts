import {
  pgTable,
  serial,
  text,
  boolean,
  jsonb,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { z } from "zod";

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

export const quests = pgTable("quests", {
  id: serial("id").primaryKey(),
  quest_id: text("quest_id").notNull(),
  name: varchar("name").notNull(),
  client: varchar("client").notNull(),
  description: text("description").notNull(),
  map: varchar("map").notNull(),
  isKey: boolean("is_key"),
  questType: varchar("quest_type").notNull(),
  game: varchar("game").notNull(),
  difficulty: varchar("difficulty").notNull(),
  objective: text("objective").notNull(),
  targets: jsonb("targets").$type<string[]>(),
});

export type Quest = typeof quests.$inferSelect;

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message cannot exceed 500 characters"),
});
