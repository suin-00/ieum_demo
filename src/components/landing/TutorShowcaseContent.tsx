"use client";

import React, { memo } from "react";
import { motion, Variants } from "motion/react";
import Image from "next/image";

const UNIFIED_PROFILE_IMAGE = "/images/unified_profile.png";

export interface TutorItem {
  id: string;
  name: string;
  university: string;
  major: string;
  age: number;
  tags: string[];
  bio: string;
  imageUrl: string;
}

interface TutorShowcaseContentProps {
  tutors: TutorItem[];
  totalCount: number;
}

// 1. 부모 컨테이너: 카드들이 순차적으로 나타나도록 시차(stagger) 부여
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// 2. 개별 카드 애니메이션
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export const TutorShowcaseContent = memo(
  ({ tutors, totalCount }: TutorShowcaseContentProps) => {
    return (
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e2640] tracking-tight">
              現在 <span className="text-[#23B5D3]">{totalCount}名</span>
              のチューターが在籍中
            </h2>
          </motion.div>

          {/* Grid Container: 높이 제한(maxHeight)과 overflow-hidden을 제거하여 자연스러운 흐름 유지 */}
          <div className="relative w-full">
            {tutors.length === 0 ? (
              <div className="text-center text-slate-400 py-12 text-sm">
                現在登録されているチューターがいません。
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full select-none"
              >
                {tutors.map((tutor, idx) => (
                  <motion.div
                    key={`${tutor.id}-${idx}`}
                    variants={cardVariants}
                    className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/25 shadow-sm shrink-0 bg-slate-100 relative">
                          <Image
                            src={tutor.imageUrl || UNIFIED_PROFILE_IMAGE}
                            alt={tutor.name}
                            fill
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-slate-900 text-base">
                              {tutor.name}
                            </h3>
                            <span className="text-xs text-slate-500 font-medium">
                              {tutor.age}歳
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-600 mt-0.5 truncate">
                            {tutor.university} · {tutor.major}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {tutor.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {tutor.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  },
);

TutorShowcaseContent.displayName = "TutorShowcaseContent";
