import { useNavigate } from '@tanstack/solid-router';
import { ElementDisplay } from './element';
import { RoleDisplay } from './role';
import { CharacterAssetDisplay } from './character-asset';
import { cn } from '../utils';
import { Show } from 'solid-js';
import { getThiefById } from '@collections/thief';

export function CharacterCard(props: { characterId: string }) {
	const navigate = useNavigate();

	const characterData = getThiefById(props.characterId);

	return (
		//suspense is used here to override the root one stopping everything from using focus, preferably we would not use the match but things depend on id being known
		<Show when={characterData}>
			{(characterData) => (
				<div
					class="relative h-32 w-28 cursor-pointer rounded-lg bg-red-600 transition-ease-in-out duration-100 hover:scale-110"
					on:click={() =>
						navigate({
							to: '/character/$characterId',
							params: { characterId: characterData().id },
						})
					}
				>
					<div class="relative h-full w-full overflow-hidden rounded-lg">
						<CharacterAssetDisplay
							characterId={characterData().id}
							assetType={'card_cut'}
							loading="eager"
							width={112}
							height={128}
						/>
						<span
							class="-bottom-2 skew-8 absolute left-0 h-7 w-[110%] bg-black"
							aria-hidden="true"
						/>
						<span
							class={cn(
								'skew-8 absolute bottom-4 left-0 h-1 w-[110%]',
								characterData().quality === 5 &&
									'bg-[url(/assets/rainbow.svg)] bg-size-[100%]',
								characterData().quality === 4 && 'bg-star-gold',
							)}
							aria-hidden="true"
						/>
						<span
							class="absolute bottom-0 left-1 w-[50%] font-sans font-semibold text-white"
							style={{
								'view-transition-name': `code-name-${characterData().id}`,
							}}
						>
							{characterData().code_name}
						</span>
					</div>
					<ElementDisplay
						element={characterData().element}
						class="absolute right-0 bottom-4.5"
						loading="eager"
						width={24}
						height={24}
					/>
					<RoleDisplay
						characterRole={characterData().role}
						class="-left-0.5 -top-0.5 absolute rounded-full bg-red-800"
						loading="eager"
						width={28}
						height={28}
					/>
				</div>
			)}
		</Show>
	);
}
