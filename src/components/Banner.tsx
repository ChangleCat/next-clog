import Image from "next/image"
import { cn } from "@/utils/cn"

export function Banner() {

    return (
        <div className={cn("absolute top-0 left-0 w-full h-[100svh] overflow-hidden -z-1",
            "after:bg-gradient-to-b after:from-transparent after:to-surface-1 after:relative after:z-10")}>
            <Image src="https://blog-images.s3.bitiful.net/banner-alice.jpg" alt="banner" fill={true} objectFit="cover" />
        </div>
    )
}