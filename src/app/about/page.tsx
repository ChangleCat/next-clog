import fs from "fs";

import { compileMdx } from "@/utils/mdx";
import { Metadata } from "next";
import AuthorCard from "@/components/side/AuthorCard";
import AnnouncementCard from "@/components/side/Announcement";
import TableOfContents from "@/components/side/TableOfContents";
import ArtalkComment from "@/components/ArtalkComment";

export default async function AboutPage() {
	const content = fs.readFileSync("content/about.mdx", "utf8");
	const { content: mdxContent } = await compileMdx(content);
	return (
		<main className="max-w-7xl mx-auto flex gap-4 mt-24 flex-col md:flex-row md:px-4">
			<div className="card-base flex-1 md:p-8 px-4 transition-colors duration-200 hover:border-border shadow-xl md:bg-surface-2 bg-surface-1 border-none md:border-solid">
				<article className="prose dark:prose-invert">
					<div className="mt-8">
						{mdxContent}
					</div>
				</article>
				<ArtalkComment className="mt-8"/>
			</div>
			<aside className="flex flex-col gap-4 w-full md:w-auto items-center px-4 md:px-0">
				<AuthorCard className="w-full md:w-70" />
				<AnnouncementCard className="w-full md:w-70" />
				<TableOfContents className="w-full md:w-70" />
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