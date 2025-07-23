import Link from "next/link";


export function Header() {
    return (
        <header className="bg-surface-2 w-full p-4 shadow-md flex justify-between items-center rounded-b-md text-[18px]">
            <div><Link href={"#"} className="rounded-sm hover:bg-accent-gold p-3">人偶使の小屋</Link></div>
            <nav className="hidden md:block">
                <ul className="flex gap-4 ">
                    <li><Link href={"/"}>首页</Link></li>
                    <li><Link href={"/posts"}>归档</Link></li>
                    <li><Link href={"/tags"}>标签</Link></li>
                    <li><Link href={"/categories"}>分类</Link></li>
                    <li><Link href={"/now"}>如今</Link></li>
                    <li><Link href={"/about"}>关于</Link></li>
                </ul>
            </nav>
            <div>

            </div>
        </header>
    )
}