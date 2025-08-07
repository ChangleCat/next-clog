import { getAllTags } from "@/utils/posts-manager";
import { Metadata } from "next";
import Link from "next/link";
import PostsPageTemplate from "@/components/PostsPageTemplate";


export default async function TagsPage() {
	const TagsMap = getAllTags();
	const allTags = Array.from(TagsMap.keys()).sort((a, b) => {
		const A = TagsMap.get(a) ?? 0;
		const B = TagsMap.get(b) ?? 0;
		return B - A;
	});
	const numberOfAllTags = allTags.length;

	return (
		<PostsPageTemplate>
			{/* 头 */}
			<div className="flex items-start mb-4">
				<h1 className="font-bold text-3xl">标签</h1>
				<div className="text-text-muted text-sm font-bold">{numberOfAllTags.toString()}</div>
			</div>
			{/* 文章列表 */}
			{allTags.map((tag) => {
				const count = TagsMap.get(tag);
				return (
					<Link className="flex justify-between mb-3 card-base p-3 sm:ml-1 hover:scale-101 hover:shadow-xl transition-all" href={`/tags/${tag}`} key={tag}>
						<div className="flex">
							<h1>{tag}</h1>
						</div>
						<div className="flex items-center justify-end text-text-muted min-w-16">{count}</div>
					</Link>
				)
			})}
		</PostsPageTemplate>
	)
}


export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "标签",
		description: "「人偶使の小屋」的标签页面"
	}
}