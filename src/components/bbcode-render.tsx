import { createMemo, mergeProps, splitProps, type JSX } from 'solid-js';
import presetHtml from '@bbob/preset-html5';
import bbcodeHtml from '@bbob/html';
import type { BBobCoreOptions, BBobPlugins } from '@bbob/types';
import { Dynamic } from 'solid-js/web';
import { renderBBCodeSolid } from '../bbcode/renderer';

type BBCodeHTMLRendererProps = {
	bbcode: string;
} & Exclude<JSX.IntrinsicElements['span'], 'innerHTML'>;

export function BBCodeHTMLRenderer(props: BBCodeHTMLRendererProps) {
	const [realProps, _, restProps] = splitProps(
		props,
		['bbcode'],
		['innerHTML'],
	);

	const html = createMemo(() =>
		bbcodeHtml(realProps.bbcode, presetHtml(), {
			onlyAllowTags: ['color', 'b', 'i', 'u', 's', 'style', 'tooltip', 'url'],
		}),
	);

	return <span innerHTML={html()} {...restProps} />;
}

type BBCodeRendererProps<T extends keyof JSX.IntrinsicElements = 'span'> = {
	children: string;
	as?: T;
	plugins?: BBobPlugins;
	options?: BBobCoreOptions;
} & Omit<JSX.IntrinsicElements[T], 'children'>;

export function BBCodeRenderer(props: BBCodeRendererProps) {
	const defaultProps = mergeProps(
		{
			as: 'span',
			plugins: presetHtml(),
			options: {
				onlyAllowTags: [
					'color',
					'b',
					'i',
					'u',
					's',
					'style',
					'tooltip',
					'ref',
					'url',
				],
			},
		},
		props,
	);

	const [realProps, restProps] = splitProps(defaultProps, [
		'plugins',
		'options',
		'children',
		'as',
	]);

	const elements = createMemo(() =>
		renderBBCodeSolid(realProps.children, realProps.plugins, realProps.options),
	);

	return (
		<Dynamic component={realProps.as} {...restProps}>
			{elements()}
		</Dynamic>
	);
}
