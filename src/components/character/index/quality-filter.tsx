import { ToggleGroup } from '@kobalte/core/toggle-group';
import type { Setter } from 'solid-js';

export function QualityFilter(props: {
	setValue: Setter<string[]>;
	value: string[];
}) {
	return (
		<ToggleGroup
			class="flex w-max flex-shrink-0 flex-row gap-x-2 rounded-lg border-2 border-black bg-red-700 p-1 dark:border-red-600 dark:bg-black/60"
			multiple={true}
			value={props.value}
			onChange={props.setValue}
		>
			<ToggleGroup.Item
				value={'4star'}
				aria-label={'4 star'}
				class="group relative"
			>
				<div class="icon-[tabler--carambola-filled] relative block size-8 bg-star-gold opacity-60 group-ui-pressed:opacity-100" />
				<span
					class="-inset-1 -skew-12 absolute block bg-white opacity-0 mix-blend-difference transition-opacity duration-50 group-hover:opacity-100"
					aria-hidden="true"
				/>
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value={'5star'}
				aria-label={'5 star'}
				class="group relative"
			>
				<div class="icon-[tabler--carambola-filled] relative block size-8 animate-star-rainbow opacity-60 group-ui-pressed:opacity-100" />
				<span
					class="-inset-1 -skew-12 absolute block bg-white opacity-0 mix-blend-difference transition-opacity duration-50 group-hover:opacity-100"
					aria-hidden="true"
				/>
			</ToggleGroup.Item>
		</ToggleGroup>
	);
}
