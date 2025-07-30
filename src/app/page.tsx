import { Banner } from "@/components/Banner";
import { Postcard } from "@/components/postcard";
import { cn } from "@/utils/cn";
import { getPaginatedPosts } from "@/utils/posts-manager";
import { IClassName } from "@/utils/types";
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

  return (
    <>
      <Banner />
      <main className="max-w-7xl flex mx-auto gap-8" id="main">
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="flex flex-col w-full">
            {posts.map(post => <Postcard post={post} className="w-full mt-8" key={post.slug} />)}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} className="w-full" />
        </div>
        <aside>
          <AutherCard className="mt-8 w-70" />
        </aside>
      </main>
    </>
  );
}

type contactDetail = {
  platform: string;
  url: string;
  icon: string;
}

type AutherType = {
  name: string;
  subtext: string;
  avatarURL: string;
  contactDetails: contactDetail[];
}

function AutherCard({ className = "" }: IClassName) {
  const auther: AutherType = {
    name: "Changle_cat",
    subtext: "希腊奶",
    avatarURL: "https://blog-images.s3.bitiful.net/avatar.webp",
    contactDetails: [
      {
        platform: "Home",
        url: "/",
        icon: "carbon:home"
      },
      {
        platform: "Email",
        url: "mailto:cthulhu@changlecat.me",
        icon: "carbon:email"
      },
      {
        platform: "Github",
        url: "https://github.com/ChangleCat",
        icon: "simple-icons:github"
      },
      {
        platform: "Bilibili",
        url: "https://space.bilibili.com/313519315",
        icon: "simple-icons:bilibili"
      }
    ]
  }
  return (
    <div className={cn("card-base flex flex-col items-center py-8 bg-primary text-main-reverse gap-2", className)}>
      <div>
        <Link href="/about">
          <Image
            src={auther.avatarURL}
            width={128}
            height={128}
            className="rounded-full border-4 border-main-reverse hover:rotate-360 hover:scale-105 transition-transform duration-800"
            alt="avatar" />
        </Link>
      </div>
      <div className="font-bold text-xl text-center">{auther.name}</div>
      <div className="opacity-80">{auther.subtext}</div>
      <div className="flex gap-4">
        {auther.contactDetails.map((detail) => {
          return (
            <Link href={detail.url} className="p-2 rounded-xl border-2 border-main-reverse text-main-reverse hover:text-primary hover:bg-surface-2 transition-colors" key={detail.platform}>
              <Icon icon={detail.icon} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

interface PaginationProps extends IClassName {
  currentPage: number;
  totalPages: number;
  targetID?: string;
}

function Pagination({ currentPage, totalPages, className = "", targetID = "scroll-end" }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  let startPage: number | null = null;
  let isShowingFirst: boolean = false;
  let isShowingLast: boolean = false;

  if (currentPage < 3) {
    startPage = 1;
    isShowingFirst = true;
  } else if (currentPage > totalPages - 3) {
    startPage = totalPages - 4
    isShowingLast = true;
  } else {
    startPage = currentPage - 2;
  }


  const showingPage = Array.from({ length: 5 }, (_, i) => startPage + i)
  return (
    <div className={cn("flex justify-between", className)}>
      {isFirstPage ?
        <div></div> :
        <Link
          title="上一页"
          href={`/?page=${currentPage - 1}`}
          className={cn("card-base p-2 hover:text-primary flex items-center justify-center sm:w-24",
            "hover:[&>div]:translate-x-0 hover:[&>div]:opacity-100 hover:[&>div]:w-auto hover:[&>div]:mr-0"
          )}>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
          <div className="sm:opacity-0 translate-x-1 transition-all -mr-8 duration-300">上页</div>
        </Link>}
      <div className="flex gap-2">
        {showingPage.map((pageNumber) => {
          const isCurrent = pageNumber === currentPage;
          return (
            <Link
              href={`/?page=${pageNumber}`}
              key={pageNumber}
              className={cn("card-base p-2 w-10 h-10 flex items-center justify-center",
                isCurrent ? "bg-primary text-main-reverse" : "hover:text-primary")}
            >
              {pageNumber}
            </Link>
          )
        })}
      </div>
      {isLastPage ?
        <div></div> :
        <Link
          title="下一页"
          href={`/?page=${currentPage + 1}`}
          className={cn("card-base p-2 hover:text-primary flex items-center justify-center sm:w-24",
            "hover:[&>div]:translate-x-0 hover:[&>div]:opacity-100 hover:[&>div]:w-auto hover:[&>div]:ml-0"
          )}
        >
          <div className="sm:opacity-0 -translate-x-1 transition-all -ml-8 duration-300">下页</div>
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </Link>}
    </div>
  )
}