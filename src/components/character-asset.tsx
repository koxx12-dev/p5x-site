import { type } from 'arktype';
import { Show, splitProps } from 'solid-js';
import type { ResponsiveImageProps } from 'node_modules/@responsive-image/solid/dist/responsive-image';
import { ResponsiveImage } from '@responsive-image/solid';
import type { ImageData } from '@responsive-image/core';

const characterAsset = type.enumerated(
	'card_cut',
	'card',
	'icon_thief',
	'icon_person',
	'full',
);

export type CharacterAsset = typeof characterAsset.infer;

const assets = import.meta.glob<ImageData | undefined>('/data/character/*/*.png', {
	eager: true,
	query: '?responsive',
	import: 'default',
});

// const assets = import.meta.glob<string | undefined>('/data/character/*/*.png', {
// 	eager: true,
// 	query: "?format=webp",
// 	import: 'default',
// });

type RoleProps = {
	characterId: string;
	assetType: CharacterAsset;
} & Omit<ResponsiveImageProps, 'src' | 'alt'>;

export function CharacterAssetDisplay(props: RoleProps) {
	const [ourProps, restProps] = splitProps(props, ['characterId', 'assetType']);

	return (
		<Show
			when={getCharacterAsset(ourProps.characterId, ourProps.assetType)}
			fallback={
				<span class="font-bold text-white">
					MISSING ASSET {ourProps.characterId} - {ourProps.assetType}
				</span>
			}
		>
			{(src) => (
				<ResponsiveImage
					{...restProps}
					src={src()}
					alt={`${ourProps.characterId}-${ourProps.assetType}`}
				/>
			)}
		</Show>
		// <img
		// 	{...restProps}
		// 	src={
		// 		getCharacterAsset(ourProps.characterId, ourProps.assetType) as string
		// 	}
		// 	alt={`${ourProps.characterId}-${ourProps.assetType}`}
		// 	loading='lazy'
		// 	decoding='async'
		// />
	);
}

function getCharacterAsset(characterId: string, assetType: CharacterAsset) {
	return assets[`/data/character/${characterId}/${assetType}.png`];
}
