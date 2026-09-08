"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Tutor {
  id: string;
  name: string | null;
}

interface MatchRequestProps {
  tutors: Tutor[];
  studentId: string;
}

export default function MatchRequestSection({
  tutors,
  studentId,
}: MatchRequestProps) {
  const [selectedTutorId, setSelectedTutorId] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTutorId) {
      alert("매칭할 튜터를 선택해주세요.");
      return;
    }
    if (!confirm("선택한 튜터에게 매칭을 신청하시겠습니까?")) return;

    setLoading(true);
    const { error } = await supabase.from("matches").insert({
      student_id: studentId,
      tutor_id: selectedTutorId,
      status: "pending",
    });

    if (error) {
      alert("매칭 신청 실패: " + error.message);
    } else {
      alert("매칭이 신청되었습니다!");
      router.refresh();
      router.push("/students");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleMatch} className="space-y-4 max-w-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          매칭할 튜터 선택
        </label>
        <select
          value={selectedTutorId}
          onChange={(e) => setSelectedTutorId(e.target.value)}
          className="border p-2 rounded w-full border-gray-300 bg-white"
        >
          <option value="">-- 튜터를 선택하세요 --</option>
          {tutors.map((tutor) => (
            <option key={tutor.id} value={tutor.id}>
              {tutor.name || "이름 없음"} 튜터
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "신청 중..." : "매칭 신청하기"}
      </button>
    </form>
  );
}
