"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UploadMonstersButton from "./UploadMonstersButton";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
};

export function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-4">
      {/* <div>
        <h1>Monster Data Upload</h1>
        <UploadMonstersButton />
      </div> */}
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
      >
        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
      >
        Next <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
