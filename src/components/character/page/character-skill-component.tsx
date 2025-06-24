import { createMemo, createSignal, Show } from 'solid-js';
import { BBCodeRenderer } from '../../bbcode-render';
import { ElementDisplay } from '../../element';
import { Container } from '../../container';
import { LevelDropdown } from '../../level-dropdown';
import type { ThiefSkill } from '@types';

export function CharacterSkillComponent(props: { skill: ThiefSkill }) {
	const [level, setLevel] = createSignal(
		props.skill.data?.[0] !== undefined
			? Math.min(10, props.skill.data[0].length)
			: 0,
	);
	const [mentalImage, setMentalImage] = createSignal(0);

	const levels = createMemo(() => {
		return props.skill.data?.[0]?.map((_, i) => i + 1) ?? [];
	});
	const mentalImageLevels = createMemo(() => {
		const data = props.skill.data?.[0]?.[0];

		if (data === undefined || typeof data === 'string') return [];

		return data.map((_, i) => i) ?? [];
	});

	const formattedDescription = createMemo(() => {
		const undefinedStr = '[color=red]UNDEFINED[/color]';

		const desc = Array.isArray(props.skill.description)
			? props.skill.description.join('\n')
			: props.skill.description;

		if (!props.skill.data) return desc;

		let counter = 0;

		const data = props.skill.data.map((skill) => {
			const levelData = skill[level() - 1];

			return Array.isArray(levelData) ? levelData[mentalImage()] : levelData;
		});

		return desc.replace(/{skill_data}/g, () => data[counter++] ?? undefinedStr);
	});

	return (
		<Container
			header={
				<div class="overflow-x-auto overflow-y-hidden">
					<div class="flex w-max min-w-1 flex-row gap-x-2">
						<ElementDisplay element={props.skill.element} class="size-8" />
						<h4 class="font-semibold text-2xl text-white" id={props.skill.id}>
							{props.skill.name}
						</h4>
						<Show when={levels().length > 0}>
							<hr class="h-8 w-[2px] bg-black dark:bg-red-600" />
							<LevelDropdown
								levels={levels()}
								defaultLevel={level()}
								setLevel={setLevel}
								trigger={
									<>
										<span class="font-semibold text-2xl text-white">
											Lv. {level()}
										</span>
										<div class="icon-[tabler--chevron-down] group-ui-expanded:-rotate-180 block h-6 w-6 transition-all" />
									</>
								}
							/>
						</Show>
						<Show when={mentalImageLevels().length > 0}>
							<hr class="h-8 w-[2px] bg-black dark:bg-red-600" />
							<LevelDropdown
								levels={mentalImageLevels()}
								defaultLevel={mentalImage()}
								setLevel={setMentalImage}
								trigger={
									<>
										<span class="font-semibold text-2xl text-white">
											Mi. {mentalImage()}
										</span>
										<div class="icon-[tabler--chevron-down] group-ui-expanded:-rotate-180 block h-6 w-6 transition-all" />
									</>
								}
							/>
						</Show>
					</div>
				</div>
			}
			body={
				<BBCodeRenderer class="whitespace-pre-line font-normal text-white">
					{formattedDescription()}
				</BBCodeRenderer>
			}
		/>
	);
}
