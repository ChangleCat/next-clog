'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
        // 初始状态：页面完全透明
        initial={{ opacity: 0 }}
        // 动画状态：页面变得不透明
        animate={{ opacity: 1 }}
        // 过渡效果：持续 0.5 秒，使用平滑的缓动曲线
        transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
        {children}
    </motion.div>
  );
}