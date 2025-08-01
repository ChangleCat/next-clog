import Link from "next/link";
import Image from "next/image";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";

type contactDetail = {
  platform: string;
  url: string;
  icon: string;
}

type AutherType = {
  name: string;
  subtext: string;
  avatarURL: string;
  contactDetails: contactDetail[];
}

export default function AuthorCard({ className = "" }: IClassName) {
  const auther: AutherType = {
    name: "Changle_cat",
    subtext: "希腊奶",
    avatarURL: "https://blog-images.s3.bitiful.net/avatar.webp",
    contactDetails: [
      {
        platform: "Home",
        url: "/",
        icon: "carbon:home"
      },
      {
        platform: "Email",
        url: "mailto:cthulhu@changlecat.me",
        icon: "carbon:email"
      },
      {
        platform: "Github",
        url: "https://github.com/ChangleCat",
        icon: "simple-icons:github"
      },
      {
        platform: "Bilibili",
        url: "https://space.bilibili.com/313519315",
        icon: "simple-icons:bilibili"
      }
    ]
  }
  return (
    <div className={cn("card-base flex flex-col items-center py-8 bg-primary text-main-reverse gap-2 shadow-xl", className)}>
      <div>
        <Link href="/about">
          <Image
            src={auther.avatarURL}
            width={128}
            height={128}
            className="rounded-full border-4 border-main-reverse hover:rotate-360 hover:scale-105 transition-transform duration-800"
            alt="avatar" />
        </Link>
      </div>
      <div className="font-bold text-xl text-center">{auther.name}</div>
      <div className="opacity-80">{auther.subtext}</div>
      <div className="flex gap-4">
        {auther.contactDetails.map((detail) => {
          return (
            <Link href={detail.url} className="p-2 rounded-xl border-2 border-main-reverse text-main-reverse hover:text-primary hover:bg-surface-2 transition-colors" key={detail.platform}>
              <Icon icon={detail.icon} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}