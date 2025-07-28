import { Banner } from "@/components/Banner";
import { cn } from "@/utils/cn";
import { getPaginatedPosts } from "@/utils/posts-manager";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
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

  const checkHasPreview = (str: string | undefined) => {
    return str !== undefined && str !== ""
  }
  return (
    <>
      <Banner />
      <main className="max-w-7xl flex mx-auto gap-8">
        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-col w-full">
            {posts.map((post) => {
              const frontmatter = post.frontmatter;
              const hasPreviewImg = checkHasPreview(frontmatter.featuredImagePreview);
              const hasSummary = frontmatter.summary !== null && frontmatter.summary !== ""

              return (
                <Link href={"/posts/" + post.slug} className="w-full mt-8">
                  <div className={cn("card-base flex p-4 justify-between")}>
                    <div>
                      {/* TODO: 多重分类情况处理 */}
                      <div className="text-xs text-text-muted">{(frontmatter.categories ?? ["未分类"])[0]}</div>
                      <h1 className="text-3xl">{frontmatter.title}</h1>
                      <div className="flex items-center gap-2 mt-1">
                        {frontmatter.tags?.map((tag) => {
                          return (<Link href={`/tags/${tag}`} className="text-sm hover:text-primary transition-colors">
                            <span className="text-text-muted">#</span>{tag}
                          </Link>
                          )
                        })}
                      </div>
                      <div className="text-text-muted mt-4">{hasSummary ? frontmatter.summary : "暂无文章简介，还是点进来看看吧..."}</div>
                    </div>
                    <div>
                      {hasPreviewImg ?
                        <Image src={frontmatter.featuredImagePreview as string} alt="preview" />
                        : <div>

                        </div>}
                    </div>

                  </div>
                </Link>
              )
            })}
          </div>
          <div>

          </div>
        </div>
        <aside>
          <div className="card-base flex flex-col items-center p-4 mt-8 w-80">
            <div>
              <Image src="https://blog-images.s3.bitiful.net/avatar.webp" width={128} height={128} className="rounded-full" alt="avatar" />
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
