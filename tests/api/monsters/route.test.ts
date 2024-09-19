import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextResponse } from "next/server";
import { GET } from "@/app/api/monsters/route";
import { getFilteredMonsters } from "@/db/queries/monsters";
import { Monster } from "@/types/monster";

vi.mock("@/db/queries/monsters", () => ({
  getFilteredMonsters: vi.fn(),
}));

vi.mock("next/server", () => ({
  NextResponse: {
    json: vi.fn().mockImplementation((data) => ({
      json: () => Promise.resolve(data),
      status: 200,
    })),
  },
}));

describe("GET /api/monsters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const createMockResult = (
    monsters: Monster[] = [],
    totalPages = 0,
    totalMonsters = 0
  ) => ({
    monsters,
    totalPages,
    totalMonsters,
  });

  it("should return filtered monsters with default parameters", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request("http://localhost:3000/api/monsters");
    const response = await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(1, [], 16);
    expect(NextResponse.json).toHaveBeenCalledWith(mockResult);

    expect(response).toHaveProperty("json");
    expect(response).toHaveProperty("status", 200);

    const responseData = await response.json();
    expect(responseData).toEqual(mockResult);
  });

  it("should handle page parameter", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request("http://localhost:3000/api/monsters?page=2");
    await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(2, [], 16);
  });

  it("should handle elements parameter", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request(
      "http://localhost:3000/api/monsters?elements=Fire,Water"
    );
    await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(1, ["Fire", "Water"], 16);
  });

  it("should handle both page and elements parameters", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request(
      "http://localhost:3000/api/monsters?page=3&elements=Thunder,Ice"
    );
    await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(3, ["Thunder", "Ice"], 16);
  });

  it("should handle empty elements parameter", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request("http://localhost:3000/api/monsters?elements=");
    await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(1, [], 16);
  });

  it("should handle invalid page parameter", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request(
      "http://localhost:3000/api/monsters?page=invalid"
    );
    await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(1, [], 16);
  });

  it("should handle database query error", async () => {
    vi.mocked(getFilteredMonsters).mockRejectedValue(
      new Error("Database error")
    );

    const request = new Request("http://localhost:3000/api/monsters");
    const response = await GET(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  });

  it("should handle duplicate elements", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request(
      "http://localhost:3000/api/monsters?elements=Fire,Fire,Water"
    );
    await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(
      1,
      ["Fire", "Fire", "Water"],
      16
    );
  });

  it("should handle case-insensitive elements", async () => {
    const mockResult = createMockResult();
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request(
      "http://localhost:3000/api/monsters?elements=fire,WATER,Ice"
    );
    await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(
      1,
      ["fire", "WATER", "Ice"],
      16
    );
  });

  it("should return correct data for non-empty result", async () => {
    const mockMonsters: Monster[] = [
      {
        id: 1,
        monsterId: "rathalos",
        name: "Rathalos",
        type: "Flying Wyvern",
        isLarge: true,
        elements: ["Fire"],
        ailments: ["Poison", "Fireblight"],
        weakness: ["Dragon", "Thunder"],
        games: [
          {
            game: "Monster Hunter World",
            image: "rathalos.jpg",
            info: "The King of the Skies",
            danger: "High",
          },
          {
            game: "Monster Hunter Rise",
            image: "rathalos_rise.jpg",
            info: "Apex predator of the Ancient Forest",
          },
        ],
      },
      {
        id: 2,
        monsterId: "zinogre",
        name: "Zinogre",
        type: "Fanged Wyvern",
        isLarge: true,
        elements: ["Thunder"],
        ailments: ["Thunderblight"],
        weakness: ["Ice", "Water"],
        games: [
          {
            game: "Monster Hunter World: Iceborne",
            image: "zinogre.jpg",
            info: "The Thunder Wolf Wyvern",
            danger: "High",
          },
        ],
      },
    ];

    const mockResult = createMockResult(mockMonsters, 1, 2);
    vi.mocked(getFilteredMonsters).mockResolvedValue(mockResult);

    const request = new Request("http://localhost:3000/api/monsters");
    const response = await GET(request);

    expect(getFilteredMonsters).toHaveBeenCalledWith(1, [], 16);
    expect(NextResponse.json).toHaveBeenCalledWith(mockResult);

    const responseData = await response.json();

    expect(responseData.monsters).toHaveLength(2);
    expect(responseData.totalPages).toBe(1);
    expect(responseData.totalMonsters).toBe(2);

    expect(responseData.monsters[0].name).toBe("Rathalos");
    expect(responseData.monsters[0].elements).toContain("Fire");
    expect(responseData.monsters[0].games).toHaveLength(2);

    expect(responseData.monsters[1].name).toBe("Zinogre");
    expect(responseData.monsters[1].type).toBe("Fanged Wyvern");
    expect(responseData.monsters[1].games[0].danger).toBe("High");
  });
});
