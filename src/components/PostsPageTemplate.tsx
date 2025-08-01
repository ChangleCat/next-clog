import { ReactNode } from "react"
import AuthorCard from "./side/AuthorCard";
import Pagination, { PaginationProps } from "./Pagination";
import AnnouncementCard from "./side/Announcement";


/**
 * PostsPageTemplate 组件用于展示文章页面的基础布局，包括主内容区、分页组件和作者信息卡片。
 *
 * @param children - 文章内容区域的子组件。
 * @param paginationProps - 可选的分页组件属性，用于渲染分页功能。
 *
 * @returns 页面布局的 JSX 元素，包括主内容区和侧边栏作者卡片。
 */
export default function PostsPageTemplate({ children, paginationProps }: {
    children: ReactNode,
    paginationProps?: PaginationProps
}) {
    return (
        <div className="max-w-7xl sm:mx-auto mx-0 sm:mt-24 mt-18 flex gap-4 items-stretch sm:flex-row flex-col">
            <main className="flex-1 flex flex-col items-stretch gap-4">
                <div className="card-base p-8 flex flex-col items-stretch hover:border-border shadow-xl">
                    {children}
                </div>
                {paginationProps && Pagination(paginationProps)}
            </main>
            <aside className="w-70 flex flex-col gap-4">
                <AuthorCard className="w-full p-8" />
                <AnnouncementCard className="w-full"/>
            </aside>
        </div>
    )
}