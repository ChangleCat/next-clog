// components/mdx/Timeline.tsx
import React from "react";

interface TimelineProps {
  children: React.ReactNode;
}

// 这是 Timeline 的容器组件
export const Timeline: React.FC<TimelineProps> = ({ children }) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700 pl-9">
      {" "}
      {/* */}
      {children}
    </ol>
  );
};

interface TimelineItemProps {
  time: string;
  children: React.ReactNode;
}

// 这是每个时间线节点的组件
export const TimelineItem: React.FC<TimelineItemProps> = ({
  time,
  children,
}) => {
  return (
    <li className="mb-10 ms-4">
      {" "}
      {/* */}
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>{" "}
      {/* */}
      <time className="mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {" "}
        {/* */}
        {time}
      </time>
      <div className="timeline">
        {" "}
        {/* */}
        {children}
      </div>
    </li>
  );
};
