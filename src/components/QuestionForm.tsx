"use client";
import { useRef } from "react";
import SubmitButton from "./QuestionSubmitButton";
import { contactAction } from "@/app/action/questionnaire-action";

export default function QuestionnaireForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const result = await contactAction(
      { errors: [], success: false },
      formData
    );
    if (result.success) {
      formRef.current?.reset();
    }
    return result;
  };

  return (
    <form
      ref={formRef}
      action={handleAction}
      className="space-y-4 bg-[#F5F5DC] p-6 rounded-lg border-2 border-[#8B5A2B]"
    >
      <h2 className="text-2xl font-bold text-[#A52A2A] font-serif mb-4">
        Contact Us
      </h2>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#4E7C31]"
        >
          Hunter Name(Just your name)
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-[#8B5A2B] shadow-sm focus:border-[#A52A2A] focus:ring focus:ring-[#A52A2A] focus:ring-opacity-50 bg-[#FFFAF0]"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#4E7C31]"
        >
          Guild Card Number (I mean your email address)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-[#8B5A2B] shadow-sm focus:border-[#A52A2A] focus:ring focus:ring-[#A52A2A] focus:ring-opacity-50 bg-[#FFFAF0]"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[#4E7C31]"
        >
          Message/Question to dev
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-[#8B5A2B] shadow-sm focus:border-[#A52A2A] focus:ring focus:ring-[#A52A2A] focus:ring-opacity-50 bg-[#FFFAF0]"
        ></textarea>
      </div>

      <SubmitButton />
    </form>
  );
}
