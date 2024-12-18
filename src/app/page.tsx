import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto p-4 bg-[#ffffff] flex flex-col min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#8B5A2B] font-serif">
        Explore your Monster Hunter love
      </h1>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <Link href="/monster" className="no-underline">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#F5F5DC] border-2 border-[#8B5A2B]">
              <CardHeader className="bg-[#A52A2A]">
                <CardTitle className="text-white font-serif">
                  Monsters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4E7C31] font-medium">
                  Explore fearsome creatures of Monster Hunter
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div>
          <Link href="/quest" className="no-underline">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#F5F5DC] border-2 border-[#8B5A2B]">
              <CardHeader className="bg-[#A52A2A]">
                <CardTitle className="text-white font-serif">Quests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4E7C31] font-medium">
                  Discover exciting hunts and challenges
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div>
          <Link href="/endemic" className="no-underline">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#F5F5DC] border-2 border-[#8B5A2B]">
              <CardHeader className="bg-[#A52A2A]">
                <CardTitle className="text-white font-serif">
                  Endemic Life
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4E7C31] font-medium">
                  Learn about unique wildlife in the game
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      <div className="text-center py-4 border-t-2 border-[#8B5A2B]">
        <Link
          href="/contact"
          className="text-[#A52A2A] hover:underline font-serif text-lg"
        >
          Have questions? Contact us here!
        </Link>
      </div>
    </div>
  );
}
