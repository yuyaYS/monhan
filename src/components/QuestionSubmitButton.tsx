"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#A52A2A] hover:bg-[#8B4513] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A52A2A] transition-colors duration-200"
    >
      {pending ? "Sending Message..." : "Submit Message"}
    </button>
  );
}
