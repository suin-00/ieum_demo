"use client";

import React from "react";

interface SurveyCardProps {
  currentStep?: number;
  totalSteps?: number;
  question?: string;
  subtitle?: string;
  sticker?: React.ReactNode;
  children?: React.ReactNode;
  minHeightClass?: string;
}

export default function SurveyCard({
  currentStep,
  totalSteps = 6,
  question,
  subtitle,
  sticker,
  children,
  minHeightClass = "min-h-[170px]",
}: SurveyCardProps) {
  return (
    <div
      className={`w-full border-4 border-black rounded-2xl bg-white relative p-6 sm:p-8 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center ${minHeightClass}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, #d4eaf7 1px, transparent 1px), linear-gradient(to bottom, #d4eaf7 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Washi Tape at Top */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-8 bg-sky-200/90 border border-sky-300 shadow-sm z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.7) 4px, rgba(255,255,255,0.7) 8px)",
        }}
      />

      {/* Decorative Sticker Graphics */}
      {sticker}

      {/* Step Indicator */}
      {currentStep !== undefined && (
        <div className="text-2xl font-black text-black tracking-widest mb-2 pt-2">
          {currentStep}/{totalSteps}
        </div>
      )}

      {/* Question Heading */}
      {question && (
        <h3 className="text-lg sm:text-xl font-black text-black leading-relaxed">
          {question}
        </h3>
      )}

      {/* Subtitle / Note */}
      {subtitle && (
        <p className="text-xs text-slate-500 font-bold mt-1">{subtitle}</p>
      )}

      {/* Inner Children (Input, Chips, etc.) */}
      {children}
    </div>
  );
}
