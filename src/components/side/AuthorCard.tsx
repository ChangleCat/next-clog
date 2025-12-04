'use client';
import Link from "next/link";
import Image from "next/image";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AvatarImgData from "@/../public/avatar.webp"
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

type contactDetail = {
  platform: string;
  url: string;
  icon: string;
};

type AuthorType = {
  name: string;
  subtext: string;
  avatarURL: string | StaticImport;
  contactDetails: contactDetail[];
};

export default function AuthorCard({ className = "" }: IClassName) {
  const auther: AuthorType = {
    name: "Changle_cat",
    subtext: "希腊奶",
    avatarURL: AvatarImgData,
    contactDetails: [
      {
        platform: "Home",
        url: "/",
        icon: "carbon:home",
      },
      {
        platform: "Email",
        url: "mailto:cthulhu@changlecat.me",
        icon: "carbon:email",
      },
      {
        platform: "Github",
        url: "https://github.com/ChangleCat",
        icon: "simple-icons:github",
      },
      {
        platform: "Bilibili",
        url: "https://space.bilibili.com/313519315",
        icon: "simple-icons:bilibili",
      },
    ],
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true, // 动画只播放一次
    margin: "0px 0px -50px 0px", // 元素进入视口底部 50px 后才触发
  });
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className={cn(
        "card-base flex flex-col items-center py-8 bg-primary text-main-reverse md:gap-2 shadow-xs gap-4",
        className
      )}
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="flex md:flex-col items-center gap-8 md:gap-2">
        <div>
          <Link href="/about">
            <Image
              src={auther.avatarURL}
              width={128}
              height={128}
              className="rounded-full border-4 border-main-reverse hover:rotate-360 hover:scale-105 transition-transform duration-800"
              alt="avatar"
            />
          </Link>
        </div>
        <div className="flex flex-col md:items-center pr-8 md:pr-0">
          <div className="font-bold text-xl text-center">{auther.name}</div>
          <div className="opacity-80">{auther.subtext}</div>
        </div>
      </div>
      <div className="flex md:gap-4 gap-8">
        {auther.contactDetails.map((detail) => {
          return (
            <Link
              href={detail.url}
              className="p-2 rounded-xl border-2 border-main-reverse text-main-reverse hover:text-primary hover:bg-surface-2 transition-colors"
              key={detail.platform}
              target="_blank"
            >
              <Icon icon={detail.icon} />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
