import type {
	BBobPlugins,
	BBobCoreOptions,
	TagNodeTree,
	BBobCoreTagNodeTree,
} from '@bbob/types';
import {
	isTagNode,
	isStringNode,
	isEOL,
	type TagNode,
	getUniqAttr,
} from '@bbob/plugin-helper';
import { createMemo, type JSX, type JSXElement } from 'solid-js';
import { Dynamic, Match, Show, Switch } from 'solid-js/web';
import { render as htmlrender } from '@bbob/html';
import core from '@bbob/core';
import { Tooltip } from '@kobalte/core/tooltip';
import { BBCodeRenderer } from '../components/bbcode-render';
import { Link, useNavigate } from '@tanstack/solid-router';
import { getThiefById } from 'src/collections/thief';

const toAST = (
	source: string,
	plugins?: BBobPlugins,
	options?: BBobCoreOptions,
) =>
	core(plugins).process(source, {
		...options,
		render: (input) => {
			return htmlrender(input, { stripTags: true });
		},
	}).tree;

const isContentEmpty = (content: TagNodeTree) => {
	if (!content) {
		return true;
	}

	if (typeof content === 'number') {
		return String(content).length === 0;
	}

	return Array.isArray(content) ? content.length === 0 : !content;
};

function tagToSolid(node: TagNode, _: number) {
	const unique = getUniqAttr(node.attrs);
	const navigate = useNavigate();

	return (
		<Switch
			fallback={
				<Dynamic component={node.tag} {...node.attrs}>
					{isContentEmpty(node.content) ? null : renderToSolid(node.content)}
				</Dynamic>
			}
		>
			<Match
				when={
					node.tag === 'tooltip' &&
					node.attrs.id !== undefined &&
					node.attrs.id !== '' &&
					node.attrs.character !== undefined &&
					node.attrs.character !== ''
				}
			>
				<TextTooltip {...(node.attrs as { character: string; id: string })}>
					{isContentEmpty(node.content) ? null : renderToSolid(node.content)}
				</TextTooltip>
			</Match>
			{/* <Match
        when={
          node.tag === "skilldata" &&
          node.attrs.id !== undefined &&
          node.attrs.id !== "" &&
          node.attrs.character !== undefined &&
          node.attrs.character !== ""
        }
      >
        <SkillDataTooltip
          {...(node.attrs as { character: string; id: string })}
        >
          {isContentEmpty(node.content) ? null : renderToSolid(node.content)}
        </SkillDataTooltip>
      </Match> */}
			<Match when={node.tag === 'url' && node.attrs.href !== undefined}>
				<Link to={node.attrs.href as string}>
					{isContentEmpty(node.content) ? null : renderToSolid(node.content)}
				</Link>
			</Match>
			<Match when={node.tag === 'ref' && unique !== undefined}>
				<span
					class="cursor-pointer"
					on:click={() => navigate({ hash: unique as string })}
				>
					{isContentEmpty(node.content) ? null : renderToSolid(node.content)}
				</span>
			</Match>
		</Switch>
	);
}

function renderToSolid(nodes?: BBobCoreTagNodeTree | TagNodeTree) {
	if (nodes && Array.isArray(nodes) && nodes.length) {
		return nodes.reduce<JSX.Element[]>((arr, node, index) => {
			if (isTagNode(node)) {
				arr.push(tagToSolid(node, index));
				return arr;
			}

			if (isStringNode(node)) {
				if (isEOL(String(node))) {
					arr.push(node);
					return arr;
				}

				const lastIdx = arr.length - 1;
				const prevArr = arr; // stupid eslint
				const prevNode = lastIdx >= 0 ? prevArr[lastIdx] : null;

				if (
					prevArr[lastIdx] &&
					isStringNode(prevArr[lastIdx]) &&
					prevNode !== null &&
					!isEOL(String(prevNode))
				) {
					prevArr[lastIdx] += String(node);

					return prevArr;
				}

				arr.push(node);
			}

			return arr;
		}, []);
	}
	return [];
}

function TextTooltip(props: {
	children?: JSXElement;
	character: string;
	id: string;
}) {
	const character = getThiefById(props.character);

	const tooltipMessage = createMemo(() => {
		if (!character || !character.extra) {
			return 'No extra information available.';
		}

		const extra = character.extra[props.id];

		return typeof extra === 'string' ? extra : extra.join('\n');
	});

	return (
		<Tooltip openDelay={300} closeDelay={100}>
			<Tooltip.Trigger as="span">{props.children}</Tooltip.Trigger>
			<Tooltip.Portal>
				<Show when={character !== undefined}>
					<Tooltip.Content class="z-2 rounded-lg border-2 border-black bg-red-700 p-1 text-white dark:border-red-600 dark:bg-black/60">
						<BBCodeRenderer class="whitespace-pre-wrap">
							{tooltipMessage()}
						</BBCodeRenderer>
					</Tooltip.Content>
				</Show>
			</Tooltip.Portal>
		</Tooltip>
	);
}

export function renderBBCodeSolid(
	source: string,
	plugins?: BBobPlugins,
	options?: BBobCoreOptions,
) {
	return renderToSolid(toAST(source, plugins, options));
}
