"use client";
import { ReactNode } from "react";
import ArtalkComment from "@/components/ArtalkComment";
import { motion } from "framer-motion";

type ArticleLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  showComment?: boolean;
  className?: string;
};

export default function ArticleLayout({
  children,
  sidebar,
  header,
  footer,
  showComment = true,
  className = "",
}: ArticleLayoutProps) {
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
      <div
        className={`card-base flex-1 md:p-8 px-4 transition-colors duration-200 hover:border-border shadow-xl md:bg-surface-2 bg-surface-1 border-none md:border-solid ${className}`}
      >
        {header}
        <article className="prose dark:prose-invert">
          <div className="mt-8">{children}</div>
          {footer}
        </article>
        {showComment && <ArtalkComment className="mt-8" />}
      </div>
      {sidebar && (
        <aside className="flex flex-col gap-4 w-full md:w-auto items-center px-4 md:px-0">
          {sidebar}
        </aside>
      )}
    </motion.main>
  );
}
