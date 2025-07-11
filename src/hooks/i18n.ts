import * as i18n from '@solid-primitives/i18n';
import { makePersisted } from '@solid-primitives/storage';
import type { Language, Region } from '@types';
import { type Accessor, createMemo, createSignal, type Setter } from 'solid-js';
import type { MaybeAccessor } from './types';

export const REGIONS: Region[] = ['cn', 'kr-tw', 'glb-jp', 'sea'] as const;
export const LANGUAGES: Language[] = ['en'] as const;

export const READABLE_REGIONS: Record<Region, string> = {
	cn: 'China',
	'kr-tw': 'Korea/Taiwan',
	'glb-jp': 'Global/JP',
	sea: 'Southeast Asia',
};

const [getRegion, setRegion] = makePersisted(createSignal<Region>('glb-jp'), {
	name: 'region',
});
const [getLanguage, setLanguage] = makePersisted(createSignal<Language>('en'), {
	name: 'language',
});

export function useRegion(): [get: Accessor<Region>, set: Setter<Region>] {
	return [getRegion, setRegion];
}

export function useLanguage(): [
	get: Accessor<Language>,
	set: Setter<Language>,
] {
	return [getLanguage, setLanguage];
}

const DEFAULT_LANGUAGE: Language = 'en';

export function useDefaultTranslator<T extends {}>(
	multiDict: MaybeAccessor<Record<Language, T>>,
	resolveTemplate?: i18n.TemplateResolver<string>,
): i18n.Translator<T> {
	const multiDictAccessor = () =>
		typeof multiDict === 'function' ? multiDict() : multiDict;

	const defaultDict = createMemo(() => {
		const dict = multiDictAccessor()[DEFAULT_LANGUAGE];

		if (!dict) {
			console.error(
				`No dictionary found for default language: ${DEFAULT_LANGUAGE}`,
			);

			return {} as T;
		}

		return dict;
	});

	const currentDict = createMemo(() => {
		const lang = getLanguage();
		const dict = multiDictAccessor()[lang];

		if (!dict) {
			console.error(`No dictionary found for current language: ${lang}`);
			return {} as T;
		}

		return dict;
	});

	const defaultTranslator = i18n.translator(defaultDict, resolveTemplate);
	const currentTranslator = i18n.translator(currentDict, resolveTemplate);

	return ((path, ...args) => {
		const valueCurrent = currentTranslator(path, ...args);
		if (valueCurrent !== undefined && valueCurrent !== null)
			return valueCurrent as T[typeof path];

		const valueDefault = defaultTranslator(path, ...args);
		if (valueDefault !== undefined && valueDefault !== null)
			return valueDefault as T[typeof path];

		console.error(`No translation found for key: ${String(path)}`);
		return path;
	}) as i18n.Translator<T>;
}
