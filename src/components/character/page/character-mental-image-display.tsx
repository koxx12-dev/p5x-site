import type { ThiefMentalImage } from '@types';
import { For } from 'solid-js';
import { CharacterMentalImageBasic } from './character-mental-image-basic';
import { CharacterMentalImageBells } from './character-mental-image-bells';
import { CharacterMentalImageBuff } from './character-mental-image-buff';

type CharacterMentalImageProps = {
	mentalImage: ThiefMentalImage;
};

export function CharacterMentalImageDisplay(props: CharacterMentalImageProps) {
	return (
		<div class="mt-5 flex w-full flex-col gap-2">
			<h3 class="font-semibold text-4xl text-white" id="mental_image">
				Mental Image
			</h3>
			<div class="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
				<For each={props.mentalImage.basic}>
					{(basic, _) => <CharacterMentalImageBasic {...basic} />}
				</For>
			</div>
			<div class="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
				<CharacterMentalImageBuff {...props.mentalImage.stat_buff_1} />
				<CharacterMentalImageBells bells={props.mentalImage.bells} />
				<CharacterMentalImageBuff {...props.mentalImage.stat_buff_2} />
			</div>
		</div>
	);
}
