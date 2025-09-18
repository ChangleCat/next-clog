'use client';
import { cn } from "@/utils/cn";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const announcement = "新站乔迁成功！🎉🎉🎉";

export default function AnnouncementCard({ className }: IClassName) {
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
        "card-base flex flex-col p-6 gap-4 shadow-xs hover:border-border",
        className
      )}
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <h1 className="flex items-center font-bold gap-1">
        <Icon icon="mdi:bullhorn-outline" />
        小版报
      </h1>
      <p className="">{announcement}</p>
    </motion.div>
  );
}
