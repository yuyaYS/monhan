import { promises as fs } from "fs";
import path from "path";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Quest = {
  name: string;
  client: string;
  description: string;
  map: string;
  questType: string;
  game: string;
  difficulty: string;
  objective: string;
  targets: string[];
};

async function getQuests(): Promise<Quest[]> {
  const filePath = path.join(process.cwd(), "public", "data", "quests.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return data.quests;
}

export default async function QuestPage() {
  const quests = await getQuests();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Monster Hunter Quests</h1>
      <ScrollArea className="h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quests.map((quest, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{quest.name}</CardTitle>
                <CardDescription>{quest.client}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* <p className="text-sm mb-2">{quest.description}</p> */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge>{quest.questType}</Badge>
                  <Badge variant="secondary">{quest.game}</Badge>
                  <Badge variant="outline">
                    Difficulty: {quest.difficulty}
                  </Badge>
                </div>
                <p className="text-sm font-semibold">
                  Objective: {quest.objective}
                </p>
                <p className="text-sm">Map: {quest.map}</p>
                {quest.targets && quest.targets.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Targets:</p>
                    <ul className="list-disc list-inside">
                      {quest.targets.map((target, idx) => (
                        <li key={idx} className="text-sm">
                          {target}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
