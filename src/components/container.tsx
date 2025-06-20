import { mergeProps, type JSX } from 'solid-js';
import { cn } from '../utils';
import { type BoxColorScheme, Box } from './box';

type Variant = 'default' | 'compact';

export function Container(props: {
	header: JSX.Element;
	body: JSX.Element;
	class?: string;
	variant?: Variant;
	colorScheme?: BoxColorScheme;
}) {
	const realProps = mergeProps(
		{ variant: 'default', colorScheme: 'default' },
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
