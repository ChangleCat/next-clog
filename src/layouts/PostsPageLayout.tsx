'use client';
import { ReactNode } from "react";
import AuthorCard from "@/components/side/AuthorCard";
import Pagination, { PaginationProps } from "@/components/Pagination";
import AnnouncementCard from "@/components/side/Announcement";
import { CommonLayout } from "./CommonLayout";

/**
 * PostsPageTemplate 组件用于展示文章页面的基础布局，包括主内容区、分页组件和作者信息卡片。
 */
export function PostsPageLayout({
  children,
  paginationProps,
}: {
  children: ReactNode;
  paginationProps?: PaginationProps;
}) {
  return (
    <CommonLayout
      sidebar={
        <>
          <AuthorCard className="w-full md:w-70" />
          <AnnouncementCard className="w-full md:w-70" />
        </>
      }
      className="card-base md:p-8 px-4 transition-colors duration-200 hover:border-border shadow-xs md:bg-surface-2 bg-surface-1 border-none md:border-solid flex flex-col"
    >
      {children}
      {paginationProps && <Pagination {...paginationProps} />}
    </CommonLayout>
  );
}