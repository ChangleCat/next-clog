'use client';

import { cn } from "@/utils/cn";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer({ className = "" }: IClassName) {
	const ESTABLISH_DAY = new Date(2025, 0, 24, 17);
	const AUTHOR = "Changle_cat";
	const [duration, setDuration] = useState<string>(ESTABLISH_DAY.getFullYear().toString());
	const [passedTime, setPassedTime] = useState<string>("");
	const aClassName = "underline hover:text-primary transition-colors underline-offset-3";

	useEffect(() => {
		const year = (new Date()).getFullYear();
		if (year !== ESTABLISH_DAY.getFullYear())
			setDuration(`2025 - ${year}`)


		function updateRunningTime() {
			const currentDate = new Date();
			const timeDiff = currentDate.getTime() - ESTABLISH_DAY.getTime(); // 计算时间差 (毫秒)

			const seconds = Math.floor(timeDiff / 1000) % 60;
			const minutes = Math.floor(timeDiff / (1000 * 60)) % 60;
			const hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
			const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

			// 构建要显示的字符串
			let runningTimeStr = " ";
			if (days > 0) {
				runningTimeStr += days + " 天 ";
			}
			if (hours > 0) {
				runningTimeStr += hours + " 小时 ";
			}
			if (minutes > 0) {
				runningTimeStr += minutes + " 分 ";
			}
			runningTimeStr += seconds + " 秒 ";
			setPassedTime(runningTimeStr);
		}

		const IntervalID = setInterval(updateRunningTime, 1000);

		return () => {
			clearInterval(IntervalID);
		}
	}, [])
	return (
		<footer className={cn("text-sm md:px-4", className)}>
			<div className="card-base p-4 rounded-b-none hover:border-border w-full shadow-xl">
				<div>© {duration} <Link href="/" className={aClassName}>{AUTHOR}</Link></div>
				<div className="flex items-center"><Icon icon="carbon:time" /><pre> </pre>本站已运行：{passedTime}</div>
				<div>Powered by <Link href="https://nextjs.org/" className={aClassName}>Next.js</Link></div>
			</div>
		</footer>
	)
}