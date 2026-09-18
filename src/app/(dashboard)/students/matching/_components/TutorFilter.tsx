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

export interface SurveyAnswers {
  university: string;
  interests: string[];
  interest?: string;
  energyPreference: string;
  communicationPreference: string;
  structurePreference: string;
  learningGoal: string;
}

interface TutorSearchFilterProps {
  onClose?: () => void;
  onComplete?: (answers: SurveyAnswers) => void;
  initialAnswers?: Partial<SurveyAnswers>;
}

export default function TutorSearchFilter({
  onClose,
  onComplete,
  initialAnswers,
}: TutorSearchFilterProps) {
  const [currentStep, setCurrentStep] = useState(0);
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

  // Step 2 Multi-select state
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialAnswers?.interests ||
      (initialAnswers?.interest ? [initialAnswers.interest] : []),
  );

  const handleNextFromStep1 = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const finalUni = universityInput.trim() || "ソウル大学校";
    setAnswers((prev) => ({ ...prev, university: finalUni }));
    setCurrentStep(2);
  };

  // Toggle multi-select option in Step 2
  const handleToggleInterest = (optionLabel: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(optionLabel)) {
        return prev.filter((item) => item !== optionLabel);
      } else {
        return [...prev, optionLabel];
      }
    });
  };

  // Step 2 "選択" button confirm
  const handleConfirmStep2 = () => {
    const finalInterests =
      selectedInterests.length > 0 ? selectedInterests : ["韓国生活・遊び"];
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
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete(answers);
    }
    if (onClose) {
      onClose();
    }
  };

  const popularUniversities = [
    "ソウル大学校",
    "延世大学校",
    "高麗大学校",
    "成均館大学校",
    "漢陽大学校",
  ];

  const step2Options = [
    "課外活動・インターン・キャリア",
    "サークル活動",
    "大学文化・学園祭",
    "学業・勉強",
    "韓国生活・遊び",
  ];

  return (
    <div
      id="tutor-search-filter-container"
      className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-[#d8e8f2] px-4 py-8 relative selection:bg-blue-200 selection:text-slate-900"
    >
      {/* Anchored Back Button (Strictly locked to top-left corner across all steps) */}
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

      {/* Main Container Area */}
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: INTRO SCREEN */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center min-h-[260px] flex flex-col items-center justify-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape at Top */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm flex items-center justify-center z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                {/* Decorative Notebook (수첩) Graphic Sticker at Top-Left */}
                <div className="absolute -top-4 -left-4 rotate-[-12deg] pointer-events-none drop-shadow-md">
                  <svg width="42" height="42" viewBox="0 0 44 44" fill="none">
                    {/* Notebook Base */}
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
                    {/* Bookmark Ribbon */}
                    <path
                      d="M28 6V18L31 15L34 18V6"
                      fill="#F87171"
                      stroke="#000"
                      strokeWidth="1.5"
                    />
                    {/* Spiral Loops */}
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
                    {/* Notebook Ruled Lines */}
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

                {/* Autumn Leaf Sticker at Bottom-Right */}
                <div className="absolute -bottom-3 -right-3 rotate-[15deg] pointer-events-none drop-shadow-md">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M18 3L21 11L29 9L24 16L32 20L23 23L25 31L18 26L11 31L13 23L4 20L12 16L7 9L15 11L18 3Z"
                      fill="#F59E0B"
                      stroke="#000000"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Subtitle Badge */}
                <div className="inline-block bg-black text-white text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 shadow-sm">
                  TUTOR SURVEY
                </div>

                {/* Messages */}
                <h2 className="text-xl sm:text-2xl font-black text-black leading-snug mb-3">
                  質問に正直にお答えください。
                </h2>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed max-w-xs">
                  アンケートの結果によって、マッチングされるチューターが変わる場合があります！
                </p>
              </div>

              {/* Start Button */}
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center min-h-[240px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape at Top */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm flex items-center justify-center z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                {/* Decorative Graduation Cap (학사모) Graphic Sticker at Top-Left */}
                <div className="absolute -top-4 -left-4 rotate-[-10deg] pointer-events-none drop-shadow-md">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    {/* Mortarboard Rhomb */}
                    <polygon
                      points="22,8 39,16 22,24 5,16"
                      fill="#1E293B"
                      stroke="#000"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {/* Skullcap */}
                    <path
                      d="M12 19.5V28C12 31 16.5 33.5 22 33.5C27.5 33.5 32 31 32 28V19.5"
                      fill="#334155"
                      stroke="#000"
                      strokeWidth="2.5"
                    />
                    {/* Button & Tassel */}
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

                {/* Step Indicator */}
                <div className="text-2xl font-black text-black tracking-widest mb-3 pt-2">
                  1/6
                </div>

                {/* Question */}
                <h3 className="text-lg sm:text-xl font-black text-black leading-relaxed">
                  希望する大学を入力してください。
                </h3>

                {/* Free Text Input Form inside/under question */}
                <div className="w-full mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="survey-university-input"
                      value={universityInput}
                      onChange={(e) => setUniversityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleNextFromStep1();
                        }
                      }}
                      placeholder="大学名を入力"
                      className="w-full py-3 pl-10 pr-4 bg-slate-50 border-2 border-black rounded-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Popular quick chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                    {popularUniversities.map((uni) => (
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
              </div>

              {/* Next Button */}
              <div className="w-full mt-6">
                <button
                  type="button"
                  id="survey-step1-next-btn"
                  onClick={() => handleNextFromStep1()}
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-lg hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center min-h-[160px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                {/* Step Indicator */}
                <div className="text-2xl font-black text-black tracking-widest mb-2 pt-2">
                  2/6
                </div>

                {/* Question */}
                <h3 className="text-lg sm:text-xl font-black text-black leading-relaxed">
                  希望する授業内容を選択してください。
                </h3>

                <p className="text-xs text-slate-500 font-bold mt-1">
                  (複数選択可)
                </p>
              </div>

              {/* Answer Buttons (Multi-Select, No Icons) */}
              <div className="w-full mt-5 space-y-2.5">
                {step2Options.map((opt) => {
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

              {/* Multi-select confirm button at bottom right */}
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

          {/* STEP 3: MBTI ENERGY (Plain Japanese Text Only, No Icons) */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center min-h-[170px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                {/* Step Indicator */}
                <div className="text-2xl font-black text-black tracking-widest mb-2 pt-2">
                  3/6
                </div>

                {/* Question */}
                <h3 className="text-lg sm:text-xl font-black text-black leading-relaxed">
                  授業中の好みの雰囲気は？
                </h3>
              </div>

              {/* Options (Plain text only, centered) */}
              <div className="w-full mt-6 space-y-3.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "energyPreference",
                      "テンポ良く会話が弾む、エネルギーあふれる明るい雰囲気！",
                      4,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  テンポ良く会話が弾む、エネルギーあふれる明るい雰囲気！
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "energyPreference",
                      "落ち着いて真剣に、自分のペースに合わせてくれるリラックスした雰囲気",
                      4,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  落ち着いて真剣に、自分のペースに合わせてくれるリラックスした雰囲気
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: MBTI COMMUNICATION (Plain Japanese Text Only, No Icons) */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center min-h-[170px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                {/* Step Indicator */}
                <div className="text-2xl font-black text-black tracking-widest mb-2 pt-2">
                  4/6
                </div>

                {/* Question */}
                <h3 className="text-base sm:text-lg font-black text-black leading-relaxed">
                  言葉に詰まったり文法を間違えた時のチューターの対応は？
                </h3>
              </div>

              {/* Options (Plain text only, centered) */}
              <div className="w-full mt-6 space-y-3.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "communicationPreference",
                      "間違えた部分をその場ですぐに丁寧に直してほしい！",
                      5,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  間違えた部分をその場ですぐに丁寧に直してほしい！
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "communicationPreference",
                      "会話の流れを止めずに自然に聞いてくれて、後でまとめて教えてほしい",
                      5,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  会話の流れを止めずに自然に聞いてくれて、後でまとめて教えてほしい
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: MBTI STRUCTURE (Plain Japanese Text Only, No Icons) */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center min-h-[170px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                {/* Step Indicator */}
                <div className="text-2xl font-black text-black tracking-widest mb-2 pt-2">
                  5/6
                </div>

                {/* Question */}
                <h3 className="text-lg sm:text-xl font-black text-black leading-relaxed">
                  授業の資料や進度について、私は…
                </h3>
              </div>

              {/* Options (Plain text only, centered) */}
              <div className="w-full mt-6 space-y-3.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "structurePreference",
                      "体系的なカリキュラムと決まった教材・資料があると安心する",
                      6,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  体系的なカリキュラムと決まった教材・資料があると安心する
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "structurePreference",
                      "その日の日常や関心のあるテーマで自由に会話したい",
                      6,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  その日の日常や関心のあるテーマで自由に会話したい
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: LEARNING GOAL (Plain Japanese Text Only, No Icons) */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center min-h-[170px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                {/* Step Indicator */}
                <div className="text-2xl font-black text-black tracking-widest mb-2 pt-2">
                  6/6
                </div>

                {/* Question */}
                <h3 className="text-lg sm:text-xl font-black text-black leading-relaxed">
                  今回の授業を通して最も得たいものは？
                </h3>
              </div>

              {/* Options (Plain text only, centered) */}
              <div className="w-full mt-6 space-y-3.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "learningGoal",
                      "文法、語彙、試験対策など、確かな実力を身につけること",
                      7,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  文法、語彙、試験対策など、確かな実力を身につけること
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectAnswer(
                      "learningGoal",
                      "ネイティブのように自然に話せる実践的な会話と文化",
                      7,
                    )
                  }
                  className="bg-black text-white w-full py-4 px-6 rounded-lg text-center font-bold text-sm sm:text-base leading-relaxed hover:bg-gray-800 transition-all shadow-[0_4px_0_0_#333] active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  ネイティブのように自然に話せる実践的な会話と文化
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: SUMMARY & COMPLETION */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Notepad Card */}
              <div
                className="w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-7 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Washi Tape */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
                  }}
                />

                <div className="flex items-center justify-center gap-2 mb-3 pt-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                  <span className="text-xl font-black text-black">
                    診断アンケート完了！
                  </span>
                </div>

                <p className="text-xs text-center font-bold text-slate-600 mb-4">
                  ご回答いただいた内容に合わせて最適なチューターをご案内します。
                </p>

                {/* Answer Summary Card */}
                <div className="bg-slate-50 border-2 border-black rounded-xl p-3.5 space-y-2.5 text-xs text-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-500">希望大学</span>
                    <span className="font-black text-black">
                      {answers.university || "指定なし"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-500">授業内容</span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                      {answers.interests && answers.interests.length > 0
                        ? answers.interests.join("、")
                        : answers.interest || "未選択"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-500">
                      好みの雰囲気
                    </span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                      {answers.energyPreference
                        ? answers.energyPreference.includes("テンポ良く")
                          ? "明るく活動的"
                          : "リラックス・マイペース"
                        : "未選択"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-500">
                      訂正スタイル
                    </span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                      {answers.communicationPreference
                        ? answers.communicationPreference.includes(
                            "その場ですぐ",
                          )
                          ? "その場で即時指導"
                          : "後でまとめてフィードバック"
                        : "未選択"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-500">進め方</span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                      {answers.structurePreference
                        ? answers.structurePreference.includes("体系的")
                          ? "体系的カリキュラム"
                          : "自由なフリートーク"
                        : "未選択"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">学習目標</span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                      {answers.learningGoal
                        ? answers.learningGoal.includes("確かな実力")
                          ? "文法・語彙・試験対策"
                          : "自然な実践会話"
                        : "未選択"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
