'use client';

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface CommonLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export function CommonLayout({
  children,
  sidebar,
  className,
}: CommonLayoutProps) {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <motion.main
      className="max-w-7xl mx-auto flex gap-4 mt-24 flex-col md:flex-row md:px-4"
      variants={cardVariants}
      initial="initial"
      animate={"animate"}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className={cn("flex-1 transition-colors duration-200", className)}>
        {children}
      </div>
      {sidebar && (
        <aside className="flex flex-col gap-4 w-full md:w-auto items-center px-4 md:px-0">
          {sidebar}
        </aside>
      )}
    </motion.main>
  );
}