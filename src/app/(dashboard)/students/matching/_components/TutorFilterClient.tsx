"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
// 💡 실제 파일명인 TutorSearchFilter로 임포트
import TutorFilter, { type SurveyAnswers } from "./TutorFilter";
import { CHOICE_STEPS } from "@/constants/surveyData";

export default function TutorFilterClient() {
  const router = useRouter();

  const handleComplete = (answers: SurveyAnswers) => {
    const getSummary = (key: keyof SurveyAnswers) => {
      const value = answers[key];
      if (!value || typeof value !== "string") return "";

      const stepConfig = CHOICE_STEPS.find((step) => step.key === key);
      const matchedOption = stepConfig?.options.find(
        (opt) => opt.label === value,
      );

      return matchedOption ? matchedOption.summaryLabel : value;
    };

    const queryParams = new URLSearchParams({
      university: answers.university || "",
      interests: answers.interests ? answers.interests.join(",") : "",
      energy: getSummary("energyPreference"),
      communication: getSummary("communicationPreference"),
      structure: getSummary("structurePreference"),
      goal: getSummary("learningGoal"),
    }).toString();

    startTransition(() => {
      router.push(`/students/matching/tutors?${queryParams}`);
    });
  };

  // 💡 더 이상 사용하지 않는 handleClose 제거 후 컴포넌트 렌더링
  return <TutorFilter onComplete={handleComplete} />;
}
