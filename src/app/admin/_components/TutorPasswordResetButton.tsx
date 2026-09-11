"use client";

import { sendTutorPasswordResetEmail } from "@/actions/admin/adminTutor";
import { useState } from "react";

interface TutorPasswordResetButtonProps {
  tutorId: string;
}

export default function TutorPasswordResetButton({
  tutorId,
}: TutorPasswordResetButtonProps) {
  const [isSending, setIsSending] = useState(false);

  async function handleSendResetEmail() {
    if (!window.confirm("이 튜터에게 비밀번호 변경 이메일을 보내시겠습니까?")) {
      return;
    }

    setIsSending(true);
    const result = await sendTutorPasswordResetEmail(tutorId);
    setIsSending(false);
    alert(result.message);
  }

  return (
    <button
      type="button"
      onClick={handleSendResetEmail}
      disabled={isSending}
      className="rounded-lg bg-[#0E2640] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSending ? "발송 중..." : "비밀번호 변경 이메일 보내기"}
    </button>
  );
}
