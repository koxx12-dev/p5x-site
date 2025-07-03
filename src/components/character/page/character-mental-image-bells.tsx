import type { MentalImageBells } from '@types';
import { createMemo, createSignal } from 'solid-js';
import { Container } from '../../container';
import { LevelDropdown } from '../../level-dropdown';
import { MentalImageAsset } from '../../mental-image-asset';

export function CharacterMentalImageBells(props: {
	bells: MentalImageBells[];
}) {
	const levels = createMemo(() => {
		return props.bells.map((_, i) => i + 1);
	});

	const [level, setLevel] = createSignal(levels().length);

	const formattedString = createMemo(() => {
		const value = props.bells[level() - 1];

		let str = '';

		if (value.hp) {
			str += `${value.hp} HP`;
		}

		if (value.atk) {
			str += `${str.length > 0 ? ', ' : ''}${value.atk} ATK`;
		}

		if (value.def) {
			str += `${str.length > 0 ? ', ' : ''}${value.def} DEF`;
		}

		return str.length > 0 ? str : 'Unknown';
	});

	return (
		<Container
			header={
				<LevelDropdown
					levels={levels()}
					defaultLevel={level()}
					setLevel={setLevel}
					trigger={
						<div class="relative h-12 w-12 cursor-pointer">
							<MentalImageAsset assetType="bells" class="relative w-full" />
							{/* TODO: this might be hard to read, fix later */}
							<span class="-bottom-1 absolute right-0">{level()}</span>
						</div>
					}
					colorScheme="velvet"
				/>
			}
			body={<span class="text-white">+ {formattedString()}</span>}
			variant="compact"
			colorScheme="velvet"
		/>
	);
}
