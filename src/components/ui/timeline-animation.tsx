'use client';

import { isValidElement, cloneElement, type ComponentProps } from 'react';
import type { ElementType, ReactNode, RefObject } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

interface TimelineContentProps<T extends ElementType> {
  as?: T;
  animationNum: number;
  timelineRef: RefObject<HTMLElement>;
  customVariants: Variants;
  className?: string;
  children: ReactNode;
}

export function TimelineContent<T extends ElementType = 'div'>({
  as,
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
}: TimelineContentProps<T>) {
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const Component = as || 'div';

  return (
    <motion.div
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={customVariants}
      style={{ opacity }}
      className={cn(className)}
    >
      {isValidElement(children) ? children : <Component>{children}</Component>}
    </motion.div>
  );
}
