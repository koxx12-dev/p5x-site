import { ToggleGroup } from '@kobalte/core/toggle-group';
import { type Setter, For } from 'solid-js';
import { ElementDisplay } from '@components/element';
import type { Element } from '@types';

export function ElementFilter(props: {
	setValue: Setter<Element[]>;
	value: Element[];
}) {
	const physicalElements: Element[] = ['physical', 'gun'];
	const regularElements: Element[] = [
		'fire',
		'ice',
		'wind',
		'elec',
		'nuke',
		'psy',
		'bless',
		'curse',
		'almighty',
		'support',
	];

	return (
		<ToggleGroup
			class="flex flex-shrink-0 gap-x-2 rounded-lg border-2 border-black bg-red-700 p-1 dark:border-red-600 dark:bg-zinc-800/40"
			multiple={true}
			value={props.value}
			onChange={props.setValue}
		>
			<For each={physicalElements}>
				{(element) => (
					<ToggleGroup.Item
						value={element}
						aria-label={element}
						class="group relative"
					>
						<ElementDisplay
							element={element}
							class="relative size-8 opacity-60 group-ui-pressed:opacity-100"
							loading="eager"
							width={32}
							height={32}
						/>
						<span
							class="-inset-1 -skew-12 absolute block bg-white opacity-0 mix-blend-difference transition-opacity duration-50 group-hover:opacity-100"
							aria-hidden="true"
						/>
					</ToggleGroup.Item>
				)}
			</For>
			<hr class="h-full w-[2px] bg-black dark:bg-red-600" />
			<For each={regularElements}>
				{(element) => (
					<ToggleGroup.Item
						value={element}
						aria-label={element}
						class="group relative"
					>
						<ElementDisplay
							element={element}
							class="relative size-8 opacity-60 group-ui-pressed:opacity-100"
							loading="eager"
							width={32}
							height={32}
						/>
						<span
							class="-inset-1 -skew-12 absolute block bg-white opacity-0 mix-blend-difference transition-opacity duration-50 group-hover:opacity-100"
							aria-hidden="true"
						/>
					</ToggleGroup.Item>
				)}
			</For>
		</ToggleGroup>
	);
}
