import fs from "fs";

import { compileMdx } from "@/utils/mdx";
import { Metadata } from "next";
import AuthorCard from "@/components/side/AuthorCard";
import AnnouncementCard from "@/components/side/Announcement";
import ArticleLayout from "@/components/ArticleLayout";

export default async function NowPage() {
  const content = fs.readFileSync("content/now.mdx", "utf8");
  const { content: mdxContent } = await compileMdx(content);
  return (
    <ArticleLayout
      sidebar={
        <>
          <AuthorCard className="w-full md:w-70" />
          <AnnouncementCard className="w-full md:w-70" />
        </>
      }
    >
      {mdxContent}
    </ArticleLayout>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "如今",
    description: "想了解「常乐凯特」最近(?存疑)在干什么？点进来看看吧...",
  };
}
