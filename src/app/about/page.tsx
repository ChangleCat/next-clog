import fs from "fs";
import { compileMdx } from "@/utils/mdx";
import { Metadata } from "next";
import AuthorCard from "@/components/side/AuthorCard";
import AnnouncementCard from "@/components/side/Announcement";
import TableOfContents from "@/components/side/TableOfContents";
import ArticleLayout from "@/components/ArticleLayout";

export default async function AboutPage() {
  const content = fs.readFileSync("content/about.mdx", "utf8");
  const { content: mdxContent } = await compileMdx(content);
  return (
    <ArticleLayout
      sidebar={
        <>
          <AuthorCard className="w-full md:w-70" />
          <AnnouncementCard className="w-full md:w-70" />
          <TableOfContents className="w-full md:w-70" />
        </>
      }
    >
      {mdxContent}
    </ArticleLayout>
  );
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "关于",
		description: "想了解「常乐凯特」和「人偶使の小屋」？点进来看看吧...",
	}
}