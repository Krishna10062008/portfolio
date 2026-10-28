import React from 'react';
import { motion } from 'motion/react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.ts';

interface MaskedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

export function MaskedReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}: MaskedRevealProps) {
  const { shouldReduceMotion } = useMotionPrefs();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
