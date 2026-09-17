'use client';

import React, { memo } from 'react';
import { motion } from 'motion/react';

export const FadeIn = memo(
  ({
    children,
    delay = 0,
    className = '',
    direction = 'up',
  }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'left' | 'right';
  }) => {
    const yOffset = direction === 'up' ? 30 : 0;
    const xOffset = direction === 'left' ? 30 : direction === 'right' ? -30 : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: yOffset, x: xOffset }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
FadeIn.displayName = 'FadeIn';
