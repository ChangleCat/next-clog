import AuthorCard from "@/components/AuthorCard";
import { Banner } from "@/components/Banner";
import Pagination from "@/components/Pagination";
import { Postcard } from "@/components/postcard";
import { cn } from "@/utils/cn";
import { getPaginatedPosts } from "@/utils/posts-manager";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

export default async function Home({ searchParams }: {
  searchParams?: Promise<{ page?: string }>
}) {
  const currentPage = Number((await searchParams)?.page) || 1;

  const { posts, totalPages } = getPaginatedPosts(
    currentPage,
    POSTS_PER_PAGE
  );

  return (
    <>
      <Banner />
      <main className="max-w-7xl flex mx-auto gap-8" id="main">
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="flex flex-col w-full">
            {posts.map(post => <Postcard post={post} className="w-full mt-8" key={post.slug} />)}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} className="w-full" targetID="scroll-end" currentURL="/"/>
        </div>
        <aside>
          <AuthorCard className="mt-8 w-70" />
        </aside>
      </main>
    </>
  );
}
