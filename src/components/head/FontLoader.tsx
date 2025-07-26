"use client";
// 字体导入
export function FontLoader() {
  return (
    <>
      <link
        rel="preload"
        as="style"
        href="https://fontsapi.zeoseven.com/292/main/result.css"
        crossOrigin="anonymous"
        onLoad={(e) => { (e.target as HTMLLinkElement).rel = 'stylesheet'; }}
        onError={(e) => {
          (e.target as HTMLLinkElement).href = 'https://fontsapi-storage.zeoseven.com/292/main/result.css';
        }} />
        <link
        rel="preload"
        as="style"
        href="https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Regular/result.css"
        crossOrigin="anonymous"
        onLoad={(e) => { (e.target as HTMLLinkElement).rel = 'stylesheet'; }}
        onError={(e) => {
          (e.target as HTMLLinkElement).href = 'https://fontsapi.zeoseven.com/442/main/result.css';
        }} />
      <noscript>
        <link rel="stylesheet" href="https://fontsapi.zeoseven.com/292/main/result.css" />
        <link rel="stylesheet" href="https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Regular/result.css" />
      </noscript>
    </>
  );
}