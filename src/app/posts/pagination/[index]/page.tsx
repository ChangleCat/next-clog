import { getNumberOfPosts, getPaginatedPosts } from "@/utils/posts-manager";
import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import PostsPageTemplate from "@/components/PostsPageTemplate";

const POSTS_PER_PAGE = 10;

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, POSTS_PER_PAGE, false);
  return Array.from({ length: totalPages }, (_, index) => ({
    index: (index + 1).toString(),
  }));
}

export const metadata: Metadata = {
  title: '文章归档',
  description: '「人偶使の小屋」的文章归档页面',
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ index: number }>;
}) {
  const currentPage = Number((await params).index);
  const numberOfAllPosts = getNumberOfPosts();
  const { posts, totalPages } = getPaginatedPosts(
    currentPage,
    POSTS_PER_PAGE,
    false
  );
  return (
    <PostsPageTemplate
      paginationProps={{ currentPage, totalPages, URLTemplate:"/posts/page/{index}" }}
    >
      {/* 头 */}
      <div className="flex items-start mb-4">
        <h1 className="font-bold text-3xl">文章</h1>
        <div className="text-text-muted text-sm font-bold">
          {numberOfAllPosts.toString()}
        </div>
      </div>
      {/* 文章列表 */}
      {posts.map((post, idx, posts) => {
        type POST = typeof post;
        const getYear = (post: POST) => {
          return new Date(post.frontmatter.date).getFullYear();
        };
        const isNewYear =
          idx === 0 || getYear(posts[idx - 1]) !== getYear(post);
        const title = post.frontmatter.title;
        const date = post.frontmatter.date.slice(5);
        const category = (post.frontmatter.categories ?? ["未定义"])[0];
        return (
          <Fragment key={post.slug}>
            {isNewYear && (
              <div className="text-text-muted mb-1 font-bold">
                {getYear(post)}
              </div>
            )}
            <Link
              className="flex justify-between mb-3 card-base p-3 md:ml-1 hover:scale-101 hover:shadow-xl transition-all"
              href={`/posts/${post.slug}`}
            >
              <div className="flex">
                <div className="text-text-muted mr-3 min-w-9 flex items-center">
                  {category}
                </div>
                <h1>{title}</h1>
              </div>

              <time className="flex items-center justify-end text-text-muted min-w-16">
                {date}
              </time>
            </Link>
          </Fragment>
        );
      })}
    </PostsPageTemplate>
  );
}
