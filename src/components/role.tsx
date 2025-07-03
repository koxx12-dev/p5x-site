import type { ImageData } from '@responsive-image/core';
import { ResponsiveImage } from '@responsive-image/solid';
import type { Role } from '@types';
import type { ResponsiveImageProps } from 'node_modules/@responsive-image/solid/dist/responsive-image';
import { Show, splitProps } from 'solid-js';

type RoleProps = {
	characterRole: Role;
} & Omit<ResponsiveImageProps, 'src' | 'alt'>;

const roles = import.meta.glob<ImageData | undefined>(
	'/assets/generic/icon/role/processed/*.png',
	{
		eager: true,
		query: '?responsive',
		import: 'default',
	},
);
// const roles = import.meta.glob<string | undefined>(
// 	'/assets/generic/icon/role/processed/*.png',
// 	{
// 		eager: true,
// 		query: '?format=webp',
// 		import: 'default',
// 	},
// );

export function RoleDisplay(props: RoleProps) {
	const [ourProps, restProps] = splitProps(props, ['characterRole']);

	return (
		<Show
			when={getRoleAsset(ourProps.characterRole)}
			fallback={
				<span class="font-bold text-white">
					MISSING ROLE {ourProps.characterRole}
				</span>
			}
		>
			{(src) => (
				<ResponsiveImage
					{...restProps}
					src={src()}
					alt={ourProps.characterRole}
				/>
			)}
		</Show>
		// <img
		// 	{...restProps}
		// 	src={getRoleAsset(ourProps.characterRole)}
		// 	alt={ourProps.characterRole}
		// />
	);
}

function getRoleAsset(role: Role) {
	return roles[`/assets/generic/icon/role/processed/${role}.png`];
}
