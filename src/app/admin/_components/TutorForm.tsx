"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { createTutorAccount } from "@/actions/admin/adminTutor";
import TutorFormField from "@/app/admin/_components/TutorFormField";
import type {
  CreateTutorInput,
  TutorGender,
  TutorStyle,
} from "@/types/tutor.types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client"; // 👈 Supabase 클라이언트 임포트 경로 확인

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

  // 📸 이미지 상태 관리
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [backgroundFiles, setBackgroundFiles] = useState<File[]>([]);
  const [backgroundPreviews, setBackgroundPreviews] = useState<string[]>([]);

  const handleStyleToggle = (styleOption: TutorStyle) => {
    if (selectedStyles.includes(styleOption)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== styleOption));
    } else {
      setSelectedStyles([...selectedStyles, styleOption]);
    }
  };

  // 프로필 이미지 선택 핸들러 (단일)
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // 배경 이미지 선택 핸들러 (복수)
  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setBackgroundFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setBackgroundPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // 배경 이미지 개별 삭제
  const removeBackgroundImage = (index: number) => {
    setBackgroundFiles((prev) => prev.filter((_, i) => i !== index));
    setBackgroundPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedStyles.length === 0) {
      alert("수업 스타일을 최소 1개 이상 선택해 주세요.");
      return;
    }

    setLoading(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const supabase = createClient();

      // ==========================================
      // 1. 프로필 이미지 Supabase Storage 업로드
      // ==========================================
      let profile_image_url: string | null = null;
      if (profileImageFile) {
        const fileExt = profileImageFile.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `profiles/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-image") // 👈 Supabase에 만든 Public 버킷 이름으로 변경하세요
          .upload(filePath, profileImageFile);

        if (uploadError) {
          throw new Error(`프로필 이미지 업로드 실패: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from("profile-image")
          .getPublicUrl(filePath);

        profile_image_url = publicUrlData.publicUrl;
      }

      // ==========================================
      // 2. 배경 이미지 여러 장 Supabase Storage 업로드
      // ==========================================
      const background_image_urls: string[] = [];
      for (const file of backgroundFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `backgrounds/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-image") // 👈 버킷 이름
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`배경 이미지 업로드 실패: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from("profile-image")
          .getPublicUrl(filePath);

        background_image_urls.push(publicUrlData.publicUrl);
      }

      // ==========================================
      // 3. 최종 데이터 객체 생성 및 서버 액션 호출
      // ==========================================
      const data: CreateTutorInput = {
        email: getRequiredString(formData, "email"),
        first_name: getRequiredString(formData, "first_name"),
        last_name: getRequiredString(formData, "last_name"),
        furigana: getRequiredString(formData, "furigana"),
        gender: getTutorGender(formData),
        birth_date: getRequiredString(formData, "birth_date"),
        school: getRequiredString(formData, "school"),
        major: getRequiredString(formData, "major"),
        style: selectedStyles,
        mbti: getRequiredString(formData, "mbti"),
        bio: getRequiredString(formData, "bio"),
        profile_image: profile_image_url,
        background_image:
          background_image_urls.length > 0 ? background_image_urls : null,
      };

      const result = await createTutorAccount(data);

      if (!result.success) {
        alert(`등록 실패: ${result.message}`);
        return;
      }

      alert(result.message);
      form.reset();
      setSelectedStyles([]);
      setProfileImageFile(null);
      setProfilePreview(null);
      setBackgroundFiles([]);
      setBackgroundPreviews([]);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <TutorFormField name="email" label="이메일" type="email" />
      <div className="grid grid-cols-2 gap-2">
        <TutorFormField name="last_name" label="성" />
        <TutorFormField name="first_name" label="이름" />
      </div>
      <TutorFormField name="furigana" label="이름 후리가나" />
      <TutorFormField name="birth_date" label="생년월일" type="date" />

      {/* 성별 선택 */}
      <fieldset>
        <legend className="block text-xs font-bold text-slate-600 mb-1">
          성별
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-sm text-slate-900">
            <input
              name="gender"
              type="radio"
              value="male"
              required
              className="h-4 w-4 accent-[#0E2640]"
            />
            남성
          </label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-sm text-slate-900">
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

      {/* 🖼️ 프로필 사진 업로드 (단일) */}
      <div className="flex flex-col gap-1.5">
        <label className="block text-xs font-bold text-slate-600">
          프로필 사진
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-300 shrink-0">
            {profilePreview ? (
              <Image
                src={profilePreview}
                alt="프로필 미리보기"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[10px] text-slate-400">
                NO IMG
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileChange}
            className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
          />
        </div>
      </div>

      {/* 🖼️ 배경 사진 업로드 (여러 장) */}
      <div className="flex flex-col gap-1.5">
        <label className="block text-xs font-bold text-slate-600">
          배경 사진 (여러 장 선택 가능)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleBackgroundChange}
          className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
        />
        {/* 배경 사진 미리보기 리스트 */}
        {backgroundPreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {backgroundPreviews.map((src, index) => (
              <div
                key={index}
                className="relative h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group"
              >
                <Image
                  src={src}
                  alt={`배경 미리보기 ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeBackgroundImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 수업 스타일 선택 */}
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
