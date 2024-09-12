"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#A52A2A] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Monster Hunter Dictionary
        </Link>
        <ul className="flex space-x-4">
          {["monster", "quest", "endemic"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item}`}
                className={`hover:text-[#F5F5DC] transition-colors ${
                  pathname.startsWith(`/${item}`)
                    ? "border-b-2 border-[#F5F5DC]"
                    : ""
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
