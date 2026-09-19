"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * 客户端水合完成后为 true，服务端渲染与水合首帧为 false。
 *
 * 用于渲染依赖浏览器才能得知的值（localStorage、当前时间），这样服务端与
 * 水合首帧输出一致，水合完成后再切到客户端取值，避免水合不一致，同时不需要
 * 在 effect 里同步 setState。
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
