// src/components/side/TableOfContents.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { IClassName } from '@/utils/types';
import { Icon } from '@iconify/react/dist/iconify.js';

// 定义标题的数据结构
interface Heading {
  id: string;
  level: number;
  text: string;
}

/**
 * 文章目录组件
 * 自动从文章内容中提取 h2 和 h3 标题，并生成可交互的目录。
 * 特性：
 * 1. 点击标题可平滑滚动到对应位置。
 * 2. 滚动页面时，自动高亮当前阅读位置对应的标题。
 * 3. 当页面滚动到顶部时，目录会固定在侧边栏。
 */
export default function TableOfContents({ className }: IClassName) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  // 效果 1: 组件加载时，扫描文章内容，提取所有 h2 和 h3 标题
  useEffect(() => {
    // next-mdx-remote 会为标题生成 id，我们直接获取即可
    const headingElements = Array.from(
      document.querySelectorAll('.prose h2, .prose h3')
    ) as HTMLHeadingElement[];

    const extractedHeadings = headingElements.map(heading => ({
      id: heading.id,
      level: parseInt(heading.tagName.substring(1), 10), // 从 'h2' -> 2
      text: heading.innerText,
    }));

    setHeadings(extractedHeadings);
  }, []); // 空依赖数组，仅在组件挂载时运行一次

  // 效果 2: 监听标题元素的可见性，实现滚动高亮
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    // 使用 IntersectionObserver API 来检测哪个标题在视口中
    observer.current = new IntersectionObserver(
      (entries) => {
        // 找到所有当前可见的条目
        const visibleEntries = entries.filter(e => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // 优先高亮最靠近视口顶部的条目
          setActiveId(visibleEntries[0].target.id);
        }
      },
      // rootMargin 设置一个偏移量，让标题在进入屏幕靠上位置时就被视为"active"
      { rootMargin: '-20% 0px -80% 0px' } 
    );

    const elements = document.querySelectorAll('.prose h2, .prose h3');
    elements.forEach(elem => observer.current?.observe(elem));

    // 组件卸载时清理 observer
    return () => observer.current?.disconnect();
  }, [headings]); // 当 headings 列表更新时重新设置 observer

  // 如果没有提取到任何标题，则不渲染该组件
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn("card-base p-6 shadow-xl hover:border-border sticky top-24", className)}>
      <h2 className="flex items-center font-bold gap-1 mb-4">
        <Icon icon="mdi:format-list-bulleted" />
        目录
      </h2>
      <ul className="space-y-2">
        {headings.map(heading => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  const headerOffset = 100; // 偏移量(像素), 您可以根据导航栏的实际高度微调此值
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;
              
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className={cn(
                'transition-colors duration-200 text-text-muted hover:text-primary',
                {
                  'text-primary font-semibold': activeId === heading.id, // 高亮活动标题
                  'pl-4': heading.level === 3, // 为 h3 标题添加缩进
                }
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
