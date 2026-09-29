"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const ScrollReveal = ({ children, width = "100%", delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null);
  // once: true ensures the animation only plays the first time they scroll past it
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} style={{ width }} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};