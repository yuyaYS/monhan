import EndemicLifeList from "@/components/endemic_life/EndemicLifeList";
import Link from "next/link";
export default function EndemicLifePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8  text-[#8B5A2B] font-serif">
        <Link href="/endemic">Endemic Life</Link>
      </h1>
      <EndemicLifeList currentPage={currentPage} />
    </div>
  );
}
