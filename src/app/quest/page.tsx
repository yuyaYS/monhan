import { Suspense } from "react";
import QuestList from "@/components/quest/QuestList";
import Link from "next/link";

export default function QuestPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        <Link href="/quest">Monster Hunter Quests</Link>
      </h1>
      <Suspense fallback={<div>Loading quests...</div>}>
        <QuestList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
