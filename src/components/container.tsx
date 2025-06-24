import { mergeProps, type JSX } from 'solid-js';
import { cn } from '../utils';
import { type BoxColorScheme, Box, type BoxIntent } from './box';

type Variant = 'default' | 'compact';

export function Container(props: {
	header: JSX.Element;
	body: JSX.Element;
	class?: string;
	variant?: Variant;
	colorScheme?: BoxColorScheme;
	intent?: BoxIntent;
}) {
	const realProps = mergeProps(
		{ variant: 'default', colorScheme: 'default', accent: 'primary' },
		props,
	);

	return (
		<Box
			class={cn(
				realProps.variant === 'default' && 'flex-col p-4 pt-2',
				realProps.variant === 'compact' && 'flex-row items-center p-2',
				realProps.class,
			)}
			colorScheme={realProps.colorScheme as BoxColorScheme}
			intent={realProps.intent as BoxIntent}
		>
			{realProps.header}
			<div
				class={cn(
					realProps.variant === 'default' && 'h-[2px] w-full',
					realProps.variant === 'compact' && 'h-full w-[2px] shrink-0',
					realProps.colorScheme === 'default' && 'bg-black dark:bg-red-600',
					realProps.colorScheme === 'velvet' && 'bg-black dark:bg-blue-600',
					realProps.colorScheme === 'tartarus' && 'bg-black dark:bg-green-600',
				)}
			/>
			{realProps.body}
		</Box>
	);
}
