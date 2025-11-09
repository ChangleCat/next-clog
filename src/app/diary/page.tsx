import { CommonLayout } from "@/layouts/index";
import AuthorCard from "@/components/side/AuthorCard";
import AnnouncementCard from "@/components/side/Announcement";
import { Metadata } from "next";
import DiaryClientPage from "./DiaryClientPage";

export type DiaryEntry = {
  id: number;
  content: string; // 假设这是 HTML 或纯文本
  created_at: string; // ISO 日期字符串
  updated_at: string;
  published: boolean;
};

const apiURL = "https://api.changlecat.me/hourai-diary/diary/public"
// 创建一个函数来获取数据
// 这个 fetch 会在构建时运行 (SSG)
async function getDiaryEntries(): Promise<DiaryEntry[]> {
  try {
    const res = await fetch(
      apiURL,
      {
        next: { revalidate: false }, // 告诉 Next.js 依赖 Vercel deploy hook 重建，而不是 ISR
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch diary entries");
      return [];
    }

    const entries: DiaryEntry[] = await res.json();

    // 过滤并排序数据
    return entries
      .filter((entry) => entry.published && entry.content.trim() !== "")
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  } catch (error) {
    console.error(error);
    return []; // 发生错误时返回空数组
  }
}

// 3. 页面组件 (服务器组件)
export default async function DiaryPage() {
  const entries = await getDiaryEntries();
  console.log(`[Hourai's diary]: totally ${entries.length} diaries.`);
  
  return (
    // 使用你现有的 CommonLayout
    <CommonLayout
      sidebar={
        <>
          <AuthorCard className="w-full md:w-70" />
          <AnnouncementCard className="w-full md:w-70" />
        </>
      }
    >
      {/* 你可以重用卡片样式来包裹主要内容 */}
      <h1 className="font-bold text-3xl mb-4">蓬莱の日记</h1>
      <p className="text-text-muted mb-8">一些随手记下的、飘在空中的思绪。</p>

      {/* 将数据传递给客户端组件进行渲染 */}
      <DiaryClientPage entries={entries} />
    </CommonLayout>
  );
}

// 4. 添加页面元数据
export const metadata: Metadata = {
  title: "蓬莱の日记",
  description: "一些随手记下的、飘在空中的思绪。",
};

// const entriesExample = [
//     {
//       id: 1,
//       content:
//         "今天的天空特别蓝，让我想阳光透过窗户洒在书桌上，整个房间都充满了温暖的气息。",
//       created_at: "2024-11-09T08:30:00Z",
//       updated_at: "2024-11-09T08:30:00Z",
//       published: true,
//     },
//     {
//       id: 2,
//       content:
//         "读完了村上春树的新书，有些句子让人回味良久。生活就像是一场小小的冒险，永远不知道下一个转角会遇见什么。",
//       created_at: "2024-11-08T15:20:00Z",
//       updated_at: "2024-11-08T16:45:00Z",
//       published: true,
//     },
//     {
//       id: 3,
//       content:
//         "最近开始学习插花，才发现原来花艺里藏着这么多的学问。每一朵花都有它独特的语言，每一个搭配都在诉说着不同的故事。",
//       created_at: "2024-11-07T10:15:00Z",
//       updated_at: "2024-11-07T10:15:00Z",
//       published: true,
//     },
//     {
//       id: 4,
//       content:
//         "下班路上看到一只小猫在追逐着落叶，那认真的样子让我忍不住停下来观察了好一会。生活中的小确幸往往就藏在这些细微的时刻里。",
//       created_at: "2024-11-06T18:45:00Z",
//       updated_at: "2024-11-06T19:00:00Z",
//       published: true,
//     },
//   ] satisfies DiaryEntry[];