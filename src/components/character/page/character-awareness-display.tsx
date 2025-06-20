import { For } from 'solid-js';
import type { CharacterAwareness } from '@types';
import { AwarenessDisplay } from '../../awareness';
import { BBCodeRenderer } from '../../bbcode-render';
import { Container } from '../../container';

export function CharacterAwarenessDisplay(props: {
	awareness: CharacterAwareness[];
}) {
	return (
		<div class="mt-5 flex w-full flex-col gap-2">
			<h3 class="font-semibold text-4xl text-white" id="awareness">
				Awareness
			</h3>
			<For each={props.awareness}>
				{(awareness) => (
					<Container
						header={
							<div class="overflow-x-auto overflow-y-hidden">
								<div class="flex w-max min-w-1 flex-row gap-x-2">
									<AwarenessDisplay tier={awareness.tier} class="size-8" />
									<h4
										class="font-semibold text-2xl text-white"
										id={awareness.id}
									>
										{awareness.name}
									</h4>
								</div>
							</div>
						}
						body={
							<BBCodeRenderer class="whitespace-pre-line font-normal text-white">
								{typeof awareness.description === 'string'
									? awareness.description
									: awareness.description.join('\n')}
							</BBCodeRenderer>
						}
						colorScheme={awareness.tier <= 6 ? 'default' : 'tartarus'}
					/>
				)}
			</For>
		</div>
	);
}
