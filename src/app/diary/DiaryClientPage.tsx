"use client";

import { easeInOut, motion } from "framer-motion";
import { DiaryEntry } from "./page"; // 从 page.tsx 导入类型
import { cn } from "@/utils/cn";
import { useRef } from "react";

// 客户端的辅助函数来格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const localDate = date.toLocaleDateString("zh-CN");
  const localTime = date.toLocaleTimeString("zh-CN");
  // 返回 YYYY-MM-DD 格式
  return `${localDate} ${localTime}`;
}

export default function DiaryClientPage({ entries }: { entries: DiaryEntry[] }) {
  "use no memo";
  const noteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:number)=>({ // (i: number) 允许交错动画
      opacity: 1,
      y: 0,
      transition: {
        ease: easeInOut,
        duration: 0.5,
        delay: 0.1 * i
      },
    })
  } as const;

  // 把 refs 放在组件顶层，遵守 Hooks 规则
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  // 处理没有日记的情况
  if (entries.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-text-muted">今天没有人偶留下日记...</p>
      </div>
    );
  }

  return (
    // 3. 瀑布流容器
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {entries.map((entry, i) => {
        return (
        <motion.div
          key={entry.id}
          className={cn("break-inside-avoid-column p-4 mb-6 rounded-lg border bg-surface-2 border-border shadow",
            "hover:shadow-md hover:-translate-y-1"
          )}
          custom={i} // 将索引传递给 variants
          ref={(el) => { refs.current[i] = el; }}
          initial="hidden"
          animate="visible"
          variants={noteVariants}
          // 使用顶层 refs 访问对应元素，避免在 map 回调内调用 Hook
          onAnimationComplete={() => refs.current[i]?.classList.add("transition-transform")}
        >
          {/* 假设你的 content 是 HTML。
            如果只是纯文本，请使用: <p className="whitespace-pre-wrap">{entry.content}</p>
          */}
          <p className="whitespace-pre-wrap">{entry.content}</p>

          {/* 日期 */}
          <time className="block text-xs text-text-muted mt-3 pt-2 border-t border-border/50">
            {formatDate(entry.created_at)}
          </time>
        </motion.div>
      )})}
    </div>
  );
}
