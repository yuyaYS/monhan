import EndemicLifeList from "@/components/endemic_life/EndemicLifeList";

export default function EndemicLifePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Endemic Life</h1>
      <EndemicLifeList />
    </div>
  );
}
