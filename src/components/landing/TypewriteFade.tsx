"use client";

import React from "react";
import { motion } from "motion/react";

interface TypewriterFadeTextProps {
  text: string;
  className?: string;
  delay?: number;
}

// 글자 단위로 쪼개서 촤라랅 나타나게 하는 컴포넌트
export function TypewriterFadeText({
  text,
  className = "",
  delay = 0,
}: TypewriterFadeTextProps) {
  // 글자 단위로 배열화 (띄어쓰기 포함)
  const letters = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.15,
            // 글자 인덱스에 따라 딜레이를 미세하게 주어 왼쪽에서 오른쪽으로 촤라랅 타이핑되는 효과 부여
            delay: delay + index * 0.02,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
