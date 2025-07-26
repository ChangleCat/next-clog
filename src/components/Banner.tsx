'use client';

import Image from "next/image"
import { cn } from "@/utils/cn"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useRef, useState } from "react";

const Sentences = [
    "欢迎来到「人偶使の小屋」",
    "我是屋主的助手「常乐凯特」",
    "外面风大，进来喝杯热茶吧",
    "这里存放着我的思考、创造与日常",
    "小屋的灯，永远为你而亮",
    "记录那些被丝线牵引的闪光瞬间",
    "今天也是努力编织文字的一天",
    "很高兴你能在这里稍作停留"
];

export function Banner() {
    const [SentencesIdx, setSentencesIdx] = useState(0);
    const [showingText, setShowingText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // 使用 useRef 来存储定时器引用，以便在组件卸载时清除
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 使用 useEffect 来处理文本的打字效果
    useEffect(() => {
        const changeSentence = () => {
            setSentencesIdx((prev) => (prev + 1) % Sentences.length);
        }

        const handleTyping = () => {
            const currentSentence = Sentences[SentencesIdx];

            if (isDeleting) {
                setShowingText((prev) => prev.slice(0, -1));
            } else {
                setShowingText((prev) => currentSentence.slice(0, prev.length + 1));
            }

            if (!isDeleting && showingText === currentSentence) {
                timeoutRef.current = setTimeout(() => {
                    setIsDeleting(true);
                }, 1500);
            } else if (isDeleting && showingText === "") {
                // 连续多次 set 函数会被 React 自动批处理，只触发一次 useEffect
                setIsDeleting(false);
                changeSentence();
            }
        }
        // 实现打字慢，删除快
        const typingSpeed = isDeleting ? 60 : 120;
        timeoutRef.current = setTimeout(handleTyping, typingSpeed);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [SentencesIdx, showingText, isDeleting]);

    return (
        <div className={cn("relative w-full h-[100svh] overflow-hidden")}>
            {/* 背景图片 */}
            <Image src="https://blog-images.s3.bitiful.net/banner-alice.jpg" alt="banner" fill className="object-cover pointer-events-none" />
            {/* 背景渐变滤镜 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
            {/* 中间的文字 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-text-main-dark">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">人偶使の小屋</h1>
                <p className="text-lg md:text-xl">
                    <span>{showingText}</span>
                    <span className="animate-cursor-pulse">_</span>
                </p>
            </div>
            {/* 跳动的箭头 */}
            <button className="absolute bottom-2 left-1/2 -translate-x-1/2 text-5xl animate-bounce-pulse text-text-main-dark cursor-pointer" type="button" title="向下滚动">
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
            </button>
        </div>
    )
}