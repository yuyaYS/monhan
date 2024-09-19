import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { monsters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Monster } from "@/types/monster";
import { GET } from "@/app/api/monsters/[monsterId]/route";

vi.mock("@/db", () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn(),
        }),
      }),
    }),
  },
}));

vi.mock("next/server", () => ({
  NextResponse: {
    json: vi.fn().mockImplementation((data, options) => ({ data, options })),
  },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn(),
}));

describe("GET /api/monsters/[monsterId]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockMonster: Monster = {
    id: 1,
    monsterId: "monster123",
    name: "Dragon",
    type: "Flying Wyvern",
    isLarge: true,
    elements: ["Fire", "Dragon"],
    ailments: ["Fireblight", "Dragonblight"],
    weakness: ["Water", "Thunder"],
    games: [
      {
        game: "Monster Hunter World",
        image: "dragon.jpg",
        info: "A fearsome dragon",
        danger: "High",
      },
    ],
  };

  it("should return the monster data when found", async () => {
    const mockLimit = vi.fn().mockResolvedValue([mockMonster]);
    vi.mocked(db.select().from(monsters).where).mockReturnValue({
      limit: mockLimit,
    } as any);

    const response = await GET({} as Request, {
      params: { monsterId: "monster123" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(mockMonster);
    expect(response).toEqual({ data: mockMonster, options: undefined });
    expect(db.select().from(monsters).where).toHaveBeenCalledWith(
      eq(monsters.monsterId, "monster123")
    );
    expect(mockLimit).toHaveBeenCalledWith(1);
  });

  it("should return 404 when monster is not found", async () => {
    const mockWhere = vi.fn().mockReturnValue({
      limit: vi.fn().mockResolvedValue([]),
    });
    vi.mocked(db.select().from).mockReturnValue({ where: mockWhere } as any);

    const response = await GET({} as Request, {
      params: { monsterId: "nonexistent" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Monster not found" },
      { status: 404 }
    );
    expect(response).toEqual({
      data: { error: "Monster not found" },
      options: { status: 404 },
    });
    expect(mockWhere).toHaveBeenCalledWith(
      eq(monsters.monsterId, "nonexistent")
    );
  });

  it("should return 500 when database query fails", async () => {
    const mockWhere = vi.fn().mockReturnValue({
      limit: vi.fn().mockRejectedValue(new Error("DB Error")),
    });
    vi.mocked(db.select().from).mockReturnValue({ where: mockWhere } as any);

    const response = await GET({} as Request, {
      params: { monsterId: "monster123" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Failed to fetch monster data" },
      { status: 500 }
    );
    expect(response).toEqual({
      data: { error: "Failed to fetch monster data" },
      options: { status: 500 },
    });
    expect(mockWhere).toHaveBeenCalledWith(
      eq(monsters.monsterId, "monster123")
    );
  });

  it("should call the database with correct parameters", async () => {
    const mockLimit = vi.fn().mockResolvedValue([]);
    vi.mocked(db.select().from(monsters).where).mockReturnValue({
      limit: mockLimit,
    } as any);

    await GET({} as Request, { params: { monsterId: "monster123" } });

    expect(db.select).toHaveBeenCalled();
    expect(db.select().from).toHaveBeenCalledWith(monsters);
    expect(db.select().from(monsters).where).toHaveBeenCalledWith(
      eq(monsters.monsterId, "monster123")
    );
    expect(mockLimit).toHaveBeenCalledWith(1);
  });
});
