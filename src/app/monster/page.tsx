import { Suspense } from "react";
import { PaginationControls } from "@/components/monster/PaginationControls";
import { MonsterList } from "@/components/monster/MonsterList";
import { SearchBar } from "@/components/monster/SearchBar";
import { ElementFilter } from "@/components/monster/ElementFilter";
import Link from "next/link";
export default function MonsterPage({
  searchParams,
}: {
  searchParams: { page: string; elements: string };
}) {
  const page = Number(searchParams.page) || 1;
  const elements = searchParams.elements
    ? searchParams.elements.split(",")
    : [];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          <Link href="/monster">Monsters</Link>
        </h1>
        <div className="relative z-10">
          <SearchBar />
        </div>
      </div>
      <ElementFilter selectedElements={elements} />
      <div className="relative z-0">
        <Suspense fallback={<div>Loading monsters...</div>}>
          <MonsterList page={page} elements={elements} />
        </Suspense>
      </div>
      <PaginationControls currentPage={page} />
    </div>
  );
}
