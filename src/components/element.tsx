import type { ImageData } from '@responsive-image/core';
import { ResponsiveImage } from '@responsive-image/solid';
import type { Element } from '@types';
import type { ResponsiveImageProps } from 'node_modules/@responsive-image/solid/dist/responsive-image';
import { Show, splitProps } from 'solid-js';

type ElementProps = {
	element: Element;
	bg?: boolean;
} & Omit<ResponsiveImageProps, 'src' | 'alt'>;

const elements = import.meta.glob<ImageData | undefined>(
	'/assets/generic/icon/element/processed/*.png',
	{
		eager: true,
		query: '?responsive',
		import: 'default',
	},
);
// const elements = import.meta.glob<string | undefined>(
// 	'/assets/generic/icon/element/processed/*.png',
// 	{
// 		eager: true,
// 		query: '?format=webp',
// 		import: 'default',
// 	},
// );

export function ElementDisplay(props: ElementProps) {
	const [ourProps, restProps] = splitProps(props, ['element', 'bg']);

	return (
		<Show
			when={getElementAsset(ourProps.element, ourProps.bg)}
			fallback={
				<span class="font-bold text-white">
					MISSING ELEMENT {ourProps.element}
				</span>
			}
		>
			{(src) => (
				<ResponsiveImage {...restProps} src={src()} alt={ourProps.element} />
			)}
		</Show>
		// <img
		// 	{...restProps}
		// 	src={getElementAsset(ourProps.element, ourProps.bg)}
		// 	alt={ourProps.element}
		// />
	);
}

function getElementAsset(element: Element, bg = true) {
	return elements[
		`/assets/generic/icon/element/processed/${element}${bg ? '_bg' : ''}.png`
	];
}
