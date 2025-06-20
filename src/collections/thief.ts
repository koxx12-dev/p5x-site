import { allThieves } from "content-collections";
const thiefCache: Map<string, typeof allThieves[number]> = new Map();

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

export const getThieves = () => allThieves;