"use client";

import { cn } from "@/utils/cn";
import { PostPaginationInfo } from "@/utils/posts-manager";
import Link from "next/link";
import Image from "next/image";
import { IClassName } from "@/utils/types";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
      <div className={cn("card-base flex p-4 justify-between shadow-xs")}>
        <div>
          <div className="text-xs text-text-muted">{categories}</div>
          <h1 className="sm:text-2xl text-xl">{frontmatter.title}</h1>
          <div className="text-text-muted">{post.frontmatter.date}</div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* 处理tags */}
            {frontmatter.tags?.map((tag) => {
              return (
                <Link
                  href={`/tags/${tag}`}
                  className="text-sm hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  key={tag}
                >
                  <span className="text-text-muted">#</span>
                  {tag}
                </Link>
              );
            })}
          </div>
          <div className="text-text-muted mt-4">
            {hasSummary
              ? frontmatter.summary
              : "暂无文章简介，还是点进来看看吧..."}
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
