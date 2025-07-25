// components/mdx/NoteCard.tsx
import React from 'react';

// 定义 props 的类型，限制 type 只能是预设的几种值
type NoteCardType = 'note' | 'tip' | 'important' | 'warning' | 'attention' | 'caution';

interface NoteCardProps {
  type?: NoteCardType;
  children: React.ReactNode;
}

// 定义类型到图标和颜色的映射关系
const iconMap: Record<NoteCardType, string> = {
  note: 'i-carbon-information', //
  tip: 'i-carbon-idea', //
  important: 'i-carbon-warning', //
  warning: 'i-carbon-warning-alt', //
  attention: 'i-carbon-warning-alt', //
  caution: 'i-carbon-warning-hex', //
};

const colorMap: Record<NoteCardType, string> = {
  note: 'blue', //
  tip: 'green', //
  important: 'purple', //
  warning: 'yellow', //
  attention: 'yellow', //
  caution: 'red', //
};

const NoteCard: React.FC<NoteCardProps> = ({ type = 'note', children }) => {
  const color = colorMap[type]; //
  const icon = iconMap[type]; //

  // 将 type 的首字母大写作为标题
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div 
      className={`my-6 rounded-lg border-l-4 p-4 border-${color}-500 bg-${color}-100/100 dark:bg-${color}-500/10`} //
    >
      <div className={`mb-2 flex items-center gap-2 font-medium pl-2 text-${color}-700 dark:text-${color}-300`}> {/* */}
        <div className={`w-5 h-5 ${icon}`}></div> {/* */}
        <span>{title}</span>
      </div>
      <div className="text-foreground/80 dark:text-foreground-dark/80 pl-2"> {/* */}
        {children}
      </div>
    </div>
  );
};

export default NoteCard;