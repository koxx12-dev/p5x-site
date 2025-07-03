import { Box } from '@components/box';
import type { ThiefStats } from '@types';
import { type } from 'arktype';
import { createMemo, For, Show } from 'solid-js';

const characterStat = type.enumerated(
	'hp',
	'atk',
	'sp',
	'def',
	'spd',
	'crit_c_prec',
	'crit_dmg_prec',
	'eff_hit_prec',
	'sp_rec_prec',
	'heal_eff_prec',
);
type CharacterStat = typeof characterStat.infer;

//TODO: Merge this with typeMap in character-mental-image-buff.tsx
const statNames: Record<CharacterStat, string> = {
	hp: 'HP',
	atk: 'Atk',
	sp: 'SP',
	def: 'Def',
	spd: 'Spd',
	crit_c_prec: 'Crit Rate',
	crit_dmg_prec: 'Crit Mult.',
	eff_hit_prec: 'Ailment Acc.',
	sp_rec_prec: 'SP Recovery',
	heal_eff_prec: 'Healing Effect',
};

export function CharacterStatsTable(props: { stats: ThiefStats }) {
	const headers = createMemo(() => {
		if (props.stats.length === 0) {
			return [];
		}

		const values = Object.values(props.stats[0]);

		if (values[0] === undefined) {
			return [];
		}

		const keys = Object.keys(values[0]) as CharacterStat[];

		return keys.map((key) => {
			return statNames[key];
		});
	});

	return (
		<Box class="mt-2 w-full">
			<div class="overflow-x-auto">
				<table class="m-2 text-white">
					<thead>
						<tr>
							<th class="border-black not-last:border-r-[2px] px-2 text-center dark:border-red-600">
								HDN
							</th>
							<th class="border-black not-last:border-r-[2px] px-2 text-center dark:border-red-600">
								LVL
							</th>
							<For each={headers()}>
								{(header) => (
									<th class="border-black not-last:border-r-[2px] px-2 text-center dark:border-red-600">
										{header}
									</th>
								)}
							</For>
						</tr>
					</thead>
					<tbody>
						<For each={props.stats}>
							{(stat, index) => {
								const entries = () => Object.entries(stat);
								const stats = () =>
									entries().map(([level, stats]) => [
										level,
										...Object.values(stats),
									]);

								return (
									<For each={stats()}>
										{(stat, i) => (
											<tr>
												<Show when={i() === 0}>
													<td
														class="border-black border-t-[2px] not-last:border-r-[2px] px-2 text-center dark:border-red-600"
														rowSpan={entries().length}
													>
														{index()}
													</td>
												</Show>
												<For each={stat}>
													{(value) => (
														<td class="border-black border-t-[2px] not-last:border-r-[2px] px-2 text-center dark:border-red-600">
															{value}
														</td>
													)}
												</For>
											</tr>
										)}
									</For>
								);
							}}
						</For>
					</tbody>
				</table>
			</div>
		</Box>
	);
}
