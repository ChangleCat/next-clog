"use client";
import { ReactNode } from "react";
import ArtalkComment from "@/components/ArtalkComment";
import { cn } from "@/utils/cn";
import { CommonLayout, CommonLayoutProps } from "./CommonLayout";

interface ArticleLayoutProps extends CommonLayoutProps {
  showComment?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}


export function ArticleLayout({
  children,
  sidebar,
  header,
  footer,
  showComment = true,
  className = "",
}: ArticleLayoutProps) {
  return (
    <CommonLayout
      sidebar={sidebar}
      className={cn(
        "card-base md:p-8 px-4 hover:border-border shadow-xl md:bg-surface-2 bg-surface-1 border-none md:border-solid",
        className
      )}
    >
      {header}
      <article className="prose dark:prose-invert">
        <div className="mt-8">{children}</div>
        {footer}
      </article>
      {showComment && <ArtalkComment className="mt-8" />}
    </CommonLayout>
  );
}


