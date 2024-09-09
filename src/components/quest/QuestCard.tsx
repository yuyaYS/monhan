import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quest } from "@/db/schema";

export default function QuestCard({ quest }: { quest: Quest }) {
  return (
    <Card className="overflow-hidden bg-[#F5F5DC] border border-[#8B5A2B] hover:shadow-lg transition-shadow">
      <CardHeader className="bg-[#A52A2A] text-white">
        <CardTitle className="font-bold text-lg">{quest.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm font-semibold mb-2">Client: {quest.client}</p>
        <p className="text-sm mb-2">{quest.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="bg-[#4E7C31] text-white">{quest.questType}</Badge>
          <Badge variant="secondary" className="bg-[#4E7C31] text-white">
            {quest.game}
          </Badge>
          <Badge variant="outline" className="border-[#A52A2A] text-[#A52A2A]">
            Difficulty: {quest.difficulty}
          </Badge>
        </div>
        <p className="text-sm">
          <strong>Map:</strong> {quest.map}
        </p>
        <p className="text-sm">
          <strong>Objective:</strong> {quest.objective}
        </p>
        {quest.targets && quest.targets.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-semibold">Targets:</p>
            <ul className="list-disc list-inside">
              {quest.targets.map((target, index) => (
                <li key={index} className="text-sm">
                  <span className="text-[#8B5A2B]  ">{target}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
