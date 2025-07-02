import { makePersisted } from '@solid-primitives/storage';
import type { Language, Region } from '@types';
import { type Accessor, createSignal, type Setter } from 'solid-js';

export const REGIONS: Region[] = ['cn', 'kr-tw', 'glb-jp'] as const;
export const LANGUAGES: Language[] = ['en'] as const;

export const READABLE_REGIONS: Record<Region, string> = {
  'cn': 'China',
  'kr-tw': 'Korea/Taiwan',
  'glb-jp': 'Global/JP',
  'sea': 'Southeast Asia',
}

const [getRegion, setRegion] = makePersisted(createSignal<Region>('glb-jp'), { name: 'region' });
const [getLanguage, setLanguage] = makePersisted(createSignal<Language>('en'), { name: 'language' });

export function useRegion(): [get: Accessor<Region>, set: Setter<Region>] {
  return [getRegion, setRegion];
}

export function useLanguage(): [get: Accessor<Language>, set: Setter<Language>] {
  return [getLanguage, setLanguage];
}