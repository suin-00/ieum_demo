"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// 프로필 데이터 타입 정의
interface Profile {
  id: string;
  name: string | null;
  role: string | null;
}

interface ProfileEditSectionProps {
  initialProfile: Profile | null;
}

export default function ProfileEditSection({
  initialProfile,
}: ProfileEditSectionProps) {
  const [name, setName] = useState(initialProfile?.name || "");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialProfile) return;

    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({ name })
      .eq("id", initialProfile.id);

    if (error) {
      alert("수정 실패: " + error.message);
    } else {
      alert("프로필이 수정되었습니다!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full max-w-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "저장 중..." : "프로필 수정 저장"}
      </button>
    </form>
  );
}
