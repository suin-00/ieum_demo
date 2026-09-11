"use client";

import { useState, type FormEvent } from "react";
import { createTutorAccount } from "@/actions/admin/adminTutor";
import TutorFormField from "@/app/admin/_components/TutorFormField";
import type {
  CreateTutorInput,
  TutorGender,
  TutorStyle,
} from "@/types/tutor.types";
import { useRouter } from "next/navigation";

const TUTOR_STYLES: TutorStyle[] = [
  "課外活動・インターン・キャリア",
  "サークル活動",
  "大学文化・学園祭",
  "学業・勉強",
  "韓国生活・遊び",
];

function getRequiredString(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 입력값이 필요합니다.`);
  }

  return value.trim();
}

function getTutorGender(formData: FormData): TutorGender {
  const gender = getRequiredString(formData, "gender");

  if (gender !== "male" && gender !== "female") {
    throw new Error("성별을 올바르게 선택해 주세요.");
  }

  return gender;
}

export default function TutorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<TutorStyle[]>([]);

  const handleStyleToggle = (styleOption: TutorStyle) => {
    if (selectedStyles.includes(styleOption)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== styleOption));
    } else {
      setSelectedStyles([...selectedStyles, styleOption]);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedStyles.length === 0) {
      alert("수업 스타일을 최소 1개 이상 선택해 주세요.");
      return;
    }

    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const data: CreateTutorInput = {
        email: getRequiredString(formData, "email"),
        first_name: getRequiredString(formData, "first_name"),
        last_name: getRequiredString(formData, "last_name"),
        furigana: getRequiredString(formData, "furigana"),
        gender: getTutorGender(formData),
        birth_date: getRequiredString(formData, "birth_date"),
        school: getRequiredString(formData, "school"),
        major: getRequiredString(formData, "major"),
        style: selectedStyles, // 배열 타입으로 전달
        mbti: getRequiredString(formData, "mbti"),
        bio: getRequiredString(formData, "bio"),
      };

      const result = await createTutorAccount(data);

      if (!result.success) {
        alert(`등록 실패: ${result.message}`);
        return;
      }

      alert(result.message);
      form.reset();
      setSelectedStyles([]);
      router.refresh();
    } catch (error: unknown) {
      alert(
        error instanceof Error
          ? error.message
          : "튜터 등록 중 오류가 발생했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TutorFormField name="email" label="이메일" type="email" />
      <div className="grid grid-cols-2 gap-2">
        <TutorFormField name="last_name" label="성" />
        <TutorFormField name="first_name" label="이름" />
      </div>
      <TutorFormField name="furigana" label="이름 후리가나" />
      <TutorFormField name="birth_date" label="생년월일" type="date" />
      <fieldset>
        <legend className="block text-xs font-bold text-slate-600 mb-1">
          성별
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-sm text-slate-900 has-checked:border-[#0E2640] has-checked:bg-slate-50">
            <input
              name="gender"
              type="radio"
              value="male"
              required
              className="h-4 w-4 accent-[#0E2640]"
            />
            남성
          </label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-sm text-slate-900 has-checked:border-[#0E2640] has-checked:bg-slate-50">
            <input
              name="gender"
              type="radio"
              value="female"
              required
              className="h-4 w-4 accent-[#0E2640]"
            />
            여성
          </label>
        </div>
      </fieldset>
      <TutorFormField name="school" label="대학교 (school)" />
      <TutorFormField name="major" label="전공 (major)" />

      {/* ✅ 수업 스타일 버튼 선택식 영역 추가 */}
      <div className="flex flex-col gap-1.5">
        <label className="block text-xs font-bold text-slate-600">
          수업 스타일 (복수 선택 가능)
        </label>
        <div className="flex flex-wrap gap-2">
          {TUTOR_STYLES.map((styleOption) => {
            const isSelected = selectedStyles.includes(styleOption);
            return (
              <button
                key={styleOption}
                type="button"
                onClick={() => handleStyleToggle(styleOption)}
                className={`rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
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

      <TutorFormField name="mbti" label="MBTI" maxLength={4} />
      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1">
          한줄 소개 (bio)
        </label>
        <textarea
          name="bio"
          required
          rows={3}
          className="w-full border rounded-xl p-2.5 text-sm text-slate-900 placeholder:text-slate-400 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-[#0E2640] text-[#f0ddbd] font-bold py-3 rounded-xl hover:bg-slate-900 transition-colors text-sm disabled:opacity-50"
      >
        {loading ? "처리 중..." : "계정 생성 및 등록"}
      </button>
    </form>
  );
}
