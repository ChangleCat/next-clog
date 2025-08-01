'use client';
import { MouseEventHandler } from "react";


export function HightlightMathExpression() {

	const hoverClasses = ['bg-gray-200', 'text-gray-900', 'rounded-md'];

	/**
	 * 当鼠标移入容器内的任何元素时触发。
	 * @param {React.MouseEvent<HTMLDivElement>} event - React 的鼠标事件对象
	 */
	const handleMouseOver: MouseEventHandler = (event) => {
		// event.target 是触发事件的最深层元素（即鼠标指针正下方的元素）
		const target = event.target;

		// 检查这个元素是否是我们想要应用样式的 <span>
		if (target instanceof HTMLSpanElement) {
			// 使用 spread (...) 语法添加所有 hover 样式类
			target.classList.add(...hoverClasses);
		}
	};

	/**
	 * 当鼠标从容器内的任何元素上移开时触发。
	 * @param {React.MouseEvent<HTMLDivElement>} event - React 的鼠标事件对象
	 */
	const handleMouseOut: MouseEventHandler = (event) => {
		const target = event.target;
		if (target instanceof HTMLSpanElement) {
			// 移除所有 hover 样式类
			target.classList.remove(...hoverClasses);
		}
	};

	return (
		<div
			className="text-2xl font-mono"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<span>
				<span>
					<span>1</span>
					{' + '}
					<span>
						<span>2</span>
						{' * '}
						<span>3</span>
					</span>
				</span>
				{' = '}
				<span>7</span>
			</span>
		</div>
	);
}