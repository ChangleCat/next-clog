"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

// 定义 Props 类型
interface GitHubCardProps {
  owner: string;
  repo: string;
}

// 定义从 GitHub API 返回的数据结构类型
interface RepoData {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

// 语言颜色映射，可以根据需要自行添加更多
const languageColorMap: { [key: string]: string } = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Python: "bg-green-500",
  HTML: "bg-orange-500",
  CSS: "bg-indigo-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
  Shell: "bg-gray-400",
  default: "bg-gray-300",
};

const getLanguageColor = (language: string | null): string => {
  if (!language) return languageColorMap.default;
  return languageColorMap[language] || languageColorMap.default;
};

// 骨架屏组件，用于加载时显示
const CardSkeleton: React.FC = () => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 w-full max-w-md mx-auto animate-pulse">
    <div className="flex items-center mb-3">
      <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
      <div className="h-5 w-2/4 rounded bg-gray-300 dark:bg-gray-600"></div>
    </div>
    <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600 mb-2"></div>
    <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
    <div className="flex items-center mt-4 text-sm">
      <div className="h-4 w-1/4 rounded bg-gray-300 dark:bg-gray-600 mr-4"></div>
      <div className="h-4 w-1/4 rounded bg-gray-300 dark:bg-gray-600 mr-4"></div>
      <div className="h-4 w-1/4 rounded bg-gray-300 dark:bg-gray-600"></div>
    </div>
  </div>
);

export function GitHubCard({ owner, repo }: GitHubCardProps) {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      // 在组件卸载或 props 变化时，重置状态
      setLoading(true);
      setError(null);
      setRepoData(null);

      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "Repository not found. Check the owner and repo name."
            );
          }
          if (response.status === 403) {
            throw new Error("API rate limit exceeded. Please try again later.");
          }
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data: RepoData = await response.json();
        setRepoData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [owner, repo]); // 当 owner 或 repo 改变时，重新获取数据

  if (loading) {
    return <CardSkeleton />;
  }

  if (error) {
    return (
      <div className="border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20 rounded-lg p-4 w-full max-w-md mx-auto text-red-600 dark:text-red-400">
        <p className="font-semibold">Error loading GitHub card:</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!repoData) {
    return null; // 或者返回一个“未找到”的组件
  }

  return (
    <a
      href={repoData.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-md mx-auto my-6 no-underline" // `my-6 no-underline` 适配博客环境
    >
      <div
        className="flex flex-col h-full border border-border rounded-lg p-4
                      text-text-muted
                      hover:shadow-lg
                      transition-all duration-300"
      >
        {/* 卡片头部 */}
        <div className="flex items-center mb-3">
          <Icon
            icon="ph:git-fork-bold"
            className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
          />
          <span className="font-bold text-lg text-primary">
            {repoData.full_name}
          </span>
        </div>

        {/* 描述 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 grow">
          {repoData.description || "No description provided."}
        </p>

        {/* 底部信息 */}
        <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          {repoData.language && (
            <div className="flex items-center mr-4">
              <span
                className={`w-3 h-3 rounded-full mr-1.5 ${getLanguageColor(
                  repoData.language
                )}`}
              ></span>
              <span>{repoData.language}</span>
            </div>
          )}
          <div className="flex items-center mr-4">
            <Icon icon="ph:star-bold" className="w-4 h-4 mr-1" />
            <span>{repoData.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Icon icon="ph:git-fork-bold" className="w-4 h-4 mr-1" />
            <span>{repoData.forks_count.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
