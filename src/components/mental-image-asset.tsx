import type { ImageData } from '@responsive-image/core';
import { ResponsiveImage } from '@responsive-image/solid';
import type { MentalImageAsset as MIAsset } from '@types';
import type { ResponsiveImageProps } from 'node_modules/@responsive-image/solid/dist/responsive-image';
import { Show, splitProps } from 'solid-js';

type MentalImageProps = {
	assetType: MIAsset;
} & Omit<ResponsiveImageProps, 'src' | 'alt'>;

const assets = import.meta.glob<ImageData | undefined>(
	'/assets/generic/icon/mental_image/test/processed/*.png',
	{
		eager: true,
		query: '?responsive',
		import: 'default',
	},
);

export function MentalImageAsset(props: MentalImageProps) {
	const [ourProps, restProps] = splitProps(props, ['assetType']);

	return (
		<Show
			when={getMentalImageAsset(ourProps.assetType)}
			fallback={
				<span class="font-bold text-white">
					MISSING ASSET {ourProps.assetType}
				</span>
			}
		>
			{(src) => (
				<ResponsiveImage
					{...restProps}
					src={src()}
					alt={`${ourProps.assetType} icon`}
				/>
			)}
		</Show>
	);
}

export function getMentalImageAsset(assetType: MIAsset) {
	return assets[
		`/assets/generic/icon/mental_image/test/processed/${assetType}.png`
	];
}
