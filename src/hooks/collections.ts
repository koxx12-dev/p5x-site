import { getThiefById, getThiefOverride } from "@collections/thief";
import type { MaybeAccessor } from "./types";
import { useLanguage, useRegion } from "./i18n";
import { type Accessor, createMemo } from "solid-js";
import { allThiefI18ns, allThieves, type Thief } from "content-collections";
import * as i18n from "@solid-primitives/i18n";

const [region] = useRegion();
const [lang] = useLanguage();

const i18nDict: Record<string, Record<string, string | string[]>> = {};

for (const { lang, id, _meta, ...rest } of allThiefI18ns) {
    i18nDict[lang] ??= {};
    Object.assign(i18nDict[lang], i18n.prefix(rest, id));
}

const dict = createMemo(() => i18nDict[lang()] || {});

const tG = i18n.translator(dict);

function translateThief(thief: Thief) {
    const t = (path: string) => tG(`${thief.id}.${path}`);

    return {
        ...thief,
        code_name: t(thief.code_name) as string || thief.code_name,
        full_name: t(thief.full_name) as string || thief.full_name,
        awareness: thief.awareness?.map((a) => ({
            ...a,
            name: t(a.name) as string || a.name,
            description: typeof a.description === "string" ? t(a.description) || a.description : a.description,
        })),
        skill: thief.skill?.map((skill) => ({
            ...skill,
            name: t(skill.name) as string || skill.name,
            description: typeof skill.description === "string" ? t(skill.description) || skill.description : skill.description,
        }))
    }
}

export function useThief(thiefId: MaybeAccessor<string>): Accessor<ReturnType<typeof translateThief> | undefined> {
    const id = () => typeof thiefId === "function" ? thiefId() : thiefId;

    return createMemo(() => {
        const thief = getThiefById(id());

        if (thief === undefined || (thief.available_regions !== undefined && !thief.available_regions.includes(region()))) {
            return undefined;
        }

        const override = getThiefOverride(thief.id, region());

        if (override) {
            const { region: _, id: __, ...rest } = override;
            
            const restWithUndefined = Object.fromEntries(
                Object.entries(rest).map(([key, value]) => [key, value === null ? undefined : value])
            );

            return translateThief({
                ...thief,
                ...restWithUndefined
            })
        }
        
        return translateThief(thief)
    });
}

export function useThieves(): Accessor<ReturnType<typeof translateThief>[]> {
    return createMemo(() => {
        return allThieves.map((thief) => {
            if (thief.available_regions !== undefined && !thief.available_regions.includes(region())) {
                return undefined;
            }

            const override = getThiefOverride(thief.id, region());

            //remove the region and id fields from the override
            if (override) {
                const { region: _, id: __, ...rest } = override;

                const restWithUndefined = Object.fromEntries(
                    Object.entries(rest).map(([key, value]) => [key, value === null ? undefined : value])
                );

                return translateThief({
                    ...thief,
                    ...restWithUndefined
                })
            }

            return translateThief(thief);
        }).filter((thief) => thief !== undefined);
    });
}