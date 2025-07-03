import type { MentalImageBuff } from '@types';
import { createMemo, createSignal } from 'solid-js';
import { Container } from '../../container';
import { LevelDropdown } from '../../level-dropdown';
import { MentalImageAsset } from '../../mental-image-asset';

const typeMap = {
	atk_prec: 'Atk',
	def_prec: 'Def',
	hp_prec: 'HP',
	dmg_prec: 'Atk Mult.',
	dmg_res_prec: 'Attack Resist.',
	eff_hit_prec: 'Ailment Acc.',
	eff_res_prec: 'Ailment Resist.',
	crit_dmg_prec: 'Crit Mult.',
	crit_c_prec: 'Crit Rate',
	pen_prec: 'Pierce Rate',
	heal_eff_prec: 'Healing Effect',
	spd: 'Spd',
	sp_rec_prec: 'SP Recovery',
	shd_eff_prec: 'Shield Effect',
};

export function CharacterMentalImageBuff(props: MentalImageBuff) {
	const levels = createMemo(() => {
		return props.values.map((_, i) => i + 1);
	});

	const [level, setLevel] = createSignal(levels().length);

	const formattedString = createMemo(() => {
		return typeMap[props.type] || 'Unknown';
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
							<MentalImageAsset
								assetType={props.type}
								class="relative w-full"
							/>
							{/* TODO: this might be hard to read, fix later */}
							<span class="-bottom-1 absolute right-0">{level()}</span>
						</div>
					}
					colorScheme="velvet"
				/>
			}
			body={
				<span class="text-white">
					+ {props.values[level() - 1]} {formattedString()}
				</span>
			}
			colorScheme="velvet"
			variant="compact"
		/>
	);
}
