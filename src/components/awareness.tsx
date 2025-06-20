import type { ImageData } from '@responsive-image/core';
import type { Awareness } from '@types';
import type { ResponsiveImageProps } from 'node_modules/@responsive-image/solid/dist/responsive-image';
import { createMemo, Show, splitProps } from 'solid-js';
import { ResponsiveImage } from '@responsive-image/solid';

type AwarenessDisplayProps = {
	tier: Awareness | number;
} & Omit<ResponsiveImageProps, 'src' | 'alt'>;

const awareness = import.meta.glob<ImageData>(
	'/assets/generic/icon/awareness/a*.png',
	{
		eager: true,
		query: '?responsive',
		import: 'default',
	},
);

export function AwarenessDisplay(props: AwarenessDisplayProps) {
	const [ourProps, restProps] = splitProps(props, ['tier']);

	const a = createMemo(() =>
		typeof ourProps.tier === 'string'
			? ourProps.tier
			: (`a${ourProps.tier}` as Awareness),
	);

	return (
		<Show
			when={getAwarenessAsset(a())}
			fallback={
				<span class="font-bold text-white">MISSING AWARENESS ASSET {a()}</span>
			}
		>
			{(src) => (
				<ResponsiveImage {...restProps} src={src()} alt={`Awareness ${a()}`} />
			)}
		</Show>
	);
}

function getAwarenessAsset(tier: Awareness) {
	return awareness[`/assets/generic/icon/awareness/${tier}.png`];
}
