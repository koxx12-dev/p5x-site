import type { MentalImageBasic } from '@types';
import { createMemo } from 'solid-js';
import { Container } from '../../container';
import { MentalImageAsset } from '../../mental-image-asset';

export function CharacterMentalImageBasic(props: MentalImageBasic) {
	const formattedString = createMemo(() => {
		return { atk: 'ATK', def: 'DEF', hp: 'HP' }[props.type] || 'Unknown';
	});

	return (
		<Container
			header={
				<MentalImageAsset assetType={props.type} width={48} height={48} />
			}
			body={
				<span class="text-white">
					+ {props.value} {formattedString()}
				</span>
			}
			colorScheme="velvet"
			variant="compact"
		/>
	);
}
