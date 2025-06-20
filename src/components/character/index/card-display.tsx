import { createAutoAnimate } from '@formkit/auto-animate/solid';
import { createMemo, For } from 'solid-js';
import { CharacterCard } from '../../character-card';
import { allThieves } from 'content-collections';
import type { Element, Role } from '@types';

export function CardDisplay(props: {
	elements: Element[];
	roles: Role[];
	qualities: string[];
	name: string;
}) {
	const filteredThiefIds = createMemo(() => {
		const filtered = [];

		let counter = 0;

		for (const thief of allThieves) {
			let thiefElement: Element | Element[] = thief.element;
			const thiefRole = thief.role;
			const thiefQuality = `${thief.quality}star`;

			if (thiefElement === 'wind_ice') {
				thiefElement = ['wind', 'ice'];
			}

			const isNameMatching =
				props.name === '' ||
				thief.code_name.toLowerCase().includes(props.name.toLowerCase()) ||
				thief.full_name.toLowerCase().includes(props.name.toLowerCase());

			const isElementMatching =
				typeof thiefElement === 'string'
					? props.elements.includes(thiefElement)
					: thiefElement.some((element) =>
							props.elements.includes(element),
						);

			if (
				isElementMatching &&
				props.roles.includes(thiefRole) &&
				props.qualities.includes(thiefQuality) &&
				isNameMatching
			) {
				filtered.push(thief);
			}

			counter++;
		}

		filtered.sort((a, b) => a.code_name.localeCompare(b.code_name));

		const mapped = filtered.map((character) => character.id);

		return [...mapped];
	});

	const [parent, _] = createAutoAnimate();

	return (
		<div class="flex flex-row flex-wrap gap-5 pt-2" ref={parent}>
			<For each={filteredThiefIds()}>
				{(id) => <CharacterCard characterId={id} />}
			</For>
		</div>
	);
}
