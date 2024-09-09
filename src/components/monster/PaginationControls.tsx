"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export function PaginationControls({ currentPage }: { currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = 19;
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/monster?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="self-center">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
