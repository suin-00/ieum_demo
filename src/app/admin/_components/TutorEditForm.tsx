"use client";

import type { FormEvent } from "react";
import type { TutorEditFormValues } from "@/types/tutor.types";

const TUTOR_STYLES: TutorStyle[] = [
  "課外活動・インターン・キャリア",
  "サークル活動",
  "大学文化・学園祭",
  "学業・勉強",
  "韓国生活・遊び",
];

export type TutorStyle =
  | "課外活動・インターン・キャリア"
  | "サークル活動"
  | "大学文化・学園祭"
  | "学業・勉強"
  | "韓国生活・遊び";

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
  // 1. 현재 선택된 스타일 배열 안전하게 가져오기 (문자열이거나 배열일 경우 모두 대응)
  const currentStyles: TutorStyle[] = Array.isArray(value.style)
    ? (value.style as TutorStyle[])
    : typeof value.style === "string" && (value.style as string).trim() !== ""
      ? [value.style as TutorStyle]
      : [];

  // 2. 스타일 토글 핸들러
  const handleStyleToggle = (styleOption: TutorStyle) => {
    let updatedStyles: TutorStyle[];
    if (currentStyles.includes(styleOption)) {
      updatedStyles = currentStyles.filter((s) => s !== styleOption);
    } else {
      updatedStyles = [...currentStyles, styleOption];
    }
    onChange({ ...value, style: updatedStyles });
  };

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
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

        <div className="flex flex-col gap-1">
          <label htmlFor="edit-birth_date" className="text-xs text-slate-600">
            생년월일
          </label>
          <input
            type="date"
            id="edit-birth_date"
            value={value.birth_date ? value.birth_date.slice(0, 10) : ""}
            onChange={(event) =>
              onChange({ ...value, birth_date: event.target.value })
            }
            required
            aria-label="생년월일"
            className="rounded-lg border p-2 text-sm text-slate-900"
          />
        </div>

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

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-600">
            수업 스타일 (복수 선택 가능)
          </label>
          <div className="flex flex-wrap gap-2">
            {TUTOR_STYLES.map((styleOption) => {
              const isSelected = currentStyles.includes(styleOption);
              return (
                <button
                  key={styleOption}
                  type="button"
                  onClick={() => handleStyleToggle(styleOption)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    isSelected
                      ? "border-[#0E2640] bg-[#0E2640] text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {styleOption} {isSelected && "✓"}
                </button>
              );
            })}
          </div>
        </div>

        <input
          value={value.mbti}
          onChange={(event) => onChange({ ...value, mbti: event.target.value })}
          required
          maxLength={4}
          placeholder="MBTI"
          aria-label="MBTI"
          className="rounded-lg border p-2 text-sm text-slate-900 sm:col-span-2"
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
