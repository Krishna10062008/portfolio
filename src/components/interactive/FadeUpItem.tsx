import React from 'react';
import { motion } from 'motion/react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.ts';

interface FadeUpItemProps {
  children: React.ReactNode;
  index?: number;
  delay?: number;
  className?: string;
  as?: 'div' | 'span' | 'li';
}

export function FadeUpItem({
  children,
  index = 0,
  delay,
  className = '',
}: FadeUpItemProps) {
  const { shouldReduceMotion } = useMotionPrefs();
  const calculatedDelay = delay !== undefined ? delay : index * 0.06; // staggered 60ms per specification

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: calculatedDelay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.6, // 0.6s per specification
        delay: calculatedDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
