import Image from "next/image"
import { cn } from "@/utils/cn"

export function Banner() {

    return (
        <div className={cn("absolute top-0 left-0 w-full h-[100svh] overflow-hidden -z-1")}>
            <Image src="https://blog-images.s3.bitiful.net/banner-alice.jpg" alt="banner" fill className="object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 h-full w-full"></div>
        </div>
    )
}