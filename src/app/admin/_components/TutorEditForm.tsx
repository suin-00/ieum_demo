"use client";

import type { FormEvent } from "react";
import type { TutorEditFormValues } from "@/types/tutor.types";

interface TutorEditFormProps {
  value: TutorEditFormValues;
  isSaving: boolean;
  onChange: (value: TutorEditFormValues) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function TutorEditForm({
  value,
  isSaving,
  onChange,
  onSubmit,
  onCancel,
}: TutorEditFormProps) {
  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
        {/* ✅ 성과 이름을 나란히 배치 */}
        <div className="grid grid-cols-2 gap-2 sm:col-span-2">
          <input
            value={value.last_name ?? ""}
            onChange={(event) =>
              onChange({ ...value, last_name: event.target.value })
            }
            required
            placeholder="성"
            aria-label="성"
            className="rounded-lg border p-2 text-sm text-slate-900"
          />
          <input
            value={value.first_name ?? ""}
            onChange={(event) =>
              onChange({ ...value, first_name: event.target.value })
            }
            required
            placeholder="이름"
            aria-label="이름"
            className="rounded-lg border p-2 text-sm text-slate-900"
          />
        </div>

        <input
          value={value.furigana}
          onChange={(event) =>
            onChange({ ...value, furigana: event.target.value })
          }
          required
          placeholder="후리가나"
          aria-label="후리가나"
          className="rounded-lg border p-2 text-sm text-slate-900"
        />
        <div className="flex items-center gap-4 text-sm text-slate-900">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="edit-gender"
              checked={value.gender === "male"}
              onChange={() => onChange({ ...value, gender: "male" })}
            />
            남성
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="edit-gender"
              checked={value.gender === "female"}
              onChange={() => onChange({ ...value, gender: "female" })}
            />
            여성
          </label>
        </div>
        <input
          value={value.school}
          onChange={(event) =>
            onChange({ ...value, school: event.target.value })
          }
          required
          placeholder="대학교"
          aria-label="대학교"
          className="rounded-lg border p-2 text-sm text-slate-900"
        />
        <input
          value={value.major}
          onChange={(event) =>
            onChange({ ...value, major: event.target.value })
          }
          required
          placeholder="전공"
          aria-label="전공"
          className="rounded-lg border p-2 text-sm text-slate-900"
        />
        <input
          value={value.style}
          onChange={(event) =>
            onChange({ ...value, style: event.target.value })
          }
          required
          placeholder="수업 스타일"
          aria-label="수업 스타일"
          className="rounded-lg border p-2 text-sm text-slate-900"
        />
        <input
          value={value.mbti}
          onChange={(event) => onChange({ ...value, mbti: event.target.value })}
          required
          maxLength={4}
          placeholder="MBTI"
          aria-label="MBTI"
          className="rounded-lg border p-2 text-sm text-slate-900"
        />
        <textarea
          value={value.bio}
          onChange={(event) => onChange({ ...value, bio: event.target.value })}
          required
          rows={2}
          placeholder="한줄 소개"
          aria-label="소개"
          className="rounded-lg border p-2 text-sm text-slate-900 sm:col-span-2"
        />
        <div className="flex justify-end gap-2 sm:col-span-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="rounded-md border px-3 py-1.5 text-xs text-slate-600"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-[#0E2640] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
