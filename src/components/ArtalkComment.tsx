"use client";

import "artalk/Artalk.css";
import Artalk from "artalk";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { IClassName } from "@/utils/types";
import { useDarkModeStore } from "@/stores/useDarkModeStore";

export default function ArtalkComment({ className="" } : IClassName) {
  const pathname = usePathname();
  const darkMode = useDarkModeStore((state)=>state.darkMode);
  const artalk = useRef<Artalk>(null);

  const handleContainerInit = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        return;
      }
      if (artalk.current) {
        artalk.current.destroy();
        artalk.current = null;
      }
      artalk.current = Artalk.init({
        el: node,
        pageKey: pathname,
        pageTitle: document.title,
        server: "/artalk",
        site: "人偶使の小屋",
        darkMode: darkMode
        // ...
      });
    },
    [pathname]
  );

  useEffect(()=>{
    artalk.current?.update({
      darkMode: darkMode
    })
  }, [darkMode])

  useEffect(() => {
    return () => {
      artalk.current?.destroy();
      artalk.current = null;
    };
  }, []);

  return <div ref={handleContainerInit} className={className}></div>;
}
