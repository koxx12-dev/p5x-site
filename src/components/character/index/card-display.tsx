import { createAutoAnimate } from '@formkit/auto-animate/solid';
import type { Element, Role } from '@types';
import { createMemo, For } from 'solid-js';
import { useThieves } from 'src/hooks/collections';
import { CharacterCard } from '../../character-card';

export function CardDisplay(props: {
	elements: Element[];
	roles: Role[];
	qualities: string[];
	name: string;
}) {
	const thieves = useThieves();

	const filteredThiefIds = createMemo(() => {
		const filtered = [];

		for (const thief of thieves()) {
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
					: thiefElement.some((element) => props.elements.includes(element));

			if (
				isElementMatching &&
				props.roles.includes(thiefRole) &&
				props.qualities.includes(thiefQuality) &&
				isNameMatching
			) {
				filtered.push(thief);
			}
		}

		return filtered
			.sort((a, b) => a.code_name.localeCompare(b.code_name))
			.map((character) => character.id);
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
