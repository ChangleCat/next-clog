import PostsPageTemplate from "@/components/PostsPageTemplate";
import { getAllCategories, getPaginatedPosts } from "@/utils/posts-manager";
import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

const POSTS_PER_PAGE = 10;

export default async function TagPage({ params, searchParams }: {
	params: Promise<{ category: string }>,
	searchParams?: Promise<{ page?: string }>
}) {
	const category = decodeURIComponent((await params).category);
	const currentPage = Number((await searchParams)?.page) || 1;

	const numberOfTaggedPosts = getAllCategories().get(category) ?? 0;

	const { posts, totalPages } = getPaginatedPosts(
		currentPage,
		POSTS_PER_PAGE,
		false,
		(post)=>{
			const postCategories = post.frontmatter.categories??[];
			return postCategories.includes(category);
		}
	);

	return (
		<PostsPageTemplate paginationProps={{currentPage, totalPages, currentURL:"/posts"}}>
      {/* 头 */}
          <div className="flex items-start mb-4">
            <h1 className="font-bold text-3xl">{category}</h1>
            <div className="text-text-muted text-sm font-bold">{numberOfTaggedPosts.toString()}</div>
          </div>
          {/* 文章列表 */}
          {posts.map((post, idx, posts) => {
            type POST = typeof post;
            const getYear = (post: POST) => {
              return (new Date(post.frontmatter.date)).getFullYear()
            }
            const isNewYear = idx === 0 || getYear(posts[idx - 1]) !== getYear(post);
            const title = post.frontmatter.title;
            const date = post.frontmatter.date.slice(5);
            const category = (post.frontmatter.categories??["未定义"])[0];
            return (
              <Fragment key={post.slug}>
                {isNewYear && <div className="text-text-muted mb-1 font-bold">{getYear(post)}</div>}
                <Link className="flex justify-between mb-3 card-base p-3 sm:ml-1 hover:scale-101 hover:shadow-xl transition-all" href={`/posts/${post.slug}`}>
                  <div className="flex">
                    <div className="text-text-muted mr-3 min-w-9 flex items-center">{category}</div>
                    <h1>{title}</h1>
                  </div>
                  
                  <time className="flex items-center justify-end text-text-muted min-w-16">{date}</time>
                </Link>
              </Fragment>
            )
          })}
    </PostsPageTemplate>
	)
}


export async function generateMetadata({ params }: {
	params: Promise<{ category: string }>
}): Promise<Metadata> {
	const category = decodeURIComponent((await params).category);
	return {
		title: `${category}`,
		description: `「人偶使の小屋」的 ${category} 标签页面`
	}
}