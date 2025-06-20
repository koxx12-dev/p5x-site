import { Combobox } from '@kobalte/core/combobox';
import { type JSX, mergeProps } from 'solid-js';
import { cn } from '../utils';
import { Dynamic } from 'solid-js/web';

type ColorScheme = 'default' | 'velvet';

type LevelDropdownProps = {
	levels: number[];
	defaultLevel?: number;
	selectedLevel?: number;
	setLevel: (value: number) => void;
	colorScheme?: ColorScheme;
	trigger: JSX.Element;
	item?: (props: { value: number }) => JSX.Element;
};

export function LevelDropdown(props: LevelDropdownProps) {
	const realProps = mergeProps(
		{
			colorScheme: 'default' as ColorScheme,
			item: (props) => <span>Lv. {props.value}</span>,
		} as LevelDropdownProps,
		props,
	);

	const onInputChange = (value: number | null) => {
		if (value === null) {
			return;
		}

		realProps.setLevel(value);
	};

	return (
		<Combobox
			options={realProps.levels}
			defaultValue={realProps.defaultLevel}
			value={realProps.selectedLevel}
			onChange={onInputChange}
			itemComponent={(props) => (
				<Combobox.Item item={props.item}>
					<Combobox.ItemLabel class="cursor-pointer text-white">
						<Dynamic component={realProps.item} value={props.item.rawValue} />
					</Combobox.ItemLabel>
				</Combobox.Item>
			)}
		>
			<Combobox.Control aria-label="Level" class="group text-white">
				<Combobox.Trigger class="flex flex-row items-center gap-x-2">
					{realProps.trigger}
				</Combobox.Trigger>
			</Combobox.Control>
			<Combobox.Portal>
				<Combobox.Content class="ui-expanded:motion-scale-in-75 motion-opacity-out-0 motion-duration-[120ms] motion-scale-out-75 z-2">
					<Combobox.Listbox
						class={cn(
							'rounded-lg border-2',
							realProps.colorScheme === 'velvet' &&
								'border-black bg-blue-700 p-2 dark:border-blue-600 dark:bg-black/60',
							realProps.colorScheme === 'default' &&
								'border-black bg-red-700 p-4 pt-2 dark:border-red-600 dark:bg-black/60',
						)}
					/>
				</Combobox.Content>
			</Combobox.Portal>
		</Combobox>
	);
}
