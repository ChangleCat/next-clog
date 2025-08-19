'use client';

import { cn } from '@/utils/cn';
import { IClassName } from '@/utils/types';
import { useRef, useEffect } from 'react';

export default function UniverseParticle({ className = "" }: IClassName) {
	// 使用 useRef 来获取 canvas 元素的引用
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationFrameId = useRef<number | null>(null);

	// 使用 useEffect 来处理副作用，如初始化和清理
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width: number, height: number;
		let particles: Particle[];

		const PARTICLE_DENSITY = 0.216; // 粒子密度
		const BASE_SPEED = 0.05; // 基础速度
		const STAR_COLOR = "226, 225, 224"; // 星星颜色

		// 这个标志用于延迟“彗星”的出现
		let cometsEnabled = false;

		// 辅助函数：生成指定范围内的随机数
		const random = (min: number, max: number) => Math.random() * (max - min) + min;

		// 辅助函数：按权重随机触发（例如，千分之三的概率）
		const randomChance = (odds: number) => Math.floor(random(0, 1000)) + 1 < 10 * odds;

		// 将原先的构造函数改写为 Class，更清晰
		class Particle {
			giant!: boolean; // 是否为“巨大”的星星
			comet!: boolean; // 是否为“彗星”
			x!: number;
			y!: number;
			r!: number; // 半径
			dx!: number; // x轴速度
			dy!: number; // y轴速度
			fadingOut!: boolean | null; // 是否正在淡出
			fadingIn!: boolean; // 是否正在淡入
			opacity!: number; // 透明度
			opacityTresh!: number; // 透明度阈值
			do!: number; // 透明度变化步长

			constructor() {
				this.reset();
			}

			// 重置粒子属性
			reset() {
				this.giant = randomChance(3);
				this.comet = !this.giant && cometsEnabled && randomChance(10);
				this.x = random(0, width - 10);
				this.y = random(0, height);
				this.r = random(1.1, 2.6);

				// 设置速度
				this.dx = random(BASE_SPEED, 6 * BASE_SPEED) + (this.comet ? random(50, 120) * BASE_SPEED : 0);
				this.dy = -random(BASE_SPEED, 6 * BASE_SPEED) - (this.comet ? random(50, 120) * BASE_SPEED : 0);

				// 淡入淡出属性
				this.fadingOut = null;
				this.fadingIn = true;
				this.opacity = 0;
				this.opacityTresh = random(0.2, 1 - (this.comet ? 0.4 : 0));
				this.do = random(0.0005, 0.002) + (this.comet ? 0.001 : 0);
			}

			// 淡入逻辑
			fadeIn() {
				if (this.fadingIn) {
					this.opacity += this.do;
					if (this.opacity >= this.opacityTresh) {
						this.fadingIn = false;
					}
				}
			}

			// 淡出逻辑
			fadeOut() {
				if (this.fadingOut) {
					this.opacity -= this.do / 2;
					if (this.opacity < 0 || this.x > width || this.y < 0) {
						this.fadingOut = false;
						this.reset();
					}
				}
			}

			// 绘制粒子
			draw() {
				if (ctx === null) return;

				ctx.beginPath();
				if (this.giant) {
					ctx.fillStyle = `rgba(180, 184, 240, ${this.opacity})`;
					ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
				} else if (this.comet) {
					ctx.fillStyle = `rgba(${STAR_COLOR}, ${this.opacity})`;
					ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);
					// 绘制彗星尾巴
					for (let i = 0; i < 30; i++) {
						ctx.fillStyle = `rgba(${STAR_COLOR}, ${this.opacity - (this.opacity / 20) * i})`;
						ctx.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
						ctx.fill();
					}
				} else {
					ctx.fillStyle = `rgba(226, 225, 142, ${this.opacity})`;
					ctx.rect(this.x, this.y, this.r, this.r);
				}
				ctx.closePath();
				ctx.fill();
			}

			// 移动粒子
			move() {
				this.x += this.dx;
				this.y += this.dy;
				if (this.fadingOut === false) {
					this.reset();
				}
				// 当粒子超出屏幕边界时开始淡出
				if (this.x > width - width / 4 || this.y < 0) {
					this.fadingOut = true;
				}
			}
		}

		// 处理浏览器窗口大小变化
		const handleResize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;

			// 根据窗口宽度计算粒子数量
			const numParticles = Math.floor(PARTICLE_DENSITY * width);
			particles = [];
			for (let i = 0; i < numParticles; i++) {
				particles.push(new Particle());
			}
		};

		// 动画循环
		const animate = () => {
			ctx.clearRect(0, 0, width, height);
			for (const p of particles) {
				p.move();
				p.fadeIn();
				p.fadeOut();
				p.draw();
			}
			animationFrameId.current = window.requestAnimationFrame(animate);
		};

		// 初始化并启动动画
		handleResize();
		animationFrameId.current = window.requestAnimationFrame(animate);

		// 短暂延迟后才允许生成彗星
		const cometTimer = setTimeout(() => {
			cometsEnabled = true;
		}, 50);

		// 监听窗口大小变化事件
		window.addEventListener('resize', handleResize);

		// useEffect 的清理函数：在组件卸载时执行
		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationFrameId.current !== null) window.cancelAnimationFrame(animationFrameId.current);
			clearTimeout(cometTimer);
		};
	}, []); // 空依赖数组 `[]` 确保此 useEffect 仅在组件挂载时运行一次

	return (
		<canvas
			id="universe"
			ref={canvasRef}
			className={cn("hidden md:dark:block fixed top-0 left-0 w-full h-full z-999 pointer-events-none", className)}
		/>
	);
};
