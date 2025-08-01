import { cn } from "@/utils/cn";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";

const announcement = "新站乔迁成功！🎉🎉🎉"

export default function AnnouncementCard({ className }:IClassName) {
	return (
		<div className={cn("card-base flex flex-col p-6 gap-4 shadow-xl hover:border-border", className)}>
			<h1 className="flex items-center font-bold gap-1"><Icon icon="mdi:bullhorn-outline" />小版报</h1>
			<p className="">
				{announcement}
			</p>
		</div>
	)
}