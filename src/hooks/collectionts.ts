import { getThiefById, getThiefOverride } from "@collections/thief";
import type { MaybeAccessor } from "./types";
import { useRegion } from "./i18n";
import type { Thief } from "@types";
import { type Accessor, createMemo } from "solid-js";
import { allThieves } from "content-collections";

export function useThief(thiefId: MaybeAccessor<string>): Accessor<Thief | undefined> {
    const [region] = useRegion();

    return createMemo(() => {
        const thief = getThiefById(typeof thiefId === "function" ? thiefId() : thiefId);

        if (thief === undefined || (thief.available_regions !== undefined && !thief.available_regions.includes(region()))) {
            return undefined;
        }

        const override = getThiefOverride(thief.id, region());

        if (override) {
            const { region: _, id: __, ...rest } = override;
            // Replace null values in rest with undefined
            const restWithUndefined = Object.fromEntries(
                Object.entries(rest).map(([key, value]) => [key, value === null ? undefined : value])
            );

            return {
                ...thief,
                ...restWithUndefined
            } as Thief;
        }

        return thief as Thief;
    });
}

export function useThieves(): Accessor<Thief[]> {
    const [region] = useRegion();

    return createMemo(() => {
        return allThieves.map((thief) => {
            if (thief.available_regions !== undefined && !thief.available_regions.includes(region())) {
                return undefined;
            }
            const override = getThiefOverride(thief.id, region());

            console.log(thief.id, region(), override);
            
            //remove the region and id fields from the override
            if (override) {
                const { region: _, id: __, ...rest } = override;

                const restWithUndefined = Object.fromEntries(
                    Object.entries(rest).map(([key, value]) => [key, value === null ? undefined : value])
                );

                return {
                    ...thief,
                    ...restWithUndefined
                } as Thief;
            }

            return thief as Thief;
        }).filter((thief) => thief !== undefined);
    });
}