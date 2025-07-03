import type { JSX } from 'solid-js';
import { twMerge } from 'tailwind-merge';

export function VerticalBox(props: { class?: string; children?: JSX.Element }) {
	return (
		<div class="flex min-h-screen flex-row justify-center">
			<main
				class={twMerge(
					'min-h-screen w-full max-w-301 border-red-600 border-r-2 border-l-2 bg-black/40 [view-transition-name:main]',
					props.class,
				)}
			>
				{props.children}
			</main>
		</div>
	);
}
