import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

// 定义 props 的类型，限制 type 只能是预设的几种值
type NoteCardType = 'note' | 'tip' | 'important' | 'warning' | 'attention' | 'caution';

interface NoteCardProps {
  type?: NoteCardType;
  children: React.ReactNode;
}

// 定义类型到图标和颜色的映射关系
const iconMap: Record<NoteCardType, string> = {
  note: "carbon:information",
  tip: "carbon:idea",
  important: "carbon:warning",
  warning: "carbon:warning-alt",
  attention: "carbon:warning-alt",
  caution: "carbon:warning-hex",
};

// const colorMap: Record<NoteCardType, string> = {
//   note: 'blue', //
//   tip: 'green', //
//   important: 'purple', //
//   warning: 'yellow', //
//   attention: 'yellow', //
//   caution: 'red', //
// };

const styleMap: Record<NoteCardType, { container: string; title: string; }> = {
  note: {
    container: 'border-blue-500 bg-blue-100/100 dark:bg-blue-500/10',
    title: 'text-blue-700 dark:text-blue-300',
  },
  tip: {
    container: 'border-green-500 bg-green-100/100 dark:bg-green-500/10',
    title: 'text-green-700 dark:text-green-300',
  },
  important: {
    container: 'border-purple-500 bg-purple-100/100 dark:bg-purple-500/10',
    title: 'text-purple-700 dark:text-purple-300',
  },
  warning: {
    container: 'border-yellow-500 bg-yellow-100/100 dark:bg-yellow-500/10',
    title: 'text-yellow-700 dark:text-yellow-300',
  },
  attention: {
    container: 'border-yellow-500 bg-yellow-100/100 dark:bg-yellow-500/10',
    title: 'text-yellow-700 dark:text-yellow-300',
  },
  caution: {
    container: 'border-red-500 bg-red-100/100 dark:bg-red-500/10',
    title: 'text-red-700 dark:text-red-300',
  },
};

export default function NoteCard({ type = 'note', children }: NoteCardProps) {
  const icon = iconMap[type];
  const styles = styleMap[type];

  // 将 type 的首字母大写作为标题
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div
      // 使用完整的 class 字串
      className={`my-6 rounded-lg border-l-4 p-4 ${styles.container}`}
    >
      <div className={`mb-2 flex items-center gap-2 font-medium pl-2 ${styles.title}`}>
        <Icon icon={icon} className='w-5 h-5' />
        <span>{title}</span>
      </div>
      <div className="text-foreground/80 dark:text-foreground-dark/80 pl-2">
        {children}
      </div>
    </div>
  );
};