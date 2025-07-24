'use client';

import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import { EventHandler, use, useEffect, useState } from "react";

export function Header() {
    const [isTop, setIsTop] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const themeChange = (isDark: boolean) => {
        document.documentElement.classList.toggle("dark", isDark);
        setIsDarkMode(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    const handleThemeToggle = () => {
        themeChange(!isDarkMode);
    }

    useEffect(() => {
        // 主题选取
        // 检查 localStorage 中是否有主题设置
        const prevTheme = localStorage.getItem("theme");
        if (prevTheme !== null) {
            // 如果有，应用该主题
            themeChange(prevTheme === "dark");
        } else {
            // 如果没有，检查用户的系统偏好
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            themeChange(prefersDark);
        }

        // 监听滚动事件，判断是否在顶部
        const handleScroll = () => {
            setIsTop(window.scrollY === 0);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <header className={cn("bg-surface-2 w-full p-4 shadow-md rounded-b-md text-[18px] fixed top-0 z-1000",
            "flex justify-center items-center",
            isTop && "bg-surface-2/5 text-text-main-dark"
        )}>
            <div className="flex justify-between items-center max-w-7xl w-full">
                <div><Link href={"/"} className="rounded-sm p-3 font-bold text-xl">人偶使の小屋</Link></div>
                <nav className="hidden md:block">
                    <ul className={cn("flex gap-4",
                        "[&>li>a]:p-2 [&>li>a]:rounded-md [&>li>a]:flex [&>li>a]:items-center",
                        "[&>li>a]:hover:bg-button-hover [&>li>a]:hover:text-text-main-light",)}>
                        <li><Link href={"/"}>首页</Link></li>
                        <li><Link href={"/posts"}>归档</Link></li>
                        <li><Link href={"/tags"}>标签</Link></li>
                        <li><Link href={"/categories"}>分类</Link></li>
                        <li><Link href={"/now"}>如今</Link></li>
                        <li><Link href={"/about"}>关于</Link></li>
                    </ul>
                </nav>
                <div>
                    <button type="button" className={cn("p-2 rounded-md hover:bg-button-hover transition-colors duration-200 cursor-pointer active:scale-95")}
                        onClick={handleThemeToggle}>
                        {isDarkMode ?
                            <Icon icon="material-symbols:light-mode-rounded" /> :
                            <Icon icon="material-symbols:dark-mode-rounded" />}
                    </button>
                </div>
            </div>
        </header>
    )
}