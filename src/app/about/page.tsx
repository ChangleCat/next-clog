import fs from "fs";

import { compileMdx } from "@/utils/mdx";
import { Metadata } from "next";
import AuthorCard from "@/components/side/AuthorCard";
import AnnouncementCard from "@/components/side/Announcement";
import TableOfContents from "@/components/TableOfContents";

export default async function AboutPage() {
	const content = fs.readFileSync("content/about.mdx", "utf8");
	const { content: mdxContent, frontmatter } = await compileMdx(content);
	return (
		<main className='max-w-7xl mx-auto flex gap-4 mt-24'>
			<div className="card-base flex-1 p-8 transition-colors duration-200 hover:border-border shadow-xl">
				<article className="prose dark:prose-invert">
					<div className="mt-8">
						{mdxContent}
					</div>
				</article>
			</div>
			<aside className='w-70 flex flex-col gap-4'>
				<AuthorCard className='p-8' />
				<AnnouncementCard />
				<TableOfContents />
			</aside>
		</main>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "关于",
		description: "想了解「常乐凯特」和「人偶使の小屋」？点进来看看吧...",
	}
}