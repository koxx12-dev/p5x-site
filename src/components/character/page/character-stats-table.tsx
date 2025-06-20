import { createMemo, For, Show } from 'solid-js';
import { Box } from '../../box';
import { type } from 'arktype';
import type { CharacterStats } from '@types';

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
);
type CharacterStat = typeof characterStat.infer;

const statNames: Record<CharacterStat, string> = {
	hp: 'HP',
	atk: 'ATK',
	sp: 'SP',
	def: 'DEF',
	spd: 'SPD',
	crit_c_prec: 'Crit Chance',
	crit_dmg_prec: 'Crit Damage',
	eff_hit_prec: 'Effect Hit Rate',
	sp_rec_prec: 'SP Recovery',
};

export function CharacterStatsTable(props: { stats: CharacterStats }) {
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
								POT
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
