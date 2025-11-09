'use client';

import { motion } from 'framer-motion';

// 这个组件会在 Next.js 路由切换、数据加载时自动显示
export default function Loading() {
  return (
    // 使用 fixed 定位和高 z-index 确保它覆盖在整个页面之上
    <div className="fixed top-0 left-0 w-full h-screen bg-surface-1 flex justify-center items-center z-99999">
      <div className="flex items-start justify-center pt-40 h-full">
        <div className="flex space-x-2 p-5 rounded-full">
            {/* 三个跳动的点 */}
            <motion.span
                className="w-3 h-3 bg-text-muted rounded-full"
                animate={{ y: ["0%", "-100%", "0%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            />
            <motion.span
                className="w-3 h-3 bg-text-muted rounded-full"
                animate={{ y: ["0%", "-100%", "0%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.span
                className="w-3 h-3 bg-text-muted rounded-full"
                animate={{ y: ["0%", "-100%", "0%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
        </div>
      </div>
    </div>
  );
}