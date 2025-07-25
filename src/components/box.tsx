import { cva, type VariantProps } from 'class-variance-authority';
import type { JSX } from 'solid-js';
import { twMerge } from 'tailwind-merge';

export type BoxColorScheme = NonNullable<BoxVariantProps['scheme']>;
export type BoxIntent = NonNullable<BoxVariantProps['intent']>;

type BoxVariantProps = VariantProps<typeof boxVariants>;
const boxVariants = cva(['flex', 'gap-2', 'rounded-lg', 'border-2'], {
	variants: {
		intent: {
			primary: ['dark:bg-zinc-800/60'],
			secondary: ['dark:bg-black/60'],
		},
		scheme: {
			default: ['border-black', 'dark:border-red-600'],
			velvet: ['border-black', 'dark:border-blue-600'],
			tartarus: ['border-black', 'dark:border-green-600'],
		},
	},
	compoundVariants: [
		{
			intent: 'primary',
			scheme: 'default',
			class: ['bg-red-700'],
		},
		{
			intent: 'secondary',
			scheme: 'default',
			class: ['bg-red-800'],
		},
		{
			intent: 'primary',
			scheme: 'velvet',
			class: ['bg-blue-700'],
		},
		{
			intent: 'secondary',
			scheme: 'velvet',
			class: ['bg-blue-800'],
		},
		{
			intent: 'primary',
			scheme: 'tartarus',
			class: ['bg-green-700'],
		},
		{
			intent: 'secondary',
			scheme: 'tartarus',
			class: ['bg-green-800'],
		},
	],
	defaultVariants: {
		intent: 'primary',
		scheme: 'default',
	},
});

// cn(
// 	'flex gap-2 rounded-lg border-2',
// 	realProps.colorScheme === 'default' && [
// 		'border-black dark:border-red-600',
// 		realProps.accent === 'secondary' && 'bg-red-700 dark:bg-black/40',
// 		realProps.accent === 'primary' && 'bg-red-700 dark:bg-zinc-800/60',
// 	],
// 	realProps.colorScheme === 'velvet' && [
// 		'border-black dark:border-blue-600',
// 		realProps.accent === 'secondary' && 'bg-blue-700 dark:bg-black/40',
// 		realProps.accent === 'primary' && 'bg-blue-700 dark:bg-zinc-800/60',
// 	],
// 	realProps.colorScheme === 'tartarus' && [
// 		'border-black dark:border-green-600',
// 		realProps.accent === 'secondary' && 'bg-green-700 dark:bg-black/40',
// 		realProps.accent === 'primary' && 'bg-green-700 dark:bg-zinc-800/60',
// 	],
// 	realProps.class,
// )

interface BoxProps {
	children: JSX.Element;
	class?: string;
	colorScheme?: BoxColorScheme;
	intent?: BoxIntent;
}

export function Box(props: BoxProps) {
	return (
		<div
			class={twMerge(
				boxVariants({
					intent: props.intent,
					scheme: props.colorScheme,
					class: props.class,
				}),
			)}
		>
			{props.children}
		</div>
	);
}
