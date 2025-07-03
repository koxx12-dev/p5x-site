import {
	allThiefI18ns,
	allThiefOverrides,
	allThieves,
} from 'content-collections';

const thiefCache: Map<string, (typeof allThieves)[number]> = new Map();
const thiefOverrideCache: Map<string, (typeof allThiefOverrides)[number]> =
	new Map();
const thiefI18nCache: Map<string, (typeof allThiefI18ns)[number]> = new Map();

export type Thief = (typeof allThieves)[number];
export type ThiefOverride = (typeof allThiefOverrides)[number];
export type ThiefI18n = (typeof allThiefI18ns)[number];

export const getThiefById = (id: string) => {
	if (thiefCache.has(id)) {
		return thiefCache.get(id);
	}

	const thief = allThieves.find((t) => t.id === id);
	if (thief) {
		thiefCache.set(id, thief);
	}

	return thief;
};

export const getThiefOverride = (id: string, region: string) => {
	const key = `${id}-${region}`;
	if (thiefOverrideCache.has(key)) {
		return thiefOverrideCache.get(key);
	}

	const override = allThiefOverrides.find(
		(o) => o.id === id && o.region === region,
	);

	if (override) {
		thiefOverrideCache.set(key, override);
	}

	return override;
};

export const getThiefI18n = (id: string, lang: string) => {
	const key = `${id}-${lang}`;
	if (thiefI18nCache.has(key)) {
		return thiefI18nCache.get(key);
	}

	const i18n = allThiefI18ns.find((i) => i.id === id && i.lang === lang);

	if (i18n) {
		thiefI18nCache.set(key, i18n);
	}

	return i18n;
};

export const getThiefI18ns = () => allThiefI18ns;
export const getThiefOverrides = () => allThiefOverrides;
export const getThieves = () => allThieves;
