// src/app/page.tsx

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Monster Hunter Dictionary
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/monster" className="no-underline">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Monsters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Explore fearsome creatures of Monster Hunter
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/quest" className="no-underline">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Quests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Discover exciting hunts and challenges
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/endemic" className="no-underline">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Endemic Life</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Learn about unique wildlife in the game
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
