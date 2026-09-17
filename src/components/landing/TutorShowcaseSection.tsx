'use client';

import React, { memo } from 'react';
import { motion } from 'motion/react';
import { tutors, UNIFIED_PROFILE_IMAGE } from '../card/TutorCard';

export const TutorShowcaseSection = memo(() => {
  const displayTutors = [...tutors, ...tutors].slice(0, 6);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e2640] tracking-tight">
            現在 120名のチューターが在籍中
          </h2>
        </motion.div>

        {/* Grid Container */}
        <div className="relative overflow-hidden" style={{ maxHeight: '520px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full pointer-events-none select-none">
            {displayTutors.map((tutor, idx) => (
              <div
                key={`${tutor.id}-${idx}`}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/25 shadow-sm shrink-0 bg-slate-100">
                      <img
                        src={UNIFIED_PROFILE_IMAGE}
                        alt={tutor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-slate-900 text-base">{tutor.name}</h3>
                        <span className="text-xs text-slate-500 font-medium">{tutor.age}歳</span>
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
              </div>
            ))}
          </div>

          {/* Gradient overlay to fade out the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
});
TutorShowcaseSection.displayName = 'TutorShowcaseSection';
