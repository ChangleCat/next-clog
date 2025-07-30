'use client';

import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
    const [isTop, setIsTop] = useState(true);               // for 样式
    const [isDarkMode, setIsDarkMode] = useState(false);    // for 样式
    const [isMounted, setIsMounted] = useState(false);      // for 水合不匹配
    // 如果是主页，则改变不在top时的字体颜色
    //* 需要注意，usePathname 本身就是 hook，不需要再用 useState 包装，效果适得其反
    const isHomePage = usePathname();   // for 样式

    const themeChange = (isDark: boolean) => {
        document.documentElement.classList.toggle("dark", isDark);
        setIsDarkMode(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    const handleThemeToggle = () => {
        themeChange(!isDarkMode);
    }

    useEffect(() => {
        setIsMounted(true);

        // 主题选取
        // 检查 localStorage 中是否有主题设置
        const prevTheme = localStorage.getItem("theme");
        if (prevTheme !== null) {
            // 如果有，应用该主题
            themeChange(prevTheme === "dark");
        } else {
            // 如果没有，默认使用暗色主题
            themeChange(true);
        }

        // 监听滚动事件，判断是否在顶部
        const handleScroll = () => {
            setIsTop(window.scrollY === 0);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <header className={cn("bg-surface-2 w-full p-4 rounded-b-md fixed top-0 z-500 hover:backdrop-blur-[1px]",
            "flex justify-center items-center transition-all duration-200",
            isTop && "bg-surface-2/5",
            (isTop && (isHomePage==='/')) && "text-text-main-dark"
        )}>
            <div className="flex justify-between items-center max-w-7xl w-full">
                <Link href={"/"} className="font-bold text-xl block relative outline-none" aria-label="主页">
                    <div className="relative px-2 py-0.5">
                        人偶使の小屋
                        <div className={cn("absolute w-full h-full rounded-2xl bg-button top-0 left-0 opacity-0 transition-opacity",
                            "hover:opacity-100 hover:text-text-main-dark",
                            "flex justify-center items-center"
                        )}>
                            <Icon icon="material-symbols:home-rounded" />
                        </div>
                    </div>
                </Link>
                <nav className="hidden md:block">
                    <ul className={cn("flex gap-4",
                        "[&>li>a]:p-2 [&>li>a]:py-1 [&>li>a]:rounded-3xl [&>li>a]:flex [&>li>a]:items-center",
                        "[&>li>a]:hover:bg-button-hover [&>li>a]:hover:text-text-main-dark [&>li>a]:transition-colors",)}>
                        <li><Link href={"/"}>站点</Link></li>
                        <li><Link href={"/posts"}>归档</Link></li>
                        <li><Link href={"/tags"}>标签</Link></li>
                        <li><Link href={"/categories"}>分类</Link></li>
                        <li><Link href={"/now"}>如今</Link></li>
                        <li><Link href={"/about"}>关于</Link></li>
                    </ul>
                </nav>
                <div>
                    {isMounted &&
                        <button type="button" className={cn("p-2 rounded-xl hover:bg-button-hover hover:text-text-main-dark transition-colors duration-200 cursor-pointer active:scale-95")}
                            onClick={handleThemeToggle}>
                            {isDarkMode ?
                                <Icon icon="material-symbols:light-mode-rounded" /> :
                                <Icon icon="material-symbols:dark-mode-rounded" />}
                        </button>
                    }
                </div>
            </div>
        </header>
    )
}