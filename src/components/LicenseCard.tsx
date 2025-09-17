import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export default function LicenseCard({ author, className="" }: {
	author: string,
	className?: string
}) {
	return (
		<div
			className={cn(
				"card-base my-8 p-6 !rounded-2xl hover:border-border",
				"border-2 border-dashed bg-surface-1"
			,className)}
		>
			<div className="flex items-center gap-2 font-bold text-lg text-text-main mb-3">
				<Icon icon="carbon:license" className="w-6 h-6" />
				<span>许可协议</span>
			</div>
			<div className="text-text-muted ml-8 text-[16px]">
				<span>本文采用 </span>
				<Link
					href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
					target="_blank"
					className="font-medium text-primary hover:text-primary-hover	"
				>
					CC BY-NC-SA 4.0
				</Link>
				<span> 许可协议<br />转载请注明来自
					<Link href="/" target="_blank" className='text-primary hover:text-primary-hover inline-block mx-1'>{author}</Link>
				</span>
			</div>
		</div>
	);
}