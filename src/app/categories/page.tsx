import { getAllCategories } from "@/utils/posts-manager";
import { Metadata } from "next";
import Link from "next/link";
import PostsPageTemplate from "@/components/PostsPageTemplate";


export default async function CategoriesPage() {
	const CategoriesMap = getAllCategories();
	const allCategories = Array.from(CategoriesMap.keys()).sort((a, b) => {
		const A = CategoriesMap.get(a) ?? 0;
		const B = CategoriesMap.get(b) ?? 0;
		return B - A;
	});
	const numberOfAllCategories = allCategories.length;

	return (
		<PostsPageTemplate>
			{/* 头 */}
			<div className="flex items-start mb-4">
				<h1 className="font-bold text-3xl">分类</h1>
				<div className="text-text-muted text-sm font-bold">{numberOfAllCategories.toString()}</div>
			</div>
			{/* 文章列表 */}
			{allCategories.map((category) => {
				const count = CategoriesMap.get(category);
				return (
					<Link className="flex justify-between mb-3 card-base p-3 md:ml-1 hover:scale-101 hover:shadow-xl transition-all" href={`/categories/${category}`} key={category}>
						<div className="flex">
							<h1>{category}</h1>
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
		title: "分类",
		description: "「人偶使の小屋」的分类页面"
	}
}