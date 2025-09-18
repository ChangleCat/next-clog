'use client';
import { ReactNode, useRef } from "react";
import AuthorCard from "./side/AuthorCard";
import Pagination, { PaginationProps } from "./Pagination";
import AnnouncementCard from "./side/Announcement";
import { motion } from "framer-motion";

/**
 * PostsPageTemplate 组件用于展示文章页面的基础布局，包括主内容区、分页组件和作者信息卡片。
 *
 * @param children - 文章内容区域的子组件。
 * @param paginationProps - 可选的分页组件属性，用于渲染分页功能。
 *
 * @returns 页面布局的 JSX 元素，包括主内容区和侧边栏作者卡片。
 */
export default function PostsPageTemplate({
  children,
  paginationProps,
}: {
  children: ReactNode;
  paginationProps?: PaginationProps;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <div className="max-w-7xl mx-auto flex gap-4 mt-24 flex-col md:flex-row md:px-4">
      <motion.main
        className="flex-1 card-base md:p-8 px-4 transition-colors duration-200 hover:border-border shadow-xs md:bg-surface-2 bg-surface-1 border-none md:border-solid flex flex-col"
        ref={ref}
        variants={cardVariants}
        initial="initial"
        animate={"animate"}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {children}
        {paginationProps && Pagination(paginationProps)}
      </motion.main>
      <aside className="flex flex-col gap-4 w-full md:w-auto items-center px-4 md:px-0">
        <AuthorCard className="w-full md:w-70" />
        <AnnouncementCard className="w-full md:w-70" />
      </aside>
    </div>
  );
}
