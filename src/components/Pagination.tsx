import { cn } from "@/utils/cn";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

interface PaginationProps extends IClassName {
  currentPage: number;
  totalPages: number;
  targetID?: string | null;
  currentURL: string;
}

export default function Pagination({ currentPage, totalPages, className = "", targetID = null, currentURL }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const toScroll = targetID === null ? "" : `#${targetID}`;
  let startPage: number | null = null;
  let isShowingFirst: boolean = false;
  let isShowingLast: boolean = false;

  const pagesToShow = 5;

  if (totalPages <= pagesToShow) {
    // 如果总页数小于等于要显示的页数，则始终从1开始
    startPage = 1;
    isShowingFirst = true;
    isShowingLast = true;
  } else {
    // 如果总页数大于要显示的页数，则进行滑动窗口计算
    if (currentPage <= 3) {
      // 当处于前几页时，从1开始
      startPage = 1;
      isShowingFirst = true;
    } else if (currentPage + 2 >= totalPages) {
      // 当处于后几页时，显示最后几页
      startPage = totalPages - pagesToShow + 1;
      isShowingLast = true;
    } else {
      // 在中间页时，将当前页居中
      startPage = currentPage - 2;
    }
  }


  const showingPage = Array.from({ length: Math.min(pagesToShow, totalPages) }, (_, i) => startPage + i)
  return (
    <div className={cn("flex justify-between", className)}>
      {isFirstPage ?
        <div className="hidden sm:block"></div> :
        <Link
          title="上一页"
          href={`${currentURL}?page=${currentPage - 1}${toScroll}`}
          className={cn("card-base p-2 hover:text-primary flex items-center justify-center w-24",
            "hover:[&>div]:translate-x-0 hover:[&>div]:opacity-100 hover:[&>div]:w-auto hover:[&>div]:mr-0"
          )}>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
          <div className="opacity-0 translate-x-1 transition-all -mr-8 duration-300">上页</div>
        </Link>}
      <div className="flex gap-2 [&>a]:p-2 [&>a]:w-10 [&>a]:h-10 [&>a]:flex [&>a]:items-center [&>a]:justify-center">
        {(!isShowingFirst) &&
          <>
            <Link
              href={`${currentURL}?page=1${toScroll}`}
              className={cn("card-base hover:text-primary")}
            >
              <Icon icon="material-symbols:keyboard-double-arrow-left-rounded" />
            </Link>
            <div className="w-10 h-10 text-center pointer-events-none">...</div>
          </>}
        {showingPage.map((pageNumber) => {
          const isCurrent = pageNumber === currentPage;
          return (
            <Link
              href={`${currentURL}?page=${pageNumber}${toScroll}`}
              key={pageNumber}
              className={cn("card-base",
                isCurrent ? "bg-primary text-main-reverse" : "hover:text-primary")}
            >
              {pageNumber}
            </Link>
          )
        })}
        {(!isShowingLast) &&
          <>
            <div className="w-10 h-10 text-center pointer-events-none">...</div>
            <Link
              href={`${currentURL}?page=${totalPages}${toScroll}`}
              className={cn("card-base hover:text-primary")}
            >
              <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" />
            </Link>
          </>}
      </div>
      {isLastPage ?
        <div className="hidden sm:block"></div> :
        <Link
          title="下一页"
          href={`${currentURL}?page=${currentPage + 1}${toScroll}`}
          className={cn("card-base p-2 hover:text-primary flex items-center justify-center w-24",
            "hover:[&>div]:translate-x-0 hover:[&>div]:opacity-100 hover:[&>div]:w-auto hover:[&>div]:ml-0"
          )}
        >
          <div className="opacity-0 -translate-x-1 transition-all -ml-8 duration-300">下页</div>
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </Link>}
    </div>
  )
}