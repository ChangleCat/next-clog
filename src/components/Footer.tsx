"use client";

import { cn } from "@/utils/cn";
import { IClassName } from "@/utils/types";
import { useHydrated } from "@/utils/use-hydrated";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer({ className = "" }: IClassName) {
  const ESTABLISH_DAY = new Date(2025, 0, 24, 17);
  const AUTHOR = "Changle_cat";
  const hydrated = useHydrated();
  // 服务端与首帧用建站年份，水合后切到当前年份
  const year = hydrated ? new Date().getFullYear() : ESTABLISH_DAY.getFullYear();
  const duration = year === ESTABLISH_DAY.getFullYear() ? `${year}` : `2025 - ${year}`;
  const [passedTime, setPassedTime] = useState<string>("");
  const aClassName =
    "underline hover:text-primary transition-colors underline-offset-3";

  useEffect(() => {
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
    };
  }, []);
  return (
    <footer className={cn("text-sm md:px-4", className)}>
      <div className="card-base p-4 rounded-b-none hover:border-border w-full shadow-xl flex flex-col gap-1 items-center md:items-stretch">
        {/* 本站运行计时器 */}
        <div className="flex items-center">
          <Icon icon="carbon:time" />
          <pre> </pre>本站已运行：{passedTime}
        </div>
        {/* 其他信息 */}
        <div className="flex justify-between md:flex-row flex-col items-center gap-1">
          {/* 左边 */}
          <div className="flex gap-4">
            {/* 作者与版权 */}
            <div>
              © {duration} {AUTHOR}
            </div>
            {/* Powered By */}
            <div>
              Powered by{" "}
              <Link
                href="https://nextjs.org/"
                className={aClassName}
                target="_blank"
              >
                Next.js
              </Link>
            </div>
          </div>
          {/* 右边 */}
          <div>
            {/* 萌ICP */}
            <Link
              href="https://icp.gov.moe/?keyword=20259259"
              className={aClassName}
              target="_blank"
            >
              萌ICP备20259259号
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
