import { makePersisted } from '@solid-primitives/storage';
import { type Accessor, createSignal, type Setter } from 'solid-js';
import { effect } from 'solid-js/web';

const [getBgBlur, setBgBlur] = makePersisted(createSignal(false), {
	name: 'accessibility-bg-blur',
});

effect(() => {
	document.documentElement.classList.toggle(
		'accessibility-bg-blur',
		getBgBlur(),
	);
});

export function useAccessibilityBgBlur(): [
	get: Accessor<boolean>,
	set: Setter<boolean>,
] {
	return [getBgBlur, setBgBlur];
}
