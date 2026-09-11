"use client";

import { useState, type FormEvent } from "react";
import { createStudentAccount } from "@/actions/admin/adminStudent";
import { useRouter } from "next/navigation";

export default function StudentForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createStudentAccount({
      email: String(formData.get("email") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
    });

    setIsSubmitting(false);
    alert(result.message);

    if (result.success) {
      form.reset();
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-xs font-bold text-slate-600">
        이름
        <input
          name="name"
          type="text"
          required
          className="rounded-xl border p-2.5 text-sm text-slate-900"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold text-slate-600">
        이메일
        <input
          name="email"
          type="email"
          required
          className="rounded-xl border p-2.5 text-sm text-slate-900"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-[#0E2640] py-3 text-sm font-bold text-[#f0ddbd] disabled:opacity-50"
      >
        {isSubmitting ? "등록 중..." : "학생 등록"}
      </button>
    </form>
  );
}
