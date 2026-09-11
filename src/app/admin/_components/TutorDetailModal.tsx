"use client";

import TutorPasswordResetButton from "@/app/admin/_components/TutorPasswordResetButton";
import type { Tutor } from "@/types/tutor.types";

interface TutorDetailModalProps {
  tutor: Tutor;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TutorDetailModal({
  tutor,
  onClose,
  onEdit,
  onDelete,
}: TutorDetailModalProps) {
  const profile = tutor.profiles;
  const gender =
    profile?.gender === "male"
      ? "남성"
      : profile?.gender === "female"
        ? "여성"
        : "-";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutor-detail-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="tutor-detail-title"
              className="text-2xl font-bold text-[#0E2640]"
            >
              {profile?.nickname ?? "이름 없음"} 상세 정보
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {profile?.furigana ?? "후리가나 없음"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="상세 정보 닫기"
            className="rounded-md p-1 text-2xl leading-none text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold text-slate-500">이메일</dt>
            <dd className="mt-1 break-all text-slate-900">
              {profile?.email ?? "-"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">성별</dt>
            <dd className="mt-1 text-slate-900">{gender}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">대학교</dt>
            <dd className="mt-1 text-slate-900">{tutor.school ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">전공</dt>
            <dd className="mt-1 text-slate-900">{tutor.major ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">수업 스타일</dt>
            <dd className="mt-1 text-slate-900">{tutor.style ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">MBTI</dt>
            <dd className="mt-1 text-slate-900">{tutor.mbti ?? "-"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-bold text-slate-500">소개</dt>
            <dd className="mt-1 whitespace-pre-wrap text-slate-900">
              {tutor.bio ?? "-"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between gap-2">
          <TutorPasswordResetButton tutorId={tutor.id} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              수정
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              삭제
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
