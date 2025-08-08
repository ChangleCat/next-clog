'use client';

import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import { MouseEventHandler, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type InternalLink = {
	name:string;
	href:string;
}

const InternalLinks : InternalLink[] = [
	{
		name: "站点",
		href: "/"
	},
	{
		name: "归档",
		href: "/posts"
	},
	{
		name: "标签",
		href: "/tags"
	},
	{
		name: "分类",
		href: "/categories"
	},
	{
		name: "如今",
		href: "/now"
	},
	{
		name: "关于",
		href: "/about"
	}
]

export default function Header() {
	const [isTop, setIsTop] = useState(true);               // for 样式
	const [isDarkMode, setIsDarkMode] = useState(false);    // for 样式
	const [isMounted, setIsMounted] = useState(false);      // for 水合不匹配
	const [isMenuFolded, setIsMenuFolded] = useState(true);
	// 如果是主页，则改变不在top时的字体颜色
	//* 需要注意，usePathname 本身就是 hook，不需要再用 useState 包装，效果适得其反
	const pathname = usePathname();   // for 样式

	const themeChange = (isDark: boolean) => {
		document.documentElement.classList.toggle("dark", isDark);
		setIsDarkMode(isDark);
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}

	const handleThemeToggle = () => {
		themeChange(!isDarkMode);
	}

	const handleFoldToggle = () => {
		setIsMenuFolded((state) => !state);
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
		<>
			<header className={cn("bg-surface-2 w-full p-4 rounded-b-md fixed top-0 z-500 hover:backdrop-blur-[1px]",
				"flex justify-center items-center transition-all duration-200",
				isTop && "bg-surface-2/5",
				(isTop && (pathname === '/')) && "text-text-main-dark"
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
							{InternalLinks.map((value)=><li key={value.name}><Link href={value.href}>{value.name}</Link></li>)}
						</ul>
					</nav>
					<div className="flex gap-2">
						{isMounted &&
							<button type="button" className={cn("p-2 rounded-xl hover:bg-button-hover hover:text-text-main-dark transition-colors cursor-pointer active:scale-95")}
								onClick={handleThemeToggle}>
								{isDarkMode ?
									<Icon icon="material-symbols:light-mode-rounded" /> :
									<Icon icon="material-symbols:dark-mode-rounded" />}
							</button>

						}
						<MenuButton onClick={handleFoldToggle} isMenuFolded={isMenuFolded} />
					</div>
				</div>
			</header>
			{/* Menu */}
			<Menu isMenuFolded={isMenuFolded} toggleFunction={handleFoldToggle} currentPathname={pathname}/>
		</>
	)
}

function MenuButton({ onClick, isMenuFolded }: {
	onClick: MouseEventHandler,
	isMenuFolded: boolean
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			title="Menu"
			className={cn("relative w-8 h-8 rounded-xl cursor-pointer",
				"hover:bg-button-hover transition-colors active:scale-95",
				"md:hidden",
				"[&>div]:w-4 [&>div]:h-[2px] [&>div]:bg-text-main hover:[&>div]:bg-text-main-dark",
				"[&>div]:absolute [&>div]:rounded [&>div]:top-1/2 [&>div]:left-1/2",
				"[&>div]:transition-transform")}>
			<div className={
				cn(isMenuFolded ?
					"-translate-x-1/2 translate-y-[calc(-50%-0.25rem)]" :
					"-translate-x-1/2 -translate-y-1/2 rotate-45")
			}></div>
			<div className={
				cn(isMenuFolded ?
					"-translate-x-1/2 -translate-y-1/2" :
					"-translate-x-1/2 -translate-y-1/2 rotate-45 opacity-0")
			}></div>
			<div className={
				cn(isMenuFolded ?
					"-translate-x-1/2 translate-y-[calc(-50%+0.25rem)]" :
					"-translate-x-1/2 -translate-y-1/2 -rotate-45")
			}></div>
		</button>
	)
}

function Menu({ isMenuFolded, toggleFunction, currentPathname }: {
	isMenuFolded: boolean,
	toggleFunction: () => void,
	currentPathname: string
}) {
	return (
		<div
			className={cn("fixed top-0 left-0 h-[100svh] w-full transition-all z-9999 md:hidden",
				isMenuFolded ?
					"pointer-events-none" :
					"backdrop-blur-sm"
			)}
			onMouseDown={(event) => {
				const ele = event.target as HTMLElement;
				if (!ele.closest("#menu")) {
					toggleFunction();
				}
			}}
		>
			<div
				id="menu"
				className={cn("h-full w-5/7 absolute right-0 transition-transform bg-surface-1 border-1 border-border",
					"rounded-none",
					isMenuFolded ?
						"translate-x-full" :
						""
				)}
			>
				<nav className="p-4">
					<ul className={cn("flex gap-4 flex-col items-stretch",
						"[&>li>a]:p-4 [&>li>a]:py-2 [&>li>a]:rounded-xl [&>li>a]:flex [&>li>a]:items-center [&>li>a]:justify-between",
						"[&>li>a]:hover:bg-button-hover [&>li>a]:transition-colors",
						"")}>
						{InternalLinks.map((value)=>
						<li key={value.name}>
							<Link className={cn("card-base",currentPathname===value.href&&"bg-primary text-text-main-light")} href={value.href} onClick={toggleFunction}>
							{value.name}
							<Icon icon="material-symbols:chevron-right-rounded"/>
							</Link>
						</li>
						)}
					</ul>
				</nav>
			</div>
		</div>
	)
}