"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Search,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import SurveyCard from "./SurveyCard";
import {
  type SurveyAnswers,
  POPULAR_UNIVERSITIES,
  STEP2_INTEREST_OPTIONS,
  CHOICE_STEPS,
  SUMMARY_TITLE_MAP,
} from "@/constants/surveyData";

export type { SurveyAnswers };

interface TutorFilterProps {
  onComplete?: (answers: SurveyAnswers) => void;
  initialAnswers?: Partial<SurveyAnswers>;
  initialStep?: number;
}

const fadeAnimation = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.25 },
};

export default function TutorFilter({
  onComplete,
  initialAnswers,
  initialStep = 0,
}: TutorFilterProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [answers, setAnswers] = useState<SurveyAnswers>({
    university: initialAnswers?.university || "",
    interests:
      initialAnswers?.interests ||
      (initialAnswers?.interest ? [initialAnswers.interest] : []),
    interest: initialAnswers?.interest || "",
    energyPreference: initialAnswers?.energyPreference || "",
    communicationPreference: initialAnswers?.communicationPreference || "",
    structurePreference: initialAnswers?.structurePreference || "",
    learningGoal: initialAnswers?.learningGoal || "",
  });

  const [universityInput, setUniversityInput] = useState(
    initialAnswers?.university || "",
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialAnswers?.interests ||
      (initialAnswers?.interest ? [initialAnswers.interest] : []),
  );

  const handleNextFromStep1 = (e?: FormEvent) => {
    if (e) e.preventDefault();

    // 공백을 제거한 입력값 확인
    const trimmedUni = universityInput.trim();

    // 비어있으면 다음 단계로 넘어가지 않고 함수 종료
    if (!trimmedUni) return;

    setAnswers((prev) => ({ ...prev, university: trimmedUni }));
    setCurrentStep(2);
  };

  const handleToggleInterest = (optionLabel: string) => {
    setSelectedInterests((prev) =>
      prev.includes(optionLabel)
        ? prev.filter((item) => item !== optionLabel)
        : [...prev, optionLabel],
    );
  };

  const handleConfirmStep2 = () => {
    const finalInterests =
      selectedInterests.length > 0 ? selectedInterests : ["なんでもOK！"];

    setAnswers((prev) => ({
      ...prev,
      interests: finalInterests,
      interest: finalInterests.join("、"),
    }));
    setCurrentStep(3);
  };

  const handleSelectAnswer = (
    key: keyof SurveyAnswers,
    value: string,
    nextStep: number,
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setCurrentStep(nextStep);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedInterests([]);
    setUniversityInput("");
    setAnswers({
      university: "",
      interests: [],
      interest: "",
      energyPreference: "",
      communicationPreference: "",
      structurePreference: "",
      learningGoal: "",
    });
  };

  const handleFinish = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const getSummary = (key: keyof SurveyAnswers) => {
      const rawValue = answers[key];
      if (!rawValue || typeof rawValue !== "string") return "";

      const stepConfig = CHOICE_STEPS.find((step) => step.key === key);
      const matchedOption = stepConfig?.options.find(
        (opt) => opt.label === rawValue,
      );
      return matchedOption ? matchedOption.summaryLabel : rawValue;
    };

    const finalUniversity = answers.university.trim() || "未定";

    // 💡 수업 내용(interests)이 비어있으면 "なんでもOK！" 기본 부여
    const finalInterests =
      answers.interests && answers.interests.length > 0
        ? answers.interests
        : ["なんでもOK！"];

    const formattedAnswers: SurveyAnswers = {
      ...answers,
      university: finalUniversity,
      interests: finalInterests,
      interest: finalInterests.join("、"),
      energyPreference:
        getSummary("energyPreference") || "リラックス・マイペース",
      communicationPreference:
        getSummary("communicationPreference") || "後でまとめてフィードバック",
      structurePreference:
        getSummary("structurePreference") || "自由なフリートーク",
      learningGoal: getSummary("learningGoal") || "自然な実践会話",
    };

    onComplete?.(formattedAnswers);
  };

  return (
    <div
      id="tutor-search-filter-container"
      className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-[#d8e8f2] px-4 py-8 relative selection:bg-blue-200 selection:text-slate-900"
    >
      {/* Anchored Back Button */}
      {currentStep > 0 && (
        <button
          type="button"
          id="survey-back-btn"
          onClick={handlePrevious}
          className="absolute top-6 left-[calc(50%-304px)] z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border-2 border-black/80 text-black text-xs font-bold shadow-sm hover:bg-white active:scale-95 transition-all cursor-pointer"
          aria-label="前へ戻る"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>前へ</span>
        </button>
      )}

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: INTRO SCREEN */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              {...fadeAnimation}
              className="w-full flex flex-col items-center"
            >
              <SurveyCard
                minHeightClass="min-h-[260px]"
                sticker={
                  <>
                    <div className="absolute -top-4 -left-4 -rotate-12 pointer-events-none drop-shadow-md">
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 44 44"
                        fill="none"
                      >
                        <rect
                          x="10"
                          y="6"
                          width="28"
                          height="34"
                          rx="4"
                          fill="#FEF08A"
                          stroke="#000"
                          strokeWidth="2.5"
                        />
                        <path
                          d="M28 6V18L31 15L34 18V6"
                          fill="#F87171"
                          stroke="#000"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="8"
                          y1="12"
                          x2="14"
                          y2="12"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="8"
                          y1="18"
                          x2="14"
                          y2="18"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="8"
                          y1="24"
                          x2="14"
                          y2="24"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="8"
                          y1="30"
                          x2="14"
                          y2="30"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="18"
                          y1="16"
                          x2="32"
                          y2="16"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="18"
                          y1="22"
                          x2="30"
                          y2="22"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="18"
                          y1="28"
                          x2="26"
                          y2="28"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="absolute -bottom-3 -right-3 rotate-12 pointer-events-none drop-shadow-md">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <path
                          d="M18 3L21 11L29 9L24 16L32 20L23 23L25 31L18 26L11 31L13 23L4 20L12 16L7 9L15 11L18 3Z"
                          fill="#F59E0B"
                          stroke="#000000"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </>
                }
              >
                <div className="inline-block bg-black text-white text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 shadow-sm">
                  TUTOR SURVEY
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-black leading-snug mb-3">
                  質問に正直にお答えください。
                </h2>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed max-w-xs">
                  アンケートの結果によって、マッチングされるチューターが変わる場合があります！
                </p>
              </SurveyCard>

              <div className="w-full mt-6">
                <button
                  type="button"
                  id="survey-start-btn"
                  onClick={() => setCurrentStep(1)}
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-lg hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  スタート
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: TEXT INPUT */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              {...fadeAnimation}
              className="w-full flex flex-col items-center"
            >
              <SurveyCard
                currentStep={1}
                question="希望する大学を入力してください。"
                minHeightClass="min-h-[240px]"
                sticker={
                  <div className="absolute -top-4 -left-4 -rotate-12 pointer-events-none drop-shadow-md">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <polygon
                        points="22,8 39,16 22,24 5,16"
                        fill="#1E293B"
                        stroke="#000"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 19.5V28C12 31 16.5 33.5 22 33.5C27.5 33.5 32 31 32 28V19.5"
                        fill="#334155"
                        stroke="#000"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="22"
                        cy="16"
                        r="2.5"
                        fill="#F59E0B"
                        stroke="#000"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M22 16C26 18 34 22 34 26V32"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <rect
                        x="32"
                        y="30"
                        width="4"
                        height="5"
                        rx="1"
                        fill="#F59E0B"
                        stroke="#000"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                }
              >
                <div className="w-full mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="survey-university-input"
                      value={universityInput}
                      onChange={(e) => setUniversityInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleNextFromStep1()
                      }
                      placeholder="大学名を入力"
                      className="w-full py-3 pl-10 pr-4 bg-slate-50 border-2 border-black rounded-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                    {POPULAR_UNIVERSITIES.map((uni) => (
                      <button
                        key={uni}
                        type="button"
                        onClick={() => setUniversityInput(uni)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          universityInput === uni
                            ? "bg-black text-white border-black"
                            : "bg-white text-slate-700 border-slate-300 hover:border-black"
                        }`}
                      >
                        {uni}
                      </button>
                    ))}
                  </div>
                </div>
              </SurveyCard>

              <div className="w-full mt-6">
                <button
                  type="button"
                  id="survey-step1-next-btn"
                  onClick={() => handleNextFromStep1()}
                  disabled={!universityInput.trim()} // 👈 비어있으면 버튼 비활성화
                  className={`w-full py-4 px-6 rounded-lg text-center font-bold text-lg transition-all ${
                    universityInput.trim()
                      ? "bg-black text-white hover:bg-gray-800 shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
                  }`}
                >
                  次へ
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MULTI-SELECT - LESSON CONTENT */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              {...fadeAnimation}
              className="w-full flex flex-col items-center"
            >
              <SurveyCard
                currentStep={2}
                question="希望する授業内容を選択してください。"
                subtitle="(複数選択可)"
                minHeightClass="min-h-[160px]"
              />

              <div className="w-full mt-5 space-y-2.5">
                {STEP2_INTEREST_OPTIONS.map((opt) => {
                  const isSelected = selectedInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleInterest(opt)}
                      className={`w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base transition-all border-2 cursor-pointer ${
                        isSelected
                          ? "bg-black text-white border-black shadow-[0_4px_0_0_#444] translate-y-0.5"
                          : "bg-white text-black border-black hover:bg-slate-50 shadow-[0_2px_0_0_#000]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="w-full flex justify-end mt-4">
                <button
                  type="button"
                  id="survey-step2-select-btn"
                  onClick={handleConfirmStep2}
                  className="bg-black text-white px-7 py-2 rounded-lg text-center font-bold text-sm sm:text-base hover:bg-gray-800 transition-all shadow-[0_3px_0_0_#333] active:translate-y-0.5 active:shadow-none cursor-pointer"
                >
                  選択
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 ~ 6: SINGLE SELECT STEPS */}
          {CHOICE_STEPS.map((stepConfig) => {
            if (currentStep !== stepConfig.step) return null;

            return (
              <motion.div
                key={`step-${stepConfig.step}`}
                {...fadeAnimation}
                className="w-full flex flex-col items-center"
              >
                <SurveyCard
                  currentStep={stepConfig.step}
                  question={stepConfig.question}
                />

                <div className="w-full mt-6 space-y-3.5">
                  {stepConfig.options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        handleSelectAnswer(
                          stepConfig.key,
                          option.label,
                          stepConfig.step + 1,
                        )
                      }
                      className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* STEP 7: SUMMARY & COMPLETION */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              {...fadeAnimation}
              className="w-full flex flex-col items-center"
            >
              <SurveyCard minHeightClass="p-6 sm:p-7">
                <div className="flex items-center justify-center gap-2 mb-3 pt-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                  <span className="text-xl font-black text-black">
                    診断アンケート完了！
                  </span>
                </div>

                <p className="text-xs text-center font-bold text-slate-600 mb-4">
                  ご回答いただいた内容に合わせて最適なチューターをご案内します。
                </p>

                {/* Summary Card */}
                <div className="bg-slate-50 border-2 border-black rounded-xl p-3.5 space-y-2.5 text-xs text-slate-800 text-left w-full">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-500">希望大学</span>
                    <span className="font-black text-black">
                      {answers.university || "指定なし"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-500">授業内容</span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-50">
                      {answers.interests && answers.interests.length > 0
                        ? answers.interests.join("、")
                        : answers.interest || "未選択"}
                    </span>
                  </div>

                  {CHOICE_STEPS.map((stepConfig) => {
                    const selectedValue = answers[stepConfig.key];
                    const matchedOption = stepConfig.options.find(
                      (opt) => opt.label === selectedValue,
                    );

                    return (
                      <div
                        key={stepConfig.key}
                        className="flex items-center justify-between border-b last:border-none border-slate-200 pb-1.5 last:pb-0"
                      >
                        <span className="font-bold text-slate-500">
                          {SUMMARY_TITLE_MAP[stepConfig.key]}
                        </span>
                        <span className="font-bold text-slate-900 text-right truncate max-w-50">
                          {matchedOption
                            ? matchedOption.summaryLabel
                            : "未選択"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </SurveyCard>

              <div className="w-full mt-6 space-y-3">
                <button
                  type="button"
                  id="survey-apply-btn"
                  onClick={handleFinish}
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-base sm:text-lg hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>この条件でチューターを探す</span>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </button>

                <button
                  type="button"
                  id="survey-restart-btn"
                  onClick={handleRestart}
                  className="bg-white text-slate-800 border-2 border-black w-full py-3 px-6 rounded-lg text-center font-bold text-sm hover:bg-slate-100 transition-all shadow-[0_2px_0_0_#000] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>もう一度診断する</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
