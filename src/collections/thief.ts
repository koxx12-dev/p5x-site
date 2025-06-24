import { allThiefOverrides, allThieves } from "content-collections";

const thiefCache: Map<string, typeof allThieves[number]> = new Map();
const thiefOverrideCache: Map<string, typeof allThiefOverrides[number]> = new Map();

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

    const override = allThiefOverrides.find((o) => o.id === id && o.region === region);

    if (override) {
        thiefOverrideCache.set(key, override);
    }

    return override;
}

export const getThieves = () => allThieves;