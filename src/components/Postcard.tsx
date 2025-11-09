"use client";

import { cn } from "@/utils/cn";
import { PostPaginationInfo } from "@/utils/posts-manager";
import Link from "next/link";
import Image from "next/image";
import { IClassName } from "@/utils/types";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { Fragment, ReactNode, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PostcardProps extends IClassName {
  post: PostPaginationInfo;
}

export default function Postcard({ post, className = "" }: PostcardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true, // 动画只播放一次
    margin: "0px 0px -50px 0px", // 元素进入视口底部 50px 后才触发
  });
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const checkHasPreview = (str: string | undefined) => {
    return str !== undefined && str !== "";
  };
  const frontmatter = post.frontmatter;
  const hasPreviewImg = checkHasPreview(frontmatter.featuredImagePreview);
  const hasSummary = frontmatter.summary !== null && frontmatter.summary !== "";
  const readTime = Math.max(Math.round(frontmatter.wordCount / 300), 1);
  const router = useRouter();
  // 处理多分类情况
  let categories: string = "未分类";
  if (frontmatter.categories !== undefined) {
    if (frontmatter.categories?.length === 1) {
      categories = frontmatter.categories[0];
    } else {
      categories = frontmatter.categories.join(" | ");
    }
  }

  return (
    <motion.div
      onClick={() => router?.push(`/posts/${post.slug}`)}
      className={cn("cursor-pointer text-left", className)}
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className={cn("card-base flex p-5 justify-between shadow-xs")}>
        <div>
          <div className="text-xs text-text-muted">{categories}</div>
          <DynamicH1 className="text-xl">{frontmatter.title}</DynamicH1>
          <div className="text-text-muted mt-2 text-sm">
            {hasSummary
              ? frontmatter.summary
              : "暂无文章简介，还是点进来看看吧..."}
          </div>
          <div className="text-text-muted mt-4 flex text-sm items-center">
            <Icon
              icon="material-symbols:date-range-outline-rounded"
              className=""
            />
            <time className="block text-xs ml-1">{frontmatter.date}</time>
            <Icon icon="mdi:clock-time-four-outline" className="ml-4" />
            <div className="text-xs ml-1">{readTime} min read</div>
          </div>
          <div className="flex items-center flex-wrap text-sm mt-2">
            <Icon icon="mdi:tag-outline" className="text-text-muted mr-1" />
            {/* 处理tags */}
            {frontmatter.tags?.map((tag, index) => {
              return (
                <Fragment key={tag}>
                  {index !== 0 && (
                    <span className="text-text-muted mx-1">·</span>
                  )}
                  <Link
                    href={`/tags/${tag}`}
                    className="hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* <span className="text-text-muted">#</span> */}
                    {tag}
                  </Link>
                </Fragment>
              );
            })}
          </div>
        </div>
        <div>
          {hasPreviewImg ? (
            <Image
              src={frontmatter.featuredImagePreview as string}
              alt="preview"
              width={100}
              height={100}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </motion.div>
  );
}


function DynamicH1({ children, className="" }: {
  children: ReactNode,
  className?: string
}){
  return (
    <h1 className={cn("w-fit transition-color duration-200 after:content-[''] after:block after:w-full after:h-px after:bg-primary/90 after:origin-right hover:after:origin-left after:transform-[rotateY(90deg)] hover:after:transform-none after:transition-transform after:duration-500", className)}>{children}</h1>
  )
}