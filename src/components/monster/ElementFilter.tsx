"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";

const elements = ["Fire", "Water", "Thunder", "Ice", "Dragon"];

export function ElementFilter({
  selectedElements,
}: {
  selectedElements: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleElement = (element: string) => {
    const newElements = selectedElements.includes(element)
      ? selectedElements.filter((e) => e !== element)
      : [...selectedElements, element];

    const params = new URLSearchParams(searchParams);
    params.set("elements", newElements.join(","));

    params.set("page", "1");
    router.push(`/monster?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {elements.map((element) => (
        <Badge
          key={element}
          variant={selectedElements.includes(element) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => toggleElement(element)}
        >
          {element}
        </Badge>
      ))}
    </div>
  );
}
