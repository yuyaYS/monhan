import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quest } from "@/db/schema";

export default function QuestCard({ quest }: { quest: Quest }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{quest.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold mb-2">Client: {quest.client}</p>
        <p className="text-sm mb-2">{quest.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge>{quest.questType}</Badge>
          <Badge variant="secondary">{quest.game}</Badge>
          <Badge variant="outline">Difficulty: {quest.difficulty}</Badge>
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
                  {target}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
